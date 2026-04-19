import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Page } from '../types';

interface CTAProps {
  onNavigate: (page: Page) => void;
}

const CTA: React.FC<CTAProps> = ({ onNavigate }) => {
  return (
    <section className="py-32 relative overflow-hidden bg-white">
      {/* Geometric Floating Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="floating-shape shape-square w-20 h-20 top-[15%] left-[15%]" />
        <div className="floating-shape shape-circle w-24 h-24 bottom-[20%] right-[15%]" style={{ animationDelay: '-3s' }} />
        <div className="floating-shape shape-triangle w-16 h-16 top-[50%] right-[5%]" style={{ animationDelay: '-8s' }} />
        <div className="floating-shape shape-square w-32 h-32 bottom-[10%] left-[10%]" style={{ animationDelay: '-12s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#f5f5f7] rounded-full text-[#86868b] text-xs font-bold mb-8 relative z-10"
          >
            <Sparkles size={14} />
            <span className="tracking-wider uppercase">Ready to scale?</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-[#1d1d1f] mb-8 leading-tight tracking-tighter relative z-10"
          >
            Let's build your <br />
            digital future.
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-[#86868b] max-w-2xl mx-auto mb-12 leading-relaxed font-medium tracking-tight"
        >
          Join thousands of creators and businesses building their digital presence on our platform.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('start-project')}
          className="group relative px-10 py-4 bg-[#1d1d1f] text-white font-semibold rounded-full overflow-hidden transition-all shadow-lg hover:bg-[#1d1d1f]/90"
        >
          <span className="relative flex items-center justify-center gap-2 text-base">
            Start Building Free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </motion.button>
      </div>
    </section>
  );
};

export default CTA;
