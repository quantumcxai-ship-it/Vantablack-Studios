import { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Studio = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page Title immediately fades up
      gsap.fromTo(".studio-header-anim", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // Other sections fade up dynamically on scroll
      gsap.utils.toArray(".studio-section-anim").forEach((sec: any) => {
        gsap.fromTo(sec,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 88%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const principals = [
    {
      role: "DESIGN PRINCIPAL",
      name: "ALISTAIR BLACK",
      bio: "Alistair studied at the ETH Zurich before founding Vantablack Studios. His work explores the limits of negative space, framing light through monolithic architectural structures. He believes that luxury lies not in ornamentation, but in absolute stillness.",
      image: "/luxury_living.png" // placeholder
    },
    {
      role: "MANAGING ARCHITECT",
      name: "SELENE STERLING",
      bio: "Selene brings fifteen years of high-end project management and technical expertise. She specializes in integrating raw, structural concrete textures with hand-finished bronze, timber board forms, and seamless glass facades.",
      image: "/brutalist_villa.png" // placeholder
    }
  ];

  const press = [
    { outlet: "ARCHITECTURAL DIGEST", story: "Vantablack Studios Redefines Clifftop Brutalism in Malibu", date: "FEB 2025", projectId: "villa-sole" },
    { outlet: "WALLPAPER*", story: "Atmospheric Luxury: Sourcing Charred Cedars and Brass Veins", date: "OCT 2024", projectId: "obsidian-house" },
    { outlet: "ELLE DECOR", story: "Into the Shadows — The Zurich Obsidian Residence Profile", date: "JUL 2024", projectId: "obsidian-house" },
    { outlet: "THE PLAN MAGAZINE", story: "Kyoto Hotel Lounge Wins Atmospheric Design Grand Prix", date: "MAY 2023", projectId: "elysium-pavilion" }
  ];

  return (
    <div className="w-full min-h-screen bg-background text-foreground pt-32 pb-24 px-6 md:px-16 selection:bg-accent selection:text-black">
      <div className="max-w-6xl mx-auto flex flex-col gap-24 md:gap-32">
        
        {/* Page Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 studio-header-anim">
          <div>
            <span className="font-mono text-accent text-sm tracking-[0.2em] uppercase mb-4 block">
              THE FIRM
            </span>
            <h1 className="font-display text-5xl md:text-8xl font-normal leading-none uppercase">
              The Studio
            </h1>
          </div>
          <p className="font-body text-muted-foreground text-sm tracking-widest uppercase max-w-xs leading-relaxed">
            Sculpting atmospheric silence through luxury architectural design and curated materiality.
          </p>
        </div>

        {/* Philosophy Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-accent/20 pt-16 studio-section-anim">
          <div className="lg:col-span-4 flex flex-col gap-2">
            <span className="font-mono text-accent text-xs tracking-widest uppercase">
              01 / VISION
            </span>
            <h2 className="font-display text-2xl md:text-3xl uppercase font-normal text-foreground">
              Absolute Stillness
            </h2>
          </div>
          
          <div className="lg:col-span-8 flex flex-col gap-8">
            <p className="font-display text-2xl md:text-3xl leading-relaxed text-foreground/90 font-light">
              We reject the frenetic pace of contemporary design in pursuit of something lasting. We frame views, sculpt shadows, and craft spatial paths that encourage pause. Our work is a silent dialogue between raw stone, blackened wood, and antique brass hairlines.
            </p>
            <p className="font-body text-muted-foreground text-base leading-relaxed tracking-wide">
              Every project begins with a deep geological research of the site. We select masonry blocks directly from quarries, charting how sun exposure and moisture will change the stone over decades. We build not only for the current eye, but for the future patina.
            </p>
          </div>
        </div>

        {/* Principals Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-accent/20 pt-16 studio-section-anim">
          <div className="lg:col-span-4 flex flex-col gap-2">
            <span className="font-mono text-accent text-xs tracking-widest uppercase">
              02 / LEADERSHIP
            </span>
            <h2 className="font-display text-2xl md:text-3xl uppercase font-normal text-foreground">
              The Principals
            </h2>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            {principals.map((principal, index) => (
              <div key={index} className="flex flex-col gap-6 group">
                <div className="aspect-[3/4] overflow-hidden border border-accent/10 relative">
                  <div className="absolute inset-0 bg-[#000000]/30 z-1 group-hover:bg-transparent transition-all duration-300" />
                  <img 
                    src={principal.image} 
                    alt={principal.name}
                    className="w-full h-full object-cover filter saturate-0 group-hover:saturate-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-accent text-[10px] tracking-widest">
                    {principal.role}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl text-foreground font-normal">
                    {principal.name}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed mt-2">
                    {principal.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Press & Media */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-accent/20 pt-16 studio-section-anim">
          <div className="lg:col-span-4 flex flex-col gap-2">
            <span className="font-mono text-accent text-xs tracking-widest uppercase">
              03 / ARCHIVE
            </span>
            <h2 className="font-display text-2xl md:text-3xl uppercase font-normal text-foreground">
              Selected Press
            </h2>
          </div>

          <div className="lg:col-span-8 flex flex-col">
            {press.map((item, index) => (
              <Link 
                key={index}
                to={`/projects/${item.projectId}`}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 border-b border-accent/10 group hover:bg-accent/[0.02] hover:border-accent/30 transition-all duration-300 px-2 cursor-pointer gap-4 block"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-accent text-[10px] tracking-widest">
                    {item.outlet}
                  </span>
                  <h3 className="font-display text-lg md:text-xl text-foreground group-hover:text-accent font-normal group-hover:translate-x-2 transition-all duration-300">
                    {item.story}
                  </h3>
                </div>
                <span className="font-mono text-muted-foreground text-xs group-hover:text-foreground transition-colors duration-300 flex-shrink-0">{item.date}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
export default Studio;
