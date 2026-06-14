import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const allProjects = [
  {
    id: "obsidian-house",
    title: "THE OBSIDIAN HOUSE",
    category: "Residential",
    location: "Zurich, Switzerland",
    year: "2025",
    image: "/luxury_living.png",
    aspect: "aspect-[4/5]" // taller
  },
  {
    id: "elysium-pavilion",
    title: "ELYSIUM PAVILION",
    category: "Hospitality",
    location: "Kyoto, Japan",
    year: "2024",
    image: "/lounge_interior.png",
    aspect: "aspect-square" // square
  },
  {
    id: "atrium-of-shadows",
    title: "ATRIUM OF SHADOWS",
    category: "Commercial",
    location: "New York, USA",
    year: "2024",
    image: "/kitchen_detail.png",
    aspect: "aspect-[16/10]" // landscape
  },
  {
    id: "villa-sole",
    title: "VILLA SOLE",
    category: "Residential",
    location: "Malibu, USA",
    year: "2025",
    image: "/brutalist_villa.png",
    aspect: "aspect-[4/5]" // taller
  },
  {
    id: "noir-lounge",
    title: "NOIR LOUNGE & SPA",
    category: "Hospitality",
    location: "Paris, France",
    year: "2023",
    image: "/lounge_interior.png",
    aspect: "aspect-[4/5]" // taller
  },
  {
    id: "monolith-office",
    title: "THE MONOLITH ATRIUM",
    category: "Commercial",
    location: "Berlin, Germany",
    year: "2023",
    image: "/luxury_living.png",
    aspect: "aspect-square" // square
  }
];

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const filtered = activeFilter === "ALL" 
    ? allProjects 
    : allProjects.filter(p => p.category.toUpperCase() === activeFilter);

  useEffect(() => {
    // Kill existing ScrollTriggers on cards to prevent leaks
    const activeTriggers = ScrollTrigger.getAll().filter(t => {
      const triggerEl = t.trigger as HTMLElement;
      return triggerEl && triggerEl.classList.contains("project-card-anim");
    });
    activeTriggers.forEach(t => t.kill());

    // Fade in headers
    gsap.fromTo(".projects-header",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    );

    // Register ScrollTriggers for cards
    const cards = gsap.utils.toArray(".project-card-anim");
    cards.forEach((card: any) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    // Refresh after layout settle
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      const triggers = ScrollTrigger.getAll().filter(t => {
        const triggerEl = t.trigger as HTMLElement;
        return triggerEl && triggerEl.classList.contains("project-card-anim");
      });
      triggers.forEach(t => t.kill());
    };
  }, [activeFilter]);

  return (
    <div className="w-full min-h-screen bg-background text-foreground pt-32 pb-24 px-6 md:px-16 selection:bg-accent selection:text-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 projects-header">
          <div>
            <span className="font-mono text-accent text-sm tracking-[0.2em] uppercase mb-4 block">
              PORTFOLIO INDEX
            </span>
            <h1 className="font-display text-5xl md:text-8xl font-normal leading-none uppercase">
              Works &<br />Commissions
            </h1>
          </div>
          <p className="font-body text-muted-foreground text-sm tracking-widest uppercase max-w-sm leading-relaxed">
            A curated inventory of residential, commercial, and hospitality works defining atmosphere and negative space.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 border-b border-accent/10 pb-6 mb-12 projects-header">
          {["ALL", "RESIDENTIAL", "HOSPITALITY", "COMMERCIAL"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-mono text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-300 ${
                activeFilter === filter 
                  ? "bg-accent text-black font-semibold border border-accent shadow-[0_0_15px_rgba(197,160,89,0.2)]" 
                  : "glass-button text-muted-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Masonry-like Grid Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {filtered.map((project, idx) => (
            <div 
              key={project.id}
              className="break-inside-avoid project-card-anim group flex flex-col gap-4 border border-accent/5 p-4 bg-card"
            >
              {/* Image Container (Interactive Zoom & Reveal) */}
              <Link 
                to={`/projects/${project.id}`}
                className={`relative w-full ${project.aspect} overflow-hidden block border border-accent/10`}
                data-cursor="explore"
              >
                {/* Number Overlay */}
                <span className="absolute top-4 left-4 font-mono text-accent text-sm z-10">
                  {`0${idx + 1}`}
                </span>
                
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover filter saturate-[0.1] scale-100 group-hover:scale-105 group-hover:saturate-100 transition-all duration-700 ease-out"
                />
              </Link>

              {/* Title & Metadata */}
              <div className="flex justify-between items-start mt-2">
                <div className="flex flex-col gap-1">
                  <h2 className="font-display text-lg md:text-xl font-normal text-foreground group-hover:text-accent transition-colors duration-300">
                    <Link to={`/projects/${project.id}`}>
                      {project.title}
                    </Link>
                  </h2>
                  <span className="font-body text-xs tracking-widest text-muted-foreground uppercase">
                    {project.location}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1 font-mono text-[10px] text-accent">
                  <span>{project.category}</span>
                  <span className="text-muted-foreground">{project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Projects;
