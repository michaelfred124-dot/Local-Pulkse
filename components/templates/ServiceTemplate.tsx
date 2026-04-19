import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Phone, Mail, MapPin, Clock, Shield, Zap, ArrowRight, Edit3, Layout, Move, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
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
        className={`outline-none focus:ring-2 focus:ring-brand-accent/50 rounded-md transition-all px-1 -mx-1 min-h-[1em] min-w-[50px] ${isFocused ? 'bg-brand-accent/10 shadow-inner' : 'hover:bg-brand-accent/5'}`}
      >
        {value || 'Click to add text...'}
      </Tag>
      {!isFocused && (
        <div className="absolute -top-6 left-0 opacity-0 group-hover/editable:opacity-100 transition-opacity pointer-events-none z-50">
          <div className="bg-brand-accent text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-lg whitespace-nowrap">
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
    <div className="relative group/section border-2 border-transparent hover:border-brand-accent/40 transition-all">
      {children}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-2 border-brand-accent opacity-0 group-hover/section:opacity-100 transition-opacity z-40" />
      <div className="absolute top-0 left-4 -translate-y-1/2 opacity-0 group-hover/section:opacity-100 transition-all z-50 flex items-center gap-1">
        <div className="bg-brand-accent text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-xl flex items-center gap-2">
          <Layout size={10} /> {label.toUpperCase()}
        </div>
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-full p-1 shadow-lg pointer-events-auto">
          <button className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-brand-accent transition-colors">
            <Move size={12} />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-brand-accent transition-colors">
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

export const ServiceTemplate: React.FC<{ 
  item: PortfolioItem;
  isEditing?: boolean;
  onUpdate?: (updates: Partial<PortfolioItem>) => void;
  onImageClick?: (field: string) => void;
}> = ({ item, isEditing, onUpdate, onImageClick }) => {
  const handleUpdate = (field: keyof PortfolioItem, value: any) => {
    if (onUpdate) onUpdate({ [field]: value });
  };

  return (
    <div className="font-sans bg-white text-gray-900">
      {/* Top Bar */}
      <div className="bg-brand-primary text-white py-2 px-6 text-xs font-bold flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Phone size={12} /> {item.contactPhone || 'Call Us Today'}</span>
          <span className="hidden sm:flex items-center gap-1"><Clock size={12} /> Mon-Fri: 8am - 6pm</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><MapPin size={12} /> {item.location || 'Local Service'}</span>
        </div>
      </div>

      {/* Header */}
      <SectionWrapper isEditing={isEditing} label="Navigation">
        <header className="px-6 py-4 flex justify-between items-center bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="flex items-center gap-3">
            {item.logo ? (
              <img src={item.logo} alt="Logo" className="h-10 object-contain" />
            ) : (
              <div className="w-10 h-10 bg-brand-accent rounded-lg flex items-center justify-center text-white font-black">
                {item.title.charAt(0)}
              </div>
            )}
            <EditableText 
              tag="h1"
              value={item.title}
              isEditing={isEditing}
              onSave={(v) => handleUpdate('title', v)}
              className="text-xl font-black tracking-tight"
            />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-600">
            <a href="#" className="hover:text-brand-accent transition-colors">Services</a>
            <a href="#" className="hover:text-brand-accent transition-colors">About</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Reviews</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Contact</a>
          </nav>
          <button className="bg-brand-accent text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-brand-accent/20 hover:scale-105 transition-all">
            Get a Quote
          </button>
        </header>
      </SectionWrapper>

      {/* Hero */}
      <SectionWrapper isEditing={isEditing} label="Hero Section">
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={item.imageUrl} 
              alt="Hero" 
              className="w-full h-full object-cover brightness-[0.3]" 
              referrerPolicy="no-referrer"
            />
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onImageClick?.('imageUrl')}
                  className="bg-white text-brand-primary px-6 py-3 rounded-xl font-bold shadow-2xl flex items-center gap-2"
                >
                  <ImageIcon size={18} /> Change Background
                </button>
              </div>
            )}
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="inline-block px-4 py-1.5 bg-brand-accent text-white text-xs font-black uppercase tracking-widest rounded-full mb-6">
                  Trusted Local Experts
                </div>
                <EditableText 
                  tag="h2"
                  value={item.heroHeadline || `Professional ${item.category} Services You Can Count On.`}
                  isEditing={isEditing}
                  onSave={(v) => handleUpdate('heroHeadline', v)}
                  className="text-4xl md:text-7xl font-black text-white mb-6 leading-[1.1]"
                />
                <EditableText 
                  tag="p"
                  value={item.heroSubheadline || `We provide top-quality ${item.category.toLowerCase()} solutions for homeowners and businesses in ${item.location || 'your area'}.`}
                  isEditing={isEditing}
                  onSave={(v) => handleUpdate('heroSubheadline', v)}
                  className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed"
                />
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-4 bg-brand-accent text-white font-bold rounded-xl shadow-xl shadow-brand-accent/30 hover:scale-105 transition-all flex items-center justify-center gap-2">
                    Book Service Now <ArrowRight size={20} />
                  </button>
                  <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all">
                    View Our Services
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Trust Bar */}
      <div className="bg-gray-50 py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-50 grayscale">
          <div className="flex items-center gap-2 font-black text-xl italic">TRUSTED</div>
          <div className="flex items-center gap-2 font-black text-xl italic">RELIABLE</div>
          <div className="flex items-center gap-2 font-black text-xl italic">LOCAL</div>
          <div className="flex items-center gap-2 font-black text-xl italic">CERTIFIED</div>
        </div>
      </div>

      {/* About Us */}
      <SectionWrapper isEditing={isEditing} label="About Us">
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-5xl font-black mb-6">About {item.title}</h2>
              <EditableText 
                tag="p"
                value={item.aboutText || `With years of experience in the ${item.category.toLowerCase()} industry, we pride ourselves on delivering exceptional quality and service. Our team is dedicated to exceeding your expectations every step of the way.`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('aboutText', v)}
                className="text-gray-600 text-lg leading-relaxed mb-8"
              />
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-black text-brand-accent mb-1">15+</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-brand-accent mb-1">500+</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Projects Done</div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <img src={item.imageUrl} className="w-full h-full object-cover" alt="About" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-accent rounded-full flex items-center justify-center text-white font-black text-center p-4 rotate-12 shadow-xl">
                EST. 2010
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Services */}
      <SectionWrapper isEditing={isEditing} label="Services Grid">
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Our Specializations</h2>
            <EditableText 
              tag="p"
              value={item.servicesText || "We offer a wide range of professional services tailored to your needs."}
              isEditing={isEditing}
              onSave={(v) => handleUpdate('servicesText', v)}
              className="text-gray-600 max-w-2xl mx-auto"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-brand-accent/10 text-brand-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {i === 1 ? <Shield size={28} /> : i === 2 ? <Zap size={28} /> : <Check size={28} />}
                </div>
                <h3 className="text-xl font-bold mb-3">Service Option {i}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  High-quality professional service delivered by our expert team with years of experience.
                </p>
                <a href="#" className="text-brand-accent font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                  Learn More <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </section>
      </SectionWrapper>

      {/* Why Choose Us */}
      <SectionWrapper isEditing={isEditing} label="Why Choose Us">
        <section className="py-24 bg-brand-primary text-white">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-8">Why Choose {item.title}?</h2>
              <div className="space-y-6">
                {[
                  { title: 'Licensed & Insured', desc: 'Full protection for your peace of mind.' },
                  { title: 'Experienced Team', desc: 'Over 10 years of industry experience.' },
                  { title: 'Satisfaction Guaranteed', desc: 'We don\'t leave until you\'re happy.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-6 h-6 bg-brand-accent rounded-full flex items-center justify-center shrink-0 mt-1">
                      <Check size={14} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl relative group/why-image">
                <img src={item.imageUrl} className="w-full h-full object-cover" alt="Team" referrerPolicy="no-referrer" />
                {isEditing && (
                  <div className="absolute inset-0 bg-brand-accent/20 opacity-0 group-hover/why-image:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={() => onImageClick?.('imageUrl')} className="bg-white text-brand-primary px-4 py-2 rounded-lg font-bold text-sm">
                      Change Image
                    </button>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-10 -left-10 bg-brand-accent p-8 rounded-3xl shadow-2xl hidden md:block">
                <div className="text-4xl font-black mb-1">100%</div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-80">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Testimonials */}
      <SectionWrapper isEditing={isEditing} label="Testimonials">
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Client Reviews</h2>
            <p className="text-gray-600">Don't just take our word for it.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100">
                <div className="flex gap-1 text-amber-500 mb-6">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg italic text-gray-700 mb-8 leading-relaxed">
                  "The team at {item.title} was professional, punctual, and did an amazing job. I would highly recommend them to anyone looking for {item.category.toLowerCase()} services."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full" />
                  <div>
                    <div className="font-bold">Happy Customer {i}</div>
                    <div className="text-xs text-gray-500">Verified Client</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </SectionWrapper>

      {/* Pricing Section */}
      <SectionWrapper isEditing={isEditing} label="Pricing">
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Choose the plan that's right for your business growth.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold mb-2">Basic</h3>
              <div className="text-4xl font-black mb-6">$49<span className="text-lg font-normal text-gray-400">/mo</span></div>
              <ul className="space-y-4 mb-10">
                {['Basic Features', 'Custom Domain', 'Mobile Optimized', 'Standard Support'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-600">
                    <Check size={16} className="text-brand-accent" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-all">
                Get Started
              </button>
            </div>
            <div className="bg-brand-primary p-10 rounded-[2.5rem] border border-brand-primary shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-accent text-white text-[10px] font-black px-4 py-1 rounded-bl-xl">MOST POPULAR</div>
              <h3 className="text-xl font-bold mb-2 text-white">Pro</h3>
              <div className="text-4xl font-black mb-6 text-white">$100<span className="text-lg font-normal text-gray-500">/mo</span></div>
              <ul className="space-y-4 mb-10">
                {['Extra Features', 'Advanced Integrations', 'Priority Support', 'Custom Analytics', 'White-labeling'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-300">
                    <Check size={16} className="text-brand-accent" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 bg-brand-accent text-white font-bold rounded-xl hover:bg-brand-accent/90 transition-all shadow-lg shadow-brand-accent/20">
                Get Started
              </button>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* FAQ Section */}
      <SectionWrapper isEditing={isEditing} label="FAQ">
        <section className="py-24 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">Common questions about our {item.category.toLowerCase()} services.</p>
            </div>
            <div className="space-y-4">
              {[
                { q: `What areas do you serve?`, a: `We primarily serve ${item.location || 'the local area'} and surrounding communities.` },
                { q: `Are you licensed and insured?`, a: `Yes, we are fully licensed and carry comprehensive insurance for your protection.` },
                { q: `How do I get a quote?`, a: `You can click any of the "Get a Quote" buttons on this site or call us directly at ${item.contactPhone || 'our office'}.` }
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h4 className="font-bold text-lg mb-2">{faq.q}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-black mb-6">{item.title}</h2>
            <EditableText 
              tag="p"
              value={item.aboutText || `Your trusted partner for ${item.category.toLowerCase()} services.`}
              isEditing={isEditing}
              onSave={(v) => handleUpdate('aboutText', v)}
              className="text-gray-400 max-w-sm mb-8"
            />
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-accent transition-colors cursor-pointer">
                <Phone size={18} />
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-accent transition-colors cursor-pointer">
                <Mail size={18} />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>Our Services</li>
              <li>About Us</li>
              <li>Client Reviews</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>{item.location || 'Local Area'}</li>
              <li>{item.contactEmail || 'hello@example.com'}</li>
              <li>{item.contactPhone || '555-0123'}</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} {item.title}. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
