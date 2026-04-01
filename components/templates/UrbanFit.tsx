import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap, Shield, Clock, Star, Layout, Globe } from 'lucide-react';
import { PortfolioItem } from '../../types';

export const UrbanFit: React.FC<{ item: PortfolioItem }> = ({ item }) => {
  return (
    <div className="font-sans min-h-[800px] overflow-hidden relative bg-[#050505] text-white selection:bg-[#00FF00] selection:text-black">
      {/* Marquee Top */}
      <div className="bg-[#00FF00] text-black py-2 overflow-hidden flex whitespace-nowrap">
        <div className="animate-[marquee_20s_linear_infinite] flex gap-8 text-[10px] font-black uppercase tracking-widest">
          {[...Array(10)].map((_, i) => (
            <span key={i}>NO EXCUSES • PUSH HARDER • {item.location ? `${item.location} • ` : ''}URBAN FIT • </span>
          ))}
        </div>
      </div>

      {/* Navbar */}
      <div className="px-6 md:px-12 py-6 flex justify-between items-center border-b border-white/10">
        <h3 className="text-2xl font-black tracking-tighter uppercase italic flex items-center gap-2">
          {item.logo ? (
            <img src={item.logo} alt="Logo" className="h-8 object-contain" />
          ) : (
            <div className="w-8 h-8 bg-[#00FF00] text-black flex items-center justify-center transform -skew-x-12 shrink-0">
              <span className="text-sm font-black">{item.title.charAt(0)}</span>
            </div>
          )}
          <span className="truncate max-w-[150px] sm:max-w-none">{item.title}</span>
        </h3>
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-white/70">
          <span className="hover:text-[#00FF00] cursor-pointer transition-colors">Training</span>
          <span className="hover:text-[#00FF00] cursor-pointer transition-colors">Coaches</span>
          <span className="hover:text-[#00FF00] cursor-pointer transition-colors">Schedule</span>
          <span className="hover:text-[#00FF00] cursor-pointer transition-colors">Store</span>
        </div>
        <div className="px-6 py-3 text-xs font-black uppercase tracking-widest cursor-pointer transition-all bg-white text-black hover:bg-[#00FF00] transform -skew-x-12">
          <span className="block transform skew-x-12">Join Now</span>
        </div>
      </div>

      {/* Hero Section - Brutalist */}
      <div className="relative min-h-[700px] flex items-center border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 opacity-40 grayscale mix-blend-luminosity">
          <img src={item.imageUrl} className="w-full h-full object-cover" alt="Hero" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="max-w-3xl"
          >
            <h1 className="text-6xl md:text-[120px] font-black mb-6 leading-[0.85] tracking-tighter uppercase italic text-transparent stroke-text" style={{ WebkitTextStroke: '2px white' }}>
              {item.heroHeadline || (
                <>
                  Redefine <br/>
                  <span className="text-[#00FF00]" style={{ WebkitTextStroke: '0' }}>Your Limits.</span>
                </>
              )}
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white/70 font-medium max-w-xl">
              {item.heroSubheadline || "High-intensity training for those who demand more from themselves. Welcome to the underground."}
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="px-10 py-5 font-black uppercase tracking-widest bg-[#00FF00] text-black hover:bg-white transition-colors transform -skew-x-12">
                <span className="block transform skew-x-12">Start Free Trial</span>
              </button>
              <button className="px-10 py-5 bg-transparent border-2 border-white font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors transform -skew-x-12">
                <span className="block transform skew-x-12">View Programs</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Giant Background Text */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 text-[200px] font-black uppercase italic text-white/5 pointer-events-none select-none leading-none">
          GRIT
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid md:grid-cols-2 border-b border-white/10">
        <div className="p-12 md:p-24 border-r border-white/10 flex flex-col justify-center">
          <h2 className="text-5xl font-black uppercase italic mb-8">The Method</h2>
          <p className="text-lg text-white/60 leading-relaxed mb-12 whitespace-pre-wrap">
            {item.aboutText || "Our science-backed programming combines strength, conditioning, and mobility to forge unbreakable athletes. No gimmicks, just work."}
          </p>
          <div className="space-y-6">
            {(item.servicesText ? item.servicesText.split('\n').filter(s => s.trim()) : ['Strength & Conditioning', 'HIIT & Metcon', 'Olympic Weightlifting', 'Mobility & Recovery']).map((prog, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center font-black text-[#00FF00] group-hover:bg-[#00FF00] group-hover:text-black transition-colors transform -skew-x-12">
                  <span className="block transform skew-x-12">0{i + 1}</span>
                </div>
                <span className="text-xl font-bold uppercase tracking-wide group-hover:text-[#00FF00] transition-colors">{prog}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-12 md:p-24 bg-[#111]">
          <h2 className="text-5xl font-black uppercase italic mb-12 text-[#00FF00]">Stats</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="border-l-4 border-[#00FF00] pl-6">
              <p className="text-6xl font-black mb-2">5K+</p>
              <p className="text-sm font-bold uppercase tracking-widest text-white/50">Active Members</p>
            </div>
            <div className="border-l-4 border-white pl-6">
              <p className="text-6xl font-black mb-2">50+</p>
              <p className="text-sm font-bold uppercase tracking-widest text-white/50">Expert Coaches</p>
            </div>
            <div className="border-l-4 border-white pl-6">
              <p className="text-6xl font-black mb-2">12</p>
              <p className="text-sm font-bold uppercase tracking-widest text-white/50">Locations</p>
            </div>
            <div className="border-l-4 border-[#00FF00] pl-6">
              <p className="text-6xl font-black mb-2">24/7</p>
              <p className="text-sm font-bold uppercase tracking-widest text-white/50">Access</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black uppercase italic mb-6">Facility</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(item.features || [
            { title: 'Elite Equipment', icon: Zap, desc: 'Competition-grade plates, bars, and rigs.' },
            { title: 'Recovery Zone', icon: Shield, desc: 'Cold plunges, saunas, and compression therapy.' },
            { title: 'Performance Tracking', icon: Layout, desc: 'In-house app to log lifts and track PRs.' }
          ]).slice(0, 3).map((feature, i) => (
            <div key={i} className="bg-[#111] p-10 border border-white/10 hover:border-[#00FF00] transition-colors group">
              <div className="w-16 h-16 bg-white/5 flex items-center justify-center mb-8 text-white group-hover:bg-[#00FF00] group-hover:text-black transition-colors transform -skew-x-12">
                <feature.icon size={32} className="transform skew-x-12" />
              </div>
              <h3 className="text-2xl font-black uppercase italic mb-4">{feature.title}</h3>
              <p className="text-white/60 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="py-20 px-6 md:px-16 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 border-b border-white/10 pb-16 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-black uppercase italic mb-6 text-[#00FF00] flex items-center gap-2">
              {item.logo ? (
                <img src={item.logo} alt="Logo" className="h-8 object-contain grayscale" />
              ) : null}
              {item.title}
            </h2>
            <p className="max-w-sm mb-8 text-white/50 font-medium">
              The ultimate training ground for those who refuse to be average.
            </p>
            {item.location && (
              <p className="max-w-sm mb-8 text-white/50 font-medium flex items-center gap-2">
                <Globe size={16} /> {item.location}
              </p>
            )}
          </div>
          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-white">Links</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-wider text-white/50">
              <li className="hover:text-[#00FF00] cursor-pointer transition-colors">Programs</li>
              <li className="hover:text-[#00FF00] cursor-pointer transition-colors">Schedule</li>
              <li className="hover:text-[#00FF00] cursor-pointer transition-colors">Pricing</li>
              <li className="hover:text-[#00FF00] cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-white">Social</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-wider text-white/50">
              <li className="hover:text-[#00FF00] cursor-pointer transition-colors">Instagram</li>
              <li className="hover:text-[#00FF00] cursor-pointer transition-colors">YouTube</li>
              <li className="hover:text-[#00FF00] cursor-pointer transition-colors">TikTok</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-center text-xs font-bold uppercase tracking-widest text-white/30">
          &copy; {new Date().getFullYear()} {item.title}. All rights reserved.
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
