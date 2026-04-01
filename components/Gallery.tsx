import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, ChevronLeft, Layout, Star, MapPin, Phone, Mail, Loader2, Globe, Shield, Zap, Clock, Search, Monitor, Smartphone, Eye, ExternalLink, Filter } from 'lucide-react';
import { PortfolioItem, Page } from '../types';
import { TemplateRenderer, TemplateMiniPreview } from './TemplateRenderer';
import { generateImage } from '../src/services/imageService';

// Comprehensive set of industry-specific templates
const INDUSTRY_PROJECTS: PortfolioItem[] = [
  { 
    id: 1, 
    templateId: 'bistro',
    title: 'The Corner Bistro', 
    category: 'Food & Beverage', 
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80',
    hours: ['Monday - Friday: 5:00 PM - 10:00 PM', 'Saturday: 4:00 PM - 11:00 PM', 'Sunday: 4:00 PM - 9:00 PM'],
    faqs: [
      { question: "Do you take reservations?", answer: "Yes, we highly recommend booking in advance through our online portal." },
      { question: "Do you accommodate dietary restrictions?", answer: "Absolutely. Our chef can modify most dishes for vegan, gluten-free, or allergy-specific needs." },
      { question: "Is there a dress code?", answer: "Smart casual is preferred, but we welcome everyone to enjoy our culinary experience." }
    ],
    reviews: [
      { name: "James Wilson", role: "Local Foodie", content: "The atmosphere here is unmatched. It's my go-to spot for anniversary dinners and the best steak in town.", rating: 5 },
      { name: "Elena Gomez", role: "Food Blogger", content: "The attention to detail in their plating is incredible. You can really taste the fresh, locally-sourced ingredients.", rating: 5 }
    ],
    menu: [
      { name: "Truffle Risotto", description: "Arborio rice, wild mushrooms, white truffle oil, and aged parmesan.", price: "$28.00", category: "Mains" },
      { name: "Pan-Seared Scallops", description: "Diver scallops, cauliflower purée, crispy pancetta, and lemon butter.", price: "$34.00", category: "Mains" },
      { name: "Wagyu Beef Tartare", description: "Hand-cut wagyu, quail egg, capers, and toasted brioche.", price: "$22.00", category: "Starters" },
      { name: "Artisan Burrata", description: "Fresh burrata, heirloom tomatoes, basil pesto, and balsamic glaze.", price: "$18.00", category: "Starters" },
      { name: "Dark Chocolate Fondant", description: "Warm chocolate cake with a molten center, served with vanilla bean gelato.", price: "$14.00", category: "Desserts" }
    ],
    features: [
      { title: 'Table Reservations', icon: Zap, desc: 'Seamless online booking system with real-time availability.' },
      { title: 'Inventory Tracking', icon: Clock, desc: 'Real-time ingredient management ensures your favorite dishes are always available.' },
      { title: 'Secure Checkout', icon: Shield, desc: 'Safe and encrypted payment processing for private events and deposits.' },
      { title: 'VIP Rewards', icon: Star, desc: 'Earn points on every visit and unlock exclusive tasting menus.' },
      { title: 'Restaurant Management', icon: Layout, desc: 'Unified dashboard to manage orders, staff, and menus across all locations.' },
      { title: 'Local Discovery', icon: Globe, desc: 'Be the first choice for diners in your neighborhood with optimized presence.' }
    ],
    advantagePoints: [
      'Instant Menu Updates for seasonal specials',
      'Automated Booking Alerts for your guests',
      'Seamless Mobile Experience for easy reservations'
    ],
    featureHeadline: "The Architecture of Taste",
    featureSubheadline: "We translate the sensory experience of a world-class restaurant into a digital interface that breathes sophistication.",
    advantageHeadline: "Prestige in Every Pixel",
    advantageSubheadline: "A digital concierge for the modern diner.",
    advantageDescription: "Our design philosophy for The Corner Bistro centers on 'Quiet Luxury'—where every interaction feels intentional, refined, and deeply personal.",
    dashboardTitle: "The Culinary Collection",
    dashboardDescription: "Manage your seasonal menus and exclusive wine lists with surgical precision.",
    dashboardMetricLabel: "Artisan Dishes",
    reviewsHeadline: "The Critic's Verdict",
    galleryImages: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=800&q=80'
    ]
  },
  { 
    id: 2, 
    templateId: 'yoga',
    title: 'Zen Yoga', 
    category: 'Health & Wellness', 
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-2969c6360207?auto=format&fit=crop&w=1200&q=80',
    hours: ['Mon-Thu: 6am - 9pm', 'Fri: 6am - 7pm', 'Sat-Sun: 8am - 4pm'],
    faqs: [
      { question: "Do I need to bring my own mat?", answer: "We provide mats for free, but you are welcome to bring your own." },
      { question: "Are classes suitable for beginners?", answer: "Yes, we have specific 'Intro to Yoga' classes every Tuesday and Thursday." }
    ],
    reviews: [
      { name: "Elena R.", role: "Member", content: "Such a peaceful space. The instructors are incredibly knowledgeable.", rating: 5 },
      { name: "David K.", role: "Athlete", content: "Great for recovery. The hot yoga sessions are intense but rewarding.", rating: 5 }
    ],
    services: [
      { title: "Vinyasa Flow", description: "A dynamic practice connecting breath with movement.", price: "$20/class" },
      { title: "Restorative Yoga", description: "Deep relaxation using props to support the body.", price: "$25/class" },
      { title: "Private Session", description: "One-on-one instruction tailored to your goals.", price: "$80/hour" }
    ],
    features: [
      { title: 'Smart Booking', icon: Clock, desc: 'Intelligent scheduling system that manages staff availability and room capacity.' },
      { title: 'Client Portal', icon: Layout, desc: 'Secure area for clients to manage memberships, history, and preferences.' },
      { title: 'HIPAA Ready', icon: Shield, desc: 'Privacy-first architecture ensuring all client data remains confidential.' },
      { title: 'Automated Reminders', icon: Zap, desc: 'Reduce no-shows with SMS and email alerts triggered by our backend.' },
      { title: 'Membership Billing', icon: Star, desc: 'Recurring revenue management with automated failed payment recovery.' },
      { title: 'Virtual Consults', icon: Globe, desc: 'Integrated video platform for remote wellness sessions and check-ins.' }
    ],
    advantagePoints: [
      'Seamless integration with Mindbody or Zen Planner',
      'Custom intake forms that sync directly to your CRM',
      'Optimized landing pages for high-conversion ad campaigns'
    ]
  },
  { 
    id: 3, 
    templateId: 'legal',
    title: 'Legal Link', 
    category: 'Services', 
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
    hours: ['Mon-Fri: 9am - 6pm', 'Sat: By Appointment', 'Sun: Closed'],
    faqs: [
      { question: "Do you offer free consultations?", answer: "Yes, we offer a 15-minute initial consultation at no cost." },
      { question: "What areas of law do you specialize in?", answer: "We specialize in Corporate Law, Intellectual Property, and Employment Law." }
    ],
    reviews: [
      { name: "Robert M.", role: "CEO, TechStart", content: "Professional, efficient, and highly effective. They handled our merger perfectly.", rating: 5 },
      { name: "Linda S.", role: "Entrepreneur", content: "Great communication throughout the entire process. Highly recommend.", rating: 4 }
    ],
    services: [
      { title: "Corporate Formation", description: "Complete legal setup for your new business venture.", price: "From $1,500" },
      { title: "Contract Review", description: "Thorough analysis and negotiation of business agreements.", price: "$300/hour" },
      { title: "IP Protection", description: "Trademark and copyright filings to secure your brand.", price: "Custom Quote" }
    ],
    features: [
      { title: 'Secure Vault', icon: Shield, desc: 'Encrypted document storage for sensitive legal files and client records.' },
      { title: 'E-Sign Ready', icon: Zap, desc: 'Integrated digital signature platform for faster contract execution.' },
      { title: 'Client Portal', icon: Layout, desc: 'Private dashboard for clients to track case progress and billing.' },
      { title: 'Smart Intake', icon: Clock, desc: 'Automated screening forms that qualify leads before your first call.' },
      { title: 'Billing Engine', icon: Star, desc: 'Automated trust accounting and one-click invoicing for retainers.' },
      { title: 'Local Authority', icon: Globe, desc: 'Strategic SEO to position your firm as the top local legal expert.' }
    ],
    advantagePoints: [
      'Compliant document management systems',
      'Automated appointment scheduling and reminders',
      'High-conversion landing pages for specific practice areas'
    ]
  },
  { id: 4, templateId: 'fitness', title: 'Urban Fit', category: 'Health & Wellness', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80' },
  { id: 5, templateId: 'cleaning', title: 'Green Scape', category: 'Services', imageUrl: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=80' },
  { id: 6, templateId: 'dental', title: 'Pure Dental', category: 'Health & Wellness', imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80' },
  { id: 7, templateId: 'tech', title: 'Tech Fix', category: 'Services', imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1200&q=80' },
  { id: 8, templateId: 'bistro', title: 'Bistro 55', category: 'Food & Beverage', imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80' },
  { id: 9, templateId: 'corporate', title: 'Nexus Corp', category: 'Corporate', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80' },
  { id: 10, templateId: 'pet', title: 'Luxe Stay', category: 'Hospitality', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80' },
  { id: 11, templateId: 'ecommerce', title: 'Summit Gear', category: 'E-Commerce', imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80' },
  { id: 12, templateId: 'bakery', title: 'Fresh Market', category: 'E-Commerce', imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80' },
];

const CATEGORIES = ['All', 'Food & Beverage', 'Health & Wellness', 'Services', 'Corporate', 'E-Commerce', 'Hospitality'];

interface GalleryProps {
  onNavigate?: (page: Page) => void;
  onEditTemplate?: (templateId: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ onNavigate, onEditTemplate }) => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [projectImages, setProjectImages] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchImages = async () => {
      const images: Record<number, string> = {};
      for (let i = 0; i < INDUSTRY_PROJECTS.length; i++) {
        const item = INDUSTRY_PROJECTS[i];
        const prompt = `A professional, high-end modern website design for ${item.title} in the ${item.category} industry, vibrant blue and purple gradients, clean white background, minimalist, 4k.`;
        const img = await generateImage(prompt);
        if (img) images[item.id] = img;
      }
      setProjectImages(images);
    };
    fetchImages();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem]);

  const filteredItems = INDUSTRY_PROJECTS.filter(item => {
    const matchesFilter = filter === 'All' || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col pt-32 relative overflow-hidden bg-white">
      {/* Header - Milestone Style */}
      <div className="container mx-auto px-6 pb-20 relative z-10">
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-bold text-brand-accent mb-6"
          >
            SELECTED WORKS
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-brand-primary mb-8 leading-[1.1] tracking-tight"
          >
            Defining the <br />
            <span className="brand-gradient-text italic font-light">Digital</span> Standard.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-brand-secondary max-w-2xl leading-relaxed"
          >
            Explore our curated collection of digital experiences. Each project is a testament to our commitment to precision, elegance, and measurable results.
          </motion.p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-xl border-y border-black/5 py-6">
        <div className="container mx-auto px-6 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-xs font-bold transition-all whitespace-nowrap ${
                  filter === cat 
                    ? 'text-brand-accent border-b-2 border-brand-accent pb-1' 
                    : 'text-brand-secondary/40 hover:text-brand-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-secondary/20" size={14} />
            <input 
              type="text"
              placeholder="SEARCH PROJECTS"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-6 pr-4 py-2 bg-transparent text-xs font-bold placeholder:text-brand-secondary/20 text-brand-primary focus:outline-none border-b border-black/5 focus:border-brand-accent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Content - Grid */}
      <main className="container mx-auto px-6 py-24 relative z-10">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index % 2 * 0.2 }}
                className="group cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-gray-50 mb-8 shadow-xl shadow-black/5 group-hover:shadow-2xl group-hover:shadow-brand-accent/10 transition-all duration-700 border border-black/5">
                  {projectImages[item.id] ? (
                    <img src={projectImages[item.id]} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  ) : (
                    <TemplateMiniPreview item={item} />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700"></div>
                  
                  {/* Hover Indicator */}
                  <div className="absolute top-10 right-10 w-16 h-16 bg-brand-accent text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-10 group-hover:translate-x-0">
                    <ArrowUpRight size={24} />
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-bold text-brand-accent mb-2">{item.category}</div>
                    <h3 className="text-3xl font-bold text-brand-primary group-hover:text-brand-accent transition-colors">{item.title}</h3>
                  </div>
                  <div className="text-xs font-bold text-brand-secondary/40 border border-black/5 px-3 py-1 rounded-full">
                    VIEW PROJECT
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-32">
            <h3 className="text-3xl font-bold text-brand-primary mb-4">No projects found</h3>
            <p className="text-brand-secondary leading-relaxed">Try adjusting your search or filter to find what you're looking for.</p>
            <button 
              onClick={() => {
                setFilter('All');
                setSearchTerm('');
              }}
              className="mt-8 text-xs font-bold text-brand-accent border-b border-brand-accent pb-1"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>
        
      {/* Full Screen Mockup Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white overflow-y-auto"
          >
             {/* Nav / Controls */}
             <div className="sticky top-0 z-50 flex items-center justify-between px-10 py-6 bg-white/80 backdrop-blur-xl border-b border-black/5">
                <button onClick={() => setSelectedItem(null)} className="flex items-center gap-4 text-brand-primary group">
                   <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-brand-accent group-hover:text-white transition-all">
                      <ChevronLeft size={18} />
                   </div>
                   <span className="text-xs font-bold">Back to Gallery</span>
                </button>
                
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => {
                      if (onEditTemplate) onEditTemplate(selectedItem.templateId);
                      setSelectedItem(null);
                    }}
                    className="px-8 py-3 bg-brand-accent text-white text-xs font-bold rounded-full hover:opacity-90 transition-all"
                  >
                    Edit Template
                  </button>
                  <button onClick={() => setSelectedItem(null)} className="p-2 text-brand-secondary/40 hover:text-brand-primary transition-colors">
                     <X size={24} />
                  </button>
                </div>
             </div>

             {/* Live Website Content */}
             <div className="min-h-screen">
                <TemplateRenderer item={selectedItem} />
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="bg-gray-50 rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden border border-black/5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-accent-alt/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-brand-primary mb-8 leading-tight tracking-tight">
              Ready to create your own <br />
              <span className="brand-gradient-text italic font-light">Milestone</span>?
            </h2>
            <p className="text-xl text-brand-secondary mb-12 leading-relaxed">
              Partner with us to build a digital presence that doesn't just look beautiful, but performs at the highest level.
            </p>
            <button 
              onClick={() => {
                if (onNavigate) {
                  onNavigate('start-project');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="px-12 py-6 bg-brand-primary text-white font-bold rounded-full hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-brand-primary/10"
            >
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
