export interface RegistrationStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface PropertyType {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Amenity {
  id: string;
  name: string;
  category: string;
  icon: string;
}

export interface HostRegistrationData {
  // Étape 1: Informations personnelles
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  country:string,
  city:string,
  // Étape 2: Détails de la propriété
  propertyType: string;
  address: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  maxGuests: number;
  description: string;

  // Étape 3: Équipements et services
  amenities: string[];
  additionalServices: string[];

  // Étape 4: Photos
  images: File[];

  // Étape 5: Disponibilité
  availabilityCalendar: Date[];
  minStayDuration: number;
  maxStayDuration: number;
  bookingNotice: string;

  // Étape 6: Tarification
  pricePerNight: number;
  seasonalPricing: boolean;
  longStayDiscounts: boolean;
}
export interface PropertyData {
  // Étape 2: Détails de la propriété
  title:string;
  propertyType: string;
  address: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  maxGuests: number;
  description: string;
  country:string;
  city:string;
  googleMapsUrl:string;
  lat:number;
  lang:number;
  // Étape 3: Équipements et services
  amenities: string[];
  additionalServices: string[];

  // Étape 4: Photos
  images: File[];

  // Étape 5: Disponibilité
  availabilityCalendar: Date[];
  minStayDuration: number;
  maxStayDuration: number;
  bookingNotice: string;

  // Étape 6: Tarification
  pricePerNight: number;
  seasonalPricing: boolean;
  longStayDiscounts: boolean;
}
export interface RegistrationStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface PropertyType {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Amenity {
  id: string;
  name: string;
  category: string;
  icon: string;
}
