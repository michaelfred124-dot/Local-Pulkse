import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, Activity, TrendingUp } from 'lucide-react';
import { collection, query, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

const AdminOverview: React.FC = () => {
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

  const activeProjects = projects.filter(p => p.status !== 'live' && p.status !== 'discovery').length;
  // Simplified revenue calculation for demo purposes since we don't have a budget field yet
  const totalRevenue = projects.length * 1500; 
  const newClients = projects.length;

  const stats = [
    { label: 'Estimated Value', value: `$${totalRevenue.toLocaleString()}`, change: '+20.1%', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Active Builds', value: activeProjects.toString(), change: '+2', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Total Clients', value: newClients.toString(), change: '+4', icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Growth Rate', value: '15.3%', change: '+1.2%', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ];

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading overview...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} from last month
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {projects.slice(0, 5).map((project) => (
              <div key={project.id} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">
                  {(project.name || 'U').charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">New project: {project.name || 'Untitled'}</p>
                  <p className="text-xs text-slate-500">{project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'Unknown'}</p>
                </div>
              </div>
            ))}
            {projects.length === 0 && (
              <div className="text-sm text-slate-500 text-center py-4">No recent activity.</div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Pending Tasks</h3>
          <div className="space-y-3">
            {[
              { task: 'Review wireframes for Client X', priority: 'High', color: 'bg-red-100 text-red-700' },
              { task: 'Send invoice #1023', priority: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
              { task: 'Update portfolio images', priority: 'Low', color: 'bg-green-100 text-green-700' },
              { task: 'Schedule kickoff meeting', priority: 'High', color: 'bg-red-100 text-red-700' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                  <span className="text-sm text-slate-700">{item.task}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${item.color}`}>
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
