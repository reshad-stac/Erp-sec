import React from 'react';
import { motion } from 'framer-motion';
import { dummyActivities } from '../data/dummyData';
import { Activity as ActivityIcon, Calendar, CheckCircle2, Clock, Plus, Filter } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ActivitiesPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 uppercase italic">Club Activities</h2>
          <p className="text-slate-500 text-sm">Strategic initiatives and performance records of the SEC DIU.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold transition-all shadow-lg shadow-slate-900/10 text-xs uppercase tracking-widest hover:bg-slate-800">
           <Plus size={16} /> Log Activity
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyActivities.map((activity, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={activity.id}
            className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col group hover:shadow-xl hover:shadow-indigo-600/5 transition-all"
          >
            <div className="flex items-start justify-between mb-6">
               <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <ActivityIcon size={24} />
               </div>
               <span className={cn(
                 "text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg border",
                 activity.status === 'Completed' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
               )}>
                 {activity.status}
               </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2 truncate uppercase tracking-tight">{activity.title}</h3>
            <p className="text-xs text-slate-500 line-clamp-3 mb-6 leading-relaxed flex-1">{activity.description}</p>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
               <div className="space-y-1">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Date</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                     <Calendar size={12} className="text-indigo-400" /> {activity.date}
                  </div>
               </div>
               <div className="space-y-1">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Type</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                     <Filter size={12} className="text-indigo-400" /> {activity.type}
                  </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
