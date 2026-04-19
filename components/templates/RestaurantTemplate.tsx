import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Phone, Mail, MapPin, Clock, Shield, Zap, ArrowRight, Edit3, Layout, Move, Plus, Trash2, Image as ImageIcon, UtensilsCrossed, Wine, ChefHat, GlassWater, CalendarDays, Instagram } from 'lucide-react';
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
        className={`outline-none focus:ring-2 focus:ring-amber-500/50 rounded-md transition-all px-1 -mx-1 min-h-[1em] min-w-[50px] ${isFocused ? 'bg-amber-500/10 shadow-inner' : 'hover:bg-amber-500/5'}`}
      >
        {value || 'Click to add text...'}
      </Tag>
      {!isFocused && (
        <div className="absolute -top-6 left-0 opacity-0 group-hover/editable:opacity-100 transition-opacity pointer-events-none z-50">
          <div className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-lg whitespace-nowrap">
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
        <div className="bg-amber-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-xl flex items-center gap-2">
          <Layout size={10} /> {label.toUpperCase()}
        </div>
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-full p-1 shadow-lg pointer-events-auto">
          <button className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-amber-600 transition-colors">
            <Move size={12} />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-amber-600 transition-colors">
            <Plus size={12} />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const RestaurantTemplate: React.FC<{ 
  item: PortfolioItem;
  isEditing?: boolean;
  onUpdate?: (updates: Partial<PortfolioItem>) => void;
  onImageClick?: (field: string) => void;
}> = ({ item, isEditing, onUpdate, onImageClick }) => {
  const handleUpdate = (field: keyof PortfolioItem, value: any) => {
    if (onUpdate) onUpdate({ [field]: value });
  };

  return (
    <div className="font-serif bg-[#0a0a0a] text-[#f5f5f5]">
      {/* Top Bar - Elegant & Minimal */}
      <div className="bg-black text-amber-500/60 py-2 px-6 text-[10px] font-bold flex justify-between items-center tracking-[0.3em] uppercase border-b border-white/5">
        <div className="flex items-center gap-8">
          <span className="flex items-center gap-2"><Phone size={12} /> {item.contactPhone || 'Reservations'}</span>
          <span className="hidden sm:flex items-center gap-2"><MapPin size={12} /> {item.location || 'Downtown'}</span>
        </div>
        <div className="flex items-center gap-8">
          <span className="flex items-center gap-2"><Instagram size={12} /> Follow Our Journey</span>
        </div>
      </div>

      {/* Header */}
      <SectionWrapper isEditing={isEditing} label="Navigation">
        <header className="px-6 py-8 flex justify-between items-center bg-black/80 backdrop-blur-2xl sticky top-0 z-50 border-b border-white/5">
          <div className="flex items-center gap-4">
            {item.logo ? (
              <img src={item.logo} alt="Logo" className="h-10 object-contain" />
            ) : (
              <div className="w-10 h-10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold italic">
                {item.title.charAt(0)}
              </div>
            )}
            <EditableText 
              tag="h1"
              value={item.title}
              isEditing={isEditing}
              onSave={(v) => handleUpdate('title', v)}
              className="text-2xl font-bold tracking-tighter uppercase italic text-amber-500"
            />
          </div>
          <nav className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">
            <a href="#" className="hover:text-amber-500 transition-colors">The Menu</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Our Story</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Private Events</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Contact</a>
          </nav>
          <button className="bg-amber-600 text-black px-10 py-3 rounded-none font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-amber-500 transition-all">
            Book a Table
          </button>
        </header>
      </SectionWrapper>

      {/* Hero - Cinematic & High-End */}
      <SectionWrapper isEditing={isEditing} label="Hero Section">
        <section className="relative h-[90vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={item.imageUrl} 
              alt="Restaurant" 
              className="w-full h-full object-cover brightness-[0.3] scale-105" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onImageClick?.('imageUrl')}
                  className="bg-amber-600 text-black px-8 py-4 rounded-none font-bold shadow-2xl flex items-center gap-2"
                >
                  <ImageIcon size={18} /> Change Atmosphere Photo
                </button>
              </div>
            )}
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
            >
              <div className="inline-flex items-center gap-4 px-6 py-2 border border-amber-500/30 text-amber-500 text-[10px] font-bold uppercase tracking-[0.5em] mb-12">
                <ChefHat size={16} /> A Culinary Masterpiece
              </div>
              <EditableText 
                tag="h2"
                value={item.heroHeadline || `Elevated Dining. <br/>Unforgettable Moments.`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('heroHeadline', v)}
                className="text-6xl md:text-9xl font-bold text-white mb-12 leading-[0.9] tracking-tighter italic"
              />
              <EditableText 
                tag="p"
                value={item.heroSubheadline || `Experience the finest ${item.category.toLowerCase()} cuisine in the heart of ${item.location || 'the city'}. Crafted with passion, served with elegance.`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('heroSubheadline', v)}
                className="text-lg md:text-2xl text-white/40 mb-16 leading-relaxed max-w-3xl mx-auto font-light italic"
              />
              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <button className="px-12 py-6 bg-amber-600 text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-amber-500 transition-all flex items-center justify-center gap-4">
                  Explore The Menu <ArrowRight size={20} />
                </button>
                <button className="px-12 py-6 bg-transparent border border-white/20 text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-black transition-all">
                  Our Story
                </button>
              </div>
            </motion.div>
          </div>
          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
            <div className="text-[8px] font-bold uppercase tracking-[0.5em]">Scroll</div>
            <div className="w-[1px] h-12 bg-gradient-to-b from-amber-500 to-transparent"></div>
          </div>
        </section>
      </SectionWrapper>

      {/* Signature Dishes - Unique to Restaurant */}
      <SectionWrapper isEditing={isEditing} label="Signature Dishes">
        <section className="py-40 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-24 items-center mb-40">
              <div>
                <div className="text-amber-500 font-bold uppercase tracking-[0.5em] text-[10px] mb-8">Chef's Selection</div>
                <h2 className="text-5xl md:text-7xl font-bold italic mb-12 leading-tight">Art on a Plate.</h2>
                <p className="text-white/40 text-xl leading-relaxed mb-12 font-light italic">
                  Our kitchen is a laboratory of flavor, where traditional techniques meet modern inspiration. Every ingredient is sourced from local artisans who share our commitment to quality.
                </p>
                <div className="space-y-12">
                  {[
                    { title: 'The Signature Fillet', desc: 'Aged for 28 days, served with truffle-infused marrow.' },
                    { title: 'Wild Sea Bass', desc: 'Pan-seared with saffron foam and garden-fresh herbs.' }
                  ].map((dish, i) => (
                    <div key={i} className="group cursor-pointer">
                      <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-2 group-hover:border-amber-500 transition-colors">
                        <h4 className="text-2xl font-bold italic">{dish.title}</h4>
                        <span className="text-amber-500 font-bold tracking-widest">$48</span>
                      </div>
                      <p className="text-white/30 text-sm italic">{dish.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden border border-white/5">
                  <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Dish" referrerPolicy="no-referrer" />
                </div>
                <div className="absolute -bottom-12 -left-12 bg-amber-600 p-12 text-black shadow-2xl">
                  <UtensilsCrossed size={40} className="mb-6" />
                  <div className="text-2xl font-bold italic mb-2">Michelin Star</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Standards of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Atmosphere Gallery */}
      <SectionWrapper isEditing={isEditing} label="Atmosphere Gallery">
        <section className="py-40 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-32">
              <h2 className="text-5xl md:text-8xl font-bold italic tracking-tighter mb-8">The Atmosphere.</h2>
              <div className="w-24 h-[1px] bg-amber-500 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 aspect-video overflow-hidden border border-white/5">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover brightness-50 hover:brightness-100 transition-all duration-700" alt="Interior" referrerPolicy="no-referrer" />
              </div>
              <div className="aspect-square md:aspect-auto overflow-hidden border border-white/5">
                <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover brightness-50 hover:brightness-100 transition-all duration-700" alt="Bar" referrerPolicy="no-referrer" />
              </div>
              <div className="aspect-square md:aspect-auto overflow-hidden border border-white/5">
                <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover brightness-50 hover:brightness-100 transition-all duration-700" alt="Table" referrerPolicy="no-referrer" />
              </div>
              <div className="md:col-span-2 aspect-video overflow-hidden border border-white/5">
                <img src="https://images.unsplash.com/photo-1550966841-3ee5ad60d0d9?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover brightness-50 hover:brightness-100 transition-all duration-700" alt="Kitchen" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* About Section - Heritage */}
      <SectionWrapper isEditing={isEditing} label="Our Heritage">
        <section className="py-40 bg-black text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-32 items-center">
            <div>
              <div className="text-amber-500 font-bold uppercase tracking-[0.5em] text-[10px] mb-8">Our Heritage</div>
              <h2 className="text-5xl md:text-7xl font-bold italic mb-12 leading-tight">A Legacy of Flavor.</h2>
              <EditableText 
                tag="p"
                value={item.aboutText || `Founded with a vision to redefine the dining experience, ${item.title} has become a beacon of culinary innovation. Our journey is one of constant evolution, fueled by a respect for tradition and a hunger for the new.`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('aboutText', v)}
                className="text-xl text-white/40 leading-relaxed mb-16 font-light italic"
              />
              <div className="grid grid-cols-3 gap-12">
                <div>
                  <div className="text-3xl font-bold text-amber-500 mb-2 italic">12</div>
                  <div className="text-[8px] font-bold text-white/20 uppercase tracking-[0.3em]">Years</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-500 mb-2 italic">3</div>
                  <div className="text-[8px] font-bold text-white/20 uppercase tracking-[0.3em]">Awards</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-500 mb-2 italic">100%</div>
                  <div className="text-[8px] font-bold text-white/20 uppercase tracking-[0.3em]">Passion</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 rounded-full border border-amber-500/20 p-4 animate-spin-slow">
                <div className="w-full h-full rounded-full border border-amber-500/40 p-4">
                  <div className="w-full h-full rounded-full border border-amber-500 flex items-center justify-center">
                    <Wine size={64} className="text-amber-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Reviews */}
      <SectionWrapper isEditing={isEditing} label="Guest Experiences">
        <section className="py-40 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-1">
              {[1, 2].map(i => (
                <div key={i} className="bg-black p-20 border border-white/5 relative group hover:border-amber-500/30 transition-all duration-700">
                  <div className="flex gap-2 text-amber-500 mb-12">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-3xl font-bold italic text-white mb-16 leading-tight">
                    "An absolute sensory journey. The attention to detail in both the service and the cuisine is unparalleled in {item.location || 'the city'}."
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full border border-amber-500/20 flex items-center justify-center text-amber-500 font-bold italic">
                      {i === 1 ? 'ER' : 'LW'}
                    </div>
                    <div>
                      <div className="font-bold text-white tracking-widest uppercase text-xs">Eleanor Rigby</div>
                      <div className="text-[8px] font-bold text-white/20 uppercase tracking-[0.3em] mt-1">Food Critic</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Reservations CTA */}
      <SectionWrapper isEditing={isEditing} label="Reservations">
        <section className="py-40 bg-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
             <img src="https://images.unsplash.com/photo-1550966841-3ee5ad60d0d9?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover" alt="BG" referrerPolicy="no-referrer" />
          </div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl md:text-8xl font-bold italic tracking-tighter mb-12">Join Our Table.</h2>
            <p className="text-white/40 text-xl mb-16 font-light italic">Secure your experience today. We look forward to welcoming you.</p>
            <button className="px-16 py-8 bg-amber-600 text-black font-bold uppercase tracking-[0.3em] text-sm hover:bg-amber-500 transition-all shadow-2xl shadow-amber-600/20">
              Make a Reservation
            </button>
          </div>
        </section>
      </SectionWrapper>

      {/* Footer */}
      <footer className="bg-black text-white py-40 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-24">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-bold italic text-amber-500 mb-12">{item.title}</h2>
            <EditableText 
              tag="p"
              value={item.aboutText || `A sanctuary for the senses. A celebration of flavor.`}
              isEditing={isEditing}
              onSave={(v) => handleUpdate('aboutText', v)}
              className="text-white/30 max-w-sm mb-16 text-xl leading-relaxed italic font-light"
            />
            <div className="flex gap-8">
              <div className="w-16 h-16 rounded-none border border-white/10 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-all cursor-pointer">
                <Instagram size={24} />
              </div>
              <div className="w-16 h-16 rounded-none border border-white/10 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-all cursor-pointer">
                <Phone size={24} />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-[0.4em] text-[10px] mb-12 text-amber-500/40">Navigation</h4>
            <ul className="space-y-8 text-white/40 font-bold uppercase text-[10px] tracking-[0.3em]">
              <li className="hover:text-amber-500 cursor-pointer transition-colors">The Menu</li>
              <li className="hover:text-amber-500 cursor-pointer transition-colors">Private Dining</li>
              <li className="hover:text-amber-500 cursor-pointer transition-colors">Gift Vouchers</li>
              <li className="hover:text-amber-500 cursor-pointer transition-colors">Careers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-[0.4em] text-[10px] mb-12 text-amber-500/40">Location</h4>
            <ul className="space-y-8 text-white/40 text-xs font-light italic">
              <li className="flex items-start gap-4"><MapPin size={18} className="text-amber-500 shrink-0" /> {item.location || 'Downtown Plaza'}</li>
              <li className="flex items-start gap-4"><Clock size={18} className="text-amber-500 shrink-0" /> Tue-Sun: 5pm - 11pm</li>
              <li className="flex items-start gap-4"><Phone size={18} className="text-amber-500 shrink-0" /> {item.contactPhone || '555-0123'}</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-white/10 text-[8px] font-bold uppercase tracking-[0.5em]">
          <div>&copy; {new Date().getFullYear()} {item.title}. All Rights Reserved.</div>
          <div className="flex gap-12">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
