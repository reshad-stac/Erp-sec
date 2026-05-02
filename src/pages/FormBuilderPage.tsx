import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Type, 
  CheckSquare, 
  List, 
  Mail, 
  Heading, 
  Settings2, 
  Eye, 
  Save, 
  MoreVertical,
  GripVertical,
  ChevronDown,
  Circle,
  X,
  PlusCircle,
  Hash,
  AlignLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { FormField, DynamicForm } from '../types';

export default function FormBuilderPage() {
  const [form, setForm] = useState<Partial<DynamicForm>>({
    title: 'Untitled Form',
    description: 'Provide a brief description of your form...',
    fields: [
      { id: '1', label: 'Full Name', type: 'text', required: true, placeholder: 'Enter your name' },
      { id: '2', label: 'Email Address', type: 'email', required: true, placeholder: 'Enter your email' },
    ]
  });

  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: Math.random().toString(36).substr(2, 9),
      label: type === 'text' ? 'New Question' : `New ${type} question`,
      type,
      required: false,
      options: (type === 'select' || type === 'radio') ? ['Option 1'] : undefined,
      placeholder: ''
    };
    setForm(prev => ({
      ...prev,
      fields: [...(prev.fields || []), newField]
    }));
    setSelectedFieldId(newField.id);
  };

  const removeField = (id: string) => {
    setForm(prev => ({
      ...prev,
      fields: prev.fields?.filter(f => f.id !== id)
    }));
    if (selectedFieldId === id) setSelectedFieldId(null);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setForm(prev => ({
      ...prev,
      fields: prev.fields?.map(f => f.id === id ? { ...f, ...updates } : f)
    }));
  };

  const addOption = (fieldId: string) => {
    const field = form.fields?.find(f => f.id === fieldId);
    if (field && field.options) {
      updateField(fieldId, { options: [...field.options, `Option ${field.options.length + 1}`] });
    }
  };

  const removeOption = (fieldId: string, index: number) => {
    const field = form.fields?.find(f => f.id === fieldId);
    if (field && field.options) {
      const newOptions = [...field.options];
      newOptions.splice(index, 1);
      updateField(fieldId, { options: newOptions });
    }
  };

  const updateOption = (fieldId: string, index: number, value: string) => {
    const field = form.fields?.find(f => f.id === fieldId);
    if (field && field.options) {
      const newOptions = [...field.options];
      newOptions[index] = value;
      updateField(fieldId, { options: newOptions });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 bg-slate-50/80 backdrop-blur-md z-30 py-4 -mx-4 px-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Dynamic Form Suite</h2>
          <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Lab Environment</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl shadow-sm border border-slate-200">
          <button 
            onClick={() => setActiveTab('editor')}
            className={cn(
              "px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
              activeTab === 'editor' ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "text-slate-400 hover:text-slate-600"
            )}
          >
            <Settings2 size={14} /> Editor
          </button>
          <button 
            onClick={() => setActiveTab('preview')}
            className={cn(
              "px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
              activeTab === 'preview' ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "text-slate-400 hover:text-slate-600"
            )}
          >
            <Eye size={14} /> Preview
          </button>
          <div className="w-px h-4 bg-slate-200 mx-1" />
          <button className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-all flex items-center gap-2">
            <Save size={14} /> Deploy Form
          </button>
        </div>
      </header>

      {activeTab === 'editor' ? (
        <div className="space-y-6">
          {/* Form Header */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600" />
            <input 
              type="text" 
              className="w-full bg-transparent text-3xl font-extrabold text-slate-900 border-none outline-none placeholder:text-slate-200"
              placeholder="Form Title"
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
            />
            <textarea 
              className="w-full bg-transparent text-slate-500 mt-2 border-none outline-none resize-none placeholder:text-slate-200 text-sm"
              placeholder="Form Description"
              rows={2}
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
            />
          </div>

          {/* Fields List */}
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {form.fields?.map((field, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={field.id}
                  onClick={() => setSelectedFieldId(field.id)}
                  className={cn(
                    "bg-white border rounded-2xl p-6 shadow-sm transition-all relative group",
                    selectedFieldId === field.id ? "border-l-8 border-l-indigo-600 border-indigo-200 ring-2 ring-indigo-50" : "border-slate-200"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className="cursor-grab opacity-0 group-hover:opacity-100 transition-opacity">
                      <GripVertical size={20} className="text-slate-300" />
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      {selectedFieldId === field.id ? (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-1">
                          <div className="flex flex-col md:flex-row gap-4">
                            <input 
                              type="text" 
                              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                              placeholder="Question Label"
                              value={field.label}
                              onChange={e => updateField(field.id, { label: e.target.value })}
                            />
                            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                             <select 
                                className="bg-transparent text-[10px] font-bold uppercase tracking-widest text-slate-500 focus:outline-none cursor-pointer"
                                value={field.type}
                                onChange={e => updateField(field.id, { type: e.target.value as any })}
                              >
                                <option value="text">Short Answer</option>
                                <option value="textarea">Paragraph</option>
                                <option value="radio">Multiple Choice</option>
                                <option value="checkbox">Checkboxes</option>
                                <option value="select">Dropdown</option>
                                <option value="email">Email</option>
                                <option value="number">Number</option>
                              </select>
                            </div>
                          </div>

                          {/* Options if needed */}
                          {(field.type === 'radio' || field.type === 'checkbox' || field.type === 'select') && (
                            <div className="space-y-2 mt-4 pl-4 border-l-2 border-slate-100">
                              {field.options?.map((opt, oIdx) => (
                                <div key={oIdx} className="flex items-center gap-3">
                                  {field.type === 'radio' ? <Circle size={14} className="text-slate-300" /> : <div className="w-4 h-4 border border-slate-300 rounded" />}
                                  <input 
                                    type="text" 
                                    className="flex-1 bg-transparent border-b border-slate-100 focus:border-indigo-500 outline-none text-xs py-1"
                                    value={opt}
                                    onChange={e => updateOption(field.id, oIdx, e.target.value)}
                                  />
                                  <button 
                                    onClick={() => removeOption(field.id, oIdx)}
                                    className="text-slate-300 hover:text-red-500"
                                  >
                                    <X size={14} />
                                  </button>
                                </div>
                              ))}
                              <button 
                                onClick={() => addOption(field.id)}
                                className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-2 hover:bg-indigo-50 px-2 py-1 rounded-md transition-all"
                              >
                                <PlusCircle size={14} /> Add Option
                              </button>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4">
                            <div className="flex items-center gap-4">
                              <label className="flex items-center gap-2 cursor-pointer group/toggle">
                                <div 
                                  onClick={() => updateField(field.id, { required: !field.required })}
                                  className={cn(
                                    "w-8 h-4 rounded-full relative transition-all",
                                    field.required ? "bg-indigo-600" : "bg-slate-200"
                                  )}
                                >
                                  <div className={cn(
                                    "absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all",
                                    field.required ? "left-4.5" : "left-0.5"
                                  )} />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Required</span>
                              </label>
                            </div>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                removeField(field.id);
                              }}
                              className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 flex justify-between items-center group/item">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                               <span className="text-sm font-bold text-slate-900 uppercase tracking-tight">{field.label}</span>
                               {field.required && <span className="text-red-500 text-xs">*</span>}
                            </div>
                            <div className="flex items-center gap-2">
                               <div className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-bold text-slate-400 uppercase tracking-widest">{field.type}</div>
                               {field.placeholder && <span className="text-[10px] text-slate-300 italic">{field.placeholder}</span>}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                             <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const idx = form.fields?.findIndex(f => f.id === field.id);
                                  if (idx !== undefined && idx > 0) {
                                    const fields = [...(form.fields || [])];
                                    [fields[idx], fields[idx - 1]] = [fields[idx - 1], fields[idx]];
                                    setForm({...form, fields});
                                  }
                                }}
                                className="p-1.5 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded"
                             >
                                <ChevronDown className="rotate-180" size={14} />
                             </button>
                             <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const idx = form.fields?.findIndex(f => f.id === field.id);
                                  if (idx !== undefined && form.fields && idx < form.fields.length - 1) {
                                    const fields = [...form.fields];
                                    [fields[idx], fields[idx + 1]] = [fields[idx + 1], fields[idx]];
                                    setForm({...form, fields});
                                  }
                                }}
                                className="p-1.5 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded"
                             >
                                <ChevronDown size={14} />
                             </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {form.fields?.length === 0 && (
              <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-3xl text-slate-300 flex flex-col items-center gap-4">
                <Heading size={48} strokeWidth={1} />
                <p className="text-xs font-bold uppercase tracking-widest">Form Structure Null</p>
              </div>
            )}
          </div>

          {/* Fab and Control Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xl flex items-center justify-center gap-4 sticky bottom-8">
            <button onClick={() => addField('text')} title="Short Text" className="p-3 bg-slate-50 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 rounded-xl transition-all border border-slate-100 group relative">
              <Type size={20} />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Text</span>
            </button>
            <button onClick={() => addField('textarea')} title="Paragraph" className="p-3 bg-slate-50 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 rounded-xl transition-all border border-slate-100 group relative">
              <AlignLeft size={20} />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Paragraph</span>
            </button>
            <button onClick={() => addField('radio')} title="Multiple Choice" className="p-3 bg-slate-50 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 rounded-xl transition-all border border-slate-100 group relative">
              <Circle size={20} />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Radio</span>
            </button>
            <button onClick={() => addField('checkbox')} title="Checkboxes" className="p-3 bg-slate-50 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 rounded-xl transition-all border border-slate-100 group relative">
              <CheckSquare size={20} />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Checkboxes</span>
            </button>
            <button onClick={() => addField('select')} title="Dropdown" className="p-3 bg-slate-50 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 rounded-xl transition-all border border-slate-100 group relative">
              <ChevronDown size={20} />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Dropdown</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden min-h-[600px] flex flex-col">
          <div className="bg-indigo-600 h-2 w-full" />
          <div className="p-12 border-b border-slate-50">
             <h1 className="text-4xl font-bold text-slate-900 mb-2">{form.title}</h1>
             <p className="text-slate-500">{form.description}</p>
          </div>
          <div className="flex-1 p-12 space-y-10">
             {form.fields?.map(field => (
               <div key={field.id} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <label className="text-[13px] font-bold text-slate-900 uppercase tracking-tight">{field.label}</label>
                    {field.required && <span className="text-red-500">*</span>}
                  </div>
                  
                  {field.type === 'text' && (
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-sm focus:bg-white focus:shadow-md transition-all outline-none" placeholder={field.placeholder || "Your answer"} />
                  )}

                  {field.type === 'textarea' && (
                    <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-sm focus:bg-white focus:shadow-md transition-all outline-none resize-none" rows={4} placeholder={field.placeholder || "Long answer text"} />
                  )}

                  {field.type === 'email' && (
                    <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-sm focus:bg-white focus:shadow-md transition-all outline-none" placeholder="example@email.com" />
                  )}

                  {field.type === 'number' && (
                    <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-sm focus:bg-white focus:shadow-md transition-all outline-none" placeholder="0" />
                  )}

                  {field.type === 'radio' && (
                    <div className="space-y-2">
                      {field.options?.map((opt, i) => (
                        <label key={i} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white transition-all cursor-pointer group">
                           <div className="w-5 h-5 rounded-full border-2 border-slate-200 group-hover:border-indigo-400 transition-colors" />
                           <span className="text-sm text-slate-600">{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {field.type === 'checkbox' && (
                    <div className="space-y-2">
                      {field.options?.map((opt, i) => (
                        <label key={i} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white transition-all cursor-pointer group">
                           <div className="w-5 h-5 rounded border-2 border-slate-200 group-hover:border-indigo-400 transition-colors" />
                           <span className="text-sm text-slate-600">{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {field.type === 'select' && (
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-sm focus:bg-white focus:shadow-md transition-all outline-none appearance-none">
                      <option value="">Choose</option>
                      {field.options?.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}
               </div>
             ))}
             
             {form.fields?.length === 0 && (
               <div className="text-center py-20 text-slate-300 italic">This form has no items for preview.</div>
             )}
          </div>
          <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
             <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 text-xs uppercase tracking-widest">
               Submit Prototype
             </button>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">End-User Simulation Mode</p>
          </div>
        </div>
      )}
    </div>
  );
}
