import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, TrendingUp, Zap, Users } from 'lucide-react';

const reasons = [
  {
    title: "Conversion-First Design",
    description: "We don't just make it pretty; we make it profitable. Our designs are psychologically engineered to guide users toward action.",
    icon: TrendingUp,
    color: "from-cyan-400 to-blue-600"
  },
  {
    title: "Blazing Fast Performance",
    description: "Speed is a feature. We optimize every line of code to ensure your site loads in under a second, boosting SEO and user retention.",
    icon: Zap,
    color: "from-purple-400 to-pink-600"
  },
  {
    title: "Bespoke Brand Identity",
    description: "Stand out in a sea of templates. We build custom digital experiences that reflect your unique brand DNA and values.",
    icon: CheckCircle2,
    color: "from-magenta-400 to-purple-600"
  },
  {
    title: "Strategic Partnership",
    description: "We're not just a vendor; we're your digital growth partner. We provide ongoing support and data-driven insights to help you scale.",
    icon: Users,
    color: "from-blue-400 to-cyan-600"
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
            className="text-sm font-bold text-brand-accent mb-6"
          >
            THE MILESTONE DIFFERENCE
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-brand-primary mb-8 leading-tight tracking-tight"
          >
            WHY CHOOSE <br />
            <span className="brand-gradient-text italic font-light">OUR AGENCY?</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 p-10 rounded-[3rem] flex flex-col md:flex-row gap-8 items-start group border border-gray-100 hover:border-brand-accent/30 hover:shadow-2xl hover:shadow-brand-accent/5 transition-all duration-500"
            >
              <div className={`w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br ${reason.color} flex items-center justify-center shadow-lg shadow-black/5 group-hover:scale-110 transition-transform duration-500`}>
                <reason.icon size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-brand-primary mb-4 tracking-tight group-hover:text-brand-accent transition-colors">
                  {reason.title}
                </h3>
                <p className="text-brand-secondary leading-relaxed group-hover:text-brand-primary transition-colors">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual Proof / Image Section */}
        <div className="mt-32 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-[3rem] overflow-hidden border border-gray-100 shadow-2xl shadow-black/5"
          >
            <img 
              src="https://picsum.photos/seed/webdesign-modern/1200/800" 
              alt="Web Design Example" 
              className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent flex flex-col justify-end p-10">
              <div className="text-xs font-bold text-brand-accent mb-2">Case Study</div>
              <div className="text-2xl font-bold text-brand-primary">Modern E-Commerce Platform</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-4xl font-bold text-brand-primary tracking-tight leading-tight">
              WE DON'T JUST BUILD WEBSITES. <br />
              <span className="text-brand-secondary/30 italic font-light">WE BUILD GROWTH ENGINES.</span>
            </h3>
            <p className="text-brand-secondary leading-relaxed text-lg">
              Our clients see an average of 45% increase in conversion rates within the first 3 months of launching their new digital experience. We combine world-class design with cutting-edge technology to give you an unfair advantage.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-3 bg-gray-100 rounded-full text-xs font-bold text-brand-secondary">
                SEO Optimized
              </div>
              <div className="px-6 py-3 bg-gray-100 rounded-full text-xs font-bold text-brand-secondary">
                Mobile First
              </div>
              <div className="px-6 py-3 bg-gray-100 rounded-full text-xs font-bold text-brand-secondary">
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
