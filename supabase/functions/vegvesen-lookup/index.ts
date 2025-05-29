
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { authenticateUser, checkAndIncrementQuota } from './auth.ts'
import { callVegvesenApi, logApiCall } from './vegvesen-api.ts'
import { extractVehicleData } from './data-extractor.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('=== VEGVESEN LOOKUP STARTED ===')
    console.log('Request method:', req.method)
    
    const authHeader = req.headers.get('Authorization')
    console.log('Auth header present:', !!authHeader)
    
    // Authenticate user
    const { user, supabaseClient } = await authenticateUser(authHeader);
    console.log('✅ User authenticated:', user.email)

    // Get license plate from request
    const { licensePlate } = await req.json()
    console.log('License plate to lookup:', licensePlate)
    
    if (!licensePlate) {
      console.error('❌ No license plate provided')
      return new Response(
        JSON.stringify({ error: 'License plate required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('🔄 Checking API quota...')
    // Check and increment quota
    await checkAndIncrementQuota(supabaseClient, user.id, licensePlate);
    console.log('✅ Quota check passed')

    // Call Vegvesen API
    const { responseData, status } = await callVegvesenApi(licensePlate);

    // Log the API call
    await logApiCall(supabaseClient, user.id, licensePlate, status, null, true);

    // Extract and format vehicle data
    const formattedData = extractVehicleData(responseData, licensePlate);
    
    console.log('✅ VEGVESEN LOOKUP COMPLETED SUCCESSFULLY')

    return new Response(
      JSON.stringify(formattedData),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error: any) {
    console.error('❌ Error in vegvesen-lookup:', error)
    console.error('Error stack:', error.stack)
    
    // Determine appropriate status code based on error message
    let statusCode = 500;
    if (error.message.includes('No authorization header') || 
        error.message.includes('Authentication failed') || 
        error.message.includes('User not authenticated')) {
      statusCode = 401;
    } else if (error.message.includes('License plate required')) {
      statusCode = 400;
    } else if (error.message.includes('Daily quota exceeded')) {
      statusCode = 429;
    } else if (error.message.includes('No vehicle data found')) {
      statusCode = 404;
    } else if (error.message.includes('Vegvesen API key not configured')) {
      statusCode = 500;
    }
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error.stack 
      }),
      { 
        status: statusCode, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
