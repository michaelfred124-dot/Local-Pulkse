import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Phone, Mail, MapPin, Clock, Shield, Zap, ArrowRight, Edit3, Layout, Move, Plus, Trash2, Image as ImageIcon, Lightbulb, Power, ShieldCheck, BatteryCharging, Cpu } from 'lucide-react';
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
        className={`outline-none focus:ring-2 focus:ring-cyan-500/50 rounded-md transition-all px-1 -mx-1 min-h-[1em] min-w-[50px] ${isFocused ? 'bg-cyan-500/10 shadow-[inset_0_0_10px_rgba(6,182,212,0.2)]' : 'hover:bg-cyan-500/5'}`}
      >
        {value || 'Click to add text...'}
      </Tag>
      {!isFocused && (
        <div className="absolute -top-6 left-0 opacity-0 group-hover/editable:opacity-100 transition-opacity pointer-events-none z-50">
          <div className="bg-cyan-600 text-black text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-[0_0_10px_rgba(6,182,212,0.5)] whitespace-nowrap">
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
    <div className="relative group/section border-2 border-transparent hover:border-cyan-500/40 transition-all">
      {children}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-2 border-cyan-500 opacity-0 group-hover/section:opacity-100 transition-opacity z-40 shadow-[inset_0_0_20px_rgba(6,182,212,0.2)]" />
      <div className="absolute top-0 left-4 -translate-y-1/2 opacity-0 group-hover/section:opacity-100 transition-all z-50 flex items-center gap-1">
        <div className="bg-cyan-600 text-black text-[10px] font-bold px-3 py-1 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)] flex items-center gap-2">
          <Layout size={10} /> {label.toUpperCase()}
        </div>
        <div className="flex items-center gap-1 bg-slate-900 border border-cyan-900 rounded-full p-1 shadow-lg pointer-events-auto">
          <button className="p-1 hover:bg-slate-800 rounded-full text-slate-400 hover:text-cyan-400 transition-colors">
            <Move size={12} />
          </button>
          <button className="p-1 hover:bg-slate-800 rounded-full text-slate-400 hover:text-cyan-400 transition-colors">
            <Plus size={12} />
          </button>
          <button className="p-1 hover:bg-slate-800 rounded-full text-slate-400 hover:text-red-500 transition-colors">
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ElectricianTemplate: React.FC<{ 
  item: PortfolioItem;
  isEditing?: boolean;
  onUpdate?: (updates: Partial<PortfolioItem>) => void;
  onImageClick?: (field: string) => void;
}> = ({ item, isEditing, onUpdate, onImageClick }) => {
  const handleUpdate = (field: keyof PortfolioItem, value: any) => {
    if (onUpdate) onUpdate({ [field]: value });
  };

  return (
    <div className="font-sans bg-slate-950 text-slate-300 selection:bg-cyan-500 selection:text-black">
      {/* Top Bar */}
      <div className="bg-black text-slate-400 py-2 px-6 text-xs font-mono flex justify-between items-center border-b border-cyan-900/50">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2"><Phone size={12} className="text-cyan-400" /> <span className="text-cyan-50">{item.contactPhone || 'SYS.COM: (555) 123-4567'}</span></span>
          <span className="hidden sm:flex items-center gap-2"><ShieldCheck size={12} className="text-cyan-400" /> <span className="text-cyan-50">SECURE & VERIFIED</span></span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2"><MapPin size={12} className="text-cyan-400" /> <span className="text-cyan-50">{item.location || 'LOC: SECTOR 7'}</span></span>
        </div>
      </div>

      {/* Header */}
      <SectionWrapper isEditing={isEditing} label="Navigation">
        <header className="px-6 py-4 flex justify-between items-center bg-slate-950/80 backdrop-blur-md border-b border-cyan-900/30 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            {item.logo ? (
              <img src={item.logo} alt="Logo" className="h-10 object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
            ) : (
              <div className="w-10 h-10 bg-cyan-950 rounded-lg flex items-center justify-center text-cyan-400 font-black border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Zap size={20} />
              </div>
            )}
            <EditableText 
              tag="h1"
              value={item.title}
              isEditing={isEditing}
              onSave={(v) => handleUpdate('title', v)}
              className="text-xl font-black tracking-widest uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-cyan-400 transition-colors">Services</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Tech Specs</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Comm</a>
          </nav>
          <button className="bg-transparent border border-cyan-500 text-cyan-400 px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]">
            Initialize
          </button>
        </header>
      </SectionWrapper>

      {/* Hero */}
      <SectionWrapper isEditing={isEditing} label="Hero Section">
        <section className="relative py-32 md:py-48 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={item.imageUrl || "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80"} 
              alt="Hero" 
              className="w-full h-full object-cover opacity-30 mix-blend-luminosity" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/80 to-slate-950"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onImageClick?.('imageUrl')}
                  className="bg-cyan-500 text-black px-6 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center gap-2"
                >
                  <ImageIcon size={18} /> Update Matrix
                </button>
              </div>
            )}
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono uppercase tracking-widest mb-8 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                  <Cpu size={12} /> Next-Gen Electrical Systems
                </div>
                <EditableText 
                  tag="h2"
                  value={item.heroHeadline || `Powering the Future of ${item.location || 'Your City'}.`}
                  isEditing={isEditing}
                  onSave={(v) => handleUpdate('heroHeadline', v)}
                  className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                />
                <EditableText 
                  tag="p"
                  value={item.heroSubheadline || `Advanced electrical diagnostics, smart home integration, and high-voltage commercial solutions.`}
                  isEditing={isEditing}
                  onSave={(v) => handleUpdate('heroSubheadline', v)}
                  className="text-lg md:text-xl text-cyan-100/70 mb-10 leading-relaxed font-light max-w-2xl"
                />
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-4 bg-cyan-500 text-black rounded-full font-bold uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-105 transition-all flex items-center justify-center gap-2">
                    Request Service <Zap size={16} />
                  </button>
                  <button className="px-8 py-4 bg-slate-900/50 border border-cyan-500/30 text-cyan-400 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-cyan-950/50 transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                    View Capabilities
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Services */}
      <SectionWrapper isEditing={isEditing} label="Services">
        <section className="py-24 bg-slate-950 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <div className="text-cyan-500 font-mono uppercase tracking-widest text-xs mb-4 flex items-center justify-center gap-2">
                <span className="w-8 h-px bg-cyan-500/50"></span> Core Systems <span className="w-8 h-px bg-cyan-500/50"></span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Advanced Solutions.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Smart Integration', icon: Cpu, desc: 'IoT device setup, automated lighting, and intelligent climate control systems.' },
                { title: 'Power Diagnostics', icon: Zap, desc: 'Advanced circuit testing, load balancing, and fault detection.' },
                { title: 'EV Infrastructure', icon: BatteryCharging, desc: 'Level 2 and DC fast charging station installation for residential and commercial.' },
                { title: 'Panel Upgrades', icon: Power, desc: 'High-capacity service upgrades to support modern electrical demands.' },
                { title: 'Lighting Design', icon: Lightbulb, desc: 'Energy-efficient LED retrofitting and custom architectural lighting.' },
                { title: 'Security Systems', icon: ShieldCheck, desc: 'CCTV, access control, and integrated security network installation.' }
              ].map((service, i) => (
                <div key={i} className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-cyan-500/50 transition-all group hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] backdrop-blur-sm">
                  <div className="w-12 h-12 bg-cyan-950/50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-500 group-hover:text-black transition-colors text-cyan-400 border border-cyan-500/20">
                    <service.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{service.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Footer */}
      <footer className="bg-black text-slate-500 py-16 px-6 border-t border-cyan-900/50 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-950 border border-cyan-900 rounded-2xl mb-8 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <Zap size={32} className="text-cyan-500" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-4">{item.title}</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto text-sm">Next-generation electrical services. Powering the future with precision and safety.</p>
          <div className="flex justify-center gap-4 mb-12">
             <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-colors cursor-pointer border border-slate-800 hover:border-cyan-500"><Phone size={16} /></div>
             <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-colors cursor-pointer border border-slate-800 hover:border-cyan-500"><Mail size={16} /></div>
          </div>
          <div className="text-cyan-900 text-[10px] font-mono uppercase tracking-widest">
            &copy; {new Date().getFullYear()} {item.title}. SYSTEM ONLINE.
          </div>
        </div>
      </footer>
    </div>
  );
};
