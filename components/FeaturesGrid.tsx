import React, { useState, useEffect } from 'react';
import { Smartphone, Palette, Search, Zap, ShieldCheck, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { generateImage } from '../src/services/imageService';

const features = [
  {
    icon: Palette,
    title: "Beautiful Templates",
    description: "Start with stunning, professionally designed templates tailored for your industry. Customize everything to match your brand.",
    prompt: "Website template gallery UI design, beautiful web layouts, modern digital design, vibrant blue and purple gradients, clean white background, high-end, 4k."
  },
  {
    icon: Smartphone,
    title: "Drag & Drop Editor",
    description: "Our intuitive visual editor lets you build and customize your site in real-time. No coding skills required.",
    prompt: "Drag and drop website builder UI design, visual editor interface, modern web design components, vibrant pink and purple tones, clean white background, high-end, 4k."
  },
  {
    icon: Search,
    title: "Built-in SEO",
    description: "Climb the search rankings with automated SEO tools, fast load times, and clean, semantic code structure.",
    prompt: "SEO analytics dashboard UI design, web graphics, data visualization charts, vibrant blue tones, clean white background, high-end, 4k."
  },
  {
    icon: Zap,
    title: "Lightning Fast Hosting",
    description: "Your site is hosted on our global CDN, ensuring lightning-fast load times and 99.9% uptime for your visitors.",
    prompt: "Web performance dashboard UI, speed optimization graphics, modern digital design, vibrant cyan and magenta, clean white background, high-end, 4k."
  },
  {
    icon: ShieldCheck,
    title: "Custom Domains",
    description: "Connect your own custom domain to build brand authority and look professional from day one.",
    prompt: "Domain management dashboard UI design, modern web interface, vibrant purple tones, clean white background, high-end, 4k."
  },
  {
    icon: Settings,
    title: "Analytics Dashboard",
    description: "Track your success with built-in analytics. Understand your audience and optimize your site for growth.",
    prompt: "Website analytics dashboard UI, data visualization graphics, modern web design components, vibrant blue and pink, clean white background, high-end, 4k."
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
    <section className="py-32 relative overflow-hidden bg-[#f5f5f7]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-24 text-center mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-[#1d1d1f] mb-8 leading-tight tracking-tighter"
          >
            Powerful. <br />
            Yet simple.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#86868b] leading-relaxed font-medium tracking-tight"
          >
            We provide all the tools you need to build, manage, and grow your online presence without writing a single line of code.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-10 rounded-[2rem] bg-white border border-black/5 hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <div className="mb-8 w-16 h-16 rounded-2xl bg-[#f5f5f7] flex items-center justify-center text-[#1d1d1f] transition-all duration-500 relative z-10">
                <feature.icon 
                  size={28} 
                  strokeWidth={1.5}
                />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-[#1d1d1f] mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-[#86868b] leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
              {featureImages[index] && (
                <img 
                  src={featureImages[index]} 
                  alt={feature.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-5 transition-opacity duration-700 rounded-[2rem] pointer-events-none grayscale"
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
