import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Phone, Mail, MapPin, Clock, Shield, Zap, ArrowRight, Edit3, Layout, Move, Plus, Trash2, Image as ImageIcon, Stethoscope, Activity, Calendar, Award, UserCheck, HeartPulse } from 'lucide-react';
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
        className={`outline-none focus:ring-2 focus:ring-cyan-400 rounded-md transition-all px-1 -mx-1 min-h-[1em] min-w-[50px] ${isFocused ? 'bg-cyan-50 shadow-inner' : 'hover:bg-cyan-50/50'}`}
      >
        {value || 'Click to add text...'}
      </Tag>
      {!isFocused && (
        <div className="absolute -top-6 left-0 opacity-0 group-hover/editable:opacity-100 transition-opacity pointer-events-none z-50">
          <div className="bg-cyan-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-lg whitespace-nowrap">
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
    <div className="relative group/section border-2 border-transparent hover:border-cyan-400 transition-all">
      {children}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-2 border-cyan-500 opacity-0 group-hover/section:opacity-100 transition-opacity z-40" />
      <div className="absolute top-0 left-4 -translate-y-1/2 opacity-0 group-hover/section:opacity-100 transition-all z-50 flex items-center gap-1">
        <div className="bg-cyan-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-xl flex items-center gap-2">
          <Layout size={10} /> {label.toUpperCase()}
        </div>
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-full p-1 shadow-lg pointer-events-auto">
          <button className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-cyan-600 transition-colors">
            <Move size={12} />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-cyan-600 transition-colors">
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

export const DentistTemplate: React.FC<{ 
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
      {/* Top Bar - Clinical & Trustworthy */}
      <div className="bg-slate-900 text-white py-2 px-6 text-[10px] font-bold flex justify-between items-center tracking-widest uppercase">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 text-cyan-400"><Phone size={12} /> <span className="text-white">{item.contactPhone || 'Emergency: (555) 000-0000'}</span></span>
          <span className="hidden sm:flex items-center gap-2 text-cyan-400"><Award size={12} /> <span className="text-white">Top Rated Clinic 2024</span></span>
        </div>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 text-cyan-400"><MapPin size={12} /> <span className="text-white">{item.location || 'Medical Plaza'}</span></span>
        </div>
      </div>

      {/* Header */}
      <SectionWrapper isEditing={isEditing} label="Navigation">
        <header className="px-6 py-4 flex justify-between items-center bg-white/90 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-100">
          <div className="flex items-center gap-3">
            {item.logo ? (
              <img src={item.logo} alt="Logo" className="h-10 object-contain" />
            ) : (
              <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white">
                <HeartPulse size={24} />
              </div>
            )}
            <EditableText 
              tag="h1"
              value={item.title}
              isEditing={isEditing}
              onSave={(v) => handleUpdate('title', v)}
              className="text-xl font-black tracking-tight text-slate-900"
            />
          </div>
          <nav className="hidden lg:flex items-center gap-10 text-xs font-black uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-cyan-600 transition-colors">Services</a>
            <a href="#" className="hover:text-cyan-600 transition-colors">New Patients</a>
            <a href="#" className="hover:text-cyan-600 transition-colors">Testimonials</a>
            <a href="#" className="hover:text-cyan-600 transition-colors">Contact</a>
          </nav>
          <button className="bg-cyan-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-cyan-600/20 hover:scale-105 transition-all">
            Book Appointment
          </button>
        </header>
      </SectionWrapper>

      {/* Hero - Clean & Professional */}
      <SectionWrapper isEditing={isEditing} label="Hero Section">
        <section className="relative py-20 md:py-32 overflow-hidden bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-100 text-cyan-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-8">
                <UserCheck size={14} /> Now Accepting New Patients
              </div>
              <EditableText 
                tag="h2"
                value={item.heroHeadline || `Modern Dental Care for a Brighter, Healthier Smile.`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('heroHeadline', v)}
                className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.05] tracking-tighter"
              />
              <EditableText 
                tag="p"
                value={item.heroSubheadline || `Experience gentle, state-of-the-art dentistry in a comfortable environment. Our expert team in ${item.location || 'the city'} is dedicated to your oral health.`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('heroSubheadline', v)}
                className="text-lg md:text-xl text-slate-500 mb-12 leading-relaxed max-w-xl"
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-10 py-5 bg-cyan-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-2xl shadow-cyan-600/30 hover:translate-y-[-2px] transition-all flex items-center justify-center gap-3">
                  Schedule Visit <Calendar size={18} />
                </button>
                <button className="px-10 py-5 bg-white border border-slate-200 text-slate-900 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-100 transition-all">
                  Our Services
                </button>
              </div>
              <div className="mt-12 flex items-center gap-6 border-t border-slate-200 pt-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Patient" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div className="text-xs font-bold text-slate-400">
                  <span className="text-slate-900">1,200+</span> Happy Patients in {item.location || 'the area'}
                </div>
              </div>
            </motion.div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative">
                <img 
                  src={item.imageUrl} 
                  alt="Dental Clinic" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onImageClick?.('imageUrl')}
                      className="bg-white text-cyan-600 px-6 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-2"
                    >
                      <ImageIcon size={18} /> Change Clinic Photo
                    </button>
                  </div>
                )}
              </div>
              <div className="absolute top-10 -right-10 bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100 hidden lg:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center">
                    <Shield size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900">Safe & Sterile</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Advanced Protocols</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center">
                    <Zap size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900">Latest Tech</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Digital X-Rays</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-cyan-600/5 -skew-x-12 translate-x-1/2"></div>
        </section>
      </SectionWrapper>

      {/* Services Grid - Clinical Style */}
      <SectionWrapper isEditing={isEditing} label="Dental Services">
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24">
              <div className="text-cyan-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Comprehensive Care</div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">Specialized Treatments.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'General Dentistry', icon: Stethoscope, desc: 'Routine checkups, cleanings, and preventative care for all ages.' },
                { title: 'Cosmetic Dentistry', icon: Star, desc: 'Teeth whitening, veneers, and smile makeovers for a perfect look.' },
                { title: 'Restorative Care', icon: Activity, desc: 'Fillings, crowns, and bridges to restore your natural smile.' },
                { title: 'Orthodontics', icon: Shield, desc: 'Braces and clear aligners to straighten and align your teeth.' },
                { title: 'Oral Surgery', icon: HeartPulse, desc: 'Expert surgical procedures including extractions and implants.' },
                { title: 'Emergency Care', icon: Phone, desc: 'Same-day appointments for urgent dental issues and pain.' }
              ].map((service, i) => (
                <div key={i} className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-cyan-600/10 transition-all group">
                  <div className="w-16 h-16 bg-white text-cyan-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-cyan-600 group-hover:text-white transition-all">
                    <service.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{service.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-8">
                    {service.desc}
                  </p>
                  <a href="#" className="text-cyan-600 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                    Learn More <ArrowRight size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* About Us - Trust & Expertise */}
      <SectionWrapper isEditing={isEditing} label="Our Practice">
        <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <div>
              <div className="text-cyan-400 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Our Practice</div>
              <h2 className="text-4xl md:text-7xl font-black mb-10 tracking-tighter leading-none">Your Comfort is Our Priority.</h2>
              <EditableText 
                tag="p"
                value={item.aboutText || `At ${item.title}, we believe that dental visits should be stress-free. Our team combines clinical excellence with a compassionate approach to ensure every patient feels at ease.`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('aboutText', v)}
                className="text-xl text-slate-400 leading-relaxed mb-12"
              />
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <div className="text-4xl font-black text-cyan-400 mb-2">20+</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-cyan-400 mb-2">15k+</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Successful Cases</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/5">
                <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" alt="Doctor" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-cyan-600 p-10 rounded-[2rem] shadow-2xl">
                <div className="text-3xl font-black mb-2 italic">"Gentle Care"</div>
                <div className="text-xs font-bold opacity-80 uppercase tracking-widest">Our Patient Promise</div>
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Reviews - Social Proof */}
      <SectionWrapper isEditing={isEditing} label="Patient Stories">
        <section className="py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">Patient Success Stories.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map(i => (
                <div key={i} className="bg-white p-16 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative">
                  <div className="flex gap-1 text-cyan-500 mb-8">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={20} fill="currentColor" />)}
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mb-10 leading-tight">
                    "I've always been nervous about the dentist, but the team at {item.title} made me feel so comfortable. My new smile has given me so much confidence!"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=review${i}`} alt="Patient" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <div className="font-black text-slate-900">Michael Thompson</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Patient since 2021</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* FAQ - Patient Info */}
      <SectionWrapper isEditing={isEditing} label="Patient FAQ">
        <section className="py-32 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Your Questions, Answered.</h2>
            </div>
            <div className="space-y-4">
              {[
                { q: 'Do you accept my insurance?', a: 'We accept most major PPO insurance plans. Our team will handle all the paperwork and help you maximize your benefits.' },
                { q: 'What should I bring to my first visit?', a: 'Please bring your ID, insurance card, and any previous dental records if available. You can also fill out our forms online.' },
                { q: 'Do you offer financing options?', a: 'Yes, we offer flexible payment plans through CareCredit and other providers to make your treatment affordable.' }
              ].map((faq, i) => (
                <div key={i} className="group bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-cyan-200 transition-all">
                  <h4 className="font-black text-xl mb-4 text-slate-900 flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-xs">?</span> {faq.q}
                  </h4>
                  <p className="text-slate-500 leading-relaxed pl-12">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Footer - Professional & Clean */}
      <footer className="bg-slate-900 text-white py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white">
                  <HeartPulse size={24} />
               </div>
               <h2 className="text-2xl font-black tracking-tight">{item.title}</h2>
            </div>
            <EditableText 
              tag="p"
              value={item.aboutText || `Providing world-class dental care in a patient-focused environment.`}
              isEditing={isEditing}
              onSave={(v) => handleUpdate('aboutText', v)}
              className="text-slate-500 max-w-sm mb-12 text-lg leading-relaxed"
            />
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-cyan-600 transition-all cursor-pointer">
                <Phone size={20} />
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-cyan-600 transition-all cursor-pointer">
                <Mail size={20} />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-black uppercase tracking-widest text-[10px] mb-10 text-cyan-400">Patient Resources</h4>
            <ul className="space-y-6 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
              <li className="hover:text-white transition-colors cursor-pointer">New Patient Forms</li>
              <li className="hover:text-white transition-colors cursor-pointer">Insurance Info</li>
              <li className="hover:text-white transition-colors cursor-pointer">Emergency Care</li>
              <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase tracking-widest text-[10px] mb-10 text-cyan-400">Our Clinic</h4>
            <ul className="space-y-6 text-slate-400 text-sm font-medium">
              <li className="flex items-start gap-3"><MapPin size={18} className="text-cyan-600 shrink-0" /> {item.location || 'Medical Plaza'}</li>
              <li className="flex items-start gap-3"><Clock size={18} className="text-cyan-600 shrink-0" /> Mon-Fri: 8am - 6pm</li>
              <li className="flex items-start gap-3"><Phone size={18} className="text-cyan-600 shrink-0" /> {item.contactPhone || '555-0123'}</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 text-center text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em]">
          &copy; {new Date().getFullYear()} {item.title}. Excellence in Dentistry.
        </div>
      </footer>
    </div>
  );
};
