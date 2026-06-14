import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projectDatabase: Record<string, any> = {
  "obsidian-house": {
    title: "THE OBSIDIAN HOUSE",
    subtitle: "A Study in Blackened Steel and Cast Concrete",
    category: "Residential",
    location: "Zurich, Switzerland",
    year: "2025",
    size: "450 sqm",
    client: "Private Family",
    image: "/obsidian_facade.png",
    description: "Nestled in the quiet woodlands of Zurich, The Obsidian House is a masterclass in monolithic brutalism and luxury minimalism. The design philosophy centers on framing views of the lake while creating a protective cocoon of blackened steel, charred cedar, and raw cast concrete inside.",
    story: "Our objective was to create a sanctuary of absolute silence. We worked with local master craftsmen to hand-apply dark plaster finishes and brushed antique brass hairlines that run through the flooring and baseboards. Every structural column is offset, creating deep, dramatic shadows that shift throughout the day.",
    process: "We spent six months selecting stone slabs with high iron content, giving the concrete a metallic sheen under direct daylight. The kitchen island, a single piece of Calacatta marble, is cantilevered off a raw concrete plinth, presenting a striking sculptural center point.",
    specs: [
      { name: "Structure", value: "Monolithic Cast-in-place Concrete" },
      { name: "Cladding", value: "Shou Sugi Ban Charred Cedar" },
      { name: "Accents", value: "Brushed Antique Brass Hairlines" },
      { name: "Lighting", value: "Custom dim-to-warm architectural systems" }
    ],
    gallery: ["/obsidian_facade.png", "/obsidian_hallway.png", "/obsidian_lounge.png"],
    nextId: "elysium-pavilion"
  },
  "elysium-pavilion": {
    title: "ELYSIUM PAVILION",
    subtitle: "Atmospheric Hotel Lounge & Courtyard",
    category: "Hospitality",
    location: "Kyoto, Japan",
    year: "2024",
    size: "1,200 sqm",
    client: "Elysium Hospitality Group",
    image: "/elysium_lobby.png",
    description: "Located in the historic quarters of Kyoto, Elysium Pavilion merges traditional Japanese architectural forms with contemporary brutalism, creating a high-ceilinged hotel lounge open to a gravel Zen garden.",
    story: "We designed a soaring 12-meter high lobby roof supported by custom brass lattices. The walls are wrapped in dark slate, and long water features reflect the warm ambient lights, drawing focus toward the open garden atrium.",
    process: "The interface between interior and exterior spaces was engineered with ultra-thin sliding glass panels. The result is a seamless connection to the seasons, where fall foliage or winter snow directly informs the room's color story.",
    specs: [
      { name: "Structure", value: "Steel Lattice & Black Slate Walls" },
      { name: "Acoustics", value: "Micro-perforated acoustic oak ceilings" },
      { name: "Water Features", value: "Basalt reflection pools" },
      { name: "Furnishings", value: "Custom mohair lounge seating by Vantablack" }
    ],
    gallery: ["/elysium_lobby.png", "/elysium_garden.png", "/elysium_tea_room.png"],
    nextId: "atrium-of-shadows"
  },
  "atrium-of-shadows": {
    title: "ATRIUM OF SHADOWS",
    subtitle: "A Sculptural Office Showroom and Lounge",
    category: "Commercial",
    location: "New York, USA",
    year: "2024",
    size: "600 sqm",
    client: "Apex Developments",
    image: "/atrium_showroom.png",
    description: "Atrium of Shadows serves as a showroom for raw materials and luxury finishes in New York, presenting a dramatic gallery layout centered around an imposing black marble counter.",
    story: "In contrast to corporate showrooms, we designed a dark, gallery-like experience. Display items are hidden inside monolithic wood panels, and lighting is targeted solely on material close-ups, emphasizing concrete grain and brass details.",
    process: "The main counter is sculpted from a 12-ton block of black marble. Hand-finished brass accents act as drawers and shelving, creating a premium textural contrast against the cold stone.",
    specs: [
      { name: "Structure", value: "Raw concrete paneling" },
      { name: "Counter", value: "Solid Black Calacatta Marble" },
      { name: "Metalwork", value: "Aged brass details" },
      { name: "Exhibits", value: "Magnetic floating shelves" }
    ],
    gallery: ["/atrium_showroom.png", "/atrium_meeting.png", "/atrium_details.png"],
    nextId: "villa-sole"
  },
  "villa-sole": {
    title: "VILLA SOLE",
    subtitle: "Clifftop Concrete Sanctuary",
    category: "Residential",
    location: "Malibu, USA",
    year: "2025",
    size: "720 sqm",
    client: "Private Client",
    image: "/villa_exterior.png",
    description: "Villa Sole is a concrete residential fortress overlooking the Malibu coastline, featuring panoramic ocean views and massive, overhanging eaves that frame the sunset.",
    story: "We designed the residence as a series of cascading concrete boxes, echoing the rugged cliffs. Deep roof overhangs shield the glass facades from direct sun, while interior courtyard pools reflect soft ripples of light onto raw concrete walls.",
    process: "The concrete was cast using textured timber board forms to give it an organic, weathered appearance that blends with the coastal landscape. Interior details are limited to dark oak and bronze fittings.",
    specs: [
      { name: "Structure", value: "Board-formed reinforced concrete" },
      { name: "Glazing", value: "Telescopic low-iron glass facades" },
      { name: "Millwork", value: "Fumed European oak" },
      { name: "Flooring", value: "Polished terrazzo with bronze aggregate" }
    ],
    gallery: ["/villa_exterior.png", "/villa_courtyard.png", "/villa_bathroom.png"],
    nextId: "obsidian-house"
  }
};

