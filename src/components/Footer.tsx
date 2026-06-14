import * as React from "react";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Mail } from "lucide-react";

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES FOR VANTABLACK STUDIOS (Brass & Black)
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  -webkit-font-smoothing: antialiased;
  
  /* Dynamic variables using Vantablack Studios design tokens */
  --pill-bg-1: color-mix(in srgb, hsl(var(--foreground)) 3%, transparent);
  --pill-bg-2: color-mix(in srgb, hsl(var(--foreground)) 1%, transparent);
  --pill-shadow: rgba(0, 0, 0, 0.8);
  --pill-highlight: color-mix(in srgb, hsl(var(--foreground)) 10%, transparent);
  --pill-inset-shadow: rgba(0, 0, 0, 0.4);
  --pill-border: color-mix(in srgb, hsl(var(--accent)) 15%, transparent);
  
  --pill-bg-1-hover: color-mix(in srgb, hsl(var(--foreground)) 8%, transparent);
  --pill-bg-2-hover: color-mix(in srgb, hsl(var(--foreground)) 2%, transparent);
  --pill-border-hover: hsl(var(--accent));
  --pill-shadow-hover: rgba(0, 0, 0, 0.9);
  --pill-highlight-hover: color-mix(in srgb, hsl(var(--foreground)) 20%, transparent);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.08); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { 
    transform: scale(1); 
    filter: drop-shadow(0 0 4px color-mix(in srgb, hsl(var(--accent)) 50%, transparent)); 
  }
  15%, 45% { 
    transform: scale(1.15); 
    filter: drop-shadow(0 0 10px color-mix(in srgb, hsl(var(--accent)) 80%, transparent)); 
  }
  30% { 
    transform: scale(1); 
  }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 42s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, color-mix(in srgb, hsl(var(--foreground)) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in srgb, hsl(var(--foreground)) 3%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

/* Theme-adaptive Amber/Brass Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    color-mix(in srgb, hsl(var(--accent)) 10%, transparent) 0%, 
    color-mix(in srgb, hsl(var(--border)) 5%, transparent) 40%, 
    transparent 70%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: hsl(var(--accent));
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 15vw;
  line-height: 0.75;
  font-weight: 300;
  letter-spacing: 0.1em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in srgb, hsl(var(--accent)) 12%, transparent);
  background: linear-gradient(180deg, color-mix(in srgb, hsl(var(--accent)) 15%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
  text-transform: uppercase;
}

/* Metallic Text Glow */
.footer-text-glow {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: linear-gradient(180deg, hsl(var(--foreground)) 0%, color-mix(in srgb, hsl(var(--foreground)) 45%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 30px color-mix(in srgb, hsl(var(--accent)) 25%, transparent));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
    to?: string;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MARQUEE ITEM DEFINITION
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6 font-mono text-xs tracking-[0.25em] text-muted-foreground/60 uppercase">
    <span>PATINA & SILENCE</span> <span className="text-accent/40">✦</span>
    <span>BRUTALIST GEOMETRY</span> <span className="text-accent/40">✦</span>
    <span>MATERIAL HONESTY</span> <span className="text-accent/40">✦</span>
    <span>ATMOSPHERIC LUXURY</span> <span className="text-accent/40">✦</span>
    <span>SCULPTED SHADOW</span> <span className="text-accent/40">✦</span>
    <span>ZÜRICH & MALIBU</span> <span className="text-accent/40">✦</span>
  </div>
);

// -------------------------------------------------------------------------
// 4. MAIN EXPORTED COMPONENT
// -------------------------------------------------------------------------
export const Footer = () => {
  const { pathname } = useLocation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Giant Text Parallax Reveal
      gsap.fromTo(
        giantTextRef.current,
        { y: "8vh", scale: 0.9, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Staggered Content Reveal
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, [pathname]);

  const handleFooterLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant" as ScrollBehavior,
    });
    // Dispatch events to trigger any scroll actions/observers
    setTimeout(() => {
      window.dispatchEvent(new Event("scroll"));
      window.dispatchEvent(new Event("resize"));
    }, 50);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* Curtain Reveal Spacer/Wrapper */}
      <div
        ref={wrapperRef}
        className="relative h-auto md:h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        {/* Fixed Footer reveal overlay on desktop, relative flow on mobile */}
        <footer className="relative md:fixed bottom-0 left-0 flex h-auto min-h-screen md:h-screen w-full flex-col justify-between overflow-hidden bg-background text-foreground cinematic-footer-wrapper border-t border-accent/10 py-16 md:py-0">
          
          {/* Ambient Warm Amber Light & Technical Grid */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background brand name */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[1.5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
          >
            Vantablack
          </div>

          {/* 1. Diagonal Sleek Brand Marquee (Top of footer) */}
          <div className="absolute top-16 left-0 w-full overflow-hidden border-y border-accent/10 bg-background/50 backdrop-blur-md py-4.5 z-10 -rotate-1 scale-105 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-20 w-full max-w-5xl mx-auto">
            <h2
              ref={headingRef}
              className="text-4xl md:text-7xl lg:text-8xl font-normal footer-text-glow tracking-wide mb-12 text-center"
            >
              Ready to begin?
            </h2>

            {/* Interactive Magnetic Glass Pills */}
            <div ref={linksRef} className="flex flex-col items-center gap-6 w-full">
              {/* Primary Actions */}
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <MagneticButton as={Link} to="/contact" onClick={handleFooterLinkClick} className="footer-glass-pill px-10 py-5 rounded-full text-accent font-mono text-xs tracking-widest uppercase flex items-center gap-3 group">
                  <Mail className="w-4 h-4 text-accent/80 group-hover:text-accent transition-colors" />
                  Start An Inquiry
                </MagneticButton>
                
                <MagneticButton as={Link} to="/projects" onClick={handleFooterLinkClick} className="footer-glass-pill px-10 py-5 rounded-full text-foreground font-mono text-xs tracking-widest uppercase flex items-center gap-3 group hover:text-accent">
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  Explore Works
                </MagneticButton>
              </div>

              {/* Secondary Brand Directory */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-6 w-full mt-2 font-mono text-[10px] tracking-wider">
                <MagneticButton as={Link} to="/studio" onClick={handleFooterLinkClick} className="footer-glass-pill px-6 py-3 rounded-full text-muted-foreground hover:text-accent">
                  The Studio
                </MagneticButton>
                <MagneticButton as={Link} to="/journal" onClick={handleFooterLinkClick} className="footer-glass-pill px-6 py-3 rounded-full text-muted-foreground hover:text-accent">
                  The Journal
                </MagneticButton>
                <MagneticButton as="a" href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-glass-pill px-6 py-3 rounded-full text-muted-foreground hover:text-accent">
                  Instagram
                </MagneticButton>
                <MagneticButton as="a" href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-glass-pill px-6 py-3 rounded-full text-muted-foreground hover:text-accent">
                  LinkedIn
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Copyright */}
            <div className="md:flex-1 flex justify-start order-2 md:order-1">
              <span className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                © 2026 Vantablack Studios. All rights reserved.
              </span>
            </div>

            {/* Custom Aesthetic Brand Badge */}
            <div className="flex justify-center order-1 md:order-2">
              <div className="footer-glass-pill px-6 py-3 rounded-full flex items-center gap-2 cursor-default border-accent/20">
                <span className="text-muted-foreground font-mono text-[9px] tracking-widest uppercase">Crafted with</span>
                <span className="animate-footer-heartbeat text-sm text-accent">❤</span>
                <span className="text-muted-foreground font-mono text-[9px] tracking-widest uppercase">by</span>
                <span className="text-foreground font-display text-xs tracking-wide ml-1">Baibhab Bose - QuantumCX</span>
              </div>
            </div>

            {/* Back to top */}
            <div className="md:flex-1 flex justify-end order-3">
              <MagneticButton
                as="button"
                onClick={scrollToTop}
                className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-muted-foreground hover:text-accent group"
              >
                <svg className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
              </MagneticButton>
            </div>

          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
