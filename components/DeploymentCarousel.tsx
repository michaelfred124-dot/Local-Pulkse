import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Layout, CreditCard, Code2, Smartphone, Globe, Zap, Car } from 'lucide-react';
import { generateImage } from '../src/services/imageService';

const DEPLOYMENTS = [
  {
    id: 5,
    title: "Premium Auto Detailing",
    description: "High-energy mobile service platform with vibrant branding and easy booking.",
    color: "from-orange-600 to-amber-500",
    icon: <Car size={24} />,
    prompt: "Modern luxury auto detailing website interface, shiny car close-up, vibrant orange and neon blue accents, dark mode UI, professional, 4k."
  },
  {
    id: 1,
    title: "E-Commerce Experience",
    description: "High-conversion retail platform with seamless checkout and inventory management.",
    color: "from-blue-600 to-cyan-500",
    icon: <CreditCard size={24} />,
    prompt: "Modern luxury e-commerce website interface, product grid, minimalist design, high-end fashion, cinematic lighting, 4k, dark mode aesthetic."
  },
  {
    id: 2,
    title: "Creative Portfolio",
    description: "Immersive visual storytelling for designers, photographers, and artists.",
    color: "from-purple-600 to-pink-500",
    icon: <Layout size={24} />,
    prompt: "Minimalist creative portfolio website, large typography, masonry grid, artistic photography showcase, elegant transitions, 4k, dark mode aesthetic."
  },
  {
    id: 3,
    title: "Enterprise SaaS",
    description: "Powerful dashboard and analytics for data-driven organizations.",
    color: "from-green-600 to-emerald-500",
    icon: <Code2 size={24} />,
    prompt: "Complex enterprise SaaS dashboard, data visualizations, dark mode UI, sleek charts, professional interface, 4k, high-tech feel."
  },
  {
    id: 4,
    title: "Mobile App Landing",
    description: "Sleek, responsive landing pages designed to drive app installs and engagement.",
    color: "from-orange-600 to-red-500",
    icon: <Smartphone size={24} />,
    prompt: "Sleek mobile app landing page, 3d smartphone mockup, vibrant gradients, app store buttons, clean minimalist design, 4k, dark mode aesthetic."
  }
];

const DeploymentCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<Record<number, string>>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const newImages: Record<number, string> = {};
      const promises = DEPLOYMENTS.map(async (item) => {
        const img = await generateImage(item.prompt);
        if (img) newImages[item.id] = img;
      });
      await Promise.all(promises);
      setImages(newImages);
    };
    fetchImages();
  }, []);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % DEPLOYMENTS.length);
    }, 5000);

    return () => resetTimeout();
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % DEPLOYMENTS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + DEPLOYMENTS.length) % DEPLOYMENTS.length);
  };

  return (
    <section className="py-32 bg-[#050505] overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r ${DEPLOYMENTS[currentIndex].color} blur-[120px] rounded-full transition-all duration-1000`} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-white/40 mb-4 tracking-wider uppercase"
          >
            Example Deployments
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter"
          >
            Built for the <br />
            modern web.
          </motion.h2>
        </div>

        <div className="relative group">
          <div className="overflow-visible">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                {/* Image Side */}
                <div className="lg:col-span-7">
                  <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5">
                    {images[DEPLOYMENTS[currentIndex].id] ? (
                      <img
                        src={images[DEPLOYMENTS[currentIndex].id]}
                        alt={DEPLOYMENTS[currentIndex].title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-white/5 animate-pulse">
                        <Layout size={48} className="text-white/10" />
                      </div>
                    )}
                    
                    {/* Floating Browser Header */}
                    <div className="absolute top-4 left-4 right-4 h-8 bg-black/40 backdrop-blur-md rounded-full border border-white/10 flex items-center px-4 gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                      </div>
                      <div className="flex-1 text-[10px] text-white/40 font-medium text-center truncate">
                        {DEPLOYMENTS[currentIndex].title.toLowerCase().replace(/\s+/g, '-')}.wollo.com
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:col-span-5 space-y-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${DEPLOYMENTS[currentIndex].color} flex items-center justify-center text-white shadow-lg`}>
                    {DEPLOYMENTS[currentIndex].icon}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                      {DEPLOYMENTS[currentIndex].title}
                    </h3>
                    <p className="text-xl text-white/60 leading-relaxed font-medium">
                      {DEPLOYMENTS[currentIndex].description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all flex items-center gap-2">
                      Live Preview <ArrowRight size={18} />
                    </button>
                    <div className="flex gap-2">
                      {DEPLOYMENTS.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentIndex(i)}
                          className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 lg:-left-20 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-4 lg:-right-20 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeploymentCarousel;
