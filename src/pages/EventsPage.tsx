import React, { useState } from 'react';
import { dummyEvents } from '../data/dummyData';
import { Event, FormField } from '../types';
import { Plus, Calendar, MapPin, Users, Settings, Trash2, ArrowRight, Type, CheckSquare, List, Mail, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(dummyEvents);
  const [showBuilder, setShowBuilder] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    description: '',
    date: '',
    location: '',
    registrationFields: [
      { id: '1', label: 'Full Name', type: 'text', required: true },
      { id: '2', label: 'Email Address', type: 'email', required: true },
    ]
  });

  const addField = (type: FormField['type']) => {
    const field: FormField = {
      id: Math.random().toString(36).substr(2, 9),
      label: 'New Field',
      type: type,
      required: false,
      options: type === 'select' ? ['Option 1', 'Option 2'] : undefined
    };
    setNewEvent({
      ...newEvent,
      registrationFields: [...(newEvent.registrationFields || []), field]
    });
  };

  const removeField = (id: string) => {
    setNewEvent({
      ...newEvent,
      registrationFields: (newEvent.registrationFields || []).filter(f => f.id !== id)
    });
  };

  const handleSaveEvent = () => {
    const event: Event = {
      id: Math.random().toString(36).substr(2, 9),
      title: newEvent.title || 'Untitled Event',
      description: newEvent.description || '',
      date: newEvent.date || new Date().toISOString(),
      location: newEvent.location || 'Online',
      registrationFields: newEvent.registrationFields || [],
      registrations: [],
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop'
    };
    setEvents([event, ...events]);
    setShowBuilder(false);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Club Events</h2>
          <p className="text-slate-500 text-sm">Design and host events with customized registration forms.</p>
        </div>
        <button 
          onClick={() => setShowBuilder(true)}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-indigo-600/10 text-sm"
        >
          <Plus size={18} />
          Create Event
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event, i) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            key={event.id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:border-indigo-300 transition-all flex flex-col shadow-sm"
          >
            <div className="aspect-video relative overflow-hidden bg-slate-100">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-mono font-bold text-slate-900 border border-slate-200 uppercase tracking-widest shadow-sm">
                  {event.date}
                </span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{event.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-2 mb-6 leading-relaxed">{event.description}</p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <MapPin size={12} className="text-indigo-500" />
                  {event.location}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Users size={12} className="text-indigo-500" />
                  {event.registrations.length} Participants Signed Up
                </div>
              </div>

              <div className="mt-auto flex gap-3">
                <Link to={`/events/${event.id}`} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 hover:bg-indigo-600 hover:text-white text-slate-900 rounded-lg text-xs font-bold transition-all border border-slate-200 shadow-sm uppercase tracking-widest">
                  Configure Registration <ArrowRight size={14} />
                </Link>
                <button className="p-2.5 border border-slate-200 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                  <Settings size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Form Builder Modal */}
      <AnimatePresence>
        {showBuilder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 md:py-10">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowBuilder(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] text-slate-900"
            >
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">Event Editor & Form Builder</h3>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Blueprint Configuration Mode</p>
                  </div>
                </div>
                <button onClick={() => setShowBuilder(false)} className="text-slate-400 hover:text-slate-900 transition-colors bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center">×</button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 lg:p-12">
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Left: Event Details */}
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 border-b border-indigo-100 pb-2 flex items-center gap-2">
                       <div className="w-1 h-1 bg-indigo-600 rounded-full"></div> 01. General Information
                    </h4>
                    <div className="space-y-6">
                      <input 
                        type="text" 
                        placeholder="Project Event Title"
                        className="w-full bg-transparent text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2 placeholder:text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                        value={newEvent.title}
                        onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                      />
                      <textarea 
                        placeholder="Comprehensive event brief..."
                        className="w-full bg-transparent text-slate-500 border-b border-slate-200 pb-2 placeholder:text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors resize-none h-24 text-sm"
                        value={newEvent.description}
                        onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest ml-1">Event Date</label>
                          <input 
                            type="date" 
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            value={newEvent.date}
                            onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest ml-1">Event Venue</label>
                          <input 
                            type="text" 
                            placeholder="Location Details"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            value={newEvent.location}
                            onChange={e => setNewEvent({...newEvent, location: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Registration Form Builder */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                       <h4 className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 flex items-center gap-2">
                          <div className="w-1 h-1 bg-indigo-600 rounded-full"></div> 02. Registration Protocol
                       </h4>
                       <div className="flex gap-1 bg-slate-100 p-1 rounded-md">
                        <button onClick={() => addField('text')} title="Add Text" className="p-1 text-slate-500 hover:text-indigo-600 transition-colors"><Type size={14} /></button>
                        <button onClick={() => addField('email')} title="Add Email" className="p-1 text-slate-500 hover:text-indigo-600 transition-colors"><Mail size={14} /></button>
                        <button onClick={() => addField('select')} title="Add Select" className="p-1 text-slate-500 hover:text-indigo-600 transition-colors"><List size={14} /></button>
                        <button onClick={() => addField('checkbox')} title="Add Checkbox" className="p-1 text-slate-500 hover:text-indigo-600 transition-colors"><CheckSquare size={14} /></button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {newEvent.registrationFields?.map((field, idx) => (
                        <div key={field.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl group relative hover:border-indigo-200 transition-all">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold text-slate-300">#{idx + 1}</span>
                            <div className="flex-1">
                              <input 
                                value={field.label}
                                onChange={(e) => {
                                  const fields = [...(newEvent.registrationFields || [])];
                                  fields[idx].label = e.target.value;
                                  setNewEvent({...newEvent, registrationFields: fields});
                                }}
                                className="bg-transparent text-sm font-bold text-slate-900 focus:outline-none w-full"
                              />
                              <div className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mt-0.5">{field.type} collection</div>
                            </div>
                            <button 
                              onClick={() => removeField(field.id)}
                              className="text-slate-200 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {newEvent.registrationFields?.length === 0 && (
                      <div className="text-center py-8 border-2 border-dashed border-slate-100 rounded-2xl text-slate-300 text-xs font-bold uppercase tracking-widest">
                        Protocol parameters required
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-slate-100 flex gap-4 bg-slate-50">
                <button 
                  onClick={() => setShowBuilder(false)}
                  className="px-8 py-3 bg-white border border-slate-200 text-slate-500 rounded-xl font-bold hover:bg-slate-100 transition-all ml-auto text-xs uppercase tracking-widest"
                >
                  Discard
                </button>
                <button 
                  onClick={handleSaveEvent}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 text-xs uppercase tracking-widest"
                >
                  Authorize Event
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
