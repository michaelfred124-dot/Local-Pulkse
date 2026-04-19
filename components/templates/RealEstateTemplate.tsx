import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Phone, Mail, MapPin, Clock, Shield, Zap, ArrowRight, Edit3, Layout, Move, Plus, Trash2, Image as ImageIcon, Home, Key, Building, Map } from 'lucide-react';
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
        className={`outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all px-1 -mx-1 min-h-[1em] min-w-[50px] ${isFocused ? 'bg-[#D4AF37]/5' : 'hover:bg-[#D4AF37]/5'}`}
      >
        {value || 'Click to add text...'}
      </Tag>
      {!isFocused && (
        <div className="absolute -top-6 left-0 opacity-0 group-hover/editable:opacity-100 transition-opacity pointer-events-none z-50">
          <div className="bg-[#D4AF37] text-white text-[10px] font-sans tracking-widest uppercase px-2 py-0.5 flex items-center gap-1 shadow-md whitespace-nowrap">
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
    <div className="relative group/section border border-transparent hover:border-[#D4AF37]/40 transition-all">
      {children}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none border border-[#D4AF37] opacity-0 group-hover/section:opacity-100 transition-opacity z-40" />
      <div className="absolute top-0 left-4 -translate-y-1/2 opacity-0 group-hover/section:opacity-100 transition-all z-50 flex items-center gap-1">
        <div className="bg-[#D4AF37] text-white text-[10px] font-sans tracking-widest uppercase px-3 py-1 shadow-md flex items-center gap-2">
          <Layout size={10} /> {label}
        </div>
        <div className="flex items-center gap-1 bg-white border border-gray-200 p-1 shadow-md pointer-events-auto">
          <button className="p-1 hover:bg-gray-50 text-gray-400 hover:text-[#D4AF37] transition-colors">
            <Move size={12} />
          </button>
          <button className="p-1 hover:bg-gray-50 text-gray-400 hover:text-[#D4AF37] transition-colors">
            <Plus size={12} />
          </button>
          <button className="p-1 hover:bg-gray-50 text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const RealEstateTemplate: React.FC<{ 
  item: PortfolioItem;
  isEditing?: boolean;
  onUpdate?: (updates: Partial<PortfolioItem>) => void;
  onImageClick?: (field: string) => void;
}> = ({ item, isEditing, onUpdate, onImageClick }) => {
  const handleUpdate = (field: keyof PortfolioItem, value: any) => {
    if (onUpdate) onUpdate({ [field]: value });
  };

  return (
    <div className="font-serif bg-[#FAFAFA] text-[#2C3E50] selection:bg-[#D4AF37] selection:text-white">
      {/* Top Bar */}
      <div className="bg-[#2C3E50] text-white/70 py-3 px-8 text-xs font-sans tracking-widest uppercase flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors cursor-pointer"><Phone size={14} className="text-[#D4AF37]" /> <span>{item.contactPhone || '(555) 123-4567'}</span></span>
          <span className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors cursor-pointer"><Mail size={14} className="text-[#D4AF37]" /> <span>{item.contactEmail || 'inquiries@estate.com'}</span></span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2"><MapPin size={14} className="text-[#D4AF37]" /> <span>{item.location || 'Beverly Hills, CA'}</span></span>
        </div>
      </div>

      {/* Header */}
      <SectionWrapper isEditing={isEditing} label="Navigation">
        <header className="px-8 py-6 flex justify-between items-center bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
          <div className="flex items-center gap-4">
            {item.logo ? (
              <img src={item.logo} alt="Logo" className="h-12 object-contain" />
            ) : (
              <div className="w-12 h-12 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                <Home size={24} strokeWidth={1} />
              </div>
            )}
            <EditableText 
              tag="h1"
              value={item.title}
              isEditing={isEditing}
              onSave={(v) => handleUpdate('title', v)}
              className="text-2xl font-normal tracking-widest uppercase text-[#2C3E50]"
            />
          </div>
          <nav className="hidden md:flex items-center gap-10 text-xs font-sans tracking-[0.2em] uppercase text-[#2C3E50]/70">
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Properties</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Neighborhoods</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">About</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Contact</a>
          </nav>
          <button className="border border-[#2C3E50] text-[#2C3E50] px-8 py-3 font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#2C3E50] hover:text-white transition-colors">
            List With Us
          </button>
        </header>
      </SectionWrapper>

      {/* Hero */}
      <SectionWrapper isEditing={isEditing} label="Hero Section">
        <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={item.imageUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"} 
              alt="Hero" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onImageClick?.('imageUrl')}
                  className="bg-white text-[#2C3E50] px-8 py-4 font-sans tracking-widest uppercase text-sm flex items-center gap-3 hover:bg-[#D4AF37] hover:text-white transition-colors"
                >
                  <ImageIcon size={18} /> Update Hero Image
                </button>
              </div>
            )}
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="inline-flex items-center justify-center gap-3 text-white/90 text-xs font-sans tracking-[0.3em] uppercase mb-8">
                <span className="w-12 h-px bg-[#D4AF37]"></span>
                Exceptional Living
                <span className="w-12 h-px bg-[#D4AF37]"></span>
              </div>
              <EditableText 
                tag="h2"
                value={item.heroHeadline || `Discover Your Next Extraordinary Property.`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('heroHeadline', v)}
                className="text-5xl md:text-7xl font-normal text-white mb-8 leading-tight drop-shadow-lg"
              />
              <EditableText 
                tag="p"
                value={item.heroSubheadline || `Curating the finest luxury real estate in ${item.location || 'the world\'s most desirable locations'}.`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('heroSubheadline', v)}
                className="text-lg md:text-xl text-white/90 mb-12 font-light tracking-wide max-w-2xl mx-auto drop-shadow-md"
              />
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="px-10 py-4 bg-[#D4AF37] text-white font-sans tracking-[0.2em] uppercase text-sm hover:bg-[#b5952f] transition-colors">
                  View Portfolio
                </button>
                <button className="px-10 py-4 bg-transparent border border-white text-white font-sans tracking-[0.2em] uppercase text-sm hover:bg-white hover:text-[#2C3E50] transition-colors">
                  Contact an Agent
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </SectionWrapper>

      {/* Services */}
      <SectionWrapper isEditing={isEditing} label="Services">
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-24">
              <div className="text-[#D4AF37] font-sans tracking-[0.3em] uppercase text-xs mb-6">Our Expertise</div>
              <h2 className="text-4xl md:text-5xl font-normal text-[#2C3E50]">Bespoke Real Estate Services.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { title: 'Luxury Sales', icon: Home, desc: 'Representing buyers and sellers of the most distinguished properties with unmatched discretion.' },
                { title: 'Property Management', icon: Key, desc: 'Comprehensive management services for premium residential and commercial investments.' },
                { title: 'Commercial Real Estate', icon: Building, desc: 'Strategic advisory and brokerage for high-value commercial acquisitions and leasing.' },
                { title: 'Relocation Services', icon: Map, desc: 'Seamless transition assistance for executives and families moving globally.' },
                { title: 'Market Analysis', icon: Clock, desc: 'In-depth, data-driven insights into local and global luxury real estate trends.' },
                { title: 'Private Brokerage', icon: Shield, desc: 'Exclusive, off-market property access for our most discerning clientele.' }
              ].map((service, i) => (
                <div key={i} className="text-center group">
                  <div className="w-20 h-20 mx-auto border border-gray-200 rounded-full flex items-center justify-center mb-8 group-hover:border-[#D4AF37] transition-colors">
                    <service.icon size={32} className="text-[#2C3E50] group-hover:text-[#D4AF37] transition-colors" strokeWidth={1} />
                  </div>
                  <h3 className="text-xl font-normal text-[#2C3E50] mb-4 tracking-wide">{service.title}</h3>
                  <p className="text-gray-500 font-sans font-light leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Footer */}
      <footer className="bg-[#2C3E50] text-white/60 py-24 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-normal tracking-widest uppercase text-white mb-8">{item.title}</h2>
            <p className="font-sans font-light leading-relaxed max-w-md mb-8">
              Setting the standard for luxury real estate. We provide unparalleled service, profound market knowledge, and absolute discretion.
            </p>
            <div className="flex gap-6">
               <a href="#" className="hover:text-[#D4AF37] transition-colors"><Phone size={20} strokeWidth={1.5} /></a>
               <a href="#" className="hover:text-[#D4AF37] transition-colors"><Mail size={20} strokeWidth={1.5} /></a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-sans tracking-[0.2em] uppercase text-xs mb-8">Properties</h3>
            <ul className="space-y-4 font-sans font-light text-sm">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Featured Listings</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Off-Market</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">New Developments</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Recently Sold</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-sans tracking-[0.2em] uppercase text-xs mb-8">Contact</h3>
            <ul className="space-y-6 font-sans font-light text-sm">
              <li className="flex items-start gap-4"><MapPin size={18} className="text-[#D4AF37] shrink-0" strokeWidth={1.5} /> <span>{item.location || '100 Luxury Way, Suite 100\nBeverly Hills, CA 90210'}</span></li>
              <li className="flex items-center gap-4"><Phone size={18} className="text-[#D4AF37] shrink-0" strokeWidth={1.5} /> <span>{item.contactPhone || '(555) 123-4567'}</span></li>
              <li className="flex items-center gap-4"><Mail size={18} className="text-[#D4AF37] shrink-0" strokeWidth={1.5} /> <span>{item.contactEmail || 'inquiries@estate.com'}</span></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 text-xs font-sans tracking-widest uppercase flex flex-col md:flex-row justify-between items-center gap-6">
          <div>&copy; {new Date().getFullYear()} {item.title}. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
