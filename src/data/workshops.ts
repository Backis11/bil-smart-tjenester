
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

export const norwegianWorkshops: Workshop[] = [
  // Oslo workshops
  {
    id: 1,
    name: "Olsens Bil AS",
    address: "Storgata 15",
    city: "Oslo",
    postalCode: "0155",
    phone: "+47 22 33 44 55",
    email: "post@olsensbil.no",
    rating: 4.8,
    reviewCount: 124,
    description: "Familiedrevet verksted med over 40 års erfaring. Spesialiserer seg på Toyota og Volkswagen.",
    openingHours: "Man-Fre 08:00-17:00, Lør 09:00-15:00",
    services: ["Service", "EU-kontroll", "Dekkskift", "Bremseservice", "Klimaanlegg"],
    priceRange: "Fra 850 kr",
    specialties: ["Toyota", "Volkswagen", "Hybrid"],
    distance: "0.5 km",
    latitude: 59.9139,
    longitude: 10.7522,
    image: "/api/placeholder/80/80",
    featured: true,
    certifications: ["ASF", "Toyota Service", "Bosch Service"]
  },
  {
    id: 2,
    name: "Service Express",
    address: "Industrigata 23",
    city: "Oslo",
    postalCode: "0357",
    phone: "+47 22 44 55 66",
    email: "booking@serviceexpress.no",
    rating: 4.6,
    reviewCount: 89,
    description: "Rask og pålitelig service med fokus på kundetilfredshet. Moderne utstyr og erfarne mekanikere.",
    openingHours: "Man-Fre 07:30-18:00, Lør 08:00-16:00",
    services: ["Service", "Lakkreparatur", "Kollisjon", "Bilglass", "Felgreparasjon"],
    priceRange: "Fra 750 kr",
    specialties: ["Lakkreparatur", "Kollisjon", "Forsikringsjobber"],
    distance: "1.2 km",
    latitude: 59.9242,
    longitude: 10.7587,
    image: "/api/placeholder/80/80",
    featured: false,
    certifications: ["Spies Hecker", "Autoliv", "Pilkington"]
  },
  {
    id: 3,
    name: "Auto Nordica",
    address: "Bilveien 7",
    city: "Oslo",
    postalCode: "0581",
    phone: "+47 22 55 66 77",
    email: "info@autonordica.no",
    rating: 4.9,
    reviewCount: 156,
    description: "Premiumverksted for tyske biler. Autorisert BMW, Mercedes og Audi service.",
    openingHours: "Man-Fre 08:00-16:00",
    services: ["Service", "EU-kontroll", "Dekkskift", "Diagnostikk", "Software-oppdatering"],
    priceRange: "Fra 920 kr",
    specialties: ["BMW", "Mercedes", "Audi", "Diagnostikk"],
    distance: "2.1 km",
    latitude: 59.9311,
    longitude: 10.7458,
    image: "/api/placeholder/80/80",
    featured: true,
    certifications: ["BMW Service", "Mercedes Service", "Audi Service"]
  },
  {
    id: 4,
    name: "Mekonomen Autocare Majorstuen",
    address: "Valkyriegata 3",
    city: "Oslo",
    postalCode: "0366",
    phone: "+47 23 19 90 00",
    email: "majorstuen@mekonomen.no",
    rating: 4.4,
    reviewCount: 203,
    description: "Del av Nordens største verkstedkjede. Kvalitetsgaranti og riksdekkende service.",
    openingHours: "Man-Fre 08:00-17:00, Lør 09:00-14:00",
    services: ["Service", "EU-kontroll", "Dekkskift", "Bremseservice", "Eksosanlegg"],
    priceRange: "Fra 795 kr",
    specialties: ["Alle bilmerker", "Garanti", "Originaldeler"],
    distance: "1.8 km",
    latitude: 59.9267,
    longitude: 10.7192,
    image: "/api/placeholder/80/80",
    featured: false,
    certifications: ["Mekonomen Quality", "Bosch Service", "NGK"]
  },
  {
    id: 5,
    name: "Bilxtra Grünerløkka",
    address: "Thorvald Meyers gate 45",
    city: "Oslo",
    postalCode: "0552",
    phone: "+47 22 87 05 50",
    email: "grunerlokka@bilxtra.no",
    rating: 4.5,
    reviewCount: 167,
    description: "Lokalt verksted med personlig service. Spesialiserer seg på eldre biler og klassikere.",
    openingHours: "Man-Fre 08:00-16:30, Lør 09:00-13:00",
    services: ["Service", "Restaurering", "Dekkskift", "Rust-behandling", "Veteranbiler"],
    priceRange: "Fra 680 kr",
    specialties: ["Klassiske biler", "Restaurering", "Rust-behandling"],
    distance: "2.3 km",
    latitude: 59.9226,
    longitude: 10.7559,
    image: "/api/placeholder/80/80",
    featured: false,
    certifications: ["Klassisk bil", "Rust-spesialist"]
  },

  // Bergen workshops
  {
    id: 6,
    name: "Bergen Bilservice",
    address: "Nesttunveien 12",
    city: "Bergen",
    postalCode: "5221",
    phone: "+47 55 50 60 70",
    email: "post@bergenbilservice.no",
    rating: 4.7,
    reviewCount: 98,
    description: "Vest-Norges ledende verksted for personbiler. Over 30 års erfaring.",
    openingHours: "Man-Fre 07:30-17:00, Lør 08:00-15:00",
    services: ["Service", "EU-kontroll", "Dekkskift", "Motor-reparasjon", "Girkasse"],
    priceRange: "Fra 820 kr",
    specialties: ["Motor-reparasjon", "Automatgirkasse", "Diesel"],
    distance: "0.8 km",
    latitude: 60.3913,
    longitude: 5.3221,
    image: "/api/placeholder/80/80",
    featured: true,
    certifications: ["ZF Service", "Castrol", "Mann Filter"]
  },
  {
    id: 7,
    name: "Fana Auto AS",
    address: "Fanavegen 89",
    city: "Bergen",
    postalCode: "5244",
    phone: "+47 55 59 12 34",
    email: "service@fanaauto.no",
    rating: 4.3,
    reviewCount: 145,
    description: "Autorisert Ford og Volvo verksted. Moderne fasiliteter og sertifiserte teknikere.",
    openingHours: "Man-Fre 08:00-16:00",
    services: ["Service", "EU-kontroll", "Garantiarbeid", "Software", "Elektronikk"],
    priceRange: "Fra 890 kr",
    specialties: ["Ford", "Volvo", "Elektronikk", "Diagnostikk"],
    distance: "3.2 km",
    latitude: 60.3698,
    longitude: 5.3045,
    image: "/api/placeholder/80/80",
    featured: false,
    certifications: ["Ford Service", "Volvo Service", "Autocom"]
  },

  // Trondheim workshops
  {
    id: 8,
    name: "Trondheim Bil & Motor",
    address: "Innherredsveien 15",
    city: "Trondheim",
    postalCode: "7067",
    phone: "+47 73 82 90 00",
    email: "post@trondheimbil.no",
    rating: 4.6,
    reviewCode: 87,
    description: "Midt-Norges største uavhengige verksted. Alle typer reparasjoner og service.",
    openingHours: "Man-Fre 07:00-17:00, Lør 08:00-14:00",
    services: ["Service", "EU-kontroll", "Dekkskift", "Bremseservice", "Kobling"],
    priceRange: "Fra 760 kr",
    specialties: ["Kobling", "Bremser", "Understell"],
    distance: "1.5 km",
    latitude: 63.4305,
    longitude: 10.3951,
    image: "/api/placeholder/80/80",
    featured: false,
    certifications: ["Sachs", "LuK", "Brembo"]
  },

  // Continue with more workshops across Norway...
  {
    id: 9,
    name: "Stavanger Motorservice",
    address: "Kannikveien 22",
    city: "Stavanger",
    postalCode: "4033",
    phone: "+47 51 87 65 43",
    email: "booking@stavangermotorservice.no",
    rating: 4.8,
    reviewCount: 112,
    description: "Spesialiserer seg på motorsport og performance-tuning. Også vanlig service.",
    openingHours: "Man-Fre 08:00-17:00",
    services: ["Service", "Tuning", "Performance", "Turbo", "Intercooler"],
    priceRange: "Fra 950 kr",
    specialties: ["Performance", "Tuning", "Turbo", "Racing"],
    distance: "2.7 km",
    latitude: 58.9700,
    longitude: 5.7331,
    image: "/api/placeholder/80/80",
    featured: true,
    certifications: ["APR", "Revo", "Garrett Motion"]
  },
  {
    id: 10,
    name: "Kristiansand Bilverksted",
    address: "Vesterveien 102",
    city: "Kristiansand",
    postalCode: "4612",
    phone: "+47 38 14 25 36",
    email: "post@kristiansandbil.no",
    rating: 4.4,
    reviewCount: 76,
    description: "Sør-Norges mest kundevennlige verksted. Fokus på ærlig rådgivning.",
    openingHours: "Man-Fre 08:00-16:30, Lør 09:00-13:00",
    services: ["Service", "EU-kontroll", "Dekkskift", "Aircondition", "Geometri"],
    priceRange: "Fra 720 kr",
    specialties: ["Aircondition", "Geometri", "Understell"],
    distance: "1.1 km",
    latitude: 58.1467,
    longitude: 7.9956,
    image: "/api/placeholder/80/80",
    featured: false,
    certifications: ["Valeo", "Denso", "Hunter"]
  }

  // Add more workshops here to reach 200-300 total...
  // For brevity, I'll add a few more key ones and indicate where more would go
];

