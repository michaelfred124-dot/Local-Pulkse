import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Bell, Save } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    newProject: true,
    newTicket: true,
    payment: true
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Admin Settings</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-1">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: Bell },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-colors ${
                activeTab === item.id 
                ? 'bg-brand-50 text-brand-700 border border-brand-200' 
                : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Admin Profile</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Name</label>
                  <input type="text" defaultValue="Admin User" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-brand-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email</label>
                  <input type="email" defaultValue="admin@localpulse.com" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-brand-500 outline-none" />
                </div>
              </div>
              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-6 py-2 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition-colors">
                  <Save size={18} /> Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-brand-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">New Password</label>
                  <input type="password" placeholder="New strong password" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-brand-500 outline-none" />
                </div>
              </div>
              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-6 py-2 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition-colors">
                  <Save size={18} /> Update Password
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <h4 className="font-bold text-slate-900">New Project Alerts</h4>
                    <p className="text-sm text-slate-500">Get notified when a new lead comes in.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={notifications.newProject} 
                    onChange={() => setNotifications({...notifications, newProject: !notifications.newProject})}
                    className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500" 
                  />
                </div>
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <h4 className="font-bold text-slate-900">Support Tickets</h4>
                    <p className="text-sm text-slate-500">Get notified of new client messages.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={notifications.newTicket} 
                    onChange={() => setNotifications({...notifications, newTicket: !notifications.newTicket})}
                    className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500" 
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
