import { LucideIcon } from "lucide-react";

export type Page = 'home' | 'gallery' | 'about' | 'start-project' | 'dashboard' | 'login' | 'admin-dashboard' | 'preview';

export interface NavItem {
  label: string;
  href: string;
  action?: 'scroll' | 'page'; // To distinguish between anchor links and page switches
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  colSpan?: string;
  bg?: string;
  textColor?: string;
}

export interface PortfolioItem {
  id: number;
  templateId?: string;
  title: string;
  category: string;
  imageUrl?: string;
  prompt?: string;
  hours?: string[];
  faqs?: { question: string; answer: string }[];
  reviews?: { name: string; role: string; content: string; rating: number }[];
  services?: { title: string; description: string; price?: string }[];
  menu?: { name: string; description: string; price: string; category: string }[];
  features?: { title: string; icon: any; desc: string }[];
  advantagePoints?: string[];
  featureHeadline?: string;
  featureSubheadline?: string;
  advantageHeadline?: string;
  advantageSubheadline?: string;
  advantageDescription?: string;
  dashboardTitle?: string;
  dashboardDescription?: string;
  dashboardMetricLabel?: string;
  reviewsHeadline?: string;
  galleryImages?: string[];
  heroHeadline?: string;
  heroSubheadline?: string;
  aboutText?: string;
  contactEmail?: string;
  contactPhone?: string;
  logo?: string;
  location?: string;
  vibe?: string;
  servicesText?: string;
  socialLinks?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  prompt?: string;
}
