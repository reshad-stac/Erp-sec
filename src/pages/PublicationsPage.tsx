import React from 'react';
import { motion } from 'framer-motion';
import { dummyPublications } from '../data/dummyData';
import { BookOpen, Download, FileText, Search, Printer, FileDown } from 'lucide-react';
import { cn } from '../lib/utils';

export default function PublicationsPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 uppercase italic">Digital Archive</h2>
          <p className="text-slate-500 text-sm">Official publications, newsletters, and digital prints of SEC DIU.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
              <input 
                type="text" 
                placeholder="Search archive..." 
                className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-64 transition-all font-medium"
              />
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {dummyPublications.map((pub, i) => (
          <motion.div
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={pub.id}
            className="flex flex-col md:flex-row gap-6 bg-white border border-slate-200 rounded-[2rem] p-6 group hover:shadow-2xl hover:shadow-indigo-600/5 transition-all"
          >
            <div className="w-full md:w-48 h-64 shrink-0 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 relative shadow-lg group-hover:-translate-y-2 transition-transform duration-500">
               <img src={pub.thumbnail} alt={pub.title} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent flex items-end p-4">
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-white/20 backdrop-blur-md px-2 py-1 rounded">
                     {pub.type}
                  </span>
               </div>
            </div>

            <div className="flex flex-col py-2">
               <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                     <Printer size={12} className="text-indigo-500" />
                     <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest">Digital Publication</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight uppercase italic">{pub.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{pub.description}</p>
               </div>

               <div className="mt-auto flex flex-col gap-3">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                     <div className="flex items-center gap-1.5 whitespace-nowrap">
                        <FileText size={12} /> PDF Protocol
                     </div>
                     <div className="w-px h-3 bg-slate-200" />
                     <div className="whitespace-nowrap">{pub.date}</div>
                  </div>
                  <div className="flex gap-2">
                     <a 
                       href={pub.pdfUrl} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg shadow-slate-900/10"
                     >
                       <BookOpen size={14} /> Open Reader
                     </a>
                     <a 
                       href={pub.pdfUrl} 
                       download
                       className="p-3 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                     >
                       <FileDown size={18} />
                     </a>
                  </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {dummyPublications.length === 0 && (
         <div className="py-32 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
               <BookOpen size={32} />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">Inventory empty</p>
         </div>
      )}
    </div>
  );
}
