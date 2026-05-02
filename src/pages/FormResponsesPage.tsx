import React from 'react';
import { dummyForms } from '../data/dummyData';
import { FileText, Users, Clock, ArrowRight, BarChart3, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function FormResponsesPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Response Intelligence</h2>
          <p className="text-slate-500 text-sm">Monitor and extract data from your deployed form protocols.</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
           <div className="flex flex-col items-end">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Total Datasets</span>
              <span className="text-lg font-bold text-slate-900">{dummyForms.length}</span>
           </div>
           <div className="w-px h-8 bg-slate-100" />
           <Database size={20} className="text-indigo-600" />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyForms.map((form, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={form.id}
            className="group bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-600/5 transition-all hover:-translate-y-1 flex flex-col"
          >
            <div className="flex items-start justify-between mb-6">
               <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-indigo-600 border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <FileText size={24} />
               </div>
               <div className="text-right">
                  <div className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mb-1">Capture Rate</div>
                  <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs justify-end">
                     <BarChart3 size={12} /> 94%
                  </div>
               </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors uppercase tracking-tight line-clamp-1">{form.title}</h3>
            <p className="text-xs text-slate-500 line-clamp-2 mb-6 leading-relaxed flex-1">{form.description}</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
               <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                     <Users size={10} /> Submissions
                  </div>
                  <div className="text-lg font-bold text-slate-900">{form.responsesCount}</div>
               </div>
               <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                     <Clock size={10} /> Last Active
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1">2h ago</div>
               </div>
            </div>

            <Link 
              to={`/admin/forms/${form.id}/responses`}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-slate-900/10 hover:bg-indigo-600 hover:shadow-indigo-600/20 transition-all"
            >
              Examine Data <ArrowRight size={14} />
            </Link>
          </motion.div>
        ))}

        {dummyForms.length === 0 && (
          <div className="col-span-full py-20 bg-white border border-slate-200 border-dashed rounded-3xl text-center">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <Database size={32} />
             </div>
             <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No active datasets detected</p>
          </div>
        )}
      </div>
    </div>
  );
}
