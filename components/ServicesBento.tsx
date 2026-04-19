import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { generateImage } from '../src/services/imageService';
import { Star, Layout, Smartphone, Quote, Sparkles, Globe, ShieldCheck } from 'lucide-react';

const ServicesBento: React.FC = () => {
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchImages = async () => {
      const [editor, avatar, mobile, templates, globe] = await Promise.all([
        generateImage("A sleek, modern website builder interface on a computer screen, showing a drag and drop editor with UI panels, vibrant gradients, clean white background, 4k, highly detailed UI."),
        generateImage("A professional, friendly headshot of a female tech startup founder, clean background, high quality, 4k."),
        generateImage("A sleek modern smartphone displaying a beautiful mobile website UI, floating in a clean studio environment, 3d render, 4k."),
        generateImage("A grid of beautiful, modern website templates, UI design portfolio, colorful, clean presentation, 4k."),
        generateImage("Abstract digital globe with glowing connection lines, network infrastructure, vibrant blue and purple, minimalist, clean white background, 4k.")
      ]);
      
      const newImages: Record<string, string> = {};
      if (editor) newImages.editor = editor;
      if (avatar) newImages.avatar = avatar;
      if (mobile) newImages.mobile = mobile;
      if (templates) newImages.templates = templates;
      if (globe) newImages.globe = globe;
      
      setImages(newImages);
    };
    fetchImages();
  }, []);

  return (
    <section id="features" className="py-32 overflow-hidden relative bg-white">
      {/* Geometric Floating Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="floating-shape shape-square w-20 h-20 top-[10%] right-[10%]" />
        <div className="floating-shape shape-circle w-24 h-24 bottom-[20%] left-[5%]" style={{ animationDelay: '-7s' }} />
        <div className="floating-shape shape-triangle w-16 h-16 top-[50%] left-[15%]" style={{ animationDelay: '-12s' }} />
        <div className="floating-shape shape-square w-28 h-28 bottom-[10%] right-[20%]" style={{ animationDelay: '-15s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8 relative">
          <div className="max-w-2xl relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold text-[#86868b] mb-4 tracking-wider uppercase relative z-10"
            >
              Platform Features
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-bold text-[#1d1d1f] leading-tight tracking-tighter relative z-10">
              Built for scale. <br />
              Designed for speed.
            </h2>
          </div>
          <p className="text-[#86868b] text-xl max-w-sm leading-relaxed font-medium tracking-tight">
            Everything you need to launch, manage, and grow your business online, all in one unified platform.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[350px]">
          
          {/* Box 1: Visual Editor (Large, Pull-out) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2 md:col-span-8 md:row-span-2 bg-[#f5f5f7] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 relative overflow-hidden group transition-all duration-500 border border-black/5 hover:border-black/10"
          >
            <div className="relative z-20 max-w-md">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-[#1d1d1f] mb-4 md:mb-8 shadow-sm">
                <Layout size={20} className="md:w-7 md:h-7" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-[#1d1d1f] mb-3 md:mb-6 tracking-tight">No-Code Visual Editor</h3>
              <p className="text-[#86868b] text-base md:text-xl leading-relaxed font-medium tracking-tight">Design your dream site visually. Drag, drop, and customize everything.</p>
            </div>
            
            {/* Pull-out Visual */}
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-10 -right-20 w-[70%] aspect-video bg-white rounded-3xl shadow-2xl border border-black/5 overflow-hidden hidden md:block group-hover:-translate-y-4 transition-transform duration-700"
            >
              {images.editor ? (
                <img src={images.editor} alt="Visual Editor" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full bg-gray-100 animate-pulse" />
              )}
            </motion.div>
          </motion.div>

          {/* Box 2: Mobile Optimized (Tall, Offset) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="col-span-1 md:col-span-4 md:row-span-2 bg-[#1d1d1f] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 relative overflow-hidden group text-white"
          >
            <div className="relative z-20">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-4 md:mb-8">
                <Smartphone size={20} className="md:w-7 md:h-7" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-6 tracking-tight">Mobile First</h3>
              <p className="text-white/60 text-sm md:text-lg leading-relaxed font-medium tracking-tight">Perfectly responsive out of the box.</p>
            </div>
            
            {/* Offset Visual */}
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[80%] aspect-[9/16] bg-white rounded-3xl shadow-2xl overflow-hidden group-hover:-translate-y-6 transition-transform duration-700 hidden md:block"
            >
              {images.mobile ? (
                <img src={images.mobile} alt="Mobile View" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full bg-gray-800 animate-pulse" />
              )}
            </motion.div>
          </motion.div>

          {/* Box 3: AI Content (Wide, Offset) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-1 md:col-span-12 md:row-span-1 bg-[#f5f5f7] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 relative overflow-hidden group flex flex-col md:flex-row items-center gap-12 border border-black/5 hover:border-black/10"
          >
            <div className="relative z-20 flex-1">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-[#1d1d1f] mb-4 md:mb-8 shadow-sm">
                <Sparkles size={20} className="md:w-7 md:h-7 text-[#0066cc]" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl md:text-3xl font-bold text-[#1d1d1f] mb-2 md:mb-4 tracking-tight">AI Content</h3>
              <p className="text-[#86868b] text-sm md:text-lg leading-relaxed font-medium tracking-tight max-w-md">Generate copy and images instantly.</p>
            </div>
            
            <div className="flex-1 relative h-full w-full hidden md:block">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 1 }}
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl border border-black/5"
              >
                {images.globe ? (
                  <img src={images.globe} alt="AI Visual" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full bg-gray-100 animate-pulse" />
                )}
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ServicesBento;
