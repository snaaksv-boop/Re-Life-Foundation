export interface OrganizationInfo {
  name: string;
  tagline: string;
  subTagline: string;
  phone: string;
  phoneFormatted: string;
  whatsappNumber: string;
  whatsappLink: string;
  email: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  registrationNo: string;
  hours: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
  };
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'All' | 'Centre' | 'Counselling' | 'Activities' | 'Wellness' | 'Accommodation' | 'Events';
  description: string;
  date?: string;
  imageUrl: string;
  createdAt?: number;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  category: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration?: string;
}

export interface TreatmentProgram {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: 'heart-handshake' | 'users' | 'stethoscope' | 'flower2' | 'shield-check' | 'activity';
  features: string[];
}

export interface FacilityItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  highlights: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  relationship: string;
  content: string;
  rating: number;
  date?: string;
}

export interface RecoveryStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface FounderInfo {
  name: string;
  title: string;
  organization: string;
  message: string;
  quote: string;
  photoUrl: string | null; // null triggers the upload placeholder
}

export interface ContactSubmission {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  personSeekingSupport: 'Self' | 'Family Member' | 'Friend' | 'Colleague' | 'Other';
  preferredContactMethod: 'Call' | 'WhatsApp' | 'Email';
  message: string;
  timestamp: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Archived';
}

export interface SiteNotice {
  id: string;
  title: string;
  content: string;
  date: string;
  active: boolean;
}

export interface AboutSectionData {
  title: string;
  badge: string;
  description: string;
  bullets: string[];
  videoUrl: string;
  videoPoster: string;
  videoTitle: string;
}

export interface AuthCredentials {
  username: string;
  password: string;
}
