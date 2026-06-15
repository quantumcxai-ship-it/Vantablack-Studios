import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Check if link is active
  const isLinkActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  const isContactActive = location.pathname === "/contact";

  // Lock body scroll when mobile menu is open to prevent Lenis touch interception
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      if (lenis) {
        lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      if (lenis) {
        lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      if (lenis) {
        lenis.start();
      }
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on screen resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Studio", href: "/studio" },
    { name: "Journal", href: "/journal" }
  ];

  return (
    <nav 
      data-lenis-prevent
      className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 backdrop-blur-xl border border-accent/15 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ${
        isMobileMenuOpen ? 'rounded-2xl' : 'rounded-full'
      } ${isHomePage ? 'md:opacity-0 md:pointer-events-none opacity-100' : 'opacity-100'}`}
      style={{
        background: "rgba(0, 0, 0, 0.65)"
      }}
    >
      <div className="w-full px-6 md:px-10">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo (Typography-focused Luxury Logo with Visual Weight) */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center tracking-widest hover:opacity-90 transition-opacity duration-300 select-none">
              <span className="font-display text-base md:text-lg font-bold text-foreground tracking-[0.15em] uppercase">Vanta</span>
              <span className="font-mono text-[9px] md:text-[10px] tracking-[0.1em] bg-accent text-black px-2 py-0.5 ml-1.5 font-bold uppercase rounded-[2px] shadow-[0_2px_4px_rgba(0,0,0,0.3)] translate-y-[1px]">Black</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-10">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`font-body text-[11px] tracking-widest uppercase transition-all duration-300 relative py-1 ${
                      active 
                        ? "text-accent font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent" 
                        : "text-muted-foreground hover:text-accent after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-accent hover:after:w-full after:transition-all after:duration-300"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Contact Button */}
          <div className="hidden md:flex items-center">
            <Link 
              to="/contact"
              className={`inline-flex items-center justify-center px-5 py-2 border font-body text-[9px] tracking-widest uppercase transition-all duration-300 rounded-full ${
                isContactActive
                  ? "bg-accent text-black border-accent font-semibold shadow-[0_4px_10px_rgba(201,169,97,0.3)]"
                  : "bg-accent/5 hover:bg-accent/15 text-accent border-accent/30 hover:border-accent"
              }`}
            >
              Start Inquiry
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground hover:text-accent p-2 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-fade-in pb-6 pt-2">
            <div className="flex flex-col gap-3 px-4 pb-2">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`font-body text-sm tracking-widest uppercase transition-all duration-300 py-3 px-4 w-full block rounded-xl flex items-center justify-between ${
                      active 
                        ? "text-accent bg-accent/10 font-medium border-l-2 border-accent" 
                        : "text-muted-foreground hover:text-accent hover:bg-accent/5"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{link.name}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />}
                  </Link>
                );
              })}
              <Link
                to="/contact"
                className={`w-full py-3 border font-body text-[10px] tracking-widest uppercase text-center transition-all duration-300 block mt-2 rounded-xl ${
                  isContactActive
                    ? "bg-accent text-black border-accent font-semibold shadow-[0_4px_12px_rgba(201,169,97,0.3)]"
                    : "bg-accent/5 hover:bg-accent/15 text-accent border-accent/30 hover:border-accent"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start Inquiry
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;