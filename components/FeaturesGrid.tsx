import React, { useState, useEffect } from 'react';
import { Smartphone, Palette, Search, Zap, ShieldCheck, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { generateImage } from '../src/services/imageService';

const features = [
  {
    icon: Smartphone,
    title: "Mobile Optimization",
    description: "Seamless, high-performance experiences tailored for the modern mobile user. We prioritize speed and intuitive navigation.",
    prompt: "Abstract minimalist smartphone visualization with vibrant blue and purple gradients, clean white background, high-end, 4k."
  },
  {
    icon: Palette,
    title: "Bespoke Design",
    description: "Every pixel is crafted with intention. We create unique visual identities that resonate with your brand's core values.",
    prompt: "Abstract minimalist art with organic shapes in vibrant pink and purple tones, clean white background, high-end, 4k."
  },
  {
    icon: Search,
    title: "Strategic SEO",
    description: "Data-driven search strategies that ensure your brand is discovered by the right audience at the right time.",
    prompt: "Abstract minimalist visualization of data nodes in vibrant blue tones, clean white background, high-end, 4k."
  },
  {
    icon: Zap,
    title: "Rapid Performance",
    description: "Optimized codebases that deliver lightning-fast load times, reducing bounce rates and increasing conversions.",
    prompt: "Abstract minimalist light trails in vibrant cyan and magenta, representing speed, clean white background, high-end, 4k."
  },
  {
    icon: ShieldCheck,
    title: "Secure Infrastructure",
    description: "Enterprise-grade security protocols to protect your data and your customers' trust. Built on a foundation of reliability.",
    prompt: "Abstract minimalist geometric shield in vibrant purple tones, clean white background, high-end, 4k."
  },
  {
    icon: Settings,
    title: "Scalable Systems",
    description: "Architectures designed to grow with your business. We build for today with an eye on the future.",
    prompt: "Abstract minimalist geometric structure in vibrant blue and pink, clean white background, high-end, 4k."
  }
];

const FeaturesGrid: React.FC = () => {
  const [featureImages, setFeatureImages] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchImages = async () => {
      const images: Record<number, string> = {};
      for (let i = 0; i < features.length; i++) {
        const img = await generateImage(features[i].prompt);
        if (img) images[i] = img;
      }
      setFeatureImages(images);
    };
    fetchImages();
  }, []);

  return (
    <section className="py-32 relative overflow-hidden bg-white">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-brand-accent mb-6"
          >
            OUR CAPABILITIES
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-brand-primary mb-8 leading-tight tracking-tight"
          >
            ENGINEERED <br />
            <span className="brand-gradient-text italic font-light">FOR EXCELLENCE</span>.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-brand-secondary leading-relaxed"
          >
            We combine technical precision with creative vision to deliver digital solutions that don't just work—they inspire.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-10 rounded-[2.5rem] transition-all duration-700 bg-gray-50 border border-gray-100 hover:border-brand-accent/30 hover:shadow-2xl hover:shadow-brand-accent/5 hover:-translate-y-2"
            >
              <div className="mb-10 w-20 h-20 rounded-3xl bg-white flex items-center justify-center group-hover:bg-brand-accent group-hover:text-white transition-all duration-700 relative z-10 shadow-xl shadow-black/5 overflow-hidden">
                <feature.icon 
                  size={32} 
                  className="text-brand-secondary/40 group-hover:text-white transition-colors duration-700 relative z-10" 
                  strokeWidth={1.5}
                />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-brand-primary mb-4 group-hover:text-brand-accent transition-colors duration-700 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-brand-secondary leading-relaxed group-hover:text-brand-primary transition-colors duration-700">
                  {feature.description}
                </p>
              </div>
              {featureImages[index] && (
                <img 
                  src={featureImages[index]} 
                  alt={feature.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-10 transition-opacity duration-1000 rounded-[2.5rem] pointer-events-none grayscale"
                  referrerPolicy="no-referrer"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
