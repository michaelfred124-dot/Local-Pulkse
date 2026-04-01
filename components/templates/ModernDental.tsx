import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Phone, MapPin, CheckCircle2, Shield, User, Star, ArrowRight } from 'lucide-react';

interface ModernDentalProps {
  content?: any;
}

export const ModernDental: React.FC<ModernDentalProps> = ({ content }) => {
  const headline = content?.heroHeadline || "Advanced Care for Your Brightest Smile";
  const subheadline = content?.heroSubheadline || "Experience modern dentistry in a comfortable, state-of-the-art environment. Our team is dedicated to your oral health and well-being.";
  const heroImage = content?.heroImage || content?.imageUrl || "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1920";
  const title = content?.title || "ModernDental";
  const location = content?.location || "123 Health Ave, Suite 400";
  const aboutText = content?.aboutText || "Our team is dedicated to providing you with the personalized, gentle care that you deserve. Part of our commitment to serving our patients includes providing information that helps them to make more informed decisions about their oral health needs.";
  const servicesText = content?.servicesText || "We offer a comprehensive range of dental services to help you achieve and maintain a healthy, beautiful smile.";
  const logo = content?.logo;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            {logo ? (
              <img src={logo} alt="Logo" className="h-8 w-auto" />
            ) : (
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="text-white" size={20} />
              </div>
            )}
            <span className="text-xl font-bold tracking-tight text-slate-800">{title}</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Services</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Our Team</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Patient Info</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2">
            <Calendar size={16} /> Book Appointment
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <CheckCircle2 size={14} /> Now Accepting New Patients
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              {headline}
            </h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
              {subheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-slate-900 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-800 transition-all shadow-xl flex items-center gap-2 group">
                Schedule Online <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
                <Phone size={20} /> (555) 987-6543
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-6 border-t border-slate-100 pt-8">
              <div className="flex -space-x-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Patient" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-1 text-yellow-400 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-sm font-bold text-slate-900">500+ Happy Patients</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl relative z-10">
              <img 
                src={heroImage} 
                alt="Modern Dental Office" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-60 -z-10"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-slate-200 rounded-full blur-3xl opacity-60 -z-10"></div>
            
            {/* Floating Stats Card */}
            <div className="absolute bottom-12 -right-6 bg-white p-6 rounded-2xl shadow-2xl z-20 border border-slate-100 hidden md:block">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <User className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Our Specialist</p>
                  <p className="text-lg font-bold text-slate-900">Dr. Emily Chen</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">Expert in cosmetic dentistry with 15+ years of experience.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-slate-50 py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Comprehensive Care</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto whitespace-pre-wrap">
              {servicesText}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {['Preventative Care', 'Cosmetic Dentistry', 'Restorative Procedures'].map((service, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <User size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service}</h3>
                <p className="text-slate-600 mb-6">
                  Regular checkups, cleanings, and proactive treatments to keep your smile healthy and bright.
                </p>
                <a href="#" className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  Learn More <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-white p-12 md:p-16 rounded-[2rem] shadow-xl border border-slate-100 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">About Our Practice</h2>
          <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-wrap">
            {aboutText}
          </p>
        </div>
      </section>

      {/* Quick Info */}
      <section className="bg-white py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex items-start gap-4">
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
              <MapPin size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Our Location</h4>
              <p className="text-sm text-slate-600 whitespace-pre-wrap">{location}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
              <Calendar size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Working Hours</h4>
              <p className="text-sm text-slate-600">Mon - Fri: 8:00 AM - 6:00 PM<br />Sat: 9:00 AM - 1:00 PM</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
              <Phone size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Emergency Line</h4>
              <p className="text-sm text-slate-600">Available 24/7 for urgent care<br />(555) 000-1111</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-slate-100 pt-12">
          <div className="flex items-center gap-2">
            {logo ? (
              <img src={logo} alt="Logo" className="h-6 w-auto grayscale opacity-70" />
            ) : (
              <Shield className="text-blue-600" size={24} />
            )}
            <span className="text-xl font-bold tracking-tight text-slate-800">{title}</span>
          </div>
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} {title}. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-bold text-slate-600">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
