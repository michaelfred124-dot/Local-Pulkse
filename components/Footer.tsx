import React from 'react';
import { Facebook, Instagram, Linkedin, Rocket, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="text-[#86868b] py-24 border-t border-black/5 relative overflow-hidden bg-white">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 md:gap-16 mb-24 max-w-6xl mx-auto">
          
          <div className="col-span-2 md:col-span-5">
            <a href="#" className="flex items-center gap-2 text-[#1d1d1f] mb-8 group">
               <div className="w-8 h-8 bg-[#1d1d1f] rounded-lg flex items-center justify-center text-white shadow-sm">
                 <Rocket size={16} />
               </div>
               <span className="text-xl font-bold tracking-tight">wollo</span>
            </a>
            <p className="max-w-sm text-sm leading-relaxed mb-10 font-medium">
              The all-in-one platform for building, managing, and growing your digital presence.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-[#86868b] hover:text-[#1d1d1f] transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-[#86868b] hover:text-[#1d1d1f] transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-[#86868b] hover:text-[#1d1d1f] transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-[#86868b] hover:text-[#1d1d1f] transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 md:col-start-7">
            <h4 className="text-xs font-bold text-[#1d1d1f] mb-6 tracking-wider uppercase">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-bold text-[#1d1d1f] mb-6 tracking-wider uppercase">Platform</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Integrations</a></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-bold text-[#1d1d1f] mb-6 tracking-wider uppercase">Legal</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 max-w-6xl mx-auto">
          <div className="text-xs font-medium text-[#86868b]">
            &copy; {new Date().getFullYear()} Wollo. All rights reserved.
          </div>
          <div className="text-xs font-medium text-[#86868b]">
            Designed with precision for the modern web.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
