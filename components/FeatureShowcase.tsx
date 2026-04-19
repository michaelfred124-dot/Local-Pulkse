import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Palette, Search, Zap, ShieldCheck, Settings, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: "Beautiful Templates",
    description: "Start with stunning, professionally designed templates tailored for your industry. Customize everything to match your brand with our advanced design system.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    color: "#0066cc"
  },
  {
    icon: Smartphone,
    title: "Drag & Drop Editor",
    description: "Our intuitive visual editor lets you build and customize your site in real-time. No coding skills required. Just pick an element and place it where you want.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80",
    color: "#5e5ce6"
  },
  {
    icon: Zap,
    title: "Lightning Fast Hosting",
    description: "Your site is hosted on our global CDN, ensuring lightning-fast load times and 99.9% uptime for your visitors. Performance is built into every layer.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    color: "#ff375f"
  }
];

const FeatureShowcase: React.FC = () => {
  return (
    <section className="py-32 bg-white overflow-hidden relative">
      {/* Geometric Floating Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="floating-shape shape-circle w-20 h-20 top-[10%] left-[5%]" />
        <div className="floating-shape shape-square w-24 h-24 bottom-[30%] right-[10%]" style={{ animationDelay: '-5s' }} />
        <div className="floating-shape shape-triangle w-16 h-16 top-[60%] left-[15%]" style={{ animationDelay: '-10s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-64">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-24 ${index === 2 ? 'col-span-2 md:col-span-1' : ''}`}
            >
              <div className="flex-1 space-y-4 md:space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#f5f5f7] text-[#1d1d1f]"
                >
                  <feature.icon size={16} className="md:w-6 md:h-6" strokeWidth={1.5} />
                </motion.div>
                
                <div className="space-y-2 md:space-y-4">
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl md:text-6xl font-bold text-[#1d1d1f] tracking-tighter leading-tight"
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-xs md:text-lg text-[#86868b] leading-relaxed font-medium tracking-tight max-w-lg"
                  >
                    {feature.description}
                  </motion.p>
                </div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="group flex items-center gap-2 text-[#0066cc] font-semibold text-xs md:text-lg hover:underline underline-offset-4"
                >
                  Learn more <ArrowRight size={14} className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 relative hidden md:block"
              >
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-black/5">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
                </div>
                
                {/* Decorative Offset Element */}
                <div 
                  className={`absolute -z-10 w-full h-full rounded-[2rem] opacity-10 blur-3xl ${index % 2 === 0 ? '-bottom-10 -right-10' : '-bottom-10 -left-10'}`}
                  style={{ backgroundColor: feature.color }}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
