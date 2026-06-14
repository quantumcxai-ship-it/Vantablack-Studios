import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Award, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const featuredProjects = [
  {
    num: "01",
    title: "THE OBSIDIAN HOUSE",
    category: "Residential",
    location: "Zurich, Switzerland",
    image: "/luxury_living.png",
    id: "obsidian-house"
  },
  {
    num: "02",
    title: "ELYSIUM PAVILION",
    category: "Hospitality",
    location: "Kyoto, Japan",
    image: "/lounge_interior.png",
    id: "elysium-pavilion"
  },
  {
    num: "03",
    title: "ATRIUM OF SHADOWS",
    category: "Commercial",
    location: "New York, USA",
    image: "/kitchen_detail.png",
    id: "atrium-of-shadows"
  },
  {
    num: "04",
    title: "VILLA SOLE",
    category: "Residential",
    location: "Malibu, USA",
    image: "/brutalist_villa.png",
    id: "villa-sole"
  }
];

const awards = [
  { year: "2025", title: "AD100 Elite Architect List", category: "Global Recognition", image: "/luxury_living.png", projectId: "obsidian-house" },
  { year: "2024", title: "Pritzker Architectural Prize", category: "Honorable Mention", image: "/brutalist_villa.png", projectId: "villa-sole" },
  { year: "2023", title: "Mies van der Rohe Award", category: "Best Residential Project", image: "/kitchen_detail.png", projectId: "atrium-of-shadows" },
  { year: "2022", title: "Grand Prix du Design", category: "Luxury Lounge Architecture", image: "/lounge_interior.png", projectId: "elysium-pavilion" }
];

const TypewriterText = ({ 
  text, 
  progress, 
  range 
}: { 
  text: string; 
  progress: number; 
  range: [number, number]; 
}) => {
  const [start, end] = range;
  
  let charIndex = 0;
  if (progress > start) {
    if (progress >= end) {
      charIndex = text.length;
    } else {
      const factor = (progress - start) / (end - start);
      charIndex = Math.floor(factor * text.length);
    }
  }

  const displayedText = text.slice(0, charIndex);

  return (
    <span>
      <span>{displayedText}</span>
      {progress > start && progress < end && (
        <span className="animate-pulse text-accent mx-[1px] font-bold">|</span>
      )}
      <span className="text-transparent select-none pointer-events-none">{text.slice(charIndex)}</span>
    </span>
  );
};

