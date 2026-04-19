import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Globe, Settings, Edit3, Loader2, Folder } from 'lucide-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from './AuthContext';
import { Page } from '../types';

interface MySitesProps {
  onNavigate: (page: Page) => void;
  onSelectProject: (projectId: string) => void;
}

export const MySites: React.FC<MySitesProps> = ({ onNavigate, onSelectProject }) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'projects'), where('clientId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'projects');
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <Loader2 className="animate-spin text-brand-accent" size={48} />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto pt-32 min-h-screen bg-white text-brand-primary">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-brand-primary mb-2">My Sites</h1>
          <div className="flex items-center gap-4">
            <p className="text-brand-secondary">Manage and edit your digital presence.</p>
            <button 
              onClick={() => onNavigate('sandbox')}
              className="text-xs font-bold text-brand-accent hover:underline flex items-center gap-1"
            >
              Enter Sandbox Mode →
            </button>
          </div>
        </div>
        <button 
          onClick={() => onNavigate('start-project')}
          className="flex items-center gap-2 px-6 py-3 brand-gradient-bg text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-brand-accent/20"
        >
          <Plus size={20} /> Create New Site
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <Folder size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-brand-primary mb-2">No sites yet</h2>
          <p className="text-brand-secondary mb-8">Get started by creating your first website.</p>
          <button 
            onClick={() => onNavigate('start-project')}
            className="px-8 py-3 brand-gradient-bg text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-brand-accent/20"
          >
            Create Your First Site
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-black/5 hover:border-brand-accent/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors">
                  <Globe size={24} />
                </div>
                <div className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-[10px] font-bold text-brand-secondary uppercase tracking-widest">
                  {project.status || 'Active'}
                </div>
              </div>

              <h3 className="text-xl font-bold text-brand-primary mb-2 group-hover:text-brand-accent transition-colors">{project.name || 'Untitled Project'}</h3>
              <p className="text-brand-secondary/60 mb-8 text-sm font-mono">{project.domain || 'no-domain-connected.com'}</p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    console.log("Selecting project:", project.id);
                    onSelectProject(project.id);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-100 text-brand-primary rounded-lg font-bold text-sm hover:bg-gray-200 border border-gray-200 transition-all"
                >
                  <Edit3 size={16} /> Edit
                </button>
                <button 
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-brand-accent/10 text-brand-accent rounded-lg font-bold text-sm hover:bg-brand-accent hover:text-white transition-all"
                >
                  <Globe size={16} /> View
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
