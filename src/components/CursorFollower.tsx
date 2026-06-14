import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CursorFollower = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hoverText, setHoverText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    // Set initial off-screen
    gsap.set([cursor, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: 'power2.out',
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: 'power2.out',
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const parentWithCursor = target.closest('[data-cursor]');
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        parentWithCursor;

      if (isInteractive) {
        setIsHovered(true);
        const dataText = parentWithCursor?.getAttribute('data-cursor');
        setHoverText(dataText || '');
      } else {
        setIsHovered(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Central tiny solid dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-accent hidden md:block"
        style={{ transform: 'translate3d(-50%, -50%, 0)' }}
      />
      {/* Responsive outer brass ring */}
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full border border-accent bg-transparent text-[8px] font-mono tracking-widest text-accent uppercase transition-all duration-300 ease-out hidden md:flex ${
          isHovered ? 'h-16 w-16 bg-accent/5 scale-100' : 'h-8 w-8 scale-75 opacity-30'
        }`}
        style={{ transform: 'translate3d(-50%, -50%, 0)' }}
      >
        {hoverText && <span className="text-center px-1 animate-fade-in">{hoverText}</span>}
      </div>
    </>
  );
};
export default CursorFollower;
