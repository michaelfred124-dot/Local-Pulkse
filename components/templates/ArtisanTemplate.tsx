import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Phone, Mail, MapPin, Clock, Shield, Zap, ArrowRight, Edit3, Layout, Move, Plus, Trash2, Image as ImageIcon, Hammer, Flame, Sparkles } from 'lucide-react';
import { PortfolioItem } from '../../types';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  isEditing?: boolean;
  className?: string;
  multiline?: boolean;
  tag?: keyof React.JSX.IntrinsicElements;
}

const EditableText: React.FC<EditableTextProps> = ({ 
  value, 
  onSave, 
  isEditing, 
  className = '', 
  multiline = false,
  tag: Tag = 'div' as any
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const textRef = React.useRef<HTMLElement>(null);

  if (!isEditing) {
    return <Tag className={className} dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, '<br/>') }} />;
  }

  const CustomTag = Tag as any;

  return (
    <div className={`relative group/text ${isFocused ? 'ring-2 ring-brand-accent ring-offset-2 rounded' : ''}`}>
      <CustomTag
        ref={textRef as any}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e: any) => {
          setIsFocused(false);
          onSave(e.currentTarget.innerText);
        }}
        onFocus={() => setIsFocused(true)}
        className={`outline-none min-w-[20px] ${className}`}
        dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, '<br/>') }}
      />
      {!isFocused && (
        <div className="absolute -top-6 -right-2 opacity-0 group-hover/text:opacity-100 transition-opacity bg-brand-accent text-white p-1 rounded shadow-lg pointer-events-none">
          <Edit3 size={10} />
        </div>
      )}
    </div>
  );
};

const SectionWrapper: React.FC<{ children: React.ReactNode; isEditing?: boolean; label: string }> = ({ children, isEditing, label }) => {
  if (!isEditing) return <>{children}</>;
  return (
    <div className="relative group/section border-2 border-transparent hover:border-brand-accent/30 transition-all">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/section:opacity-100 transition-opacity z-10 flex items-center gap-2 bg-brand-accent text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-xl">
        <Layout size={12} />
        {label.toUpperCase()}
        <div className="flex items-center gap-1 ml-2 border-l border-white/20 pl-2">
          <Move size={12} className="cursor-move" />
          <Plus size={12} className="cursor-pointer" />
          <Trash2 size={12} className="cursor-pointer" />
        </div>
      </div>
      {children}
    </div>
  );
};

