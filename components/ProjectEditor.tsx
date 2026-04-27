import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Folder, MessageSquare, CreditCard, Settings, 
  Bell, Search, CheckCircle2, Clock, FileText, Upload, ChevronRight,
  LogOut, AlertCircle, Calendar, Download, Menu, Image, 
  MoreVertical, Send, Paperclip, Shield, User, Lock, Mail,
  CreditCard as CardIcon, ChevronLeft, Check, Server, Zap, Database,
  Circle, ArrowRight, UploadCloud, Palette, FileType2, Eye, EyeOff, Key,
  FileSignature, Receipt, FileCheck, X, Printer, Globe, Layout, Rocket, Edit3, Save, Plus, Loader2, ExternalLink
} from 'lucide-react';
import { Page, PortfolioItem } from '../types';
import { dataManager } from '../services/mockData';
import { IframeTemplate } from './templates/IframeTemplate';
import { DefaultTemplate } from './templates/DefaultTemplate';
import { TemplateRenderer } from './TemplateRenderer';
import { TemplateEditor } from './TemplateEditor';
import { VisualBuilder } from '../src/builder/VisualBuilder';
import { PRESET_TEMPLATES } from '../src/builder/templates';
import { useAuth } from './AuthContext';
import { OnboardingWizard } from './OnboardingWizard';
import { db, storage, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, onSnapshot, query, where, serverTimestamp, orderBy, updateDoc, doc, getDocs } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

interface DashboardProps {
  onNavigate: (page: Page) => void;
  onPreview: (projectId: string) => void;
  selectedPlanId: string;
  onPlanChange: (id: string) => void;
  hasMaintenance: boolean;
  projectId: string;
  onBack: () => void;
  initialTab?: string;
}

