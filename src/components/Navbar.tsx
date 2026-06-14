import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Studio", href: "/studio" },
    { name: "Journal", href: "/journal" }
  ];

  return (
    <nav 
      className={`absolute top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 backdrop-blur-xl border border-accent/15 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ${
        isMobileMenuOpen ? 'rounded-2xl' : 'rounded-full'
      } ${isHomePage ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
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
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="font-body text-[11px] tracking-widest text-muted-foreground hover:text-accent uppercase transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Button */}
          <div className="hidden md:flex items-center">
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-2 border border-accent/30 hover:border-accent font-body text-[9px] tracking-widest uppercase transition-colors duration-300 bg-accent/5 hover:bg-accent/15 text-accent rounded-full"
            >
              Start Inquiry
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
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
            <div className="flex flex-col gap-5 px-4 pb-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="font-body text-xs tracking-widest text-muted-foreground hover:text-accent uppercase transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="w-full py-3 border border-accent/30 hover:border-accent font-body text-[10px] tracking-widest uppercase text-center transition-colors duration-300 bg-accent/5 hover:bg-accent/15 text-accent block mt-2 rounded-xl"
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