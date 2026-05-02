import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyForms, dummyFormResponses } from '../data/dummyData';
import { 
  Download, 
  ArrowLeft, 
  Search, 
  Filter, 
  MoreHorizontal, 
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
  Database
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export default function FormResponseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const form = dummyForms.find(f => f.id === id);
  const responses = dummyFormResponses.filter(r => r.formId === id);

  if (!form) {
    return (
      <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Protocol Reference Invalid</h2>
        <button onClick={() => navigate('/admin/forms/responses')} className="text-indigo-600 font-bold uppercase tracking-widest text-xs">Back to Intelligence Hub</button>
      </div>
    );
  }

  const exportToCSV = () => {
    const headers = ['Submitted At', ...form.fields.map(f => f.label)];
    const rows = responses.map(r => [
      new Date(r.submittedAt).toLocaleString(),
      ...form.fields.map(f => r.data[f.label] || '')
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${form.title.replace(/\s+/g, '_')}_Responses.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <button 
            onClick={() => navigate('/admin/forms/responses')}
            className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft size={12} /> Intelligence Hub
          </button>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 uppercase italic">{form.title}</h2>
          <p className="text-slate-500 text-sm">{form.description}</p>
        </div>

        <div className="flex items-center gap-3">
           <button 
             onClick={exportToCSV}
             className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/20 text-xs uppercase tracking-widest"
           >
             <Download size={16} /> Export CSV
           </button>
           <button className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-slate-600 rounded-2xl shadow-sm transition-all">
             <Filter size={18} />
           </button>
        </div>
      </header>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {[
           { label: 'Total Capture', value: responses.length, icon: Database, color: 'text-indigo-600' },
           { label: 'Unique Entries', value: responses.length, icon: Search, color: 'text-emerald-600' },
           { label: 'Completion Time', value: '1.4s', icon: FileSpreadsheet, color: 'text-amber-600' },
           { label: 'Status', value: 'Active', icon: MoreHorizontal, color: 'text-blue-600' },
         ].map((stat, i) => (
           <div key={i} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center gap-4 group">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform", stat.color.replace('text-', 'bg-').replace('600', '50'))}>
                 <stat.icon size={18} className={stat.color} />
              </div>
              <div>
                 <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</div>
                 <div className="text-lg font-bold text-slate-900">{stat.value}</div>
              </div>
           </div>
         ))}
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
        <div className="px-8 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
           <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Master Dataset ({responses.length} rows)</h3>
           <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
              <input 
                type="text" 
                placeholder="Search records..." 
                className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-indigo-500 w-64"
              />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/30 border-b border-slate-100">
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Submission Date</th>
                {form.fields.map(field => (
                  <th key={field.id} className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{field.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {responses.map((response, idx) => (
                <tr key={response.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5 text-xs font-mono text-slate-400">
                    {new Date(response.submittedAt).toLocaleDateString()}
                    <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase font-bold text-indigo-400">View</span>
                  </td>
                  {form.fields.map(field => (
                    <td key={field.id} className="px-8 py-5 text-sm font-medium text-slate-900">
                      {response.data[field.label] || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {responses.length === 0 && (
          <div className="py-20 text-center text-slate-300 italic text-sm">No data captured for this protocol yet.</div>
        )}

        <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Displaying 1-10 of {responses.length}</div>
           <div className="flex gap-2">
              <button className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-300 hover:text-slate-600 transition-all cursor-not-allowed">
                 <ChevronLeft size={16} />
              </button>
              <button className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-300 hover:text-slate-600 transition-all cursor-not-allowed">
                 <ChevronRight size={16} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
