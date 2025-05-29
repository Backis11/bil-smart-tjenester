
export async function callVegvesenApi(licensePlate: string): Promise<any> {
  const vegvesenApiKey = Deno.env.get('VEGVESEN_API_KEY');
  if (!vegvesenApiKey) {
    throw new Error('Vegvesen API key not configured');
  }

  const vegvesenUrl = `https://www.vegvesen.no/ws/no/vegvesen/kjoretoy/felles/datautlevering/enkeltoppslag/kjoretoydata?kjennemerke=${licensePlate}`;
  
  console.log('🔄 Calling Vegvesen API:', vegvesenUrl);
  
  const vegvesenResponse = await fetch(vegvesenUrl, {
    headers: {
      'SVV-Authorization': `Apikey ${vegvesenApiKey}`,
      'Accept': 'application/json'
    }
  });

  const responseData = await vegvesenResponse.json();
  console.log('Vegvesen API response status:', vegvesenResponse.status);
  console.log('Vegvesen API response data:', JSON.stringify(responseData, null, 2));

  if (!vegvesenResponse.ok) {
    throw new Error(`Vegvesen API error: ${JSON.stringify(responseData)}`);
  }

  return { responseData, status: vegvesenResponse.status };
}

export async function logApiCall(supabaseClient: any, userId: string, licensePlate: string, statusCode: number, errorMsg: string | null, success: boolean) {
  await supabaseClient.rpc('log_vegvesen_api_call', {
    user_uuid: userId,
    plate: licensePlate,
    status_code: statusCode,
    error_msg: errorMsg,
    call_success: success
  });
}
