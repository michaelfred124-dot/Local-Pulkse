import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Briefcase, 
  Globe, 
  LifeBuoy, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search
} from 'lucide-react';
import { Page } from '../types';
import AdminOverview from './admin/AdminOverview';
import AdminProjects from './admin/AdminProjects';
import AdminWebManagement from './admin/AdminWebManagement';
import AdminSupport from './admin/AdminSupport';
import AdminSettings from './admin/AdminSettings';

interface AdminDashboardProps {
  onNavigate: (page: Page) => void;
}

type AdminTab = 'overview' | 'projects' | 'web' | 'support' | 'settings';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'web', label: 'Web Management', icon: Globe },
    { id: 'support', label: 'Support', icon: LifeBuoy },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview />;
      case 'projects':
        return <AdminProjects />;
      case 'web':
        return <AdminWebManagement />;
      case 'support':
        return <AdminSupport />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 lg:hidden"
            >
              <div className="h-full flex flex-col">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold">
                      L
                    </div>
                    <span className="font-bold text-xl text-slate-900">LocalPulse</span>
                  </div>
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                  <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Menu
                  </p>
                  {sidebarItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as AdminTab);
                        setIsSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                        ${activeTab === item.id 
                          ? 'bg-brand-50 text-brand-600' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                      `}
                    >
                      <item.icon size={20} />
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="p-4 border-t border-slate-100">
                  <button 
                    onClick={() => onNavigate('login')}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={20} />
                    Sign Out
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 shrink-0">
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold">
                L
              </div>
              <span className="font-bold text-xl text-slate-900">LocalPulse</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Menu
            </p>
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as AdminTab)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                  ${activeTab === item.id 
                    ? 'bg-brand-50 text-brand-600' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                `}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </div>

          <div className="p-4 border-t border-slate-100">
            <button 
              onClick={() => onNavigate('login')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-8">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg"
          >
            <Menu size={20} />
          </button>

          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Search anything..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-brand-500 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-900">Admin User</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold border-2 border-white shadow-sm">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
