import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground select-none selection:bg-accent selection:text-black">
      <div className="text-center flex flex-col items-center gap-6 max-w-sm px-6">
        <span className="font-mono text-accent text-xs tracking-[0.25em] uppercase">
          ERROR 404
        </span>
        <h1 className="font-display text-5xl md:text-6xl font-normal uppercase leading-none">
          Silent Path
        </h1>
        <p className="font-body text-muted-foreground text-sm leading-relaxed tracking-wide">
          The environment you are searching for does not exist or has been shifted into negative space.
        </p>
        <div className="h-[1px] w-12 bg-accent/20 my-2" />
        <Link 
          to="/" 
          className="font-mono text-[10px] tracking-widest text-accent uppercase font-semibold border-b border-accent/30 hover:border-accent transition-all duration-300 pb-1"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
