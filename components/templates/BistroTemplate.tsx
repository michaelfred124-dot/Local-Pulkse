import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Star, Globe, Shield, Zap, Clock, Layout, Loader2 } from 'lucide-react';
import { PortfolioItem } from '../../types';

const DecorativeElement: React.FC<{ className?: string, style?: any }> = ({ className, style }) => (
  <motion.svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    style={style}
    initial={{ rotate: 0, opacity: 0 }}
    animate={{ 
      rotate: [0, 15, -15, 0],
      y: [0, -15, 15, 0],
      opacity: style?.opacity || 0.1
    }}
    transition={{ 
      duration: 8 + Math.random() * 8, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </motion.svg>
);

export const BistroTemplate: React.FC<{ item: PortfolioItem }> = ({ item }) => {
  return (
    <div className="font-sans min-h-[800px] overflow-hidden relative bg-[#FAF9F6] text-[#2C1810]">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <DecorativeElement 
            key={i}
            className="absolute text-[#2C1810]/5 w-16 h-16"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.05 + Math.random() * 0.1,
              transform: `scale(${0.5 + Math.random()}) rotate(${Math.random() * 360}deg)`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-48 px-6 md:px-16 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1 space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#2C1810]/5 border border-[#2C1810]/10 mb-8">
                <span className="w-2 h-2 rounded-full bg-[#D4A373] animate-pulse"></span>
                <span className="text-[#2C1810] text-[10px] font-bold uppercase tracking-[0.3em]">{item.location || 'Est. 2018'}</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-serif italic mb-8 leading-[0.9] tracking-tighter text-[#2C1810]">
                {item.heroHeadline ? item.heroHeadline.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                )) : item.title.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h1>
              <p className="text-xl md:text-2xl text-[#2C1810]/70 max-w-lg leading-relaxed font-light">
                {item.heroSubheadline || item.description}
              </p>
              <div className="flex flex-wrap gap-6 mt-12">
                <button className="px-10 py-5 font-bold rounded-full hover:scale-105 transition-all shadow-2xl text-[11px] uppercase tracking-[0.2em] bg-[#2C1810] text-white">
                  Explore the Menu
                </button>
                <button className="px-10 py-5 bg-transparent border border-[#2C1810]/20 text-[#2C1810] font-bold rounded-full hover:bg-white/10 transition-all text-[11px] uppercase tracking-[0.2em]">
                  Our Process
                </button>
              </div>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
            className="flex-1 relative"
          >
            <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(44,24,16,0.3)] border-8 border-white">
              <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.title} referrerPolicy="no-referrer" />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[2.5rem] shadow-2xl max-w-xs border border-[#2C1810]/5">
              <div className="flex gap-1 mb-4 text-[#D4A373]">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="italic text-[#2C1810]/80 text-lg leading-relaxed">
                "An absolute masterclass in seasonal dining. Every dish tells a story."
              </p>
              <p className="mt-4 font-bold text-[10px] uppercase tracking-[0.2em] text-[#D4A373]">Michelin Guide 2025</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="py-32 px-6 md:px-16 bg-white relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
          <div className="space-y-12">
            <h2 className="text-5xl md:text-7xl font-serif italic text-[#2C1810] leading-[0.9] tracking-tighter">
              The Philosophy
            </h2>
            <p className="text-xl text-[#2C1810]/70 leading-relaxed font-light whitespace-pre-wrap">
              {item.aboutText || "We believe in the power of simplicity. Our approach is rooted in a deep respect for the ingredients, the process, and the people who make it all possible. Every element is carefully considered, resulting in an experience that is both refined and approachable."}
            </p>
            <div className="pt-8 border-t border-[#2C1810]/10">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF9F6] border border-[#2C1810]/10 flex items-center justify-center overflow-hidden">
                  {item.logo ? <img src={item.logo} alt="Logo" className="w-full h-full object-contain p-2" /> : <Star className="text-[#D4A373]" />}
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-bold text-[#2C1810] uppercase tracking-[0.2em] text-[11px] mb-1">{item.title}</h3>
                  <p className="text-[#2C1810]/60 italic font-serif">{item.category}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" alt="Chef" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 bg-[#FAF9F6] relative z-10">
        {/* Tech Stack / Equipment Section */}
        <div className="border-y py-24 px-6 md:px-16 mb-32 bg-[#2C1810] border-[#D4A373]/5 text-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="max-w-md">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block text-[#D4A373]">
                The Machinery
              </span>
              <h3 className="text-4xl font-bold mb-6 leading-tight font-serif italic text-white">
                Precision Cooking
              </h3>
              <p className="text-lg leading-relaxed text-white/60">
                World-class equipment ensures that every nuance of the ingredient is preserved and highlighted in your dish.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 flex-1">
              {['Sous Vide Pro', 'Wood-Fired Oven', 'Blast Chiller', 'Induction Ranges', 'Precision Scales', 'Pacojet'].map((tech) => (
                <div key={tech} className="px-8 py-6 rounded-2xl border transition-all hover:scale-105 bg-white/5 border-white/10 text-white hover:bg-white/10">
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">
                    Equipment
                  </div>
                  <div className="font-bold">{tech}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 md:px-16 max-w-7xl mx-auto">
          {/* Menu Section */}
          {item.menu ? (
            <div className="mb-32">
              <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
                <div className="max-w-2xl">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 block text-[#D4A373]">The Collection</span>
                  <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none font-serif italic text-[#2C1810]">
                    Signature Menu
                  </h2>
                </div>
                <p className="max-w-md text-lg leading-relaxed text-[#2C1810]/60">
                  A curated selection of seasonal dishes and artisanal pairings, crafted for the discerning palate.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                {item.menu.map((menuItem: any, i: number) => (
                  <div key={i} className="group p-10 rounded-[2.5rem] border transition-all duration-500 bg-white border-[#2C1810]/5 hover:border-[#D4A373]/30 hover:shadow-2xl hover:shadow-[#2C1810]/5">
                    <div className="flex justify-between items-start mb-8">
                      <div className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#2C1810]/5 text-[#2C1810]">
                        {menuItem.category || 'Service'}
                      </div>
                      <span className="text-2xl font-bold text-[#D4A373]">{menuItem.price}</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 transition-colors font-serif italic text-[#2C1810] group-hover:text-[#D4A373]">{menuItem.name || menuItem.title}</h3>
                    <p className="text-lg leading-relaxed mb-8 text-[#2C1810]/60">{menuItem.description}</p>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all group-hover:gap-4 text-[#2C1810]">
                      Order Now <ArrowUpRight size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-32">
              <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
                <div className="max-w-2xl">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 block text-[#D4A373]">Our Offerings</span>
                  <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none font-serif italic text-[#2C1810]">
                    What We Do
                  </h2>
                </div>
              </div>
              <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-[#2C1810]/5">
                <p className="text-xl text-[#2C1810]/70 leading-relaxed font-light whitespace-pre-wrap">
                  {item.servicesText || "We offer a variety of services tailored to your needs."}
                </p>
              </div>
            </div>
          )}

          {/* Immersive Dining Image Section */}
          <div className="w-full relative py-32 my-32 bg-[#2C1810] overflow-hidden rounded-[3rem]">
            <div className="absolute inset-0 opacity-40">
              <img 
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=2000&q=80" 
                className="w-full h-full object-cover" 
                alt="Fine dining" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2C1810] via-[#2C1810]/80 to-transparent"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 grid md:grid-cols-2 gap-16 items-center text-white">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#D4A373]/10 border border-[#D4A373]/20 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-[#D4A373] animate-pulse"></span>
                  <span className="text-[#D4A373] text-xs font-bold uppercase tracking-widest">Farm to Table</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-serif italic text-white leading-none">From Farm<br/>to Fork.</h2>
                <p className="text-white/80 leading-relaxed text-xl max-w-md font-light">
                  We believe that great food is a result of a thousand small decisions made correctly. 
                  From the soil of the farm to the precise temperature of the sear, we obsess over every detail.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-8 bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors group">
                  <div className="mb-4 text-[#D4A373] group-hover:scale-110 transition-transform duration-500">
                    <Shield size={32} />
                  </div>
                  <p className="text-4xl font-bold text-white mb-2">100%</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/60">Organic Produce</p>
                </div>
                <div className="p-8 bg-[#D4A373] rounded-[2rem] shadow-2xl shadow-[#D4A373]/20 transform md:translate-y-12">
                  <div className="mb-4 text-[#2C1810]">
                    <Clock size={32} />
                  </div>
                  <p className="text-4xl font-bold text-[#2C1810] mb-2">Daily</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#2C1810]/60">Fresh Ingredients</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hours & FAQs */}
          <div className="grid md:grid-cols-2 gap-24 mb-32">
            <div>
              <h2 className="text-3xl font-bold mb-8 font-serif italic text-[#2C1810]">Hours of Operation</h2>
              <div className="space-y-4">
                {item.hours?.map((hour, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-[#D4A373]/10">
                    <span className="text-[#2C1810]/60 font-medium">{hour.split(':')[0]}</span>
                    <span className="text-[#2C1810] font-bold">{hour.split(':').slice(1).join(':').trim()}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-8 font-serif italic text-[#2C1810]">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {item.faqs?.map((faq, i) => (
                  <div key={i} className="rounded-2xl p-6 bg-white border border-[#D4A373]/10 shadow-sm">
                    <h4 className="font-bold mb-2 text-[#2C1810]">{faq.question}</h4>
                    <p className="text-sm leading-relaxed text-[#2C1810]/60">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mb-32">
            <div className="text-center mb-20">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 block text-[#D4A373]">Testimonials</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter font-serif italic text-[#2C1810]">
                {item.reviewsHeadline || "What Our Clients Say"}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {item.reviews?.map((review, i) => (
                <div key={i} className="p-12 rounded-[2rem] border relative transition-all duration-500 hover:-translate-y-2 bg-[#FAF9F6] border-[#2C1810]/5 hover:shadow-2xl hover:shadow-[#2C1810]/5">
                  <div className="flex gap-1 mb-8">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#2C1810" className="text-[#2C1810]" />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl leading-relaxed mb-10 font-serif italic text-[#2C1810]">"{review.content}"</p>
                  <div className="flex items-center gap-4 border-t pt-8 border-current opacity-60">
                    <div>
                      <h5 className="font-bold text-sm uppercase tracking-widest text-[#2C1810]">{review.name}</h5>
                      <p className="text-[10px] font-bold uppercase tracking-widest mt-1 text-[#D4A373]">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-32 px-6 md:px-16 bg-[#2C1810] text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 border-b border-white/10 pb-16 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-bold mb-8 flex items-center gap-4 font-serif italic">
              {item.logo ? (
                <img src={item.logo} alt="Logo" className="h-12 object-contain grayscale" />
              ) : (
                <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-[#D4A373] text-[#2C1810]">
                  <span className="text-sm font-bold">{item.title.charAt(0)}</span>
                </div>
              )}
              {item.title}
            </h2>
            <p className="max-w-md mb-12 text-xl leading-relaxed text-white/60">
              Crafting exceptional dining experiences since 2018. Join our community of food lovers.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-[0.2em] text-[10px] text-[#D4A373]">Company</h4>
            <ul className="space-y-6 text-sm font-medium tracking-wide text-white/40">
              <li className="hover:text-white cursor-pointer transition-colors">Our Story</li>
              <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-white cursor-pointer transition-colors">Press</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-white/20">
          <div>&copy; 2026 {item.title}. All rights reserved.</div>
          <div className="flex gap-8">
            <span className="hover:text-white/40 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white/40 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
