import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Edit3, Layout, Move, Plus, Trash2, Image as ImageIcon, Palette, Zap, Sparkles, ArrowRight, Instagram, Dribbble, Github } from 'lucide-react';
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
        className={`outline-none focus:ring-2 focus:ring-fuchsia-500/50 rounded-md transition-all px-1 -mx-1 min-h-[1em] min-w-[50px] ${isFocused ? 'bg-fuchsia-500/10' : 'hover:bg-fuchsia-500/5'}`}
      >
        {value || 'Click to add text...'}
      </Tag>
      {!isFocused && (
        <div className="absolute -top-6 left-0 opacity-0 group-hover/editable:opacity-100 transition-opacity pointer-events-none z-50">
          <div className="bg-fuchsia-600 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded flex items-center gap-1 shadow-lg whitespace-nowrap">
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
    <div className="relative group/section border-2 border-transparent hover:border-fuchsia-500/30 transition-all">
      {children}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-2 border-fuchsia-500 opacity-0 group-hover/section:opacity-100 transition-opacity z-40" />
      <div className="absolute top-0 left-4 -translate-y-1/2 opacity-0 group-hover/section:opacity-100 transition-all z-50 flex items-center gap-1">
        <div className="bg-fuchsia-600 text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-xl flex items-center gap-2">
          <Layout size={10} /> {label}
        </div>
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-700 rounded-full p-1 shadow-lg pointer-events-auto">
          <button className="p-1 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors">
            <Move size={12} />
          </button>
          <button className="p-1 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors">
            <Plus size={12} />
          </button>
          <button className="p-1 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-red-500 transition-colors">
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ArtistCreativeTemplate: React.FC<{ 
  item: PortfolioItem;
  isEditing?: boolean;
  onUpdate?: (updates: Partial<PortfolioItem>) => void;
  onImageClick?: (field: string) => void;
}> = ({ item, isEditing, onUpdate, onImageClick }) => {
  const handleUpdate = (field: keyof PortfolioItem, value: any) => {
    if (onUpdate) onUpdate({ [field]: value });
  };

  return (
    <div className="font-sans bg-zinc-950 text-zinc-100 selection:bg-fuchsia-500 selection:text-white overflow-x-hidden">
      {/* Header */}
      <SectionWrapper isEditing={isEditing} label="Navigation">
        <header className="px-6 py-6 flex justify-between items-center bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50 border-b border-white/5">
          <div className="flex items-center gap-3">
            {item.logo ? (
              <img src={item.logo} alt="Logo" className="h-10 object-contain" />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-500 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-fuchsia-500/20">
                <Sparkles size={20} />
              </div>
            )}
            <EditableText 
              tag="h1"
              value={item.title}
              isEditing={isEditing}
              onSave={(v) => handleUpdate('title', v)}
              className="text-xl font-bold tracking-tight text-white"
            />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-fuchsia-400 transition-colors">Work</a>
            <a href="#" className="hover:text-fuchsia-400 transition-colors">About</a>
            <a href="#" className="hover:text-fuchsia-400 transition-colors">Store</a>
          </nav>
          <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-fuchsia-500 hover:text-white transition-all shadow-lg hover:shadow-fuchsia-500/25">
            Let's Talk
          </button>
        </header>
      </SectionWrapper>

      {/* Hero */}
      <SectionWrapper isEditing={isEditing} label="Hero Section">
        <section className="relative min-h-[90vh] flex items-center px-6 py-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-fuchsia-400 text-sm font-medium mb-8">
                <Zap size={14} /> Available for freelance
              </div>
              <EditableText 
                tag="h2"
                value={item.heroHeadline || `Digital Artist & Illustrator`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('heroHeadline', v)}
                className="text-6xl md:text-8xl font-black text-white mb-6 leading-[1.1] tracking-tight"
              />
              <EditableText 
                tag="p"
                value={item.heroSubheadline || `Creating vibrant, surreal, and immersive digital experiences that push the boundaries of imagination.`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('heroSubheadline', v)}
                className="text-xl text-zinc-400 mb-10 max-w-lg leading-relaxed"
              />
              <div className="flex items-center gap-6">
                <button className="px-8 py-4 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white rounded-full font-bold hover:shadow-lg hover:shadow-fuchsia-500/25 transition-all flex items-center gap-2">
                  View Portfolio <ArrowRight size={18} />
                </button>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all"><Instagram size={20} /></a>
                  <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all"><Dribbble size={20} /></a>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative group"
            >
              <div className="aspect-[4/5] w-full rounded-3xl overflow-hidden border border-white/10 relative">
                <img 
                  src={item.imageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80"} 
                  alt="Hero Artwork" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <button 
                      onClick={() => onImageClick?.('imageUrl')}
                      className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                      <ImageIcon size={16} /> Change Artwork
                    </button>
                  </div>
                )}
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-zinc-900 border border-white/10 p-6 rounded-2xl shadow-2xl backdrop-blur-xl">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-violet-400 mb-1">10+</div>
                <div className="text-sm font-medium text-zinc-400">Years Experience</div>
              </div>
            </motion.div>
          </div>
        </section>
      </SectionWrapper>

      {/* Masonry Gallery */}
      <SectionWrapper isEditing={isEditing} label="Selected Works">
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-16">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Selected<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-violet-500">Works.</span></h2>
              <button className="text-zinc-400 hover:text-white font-medium flex items-center gap-2 transition-colors">
                View All <ArrowRight size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Neon Dreams', type: '3D Render', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-square' },
                { title: 'Cyber City', type: 'Concept Art', img: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-[3/4]' },
                { title: 'Abstract Flow', type: 'Motion Graphics', img: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-[4/3]' },
                { title: 'Ethereal', type: 'Digital Painting', img: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-[3/4]' },
                { title: 'Geometric', type: 'Vector Art', img: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-square' },
                { title: 'Synthwave', type: 'Illustration', img: 'https://images.unsplash.com/photo-1614850715649-1d0106293cb1?auto=format&fit=crop&w=800&q=80', aspect: 'aspect-[4/3]' }
              ].map((work, i) => (
                <div key={i} className={`group relative rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 ${work.aspect}`}>
                  <img src={work.img} alt={work.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{work.title}</h3>
                    <p className="text-fuchsia-400 text-sm font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{work.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-zinc-950 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-black mb-6">Let's create something<br/>extraordinary together.</h2>
              <a href={`mailto:${item.contactEmail || 'hello@creative.com'}`} className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-violet-400 hover:opacity-80 transition-opacity">
                {item.contactEmail || 'hello@creative.com'}
              </a>
            </div>
            <div className="flex md:justify-end items-end gap-4">
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-fuchsia-500 hover:border-fuchsia-500 transition-all"><Instagram size={20} /></a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-fuchsia-500 hover:border-fuchsia-500 transition-all"><Dribbble size={20} /></a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-fuchsia-500 hover:border-fuchsia-500 transition-all"><Github size={20} /></a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-sm text-zinc-500 font-medium">
            <p>&copy; {new Date().getFullYear()} {item.title}. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
