import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyEvents, dummyEventRegistrations } from '../data/dummyData';
import { 
  Download, 
  ArrowLeft, 
  Search, 
  Filter, 
  Database,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  TrendingUp,
  BarChart2,
  PieChart as PieChartIcon,
  ArrowUpDown
} from 'lucide-react';
import { cn } from '../lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from 'recharts';
import { motion } from 'framer-motion';

export default function EventRegistrantsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const event = dummyEvents.find(e => e.id === id);
  const allRegistrants = useMemo(() => dummyEventRegistrations.filter(r => r.eventId === id), [id]);

  const filteredRegistrants = useMemo(() => {
    let result = [...allRegistrants];
    
    if (searchTerm) {
      result = result.filter(r => 
        Object.values(r.data).some(val => 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (sortConfig) {
      result.sort((a, b) => {
        let aVal = sortConfig.key === 'submittedAt' ? a.submittedAt : a.data[sortConfig.key];
        let bVal = sortConfig.key === 'submittedAt' ? b.submittedAt : b.data[sortConfig.key];
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [allRegistrants, searchTerm, sortConfig]);

  // Analytics Calculations
  const stats = useMemo(() => {
    if (!allRegistrants.length) return null;

    // Dept distribution (assuming 'Department' exists as per dummy data)
    const deptMap: Record<string, number> = {};
    allRegistrants.forEach(r => {
      const dept = r.data['Department'] || 'Other';
      deptMap[dept] = (deptMap[dept] || 0) + 1;
    });
    const deptData = Object.entries(deptMap).map(([name, value]) => ({ name, value }));

    // Registration over time
    const timeMap: Record<string, number> = {};
    allRegistrants.forEach(r => {
      const date = new Date(r.submittedAt).toLocaleDateString();
      timeMap[date] = (timeMap[date] || 0) + 1;
    });
    const timeData = Object.entries(timeMap).map(([date, count]) => ({ date, count }));

    return { deptData, timeData };
  }, [allRegistrants]);

  if (!event) {
    return (
      <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Event Protocol Not Found</h2>
        <button onClick={() => navigate('/admin/events/analytics')} className="text-indigo-600 font-bold uppercase tracking-widest text-xs">Back to Intelligence</button>
      </div>
    );
  }

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const exportCSV = () => {
    const headers = ['Registration Date', ...event.registrationFields.map(f => f.label)];
    const rows = filteredRegistrants.map(r => [
      new Date(r.submittedAt).toLocaleString(),
      ...event.registrationFields.map(f => r.data[f.label] || '')
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${event.title.replace(/\s+/g, '_')}_Registrants.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#3b82f6', '#ec4899'];

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <button 
            onClick={() => navigate('/admin/events/analytics')}
            className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft size={12} /> Event Intelligence
          </button>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 uppercase italic">{event.title}</h2>
          <p className="text-slate-500 text-sm">Deployment Roster & Engagement Intelligence</p>
        </div>

        <div className="flex items-center gap-3">
           <button 
             onClick={exportCSV}
             className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-emerald-600/20 text-xs uppercase tracking-widest"
           >
             <Download size={16} /> Export CSV
           </button>
        </div>
      </header>

      {/* Advanced Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-8 space-y-6">
           <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col h-[400px]">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-widest">
                    <TrendingUp size={16} className="text-indigo-600" /> Enrollment Velocity
                 </h3>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-0.5 bg-slate-50 rounded italic">Daily Captures</span>
              </div>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats?.timeData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" fontSize={10} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 600 }} dy={10} />
                    <YAxis fontSize={10} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 600 }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                      cursor={{ stroke: '#4f46e5', strokeWidth: 2 }}
                    />
                    <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: '#4f46e5', strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
           </div>
        </section>

        <section className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col h-[400px]">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-widest">
                  <PieChartIcon size={16} className="text-indigo-600" /> Dept Mix
               </h3>
            </div>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats?.deptData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats?.deptData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
               {stats?.deptData.map((d, i) => (
                 <div key={d.name} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                       <span className="text-slate-500">{d.name}</span>
                    </div>
                    <span className="text-slate-900">{d.value}</span>
                 </div>
               ))}
            </div>
          </div>
        </section>
      </div>

      {/* Roster Table with Search and Sort */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
           <div className="flex items-center gap-3">
              <UserCheck size={18} className="text-indigo-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight leading-none mb-1">Confirmed Manifest</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Intelligence Filtered ({filteredRegistrants.length})</p>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search roster..." 
                    className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-80 transition-all font-medium"
                  />
              </div>
              <button className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 rounded-xl shadow-sm transition-all">
                 <Filter size={18} />
              </button>
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/30 border-b border-slate-100">
                <th 
                  className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-indigo-600 transition-colors"
                  onClick={() => handleSort('submittedAt')}
                >
                  <div className="flex items-center gap-2">
                    Timestamp <ArrowUpDown size={12} />
                  </div>
                </th>
                {event.registrationFields.map(field => (
                  <th 
                    key={field.id} 
                    className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-indigo-600 transition-colors"
                    onClick={() => handleSort(field.label)}
                  >
                    <div className="flex items-center gap-2">
                      {field.label} <ArrowUpDown size={12} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredRegistrants.map((reg) => (
                <tr key={reg.id} className="last:border-0 hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5 text-xs font-mono text-slate-400">
                    {new Date(reg.submittedAt).toLocaleDateString()}
                    <span className="block text-[9px] font-bold uppercase tracking-widest mt-0.5">{new Date(reg.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </td>
                  {event.registrationFields.map(field => (
                    <td key={field.id} className="px-8 py-5 text-sm font-medium text-slate-900">
                      {reg.data[field.label] || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRegistrants.length === 0 && (
          <div className="py-32 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
               <Database size={32} />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">Zero matches in manifest logs</p>
          </div>
        )}

        <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              Secure Data Link Established
           </div>
           <div className="flex gap-2">
              <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-300 hover:text-slate-600 transition-all shadow-sm">
                 <ChevronLeft size={16} />
              </button>
              <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-300 hover:text-slate-600 transition-all shadow-sm">
                 <ChevronRight size={16} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