// ... existing constants ...
// Reordered TABS: Billing -> Documents -> Settings
const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'editor', label: 'Website Editor', icon: Edit3 },
  { id: 'files', label: 'Files & Assets', icon: Folder },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'launch', label: 'Launch & Domain', icon: Rocket },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'documents', label: 'Documents', icon: FileSignature },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const RECENT_ACTIVITY = [
  { id: 1, type: 'file', content: 'Wireframes_v2.pdf uploaded', date: '2 hours ago', icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/20 border border-blue-500/30' },
  { id: 2, type: 'status', content: 'Phase 1: Discovery completed', date: 'Yesterday', icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/20 border border-green-500/30' },
  { id: 3, type: 'message', content: 'Alex sent you a message', date: '2 days ago', icon: MessageSquare, color: 'text-purple-400', bg: 'bg-purple-500/20 border border-purple-500/30' },
];

const FILES = [
  { id: 1, name: 'Brand_Guidelines_v1.pdf', type: 'pdf', size: '4.2 MB', date: 'Sep 15, 2024', category: 'Brand' },
  { id: 2, name: 'Logo_Pack_Final.zip', type: 'zip', size: '128 MB', date: 'Sep 14, 2024', category: 'Brand' },
  { id: 4, name: 'Homepage_Wireframe.png', type: 'image', size: '3.5 MB', date: 'Oct 02, 2024', category: 'Design' },
];

const UPLOAD_CATEGORIES = [
  { id: 'logo', title: 'Logo & Branding', description: 'Upload SVG, PNG, or AI files.', icon: UploadCloud, color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'hover:border-blue-400 border-white/10' },
  { id: 'images', title: 'Images & Photos', description: 'High-res team photos or product shots.', icon: Image, color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'hover:border-purple-400 border-white/10' },
  { id: 'inspiration', title: 'Design Inspiration', description: 'Screenshots of sites you love.', icon: Palette, color: 'text-pink-400', bg: 'bg-pink-500/20', border: 'hover:border-pink-400 border-white/10' },
  { id: 'content', title: 'Content & Copy', description: 'Word docs or PDFs with your text.', icon: FileType2, color: 'text-amber-400', bg: 'bg-amber-500/20', border: 'hover:border-amber-400 border-white/10' },
];

const MESSAGES = [
  { id: 1, sender: 'Alex Rivera', role: 'Project Manager', time: '10:30 AM', content: 'Hey Jane! Just uploaded the new wireframes for the homepage. Let me know what you think.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', isMe: false },
  { id: 2, sender: 'Me', role: 'Client', time: '10:45 AM', content: 'Thanks Alex! I will take a look this afternoon and get back to you.', avatar: '', isMe: true },
  { id: 3, sender: 'Alex Rivera', role: 'Project Manager', time: '10:46 AM', content: 'Sounds good. No rush!', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', isMe: false },
];

const PROJECT_PLANS = [
  {
    id: 'starter',
    name: 'Starter Brand',
    price: 49,
    period: '/mo',
    setupFee: 0,
    description: 'Perfect for small businesses just starting out. 2 year contract.',
    features: ['Custom Design & Build', 'Hosting & SSL Included', 'Monthly Content Updates', 'Mobile Responsive', 'Basic SEO Setup']
  },
  {
    id: 'growth',
    name: 'Growth Partner',
    price: 75,
    period: '/mo',
    setupFee: 0,
    description: 'For businesses ready to expand their reach. 2 year contract.',
    features: ['Everything in Starter', 'Advanced SEO Strategy', 'Google Business Profile', 'Blog & Content Strategy', 'Social Media Integration']
  },
  {
    id: 'scale',
    name: 'Scale & Dominate',
    price: 100,
    period: '/mo',
    setupFee: 0,
    description: 'Full-service digital dominance. 2 year contract.',
    features: ['Everything in Growth', 'E-Commerce / Booking', 'Priority 24/7 Support', 'Monthly Analytics Report', 'Conversion Optimization']
  }
];

export const ProjectEditor: React.FC<DashboardProps> = ({ onNavigate, onPreview, selectedPlanId, onPlanChange, hasMaintenance, projectId, onBack, initialTab }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(initialTab || 'overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState('profile');
  const [notifications, setNotifications] = useState({ email: true, push: false, updates: true });
  const [showPassword, setShowPassword] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<{title: string, type: 'contract' | 'proposal'} | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const editorImageInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Real data state
  const [userProject, setUserProject] = useState<any>(null);
  const [editorContent, setEditorContent] = useState<any>({
    heroHeadline: 'We build digital experiences',
    heroSubheadline: 'Transform your brand with our cutting-edge web solutions.',
    heroImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80',
    aboutText: 'We are a team of passionate designers and developers dedicated to creating beautiful, functional websites that drive results.',
    contactEmail: 'hello@yourbrand.com',
    contactPhone: '+1 (555) 123-4567',
    builderSchema: null
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [domainInput, setDomainInput] = useState('');
  const [isConnectingDomain, setIsConnectingDomain] = useState(false);
  const [domainSearch, setDomainSearch] = useState('');
  const [isSearchingDomain, setIsSearchingDomain] = useState(false);
  const [searchResults, setSearchResults] = useState<{domain: string, price: string, available: boolean}[]>([]);
  const [isBuyingDomain, setIsBuyingDomain] = useState<string | null>(null);
  const [editorMode, setEditorMode] = useState<'simple' | 'advanced'>('simple');

  // Fetch real user project
  useEffect(() => {
    if (!projectId) return;
    const projectRef = doc(db, 'projects', projectId);
    const unsubscribe = onSnapshot(projectRef, async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserProject({ id: docSnap.id, ...data });

        // Check for Stripe redirect
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');
        const urlProjectId = urlParams.get('project');

        if (sessionId && urlProjectId === docSnap.id && data.status === 'payment-pending') {
          try {
            // Update project status to active
            await updateDoc(doc(db, 'projects', docSnap.id), {
              status: 'active',
              updatedAt: new Date().toISOString()
            });
            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
          } catch (error) {
            console.error("Error updating project status after payment:", error);
          }
        }
      } else {
        setUserProject(null);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `projects/${projectId}`);
    });
    return () => unsubscribe();
  }, [projectId]);

  // Fetch content for project
  useEffect(() => {
    if (!userProject?.id) return; // Only fetch for valid projects
    const q = query(collection(db, 'content'), where('projectId', '==', userProject.id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setEditorContent((prev: any) => ({ ...prev, ...snapshot.docs[0].data() }));
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'content');
    });
    return () => unsubscribe();
  }, [userProject?.id]);

  useEffect(() => {
    if (!user || !userProject?.id) return;
    
    const q = query(
      collection(db, 'files'),
      where('projectId', '==', userProject.id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const filesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort client-side if needed, or add an index for orderBy('createdAt', 'desc')
      filesData.sort((a: any, b: any) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
      setUploadedFiles(filesData);
    }, (error) => {
      console.error("Error fetching files:", error);
    });

    return () => unsubscribe();
  }, [user, userProject?.id]);

  const handleContentChange = (field: string, value: string) => {
    setEditorContent((prev: any) => ({ ...prev, [field]: value }));
  };

  const saveContentToFirestore = async () => {
    if (!userProject) {
      alert("No project selected.");
      return;
    }
    
    setIsSaving(true);
    try {
      const q = query(collection(db, 'content'), where('projectId', '==', userProject.id));
      const snapshot = await getDocs(q);
      
      const contentData = {
        ...editorContent,
        projectId: userProject.id,
        updatedAt: new Date().toISOString()
      };

      if (!snapshot.empty) {
        const docId = snapshot.docs[0].id;
        await updateDoc(doc(db, 'content', docId), contentData);
      } else {
        await addDoc(collection(db, 'content'), contentData);
      }
      
      setTimeout(() => {
        setIsSaving(false);
      }, 1500);
      
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'content');
      setIsSaving(false);
      alert("Failed to save content.");
    }
  };

  const handleConnectDomain = async () => {
    if (!userProject) {
      alert("No project selected.");
      return;
    }
    if (!domainInput) return;

    setIsConnectingDomain(true);
    try {
      await updateDoc(doc(db, 'projects', userProject.id), {
        domain: domainInput,
        domainStatus: 'pending',
        updatedAt: new Date().toISOString()
      });
      setDomainInput('');
      alert("Domain connection initiated. Please configure your DNS settings.");
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `projects/${userProject.id}`);
      alert("Failed to connect domain.");
    } finally {
      setIsConnectingDomain(false);
    }
  };

  const handleSearchDomain = async () => {
    if (!domainSearch) return;
    setIsSearchingDomain(true);
    // Simulate domain search API call
    setTimeout(() => {
      const extensions = ['.com', '.net', '.org', '.io', '.app'];
      const results = extensions.map(ext => ({
        domain: domainSearch.split('.')[0] + ext,
        price: ext === '.io' || ext === '.app' ? '29.99' : '14.99',
        available: Math.random() > 0.3
      }));
      setSearchResults(results);
      setIsSearchingDomain(false);
    }, 1500);
  };

  const handleBuyDomain = async (domain: string, price: string) => {
    if (!userProject) return;
    setIsBuyingDomain(domain);
    try {
      // Simulate payment and registration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await updateDoc(doc(db, 'projects', userProject.id), {
        domain: domain,
        domainStatus: 'verified',
        domainType: 'purchased',
        domainPrice: price,
        updatedAt: new Date().toISOString()
      });
      
      setSearchResults([]);
      setDomainSearch('');
      alert(`Domain ${domain} has been successfully purchased and connected to your site!`);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `projects/${userProject.id}`);
      alert("Failed to purchase domain.");
    } finally {
      setIsBuyingDomain(null);
    }
  };

  const handlePublishWebsite = async () => {
    if (!userProject) {
      alert("No project selected.");
      return;
    }
    
    setIsPublishing(true);
    try {
      const liveUrl = userProject.domain ? `https://${userProject.domain}` : `https://${userProject.name.toLowerCase().replace(/\s/g, '')}.locallaunch.app`;
      await updateDoc(doc(db, 'projects', userProject.id), {
        status: 'live',
        liveUrl: liveUrl,
        updatedAt: new Date().toISOString()
      });
      alert(`Website published successfully! Your site is now live at ${liveUrl}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `projects/${userProject.id}`);
      alert("Failed to publish website.");
    } finally {
      setIsPublishing(false);
    }
  };

  // Onboarding Logic
  const [projectStatus, setProjectStatus] = useState<'setup' | 'active' | 'payment-pending'>('active');
  
  // Sync local state with global store on mount/update
  useEffect(() => {
      if (userProject) {
          if (userProject.status === 'payment-pending') {
              setProjectStatus('payment-pending');
          } else {
              setProjectStatus(userProject.status === 'discovery' || userProject.status === 'Lead' ? 'setup' : 'active');
          }
      }
  }, [userProject?.status]);

  const [onboardingSteps, setOnboardingSteps] = useState([
    { id: 'brief', label: 'Project Brief Submitted', completed: true, type: 'info' },
    { 
      id: 'call', 
      label: 'Book Kickoff Call', 
      completed: false, 
      type: 'action', 
      actionLabel: 'Book Now', 
      icon: Calendar,
      secondaryActionLabel: 'Skip & Start Async'
    },
    { id: 'finalize', label: 'Finalize Setup', completed: false, type: 'action', actionLabel: 'Complete Setup', icon: CheckCircle2 },
  ]);
  
  // Derived Billing Data
  const currentPlan = PROJECT_PLANS.find(p => p.id === selectedPlanId) || PROJECT_PLANS[0];
  const depositAmount = currentPlan.price;
  
  const INVOICES = [
    { 
      id: 'INV-001', 
      date: 'Pending', 
      amount: `$${depositAmount}.00`, 
      status: 'Pending', 
      description: `First Month Subscription (${currentPlan.name})` 
    },
  ];

  if (hasMaintenance) {
      INVOICES.push({
          id: 'SUB-001',
          date: 'Active',
          amount: '$40.00',
          status: 'Active',
          description: 'Monthly Maintenance & Protection'
      });
  }

  const handlePayment = async () => {
    if (!userProject) return;
    
    setIsProcessingPayment(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const projectRef = doc(db, 'projects', userProject.id);
      await updateDoc(projectRef, {
        status: 'active',
        updatedAt: new Date().toISOString()
      });
      
      setProjectStatus('active');
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleEditorImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user || !userProject) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const storageRef = ref(storage, `projects/${userProject.id}/editor/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        }, 
        (error) => {
          console.error("Upload failed:", error);
          setIsUploading(false);
          window.alert("Image upload failed. Please try again.");
        }, 
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setEditorContent((prev: any) => ({ ...prev, heroImage: downloadURL }));
          setIsUploading(false);
          setUploadProgress(0);
          if (editorImageInputRef.current) {
            editorImageInputRef.current.value = '';
          }
        }
      );
    } catch (error) {
      console.error("Error starting upload:", error);
      setIsUploading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user || !userProject) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const storageRef = ref(storage, `projects/${userProject.id}/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        }, 
        (error) => {
          console.error("Upload failed:", error);
          setIsUploading(false);
          window.alert("File upload failed. Please try again.");
        }, 
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Save file metadata to Firestore
          await addDoc(collection(db, 'files'), {
            projectId: userProject.id,
            uploaderId: user.uid,
            name: file.name,
            url: downloadURL,
            category: 'General', // Could be dynamic based on which button was clicked
            size: file.size,
            type: file.type,
            createdAt: new Date().toISOString()
          });

          setIsUploading(false);
          setUploadProgress(0);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }
      );
    } catch (error) {
      console.error("Error starting upload:", error);
      setIsUploading(false);
    }
  };

  const handleStepAction = (stepId: string) => {
    if (stepId === 'finalize') {
      setActiveTab('billing');
    }
    // For demo purposes, we'll toggle completion on click for 'call'
    if (stepId === 'call') {
       window.alert("Opening Calendly...");
       toggleStep(stepId);
    }
  };
  
  const handleSkipCall = () => {
    const newSteps = onboardingSteps.map(step => 
      step.id === 'call' 
        ? { ...step, completed: true, label: 'Async Mode Selected', type: 'info' } 
        : step
    );
    setOnboardingSteps(newSteps);
    // Auto-direct to billing since that is now the priority
    setActiveTab('billing');
  };

  const toggleStep = (id: string) => {
    const newSteps = onboardingSteps.map(step => 
      step.id === id ? { ...step, completed: !step.completed } : step
    );
    setOnboardingSteps(newSteps);
    
    // Check if all steps are complete to switch mode
    const allComplete = newSteps.every(s => s.completed);
    if (allComplete) {
       setTimeout(() => {
           setProjectStatus('active');
           // Update mock data
           if (userProject) {
               dataManager.updateProjectStatus(userProject.id, 'Active', 10);
           }
       }, 1000);
    }
  };

  const completedStepsCount = onboardingSteps.filter(s => s.completed).length;
  const progressPercentage = (completedStepsCount / onboardingSteps.length) * 100;

  // Use real progress from project if active
  const displayProgress = projectStatus === 'active' && userProject ? userProject.progress : progressPercentage;

  // Construct mock item for preview if vibe exists
  const previewItem: PortfolioItem | null = userProject?.vibe ? {
    id: 999,
    title: userProject.name || 'Your Brand',
    category: userProject.clientName || 'Industry',
    imageUrl: editorContent.heroImage || 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80',
    heroHeadline: editorContent.heroHeadline,
    heroSubheadline: editorContent.heroSubheadline,
    aboutText: editorContent.aboutText,
    contactEmail: editorContent.contactEmail,
    contactPhone: editorContent.contactPhone,
    services: [
      { title: "Core Service 1", description: "Tailored solutions for your specific needs.", price: "Learn More" },
      { title: "Core Service 2", description: "Advanced capabilities to drive growth.", price: "Learn More" },
      { title: "Core Service 3", description: "Comprehensive support and maintenance.", price: "Learn More" }
    ],
    features: [
      { title: 'Feature One', icon: Zap, desc: 'Highlighting your unique value proposition.' },
      { title: 'Feature Two', icon: Shield, desc: 'Building trust with your target audience.' },
      { title: 'Feature Three', icon: Globe, desc: 'Expanding your reach globally.' }
    ],
    reviews: [
      { name: "Client A", role: "CEO", content: "Incredible service and outstanding results.", rating: 5 },
      { name: "Client B", role: "Director", content: "Exactly what we needed to scale our operations.", rating: 5 }
    ],
    hours: ['Mon-Fri: 9am - 5pm', 'Sat-Sun: Closed'],
    faqs: [
      { question: "How do we get started?", answer: "Simply reach out through our contact form." },
      { question: "What is your pricing model?", answer: "We offer flexible plans tailored to your needs." }
    ]
  } : null;

  const renderPreviewTemplate = () => {
    if (!previewItem) return null;
    
    return (
      <TemplateRenderer 
        item={previewItem} 
        isEditing={true} 
        onUpdate={(updates) => {
          // Handle updates if needed, though usually handled via the editor forms
          console.log('Preview update:', updates);
        }}
      />
    );
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="grid xl:grid-cols-3 gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             {/* Left Column (Main) */}
             <div className="xl:col-span-2 space-y-4 sm:space-y-6">
                 
                 {/* 
                     CONDITION 1: PAYMENT PENDING MODE 
                     Shows when the client needs to set up payment to go live
                 */}
                 {projectStatus === 'payment-pending' && (
                    <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-white/10 shadow-2xl shadow-black/50 relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full -mr-20 -mt-20 z-0"></div>
                       <div className="relative z-10">
                          <div className="flex items-center gap-4 mb-6">
                             <div className="w-12 h-12 bg-white/5 text-brand-accent rounded-2xl flex items-center justify-center border border-white/10">
                                <Rocket size={24} />
                             </div>
                             <div>
                                <h2 className="text-2xl font-bold text-brand-primary">Your site is ready to go live!</h2>
                                <p className="text-white/50">Just one last step to launch your brand new website.</p>
                             </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-8 mb-8">
                             <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                   <div className="w-5 h-5 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center shrink-0 mt-0.5 border border-green-500/30">
                                      <Check size={12} strokeWidth={3} />
                                   </div>
                                   <p className="text-sm text-white/70 font-medium">Template built and configured</p>
                                </div>
                                <div className="flex items-start gap-3">
                                   <div className="w-5 h-5 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center shrink-0 mt-0.5 border border-green-500/30">
                                      <Check size={12} strokeWidth={3} />
                                   </div>
                                   <p className="text-sm text-white/70 font-medium">Content and images uploaded</p>
                                </div>
                                <div className="flex items-start gap-3">
                                   <div className="w-5 h-5 bg-brand-accent/20 text-brand-accent rounded-full flex items-center justify-center shrink-0 mt-0.5 border border-brand-accent/30">
                                      <CardIcon size={12} strokeWidth={3} />
                                   </div>
                                   <p className="text-sm text-white font-bold">Setup payment to activate hosting</p>
                                </div>
                             </div>

                             <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                <div className="flex justify-between items-center mb-4">
                                   <span className="text-white/40 font-bold text-sm uppercase tracking-wider">Plan Summary</span>
                                   <span className="text-brand-accent font-bold text-sm">
                                      {PROJECT_PLANS.find(p => p.id === (userProject?.planId || selectedPlanId))?.name || 'Starter Brand'}
                                   </span>
                                </div>
                                <div className="flex items-baseline gap-1 mb-6">
                                   <span className="text-3xl font-black text-white">
                                      ${PROJECT_PLANS.find(p => p.id === (userProject?.planId || selectedPlanId))?.price || 49}
                                   </span>
                                   <span className="text-white/50 font-bold">/month</span>
                                </div>
                                <button 
                                  onClick={() => setActiveTab('billing')}
                                  className="w-full py-3 brand-gradient-bg text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-2"
                                >
                                   Complete Payment <ArrowRight size={18} />
                                </button>
                             </div>
                          </div>
                          
                          <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 flex gap-3 text-sm text-amber-200">
                             <AlertCircle size={18} className="shrink-0" />
                             <p>Your site is currently in "Draft" mode. It will be deployed to your live URL immediately after payment is confirmed.</p>
                          </div>
                       </div>
                    </div>
                 )}

                 {/* 
                     CONDITION 2: SETUP MODE 
                     Shows when the client hasn't finished the prerequisites
                 */}
                 {projectStatus === 'setup' && (
                    <div className="glass-card rounded-2xl sm:rounded-3xl p-3 sm:p-6 border-black/5 shadow-xl shadow-black/5 relative overflow-hidden">
                       <div className="flex flex-row md:flex-col items-center md:items-stretch gap-2 sm:gap-4 mb-4 sm:mb-6">
                          <div className="flex-1 min-w-0">
                             <h2 className="text-base sm:text-2xl font-bold text-brand-primary truncate">Let's get you set up</h2>
                             <p className="text-[9px] sm:text-sm text-brand-secondary/50 mt-0.5 sm:mt-1 truncate">Complete these steps to kick off the design phase.</p>
                          </div>
                          <div className="text-right shrink-0">
                             <div className="text-lg sm:text-3xl font-bold text-brand-accent">{Math.round(progressPercentage)}%</div>
                          </div>
                       </div>

                       {/* Progress Bar */}
                       <div className="w-full h-1.5 sm:h-3 bg-black/5 rounded-full mb-4 sm:mb-8 overflow-hidden border border-black/5">
                          <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${progressPercentage}%` }}
                             className="h-full brand-gradient-bg rounded-full"
                          />
                       </div>

                       <div className="space-y-2 sm:space-y-4">
                          {onboardingSteps.map((step) => (
                             <div 
                               key={step.id} 
                               className={`flex flex-row items-center justify-between gap-2 sm:gap-4 p-2 sm:p-4 rounded-xl border transition-all ${
                                  step.completed 
                                    ? 'bg-black/5 border-black/5' 
                                    : 'bg-brand-accent/5 border-brand-accent/20 shadow-sm'
                               }`}
                             >
                                <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
                                   <button 
                                     onClick={() => toggleStep(step.id)}
                                     className={`w-4 h-4 sm:w-8 sm:h-8 shrink-0 rounded-full flex items-center justify-center border-2 transition-colors ${
                                        step.completed 
                                          ? 'bg-green-500 border-green-500 text-white' 
                                          : 'border-black/10 text-transparent hover:border-brand-accent/50'
                                     }`}
                                   >
                                      <Check size={10} className="sm:w-[14px]" strokeWidth={3} />
                                   </button>
                                   <div className="flex-1 min-w-0">
                                      <h4 className={`font-bold text-[10px] sm:text-base truncate ${step.completed ? 'text-brand-secondary/30 line-through' : 'text-brand-primary'}`}>
                                         {step.label}
                                      </h4>
                                      {!step.completed && step.id === 'finalize' && (
                                         <p className="text-[8px] sm:text-xs text-brand-secondary/40 truncate">Upload assets and start your subscription.</p>
                                      )}
                                      {!step.completed && step.id === 'call' && (
                                         <p className="text-[8px] sm:text-xs text-brand-secondary/40 truncate">Or skip and provide details via message.</p>
                                      )}
                                   </div>
                                </div>
                                
                                {!step.completed && step.type === 'action' && (
                                   <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                                     {step.id === 'call' && (
                                        <button 
                                          onClick={handleSkipCall}
                                          className="text-[9px] sm:text-xs font-bold text-white/40 hover:text-brand-accent px-1 sm:px-2 transition-colors hidden sm:block"
                                        >
                                          Skip Call
                                        </button>
                                     )}
                                     <button 
                                        onClick={() => handleStepAction(step.id)}
                                        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 brand-gradient-bg text-white text-[9px] sm:text-sm font-bold rounded-lg hover:opacity-90 transition-colors whitespace-nowrap"
                                     >
                                        {step.icon && <step.icon size={10} className="hidden sm:block" />}
                                        {step.actionLabel}
                                     </button>
                                   </div>
                                )}
                             </div>
                          ))}
                       </div>
                       
                       <div className="mt-6 p-2.5 bg-brand-accent/10 rounded-xl flex gap-3 text-[10px] sm:text-sm text-brand-accent">
                          <div className="mt-0.5"><AlertCircle size={14} className="sm:w-4 sm:h-4" /></div>
                          <p>We cannot begin the wireframing process until we have your brand assets and your subscription is active.</p>
                       </div>
                    </div>
                 )}

                 {/* 
                     CONDITION 2: ACTIVE MODE 
                     Shows standard timeline once setup is complete
                 */}
                  {projectStatus === 'active' && (
                    <div className="glass-card rounded-2xl sm:rounded-3xl p-3 sm:p-6 border-white/5 shadow-xl shadow-black/50 relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full -mr-16 -mt-16 z-0"></div>
                       
                       <div className="relative z-10">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                             <div>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3 ${
                                    userProject?.status === 'Review' ? 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20' : 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20'
                                }`}>
                                    {userProject?.status || 'In Progress'}
                                </span>
                                <h2 className="text-lg sm:text-2xl font-bold text-brand-primary">{userProject?.name || 'Website Redesign'}</h2>
                                <p className="text-[10px] sm:text-sm text-brand-secondary mt-0.5 sm:mt-1">Target Launch: {userProject?.dueDate || 'TBD'}</p>
                             </div>
                             <div className="text-right hidden sm:block">
                                <div className="text-2xl sm:text-4xl font-bold text-brand-primary">{userProject?.progress || 0}%</div>
                                <div className="text-sm text-brand-secondary">Completed</div>
                             </div>
                          </div>

                          {/* Timeline Steps */}
                          <div className="relative">
                             <div className="absolute top-1/2 left-0 w-full h-1 bg-black/5 -translate-y-1/2 rounded-full border border-black/5"></div>
                             <div className="absolute top-1/2 left-0 h-1 brand-gradient-bg -translate-y-1/2 rounded-full" style={{ width: `${userProject?.progress || 0}%` }}></div>
                             
                             <div className="relative flex justify-between">
                                {[
                                  { label: 'Discovery', status: 'completed' },
                                  { label: 'Design', status: (userProject?.progress || 0) > 30 ? 'completed' : 'current' },
                                  { label: 'Development', status: (userProject?.progress || 0) > 60 ? 'completed' : (userProject?.progress || 0) > 30 ? 'current' : 'pending' },
                                  { label: 'Launch', status: (userProject?.progress || 0) === 100 ? 'completed' : 'pending' }
                                ].map((step, idx) => (
                                   <div key={idx} className="flex flex-col items-center gap-3">
                                      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-4 flex items-center justify-center bg-white ${
                                         step.status === 'completed' ? 'border-brand-accent text-brand-accent' :
                                         step.status === 'current' ? 'border-brand-accent text-brand-accent ring-4 ring-brand-accent/20' :
                                         'border-black/5 text-brand-secondary/20'
                                      }`}>
                                         {step.status === 'completed' ? <CheckCircle2 size={12} fill="currentColor" className="text-brand-600" /> : <div className="w-1.5 h-1.5 rounded-full bg-current"></div>}
                                      </div>
                                      <span className={`text-[9px] sm:text-xs font-bold ${step.status === 'pending' ? 'text-brand-secondary/30' : 'text-brand-primary'}`}>{step.label}</span>
                                   </div>
                                ))}
                             </div>
                          </div>
                       </div>
                    </div>
                 )}

                 {/* Action Required (Dynamic) */}
                 <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-2 sm:p-6 flex flex-row items-center gap-2.5 sm:gap-6">
                    <div className="w-6 h-6 sm:w-12 sm:h-12 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-600 shrink-0 border border-amber-500/20">
                       <AlertCircle size={14} className="sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1 text-left">
                       <h3 className="text-[10px] sm:text-lg font-bold text-amber-900">Action Required</h3>
                       <p className="text-amber-700/60 text-[8px] sm:text-sm line-clamp-1">
                          {projectStatus === 'setup' 
                             ? "Complete checklist to start."
                             : "Review homepage wireframes."
                          }
                       </p>
                    </div>
                    <button 
                       onClick={() => {
                          if (projectStatus === 'setup') {
                             const firstIncomplete = onboardingSteps.find(s => !s.completed);
                             if (firstIncomplete?.id === 'finalize') setActiveTab('billing');
                             else window.alert("Action: " + firstIncomplete?.label);
                          } else {
                             window.alert("Opening Design Review...");
                          }
                       }}
                       className="px-2 sm:px-6 py-1 sm:py-3 bg-amber-500 hover:opacity-90 text-white text-[8px] sm:text-base font-bold rounded-lg sm:rounded-xl transition-colors whitespace-nowrap shadow-md shadow-amber-500/20"
                    >
                       {projectStatus === 'setup' ? 'Complete' : 'Review'}
                    </button>
                 </div>

                  {/* Website Access Card */}
                  {(userProject?.liveUrl || userProject?.stagingUrl) && (
                    <div className="bg-white rounded-xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-brand-accent/10 rounded-xl flex items-center justify-center text-brand-accent">
                                    <Globe size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-2xl font-bold text-brand-primary">Website Access</h3>
                                    <p className="text-xs sm:text-sm text-brand-secondary/60">Your project's online environments</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex overflow-x-auto md:grid md:grid-cols-2 gap-4 sm:gap-6 pb-2 md:pb-0 scrollbar-hide snap-x">
                            {userProject.liveUrl && (
                                <div className="min-w-[280px] sm:min-w-0 p-4 sm:p-6 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col snap-start hover:border-brand-accent/30 transition-all group">
                                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                        <div className="p-2 sm:p-3 bg-green-500/10 text-green-600 rounded-xl border border-green-500/20 group-hover:scale-110 transition-transform">
                                            <Globe size={16} className="sm:w-6 sm:h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-primary text-sm sm:text-lg">Live Website</h4>
                                            <p className="text-[10px] sm:text-xs text-green-600 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse"></span> Online
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-white border border-slate-100 rounded-xl p-3 mb-4 sm:mb-8">
                                        <p className="text-xs sm:text-sm text-brand-secondary/70 font-mono truncate">{userProject.liveUrl}</p>
                                    </div>
                                    <a 
                                        href={userProject.liveUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-full py-2.5 sm:py-3 brand-gradient-bg text-white text-xs sm:text-sm font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-accent/20"
                                    >
                                        Visit Site <ArrowRight size={14} className="sm:w-[18px] sm:h-[18px]" />
                                    </a>
                                </div>
                            )}

                            {userProject.stagingUrl && (
                                <div className="min-w-[280px] sm:min-w-0 p-4 sm:p-6 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col snap-start hover:border-brand-accent/30 transition-all group">
                                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                        <div className="p-2 sm:p-3 bg-blue-500/10 text-blue-600 rounded-xl border border-blue-500/20 group-hover:scale-110 transition-transform">
                                            <Layout size={16} className="sm:w-6 sm:h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-primary text-sm sm:text-lg">Staging</h4>
                                            <p className="text-[10px] sm:text-xs text-blue-600 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500"></span> For Review
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-white border border-slate-100 rounded-xl p-3 mb-4 sm:mb-8">
                                        <p className="text-xs sm:text-sm text-brand-secondary/70 font-mono truncate">{userProject.stagingUrl}</p>
                                    </div>
                                    <a 
                                        href={userProject.stagingUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-full py-2.5 sm:py-3 bg-white border-2 border-slate-200 text-brand-primary text-xs sm:text-sm font-bold rounded-xl hover:border-brand-accent hover:text-brand-accent transition-all flex items-center justify-center gap-2"
                                    >
                                        View Staging <ArrowRight size={14} className="sm:w-[18px] sm:h-[18px]" />
                                    </a>
                                </div>
                            )}

                            {userProject.cmsUrl && (
                                <div className="min-w-[280px] sm:min-w-0 p-4 sm:p-6 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col md:col-span-2 snap-start hover:border-brand-accent/30 transition-all group">
                                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                        <div className="p-2 sm:p-3 bg-purple-500/10 text-purple-600 rounded-xl border border-purple-500/20 group-hover:scale-110 transition-transform">
                                            <Lock size={16} className="sm:w-6 sm:h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-primary text-sm sm:text-lg">CMS Admin</h4>
                                            <p className="text-[10px] sm:text-xs text-purple-600 font-bold uppercase tracking-wider">Manage content</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white p-3 sm:p-4 rounded-xl border border-slate-100 mb-4 sm:mb-6">
                                        <div className="flex-1 truncate text-xs sm:text-sm text-brand-secondary font-mono">{userProject.cmsUrl}</div>
                                        <button 
                                            onClick={() => window.open(userProject.cmsUrl, '_blank')}
                                            className="text-brand-accent text-xs sm:text-sm font-bold hover:underline flex items-center gap-1.5"
                                        >
                                            Open <ExternalLink size={14} />
                                        </button>
                                    </div>
                                    <p className="text-xs text-brand-secondary/60 flex items-center gap-2">
                                        <Shield size={14} className="text-brand-accent" />
                                        Use credentials in your <button onClick={() => setActiveTab('files')} className="text-brand-accent font-bold hover:underline">Secure Vault</button>.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                  )}

                  {/* Template Preview (If vibe exists) */}
                  {(userProject?.vibe || userProject?.templateId) && (
                    <div className="glass-card rounded-xl sm:rounded-3xl p-2 sm:p-6 border-black/5 shadow-xl shadow-black/5">
                        <div className="flex items-center justify-between gap-2 sm:gap-4 mb-2 sm:mb-4">
                            <div className="flex items-center gap-2">
                              <h3 className="text-[10px] sm:text-lg font-bold text-brand-primary">Template Preview</h3>
                              <span className="text-[6px] sm:text-sm font-bold text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full">
                                  {userProject.templateId ? userProject.templateId : (userProject.vibe.charAt(0).toUpperCase() + userProject.vibe.slice(1) + ' Vibe')}
                              </span>
                            </div>
                            <button 
                              onClick={() => userProject?.id && onPreview(userProject.id)}
                              className="text-brand-accent hover:opacity-80 text-[8px] sm:text-sm font-bold flex items-center gap-1 sm:gap-2 bg-black/5 border border-black/5 px-2 py-1 sm:px-4 sm:py-2 rounded-lg transition-colors"
                            >
                              <Eye size={14} className="sm:w-4 sm:h-4" /> View Full Screen
                            </button>
                        </div>
                        <div className="w-full h-[100px] md:h-[450px] border border-black/5 rounded-xl overflow-hidden bg-black/5 relative flex flex-col">
                            {/* Browser Chrome */}
                            <div className="bg-black/5 border-b border-black/5 px-1.5 sm:px-3 py-0.5 sm:py-1.5 flex items-center gap-1 sm:gap-2 shrink-0 z-10">
                                <div className="flex gap-0.5 sm:gap-1">
                                    <div className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-red-400" />
                                    <div className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-amber-400" />
                                    <div className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-green-400" />
                                </div>
                                <div className="flex-1 bg-white/40 rounded-md px-1.5 py-0.5 text-[7px] sm:text-[9px] text-brand-secondary flex items-center justify-center font-mono shadow-sm mx-1 sm:mx-2 border border-black/5">
                                    <span className="text-brand-secondary/20 mr-1 text-[6px] sm:text-[9px]">🔒</span>
                                    {(userProject.name || 'yourbrand').toLowerCase().replace(/\s/g, '')}.com
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
                                <div className="absolute top-0 left-0 w-[150%] h-[150%] origin-top-left scale-[0.666] md:w-[125%] md:h-[125%] md:scale-[0.8]">
                                    {renderPreviewTemplate()}
                                </div>
                            </div>
                        </div>
                    </div>
                  )}

                 {/* Recent Activity */}
                 <div className="glass-card rounded-xl sm:rounded-3xl p-2 sm:p-6 border-black/5 shadow-xl shadow-black/5">
                    <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 mb-2 sm:mb-6">
                       <h3 className="text-xs sm:text-xl font-bold text-brand-primary">Recent Activity</h3>
                       <button className="text-brand-accent font-bold text-[9px] sm:text-sm hover:underline">View All</button>
                    </div>
                    <div className="space-y-2.5 sm:space-y-6">
                       {RECENT_ACTIVITY.map((item) => (
                          <div key={item.id} className="flex gap-2.5 sm:gap-4 items-start">
                             <div className={`w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
                                <item.icon size={12} className="sm:w-[18px] sm:h-[18px]" />
                             </div>
                             <div className="flex-1 pt-0.5 sm:pt-1">
                                <p className="font-medium text-brand-primary text-[10px] sm:text-base">{item.content}</p>
                                <p className="text-[8px] sm:text-sm text-brand-secondary mt-0.5">{item.date}</p>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4 sm:space-y-6">
                 {/* Project Details */}
                 <div className="glass-card rounded-2xl sm:rounded-3xl p-3 sm:p-6 border-black/5 shadow-xl shadow-black/5">
                    <h3 className="text-base sm:text-lg font-bold text-brand-primary mb-4">Project Details</h3>
                    <div className="space-y-4">
                       <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-black/5 border border-black/5 rounded-xl">
                          <Calendar size={18} className="text-brand-secondary/40" />
                          <div>
                             <p className="text-[10px] sm:text-xs text-brand-secondary/50 font-medium">Start Date</p>
                             <p className="text-xs sm:text-sm font-bold text-brand-primary">{userProject?.createdAt || 'Sep 12, 2024'}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-black/5 border border-black/5 rounded-xl">
                          <Clock size={18} className="text-brand-secondary/40" />
                          <div>
                             <p className="text-[10px] sm:text-xs text-brand-secondary/50 font-medium">Est. Completion</p>
                             <p className="text-xs sm:text-sm font-bold text-brand-primary">4-6 Weeks</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-black/5 border border-black/5 rounded-xl">
                          <CreditCard size={18} className="text-brand-secondary/40" />
                          <div>
                             <p className="text-[10px] sm:text-xs text-brand-secondary/50 font-medium">First Payment Due</p>
                             <p className="text-xs sm:text-sm font-bold text-brand-primary">${depositAmount}.00</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Files Mini View */}
                 <div className="glass-card rounded-2xl sm:rounded-3xl p-3 sm:p-6 border-black/5 shadow-xl shadow-black/5">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                       <h3 className="text-base sm:text-lg font-bold text-brand-primary">Key Assets</h3>
                       <button onClick={() => setActiveTab('files')} className="p-2 bg-black/5 border border-black/5 rounded-lg hover:bg-black/10">
                          <Upload size={18} className="text-brand-secondary/70" />
                       </button>
                    </div>
                    <div className="space-y-3">
                       {FILES.slice(0, 3).map((file, i) => (
                          <div key={i} className="group flex items-center justify-between p-3 rounded-xl border border-black/5 hover:border-brand-accent/30 hover:bg-brand-accent/10 transition-all cursor-pointer">
                             <div className="flex items-center gap-3">
                                <FileText size={18} className="text-brand-secondary/40 group-hover:text-brand-accent" />
                                <span className="text-xs sm:text-sm font-medium text-brand-secondary/80 group-hover:text-brand-primary truncate max-w-[140px]">{file.name}</span>
                             </div>
                             <Download size={16} className="text-brand-secondary/20 group-hover:text-brand-accent" />
                          </div>
                       ))}
                    </div>
                    <button onClick={() => setActiveTab('files')} className="w-full mt-4 py-2 text-xs sm:text-sm font-bold text-brand-secondary/70 border border-black/5 rounded-xl hover:bg-black/5 transition-colors">
                       View All Files
                    </button>
                 </div>

                 {/* Support */}
                 <div className="glass-card rounded-2xl sm:rounded-3xl p-3 sm:p-6 text-brand-primary relative overflow-hidden border-black/5 shadow-xl shadow-black/5">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/20 rounded-full -mr-10 -mt-10 blur-3xl"></div>
                    <h3 className="text-base sm:text-lg font-bold mb-2 relative z-10">Need Help?</h3>
                    <p className="text-brand-secondary/60 text-xs sm:text-sm mb-4 relative z-10">Have a question about your project? Direct message your project manager.</p>
                    <button onClick={() => setActiveTab('messages')} className="w-full py-3 brand-gradient-bg text-white font-bold rounded-xl text-xs sm:text-sm hover:opacity-90 transition-colors relative z-10 shadow-lg shadow-brand-accent/20">
                       Send Message
                    </button>
                 </div>
               </div>
            </div>
         );
// ... rest of the component (files, documents, messages, etc.) remains mostly the same, just wrapped in the switch


      case 'editor':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-120px)] flex flex-col">
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6 shrink-0">
                <div className="flex items-center gap-6">
                   <div>
                      <h2 className="text-lg sm:text-2xl font-bold text-brand-primary">Live Website Editor</h2>
                      <p className="text-[10px] sm:text-base text-brand-secondary/50">Update your content and see changes instantly.</p>
                   </div>
                   <div className="hidden md:flex bg-gray-100 p-1 rounded-xl border border-black/5">
                      <button 
                        onClick={() => setEditorMode('simple')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${editorMode === 'simple' ? 'bg-white shadow-sm text-brand-accent' : 'text-gray-400 hover:text-gray-900'}`}
                      >
                         Simple
                      </button>
                      <button 
                        onClick={() => {
                          if (!editorContent.builderSchema) {
                            setEditorContent(prev => ({ 
                              ...prev, 
                              builderSchema: PRESET_TEMPLATES[0] 
                            }));
                          }
                          setEditorMode('advanced');
                        }}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${editorMode === 'advanced' ? 'bg-white shadow-sm text-brand-accent' : 'text-gray-400 hover:text-gray-900'}`}
                      >
                         Advanced (Visual Builder)
                      </button>
                   </div>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                   <button 
                     onClick={saveContentToFirestore}
                     disabled={isSaving}
                     className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 brand-gradient-bg text-white text-xs sm:text-base font-bold rounded-lg sm:rounded-xl hover:opacity-90 transition-colors shadow-lg shadow-brand-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                      {isSaving ? <Loader2 size={14} className="animate-spin sm:w-[18px] sm:h-[18px]" /> : <Save size={14} className="sm:w-[18px] sm:h-[18px]" />}
                      {isSaving ? 'Saving...' : 'Publish Changes'}
                   </button>
                </div>
             </div>

             <div className="flex-1 min-h-0 bg-white rounded-2xl sm:rounded-[2rem] border border-black/5 shadow-xl shadow-black/5 overflow-hidden relative">
                {editorMode === 'simple' ? (
                  <TemplateEditor 
                    item={{
                      id: userProject?.id || 0,
                      templateId: userProject?.templateId || 'default',
                      title: userProject?.name || 'Your Brand',
                      category: userProject?.industry || 'Business',
                      imageUrl: editorContent.heroImage || userProject?.heroImage,
                      heroHeadline: editorContent.heroHeadline,
                      heroSubheadline: editorContent.heroSubheadline,
                      aboutText: editorContent.aboutText,
                      servicesText: editorContent.servicesText,
                      logo: editorContent.logo,
                      location: editorContent.location,
                      contactEmail: editorContent.contactEmail,
                      contactPhone: editorContent.contactPhone
                    } as PortfolioItem}
                    onUpdate={(updates) => setEditorContent(prev => ({ ...prev, ...updates }))}
                  />
                ) : (
                  <VisualBuilder 
                    initialSchema={editorContent.builderSchema}
                    onChange={(schema) => setEditorContent(prev => ({ ...prev, builderSchema: schema }))}
                  />
                )}
             </div>
          </div>
        );

      case 'files':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                   <h2 className="text-2xl font-bold text-brand-primary">Files & Assets</h2>
                   <p className="text-brand-secondary/50">Manage your project documents and secure information.</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex items-center gap-2 px-4 py-2 brand-gradient-bg text-white font-bold rounded-xl hover:opacity-90 transition-colors shadow-lg shadow-brand-accent/20 disabled:opacity-50"
                >
                   {isUploading ? <span className="animate-spin"><Upload size={18} /></span> : <Upload size={18} />}
                   {isUploading ? `${Math.round(uploadProgress)}%` : 'Upload File'}
                </button>
             </div>
             
             {/* Contextual Alert for Setup Mode */}
             {projectStatus === 'setup' && (
                 <div className="mb-8 bg-brand-accent/5 border border-brand-accent/20 rounded-2xl p-6 flex flex-col sm:flex-row gap-4 text-brand-primary text-sm items-center shadow-lg shadow-brand-accent/5">
                    <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent shrink-0">
                        <UploadCloud size={24} />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                        <p className="font-bold text-lg mb-1">Action Required: Project Setup</p>
                        <p className="text-brand-secondary/70">Please use the quick upload actions below to submit your brand assets and content. This helps us move faster toward your first draft.</p>
                    </div>
                    <button 
                        onClick={() => setActiveTab('files')}
                        className="px-6 py-3 bg-brand-accent text-white font-bold rounded-xl hover:opacity-90 transition-all whitespace-nowrap shadow-lg shadow-brand-accent/20"
                    >
                        Go to Uploads
                    </button>
                 </div>
             )}

             {/* Folders */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
                {['Brand Assets', 'Legal', 'Designs', 'Content'].map((folder) => (
                   <div key={folder} className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-brand-accent/30 hover:shadow-lg hover:shadow-slate-200/50 transition-all cursor-pointer group">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-brand-accent group-hover:bg-brand-accent/10 mb-4 transition-all">
                        <Folder size={24} fill="currentColor" />
                      </div>
                      <h3 className="font-bold text-brand-primary text-sm sm:text-lg">{folder}</h3>
                      <p className="text-xs text-brand-secondary/40 mt-1">
                        {uploadedFiles.filter(f => f.category === folder).length} items
                      </p>
                   </div>
                ))}
             </div>

             {/* New Quick Upload Grid */}
             <div className="mb-10">
                <h3 className="font-bold text-lg sm:text-2xl text-brand-primary mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-accent/10 rounded-lg flex items-center justify-center text-brand-accent">
                        <UploadCloud size={18} />
                    </div>
                    Quick Actions
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {UPLOAD_CATEGORIES.map((cat) => (
                    <div 
                        key={cat.id} 
                        onClick={() => fileInputRef.current?.click()}
                        className={`bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-dashed border-slate-200 cursor-pointer transition-all hover:border-brand-accent/30 hover:bg-slate-50/50 hover:shadow-xl group flex flex-col items-center text-center`}
                    >
                        <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transition-all ${cat.bg} ${cat.color} group-hover:scale-110 shadow-sm`}>
                            <cat.icon size={24} className="sm:w-8 sm:h-8" />
                        </div>
                        <h4 className="font-bold text-brand-primary text-sm sm:text-lg mb-1 sm:mb-2">{cat.title}</h4>
                        <p className="text-xs text-brand-secondary/60 mb-4 sm:mb-6 line-clamp-2">{cat.description}</p>
                        <span className="text-xs font-bold text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">Click to Upload</span>
                    </div>
                    ))}
                </div>
             </div>

             {/* Secure Information Vault */}
             <div className="bg-white rounded-2xl sm:rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 mb-10 overflow-hidden">
                <div className="p-6 sm:p-10 bg-slate-50/50 text-brand-primary flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-200">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent shadow-sm">
                         <Lock size={24} />
                      </div>
                      <div>
                         <h3 className="text-lg sm:text-2xl font-bold">Secure Information Vault</h3>
                         <p className="text-xs sm:text-sm text-brand-secondary/60">End-to-end encrypted storage for sensitive project data.</p>
                      </div>
                   </div>
                   <button className="px-6 py-3 bg-white border border-slate-200 text-brand-primary font-bold rounded-xl hover:border-brand-accent hover:text-brand-accent transition-all flex items-center gap-2 shadow-sm">
                      <Shield size={18} /> Security Settings
                   </button>
                </div>
                <div className="p-6 sm:p-10">
                    <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-10 sm:p-20 flex flex-col items-center text-center group hover:border-brand-accent/30 transition-all">
                        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-300 mb-8 shadow-sm group-hover:text-brand-accent transition-all group-hover:scale-110">
                            <UploadCloud size={40} />
                        </div>
                        <h4 className="text-xl font-bold text-brand-primary mb-3">Drop files to upload to Vault</h4>
                        <p className="text-sm sm:text-base text-brand-secondary/60 mb-10 max-w-sm">Files uploaded here are encrypted and only accessible by your verified project team members.</p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="px-10 py-4 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/20"
                            >
                                Select Files
                            </button>
                            <button className="px-10 py-4 bg-white border border-slate-200 text-brand-primary font-bold rounded-2xl hover:bg-slate-50 transition-all">
                                Add Note
                            </button>
                        </div>
                    </div>
                </div>
             </div>

             {/* Files List */}
             <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                   <h3 className="font-bold text-lg text-brand-primary">Recently Uploaded</h3>
                   <div className="flex items-center gap-2 text-slate-400 w-full sm:w-auto bg-slate-50 p-2 rounded-lg">
                      <Search size={18} />
                      <input type="text" placeholder="Search files..." className="bg-transparent border-none focus:ring-0 text-sm w-full sm:w-32 md:w-48 placeholder:text-slate-300 text-slate-700 outline-none" />
                   </div>
                </div>
                
                {/* Mobile Card View for Files */}
                <div className="md:hidden divide-y divide-slate-100">
                   {uploadedFiles.length === 0 ? (
                      <div className="p-8 text-center text-slate-400 text-sm">No files uploaded yet.</div>
                   ) : uploadedFiles.map((file) => (
                      <div key={file.id} className="p-4 flex items-center justify-between gap-4">
                         <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                               file.type?.includes('pdf') ? 'bg-red-50 text-red-500' :
                               file.type?.includes('image') ? 'bg-purple-50 text-purple-500' :
                               file.type?.includes('zip') ? 'bg-yellow-50 text-yellow-600' :
                               'bg-blue-50 text-blue-500'
                            }`}>
                               {file.type?.includes('image') ? <Image size={20} /> : <FileText size={20} />}
                            </div>
                            <div className="min-w-0">
                               <h4 className="font-bold text-slate-700 text-sm truncate">{file.name}</h4>
                               <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                                 {file.category} • {(file.size / (1024 * 1024)).toFixed(2)} MB
                               </p>
                            </div>
                         </div>
                         <a href={file.url} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-brand-accent bg-slate-50 rounded-lg">
                            <Download size={18} />
                         </a>
                      </div>
                   ))}
                </div>

                <div className="hidden md:block overflow-x-auto">
                   <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                         <tr className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider">
                            <th className="p-6 font-bold">Name</th>
                            <th className="p-6 font-bold">Category</th>
                            <th className="p-6 font-bold">Date Uploaded</th>
                            <th className="p-6 font-bold text-right">Size</th>
                            <th className="p-6 font-bold text-right">Actions</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                         {uploadedFiles.length === 0 ? (
                            <tr>
                               <td colSpan={5} className="p-12 text-center text-slate-400">
                                  <div className="flex flex-col items-center gap-2">
                                     <FileText size={32} className="opacity-20" />
                                     <p>No files uploaded yet.</p>
                                  </div>
                               </td>
                            </tr>
                         ) : uploadedFiles.map((file) => (
                            <tr key={file.id} className="hover:bg-slate-50/50 transition-colors group">
                               <td className="p-6">
                                  <div className="flex items-center gap-4">
                                     <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                        file.type?.includes('pdf') ? 'bg-red-50 text-red-500' :
                                        file.type?.includes('image') ? 'bg-purple-50 text-purple-500' :
                                        file.type?.includes('zip') ? 'bg-yellow-50 text-yellow-600' :
                                        'bg-blue-50 text-blue-500'
                                     }`}>
                                        {file.type?.includes('image') ? <Image size={20} /> : <FileText size={20} />}
                                     </div>
                                     <span className="font-bold text-slate-700">{file.name}</span>
                                  </div>
                               </td>
                               <td className="p-6">
                                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider">{file.category}</span>
                               </td>
                               <td className="p-6 text-slate-500 text-sm">
                                 {new Date(file.createdAt).toLocaleDateString()}
                               </td>
                               <td className="p-6 text-slate-500 text-sm text-right">
                                 {(file.size / (1024 * 1024)).toFixed(2)} MB
                               </td>
                               <td className="p-6 text-right">
                                  <a href={file.url} target="_blank" rel="noopener noreferrer" className="inline-block p-2 text-slate-300 hover:text-brand-accent hover:bg-brand-accent/10 rounded-lg transition-all">
                                     <Download size={18} />
                                  </a>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
        );

      case 'documents':
          return (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mb-6 sm:mb-8">
                      <h2 className="text-2xl font-bold text-brand-primary">Project Documents</h2>
                      <p className="text-brand-secondary/50">Access your legal contracts, proposals, and receipts.</p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                      {/* Legal & Contracts */}
                      <div className="space-y-4 sm:space-y-6">
                          <h3 className="text-lg font-bold text-brand-primary flex items-center gap-2">
                             <Shield size={18} className="text-brand-accent" /> Legal & Contracts
                          </h3>
                          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:border-brand-accent/30 hover:shadow-lg hover:shadow-slate-200/50 transition-all">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
                                  <div className="flex items-center gap-3 sm:gap-4">
                                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                                          <FileSignature size={20} className="sm:w-6 sm:h-6" />
                                      </div>
                                      <div className="min-w-0">
                                          <h4 className="font-bold text-brand-primary text-sm sm:text-base truncate">Service Agreement</h4>
                                          <p className="text-xs sm:text-sm text-brand-secondary/50 truncate">Generated for {currentPlan.name}</p>
                                      </div>
                                  </div>
                                  <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase bg-green-50 text-green-600 border border-green-100">
                                      Active
                                  </span>
                              </div>
                              <p className="text-xs sm:text-sm text-brand-secondary/60 mb-6 leading-relaxed">
                                  This contract outlines the scope of work, deliverables, and terms for your {currentPlan.name} project.
                              </p>
                              <div className="flex items-center gap-2 sm:gap-3">
                                  <button 
                                      onClick={() => setViewingDoc({title: 'Service Agreement', type: 'contract'})}
                                      className="flex-1 py-2 sm:py-2.5 bg-slate-50 text-brand-primary font-bold rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm border border-slate-200"
                                  >
                                      <Eye size={16} /> View Terms
                                  </button>
                                  <button 
                                      onClick={() => window.alert('Downloading PDF...')}
                                      className="p-2 sm:p-2.5 text-slate-400 hover:text-brand-accent bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
                                  >
                                      <Download size={18} />
                                  </button>
                              </div>
                          </div>

                          {/* Proposal */}
                          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:border-brand-accent/30 hover:shadow-lg hover:shadow-slate-200/50 transition-all">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                                  <div className="flex items-center gap-3 sm:gap-4">
                                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-accent/10 text-brand-accent rounded-xl flex items-center justify-center shrink-0">
                                          <FileText size={20} className="sm:w-6 sm:h-6" />
                                      </div>
                                      <div className="min-w-0">
                                          <h4 className="font-bold text-brand-primary text-sm sm:text-base truncate">Project Proposal</h4>
                                          <p className="text-xs sm:text-sm text-brand-secondary/50">Version 1.0</p>
                                      </div>
                                  </div>
                                  <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase bg-brand-accent/10 text-brand-accent border border-brand-accent/20">Accepted</span>
                              </div>
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-100 pt-4 mt-4">
                                  <p className="text-[10px] sm:text-xs text-brand-secondary/40">Created on Sep 10, 2024</p>
                                  <div className="flex flex-wrap gap-3 sm:gap-4">
                                      <button 
                                          onClick={() => setViewingDoc({title: 'Project Proposal', type: 'proposal'})}
                                          className="text-xs sm:text-sm font-bold text-brand-secondary/60 hover:text-brand-primary flex items-center gap-1"
                                      >
                                          View Scope
                                      </button>
                                      <button 
                                          onClick={() => window.alert('Downloading PDF...')}
                                          className="text-xs sm:text-sm font-bold text-brand-accent hover:underline flex items-center gap-1"
                                      >
                                          Download PDF <ArrowRight size={14} />
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Financial Documents */}
                      <div className="space-y-4 sm:space-y-6">
                          <h3 className="text-lg font-bold text-brand-primary flex items-center gap-2">
                             <Receipt size={18} className="text-brand-accent" /> Financial & Receipts
                          </h3>
                          
                          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                              {/* Invoice List */}
                              {[
                                  { id: 'RCPT-1024', desc: 'First Month Payment', date: 'Oct 05, 2024', amount: `$${depositAmount}.00` },
                              ].map((item, i) => (
                                  <div key={i} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                                      <div className="flex items-center gap-3 sm:gap-4">
                                          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-brand-accent/10 text-brand-accent rounded-lg flex items-center justify-center shrink-0">
                                              <FileCheck size={18} />
                                          </div>
                                          <div className="min-w-0">
                                              <h4 className="font-bold text-brand-primary text-xs sm:text-sm truncate">{item.desc}</h4>
                                              <p className="text-[10px] sm:text-xs text-brand-secondary/40">{item.id} • {item.date}</p>
                                          </div>
                                      </div>
                                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto">
                                          <div className="font-bold text-brand-primary text-sm sm:text-base">{item.amount}</div>
                                          <button className="text-[10px] sm:text-xs font-bold text-brand-accent hover:underline flex items-center gap-1">
                                              Receipt <Download size={12} />
                                          </button>
                                      </div>
                                  </div>
                              ))}
                          </div>

                           <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6">
                               <h4 className="font-bold text-brand-primary mb-1.5 sm:mb-2 text-sm sm:text-base">Automated Compliance</h4>
                               <p className="text-xs sm:text-sm text-brand-secondary/60 mb-4">
                                   All documents are automatically generated based on your selected plan and local regulations. 
                                   Receipts are issued immediately upon successful payment.
                               </p>
                               <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-400">
                                   <Shield size={14} /> SSL Encrypted & Secure
                               </div>
                           </div>
                      </div>
                  </div>
              </div>
          );

      case 'messages':
         return (
            <div className="h-[calc(100vh-180px)] lg:h-[calc(100vh-140px)] flex bg-white rounded-2xl lg:rounded-[2rem] border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
               {/* Sidebar - Hidden on mobile, shown on desktop */}
               <div className="w-80 bg-slate-50 border-r border-slate-200 flex flex-col hidden lg:flex">
                  <div className="p-6 border-b border-slate-200 bg-white">
                     <h2 className="font-bold text-xl text-brand-primary mb-4">Messages</h2>
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none text-brand-primary placeholder:text-slate-400" />
                     </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
                           <div className="flex items-center gap-3">
                              <div className="relative">
                                 <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Alex" className="w-10 h-10 rounded-full object-cover" />
                                 <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                              </div>
                              <div className="flex-1 min-w-0">
                                 <div className="flex justify-between items-baseline mb-0.5">
                                    <h4 className="font-bold text-brand-primary truncate">Alex Rivera</h4>
                                    <span className="text-xs text-slate-400">10:46 AM</span>
                                 </div>
                                 <p className="text-sm text-slate-500 truncate font-medium">Sounds good. No rush!</p>
                              </div>
                           </div>
                        </div>
                  </div>
               </div>

               {/* Chat Area */}
               <div className="flex-1 flex flex-col min-w-0 bg-white">
                  {/* Chat Header */}
                  <div className="p-3 sm:p-4 border-b border-slate-200 flex justify-between items-center bg-white/80 backdrop-blur-xl sticky top-0 z-10">
                     <div className="flex items-center gap-3">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Alex" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" />
                        <div>
                           <h3 className="font-bold text-brand-primary text-sm sm:text-base">Alex Rivera</h3>
                           <p className="text-[10px] sm:text-xs text-green-500 flex items-center gap-1 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online</p>
                        </div>
                     </div>
                     <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                        <MoreVertical size={18} />
                     </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 bg-slate-50/50">
                     {MESSAGES.map((msg) => (
                        <div key={msg.id} className={`flex gap-2 sm:gap-4 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                           {!msg.isMe && (
                              <img src={msg.avatar} alt={msg.sender} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover self-end" />
                           )}
                           <div className={`max-w-[85%] sm:max-w-[70%] ${msg.isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                              <div className={`p-3 sm:p-4 rounded-2xl text-sm sm:text-base ${msg.isMe ? 'bg-brand-accent text-white rounded-tr-none shadow-lg shadow-brand-accent/20' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'}`}>
                                 <p className="leading-relaxed">{msg.content}</p>
                              </div>
                              <span className="text-[10px] sm:text-xs text-slate-400 mt-1 font-medium">{msg.time}</span>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Input */}
                  <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
                     <div className="flex items-center gap-2 bg-slate-50 p-1.5 sm:p-2 rounded-2xl border border-slate-200 focus-within:border-brand-accent/50 focus-within:ring-4 focus-within:ring-brand-accent/10 transition-all">
                        <button className="p-2 text-slate-400 hover:text-brand-accent transition-colors">
                           <Paperclip size={18} />
                        </button>
                        <input type="text" placeholder="Type your message..." className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-300 text-sm sm:text-base" />
                        <button className="p-2 bg-brand-accent text-white rounded-xl hover:opacity-90 transition-all shadow-lg shadow-brand-accent/20">
                           <Send size={18} />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         );

      case 'launch':
         return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                     <h2 className="text-2xl font-bold text-brand-primary">Launch & Domain</h2>
                     <p className="text-brand-secondary/50">Connect your domain and go live.</p>
                  </div>
                  {userProject?.status === 'live' && (
                     <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-100">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-sm font-bold">Site is Live</span>
                     </div>
                  )}
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column: Domain Management */}
                  <div className="lg:col-span-2 space-y-6">
                     {/* Buy a Domain */}
                     <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
                        <div className="p-6 sm:p-8 border-b border-slate-100">
                           <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                              <Search size={24} />
                           </div>
                           <h3 className="font-bold text-lg text-brand-primary mb-2">Buy a New Domain</h3>
                           <p className="text-sm text-brand-secondary/50 mb-6">Find the perfect name for your business. We'll handle all the technical setup.</p>
                           
                           <div className="flex gap-2">
                              <input 
                                 type="text" 
                                 placeholder="search for a domain..." 
                                 value={domainSearch}
                                 onChange={(e) => setDomainSearch(e.target.value)}
                                 onKeyDown={(e) => e.key === 'Enter' && handleSearchDomain()}
                                 className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-accent/10 focus:border-brand-accent outline-none transition-all text-brand-primary placeholder:text-slate-300"
                              />
                              <button 
                                 onClick={handleSearchDomain}
                                 disabled={!domainSearch || isSearchingDomain}
                                 className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg"
                              >
                                 {isSearchingDomain ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                                 Search
                              </button>
                           </div>

                           {searchResults.length > 0 && (
                              <div className="mt-6 space-y-2">
                                 {searchResults.map((res) => (
                                    <div key={res.domain} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-brand-accent/30 transition-all group">
                                       <div>
                                          <span className="font-bold text-brand-primary">{res.domain}</span>
                                          {!res.available && <span className="ml-2 text-[10px] font-bold text-red-500 uppercase">Taken</span>}
                                       </div>
                                       <div className="flex items-center gap-4">
                                          <span className="text-sm font-bold text-slate-500">${res.price}/yr</span>
                                          <button 
                                             onClick={() => handleBuyDomain(res.domain, res.price)}
                                             disabled={!res.available || isBuyingDomain !== null}
                                             className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                                                res.available 
                                                ? 'bg-brand-accent text-white hover:opacity-90 shadow-md shadow-brand-accent/10' 
                                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                             }`}
                                          >
                                             {isBuyingDomain === res.domain ? <Loader2 size={14} className="animate-spin" /> : 'Buy Now'}
                                          </button>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           )}
                        </div>
                     </div>

                     {/* Connect Existing Domain */}
                     <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
                        <div className="p-6 sm:p-8 border-b border-slate-100">
                           <div className="w-12 h-12 bg-brand-accent/10 text-brand-accent rounded-xl flex items-center justify-center mb-4">
                              <Globe size={24} />
                           </div>
                           <h3 className="font-bold text-lg text-brand-primary mb-2">Connect Existing Domain</h3>
                           <p className="text-sm text-brand-secondary/50 mb-6">Already own a domain? Link it here and configure your DNS settings.</p>
                           
                           <div className="flex gap-2">
                              <input 
                                 type="text" 
                                 placeholder="e.g. mybusiness.com" 
                                 value={domainInput}
                                 onChange={(e) => setDomainInput(e.target.value)}
                                 className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-accent/10 focus:border-brand-accent outline-none transition-all text-brand-primary placeholder:text-slate-300"
                              />
                              <button 
                                 onClick={handleConnectDomain}
                                 disabled={!domainInput || isConnectingDomain}
                                 className="px-6 py-3 bg-brand-accent text-white font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-brand-accent/20"
                              >
                                 {isConnectingDomain ? <Loader2 size={16} className="animate-spin" /> : null}
                                 Connect
                              </button>
                           </div>

                           {userProject?.domain && (
                              <div className="mt-4 p-4 bg-brand-accent/5 border border-brand-accent/10 rounded-xl flex items-center justify-between">
                                 <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                       <Globe size={16} className="text-brand-accent" />
                                    </div>
                                    <div>
                                       <span className="text-sm font-bold text-brand-primary block">{userProject.domain}</span>
                                       <span className="text-[10px] text-brand-secondary/50 uppercase font-bold tracking-wider">
                                          {userProject.domainType === 'purchased' ? 'Managed by us' : 'External Domain'}
                                       </span>
                                    </div>
                                 </div>
                                 <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                                    userProject.domainStatus === 'verified' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-orange-100 text-orange-700'
                                 }`}>
                                    {userProject.domainStatus || 'Pending'}
                                 </span>
                              </div>
                           )}
                        </div>

                        {userProject?.domain && userProject.domainType !== 'purchased' && (
                           <div className="p-6 sm:p-8 bg-slate-50">
                              <div className="flex items-center justify-between mb-4">
                                 <h4 className="font-bold text-sm text-brand-primary">DNS Configuration</h4>
                                 <button className="text-[10px] font-bold text-brand-accent hover:underline uppercase tracking-wider">Copy All</button>
                              </div>
                              <p className="text-xs text-brand-secondary/50 mb-4 italic">Add these records to your domain registrar (e.g., GoDaddy, Namecheap) to verify ownership.</p>
                              
                              <div className="space-y-3">
                                 <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm group hover:border-brand-accent/30 transition-all">
                                    <div className="w-1/4">
                                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Type</span>
                                       <span className="font-mono text-xs font-bold text-brand-primary">A</span>
                                    </div>
                                    <div className="w-1/4">
                                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Name</span>
                                       <span className="font-mono text-xs text-brand-primary">@</span>
                                    </div>
                                    <div className="flex-1">
                                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Value</span>
                                       <span className="font-mono text-xs text-brand-primary">76.76.21.21</span>
                                    </div>
                                 </div>
                                 <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm group hover:border-brand-accent/30 transition-all">
                                    <div className="w-1/4">
                                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Type</span>
                                       <span className="font-mono text-xs font-bold text-brand-primary">CNAME</span>
                                    </div>
                                    <div className="w-1/4">
                                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Name</span>
                                       <span className="font-mono text-xs text-brand-primary">www</span>
                                    </div>
                                    <div className="flex-1">
                                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Value</span>
                                       <span className="font-mono text-xs text-brand-primary">cname.locallaunch.app</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>

                  {/* Right Column: Deployment & Status */}
                  <div className="space-y-6">
                     {/* Go Live Card */}
                     <div className="bg-slate-900 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                           <Rocket size={120} />
                        </div>
                        <div className="relative z-10">
                           <h3 className="font-bold text-2xl mb-2">Ready to Go Live?</h3>
                           <p className="text-slate-400 text-sm mb-6">Once you've connected your domain and approved the design, click here to publish your site to the world.</p>
                           
                           <button 
                              onClick={handlePublishWebsite}
                              disabled={isPublishing}
                              className="w-full py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                           >
                              {isPublishing ? <Loader2 size={20} className="animate-spin" /> : <Rocket size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />} 
                              {isPublishing ? 'Publishing...' : userProject?.status === 'live' ? 'Update Website' : 'Publish Website'}
                           </button>

                           {userProject?.liveUrl && (
                              <a 
                                 href={userProject.liveUrl} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
                              >
                                 View Live Site <ExternalLink size={12} />
                              </a>
                           )}
                        </div>
                     </div>

                     {/* Deployment Status */}
                     <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sm:p-8">
                        <h3 className="font-bold text-lg text-brand-primary mb-4">Deployment Status</h3>
                        <div className="space-y-6">
                           <div className="relative pl-8 border-l-2 border-slate-100 space-y-8">
                              {/* Step 1 */}
                              <div className="relative">
                                 <div className={`absolute -left-[33px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${userProject ? 'bg-green-500' : 'bg-slate-200'}`}></div>
                                 <p className="text-sm font-bold text-brand-primary">Project Created</p>
                                 <p className="text-xs text-brand-secondary/50">Initial setup and configuration complete.</p>
                              </div>
                              {/* Step 2 */}
                              <div className="relative">
                                 <div className={`absolute -left-[33px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${userProject?.domain ? 'bg-green-500' : 'bg-slate-200'}`}></div>
                                 <p className="text-sm font-bold text-brand-primary">Domain Connected</p>
                                 <p className="text-xs text-brand-secondary/50">Custom domain or subdomain assigned.</p>
                              </div>
                              {/* Step 3 */}
                              <div className="relative">
                                 <div className={`absolute -left-[33px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${userProject?.status === 'live' ? 'bg-green-500' : isPublishing ? 'bg-brand-accent animate-pulse' : 'bg-slate-200'}`}></div>
                                 <p className="text-sm font-bold text-brand-primary">Production Build</p>
                                 <p className="text-xs text-brand-secondary/50">Optimizing assets and deploying to CDN.</p>
                              </div>
                              {/* Step 4 */}
                              <div className="relative">
                                 <div className={`absolute -left-[33px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${userProject?.status === 'live' ? 'bg-green-500' : 'bg-slate-200'}`}></div>
                                 <p className="text-sm font-bold text-brand-primary">SSL Certificate</p>
                                 <p className="text-xs text-brand-secondary/50">Securing your site with automatic HTTPS.</p>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Quick Help */}
                     <div className="p-6 bg-brand-accent/5 rounded-2xl border border-brand-accent/10">
                        <div className="flex items-center gap-2 text-brand-accent mb-2">
                           <AlertCircle size={16} />
                           <span className="text-sm font-bold">Need help?</span>
                        </div>
                        <p className="text-xs text-brand-secondary/70 leading-relaxed">
                           DNS changes can take up to 24-48 hours to propagate worldwide. If your site isn't showing up immediately, don't worry!
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         );

      case 'billing':
         return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-6 sm:mb-8">
                   <h2 className="text-2xl font-bold text-brand-primary">Billing & Plans</h2>
                   <p className="text-brand-secondary/50">Manage your subscription and invoices.</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
                   {/* Current Plan Info */}
                   <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <p className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">Current Plan</p>
                      <h3 className="text-lg sm:text-xl font-bold text-brand-primary mb-1 truncate">{currentPlan.name}</h3>
                      <p className="text-sm text-slate-500">Subscription: <span className="font-bold text-brand-primary">${currentPlan.price}/mo</span></p>
                   </div>

                   {/* Maintenance Status */}
                   <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <p className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">Status</p>
                      <h3 className="text-lg sm:text-xl font-bold text-green-600 mb-1">Active</h3>
                      <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1">
                         <span className="w-2 h-2 rounded-full bg-green-500"></span> Hosting & Maintenance Included
                      </p>
                   </div>

                   {/* Payment Method */}
                   <div className="bg-slate-900 p-5 sm:p-6 rounded-2xl text-white shadow-xl border border-slate-800 sm:col-span-2 lg:col-span-1">
                       <div className="flex justify-between items-start mb-4">
                          <CardIcon size={20} className="text-slate-400" />
                          <button className="text-[10px] font-bold uppercase tracking-wider hover:text-white text-slate-500 transition-colors">Edit</button>
                       </div>
                       <p className="font-mono text-base sm:text-lg mb-1">•••• •••• •••• 4242</p>
                       <div className="flex justify-between text-[10px] sm:text-xs text-slate-500">
                          <span>Visa ending in 4242</span>
                          <span>Exp 12/25</span>
                       </div>
                   </div>
                </div>

                <div className="mb-10 sm:mb-12">
                   <h3 className="text-lg sm:text-xl font-bold text-brand-primary mb-4 sm:mb-6">Change Project Plan</h3>
                   <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {PROJECT_PLANS.map((plan) => (
                         <div 
                           key={plan.id} 
                           className={`relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col ${
                             selectedPlanId === plan.id 
                               ? 'bg-brand-accent/5 border-brand-accent shadow-xl shadow-brand-accent/10 ring-1 ring-brand-accent' 
                               : 'bg-white border-slate-200 hover:border-brand-accent/50 shadow-sm'
                           }`}
                         >
                            {selectedPlanId === plan.id && (
                               <div className="absolute top-0 right-0 bg-brand-accent text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl uppercase tracking-wider flex items-center gap-1">
                                  <Check size={10} /> Selected
                               </div>
                            )}
                            
                            <div className="mb-4">
                               <h4 className="text-base sm:text-lg font-bold text-brand-primary">{plan.name}</h4>
                               <div className="flex items-baseline gap-1">
                                  <p className="text-xl sm:text-2xl font-extrabold text-brand-primary">${plan.price}</p>
                                  <span className="text-xs sm:text-sm font-medium text-slate-500">{plan.period}</span>
                               </div>
                               <p className="text-[10px] font-bold text-green-600 mt-1 flex items-center gap-1 uppercase tracking-wide">
                                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                  No Build Cost
                               </p>
                               <p className="text-xs text-slate-500 mt-2 line-clamp-2">{plan.description}</p>
                            </div>
                            <div className="space-y-2 mb-6 flex-1">
                               {plan.features.slice(0, 4).map((feature, i) => (
                                  <div key={i} className="flex items-start gap-2 text-[11px] sm:text-xs">
                                     <Check size={14} className="text-brand-accent mt-0.5 shrink-0" />
                                     <span className="text-slate-600">{feature}</span>
                                  </div>
                               ))}
                            </div>

                            <button 
                              onClick={() => onPlanChange(plan.id)}
                              disabled={selectedPlanId === plan.id}
                              className={`w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors ${
                                selectedPlanId === plan.id 
                                   ? 'bg-brand-accent text-brand-bg cursor-default'
                                   : 'bg-white/5 border border-white/10 text-white hover:border-brand-accent hover:text-brand-accent'
                              }`}
                            >
                               {selectedPlanId === plan.id ? 'Current Plan' : 'Select Plan'}
                            </button>
                         </div>
                      ))}
                   </div>
                </div>

                <div className="glass-card rounded-2xl sm:rounded-[2rem] border border-white/10 shadow-xl overflow-hidden">
                   <div className="p-5 sm:p-6 border-b border-white/10">
                      <h3 className="font-bold text-base sm:text-lg text-white">Invoices</h3>
                   </div>
                   <div className="overflow-x-auto">
                      {/* Mobile Card View for Invoices */}
                      <div className="sm:hidden divide-y divide-white/10">
                         {INVOICES.map((inv) => (
                            <div key={inv.id} className="p-4 space-y-3">
                               <div className="flex justify-between items-start">
                                  <div>
                                     <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{inv.id}</p>
                                     <h4 className="font-bold text-white text-sm">{inv.description}</h4>
                                  </div>
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                     inv.status === 'Paid' || inv.status === 'Active' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                                  }`}>
                                     {inv.status}
                                  </span>
                               </div>
                               <div className="flex justify-between items-center">
                                  <div className="text-sm font-bold text-white">{inv.amount}</div>
                                  {inv.status === 'Pending' ? (
                                     <button 
                                       onClick={handlePayment}
                                       disabled={isProcessingPayment}
                                       className="px-4 py-1.5 bg-brand-accent text-brand-bg text-[10px] font-bold rounded-lg hover:bg-white transition-colors flex items-center gap-2"
                                     >
                                        {isProcessingPayment ? <Loader2 size={12} className="animate-spin" /> : null}
                                        Pay Now
                                     </button>
                                  ) : (
                                     <button className="p-1.5 text-white/40 hover:text-brand-accent">
                                        <Download size={16} />
                                     </button>
                                  )}
                               </div>
                            </div>
                         ))}
                      </div>
                      
                      {/* Desktop Table View */}
                      <table className="hidden sm:table w-full text-left border-collapse min-w-[600px]">
                         <thead>
                            <tr className="bg-white/5 text-white/40 text-[10px] uppercase tracking-wider">
                               <th className="p-6 font-semibold">Invoice ID</th>
                               <th className="p-6 font-semibold">Date</th>
                               <th className="p-6 font-semibold">Description</th>
                               <th className="p-6 font-semibold">Amount</th>
                               <th className="p-6 font-semibold">Status</th>
                               <th className="p-6 font-semibold text-right">Actions</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-white/10">
                            {INVOICES.map((inv) => (
                               <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                                  <td className="p-6 font-mono text-sm font-bold text-white/80">{inv.id}</td>
                                  <td className="p-6 text-white/60 text-sm">{inv.date}</td>
                                  <td className="p-6 text-white font-medium">{inv.description}</td>
                                  <td className="p-6 font-bold text-white">{inv.amount}</td>
                                  <td className="p-6">
                                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                                        inv.status === 'Paid' || inv.status === 'Active' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                                     }`}>
                                        {inv.status}
                                     </span>
                                  </td>
                                  <td className="p-6 text-right">
                                     {inv.status === 'Pending' ? (
                                        <button 
                                          onClick={handlePayment}
                                          disabled={isProcessingPayment}
                                          className="px-4 py-2 bg-brand-accent text-brand-bg text-xs font-bold rounded-lg hover:bg-white transition-colors flex items-center gap-2"
                                        >
                                           {isProcessingPayment ? <Loader2 size={12} className="animate-spin" /> : null}
                                           Pay Now
                                        </button>
                                     ) : (
                                        <button className="text-white/40 hover:text-brand-accent transition-colors">
                                           <Download size={18} />
                                        </button>
                                     )}
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
            </div>
         );

      case 'settings':
         return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="mb-8">
                   <h2 className="text-2xl font-bold text-white">Account Settings</h2>
                   <p className="text-white/60">Manage your profile and preferences.</p>
                </div>

                <div className="flex gap-6 flex-col md:flex-row">
                    {/* Settings Nav - Horizontal Scroll on Mobile */}
                    <div className="w-full md:w-64 flex flex-row md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-hide snap-x">
                      {[
                        { id: 'profile', label: 'Profile', icon: User },
                        { id: 'security', label: 'Security', icon: Shield },
                        { id: 'notifications', label: 'Alerts', icon: Bell },
                      ].map((item) => (
                         <button
                           key={item.id}
                           onClick={() => setSettingsTab(item.id)}
                           className={`flex items-center gap-2 sm:gap-3 px-4 py-2.5 sm:py-3 rounded-xl text-left font-bold transition-all whitespace-nowrap snap-start shrink-0 ${
                              settingsTab === item.id 
                              ? 'bg-brand-accent/10 text-brand-accent border border-brand-accent/30' 
                              : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                           }`}
                         >
                             <item.icon size={16} className="sm:w-[18px]" />
                            {item.label}
                         </button>
                      ))}
                   </div>

                   {/* Settings Content */}
                   <div className="flex-1 glass-card rounded-2xl border border-white/10 p-5 sm:p-8 shadow-xl">
                      {settingsTab === 'profile' && (
                         <div className="space-y-6">
                            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">Personal Information</h3>
                             <div className="flex items-center gap-4 sm:gap-6">
                               <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full flex items-center justify-center text-white/40 text-xl sm:text-2xl font-bold">
                                  JD
                               </div>
                               <button className="px-3 sm:px-4 py-1.5 sm:py-2 border border-white/20 rounded-xl text-xs sm:text-sm font-bold text-white/80 hover:bg-white/10 transition-colors">Change Photo</button>
                            </div>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                               <div className="space-y-2">
                                   <label className="text-xs sm:text-sm font-bold text-white/80">First Name</label>
                                   <input type="text" defaultValue="Jane" className="w-full px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:border-brand-accent outline-none text-sm text-white placeholder-white/30" />
                               </div>
                                <div className="space-y-1 sm:space-y-2">
                                   <label className="text-xs sm:text-sm font-bold text-white/80">Last Name</label>
                                   <input type="text" defaultValue="Doe" className="w-full px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:border-brand-accent outline-none text-sm text-white placeholder-white/30" />
                                </div>
                                <div className="space-y-1 sm:space-y-2 sm:col-span-2">
                                   <label className="text-xs sm:text-sm font-bold text-white/80">Email Address</label>
                                   <input type="email" defaultValue="jane@example.com" className="w-full px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:border-brand-accent outline-none text-sm text-white placeholder-white/30" />
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end">
                               <button className="px-6 py-2 bg-brand-accent text-brand-bg font-bold rounded-xl hover:bg-white transition-colors">Save Changes</button>
                            </div>
                         </div>
                      )}

                      {settingsTab === 'security' && (
                         <div className="space-y-6">
                            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">Password & Security</h3>
                             <div className="space-y-3 sm:space-y-4">
                                <div className="space-y-1 sm:space-y-2">
                                   <label className="text-xs sm:text-sm font-bold text-white/80">Current Password</label>
                                   <input type="password" placeholder="••••••••" className="w-full px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:border-brand-accent outline-none text-sm text-white placeholder-white/30" />
                                </div>
                                <div className="space-y-1 sm:space-y-2">
                                   <label className="text-xs sm:text-sm font-bold text-white/80">New Password</label>
                                   <input type="password" placeholder="New strong password" className="w-full px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:border-brand-accent outline-none text-sm text-white placeholder-white/30" />
                                </div>
                                <div className="space-y-1 sm:space-y-2">
                                   <label className="text-xs sm:text-sm font-bold text-white/80">Confirm Password</label>
                                   <input type="password" placeholder="Confirm new password" className="w-full px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:border-brand-accent outline-none text-sm text-white placeholder-white/30" />
                                </div>
                             </div>
                            <div className="pt-4 flex justify-end">
                               <button className="px-6 py-2 bg-brand-accent text-brand-bg font-bold rounded-xl hover:bg-white transition-colors">Update Password</button>
                            </div>
                         </div>
                      )}

                      {settingsTab === 'notifications' && (
                         <div className="space-y-6">
                            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">Notification Preferences</h3>
                            <div className="space-y-4">
                               <div className="flex items-center justify-between p-4 border border-white/10 rounded-xl bg-white/5">
                                  <div>
                                     <h4 className="font-bold text-white">Email Notifications</h4>
                                     <p className="text-sm text-white/60">Receive updates about your project via email.</p>
                                  </div>
                                  <button 
                                    onClick={() => setNotifications({...notifications, email: !notifications.email})}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${notifications.email ? 'bg-brand-accent' : 'bg-white/20'}`}
                                  >
                                     <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${notifications.email ? 'left-7' : 'left-1'}`}></div>
                                  </button>
                               </div>
                               <div className="flex items-center justify-between p-4 border border-white/10 rounded-xl bg-white/5">
                                  <div>
                                     <h4 className="font-bold text-white">Push Notifications</h4>
                                     <p className="text-sm text-white/60">Receive real-time alerts on your dashboard.</p>
                                  </div>
                                  <button 
                                    onClick={() => setNotifications({...notifications, push: !notifications.push})}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${notifications.push ? 'bg-brand-accent' : 'bg-white/20'}`}
                                  >
                                     <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${notifications.push ? 'left-7' : 'left-1'}`}></div>
                                  </button>
                               </div>
                               <div className="flex items-center justify-between p-4 border border-white/10 rounded-xl bg-white/5">
                                  <div>
                                     <h4 className="font-bold text-white">Marketing Updates</h4>
                                     <p className="text-sm text-white/60">Receive news about new features and offers.</p>
                                  </div>
                                  <button 
                                    onClick={() => setNotifications({...notifications, updates: !notifications.updates})}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${notifications.updates ? 'bg-brand-accent' : 'bg-white/20'}`}
                                  >
                                     <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${notifications.updates ? 'left-7' : 'left-1'}`}></div>
                                  </button>
                               </div>
                            </div>
                         </div>
                      )}
                   </div>
                </div>
            </div>
         );

      default:
        return <div>Tab content not found.</div>;
    }
  };

  if (activeTab === 'editor' && editorMode === 'advanced') {
    return (
      <div className="fixed inset-0 z-[100] bg-white">
        <VisualBuilder 
          initialSchema={editorContent.builderSchema}
          onChange={(schema) => setEditorContent(prev => ({ ...prev, builderSchema: schema }))}
          onExit={() => setEditorMode('simple')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg flex font-sans text-brand-primary">
      
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 glass-nav h-screen sticky top-0 border-r border-black/5 shrink-0">
        <div className="p-8">
           <div className="flex items-center gap-3 text-brand-primary mb-10">
              <div className="w-10 h-10 brand-gradient-bg rounded-xl flex items-center justify-center shadow-lg shadow-brand-accent/20">
                 <span className="font-bold text-lg text-white">LP</span>
              </div>
              <span className="font-bold text-xl tracking-tight">ClientPortal</span>
           </div>
           
           <nav className="space-y-2">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id 
                      ? 'brand-gradient-bg text-white font-medium shadow-lg shadow-brand-accent/20' 
                      : 'text-brand-secondary hover:bg-black/5 hover:text-brand-primary'
                  }`}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}
           </nav>
        </div>

        <div className="mt-auto p-8 border-t border-black/5">
           <button 
             onClick={() => onNavigate('home')}
             className="flex items-center gap-3 text-brand-secondary hover:text-brand-primary transition-colors"
           >
              <LogOut size={20} />
              Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        
        {/* Top Header */}
        <header className="glass-nav border-b border-black/5 px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-30">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 lg:hidden">
                 <div className="w-8 h-8 brand-gradient-bg rounded-lg flex items-center justify-center text-white">
                    <span className="font-bold text-sm">LP</span>
                 </div>
                 <span className="font-bold text-base text-brand-primary tracking-tight">LocalPulse</span>
              </div>

              <div className="hidden lg:flex items-center gap-4 text-sm text-brand-secondary">
                 <span className="hover:text-brand-primary cursor-pointer transition-colors">Projects</span>
                 <ChevronRight size={14} />
                 <span className="font-medium text-brand-primary">Acme Inc. Redesign</span>
              </div>

              <div className="flex items-center gap-4 sm:gap-6">
                 <div className="relative hidden sm:block">
                    <Search size={18} className="text-brand-secondary/30" />
                 </div>
                 <div className="relative cursor-pointer">
                    <Bell size={18} className="text-brand-secondary hover:text-brand-accent transition-colors" />
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
                 </div>
                 <div className="flex items-center gap-2 sm:gap-3 pl-3 sm:pl-6 border-l border-black/5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent font-bold border border-black/5 shadow-sm text-xs sm:text-sm">
                       JD
                    </div>
                    <div className="hidden md:block">
                       <p className="text-sm font-bold text-brand-primary leading-none">Jane Doe</p>
                       <p className="text-xs text-brand-secondary mt-1">Acme Inc.</p>
                    </div>
                    <button 
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                      className="lg:hidden p-1.5 text-brand-secondary hover:bg-black/5 rounded-lg transition-colors"
                    >
                       <Menu size={20} />
                    </button>
                 </div>
              </div>
           </div>
        </header>
        
        {/* Full-Screen Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
             <motion.div 
               initial={{ opacity: 0, y: '-100%' }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: '-100%' }}
               transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
               className="fixed inset-0 z-50 bg-white text-brand-secondary overflow-y-auto lg:hidden flex flex-col pt-24 pb-8 px-6"
             >
                {/* Close Button */}
                <button 
                   onClick={() => setIsMobileMenuOpen(false)}
                   className="absolute top-6 right-6 p-2 text-brand-secondary/40 hover:text-brand-primary bg-black/5 rounded-full"
                >
                  <X size={24} />
                </button>

                {/* Massive Compelling Master Heading */}
                <div className="mb-10">
                   <h2 className="text-5xl font-black text-brand-primary leading-[1.1] tracking-tighter mb-4">
                     Launch your <br/>
                     <span className="brand-gradient-text">dream site</span> <br/>
                     today.
                   </h2>
                   <p className="text-lg text-brand-secondary/60 font-medium max-w-sm">
                     Join 100+ local founders growing their business online with a custom, high-converting website.
                   </p>
                </div>

                {projectStatus === 'setup' && (
                  <div className="mb-10">
                    <button 
                      onClick={() => { setActiveTab('billing'); setIsMobileMenuOpen(false); }}
                      className="w-full flex items-center justify-center gap-2 py-4 brand-gradient-bg text-white text-lg font-bold rounded-2xl transition-all shadow-xl shadow-brand-accent/20 hover:scale-[1.02]"
                    >
                      <Rocket size={20} /> Complete Setup Now
                    </button>
                  </div>
                )}

                <nav className="flex flex-col gap-4 mb-10">
                   {TABS.map((tab) => (
                     <button
                       key={tab.id}
                       onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }}
                       className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all text-2xl font-bold group ${
                         activeTab === tab.id 
                           ? 'brand-gradient-bg text-white' 
                           : 'text-brand-secondary hover:text-brand-primary hover:bg-black/5'
                       }`}
                     >
                       <div className="flex items-center gap-4">
                         <tab.icon size={24} className={activeTab === tab.id ? 'text-white' : 'text-brand-secondary/40 group-hover:text-brand-accent'} />
                         {tab.label}
                       </div>
                       <ChevronRight size={24} className={activeTab === tab.id ? 'text-white' : 'text-brand-secondary/20 group-hover:text-brand-accent'} />
                     </button>
                   ))}
                </nav>
                
                <div className="mt-auto">
                   <button 
                     onClick={() => onNavigate('home')}
                     className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-black/5 hover:bg-black/10 text-red-500 hover:text-red-600 font-bold text-lg transition-colors border border-black/5"
                   >
                      <LogOut size={20} />
                      Sign Out
                   </button>
                </div>
             </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Content Area */}
        <div className="p-3 sm:p-6 md:p-10 max-w-7xl mx-auto w-full pb-24 lg:pb-10">
           
           {!userProject ? (
             <div className="flex flex-col items-center justify-center h-[60vh] text-center">
               <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                 <Rocket size={40} className="text-brand-600" />
               </div>
               <h2 className="text-3xl font-bold text-slate-900 mb-4">Welcome to LocalPulse</h2>
               <p className="text-slate-500 max-w-md mb-8">
                 You don't have any active projects yet. Start a new project to get your digital growth engine running.
               </p>
               <button 
                 onClick={() => onNavigate('start-project')}
                 className="px-8 py-4 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/20"
               >
                 Start a Project
               </button>
             </div>
           ) : (
             <>
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="mb-6 sm:mb-8"
               >
                  {activeTab === 'overview' && (
                    <>
                       <h1 className="text-lg sm:text-3xl font-bold text-slate-900 mb-0.5 sm:mb-2">Project Overview</h1>
                       <p className="text-[9px] sm:text-base text-slate-500">Welcome back, {user?.displayName || 'Client'}.</p>
                    </>
                  )}
               </motion.div>

               {renderContent()}
             </>
           )}

        </div>

        {/* Bottom Navigation - Mobile Only */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 glass-nav border-t border-black/5 px-1 py-1.5 z-50 flex items-center justify-between shadow-2xl shadow-black/5 rounded-t-3xl">
           {[
              { id: 'overview', label: 'Home', icon: LayoutDashboard },
              { id: 'editor', label: 'Editor', icon: Edit3 },
              { id: 'plus', label: '', icon: Plus, special: true },
              { id: 'messages', label: 'Chat', icon: MessageSquare },
              { id: 'settings', label: 'Menu', icon: User },
           ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => tab.id === 'plus' ? setIsMobileMenuOpen(true) : setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 px-2 py-1 rounded-xl transition-all relative ${
                  tab.special 
                    ? 'brand-gradient-bg text-white -mt-10 w-14 h-14 rounded-full shadow-xl shadow-brand-accent/30 flex items-center justify-center border-4 border-white'
                    : activeTab === tab.id 
                      ? 'text-brand-accent' 
                      : 'text-brand-secondary/40'
                }`}
              >
                <tab.icon size={tab.special ? 24 : 20} strokeWidth={activeTab === tab.id || tab.special ? 2.5 : 2} />
                {!tab.special && <span className="text-[9px] font-bold uppercase tracking-tight">{tab.label}</span>}
                {activeTab === tab.id && !tab.special && (
                  <motion.div 
                    layoutId="activeTabDot"
                    className="w-1 h-1 bg-brand-accent rounded-full absolute -bottom-0.5"
                  />
                )}
              </button>
           ))}
        </div>

        {/* Document Viewer Modal */}
        <AnimatePresence>
            {viewingDoc && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={() => setViewingDoc(null)}
                >
                    <motion.div 
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 20 }}
                        className="glass-card w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="px-4 sm:px-6 py-4 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-lg border border-white/20 shrink-0">
                                    <FileText size={20} className="text-white/60" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white truncate max-w-[200px] sm:max-w-none">{viewingDoc.title}</h3>
                                    <p className="text-xs text-white/50">Last updated: Oct 05, 2024</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 self-end sm:self-auto">
                                <button onClick={() => window.alert("Printing...")} className="p-2 hover:bg-white/10 rounded-lg text-white/60 transition-colors">
                                    <Printer size={20} />
                                </button>
                                <button onClick={() => window.alert("Downloading...")} className="p-2 hover:bg-white/10 rounded-lg text-white/60 transition-colors">
                                    <Download size={20} />
                                </button>
                                <button onClick={() => setViewingDoc(null)} className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-white/60 transition-colors ml-2">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Document Content Scroll Area */}
                        <div className="flex-1 overflow-y-auto bg-black/20 p-4 sm:p-8">
                            <div className="max-w-3xl mx-auto bg-white/5 min-h-full shadow-xl p-6 sm:p-12 md:p-16 text-white/80 font-serif leading-relaxed border border-white/10 rounded-xl">
                                {/* Letterhead */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 border-b-2 border-white/20 pb-8">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-brand-accent text-brand-bg flex items-center justify-center font-sans font-bold rounded">LP</div>
                                        <span className="font-sans font-bold text-xl tracking-tight text-white">LocalPulse</span>
                                    </div>
                                    <div className="text-right text-sm font-sans text-white/50">
                                        <p>123 Market St</p>
                                        <p>Design City, DC 20002</p>
                                        <p>www.localpulse.com</p>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h1 className="text-3xl font-bold mb-2 font-sans text-white">{viewingDoc.title}</h1>
                                    <p className="text-white/50 font-sans">Reference: #LP-2024-8932</p>
                                </div>

                                {/* Dynamic Content based on Type */}
                                {viewingDoc.type === 'contract' ? (
                                    <div className="space-y-6">
                                        <p className="mb-6">
                                            This Service Agreement ("Agreement") is entered into as of October 5, 2024, by and between <strong>LocalPulse Agency</strong> ("Provider") and <strong>Acme Inc.</strong> ("Client").
                                        </p>
                                        
                                        <div>
                                            <h3 className="font-bold font-sans uppercase text-sm mb-2 text-white/40">1. Scope of Work</h3>
                                            <p>The Provider agrees to deliver the web design, hosting, and maintenance services as outlined in the "{currentPlan.name}" subscription. This includes the initial design and build, ongoing hosting, and monthly content updates.</p>
                                        </div>

                                        <div>
                                            <h3 className="font-bold font-sans uppercase text-sm mb-2 text-white/40">2. Payment Terms</h3>
                                            <p>The monthly subscription fee is <span className="font-bold">${currentPlan.price}.00</span>. The first month's payment of <span className="font-bold">${currentPlan.price}.00</span> is required to commence work. Subsequent payments will be billed monthly.</p>
                                        </div>

                                        <div>
                                            <h3 className="font-bold font-sans uppercase text-sm mb-2 text-white/40">3. Timeline</h3>
                                            <p>Estimated project completion is 4-6 weeks from the receipt of all necessary assets and content from the Client.</p>
                                        </div>

                                        <div>
                                            <h3 className="font-bold font-sans uppercase text-sm mb-2 text-white/40">4. Intellectual Property</h3>
                                            <p>Upon full payment, the Client shall own all rights, title, and interest in the final website design and content.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-bold font-sans uppercase text-sm mb-2 text-white/40">Executive Summary</h3>
                                            <p>LocalPulse proposes to redesign the Acme Inc. website to improve user engagement, modernize the brand aesthetic, and increase lead generation through optimized conversion paths.</p>
                                        </div>

                                        <div>
                                            <h3 className="font-bold font-sans uppercase text-sm mb-2 text-white/40">Deliverables</h3>
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li>Custom UI/UX Design for 5 core pages</li>
                                                <li>Mobile-first responsive development</li>
                                                <li>CMS Integration for easy content updates</li>
                                                <li>Basic On-page SEO implementation</li>
                                                <li>Contact form integration with email notifications</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-bold font-sans uppercase text-sm mb-2 text-white/40">Investment</h3>
                                            <p>The selected package is the <strong>{currentPlan.name}</strong> at a total cost of <strong>${currentPlan.price}</strong>.</p>
                                        </div>
                                    </div>
                                )}

                                {/* Footer Signature Area Mock */}
                                <div className="mt-16 pt-8 border-t border-white/20 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                                    <div>
                                        <div className="h-12 border-b border-white/40 mb-2 flex items-end pb-1">
                                            <span className="font-cursive text-2xl text-brand-300">Jane Doe</span>
                                        </div>
                                        <p className="text-xs uppercase font-bold text-white/40">Client Signature</p>
                                    </div>
                                    <div>
                                        <div className="h-12 border-b border-white/40 mb-2 flex items-end pb-1">
                                            <span className="font-cursive text-2xl text-white">Alex Rivera</span>
                                        </div>
                                        <p className="text-xs uppercase font-bold text-white/40">LocalPulse Representative</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

      </main>
    </div>
  );
};

