
export interface Workshop {
  id: string;
  name: string;
  address: string;
  certifications: string[];
  org_number?: number;
  approval_number?: number;
  created_at: string;
  updated_at: string;
}

export interface WorkshopCSVRow {
  name: string;
  address: string;
  certifications: string;
  Organisasjonsnummer: string;
  Godkjenningsnummer: string;
}

export interface WorkshopSearchFilters {
  certification?: string;
  location?: string;
}
