import { useEffect, useState, useRef } from 'react';

export default function ThreeDBackground() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      
      // Normalize coordinate offsets to range [-0.5, 0.5]
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      
      setCoords({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#030303]"
    >
      {/* Layer 1: Ambient Redoubt Gold Shimmering Orbs */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#d4af37]/5 to-[#b38f12]/10 blur-[150px] transition-transform duration-1000 ease-out"
        style={{
          transform: `translate3d(${coords.x * -60}px, ${coords.y * -60}px, 0) scale(1.1)`,
          top: '15%',
          left: '10%',
        }}
      />
      <div 
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#b38f12]/4 to-[#d4af37]/8 blur-[180px] transition-transform duration-1000 ease-out"
        style={{
          transform: `translate3d(${coords.x * 40}px, ${coords.y * 40}px, 0)`,
          bottom: '10%',
          right: '5%',
        }}
      />

      {/* Layer 2: Cyber Glass Grid with 3D Perspective rotation */}
      <div 
        className="absolute inset-0 opacity-12 transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(212, 175, 55, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(212, 175, 55, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          transform: `perspective(1000px) rotateX(${coords.y * 12}deg) rotateY(${coords.x * -12}deg) translateZ(-40px) scale(1.05)`,
        }}
      />

      {/* Layer 3: Tech Crosshairs and HUD Indicators pointing to luxury coords */}
      <svg
        className="absolute inset-0 w-full h-full text-[#d4af37]/20 transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${coords.x * 20}px, ${coords.y * 20}px, 0)`,
        }}
      >
        {/* Decorative corner target paths */}
        <path d="M 40,40 L 80,40 M 40,40 L 40,80" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M 40,240 L 40,200" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="40" cy="200" r="2" fill="currentColor" />
        
        {/* Vertical status lines */}
        <line x1="120" y1="0" x2="120" y2="400" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
        
        {/* Floating tech nodes */}
        <circle cx="120" cy="150" r="4" stroke="currentColor" strokeWidth="1" fill="none" className="animate-ping" />
        <circle cx="120" cy="150" r="1.5" fill="currentColor" />

        {/* Bottom indicators */}
        <path d="M 90% 90% L 95% 90%" stroke="currentColor" strokeWidth="1" />
        <text x="88%" y="88%" className="font-mono text-[8px] fill-[#d4af37]/40 tracking-widest text-right">COORD_SYS: SYSTEM_Active</text>
      </svg>

      {/* Particle dust elements floating natively */}
      <div className="absolute inset-0 z-0">
        {[20, 45, 75, 12, 88, 32, 60, 52, 95, 23].map((num, idx) => (
          <div
            key={idx}
            className="absolute rounded-full bg-[#d4af37]/45 animate-pulse"
            style={{
              width: `${(idx % 3) + 2}px`,
              height: `${(idx % 3) + 2}px`,
              top: `${(num * 1.3) % 100}%`,
              left: `${(num * 3.7) % 100}%`,
              boxShadow: '0 0 8px rgba(212,175,55,0.7)',
              animationDuration: `${(idx % 4) + 3}s`,
              transform: `translate3d(${coords.x * -(idx * 1.5 + 4)}px, ${coords.y * -(idx * 1.5 + 4)}px, 0)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
