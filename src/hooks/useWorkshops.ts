
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Workshop } from '@/types/workshop';

export const useWorkshops = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWorkshops = async () => {
    try {
      setIsLoading(true);
      
      // Get total count
      const { count, error: countError } = await supabase
        .from('workshops')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      if (countError) {
        console.error('Error fetching workshop count:', countError);
      } else {
        setTotalCount(count || 0);
      }

      // Get workshop data
      const { data, error } = await supabase
        .from('workshops')
        .select('id, name, address, city, org_number, certifications, created_at, updated_at')
        .eq('is_active', true)
        .order('name');

      if (error) {
        console.error('Error fetching workshops:', error);
        setWorkshops([]);
      } else {
        // Map the data to ensure all required fields are present
        const mappedData: Workshop[] = (data || []).map(workshop => ({
          id: workshop.id,
          name: workshop.name,
          address: workshop.address,
          city: workshop.city,
          org_number: workshop.org_number,
          certifications: workshop.certifications || [],
          created_at: workshop.created_at,
          updated_at: workshop.updated_at,
        }));
        setWorkshops(mappedData);
      }
    } catch (error) {
      console.error('Failed to fetch workshops:', error);
      setWorkshops([]);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  return {
    workshops,
    totalCount,
    isLoading,
    refreshWorkshops: fetchWorkshops
  };
};
