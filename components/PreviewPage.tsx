import React, { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, onSnapshot, collection, query, where, getDocs } from 'firebase/firestore';
import { TemplateRenderer } from './TemplateRenderer';
import { Loader2, ArrowLeft, Monitor, Smartphone, X, Zap, Shield, Globe } from 'lucide-react';
import { Page, PortfolioItem } from '../types';

interface PreviewPageProps {
  projectId?: string;
  initialProject?: any;
  initialContent?: any;
  onBack: () => void;
}

export const PreviewPage: React.FC<PreviewPageProps> = ({ projectId, initialProject, initialContent, onBack }) => {
  const [project, setProject] = useState<any>(initialProject || null);
  const [content, setContent] = useState<any>(initialContent || null);
  const [loading, setLoading] = useState(!initialProject);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    if (!projectId || initialProject) return;

    const projectUnsub = onSnapshot(doc(db, 'projects', projectId), (docSnap) => {
      if (docSnap.exists()) {
        setProject({ id: docSnap.id, ...docSnap.data() });
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `projects/${projectId}`);
    });

    const contentQuery = query(collection(db, 'content'), where('projectId', '==', projectId));
    const contentUnsub = onSnapshot(contentQuery, (snapshot) => {
      if (!snapshot.empty) {
        setContent(snapshot.docs[0].data());
      }
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'content');
    });

    return () => {
      projectUnsub();
      contentUnsub();
    };
  }, [projectId, initialProject]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg text-white">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-brand-accent" size={48} />
          <p className="text-xl font-medium">Loading Preview...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg text-white">
        <div className="text-center">
          <p className="text-xl font-medium mb-4">Project not found.</p>
          <button onClick={onBack} className="px-6 py-2 bg-brand-accent text-white rounded-lg font-bold hover:bg-brand-accent/80 transition-colors">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const previewItem: PortfolioItem = {
    id: 0,
    templateId: project.templateId || project.vibe,
    title: project.businessName || project.name || 'Your Brand',
    category: project.industry || 'Industry',
    imageUrl: content?.heroImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
    heroHeadline: content?.heroHeadline,
    heroSubheadline: content?.heroSubheadline,
    aboutText: content?.aboutText,
    contactEmail: content?.contactEmail,
    contactPhone: content?.contactPhone,
    logo: content?.logo,
    location: content?.location,
    vibe: content?.vibe,
    servicesText: content?.servicesText || content?.services,
    socialLinks: content?.socialLinks,
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

  return (
    <div className="fixed inset-0 z-[9999] bg-brand-bg flex flex-col overflow-hidden">
      {/* Control Bar */}
      <div className="h-16 bg-brand-surface border-b border-white/5 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="text-white/60 hover:text-white flex items-center gap-2 text-sm font-bold transition-colors"
          >
            <ArrowLeft size={18} /> Exit Preview
          </button>
          <div className="h-6 w-px bg-white/10 mx-2"></div>
          <div className="flex bg-brand-bg p-1 rounded-lg border border-white/5">
            <button 
              onClick={() => setViewMode('desktop')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'desktop' ? 'bg-brand-accent text-white' : 'text-white/40 hover:text-white/80'}`}
            >
              <Monitor size={18} />
            </button>
            <button 
              onClick={() => setViewMode('mobile')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'mobile' ? 'bg-brand-accent text-white' : 'text-white/40 hover:text-white/80'}`}
            >
              <Smartphone size={18} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-brand-accent/10 text-brand-accent px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold border border-brand-accent/20 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></div>
            Live Preview Mode
          </div>
          <button onClick={onBack} className="text-white/40 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-y-auto bg-brand-bg flex justify-center items-start p-4 md:p-8 relative">
        <div className="absolute inset-0 atmosphere opacity-50 pointer-events-none" />
        <div className={`bg-white shadow-2xl transition-all duration-500 ease-in-out relative z-10 ${
          viewMode === 'mobile' 
            ? 'w-[375px] h-[812px] rounded-[3rem] border-[12px] border-brand-surface overflow-hidden relative' 
            : 'w-full min-h-full rounded-xl overflow-hidden border border-white/5'
        }`}>
          <div className="h-full overflow-y-auto scrollbar-hide">
            <TemplateRenderer item={previewItem} />
          </div>
        </div>
      </div>
    </div>
  );
};
