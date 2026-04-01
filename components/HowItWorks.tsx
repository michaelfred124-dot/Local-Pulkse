import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Compass, Search, PenTool, Code2, Rocket, TrendingUp } from 'lucide-react';
import { generateImage } from '../src/services/imageService';

const steps = [
  {
    id: '01',
    icon: Compass,
    title: "Strategic Discovery",
    description: "We begin by understanding your unique market position and growth objectives. Our strategy is built on data, not assumptions.",
    prompt: "Abstract visualization of strategic discovery, vibrant cyan and purple gradients, minimalist, clean white background, high-end, 4k."
  },
  {
    id: '02',
    icon: PenTool,
    title: "Bespoke Design",
    description: "Our design process is iterative and collaborative. We craft visual experiences that are as functional as they are beautiful.",
    prompt: "Abstract visualization of bespoke design, vibrant magenta and purple gradients, minimalist, clean white background, high-end, 4k."
  },
  {
    id: '03',
    icon: Code2,
    title: "Precision Engineering",
    description: "We translate designs into high-performance code. Our development is focused on speed, security, and seamless scalability.",
    prompt: "Abstract visualization of precision engineering, vibrant cyan and blue gradients, minimalist, clean white background, high-end, 4k."
  },
  {
    id: '04',
    icon: Rocket,
    title: "Deployment & Growth",
    description: "We handle the technical complexities of launch and provide the ongoing support needed to scale your digital presence.",
    prompt: "Abstract visualization of deployment and growth, vibrant colorful gradients, minimalist, clean white background, high-end, 4k."
  }
];

const HowItWorks: React.FC = () => {
  const [stepImages, setStepImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchImages = async () => {
      const images: Record<string, string> = {};
      for (let i = 0; i < steps.length; i++) {
        const img = await generateImage(steps[i].prompt);
        if (img) images[steps[i].id] = img;
      }
      setStepImages(images);
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
            OUR PROCESS
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-brand-primary mb-8 leading-tight tracking-tight"
          >
            FROM VISION <br />
            <span className="brand-gradient-text italic font-light">TO REALITY</span>.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-brand-secondary leading-relaxed"
          >
            Our methodology is refined through years of experience, ensuring a seamless journey from initial concept to a high-performing digital product.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gray-50 relative p-10 rounded-[3rem] flex flex-col justify-between min-h-[450px] transition-all duration-700 hover:-translate-y-2 overflow-hidden border border-gray-100 hover:border-brand-accent/30 shadow-2xl shadow-black/5 group`}
            >
              {stepImages[step.id] && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-all duration-1000 grayscale">
                  <img src={stepImages[step.id]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
              
              <div className="absolute top-8 right-10 text-6xl font-black opacity-5 italic relative z-10 text-brand-primary">{step.id}</div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 bg-white text-brand-accent shadow-xl shadow-black/5`}>
                  <step.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-bold mb-4 leading-tight tracking-tight text-brand-primary">{step.title}</h3>
              </div>
              
              <p className={`leading-relaxed relative z-10 text-brand-secondary`}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
