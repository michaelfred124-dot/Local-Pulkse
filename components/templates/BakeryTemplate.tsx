import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Phone, Mail, MapPin, Clock, Shield, Zap, ArrowRight, Edit3, Layout, Move, Plus, Trash2, Image as ImageIcon, Utensils, Coffee, Cake, Croissant, Heart, Instagram } from 'lucide-react';
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
        className={`outline-none focus:ring-2 focus:ring-pink-300 rounded-md transition-all px-1 -mx-1 min-h-[1em] min-w-[50px] ${isFocused ? 'bg-pink-50 shadow-inner' : 'hover:bg-pink-50/50'}`}
      >
        {value || 'Click to add text...'}
      </Tag>
      {!isFocused && (
        <div className="absolute -top-6 left-0 opacity-0 group-hover/editable:opacity-100 transition-opacity pointer-events-none z-50">
          <div className="bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-lg whitespace-nowrap">
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
    <div className="relative group/section border-2 border-transparent hover:border-pink-300 transition-all">
      {children}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-2 border-pink-400 opacity-0 group-hover/section:opacity-100 transition-opacity z-40" />
      <div className="absolute top-0 left-4 -translate-y-1/2 opacity-0 group-hover/section:opacity-100 transition-all z-50 flex items-center gap-1">
        <div className="bg-pink-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-xl flex items-center gap-2">
          <Layout size={10} /> {label.toUpperCase()}
        </div>
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-full p-1 shadow-lg pointer-events-auto">
          <button className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-pink-500 transition-colors">
            <Move size={12} />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-pink-500 transition-colors">
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

export const BakeryTemplate: React.FC<{ 
  item: PortfolioItem;
  isEditing?: boolean;
  onUpdate?: (updates: Partial<PortfolioItem>) => void;
  onImageClick?: (field: string) => void;
}> = ({ item, isEditing, onUpdate, onImageClick }) => {
  const handleUpdate = (field: keyof PortfolioItem, value: any) => {
    if (onUpdate) onUpdate({ [field]: value });
  };

  return (
    <div className="font-sans bg-[#fffcf9] text-[#4b2c20]">
      {/* Top Bar - Warm & Cozy */}
      <div className="bg-[#4b2c20] text-[#fffcf9] py-2 px-6 text-xs font-medium flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Phone size={12} className="text-pink-300" /> {item.contactPhone || 'Call Us'}</span>
          <span className="hidden sm:flex items-center gap-1"><Clock size={12} className="text-pink-300" /> Fresh Daily from 6am</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Instagram size={12} className="text-pink-300" /> @{item.title.toLowerCase().replace(/\s/g, '')}</span>
        </div>
      </div>

      {/* Header */}
      <SectionWrapper isEditing={isEditing} label="Navigation">
        <header className="px-6 py-6 flex justify-between items-center bg-[#fffcf9]/80 backdrop-blur-md sticky top-0 z-50 border-b border-pink-100">
          <div className="flex items-center gap-3">
            {item.logo ? (
              <img src={item.logo} alt="Logo" className="h-12 object-contain" />
            ) : (
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-serif text-2xl font-bold italic">
                {item.title.charAt(0)}
              </div>
            )}
            <EditableText 
              tag="h1"
              value={item.title}
              isEditing={isEditing}
              onSave={(v) => handleUpdate('title', v)}
              className="text-2xl font-serif font-bold italic tracking-tight text-[#4b2c20]"
            />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-[#4b2c20]/70">
            <a href="#" className="hover:text-pink-500 transition-colors">Menu</a>
            <a href="#" className="hover:text-pink-500 transition-colors">Our Story</a>
            <a href="#" className="hover:text-pink-500 transition-colors">Custom Cakes</a>
            <a href="#" className="hover:text-pink-500 transition-colors">Contact</a>
          </nav>
          <button className="bg-pink-500 text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg shadow-pink-200 hover:bg-pink-600 transition-all">
            Order Online
          </button>
        </header>
      </SectionWrapper>

      {/* Hero - Sweet & Inviting */}
      <SectionWrapper isEditing={isEditing} label="Hero Section">
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-50 text-pink-600 text-xs font-black uppercase tracking-widest rounded-full mb-8">
                <Heart size={14} className="fill-pink-600" /> Baked with Love
              </div>
              <EditableText 
                tag="h2"
                value={item.heroHeadline || `Freshly Baked Happiness in ${item.location || 'Every Bite'}.`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('heroHeadline', v)}
                className="text-5xl md:text-7xl font-serif font-bold italic text-[#4b2c20] mb-8 leading-[1.1]"
              />
              <EditableText 
                tag="p"
                value={item.heroSubheadline || `From artisanal sourdough to custom celebration cakes, we bring the warmth of our oven to your home in ${item.location || 'the neighborhood'}.`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('heroSubheadline', v)}
                className="text-lg md:text-xl text-[#4b2c20]/60 mb-12 leading-relaxed"
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-10 py-4 bg-[#4b2c20] text-white font-bold rounded-full shadow-xl hover:bg-[#3a2219] transition-all flex items-center justify-center gap-2">
                  View Today's Menu <ArrowRight size={20} />
                </button>
                <button className="px-10 py-4 bg-white border-2 border-pink-100 text-pink-500 font-bold rounded-full hover:bg-pink-50 transition-all">
                  Custom Orders
                </button>
              </div>
            </motion.div>
            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl rotate-3">
                <img 
                  src={item.imageUrl} 
                  alt="Bakery" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onImageClick?.('imageUrl')}
                      className="bg-white text-pink-500 px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2"
                    >
                      <ImageIcon size={18} /> Change Cover Photo
                    </button>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl -rotate-6 border border-pink-50">
                <div className="flex gap-1 text-pink-400 mb-2">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                </div>
                <div className="text-sm font-bold text-[#4b2c20]">"Best croissants in town!"</div>
                <div className="text-[10px] text-[#4b2c20]/40 font-bold uppercase tracking-widest mt-1">- Local Foodie</div>
              </div>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-pink-100/30 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl -z-10"></div>
        </section>
      </SectionWrapper>

      {/* Menu Highlights - Unique to Bakery */}
      <SectionWrapper isEditing={isEditing} label="Menu Highlights">
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-serif font-bold italic mb-4">Fresh from the Oven</h2>
              <p className="text-[#4b2c20]/50 max-w-2xl mx-auto">Handcrafted daily using only the finest organic ingredients.</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { title: 'Artisan Breads', icon: Utensils, price: 'From $6', desc: 'Sourdough, Rye, and Baguettes.' },
                { title: 'Sweet Pastries', icon: Croissant, price: 'From $4', desc: 'Flaky croissants and danishes.' },
                { title: 'Custom Cakes', icon: Cake, price: 'From $45', desc: 'For your most special moments.' },
                { title: 'Fresh Coffee', icon: Coffee, price: 'From $3', desc: 'Locally roasted premium beans.' }
              ].map((item, i) => (
                <div key={i} className="group text-center">
                  <div className="w-20 h-20 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white transition-all duration-500">
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <div className="text-pink-500 font-bold text-sm mb-3">{item.price}</div>
                  <p className="text-[#4b2c20]/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* About Section - Cozy Storytelling */}
      <SectionWrapper isEditing={isEditing} label="Our Story">
        <section className="py-24 bg-[#fffcf9]">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80" className="rounded-3xl shadow-xl" alt="Baking" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=400&q=80" className="rounded-3xl shadow-xl" alt="Pastries" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-4">
                  <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80" className="rounded-3xl shadow-xl" alt="Shop" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=400&q=80" className="rounded-3xl shadow-xl" alt="Cakes" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="text-pink-500 font-black uppercase tracking-[0.3em] text-xs mb-4">Our Story</div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold italic mb-8 leading-tight">Tradition in Every Crumb.</h2>
              <EditableText 
                tag="p"
                value={item.aboutText || `It all started in a small home kitchen with a single rolling pin and a dream. Today, ${item.title} is a beloved neighborhood staple, committed to the art of traditional baking and the joy of sharing good food.`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('aboutText', v)}
                className="text-lg text-[#4b2c20]/60 leading-relaxed mb-10"
              />
              <div className="flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-pink-100 flex items-center justify-center text-pink-500 font-bold text-xs">
                      {i === 1 ? '👨‍🍳' : i === 2 ? '👩‍🍳' : '🥖'}
                    </div>
                  ))}
                </div>
                <div className="text-sm font-bold text-[#4b2c20]">
                  Join our <span className="text-pink-500">2,000+</span> happy regulars.
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Reviews */}
      <SectionWrapper isEditing={isEditing} label="Reviews">
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-1">
                <h2 className="text-4xl font-serif font-bold italic mb-6">What Our Neighbors Say</h2>
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-5xl font-bold text-[#4b2c20]">4.9</div>
                  <div>
                    <div className="flex gap-1 text-pink-400">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                    </div>
                    <div className="text-xs font-bold text-[#4b2c20]/40 uppercase tracking-widest mt-1">500+ Reviews</div>
                  </div>
                </div>
                <button className="text-pink-500 font-bold border-b-2 border-pink-500 pb-1 hover:text-pink-600 hover:border-pink-600 transition-all">
                  Read All Reviews
                </button>
              </div>
              <div className="md:col-span-2 grid sm:grid-cols-2 gap-8">
                {[1, 2].map(i => (
                  <div key={i} className="bg-pink-50/30 p-8 rounded-[2rem] border border-pink-50">
                    <p className="text-[#4b2c20]/70 italic mb-6">
                      "The sourdough here is life-changing. I come every Saturday morning just for the warm baguettes and a latte. Truly a gem in {item.location || 'town'}."
                    </p>
                    <div className="font-bold text-sm">- Sarah Jenkins</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper isEditing={isEditing} label="FAQ">
        <section className="py-24 bg-[#fffcf9]">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold italic mb-4">Bakery FAQ</h2>
            </div>
            <div className="space-y-6">
              {[
                { q: 'Do you offer gluten-free options?', a: 'Yes! We have a dedicated selection of gluten-free pastries and breads baked fresh every morning.' },
                { q: 'How far in advance should I order a custom cake?', a: 'We recommend at least 7 days notice for custom celebration cakes to ensure we can perfect your design.' },
                { q: 'Do you cater for events?', a: 'Absolutely. We offer catering packages for corporate events, weddings, and private parties.' }
              ].map((faq, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-pink-50">
                  <h4 className="font-bold text-lg mb-3 flex items-center gap-3 text-pink-500">
                    <Plus size={18} /> {faq.q}
                  </h4>
                  <p className="text-[#4b2c20]/50 text-sm leading-relaxed pl-8">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Footer */}
      <footer className="bg-[#4b2c20] text-[#fffcf9] py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-serif font-bold italic mb-8">{item.title}</h2>
            <EditableText 
              tag="p"
              value={item.aboutText || `Baking the world a better place, one pastry at a time.`}
              isEditing={isEditing}
              onSave={(v) => handleUpdate('aboutText', v)}
              className="text-[#fffcf9]/60 max-w-sm mb-12 text-lg leading-relaxed"
            />
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-500 transition-all cursor-pointer">
                <Instagram size={20} />
              </div>
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-500 transition-all cursor-pointer">
                <Phone size={20} />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-8 text-pink-300 uppercase tracking-widest text-xs">Explore</h4>
            <ul className="space-y-4 text-[#fffcf9]/60 text-sm font-bold">
              <li className="hover:text-pink-300 cursor-pointer transition-colors">Daily Menu</li>
              <li className="hover:text-pink-300 cursor-pointer transition-colors">Custom Cakes</li>
              <li className="hover:text-pink-300 cursor-pointer transition-colors">Gift Cards</li>
              <li className="hover:text-pink-300 cursor-pointer transition-colors">Work with Us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8 text-pink-300 uppercase tracking-widest text-xs">Visit Us</h4>
            <ul className="space-y-4 text-[#fffcf9]/60 text-sm">
              <li className="flex items-start gap-3"><MapPin size={18} className="text-pink-300 shrink-0" /> {item.location || 'Local Area'}</li>
              <li className="flex items-start gap-3"><Clock size={18} className="text-pink-300 shrink-0" /> Tue-Sun: 6am - 4pm</li>
              <li className="flex items-start gap-3"><Phone size={18} className="text-pink-300 shrink-0" /> {item.contactPhone || '555-0123'}</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 text-center text-[#fffcf9]/30 text-xs font-bold uppercase tracking-widest">
          &copy; {new Date().getFullYear()} {item.title}. Handcrafted with Love.
        </div>
      </footer>
    </div>
  );
};
