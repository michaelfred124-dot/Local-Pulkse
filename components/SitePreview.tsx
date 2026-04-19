import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Globe, Zap, ShieldCheck, CreditCard, Layout, MousePointer2, MessageSquare, BarChart3 } from 'lucide-react';

const SitePreview: React.FC = () => {
  return (
    <section className="py-32 bg-[#f5f5f7] overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-[#1d1d1f] tracking-tighter mb-6"
          >
            Your site, <br className="md:hidden" /> reimagined.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#86868b] max-w-2xl mx-auto font-medium"
          >
            Experience the future of web design with our intuitive interface and powerful features.
          </motion.p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Website Graphic */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-[3rem] shadow-2xl border border-black/5 overflow-hidden p-4 md:p-8"
          >
            {/* Browser Header */}
            <div className="flex items-center gap-2 mb-6 px-4">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="ml-4 flex-1 h-8 bg-[#f5f5f7] rounded-full flex items-center px-4 text-[10px] text-gray-400 font-medium">
                https://your-awesome-site.wollo.com
              </div>
            </div>

            {/* Website Content Mockup */}
            <div className="grid grid-cols-12 gap-6">
              {/* Sidebar */}
              <div className="col-span-3 hidden md:block space-y-4">
                <div className="w-full h-12 bg-[#f5f5f7] rounded-2xl" />
                <div className="w-full h-48 bg-[#f5f5f7] rounded-3xl" />
                <div className="w-full h-12 bg-[#f5f5f7] rounded-2xl" />
              </div>
              {/* Main Content */}
              <div className="col-span-12 md:col-span-9 space-y-6">
                <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-[2.5rem] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-4xl font-bold tracking-tighter mb-2">Summer Sale</div>
                      <div className="text-sm font-medium opacity-80 uppercase tracking-widest">Up to 50% Off</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square bg-[#f5f5f7] rounded-3xl p-4 flex flex-col justify-end">
                      <div className="w-full h-3 bg-gray-200 rounded-full mb-2" />
                      <div className="w-2/3 h-3 bg-gray-200 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating 'Little Icons' and UI Elements */}
          <div className="absolute -top-10 -right-10 z-20 hidden lg:block">
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white p-4 rounded-2xl shadow-xl border border-black/5 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white">
                <BarChart3 size={20} />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Analytics</div>
                <div className="text-sm font-bold text-[#1d1d1f]">+24% Growth</div>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-20 -left-16 z-20 hidden lg:block">
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="bg-white p-4 rounded-2xl shadow-xl border border-black/5 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white">
                <MessageSquare size={20} />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Support</div>
                <div className="text-sm font-bold text-[#1d1d1f]">Live Chat Active</div>
              </div>
            </motion.div>
          </div>

          <div className="absolute top-1/2 -left-12 z-20 hidden lg:block">
            <motion.div 
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 h-12 bg-white rounded-full shadow-lg border border-black/5 flex items-center justify-center text-blue-500"
            >
              <MousePointer2 size={24} />
            </motion.div>
          </div>

          <div className="absolute -bottom-10 right-1/4 z-20 hidden lg:block">
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white px-6 py-3 rounded-full shadow-xl border border-black/5 flex items-center gap-3"
            >
              <ShieldCheck size={18} className="text-green-500" />
              <span className="text-sm font-bold text-[#1d1d1f]">Enterprise Security</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SitePreview;
