import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Star, ChevronRight, ArrowRight, Instagram, Facebook, Twitter, Zap } from 'lucide-react';
import { PortfolioItem } from '../../types';

interface TemplateProps {
  item: PortfolioItem;
  isEditing?: boolean;
  onUpdate?: (updates: Partial<PortfolioItem>) => void;
  onImageClick?: (field: string) => void;
}

export const LocalBusinessTemplate1: React.FC<TemplateProps> = ({ item, isEditing, onUpdate, onImageClick }) => {
  const {
    title = 'Local Business',
    heroHeadline = 'Crafting Excellence in Your Neighborhood.',
    heroSubheadline = 'Dedicated to providing the finest services with a personal touch.',
    aboutText = 'We are a locally owned and operated business committed to quality and community.',
    services = [
      { title: 'Premium Service', description: 'Our flagship offering tailored to your needs.', price: '$99' },
      { title: 'Standard Care', description: 'Reliable and efficient service for every day.', price: '$49' },
      { title: 'Custom Solutions', description: 'Bespoke options for unique requirements.', price: 'Custom' }
    ],
    location = '123 Main St, Your City, ST 12345',
    contactPhone = '(555) 123-4567',
    contactEmail = 'hello@localbusiness.com',
    hours = ['Mon-Fri: 9am - 6pm', 'Sat: 10am - 4pm', 'Sun: Closed'],
    reviews = [
      { name: 'Sarah J.', role: 'Local Guide', content: 'The best service I have ever received. Highly recommend!', rating: 5 },
      { name: 'Michael R.', role: 'Business Owner', content: 'Professional, timely, and excellent quality.', rating: 5 }
    ]
  } = item;

  return (
    <div className="min-h-screen bg-[#fdfcfb] text-[#2d2d2d] font-serif">
      {/* Navigation */}
      <nav className="px-6 py-8 flex items-center justify-between border-b border-[#e8e4e1]">
        <div className="text-2xl font-bold tracking-tighter italic">{title}</div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-[#6d6d6d]">
          <a href="#services" className="hover:text-[#2d2d2d] transition-colors">Services</a>
          <a href="#about" className="hover:text-[#2d2d2d] transition-colors">About</a>
          <a href="#contact" className="hover:text-[#2d2d2d] transition-colors">Contact</a>
        </div>
        <button className="px-6 py-3 bg-[#2d2d2d] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#4d4d4d] transition-all">
          Book Now
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 md:py-40 px-6 overflow-hidden">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8 italic">
              {heroHeadline}
            </h1>
            <p className="text-xl text-[#6d6d6d] mb-12 max-w-lg leading-relaxed">
              {heroSubheadline}
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="px-10 py-5 bg-[#2d2d2d] text-white rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl">
                Get Started
              </button>
              <button className="px-10 py-5 border border-[#2d2d2d] text-[#2d2d2d] rounded-full font-bold text-lg hover:bg-[#2d2d2d] hover:text-white transition-all">
                Our Story
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white">
              <img 
                src={item.imageUrl || "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80"} 
                alt="Local Business" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2rem] shadow-2xl border border-[#e8e4e1] hidden md:block">
              <div className="flex items-center gap-4 mb-2">
                <div className="flex text-yellow-500">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} fill="currentColor" />)}
                </div>
                <span className="font-bold text-sm">5.0 Rating</span>
              </div>
              <div className="text-xs text-[#6d6d6d] font-medium uppercase tracking-widest">Trusted by Locals</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-white px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 italic">Our Services</h2>
            <div className="w-24 h-1 bg-[#2d2d2d] mx-auto mb-8" />
            <p className="text-lg text-[#6d6d6d] leading-relaxed">
              We offer a range of specialized services designed to meet the unique needs of our community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[2.5rem] bg-[#fdfcfb] border border-[#e8e4e1] hover:shadow-2xl transition-all group"
              >
                <div className="w-12 h-12 bg-[#2d2d2d] rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
                  <Zap size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{service.title}</h3>
                <p className="text-[#6d6d6d] mb-8 leading-relaxed">{service.description}</p>
                <div className="flex items-center justify-between pt-6 border-t border-[#e8e4e1]">
                  <span className="text-xl font-bold">{service.price}</span>
                  <button className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                    Book <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-[#fdfcfb]">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-6">
              <div className="aspect-square rounded-[2rem] overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=600&q=80" alt="Team" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-[2rem] overflow-hidden shadow-xl mt-12">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80" alt="Office" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 italic">Rooted in the Community.</h2>
            <p className="text-xl text-[#6d6d6d] leading-relaxed mb-10">
              {aboutText}
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-[#f5f2ed] flex items-center justify-center text-[#2d2d2d]">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#6d6d6d]">Visit Us</div>
                  <div className="font-bold">{location}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-[#f5f2ed] flex items-center justify-center text-[#2d2d2d]">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#6d6d6d]">Hours</div>
                  <div className="font-bold">{hours[0]}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-white px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {reviews.map((review, i) => (
              <div key={i} className="p-12 rounded-[3rem] bg-[#fdfcfb] border border-[#e8e4e1] relative">
                <div className="flex text-yellow-500 mb-8">
                  {[...Array(review.rating)].map((_, s) => <Star key={s} size={20} fill="currentColor" />)}
                </div>
                <p className="text-2xl font-medium italic leading-relaxed mb-10 text-[#2d2d2d]">
                  "{review.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#e8e4e1]" />
                  <div>
                    <div className="font-bold">{review.name}</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-[#6d6d6d]">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="bg-[#2d2d2d] text-white py-24 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <div className="text-3xl font-bold tracking-tighter italic mb-8">{title}</div>
              <p className="text-white/60 text-lg max-w-sm leading-relaxed mb-8">
                Bringing quality service and professional expertise to our neighborhood every single day.
              </p>
              <div className="flex gap-6">
                <Instagram className="text-white/40 hover:text-white cursor-pointer transition-colors" />
                <Facebook className="text-white/40 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="text-white/40 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-8">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-white/40" />
                  <span className="font-bold">{contactPhone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-white/40" />
                  <span className="font-bold">{contactEmail}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-white/40" />
                  <span className="font-bold">{location}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-8">Hours</h4>
              <div className="space-y-2">
                {hours.map((h, i) => (
                  <div key={i} className="text-sm font-medium text-white/60">{h}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-xs font-bold uppercase tracking-widest text-white/40">
            <div>© 2026 {title}. All rights reserved.</div>
            <div className="flex gap-8">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
