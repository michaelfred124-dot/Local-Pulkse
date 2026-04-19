import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Globe, ArrowRight, Edit3, Layout, Move, Plus, Trash2, Image as ImageIcon, Check, Star, Play } from 'lucide-react';
import { PortfolioItem } from '../../types';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  isEditing?: boolean;
  className?: string;
  tag?: keyof React.JSX.IntrinsicElements;
}

const EditableText: React.FC<EditableTextProps> = ({ 
  value, 
  onSave, 
  isEditing, 
  className = '', 
  tag: Tag = 'div'
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  if (!isEditing) {
    return <Tag className={className} dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, '<br/>') }} />;
  }

  return (
    <div className={`relative group/editable ${className}`}>
      <Tag
        contentEditable
        suppressContentEditableWarning
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          const newValue = e.currentTarget.innerText;
          if (newValue !== value) {
            onSave(newValue);
          }
        }}
        className={`outline-none focus:ring-2 focus:ring-indigo-400/50 rounded-md transition-all px-1 -mx-1 min-h-[1em] min-w-[50px] ${isFocused ? 'bg-indigo-50/80 shadow-inner' : 'hover:bg-indigo-50/30'}`}
      >
        {value || 'Click to add text...'}
      </Tag>
      {!isFocused && (
        <div className="absolute -top-6 left-0 opacity-0 group-hover/editable:opacity-100 transition-opacity pointer-events-none z-50">
          <div className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-lg whitespace-nowrap">
            <Edit3 size={8} /> EDIT
          </div>
        </div>
      )}
    </div>
  );
};

