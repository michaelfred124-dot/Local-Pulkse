import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Zap, Globe, Layout, Building, Loader2, Monitor, Smartphone, Shield, Image as ImageIcon, Upload, X, Eye, ChevronDown, Search, Sparkles, Edit3 } from 'lucide-react';
import { Page, PortfolioItem } from '../types';
import { TemplateRenderer, TemplateMiniPreview } from './TemplateRenderer';
import { auth, db, storage, handleFirestoreError, OperationType } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { GoogleGenAI, Type } from "@google/genai";

interface StartProjectProps {
  onNavigate: (page: Page) => void;
  onPreview: (project: any, content: any) => void;
  onPlanSelect: (id: string) => void;
  onMaintenanceSelect: (enabled: boolean) => void;
  onProjectCreate: (id: string) => void;
  initialTemplateId?: string;
}

const TEMPLATES = [
  { 
    id: 'auto-detailing', 
    name: 'Easy Does It Detailing', 
    vibe: 'High-Energy',
    badge: 'Featured',
    desc: 'High-energy mobile service platform with vibrant branding and easy booking.', 
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d59085?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 'local-1', 
    name: 'The Local Boutique', 
    vibe: 'Sophisticated',
    badge: 'New',
    desc: 'Warm, organic design for local boutiques, specialty shops, and artisanal services.', 
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 'construction', 
    name: 'Pro Construction', 
    vibe: 'Professional',
    badge: 'New',
    desc: 'Rugged, reliable design for general contractors, builders, and renovation experts.', 
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 'bakery', 
    name: 'Sweet Delights Bakery', 
    vibe: 'Warm',
    badge: 'New',
    desc: 'Charming, inviting layout for bakeries, cafes, and artisanal food shops.', 
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 'dentist', 
    name: 'Modern Dental Care', 
    vibe: 'Clean',
    badge: 'New',
    desc: 'Trustworthy, sterile design for dentists, clinics, and medical professionals.', 
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 'lawncare', 
    name: 'Green Horizon Lawn Care', 
    vibe: 'Fresh',
    badge: 'New',
    desc: 'Vibrant, clean design for landscaping, lawn maintenance, and garden services.', 
    image: 'https://images.unsplash.com/photo-1558904541-efa8c1965f1e?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 'modern', 
    name: 'Modern SaaS', 
    vibe: 'Modern',
    badge: 'Premium',
    desc: 'Bold, high-contrast design for tech startups, apps, and modern digital brands.', 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 'service', 
    name: 'Home Services', 
    vibe: 'Service',
    badge: 'Popular',
    desc: 'Built for plumbers, electricians, and contractors to capture leads quickly.', 
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 'wellness', 
    name: 'Mind & Body Wellness', 
    vibe: 'Wellness',
    badge: 'Premium',
    desc: 'Inspired by Mind Body Reeducation. A calming, therapeutic design for wellness centers.', 
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 'artisan', 
    name: 'Artisan Metalwork', 
    vibe: 'Crafts',
    badge: 'Unique',
    desc: 'Inspired by Forge Spark. Showcase handcrafted metal figurines and artistic creations.', 
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 'restaurant', 
    name: 'Restaurant & Dining', 
    vibe: 'Hospitality',
    badge: 'LocalLaunch',
    desc: 'Perfect for cafes, bistros, and fine dining with menu and reservation features.', 
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 'plumber', 
    name: 'Pro Plumber', 
    vibe: 'Service',
    badge: 'New',
    desc: 'Trustworthy design for plumbing services, pipe repairs, and emergency fixes.', 
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 'electrician', 
    name: 'Expert Electrician', 
    vibe: 'Service',
    badge: 'New',
    desc: 'Professional layout for electrical contractors, wiring, and lighting experts.', 
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 'cleaning', 
    name: 'Sparkle Cleaning', 
    vibe: 'Clean',
    badge: 'New',
    desc: 'Fresh and bright design for residential and commercial cleaning services.', 
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 'realestate', 
    name: 'Prime Real Estate', 
    vibe: 'Luxury',
    badge: 'New',
    desc: 'Elegant design for real estate agents, property listings, and brokers.', 
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 'fitness', 
    name: 'Fitness & Gym', 
    vibe: 'Health',
    badge: 'LocalLaunch',
    desc: 'High-energy design for personal trainers, yoga studios, and gyms.', 
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 'portfolio', 
    name: 'Creative Portfolio', 
    vibe: 'Creative',
    badge: 'LocalLaunch',
    desc: 'Showcase your work beautifully. Ideal for photographers and designers.', 
    image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 'artist-minimal', 
    name: 'Minimalist Artist', 
    vibe: 'Minimal',
    badge: 'New',
    desc: 'A clean, gallery-style portfolio for fine artists and photographers.', 
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 'artist-creative', 
    name: 'Creative Studio', 
    vibe: 'Creative',
    badge: 'New',
    desc: 'A bold, dark-themed portfolio for digital artists and illustrators.', 
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 'heritage', 
    name: 'Heritage Modern', 
    vibe: 'Heritage',
    badge: 'New',
    desc: 'Timeless architecture for the modern life. Elegant, serif-driven design.', 
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' 
  }
];

