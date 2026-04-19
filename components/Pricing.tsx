import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, Shield, Zap, CreditCard, Layout, Server, Database, Lock } from 'lucide-react';
import { Page } from '../types';
import { generateImage } from '../src/services/imageService';

interface PricingProps {
  onNavigate: (page: Page) => void;
}

const Pricing: React.FC<PricingProps> = ({ onNavigate }) => {
  const handleGetStarted = () => {
    onNavigate('start-project');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-32 relative overflow-hidden bg-white">
      {/* Geometric Floating Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="floating-shape shape-circle w-20 h-20 top-[10%] right-[15%]" />
        <div className="floating-shape shape-square w-24 h-24 bottom-[20%] left-[10%]" style={{ animationDelay: '-5s' }} />
        <div className="floating-shape shape-triangle w-16 h-16 top-[50%] left-[5%]" style={{ animationDelay: '-10s' }} />
        <div className="floating-shape shape-circle w-32 h-32 bottom-[10%] right-[5%]" style={{ animationDelay: '-15s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-24 text-center mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-[#86868b] mb-4 tracking-wider uppercase"
          >
            Investment
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-[#1d1d1f] mb-8 leading-tight tracking-tighter"
          >
            Transparent <br />
            value.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[#86868b] leading-relaxed font-medium tracking-tight"
          >
            We believe in clear, predictable pricing that aligns with your growth goals. No hidden fees, just exceptional results.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-10 bg-[#f5f5f7] rounded-[1.5rem] md:rounded-[2rem] flex flex-col transition-all duration-500 hover:shadow-lg"
          >
            <div className="mb-6 md:mb-10">
              <h3 className="text-xs md:text-sm font-bold text-[#1d1d1f] mb-2 md:mb-4 tracking-tight">Starter</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl md:text-5xl font-bold text-[#1d1d1f] tracking-tighter">$15</span>
                <span className="text-[#86868b] text-xs md:text-sm font-medium">/mo</span>
              </div>
              <p className="text-[#86868b] text-[10px] md:text-sm mt-2 md:mt-4 leading-relaxed font-medium">
                Launch your first site.
              </p>
            </div>
            
            <div className="space-y-2 md:space-y-4 mb-8 md:mb-12 flex-1">
              {[
                "Unlimited Pages",
                "Custom Domain",
                "SSL Certificate"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 md:gap-3">
                  <Check size={12} className="text-[#0066cc] md:w-4 md:h-4" />
                  <span className="text-[#1d1d1f] text-[10px] md:text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={handleGetStarted}
              className="w-full py-3 md:py-4 bg-white border border-black/5 text-[10px] md:text-sm font-semibold text-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white transition-all duration-300 rounded-full shadow-sm"
            >
              Start Free
            </button>
          </motion.div>

          {/* Growth Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 md:p-10 bg-[#1d1d1f] rounded-[1.5rem] md:rounded-[2rem] flex flex-col text-white relative overflow-hidden shadow-xl hover:-translate-y-1 transition-transform duration-500"
          >
            <div className="absolute top-0 right-0 p-4 md:p-6">
              <div className="text-[8px] md:text-[10px] font-bold text-white bg-white/20 px-2 md:px-3 py-0.5 md:py-1 rounded-full tracking-wider uppercase">
                Best
              </div>
            </div>

            <div className="mb-6 md:mb-10">
              <h3 className="text-xs md:text-sm font-bold text-white mb-2 md:mb-4 tracking-tight">Pro</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl md:text-5xl font-bold text-white tracking-tighter">$29</span>
                <span className="text-white/60 text-xs md:text-sm font-medium">/mo</span>
              </div>
              <p className="text-white/80 text-[10px] md:text-sm mt-2 md:mt-4 leading-relaxed font-medium">
                Advanced features.
              </p>
            </div>
            
            <div className="space-y-2 md:space-y-4 mb-8 md:mb-12 flex-1">
              {[
                "Everything in Starter",
                "Advanced Analytics",
                "Priority Support"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 md:gap-3">
                  <Check size={12} className="text-white md:w-4 md:h-4" />
                  <span className="text-white text-[10px] md:text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={handleGetStarted}
              className="w-full py-3 md:py-4 bg-white text-[10px] md:text-sm font-semibold text-[#1d1d1f] hover:bg-gray-100 transition-all duration-300 rounded-full"
            >
              Start Free
            </button>
          </motion.div>

          {/* Scale Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-2 md:col-span-1 p-6 md:p-10 bg-[#f5f5f7] rounded-[1.5rem] md:rounded-[2rem] flex flex-col transition-all duration-500 hover:shadow-lg"
          >
            <div className="mb-6 md:mb-10">
              <h3 className="text-xs md:text-sm font-bold text-[#1d1d1f] mb-2 md:mb-4 tracking-tight">Commerce</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl md:text-5xl font-bold text-[#1d1d1f] tracking-tighter">$65</span>
                <span className="text-[#86868b] text-xs md:text-sm font-medium">/mo</span>
              </div>
              <p className="text-[#86868b] text-[10px] md:text-sm mt-2 md:mt-4 leading-relaxed font-medium">
                E-commerce tools.
              </p>
            </div>
            
            <div className="space-y-2 md:space-y-4 mb-8 md:mb-12 flex-1">
              {[
                "Everything in Pro",
                "E-Commerce Checkout",
                "Unlimited Products"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 md:gap-3">
                  <Check size={12} className="text-[#0066cc] md:w-4 md:h-4" />
                  <span className="text-[#1d1d1f] text-[10px] md:text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={handleGetStarted}
              className="w-full py-3 md:py-4 bg-white border border-black/5 text-[10px] md:text-sm font-semibold text-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white transition-all duration-300 rounded-full shadow-sm"
            >
              Start Free
            </button>
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xs font-bold text-[#86868b] flex items-center justify-center gap-2 tracking-wider uppercase">
            <Shield size={14} className="text-[#0066cc]" />
            Secure infrastructure & daily backups included
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
