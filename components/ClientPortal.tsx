import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  FileText, 
  Image as ImageIcon, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Loader2,
  ChevronRight,
  Upload,
  MessageSquare,
  Layout,
  Sparkles,
  Eye,
  X
} from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, onSnapshot, updateDoc, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { TemplateEditor } from './TemplateEditor';
import { PortfolioItem } from '../types';

interface ClientPortalProps {
  projectId: string;
  onBack: () => void;
}

type PortalStep = 'payment' | 'content' | 'status' | 'preview';

export const ClientPortal: React.FC<ClientPortalProps> = ({ projectId, onBack }) => {
  const { user } = useAuth();
  const [project, setProject] = useState<any>(null);
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState<PortalStep>('payment');
  const [saving, setSaving] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const unsubscribeProject = onSnapshot(doc(db, 'projects', projectId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setProject({ id: doc.id, ...data });
        // Auto-set step based on project status
        if (data.status === 'payment-pending') {
          // If they haven't paid, they can still preview/edit
          // We'll default to preview if they just started
          setActiveStep('preview');
        } else if (data.status === 'discovery') {
          setActiveStep('content');
        } else {
          setActiveStep('status');
        }
      }
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `projects/${projectId}`);
      setLoading(false);
    });

    // Fetch content
    const q = query(collection(db, 'content'), where('projectId', '==', projectId));
    const unsubscribeContent = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setContent({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
      }
    });

    return () => {
      unsubscribeProject();
      unsubscribeContent();
    };
  }, [projectId]);

  const handleUpdateContent = async (updatedFields: Partial<PortfolioItem>) => {
    if (!content) return;
    try {
      await updateDoc(doc(db, 'content', content.id), {
        ...updatedFields,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  const handlePayment = async () => {
    setSaving(true);
    try {
      // Simulate payment success
      await updateDoc(doc(db, 'projects', projectId), {
        status: 'discovery',
        updatedAt: new Date().toISOString()
      });
      setActiveStep('content');
    } catch (error) {
      console.error("Payment error", error);
    } finally {
      setSaving(false);
    }
  };

  const handleContentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateDoc(doc(db, 'projects', projectId), {
        status: 'design',
        updatedAt: new Date().toISOString()
      });
      setActiveStep('status');
    } catch (error) {
      console.error("Content submission error", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <Loader2 className="animate-spin text-brand-accent" size={48} />
      </div>
    );
  }

  const steps = [
    { id: 'preview', label: 'Customize Site', icon: Eye, description: 'Live editor & preview' },
    { id: 'payment', label: 'Launch Website', icon: Sparkles, description: 'Go live & secure domain' },
    { id: 'content', label: 'Project Details', icon: FileText, description: 'Tell us about your vision' },
    { id: 'status', label: 'Build Status', icon: Clock, description: 'Track our progress' },
  ];

  const isPreviewMode = activeStep === 'preview';

  return (
    <div className={`min-h-screen bg-gray-50/50 ${isPreviewMode ? 'pt-0 md:pt-24' : 'pt-24'} pb-32 md:pb-12 px-0 md:px-4 sm:px-6 lg:px-8`}>
      <div className={`${isPreviewMode ? 'max-w-none md:max-w-5xl' : 'max-w-5xl'} mx-auto`}>
        {/* Header - Hidden on mobile in preview mode unless menu is open */}
        <div className={`${isPreviewMode && !showMobileMenu ? 'hidden md:flex' : 'flex'} items-center justify-between mb-8 px-4 md:px-0`}>
          <div>
            <button 
              onClick={onBack}
              className="text-sm font-bold text-brand-secondary hover:text-brand-accent transition-colors flex items-center gap-1 mb-2"
            >
              <ChevronRight className="rotate-180" size={16} /> Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-brand-primary">{project?.name} Portal</h1>
          </div>
          {isPreviewMode && showMobileMenu && (
            <button 
              onClick={() => setShowMobileMenu(false)}
              className="p-2 bg-gray-100 rounded-full text-brand-primary md:hidden"
            >
              <X size={20} />
            </button>
          )}
          <div className={`${isPreviewMode && showMobileMenu ? 'hidden md:flex' : 'flex'} items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm`}>
            <div className={`w-2 h-2 rounded-full ${project?.status === 'live' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">{project?.status}</span>
          </div>
        </div>

        <div className={`grid ${isPreviewMode ? 'grid-cols-1' : 'lg:grid-cols-3'} gap-8`}>
          {/* Sidebar Steps - Hidden on mobile in preview mode unless menu is open */}
          <div className={`${isPreviewMode && !showMobileMenu ? 'hidden lg:block lg:col-span-1' : 'lg:col-span-1'} space-y-4 px-4 md:px-0`}>
            {steps.map((step) => {
              const isActive = activeStep === step.id;
              const isCompleted = (activeStep === 'payment' && step.id === 'preview') ||
                                 (activeStep === 'content' && (step.id === 'preview' || step.id === 'payment')) || 
                                 (activeStep === 'status' && (step.id === 'preview' || step.id === 'payment' || step.id === 'content'));
              
              return (
                <button
                  key={step.id}
                  disabled={!isCompleted && !isActive}
                  onClick={() => {
                    setActiveStep(step.id as PortalStep);
                    setShowMobileMenu(false);
                  }}
                  className={`w-full text-left p-6 rounded-2xl border transition-all ${
                    isActive 
                    ? 'bg-white border-brand-accent shadow-xl shadow-brand-accent/5 ring-1 ring-brand-accent' 
                    : isCompleted 
                      ? 'bg-white border-gray-100 opacity-60' 
                      : 'bg-gray-100/50 border-transparent opacity-40 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isActive ? 'bg-brand-accent text-white' : 'bg-gray-100 text-brand-secondary'
                    }`}>
                      {isCompleted ? <CheckCircle2 size={20} /> : <step.icon size={20} />}
                    </div>
                    <div>
                      <h3 className={`font-bold text-sm ${isActive ? 'text-brand-primary' : 'text-brand-secondary'}`}>
                        {step.label}
                      </h3>
                      <p className="text-xs text-brand-secondary/60 mt-1">{step.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Support Card */}
            <div className="bg-brand-primary text-white p-6 rounded-2xl shadow-xl overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="font-bold mb-2">Need help?</h3>
                <p className="text-sm text-white/60 mb-4">Our team is here to guide you through the process.</p>
                <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                  <MessageSquare size={16} /> Chat with us
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-brand-accent/20 rounded-full blur-2xl" />
            </div>
          </div>

          {/* Main Content Area */}
          <div className={`${isPreviewMode ? 'lg:col-span-2' : 'lg:col-span-2'}`}>
            <AnimatePresence mode="wait">
              {activeStep === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-xl"
                >
                  <div className="max-w-md mx-auto text-center">
                    <div className="w-20 h-20 bg-brand-accent/10 text-brand-accent rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Sparkles size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-brand-primary mb-4">Launch Your Website</h2>
                    <p className="text-brand-secondary mb-8">
                      You're one step away from going live. Complete your payment to launch your custom site on your chosen domain.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
                      <div className="bg-gray-50 p-6 rounded-2xl border-2 border-transparent hover:border-brand-accent transition-all cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-bold text-brand-primary">Basic Plan</h3>
                          <span className="text-xs font-black text-brand-accent bg-brand-accent/10 px-2 py-1 rounded">STARTER</span>
                        </div>
                        <div className="text-3xl font-black text-brand-primary mb-2">$49<span className="text-sm font-normal text-brand-secondary">/mo</span></div>
                        <ul className="text-xs text-brand-secondary space-y-2 mb-6">
                          <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-500" /> Basic Features</li>
                          <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-500" /> Custom Domain</li>
                          <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-500" /> Mobile Optimized</li>
                        </ul>
                        <button 
                          onClick={handlePayment}
                          className="w-full py-2 bg-brand-primary text-white text-xs font-bold rounded-lg group-hover:bg-brand-accent transition-colors"
                        >
                          Select Basic
                        </button>
                      </div>

                      <div className="bg-brand-accent/5 p-6 rounded-2xl border-2 border-brand-accent transition-all cursor-pointer relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-brand-accent text-white text-[10px] font-black px-3 py-1 rounded-bl-xl">POPULAR</div>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-bold text-brand-primary">Pro Plan</h3>
                        </div>
                        <div className="text-3xl font-black text-brand-primary mb-2">$100<span className="text-sm font-normal text-brand-secondary">/mo</span></div>
                        <ul className="text-xs text-brand-secondary space-y-2 mb-6">
                          <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-500" /> Extra Features</li>
                          <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-500" /> Advanced Integrations</li>
                          <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-500" /> Priority Support</li>
                        </ul>
                        <button 
                          onClick={handlePayment}
                          className="w-full py-2 bg-brand-accent text-white text-xs font-bold rounded-lg shadow-lg shadow-brand-accent/20"
                        >
                          Select Pro
                        </button>
                      </div>
                    </div>
                    <p className="mt-4 text-xs text-brand-secondary/40 flex items-center justify-center gap-1">
                      <CheckCircle2 size={12} /> Secure encrypted payment
                    </p>
                  </div>
                </motion.div>
              )}

              {activeStep === 'preview' && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`${isPreviewMode ? 'rounded-none md:rounded-3xl' : 'rounded-3xl'} bg-white border-0 md:border border-gray-100 shadow-none md:shadow-xl overflow-hidden`}
                >
                  <div className="hidden md:flex p-8 border-b border-gray-100 items-center justify-between bg-gray-50/50">
                    <div>
                      <h2 className="text-2xl font-bold text-brand-primary">Live Site Preview</h2>
                      <p className="text-sm text-brand-secondary">Click on text or images to customize your template in real-time.</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-brand-accent/10 text-brand-accent rounded-full text-xs font-bold">
                      <Sparkles size={14} />
                      AI POWERED
                    </div>
                  </div>
                  
                  <div className={`relative ${isPreviewMode && !showMobileMenu ? 'h-screen md:h-[600px]' : 'aspect-video md:aspect-auto md:h-[600px]'} overflow-hidden bg-gray-100`}>
                    {content ? (
                      <div className="h-full">
                        <TemplateEditor 
                          item={{
                            id: project.id,
                            title: project.name,
                            category: project.industry || 'Business',
                            imageUrl: content.heroImage,
                            heroHeadline: content.heroHeadline,
                            heroSubheadline: content.heroSubheadline,
                            aboutText: content.aboutText,
                            servicesText: content.servicesText,
                            logo: content.logo,
                            location: content.location,
                            contactEmail: content.contactEmail,
                            templateId: project.templateId
                          } as PortfolioItem}
                          onUpdate={handleUpdateContent}
                          onMenuClick={() => setShowMobileMenu(true)}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Loader2 className="animate-spin text-brand-accent" />
                      </div>
                    )}
                  </div>

                  <div className="hidden md:flex p-8 bg-brand-primary text-white items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <CheckCircle2 className="text-brand-accent" />
                      </div>
                      <div>
                        <p className="font-bold">Changes are saved automatically</p>
                        <p className="text-xs text-white/60">Your draft is updated in real-time.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setActiveStep('payment')}
                      className="px-8 py-4 bg-brand-accent text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-brand-accent/20"
                    >
                      Launch My Website <ArrowRight size={20} />
                    </button>
                  </div>
                </motion.div>
              )}
              {activeStep === 'content' && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-xl"
                >
                  <h2 className="text-2xl font-bold text-brand-primary mb-2">Project Discovery</h2>
                  <p className="text-brand-secondary mb-8">Help us understand your business and goals.</p>

                  <form onSubmit={handleContentSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-brand-primary mb-2">Target Audience</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Small business owners"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-accent outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-brand-primary mb-2">Key Competitors</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Competitor A, Competitor B"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-accent outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-brand-primary mb-2">Logo Upload</label>
                      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                        <Upload className="mx-auto text-gray-300 group-hover:text-brand-accent transition-colors mb-2" size={32} />
                        <p className="text-sm font-bold text-brand-primary">Click to upload logo</p>
                        <p className="text-xs text-brand-secondary/60">SVG, PNG or AI preferred</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-brand-primary mb-2">Additional Information</label>
                      <textarea 
                        rows={4}
                        placeholder="Any specific features or pages you definitely want?"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-accent outline-none transition-all resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={saving}
                      className="w-full py-4 brand-gradient-bg text-white rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-2"
                    >
                      {saving ? <Loader2 className="animate-spin" /> : <>Submit Information <ArrowRight size={20} /></>}
                    </button>
                  </form>
                </motion.div>
              )}

              {activeStep === 'status' && (
                <motion.div
                  key="status"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-xl"
                >
                  <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-brand-accent/10 text-brand-accent rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Layout size={40} className="animate-pulse" />
                    </div>
                    <h2 className="text-2xl font-bold text-brand-primary mb-2">We're building your site!</h2>
                    <p className="text-brand-secondary">Our designers are currently working on your initial concepts.</p>
                  </div>

                  <div className="space-y-8 max-w-md mx-auto">
                    {[
                      { label: 'Discovery & Payment', status: 'completed', date: 'Today' },
                      { label: 'Initial Concepts', status: 'current', date: 'Expected in 2 days' },
                      { label: 'Development', status: 'pending', date: 'TBD' },
                      { label: 'Final Review', status: 'pending', date: 'TBD' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          item.status === 'completed' ? 'bg-emerald-500 text-white' : 
                          item.status === 'current' ? 'bg-brand-accent text-white ring-4 ring-brand-accent/20' : 
                          'bg-gray-100 text-gray-300'
                        }`}>
                          {item.status === 'completed' ? <CheckCircle2 size={14} /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-bold text-sm ${item.status === 'pending' ? 'text-brand-secondary/40' : 'text-brand-primary'}`}>
                            {item.label}
                          </h3>
                          <p className="text-xs text-brand-secondary/60">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-sm text-brand-primary mb-2">What happens next?</h4>
                    <p className="text-xs text-brand-secondary leading-relaxed">
                      Once the initial concepts are ready, you'll receive an email notification to review them right here in your portal. You'll be able to provide feedback and request revisions.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
