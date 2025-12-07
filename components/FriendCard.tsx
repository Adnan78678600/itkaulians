import React from 'react';
import { Friend } from '../types';

interface FriendCardProps {
  friend: Friend;
  onClick: (friend: Friend) => void;
}

const FriendCard: React.FC<FriendCardProps> = ({ friend, onClick }) => {
  return (
    <div 
      onClick={() => onClick(friend)}
      className="group relative flex flex-col rounded-xl bg-zinc-900/60 backdrop-blur-md border border-white/5 hover:border-white/20 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-900/20 overflow-hidden h-full cursor-pointer"
    >
      
      {/* Image Container with Dither overlay effect simulation */}
      <div className="relative aspect-square w-full overflow-hidden">
        {/* The Image */}
        <img 
          src={friend.imageUrl} 
          alt={friend.name} 
          className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 grayscale-[0.4] group-hover:grayscale-0 group-hover:contrast-110"
        />
        
        {/* Color Tint Overlay that vanishes on hover to create 'color shift' */}
        <div className="absolute inset-0 bg-indigo-900/20 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-0" />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-60" />
        
        {/* Role Badge */}
        <div className="absolute top-3 right-3 px-2 py-1 text-[10px] uppercase tracking-wider font-bold text-white bg-black/60 backdrop-blur-sm rounded border border-white/10 group-hover:border-cyan-500/30 transition-colors duration-300">
          {friend.role}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 relative">
        {/* Subtle decorative line that expands/glows on hover */}
        <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-cyan-500/50 transition-all duration-500" />

        <div className="mb-1 transform transition-transform duration-300 group-hover:translate-x-1">
          <h3 className="text-white font-semibold text-lg tracking-tight group-hover:text-cyan-200 transition-colors">
            {friend.name}
          </h3>
          <p className="text-zinc-500 text-xs font-mono group-hover:text-zinc-300 transition-colors">{friend.username}</p>
        </div>

        <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 mt-3 mb-4 flex-grow font-sans group-hover:text-zinc-400 transition-colors">
          {friend.bio}
        </p>

        {/* Footer Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5 group-hover:border-white/10 text-xs text-zinc-500 font-mono transition-colors duration-300">
          <div className="flex items-center gap-1 group-hover:text-cyan-100 transition-colors">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            <span>{friend.stats.likes}</span>
          </div>
          <div className="flex items-center gap-1 group-hover:text-cyan-100 transition-colors">
             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            <span>{friend.stats.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;