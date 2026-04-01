import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Dog, Cat, Star, Phone, MapPin, Instagram, Facebook, ArrowRight, Scissors, Home, ShieldCheck } from 'lucide-react';

interface PetParadiseProps {
  content?: any;
}

export const PetParadise: React.FC<PetParadiseProps> = ({ content }) => {
  const headline = content?.heroHeadline || "Where Every Pet is Treated Like Family";
  const subheadline = content?.heroSubheadline || "Professional grooming, cozy boarding, and expert care for your furry best friends. We love them as much as you do.";
  const heroImage = content?.heroImage || content?.imageUrl || "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=1920";
  const title = content?.title || "PetParadise";
  const location = content?.location || "123 Paws Ave, Cityville";
  const aboutText = content?.aboutText || "We are a team of passionate pet lovers dedicated to providing the highest quality care for your furry family members. With years of experience and a genuine love for animals, we ensure every pet feels safe, comfortable, and loved during their stay.";
  const servicesText = content?.servicesText || "From luxurious spa treatments to fun-filled daycare sessions, we offer a wide range of services tailored to meet the unique needs of every pet.";
  const logo = content?.logo;

  return (
    <div className="min-h-screen bg-[#FF6321] font-serif text-black selection:bg-black selection:text-[#FF6321]">
      {/* Navigation */}
      <nav className="px-6 py-8 flex justify-between items-center max-w-7xl mx-auto border-b border-black/20">
        <div className="text-3xl font-black italic tracking-tighter flex items-center gap-2">
          {logo ? (
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          ) : (
            <Heart size={28} fill="currentColor" />
          )}
          {title}
        </div>
        <div className="hidden md:flex gap-10 text-sm font-bold uppercase tracking-widest">
          <a href="#" className="hover:opacity-60 transition-opacity">Grooming</a>
          <a href="#" className="hover:opacity-60 transition-opacity">Boarding</a>
          <a href="#" className="hover:opacity-60 transition-opacity">Daycare</a>
          <a href="#" className="hover:opacity-60 transition-opacity">Contact</a>
        </div>
        <button className="bg-black text-[#FF6321] px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
          Book Now
        </button>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-32 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-[#FF6321] rounded-full text-xs font-bold uppercase tracking-widest mb-8">
              <Star size={14} fill="currentColor" /> Voted #1 Pet Care in the City
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.85] mb-10">
              {headline}
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-12 leading-tight max-w-xl opacity-90">
              {subheadline}
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="bg-black text-white px-10 py-5 rounded-full text-lg font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl flex items-center gap-3 group">
                Meet Our Team <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <div className="flex items-center gap-4 px-8 py-5 border-2 border-black rounded-full">
                <div className="flex -space-x-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-white overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=petlover${i}`} alt="Pet Lover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest leading-none">
                  Trusted by<br />1,000+ Pet Parents
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden border-4 border-black shadow-[30px_30px_0px_rgba(0,0,0,0.1)]">
              <img 
                src={heroImage} 
                alt="Happy Pet" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-10 -right-10 bg-white p-8 rounded-full border-4 border-black shadow-2xl rotate-12 hidden md:block">
              <div className="flex flex-col items-center gap-1">
                <Star size={32} className="text-[#FF6321]" fill="currentColor" />
                <span className="text-2xl font-black italic tracking-tighter">4.9/5</span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Google Reviews</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-24 max-w-7xl mx-auto border-t border-black/20">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter mb-6">Our Services</h2>
          <p className="text-xl md:text-2xl font-medium max-w-3xl mx-auto opacity-90 whitespace-pre-wrap">
            {servicesText}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="group">
            <div className="bg-black text-[#FF6321] w-20 h-20 rounded-3xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-6 transition-transform">
              <Scissors size={40} />
            </div>
            <h3 className="text-3xl font-black italic tracking-tighter mb-4">Expert Grooming</h3>
            <p className="text-lg opacity-80 leading-snug font-medium italic">Full-service spa treatments including baths, haircuts, and nail trims for all breeds.</p>
          </div>
          <div className="group">
            <div className="bg-black text-[#FF6321] w-20 h-20 rounded-3xl flex items-center justify-center mb-8 -rotate-3 group-hover:-rotate-6 transition-transform">
              <Home size={40} />
            </div>
            <h3 className="text-3xl font-black italic tracking-tighter mb-4">Luxury Boarding</h3>
            <p className="text-lg opacity-80 leading-snug font-medium italic">Safe, comfortable, and supervised overnight stays in our climate-controlled suites.</p>
          </div>
          <div className="group">
            <div className="bg-black text-[#FF6321] w-20 h-20 rounded-3xl flex items-center justify-center mb-8 rotate-6 group-hover:rotate-12 transition-transform">
              <ShieldCheck size={40} />
            </div>
            <h3 className="text-3xl font-black italic tracking-tighter mb-4">Pet Daycare</h3>
            <p className="text-lg opacity-80 leading-snug font-medium italic">Socialization and play in a secure environment, perfect for busy pet owners.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 py-24 bg-black text-[#FF6321]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-10">Our Story</h2>
          <p className="text-2xl md:text-3xl font-medium leading-relaxed opacity-90 whitespace-pre-wrap">
            {aboutText}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 max-w-7xl mx-auto border-t border-black/20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-3xl font-black italic tracking-tighter flex items-center gap-2">
            {logo ? (
              <img src={logo} alt="Logo" className="h-8 w-auto grayscale" />
            ) : (
              <Heart size={28} fill="currentColor" />
            )}
            {title}
          </div>
          <div className="flex flex-col md:flex-row gap-12 text-center md:text-left">
            <div className="flex flex-col gap-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Contact</h4>
              <p className="text-lg font-bold italic">(555) 345-6789</p>
              <p className="text-lg font-bold italic">woof@petparadise.com</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Find Us</h4>
              <p className="text-lg font-bold italic whitespace-pre-wrap">{location}</p>
            </div>
          </div>
          <div className="flex gap-6">
            <Instagram size={24} className="hover:scale-110 transition-transform cursor-pointer" />
            <Facebook size={24} className="hover:scale-110 transition-transform cursor-pointer" />
          </div>
        </div>
        <div className="mt-24 pt-8 border-t border-black/10 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest opacity-60">
          <p>© {new Date().getFullYear()} {title}. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