export const ArtisanTemplate: React.FC<{ 
  item: PortfolioItem; 
  isEditing?: boolean;
  onUpdate?: (updates: Partial<PortfolioItem>) => void;
  onImageClick?: (field: string) => void;
}> = ({ item, isEditing, onUpdate, onImageClick }) => {
  const updateField = (field: string, value: string) => {
    onUpdate?.({ [field]: value });
  };

  return (
    <div className="font-mono text-brand-primary bg-[#121212] selection:bg-orange-500 selection:text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-8 max-w-7xl mx-auto border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-600 flex items-center justify-center text-white shadow-2xl shadow-orange-600/20">
            <Flame size={28} />
          </div>
          <EditableText 
            value={item.title || "Forge Spark"} 
            onSave={(v) => updateField('title', v)}
            isEditing={isEditing}
            className="text-2xl font-black uppercase tracking-tighter text-white"
          />
        </div>
        <div className="hidden md:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
          <a href="#" className="hover:text-orange-500 transition-colors">The Forge</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Gallery</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Custom Work</a>
          <button className="px-8 py-3 bg-white text-black rounded-none hover:bg-orange-600 hover:text-white transition-all font-black uppercase tracking-widest">
            Shop Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <SectionWrapper isEditing={isEditing} label="Hero">
        <section className="relative py-24 md:py-48 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative z-10"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-orange-600/10 text-orange-500 border border-orange-600/20 text-[10px] font-black uppercase tracking-[0.3em] mb-10">
                <Hammer size={14} />
                <EditableText 
                  value={item.category || "Handcrafted in the Forge"} 
                  onSave={(v) => updateField('category', v)}
                  isEditing={isEditing}
                />
              </div>
              <EditableText 
                value={item.description || "Art Born from Fire and Steel."} 
                onSave={(v) => updateField('description', v)}
                isEditing={isEditing}
                tag="h1"
                className="text-6xl md:text-8xl font-black text-white mb-10 leading-[0.9] uppercase italic"
              />
              <p className="text-lg text-white/40 mb-12 max-w-lg leading-relaxed font-medium">
                Unique metal figurines and artistic creations, meticulously crafted to spark conversation and inspire the soul.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="px-10 py-5 bg-orange-600 text-white font-black uppercase tracking-widest hover:bg-orange-700 transition-all shadow-2xl shadow-orange-600/20 flex items-center justify-center gap-3">
                  View Collection <ArrowRight size={20} />
                </button>
                <button className="px-10 py-5 bg-transparent border border-white/20 text-white font-black uppercase tracking-widest hover:border-orange-500 transition-all">
                  Custom Orders
                </button>
              </div>
            </motion.div>

            <div className="relative group/image cursor-pointer" onClick={() => onImageClick?.('imageUrl')}>
              <div className="aspect-square bg-white/5 border border-white/10 p-4 relative">
                <div className="w-full h-full overflow-hidden relative">
                  <img 
                    src={item.imageUrl || "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                    alt="Artisan" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-orange-600" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-orange-600" />
              </div>
              {isEditing && (
                <div className="absolute inset-0 bg-orange-600/20 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity">
                  <ImageIcon className="text-white" size={48} />
                </div>
              )}
              <div className="absolute -bottom-10 -right-10 bg-orange-600 p-8 text-white shadow-2xl hidden md:block">
                <div className="text-4xl font-black mb-1">100%</div>
                <div className="text-[10px] font-black uppercase tracking-widest">Handcrafted Quality</div>
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Gallery Section */}
      <SectionWrapper isEditing={isEditing} label="Gallery">
        <section className="py-32 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div>
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic leading-none mb-4">The Collection</h2>
                <p className="text-white/40 max-w-md font-medium uppercase tracking-widest text-xs">A showcase of our most recent sparks of inspiration.</p>
              </div>
              <button className="text-orange-500 font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:gap-5 transition-all">
                View All Works <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              {[
                "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&w=600&q=80"
              ].map((img, i) => (
                <div key={i} className="aspect-square overflow-hidden relative group/item cursor-pointer">
                  <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt="Work" />
                  <div className="absolute inset-0 bg-orange-600/80 opacity-0 group-hover/item:opacity-100 transition-opacity flex flex-col items-center justify-center p-8 text-center">
                    <Sparkles className="text-white mb-4" size={24} />
                    <h4 className="text-white font-black uppercase tracking-widest text-sm mb-2">Piece #{i + 101}</h4>
                    <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">Limited Edition</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Pricing Section */}
      <SectionWrapper isEditing={isEditing} label="Pricing">
        <section className="py-32 bg-white/5 border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic mb-6">Ownership Plans</h2>
              <p className="text-white/40 uppercase tracking-widest text-xs font-black">Invest in unique, handcrafted artistry.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="p-12 border border-white/10 relative group hover:border-orange-600 transition-all">
                <div className="mb-12">
                  <h3 className="text-xl font-black text-white uppercase tracking-widest mb-4">Collector Tier</h3>
                  <div className="flex items-baseline gap-3">
                    <span className="text-6xl font-black text-white">$49</span>
                    <span className="text-white/20 font-black uppercase tracking-widest text-xs">/month</span>
                  </div>
                </div>
                <ul className="space-y-6 mb-16">
                  {['Monthly Mini Figurine', 'Early Access to Drops', 'Collector Newsletter', '10% Shop Discount'].map((f, i) => (
                    <li key={i} className="flex items-center gap-4 text-white/60 text-xs font-black uppercase tracking-widest">
                      <div className="w-4 h-4 border border-orange-600 flex items-center justify-center shrink-0">
                        <Check size={10} className="text-orange-500" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-5 border border-white/20 text-white font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                  Join Collectors
                </button>
              </div>
              <div className="p-12 bg-orange-600 relative group shadow-2xl shadow-orange-600/20">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-1.5 text-[10px] font-black uppercase tracking-[0.3em]">
                  Elite Artisan
                </div>
                <div className="mb-12">
                  <h3 className="text-xl font-black text-white uppercase tracking-widest mb-4">Master Tier</h3>
                  <div className="flex items-baseline gap-3">
                    <span className="text-6xl font-black text-white">$100</span>
                    <span className="text-white/40 font-black uppercase tracking-widest text-xs">/month</span>
                  </div>
                </div>
                <ul className="space-y-6 mb-16">
                  {['Custom Large Figurine', '1-on-1 Design Session', 'Exclusive Master Pieces', '25% Shop Discount', 'Worldwide Shipping'].map((f, i) => (
                    <li key={i} className="flex items-center gap-4 text-white text-xs font-black uppercase tracking-widest">
                      <div className="w-4 h-4 bg-white flex items-center justify-center shrink-0">
                        <Check size={10} className="text-orange-600" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-5 bg-white text-black font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                  Join Masters
                </button>
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Footer */}
      <footer className="py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-20">
          <div className="col-span-2">
            <div className="flex items-center gap-4 mb-10">
              <Flame className="text-orange-600" size={40} />
              <span className="text-3xl font-black uppercase tracking-tighter text-white">Forge Spark</span>
            </div>
            <p className="text-white/30 max-w-sm leading-relaxed mb-12 font-medium uppercase tracking-widest text-xs">
              Meticulously handcrafted metal art. Every piece tells a story of heat, pressure, and creative vision.
            </p>
            <div className="flex gap-8">
              {[Phone, Mail, MapPin].map((Icon, i) => (
                <div key={i} className="text-white/20 hover:text-orange-500 transition-all cursor-pointer">
                  <Icon size={24} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-10">The Forge</h4>
            <ul className="space-y-6 text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Our Process</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">The Gallery</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Custom Work</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Shop</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-10">Support</h4>
            <ul className="space-y-6 text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Care Guide</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-32 mt-32 border-t border-white/5 text-center text-white/10 text-[10px] font-black tracking-[0.5em] uppercase">
          © 2026 Forge Spark Artisan Metalwork.
        </div>
      </footer>
    </div>
  );
};
