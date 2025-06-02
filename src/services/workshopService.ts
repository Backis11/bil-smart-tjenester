
import { supabase } from "@/integrations/supabase/client";
import type { Workshop, WorkshopCSVRow, WorkshopSearchFilters } from "@/types/workshop";

export const workshopService = {
  async searchWorkshops(filters: WorkshopSearchFilters): Promise<Workshop[]> {
    let query = supabase
      .from('workshops')
      .select('*')
      .order('name');

    if (filters.certification) {
      query = query.contains('certifications', [filters.certification]);
    }

    if (filters.location) {
      query = query.ilike('address', `%${filters.location}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error searching workshops:', error);
      throw error;
    }

    return data || [];
  },

  async importWorkshopsFromCSV(csvData: WorkshopCSVRow[]): Promise<void> {
    const workshopsToInsert = csvData.map(row => ({
      name: row.name.trim(),
      address: row.address.trim(),
      certifications: row.certifications.split(',').map(cert => cert.trim()).filter(Boolean),
      org_number: row.Organisasjonsnummer ? parseInt(row.Organisasjonsnummer) : null,
      approval_number: row.Godkjenningsnummer ? parseInt(row.Godkjenningsnummer) : null
    }));

    const { error } = await supabase
      .from('workshops')
      .insert(workshopsToInsert);

    if (error) {
      console.error('Error importing workshops:', error);
      throw error;
    }
  },

  async getAllWorkshops(): Promise<Workshop[]> {
    const { data, error } = await supabase
      .from('workshops')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching workshops:', error);
      throw error;
    }

    return data || [];
  }
};
