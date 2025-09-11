import {  Amenity } from '@/lib/types';

import { PropertyType } from '@prisma/client'; // or wherever your enum is defined

export const PROPERTY_TYPES: { id: PropertyType; name: string; description: string; icon: string }[] = [
  {
    id: PropertyType.APARTMENT,
    name: 'Appartement',
    description: 'Un logement dans un immeuble résidentiel',
    icon: 'Building',
  },
  {
    id: PropertyType.HOUSE,
    name: 'Maison',
    description: 'Une maison individuelle complète',
    icon: 'Home',
  },
  {
    id: PropertyType.CHAMBREPRIVE,
    name: 'Chambre privée',
    description: 'Une chambre privée dans un logement partagé',
    icon: 'Bed',
  },
  {
    id: PropertyType.VILLA,
    name: 'Villa',
    description: 'Une villa de luxe avec jardin',
    icon: 'TreePine',
  },
  {
    id: PropertyType.STUDIO,
    name: 'Studio',
    description: 'Un studio compact et fonctionnel',
    icon: 'Square',
  },
  {
    id: PropertyType.CABANE,
    name: 'Cabane',
    description: 'Une petite cabane typique pour une expérience unique',
    icon: 'Tent',
  },
];


export const AMENITIES: Amenity[] = [
  // Essentiels
  {
    id: 'wifi',
    name: 'Wi-Fi',
    category: 'Essentiels',
    icon: 'Wifi'
  },
  {
    id: 'kitchen',
    name: 'Cuisine',
    category: 'Essentiels',
    icon: 'ChefHat'
  },
  {
    id: 'parking',
    name: 'Parking gratuit',
    category: 'Essentiels',
    icon: 'Car'
  },
  {
    id: 'air_conditioning',
    name: 'Climatisation',
    category: 'Essentiels',
    icon: 'Snowflake'
  },
  {
    id: 'heating',
    name: 'Chauffage',
    category: 'Essentiels',
    icon: 'Flame'
  },
  
  // Divertissement
  {
    id: 'tv',
    name: 'Télévision',
    category: 'Divertissement',
    icon: 'Tv'
  },
  {
    id: 'netflix',
    name: 'Netflix',
    category: 'Divertissement',
    icon: 'Play'
  },
  
  // Extérieur
  {
    id: 'pool',
    name: 'Piscine',
    category: 'Extérieur',
    icon: 'Waves'
  },
  {
    id: 'garden',
    name: 'Jardin',
    category: 'Extérieur',
    icon: 'Trees'
  },
  {
    id: 'balcony',
    name: 'Balcon',
    category: 'Extérieur',
    icon: 'Building2'
  },
  
  // Sécurité
  {
    id: 'smoke_detector',
    name: 'Détecteur de fumée',
    category: 'Sécurité',
    icon: 'Shield'
  },
  {
    id: 'fire_extinguisher',
    name: 'Extincteur',
    category: 'Sécurité',
    icon: 'ShieldCheck'
  },
  {
    id: 'security_cameras',
    name: 'Caméras de sécurité',
    category: 'Sécurité',
    icon: 'Camera'
  }
];

export const ADDITIONAL_SERVICES = [
  {
    id: 'breakfast',
    name: 'Petit-déjeuner inclus',
    icon: 'Coffee'
  },
  {
    id: 'cleaning',
    name: 'Ménage quotidien',
    icon: 'Sparkles'
  },
  {
    id: 'airport_transfer',
    name: 'Transfert aéroport',
    icon: 'Plane'
  },
  {
    id: 'concierge',
    name: 'Service de conciergerie',
    icon: 'Bell'
  }
];

export const BOOKING_NOTICE_OPTIONS = [
  { value: 'none', label: 'Aucun préavis' },
  { value: '1_day', label: '1 jour' },
  { value: '3_days', label: '3 jours' },
  { value: '1_week', label: '1 semaine' },
  { value: '2_weeks', label: '2 semaines' },
  { value: '1_month', label: '1 mois' }
];

export const REGISTRATION_STEPS = [
  {
    id: 1,
    title: 'Bienvenue',
    description: 'Introduction et présentation'
  },
  {
    id: 2,
    title: 'Informations personnelles',
    description: 'Vos coordonnées'
  },
  {
    id: 3,
    title: 'Détails de la propriété',
    description: 'Caractéristiques de votre logement'
  },
  {
    id: 4,
    title: 'Équipements',
    description: 'Services et commodités'
  },
  {
    id: 5,
    title: 'Photos',
    description: 'Images de votre propriété'
  },
  {
    id: 6,
    title: 'Disponibilité',
    description: 'Calendrier et règles'
  },
  {
    id: 7,
    title: 'Tarification',
    description: 'Prix et revenus'
  },
  {
    id: 8,
    title: 'Finalisation',
    description: 'Vérification et publication'
  }
];
export const PRPERTIE_STEPS = [
  
  {
    id: 1,
    title: 'Détails de la propriété',
    description: 'Caractéristiques de votre logement'
  },
  {
    id: 2,
    title: 'Équipements',
    description: 'Services et commodités'
  },
  {
    id: 3,
    title: 'Photos',
    description: 'Images de votre propriété'
  },
  {
    id: 4,
    title: 'Disponibilité',
    description: 'Calendrier et règles'
  },
  {
    id: 5,
    title: 'Tarification',
    description: 'Prix et revenus'
  },
  {
    id: 6,
    title: 'Finalisation',
    description: 'Vérification et publication'
  }
];