import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, ExternalLink, Sparkles, Layout, Zap, Folder, ArrowRight } from 'lucide-react';
import { PortfolioItem, Page } from '../types';
import { generateImage } from '../src/services/imageService';
import { useAuth } from './AuthContext';
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

interface PortfolioDeckProps {
  onNavigate: (page: Page) => void;
}

const DEFAULT_PORTFOLIO_ITEMS: PortfolioItem[] = [
  { 
    id: 102, 
    templateId: 'auto-detailing',
    title: 'Easy Does It Detailing', 
    category: 'Auto Detailing', 
    imageUrl: 'https://images.unsplash.com/photo-1601362840469-51e4d8d59085?auto=format&fit=crop&q=80&w=1200',
    prompt: "A professional, high-end modern website design mockup for a mobile auto detailing service, UI/UX design presentation, web graphics, vibrant orange and neon blue colors, dark mode aesthetic, minimalist, 4k.",
    vibe: "High-Energy & Professional"
  },
  { 
    id: 1, 
    title: 'Apex Performance', 
    category: 'Web Experience', 
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
    prompt: "A stunning, high-end modern fitness website mockup on a desktop screen, UI/UX design showcase, web graphics, vibrant cyan and purple gradients, minimalist, cinematic lighting, clean white background, 4k.",
    vibe: "High-Performance & Energy"
  },
  { 
    id: 2, 
    title: 'Lumina Gardens', 
    category: 'Brand Identity', 
    imageUrl: 'https://images.unsplash.com/photo-1558603668-6570496b66f8?auto=format&fit=crop&q=80&w=1200',
    prompt: "Luxury landscape architecture website design, brand identity presentation, elegant typography, vector graphics, vibrant magenta and purple accents, high-end digital interface, clean white background, 4k.",
    vibe: "Elegant & Organic"
  },
  { 
    id: 3, 
    title: 'Vanguard Dental', 
    category: 'Digital Platform', 
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200',
    prompt: "A sophisticated medical clinic website interface, UI design wireframes, modern web graphics, clean minimalist design with vibrant cyan glowing elements, professional, clean white background, 4k.",
    vibe: "Trust & Precision"
  }
];

const PortfolioDeck: React.FC<PortfolioDeckProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [projectImages, setProjectImages] = useState<Record<number | string, string>>({});
  const [userProjects, setUserProjects] = useState<PortfolioItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    if (!user) {
      setUserProjects([]);
      return;
    }

    const q = query(collection(db, 'projects'), where('clientId', '==', user.uid));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
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
          category: 'My Project',
          vibe: proj.vibe || 'Your custom digital presence.',
          prompt: proj.prompt || `A professional website design for ${proj.name}, modern UI/UX, clean white background, 4k.`,
          imageUrl: content.heroImage
        };
      }));
      
      setUserProjects(projects);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'projects');
    });

    return () => unsubscribe();
  }, [user]);

  const allItems = userProjects.length > 0 ? [...userProjects, ...DEFAULT_PORTFOLIO_ITEMS].slice(0, 4) : DEFAULT_PORTFOLIO_ITEMS;

  useEffect(() => {
    const fetchImages = async () => {
      const images: Record<number | string, string> = {};
      const promises = allItems.map(async (item) => {
        if (projectImages[item.id]) return; 
        const img = await generateImage(item.prompt!);
        if (img) images[item.id] = img;
      });
      await Promise.all(promises);
      setProjectImages(prev => ({ ...prev, ...images }));
    };
    fetchImages();
  }, [userProjects]);

  return (
    <section ref={containerRef} id="work" className="py-32 relative overflow-hidden bg-[#f5f5f7]">
      <div className="container mx-auto px-6 mb-32 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold text-[#86868b] mb-4 tracking-wider uppercase"
            >
              {userProjects.length > 0 ? 'Your Projects' : 'Featured Work'}
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-[#1d1d1f] mb-8 leading-tight tracking-tighter"
            >
              Crafted with <br />
              precision.
            </motion.h2>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('gallery')}
            className="group flex items-center gap-2 text-[#1d1d1f] font-semibold text-lg"
          >
            View all projects <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-64">
          {allItems.map((item, index) => (
            <div 
              key={item.id}
              className={`flex flex-col md:flex-row items-center gap-6 md:gap-24 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Image Container with "Pull-out" effect */}
              <div className="flex-[1.5] relative w-full group hidden md:block">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative aspect-[16/10] rounded-[3rem] overflow-hidden shadow-2xl border border-black/5"
                >
                  {projectImages[item.id] || item.imageUrl ? (
                    <img 
                      src={projectImages[item.id] || item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 animate-pulse" />
                  )}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                </motion.div>
                
                {/* Floating Category Tag */}
                <div className={`absolute -top-6 ${index % 2 === 0 ? '-right-6' : '-left-6'} bg-white px-6 py-3 rounded-2xl shadow-xl border border-black/5 z-20 hidden md:block`}>
                  <span className="text-sm font-bold text-[#1d1d1f] tracking-tight">{item.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-4 md:space-y-8">
                <div className="space-y-2 md:space-y-4">
                  <h3 className="text-xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-xl text-[#86868b] leading-relaxed font-medium tracking-tight">
                    {item.vibe || "A comprehensive digital evolution."}
                  </p>
                </div>

                <div className="flex items-center gap-4 md:gap-6">
                  <button 
                    onClick={() => onNavigate(item.templateId ? 'dashboard' : 'gallery')}
                    className="flex items-center gap-2 text-[#1d1d1f] text-xs md:text-base font-bold hover:underline underline-offset-4"
                  >
                    {item.templateId ? 'Edit' : 'View'} <ArrowRight size={14} className="md:w-5 md:h-5" />
                  </button>
                  <button className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-black/10 flex items-center justify-center text-[#1d1d1f] hover:bg-white hover:shadow-lg transition-all">
                    <ExternalLink size={14} className="md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-32 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block"
        >
          <button 
            onClick={() => onNavigate('start-project')}
            className="group relative px-12 py-5 bg-[#1d1d1f] text-white rounded-full font-semibold text-lg shadow-lg hover:bg-black transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Your Free Site <Zap size={20} className="fill-white" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioDeck;