const SECTIONS = [
  'Hero / Landing', 'About Us', 'Services / Offerings', 'Features / Benefits', 
  'Reviews / Testimonials', 'FAQ', 'Contact / Lead Form', 'Gallery', 'Pricing'
];

const TemplateMockup = ({ template }: { template: any }) => {
  const mockItem: PortfolioItem = {
    id: 0,
    templateId: template.id,
    title: template.name,
    category: template.vibe,
    imageUrl: template.image,
  };

  return (
    <div className="absolute inset-0">
      <TemplateMiniPreview item={mockItem} />
    </div>
  );
};

const StartProject: React.FC<StartProjectProps> = ({ onNavigate, onPreview, onPlanSelect, onMaintenanceSelect, onProjectCreate, initialTemplateId }) => {
  const [step, setStep] = useState(1); // Start at step 1 (Template Library)
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [previewingTemplateId, setPreviewingTemplateId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('Business');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState({
    templateId: initialTemplateId || 'portfolio',
    company: '',
    industry: '',
    location: '',
    logo: '',
    vibe: 'modern',
    services: '',
    email: '',
    socialLinks: '',
    sections: ['Hero / Landing', 'About Us', 'Services / Offerings', 'Reviews / Testimonials', 'Contact / Lead Form'], // 5-page/section default
    heroHeadline: '',
    heroSubheadline: '',
    aboutText: '',
    heroImage: ''
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const storageRef = ref(storage, `temp/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData(prev => ({ ...prev, logo: downloadURL }));
          setIsUploading(false);
          setUploadProgress(0);
        });
      }
    );
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleGenerate = async () => {
    if (!formData.company || !formData.industry) return;
    
    setIsGenerating(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `
        You are an expert copywriter for local businesses.
        Generate website content for a business with the following details:
        Name: ${formData.company}
        Industry: ${formData.industry}
        Location: ${formData.location || 'Not specified'}
        Vibe/Style: ${formData.vibe || 'Modern'}
        Services: ${formData.services || 'Standard services for this industry'}
        
        Return a JSON object with the following keys:
        - heroHeadline: A catchy, short headline for the hero section (max 8 words).
        - heroSubheadline: A compelling subheadline explaining the value proposition (1-2 sentences).
        - aboutText: A short "About Us" paragraph (2-3 sentences).
        - servicesText: A bulleted list of services (formatted with newlines).
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              heroHeadline: { type: Type.STRING },
              heroSubheadline: { type: Type.STRING },
              aboutText: { type: Type.STRING },
              servicesText: { type: Type.STRING },
            },
            required: ["heroHeadline", "heroSubheadline", "aboutText", "servicesText"],
          },
        },
      });

      const generatedContent = JSON.parse(response.text || '{}');

      setFormData(prev => ({
        ...prev,
        heroHeadline: generatedContent.heroHeadline || prev.heroHeadline,
        heroSubheadline: generatedContent.heroSubheadline || prev.heroSubheadline,
        aboutText: generatedContent.aboutText || prev.aboutText,
        servicesText: generatedContent.servicesText || prev.services,
      }));
    } catch (error) {
      console.error("AI Generation failed, using defaults:", error);
    }
    
    setIsGenerating(false);
  };

  const handleDeploy = async (plan: string, skipCheckout = false) => {
    if (isDeploying) return;
    setIsDeploying(true);
    
    onPlanSelect(plan);
    onMaintenanceSelect(true);
    
    try {
      let user = auth.currentUser;

      if (!user) {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        user = result.user;
      }

      if (!user) {
        throw new Error("Authentication failed. Please try again.");
      }

      const projectData = {
        clientId: user.uid,
        name: formData.company || 'New Project',
        status: 'payment-pending',
        planId: plan,
        templateId: formData.templateId,
        vibe: TEMPLATES.find(t => t.id === formData.templateId)?.vibe || 'organic',
        domainStatus: 'none',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      let docRef;
      try {
        docRef = await addDoc(collection(db, 'projects'), projectData);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, 'projects');
      }
      
      if (!docRef) throw new Error("Failed to create project document.");
      onProjectCreate(docRef.id);

      const contentData = {
        projectId: docRef.id,
        heroHeadline: formData.heroHeadline || `Welcome to ${formData.company}`,
        heroSubheadline: formData.heroSubheadline || `We are a leading ${formData.industry} company.`,
        aboutText: formData.aboutText || `Learn more about our services and how we can help you achieve your goals.`,
        servicesText: formData.servicesText || formData.services || '',
        heroImage: formData.heroImage || TEMPLATES.find(t => t.id === formData.templateId)?.image || '',
        logo: formData.logo || '',
        location: formData.location || '',
        vibe: formData.vibe || 'modern',
        services: formData.services || '',
        socialLinks: formData.socialLinks || '',
        contactEmail: formData.email || user.email || '',
        contactPhone: '',
        updatedAt: new Date().toISOString(),
      };

      try {
        await addDoc(collection(db, 'content'), contentData);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, 'content');
      }

      if (skipCheckout) {
        onNavigate('dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsDeploying(false);
        return;
      }

      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            planId: plan,
            email: user.email,
            projectId: docRef.id,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create checkout session');
        }

        const { url } = await response.json();
        if (url) {
          window.location.href = url;
          return;
        }
      } catch (checkoutError) {
        console.error("Stripe checkout error:", checkoutError);
      }

      onNavigate('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project. Please try again.");
    } finally {
      setIsDeploying(false);
    }
  };

  const toggleSection = (section: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.includes(section)
        ? prev.sections.filter(s => s !== section)
        : [...prev.sections, section]
    }));
  };

  const previewItem: PortfolioItem = {
    id: 999,
    templateId: formData.templateId,
    title: formData.company || 'Your Brand',
    category: formData.industry || 'Industry',
    imageUrl: formData.heroImage || TEMPLATES.find(t => t.id === formData.templateId)?.image || TEMPLATES[0].image,
    heroHeadline: formData.heroHeadline || `Welcome to ${formData.company || 'Your Brand'}`,
    heroSubheadline: formData.heroSubheadline || `We are a leading ${formData.industry || 'Industry'} company.`,
    aboutText: formData.aboutText || `Learn more about our services and how we can help you achieve your goals.`,
    contactEmail: formData.email || 'hello@yourbrand.com',
    logo: formData.logo,
    location: formData.location,
    vibe: formData.vibe,
    servicesText: formData.services,
    socialLinks: formData.socialLinks,
    services: [
      { title: "Core Service 1", description: "Tailored solutions for your specific needs.", price: "Learn More" },
      { title: "Core Service 2", description: "Advanced capabilities to drive growth.", price: "Learn More" },
      { title: "Core Service 3", description: "Comprehensive support and maintenance.", price: "Learn More" }
    ],
    features: [
      { title: 'Feature One', icon: Zap, desc: 'Highlighting your unique value proposition.' },
      { title: 'Feature Two', icon: Shield, desc: 'Building trust with your target audience.' },
      { title: 'Feature Three', icon: Globe, desc: 'Expanding your reach globally.' }
    ],
    reviews: [
      { name: "Client A", role: "CEO", content: "Incredible service and outstanding results.", rating: 5 },
      { name: "Client B", role: "Director", content: "Exactly what we needed to scale our operations.", rating: 5 }
    ],
    hours: ['Mon-Fri: 9am - 5pm', 'Sat-Sun: Closed'],
    faqs: [
      { question: "How do we get started?", answer: "Simply reach out through our contact form." },
      { question: "What is your pricing model?", answer: "We offer flexible plans tailored to your needs." }
    ]
  };

  const renderPreviewTemplate = () => {
    return <TemplateRenderer item={previewItem} />;
  };

  if (previewingTemplateId) {
    const previewTemplateItem = {
      ...previewItem,
      templateId: previewingTemplateId,
      imageUrl: TEMPLATES.find(t => t.id === previewingTemplateId)?.image || previewItem.imageUrl
    };

    return (
      <div className="fixed inset-0 z-[100] bg-white flex flex-col">
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setPreviewingTemplateId(null)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-brand-primary" />
            </button>
            <h2 className="font-bold text-brand-primary">Template Preview</h2>
          </div>
          <button 
            onClick={() => {
              setFormData(prev => ({ ...prev, templateId: previewingTemplateId }));
              setPreviewingTemplateId(null);
              nextStep();
            }}
            className="px-6 py-2 bg-brand-accent text-white rounded-lg font-bold hover:bg-brand-accent/90 transition-colors flex items-center gap-2"
          >
            Use This Template <ArrowRight size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="w-full min-h-full bg-white shadow-2xl">
            <TemplateRenderer item={previewTemplateItem} />
          </div>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-brand-primary mb-4 tracking-tight">
              Pick Your <span className="text-brand-accent">Template</span>
            </h1>
            <p className="text-xl text-brand-secondary max-w-2xl mx-auto">
              Select a starting point for your business. You can fully customize every detail later.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEMPLATES.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ y: -10 }}
                className={`group relative bg-white rounded-[2.5rem] border-2 transition-all cursor-pointer overflow-hidden ${
                  formData.templateId === template.id ? 'border-brand-accent shadow-2xl shadow-brand-accent/10' : 'border-gray-100 hover:border-gray-200'
                }`}
                onClick={() => {
                  setFormData(prev => ({ ...prev, templateId: template.id }));
                  nextStep();
                }}
              >
                <div className="aspect-[4/3] overflow-hidden relative bg-gray-50 border-b border-gray-100">
                  <TemplateMockup template={template} />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 gap-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewingTemplateId(template.id);
                      }}
                      className="w-full py-3 bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold rounded-xl hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
                    >
                      Preview Template
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData(prev => ({ ...prev, templateId: template.id }));
                        nextStep();
                      }}
                      className="w-full py-3 bg-white text-brand-primary font-bold rounded-xl shadow-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                    >
                      Select Template <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-brand-primary">{template.name}</h3>
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-accent bg-brand-accent/10 px-2 py-1 rounded-md">
                      {template.vibe}
                    </span>
                  </div>
                  <p className="text-sm text-brand-secondary/60 leading-relaxed">{template.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step >= 2 && step <= 4) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
          {/* Progress */}
          <div className="flex h-1 bg-gray-100">
            {[2, 3, 4].map((i) => (
              <div key={i} className={`flex-1 transition-all duration-500 ${step >= i ? 'bg-brand-accent' : 'bg-transparent'}`} />
            ))}
          </div>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="mb-8">
                    <h2 className="text-3xl font-black text-brand-primary mb-2">Business Basics</h2>
                    <p className="text-brand-secondary/60">Tell us a little about your brand. All fields are optional.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-secondary/60 uppercase tracking-widest">Business Name</label>
                      <input 
                        type="text" 
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all"
                        placeholder="Acme Inc."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-secondary/60 uppercase tracking-widest">Business Type</label>
                      <select 
                        value={formData.industry}
                        onChange={(e) => setFormData({...formData, industry: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all appearance-none"
                      >
                        <option value="">Select a type...</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Barber">Barber</option>
                        <option value="Gym">Gym</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Plumber">Plumber</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-secondary/60 uppercase tracking-widest">Location</label>
                      <input 
                        type="text" 
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all"
                        placeholder="City, State"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="mb-8">
                    <h2 className="text-3xl font-black text-brand-primary mb-2">Brand & Services</h2>
                    <p className="text-brand-secondary/60">Help us tailor the content to your style.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-secondary/60 uppercase tracking-widest">Brand Vibe</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['modern', 'luxury', 'playful', 'minimal'].map((v) => (
                          <button
                            key={v}
                            onClick={() => setFormData({...formData, vibe: v})}
                            className={`py-3 rounded-xl border-2 font-bold capitalize transition-all ${
                              formData.vibe === v ? 'border-brand-accent bg-brand-accent/5 text-brand-accent' : 'border-gray-100 text-brand-secondary/60 hover:border-gray-200'
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-secondary/60 uppercase tracking-widest">Services Offered</label>
                      <textarea 
                        value={formData.services}
                        onChange={(e) => setFormData({...formData, services: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all min-h-[100px] resize-none"
                        placeholder="List a few services..."
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="mb-8">
                    <h2 className="text-3xl font-black text-brand-primary mb-2">Almost Done</h2>
                    <p className="text-brand-secondary/60">Just a few more details to get your site ready.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-secondary/60 uppercase tracking-widest">Contact Email</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-secondary/60 uppercase tracking-widest">Logo (Optional)</label>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className={`aspect-video rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                          formData.logo ? 'border-brand-accent bg-brand-accent/5' : 'border-gray-200 hover:border-brand-accent/40 bg-gray-50'
                        }`}
                      >
                        {formData.logo ? (
                          <img src={formData.logo} className="w-full h-full object-contain p-4" alt="Logo" />
                        ) : (
                          <>
                            <Upload className="text-gray-400" size={24} />
                            <span className="text-xs font-bold text-gray-400 uppercase">Upload Logo</span>
                          </>
                        )}
                      </div>
                      <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-12 flex gap-4">
              <button 
                onClick={prevStep}
                className="flex-1 py-4 bg-gray-100 text-brand-primary font-bold rounded-xl hover:bg-gray-200 transition-all"
              >
                Back
              </button>
              <button 
                onClick={nextStep}
                className="flex-[2] py-4 brand-gradient-bg text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-2"
              >
                {step === 4 ? 'Preview Site' : 'Continue'} <ArrowRight size={20} />
              </button>
            </div>
            
            <p className="text-center text-xs text-brand-secondary/40 mt-6">
              You can skip these steps and edit everything later in the live editor.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 5) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        {/* Top Bar */}
        <div className="h-16 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-4 md:px-6 sticky top-0 z-50">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button 
                onClick={() => setPreviewMode('desktop')}
                className={`p-1.5 rounded-md transition-colors ${previewMode === 'desktop' ? 'bg-white shadow-sm text-brand-accent' : 'text-brand-secondary/60 hover:text-brand-primary'}`}
              >
                <Monitor size={16} />
              </button>
              <button 
                onClick={() => setPreviewMode('mobile')}
                className={`p-1.5 rounded-md transition-colors ${previewMode === 'mobile' ? 'bg-white shadow-sm text-brand-accent' : 'text-brand-secondary/60 hover:text-brand-primary'}`}
              >
                <Smartphone size={16} />
              </button>
            </div>
            <button 
              onClick={() => onPreview(
                { businessName: formData.company, industry: formData.industry, templateId: formData.templateId },
                { heroHeadline: formData.heroHeadline, heroSubheadline: formData.heroSubheadline, aboutText: formData.aboutText, heroImage: formData.heroImage, contactEmail: formData.email }
              )}
              className="text-brand-accent hover:text-brand-accent/80 text-xs font-bold flex items-center gap-2 bg-brand-accent/5 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Eye size={14} /> Full Preview
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-green-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> <span className="hidden md:inline">Live Preview</span>
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
          {/* Left Sidebar - Editor */}
          <div className="w-full md:w-[400px] bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100 overflow-y-auto flex flex-col z-10 shadow-xl shrink-0 rounded-none">
            <div className="p-6 flex-1">
              <h2 className="text-2xl font-bold text-brand-primary mb-6">Site Details</h2>
              
              <div className="space-y-4 mb-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-secondary/60 flex items-center gap-2 uppercase tracking-widest">
                      <Building size={16} /> Business Name
                  </label>
                  <input 
                    type="text" 
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-brand-primary focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all placeholder:text-gray-300"
                    placeholder="Acme Inc."
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-secondary/60 flex items-center gap-2 uppercase tracking-widest">
                      <Globe size={16} /> Business Type
                  </label>
                  <select 
                    value={formData.industry}
                    onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-brand-primary focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all appearance-none"
                  >
                    <option value="">Select a type...</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Barber">Barber</option>
                    <option value="Gym">Gym</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-secondary/60 flex items-center gap-2 uppercase tracking-widest">
                      Location
                  </label>
                  <input 
                    type="text" 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-brand-primary focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all placeholder:text-gray-300"
                    placeholder="City, State"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-secondary/60 flex items-center gap-2 uppercase tracking-widest">
                      Brand Vibe
                  </label>
                  <select 
                    value={formData.vibe}
                    onChange={(e) => setFormData({...formData, vibe: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-brand-primary focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all appearance-none"
                  >
                    <option value="modern">Modern</option>
                    <option value="luxury">Luxury</option>
                    <option value="playful">Playful</option>
                    <option value="minimal">Minimal</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-secondary/60 flex items-center gap-2 uppercase tracking-widest">
                      Services
                  </label>
                  <textarea 
                    value={formData.services}
                    onChange={(e) => setFormData({...formData, services: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-brand-primary focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all min-h-[80px] placeholder:text-gray-300 resize-none"
                    placeholder="What services do you offer?"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-secondary/60 flex items-center gap-2 uppercase tracking-widest">
                      Contact Email
                  </label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-brand-primary focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all placeholder:text-gray-300"
                    placeholder="you@company.com"
                  />
                </div>

                <div className="h-px bg-gray-200 my-4"></div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-secondary/60 flex items-center gap-2 uppercase tracking-widest">
                    <ImageIcon size={16} /> Upload Logo (Optional)
                  </label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative aspect-video rounded-xl border-2 border-dashed transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-2 ${
                      formData.logo ? 'border-brand-accent bg-brand-accent/5' : 'border-gray-200 hover:border-brand-accent/40 hover:bg-gray-100'
                    }`}
                  >
                    {formData.logo ? (
                      <>
                        <img src={formData.logo} className="absolute inset-0 w-full h-full object-contain p-4" alt="Logo" />
                        <div className="absolute inset-0 bg-white/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Upload className="text-brand-primary" size={24} />
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload className="text-gray-400" size={24} />
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Upload Logo</span>
                      </>
                    )}
                    
                    {isUploading && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center p-4">
                        <Loader2 className="animate-spin text-brand-accent mb-2" size={24} />
                        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-brand-accent h-full transition-all" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden" 
                    accept="image/*"
                  />
                </div>
              </div>

              <h2 className="text-lg font-bold text-brand-primary mb-3">Sections</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {SECTIONS.map((section) => {
                  const isSelected = formData.sections.includes(section);
                  return (
                    <button
                      key={section}
                      onClick={() => toggleSection(section)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isSelected 
                          ? 'bg-brand-accent text-white shadow-sm' 
                          : 'bg-gray-100 text-brand-secondary/60 hover:bg-gray-200'
                      }`}
                    >
                      {isSelected && <Check size={12} />}
                      {section}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h2 className="text-lg font-bold text-brand-primary mb-4">Almost there!</h2>
                
                <button 
                  onClick={() => handleDeploy('starter', true)}
                  className="w-full py-4 brand-gradient-bg text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-2"
                >
                  Continue to Dashboard <ArrowRight size={20} />
                </button>

                <p className="text-center text-xs text-brand-secondary/40 mt-4">
                  Don't worry, you can edit all these details later in the live editor.
                </p>
              </div>
            </div>
          </div>

          {/* Right Area - Preview Container */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center relative min-h-[60vh] md:min-h-0 bg-gray-100">
            <div className={`bg-white shadow-2xl overflow-hidden transition-all duration-500 ease-in-out ${
              previewMode === 'mobile' ? 'w-[375px] rounded-[3rem] border-[8px] border-gray-800 h-[812px] shrink-0' : 'w-full max-w-6xl rounded-xl border border-gray-200'
            }`}>
              {/* Browser/Device Chrome */}
              {previewMode === 'desktop' && (
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-white rounded-md px-3 py-1.5 text-xs text-gray-400 flex items-center justify-center font-mono shadow-sm mx-4 border border-gray-200">
                    <span className="text-gray-300 mr-2">🔒</span>
                    {(formData.company || 'yourbrand').toLowerCase().replace(/\s/g, '')}.com
                  </div>
                </div>
              )}
              
              {/* Actual Template Render */}
              <div className={`h-full overflow-y-auto overflow-x-hidden ${previewMode === 'mobile' ? 'scrollbar-hide' : ''}`}>
                {renderPreviewTemplate()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 1 removed

  return null; // Should not reach here
};

export default StartProject;
