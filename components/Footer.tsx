import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Linkedin, Rocket, Twitter } from 'lucide-react';
import { generateImage } from '../src/services/imageService';

const Footer: React.FC = () => {
  const [bgImage, setBgImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBg = async () => {
      const img = await generateImage("Abstract luxury background for a footer, minimalist, sophisticated, clean white background, 4k.");
      if (img) setBgImage(img);
    };
    fetchBg();
  }, []);

  return (
    <footer className="text-brand-secondary py-24 border-t border-gray-100 relative overflow-hidden bg-white">
      {bgImage && (
        <div className="absolute inset-0 opacity-5 pointer-events-none grayscale">
          <img src={bgImage} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      )}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          
          <div className="md:col-span-5">
            <a href="#" className="flex items-center gap-3 text-brand-primary mb-8 group">
               <div className="w-10 h-10 brand-gradient-bg rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg shadow-brand-accent/20">
                 <Rocket size={20} />
               </div>
               <span className="text-3xl font-bold tracking-tight">MILESTONE <span className="italic font-light text-brand-secondary/40">DIGITAL</span></span>
            </a>
            <p className="max-w-md text-lg leading-relaxed mb-10 text-brand-secondary">
              We build digital experiences that define the standard for modern growth. Precision, elegance, and measurable results in every pixel.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-brand-secondary/30 hover:text-brand-accent transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-brand-secondary/30 hover:text-brand-accent transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-brand-secondary/30 hover:text-brand-accent transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-brand-secondary/30 hover:text-brand-accent transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <h4 className="text-xs font-bold text-brand-primary mb-8">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-brand-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold text-brand-primary mb-8">Services</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Web Design</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Development</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">SEO Strategy</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Brand Identity</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold text-brand-primary mb-8">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-gray-100 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs font-bold text-brand-secondary/40">
            &copy; {new Date().getFullYear()} Milestone Digital. All rights reserved.
          </div>
          <div className="text-xs font-bold text-brand-secondary/20">
            Designed with precision for the modern web.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
