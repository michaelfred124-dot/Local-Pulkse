import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureShowcase from './components/FeatureShowcase';
import ServicesBento from './components/ServicesBento';
import HowItWorks from './components/HowItWorks';
import DeploymentCarousel from './components/DeploymentCarousel';
import SitePreview from './components/SitePreview';
import PortfolioDeck from './components/PortfolioDeck';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import About from './components/About';
import StartProject from './components/StartProject';
import { Dashboard } from './components/Dashboard';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { PreviewPage } from './components/PreviewPage';
import Sandbox from './components/Sandbox';
import { OnboardingWizard } from './components/OnboardingWizard';
import { Page } from './types';
import { AuthProvider, useAuth } from './components/AuthContext';

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

const AppContent: React.FC = () => {
  const { user, onboardingComplete, loading: authLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('starter');
  const [hasMaintenance, setHasMaintenance] = useState<boolean>(false);
  const [dashboardProjectId, setDashboardProjectId] = useState<string | null>(null);
  const [dashboardInitialTab, setDashboardInitialTab] = useState<string | undefined>(undefined);
  const [previewProjectId, setPreviewProjectId] = useState<string | null>(null);
  const [previewInitialProject, setPreviewInitialProject] = useState<any>(null);
  const [previewInitialContent, setPreviewInitialContent] = useState<any>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (user && !onboardingComplete && !authLoading) {
      setShowOnboarding(true);
    } else {
      setShowOnboarding(false);
    }
  }, [user, onboardingComplete, authLoading]);

  useEffect(() => {
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

  const isFullScreenPage = currentPage === 'dashboard' || currentPage === 'login' || currentPage === 'admin-dashboard' || currentPage === 'preview' || currentPage === 'sandbox';

  const handlePreview = (projectId: string, initialProject?: any, initialContent?: any) => {
    setPreviewProjectId(projectId);
    setPreviewInitialProject(initialProject || null);
    setPreviewInitialContent(initialContent || null);
    setCurrentPage('preview');
  };

  if (showOnboarding) {
    return <OnboardingWizard onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden font-sans relative z-0">
        {!isFullScreenPage && (
          <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
        )}
        
        <main className="flex-grow">
          {currentPage === 'home' && (
            <>
              <Hero onNavigate={setCurrentPage} />
              <FeatureShowcase />
              <ServicesBento />
              <HowItWorks />
              <DeploymentCarousel />
              <SitePreview />
              <PortfolioDeck onNavigate={setCurrentPage} />
              <Testimonials />
              <Pricing onNavigate={setCurrentPage} />
              <CTA onNavigate={setCurrentPage} />
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
                onProjectCreate={(id) => {
                  setDashboardProjectId(id);
                  setDashboardInitialTab('launch');
                }}
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
                initialTab={dashboardInitialTab}
              />
            </>
          )}

          {currentPage === 'preview' && (previewProjectId || previewInitialProject) && (
            <PreviewPage 
              projectId={previewProjectId || undefined} 
              initialProject={previewInitialProject}
              initialContent={previewInitialContent}
              onBack={() => setCurrentPage(previewProjectId ? 'dashboard' : 'start-project')} 
              onLaunch={() => {
                if (previewProjectId) {
                  setDashboardProjectId(previewProjectId);
                  setDashboardInitialTab('launch');
                  setCurrentPage('dashboard');
                } else {
                  setCurrentPage('start-project');
                }
              }}
            />
          )}

          {currentPage === 'admin-dashboard' && (
            <>
              <AdminDashboard onNavigate={setCurrentPage} />
            </>
          )}

          {currentPage === 'sandbox' && (
            <Sandbox onNavigate={setCurrentPage} />
          )}
        </main>
        
        {!isFullScreenPage && <Footer />}
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
