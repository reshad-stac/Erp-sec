import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { dummyPosts } from '../data/dummyData';
import { MessageSquare, Heart, Shield, Eye, EyeOff, Trash2, Search, Filter, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Post } from '../types';

export default function CommunityPostsPage() {
  const [posts, setPosts] = useState<Post[]>(dummyPosts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleVisibility = (id: string) => {
    setPosts(prev => prev.map(post => 
      post.id === id ? { ...post, isHidden: !post.isHidden } : post
    ));
  };

  const deletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(post => post.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 uppercase italic">Community Moderation</h2>
          <p className="text-slate-500 text-sm">Monitor, moderate, and manage user-generated interactions.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts or users..." 
              className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-64 transition-all font-medium"
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 rounded-xl shadow-sm transition-all">
            <Filter size={18} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {filteredPosts.map((post, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={post.id}
            className={cn(
              "bg-white border rounded-3xl p-6 shadow-sm group transition-all",
              post.isHidden ? "border-slate-100 opacity-60 bg-slate-50/50" : "border-slate-200 hover:shadow-xl hover:shadow-indigo-600/5"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">
                    {post.userName}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic font-mono">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  {post.isHidden && (
                    <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <EyeOff size={10} /> Hidden
                    </span>
                  )}
                </div>
                <Link to={`/admin/community/posts/${post.id}`} className="block group/link">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 truncate group-hover/link:text-indigo-600 transition-colors uppercase tracking-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {post.content}
                  </p>
                </Link>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Heart size={14} className="text-emerald-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{post.likesCount} Interactions</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <MessageSquare size={14} className="text-indigo-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{post.commentsCount} Intelligence Logs</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => toggleVisibility(post.id)}
                  title={post.isHidden ? "Make Visible" : "Hide Post"}
                  className={cn(
                    "p-3 rounded-2xl transition-all shadow-sm border",
                    post.isHidden 
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100" 
                      : "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100"
                  )}
                >
                  {post.isHidden ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                <button 
                  onClick={() => deletePost(post.id)}
                  title="Delete Post"
                  className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-2xl hover:bg-red-100 transition-all shadow-sm"
                >
                  <Trash2 size={18} />
                </button>
                <Link 
                  to={`/admin/community/posts/${post.id}`}
                  title="View Detail"
                  className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 rounded-2xl shadow-sm transition-all"
                >
                  <Shield size={18} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredPosts.length === 0 && (
          <div className="py-32 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
              <MessageSquare size={32} />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">No matching posts found</p>
          </div>
        )}
      </div>
    </div>
  );
}
