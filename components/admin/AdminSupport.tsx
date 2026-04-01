import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  email: string;
  content: string;
  date: string;
  status: 'New' | 'Read' | 'Replied';
}

const initialMessages: Message[] = [
  { id: '1', sender: 'John Doe', email: 'john@example.com', content: 'I need help with my website.', date: '2023-10-26', status: 'New' },
  { id: '2', sender: 'Jane Smith', email: 'jane@example.com', content: 'How do I update my billing info?', date: '2023-10-25', status: 'Read' },
];

const AdminSupport: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'New': return <AlertCircle size={18} className="text-red-500" />;
      case 'Read': return <Clock size={18} className="text-yellow-500" />;
      case 'Replied': return <CheckCircle size={18} className="text-green-500" />;
      default: return <MessageSquare size={18} className="text-slate-500" />;
    }
  };

  const handleMarkRead = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, status: 'Read' } : m));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Inbox & Support</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {messages.map((ticket) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                  {getStatusIcon(ticket.status)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 truncate max-w-[150px]">{ticket.sender}</h3>
                  <p className="text-xs text-slate-500">{ticket.email}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${ticket.status === 'New' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
                {ticket.status}
              </span>
            </div>
            
            <p className="text-sm text-slate-600 mb-6 line-clamp-3 h-16">{ticket.content}</p>
            <p className="text-xs text-slate-400 mb-4">Received: {ticket.date}</p>
            
            <div className="flex gap-2">
                <button 
                    onClick={() => window.location.href = `mailto:${ticket.email}`}
                    className="flex-1 py-2 px-4 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium text-sm"
                >
                Reply
                </button>
                {ticket.status === 'New' && (
                    <button 
                        onClick={() => handleMarkRead(ticket.id)}
                        className="py-2 px-4 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium text-sm"
                    >
                    Mark Read
                    </button>
                )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminSupport;
