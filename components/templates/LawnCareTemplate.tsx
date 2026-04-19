import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Phone, Mail, MapPin, Clock, Shield, Zap, ArrowRight, Edit3, Layout, Move, Plus, Trash2, Image as ImageIcon, Leaf, Sun, Droplets, Scissors, Sprout, Flower2 } from 'lucide-react';
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
        className={`outline-none focus:ring-2 focus:ring-lime-400 rounded-md transition-all px-1 -mx-1 min-h-[1em] min-w-[50px] ${isFocused ? 'bg-lime-50 shadow-inner' : 'hover:bg-lime-50/50'}`}
      >
        {value || 'Click to add text...'}
      </Tag>
      {!isFocused && (
        <div className="absolute -top-6 left-0 opacity-0 group-hover/editable:opacity-100 transition-opacity pointer-events-none z-50">
          <div className="bg-lime-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-lg whitespace-nowrap">
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
    <div className="relative group/section border-2 border-transparent hover:border-lime-400 transition-all">
      {children}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-2 border-lime-500 opacity-0 group-hover/section:opacity-100 transition-opacity z-40" />
      <div className="absolute top-0 left-4 -translate-y-1/2 opacity-0 group-hover/section:opacity-100 transition-all z-50 flex items-center gap-1">
        <div className="bg-lime-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-xl flex items-center gap-2">
          <Layout size={10} /> {label.toUpperCase()}
        </div>
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-full p-1 shadow-lg pointer-events-auto">
          <button className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-lime-600 transition-colors">
            <Move size={12} />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-lime-600 transition-colors">
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

export const LawnCareTemplate: React.FC<{ 
  item: PortfolioItem;
  isEditing?: boolean;
  onUpdate?: (updates: Partial<PortfolioItem>) => void;
  onImageClick?: (field: string) => void;
}> = ({ item, isEditing, onUpdate, onImageClick }) => {
  const handleUpdate = (field: keyof PortfolioItem, value: any) => {
    if (onUpdate) onUpdate({ [field]: value });
  };

  return (
    <div className="font-sans bg-white text-emerald-950">
      {/* Top Bar - Fresh & Natural */}
      <div className="bg-emerald-900 text-white py-2 px-6 text-xs font-bold flex justify-between items-center border-b border-lime-400/30">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-lime-400"><Phone size={12} /> <span className="text-white">{item.contactPhone || 'Free Quote Today'}</span></span>
          <span className="hidden sm:flex items-center gap-1 text-lime-400"><Sun size={12} /> <span className="text-white">Serving {item.location || 'Your Community'}</span></span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-lime-400"><MapPin size={12} /> <span className="text-white">Eco-Friendly Solutions</span></span>
        </div>
      </div>

      {/* Header */}
      <SectionWrapper isEditing={isEditing} label="Navigation">
        <header className="px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-emerald-50">
          <div className="flex items-center gap-3">
            {item.logo ? (
              <img src={item.logo} alt="Logo" className="h-12 object-contain" />
            ) : (
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                <Leaf size={28} />
              </div>
            )}
            <EditableText 
              tag="h1"
              value={item.title}
              isEditing={isEditing}
              onSave={(v) => handleUpdate('title', v)}
              className="text-2xl font-black tracking-tight text-emerald-900"
            />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-widest text-emerald-800/60">
            <a href="#" className="hover:text-lime-600 transition-colors">Services</a>
            <a href="#" className="hover:text-lime-600 transition-colors">Maintenance</a>
            <a href="#" className="hover:text-lime-600 transition-colors">Reviews</a>
            <a href="#" className="hover:text-lime-600 transition-colors">Contact</a>
          </nav>
          <button className="bg-lime-500 text-emerald-950 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-lime-500/20 hover:bg-lime-400 transition-all">
            Get Free Quote
          </button>
        </header>
      </SectionWrapper>

      {/* Hero - Vibrant & Lush */}
      <SectionWrapper isEditing={isEditing} label="Hero Section">
        <section className="relative py-24 md:py-40 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={item.imageUrl} 
              alt="Lawn" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-emerald-950/40 to-transparent"></div>
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onImageClick?.('imageUrl')}
                  className="bg-lime-500 text-emerald-950 px-6 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-2"
                >
                  <ImageIcon size={18} /> Change Lawn Photo
                </button>
              </div>
            )}
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-lime-500 text-emerald-950 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
                  <Sprout size={14} /> Professional Lawn Care
                </div>
                <EditableText 
                  tag="h2"
                  value={item.heroHeadline || `The Greenest Lawn on the Block, Guaranteed.`}
                  isEditing={isEditing}
                  onSave={(v) => handleUpdate('heroHeadline', v)}
                  className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter"
                />
                <EditableText 
                  tag="p"
                  value={item.heroSubheadline || `Expert mowing, fertilization, and landscaping services in ${item.location || 'your neighborhood'}. We treat your lawn like our own.`}
                  isEditing={isEditing}
                  onSave={(v) => handleUpdate('heroSubheadline', v)}
                  className="text-lg md:text-xl text-emerald-50/80 mb-12 leading-relaxed max-w-2xl"
                />
                <div className="flex flex-col sm:flex-row gap-6">
                  <button className="px-10 py-5 bg-lime-500 text-emerald-950 font-black uppercase tracking-widest text-sm rounded-2xl shadow-2xl shadow-lime-500/30 hover:scale-105 transition-all flex items-center justify-center gap-3">
                    Claim Your Free Quote <ArrowRight size={20} />
                  </button>
                  <button className="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-white/20 transition-all">
                    See Our Work
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Features Bar */}
      <div className="bg-emerald-900 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Eco-Friendly', icon: Sprout },
            { label: 'Licensed & Insured', icon: Shield },
            { label: 'Expert Team', icon: Check },
            { label: 'Satisfaction Guaranteed', icon: Star }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 bg-lime-500/10 text-lime-400 rounded-full flex items-center justify-center border border-lime-500/20">
                <feature.icon size={24} />
              </div>
              <div className="text-xs font-black text-white uppercase tracking-widest">{feature.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Grid - Natural Style */}
      <SectionWrapper isEditing={isEditing} label="Lawn Services">
        <section className="py-32 bg-emerald-50/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24">
              <div className="text-lime-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Our Services</div>
              <h2 className="text-4xl md:text-6xl font-black text-emerald-900 tracking-tighter">Everything Your Lawn Needs.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Precision Mowing', icon: Scissors, desc: 'Weekly or bi-weekly mowing, edging, and blowing for a crisp look.' },
                { title: 'Fertilization', icon: Sprout, desc: 'Custom nutrient plans to keep your grass thick and vibrant.' },
                { title: 'Weed Control', icon: Flower2, desc: 'Targeted treatments to eliminate weeds without harming your lawn.' },
                { title: 'Aeration & Seeding', icon: Droplets, desc: 'Revitalize tired lawns and promote deep root growth.' },
                { title: 'Landscaping', icon: Leaf, desc: 'Mulching, planting, and design to enhance your curb appeal.' },
                { title: 'Seasonal Cleanup', icon: Sun, desc: 'Spring and Fall cleanups to keep your property tidy year-round.' }
              ].map((service, i) => (
                <div key={i} className="p-12 rounded-[3rem] bg-white border border-emerald-100 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all group">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-lime-500 group-hover:text-emerald-950 transition-all">
                    <service.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-emerald-900 mb-4 tracking-tight">{service.title}</h3>
                  <p className="text-emerald-800/50 leading-relaxed mb-8">
                    {service.desc}
                  </p>
                  <button className="text-emerald-900 font-black text-[10px] uppercase tracking-widest border-b-2 border-lime-500 pb-1 hover:border-emerald-900 transition-all">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* About Us - Friendly & Local */}
      <SectionWrapper isEditing={isEditing} label="About Us">
        <section className="py-32 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl rotate-3">
                <img src="https://images.unsplash.com/photo-1558904541-efa8c1965f1e?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" alt="Team" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-emerald-900 p-12 rounded-[3rem] shadow-2xl text-white">
                <div className="text-5xl font-black text-lime-500 mb-2">10+</div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-60">Years of Green</div>
              </div>
            </div>
            <div>
              <div className="text-lime-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Our Story</div>
              <h2 className="text-4xl md:text-7xl font-black text-emerald-900 tracking-tighter mb-10 leading-none">Passionate About Your Lawn.</h2>
              <EditableText 
                tag="p"
                value={item.aboutText || `At ${item.title}, we're more than just a mowing service. We're your neighbors, dedicated to making ${item.location || 'our community'} more beautiful one yard at a time.`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('aboutText', v)}
                className="text-xl text-emerald-800/60 leading-relaxed mb-12"
              />
              <div className="space-y-6">
                {[
                  'Locally Owned & Operated',
                  '100% Satisfaction Guarantee',
                  'Eco-Friendly Products Only'
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-lime-500 text-emerald-950 rounded-full flex items-center justify-center">
                      <Check size={14} strokeWidth={4} />
                    </div>
                    <span className="font-bold text-emerald-900">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Reviews - Happy Neighbors */}
      <SectionWrapper isEditing={isEditing} label="Reviews">
        <section className="py-32 bg-emerald-900 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter">What Your Neighbors Say.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white/5 p-12 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all">
                  <div className="flex gap-1 text-lime-500 mb-8">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-lg font-bold text-emerald-50/80 mb-10 leading-relaxed italic">
                    "The best lawn service we've ever had. They are reliable, professional, and our grass has never looked better. Highly recommend!"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-800 flex items-center justify-center text-lime-500 font-black">
                      {i === 1 ? 'JS' : i === 2 ? 'RB' : 'MK'}
                    </div>
                    <div>
                      <div className="font-black text-white">John Smith</div>
                      <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Homeowner</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper isEditing={isEditing} label="FAQ">
        <section className="py-32 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-black text-emerald-900 tracking-tighter">Lawn Care FAQ.</h2>
            </div>
            <div className="space-y-4">
              {[
                { q: 'How often should my lawn be mowed?', a: 'During the growing season, we recommend weekly mowing to maintain optimal grass health and appearance.' },
                { q: 'Do I need to be home for the service?', a: 'Not at all! As long as we have access to your yard, we can perform the service and send you a notification when finished.' },
                { q: 'What if it rains on my scheduled day?', a: 'If weather prevents us from mowing, we will automatically reschedule for the next available clear day.' }
              ].map((faq, i) => (
                <div key={i} className="bg-emerald-50/50 p-8 rounded-3xl border border-emerald-100">
                  <h4 className="font-black text-xl mb-4 text-emerald-900 flex items-center gap-4">
                    <span className="text-lime-600">Q.</span> {faq.q}
                  </h4>
                  <p className="text-emerald-800/50 leading-relaxed pl-8">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Footer - Natural & Bold */}
      <footer className="bg-emerald-950 text-white py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-12 h-12 bg-lime-500 text-emerald-950 rounded-2xl flex items-center justify-center">
                  <Leaf size={28} />
               </div>
               <h2 className="text-3xl font-black tracking-tight">{item.title}</h2>
            </div>
            <EditableText 
              tag="p"
              value={item.aboutText || `Making ${item.location || 'our community'} greener, one lawn at a time.`}
              isEditing={isEditing}
              onSave={(v) => handleUpdate('aboutText', v)}
              className="text-emerald-50/40 max-w-sm mb-12 text-lg leading-relaxed"
            />
            <div className="flex gap-6">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center hover:bg-lime-500 hover:text-emerald-950 transition-all cursor-pointer">
                <Phone size={24} />
              </div>
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center hover:bg-lime-500 hover:text-emerald-950 transition-all cursor-pointer">
                <Mail size={24} />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-black uppercase tracking-widest text-[10px] mb-10 text-lime-500">Our Services</h4>
            <ul className="space-y-6 text-emerald-50/40 font-bold uppercase text-[10px] tracking-widest">
              <li className="hover:text-lime-500 transition-colors cursor-pointer">Lawn Mowing</li>
              <li className="hover:text-lime-500 transition-colors cursor-pointer">Fertilization</li>
              <li className="hover:text-lime-500 transition-colors cursor-pointer">Weed Control</li>
              <li className="hover:text-lime-500 transition-colors cursor-pointer">Landscaping</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase tracking-widest text-[10px] mb-10 text-lime-500">Contact Us</h4>
            <ul className="space-y-6 text-emerald-50/40 text-sm font-medium">
              <li className="flex items-start gap-3"><MapPin size={18} className="text-lime-500 shrink-0" /> {item.location || 'Local Area'}</li>
              <li className="flex items-start gap-3"><Mail size={18} className="text-lime-500 shrink-0" /> {item.contactEmail || 'hello@example.com'}</li>
              <li className="flex items-start gap-3"><Phone size={18} className="text-lime-500 shrink-0" /> {item.contactPhone || '555-0123'}</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 text-center text-emerald-800 text-[10px] font-bold uppercase tracking-[0.3em]">
          &copy; {new Date().getFullYear()} {item.title}. Your Lawn's Best Friend.
        </div>
      </footer>
    </div>
  );
};
