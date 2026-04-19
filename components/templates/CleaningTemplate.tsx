import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Phone, Mail, MapPin, Clock, Shield, Zap, ArrowRight, Edit3, Layout, Move, Plus, Trash2, Image as ImageIcon, Sparkles, Droplets, Wind, Home, ShieldCheck } from 'lucide-react';
import { PortfolioItem } from '../../types';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  isEditing?: boolean;
  className?: string;
  tag?: keyof React.JSX.IntrinsicElements;
}

const EditableText: React.FC<EditableTextProps> = ({ 
  value, 
  onSave, 
  isEditing, 
  className = '', 
  tag: Tag = 'div'
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  if (!isEditing) {
    return <Tag className={className} dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, '<br/>') }} />;
  }

  return (
    <div className={`relative group/editable ${className}`}>
      <Tag
        contentEditable
        suppressContentEditableWarning
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          const newValue = e.currentTarget.innerText;
          if (newValue !== value) {
            onSave(newValue);
          }
        }}
        className={`outline-none focus:ring-4 focus:ring-teal-200 rounded-2xl transition-all px-2 -mx-2 min-h-[1em] min-w-[50px] ${isFocused ? 'bg-teal-50' : 'hover:bg-teal-50/50'}`}
      >
        {value || 'Click to add text...'}
      </Tag>
      {!isFocused && (
        <div className="absolute -top-8 left-0 opacity-0 group-hover/editable:opacity-100 transition-opacity pointer-events-none z-50">
          <div className="bg-teal-500 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg whitespace-nowrap">
            <Edit3 size={10} /> EDIT
          </div>
        </div>
      )}
    </div>
  );
};

