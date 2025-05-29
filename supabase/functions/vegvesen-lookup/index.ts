
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )

    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
      throw new Error('Unauthorized')
    }

    const { licensePlate } = await req.json()
    if (!licensePlate) {
      throw new Error('License plate required')
    }

    // Check API quota
    const { data: quotaCheck } = await supabaseClient.rpc('check_api_quota', { 
      user_uuid: user.id 
    })
    
    if (!quotaCheck) {
      await supabaseClient.rpc('log_vegvesen_api_call', {
        user_uuid: user.id,
        plate: licensePlate,
        status_code: 429,
        error_msg: 'Daily quota exceeded (10 requests)',
        call_success: false
      })

      return new Response(
        JSON.stringify({ 
          error: 'Daily quota exceeded. You can make maximum 10 requests per day.' 
        }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Increment quota counter
    await supabaseClient.rpc('increment_api_quota', { user_uuid: user.id })

    // Call Vegvesenet API
    const vegvesenApiKey = Deno.env.get('VEGVESEN_API_KEY')
    if (!vegvesenApiKey) {
      throw new Error('Vegvesen API key not configured')
    }

    const vegvesenUrl = `https://www.vegvesen.no/ws/no/vegvesen/kjoretoy/felles/datautlevering/enkeltoppslag/kjoretoydata?kjennemerke=${licensePlate}`
    
    const vegvesenResponse = await fetch(vegvesenUrl, {
      headers: {
        'SVV-Authorization': `Apikey ${vegvesenApiKey}`,
        'Accept': 'application/json'
      }
    })

    const responseData = await vegvesenResponse.json()

    // Log the API call
    await supabaseClient.rpc('log_vegvesen_api_call', {
      user_uuid: user.id,
      plate: licensePlate,
      status_code: vegvesenResponse.status,
      error_msg: vegvesenResponse.ok ? null : JSON.stringify(responseData),
      call_success: vegvesenResponse.ok
    })

    if (!vegvesenResponse.ok) {
      return new Response(
        JSON.stringify({ 
          error: 'Failed to fetch vehicle data from Vegvesenet',
          details: responseData 
        }),
        { 
          status: vegvesenResponse.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Extract relevant data from Vegvesenet response
    const vehicleData = responseData.kjoretoydataListe?.[0]
    if (!vehicleData) {
      return new Response(
        JSON.stringify({ error: 'No vehicle data found for this license plate' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Format the response data
    const formattedData = {
      licensePlate: licensePlate,
      make: vehicleData.godkjenning?.tekniskGodkjenning?.kjoretoyklassifisering?.beskrivelse || '',
      model: vehicleData.godkjenning?.tekniskGodkjenning?.handelsbenevnelse?.[0] || '',
      year: vehicleData.godkjenning?.forstegangsregistrering?.registrertForstegangNorgeDato ? 
        new Date(vehicleData.godkjenning.forstegangsregistrering.registrertForstegangNorgeDato).getFullYear() : null,
      vin: vehicleData.kjennemerke?.understellsnummer || '',
      fuelType: vehicleData.godkjenning?.tekniskGodkjenning?.motorOgDrivverk?.[0]?.drivstoff?.[0]?.drivstoffKode?.beskrivelse || '',
      engineSize: vehicleData.godkjenning?.tekniskGodkjenning?.motorOgDrivverk?.[0]?.motor?.slagvolum || '',
      registrationDate: vehicleData.godkjenning?.forstegangsregistrering?.registrertForstegangNorgeDato || null,
      technicalApprovalDate: vehicleData.godkjenning?.godkjenningsDato || null,
      inspectionDueDate: vehicleData.periodiskKjoretoyKontroll?.kontrollfrist || null
    }

    return new Response(
      JSON.stringify(formattedData),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in vegvesen-lookup:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
