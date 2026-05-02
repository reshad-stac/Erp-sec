import React, { useState } from 'react';
import { dummyMembers } from '../data/dummyData';
import { Member, MemberRole } from '../types';
import { Plus, Search, Mail, Phone, ExternalLink, Filter, MoreVertical, CreditCard, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>(dummyMembers);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState<Partial<Member>>({
    role: MemberRole.MEMBER,
    isPaid: false,
    socials: {}
  });

  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      const member: Member = {
        ...newMember as Member,
        id: Math.random().toString(36).substr(2, 9),
        secId: `SEC-2024-${Math.floor(100 + Math.random() * 900)}`,
        joinedAt: new Date().toISOString(),
      };
      setMembers([...members, member]);
      setShowAddModal(false);
      setNewMember({ role: MemberRole.MEMBER, isPaid: false, socials: {} });
    }
  };

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(search.toLowerCase()) ||
    member.secId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Club Members</h2>
          <p className="text-slate-500 text-sm">Manage and directory of all Software Engineering Club members.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-indigo-600/10 text-sm"
        >
          <Plus size={18} />
          Add Member
        </button>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by name or SEC ID..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors text-sm font-semibold border border-slate-200">
          <Filter size={16} />
          Filters
        </button>
      </div>

      {/* Members Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">Name & SEC ID</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">Contact</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">Batch</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">Socials</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs uppercase tracking-tighter">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">{member.name}</div>
                        <div className="text-[11px] font-mono text-slate-400">{member.secId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 border-slate-100">
                    <div>{member.email}</div>
                    <div className="text-xs text-slate-400">{member.phone}</div>
                  </td>
                  <td className="px-6 py-4 border-slate-100">
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest",
                      member.isPaid ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                    )}>
                      {member.isPaid ? 'Paid' : 'Unpaid'}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-slate-100">
                    <span className="text-sm font-medium text-slate-600">
                      {member.batch}th
                    </span>
                  </td>
                  <td className="px-6 py-4 border-slate-100">
                    <div className="flex gap-2 text-slate-400">
                      {member.socials.github && <ExternalLink size={14} className="cursor-pointer hover:text-slate-900 transition-colors" />}
                      {member.socials.linkedin && <ExternalLink size={14} className="cursor-pointer hover:text-slate-900 transition-colors" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right border-slate-100">
                    <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Member Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-8 shadow-2xl my-8 text-slate-900"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6 font-sans">Register New Member</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Full Name</label>
                  <input 
                    type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:ring-1 focus:ring-indigo-500 outline-none text-sm"
                    value={newMember.name || ''} onChange={e => setNewMember({...newMember, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Email Address</label>
                  <input 
                    type="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:ring-1 focus:ring-indigo-500 outline-none text-sm"
                    value={newMember.email || ''} onChange={e => setNewMember({...newMember, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">University ID</label>
                  <input 
                    type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:ring-1 focus:ring-indigo-500 outline-none text-sm"
                    value={newMember.universityId || ''} onChange={e => setNewMember({...newMember, universityId: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Batch</label>
                  <input 
                    type="text" placeholder="e.g. 60" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:ring-1 focus:ring-indigo-500 outline-none text-sm"
                    value={newMember.batch || ''} onChange={e => setNewMember({...newMember, batch: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Payment Status</label>
                  <div className="flex gap-2 p-1 bg-slate-50 border border-slate-200 rounded-lg h-[46px]">
                    <button 
                      onClick={() => setNewMember({...newMember, isPaid: false})}
                      className={cn("flex-1 rounded-md text-[10px] font-bold uppercase tracking-tight transition-all", !newMember.isPaid ? "bg-white text-slate-900 shadow-sm" : "text-slate-400")}
                    >Unpaid</button>
                    <button 
                      onClick={() => setNewMember({...newMember, isPaid: true})}
                      className={cn("flex-1 rounded-md text-[10px] font-bold uppercase tracking-tight transition-all", newMember.isPaid ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20" : "text-slate-400")}
                    >Paid</button>
                  </div>
                </div>
                {newMember.isPaid && (
                  <div className="animate-in fade-in slide-in-from-top-1">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Payment Method</label>
                    <input 
                      type="text" placeholder="Bkash/Nagad" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:ring-1 focus:ring-indigo-500 outline-none text-sm"
                      value={newMember.paymentMethod || ''} onChange={e => setNewMember({...newMember, paymentMethod: e.target.value})}
                    />
                  </div>
                )}
              </div>
              <div className="flex gap-3 mt-10">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 border border-slate-200 text-slate-500 rounded-lg font-bold hover:bg-slate-50 transition-all text-sm uppercase tracking-widest"
                >Cancel</button>
                <button 
                  onClick={handleAddMember}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 text-sm uppercase tracking-widest"
                >Complete Enrollment</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// No extra imports needed at bottom
