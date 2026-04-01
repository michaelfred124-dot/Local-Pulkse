import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, MapPin, Phone, Instagram, Facebook, Star } from 'lucide-react';

interface ArtisanBakeryProps {
  content?: any;
}

export const ArtisanBakery: React.FC<ArtisanBakeryProps> = ({ content }) => {
  const headline = content?.heroHeadline || "Handcrafted with Love, Baked to Perfection";
  const subheadline = content?.heroSubheadline || "Experience the warmth of traditional baking with our daily fresh sourdough, pastries, and artisanal treats.";
  const heroImage = content?.heroImage || content?.imageUrl || "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1920";
  const title = content?.title || "The Artisan Crumb";
  const location = content?.location || "123 Baker Street, Flour District";
  const aboutText = content?.aboutText || "We believe in the power of simplicity. Our approach is rooted in a deep respect for the ingredients, the process, and the people who make it all possible.";
  const servicesText = content?.servicesText || "We offer a variety of services tailored to your needs.";
  const logo = content?.logo;

  return (
    <div className="min-h-screen bg-[#f5f5f0] font-serif text-[#3a3a2e]">
      {/* Navigation */}
      <nav className="px-6 py-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tighter italic flex items-center gap-3">
          {logo && <img src={logo} alt="Logo" className="h-8 w-auto" />}
          {title}
        </div>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium">
          <a href="#" className="hover:text-olive-600 transition-colors">Menu</a>
          <a href="#" className="hover:text-olive-600 transition-colors">Our Story</a>
          <a href="#" className="hover:text-olive-600 transition-colors">Locations</a>
          <a href="#" className="hover:text-olive-600 transition-colors">Contact</a>
        </div>
        <button className="bg-[#5A5A40] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#4a4a35] transition-colors flex items-center gap-2">
          <ShoppingBag size={16} /> Order Online
        </button>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-12 md:py-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-light leading-tight mb-6">
            {headline}
          </h1>
          <p className="text-lg md:text-xl text-[#5a5a40] mb-8 leading-relaxed max-w-lg">
            {subheadline}
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#5A5A40] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#4a4a35] transition-colors">
              View Today's Specials
            </button>
            <button className="border border-[#5A5A40] text-[#5A5A40] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#5A5A40] hover:text-white transition-all">
              Our Process
            </button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="aspect-[3/4] rounded-[100px] overflow-hidden shadow-2xl">
            <img 
              src={heroImage} 
              alt="Fresh Bread" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-3xl shadow-xl hidden md:block max-w-xs">
            <div className="flex gap-1 text-yellow-500 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="italic text-sm text-[#5a5a40]">
              "The best sourdough I've ever had outside of Paris. A true local gem!"
            </p>
            <p className="mt-2 font-bold text-xs uppercase tracking-widest">— Sarah J., Local Foodie</p>
          </div>
        </motion.div>
      </section>

      {/* Info Bar */}
      <section className="bg-[#5A5A40] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <Clock size={24} className="mb-2 opacity-80" />
            <h3 className="font-bold uppercase tracking-widest text-xs">Open Daily</h3>
            <p className="text-sm opacity-90">7:00 AM — 4:00 PM</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MapPin size={24} className="mb-2 opacity-80" />
            <h3 className="font-bold uppercase tracking-widest text-xs">Visit Us</h3>
            <p className="text-sm opacity-90">{location}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Phone size={24} className="mb-2 opacity-80" />
            <h3 className="font-bold uppercase tracking-widest text-xs">Call Us</h3>
            <p className="text-sm opacity-90">(555) 123-4567</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 py-12 md:py-24 max-w-7xl mx-auto">
        <div className="bg-white p-12 md:p-24 rounded-[3rem] shadow-xl text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-8">Our Story</h2>
          <p className="text-xl text-[#5a5a40] leading-relaxed whitespace-pre-wrap">
            {aboutText}
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-12 md:py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-4">What We Offer</h2>
        </div>
        <div className="bg-[#5A5A40]/5 p-12 rounded-[3rem] text-center max-w-4xl mx-auto border border-[#5A5A40]/10">
          <p className="text-xl text-[#5a5a40] leading-relaxed whitespace-pre-wrap">
            {servicesText}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-[#d1d1c1] max-w-7xl mx-auto mt-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold italic">{title}</div>
          <div className="flex gap-6">
            <Instagram size={20} className="hover:text-olive-600 cursor-pointer" />
            <Facebook size={20} className="hover:text-olive-600 cursor-pointer" />
          </div>
          <p className="text-xs opacity-60">© 2026 {title}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
