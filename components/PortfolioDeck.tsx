import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { PortfolioItem, Page } from '../types';
import { generateImage } from '../src/services/imageService';

interface PortfolioDeckProps {
  onNavigate: (page: Page) => void;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: 1, title: 'Apex Performance', category: 'Web Experience', prompt: "A stunning, high-end modern fitness website mockup on a desktop screen, vibrant cyan and purple gradients, minimalist, cinematic lighting, clean white background, 4k." },
  { id: 2, title: 'Lumina Gardens', category: 'Brand Identity', prompt: "Luxury landscape architecture website design, elegant typography, vibrant magenta and purple accents, high-end digital interface, clean white background, 4k." },
  { id: 3, title: 'Vanguard Dental', category: 'Digital Platform', prompt: "A sophisticated medical clinic website interface, clean minimalist design with vibrant cyan glowing elements, professional, clean white background, 4k." },
  { id: 4, title: 'The Artisan Bistro', category: 'E-Commerce', prompt: "Luxury restaurant reservation platform mockup, high-end dining visuals, vibrant purple and pink gradients, minimalist, clean white background, 4k." },
  { id: 5, title: 'Precision Automotive', category: 'System Design', prompt: "High-end automotive service dashboard interface, technical yet elegant, vibrant cyan and blue accents, minimalist, clean white background, 4k." },
  { id: 6, title: 'Nova Sky', category: 'SaaS Platform', prompt: "A sleek SaaS dashboard for cloud management, vibrant blue and purple gradients, clean white background, minimalist, 4k." },
];

const PortfolioDeck: React.FC<PortfolioDeckProps> = ({ onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState<number>(2);
  const [projectImages, setProjectImages] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchImages = async () => {
      const images: Record<number, string> = {};
      for (let i = 0; i < PORTFOLIO_ITEMS.length; i++) {
        const img = await generateImage(PORTFOLIO_ITEMS[i].prompt!);
        if (img) images[PORTFOLIO_ITEMS[i].id] = img;
      }
      setProjectImages(images);
    };
    fetchImages();
  }, []);

  return (
    <section id="work" className="py-32 relative overflow-hidden bg-white">
      <div className="container mx-auto px-6 mb-24 relative z-10">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-brand-accent mb-6"
          >
            SELECTED CASE STUDIES
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-brand-primary mb-8 leading-tight tracking-tight"
          >
            DIGITAL <br />
            <span className="brand-gradient-text italic font-light">MASTERPIECES</span>.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-brand-secondary leading-relaxed"
          >
            We treat every project as a unique opportunity to redefine excellence. Explore our curated selection of high-impact digital transformations that drive real business growth.
          </motion.p>
        </div>
      </div>

      {/* Mobile Grid View */}
      <div className="md:hidden container mx-auto px-6 grid gap-12 relative z-10">
        {PORTFOLIO_ITEMS.map((item) => (
          <div 
            key={item.id} 
            onClick={() => {
              onNavigate('gallery');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-gray-50 mb-6 shadow-xl border border-black/5">
              {projectImages[item.id] ? (
                <img src={projectImages[item.id]} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full bg-gray-100 animate-pulse"></div>
              )}
            </div>
            <div className="text-xs font-bold text-brand-accent mb-2">{item.category}</div>
            <h3 className="text-3xl font-bold text-brand-primary">{item.title}</h3>
          </div>
        ))}
      </div>

      {/* Desktop Expanding Carousel */}
      <div className="hidden md:flex w-full h-[700px] px-6 gap-6 max-w-[1800px] mx-auto relative z-10">
        {PORTFOLIO_ITEMS.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            onHoverStart={() => setActiveIndex(index)}
            onClick={() => onNavigate('gallery')}
            className={`relative rounded-[3.5rem] overflow-hidden cursor-pointer transition-all duration-700 ease-in-out shadow-2xl shadow-black/5 border border-black/5 ${
              activeIndex === index ? 'flex-[4]' : 'flex-[1]'
            }`}
          >
            {projectImages[item.id] ? (
              <img 
                src={projectImages[item.id]} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="absolute inset-0 w-full h-full bg-gray-100 animate-pulse"></div>
            )}
            
            {/* Overlay Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-700 ${
              activeIndex === index ? 'opacity-100' : 'opacity-40 hover:opacity-100'
            }`} />

            {/* Content */}
            <div className="absolute inset-0 p-12 flex flex-col justify-end">
              <motion.div
                initial={false}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  y: activeIndex === index ? 0 : 40,
                }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-start"
              >
                <div className="text-xs font-bold text-brand-accent mb-4">
                  {item.category}
                </div>
                <h3 className="text-5xl font-bold text-white mb-6 leading-tight">
                  {item.title}
                </h3>
                <p className="text-white/80 text-lg mb-8 max-w-md leading-relaxed">
                  A comprehensive digital evolution focused on precision, performance, and unparalleled user experience.
                </p>
                <div className="flex items-center gap-4 text-xs font-bold text-white border-b border-white/30 pb-1 group/btn">
                  View Case Study <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </div>
              </motion.div>

              {/* Collapsed State Title */}
              {activeIndex !== index && (
                <div className="absolute bottom-12 left-12 right-12">
                   <h3 className="text-3xl font-bold text-white mb-2 truncate">{item.title}</h3>
                   <div className="text-xs font-bold text-white/60">{item.category}</div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="container mx-auto px-6 mt-24 text-center relative z-10">
         <button 
           onClick={() => {
             onNavigate('gallery');
             window.scrollTo({ top: 0, behavior: 'smooth' });
           }}
           className="text-sm font-bold text-brand-accent border-b border-brand-accent pb-1 hover:text-brand-primary hover:border-brand-primary transition-all"
         >
            Explore Full Portfolio
         </button>
      </div>
    </section>
  );
};

export default PortfolioDeck;
