import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Bell, 
  Calendar, 
  FileText,
  Database,
  Settings,
  LogOut,
  ChevronRight,
  ChevronDown,
  Info,
  Activity as ActivityIcon,
  BookOpen
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Members', path: '/admin/members' },
  { icon: Bell, label: 'Notices', path: '/admin/notices' },
];

const eventItems = [
  { icon: Calendar, label: 'Event Manager', path: '/admin/events' },
  { icon: Database, label: 'Event Analytics', path: '/admin/events/analytics' },
];

const formItems = [
  { icon: FileText, label: 'Form Engine', path: '/admin/forms' },
  { icon: Database, label: 'Form Intelligence', path: '/admin/forms/responses' },
];

const infoItems = [
  { icon: ActivityIcon, label: 'Activities', path: '/admin/infos/activities' },
  { icon: BookOpen, label: 'Publications', path: '/admin/infos/publications' },
];

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [formsOpen, setFormsOpen] = useState(location.pathname.startsWith('/admin/forms'));
  const [eventsOpen, setEventsOpen] = useState(location.pathname.startsWith('/admin/events'));
  const [infosOpen, setInfosOpen] = useState(location.pathname.startsWith('/admin/infos'));

  return (
    <motion.aside 
      initial={false}
      animate={{ width: collapsed ? 80 : 256 }}
      className="bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 z-40"
    >
      <div className="p-6 border-b border-slate-100 flex items-center justify-between min-h-[85px]">
        {!collapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 overflow-hidden whitespace-nowrap"
          >
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-600/20">
              <span className="text-[10px] font-bold">SEC</span>
            </div>
            <h1 className="text-sm font-bold text-slate-900 tracking-tight">
              SEC DIU <span className="text-slate-400 font-normal">Club</span>
            </h1>
          </motion.div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white mx-auto shadow-lg shadow-indigo-600/20">
            <span className="text-[10px] font-bold">SEC</span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all absolute -right-4 top-1/2 -translate-y-1/2 bg-white border border-slate-200 shadow-sm z-50",
            collapsed ? "-right-3" : "-right-4"
          )}
        >
          <ChevronRight className={cn("transition-transform duration-300", !collapsed && "rotate-180")} size={14} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group text-sm font-medium relative",
                isActive 
                  ? "bg-indigo-50 text-indigo-700 font-semibold" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                collapsed && "justify-center px-0"
              )}
            >
              <item.icon size={18} className={cn(isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600")} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
              )}
            </Link>
          );
        })}

        {/* Events Dropdown */}
        <div className="space-y-1">
          <button
            onClick={() => !collapsed && setEventsOpen(!eventsOpen)}
            title={collapsed ? "Events" : undefined}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group text-sm font-medium",
              location.pathname.startsWith('/admin/events') 
                ? "bg-slate-50 text-slate-900" 
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              collapsed && "justify-center px-0"
            )}
          >
            <Calendar size={18} className={cn(location.pathname.startsWith('/admin/events') ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600")} />
            {!collapsed && (
              <>
                <span className="whitespace-nowrap">Events</span>
                <ChevronDown 
                  size={14} 
                  className={cn(
                    "ml-auto transition-transform duration-200 text-slate-400 shrink-0",
                    eventsOpen && "rotate-180"
                  )} 
                />
              </>
            )}
          </button>

          <AnimatePresence>
            {eventsOpen && !collapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden space-y-1 pl-9"
              >
                {eventItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-xs font-bold uppercase tracking-widest whitespace-nowrap",
                        isActive 
                          ? "text-indigo-600" 
                          : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Forms Dropdown */}
        <div className="space-y-1">
          <button
            onClick={() => !collapsed && setFormsOpen(!formsOpen)}
            title={collapsed ? "Forms" : undefined}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group text-sm font-medium",
              location.pathname.startsWith('/admin/forms') 
                ? "bg-slate-50 text-slate-900" 
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              collapsed && "justify-center px-0"
            )}
          >
            <FileText size={18} className={cn(location.pathname.startsWith('/admin/forms') ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600")} />
            {!collapsed && (
              <>
                <span className="whitespace-nowrap">Forms</span>
                <ChevronDown 
                  size={14} 
                  className={cn(
                    "ml-auto transition-transform duration-200 text-slate-400 shrink-0",
                    formsOpen && "rotate-180"
                  )} 
                />
              </>
            )}
          </button>

          <AnimatePresence>
            {formsOpen && !collapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden space-y-1 pl-9"
              >
                {formItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-xs font-bold uppercase tracking-widest whitespace-nowrap",
                        isActive 
                          ? "text-indigo-600" 
                          : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Infos Dropdown */}
        <div className="space-y-1">
          <button
            onClick={() => !collapsed && setInfosOpen(!infosOpen)}
            title={collapsed ? "Infos" : undefined}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group text-sm font-medium",
              location.pathname.startsWith('/admin/infos') 
                ? "bg-slate-50 text-slate-900" 
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              collapsed && "justify-center px-0"
            )}
          >
            <Info size={18} className={cn(location.pathname.startsWith('/admin/infos') ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600")} />
            {!collapsed && (
              <>
                <span className="whitespace-nowrap">Infos</span>
                <ChevronDown 
                  size={14} 
                  className={cn(
                    "ml-auto transition-transform duration-200 text-slate-400 shrink-0",
                    infosOpen && "rotate-180"
                  )} 
                />
              </>
            )}
          </button>

          <AnimatePresence>
            {infosOpen && !collapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden space-y-1 pl-9"
              >
                {infoItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-xs font-bold uppercase tracking-widest whitespace-nowrap",
                        isActive 
                          ? "text-indigo-600" 
                          : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button 
          title={collapsed ? "Sign Out" : undefined}
          className={cn(
            "flex items-center gap-3 px-3 py-2 w-full rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all text-left text-sm font-medium",
            collapsed && "justify-center px-0"
          )}
        >
          <LogOut size={18} />
          {!collapsed && <span className="whitespace-nowrap">Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  );
}
