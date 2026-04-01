import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Mail, Lock, ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { Page } from '../types';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

interface LoginProps {
  onNavigate: (page: Page) => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      if (result.user.email === 'michaelfred124@gmail.com') {
        onNavigate('admin-dashboard');
      } else {
        onNavigate('dashboard');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || 'Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Visuals (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12 text-white">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-brand-600 rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-accent-orange rounded-full blur-[100px] opacity-10"></div>
        
        <div className="relative z-10 max-w-lg">
           <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/10">
              <Rocket size={32} className="text-brand-400" />
           </div>
           <h1 className="text-5xl font-bold mb-6">Welcome Back.</h1>
           <p className="text-xl text-slate-400 leading-relaxed mb-8">
             Manage your projects, view assets, and track progress all in one place. Your digital growth engine is ready.
           </p>
           
           <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 backdrop-blur-sm">
                 <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                    <CheckCircle2 size={20} />
                 </div>
                 <div>
                    <h3 className="font-bold">Project Updates</h3>
                    <p className="text-sm text-slate-400">Real-time status tracking</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 backdrop-blur-sm">
                 <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <CheckCircle2 size={20} />
                 </div>
                 <div>
                    <h3 className="font-bold">Asset Management</h3>
                    <p className="text-sm text-slate-400">Secure file sharing & storage</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-24 relative">
         <button 
           onClick={() => onNavigate('home')}
           className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors"
         >
            <ArrowLeft size={20} /> Back to Home
         </button>

         <div className="max-w-md w-full mx-auto">
            <div className="mb-10">
               <h2 className="text-3xl font-bold text-slate-900 mb-2">Sign In</h2>
               <p className="text-slate-500">Access your client dashboard.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-6">
               <button 
                 onClick={handleGoogleLogin}
                 disabled={isLoading}
                 className="w-full py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm disabled:opacity-70"
               >
                 {isLoading ? (
                   <Loader2 className="animate-spin" size={24} />
                 ) : (
                   <>
                     <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                     </svg>
                     Sign in with Google
                   </>
                 )}
               </button>
            </div>

            <div className="mt-8 text-center text-slate-500 text-sm">
               Don't have an account?{' '}
               <button onClick={() => onNavigate('start-project')} className="text-brand-600 font-bold hover:underline">
                  Start a Project
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Login;