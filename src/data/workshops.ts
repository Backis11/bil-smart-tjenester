
import { supabase } from "@/integrations/supabase/client";

export interface Workshop {
  id: number;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  description: string;
  openingHours: string;
  services: string[];
  priceRange: string;
  specialties: string[];
  distance?: string;
  latitude: number;
  longitude: number;
  image: string;
  featured: boolean;
  certifications: string[];
}

export const fetchWorkshops = async (): Promise<Workshop[]> => {
  try {
    console.log('Fetching workshops from Supabase...');
    
    const { data, error } = await supabase
      .from('workshops')
      .select('id, name, city, address, org_number, certifications')
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Error fetching workshops:', error);
      throw error;
    }

    console.log('Workshops fetched from Supabase:', data?.length);

    // Map Supabase data to Workshop interface
    return (data || []).map(workshop => ({
      id: parseInt(workshop.id),
      name: workshop.name,
      address: workshop.address,
      city: workshop.city || 'Unknown',
      postalCode: '0000', // Default value
      phone: '+47 00 00 00 00', // Default value
      email: 'contact@workshop.no', // Default value
      rating: 4.5,
      reviewCount: 0,
      description: `Kvalitetsverksted i ${workshop.city || 'Norge'} med moderne utstyr og erfarne mekanikere.`,
      openingHours: "Man-Fre 08:00-16:00",
      services: ["Service", "EU-kontroll", "Dekkskift"],
      priceRange: "Fra 750 kr",
      specialties: workshop.certifications || [],
      latitude: 59.9139,
      longitude: 10.7522,
      image: "/api/placeholder/80/80",
      featured: false,
      certifications: workshop.certifications || []
    }));
  } catch (error) {
    console.error('Failed to fetch workshops:', error);
    return [];
  }
};

// For backward compatibility, export an async function that returns workshops
export const getAllWorkshops = fetchWorkshops;

// Legacy exports for components that might still use them
export const allWorkshops: Workshop[] = [];
export const norwegianWorkshops: Workshop[] = [];

export const getWorkshopsByCity = async (city: string): Promise<Workshop[]> => {
  const workshops = await fetchWorkshops();
  return workshops.filter(workshop => 
    workshop.city.toLowerCase() === city.toLowerCase()
  );
};

export const getWorkshopsByService = async (service: string): Promise<Workshop[]> => {
  const workshops = await fetchWorkshops();
  return workshops.filter(workshop => 
    workshop.services.some(s => s.toLowerCase().includes(service.toLowerCase()))
  );
};

export const getFeaturedWorkshops = async (): Promise<Workshop[]> => {
  const workshops = await fetchWorkshops();
  return workshops.filter(workshop => workshop.featured);
};