interface SectionWrapperProps {
  children: React.ReactNode;
  isEditing?: boolean;
  label: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, isEditing, label }) => {
  if (!isEditing) return <>{children}</>;

  return (
    <div className="relative group/section border-2 border-transparent hover:border-indigo-400/40 transition-all">
      {children}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-2 border-indigo-600 opacity-0 group-hover/section:opacity-100 transition-opacity z-40" />
      <div className="absolute top-0 left-4 -translate-y-1/2 opacity-0 group-hover/section:opacity-100 transition-all z-50 flex items-center gap-1">
        <div className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-xl flex items-center gap-2">
          <Layout size={10} /> {label.toUpperCase()}
        </div>
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-full p-1 shadow-lg pointer-events-auto">
          <button className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-indigo-600 transition-colors">
            <Move size={12} />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-indigo-600 transition-colors">
            <Plus size={12} />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ModernTemplate: React.FC<{ 
  item: PortfolioItem;
  isEditing?: boolean;
  onUpdate?: (updates: Partial<PortfolioItem>) => void;
  onImageClick?: (field: string) => void;
}> = ({ item, isEditing, onUpdate, onImageClick }) => {
  const handleUpdate = (field: keyof PortfolioItem, value: any) => {
    if (onUpdate) onUpdate({ [field]: value });
  };

  return (
    <div className="font-sans bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar */}
      <SectionWrapper isEditing={isEditing} label="Navigation">
        <nav className="px-6 md:px-12 py-6 flex justify-between items-center sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black shadow-lg shadow-indigo-600/20">
              {item.title.charAt(0)}
            </div>
            <EditableText 
              tag="span"
              value={item.title}
              isEditing={isEditing}
              onSave={(v) => handleUpdate('title', v)}
              className="text-lg font-black tracking-tighter"
            />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500">
            <a href="#" className="hover:text-indigo-600 transition-colors">Product</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Solutions</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">About</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Log in</button>
            <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-xl shadow-indigo-600/20 hover:scale-105 transition-all">
              Get Started
            </button>
          </div>
        </nav>
      </SectionWrapper>

      {/* Hero */}
      <SectionWrapper isEditing={isEditing} label="Hero Section">
        <section className="pt-20 pb-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold mb-6">
                <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                New: AI-Powered Insights
              </div>
              <EditableText 
                tag="h1"
                value={item.heroHeadline || `Scale your ${item.category} business with intelligence.`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('heroHeadline', v)}
                className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.05] text-slate-900"
              />
              <EditableText 
                tag="p"
                value={item.heroSubheadline || `The all-in-one platform for modern ${item.category.toLowerCase()} teams to manage projects, automate workflows, and grow revenue.`}
                isEditing={isEditing}
                onSave={(v) => handleUpdate('heroSubheadline', v)}
                className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed max-w-xl"
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-2xl shadow-indigo-600/30 hover:scale-105 transition-all flex items-center justify-center gap-2">
                  Start Free Trial <ArrowRight size={20} />
                </button>
                <button className="px-8 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  <Play size={16} fill="currentColor" /> Watch Demo
                </button>
              </div>
              <div className="mt-12 flex items-center gap-4 text-sm text-slate-400 font-medium">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100" />
                  ))}
                </div>
                <span>Joined by 10,000+ teams worldwide</span>
              </div>
            </motion.div>
            <div className="relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(79,70,229,0.3)] group/hero-img">
                <img src={item.imageUrl} className="w-full h-full object-cover" alt="Dashboard" referrerPolicy="no-referrer" />
                {isEditing && (
                  <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover/hero-img:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={() => onImageClick?.('imageUrl')} className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold shadow-2xl">
                      Change Image
                    </button>
                  </div>
                )}
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Features */}
      <SectionWrapper isEditing={isEditing} label="Features Grid">
        <section className="py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Everything you need to succeed</h2>
              <p className="text-lg text-slate-500">Powerful features designed to help you focus on what matters most.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Lightning Fast', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
                { title: 'Secure by Default', icon: Shield, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { title: 'Global Reach', icon: Globe, color: 'text-blue-600', bg: 'bg-blue-50' }
              ].map((feature, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Our platform is built with the latest technology to ensure your {item.category.toLowerCase()} business stays ahead of the curve.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* Stats Section */}
      <SectionWrapper isEditing={isEditing} label="Stats Section">
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Active Users', value: '10k+' },
              { label: 'Countries', value: '50+' },
              { label: 'Uptime', value: '99.9%' },
              { label: 'Support', value: '24/7' }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-black text-indigo-600 mb-2">{stat.value}</div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </SectionWrapper>

      {/* Pricing Section */}
      <SectionWrapper isEditing={isEditing} label="Pricing">
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Simple, Transparent Pricing</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Choose the plan that's right for your business growth.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold mb-2">Basic</h3>
              <div className="text-4xl font-black mb-6 text-slate-900">$49<span className="text-lg font-normal text-slate-400">/mo</span></div>
              <ul className="space-y-4 mb-10">
                {['Basic Features', 'Custom Domain', 'Mobile Optimized', 'Standard Support'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-500">
                    <Check size={16} className="text-indigo-600" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 bg-slate-100 text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-all">
                Get Started
              </button>
            </div>
            <div className="bg-indigo-600 p-10 rounded-[2.5rem] border border-indigo-600 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-white text-indigo-600 text-[10px] font-black px-4 py-1 rounded-bl-xl">MOST POPULAR</div>
              <h3 className="text-xl font-bold mb-2 text-white">Pro</h3>
              <div className="text-4xl font-black mb-6 text-white">$100<span className="text-lg font-normal text-indigo-200">/mo</span></div>
              <ul className="space-y-4 mb-10">
                {['Extra Features', 'Advanced Integrations', 'Priority Support', 'Custom Analytics', 'White-labeling'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-indigo-100">
                    <Check size={16} className="text-white" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-lg shadow-white/10">
                Get Started
              </button>
            </div>
          </div>
        </section>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper isEditing={isEditing} label="CTA Section">
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto bg-indigo-600 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-600/40">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">Ready to transform your business?</h2>
              <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto">
                Join thousands of successful companies using {item.title} to power their growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-10 py-5 bg-white text-indigo-600 font-black rounded-2xl shadow-xl hover:scale-105 transition-all">
                  Get Started for Free
                </button>
                <button className="px-10 py-5 bg-indigo-500 text-white font-black rounded-2xl hover:bg-indigo-400 transition-all border border-indigo-400">
                  Contact Sales
                </button>
              </div>
            </div>
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          </div>
        </section>
      </SectionWrapper>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black">
                {item.title.charAt(0)}
              </div>
              <span className="text-lg font-black tracking-tighter">{item.title}</span>
            </div>
            <EditableText 
              tag="p"
              value={item.aboutText || `Empowering modern ${item.category.toLowerCase()} businesses with next-generation tools.`}
              isEditing={isEditing}
              onSave={(v) => handleUpdate('aboutText', v)}
              className="text-slate-500 max-w-sm mb-10 leading-relaxed"
            />
            <div className="flex gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all cursor-pointer">
                  <Globe size={18} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-slate-900">Product</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">Features</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">Integrations</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">Pricing</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">Changelog</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-slate-900">Company</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">Legal</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-slate-900">Resources</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">Documentation</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">Blog</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">Community</li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">Help Center</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <div>&copy; {new Date().getFullYear()} {item.title}. All rights reserved.</div>
          <div className="flex gap-8">
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
