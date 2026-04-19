import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Compass, PenTool, Code2, Rocket, ArrowRight, CreditCard, Layout, Smartphone, Globe, Zap } from 'lucide-react';
import { generateImage } from '../src/services/imageService';

const steps = [
  {
    id: '01',
    icon: Compass,
    title: "Choose a Template",
    description: "Start with a professionally designed template tailored for your industry. Or, start from scratch if you prefer.",
    prompt: "UX research dashboard, user personas, wireframing sketches, digital strategy graphics, vibrant cyan and purple gradients, minimalist, clean white background, high-end, 4k."
  },
  {
    id: '02',
    icon: PenTool,
    title: "Customize Your Design",
    description: "Use our intuitive visual editor to change colors, fonts, layouts, and more. Make it uniquely yours.",
    prompt: "UI design workspace, color palettes, typography, vector graphics, modern web design elements, vibrant magenta and purple gradients, minimalist, clean white background, high-end, 4k."
  },
  {
    id: '03',
    icon: Code2,
    title: "Add Your Content",
    description: "Easily add text, images, videos, and products. Our AI tools can even help you write copy and generate images.",
    prompt: "Code editor interface, frontend development graphics, modern web architecture, vibrant cyan and blue gradients, minimalist, clean white background, high-end, 4k."
  },
  {
    id: '04',
    icon: Rocket,
    title: "Publish & Grow",
    description: "Hit publish and your site is live on our global network. Use our built-in tools to track analytics and grow your audience.",
    prompt: "Web deployment dashboard, analytics charts, digital growth graphics, vibrant colorful gradients, minimalist, clean white background, high-end, 4k."
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
      {/* Geometric Floating Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="floating-shape shape-triangle w-20 h-20 top-[20%] left-[5%]" />
        <div className="floating-shape shape-square w-24 h-24 bottom-[15%] right-[10%]" style={{ animationDelay: '-4s' }} />
        <div className="floating-shape shape-circle w-16 h-16 top-[60%] right-[20%]" style={{ animationDelay: '-9s' }} />
        <div className="floating-shape shape-triangle w-28 h-28 bottom-[40%] left-[15%]" style={{ animationDelay: '-14s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-32 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-[#86868b] mb-4 tracking-wider uppercase relative z-10"
          >
            The Process
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-[#1d1d1f] mb-8 leading-tight tracking-tighter relative z-10"
          >
            From idea <br />
            to launch.
          </motion.h2>
          <p className="text-[#86868b] text-xl leading-relaxed font-medium tracking-tight max-w-xl">
            We've streamlined the entire process. No more technical hurdles, just pure creativity and rapid deployment.
          </p>
        </div>

        {/* Presentation: Idea to Launch */}
        <div className="mb-48 relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Idea */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#f5f5f7] p-10 rounded-[3rem] border border-black/5 relative group"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#1d1d1f] mb-8 shadow-sm group-hover:scale-110 transition-transform">
                <PenTool size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-bold text-[#1d1d1f] mb-4 tracking-tight">The Idea</h3>
              <p className="text-[#86868b] font-medium leading-relaxed">Sketch your vision. Our AI understands your intent and starts building the foundation.</p>
              <div className="mt-8 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <div className="w-2 h-2 rounded-full bg-gray-200" />
                <div className="w-2 h-2 rounded-full bg-gray-200" />
              </div>
            </motion.div>

            {/* Transition Arrow */}
            <div className="hidden lg:flex items-center justify-center">
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-black/10"
              >
                <ArrowRight size={64} strokeWidth={1} />
              </motion.div>
            </div>

            {/* Launch */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#1d1d1f] p-10 rounded-[3rem] text-white relative group lg:col-span-1"
            >
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
                <Rocket size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight">The Launch</h3>
              <p className="text-white/60 font-medium leading-relaxed">One click and your site is live on a global edge network. Scalable, secure, and lightning fast.</p>
              <div className="mt-8 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-600" />
                <div className="w-2 h-2 rounded-full bg-gray-600" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-black/5 -translate-x-1/2 hidden md:block" />

          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-48">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`flex flex-col md:flex-row items-center gap-6 md:gap-24 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content */}
                <div className="flex-1 w-full">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`space-y-3 md:space-y-6 ${index % 2 === 1 ? 'md:text-right' : ''}`}
                  >
                    <div className={`flex items-center gap-3 md:gap-4 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="text-2xl md:text-4xl font-bold text-black/5 tracking-tighter">{step.id}</div>
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#f5f5f7] flex items-center justify-center text-[#1d1d1f]">
                        <step.icon size={16} className="md:w-6 md:h-6" strokeWidth={1.5} />
                      </div>
                    </div>
                    <h3 className="text-xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight">{step.title}</h3>
                    <p className="text-xs md:text-lg text-[#86868b] leading-relaxed font-medium tracking-tight max-w-md mx-auto md:mx-0">
                      {step.description}
                    </p>
                  </motion.div>
                </div>

                {/* Center Point */}
                <div className="relative z-10 hidden md:block">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="w-4 h-4 rounded-full bg-[#1d1d1f] border-4 border-white shadow-lg" 
                  />
                </div>

                {/* Image/Visual */}
                <div className="flex-1 w-full hidden md:block">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative aspect-video rounded-[2rem] overflow-hidden shadow-xl border border-black/5 bg-[#f5f5f7]"
                  >
                    {stepImages[step.id] ? (
                      <img 
                        src={stepImages[step.id]} 
                        alt={step.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <step.icon size={48} className="text-black/5" />
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
