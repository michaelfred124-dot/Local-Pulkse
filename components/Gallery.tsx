import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, X, ChevronLeft, Layout, Star, MapPin, Phone, Mail, Loader2, Globe, Shield, Zap, Clock, Search, Monitor, Smartphone, Eye, ExternalLink, Filter, Sparkles, Folder } from 'lucide-react';
import { PortfolioItem, Page } from '../types';
import { TemplateRenderer, TemplateMiniPreview } from './TemplateRenderer';
import { generateImage } from '../src/services/imageService';
import { useAuth } from './AuthContext';
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

// Comprehensive set of industry-specific templates
const DEFAULT_INDUSTRY_PROJECTS: PortfolioItem[] = [
  { 
    id: 102, 
    templateId: 'auto-detailing', 
    title: 'Easy Does It Detailing', 
    category: 'Auto Detailing', 
    imageUrl: 'https://images.unsplash.com/photo-1601362840469-51e4d8d59085?auto=format&fit=crop&w=1200&q=80',
    vibe: "High-Energy & Professional",
    prompt: "A professional, high-end modern website design mockup for a mobile auto detailing service, UI/UX design presentation, web graphics, vibrant orange and neon blue colors, dark mode aesthetic, minimalist, 4k."
  },
  { 
    id: 101, 
    templateId: 'local-1', 
    title: 'The Local Boutique', 
    category: 'Local Business', 
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
    vibe: "Warm & Sophisticated",
    prompt: "A professional, high-end modern website design mockup for a local boutique service, UI/UX design presentation, web graphics, warm beige and charcoal colors, clean white background, minimalist, 4k."
  },
  { 
    id: 13, 
    templateId: 'construction', 
    title: 'Elite Construction', 
    category: 'Construction', 
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200',
    vibe: "Professional & Rugged",
    prompt: "A professional, high-end modern website design mockup for a construction company, UI/UX design presentation, web graphics, vibrant orange and dark grey gradients, clean white background, minimalist, 4k."
  },
  { 
    id: 14, 
    templateId: 'bakery', 
    title: 'Golden Crust Bakery', 
    category: 'Food & Beverage', 
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1200',
    vibe: "Warm & Inviting",
    prompt: "A professional, high-end modern website design mockup for an artisanal bakery, UI/UX design presentation, web graphics, warm brown and cream gradients, clean white background, minimalist, 4k."
  },
  { 
    id: 15, 
    templateId: 'dentist', 
    title: 'Bright Smile Dental', 
    category: 'Health & Wellness', 
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200',
    vibe: "Clean & Trustworthy",
    prompt: "A professional, high-end modern website design mockup for a dental clinic, UI/UX design presentation, web graphics, vibrant blue and white gradients, clean white background, minimalist, 4k."
  },
  { 
    id: 16, 
    templateId: 'lawncare', 
    title: 'Lush Green Lawns', 
    category: 'Lawn Care', 
    imageUrl: 'https://images.unsplash.com/photo-1558904541-efa8c1965f1e?auto=format&fit=crop&q=80&w=1200',
    vibe: "Fresh & Vibrant",
    prompt: "A professional, high-end modern website design mockup for a lawn care service, UI/UX design presentation, web graphics, vibrant green and yellow gradients, clean white background, minimalist, 4k."
  },
  { 
    id: 17, 
    templateId: 'modern', 
    title: 'SaaS Flow', 
    category: 'Technology', 
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    vibe: "Modern & Tech",
    prompt: "A stunning, high-end modern SaaS website mockup on a desktop screen, UI/UX design showcase, web graphics, vibrant cyan and purple gradients, minimalist, cinematic lighting, clean white background, 4k."
  },
  { 
    id: 18, 
    templateId: 'wellness', 
    title: 'Serenity Spa', 
    category: 'Health & Wellness', 
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
    vibe: "Serene & Balanced",
    prompt: "A professional, high-end modern website design mockup for a luxury spa and wellness center, UI/UX design presentation, web graphics, soft teal and white gradients, clean white background, minimalist, 4k."
  },
  { 
    id: 19, 
    templateId: 'artisan', 
    title: 'The Woodshop', 
    category: 'Artisan', 
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1200',
    vibe: "Crafted & Authentic",
    prompt: "A professional, high-end modern website design mockup for a custom woodworking shop, UI/UX design presentation, web graphics, warm wood tones and dark grey gradients, clean white background, minimalist, 4k."
  },
  { 
    id: 20, 
    templateId: 'restaurant', 
    title: 'Lumiere Dining', 
    category: 'Food & Beverage', 
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200',
    vibe: "Elegant & Culinary",
    prompt: "A professional, high-end modern website design mockup for a fine dining restaurant, UI/UX design presentation, web graphics, deep gold and black gradients, clean white background, minimalist, 4k."
  },
  { 
    id: 21, 
    templateId: 'plumber', 
    title: 'Pro Plumber', 
    category: 'Home Services', 
    imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=1200',
    vibe: "Service",
    prompt: "A professional, high-end modern website design mockup for a plumbing service, UI/UX design presentation, web graphics, blue and white gradients, clean white background, minimalist, 4k."
  },
  { 
    id: 22, 
    templateId: 'electrician', 
    title: 'Expert Electrician', 
    category: 'Home Services', 
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200',
    vibe: "Service",
    prompt: "A professional, high-end modern website design mockup for an electrician service, UI/UX design presentation, web graphics, yellow and black gradients, clean white background, minimalist, 4k."
  },
  { 
    id: 23, 
    templateId: 'cleaning', 
    title: 'Sparkle Cleaning', 
    category: 'Home Services', 
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1200',
    vibe: "Clean",
    prompt: "A professional, high-end modern website design mockup for a cleaning service, UI/UX design presentation, web graphics, teal and white gradients, clean white background, minimalist, 4k."
  },
  { 
    id: 24, 
    templateId: 'realestate', 
    title: 'Prime Real Estate', 
    category: 'Real Estate', 
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
    vibe: "Luxury",
    prompt: "A professional, high-end modern website design mockup for a real estate agency, UI/UX design presentation, web graphics, indigo and white gradients, clean white background, minimalist, 4k."
  },
  { 
    id: 25, 
    templateId: 'fitness', 
    title: 'Fitness & Gym', 
    category: 'Health & Wellness', 
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200',
    vibe: "Health",
    prompt: "A professional, high-end modern website design mockup for a fitness gym, UI/UX design presentation, web graphics, red and black gradients, clean white background, minimalist, 4k."
  },
  { 
    id: 26, 
    templateId: 'artist-minimal', 
    title: 'Minimalist Artist', 
    category: 'Portfolio', 
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1200',
    vibe: "Minimal",
    prompt: "A clean, minimalist gallery-style website design mockup for a fine artist or photographer, UI/UX design presentation, lots of whitespace, elegant typography, 4k."
  },
  { 
    id: 27, 
    templateId: 'artist-creative', 
    title: 'Creative Studio', 
    category: 'Portfolio', 
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
    vibe: "Creative",
    prompt: "A bold, dark-themed creative portfolio website design mockup for a digital artist, UI/UX design presentation, vibrant neon accents, masonry layout, 4k."
  },
  { 
    id: 28, 
    templateId: 'heritage', 
    title: 'Heritage Modern', 
    category: 'Real Estate', 
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
    vibe: "Heritage",
    prompt: "A luxurious, editorial-style website design mockup for an architectural firm, UI/UX design presentation, serif typography, elegant layout, deep emerald green and off-white colors, 4k."
  }
];

