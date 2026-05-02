import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyPosts, dummyComments } from '../data/dummyData';
import { 
  ArrowLeft, 
  Trash2, 
  Eye, 
  EyeOff, 
  MessageSquare, 
  Heart, 
  ShieldAlert,
  User,
  Clock,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Comment as CommentType } from '../types';

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = dummyPosts.find(p => p.id === id);
  const [comments, setComments] = useState<CommentType[]>(
    dummyComments.filter(c => c.postId === id)
  );

  if (!post) {
    return (
      <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Post Protocol Not Found</h2>
        <button onClick={() => navigate('/admin/community/posts')} className="text-indigo-600 font-bold uppercase tracking-widest text-xs">Back to Community Moderation</button>
      </div>
    );
  }

  const toggleCommentVisibility = (commentId: string) => {
    setComments(prev => prev.map(c => 
      c.id === commentId ? { ...c, isHidden: !c.isHidden } : c
    ));
  };

  const deleteComment = (commentId: string) => {
    if (window.confirm('Delete this comment?')) {
      setComments(prev => prev.filter(c => c.id !== commentId));
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4">
        <button 
          onClick={() => navigate('/admin/community/posts')}
          className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft size={12} /> Moderation Registry
        </button>
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 uppercase italic leading-tight">{post.title}</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <User size={14} className="text-indigo-600" /> {post.userName}
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <Clock size={14} className="text-slate-300" /> {new Date(post.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
             <div className="flex flex-col items-center">
                <Heart size={16} className="text-emerald-500 mb-1" />
                <span className="text-lg font-bold text-slate-900 leading-none">{post.likesCount}</span>
             </div>
             <div className="w-px h-8 bg-slate-100 mx-2" />
             <div className="flex flex-col items-center">
                <MessageSquare size={16} className="text-indigo-600 mb-1" />
                <span className="text-lg font-bold text-slate-900 leading-none">{comments.length}</span>
             </div>
          </div>
        </div>
      </header>

      <section className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/20">
         <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap">{post.content}</p>
         </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
           <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-widest italic">
              <ShieldAlert size={18} className="text-indigo-600" /> Intelligence Feed (Comments)
           </h3>
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic font-mono px-3 py-1 bg-slate-100 rounded-lg">
             Moderating {comments.length} units
           </span>
        </div>

        <div className="space-y-4">
          {comments.map((comment, i) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={comment.id}
              className={cn(
                "p-6 rounded-3xl border transition-all relative overflow-hidden",
                comment.isHidden 
                  ? "bg-slate-50 border-slate-100 opacity-60" 
                  : "bg-white border-slate-100 shadow-sm hover:shadow-md"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                     <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                        <User size={14} />
                     </div>
                     <div>
                        <div className="text-[10px] font-bold text-slate-900 uppercase tracking-widest leading-none">{comment.userName}</div>
                        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">{new Date(comment.createdAt).toLocaleString()}</div>
                     </div>
                     {comment.isHidden && (
                        <span className="ml-2 text-[8px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                          LOG HIDDEN
                        </span>
                     )}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed pl-11">{comment.content}</p>
                </div>

                <div className="flex items-center gap-2">
                   <button 
                     onClick={() => toggleCommentVisibility(comment.id)}
                     className={cn(
                       "p-2 rounded-xl border transition-all",
                       comment.isHidden 
                         ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100" 
                         : "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100"
                     )}
                   >
                     {comment.isHidden ? <Eye size={16} /> : <EyeOff size={16} />}
                   </button>
                   <button 
                     onClick={() => deleteComment(comment.id)}
                     className="p-2 bg-red-50 text-red-600 border border-red-100 rounded-xl hover:bg-red-100 transition-all"
                   >
                     <Trash2 size={16} />
                   </button>
                </div>
              </div>
            </motion.div>
          ))}

          {comments.length === 0 && (
            <div className="py-20 text-center bg-slate-50 border border-slate-100 border-dashed rounded-[2rem] text-slate-300 italic text-sm">
               This intelligence unit has no logs yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
