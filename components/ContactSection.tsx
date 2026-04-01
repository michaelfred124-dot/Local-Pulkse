import React, { useState } from 'react';
import { ArrowRight, Mail, MapPin, Phone, CheckCircle } from 'lucide-react';
import { dataManager } from '../services/mockData';

const ContactSection: React.FC = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', website: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    dataManager.addMessage({
      sender: `${form.firstName} ${form.lastName}`,
      email: form.email,
      content: form.message,
      type: 'contact'
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ firstName: '', lastName: '', email: '', website: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-transparent text-white relative overflow-hidden">
      {/* Abstract Shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-accent-alt rounded-full blur-[100px] opacity-10 translate-y-1/3 -translate-x-1/3"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-brand-surface backdrop-blur-lg rounded-[2.5rem] border border-white/5 p-8 md:p-16 lg:flex gap-16 shadow-2xl shadow-brand-accent/5">
          
          {/* Left: Info */}
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to define your <span className="text-brand-accent italic font-light">legacy</span>?</h2>
            <p className="text-white/60 text-lg mb-12 max-w-md font-light leading-relaxed">
              Schedule a free 30-minute strategy call. We'll audit your current digital presence and give you a roadmap to success—no strings attached.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center">
                  <Mail className="text-brand-accent" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Email us</p>
                  <p className="font-medium text-white">hello@applica.agency</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center">
                  <Phone className="text-brand-accent" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Call us</p>
                  <p className="font-medium text-white">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center">
                  <MapPin className="text-brand-accent" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Visit us</p>
                  <p className="font-medium text-white">123 Market St, Design City</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:w-1/2">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-brand-bg rounded-2xl border border-white/5">
                <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-4 text-brand-accent">
                  <CheckCircle size={32} />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2 text-white">Message Sent!</h3>
                <p className="text-white/60 font-light">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">First Name</label>
                    <input 
                      required
                      type="text" 
                      id="firstName" 
                      value={form.firstName}
                      onChange={(e) => setForm({...form, firstName: e.target.value})}
                      className="w-full bg-brand-bg border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors text-white placeholder-white/20 font-light" 
                      placeholder="Jane" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Last Name</label>
                    <input 
                      required
                      type="text" 
                      id="lastName" 
                      value={form.lastName}
                      onChange={(e) => setForm({...form, lastName: e.target.value})}
                      className="w-full bg-brand-bg border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors text-white placeholder-white/20 font-light" 
                      placeholder="Doe" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Email Address</label>
                  <input 
                    required
                    type="email" 
                    id="email" 
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className="w-full bg-brand-bg border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors text-white placeholder-white/20 font-light" 
                    placeholder="jane@company.com" 
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="website" className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Current Website (Optional)</label>
                  <input 
                    type="text" 
                    id="website" 
                    value={form.website}
                    onChange={(e) => setForm({...form, website: e.target.value})}
                    className="w-full bg-brand-bg border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors text-white placeholder-white/20 font-light" 
                    placeholder="www.company.com" 
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">How can we help?</label>
                  <textarea 
                    required
                    id="message" 
                    rows={4} 
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    className="w-full bg-brand-bg border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors text-white placeholder-white/20 font-light resize-none" 
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button type="submit" className="w-full bg-white text-brand-bg font-bold text-lg py-4 rounded-xl hover:bg-brand-accent hover:text-white transition-all flex items-center justify-center gap-2 group shadow-xl shadow-brand-accent/10">
                  Send Request <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;