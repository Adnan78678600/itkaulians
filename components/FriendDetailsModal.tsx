import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GoogleGenAI, Chat } from "@google/genai";
import { Friend } from '../types';

interface FriendDetailsModalProps {
  friend: Friend;
  onClose: () => void;
}

const FriendDetailsModal: React.FC<FriendDetailsModalProps> = ({ friend, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Chat State
  const [isChatMode, setIsChatMode] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);

  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Animation timeline
    const tl = gsap.timeline();
    
    tl.to(modalRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    })
    .from(cardRef.current, {
      y: 40,
      opacity: 0,
      scale: 0.96,
      duration: 0.6,
      ease: "power3.out", // Smoother ease
    }, "-=0.1")
    .from(".animate-item", {
      y: 15,
      opacity: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.3");

    return () => {
      document.body.style.overflow = '';
      tl.kill();
      chatSessionRef.current = null;
    };
  }, []);

  // Initialize Chat
  useEffect(() => {
    const initChat = async () => {
        if (isChatMode && !chatSessionRef.current) {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                chatSessionRef.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: `You are ${friend.name}, a ${friend.role}. 
                        Your bio: "${friend.bio}". Skills: ${friend.skills.join(', ')}.
                        Location: ${friend.location}.
                        Style: Casual, friendly, brief. Match the persona of a ${friend.role}.`,
                    }
                });

                if (messages.length === 0) {
                     setMessages([{ role: 'model', text: `Hey! ${friend.name} here. What's on your mind?` }]);
                }
            } catch (error) {
                setMessages([{ role: 'model', text: "Connection offline." }]);
            }
        }
    };
    initChat();
  }, [isChatMode, friend, messages.length]);

  // Auto-scroll chat
  useEffect(() => {
    if (isChatMode) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatMode, isLoading]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    
    tl.to(cardRef.current, {
      y: 20,
      opacity: 0,
      scale: 0.98,
      duration: 0.2,
      ease: "power2.in"
    })
    .to(modalRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power1.inOut"
    }, "-=0.1");
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
        if (!chatSessionRef.current) {
             const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
             chatSessionRef.current = ai.chats.create({ model: 'gemini-2.5-flash' });
        }
        if (chatSessionRef.current) {
            const result = await chatSessionRef.current.sendMessage({ message: userText });
            setMessages(prev => [...prev, { role: 'model', text: result.text }]);
        }
    } catch (error) {
        setMessages(prev => [...prev, { role: 'model', text: "..." }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 opacity-0"
    >
      {/* Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={handleClose}
      />

      {/* Main Card Container - Reduced max-width and height for better fit */}
      <div 
        ref={cardRef}
        className="relative w-full max-w-5xl h-[80vh] md:h-[600px] bg-[#09090b]/80 backdrop-blur-3xl border border-white/10 rounded-[32px] shadow-[0_0_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col md:flex-row ring-1 ring-white/5"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Close Button (Desktop) */}
        <button 
          onClick={handleClose}
          className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-black/40 text-white/70 hover:bg-white/10 hover:text-white hover:rotate-90 transition-all duration-300 backdrop-blur-md border border-white/5"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {/* --- LEFT COLUMN: IMAGE (Visual) - Set to 50% --- */}
        <div className="relative w-full md:w-1/2 h-2/5 md:h-full group">
          {/* Image */}
          <img 
            src={friend.imageUrl} 
            alt={friend.name} 
            className="w-full h-full object-cover object-center transition-transform duration-[2s] group-hover:scale-105"
          />
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-90 md:opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent opacity-60" />

          {/* Role Badge (Top Right) */}
          <div className="absolute top-6 left-6 md:left-auto md:right-6 animate-item">
            <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded shadow-lg">
              {friend.role}
            </span>
          </div>

          {/* Name Overlay (Mobile Only - visible when stacked) */}
          <div className="absolute bottom-4 left-6 md:hidden">
             <h2 className="text-3xl font-bold text-white drop-shadow-md">{friend.name}</h2>
          </div>
        </div>

        {/* --- RIGHT COLUMN: DETAILS & CHAT - Set to 50% --- */}
        <div className="relative w-full md:w-1/2 h-3/5 md:h-full bg-gradient-to-b from-white/[0.02] to-transparent flex flex-col overflow-hidden border-l border-white/5">
          
          {/* CONTENT VIEW */}
          <div className={`flex flex-col h-full p-6 md:p-8 transition-all duration-500 ${isChatMode ? 'opacity-0 translate-x-10 pointer-events-none absolute inset-0' : 'opacity-100 translate-x-0 relative'}`}>
             
             {/* Header Info */}
             <div className="mb-8 hidden md:block animate-item">
               <h2 className="text-4xl font-bold text-white tracking-tight mb-2">{friend.name}</h2>
               <div className="flex items-center gap-3 text-zinc-400 font-mono text-sm">
                 {/* Instagram Link */}
                 <a 
                   href={`https://www.instagram.com/${friend.username.replace(/^@/, '')}/`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all group/insta"
                 >
                   <svg 
                     className="w-4 h-4 fill-current transition-transform group-hover/insta:scale-110" 
                     viewBox="0 0 24 24" 
                     xmlns="http://www.w3.org/2000/svg"
                   >
                     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                   </svg>
                   <span>{friend.username}</span>
                 </a>
                 
                 <span className="text-zinc-600">•</span>
                 <span>{friend.location}</span>
               </div>
             </div>

             {/* Bio Section */}
             <div className="flex-grow space-y-8 overflow-y-auto custom-scrollbar pr-2 animate-item">
                <div>
                   <h3 className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-3">About</h3>
                   <p className="text-zinc-300 leading-relaxed font-light text-sm md:text-base border-l-2 border-white/10 pl-4">
                     {friend.bio}
                   </p>
                </div>

                <div>
                   <h3 className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-3">Expertise</h3>
                   <div className="flex flex-wrap gap-2">
                     {friend.skills.map((skill, i) => (
                       <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-zinc-300 hover:bg-white/10 hover:border-white/20 transition-all cursor-default">
                         {skill}
                       </span>
                     ))}
                   </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4">
                  <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5 flex flex-col items-center justify-center hover:bg-white/[0.06] transition-colors">
                    <span className="text-lg font-bold text-white font-mono">{friend.stats.views}</span>
                    <span className="text-[8px] uppercase tracking-wider text-zinc-500 mt-1">Views</span>
                  </div>
                  <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5 flex flex-col items-center justify-center hover:bg-white/[0.06] transition-colors">
                    <span className="text-lg font-bold text-white font-mono">{friend.stats.likes}</span>
                    <span className="text-[8px] uppercase tracking-wider text-zinc-500 mt-1">Likes</span>
                  </div>
                   <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5 flex flex-col items-center justify-center hover:bg-white/[0.06] transition-colors">
                    <span className="text-lg font-bold text-white font-mono">{friend.projects}</span>
                    <span className="text-[8px] uppercase tracking-wider text-zinc-500 mt-1">Projects</span>
                  </div>
                </div>
             </div>

             {/* CTA */}
             <div className="mt-6 pt-6 border-t border-white/5 animate-item">
               <button 
                 onClick={() => setIsChatMode(true)}
                 className="w-full group relative overflow-hidden rounded-xl bg-white text-black font-bold py-4 transition-all hover:bg-zinc-200"
               >
                 <span className="relative z-10 flex items-center justify-center gap-2">
                   Message {friend.name}
                   <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                 </span>
               </button>
             </div>
          </div>

          {/* CHAT INTERFACE OVERLAY */}
          <div 
             className={`absolute inset-0 z-20 flex flex-col bg-[#09090b]/40 backdrop-blur-xl transition-all duration-500 ease-in-out ${!isChatMode ? 'translate-x-full opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'}`}
          >
             {/* Chat Header */}
             <div className="flex items-center gap-4 p-5 pl-6 border-b border-white/5 bg-white/[0.02]">
                <button 
                  onClick={() => setIsChatMode(false)} 
                  className="p-2 -ml-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <div className="flex items-center gap-3">
                   <div className="relative">
                     <img src={friend.imageUrl} className="w-10 h-10 rounded-full object-cover border border-white/10" alt="avatar" />
                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#09090b] rounded-full"></div>
                   </div>
                   <div>
                      <h3 className="font-bold text-white text-sm">{friend.name}</h3>
                      <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">{isLoading ? 'Typing...' : 'Online'}</p>
                   </div>
                </div>
             </div>

             {/* Messages */}
             <div className="flex-grow overflow-y-auto p-5 pl-6 space-y-4 custom-scrollbar">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-white text-black font-medium rounded-br-sm' 
                        : 'bg-zinc-800/80 backdrop-blur-sm border border-white/10 text-zinc-100 rounded-bl-sm'
                    }`}>
                       {msg.text}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                     <div className="bg-zinc-800/50 border border-white/5 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-100"></span>
                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-200"></span>
                     </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
             </div>

             {/* Chat Input */}
             <div className="p-5 pl-6 border-t border-white/5 bg-white/[0.02]">
                <form onSubmit={handleSendMessage} className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full bg-white/5 border border-white/10 rounded-full pl-5 pr-14 py-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all"
                    autoFocus={isChatMode}
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 top-2 p-2 bg-white text-black rounded-full hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all"
                  >
                     <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                  </button>
                </form>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FriendDetailsModal;