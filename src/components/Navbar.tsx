"use client";
import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me').then(res => setIsAuthenticated(res.ok));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-outline-variant/20 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="font-display text-2xl tracking-[0.2em] text-primary uppercase">
          SALEEM
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          <a href="/#menu" className="text-sm tracking-widest text-on-surface hover:text-secondary uppercase transition-colors">Menu</a>
          <a href="/#about" className="text-sm tracking-widest text-on-surface hover:text-secondary uppercase transition-colors">About</a>
          <a href="/#reservations" className="text-sm tracking-widest border border-secondary text-primary px-6 py-2 uppercase hover:bg-secondary/10 transition-colors">
            Reserve
          </a>
          {isAuthenticated ? (
            <a href="/dashboard" className="text-sm tracking-widest text-secondary uppercase hover:text-primary transition-colors flex items-center gap-2"><User size={16}/> Dashboard</a>
          ) : (
            <a href="/login" className="text-sm tracking-widest text-on-surface hover:text-secondary uppercase transition-colors flex items-center gap-2"><User size={16}/> Login</a>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-outline-variant/20 py-4 px-6 flex flex-col gap-4 shadow-lg">
          <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="text-sm tracking-widest text-on-surface hover:text-secondary uppercase">Menu</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-sm tracking-widest text-on-surface hover:text-secondary uppercase">About</a>
          <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="text-sm tracking-widest text-on-surface hover:text-secondary uppercase">Gallery</a>
          <a href="#reservations" onClick={() => setMobileMenuOpen(false)} className="text-sm tracking-widest text-secondary uppercase">Reserve</a>
        </div>
      )}
    </header>
  );
}
