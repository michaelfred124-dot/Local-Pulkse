import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, TrendingUp, Zap, Users } from 'lucide-react';

const reasons = [
  {
    title: "Conversion-First Design",
    description: "We don't just make it pretty; we make it profitable. Our templates are psychologically engineered to guide users toward action.",
    icon: TrendingUp,
    color: "bg-[#0066cc]"
  },
  {
    title: "Blazing Fast Performance",
    description: "Speed is a feature. We optimize every line of code to ensure your site loads in under a second, boosting SEO and user retention.",
    icon: Zap,
    color: "bg-[#5e5ce6]"
  },
  {
    title: "Bespoke Brand Identity",
    description: "Stand out in a sea of templates. Our advanced customization tools let you build digital experiences that reflect your unique brand DNA.",
    icon: CheckCircle2,
    color: "bg-[#ff375f]"
  },
  {
    title: "Strategic Partnership",
    description: "We're not just a tool; we're your digital growth partner. We provide ongoing support and data-driven insights to help you scale.",
    icon: Users,
    color: "bg-[#ffcc00]"
  }
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-white">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-[#86868b] mb-4 tracking-wider uppercase"
          >
            The Platform Difference
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-[#1d1d1f] mb-8 leading-tight tracking-tighter"
          >
            Why choose <br />
            our platform?
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#f5f5f7] p-10 rounded-[2rem] flex flex-col md:flex-row gap-8 items-start group transition-all duration-500 hover:shadow-lg"
            >
              <div className={`w-14 h-14 shrink-0 rounded-2xl ${reason.color} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-500`}>
                <reason.icon size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1d1d1f] mb-3 tracking-tight">
                  {reason.title}
                </h3>
                <p className="text-[#86868b] leading-relaxed font-medium">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual Proof / Image Section */}
        <div className="mt-32 grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden border border-black/5 shadow-xl bg-[#f5f5f7]"
          >
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" 
              alt="Data Analytics Dashboard" 
              className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent flex flex-col justify-end p-10">
              <div className="text-xs font-bold text-[#0066cc] mb-2 uppercase tracking-wider">Success Story</div>
              <div className="text-2xl font-bold text-[#1d1d1f] tracking-tight">Modern E-Commerce Platform</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tighter leading-tight">
              Don't just build a website. <br />
              <span className="text-[#86868b]">Build a growth engine.</span>
            </h3>
            <p className="text-[#86868b] leading-relaxed text-lg font-medium">
              Our users see an average of 45% increase in conversion rates within the first 3 months of launching their new digital experience. We combine world-class design with cutting-edge technology to give you an unfair advantage.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="px-5 py-2 bg-[#f5f5f7] rounded-full text-sm font-semibold text-[#1d1d1f]">
                SEO Optimized
              </div>
              <div className="px-5 py-2 bg-[#f5f5f7] rounded-full text-sm font-semibold text-[#1d1d1f]">
                Mobile First
              </div>
              <div className="px-5 py-2 bg-[#f5f5f7] rounded-full text-sm font-semibold text-[#1d1d1f]">
                Fast Loading
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
