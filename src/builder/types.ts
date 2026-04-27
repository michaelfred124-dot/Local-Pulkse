import { LucideIcon } from 'lucide-react';

export type BlockType = 'hero' | 'features' | 'about' | 'pricing' | 'contact' | 'footer' | 'gallery' | 'services' | 'testimonials' | 'cta' | 'stats' | 'team' | 'faq' | 'caseStudies';

export interface BlockStyle {
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  textColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  borderRadius?: string;
  fontSize?: string;
  fontWeight?: string;
}

export interface BlockContent {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  imageUrl?: string;
  items?: any[];
  [key: string]: any;
}

export interface PageBlock {
  id: string;
  type: BlockType;
  content: BlockContent;
  style: BlockStyle;
}

export interface PageSchema {
  id: string;
  name: string;
  blocks: PageBlock[]; // for backward compatibility
  chaiBlocks?: any[];  // new Chai format
  designTokens?: any; // for Chai design tokens
  theme?: any;       // for Chai theme
  plasmicProjectId?: string; // for plasmic integration
  plasmicApiToken?: string;  // for plasmic integration
  globalStyle?: {
    fontFamily?: string;
    primaryColor?: string;
    secondaryColor?: string;
  };
}

export interface BlockDefinition {
  type: BlockType;
  label: string;
  icon: LucideIcon;
  defaultContent: BlockContent;
  defaultStyle: BlockStyle;
}
