import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { Testimonial } from '../types';
import { generateImage } from '../src/services/imageService';

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Eleanor Vance",
    role: "Creative Director",
    company: "Apex Performance",
    content: "Milestone Digital redefined our brand's digital presence. Their attention to detail and commitment to excellence is unparalleled in the industry.",
    prompt: "A professional portrait of a creative director, high-end, minimalist, sophisticated, clean white background, 4k."
  },
  {
    id: 2,
    name: "Julian Thorne",
    role: "Founder",
    company: "Lumina Gardens",
    content: "The strategic approach taken by the Milestone team was exactly what we needed to scale. They don't just build websites; they build growth engines.",
    prompt: "A professional portrait of a founder, high-end, minimalist, sophisticated, clean white background, 4k."
  },
  {
    id: 3,
    name: "Sophia Moretti",
    role: "Managing Partner",
    company: "Vanguard Dental",
    content: "A seamless experience from start to finish. The level of sophistication and technical precision they bring to every project is truly impressive.",
    prompt: "A professional portrait of a managing partner, high-end, minimalist, sophisticated, clean white background, 4k."
  }
];

const Testimonials: React.FC = () => {
  const [avatars, setAvatars] = useState<Record<number, string>>({});

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

  return (
    <section id="reviews" className="py-32 relative overflow-hidden bg-white">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-brand-accent mb-6"
          >
            CLIENT PERSPECTIVES
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-brand-primary mb-8 leading-tight tracking-tight"
          >
            Voices of <br />
            <span className="brand-gradient-text italic font-light">Success</span>.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-brand-secondary leading-relaxed"
          >
            We take pride in the partnerships we build. Here is what our clients have to say about their journey with Milestone Digital.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {TESTIMONIALS.map((t, index) => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 hover:border-brand-accent/30 hover:shadow-2xl hover:shadow-brand-accent/5 transition-all duration-500"
            >
              <div className="mb-8 text-brand-accent/20">
                <Quote size={48} fill="currentColor" strokeWidth={0} />
              </div>
              
              <div className="mb-10">
                <p className="text-xl text-brand-primary leading-relaxed italic font-light">
                  "{t.content}"
                </p>
              </div>
              
              <div className="flex items-center gap-5 pt-8 border-t border-gray-200">
                <div className="relative">
                  {avatars[t.id] ? (
                    <img src={avatars[t.id]} alt={t.name} className="w-14 h-14 rounded-full object-cover transition-all duration-500" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse"></div>
                  )}
                  <div className="absolute inset-0 rounded-full border border-black/5"></div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-primary mb-1">{t.name}</h4>
                  <p className="text-xs font-bold text-brand-secondary/60">{t.role}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
