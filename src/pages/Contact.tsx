import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    location: "",
    scope: "Residential Architecture",
    budget: "$100k - $250k",
    timeline: "3 - 6 months",
    details: ""
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left side text and info slides in from left
      gsap.fromTo(".contact-left-anim",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-left-anim",
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Right side form slides in from right
      gsap.fromTo(".contact-right-anim",
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-right-anim",
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    window.scrollTo(0, 0);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Mimic API post
    gsap.fromTo(".success-message",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
    );
  };

  return (
    <div className="w-full min-h-screen bg-background text-foreground pt-32 pb-24 px-6 md:px-16 selection:bg-accent selection:text-black">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
        
        {/* Left Side: Copy info */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-12 contact-left-anim">
          <div className="flex flex-col gap-6">
            <span className="font-mono text-accent text-sm tracking-[0.2em] uppercase">
              COLLABORATION INDEX
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-normal leading-none uppercase">
              Start An<br />Inquiry
            </h1>
            <p className="font-body text-muted-foreground text-sm tracking-wide leading-relaxed mt-4 max-w-sm">
              We design select residential, commercial, and hospitality environments globally. Complete the intake form to initiate our design discovery process.
            </p>
          </div>

          <div className="flex flex-col gap-8 font-body text-sm border-t border-accent/20 pt-8">
            <div>
              <p className="text-accent font-mono text-xs uppercase mb-1">GENERAL ENQUIRIES</p>
              <p className="text-muted-foreground">inquire@vantablackstudios.com</p>
            </div>
            <div>
              <p className="text-accent font-mono text-xs uppercase mb-1">OFFICE LOCATION</p>
              <p className="text-muted-foreground">Zürich — Sihlquai 125, 8005 Zürich</p>
            </div>
          </div>
        </div>

        {/* Right Side: Intake Form */}
        <div className="lg:col-span-7 contact-right-anim">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 p-6 md:p-12 relative glass-panel rounded-2xl">
              {/* Decorative Accent Ring */}
              <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-accent/20 pointer-events-none" />

              <h2 className="font-display text-2xl uppercase font-normal text-foreground border-b border-accent/10 pb-4">
                Project Intake
              </h2>

              {/* Text Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] text-accent uppercase tracking-widest">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="p-3 font-body text-sm text-foreground outline-none rounded-xl glass-input"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] text-accent uppercase tracking-widest">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="p-3 font-body text-sm text-foreground outline-none rounded-xl glass-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] text-accent uppercase tracking-widest">
                    Company / Entity
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="p-3 font-body text-sm text-foreground outline-none rounded-xl glass-input"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] text-accent uppercase tracking-widest">
                    Project Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="p-3 font-body text-sm text-foreground outline-none rounded-xl glass-input"
                  />
                </div>
              </div>

              {/* Select Scope */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-accent uppercase tracking-widest">
                  Project Scope
                </label>
                <select
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  className="p-3 font-body text-sm text-foreground outline-none rounded-xl glass-input cursor-pointer"
                >
                  <option value="Residential Architecture">Residential Architecture</option>
                  <option value="Residential Interior">Residential Interior</option>
                  <option value="Hospitality / Commercial Space">Hospitality / Commercial Space</option>
                  <option value="Other">Other Atmospheric Curation</option>
                </select>
              </div>

              {/* Select Budget Range */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-accent uppercase tracking-widest">
                  Investment Scope (Project Budget)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {["$50k - $100k", "$100k - $250k", "$250k - $500k", "$500k+"].map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: range })}
                      className={`p-3 font-body text-xs tracking-widest uppercase rounded-xl transition-all duration-300 transform active:scale-95 ${
                        formData.budget === range 
                          ? "bg-accent text-black font-semibold border border-accent shadow-[0_0_15px_rgba(197,160,89,0.2)]" 
                          : "glass-button text-muted-foreground"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Timeline */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-accent uppercase tracking-widest">
                  Anticipated Timeline
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {["Immediate", "3 - 6 months", "6 - 12 months", "Flexible"].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setFormData({ ...formData, timeline: time })}
                      className={`p-3 font-body text-xs tracking-widest uppercase rounded-xl transition-all duration-300 transform active:scale-95 ${
                        formData.timeline === time 
                          ? "bg-accent text-black font-semibold border border-accent shadow-[0_0_15px_rgba(197,160,89,0.2)]" 
                          : "glass-button text-muted-foreground"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brief details */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-accent uppercase tracking-widest">
                  Project Description / Specifications
                </label>
                <textarea
                  rows={4}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Share a brief description of the site, structural goals, and material desires..."
                  className="p-3 font-body text-sm text-foreground outline-none rounded-xl glass-input resize-none placeholder:text-muted-foreground/55"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 text-accent font-body text-sm tracking-widest uppercase font-semibold rounded-xl glass-button transform active:scale-[0.99]"
              >
                SUBMIT INQUIRY
              </button>

            </form>
          ) : (
            <div className="success-message p-12 text-center flex flex-col items-center gap-6 relative glass-panel rounded-2xl">
              <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-accent/20 pointer-events-none" />
              
              <span className="font-mono text-accent text-xs tracking-[0.25em] uppercase">
                INQUIRY REGISTERED
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-normal uppercase text-foreground">
                Thank You, {formData.name.split(" ")[0]}
              </h2>
              <p className="font-body text-muted-foreground text-sm leading-relaxed max-w-sm">
                Our design principal Alistair Black will review your architectural specifications and contact you within three business days to set up a discovery session.
              </p>
              <div className="h-[1px] w-12 bg-accent/30 my-4" />
              <button 
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 font-mono text-[9px] text-accent uppercase tracking-widest rounded-full glass-button"
              >
                SUBMIT ANOTHER FORM
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
export default Contact;
