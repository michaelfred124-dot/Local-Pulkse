import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial } from '../types';
import { generateImage } from '../src/services/imageService';

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Eleanor Vance",
    role: "Creative Director",
    company: "Apex Performance",
    content: "This platform redefined our brand's digital presence. The attention to detail and ease of use is unparalleled in the industry.",
    prompt: "A professional portrait of a creative director, high-end, minimalist, sophisticated, clean white background, 4k."
  },
  {
    id: 2,
    name: "Julian Thorne",
    role: "Founder",
    company: "Lumina Gardens",
    content: "The tools provided by this platform were exactly what we needed to scale. It's not just a website builder; it's a growth engine.",
    prompt: "A professional portrait of a founder, high-end, minimalist, sophisticated, clean white background, 4k."
  },
  {
    id: 3,
    name: "Sophia Moretti",
    role: "Managing Partner",
    company: "Vanguard Dental",
    content: "A seamless experience from start to finish. The level of sophistication and technical precision you can achieve without coding is truly impressive.",
    prompt: "A professional portrait of a managing partner, high-end, minimalist, sophisticated, clean white background, 4k."
  }
];

const Testimonials: React.FC = () => {
  const [avatars, setAvatars] = useState<Record<number, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetchAvatars = async () => {
      const images: Record<number, string> = {};
      for (let i = 0; i < TESTIMONIALS.length; i++) {
        const img = await generateImage(TESTIMONIALS[i].prompt!);
        if (img) images[TESTIMONIALS[i].id] = img;
      }
      setAvatars(images);
    };
    fetchAvatars();
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="reviews" className="py-32 relative overflow-hidden bg-white">
      {/* Geometric Floating Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="floating-shape shape-square w-20 h-20 top-[15%] right-[10%]" />
        <div className="floating-shape shape-circle w-24 h-24 bottom-[10%] left-[15%]" style={{ animationDelay: '-6s' }} />
        <div className="floating-shape shape-triangle w-16 h-16 top-[40%] left-[5%]" style={{ animationDelay: '-11s' }} />
        <div className="floating-shape shape-circle w-20 h-20 top-[10%] left-[20%]" style={{ animationDelay: '-16s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-24 mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-[#86868b] mb-4 tracking-wider uppercase"
          >
            User Stories
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-[#1d1d1f] mb-8 leading-tight tracking-tighter"
          >
            Voices of <br />
            success.
          </motion.h2>
        </div>

        <div className="relative max-w-5xl mx-auto h-[500px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 }
              }}
              className="absolute w-full"
            >
              <div className="bg-[#f5f5f7] p-12 md:p-20 rounded-[3rem] border border-black/5 shadow-2xl shadow-black/5 flex flex-col md:flex-row items-center gap-12 backdrop-blur-sm">
                <div className="flex-shrink-0">
                  <div className="relative">
                    {avatars[TESTIMONIALS[currentIndex].id] ? (
                      <img 
                        src={avatars[TESTIMONIALS[currentIndex].id]} 
                        alt={TESTIMONIALS[currentIndex].name} 
                        className="w-32 h-32 md:w-48 md:h-48 rounded-3xl object-cover shadow-xl grayscale hover:grayscale-0 transition-all duration-700" 
                        referrerPolicy="no-referrer" 
                      />
                    ) : (
                      <div className="w-32 h-32 md:w-48 md:h-48 rounded-3xl bg-black/5 animate-pulse"></div>
                    )}
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#1d1d1f] shadow-lg">
                      <Quote size={20} fill="currentColor" />
                    </div>
                  </div>
                </div>

                <div className="flex-grow space-y-8 text-center md:text-left">
                  <p className="text-2xl md:text-3xl text-[#1d1d1f] leading-tight font-medium tracking-tight italic">
                    "{TESTIMONIALS[currentIndex].content}"
                  </p>
                  <div>
                    <h4 className="text-xl font-bold text-[#1d1d1f] mb-1">{TESTIMONIALS[currentIndex].name}</h4>
                    <p className="text-sm font-semibold text-[#86868b] uppercase tracking-wider">
                      {TESTIMONIALS[currentIndex].role} &bull; {TESTIMONIALS[currentIndex].company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-6">
            <button 
              onClick={() => paginate(-1)}
              className="w-14 h-14 rounded-full border border-black/5 flex items-center justify-center text-[#1d1d1f] hover:bg-black/5 hover:shadow-lg transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <div 
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-[#1d1d1f]' : 'bg-black/10'}`}
                />
              ))}
            </div>
            <button 
              onClick={() => paginate(1)}
              className="w-14 h-14 rounded-full border border-black/5 flex items-center justify-center text-[#1d1d1f] hover:bg-black/5 hover:shadow-lg transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
