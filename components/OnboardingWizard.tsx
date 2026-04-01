import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Palette, Type, Upload, Globe, Building2 } from 'lucide-react';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

interface OnboardingWizardProps {
  onComplete: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    tagline: '',
    primaryColor: '#0f172a',
    fontPairing: 'inter',
    domain: ''
  });

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const handleComplete = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Create project
      const projectId = `proj_${Date.now()}`;
      await setDoc(doc(db, 'projects', projectId), {
        clientId: user.uid,
        businessName: formData.businessName,
        tagline: formData.tagline,
        primaryColor: formData.primaryColor,
        fontPairing: formData.fontPairing,
        domain: formData.domain,
        domainStatus: formData.domain ? 'pending' : 'none',
        status: 'discovery',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      // Update user profile
      await updateDoc(doc(db, 'users', user.uid), {
        onboardingComplete: true
      });

      onComplete();
    } catch (error) {
      console.error("Error saving onboarding data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Progress Bar */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                step >= i ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                {step > i ? <CheckCircle2 size={16} /> : i}
              </div>
              {i < 4 && (
                <div className={`w-12 sm:w-24 h-1 mx-2 rounded-full transition-colors ${
                  step > i ? 'bg-brand-600' : 'bg-slate-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="p-8 sm:p-12 min-h-[400px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Building2 size={32} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Welcome! Let's get started.</h2>
                  <p className="text-slate-500">First, tell us a bit about your business.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Business Name</label>
                    <input 
                      type="text" 
                      value={formData.businessName}
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                      placeholder="e.g. Acme Corp"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Tagline or Short Description</label>
                    <input 
                      type="text" 
                      value={formData.tagline}
                      onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                      placeholder="e.g. The best widgets in town"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Palette size={32} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Choose Your Vibe</h2>
                  <p className="text-slate-500">Pick a starting color and font pairing. You can change this later.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Primary Color</label>
                    <div className="flex gap-4">
                      {['#0f172a', '#2563eb', '#16a34a', '#dc2626', '#9333ea'].map(color => (
                        <button
                          key={color}
                          onClick={() => setFormData({...formData, primaryColor: color})}
                          className={`w-12 h-12 rounded-full transition-all ${formData.primaryColor === color ? 'ring-4 ring-offset-2 ring-brand-500 scale-110' : 'hover:scale-110'}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Font Pairing</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => setFormData({...formData, fontPairing: 'inter'})}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${formData.fontPairing === 'inter' ? 'border-brand-500 bg-brand-50' : 'border-slate-200 hover:border-slate-300'}`}
                      >
                        <span className="block font-sans font-bold text-lg mb-1">Modern & Clean</span>
                        <span className="block font-sans text-sm text-slate-500">Inter / System</span>
                      </button>
                      <button 
                        onClick={() => setFormData({...formData, fontPairing: 'playfair'})}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${formData.fontPairing === 'playfair' ? 'border-brand-500 bg-brand-50' : 'border-slate-200 hover:border-slate-300'}`}
                      >
                        <span className="block font-serif font-bold text-lg mb-1">Elegant & Classic</span>
                        <span className="block font-sans text-sm text-slate-500">Playfair / Inter</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Upload size={32} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Upload Assets</h2>
                  <p className="text-slate-500">Drop your logo or any photos you want us to use.</p>
                </div>

                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                  <Upload className="mx-auto text-slate-400 mb-4" size={48} />
                  <h3 className="font-bold text-slate-700 mb-2">Click or drag files here</h3>
                  <p className="text-sm text-slate-500">SVG, PNG, JPG up to 10MB</p>
                </div>
                <p className="text-center text-sm text-slate-400">You can skip this and upload later.</p>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Globe size={32} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Domain Name</h2>
                  <p className="text-slate-500">Where will your website live?</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Do you have a domain name?</label>
                    <input 
                      type="text" 
                      value={formData.domain}
                      onChange={(e) => setFormData({...formData, domain: e.target.value})}
                      placeholder="e.g. mybusiness.com (Leave blank if you need one)"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                    />
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3">
                    <Globe className="text-blue-500 shrink-0 mt-0.5" size={20} />
                    <p className="text-sm text-blue-800">
                      If you don't have a domain yet, leave this blank. We'll help you pick and register one in your dashboard.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button 
            onClick={handleBack}
            disabled={step === 1 || loading}
            className={`px-6 py-2.5 font-bold rounded-xl transition-colors ${
              step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:bg-slate-200'
            }`}
          >
            Back
          </button>
          
          {step < 4 ? (
            <button 
              onClick={handleNext}
              disabled={step === 1 && !formData.businessName}
              className="px-6 py-2.5 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              Continue <ArrowRight size={18} />
            </button>
          ) : (
            <button 
              onClick={handleComplete}
              disabled={loading}
              className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Setting up...' : 'Complete Setup'} <CheckCircle2 size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
