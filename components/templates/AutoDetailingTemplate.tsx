import React from 'react';
import { motion } from 'motion/react';
import { Car, Shield, Star, MapPin, Phone, Mail, Clock, ChevronRight, ArrowRight, Instagram, Facebook, Twitter, Zap, CheckCircle2, Droplets } from 'lucide-react';
import { PortfolioItem } from '../../types';

interface TemplateProps {
  item: PortfolioItem;
  isEditing?: boolean;
  onUpdate?: (updates: Partial<PortfolioItem>) => void;
  onImageClick?: (field: string) => void;
}

export const AutoDetailingTemplate: React.FC<TemplateProps> = ({ item, isEditing, onUpdate, onImageClick }) => {
  const {
    title = 'Easy Does It',
    heroHeadline = 'Premium Mobile Detailing Delivered to You.',
    heroSubheadline = 'Professional car care that comes to your doorstep. We bring the showroom shine to your driveway.',
    aboutText = 'Easy Does It is a premium mobile detailing service dedicated to providing the highest quality care for your vehicle. We use professional-grade products and techniques to ensure your car looks its absolute best.',
    services = [
      { title: 'Full Detail', description: 'Complete interior and exterior rejuvenation.', price: 'From $199' },
      { title: 'Interior Deep Clean', description: 'Steam cleaning, shampooing, and leather conditioning.', price: 'From $120' },
      { title: 'Ceramic Coating', description: 'Long-term protection and insane gloss for your paint.', price: 'From $499' }
    ],
    location = 'Serving Your Local Area',
    contactPhone = '(555) 000-0000',
    contactEmail = 'hello@easydoesit.com',
    hours = ['Mon-Sat: 8am - 6pm', 'Sun: Closed'],
    reviews = [
      { name: 'David K.', role: 'Tesla Owner', content: 'Incredible attention to detail. My car looks better than the day I bought it!', rating: 5 },
      { name: 'Jessica M.', role: 'SUV Owner', content: 'So convenient! They came to my office and did an amazing job while I worked.', rating: 5 }
    ]
  } = item;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      {/* Navigation */}
      <nav className="px-6 py-6 flex items-center justify-between border-b border-white/5 sticky top-0 bg-[#050505]/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#FF6B00] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#FF6B00]/20">
            <Car size={24} />
          </div>
          <div className="text-xl font-extrabold tracking-tighter uppercase italic">
            {title.split(' ').map((word, i) => (
              <span key={i} className={i === 0 ? "text-white" : "text-[#FF6B00]"}>{word} </span>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-white/60">
          <a href="#services" className="hover:text-[#FF6B00] transition-colors">Services</a>
          <a href="#about" className="hover:text-[#FF6B00] transition-colors">About</a>
          <a href="#contact" className="hover:text-[#FF6B00] transition-colors">Contact</a>
        </div>
        <button className="px-6 py-3 bg-[#4DE1FF] text-black rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#4DE1FF]/20">
          Book Now
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 md:py-40 px-6 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#FF6B00]/20 rounded-full blur-[120px] animate-blob pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-[#4DE1FF]/20 rounded-full blur-[120px] animate-blob [animation-delay:2s] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] animate-blob [animation-delay:4s] pointer-events-none" />

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#4DE1FF] text-xs font-bold uppercase tracking-[0.2em] mb-8 animate-pulse-slow">
              <Zap size={14} className="fill-[#4DE1FF]" /> #1 Mobile Detailing Service
            </div>
            <h1 className="text-6xl md:text-9xl font-black leading-[0.85] tracking-tighter mb-8 uppercase italic">
              {heroHeadline.split(' ').map((word, i) => (
                <span key={i} className={word.toLowerCase() === 'premium' || word.toLowerCase() === 'shine' || word.toLowerCase() === 'detailing' ? "text-[#FF6B00] drop-shadow-[0_0_30px_rgba(255,107,0,0.3)]" : ""}>{word} </span>
              ))}
            </h1>
            <p className="text-xl text-white/70 mb-12 max-w-lg leading-relaxed font-medium">
              {heroSubheadline}
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="group relative px-10 py-5 bg-[#FF6B00] text-white rounded-full font-black text-lg hover:scale-105 transition-all shadow-xl shadow-[#FF6B00]/30 uppercase italic overflow-hidden">
                <span className="relative z-10">View Packages</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              </button>
              <button className="px-10 py-5 border border-white/20 text-white rounded-full font-black text-lg hover:bg-white/10 transition-all uppercase italic backdrop-blur-sm">
                Our Work
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[16/10] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 bg-[#121212] relative group">
              <img 
                src={item.imageUrl || "https://images.unsplash.com/photo-1601362840469-51e4d8d59085?auto=format&fit=crop&w=1200&q=80"} 
                alt="Premium Detailing" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 border-[1px] border-white/10 rounded-[3rem] pointer-events-none" />
            </div>
            
            {/* Floating Stat Card */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 bg-[#121212]/90 p-8 rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-2xl"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-[#4DE1FF] rounded-2xl flex items-center justify-center text-black shadow-lg shadow-[#4DE1FF]/30">
                  <Star size={28} fill="currentColor" />
                </div>
                <div>
                  <div className="text-3xl font-black italic uppercase tracking-tighter text-white">500+</div>
                  <div className="text-[10px] font-bold text-[#4DE1FF] uppercase tracking-[0.2em]">Happy Clients</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 bg-[#080808]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <div className="text-[#FF6B00] text-xs font-bold uppercase tracking-[0.3em] mb-4">Our Expertise</div>
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic">Detailing Packages</h2>
            </div>
            <p className="text-white/40 max-w-sm font-medium">
              We offer comprehensive detailing solutions tailored to your vehicle's specific needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[2.5rem] bg-[#121212] border border-white/5 hover:border-[#FF6B00]/50 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B00]/5 blur-[60px] group-hover:bg-[#FF6B00]/10 transition-colors" />
                
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#FF6B00] mb-8 group-hover:scale-110 transition-transform border border-white/10">
                  {i === 0 ? <Droplets size={28} /> : i === 1 ? <Zap size={28} /> : <Shield size={28} />}
                </div>
                
                <h3 className="text-2xl font-black mb-4 uppercase italic tracking-tight">{service.title}</h3>
                <p className="text-white/60 mb-8 leading-relaxed font-medium">{service.description}</p>
                
                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                  <div className="text-3xl font-black text-[#4DE1FF] italic">{service.price}</div>
                  <button className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-[#FF6B00] group-hover:text-white transition-all">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Why Us */}
      <section className="py-32 px-6">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden border border-white/10 bg-[#121212]">
              <img src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80" alt="Detailing Process" className="w-full h-full object-cover opacity-60" />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#4DE1FF]/20 rounded-full blur-[80px] pointer-events-none" />
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 uppercase italic leading-none">
                Why Choose <span className="text-[#FF6B00]">Easy Does It</span>?
              </h2>
              <p className="text-xl text-white/60 leading-relaxed font-medium">
                {aboutText}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: 'Mobile Service', desc: 'We come to your home or office.' },
                { title: 'Premium Products', desc: 'Only the best for your vehicle.' },
                { title: 'Expert Team', desc: 'Highly trained professionals.' },
                { title: 'Eco-Friendly', desc: 'Water-saving techniques used.' }
              ].map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00]">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <div className="font-black uppercase italic text-sm mb-1">{feature.title}</div>
                    <div className="text-white/40 text-xs font-medium">{feature.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="bg-[#0F0F0F] border-t border-white/5 py-24 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-[#FF6B00]/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-[#FF6B00] rounded-xl flex items-center justify-center text-white">
                  <Car size={24} />
                </div>
                <div className="text-2xl font-black tracking-tighter uppercase italic">{title}</div>
              </div>
              <p className="text-white/40 text-lg max-w-sm leading-relaxed mb-10 font-medium">
                Elevating the standard of mobile car care. Experience the ultimate shine without leaving your home.
              </p>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 hover:text-[#FF6B00] hover:bg-white/10 cursor-pointer transition-all">
                  <Instagram size={20} />
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 hover:text-[#FF6B00] hover:bg-white/10 cursor-pointer transition-all">
                  <Facebook size={20} />
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 hover:text-[#FF6B00] hover:bg-white/10 cursor-pointer transition-all">
                  <Twitter size={20} />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/20 mb-10">Contact Info</h4>
              <div className="space-y-6">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#4DE1FF] group-hover:bg-[#4DE1FF] group-hover:text-black transition-all">
                    <Phone size={18} />
                  </div>
                  <span className="font-bold text-white/80">{contactPhone}</span>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#4DE1FF] group-hover:bg-[#4DE1FF] group-hover:text-black transition-all">
                    <Mail size={18} />
                  </div>
                  <span className="font-bold text-white/80">{contactEmail}</span>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#4DE1FF] group-hover:bg-[#4DE1FF] group-hover:text-black transition-all">
                    <MapPin size={18} />
                  </div>
                  <span className="font-bold text-white/80">{location}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/20 mb-10">Working Hours</h4>
              <div className="space-y-4">
                {hours.map((h, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Clock size={16} className="text-white/20" />
                    <span className="text-sm font-bold text-white/60">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
            <div>© 2026 {title}. Premium Mobile Detailing.</div>
            <div className="flex gap-10">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
