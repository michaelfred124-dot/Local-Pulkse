import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Shield, Layout, Clock, Zap, Star, Globe } from 'lucide-react';
import { PortfolioItem } from '../../types';

export const LegalLink: React.FC<{ item: PortfolioItem }> = ({ item }) => {
  return (
    <div className="font-sans min-h-[800px] overflow-hidden relative bg-[#f5f5f5] text-[#0a0a0a]">
      {/* Navbar */}
      <div className="px-6 md:px-12 py-6 flex justify-between items-center sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <h3 className="text-xl font-bold tracking-tight flex items-center gap-3">
          {item.logo ? (
            <img src={item.logo} alt="Logo" className="h-8 object-contain" />
          ) : (
            <div className="w-8 h-8 rounded-md flex items-center justify-center text-white shadow-sm bg-black shrink-0">
              <span className="text-xs font-bold">{item.title.charAt(0)}</span>
            </div>
          )}
          <span className="truncate max-w-[150px] sm:max-w-none">{item.title}</span>
        </h3>
        <div className="hidden md:flex gap-8 text-xs font-medium text-slate-500">
          <span className="hover:text-black cursor-pointer transition-colors">Practice Areas</span>
          <span className="hover:text-black cursor-pointer transition-colors">Attorneys</span>
          <span className="hover:text-black cursor-pointer transition-colors">Insights</span>
          <span className="hover:text-black cursor-pointer transition-colors">Contact</span>
        </div>
        <div className="px-6 py-2.5 text-xs font-semibold rounded-md cursor-pointer transition-all bg-black text-white hover:bg-slate-800 shadow-sm">
          Client Portal
        </div>
      </div>

      {/* Hero Section - Split Layout */}
      <div className="grid md:grid-cols-2 min-h-[700px] bg-white border-b border-black/5">
        <div className="p-12 md:p-24 flex flex-col justify-center relative">
          <div className="absolute top-12 left-12 w-12 h-12 border-t-2 border-l-2 border-black/10"></div>
          <div className="absolute bottom-12 right-12 w-12 h-12 border-b-2 border-r-2 border-black/10"></div>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-sm mb-8">
              {item.location ? `${item.location} • ` : ''}{item.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
              {item.heroHeadline || "Modern Law. Clear Results."}
            </h1>
            <p className="text-lg md:text-xl mb-12 text-slate-500 max-w-md leading-relaxed whitespace-pre-wrap">
              {item.heroSubheadline || "We combine decades of legal expertise with cutting-edge technology to deliver unparalleled service and transparency."}
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 font-semibold rounded-md hover:bg-slate-800 transition-all shadow-sm text-sm bg-black text-white">
                Request Consultation
              </button>
              <button className="px-8 py-4 bg-transparent border border-slate-200 font-semibold rounded-md hover:bg-slate-50 transition-all text-sm text-black">
                Our Practice Areas
              </button>
            </div>
          </motion.div>
        </div>
        <div className="relative bg-slate-100 overflow-hidden hidden md:block">
          <img src={item.imageUrl} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80" alt="Hero" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
          
          {/* Floating Feature Bubbles */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute top-1/4 right-1/4 bg-white p-6 rounded-2xl shadow-xl border border-black/5 transform rotate-[-6deg]"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-sm font-bold">Secure Vault</p>
                <p className="text-xs text-slate-500">End-to-end encryption</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="absolute bottom-1/3 left-1/4 bg-white p-6 rounded-2xl shadow-xl border border-black/5 transform rotate-[4deg]"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-sm font-bold">Smart Intake</p>
                <p className="text-xs text-slate-500">Automated screening</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="py-24 max-w-7xl mx-auto px-6 md:px-16">
        
        {/* Services Grid */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-16">
            <div className="max-w-2xl">
              <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-4 block">Practice Areas</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black">
                Specialized Legal Services
              </h2>
            </div>
            <p className="max-w-md text-slate-500 leading-relaxed whitespace-pre-wrap">
              {item.servicesText || "Comprehensive legal solutions tailored to protect your business and personal interests."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {item.services?.map((service, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-6 text-black group-hover:bg-black group-hover:text-white transition-colors">
                  <Layout size={20} />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{service.description}</p>
                <div className="flex justify-between items-center border-t border-slate-100 pt-6 mt-auto">
                  <span className="text-sm font-semibold text-black">{service.price}</span>
                  <ArrowUpRight size={16} className="text-slate-400 group-hover:text-black transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features / Capabilities */}
        <div className="mb-32">
          <div className="bg-black text-white rounded-[2rem] p-12 md:p-24 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10">
              <div className="max-w-3xl mb-16">
                <span className="text-white/40 font-bold uppercase tracking-widest text-[10px] mb-4 block">Technology</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                  The Digital Advantage.
                </h2>
                <p className="text-lg leading-relaxed text-white/70 whitespace-pre-wrap">
                  {item.aboutText || "We leverage proprietary technology to streamline your case, reduce costs, and provide total transparency."}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
                {item.features?.map((feature, i) => (
                  <div key={i} className="group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-white/50 group-hover:text-white transition-colors">
                        <feature.icon size={24} />
                      </div>
                      <h3 className="font-bold text-lg">{feature.title}</h3>
                    </div>
                    <p className="leading-relaxed text-sm text-white/60">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Split Section: Reviews & Info */}
        <div className="grid md:grid-cols-2 gap-16 mb-32">
          {/* Reviews */}
          <div>
            <h2 className="text-3xl font-bold mb-12 text-black tracking-tight">Client Success</h2>
            <div className="space-y-6">
              {item.reviews?.map((review, i) => (
                <div key={i} className="p-8 rounded-2xl bg-white border border-black/5 shadow-sm">
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} size={14} fill="#0a0a0a" className="text-black" />
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed mb-8 text-slate-700 font-medium">"{review.content}"</p>
                  <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                    <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                    <div>
                      <h5 className="font-bold text-sm text-black">{review.name}</h5>
                      <p className="text-xs font-medium text-slate-500 mt-0.5">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info & FAQs */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-black tracking-tight">Office Hours</h2>
              <div className="bg-white rounded-2xl p-8 border border-black/5 shadow-sm space-y-4">
                {item.hours?.map((hour, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
                    <span className="text-slate-500 font-medium text-sm">{hour.split(':')[0]}</span>
                    <span className="text-black font-semibold text-sm">{hour.split(':').slice(1).join(':').trim()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8 text-black tracking-tight">FAQ</h2>
              <div className="space-y-4">
                {item.faqs?.map((faq, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
                    <h4 className="font-bold mb-2 text-black text-sm">{faq.question}</h4>
                    <p className="text-sm leading-relaxed text-slate-500">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-20 px-6 md:px-16 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 border-b border-black/5 pb-16 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              {item.logo ? (
                <img src={item.logo} alt="Logo" className="h-8 object-contain" />
              ) : (
                <div className="w-8 h-8 rounded-md flex items-center justify-center shadow-sm bg-black text-white">
                  <span className="text-xs font-bold">{item.title.charAt(0)}</span>
                </div>
              )}
              {item.title}
            </h2>
            <p className="max-w-sm mb-8 text-sm leading-relaxed text-slate-500">
              Professional legal services combining expert counsel with modern efficiency.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-[10px] text-slate-400">Practice</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-600">
              <li className="hover:text-black cursor-pointer transition-colors">Corporate Law</li>
              <li className="hover:text-black cursor-pointer transition-colors">Intellectual Property</li>
              <li className="hover:text-black cursor-pointer transition-colors">Employment</li>
              <li className="hover:text-black cursor-pointer transition-colors">Real Estate</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-[10px] text-slate-400">Firm</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-600">
              <li className="hover:text-black cursor-pointer transition-colors">Our Team</li>
              <li className="hover:text-black cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-black cursor-pointer transition-colors">News & Insights</li>
              <li className="hover:text-black cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 font-medium">
          <p>&copy; {new Date().getFullYear()} {item.title}. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-black cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-black cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-black cursor-pointer transition-colors">Disclaimer</span>
          </div>
        </div>
      </div>
    </div>
  );
};
