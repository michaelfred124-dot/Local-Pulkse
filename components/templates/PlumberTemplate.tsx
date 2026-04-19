import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Phone, Mail, MapPin, Clock, Shield, Zap, ArrowRight, Edit3, Layout, Move, Plus, Trash2, Image as ImageIcon, Wrench, Droplets, PenTool, ShieldCheck, Hammer } from 'lucide-react';
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
        className={`outline-none focus:ring-2 focus:ring-amber-500/50 rounded-sm transition-all px-1 -mx-1 min-h-[1em] min-w-[50px] ${isFocused ? 'bg-amber-500/10 shadow-inner' : 'hover:bg-amber-500/5'}`}
      >
        {value || 'Click to add text...'}
      </Tag>
      {!isFocused && (
        <div className="absolute -top-6 left-0 opacity-0 group-hover/editable:opacity-100 transition-opacity pointer-events-none z-50">
          <div className="bg-amber-600 text-black text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-lg whitespace-nowrap">
            <Edit3 size={8} /> EDIT
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
    <div className="relative group/section border-2 border-transparent hover:border-amber-500/40 transition-all">
      {children}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-2 border-amber-500 opacity-0 group-hover/section:opacity-100 transition-opacity z-40" />
      <div className="absolute top-0 left-4 -translate-y-1/2 opacity-0 group-hover/section:opacity-100 transition-all z-50 flex items-center gap-1">
        <div className="bg-amber-600 text-black text-[10px] font-bold px-3 py-1 rounded shadow-xl flex items-center gap-2">
          <Layout size={10} /> {label.toUpperCase()}
        </div>
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded p-1 shadow-lg pointer-events-auto">
          <button className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-amber-500 transition-colors">
            <Move size={12} />
          </button>
          <button className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-amber-500 transition-colors">
            <Plus size={12} />
          </button>
          <button className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-red-500 transition-colors">
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const PlumberTemplate: React.FC<{ 
  item: PortfolioItem;
  isEditing?: boolean;
  onUpdate?: (updates: Partial<PortfolioItem>) => void;
  onImageClick?: (field: string) => void;
}> = ({ item, isEditing, onUpdate, onImageClick }) => {
  const handleUpdate = (field: keyof PortfolioItem, value: any) => {
    if (onUpdate) onUpdate({ [field]: value });
  };

  return (
    <div className="font-sans bg-slate-100 text-slate-900 selection:bg-amber-500 selection:text-black">
      {/* Top Bar - Industrial */}
      <div className="bg-slate-950 text-slate-400 py-3 px-6 text-xs font-bold flex justify-between items-center border-b-4 border-amber-500">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 hover:text-amber-500 transition-colors cursor-pointer"><Phone size={14} className="text-amber-500" /> <span>{item.contactPhone || '24/7 Emergency: (555) 123-4567'}</span></span>
          <span className="hidden sm:flex items-center gap-2"><ShieldCheck size={14} className="text-amber-500" /> <span>Licensed & Insured #12345</span></span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2"><MapPin size={14} className="text-amber-500" /> <span>{item.location || 'Serving the Metro Area'}</span></span>
        </div>
      </div>

      {/* Header */}
      <SectionWrapper isEditing={isEditing} label="Navigation">
        <header className="px-6 py-5 flex justify-between items-center bg-white shadow-md sticky top-0 z-50">
          <div className="flex items-center gap-4">
            {item.logo ? (
              <img src={item.logo} alt="Logo" className="h-14 object-contain" />
            ) : (
              <div className="w-14 h-14 bg-slate-900 flex items-center justify-center text-amber-500 font-black">
                <Wrench size={28} />
              </div>
            )}
            <EditableText 
              tag="h1"
              value={item.title}
              isEditing={isEditing}
              onSave={(v) => handleUpdate('title', v)}
              className="text-3xl font-black tracking-tighter uppercase text-slate-900"
            />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-slate-600">
            <a href="#" className="hover:text-amber-600 transition-colors">Services</a>
            <a href="#" className="hover:text-amber-600 transition-colors">About Us</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Testimonials</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Contact</a>
          </nav>
          <button className="bg-amber-500 text-slate-950 px-8 py-4 font-black text-sm uppercase tracking-widest hover:bg-slate-900 hover:text-amber-500 transition-colors border-2 border-transparent hover:border-amber-500">
            Get a Quote
          </button>
        </header>
      </SectionWrapper>

      {/* Hero */}
      <SectionWrapper isEditing={isEditing} label="Hero Section">
        <section className="relative py-32 md:py-48 overflow-hidden bg-slate-900">
          <div className="absolute inset-0 z-0">
            <img 
              src={item.imageUrl || "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80"} 
              alt="Hero" 
              className="w-full h-full object-cover opacity-40 grayscale mix-blend-overlay" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent"></div>
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onImageClick?.('imageUrl')}
                  className="bg-amber-500 text-slate-950 px-6 py-3 font-bold flex items-center gap-2 hover:bg-amber-400"
                >
                  <ImageIcon size={18} /> Change Background
                </button>
              </div>
            )}
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl border-l-8 border-amber-500 pl-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="inline-flex items-center gap-2 text-amber-500 text-sm font-black uppercase tracking-[0.2em] mb-6">
                  <Hammer size={16} /> Professional Grade Service
                </div>
                <EditableText 
                  tag="h2"
                  value={item.heroHeadline || `Tough plumbing problems require tough solutions.`}
                  isEditing={isEditing}
                  onSave={(v) => handleUpdate('heroHeadline', v)}
                  className="text-6xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter uppercase"
                />
                <EditableText 
                  tag="p"
                  value={item.heroSubheadline || `We fix what others can't. Industrial, commercial, and residential plumbing experts serving ${item.location || 'the area'} since 1995.`}
                  isEditing={isEditing}
                  onSave={(v) => handleUpdate('heroSubheadline', v)}
                  className="text-xl md:text-2xl text-slate-300 mb-12 leading-snug font-medium max-w-2xl"
                />
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-12 py-5 bg-amber-500 text-slate-950 font-black uppercase tracking-widest text-lg hover:bg-white transition-colors flex items-center justify-center gap-3">
                    Call Now <Phone size={20} />
                  </button>
                  <button className="px-12 py-5 bg-transparent border-2 border-slate-500 text-white font-black uppercase tracking-widest text-lg hover:border-amber-500 hover:text-amber-500 transition-colors flex items-center justify-center gap-3">
                    Our Services
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Services - Grid Layout */}
      <SectionWrapper isEditing={isEditing} label="Services">
        <section className="py-24 bg-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <div className="text-amber-600 font-black uppercase tracking-[0.2em] text-sm mb-2">Our Expertise</div>
                <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-slate-900">Built to Last.</h2>
              </div>
              <p className="text-slate-600 max-w-md text-lg font-medium">
                We don't just patch problems; we engineer permanent solutions for your plumbing infrastructure.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Emergency Repairs', icon: Zap, desc: 'Rapid response team for critical failures, burst pipes, and severe leaks.' },
                { title: 'Industrial Piping', icon: Droplets, desc: 'Heavy-duty pipe installation and repair for commercial facilities.' },
                { title: 'Water Systems', icon: Shield, desc: 'High-capacity water heater installation and boiler maintenance.' },
                { title: 'Sewer Line Repair', icon: Wrench, desc: 'Trenchless repair and complete sewer line replacement.' },
                { title: 'Commercial Fixtures', icon: PenTool, desc: 'Installation of high-use commercial grade plumbing fixtures.' },
                { title: 'Diagnostics', icon: ShieldCheck, desc: 'Advanced camera inspection and leak detection services.' }
              ].map((service, i) => (
                <div key={i} className="bg-white p-8 border border-slate-200 hover:border-amber-500 transition-colors group">
                  <div className="w-16 h-16 bg-slate-100 flex items-center justify-center mb-8 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors text-slate-700">
                    <service.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight mb-4 uppercase text-slate-900">{service.title}</h3>
                  <p className="text-slate-600 font-medium">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-6 border-t-4 border-amber-500">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-6">{item.title}</h2>
            <p className="mb-6">Rugged, reliable plumbing solutions for when it absolutely has to work.</p>
            <div className="flex gap-4">
               <div className="w-10 h-10 bg-slate-900 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"><Phone size={18} /></div>
               <div className="w-10 h-10 bg-slate-900 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"><Mail size={18} /></div>
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6">Services</h3>
            <ul className="space-y-3 font-medium">
              <li><a href="#" className="hover:text-amber-500 transition-colors">Emergency Repair</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Commercial Plumbing</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Sewer & Drain</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Water Heaters</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6">Contact</h3>
            <ul className="space-y-4 font-medium">
              <li className="flex items-start gap-3"><MapPin size={20} className="text-amber-500 shrink-0" /> <span>123 Industrial Way<br/>{item.location || 'City, State 12345'}</span></li>
              <li className="flex items-center gap-3"><Phone size={20} className="text-amber-500 shrink-0" /> <span>{item.contactPhone || '(555) 123-4567'}</span></li>
              <li className="flex items-center gap-3"><Mail size={20} className="text-amber-500 shrink-0" /> <span>{item.contactEmail || 'service@example.com'}</span></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-sm font-medium flex flex-col md:flex-row justify-between items-center gap-4">
          <div>&copy; {new Date().getFullYear()} {item.title}. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