// Generate additional workshops programmatically to reach 200-300
const generateAdditionalWorkshops = (): Workshop[] => {
  const cities = [
    { name: "Oslo", lat: 59.9139, lng: 10.7522 },
    { name: "Bergen", lat: 60.3913, lng: 5.3221 },
    { name: "Trondheim", lat: 63.4305, lng: 10.3951 },
    { name: "Stavanger", lat: 58.9700, lng: 5.7331 },
    { name: "Kristiansand", lat: 58.1467, lng: 7.9956 },
    { name: "Fredrikstad", lat: 59.2181, lng: 10.9298 },
    { name: "Drammen", lat: 59.7439, lng: 10.2045 },
    { name: "Sarpsborg", lat: 59.2839, lng: 11.1098 },
    { name: "Skien", lat: 59.2086, lng: 9.6067 },
    { name: "Ålesund", lat: 62.4722, lng: 6.1495 }
  ];

  const workshopTypes = [
    "Bil & Motor", "Autoservice", "Bilverksted", "Motorservice", "Autocare",
    "Bilsenter", "Motorverksted", "Service", "Bilreparasjon", "Autotech"
  ];

  const serviceTypes = [
    ["Service", "EU-kontroll", "Dekkskift"],
    ["Bremseservice", "Eksosanlegg", "Kobling"],
    ["Lakkreparatur", "Kollisjon", "Bilglass"],
    ["Diagnostikk", "Elektronikk", "Software"],
    ["Motor-reparasjon", "Turbo", "Performance"],
    ["Aircondition", "Geometri", "Understell"],
    ["Rust-behandling", "Restaurering", "Veteranbiler"]
  ];

  const specialties = [
    ["Toyota", "Honda", "Nissan"],
    ["BMW", "Mercedes", "Audi"],
    ["Volkswagen", "Skoda", "Seat"],
    ["Ford", "Volvo", "Peugeot"],
    ["Hyundai", "Kia", "Mazda"],
    ["Alle bilmerker", "Garanti", "Originaldeler"]
  ];

  const additionalWorkshops: Workshop[] = [];
  
  for (let i = 11; i <= 250; i++) {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const workshopType = workshopTypes[Math.floor(Math.random() * workshopTypes.length)];
    const services = serviceTypes[Math.floor(Math.random() * serviceTypes.length)];
    const specialty = specialties[Math.floor(Math.random() * specialties.length)];
    
    additionalWorkshops.push({
      id: i,
      name: `${city.name} ${workshopType}`,
      address: `Testveien ${Math.floor(Math.random() * 200) + 1}`,
      city: city.name,
      postalCode: `${Math.floor(Math.random() * 9000) + 1000}`,
      phone: `+47 ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90) + 10}`,
      email: `post@${city.name.toLowerCase()}${workshopType.toLowerCase().replace(/\s+/g, '')}.no`,
      rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
      reviewCount: Math.floor(Math.random() * 200) + 20,
      description: `Kvalitetsverksted i ${city.name} med erfarne mekanikere og moderne utstyr.`,
      openingHours: "Man-Fre 08:00-16:00",
      services: [...services, "Dekkskift", "Service"],
      priceRange: `Fra ${Math.floor(Math.random() * 400) + 600} kr`,
      specialties: specialty,
      distance: `${(Math.random() * 10 + 0.5).toFixed(1)} km`,
      latitude: city.lat + (Math.random() - 0.5) * 0.1,
      longitude: city.lng + (Math.random() - 0.5) * 0.1,
      image: "/api/placeholder/80/80",
      featured: Math.random() > 0.85,
      certifications: ["ASF", "Bosch Service"]
    });
  }
  
  return additionalWorkshops;
};

export const allWorkshops = [...norwegianWorkshops, ...generateAdditionalWorkshops()];

export const getWorkshopsByCity = (city: string) => {
  return allWorkshops.filter(workshop => 
    workshop.city.toLowerCase() === city.toLowerCase()
  );
};

export const getWorkshopsByService = (service: string) => {
  return allWorkshops.filter(workshop => 
    workshop.services.some(s => s.toLowerCase().includes(service.toLowerCase()))
  );
};

export const getFeaturedWorkshops = () => {
  return allWorkshops.filter(workshop => workshop.featured);
};
