import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import Lenis from 'lenis';
import DitherBackground from './components/DitherBackground';
import FriendCard from './components/FriendCard';
import FriendDetailsModal from './components/FriendDetailsModal';
import { FRIENDS_DATA } from './constants';
import { Friend } from './types';

const App = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  // Initial Entrance Animation & Lenis Setup
  useEffect(() => {
    // Lenis Smooth Scroll Setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      // Fix: Updated Lenis options for v1 API
      orientation: 'vertical', 
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // GSAP Context
    const ctx = gsap.context(() => {
      // Animate Header Container
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        delay: 0.1
      });

      // Animate Header Internal Elements
      gsap.from(".header-element", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.4
      });

      // Animate Grid Items Staggered
      gsap.from(".friend-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "back.out(1.2)",
        delay: 0.6
      });
    });

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  const handleFriendClick = (friend: Friend) => {
    setSelectedFriend(friend);
  };

  const handleCloseModal = () => {
    setSelectedFriend(null);
  };

  return (
    <div className="relative w-full min-h-screen text-white overflow-x-hidden selection:bg-white/20 selection:text-white">
      
      {/* 3D Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <DitherBackground />
        </Canvas>
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 w-full min-h-screen flex flex-col max-w-[1600px] mx-auto p-4 md:p-8 gap-12">
        
        {/* Sticky Top Navigation Bar */}
        <header ref={headerRef} className="sticky top-6 z-50 w-full flex justify-center items-center pointer-events-none">
          <div className="pointer-events-auto header-element">
            
            {/* Premium Button Container */}
            <div className="relative group">
              {/* Outer Glow for depth */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-white/10 via-zinc-400/20 to-white/10 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-700" />
              
              {/* Border Beam Wrapper */}
              <div className="relative inline-flex overflow-hidden rounded-full p-[1px] shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
                
                {/* Spinning Conic Gradient Border */}
                <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#71717a_50%,#000000_100%)] opacity-100" />
                
                {/* Inner Content Pill */}
                <div className="relative inline-flex h-full w-full items-center justify-center rounded-full bg-[#0a0a0a]/95 px-12 py-3 backdrop-blur-3xl">
                   {/* Logo Text */}
                  <h1 ref={titleRef} className="font-display text-xl md:text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600 uppercase drop-shadow-sm select-none">
                    ITKAULIANS
                  </h1>
                </div>
              </div>
            </div>

          </div>
        </header>

        {/* Main Grid Section */}
        <main className="flex-grow">
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
            {FRIENDS_DATA.map((friend) => (
              <div key={friend.id} className="friend-card opacity-100">
                <FriendCard friend={friend} onClick={handleFriendClick} />
              </div>
            ))}
            
            {/* Add New Card Placeholder */}
            <div className="friend-card group border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center min-h-[300px] hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              </div>
              <span className="text-zinc-500 font-mono text-sm">Add Friend</span>
            </div>
          </div>
        </main>
      </div>

      {/* Details Modal */}
      {selectedFriend && (
        <FriendDetailsModal friend={selectedFriend} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;