import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyEvents } from '../data/dummyData';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = dummyEvents.find(e => e.id === id);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!event) {
    return (
      <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl shadow-sm">
        <h2 className="text-2xl text-slate-900 font-bold mb-4">Event Protocol Not Found</h2>
        <button onClick={() => navigate('/admin/events')} className="text-indigo-600 font-bold uppercase tracking-widest text-xs hover:underline">Return to Archives</button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, you would send this to the backend
    console.log('Registration Data:', formData);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <div className="aspect-[21/9] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm relative group">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-8">
           <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-mono font-bold text-slate-900 border border-slate-200 uppercase tracking-widest shadow-sm">
              Live Enrollment
           </span>
        </div>
      </div>

      <div className="space-y-4 px-2">
        <div className="flex items-center gap-4 text-[10px] font-bold text-indigo-500 uppercase tracking-[0.25em]">
          <div className="flex items-center gap-1.5"><Calendar size={12} /> {event.date}</div>
          <div className="w-1 h-1 bg-slate-300 rounded-full" />
          <div className="flex items-center gap-1.5"><MapPin size={12} /> {event.location}</div>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight uppercase leading-none">{event.title}</h1>
        <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">{event.description}</p>
      </div>

      <div className="h-px w-full bg-slate-100" />

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-12 shadow-xl shadow-slate-200/50"
          >
            <div className="mb-10 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tight">Registration Manifest</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Authentication & Data Collection Module</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {event.registrationFields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  
                  {field.type === 'select' ? (
                    <select
                      required={field.required}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-sans text-sm shadow-sm"
                      onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                    >
                      <option value="">Select an option...</option>
                      {field.options?.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : field.type === 'checkbox' ? (
                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4 transition-colors hover:border-indigo-200 shadow-sm">
                      <input
                        type="checkbox"
                        required={field.required}
                        className="w-5 h-5 accent-indigo-600 rounded bg-white border-slate-300"
                        onChange={(e) => setFormData({ ...formData, [field.label]: e.target.checked })}
                      />
                      <span className="text-xs text-slate-600 font-bold uppercase tracking-tight">I authorize the use of my data for club purposes</span>
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      required={field.required}
                      placeholder={field.label}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-300 text-sm shadow-sm"
                      onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20 uppercase tracking-[0.2em] text-xs mt-6"
              >
                Submit Registration Manifest
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white border border-emerald-100 rounded-3xl shadow-xl shadow-emerald-600/5 px-8"
          >
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-100">
              <CheckCircle2 size={40} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2 uppercase tracking-tight">Deployment Successful</h3>
            <p className="text-slate-500 mb-10 max-w-sm mx-auto text-sm leading-relaxed">Your registration for <strong>{event.title}</strong> has been processed. A confirmation packet will be dispatched to your system soon.</p>
            <button
              onClick={() => navigate('/')}
              className="px-10 py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 text-[10px] uppercase tracking-[0.2em]"
            >
              Return Home
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
