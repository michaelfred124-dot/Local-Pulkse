import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Users, Zap, ArrowRight } from 'lucide-react';
import { Page } from '../types';

interface AboutProps {
  onNavigate?: (page: Page) => void;
}

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bio: "Former design lead at big tech, now dedicated to bringing enterprise-level design to Main Street."
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    bio: "Full-stack wizard who ensures every pixel is perfect and every page loads instantly."
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "SEO Strategist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    bio: "Data nerd who knows exactly how to get your business to the top of Google Maps."
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Content Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
    bio: "Storyteller who crafts compelling copy that turns casual visitors into loyal customers."
  }
];

const VALUES = [
  {
    icon: Heart,
    title: "Local First",
    description: "We believe in the power of local communities. Your success is our neighborhood's success."
  },
  {
    icon: Zap,
    title: "Speed Matters",
    description: "We build for performance. Fast sites rank better and sell more. No bloat allowed."
  },
  {
    icon: Target,
    title: "Results Driven",
    description: "Pretty isn't enough. We design for conversion, calls, and foot traffic."
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We aren't just a vendor; we're your digital partner for the long haul."
  }
];

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-bold text-brand-accent mb-6"
          >
            OUR STORY
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold text-brand-primary mb-8 tracking-tight">
            We are <span className="brand-gradient-text italic font-light">Milestone</span>.
          </h1>
          <p className="text-xl text-brand-secondary leading-relaxed">
            We are a team of designers, developers, and strategists obsessed with one thing: 
            <span className="font-semibold text-brand-primary"> helping brands define their digital legacy in the modern age.</span>
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-24 overflow-hidden relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-black/5 border border-gray-100">
                 <img 
                   src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                   alt="Team working together" 
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-transparent"></div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-10 -right-10 w-48 bg-white p-8 rounded-[2rem] shadow-2xl shadow-black/10 border border-gray-100 hidden md:block">
                 <div className="text-4xl font-bold text-brand-accent mb-1">100+</div>
                 <div className="text-xs text-brand-secondary/60 font-bold uppercase tracking-widest">Brands Transformed</div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl font-bold text-brand-primary mb-8 tracking-tight">Our Evolution</h2>
              <div className="space-y-6 text-lg text-brand-secondary leading-relaxed">
                <p>
                  It started with a simple observation: the most ambitious brands often lacked the digital precision they deserved. 
                  Incredible products and services were losing momentum simply because 
                  they didn't look the part online.
                </p>
                <p>
                  We founded Milestone Digital to change that. We brought enterprise-level design standards, cutting-edge performance, 
                  and big-brand strategy to every project we touch.
                </p>
                <p>
                  Today, we're proud to be the secret weapon for over 100 businesses across the globe. We don't just build websites; 
                  we build digital legacies that work as hard as you do.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-24">
          <div className="text-sm font-bold text-brand-accent mb-6">PHILOSOPHY</div>
          <h2 className="text-4xl font-bold text-brand-primary mb-4 tracking-tight">What Drives Us</h2>
          <p className="text-brand-secondary max-w-2xl mx-auto">Core principles that guide every pixel we push and every line of code we write.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((val, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-2 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-accent mb-8 shadow-sm">
                <val.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-primary mb-4 tracking-tight">{val.title}</h3>
              <p className="text-brand-secondary leading-relaxed">{val.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-gray-50 py-24 text-brand-primary relative overflow-hidden border-y border-gray-100">
        <div className="absolute top-0 left-0 w-full h-full opacity-5" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
             <div>
                <div className="text-5xl font-bold mb-4 text-brand-accent">3</div>
                <div className="text-brand-secondary/40 text-xs font-bold uppercase tracking-widest">Years Active</div>
             </div>
             <div>
                <div className="text-5xl font-bold mb-4 brand-gradient-text">120+</div>
                <div className="text-brand-secondary/40 text-xs font-bold uppercase tracking-widest">Projects Launched</div>
             </div>
             <div>
                <div className="text-5xl font-bold mb-4 text-brand-accent">5</div>
                <div className="text-brand-secondary/40 text-xs font-bold uppercase tracking-widest">Design Awards</div>
             </div>
             <div>
                <div className="text-5xl font-bold mb-4 text-brand-accent">24/7</div>
                <div className="text-brand-secondary/40 text-xs font-bold uppercase tracking-widest">Support</div>
             </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 container mx-auto px-6">
        <div className="text-center mb-24">
          <div className="text-sm font-bold text-brand-accent mb-6">THE TEAM</div>
          <h2 className="text-4xl font-bold text-brand-primary mb-4 tracking-tight">Meet the Visionaries</h2>
          <p className="text-brand-secondary max-w-2xl mx-auto">The humans behind the screens.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {TEAM_MEMBERS.map((member) => (
            <motion.div 
              key={member.id}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] mb-8 aspect-[3/4] border border-gray-100 shadow-xl shadow-black/5 group-hover:shadow-2xl group-hover:shadow-black/10 transition-all duration-500">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <p className="text-brand-primary/80 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-brand-primary mb-1 tracking-tight">{member.name}</h3>
              <p className="text-brand-accent font-bold text-xs uppercase tracking-widest">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 mb-24">
        <div className="bg-gray-50 border border-gray-100 rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-brand-primary mb-8 leading-tight tracking-tight">Ready to define your <span className="brand-gradient-text italic font-light">Milestone</span>?</h2>
            <p className="text-brand-secondary text-lg mb-12 leading-relaxed">
              We're currently accepting new projects for next quarter. Let's build something amazing together.
            </p>
            <button 
              onClick={() => {
                if (onNavigate) {
                  onNavigate('start-project');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center px-12 py-6 brand-gradient-bg text-white font-bold rounded-full hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-brand-accent/20"
            >
              Get in Touch <ArrowRight className="ml-3 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
