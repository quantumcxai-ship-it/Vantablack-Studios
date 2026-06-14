import { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const journalEssays = [
  {
    date: "06 / 14 / 2026",
    category: "MATERIALS",
    title: "THE SOUND OF CHARRED CEDAR",
    excerpt: "Exploring the acoustic properties of Shou Sugi Ban paneling inside minimal residential lounges, and how charcoal absorption dampens environmental reverb to create absolute silence.",
    readTime: "6 min read",
    image: "/luxury_living.png",
    projectId: "obsidian-house"
  },
  {
    date: "05 / 20 / 2026",
    category: "SPATIAL THEORY",
    title: "FRAMING NEUTRALITY: CONTROLLING DAYLIGHT",
    excerpt: "A study on telescopic glass alignments in clifftop architecture. How projecting massive concrete eaves guides direct solar angles while reflecting courtyard basalt pools.",
    readTime: "8 min read",
    image: "/brutalist_villa.png",
    projectId: "villa-sole"
  },
  {
    date: "04 / 11 / 2026",
    category: "CURATIONS",
    title: "THE BRASS AGGREGATE PATINA",
    excerpt: "Sourcing antique copper alloys for flooring inserts. We detail the physical oxidation process under ambient moisture and how to embrace the natural aging of materials.",
    readTime: "5 min read",
    image: "/kitchen_detail.png",
    projectId: "atrium-of-shadows"
  },
  {
    date: "03 / 02 / 2026",
    category: "METALS",
    title: "THE SHADOWED STEEL PATINA",
    excerpt: "Understanding the oxidation and micro-honing of structural steel panels inside atmospheric galleries. We detail how saltwater elements patinate raw iron surfaces.",
    readTime: "7 min read",
    image: "/lounge_interior.png",
    projectId: "atrium-of-shadows"
  }
];

export const Journal = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fades up immediately on load
      gsap.fromTo(".journal-header-anim", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // Articles slide in dynamically based on index (alternating sweep)
      gsap.utils.toArray(".journal-row-anim").forEach((row: any, idx: number) => {
        const rowNum = idx + 1;
        const isLeftEntrance = rowNum % 2 !== 0; // Odd (1, 3) from left, Even (2, 4) from right
 
        gsap.fromTo(row,
          { opacity: 0, x: isLeftEntrance ? -120 : 120 },
          {
            opacity: 1,
            x: 0,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    });

    window.scrollTo(0, 0);
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full min-h-screen bg-background text-foreground pt-32 pb-24 px-6 md:px-16 selection:bg-accent selection:text-black">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 journal-header-anim">
          <div>
            <span className="font-mono text-accent text-sm tracking-[0.2em] uppercase mb-4 block">
              ESSAYS & OBSERVATIONS
            </span>
            <h1 className="font-display text-5xl md:text-8xl font-normal leading-none uppercase">
              The Journal
            </h1>
          </div>
          <p className="font-body text-muted-foreground text-sm tracking-widest uppercase max-w-xs leading-relaxed">
            Written narratives documenting our materiality experiments, design essays, and behind-the-scenes processes.
          </p>
        </div>

        {/* Essays List */}
        <div className="flex flex-col gap-16 md:gap-24">
          {journalEssays.map((essay, idx) => {
            const rowNum = idx + 1;
            return (
              <article 
                key={idx}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 border-t border-accent/20 pt-12 group journal-row-anim journal-row-${rowNum}`}
              >
                {/* Left Column: Date & Meta (4 cols) */}
                <div className="lg:col-span-4 flex flex-row lg:flex-col justify-between items-center lg:items-stretch gap-4 font-mono border-b lg:border-b-0 border-accent/10 pb-4 lg:pb-0">
                  <div className="flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-1">
                    <span className="text-accent text-[11px] tracking-widest">
                      {essay.category}
                    </span>
                    <span className="text-muted-foreground text-xs font-semibold">
                      {essay.date}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-xs uppercase">
                    {essay.readTime}
                  </span>
                </div>

                {/* Middle Column: Excerpt (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <Link to={`/projects/${essay.projectId}`}>
                    <h2 className="font-display text-2xl md:text-3xl lg:text-4xl leading-tight font-normal text-foreground group-hover:text-accent transition-colors duration-300">
                      {essay.title}
                    </h2>
                  </Link>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed tracking-wide">
                    {essay.excerpt}
                  </p>
                  <Link to={`/projects/${essay.projectId}`} className="w-fit block mt-2">
                    <button className="px-6 py-2.5 font-mono text-[9px] tracking-widest text-accent uppercase font-semibold rounded-full glass-button flex items-center gap-1.5 group/btn">
                      READ ESSAY <span className="transform translate-x-0 group-hover/btn:translate-x-1.5 transition-transform duration-300">→</span>
                    </button>
                  </Link>
                </div>

                {/* Right Column: Thumbnail Image (3 cols) */}
                <Link 
                  to={`/projects/${essay.projectId}`}
                  className="lg:col-span-3 aspect-[16/10] overflow-hidden border border-accent/10 relative select-none block"
                  data-cursor="read"
                >
                  <div className="absolute inset-0 bg-black/30 z-1 group-hover:bg-transparent transition-all duration-300" />
                  <img 
                    src={essay.image} 
                    alt={essay.title}
                    className="w-full h-full object-cover filter saturate-0 group-hover:scale-105 group-hover:saturate-100 transition-all duration-700 ease-out"
                  />
                </Link>

              </article>
            );
          })}
          <div className="border-t border-accent/20" />
        </div>

      </div>
    </div>
  );
};
export default Journal;
