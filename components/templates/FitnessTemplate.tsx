import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Phone, Mail, MapPin, Clock, Shield, Zap, ArrowRight, Edit3, Layout, Move, Plus, Trash2, Image as ImageIcon, Dumbbell, Activity, Heart, Flame } from 'lucide-react';
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
        className={`outline-none focus:ring-4 focus:ring-[#E63946]/50 transition-all px-1 -mx-1 min-h-[1em] min-w-[50px] ${isFocused ? 'bg-[#E63946]/20' : 'hover:bg-[#E63946]/10'}`}
      >
        {value || 'Click to add text...'}
      </Tag>
      {!isFocused && (
        <div className="absolute -top-6 left-0 opacity-0 group-hover/editable:opacity-100 transition-opacity pointer-events-none z-50">
          <div className="bg-[#E63946] text-white text-[10px] font-black tracking-widest uppercase px-2 py-0.5 flex items-center gap-1 whitespace-nowrap">
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
    <div className="relative group/section border-4 border-transparent hover:border-[#E63946]/40 transition-all">
      {children}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-4 border-[#E63946] opacity-0 group-hover/section:opacity-100 transition-opacity z-40" />
      <div className="absolute top-0 left-4 -translate-y-1/2 opacity-0 group-hover/section:opacity-100 transition-all z-50 flex items-center gap-1">
        <div className="bg-[#E63946] text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 flex items-center gap-2">
          <Layout size={10} /> {label}
        </div>
        <div className="flex items-center gap-1 bg-black border-2 border-[#E63946] p-1 pointer-events-auto">
          <button className="p-1 hover:bg-[#E63946] text-white transition-colors">
            <Move size={12} />
          </button>
          <button className="p-1 hover:bg-[#E63946] text-white transition-colors">
            <Plus size={12} />
          </button>
          <button className="p-1 hover:bg-white text-[#E63946] transition-colors">
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const FitnessTemplate: React.FC<{ 
  item: PortfolioItem;
  isEditing?: boolean;
  onUpdate?: (updates: Partial<PortfolioItem>) => void;
  onImageClick?: (field: string) => void;
}> = ({ item, isEditing, onUpdate, onImageClick }) => {
  const handleUpdate = (field: keyof PortfolioItem, value: any) => {
    if (onUpdate) onUpdate({ [field]: value });
  };

  return (
    <div className="font-sans bg-black text-white selection:bg-[#E63946] selection:text-white overflow-x-hidden">
      {/* Top Bar */}
      <div className="bg-[#E63946] text-white py-2 px-6 text-xs font-black tracking-widest uppercase flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2"><Phone size={14} /> <span>{item.contactPhone || 'JOIN NOW: (555) 123-4567'}</span></span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2"><MapPin size={14} /> <span>{item.location || 'FIND YOUR NEAREST LOCATION'}</span></span>
        </div>
      </div>

      {/* Header */}
      <SectionWrapper isEditing={isEditing} label="Navigation">
        <header className="px-8 py-6 flex justify-between items-center bg-black/90 backdrop-blur-md sticky top-0 z-50 border-b-4 border-white/10">
          <div className="flex items-center gap-4">
            {item.logo ? (
              <img src={item.logo} alt="Logo" className="h-12 object-contain" />
            ) : (
              <div className="w-12 h-12 bg-[#E63946] flex items-center justify-center text-white font-black transform -skew-x-12">
                <Dumbbell size={24} className="transform skew-x-12" />
              </div>
            )}
            <EditableText 
              tag="h1"
              value={item.title}
              isEditing={isEditing}
              onSave={(v) => handleUpdate('title', v)}
              className="text-3xl font-black tracking-tighter uppercase text-white italic"
            />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-black tracking-widest uppercase text-white/70">
            <a href="#" className="hover:text-[#E63946] transition-colors">Classes</a>
            <a href="#" className="hover:text-[#E63946] transition-colors">Trainers</a>
            <a href="#" className="hover:text-[#E63946] transition-colors">Membership</a>
            <a href="#" className="hover:text-[#E63946] transition-colors">Contact</a>
          </nav>
          <button className="bg-white text-black px-8 py-3 font-black text-sm tracking-widest uppercase hover:bg-[#E63946] hover:text-white transition-colors transform -skew-x-12">
            <span className="block transform skew-x-12">Free Trial</span>
          </button>
        </header>
      </SectionWrapper>

      {/* Hero */}
      <SectionWrapper isEditing={isEditing} label="Hero Section">
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={item.imageUrl || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=80"} 
              alt="Hero" 
              className="w-full h-full object-cover grayscale opacity-60" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onImageClick?.('imageUrl')}
                  className="bg-[#E63946] text-white px-8 py-4 font-black tracking-widest uppercase text-sm flex items-center gap-3 hover:bg-white hover:text-black transition-colors transform -skew-x-12"
                >
                  <span className="block transform skew-x-12 flex items-center gap-2"><ImageIcon size={18} /> Change Image</span>
                </button>
              </div>
            )}
          </div>
          <div className="relative z-10 px-8 md:px-16 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-3 text-[#E63946] text-sm font-black tracking-[0.3em] uppercase mb-6 bg-black/50 px-4 py-2 border-l-4 border-[#E63946]">
                <Flame size={18} /> Push Your Limits
              </div>
              <EditableText 
                tag="h2"
                value={item.heroHeadline || `NO EXCUSES.\nJUST RESULTS.`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('heroHeadline', v)}
                className="text-7xl md:text-9xl font-black text-white mb-8 leading-[0.85] tracking-tighter uppercase italic"
              />
              <EditableText 
                tag="p"
                value={item.heroSubheadline || `Join the most intense fitness community in ${item.location || 'the city'}. State-of-the-art equipment, elite trainers, and a culture of hard work.`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('heroSubheadline', v)}
                className="text-xl md:text-2xl text-white/80 mb-12 font-medium max-w-2xl border-l-4 border-white pl-6"
              />
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="px-12 py-5 bg-[#E63946] text-white font-black tracking-[0.2em] uppercase text-lg hover:bg-white hover:text-black transition-colors transform -skew-x-12 flex items-center justify-center">
                  <span className="block transform skew-x-12 flex items-center gap-2">Start Training <ArrowRight size={24} /></span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </SectionWrapper>

      {/* Services */}
      <SectionWrapper isEditing={isEditing} label="Services">
        <section className="py-32 bg-white text-black relative">
          <div className="absolute top-0 left-0 w-full h-4 bg-[#E63946]"></div>
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div>
                <div className="text-[#E63946] font-black tracking-[0.3em] uppercase text-sm mb-4">The Arsenal</div>
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">Train<br/>Insane.</h2>
              </div>
              <p className="text-xl font-bold max-w-md border-l-4 border-black pl-6">
                Everything you need to build strength, increase endurance, and crush your goals.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Strength Training', icon: Dumbbell, desc: 'Free weights, squat racks, and plate-loaded machines for serious lifters.' },
                { title: 'HIIT Classes', icon: Flame, desc: 'High-intensity interval training to burn fat and build cardiovascular endurance.' },
                { title: 'Personal Coaching', icon: Activity, desc: '1-on-1 guidance from elite trainers to maximize your potential.' },
                { title: 'Cardio Zone', icon: Heart, desc: 'Treadmills, rowers, and bikes equipped with the latest tracking tech.' },
                { title: 'Functional Turf', icon: Layout, desc: 'Open space for sled pushes, kettlebells, and dynamic movements.' },
                { title: 'Recovery', icon: Shield, desc: 'Saunas, cold plunges, and mobility tools to bounce back faster.' }
              ].map((service, i) => (
                <div key={i} className="bg-black text-white p-10 transform hover:-translate-y-2 hover:bg-[#E63946] transition-all group border-b-8 border-transparent hover:border-black">
                  <div className="w-16 h-16 bg-white text-black flex items-center justify-center mb-8 transform -skew-x-12">
                    <service.icon size={32} className="transform skew-x-12" />
                  </div>
                  <h3 className="text-3xl font-black uppercase italic tracking-tight mb-4">{service.title}</h3>
                  <p className="text-white/80 font-medium text-lg">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Footer */}
      <footer className="bg-black text-white py-24 px-8 border-t-8 border-[#E63946]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
          <div>
            <h2 className="text-5xl font-black tracking-tighter uppercase italic mb-8">{item.title}</h2>
            <p className="font-bold text-lg mb-8 text-white/70">
              More than a gym. A community of individuals dedicated to self-improvement.
            </p>
            <div className="flex gap-4">
               <div className="w-12 h-12 bg-white text-black flex items-center justify-center hover:bg-[#E63946] hover:text-white transition-colors cursor-pointer transform -skew-x-12"><Phone size={20} className="transform skew-x-12" /></div>
               <div className="w-12 h-12 bg-white text-black flex items-center justify-center hover:bg-[#E63946] hover:text-white transition-colors cursor-pointer transform -skew-x-12"><Mail size={20} className="transform skew-x-12" /></div>
            </div>
          </div>
          <div>
            <h3 className="text-[#E63946] font-black tracking-[0.2em] uppercase text-xl mb-8">Quick Links</h3>
            <ul className="space-y-4 font-bold text-lg">
              <li><a href="#" className="hover:text-[#E63946] transition-colors">Class Schedule</a></li>
              <li><a href="#" className="hover:text-[#E63946] transition-colors">Meet the Team</a></li>
              <li><a href="#" className="hover:text-[#E63946] transition-colors">Membership Plans</a></li>
              <li><a href="#" className="hover:text-[#E63946] transition-colors">Drop-in Rates</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#E63946] font-black tracking-[0.2em] uppercase text-xl mb-8">Location</h3>
            <ul className="space-y-6 font-bold text-lg">
              <li className="flex items-start gap-4"><MapPin size={24} className="text-[#E63946] shrink-0" /> <span>{item.location || '123 Iron Street\nMuscle City, MC 90000'}</span></li>
              <li className="flex items-center gap-4"><Phone size={24} className="text-[#E63946] shrink-0" /> <span>{item.contactPhone || '(555) 123-4567'}</span></li>
              <li className="flex items-center gap-4"><Clock size={24} className="text-[#E63946] shrink-0" /> <span>Mon-Sun: 5AM - 11PM</span></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t-4 border-white/10 text-sm font-black tracking-widest uppercase flex flex-col md:flex-row justify-between items-center gap-6">
          <div>&copy; {new Date().getFullYear()} {item.title}. NO RIGHTS RESERVED.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#E63946] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#E63946] transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
