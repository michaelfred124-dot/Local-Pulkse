import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal, Plus, Search, Filter, ExternalLink, CheckCircle, Clock } from 'lucide-react';
import { collection, query, getDocs, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'projects'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching projects:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'launch': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'revisions': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'design': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'discovery': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'payment-pending': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const projectRef = doc(db, 'projects', id);
      await updateDoc(projectRef, { 
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error updating project status:", error);
      alert("Failed to update status.");
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-900">Client Projects</h2>
        <button className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors">
          <Plus size={18} /> New Project
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search projects by client or business name..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
          <Filter size={18} /> Filter
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 min-w-[800px]">
            <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Client / Business</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Domain</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">No projects found.</td>
                </tr>
              ) : projects.map((project) => (
                <motion.tr 
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: '#f8fafc' }}
                  className="group"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{project.name || 'Untitled Project'}</div>
                    <div className="text-xs text-slate-400">{project.clientId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={project.status || 'discovery'}
                      onChange={(e) => handleStatusChange(project.id, e.target.value)}
                      className={`text-xs font-bold px-3 py-1 rounded-full border outline-none cursor-pointer ${getStatusColor(project.status || 'discovery')}`}
                    >
                      <option value="payment-pending">Payment Pending</option>
                      <option value="discovery">Discovery</option>
                      <option value="design">Design</option>
                      <option value="revisions">Revisions</option>
                      <option value="launch">Launch</option>
                      <option value="live">Live</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    {project.domain ? (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-slate-700">{project.domain}</span>
                        {project.domainStatus === 'connected' ? (
                          <CheckCircle size={14} className="text-emerald-500" />
                        ) : (
                          <Clock size={14} className="text-amber-500" />
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-slate-400">Not set</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'Unknown'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600">
                            <ExternalLink size={18} />
                        </button>
                        <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProjects;
