import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, Shield, Zap, CreditCard, Layout, Server, Database, Lock } from 'lucide-react';
import { Page } from '../types';
import { generateImage } from '../src/services/imageService';

interface PricingProps {
  onNavigate: (page: Page) => void;
}

const Pricing: React.FC<PricingProps> = ({ onNavigate }) => {
  const [bgImage, setBgImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBg = async () => {
      const img = await generateImage("Abstract luxury background for a pricing section, minimalist, sophisticated, clean white background, 4k.");
      if (img) setBgImage(img);
    };
    fetchBg();
  }, []);

  const handleGetStarted = () => {
    onNavigate('start-project');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-32 relative overflow-hidden bg-white">
      {bgImage && (
        <div className="absolute inset-0 opacity-5 pointer-events-none grayscale">
          <img src={bgImage} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      )}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-brand-accent mb-6"
          >
            INVESTMENT
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-brand-primary mb-8 leading-tight tracking-tight"
          >
            Transparent <br />
            <span className="brand-gradient-text italic font-light">Value</span>.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-brand-secondary leading-relaxed"
          >
            We believe in clear, predictable pricing that aligns with your growth goals. No hidden fees, just exceptional results.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border border-gray-100 rounded-[3rem] overflow-hidden shadow-2xl shadow-black/5">
          {/* Starter Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 border-r border-gray-100 flex flex-col group bg-white hover:bg-gray-50 transition-all duration-500 border-none rounded-none"
          >
            <div className="mb-10">
              <h3 className="text-xs font-bold text-brand-primary mb-4">ESSENTIAL</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-brand-primary">$49</span>
                <span className="text-brand-secondary/40 text-sm font-bold">/mo</span>
              </div>
              <p className="text-brand-secondary text-sm mt-6 leading-relaxed">
                Foundational digital presence for emerging brands.
              </p>
            </div>
            
            <div className="space-y-5 mb-12 flex-1">
              {[
                "Bespoke Design",
                "Mobile Optimization",
                "Core SEO Setup",
                "Secure Hosting",
                "Monthly Updates"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-brand-accent/40"></div>
                  <span className="text-brand-secondary text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={handleGetStarted}
              className="w-full py-5 border border-gray-200 text-xs font-bold text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-500 rounded-full"
            >
              Select Plan
            </button>
          </motion.div>

          {/* Growth Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-12 border-r border-gray-100 flex flex-col brand-gradient-bg text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
              <div className="text-[9px] font-bold text-white border border-white/30 px-3 py-1 rounded-full">
                RECOMMENDED
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xs font-bold text-white mb-4">ADVANCED</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-white">$75</span>
                <span className="text-white/60 text-sm font-bold">/mo</span>
              </div>
              <p className="text-white/80 text-sm mt-6 leading-relaxed">
                Strategic growth for established market leaders.
              </p>
            </div>
            
            <div className="space-y-5 mb-12 flex-1">
              {[
                "Everything in Essential",
                "Advanced SEO Strategy",
                "Content Marketing",
                "Social Integration",
                "Priority Support"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-white"></div>
                  <span className="text-white text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={handleGetStarted}
              className="w-full py-5 bg-white text-xs font-bold text-brand-accent hover:bg-transparent hover:text-white hover:border hover:border-white transition-all duration-500 rounded-full"
            >
              Select Plan
            </button>
          </motion.div>

          {/* Scale Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-12 flex flex-col group bg-white hover:bg-gray-50 transition-all duration-500 border-none rounded-none"
          >
            <div className="mb-10">
              <h3 className="text-xs font-bold text-brand-primary mb-4">PRESTIGE</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-brand-primary">$100</span>
                <span className="text-brand-secondary/40 text-sm font-bold">/mo</span>
              </div>
              <p className="text-brand-secondary text-sm mt-6 leading-relaxed">
                Full-service digital dominance for elite enterprises.
              </p>
            </div>
            
            <div className="space-y-5 mb-12 flex-1">
              {[
                "Everything in Advanced",
                "E-Commerce Solutions",
                "Analytics & Insights",
                "Conversion Strategy",
                "Dedicated Manager"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-brand-accent/40"></div>
                  <span className="text-brand-secondary text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={handleGetStarted}
              className="w-full py-5 border border-gray-200 text-xs font-bold text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-500 rounded-full"
            >
              Select Plan
            </button>
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xs font-bold text-brand-secondary/30 flex items-center justify-center gap-3">
            <Shield size={14} className="text-brand-accent/40" />
            SECURE INFRASTRUCTURE & DAILY BACKUPS INCLUDED
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
