import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { dummyTransactions } from '../data/dummyData';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart as PieChartIcon, 
  Download, 
  Search, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft,
  Calendar,
  Filter,
  FileSpreadsheet
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { cn } from '../lib/utils';

export default function AccountsPage() {
  const [transactions] = useState(dummyTransactions);
  const [searchTerm, setSearchTerm] = useState('');

  const totalIncome = transactions
    .filter(t => t.type === 'Income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netBalance = totalIncome - totalExpense;

  const categoryData = Object.values(
    transactions.reduce((acc: any, t) => {
      if (!acc[t.category]) {
        acc[t.category] = { name: t.category, value: 0 };
      }
      acc[t.category].value += t.amount;
      return acc;
    }, {})
  );

  const chartData = [
    { name: 'Income', amount: totalIncome },
    { name: 'Expense', amount: totalExpense },
  ];

  const COLORS = ['#4f46e5', '#ef4444', '#10b981', '#f59e0b', '#6366f1'];

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 uppercase italic">Financial Intelligence</h2>
          <p className="text-slate-500 text-sm">Treasury records, automated registration tracking, and fiscal reporting.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold transition-all shadow-sm text-xs uppercase tracking-widest hover:bg-slate-50">
              <FileSpreadsheet size={16} className="text-emerald-600" /> Export Report
           </button>
           <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold transition-all shadow-lg shadow-slate-900/10 text-xs uppercase tracking-widest hover:bg-slate-800">
              <Plus size={16} /> New Entry
           </button>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[4rem] flex items-center justify-center opacity-50">
             <TrendingUp className="text-emerald-500 translate-x-2 -translate-y-2" size={32} />
          </div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total Inflow</div>
          <div className="text-4xl font-black text-slate-900 italic">BDT {totalIncome.toLocaleString()}</div>
          <div className="mt-4 flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 uppercase tracking-widest">
             <ArrowUpRight size={12} /> Positive growth
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-[4rem] flex items-center justify-center opacity-50">
             <TrendingDown className="text-rose-500 translate-x-2 -translate-y-2" size={32} />
          </div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total Outflow</div>
          <div className="text-4xl font-black text-slate-900 italic">BDT {totalExpense.toLocaleString()}</div>
          <div className="mt-4 flex items-center gap-1.5 text-[9px] font-bold text-rose-600 uppercase tracking-widest">
             <ArrowDownLeft size={12} /> Internal expenses
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-indigo-600 p-6 rounded-[2rem] shadow-xl shadow-indigo-600/20 relative overflow-hidden text-white"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-[4rem] flex items-center justify-center">
             <DollarSign className="text-white/40 translate-x-2 -translate-y-2" size={32} />
          </div>
          <div className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest mb-2">Net Treasury</div>
          <div className="text-4xl font-black italic">BDT {netBalance.toLocaleString()}</div>
          <div className="mt-4 flex items-center gap-1.5 text-[9px] font-bold text-indigo-200 uppercase tracking-widest">
             Available for allocation
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Comparison Bar Chart */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <PieChartIcon size={18} className="text-indigo-600" /> Inflow vs. Outflow
              </h3>
           </div>
           <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                       dataKey="name" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                    />
                    <YAxis 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                    />
                    <Tooltip 
                       cursor={{ fill: '#f8fafc' }}
                       contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
                       {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#4f46e5' : '#ef4444'} />
                       ))}
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <DollarSign size={18} className="text-indigo-600" /> Category Breakdown
              </h3>
           </div>
           <div className="h-64 flex">
              <div className="flex-1">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie
                          data={categoryData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                       >
                          {categoryData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                       </Pie>
                       <Tooltip />
                    </PieChart>
                 </ResponsiveContainer>
              </div>
              <div className="w-48 flex flex-col justify-center gap-3">
                 {categoryData.map((entry: any, index) => (
                    <div key={entry.name} className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight truncate">{entry.name}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Ledger Section */}
      <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest italic">Transaction Ledger</h3>
           <div className="flex items-center gap-3">
              <div className="relative">
                 <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                 <input 
                    type="text" 
                    placeholder="Search ledger..."
                    className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500/10 w-64 font-bold"
                 />
              </div>
              <button className="p-2 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all">
                 <Filter size={16} />
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transaction ID</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Description</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Amount</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5 text-[10px] font-bold font-mono text-slate-400">#{t.id}</td>
                  <td className="px-8 py-5">
                    <div className="text-xs font-bold text-slate-900">{t.description}</div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg">
                      {t.category}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                      <Calendar size={12} className="text-slate-300" /> {t.date}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className={cn(
                      "text-xs font-black italic",
                      t.type === 'Income' ? "text-emerald-600" : "text-rose-600"
                    )}>
                      {t.type === 'Income' ? '+' : '-'} {t.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center">
                      <span className="text-[8px] font-bold uppercase tracking-tighter bg-slate-100 text-slate-500 px-2 py-1 rounded-full border border-slate-200">
                        {t.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
