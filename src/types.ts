export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  priceNumeric: number; // For filtering
  status: 'Available' | 'Sold' | 'Rented';
  type: 'Penthouse' | 'Heritage Villa' | 'Smart Mansion' | 'Urban Duplex' | 'Waterfront Retreat' | 'Sky Villa';
  bedrooms: number;
  bathrooms: number;
  area: string; // e.g. "6,200 Sq.Ft."
  mainImage: string;
  galleryImages: string[];
  description: string;
  features: string[];
  specs: { [key: string]: string };
  mapsLocation: string; // descriptive map location name
  virtualStagingConcepts: {
    style: string;
    description: string;
    image: string; // The staged look
    beforeImage: string; // The raw shell look
  }[];
  coordinates: { lat: number; lng: number }; // Relative map positioning if needed
}

export interface Inquiry {
  id: string;
  propertyId?: string;
  propertyName?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Closed';
  category: 'General' | 'Property Inquiry' | 'Schedule Visit' | 'Request Callback' | 'Newsletter';
  preferredTime?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  text: string;
  propertyPurchased: string;
  avatar: string;
  rating: number; // e.g. 5
}