export const ProjectDetail = () => {
  const { id } = useParams();
  
  // Default to obsidian house if not found in database
  const project = projectDatabase[id || ""] || projectDatabase["obsidian-house"];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title overlay immediately fades up
      gsap.fromTo(".detail-hero-anim", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // Narrative block scroll reveal
      gsap.fromTo(".detail-narrative-anim",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".detail-narrative-anim",
            start: "top 88%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Specifications card scroll reveal
      gsap.fromTo(".detail-specs-anim",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".detail-specs-anim",
            start: "top 88%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Gallery section scroll reveal
      gsap.fromTo(".detail-gallery-anim",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".detail-gallery-anim",
            start: "top 88%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Next project section scroll reveal
      gsap.fromTo(".detail-next-anim",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".detail-next-anim",
            start: "top 88%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    window.scrollTo(0, 0);
    return () => ctx.revert();
  }, [id]);

  return (
    <div className="w-full bg-background text-foreground min-h-screen selection:bg-accent selection:text-black">
      
      {/* Back Button */}
      <div className="absolute md:fixed top-24 left-6 md:left-16 z-40">
        <Link 
          to="/projects"
          className="flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground hover:text-accent transition-colors duration-300 py-2 group/back"
        >
          <ArrowLeft className="w-4 h-4 transform translate-x-0 group-hover/back:-translate-x-1.5 transition-transform duration-300" />
          <span>BACK TO WORKS</span>
        </Link>
      </div>

      {/* Hero Shot Banner */}
      <section className="relative w-full h-[50vh] md:h-[80vh] overflow-hidden border-b border-accent/15">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover filter saturate-[0.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        
        {/* Title Overlay */}
        <div className="absolute bottom-12 left-6 md:left-16 right-6 z-10 max-w-4xl detail-hero-anim">
          <div className="flex items-center gap-4 font-mono text-xs text-accent uppercase tracking-widest mb-4">
            <span>{project.category}</span>
            <span>—</span>
            <span>{project.location}</span>
          </div>
          <h1 className="font-display text-4xl md:text-7xl font-normal leading-none uppercase mb-2">
            {project.title}
          </h1>
          <p className="font-display italic text-lg md:text-2xl text-muted-foreground font-light">
            {project.subtitle}
          </p>
        </div>
      </section>

      {/* Narrative & Specification Grid */}
      <section className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Block: Description & Story (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-12 detail-narrative-anim">
            <div>
              <span className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-4 block">
                01 / PHILOSOPHY
              </span>
              <p className="font-display text-2xl md:text-3xl lg:text-4xl leading-relaxed text-foreground/90 font-light">
                {project.description}
              </p>
            </div>
            
            <div className="brass-divider" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
                  THE STORY
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed tracking-wide">
                  {project.story}
                </p>
              </div>
              
              <div>
                <h3 className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
                  THE PROCESS
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed tracking-wide">
                  {project.process}
                </p>
              </div>
            </div>
          </div>

          {/* Right Block: Specs & Metadata (4 cols) */}
          <div className="lg:col-span-4 detail-specs-anim">
            <div className="border border-accent/20 bg-card p-8 flex flex-col gap-8">
              <span className="font-mono text-accent text-xs tracking-widest uppercase">
                SPECIFICATIONS
              </span>
              
              <div className="flex flex-col gap-6 font-body text-sm">
                <div className="flex justify-between py-2 border-b border-accent/10">
                  <span className="text-muted-foreground">Client</span>
                  <span className="font-semibold text-right">{project.client}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-accent/10">
                  <span className="text-muted-foreground">Year</span>
                  <span className="font-semibold">{project.year}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-accent/10">
                  <span className="text-muted-foreground">Area</span>
                  <span className="font-semibold">{project.size}</span>
                </div>
                
                {project.specs.map((spec: any, idx: number) => (
                  <div key={idx} className="flex justify-between py-2 border-b border-accent/10 items-start">
                    <span className="text-muted-foreground mr-4">{spec.name}</span>
                    <span className="font-semibold text-right max-w-[180px]">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Gallery Showcase */}
      <section className="py-12 bg-card border-y border-accent/10">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <span className="font-mono text-accent text-xs tracking-widest uppercase mb-8 block">
            02 / GALLERY
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 detail-gallery-anim">
            {project.gallery.map((imgUrl: string, index: number) => (
              <div 
                key={index}
                className="aspect-square overflow-hidden border border-accent/10 group select-none"
                data-cursor="zoom"
              >
                <img 
                  src={imgUrl} 
                  alt={`${project.title} gallery detail`}
                  className="w-full h-full object-cover filter saturate-0 group-hover:scale-105 group-hover:saturate-100 transition-all duration-700 ease-out"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project Link */}
      <section className="py-20 md:py-32 px-6 text-center bg-background border-b border-accent/10 detail-next-anim">
        <span className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-4 block">
          NEXT CREATION
        </span>
        <h2 className="font-display text-4xl md:text-7xl font-normal uppercase hover:text-accent transition-colors duration-300 mb-8">
          <Link to={`/projects/${project.nextId}`}>
            {projectDatabase[project.nextId]?.title || "NEXT WORKS"}
          </Link>
        </h2>
        <Link 
          to={`/projects/${project.nextId}`}
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-accent uppercase px-8 py-4 rounded-full glass-button group/next"
        >
          <span>VIEW CASE STUDY</span>
          <ArrowRight className="w-4 h-4 transform translate-x-0 group-hover/next:translate-x-1.5 transition-transform duration-300" />
        </Link>
      </section>

    </div>
  );
};
export default ProjectDetail;
