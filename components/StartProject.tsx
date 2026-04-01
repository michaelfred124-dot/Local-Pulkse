import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Zap, Globe, Layout, Building, Loader2, Monitor, Smartphone, Shield, Image as ImageIcon, Upload, X, Eye, ChevronDown, Search, Sparkles } from 'lucide-react';
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
    id: 'restaurant', 
    name: 'Restaurant & Dining', 
    vibe: 'Hospitality',
    badge: 'LocalLaunch',
    desc: 'Perfect for cafes, bistros, and fine dining with menu and reservation features.', 
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 'service', 
    name: 'Home Services', 
    vibe: 'Service',
    badge: 'LocalLaunch',
    desc: 'Built for plumbers, electricians, and contractors to capture leads quickly.', 
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80' 
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
    id: 'corporate', 
    name: 'Corporate Local', 
    vibe: 'Business',
    badge: 'LocalLaunch',
    desc: 'Professional and trustworthy design for law firms, accountants, and consultants.', 
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' 
  }
];

const SECTIONS = [
  'Hero / Landing', 'Services / Offerings', 'Features / Benefits', 
  'Testimonials', 'FAQ', 'Contact / Lead Form', 'Gallery', 'Pricing'
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
  const [step, setStep] = useState(initialTemplateId ? 2 : 1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeCategory, setActiveCategory] = useState('Business');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState({
    templateId: initialTemplateId || '',
    company: '',
    industry: '',
    location: '',
    logo: '',
    vibe: 'modern',
    services: '',
    email: '',
    socialLinks: '',
    sections: ['Hero / Landing', 'Services / Offerings', 'Contact / Lead Form'], // Defaults
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

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
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

  const handleDeploy = async (plan: string) => {
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

  if (step === 2) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        {/* Top Bar */}
        <div className="h-16 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-4 md:px-6 sticky top-0 z-50">
          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={() => setStep(1)} className="text-brand-secondary/60 hover:text-brand-primary flex items-center gap-1 md:gap-2 text-xs font-bold transition-colors">
              <ArrowLeft size={16} /> <span className="hidden md:inline">Change Template</span>
            </button>
            <div className="h-6 w-px bg-gray-200 mx-1 md:mx-2"></div>
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
                <h2 className="text-lg font-bold text-brand-primary mb-4">Ready to launch?</h2>
                
                <button 
                  onClick={handleGenerate}
                  disabled={!formData.company || !formData.industry || isGenerating}
                  className="w-full py-3 bg-brand-accent/5 border-2 border-brand-accent/10 text-brand-accent font-bold rounded-xl hover:bg-brand-accent/10 transition-colors mb-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                  {isGenerating ? 'Generating...' : 'Generate Content with AI'}
                </button>

                <button 
                  onClick={() => handleDeploy('starter')}
                  disabled={!formData.company || !formData.industry || !formData.email}
                  className="w-full py-3 brand-gradient-bg text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-brand-accent/20 disabled:opacity-50 disabled:cursor-not-allowed mb-3"
                >
                  Deploy Starter Template ($49/mo)
                </button>
                
                <button 
                  onClick={() => handleDeploy('scale')}
                  disabled={!formData.company || !formData.industry || !formData.email}
                  className="w-full py-3 bg-gray-100 border-2 border-gray-100 text-brand-primary font-bold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Request Custom Build ($100/mo)
                </button>
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

  // Step 1
  const categories = ['Business', 'Services', 'Store', 'Creative', 'Community', 'Blog'];

  return (
    <div className="min-h-screen pt-32 pb-12 bg-white text-brand-primary">
      <div className="container mx-auto px-4 md:px-8 h-full max-w-[1600px]">
        
        {/* Progress Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brand-primary">
            Pick the Website Template You Love
          </h1>
          <p className="text-brand-secondary text-lg mb-8">
            Choose from 800+ customizable templates for your business.
          </p>
          <button className="px-8 py-3 brand-gradient-bg text-white font-bold rounded-full hover:opacity-90 transition-all shadow-lg shadow-brand-accent/20">
            Create from Scratch
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                    activeCategory === cat 
                      ? 'bg-brand-accent/10 text-brand-accent' 
                      : 'text-brand-secondary/60 hover:bg-gray-100 hover:text-brand-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text"
                  placeholder="Search all templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-brand-primary focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all text-sm placeholder:text-gray-400"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-brand-secondary/60 cursor-pointer hover:text-brand-primary transition-colors">
                <span>Sort by: <span className="font-bold">Recommended</span></span>
                <ChevronDown size={16} />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {TEMPLATES.filter(t => 
                      (activeCategory === 'Business' || t.vibe.toLowerCase().includes(activeCategory.toLowerCase()) || t.name.toLowerCase().includes(activeCategory.toLowerCase())) &&
                      (t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.desc.toLowerCase().includes(searchQuery.toLowerCase()))
                    ).map((template) => (
                      <div 
                        key={template.id}
                        onClick={() => setFormData({...formData, templateId: template.id})}
                        className="group cursor-pointer"
                      >
                        <div className={`relative rounded-xl overflow-hidden transition-all duration-500 mb-4 bg-white shadow-sm hover:shadow-xl ${
                          formData.templateId === template.id 
                            ? 'ring-4 ring-brand-accent scale-[1.02]' 
                            : 'ring-1 ring-gray-200'
                        }`}>
                          {/* Browser Chrome Header */}
                          <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                          </div>

                          <div className="aspect-video relative bg-gray-50 overflow-hidden">
                            <TemplateMockup template={template} />
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-20">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFormData({...formData, templateId: template.id});
                                  setStep(2);
                                }}
                                className="px-6 py-2 brand-gradient-bg text-white font-bold rounded-full text-sm hover:opacity-90 transition-colors"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onPreview(
                                    { businessName: template.name, industry: template.vibe, templateId: template.id },
                                    { heroImage: template.image }
                                  );
                                }}
                                className="px-6 py-2 bg-white text-brand-primary border border-gray-200 font-bold rounded-full text-sm hover:bg-gray-50 transition-colors"
                              >
                                View
                              </button>
                            </div>

                            {formData.templateId === template.id && (
                              <div className="absolute inset-0 bg-brand-accent/10 flex items-center justify-center z-10 backdrop-blur-[2px]">
                                <div className="w-12 h-12 bg-brand-accent text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white/10">
                                  <Check size={24} strokeWidth={3} />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between px-1">
                          <h3 className="text-base font-bold text-brand-primary">{template.name}</h3>
                          <span className="text-[10px] font-bold text-white brand-gradient-bg px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">
                            {template.badge}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

          {/* Navigation Actions */}
          <div className="flex items-center justify-end mt-12 pt-8 border-t border-gray-200">
            {step === 1 && (
              <button 
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.templateId}
                className="px-12 py-4 brand-gradient-bg text-white font-bold rounded-full hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-xl shadow-brand-accent/20"
              >
                Continue to Builder <ArrowRight size={20} />
              </button>
            )}
          </div>
      </div>
    </div>
  );
};

export default StartProject;
