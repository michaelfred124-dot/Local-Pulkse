import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Phone, Mail, MapPin, Clock, Shield, Zap, ArrowRight, Edit3, Layout, Move, Plus, Trash2, Image as ImageIcon, Sparkles, Leaf, Wind } from 'lucide-react';
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

export const WellnessTemplate: React.FC<{ 
  item: PortfolioItem; 
  isEditing?: boolean;
  onUpdate?: (updates: Partial<PortfolioItem>) => void;
  onImageClick?: (field: string) => void;
}> = ({ item, isEditing, onUpdate, onImageClick }) => {
  const updateField = (field: string, value: string) => {
    onUpdate?.({ [field]: value });
  };

  return (
    <div className="font-sans text-brand-primary bg-[#FDFBF7]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#8BA888] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#8BA888]/20">
            <Leaf size={24} />
          </div>
          <EditableText 
            value={item.title || "Mind & Body"} 
            onSave={(v) => updateField('title', v)}
            isEditing={isEditing}
            className="text-2xl font-serif italic tracking-tight text-[#4A5D48]"
          />
        </div>
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-[#4A5D48]/70">
          <a href="#" className="hover:text-[#8BA888] transition-colors">Philosophy</a>
          <a href="#" className="hover:text-[#8BA888] transition-colors">Programs</a>
          <a href="#" className="hover:text-[#8BA888] transition-colors">Retreats</a>
          <button className="px-8 py-3 bg-[#8BA888] text-white rounded-full hover:bg-[#7A9777] transition-all shadow-xl shadow-[#8BA888]/20">
            Begin Journey
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <SectionWrapper isEditing={isEditing} label="Hero">
        <section className="relative py-24 md:py-40 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#8BA888]/10 text-[#4A5D48] rounded-full text-xs font-bold mb-8 tracking-widest uppercase">
                <Wind size={14} className="animate-pulse" />
                <EditableText 
                  value={item.category || "Reconnect with your inner self"} 
                  onSave={(v) => updateField('category', v)}
                  isEditing={isEditing}
                />
              </div>
              <EditableText 
                value={item.description || "Healing the Mind, Empowering the Body."} 
                onSave={(v) => updateField('description', v)}
                isEditing={isEditing}
                tag="h1"
                className="text-5xl md:text-8xl font-serif italic mb-10 leading-[1.1] text-[#4A5D48] max-w-5xl mx-auto"
              />
              <p className="text-xl text-[#4A5D48]/60 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                Discover a holistic approach to wellness through personalized reeducation, mindfulness, and restorative practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="px-10 py-5 bg-[#4A5D48] text-white font-bold rounded-full hover:bg-[#3A4D38] transition-all shadow-2xl shadow-[#4A5D48]/20">
                  Explore Programs
                </button>
                <button className="px-10 py-5 bg-white border border-[#4A5D48]/10 text-[#4A5D48] font-bold rounded-full hover:bg-[#FDFBF7] transition-all">
                  Our Philosophy
                </button>
              </div>
            </motion.div>
          </div>

          {/* Floating Images */}
          <div className="mt-24 max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=600&q=80"
            ].map((img, i) => (
              <div key={i} className={`aspect-[3/4] rounded-[2rem] overflow-hidden shadow-xl ${i % 2 === 0 ? 'mt-12' : ''} group/image cursor-pointer`} onClick={() => onImageClick?.('imageUrl')}>
                <img src={img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Wellness" />
                {isEditing && i === 0 && (
                  <div className="absolute inset-0 bg-[#8BA888]/20 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity">
                    <ImageIcon className="text-white" size={32} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </SectionWrapper>

      {/* Philosophy Section */}
      <SectionWrapper isEditing={isEditing} label="Philosophy">
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1528319725582-ddc096101511?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" alt="Meditation" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#FDFBF7] rounded-[2rem] p-8 shadow-xl border border-[#4A5D48]/5 flex flex-col justify-center">
                <Sparkles className="text-[#8BA888] mb-4" size={32} />
                <h4 className="text-xl font-serif italic text-[#4A5D48] mb-2">Holistic Balance</h4>
                <p className="text-sm text-[#4A5D48]/60 leading-relaxed">Integrating physical health with mental clarity for lasting change.</p>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-6xl font-serif italic text-[#4A5D48] mb-8 leading-tight">A Path to Conscious Living.</h2>
              <p className="text-lg text-[#4A5D48]/60 mb-10 leading-relaxed font-light">
                We believe that true wellness comes from understanding the deep connection between your mind and body. Our reeducation programs are designed to help you break old patterns and build a foundation for a more vibrant, intentional life.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Mindful Awareness", desc: "Cultivate presence in every moment." },
                  { title: "Physical Restoration", desc: "Gentle movements to heal and strengthen." },
                  { title: "Emotional Resilience", desc: "Tools to navigate life's challenges." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 bg-[#FDFBF7] border border-[#4A5D48]/10 rounded-2xl flex items-center justify-center shrink-0 text-[#8BA888]">
                      <Check size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#4A5D48] mb-1">{item.title}</h4>
                      <p className="text-sm text-[#4A5D48]/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Pricing Section */}
      <SectionWrapper isEditing={isEditing} label="Pricing">
        <section className="py-32 bg-[#FDFBF7]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-serif italic text-[#4A5D48] mb-6">Join Our Community</h2>
              <p className="text-[#4A5D48]/60 max-w-xl mx-auto">Choose the path that best fits your current needs and goals.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-[#4A5D48]/5 hover:shadow-2xl hover:-translate-y-2 transition-all group">
                <div className="mb-10">
                  <h3 className="text-2xl font-serif italic text-[#4A5D48] mb-4">Foundation Plan</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-serif text-[#4A5D48]">$49</span>
                    <span className="text-[#4A5D48]/40 font-medium">/month</span>
                  </div>
                </div>
                <ul className="space-y-5 mb-12">
                  {['Weekly Group Sessions', 'Mindfulness Library', 'Community Access', 'Monthly Wellness Check-in'].map((f, i) => (
                    <li key={i} className="flex items-center gap-4 text-[#4A5D48]/70">
                      <div className="w-6 h-6 bg-[#8BA888]/10 text-[#8BA888] rounded-full flex items-center justify-center shrink-0">
                        <Check size={14} />
                      </div>
                      <span className="font-light">{f}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-5 bg-[#FDFBF7] text-[#4A5D48] font-bold rounded-full group-hover:bg-[#8BA888] group-hover:text-white transition-all">
                  Start Foundation
                </button>
              </div>
              <div className="bg-[#4A5D48] p-12 rounded-[3rem] shadow-2xl shadow-[#4A5D48]/20 relative overflow-hidden group">
                <div className="absolute top-8 right-8 bg-[#8BA888] text-white px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Most Transformative
                </div>
                <div className="mb-10">
                  <h3 className="text-2xl font-serif italic text-white mb-4">Immersion Plan</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-serif text-white">$100</span>
                    <span className="text-white/40 font-medium">/month</span>
                  </div>
                </div>
                <ul className="space-y-5 mb-12">
                  {['Daily Guided Practice', '1-on-1 Coaching', 'Priority Retreat Booking', 'Personalized Reeducation Plan', 'Guest Passes'].map((f, i) => (
                    <li key={i} className="flex items-center gap-4 text-white/80">
                      <div className="w-6 h-6 bg-white/10 text-[#8BA888] rounded-full flex items-center justify-center shrink-0">
                        <Check size={14} />
                      </div>
                      <span className="font-light">{f}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-5 bg-[#8BA888] text-white font-bold rounded-full shadow-xl shadow-black/10 hover:bg-[#7A9777] transition-all">
                  Start Immersion
                </button>
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Footer */}
      <footer className="bg-[#4A5D48] text-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-16">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <Leaf className="text-[#8BA888]" size={32} />
              <span className="text-2xl font-serif italic tracking-tight">Mind & Body</span>
            </div>
            <p className="text-white/50 max-w-sm leading-relaxed mb-10 font-light">
              Dedicated to the art of conscious living and holistic transformation. Join us in creating a world of balance and peace.
            </p>
            <div className="flex gap-6">
              {[Phone, Mail, MapPin].map((Icon, i) => (
                <div key={i} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#8BA888] hover:border-[#8BA888] transition-all cursor-pointer">
                  <Icon size={20} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-serif italic text-xl mb-8">Navigation</h4>
            <ul className="space-y-5 text-white/40 text-sm font-light">
              <li><a href="#" className="hover:text-[#8BA888] transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-[#8BA888] transition-colors">Programs</a></li>
              <li><a href="#" className="hover:text-[#8BA888] transition-colors">Retreats</a></li>
              <li><a href="#" className="hover:text-[#8BA888] transition-colors">Journal</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif italic text-xl mb-8">Connect</h4>
            <ul className="space-y-5 text-white/40 text-sm font-light">
              <li><a href="#" className="hover:text-[#8BA888] transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-[#8BA888] transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-[#8BA888] transition-colors">Newsletter</a></li>
              <li><a href="#" className="hover:text-[#8BA888] transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-24 mt-24 border-t border-white/5 text-center text-white/20 text-[10px] font-bold tracking-[0.3em] uppercase">
          © 2026 Mind & Body Wellness. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};
