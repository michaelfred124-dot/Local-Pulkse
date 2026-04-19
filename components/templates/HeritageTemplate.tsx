import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Layout, Move, Plus, Trash2, Image as ImageIcon, Star, ChevronDown } from 'lucide-react';
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
        className={`outline-none focus:ring-1 focus:ring-[#b0f0d6] transition-all px-1 -mx-1 min-h-[1em] min-w-[50px] ${isFocused ? 'bg-[#b0f0d6]/20' : 'hover:bg-[#b0f0d6]/10'}`}
      >
        {value || 'Click to add text...'}
      </Tag>
      {!isFocused && (
        <div className="absolute -top-6 left-0 opacity-0 group-hover/editable:opacity-100 transition-opacity pointer-events-none z-50">
          <div className="bg-[#003527] text-white text-[10px] font-sans tracking-widest uppercase px-2 py-0.5 flex items-center gap-1 shadow-md whitespace-nowrap">
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
    <div className="relative group/section border border-transparent hover:border-[#003527]/20 transition-all">
      {children}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none border border-[#003527]/40 opacity-0 group-hover/section:opacity-100 transition-opacity z-40" />
      <div className="absolute top-0 left-4 -translate-y-1/2 opacity-0 group-hover/section:opacity-100 transition-all z-50 flex items-center gap-1">
        <div className="bg-[#003527] text-white text-[10px] font-sans tracking-widest uppercase px-3 py-1 shadow-md flex items-center gap-2">
          <Layout size={10} /> {label}
        </div>
        <div className="flex items-center gap-1 bg-white border border-gray-200 p-1 shadow-md pointer-events-auto">
          <button className="p-1 hover:bg-gray-50 text-gray-400 hover:text-[#003527] transition-colors">
            <Move size={12} />
          </button>
          <button className="p-1 hover:bg-gray-50 text-gray-400 hover:text-[#003527] transition-colors">
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

export const HeritageTemplate: React.FC<{ 
  item: PortfolioItem;
  isEditing?: boolean;
  onUpdate?: (updates: Partial<PortfolioItem>) => void;
  onImageClick?: (field: string) => void;
}> = ({ item, isEditing, onUpdate, onImageClick }) => {
  const handleUpdate = (field: keyof PortfolioItem, value: any) => {
    if (onUpdate) onUpdate({ [field]: value });
  };

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-[#faf9f6] text-[#1a1c1a] font-sans selection:bg-[#b0f0d6] selection:text-[#002117]">
      {/* TopNavBar */}
      <SectionWrapper isEditing={isEditing} label="Navigation">
        <nav className="fixed top-0 w-full z-50 bg-[#faf9f6]/80 backdrop-blur-xl shadow-sm">
          <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
            <EditableText 
              tag="div"
              value={item.title || 'Heritage Modern'}
              isEditing={isEditing}
              onSave={(v) => handleUpdate('title', v)}
              className="font-serif text-2xl font-bold text-[#003527]"
            />
            <div className="hidden md:flex items-center space-x-8">
              <a className="font-serif text-lg tracking-tight text-[#003527] border-b-2 border-[#003527] pb-1" href="#">Services</a>
              <a className="font-serif text-lg tracking-tight text-stone-600 hover:text-[#003527] transition-colors" href="#">Portfolio</a>
              <a className="font-serif text-lg tracking-tight text-stone-600 hover:text-[#003527] transition-colors" href="#">About Us</a>
              <a className="font-serif text-lg tracking-tight text-stone-600 hover:text-[#003527] transition-colors" href="#">Reviews</a>
              <a className="font-serif text-lg tracking-tight text-stone-600 hover:text-[#003527] transition-colors" href="#">FAQ</a>
            </div>
            <button className="bg-gradient-to-br from-[#003527] to-[#064e3b] text-white px-6 py-3 rounded-lg font-sans text-sm uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all duration-200">
              Consult Now
            </button>
          </div>
        </nav>
      </SectionWrapper>

      {/* Hero Section */}
      <SectionWrapper isEditing={isEditing} label="Hero Section">
        <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover" 
              src={item.imageUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"} 
              alt="Hero"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-[#003527]/40 backdrop-brightness-75"></div>
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onImageClick?.('imageUrl')}
                  className="bg-white text-[#003527] px-8 py-4 font-sans tracking-widest uppercase text-sm flex items-center gap-3 hover:bg-[#b0f0d6] transition-colors rounded-lg"
                >
                  <ImageIcon size={18} /> Update Hero Image
                </button>
              </div>
            )}
          </div>
          <div className="container mx-auto px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block font-sans text-xs uppercase tracking-[0.2em] text-[#b0f0d6] mb-4">Established 1984</span>
              <EditableText 
                tag="h1"
                value={item.heroHeadline || `Crafting spaces that <br/><i class="font-serif italic font-light">define generations.</i>`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('heroHeadline', v)}
                className="font-serif text-5xl md:text-7xl text-white leading-tight mb-8 tracking-tighter"
              />
              <EditableText 
                tag="p"
                value={item.heroSubheadline || `We merge architectural heritage with modern sensibilities to create functional masterpieces tailored to your lifestyle.`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('heroSubheadline', v)}
                className="font-sans text-xl text-stone-200 mb-10 max-w-xl leading-relaxed"
              />
              <div className="flex flex-wrap gap-4">
                <button className="bg-gradient-to-br from-[#003527] to-[#064e3b] text-white px-8 py-4 rounded-lg font-sans text-sm uppercase tracking-widest hover:shadow-xl transition-all">
                  View Portfolio
                </button>
                <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-lg font-sans text-sm uppercase tracking-widest hover:bg-white/20 transition-all">
                  Our Process
                </button>
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Services Section */}
      <SectionWrapper isEditing={isEditing} label="Services">
        <section className="py-24 bg-[#faf9f6]">
          <div className="container mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="font-serif text-4xl md:text-5xl text-[#003527] mb-6">Expertise refined over decades.</h2>
                <p className="text-[#404944] text-lg leading-relaxed">From initial conceptualization to the final architectural flourish, our services are designed to uphold the highest standards of luxury and utility.</p>
              </div>
              <span className="font-sans text-sm uppercase tracking-widest text-[#707974]">What we do</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: 'Architectural Design', desc: 'Bespoke blueprints that honor the surrounding environment while pushing the boundaries of contemporary form.' },
                { title: 'Interior Curation', desc: 'Harmonizing textures, lighting, and spatial flow to create an atmosphere of quiet sophistication and comfort.' },
                { title: 'Heritage Restoration', desc: 'Preserving the soul of historic structures with modern structural reinforcements and invisible technology integration.' }
              ].map((service, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="mb-8 w-16 h-16 flex items-center justify-center bg-[#e9e8e5] rounded-full group-hover:bg-[#b0f0d6] transition-colors duration-500">
                    <div className="w-6 h-6 border-2 border-[#003527] rounded-sm transform rotate-45"></div>
                  </div>
                  <h3 className="font-serif text-2xl text-[#003527] mb-4">{service.title}</h3>
                  <p className="text-[#404944] leading-relaxed mb-6">{service.desc}</p>
                  <div className="h-0.5 w-12 bg-[#b0f0d6] group-hover:w-full transition-all duration-700"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Gallery Section */}
      <SectionWrapper isEditing={isEditing} label="Gallery">
        <section className="bg-[#efeeeb] py-24">
          <div className="container mx-auto px-8">
            <div className="mb-16">
              <h2 className="font-serif text-4xl text-[#003527] mb-2">Our Work</h2>
              <div className="w-24 h-1 bg-[#003527] mb-8"></div>
            </div>
            <div className="grid grid-cols-12 gap-6 items-start">
              <div className="col-span-12 md:col-span-7 aspect-[4/5] relative overflow-hidden group">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://images.unsplash.com/photo-1600607687931-cebf14cdff12?auto=format&fit=crop&w=1200&q=80" alt="Gallery 1"/>
                <div className="absolute inset-0 bg-[#003527]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="col-span-12 md:col-span-5 flex flex-col gap-6">
                <div className="aspect-video relative overflow-hidden group">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://images.unsplash.com/photo-1600607687644-aac4c15cecb1?auto=format&fit=crop&w=800&q=80" alt="Gallery 2"/>
                  <div className="absolute inset-0 bg-[#003527]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="aspect-square relative overflow-hidden group md:ml-12">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80" alt="Gallery 3"/>
                  <div className="absolute inset-0 bg-[#003527]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Reviews Section */}
      <SectionWrapper isEditing={isEditing} label="Reviews">
        <section className="py-24 bg-[#faf9f6] overflow-hidden">
          <div className="container mx-auto px-8">
            <div className="max-w-xl mb-16">
              <h2 className="font-serif text-4xl text-[#003527] mb-4">Echoes of Excellence</h2>
              <p className="text-[#404944] italic">Reflections from the families and institutions we've served.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { text: "They didn't just build a house; they captured the essence of our family's history and projected it into a modern sanctuary.", author: "Julian Thorne", role: "Estate Owner, Kent" },
                { text: "An unparalleled attention to detail. Every joint, every texture, and every shadow was considered with religious devotion.", author: "Elena Rodriguez", role: "Hospitality Design Lead" },
                { text: "The restoration of our 18th-century library was handled with such grace. It's now the most functional room in our home.", author: "Sir Arthur Sterling", role: "Private Collector" }
              ].map((review, i) => (
                <div key={i} className="bg-[#f4f3f1] p-10 relative">
                  <div className="text-[#b0f0d6] text-6xl absolute -top-2 -left-2 opacity-40 font-serif leading-none">"</div>
                  <div className="flex text-[#003527] mb-6 relative z-10">
                    {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" className="mr-1" />)}
                  </div>
                  <p className="font-serif text-xl text-[#003527] leading-relaxed mb-12 relative z-10">"{review.text}"</p>
                  <div className="text-right">
                    <p className="font-sans text-xs uppercase tracking-widest text-[#003527] font-bold">— {review.author}</p>
                    <p className="font-sans text-[10px] text-[#707974] mt-1">{review.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* FAQ Section */}
      <SectionWrapper isEditing={isEditing} label="FAQ">
        <section className="py-24 bg-[#f4f3f1]">
          <div className="container mx-auto px-8 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl text-[#003527] mb-4">Inquiries & Clarifications</h2>
              <p className="text-[#404944] uppercase font-sans tracking-widest text-xs">Essential information for your project</p>
            </div>
            <div className="space-y-4">
              {[
                { q: "What is your typical project timeline?", a: "Each project is unique. A standard residential renovation typically spans 6 to 12 months, while new architectural builds may require 18 to 24 months to ensure every custom element is perfected." },
                { q: "Do you manage the entire construction process?", a: "Yes. We provide end-to-end project management, working with a hand-selected roster of master craftsmen and specialty contractors to ensure our design vision is executed without compromise." },
                { q: "How do you approach sustainable design?", a: "Sustainability is built into our heritage approach. We prioritize locally sourced, durable materials and integrate passive heating/cooling strategies that respect the traditional orientation of the structure." }
              ].map((faq, i) => (
                <div key={i} className="bg-[#ffffff] overflow-hidden rounded-lg">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center p-6 text-left hover:bg-[#e9e8e5] transition-colors group"
                  >
                    <span className="font-serif text-xl text-[#003527]">{faq.q}</span>
                    <ChevronDown size={20} className={`text-[#707974] group-hover:text-[#003527] transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 text-[#404944] leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Final CTA */}
      <SectionWrapper isEditing={isEditing} label="Call to Action">
        <section className="py-24 bg-[#003527] text-white">
          <div className="container mx-auto px-8 text-center max-w-2xl">
            <h2 className="font-serif text-4xl md:text-5xl mb-8">Ready to begin your heritage journey?</h2>
            <p className="font-sans text-[#b0f0d6]/80 text-lg mb-12">Let's discuss how we can bring your vision to life through timeless design and meticulous craftsmanship.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a className="bg-[#b0f0d6] text-[#002117] px-10 py-5 rounded-lg font-sans text-sm uppercase tracking-widest font-bold hover:brightness-110 transition-all" href={`mailto:${item.contactEmail || 'hello@heritagemodern.com'}`}>
                Schedule a Consultation
              </a>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Footer */}
      <footer className="bg-stone-100 w-full pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 max-w-7xl mx-auto">
          <div className="md:col-span-1">
            <div className="font-serif text-xl font-bold text-[#003527] mb-6">{item.title || 'Heritage Modernist'}</div>
            <p className="text-stone-500 text-sm leading-relaxed lowercase italic">Timeless architecture for the modern life.</p>
          </div>
          <div>
            <h4 className="font-sans text-sm uppercase tracking-widest text-[#003527] mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><a className="font-sans text-sm uppercase tracking-widest text-stone-500 hover:text-[#003527] underline decoration-[#003527]/30 underline-offset-4" href="#">Privacy Policy</a></li>
              <li><a className="font-sans text-sm uppercase tracking-widest text-stone-500 hover:text-[#003527] underline decoration-[#003527]/30 underline-offset-4" href="#">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-sm uppercase tracking-widest text-[#003527] mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a className="font-sans text-sm uppercase tracking-widest text-stone-500 hover:text-[#003527] underline decoration-[#003527]/30 underline-offset-4" href="#">Careers</a></li>
              <li><a className="font-sans text-sm uppercase tracking-widest text-stone-500 hover:text-[#003527] underline decoration-[#003527]/30 underline-offset-4" href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-sm uppercase tracking-widest text-[#003527] mb-6">Location</h4>
            <p className="text-stone-500 text-sm leading-relaxed uppercase tracking-widest">
              {item.location || '122 Editorial Way\nSuite 400\nGreenwich, London'}
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-stone-200">
          <p className="font-sans text-sm uppercase tracking-widest text-stone-500 text-center">© {new Date().getFullYear()} {item.title || 'Heritage Modernist'}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
