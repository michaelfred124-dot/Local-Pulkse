import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Star, Layout, Shield, Zap, Clock, Globe } from 'lucide-react';
import { PortfolioItem } from '../../types';

export const DefaultTemplate: React.FC<{ item: PortfolioItem }> = ({ item }) => {
  return (
    <div className="font-sans min-h-[800px] overflow-hidden relative bg-white text-slate-900">
      {/* Navbar - Minimalist */}
      <div className="px-6 md:px-12 py-6 flex justify-between items-center sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <h3 className="text-xl font-black tracking-tighter flex items-center gap-2">
          {item.logo ? (
            <img src={item.logo} alt="Logo" className="h-8 object-contain" />
          ) : (
            <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-lg shadow-sm shrink-0">
              <span className="text-sm font-bold">{item.title.charAt(0)}</span>
            </div>
          )}
          <span className="truncate max-w-[150px] sm:max-w-none">{item.title}</span>
        </h3>
        <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
          <span className="hover:text-blue-600 cursor-pointer transition-colors">Platform</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">Solutions</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">Resources</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">Pricing</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-sm font-semibold text-slate-600 hover:text-blue-600 cursor-pointer transition-colors">Log in</span>
          <div className="px-5 py-2.5 text-sm font-bold rounded-lg cursor-pointer transition-all bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20">
            Get Started
          </div>
        </div>
      </div>

      {/* Hero Section - Modern SaaS */}
      <div className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-50 -z-10"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              {item.location ? `${item.location} • ` : ''}New: AI-Powered Insights
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.05] text-slate-900">
              {item.heroHeadline ? (
                <span dangerouslySetInnerHTML={{ __html: item.heroHeadline.replace(/\n/g, '<br/>') }} />
              ) : (
                <>
                  The operating system <br className="hidden md:block" />
                  for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{item.category.toLowerCase()}</span>.
                </>
              )}
            </h1>
            <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed whitespace-pre-wrap">
              {item.heroSubheadline || `Streamline your workflow, engage your audience, and scale your business with our all-in-one platform designed specifically for ${item.title}.`}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 font-bold rounded-xl hover:scale-105 transition-all shadow-xl shadow-blue-600/20 text-base bg-blue-600 text-white">
                Start 14-Day Free Trial
              </button>
              <button className="px-8 py-4 bg-white border border-slate-200 font-bold rounded-xl hover:bg-slate-50 transition-all text-base text-slate-700 flex items-center justify-center gap-2">
                <Layout size={18} />
                Book a Demo
              </button>
            </div>
            <p className="mt-6 text-sm text-slate-400 font-medium">No credit card required. Cancel anytime.</p>
          </motion.div>
        </div>

        {/* Dashboard Preview Image */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-6xl mx-auto px-6 mt-20 relative z-10"
        >
          <div className="rounded-2xl border border-slate-200/60 bg-white/50 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="h-12 border-b border-slate-100 bg-slate-50/50 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="aspect-[16/9] relative">
              <img src={item.imageUrl} className="w-full h-full object-cover" alt="Dashboard Preview" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight text-slate-900">
              Everything you need to grow.
            </h2>
            <p className="text-lg text-slate-500 whitespace-pre-wrap">
              {item.servicesText || "Powerful features that help you manage your business from end to end."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(item.features || [
              { title: 'Global Scale', icon: Globe, desc: 'Deploy your infrastructure across multiple regions with zero latency.' },
              { title: 'Enterprise Security', icon: Shield, desc: 'Bank-grade encryption and security protocols for your sensitive data.' },
              { title: 'Lightning Fast', icon: Zap, desc: 'Optimized performance that delivers sub-second load times for every user.' },
              { title: 'Real-time Sync', icon: Clock, desc: 'Instant data synchronization across all devices and platforms.' },
              { title: 'Custom API', icon: Layout, desc: 'Flexible API endpoints to integrate with your existing tools.' },
              { title: '24/7 Support', icon: Star, desc: 'Dedicated engineering support to help you scale your operations.' }
            ]).map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                  {feature.icon ? (
                    <feature.icon size={24} />
                  ) : (
                    <div className="w-6 h-6 bg-blue-600/20 rounded-full" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Proof / Metrics */}
      <div className="py-24 max-w-7xl mx-auto px-6 md:px-16">
        <div className="bg-blue-600 rounded-3xl p-12 md:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                About Us
              </h2>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                {item.aboutText || `Join thousands of companies that use ${item.title} to power their daily operations and drive growth.`}
              </p>
              <div className="flex flex-col gap-2 mt-8">
                <h3 className="text-xl font-bold">Contact Us</h3>
                {item.contactEmail && <p className="text-blue-200">Email: {item.contactEmail}</p>}
                {item.contactPhone && <p className="text-blue-200">Phone: {item.contactPhone}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <p className="text-4xl font-black mb-2">99.9%</p>
                <p className="text-blue-200 font-medium">Uptime SLA</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <p className="text-4xl font-black mb-2">24/7</p>
                <p className="text-blue-200 font-medium">Expert Support</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <p className="text-4xl font-black mb-2">10x</p>
                <p className="text-blue-200 font-medium">Faster Workflows</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <p className="text-4xl font-black mb-2">150+</p>
                <p className="text-blue-200 font-medium">Integrations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-20 px-6 md:px-16 bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-12 border-b border-slate-800 pb-16 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-white">
              {item.logo ? (
                <img src={item.logo} alt="Logo" className="h-8 object-contain grayscale" />
              ) : (
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-600 text-white">
                  <span className="text-xs font-bold">{item.title.charAt(0)}</span>
                </div>
              )}
              {item.title}
            </h2>
            <p className="max-w-sm mb-8 text-slate-400 leading-relaxed">
              The complete platform for {item.category.toLowerCase()} businesses to scale and succeed in the digital age.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors text-white">
                  <span className="text-xs font-bold">{social.charAt(0)}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white">Product</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="hover:text-blue-400 cursor-pointer transition-colors">Features</li>
              <li className="hover:text-blue-400 cursor-pointer transition-colors">Integrations</li>
              <li className="hover:text-blue-400 cursor-pointer transition-colors">Pricing</li>
              <li className="hover:text-blue-400 cursor-pointer transition-colors">Changelog</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white">Resources</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="hover:text-blue-400 cursor-pointer transition-colors">Documentation</li>
              <li className="hover:text-blue-400 cursor-pointer transition-colors">Blog</li>
              <li className="hover:text-blue-400 cursor-pointer transition-colors">Community</li>
              <li className="hover:text-blue-400 cursor-pointer transition-colors">Help Center</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="hover:text-blue-400 cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-blue-400 cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-blue-400 cursor-pointer transition-colors">Legal</li>
              <li className="hover:text-blue-400 cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm font-medium text-slate-500">
          <p>&copy; {new Date().getFullYear()} {item.title}. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Cookie Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
};
