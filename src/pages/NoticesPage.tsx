import React, { useState } from 'react';
import { dummyNotices } from '../data/dummyData';
import { Notice } from '../types';
import { Plus, Bell, Search, Trash2, Edit3, Clock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>(dummyNotices);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNotice, setNewNotice] = useState<Partial<Notice>>({ priority: 'medium' });

  const handleAdd = () => {
    if (newNotice.title && newNotice.content) {
      const notice: Notice = {
        id: Math.random().toString(36).substr(2, 9),
        title: newNotice.title,
        content: newNotice.content,
        author: 'Admin',
        createdAt: new Date().toISOString(),
        priority: (newNotice.priority as any) || 'medium',
      };
      setNotices([notice, ...notices]);
      setShowAddModal(false);
      setNewNotice({ priority: 'medium' });
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Announcements</h2>
          <p className="text-slate-500 text-sm">Post and manage notices for the Software Engineering Club members.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-indigo-600/10 text-sm"
        >
          <Plus size={18} />
          Post Notice
        </button>
      </header>

      <div className="grid grid-cols-1 gap-5">
        {notices.map((notice, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={notice.id}
            className="group relative p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-indigo-200 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-2.5 rounded-lg",
                  notice.priority === 'high' ? "bg-red-50 text-red-600 border border-red-100" : 
                  notice.priority === 'medium' ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-indigo-50 text-indigo-600 border border-indigo-100"
                )}>
                  <Bell size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{notice.title}</h3>
                  <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1 uppercase tracking-widest border-r border-slate-200 pr-4"><User size={10} /> {notice.author}</span>
                    <span className="flex items-center gap-1 uppercase tracking-widest border-r border-slate-200 pr-4"><Clock size={10} /> {new Date(notice.createdAt).toLocaleDateString()}</span>
                    <span className={cn(
                      "uppercase tracking-widest font-bold",
                      notice.priority === 'high' ? "text-red-500" : 
                      notice.priority === 'medium' ? "text-amber-500" : "text-indigo-500"
                    )}>{notice.priority} Priority</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all"><Edit3 size={16} /></button>
                <button className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{notice.content}</p>
            
            <div className="mt-6 flex justify-end">
              <button className="text-[10px] items-center gap-1 text-slate-400 hover:text-indigo-600 font-bold uppercase tracking-widest transition-colors flex">
                Read Full Details <Clock size={10} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl p-8 shadow-2xl"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6">Create New Announcement</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Notice Title</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                    placeholder="E.g., Workshop Reminder"
                    value={newNotice.title || ''}
                    onChange={e => setNewNotice({...newNotice, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Priority Level</label>
                    <select 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                      value={newNotice.priority}
                      onChange={e => setNewNotice({...newNotice, priority: e.target.value as any})}
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Content Body</label>
                  <textarea 
                    rows={5}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm resize-none"
                    placeholder="Provide full details of the announcement..."
                    value={newNotice.content || ''}
                    onChange={e => setNewNotice({...newNotice, content: e.target.value})}
                  />
                </div>
                <div className="flex gap-4 pt-6">
                  <button 
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 border border-slate-200 text-slate-500 rounded-lg font-bold hover:bg-slate-50 transition-all text-xs uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleAdd}
                    className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 text-xs uppercase tracking-widest"
                  >
                    Public Notice
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
