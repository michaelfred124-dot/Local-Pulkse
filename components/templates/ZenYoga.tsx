import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, Layout, Shield, Zap, Star, Globe } from 'lucide-react';
import { PortfolioItem } from '../../types';

export const ZenYoga: React.FC<{ item: PortfolioItem }> = ({ item }) => {
  return (
    <div className="font-serif min-h-[800px] overflow-hidden relative bg-[#f5f5f0] text-[#5A5A40]">
      {/* Navbar */}
      <div className="px-6 md:px-12 py-8 flex justify-between items-center sticky top-0 z-50 bg-[#f5f5f0]/80 backdrop-blur-xl border-b border-[#5A5A40]/10">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight flex items-center gap-3 text-[#5A5A40]">
          {item.logo ? (
            <img src={item.logo} alt="Logo" className="h-10 w-auto" />
          ) : (
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#f5f5f0] shadow-lg bg-[#5A5A40] shrink-0">
              <span className="text-sm font-bold">{item.title.charAt(0)}</span>
            </div>
          )}
          <span className="truncate max-w-[150px] sm:max-w-none">{item.title}</span>
        </h3>
        <div className="hidden md:flex gap-12 text-[11px] font-bold uppercase tracking-[0.2em] text-[#5A5A40]/70">
          <span className="hover:text-[#5A5A40] cursor-pointer transition-colors">Classes</span>
          <span className="hover:text-[#5A5A40] cursor-pointer transition-colors">Instructors</span>
          <span className="hover:text-[#5A5A40] cursor-pointer transition-colors">Retreats</span>
          <span className="hover:text-[#5A5A40] cursor-pointer transition-colors">Membership</span>
        </div>
        <div className="px-8 py-3 text-[10px] font-bold rounded-full uppercase tracking-[0.2em] cursor-pointer transition-all bg-[#5A5A40] text-[#f5f5f0] hover:bg-[#4A4A30] shadow-xl shadow-[#5A5A40]/20">
          Book a Class
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[600px] md:h-[800px] w-full group overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={item.imageUrl} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" alt="Hero" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#5A5A40]/40 via-transparent to-[#f5f5f0]"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block px-6 py-2 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.3em] rounded-full mb-8 border bg-[#f5f5f0]/20 border-[#f5f5f0]/30 text-[#f5f5f0]">
              {item.location ? `${item.location} • ` : ''}{item.category} • Find Your Center
            </span>
            <h1 className="text-6xl md:text-[100px] font-bold mb-8 leading-[0.9] tracking-tighter text-[#f5f5f0] drop-shadow-lg">
              {item.heroHeadline || "Breathe. Move. Transform."}
            </h1>
            <p className="text-xl md:text-2xl mb-12 font-light leading-relaxed text-[#f5f5f0]/90 max-w-2xl mx-auto drop-shadow-md">
              {item.heroSubheadline || "A sanctuary for mindful movement and holistic wellness in the heart of the city."}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="px-10 py-5 font-bold rounded-full hover:scale-105 transition-all shadow-2xl text-[11px] uppercase tracking-[0.2em] bg-[#f5f5f0] text-[#5A5A40]">
                View Schedule
              </button>
              <button className="px-10 py-5 bg-transparent border font-bold rounded-full hover:bg-[#f5f5f0]/10 transition-all text-[11px] uppercase tracking-[0.2em] border-[#f5f5f0]/50 text-[#f5f5f0]">
                New Student Offer
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="py-24 max-w-7xl mx-auto px-6 md:px-16">
        
        {/* About Section */}
        {item.aboutText && (
          <div className="mb-32 text-center max-w-4xl mx-auto">
            <span className="text-[#8A8A60] font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-light leading-relaxed text-[#5A5A40]">
              {item.aboutText}
            </h2>
          </div>
        )}

        {/* Services / Classes */}
        <div className="mb-32">
          <div className="text-center mb-20">
            <span className="text-[#8A8A60] font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Our Offerings</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#5A5A40]">
              Mindful Practices
            </h2>
          </div>
          {item.servicesText ? (
            <div className="bg-white p-12 rounded-[3rem] border border-[#5A5A40]/5 shadow-sm text-center max-w-4xl mx-auto">
              <p className="text-xl leading-relaxed text-[#5A5A40]/70 whitespace-pre-wrap">{item.servicesText}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {item.services?.map((service, i) => (
                <div key={i} className="bg-white p-10 rounded-[2rem] border border-[#5A5A40]/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group text-center">
                  <h3 className="text-2xl font-bold text-[#5A5A40] mb-4">{service.title}</h3>
                  <p className="text-[#5A5A40]/70 text-lg leading-relaxed mb-8">{service.description}</p>
                  <div className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-[#f5f5f0] text-[#5A5A40] font-bold text-[10px] uppercase tracking-widest group-hover:bg-[#5A5A40] group-hover:text-white transition-colors">
                    {service.price}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Features / Capabilities */}
        <div className="mb-32 bg-white rounded-[3rem] p-12 md:p-24 shadow-xl border border-[#5A5A40]/5">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[#8A8A60] font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Studio Management</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter leading-none text-[#5A5A40]">
              Seamless Operations.
            </h2>
            <p className="text-xl leading-relaxed text-[#5A5A40]/70">
              Our custom platform automates your studio so you can focus on teaching.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {item.features?.map((feature, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 bg-[#f5f5f0] text-[#5A5A40] group-hover:bg-[#5A5A40] group-hover:text-white transition-colors duration-500">
                  <feature.icon size={32} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-[#5A5A40]">{feature.title}</h3>
                <p className="leading-relaxed text-[#5A5A40]/70">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Split Section: Reviews & Info */}
        <div className="grid md:grid-cols-2 gap-16 mb-32">
          {/* Reviews */}
          <div>
            <h2 className="text-3xl font-bold mb-12 text-[#5A5A40]">Community Voices</h2>
            <div className="space-y-8">
              {item.reviews?.map((review, i) => (
                <div key={i} className="p-8 rounded-[2rem] bg-white border border-[#5A5A40]/5 shadow-sm">
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} size={16} fill="#8A8A60" className="text-[#8A8A60]" />
                    ))}
                  </div>
                  <p className="text-xl leading-relaxed mb-8 text-[#5A5A40]/80 italic">"{review.content}"</p>
                  <div>
                    <h5 className="font-bold text-sm uppercase tracking-widest text-[#5A5A40]">{review.name}</h5>
                    <p className="text-[10px] font-bold uppercase tracking-widest mt-1 text-[#8A8A60]">{review.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info & FAQs */}
          <div className="space-y-16">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-[#5A5A40]">Studio Hours</h2>
              <div className="bg-white rounded-[2rem] p-8 border border-[#5A5A40]/5 shadow-sm space-y-4">
                {item.hours?.map((hour, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-[#5A5A40]/10 last:border-0">
                    <span className="text-[#5A5A40]/70 font-medium">{hour.split(':')[0]}</span>
                    <span className="text-[#5A5A40] font-bold">{hour.split(':').slice(1).join(':').trim()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8 text-[#5A5A40]">Common Questions</h2>
              <div className="space-y-4">
                {item.faqs?.map((faq, i) => (
                  <div key={i} className="bg-white rounded-[2rem] p-8 border border-[#5A5A40]/5 shadow-sm">
                    <h4 className="font-bold mb-3 text-[#5A5A40]">{faq.question}</h4>
                    <p className="text-sm leading-relaxed text-[#5A5A40]/70">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-24 px-6 md:px-16 bg-[#5A5A40] text-[#f5f5f0]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 border-b border-[#f5f5f0]/10 pb-16 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-bold mb-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-[#f5f5f0] text-[#5A5A40]">
                <span className="text-sm font-bold">{item.title.charAt(0)}</span>
              </div>
              {item.title}
            </h2>
            <p className="max-w-md mb-12 text-xl leading-relaxed text-[#f5f5f0]/70">
              Cultivating peace, strength, and community through mindful movement.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-[0.2em] text-[10px] text-[#8A8A60]">Practice</h4>
            <ul className="space-y-6 text-sm font-medium tracking-wide text-[#f5f5f0]/60">
              <li className="hover:text-white cursor-pointer transition-colors">Class Schedule</li>
              <li className="hover:text-white cursor-pointer transition-colors">Workshops</li>
              <li className="hover:text-white cursor-pointer transition-colors">Teacher Training</li>
              <li className="hover:text-white cursor-pointer transition-colors">On-Demand</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-[0.2em] text-[10px] text-[#8A8A60]">Studio</h4>
            <ul className="space-y-6 text-sm font-medium tracking-wide text-[#f5f5f0]/60">
              <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Instructors</li>
              <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-[#f5f5f0]/40 font-bold uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} {item.title}. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </div>
  );
};
