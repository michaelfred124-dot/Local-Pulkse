import { PageSchema } from './types';

export const PRESET_TEMPLATES: PageSchema[] = [
  {
    id: 'modern-business',
    name: 'Modern Business',
    chaiBlocks: [],
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        content: {
          title: 'Elevate Your Digital Presence',
          subtitle: 'We craft high-performance websites that turn visitors into loyal customers.',
          buttonText: 'Start Your Project',
          imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200'
        },
        style: { backgroundColor: '#ffffff', textAlign: 'center', padding: '120px 0' }
      },
      {
        id: 'features-1',
        type: 'features',
        content: {
          title: 'Why Choose Us',
          subtitle: 'Experience the difference of a professional-grade platform.',
          items: [
            { title: 'Lightning Fast', description: 'Optimized for speed and core web vitals.' },
            { title: 'SEO Ready', description: 'Built-in tools to help you rank higher on Google.' },
            { title: 'Secure Hosting', description: 'Enterprise-grade security for your peace of mind.' }
          ]
        },
        style: { backgroundColor: '#f9fafb', padding: '100px 0' }
      },
      {
        id: 'cta-1',
        type: 'cta',
        content: {
          title: 'Ready to grow your business?',
          subtitle: 'Join 500+ companies already using our platform.',
          buttonText: 'Get Started Now'
        },
        style: { backgroundColor: '#FF6B00', textColor: '#ffffff', padding: '80px 0', textAlign: 'center' }
      }
    ]
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    blocks: [
      {
        id: 'hero-2',
        type: 'hero',
        content: {
          title: 'Creative Director & Designer',
          subtitle: 'Specializing in brand identity and digital experiences.',
          buttonText: 'View Work',
          imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200'
        },
        style: { backgroundColor: '#111827', textColor: '#ffffff', textAlign: 'left', padding: '140px 0' }
      },
      {
        id: 'about-1',
        type: 'about',
        content: {
          title: 'About Me',
          description: 'With over 10 years of experience, I help brands tell their story through meaningful design.',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800'
        },
        style: { padding: '100px 0' }
      }
    ]
  }
];
