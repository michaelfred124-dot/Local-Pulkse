import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Edit, Eye, Trash2, Plus } from 'lucide-react';

interface WebPage {
  id: string;
  title: string;
  slug: string;
  status: 'Published' | 'Draft';
  lastUpdated: string;
}

const initialPages: WebPage[] = [
  { id: '1', title: 'Home', slug: '/', status: 'Published', lastUpdated: '2023-10-25' },
  { id: '2', title: 'About Us', slug: '/about', status: 'Published', lastUpdated: '2023-10-20' },
  { id: '3', title: 'Services', slug: '/services', status: 'Published', lastUpdated: '2023-10-22' },
  { id: '4', title: 'Contact', slug: '/contact', status: 'Draft', lastUpdated: '2023-10-26' },
];

const AdminWebManagement: React.FC = () => {
  const [pages, setPages] = useState<WebPage[]>(initialPages);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      setPages(pages.filter(p => p.id !== id));
    }
  };

  const handleAddPage = () => {
      const title = window.prompt("Enter page title:");
      if (title) {
          const slug = window.prompt("Enter page slug (e.g., /new-page):", "/" + title.toLowerCase().replace(/\s+/g, '-'));
          if (slug) {
              const newPage: WebPage = {
                id: Date.now().toString(),
                title,
                slug,
                status: 'Draft',
                lastUpdated: new Date().toISOString().split('T')[0]
              };
              setPages([...pages, newPage]);
          }
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Web Management</h2>
        <button 
            onClick={handleAddPage}
            className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors"
        >
          <Plus size={18} /> Add New Page
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <motion.div
            key={page.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
                  <Globe size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{page.title}</h3>
                  <p className="text-xs text-slate-500">{page.slug}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${page.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {page.status}
              </span>
            </div>
            
            <p className="text-sm text-slate-500 mb-6">Last updated: {page.lastUpdated}</p>
            
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-sm font-medium transition-colors">
                <Edit size={16} /> Edit
              </button>
              <button className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-brand-600 rounded-lg transition-colors">
                <Eye size={18} />
              </button>
              <button 
                onClick={() => handleDelete(page.id)}
                className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-red-600 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminWebManagement;
