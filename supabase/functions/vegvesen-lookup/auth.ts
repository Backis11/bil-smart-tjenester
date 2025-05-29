
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

export async function authenticateUser(authHeader: string | null) {
  if (!authHeader) {
    throw new Error('No authorization header found');
  }

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    { global: { headers: { Authorization: authHeader } } }
  );

  const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
  
  if (authError) {
    throw new Error('Authentication failed: ' + authError.message);
  }
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  return { user, supabaseClient };
}

export async function checkAndIncrementQuota(supabaseClient: any, userId: string, licensePlate: string) {
  const { data: quotaCheck, error: quotaError } = await supabaseClient.rpc('check_api_quota', { 
    user_uuid: userId 
  });
  
  if (quotaError) {
    throw new Error('Failed to check quota: ' + quotaError.message);
  }
  
  if (!quotaCheck) {
    await supabaseClient.rpc('log_vegvesen_api_call', {
      user_uuid: userId,
      plate: licensePlate,
      status_code: 429,
      error_msg: 'Daily quota exceeded (10 requests)',
      call_success: false
    });

    throw new Error('Daily quota exceeded. You can make maximum 10 requests per day.');
  }

  const { error: incrementError } = await supabaseClient.rpc('increment_api_quota', { user_uuid: userId });
  if (incrementError) {
    console.error('⚠️ Failed to increment quota:', incrementError);
  }
}
