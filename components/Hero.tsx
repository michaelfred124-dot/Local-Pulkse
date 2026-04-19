import React from 'react';
import { ArrowRight, PlayCircle, Layout, Palette, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Page } from '../types';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative pt-48 pb-32 overflow-hidden bg-white">
      {/* Geometric Floating Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="floating-shape shape-circle w-24 h-24 top-[15%] left-[10%]" />
        <div className="floating-shape shape-square w-32 h-32 top-[40%] right-[15%]" style={{ animationDelay: '-5s' }} />
        <div className="floating-shape shape-triangle w-20 h-20 bottom-[20%] left-[20%]" style={{ animationDelay: '-10s' }} />
        <div className="floating-shape shape-circle w-28 h-28 bottom-[10%] right-[25%]" style={{ animationDelay: '-15s' }} />
        <div className="floating-shape shape-square w-16 h-16 top-[60%] left-[5%]" style={{ animationDelay: '-2s' }} />
        <div className="floating-shape shape-triangle w-24 h-24 top-[5%] right-[30%]" style={{ animationDelay: '-18s' }} />
        <div className="floating-shape shape-circle w-12 h-12 bottom-[40%] left-[40%]" style={{ animationDelay: '-12s' }} />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/60 border border-black/5 rounded-full text-[#1d1d1f] text-xs font-semibold mb-8 backdrop-blur-md shadow-sm"
        >
          <span className="tracking-wide">Introducing Wollo 2.0</span>
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-8 relative">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-6xl sm:text-8xl md:text-[10rem] font-bold tracking-tighter text-[#1d1d1f] leading-[0.9] relative z-10"
          >
            Pro. <br />
            Beyond.
          </motion.h1>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-3xl text-[#86868b] max-w-3xl mx-auto mb-12 leading-snug font-medium tracking-tight"
        >
          The most powerful website builder ever created. <br className="hidden md:block" />
          Designed for creators, built for scale.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onNavigate('sandbox');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            className="w-full sm:w-auto px-8 py-4 bg-[#1d1d1f] text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg tracking-tight"
          >
            Live Sandbox
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('gallery')}
            className="w-full sm:w-auto px-8 py-4 bg-transparent text-[#1d1d1f] font-semibold rounded-full transition-all flex items-center justify-center gap-2 text-lg tracking-tight hover:bg-black/5"
          >
            Explore Templates <ArrowRight size={20} />
          </motion.button>
        </motion.div>
        
        {/* Hero Image Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 relative max-w-5xl mx-auto"
        >
          {/* Floating UI Elements */}
          <div className="absolute -top-12 -left-12 z-20 hidden lg:block">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white p-4 rounded-2xl shadow-2xl border border-black/5 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                <Layout size={20} />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Layout</div>
                <div className="text-sm font-bold text-[#1d1d1f]">Grid System</div>
              </div>
            </motion.div>
          </div>

          <div className="absolute top-1/2 -right-16 z-20 hidden lg:block">
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="bg-white p-4 rounded-2xl shadow-2xl border border-black/5 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center text-white">
                <Palette size={20} />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Design</div>
                <div className="text-sm font-bold text-[#1d1d1f]">Color Palette</div>
              </div>
            </motion.div>
          </div>

          <div className="absolute -bottom-8 left-1/4 z-20 hidden lg:block">
            <motion.div 
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="bg-white px-6 py-3 rounded-full shadow-2xl border border-black/5 flex items-center gap-3"
            >
              <Sparkles size={16} className="text-yellow-500" />
              <span className="text-sm font-bold text-[#1d1d1f]">AI Image Generated</span>
            </motion.div>
          </div>

          <div className="relative rounded-[2rem] overflow-hidden border border-black/5 shadow-2xl bg-white p-2">
            <div className="bg-gray-100 rounded-[1.5rem] overflow-hidden aspect-video relative">
               {/* Placeholder for the actual app interface image */}
               <img 
                 src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2000&q=80" 
                 alt="Wollo Interface" 
                 className="w-full h-full object-cover opacity-90"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
               <div className="absolute inset-0 flex items-center justify-center">
                 <button className="w-20 h-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors shadow-lg border border-white/20">
                   <PlayCircle size={40} className="ml-1" />
                 </button>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
