import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Sparkles, Zap, Heart, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { Page } from '../types';
import { generateImage } from '../src/services/imageService';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [heroImage, setHeroImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroImage = async () => {
      const prompt = "Abstract 3D composition with a vibrant pink heart, a glowing glass sphere, and colorful geometric planes in purple, yellow, and blue. Soft studio lighting, high quality 3D render, clean white background, modern tech aesthetic, 8k resolution.";
      const img = await generateImage(prompt, "16:9");
      if (img) setHeroImage(img);
    };
    fetchHeroImage();
  }, []);

  return (
    <section className="relative pt-40 pb-20 overflow-hidden bg-white">
      <div className="container mx-auto px-6 text-center relative z-10">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent/5 border border-brand-accent/10 rounded-full text-brand-accent text-sm font-bold mb-8"
        >
          <Sparkles size={16} />
          <span>New: AI-Powered Design Systems</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-brand-primary mb-8 max-w-5xl mx-auto leading-[1.1]"
        >
          Maximize Your <span className="brand-gradient-text">Digital Presence</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-brand-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          We build high-performance websites and digital experiences that help your business grow faster. Modern design meets cutting-edge technology.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <button
            onClick={() => onNavigate('start-project')}
            className="w-full sm:w-auto px-8 py-4 bg-brand-accent text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-brand-accent/20 flex items-center justify-center gap-2"
          >
            Start Free Trial
            <ArrowRight size={18} />
          </button>
          <button
            onClick={() => onNavigate('gallery')}
            className="w-full sm:w-auto px-8 py-4 bg-white border border-black/5 text-brand-primary font-bold rounded-2xl hover:bg-black/5 transition-all flex items-center justify-center gap-2"
          >
            View Portfolio
          </button>
        </motion.div>

        {/* Main Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden modern-shadow border border-black/5 bg-gray-50">
            <img
              src={heroImage || "https://picsum.photos/seed/modern-web/1920/1080"}
              alt="Modern Digital Experience"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            
            {/* Floating Elements (Overlay) */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 p-6 glass-card rounded-3xl modern-shadow border border-white/50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center text-white">
                    <Zap size={24} fill="currentColor" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-brand-primary">Fast Delivery</div>
                    <div className="text-xs text-brand-secondary">Ready in 48h</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 left-10 p-6 glass-card rounded-3xl modern-shadow border border-white/50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center text-white">
                    <Heart size={24} fill="currentColor" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-brand-primary">Loved by Clients</div>
                    <div className="text-xs text-brand-secondary">4.9/5 Rating</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Decorative Background Shapes */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
