import React, { useMemo } from 'react';
import { dummyNotices, dummyEvents, dummyMembers } from '../data/dummyData';
import { Bell, Calendar, TrendingUp, Users, ChevronRight, Activity, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function Dashboard() {
  const upcomingEvents = dummyEvents.slice(0, 3);
  const recentNotices = dummyNotices.slice(0, 3);

  const growthData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = months.map(month => ({ month, members: 0, events: 0 }));

    dummyMembers.forEach(m => {
      const date = new Date(m.joinedAt);
      if (date.getFullYear() === 2024) {
        data[date.getMonth()].members += 1;
      }
    });

    dummyEvents.forEach(e => {
        const date = new Date(e.date);
        if (date.getFullYear() === 2024) {
          data[date.getMonth()].events += 1;
        }
      });

    return data;
  }, []);

  const skillDistribution = useMemo(() => {
    const skills: Record<string, number> = {};
    dummyMembers.forEach(m => {
      m.skills.forEach(s => {
        skills[s] = (skills[s] || 0) + 1;
      });
    });
    return Object.entries(skills)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, []);

  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#3b82f6', '#ec4899'];

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Command Dashboard</h2>
          <p className="text-slate-500 text-sm">System Overview for DIU Software Engineering Club.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest leading-none">System Live</span>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Members', value: dummyMembers.length.toString(), icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
          { label: 'Paid Members', value: dummyMembers.filter(m => m.isPaid).length.toString(), icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
          { label: 'Pending Appr.', value: '00', icon: Bell, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
          { label: 'Active Events', value: dummyEvents.length.toString().padStart(2, '0'), icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
        ].map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={stat.label}
            className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-indigo-600/5 transition-all group hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2.5 rounded-xl border transition-colors", stat.bg, stat.border)}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <div className="bg-slate-50 px-2 py-1 rounded text-[10px] font-bold text-slate-400">+12%</div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold tracking-tight text-slate-900">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-widest">
                 <Activity size={16} className="text-indigo-600" /> Member Growth & Event Activity
              </h3>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-1.5">
                    <div className="w-2h-2 rounded-full bg-indigo-600" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Members</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Events</span>
                 </div>
              </div>
           </div>
           <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={growthData}>
                    <defs>
                      <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" fontSize={10} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 600 }} dy={10} />
                    <YAxis fontSize={10} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 600 }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="members" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorMembers)" />
                    <Bar dataKey="events" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </section>

        <section className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-widest">
                 <PieChartIcon size={16} className="text-indigo-600" /> Skill Dominance
              </h3>
           </div>
           <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                      data={skillDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {skillDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px' }}
                    />
                 </PieChart>
              </ResponsiveContainer>
           </div>
           <div className="mt-4 space-y-2">
              {skillDistribution.map((skill, i) => (
                <div key={skill.name} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-slate-500">{skill.name}</span>
                   </div>
                   <span className="text-slate-900">{skill.value}</span>
                </div>
              ))}
           </div>
        </section>
      </div>

      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Recent Notices */}
        <section className="col-span-12 lg:col-span-7 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-widest">
               <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
               Recent Notices
            </h3>
            <Link to="/admin/notices" className="text-[10px] font-bold text-indigo-600 hover:underline uppercase tracking-widest italic pr-1">View Archives</Link>
          </div>
          <div className="space-y-4">
            {recentNotices.map((notice) => (
              <div 
                key={notice.id} 
                className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-indigo-200 transition-all cursor-pointer group flex gap-4"
              >
                <div className={cn(
                  "w-1 self-stretch rounded-full",
                  notice.priority === 'high' ? "bg-red-500" : "bg-indigo-500"
                )} />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{notice.title}</h4>
                    <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest">{new Date(notice.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{notice.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="col-span-12 lg:col-span-5 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-widest">
               <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
               Quick Lab
            </h3>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-2 py-0.5 bg-slate-100 rounded">Beta Tools</span>
          </div>
          <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-2xl shadow-indigo-600/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 transform translate-x-4 -translate-y-4 opacity-5 group-hover:scale-110 transition-transform">
               <Activity size={160} />
            </div>
            <h4 className="text-lg font-bold mb-3 italic">Dynamic Form Suite</h4>
            <p className="text-xs text-indigo-100 mb-8 leading-relaxed font-medium">Engineer and deploy custom registration forms for club workshops with zero code.</p>
            
            <div className="space-y-3 mb-10">
              {[
                { label: 'Biometric Integration Mock' },
                { label: 'Blockchain Verification Mock' },
              ].map(field => (
                <div key={field.label} className="flex items-center gap-3 p-3 bg-white/10 rounded-xl border border-white/10 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
                  <div className="w-4 h-4 rounded border border-white/20 flex-shrink-0" />
                  {field.label}
                </div>
              ))}
            </div>

            <Link to="/admin/events" className="flex items-center justify-center w-full py-4 bg-white text-indigo-600 rounded-2xl text-[10px] font-bold shadow-lg hover:shadow-indigo-200/20 hover:-translate-y-0.5 transition-all uppercase tracking-widest">
              Access Event Lab <ChevronRight size={14} className="ml-1" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
