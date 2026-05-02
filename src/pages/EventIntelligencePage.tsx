import React from 'react';
import { dummyEvents } from '../data/dummyData';
import { Calendar, Users, ArrowRight, BarChart2, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function EventIntelligencePage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Event Intelligence</h2>
          <p className="text-slate-500 text-sm">Monitor enrollment logistics and engagement metrics.</p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
           <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
           <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest leading-none">Live Analytics</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyEvents.map((event, i) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            key={event.id}
            className="group bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-600/5 transition-all flex flex-col"
          >
            <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-slate-100 border border-slate-100 relative">
               <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[9px] font-bold text-slate-900 border border-slate-200 uppercase tracking-widest shadow-sm">
                     {event.date}
                  </span>
               </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2 uppercase tracking-tight line-clamp-1">{event.title}</h3>
            
            <div className="flex items-center gap-4 mb-8">
               <div className="flex items-center gap-2">
                  <Users size={14} className="text-slate-400" />
                  <span className="text-xs font-bold text-slate-600">42 Registrants</span>
               </div>
               <div className="flex items-center gap-2">
                  <Activity size={14} className="text-emerald-500" />
                  <span className="text-xs font-bold text-emerald-600">High Engagement</span>
               </div>
            </div>

            <Link 
              to={`/admin/events/${event.id}/registrants`}
              className="mt-auto w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg shadow-slate-900/10"
            >
              Examine Roster <ArrowRight size={14} />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
