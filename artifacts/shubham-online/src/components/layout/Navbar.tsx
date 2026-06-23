import { Link, useLocation } from "wouter";
import { Menu, X, FileText, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "મુખ્ય પૃષ્ઠ" },
  { href: "/services", label: "સેવાઓ" },
  { href: "/about", label: "અમારા વિશે" },
  { href: "/help", label: "મદદ" },
  { href: "/contact", label: "સંપર્ક કરો" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "bg-primary text-white shadow-md py-3" 
          : "bg-transparent text-primary py-5"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-3 group">
              <div className={cn(
                "p-2 rounded-xl transition-colors duration-300",
                scrolled ? "bg-white/10 text-secondary" : "bg-primary text-secondary"
              )}>
                <FileText className="h-6 w-6" />
              </div>
              <span className={cn(
                "text-2xl font-serif font-bold tracking-tight transition-colors duration-300",
                scrolled ? "text-white" : "text-primary group-hover:text-primary/80"
              )}>
                શુભમ ઓનલાઈન
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-all duration-300 relative py-2 font-sans",
                    scrolled ? (isActive ? "text-secondary" : "text-white/80 hover:text-white") : (isActive ? "text-primary font-semibold" : "text-primary/70 hover:text-primary")
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className={cn(
                      "absolute bottom-0 left-0 w-full h-0.5 rounded-full",
                      scrolled ? "bg-secondary" : "bg-primary"
                    )} />
                  )}
                </Link>
              );
            })}
            <Button 
              asChild 
              className={cn(
                "font-semibold rounded-full px-6 transition-all duration-300 hover:scale-105",
                scrolled 
                  ? "bg-secondary text-primary hover:bg-secondary/90 shadow-[0_0_15px_rgba(245,158,11,0.3)]" 
                  : "bg-primary text-white hover:bg-primary/90 shadow-lg"
              )}
            >
              <Link href="/services">
                <span>અરજી કરો</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={cn("h-6 w-6", scrolled ? "text-white" : "text-primary")} />
            ) : (
              <Menu className={cn("h-6 w-6", scrolled ? "text-white" : "text-primary")} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-primary text-white border-t border-white/10 shadow-2xl animate-in slide-in-from-top-2 p-4">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                    isActive 
                      ? "bg-white/10 text-secondary border-l-4 border-secondary" 
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button asChild className="bg-secondary text-primary hover:bg-secondary/90 w-full mt-4 h-12 rounded-xl text-lg font-bold" onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="/services">અરજી કરો</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}