export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  iconName: string;
  badge: string;
}

export interface TargetAudience {
  id: string;
  name: string;
  category: 'residential' | 'commercial' | 'industrial' | 'government';
  iconName: string;
  headline: string;
  painPoints: string[];
  solutions: string[];
  recommendedSetup: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Industrial' | 'Government';
  location: string;
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
  date: string;
}

export interface ServiceArea {
  name: string;
  coverage: 'Full Coverage' | 'High Availability' | 'Same-Day Dispatch';
  deliveryTime: string;
  popularServices: string[];
}
