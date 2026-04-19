import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Edit3, Layout, Move, Plus, Trash2, Image as ImageIcon, Camera, Palette, Brush, Instagram, Twitter, Dribbble } from 'lucide-react';
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
        className={`outline-none focus:ring-1 focus:ring-gray-300 transition-all px-1 -mx-1 min-h-[1em] min-w-[50px] ${isFocused ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
      >
        {value || 'Click to add text...'}
      </Tag>
      {!isFocused && (
        <div className="absolute -top-6 left-0 opacity-0 group-hover/editable:opacity-100 transition-opacity pointer-events-none z-50">
          <div className="bg-black text-white text-[10px] font-sans tracking-widest uppercase px-2 py-0.5 flex items-center gap-1 shadow-md whitespace-nowrap">
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
    <div className="relative group/section border border-transparent hover:border-gray-200 transition-all">
      {children}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none border border-gray-300 opacity-0 group-hover/section:opacity-100 transition-opacity z-40" />
      <div className="absolute top-0 left-4 -translate-y-1/2 opacity-0 group-hover/section:opacity-100 transition-all z-50 flex items-center gap-1">
        <div className="bg-black text-white text-[10px] font-sans tracking-widest uppercase px-3 py-1 shadow-md flex items-center gap-2">
          <Layout size={10} /> {label}
        </div>
        <div className="flex items-center gap-1 bg-white border border-gray-200 p-1 shadow-md pointer-events-auto">
          <button className="p-1 hover:bg-gray-50 text-gray-400 hover:text-black transition-colors">
            <Move size={12} />
          </button>
          <button className="p-1 hover:bg-gray-50 text-gray-400 hover:text-black transition-colors">
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

export const ArtistMinimalTemplate: React.FC<{ 
  item: PortfolioItem;
  isEditing?: boolean;
  onUpdate?: (updates: Partial<PortfolioItem>) => void;
  onImageClick?: (field: string) => void;
}> = ({ item, isEditing, onUpdate, onImageClick }) => {
  const handleUpdate = (field: keyof PortfolioItem, value: any) => {
    if (onUpdate) onUpdate({ [field]: value });
  };

  return (
    <div className="font-sans bg-white text-black selection:bg-black selection:text-white">
      {/* Header */}
      <SectionWrapper isEditing={isEditing} label="Navigation">
        <header className="px-8 py-12 flex flex-col md:flex-row justify-between items-center bg-white sticky top-0 z-50">
          <div className="flex items-center gap-4 mb-6 md:mb-0">
            {item.logo ? (
              <img src={item.logo} alt="Logo" className="h-8 object-contain" />
            ) : (
              <div className="w-8 h-8 flex items-center justify-center text-black">
                <Palette size={24} strokeWidth={1.5} />
              </div>
            )}
            <EditableText 
              tag="h1"
              value={item.title}
              isEditing={isEditing}
              onSave={(v) => handleUpdate('title', v)}
              className="text-xl font-light tracking-[0.2em] uppercase text-black"
            />
          </div>
          <nav className="flex items-center gap-8 text-xs font-sans tracking-[0.15em] uppercase text-gray-500">
            <a href="#" className="hover:text-black transition-colors">Selected Works</a>
            <a href="#" className="hover:text-black transition-colors">Exhibitions</a>
            <a href="#" className="hover:text-black transition-colors">About</a>
            <a href="#" className="hover:text-black transition-colors">Contact</a>
          </nav>
        </header>
      </SectionWrapper>

      {/* Hero */}
      <SectionWrapper isEditing={isEditing} label="Hero Section">
        <section className="relative px-8 pb-24 pt-12 flex flex-col items-center justify-center">
          <div className="w-full max-w-5xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <EditableText 
                tag="h2"
                value={item.heroHeadline || `Visual Artist & Photographer`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('heroHeadline', v)}
                className="text-4xl md:text-6xl font-light text-black mb-6 leading-tight tracking-tight"
              />
              <EditableText 
                tag="p"
                value={item.heroSubheadline || `Exploring the intersection of light, form, and emotion through contemporary visual mediums.`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('heroSubheadline', v)}
                className="text-lg md:text-xl text-gray-500 font-light tracking-wide max-w-2xl mx-auto"
              />
            </motion.div>
          </div>
          
          <div className="w-full max-w-6xl mx-auto relative group">
            <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100">
              <img 
                src={item.imageUrl || "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=2000&q=80"} 
                alt="Featured Work" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                referrerPolicy="no-referrer"
              />
            </div>
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/40 opacity-0 hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onImageClick?.('imageUrl')}
                  className="bg-black text-white px-8 py-4 font-sans tracking-widest uppercase text-xs flex items-center gap-3 hover:bg-gray-900 transition-colors"
                >
                  <ImageIcon size={16} /> Change Featured Image
                </button>
              </div>
            )}
          </div>
        </section>
      </SectionWrapper>

      {/* Gallery Grid */}
      <SectionWrapper isEditing={isEditing} label="Gallery">
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {[
                { title: 'Ethereal Forms', category: 'Photography', img: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=800&q=80' },
                { title: 'Urban Silence', category: 'Mixed Media', img: 'https://images.unsplash.com/photo-1501472312651-726afe119ff1?auto=format&fit=crop&w=800&q=80' },
                { title: 'Color Theory', category: 'Painting', img: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&q=80' },
                { title: 'Structural', category: 'Sculpture', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80' }
              ].map((work, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-[4/5] w-full overflow-hidden bg-gray-100 mb-6">
                    <img src={work.img} alt={work.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-light text-black tracking-wide">{work.title}</h3>
                    <span className="text-xs font-sans tracking-widest uppercase text-gray-400">{work.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Footer */}
      <footer className="bg-white text-black py-24 px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div>
            <h2 className="text-2xl font-light tracking-widest uppercase mb-4">{item.title}</h2>
            <p className="font-light text-gray-500 max-w-sm">
              Available for commissions and gallery exhibitions worldwide.
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-6">
            <div className="flex gap-6">
               <a href="#" className="text-gray-400 hover:text-black transition-colors"><Instagram size={20} strokeWidth={1.5} /></a>
               <a href="#" className="text-gray-400 hover:text-black transition-colors"><Twitter size={20} strokeWidth={1.5} /></a>
               <a href="#" className="text-gray-400 hover:text-black transition-colors"><Dribbble size={20} strokeWidth={1.5} /></a>
            </div>
            <div className="text-xs font-sans tracking-widest uppercase text-gray-400">
              <a href={`mailto:${item.contactEmail || 'hello@artist.com'}`} className="hover:text-black transition-colors">{item.contactEmail || 'hello@artist.com'}</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 text-xs font-sans tracking-widest uppercase text-gray-400 flex justify-between">
          <div>&copy; {new Date().getFullYear()} {item.title}.</div>
          <div>All Rights Reserved.</div>
        </div>
      </footer>
    </div>
  );
};