export const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const animContainerRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const ethosRef = useRef<HTMLDivElement>(null);
  const [ethosProgress, setEthosProgress] = useState(0);
  const [hoveredAwardIndex, setHoveredAwardIndex] = useState<number | null>(null);

  useEffect(() => {
    // Force scroll to top on page load/mount/refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // 1. Text entrance animation and video fade in on page load
      const container = animContainerRef.current;
      if (container) {
        const badge = container.querySelector(".hero-badge");
        const title = container.querySelector(".hero-title");
        const subtitle = container.querySelector(".hero-subtitle");
        const arrow = container.querySelector(".hero-arrow");

        const tl = gsap.timeline();

        // Staggered reveal for text
        tl.fromTo(badge, 
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(title, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" },
          "-=0.5"
        );

        // Only animate navbar in timeline if we are currently viewing the hero
        if (window.scrollY < window.innerHeight - 80) {
          tl.fromTo("nav",
            { opacity: 0, y: -20 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 1.2, 
              ease: "power3.out",
              onComplete: () => {
                const navElement = document.querySelector("nav");
                if (navElement) {
                  navElement.classList.remove("pointer-events-none");
                }
              }
            },
            "<" // Start at the same time as the title animation
          );
        } else {
          // If loaded scrolled down, ensure nav is hidden
          gsap.set("nav", { opacity: 0, pointerEvents: "none" });
        }

        tl.fromTo([subtitle, arrow], 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.2 },
          "-=0.6"
        )
        // Fade in the video background container after text starts appearing
        .fromTo(".video-container",
          { opacity: 0 },
          { opacity: 1, duration: 1.5, ease: "power2.out" },
          "-=0.2"
        );
      }

      // Initialize GSAP MatchMedia for responsive scroll triggers
      const mm = gsap.matchMedia();

      // Mobile: shorter pin typewriter, no horizontal scroll
      mm.add("(max-width: 767px)", () => {
        const ethos = ethosRef.current;
        if (ethos) {
          ScrollTrigger.create({
            trigger: ethos,
            start: "top top",
            end: "+=1200",
            pin: true,
            scrub: 1.0,
            onUpdate: (self) => {
              setEthosProgress(self.progress);
            }
          });
        }
      });

      // Desktop: longer pin typewriter, horizontal scroll gallery
      mm.add("(min-width: 768px)", () => {
        const ethos = ethosRef.current;
        if (ethos) {
          ScrollTrigger.create({
            trigger: ethos,
            start: "top top",
            end: "+=2200",
            pin: true,
            scrub: 1.5,
            onUpdate: (self) => {
              setEthosProgress(self.progress);
            }
          });
        }

        const horizSec = horizontalSectionRef.current;
        const horizScroll = horizontalScrollRef.current;
        if (horizSec && horizScroll) {
          const scrollWidth = horizScroll.scrollWidth;
          const windowWidth = window.innerWidth;
          
          gsap.to(horizScroll, {
            x: -(scrollWidth - windowWidth),
            ease: "none",
            scrollTrigger: {
              trigger: horizSec,
              start: "top top",
              end: () => `+=${scrollWidth - windowWidth}`,
              scrub: true,
              pin: true,
              invalidateOnRefresh: true,
              anticipatePin: 1
            }
          });
        }
      });

      // Staggered reveals for other sections on scroll
      if (container) {
        // 4. Awards Section reveal
        gsap.fromTo(".index-awards-anim",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".index-awards-anim",
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );

        // 5. Inquire Banner reveal
        gsap.fromTo(".index-cta-anim",
          { opacity: 0, scale: 0.98 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".index-cta-anim",
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }
    });

    return () => {
      ctx.revert();
      const navElement = document.querySelector("nav");
      if (navElement) {
        gsap.set(navElement, { clearProps: "all" });
      }
    };
  }, []);

  return (
    <div className="w-full bg-background text-foreground selection:bg-accent selection:text-black">
      
      {/* 1. Full-bleed Hero with video background */}
      <section 
        ref={heroRef} 
        className="relative h-screen w-full flex items-center justify-center overflow-hidden z-10 bg-black"
      >
        {/* Full-bleed stretched Vimeo player iframe inside a container that gets faded in */}
        <div className="video-container absolute inset-0 w-full h-full overflow-hidden z-[1] pointer-events-none opacity-0">
          <iframe
            ref={iframeRef}
            src="https://player.vimeo.com/video/1201135698?autoplay=1&muted=1&loop=1&controls=0&background=1&playsinline=1"
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
            allow="autoplay; fullscreen"
            frameBorder="0"
            title="Vantablack Studios Hero Background"
          />
        </div>

        {/* Slight black translucent overlay (20% opacity) */}
        <div className="absolute inset-0 z-[2] pointer-events-none" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }} />

        {/* Bottom Smooth Gradient Fade to black */}
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-background to-transparent z-[2] pointer-events-none" />

        {/* Pinned Title Content (Stays visible, animated in on mount) */}
        <div 
          ref={animContainerRef}
          className="relative z-[3] text-center px-8 py-12 max-w-5xl"
          style={{
            background: "radial-gradient(circle, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 80%)"
          }}
        >
          <span className="hero-badge font-mono text-xs tracking-[0.4em] text-accent uppercase mb-6 block opacity-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            ESTABLISHED IN BLACK
          </span>
          <h1 
            ref={heroTitleRef}
            className="hero-title font-display text-4xl xs:text-5xl md:text-8xl lg:text-[140px] leading-none tracking-tight font-normal text-foreground uppercase select-none opacity-0 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
          >
            Vantablack<br />Studios
          </h1>
          <p className="hero-subtitle font-body text-xs md:text-sm tracking-[0.2em] text-muted-foreground uppercase mt-8 block opacity-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Luxury Interior Design & Architecture
          </p>
          <button
            onClick={() => ethosRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="hero-arrow font-body text-xs tracking-[0.2em] text-accent hover:text-white uppercase mt-4 inline-block opacity-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-colors duration-300 cursor-pointer"
          >
            Scroll to Enter the Gallery
          </button>
        </div>
      </section>

      {/* 2. Studio Ethos Section */}
      <section 
        ref={ethosRef} 
        className="w-full min-h-screen py-24 px-6 md:px-16 flex flex-col items-center justify-center relative bg-background z-10"
      >
        {/* Gap Coverage Overlays */}
        <div className="absolute -top-4 left-0 w-full h-4 bg-black pointer-events-none z-[12]" />
        <div className="absolute -bottom-4 left-0 w-full h-4 bg-black pointer-events-none z-[12]" />

        {/* Ambient Transition Overlays */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent pointer-events-none z-[11]" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-[11]" />
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-16 md:gap-32 items-start justify-between">
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <span className="font-mono text-accent text-sm tracking-[0.2em] uppercase">
              01 / ETHOS
            </span>
            <h2 className="font-display text-3xl md:text-5xl leading-tight font-normal text-foreground uppercase">
              The Architecture of Silence
            </h2>
          </div>
          
          <div className="w-full md:w-2/3 flex flex-col gap-8">
            <p className="ethos-text font-display text-2xl md:text-4xl lg:text-[44px] leading-snug text-foreground/90 font-normal">
              <TypewriterText 
                text="We design environments defined by deep shadows, rich raw textures, and silent spaces. We reject the frenetic to pursue the cinematic, framing luxury in pure negative space."
                progress={ethosProgress}
                range={[0.0, 0.5]}
              />
            </p>
            <div className="h-[1px] w-full bg-accent/20" />
            <div className="flex flex-col md:flex-row justify-between gap-8 text-sm font-body text-muted-foreground tracking-widest uppercase">
              <div>
                <p className="text-accent font-medium mb-1">
                  <TypewriterText 
                    text="INTERIOR ARCHITECTURE"
                    progress={ethosProgress}
                    range={[0.5, 0.62]}
                  />
                </p>
                <p>
                  <TypewriterText 
                    text="Residential & Commercial"
                    progress={ethosProgress}
                    range={[0.60, 0.75]}
                  />
                </p>
              </div>
              <div>
                <p className="text-accent font-medium mb-1">
                  <TypewriterText 
                    text="ATMOSPHERIC DESIGN"
                    progress={ethosProgress}
                    range={[0.73, 0.85]}
                  />
                </p>
                <p>
                  <TypewriterText 
                    text="Materiality & Lighting Curations"
                    progress={ethosProgress}
                    range={[0.83, 0.98]}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Horizontal scroll project galleries (Desktop horizontal scroll, Mobile vertical layout) */}
      <section 
        ref={horizontalSectionRef} 
        className="relative h-auto md:h-screen w-full md:overflow-hidden bg-card z-10"
      >
        {/* Ambient Transition Overlays */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent pointer-events-none z-20" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
        <div 
          ref={horizontalScrollRef} 
          className="w-full md:w-fit flex flex-col md:flex-row md:h-full md:items-center"
          style={{ willChange: "transform" }}
        >
          {/* Section Introduction Panel */}
          <div className="w-full md:w-[100vw] h-auto min-h-[380px] md:h-full flex flex-col justify-between p-8 md:p-16 flex-shrink-0 border-b md:border-b-0 md:border-r border-accent/10 bg-background gap-8 md:gap-0">
            <div className="flex justify-between items-start">
              <span className="font-mono text-accent text-sm tracking-[0.2em] uppercase">
                02 / PORTFOLIO
              </span>
              <span className="font-mono text-muted-foreground text-xs uppercase">
                VANTABLACK © 2026
              </span>
            </div>

            <div className="max-w-xl">
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none font-normal uppercase mb-8">
                Featured<br />Creations
              </h2>
              <p className="font-body text-muted-foreground text-base tracking-wide leading-relaxed">
                Explore our signature residential and hospitality spaces, sculpted with raw oak, blackened concrete, and hand-finished antique brass detailing.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-accent uppercase">
              <span>Scroll to navigate</span>
              <ArrowRight className="w-4 h-4 animate-pulse" />
            </div>
          </div>

          {/* Horizontal Project Panels */}
          {featuredProjects.map((project, index) => (
            <div 
              key={index} 
              className="w-full md:w-[85vw] h-auto min-h-[500px] md:h-full flex flex-col justify-between p-8 md:p-16 flex-shrink-0 border-b md:border-b-0 md:border-r border-accent/10 relative group gap-8 md:gap-0"
            >
              {/* Overlay background panel */}
              <div className="absolute inset-0 bg-[#0A0A0A]/40 z-1 transition-colors duration-500 group-hover:bg-[#000000]/10" />

              {/* Top metadata */}
              <div className="flex justify-between items-center relative z-2">
                <span className="font-mono text-accent text-base font-semibold">
                  {project.num}
                </span>
                <span className="font-body text-xs tracking-widest text-muted-foreground uppercase">
                  {project.category} — {project.location}
                </span>
              </div>

              {/* Main Image container (Interactive Hover Zoom) */}
              <Link 
                to={`/projects/${project.id}`}
                className="my-auto w-full aspect-[16/10] md:h-[52vh] md:w-auto overflow-hidden relative border border-accent/10 select-none z-2 block"
                data-cursor="view project"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover filter saturate-[0.15] scale-100 group-hover:scale-105 group-hover:saturate-100 transition-all duration-700 ease-out"
                />
              </Link>

              {/* Bottom titles & Link */}
              <div className="flex justify-between items-end relative z-2">
                <div>
                  <h3 className="font-display text-2xl md:text-4xl font-normal tracking-wide text-foreground group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>
                <Link 
                  to={`/projects/${project.id}`}
                  className="p-3 bg-accent/5 hover:bg-accent/15 border border-accent/25 rounded-full transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5 text-accent" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Awards Strip */}
      <section className="w-full py-32 px-6 md:px-16 bg-background relative z-10 index-awards-anim">
        {/* Gap Coverage Overlays */}
        <div className="absolute -top-4 left-0 w-full h-4 bg-black pointer-events-none z-25" />
        <div className="absolute -bottom-4 left-0 w-full h-4 bg-black pointer-events-none z-25" />

        {/* Ambient Transition Overlays */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent pointer-events-none z-20" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 mb-16">
            <div>
              <span className="font-mono text-accent text-sm tracking-[0.2em] uppercase mb-4 block">
                03 / RECOGNITION
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-normal text-foreground uppercase">
                Selected Distinctions
              </h2>
            </div>
            <p className="font-body text-muted-foreground text-sm tracking-widest uppercase max-w-xs leading-relaxed">
              Consistently recognized for architectural poetry and atmospheric luxury design.
            </p>
          </div>

          {/* Awards List with brass hairlines */}
          <div className="flex flex-col">
            {awards.map((award, index) => {
              const isHovered = hoveredAwardIndex === index;
              return (
                <Link 
                  key={index}
                  to={`/projects/${award.projectId}`}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center py-8 border-t border-accent/20 group hover:bg-accent/[0.02] transition-colors duration-300 px-4 cursor-pointer"
                  onMouseEnter={() => setHoveredAwardIndex(index)}
                  onMouseLeave={() => setHoveredAwardIndex(null)}
                >
                  <div className="flex items-center gap-8 mb-4 md:mb-0">
                    <span className="font-mono text-accent text-sm">{award.year}</span>
                    
                    {/* Sliding Expandable Image Thumbnail */}
                    <div 
                      className="overflow-hidden transition-all duration-500 ease-out flex-shrink-0"
                      style={{
                        width: isHovered ? "80px" : "0px",
                        marginRight: isHovered ? "16px" : "0px",
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? "scale(1)" : "scale(0.8)",
                        height: "40px",
                        borderRadius: "4px",
                        border: isHovered ? "1px solid rgba(201, 169, 97, 0.3)" : "0px solid transparent"
                      }}
                    >
                      <img 
                        src={award.image} 
                        alt={award.title} 
                        className="w-full h-full object-cover filter saturate-[0.6] transition-transform duration-700 ease-out"
                        style={{
                          transform: isHovered ? "scale(1)" : "scale(1.2)"
                        }}
                      />
                    </div>

                    <h3 className="font-display text-xl md:text-2xl text-foreground font-normal transition-colors duration-300 group-hover:text-accent">
                      {award.title}
                    </h3>
                  </div>
                  <span className="font-body text-xs tracking-widest text-muted-foreground uppercase group-hover:text-foreground transition-colors duration-300">
                    {award.category}
                  </span>
                </Link>
              );
            })}
            <div className="border-t border-accent/20" />
          </div>
        </div>
      </section>

      {/* 5. Inquire Banner Block */}
      <section className="w-full py-32 px-6 bg-background relative overflow-hidden z-10 index-cta-anim">
        {/* Ambient Transition Overlays */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent pointer-events-none z-20" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />

        {/* Background Background Images Layer (Adaptive for mobile readability) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0">
          {/* Mobile view: single full cover image */}
          <div className="md:hidden w-full h-full overflow-hidden">
            <img src="/cta_bg_2.png" alt="CTA BG" className="w-full h-full object-cover filter saturate-[0.05]" />
          </div>
          {/* Desktop view: 3 vertical image panels */}
          <div className="hidden md:grid w-full h-full grid-cols-3">
            <div className="w-full h-full overflow-hidden border-r border-accent/5">
              <img src="/cta_bg_1.png" alt="CTA BG 1" className="w-full h-full object-cover filter saturate-[0.1]" />
            </div>
            <div className="w-full h-full overflow-hidden border-r border-accent/5">
              <img src="/cta_bg_2.png" alt="CTA BG 2" className="w-full h-full object-cover filter saturate-[0.1]" />
            </div>
            <div className="w-full h-full overflow-hidden">
              <img src="/cta_bg_3.png" alt="CTA BG 3" className="w-full h-full object-cover filter saturate-[0.1]" />
            </div>
          </div>
        </div>

        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/45 z-[1] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8 relative z-10">
          <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase">
            COLLABORATION
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-normal text-foreground uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Sculpt Your Next Project With Us
          </h2>
          <p className="font-body text-muted-foreground max-w-lg leading-relaxed text-sm tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            We are accepting select commissions for residential, commercial, and hospitality projects for 2026.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 font-body text-sm tracking-widest uppercase text-accent rounded-full glass-button"
          >
            Start An Inquiry
          </Link>
        </div>
      </section>

    </div>
  );
};
export default Index;
