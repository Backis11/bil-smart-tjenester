
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
    console.log('=== VEGVESEN LOOKUP STARTED ===')
    console.log('Request method:', req.method)
    
    const authHeader = req.headers.get('Authorization')
    console.log('Auth header present:', !!authHeader)
    
    if (!authHeader) {
      console.error('❌ No authorization header found')
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('🔄 Creating Supabase client...')
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )

    console.log('🔄 Getting user from auth...')
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser()
    
    if (authError) {
      console.error('❌ Auth error:', authError)
      return new Response(
        JSON.stringify({ error: 'Authentication failed: ' + authError.message }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
    
    if (!user) {
      console.error('❌ No user found')
      return new Response(
        JSON.stringify({ error: 'User not authenticated' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('✅ User authenticated:', user.email)

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
    // Check API quota
    const { data: quotaCheck, error: quotaError } = await supabaseClient.rpc('check_api_quota', { 
      user_uuid: user.id 
    })
    
    if (quotaError) {
      console.error('❌ Quota check error:', quotaError)
      return new Response(
        JSON.stringify({ error: 'Failed to check quota: ' + quotaError.message }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
    
    console.log('Quota check result:', quotaCheck)
    
    if (!quotaCheck) {
      console.log('❌ Daily quota exceeded')
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

    console.log('✅ Quota check passed, incrementing counter...')
    // Increment quota counter
    const { error: incrementError } = await supabaseClient.rpc('increment_api_quota', { user_uuid: user.id })
    if (incrementError) {
      console.error('⚠️ Failed to increment quota:', incrementError)
    }

    // Call Vegvesenet API
    const vegvesenApiKey = Deno.env.get('VEGVESEN_API_KEY')
    if (!vegvesenApiKey) {
      console.error('❌ Vegvesen API key not configured')
      return new Response(
        JSON.stringify({ error: 'Vegvesen API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const vegvesenUrl = `https://www.vegvesen.no/ws/no/vegvesen/kjoretoy/felles/datautlevering/enkeltoppslag/kjoretoydata?kjennemerke=${licensePlate}`
    
    console.log('🔄 Calling Vegvesen API:', vegvesenUrl)
    
    const vegvesenResponse = await fetch(vegvesenUrl, {
      headers: {
        'SVV-Authorization': `Apikey ${vegvesenApiKey}`,
        'Accept': 'application/json'
      }
    })

    const responseData = await vegvesenResponse.json()
    console.log('Vegvesen API response status:', vegvesenResponse.status)
    console.log('Vegvesen API response data:', JSON.stringify(responseData, null, 2))

    // Log the API call
    await supabaseClient.rpc('log_vegvesen_api_call', {
      user_uuid: user.id,
      plate: licensePlate,
      status_code: vegvesenResponse.status,
      error_msg: vegvesenResponse.ok ? null : JSON.stringify(responseData),
      call_success: vegvesenResponse.ok
    })

    if (!vegvesenResponse.ok) {
      console.error('❌ Vegvesen API error:', responseData)
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
      console.log('❌ No vehicle data found in response')
      return new Response(
        JSON.stringify({ error: 'No vehicle data found for this license plate' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('🔍 Extracting vehicle data...')
    
    // Improved data extraction with multiple fallback paths
    const tekniskData = vehicleData.godkjenning?.tekniskGodkjenning?.tekniskeData?.generelt;
    const registrering = vehicleData.forstegangsregistrering || vehicleData.registrering;
    const motorData = vehicleData.godkjenning?.tekniskGodkjenning?.tekniskeData?.motorOgDrivverk?.[0];
    const kjoretoyId = vehicleData.kjoretoyId;
    const periodiskKontroll = vehicleData.periodiskKjoretoyKontroll;
    const karosseriOgLasteplan = vehicleData.godkjenning?.tekniskGodkjenning?.tekniskeData?.karosseriOgLasteplan;
    const dekkOgFelg = vehicleData.godkjenning?.tekniskGodkjenning?.tekniskeData?.dekkOgFelg;
    const miljodata = vehicleData.godkjenning?.tekniskGodkjenning?.tekniskeData?.miljodata;
    
    // Extract make (merke) - prioritize actual brand over vehicle category
    let make = '';
    if (tekniskData?.merke?.[0]?.merke) {
      make = tekniskData.merke[0].merke;
    } else if (tekniskData?.fabrikant?.[0]?.fabrikantNavn) {
      make = tekniskData.fabrikant[0].fabrikantNavn;
    } else if (vehicleData.godkjenning?.tekniskGodkjenning?.kjoretoyklassifisering?.beskrivelse) {
      make = vehicleData.godkjenning.tekniskGodkjenning.kjoretoyklassifisering.beskrivelse;
    }
    
    // Extract model (modell)
    let model = '';
    if (tekniskData?.handelsbetegnelse?.[0]) {
      model = tekniskData.handelsbetegnelse[0];
    } else if (tekniskData?.typebetegnelse) {
      model = tekniskData.typebetegnelse;
    }
    
    // Extract year from registration date
    let year = null;
    if (registrering?.registrertForstegangNorgeDato) {
      year = new Date(registrering.registrertForstegangNorgeDato).getFullYear();
    } else if (registrering?.forstegangRegistrertDato) {
      year = new Date(registrering.forstegangRegistrertDato).getFullYear();
    }
    
    // Extract VIN
    let vin = '';
    if (kjoretoyId?.understellsnummer) {
      vin = kjoretoyId.understellsnummer;
    }
    
    // Extract fuel type - improved logic with multiple sources
    let fuelType = '';
    if (motorData?.drivstoff?.[0]?.drivstoffKode?.beskrivelse) {
      fuelType = motorData.drivstoff[0].drivstoffKode.beskrivelse;
    } else if (motorData?.drivstoff?.[0]?.drivstoffKode?.kodeNavn) {
      fuelType = motorData.drivstoff[0].drivstoffKode.kodeNavn;
    } else if (motorData?.motor?.drivstoffKode?.beskrivelse) {
      fuelType = motorData.motor.drivstoffKode.beskrivelse;
    } else if (motorData?.motor?.drivstoffKode?.kodeNavn) {
      fuelType = motorData.motor.drivstoffKode.kodeNavn;
    } else if (vehicleData.godkjenning?.tekniskGodkjenning?.tekniskeData?.motorOgDrivverk) {
      // Check if we can find fuel type in the motor data structure
      const allMotorData = vehicleData.godkjenning.tekniskGodkjenning.tekniskeData.motorOgDrivverk;
      for (const motor of allMotorData) {
        if (motor.drivstoff?.[0]?.drivstoffKode?.beskrivelse) {
          fuelType = motor.drivstoff[0].drivstoffKode.beskrivelse;
          break;
        }
      }
    }
    
    // Special handling for known electric vehicles
    if (!fuelType && (make === 'TESLA' || model?.toLowerCase().includes('electric') || model?.toLowerCase().includes('ev'))) {
      fuelType = 'Elektrisk';
    }
    
    // Extract engine size or power
    let engineSize = '';
    if (motorData?.motor?.slagvolum) {
      engineSize = `${motorData.motor.slagvolum}L`;
    } else if (motorData?.effekt) {
      engineSize = `${motorData.effekt}kW`;
    } else if (motorData?.motor?.maksEffekt) {
      engineSize = `${motorData.motor.maksEffekt}kW`;
    }

    // Extract EU-kontroll information
    let inspectionDueDate = null;
    if (periodiskKontroll?.kontrollfrist) {
      inspectionDueDate = periodiskKontroll.kontrollfrist;
    }

    // Extract weight information
    let ownWeight = null;
    let totalWeight = null;
    if (karosseriOgLasteplan?.egenvekt) {
      ownWeight = karosseriOgLasteplan.egenvekt;
    }
    if (karosseriOgLasteplan?.tekniskTillattTotalvekt) {
      totalWeight = karosseriOgLasteplan.tekniskTillattTotalvekt;
    }

    // Extract tire and rim dimensions
    let tireDimensions = '';
    let rimDimensions = '';
    if (dekkOgFelg?.length > 0) {
      const primary = dekkOgFelg[0];
      if (primary.dekkdimensjon) {
        tireDimensions = primary.dekkdimensjon;
      }
      if (primary.felgdimensjon) {
        rimDimensions = primary.felgdimensjon;
      }
    }

    // Extract horsepower and CO2 emissions
    let horsePower = null;
    let co2Emissions = null;
    
    if (motorData?.motor?.maksEffekt) {
      // Convert kW to horsepower (1 kW = 1.36 hp approximately)
      horsePower = Math.round(motorData.motor.maksEffekt * 1.36);
    }
    
    if (miljodata?.co2Utslipp) {
      co2Emissions = miljodata.co2Utslipp;
    }

    // Extract technical approval date
    let technicalApprovalDate = null;
    if (vehicleData.godkjenning?.tekniskGodkjenning?.gyldigFraDato) {
      technicalApprovalDate = vehicleData.godkjenning.tekniskGodkjenning.gyldigFraDato;
    } else if (vehicleData.godkjenning?.godkjenningsDato) {
      technicalApprovalDate = vehicleData.godkjenning.godkjenningsDato;
    }

    const formattedData = {
      licensePlate: licensePlate,
      make: make,
      model: model,
      year: year,
      vin: vin,
      fuelType: fuelType,
      engineSize: engineSize,
      registrationDate: registrering?.registrertForstegangNorgeDato || registrering?.forstegangRegistrertDato || null,
      technicalApprovalDate: technicalApprovalDate,
      inspectionDueDate: inspectionDueDate,
      ownWeight: ownWeight,
      totalWeight: totalWeight,
      tireDimensions: tireDimensions,
      rimDimensions: rimDimensions,
      horsePower: horsePower,
      co2Emissions: co2Emissions
    }

    console.log('📋 Extracted data summary:')
    console.log('- Make:', make)
    console.log('- Model:', model) 
    console.log('- Year:', year)
    console.log('- Fuel type:', fuelType)
    console.log('- Engine size:', engineSize)
    console.log('- VIN:', vin)
    console.log('- EU-kontroll due:', inspectionDueDate)
    console.log('- Own weight:', ownWeight)
    console.log('- Total weight:', totalWeight)
    console.log('- Tire dimensions:', tireDimensions)
    console.log('- Rim dimensions:', rimDimensions)
    console.log('- Horsepower:', horsePower)
    console.log('- CO2 emissions:', co2Emissions)
    
    console.log('✅ VEGVESEN LOOKUP COMPLETED SUCCESSFULLY')

    return new Response(
      JSON.stringify(formattedData),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('❌ Error in vegvesen-lookup:', error)
    console.error('Error stack:', error.stack)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error: ' + error.message,
        stack: error.stack 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