const CATEGORIES = ['All', 'My Sites', 'Auto Detailing', 'Local Business', 'Construction', 'Food & Beverage', 'Health & Wellness', 'Lawn Care', 'Technology', 'Artisan', 'Home Services', 'Real Estate', 'Portfolio'];

interface GalleryProps {
  onNavigate?: (page: Page) => void;
  onEditTemplate?: (templateId: string) => void;
}

const GalleryCard: React.FC<{ 
  item: PortfolioItem; 
  index: number; 
  image?: string;
  onClick: () => void;
  className?: string;
}> = ({ item, index, image, onClick, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className={`group relative rounded-[2.5rem] overflow-hidden cursor-pointer bg-gray-50 border border-black/5 shadow-sm hover:shadow-2xl transition-all duration-700 ${className}`}
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {image || item.imageUrl ? (
          <motion.img 
            style={{ y }}
            src={image || item.imageUrl} 
            alt={item.title} 
            className="absolute inset-0 w-full h-[130%] object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        ) : item.templateId ? (
          <div className="w-full h-full">
            <TemplateMiniPreview item={item} />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
             <Folder className="text-gray-300" size={64} />
          </div>
        )}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-40'}`} />
      </div>

      <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
        <div className="flex flex-col items-start translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-brand-accent uppercase mb-2">
            {item.category === 'My Site' ? <Folder size={10} /> : <Sparkles size={10} />}
            {item.category}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
            {item.title}
          </h3>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <p className="text-white/60 text-xs mb-4 max-w-[200px]">
                  {item.vibe || "A premium digital experience."}
                </p>
                <div className="text-[10px] font-bold text-white border-b border-white/30 pb-1">
                  {item.category === 'My Site' ? 'EDIT PROJECT' : 'EXPLORE PROJECT'}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <ArrowUpRight size={16} className="text-white" />
      </div>
    </motion.div>
  );
};

