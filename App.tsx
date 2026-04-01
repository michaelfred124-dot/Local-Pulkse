import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesGrid from './components/FeaturesGrid';
import ServicesBento from './components/ServicesBento';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import PortfolioDeck from './components/PortfolioDeck';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import About from './components/About';
import StartProject from './components/StartProject';
import { Dashboard } from './components/Dashboard';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { PreviewPage } from './components/PreviewPage';
import { Page } from './types';
import { AuthProvider } from './components/AuthContext';
import { Key } from 'lucide-react';

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('starter');
  const [hasMaintenance, setHasMaintenance] = useState<boolean>(false);
  const [dashboardProjectId, setDashboardProjectId] = useState<string | null>(null);
  const [previewProjectId, setPreviewProjectId] = useState<string | null>(null);
  const [previewInitialProject, setPreviewInitialProject] = useState<any>(null);
  const [previewInitialContent, setPreviewInitialContent] = useState<any>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean>(true);

  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(hasKey);
      }
    };
    checkApiKey();

    // Check for Stripe redirect
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const projectId = urlParams.get('project');

    if (sessionId && projectId) {
      // In a real app, you'd verify the session with your backend
      // For MVP, we'll just assume success and redirect to dashboard
      setDashboardProjectId(projectId);
      setCurrentPage('dashboard');
      
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleOpenKeySelector = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true); // Assume success to avoid race conditions
    }
  };

  const isFullScreenPage = currentPage === 'dashboard' || currentPage === 'login' || currentPage === 'admin-dashboard' || currentPage === 'preview';

  if (!hasApiKey) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-white">
        <div className="atmosphere opacity-20" />
        <div className="max-w-md w-full bg-white border border-gray-100 rounded-[2.5rem] p-8 text-center relative z-10 shadow-2xl shadow-black/5">
          <div className="w-16 h-16 bg-brand-accent/10 text-brand-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <Key className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-brand-primary mb-4">API Key Required</h1>
          <p className="text-brand-secondary mb-8">
            To provide high-quality AI-generated images, this app requires a Gemini API key. 
            Please select a key from a paid Google Cloud project to continue.
          </p>
          <button
            onClick={handleOpenKeySelector}
            className="w-full py-4 brand-gradient-bg text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-brand-accent/20"
          >
            Select API Key
          </button>
          <p className="mt-6 text-sm text-brand-secondary/30">
            Learn more about <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">Gemini API billing</a>.
          </p>
        </div>
      </div>
    );
  }

  const handlePreview = (projectId: string, initialProject?: any, initialContent?: any) => {
    setPreviewProjectId(projectId);
    setPreviewInitialProject(initialProject || null);
    setPreviewInitialContent(initialContent || null);
    setCurrentPage('preview');
  };

  return (
    <AuthProvider>
      <div className="atmosphere">
        <div className="atmosphere-extra" />
      </div>
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden font-sans relative z-0">
        {!isFullScreenPage && (
          <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
        )}
        
        <main className="flex-grow">
          {currentPage === 'home' && (
            <>
              <Hero onNavigate={setCurrentPage} />
              <FeaturesGrid />
              <ServicesBento />
              <WhyChooseUs />
              <HowItWorks />
              <PortfolioDeck onNavigate={setCurrentPage} />
              <Testimonials />
              <Pricing onNavigate={setCurrentPage} />
            </>
          )}
          
          {currentPage === 'gallery' && (
            <>
              <Gallery 
                onNavigate={setCurrentPage} 
                onEditTemplate={(id) => {
                  setSelectedTemplateId(id);
                  setCurrentPage('start-project');
                }}
              />
            </>
          )}

          {currentPage === 'about' && (
            <>
              <About onNavigate={setCurrentPage} />
            </>
          )}

          {currentPage === 'start-project' && (
            <>
              <StartProject 
                onNavigate={setCurrentPage} 
                onPreview={(project, content) => handlePreview('', project, content)}
                onPlanSelect={setSelectedPlanId}
                onMaintenanceSelect={setHasMaintenance}
                onProjectCreate={setDashboardProjectId}
                initialTemplateId={selectedTemplateId || undefined}
              />
            </>
          )}

          {currentPage === 'login' && (
            <>
              <Login onNavigate={setCurrentPage} />
            </>
          )}

          {currentPage === 'dashboard' && (
            <>
              <Dashboard 
                onNavigate={setCurrentPage} 
                onPreview={handlePreview}
                selectedPlanId={selectedPlanId}
                onPlanChange={setSelectedPlanId}
                hasMaintenance={hasMaintenance}
                initialProjectId={dashboardProjectId}
                onProjectSelect={setDashboardProjectId}
              />
            </>
          )}

          {currentPage === 'preview' && (previewProjectId || previewInitialProject) && (
            <PreviewPage 
              projectId={previewProjectId || undefined} 
              initialProject={previewInitialProject}
              initialContent={previewInitialContent}
              onBack={() => setCurrentPage(previewProjectId ? 'dashboard' : 'start-project')} 
            />
          )}

          {currentPage === 'admin-dashboard' && (
            <>
              <AdminDashboard onNavigate={setCurrentPage} />
            </>
          )}
        </main>
        
        {!isFullScreenPage && <Footer />}
      </div>
    </AuthProvider>
  );
};

export default App;