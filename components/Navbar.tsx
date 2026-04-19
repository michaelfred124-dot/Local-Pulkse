import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket, LogIn, Globe, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NavItem, Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Features', href: '#features', action: 'scroll' },
  { label: 'Templates', href: '#portfolio', action: 'page' },
  { label: 'Pricing', href: '#pricing', action: 'scroll' },
  { label: 'About us', href: '#about', action: 'page' },
  { label: 'Contact', href: '#contact', action: 'scroll' },
];

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (item.action === 'page') {
      if (item.label === 'About us') {
        onNavigate('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (item.label === 'Templates') {
        onNavigate('gallery');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      if (currentPage !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const element = document.querySelector(item.href);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
         const element = document.querySelector(item.href);
         element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between relative">
          
          {/* Logo */}
          <div className="flex items-center z-10">
            <a href="#" onClick={handleLogoClick} className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-[#1d1d1f] rounded-lg flex items-center justify-center text-white shadow-sm">
                <Rocket size={16} />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#1d1d1f]">
                wollo
              </span>
            </a>
          </div>

          {/* Desktop Pill Nav */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center bg-white/80 backdrop-blur-xl border border-black/5 px-1.5 py-1.5 rounded-full shadow-sm">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className="px-5 py-2 text-sm font-medium text-[#86868b] hover:text-[#1d1d1f] transition-colors rounded-full hover:bg-black/5"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 z-10">
            <button
              onClick={() => onNavigate('login')}
              className="hidden sm:block text-sm font-medium text-[#86868b] hover:text-[#1d1d1f] transition-colors"
            >
              Log in
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigate('sandbox');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="px-5 py-2.5 bg-[#0066cc] text-white text-sm font-semibold rounded-full hover:bg-[#005bb5] transition-colors shadow-sm"
            >
              Live Sandbox
            </button>
            
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-brand-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-4 mx-6 bg-white border border-black/5 p-6 rounded-3xl shadow-2xl z-50 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-lg font-medium text-brand-secondary hover:text-brand-accent px-4 py-2 rounded-xl hover:bg-black/5 transition-all"
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {item.label}
                </a>
              ))}
              <div className="h-px bg-black/5 my-2"></div>
              <button
                className="w-full py-4 bg-brand-primary text-white font-bold rounded-2xl text-lg shadow-lg"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate('sandbox');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
              >
                Live Sandbox
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;