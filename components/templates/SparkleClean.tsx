import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Shield, Clock, Phone, MapPin, ArrowRight, Zap, Award, Users } from 'lucide-react';

interface SparkleCleanProps {
  content?: any;
}

export const SparkleClean: React.FC<SparkleCleanProps> = ({ content }) => {
  const headline = content?.heroHeadline || "Premium Cleaning Services for Home & Office";
  const subheadline = content?.heroSubheadline || "Reliable, professional, and thorough cleaning tailored to your schedule. We bring the sparkle back to your space.";
  const heroImage = content?.heroImage || content?.imageUrl || "https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=1920";
  const logo = content?.logo;
  const companyName = content?.title || "SparkleClean";
  const location = content?.location || "Local Area";
  const aboutText = content?.aboutText || "We are a team of dedicated professionals committed to providing the highest quality cleaning services. With years of experience and a keen eye for detail, we ensure every space we touch is left spotless and refreshed.";
  const servicesText = content?.servicesText || "We offer a wide range of cleaning services to suit your needs, from regular residential cleaning to comprehensive commercial janitorial services.";

  return (
    <div className="min-h-screen bg-[#E4E3E0] font-sans text-[#141414]">
      {/* Navigation */}
      <nav className="border-b border-[#141414] px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2">
          {logo ? <img src={logo} alt="Logo" className="h-8 object-contain" /> : <Zap size={24} fill="currentColor" />}
          {companyName}
        </div>
        <div className="hidden md:flex gap-12 text-[11px] font-bold uppercase tracking-widest">
          <a href="#" className="hover:opacity-60 transition-opacity">Services</a>
          <a href="#" className="hover:opacity-60 transition-opacity">Pricing</a>
          <a href="#" className="hover:opacity-60 transition-opacity">About</a>
          <a href="#" className="hover:opacity-60 transition-opacity">Contact</a>
        </div>
        <button className="bg-[#141414] text-[#E4E3E0] px-6 py-2 text-[11px] font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all flex items-center gap-2">
          Get a Quote <ArrowRight size={14} />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-32 max-w-7xl mx-auto border-b border-[#141414]">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] mb-8 opacity-60 flex items-center gap-2">
              <div className="w-8 h-[1px] bg-[#141414]"></div> {location} Professional Services
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-12">
              {headline}
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-12 leading-tight max-w-2xl">
              {subheadline}
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="bg-[#141414] text-[#E4E3E0] px-10 py-5 text-sm font-bold uppercase tracking-widest hover:invert transition-all flex items-center gap-3">
                Book Your Clean <Zap size={18} fill="currentColor" />
              </button>
              <div className="flex items-center gap-4 px-6 py-5 border border-[#141414]">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border border-[#141414] bg-[#E4E3E0] overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=cleaner${i}`} alt="Cleaner" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest leading-none">
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                  </div>
                  4.9/5 Rating
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] border border-[#141414] p-4 bg-white shadow-[20px_20px_0px_#141414]">
              <img 
                src={heroImage} 
                alt="Clean Space" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Data Grid Section */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="mb-24">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">About Us</h2>
          <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-4xl whitespace-pre-wrap">
            {aboutText}
          </p>
        </div>

        <div className="mb-24">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">Our Services</h2>
          <div className="p-12 border border-[#141414] bg-white shadow-[20px_20px_0px_#141414]">
            <p className="text-xl font-medium leading-relaxed whitespace-pre-wrap">
              {servicesText}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#141414] border border-[#141414]">
          <div className="bg-[#E4E3E0] p-10 flex flex-col gap-6">
            <div className="p-4 border border-[#141414] w-fit rounded-full">
              <Shield size={24} />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest">Fully Insured</h3>
            <p className="text-xs leading-relaxed opacity-70 italic font-serif">Your peace of mind is our priority. We are fully licensed and insured for all services.</p>
          </div>
          <div className="bg-[#E4E3E0] p-10 flex flex-col gap-6">
            <div className="p-4 border border-[#141414] w-fit rounded-full">
              <Clock size={24} />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest">Flexible Timing</h3>
            <p className="text-xs leading-relaxed opacity-70 italic font-serif">We work around your schedule, offering morning, afternoon, and weekend slots.</p>
          </div>
          <div className="bg-[#E4E3E0] p-10 flex flex-col gap-6">
            <div className="p-4 border border-[#141414] w-fit rounded-full">
              <Award size={24} />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest">Eco-Friendly</h3>
            <p className="text-xs leading-relaxed opacity-70 italic font-serif">We use non-toxic, sustainable cleaning products that are safe for pets and kids.</p>
          </div>
          <div className="bg-[#E4E3E0] p-10 flex flex-col gap-6">
            <div className="p-4 border border-[#141414] w-fit rounded-full">
              <Users size={24} />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest">Vetted Staff</h3>
            <p className="text-xs leading-relaxed opacity-70 italic font-serif">Every cleaner undergoes a rigorous background check and professional training.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 max-w-7xl mx-auto border-t border-[#141414]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <div className="text-2xl font-black uppercase tracking-tighter mb-4 flex items-center gap-2">
              {logo ? <img src={logo} alt="Logo" className="h-8 object-contain grayscale" /> : null}
              {companyName}
            </div>
            <p className="text-xs opacity-60 max-w-xs leading-relaxed">Redefining professional cleaning standards with precision and care since 2018.</p>
          </div>
          <div className="grid grid-cols-2 gap-16">
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40">Contact</h4>
              <p className="text-xs font-bold">(555) 789-0123</p>
              <p className="text-xs font-bold">hello@sparkleclean.com</p>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40">Office</h4>
              <p className="text-xs font-bold whitespace-pre-wrap">{location}</p>
            </div>
          </div>
        </div>
        <div className="mt-24 pt-8 border-t border-[#141414] flex justify-between items-center text-[10px] font-bold uppercase tracking-widest opacity-40">
          <p>© {new Date().getFullYear()} {companyName}.</p>
          <div className="flex gap-8">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