interface SectionWrapperProps {
  children: React.ReactNode;
  isEditing?: boolean;
  label: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, isEditing, label }) => {
  if (!isEditing) return <>{children}</>;

  return (
    <div className="relative group/section border-2 border-transparent hover:border-teal-300 transition-all rounded-3xl overflow-hidden m-2">
      {children}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-2 border-teal-400 opacity-0 group-hover/section:opacity-100 transition-opacity z-40 rounded-3xl" />
      <div className="absolute top-4 left-4 opacity-0 group-hover/section:opacity-100 transition-all z-50 flex items-center gap-2">
        <div className="bg-teal-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-xl flex items-center gap-2">
          <Layout size={12} /> {label.toUpperCase()}
        </div>
        <div className="flex items-center gap-1 bg-white border border-teal-100 rounded-full p-1.5 shadow-xl pointer-events-auto">
          <button className="p-1.5 hover:bg-teal-50 rounded-full text-teal-400 hover:text-teal-600 transition-colors">
            <Move size={14} />
          </button>
          <button className="p-1.5 hover:bg-teal-50 rounded-full text-teal-400 hover:text-teal-600 transition-colors">
            <Plus size={14} />
          </button>
          <button className="p-1.5 hover:bg-red-50 rounded-full text-teal-400 hover:text-red-500 transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const CleaningTemplate: React.FC<{ 
  item: PortfolioItem;
  isEditing?: boolean;
  onUpdate?: (updates: Partial<PortfolioItem>) => void;
  onImageClick?: (field: string) => void;
}> = ({ item, isEditing, onUpdate, onImageClick }) => {
  const handleUpdate = (field: keyof PortfolioItem, value: any) => {
    if (onUpdate) onUpdate({ [field]: value });
  };

  return (
    <div className="font-sans bg-[#F8FAFC] text-slate-800 selection:bg-teal-200 selection:text-teal-900">
      {/* Top Bar */}
      <div className="bg-teal-600 text-white py-2 px-6 text-sm font-medium flex justify-center items-center">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-teal-200" />
          <span>Get 20% off your first deep clean! Call {item.contactPhone || '(555) 123-4567'}</span>
        </div>
      </div>

      {/* Header */}
      <SectionWrapper isEditing={isEditing} label="Navigation">
        <header className="px-8 py-6 flex justify-between items-center bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-100">
          <div className="flex items-center gap-3">
            {item.logo ? (
              <img src={item.logo} alt="Logo" className="h-12 object-contain" />
            ) : (
              <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 font-black">
                <Sparkles size={24} />
              </div>
            )}
            <EditableText 
              tag="h1"
              value={item.title}
              isEditing={isEditing}
              onSave={(v) => handleUpdate('title', v)}
              className="text-2xl font-black tracking-tight text-slate-800"
            />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500">
            <a href="#" className="hover:text-teal-600 transition-colors">Services</a>
            <a href="#" className="hover:text-teal-600 transition-colors">Pricing</a>
            <a href="#" className="hover:text-teal-600 transition-colors">About</a>
            <a href="#" className="hover:text-teal-600 transition-colors">Contact</a>
          </nav>
          <button className="bg-teal-500 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/30 transition-all hover:-translate-y-0.5">
            Book a Clean
          </button>
        </header>
      </SectionWrapper>

      {/* Hero */}
      <SectionWrapper isEditing={isEditing} label="Hero Section">
        <section className="relative py-20 md:py-32 overflow-hidden px-4 md:px-8">
          <div className="max-w-7xl mx-auto bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col md:flex-row items-center border border-slate-100">
            <div className="w-full md:w-1/2 p-12 md:p-20 z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 text-sm font-bold rounded-full mb-8">
                  <Sparkles size={16} /> Top Rated in {item.location || 'Your City'}
                </div>
                <EditableText 
                  tag="h2"
                  value={item.heroHeadline || `Come home to a sparkling clean house.`}
                  isEditing={isEditing}
                  onSave={(v) => handleUpdate('heroHeadline', v)}
                  className="text-5xl md:text-6xl font-black text-slate-800 mb-6 leading-tight tracking-tight"
                />
                <EditableText 
                  tag="p"
                  value={item.heroSubheadline || `Professional, eco-friendly cleaning services tailored to your lifestyle. Relax, we've got the mess.`}
                  isEditing={isEditing}
                  onSave={(v) => handleUpdate('heroSubheadline', v)}
                  className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed max-w-lg"
                />
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-4 bg-teal-500 text-white rounded-full font-bold text-lg hover:bg-teal-600 hover:shadow-xl hover:shadow-teal-500/30 transition-all flex items-center justify-center gap-2 hover:-translate-y-1">
                    Get an Estimate <ArrowRight size={20} />
                  </button>
                  <button className="px-8 py-4 bg-slate-50 text-slate-700 rounded-full font-bold text-lg hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                    Our Services
                  </button>
                </div>
              </motion.div>
            </div>
            <div className="w-full md:w-1/2 h-[400px] md:h-[700px] relative">
              <img 
                src={item.imageUrl || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"} 
                alt="Hero" 
                className="w-full h-full object-cover rounded-l-[3rem] md:rounded-l-none md:rounded-r-[3rem]" 
                referrerPolicy="no-referrer"
              />
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity rounded-l-[3rem] md:rounded-l-none md:rounded-r-[3rem]">
                  <button 
                    onClick={() => onImageClick?.('imageUrl')}
                    className="bg-white text-teal-600 px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 hover:bg-teal-50"
                  >
                    <ImageIcon size={18} /> Change Photo
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Services */}
      <SectionWrapper isEditing={isEditing} label="Services">
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6 tracking-tight">Cleaning services for every need.</h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto">From regular upkeep to deep cleaning, our vetted professionals deliver spotless results.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Standard Cleaning', icon: Home, desc: 'Regular maintenance cleaning to keep your home fresh and tidy week after week.' },
                { title: 'Deep Cleaning', icon: Sparkles, desc: 'Thorough, top-to-bottom cleaning targeting neglected areas and built-up grime.' },
                { title: 'Move In/Out', icon: Wind, desc: 'Detailed cleaning to ensure a spotless transition for new or old residents.' },
                { title: 'Office Cleaning', icon: Layout, desc: 'Professional commercial cleaning to maintain a healthy workspace.' },
                { title: 'Eco-Friendly', icon: Droplets, desc: 'Using only non-toxic, environmentally safe products for your family and pets.' },
                { title: 'Sanitization', icon: ShieldCheck, desc: 'Hospital-grade disinfection services for high-touch surfaces.' }
              ].map((service, i) => (
                <div key={i} className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-teal-200 hover:shadow-2xl hover:shadow-teal-100/50 transition-all group hover:-translate-y-2">
                  <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-teal-500 group-hover:text-white transition-colors text-teal-500">
                    <service.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{service.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-lg">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-20 px-6 mt-12 rounded-t-[3rem] mx-4 md:mx-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800 rounded-3xl mb-8">
            <Sparkles size={40} className="text-teal-400" />
          </div>
          <h2 className="text-3xl font-black text-white mb-6">{item.title}</h2>
          <p className="text-slate-400 mb-10 max-w-md mx-auto text-lg">Making homes happier, one clean at a time. Fully bonded and insured.</p>
          <div className="flex justify-center gap-4 mb-16">
             <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors cursor-pointer"><Phone size={24} /></div>
             <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors cursor-pointer"><Mail size={24} /></div>
          </div>
          <div className="text-slate-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} {item.title}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