const Gallery: React.FC<GalleryProps> = ({ onNavigate, onEditTemplate }) => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [projectImages, setProjectImages] = useState<Record<number | string, string>>({});
  const [userProjects, setUserProjects] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    if (!user) {
      setUserProjects([]);
      return;
    }

    const q = query(collection(db, 'projects'), where('clientId', '==', user.uid));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Fetch content for these projects to populate the mini previews
      const projects: PortfolioItem[] = await Promise.all(projectsData.map(async (proj: any) => {
        let content: any = {};
        try {
          const contentQ = query(collection(db, 'content'), where('projectId', '==', proj.id));
          const contentSnap = await getDocs(contentQ);
          if (!contentSnap.empty) {
            content = contentSnap.docs[0].data();
          }
        } catch (e) {
          console.error("Error fetching content for project", proj.id, e);
        }

        return {
          id: proj.id,
          templateId: proj.templateId || proj.id,
          title: proj.name || 'Untitled Project',
          category: 'My Site',
          vibe: proj.vibe || 'Your custom digital presence.',
          prompt: proj.prompt || `A professional website design for ${proj.name}, modern UI/UX, clean white background, 4k.`,
          imageUrl: content.heroImage,
          heroHeadline: content.heroHeadline,
          heroSubheadline: content.heroSubheadline,
          aboutText: content.aboutText,
          servicesText: content.servicesText,
          logo: content.logo,
          location: content.location,
          contactEmail: content.contactEmail
        };
      }));
      
      setUserProjects(projects);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'projects');
    });

    return () => unsubscribe();
  }, [user]);

  const allItems = [...userProjects, ...DEFAULT_INDUSTRY_PROJECTS];

  useEffect(() => {
    const fetchImages = async () => {
      const images: Record<number | string, string> = {};
      const promises = allItems.map(async (item) => {
        if (projectImages[item.id]) return;
        const prompt = item.prompt || `A professional, high-end modern website design mockup for ${item.title} in the ${item.category} industry, UI/UX design presentation, web graphics, vibrant blue and purple gradients, clean white background, minimalist, 4k.`;
        const img = await generateImage(prompt);
        if (img) images[item.id] = img;
      });
      await Promise.all(promises);
      setProjectImages(prev => ({ ...prev, ...images }));
    };
    fetchImages();
  }, [userProjects]);

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem]);

  const filteredItems = allItems.filter(item => {
    const matchesFilter = filter === 'All' || 
                         (filter === 'My Sites' && item.category === 'My Site') ||
                         item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col pt-32 relative overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-brand-accent/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-brand-pink/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 pb-20 relative z-10">
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-xs font-bold text-brand-accent tracking-[0.3em] uppercase mb-6"
          >
            <div className="w-12 h-[1px] bg-brand-accent" />
            Portfolio Archive
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold text-brand-primary mb-8 leading-[0.9] tracking-tighter"
          >
            THE <br />
            <span className="brand-gradient-text italic font-light">COLLECTION</span>.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-brand-secondary max-w-2xl leading-relaxed opacity-70"
          >
            A curated selection of digital masterpieces, each crafted with precision to redefine the boundaries of what's possible online.
          </motion.p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-20 z-30 apple-blur border-y border-black/5 py-8">
        <div className="container mx-auto px-6 flex flex-wrap items-center justify-between gap-8">
          <div className="flex items-center gap-10 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all whitespace-nowrap relative ${
                  filter === cat 
                    ? 'text-brand-accent' 
                    : 'text-brand-secondary/40 hover:text-brand-primary'
                }`}
              >
                {cat}
                {filter === cat && (
                  <motion.div 
                    layoutId="activeFilter"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-brand-accent"
                  />
                )}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-secondary/30" size={16} />
            <input 
              type="text"
              placeholder="SEARCH THE ARCHIVE"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-4 py-3 bg-transparent text-xs font-bold tracking-widest placeholder:text-brand-secondary/30 text-brand-primary focus:outline-none border-b border-black/10 focus:border-brand-accent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Content - Bento Grid */}
      <main className="container mx-auto px-6 py-24 relative z-10">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:auto-rows-[400px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              // Create a bento pattern
              let gridClass = "md:col-span-4";
              if (index % 5 === 0) gridClass = "md:col-span-8 md:row-span-2";
              else if (index % 5 === 3) gridClass = "md:col-span-8";
              
              return (
                <GalleryCard
                  key={item.id}
                  item={item}
                  index={index}
                  image={projectImages[item.id]}
                  onClick={() => {
                    if (item.category === 'My Site') {
                      onNavigate?.('dashboard');
                    } else {
                      setSelectedItem(item);
                    }
                  }}
                  className={gridClass}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-32">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-black/5">
              <Search className="text-brand-secondary/20" size={32} />
            </div>
            <h3 className="text-3xl font-bold text-brand-primary mb-4 tracking-tight">No projects found</h3>
            <p className="text-brand-secondary leading-relaxed opacity-60">Try adjusting your search or filter to find what you're looking for.</p>
            <button 
              onClick={() => {
                setFilter('All');
                setSearchTerm('');
              }}
              className="mt-8 text-xs font-bold text-brand-accent border-b border-brand-accent pb-1 hover:border-brand-primary hover:text-brand-primary transition-all"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>
        
      {/* Full Screen Mockup Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-white overflow-y-auto"
          >
             <div className="sticky top-0 z-50 flex items-center justify-between px-10 py-8 apple-blur border-b border-black/5">
                <button onClick={() => setSelectedItem(null)} className="flex items-center gap-4 text-brand-primary group">
                   <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all">
                      <ChevronLeft size={20} />
                   </div>
                   <span className="text-[10px] font-bold tracking-widest uppercase">Back to Collection</span>
                </button>
                
                <div className="flex items-center gap-8">
                  <div className="hidden md:block text-right">
                    <div className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-1">{selectedItem.category}</div>
                    <div className="text-lg font-bold text-brand-primary tracking-tight">{selectedItem.title}</div>
                  </div>
                  <button onClick={() => setSelectedItem(null)} className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-brand-secondary/40 hover:text-brand-primary transition-colors">
                     <X size={24} />
                  </button>
                </div>
             </div>

             <div className="min-h-screen">
                <TemplateRenderer item={selectedItem} />
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <div className="container mx-auto px-6 py-40 relative z-10">
        <div className="relative rounded-[4rem] p-16 md:p-32 text-center overflow-hidden border border-black/5 shadow-2xl shadow-black/5">
          <div className="absolute inset-0 bg-gray-50/50 backdrop-blur-3xl -z-10" />
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-brand-accent/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-brand-pink/5 rounded-full blur-[120px]" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-8xl font-bold text-brand-primary mb-10 leading-[0.9] tracking-tighter">
                READY TO <br />
                <span className="brand-gradient-text italic font-light">BEGIN</span>?
              </h2>
              <p className="text-xl text-brand-secondary mb-16 leading-relaxed opacity-70">
                Partner with us to build a digital presence that doesn't just look beautiful, but performs at the highest level.
              </p>
              <button 
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('start-project');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="group relative px-16 py-8 brand-gradient-bg text-white rounded-full font-bold text-xl shadow-2xl shadow-brand-accent/20 hover:scale-105 transition-all duration-500"
              >
                <span className="relative z-10 flex items-center gap-4">
                  Start Your Project <Zap size={24} className="fill-white" />
                </span>
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
