
import { supabase } from "@/integrations/supabase/client";
import type { Workshop, WorkshopCSVRow, WorkshopSearchFilters } from "@/types/workshop";

export const workshopService = {
  async searchWorkshops(filters: WorkshopSearchFilters): Promise<Workshop[]> {
    let query = supabase
      .from('workshops')
      .select('id, name, address, certifications, org_number, approval_number, created_at, updated_at')
      .order('name');

    if (filters.certification) {
      query = query.contains('certifications', [filters.certification]);
    }

    if (filters.location) {
      query = query.or(`address.ilike.%${filters.location}%,city.ilike.%${filters.location}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error searching workshops:', error);
      throw error;
    }

    // Map database results to Workshop interface
    return (data || []).map(workshop => ({
      id: workshop.id,
      name: workshop.name,
      address: workshop.address,
      certifications: workshop.certifications || [],
      org_number: workshop.org_number,
      approval_number: workshop.approval_number,
      created_at: workshop.created_at,
      updated_at: workshop.updated_at
    }));
  },

  async importWorkshopsFromCSV(csvData: WorkshopCSVRow[]): Promise<void> {
    const workshopsToInsert = csvData.map(row => ({
      name: row.name.trim(),
      address: row.address.trim(),
      city: 'Unknown', // Default value since it's required
      postal_code: '0000', // Default value since it's required
      certifications: row.certifications.split(',').map(cert => cert.trim()).filter(Boolean),
      org_number: row.Organisasjonsnummer ? String(row.Organisasjonsnummer) : null,
      approval_number: row.Godkjenningsnummer ? Number(row.Godkjenningsnummer) : null
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
      .select('id, name, address, certifications, org_number, approval_number, created_at, updated_at')
      .order('name');

    if (error) {
      console.error('Error fetching workshops:', error);
      throw error;
    }

    // Map database results to Workshop interface
    return (data || []).map(workshop => ({
      id: workshop.id,
      name: workshop.name,
      address: workshop.address,
      certifications: workshop.certifications || [],
      org_number: workshop.org_number,
      approval_number: workshop.approval_number,
      created_at: workshop.created_at,
      updated_at: workshop.updated_at
    }));
  }
};
