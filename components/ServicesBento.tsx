import React, { useState, useEffect } from 'react';
import { Layout, Smartphone, Search, BarChart3, Mail, PenTool, Globe, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { generateImage } from '../src/services/imageService';

const ServicesBento: React.FC = () => {
  const [serviceImages, setServiceImages] = useState<Record<number, string>>({});

  const services = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Digital Strategy",
      description: "We define the roadmap for your digital success, ensuring every pixel serves a purpose.",
      color: "bg-brand-accent/20 text-brand-accent",
      prompt: "Abstract 3D visualization of a digital roadmap, vibrant cyan and purple gradients, minimalist, clean white background, high-end, 4k."
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Web Experience",
      description: "High-end, responsive websites crafted with precision and focused on conversion.",
      color: "bg-gray-50 text-brand-primary",
      prompt: "A beautiful modern website layout displayed on a sleek monitor, vibrant magenta and cyan accents, clean white background, 4k."
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile First",
      description: "Seamless experiences across all devices, optimized for the modern mobile user.",
      color: "bg-gray-50 text-brand-primary",
      prompt: "A high-end smartphone showing a vibrant mobile app interface, colorful gradients, minimalist, clean white background, 4k."
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Search Authority",
      description: "Dominating local search results and putting your business where customers are looking.",
      color: "bg-gray-50 text-brand-primary",
      prompt: "Abstract digital search interface with vibrant glowing elements, cyan and purple, minimalist, clean white background, 4k."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Growth Analytics",
      description: "Data-driven insights that help you understand your audience and scale effectively.",
      color: "bg-gray-50 text-brand-primary",
      prompt: "Abstract 3D data charts and graphs in vibrant magenta and purple, minimalist, clean white background, high-end, 4k."
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Brand Identity",
      description: "Visual storytelling that resonates with your audience and builds lasting trust.",
      color: "bg-gray-50 text-brand-primary",
      prompt: "Abstract brand identity elements, vibrant colorful glass shapes, minimalist, clean white background, high-end, 4k."
    }
  ];

  useEffect(() => {
    const fetchImages = async () => {
      const images: Record<number, string> = {};
      for (let i = 0; i < services.length; i++) {
        const img = await generateImage(services[i].prompt);
        if (img) images[i] = img;
      }
      setServiceImages(images);
    };
    fetchImages();
  }, []);

  return (
    <section id="services" className="py-32 overflow-hidden relative bg-white">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold text-brand-accent mb-6"
            >
              OUR EXPERTISE
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-bold text-brand-primary leading-tight tracking-tight">
              SOLUTIONS <br />
              <span className="brand-gradient-text italic font-light">FOR MODERN</span> GROWTH.
            </h2>
          </div>
          <p className="text-brand-secondary text-lg max-w-sm leading-relaxed">
            We don't just build websites; we build digital ecosystems that empower local businesses to thrive in a competitive landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/5 border border-black/5 rounded-[3rem] overflow-hidden shadow-2xl shadow-black/5">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-12 hover:bg-gray-50 transition-all group cursor-default relative overflow-hidden border-none rounded-none"
            >
              {serviceImages[index] && (
                <img 
                  src={serviceImages[index]} 
                  alt={service.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-10 transition-opacity duration-1000 grayscale"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gray-100 text-brand-secondary rounded-2xl flex items-center justify-center mb-10 transition-transform group-hover:scale-110 duration-700 shadow-xl shadow-black/5 relative overflow-hidden`}>
                  <div className="absolute inset-0 brand-gradient-bg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative z-10 group-hover:text-white transition-colors duration-700">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-brand-primary mb-4 group-hover:text-brand-accent transition-colors duration-700 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-brand-secondary leading-relaxed group-hover:text-brand-primary transition-colors duration-700">
                  {service.description}
                </p>
                
                <div className="mt-12 flex items-center gap-3 text-xs font-bold text-brand-secondary/20 group-hover:text-brand-accent transition-colors duration-700">
                  EXPLORE 
                  <div className="w-0 group-hover:w-12 h-px bg-brand-accent transition-all duration-700"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesBento;
