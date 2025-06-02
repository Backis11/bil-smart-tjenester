
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      console.error('No authorization header provided')
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const token = authHeader.replace('Bearer ', '')

    // Verify the user's JWT token
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)
    
    if (userError || !user) {
      console.error('User verification failed:', userError)
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('Deleting user and related data for user:', user.id)

    // Delete related data but preserve cars and transferable documents
    
    // 1. Delete non-transferable documents only
    const { error: documentsError } = await supabaseAdmin
      .from('documents')
      .delete()
      .in('car_id', 
        supabaseAdmin
          .from('cars')
          .select('id')
          .eq('user_id', user.id)
      )
      .eq('is_transferable', false)
    
    if (documentsError) {
      console.error('Error deleting non-transferable documents:', documentsError)
    }

    // 2. Delete service requests and related data
    const { error: serviceRequestsError } = await supabaseAdmin
      .from('service_requests')
      .delete()
      .eq('user_id', user.id)
    
    if (serviceRequestsError) {
      console.error('Error deleting service requests:', serviceRequestsError)
    }

    // 3. Set cars to idle status instead of deleting them
    // This will be handled by the database trigger, but we can also do it explicitly here
    const { error: carsError } = await supabaseAdmin
      .from('cars')
      .update({
        user_id: null,
        status: 'idle',
        idle_since: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .eq('status', 'active')
    
    if (carsError) {
      console.error('Error setting cars to idle:', carsError)
      return new Response(
        JSON.stringify({ error: 'Failed to update user cars: ' + carsError.message }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // 4. Delete user preferences
    const { error: preferencesError } = await supabaseAdmin
      .from('user_preferences')
      .delete()
      .eq('user_id', user.id)
    
    if (preferencesError) {
      console.error('Error deleting user preferences:', preferencesError)
    }

    // 5. Delete user profile
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .delete()
      .eq('id', user.id)
    
    if (profileError) {
      console.error('Error deleting profile:', profileError)
    }

    // 6. Finally delete the user from auth
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id)
    
    if (deleteError) {
      console.error('Delete user error:', deleteError)
      return new Response(
        JSON.stringify({ error: 'Failed to delete user: ' + deleteError.message }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('Successfully deleted user and set cars to idle:', user.id)
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'User deleted successfully. Cars preserved for future owners.' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error: ' + error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
