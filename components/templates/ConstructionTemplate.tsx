import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Phone, Mail, MapPin, Clock, Shield, Zap, ArrowRight, Edit3, Layout, Move, Plus, Trash2, Image as ImageIcon, HardHat, Construction, Hammer, Ruler, Truck, ShieldCheck } from 'lucide-react';
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
        className={`outline-none focus:ring-2 focus:ring-orange-500/50 rounded-md transition-all px-1 -mx-1 min-h-[1em] min-w-[50px] ${isFocused ? 'bg-orange-500/10 shadow-inner' : 'hover:bg-orange-500/5'}`}
      >
        {value || 'Click to add text...'}
      </Tag>
      {!isFocused && (
        <div className="absolute -top-6 left-0 opacity-0 group-hover/editable:opacity-100 transition-opacity pointer-events-none z-50">
          <div className="bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-lg whitespace-nowrap">
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
    <div className="relative group/section border-2 border-transparent hover:border-orange-500/40 transition-all">
      {children}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-2 border-orange-500 opacity-0 group-hover/section:opacity-100 transition-opacity z-40" />
      <div className="absolute top-0 left-4 -translate-y-1/2 opacity-0 group-hover/section:opacity-100 transition-all z-50 flex items-center gap-1">
        <div className="bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-xl flex items-center gap-2">
          <Layout size={10} /> {label.toUpperCase()}
        </div>
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-full p-1 shadow-lg pointer-events-auto">
          <button className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-orange-600 transition-colors">
            <Move size={12} />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-orange-600 transition-colors">
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

export const ConstructionTemplate: React.FC<{ 
  item: PortfolioItem;
  isEditing?: boolean;
  onUpdate?: (updates: Partial<PortfolioItem>) => void;
  onImageClick?: (field: string) => void;
}> = ({ item, isEditing, onUpdate, onImageClick }) => {
  const handleUpdate = (field: keyof PortfolioItem, value: any) => {
    if (onUpdate) onUpdate({ [field]: value });
  };

  return (
    <div className="font-sans bg-white text-slate-900">
      {/* Top Bar - Industrial Style */}
      <div className="bg-slate-900 text-white py-2 px-6 text-xs font-bold flex justify-between items-center border-b border-orange-500/30">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-orange-500"><Phone size={12} /> <span className="text-white">{item.contactPhone || 'Call Us Today'}</span></span>
          <span className="hidden sm:flex items-center gap-1 text-orange-500"><ShieldCheck size={12} /> <span className="text-white">Safety First Since 2010</span></span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-orange-500"><MapPin size={12} /> <span className="text-white">{item.location || 'Local Service'}</span></span>
        </div>
      </div>

      {/* Header */}
      <SectionWrapper isEditing={isEditing} label="Navigation">
        <header className="px-6 py-4 flex justify-between items-center bg-white border-b-4 border-slate-900 sticky top-0 z-50">
          <div className="flex items-center gap-3">
            {item.logo ? (
              <img src={item.logo} alt="Logo" className="h-12 object-contain" />
            ) : (
              <div className="w-12 h-12 bg-slate-900 rounded-none flex items-center justify-center text-orange-500 font-black border-2 border-orange-500">
                {item.title.charAt(0)}
              </div>
            )}
            <EditableText 
              tag="h1"
              value={item.title}
              isEditing={isEditing}
              onSave={(v) => handleUpdate('title', v)}
              className="text-2xl font-black tracking-tighter uppercase italic"
            />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-widest text-slate-600">
            <a href="#" className="hover:text-orange-600 transition-colors">Services</a>
            <a href="#" className="hover:text-orange-600 transition-colors">Projects</a>
            <a href="#" className="hover:text-orange-600 transition-colors">Safety</a>
            <a href="#" className="hover:text-orange-600 transition-colors">Contact</a>
          </nav>
          <button className="bg-orange-600 text-white px-8 py-3 rounded-none font-black text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            Get Estimate
          </button>
        </header>
      </SectionWrapper>

      {/* Hero - Rugged & Bold */}
      <SectionWrapper isEditing={isEditing} label="Hero Section">
        <section className="relative py-24 md:py-40 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={item.imageUrl} 
              alt="Hero" 
              className="w-full h-full object-cover brightness-[0.4] grayscale-[0.5]" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onImageClick?.('imageUrl')}
                  className="bg-orange-600 text-white px-6 py-3 rounded-none font-bold shadow-2xl flex items-center gap-2"
                >
                  <ImageIcon size={18} /> Change Jobsite Photo
                </button>
              </div>
            )}
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-orange-600 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                  <HardHat size={14} /> Licensed & Bonded
                </div>
                <EditableText 
                  tag="h2"
                  value={item.heroHeadline || `Building the Future of ${item.location || 'Our City'}.`}
                  isEditing={isEditing}
                  onSave={(v) => handleUpdate('heroHeadline', v)}
                  className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.9] uppercase italic tracking-tighter"
                />
                <EditableText 
                  tag="p"
                  value={item.heroSubheadline || `Heavy-duty ${item.category.toLowerCase()} solutions for residential and commercial projects. We build to last.`}
                  isEditing={isEditing}
                  onSave={(v) => handleUpdate('heroSubheadline', v)}
                  className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed border-l-4 border-orange-600 pl-6 max-w-2xl"
                />
                <div className="flex flex-col sm:flex-row gap-6">
                  <button className="px-10 py-5 bg-orange-600 text-white font-black uppercase tracking-widest text-sm shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-3">
                    Start Your Project <ArrowRight size={20} />
                  </button>
                  <button className="px-10 py-5 bg-transparent border-2 border-white text-white font-black uppercase tracking-widest text-sm hover:bg-white hover:text-slate-900 transition-all">
                    Our Portfolio
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Stats Bar */}
      <div className="bg-slate-900 py-12 border-y-4 border-orange-600">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Projects Completed', value: '500+' },
            { label: 'Years Experience', value: '15+' },
            { label: 'Safety Rating', value: '100%' },
            { label: 'Expert Builders', value: '40+' }
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left border-l border-white/10 pl-6 first:border-0">
              <div className="text-3xl md:text-5xl font-black text-orange-500 mb-1 tracking-tighter">{stat.value}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services - Grid with Industrial Icons */}
      <SectionWrapper isEditing={isEditing} label="Construction Services">
        <section className="py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl">
                <div className="text-orange-600 font-black uppercase tracking-[0.3em] text-xs mb-4">Our Expertise</div>
                <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">Built with Precision. <br/>Delivered with Integrity.</h2>
              </div>
              <EditableText 
                tag="p"
                value={item.servicesText || "From groundwork to the final brick, we handle every aspect of your construction needs with professional care."}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('servicesText', v)}
                className="text-slate-500 max-w-md text-lg"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-1">
              {[
                { title: 'General Contracting', icon: Construction, desc: 'Full project management from start to finish.' },
                { title: 'Custom Building', icon: Hammer, desc: 'Unique residential and commercial structures.' },
                { title: 'Renovations', icon: Ruler, desc: 'Modernizing and expanding existing spaces.' },
                { title: 'Site Preparation', icon: Truck, desc: 'Excavation, grading, and foundation work.' },
                { title: 'Structural Engineering', icon: Shield, desc: 'Ensuring safety and longevity in every build.' },
                { title: 'Consultation', icon: HardHat, desc: 'Expert advice for your next big project.' }
              ].map((service, i) => (
                <div key={i} className="bg-white p-12 border border-slate-200 hover:bg-slate-900 hover:text-white transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-orange-600/5 -mr-8 -mt-8 rounded-full group-hover:bg-orange-600/20 transition-all"></div>
                  <service.icon size={48} className="text-orange-600 mb-8 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{service.title}</h3>
                  <p className="text-slate-500 group-hover:text-slate-400 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Safety Section - Unique to Construction */}
      <SectionWrapper isEditing={isEditing} label="Safety Standards">
        <section className="py-32 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] bg-slate-200 overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover grayscale" alt="Safety" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-orange-600 p-10 text-white shadow-2xl max-w-xs">
                <HardHat size={40} className="mb-6" />
                <h4 className="text-2xl font-black uppercase italic mb-4">Zero Incident Policy</h4>
                <p className="text-sm font-bold opacity-80 leading-relaxed">We prioritize the safety of our crew and your property above all else.</p>
              </div>
            </div>
            <div>
              <div className="text-orange-600 font-black uppercase tracking-[0.3em] text-xs mb-4">Safety First</div>
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8">Uncompromising Standards.</h2>
              <div className="space-y-8">
                {[
                  { title: 'OSHA Certified', desc: 'All team members undergo rigorous safety training.' },
                  { title: 'Daily Inspections', desc: 'Every jobsite is inspected daily for potential hazards.' },
                  { title: 'Modern Equipment', desc: 'We use only the latest, well-maintained machinery.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 bg-slate-900 text-orange-500 flex items-center justify-center shrink-0 font-black text-xl">0{i+1}</div>
                    <div>
                      <h4 className="font-black uppercase tracking-tight text-xl mb-2">{item.title}</h4>
                      <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-12 px-10 py-5 bg-slate-900 text-white font-black uppercase tracking-widest text-sm hover:bg-orange-600 transition-all">
                Read Our Safety Manual
              </button>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* About Section */}
      <SectionWrapper isEditing={isEditing} label="About Us">
        <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-600/5 skew-x-12 translate-x-32"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <div className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs mb-4">Our Legacy</div>
              <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-10">Decades of Hard Work.</h2>
              <EditableText 
                tag="p"
                value={item.aboutText || `Founded in 2010, ${item.title} has grown from a small family business to one of the most respected ${item.category.toLowerCase()} firms in the region. We don't just build structures; we build relationships.`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('aboutText', v)}
                className="text-xl text-slate-400 leading-relaxed mb-12"
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
                <div>
                  <div className="text-4xl font-black text-orange-500 mb-2">2010</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Year Founded</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-orange-500 mb-2">100%</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Local Owned</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-orange-500 mb-2">A+</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">BBB Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Reviews */}
      <SectionWrapper isEditing={isEditing} label="Client Reviews">
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">What Our Clients Say</h2>
              <div className="w-24 h-2 bg-orange-600 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-1">
              {[1, 2].map((i) => (
                <div key={i} className="bg-slate-50 p-16 border border-slate-200 relative">
                  <div className="absolute top-8 right-8 text-slate-200">
                    <Star size={64} fill="currentColor" />
                  </div>
                  <div className="flex gap-1 text-orange-500 mb-8">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={20} fill="currentColor" />)}
                  </div>
                  <p className="text-2xl font-bold italic text-slate-800 mb-10 leading-tight relative z-10">
                    "The team at {item.title} delivered our project ahead of schedule and under budget. Their attention to detail on the structural work was impressive."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-slate-900 flex items-center justify-center text-orange-500 font-black">
                      {i === 1 ? 'JD' : 'MS'}
                    </div>
                    <div>
                      <div className="font-black uppercase tracking-tight">John Doe</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Commercial Developer</div>
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
        <section className="py-32 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">Common Questions</h2>
              <p className="text-slate-400 uppercase tracking-widest text-xs font-bold">Everything you need to know before we break ground.</p>
            </div>
            <div className="space-y-6">
              {[
                { q: `How long does a typical project take?`, a: `Timeline varies by scope, but a standard residential build usually takes 6-12 months from permits to completion.` },
                { q: `Do you handle all the permits?`, a: `Yes, we manage the entire permitting process with local authorities so you don't have to.` },
                { q: `Is your work guaranteed?`, a: `Absolutely. We provide a comprehensive 10-year structural warranty on all our new builds.` }
              ].map((faq, i) => (
                <div key={i} className="group border-b border-white/10 pb-8">
                  <h4 className="font-black uppercase tracking-tight text-2xl mb-4 group-hover:text-orange-500 transition-colors flex items-center gap-4">
                    <span className="text-orange-600 text-sm">Q.</span> {faq.q}
                  </h4>
                  <p className="text-slate-400 leading-relaxed pl-8 border-l-2 border-orange-600/30">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Footer - Industrial */}
      <footer className="bg-slate-950 text-white py-32 px-6 border-t-8 border-orange-600">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-8">{item.title}</h2>
            <EditableText 
              tag="p"
              value={item.aboutText || `Your trusted partner for heavy-duty ${item.category.toLowerCase()} services.`}
              isEditing={isEditing}
              onSave={(v) => handleUpdate('aboutText', v)}
              className="text-slate-500 max-w-sm mb-12 text-lg leading-relaxed"
            />
            <div className="flex gap-6">
              <div className="w-14 h-14 bg-slate-900 border border-white/10 flex items-center justify-center hover:bg-orange-600 transition-all cursor-pointer group">
                <Phone size={24} className="group-hover:scale-110 transition-transform" />
              </div>
              <div className="w-14 h-14 bg-slate-900 border border-white/10 flex items-center justify-center hover:bg-orange-600 transition-all cursor-pointer group">
                <Mail size={24} className="group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-10 text-orange-500">Quick Navigation</h4>
            <ul className="space-y-6 text-slate-400 font-bold uppercase text-xs tracking-widest">
              <li className="hover:text-white transition-colors cursor-pointer">Our Services</li>
              <li className="hover:text-white transition-colors cursor-pointer">Project Gallery</li>
              <li className="hover:text-white transition-colors cursor-pointer">Safety Standards</li>
              <li className="hover:text-white transition-colors cursor-pointer">Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-10 text-orange-500">Headquarters</h4>
            <ul className="space-y-6 text-slate-400 text-sm font-medium">
              <li className="flex items-start gap-3"><MapPin size={18} className="text-orange-600 shrink-0" /> {item.location || 'Local Area'}</li>
              <li className="flex items-start gap-3"><Mail size={18} className="text-orange-600 shrink-0" /> {item.contactEmail || 'hello@example.com'}</li>
              <li className="flex items-start gap-3"><Phone size={18} className="text-orange-600 shrink-0" /> {item.contactPhone || '555-0123'}</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          <div>&copy; {new Date().getFullYear()} {item.title}. All rights reserved.</div>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
