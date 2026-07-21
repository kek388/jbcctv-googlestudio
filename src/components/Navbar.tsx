import { useState, useEffect } from 'react';
import { Shield, Phone, Menu, X, Cctv, Facebook, Instagram, Calendar, Folder, Wrench, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const quoteStyles = [
  {
    fontFamily: '"Space Grotesk", sans-serif',
    fontWeight: '900',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: '#0a0a0a',
    fontStyle: 'normal' as const,
    textShadow: '0 0 10px rgba(245,158,11,0.5)',
  },
  {
    fontFamily: '"Playfair Display", serif',
    fontWeight: '900',
    letterSpacing: '0.04em',
    textTransform: 'uppercase' as const,
    color: '#1e1b4b', // Deep indigo
    fontStyle: 'italic' as const,
    textShadow: '0 0 12px rgba(139,92,246,0.6)',
  },
  {
    fontFamily: '"JetBrains Mono", monospace',
    fontWeight: '800',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: '#0f172a', // Deep slate
    fontStyle: 'normal' as const,
    textShadow: '0 0 10px rgba(59,130,246,0.4)',
  },
  {
    fontFamily: '"Syne", sans-serif',
    fontWeight: '800',
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
    color: '#000000',
    fontStyle: 'normal' as const,
    textShadow: '0 0 15px rgba(244,63,94,0.5)',
  },
  {
    fontFamily: '"Unbounded", sans-serif',
    fontWeight: '800',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: '#042f1a', // deep forest
    fontStyle: 'normal' as const,
    textShadow: '0 0 12px rgba(16,185,129,0.5)',
  }
];

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [styleIndex, setStyleIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStyleIndex((prev) => (prev + 1) % quoteStyles.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: 'PROJECT', id: 'projects' },
    { label: 'SERVICES', id: 'services' },
    { label: 'CCTV SIMULATOR', id: 'simulator' },
    { label: 'AREA', id: 'service-areas' },
    { label: 'WHY US', id: 'why-us' },
    { label: 'BOOKING', id: 'on-site-booking' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/90 backdrop-blur-md border-b border-amber-500/10 shadow-lg py-3'
          : 'bg-gradient-to-b from-black/80 to-transparent py-5'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between">
          {/* Logo Container Wrapper */}
          <div className="flex-shrink-0 lg:w-[200px] xl:w-[220px] flex items-center justify-start">
            <div
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="relative flex items-center justify-center w-12 h-12 transition-all duration-300 group-hover:scale-105">
                {/* Gold Neon background glow */}
                <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Golden Shield Container (Bigger) */}
                <Shield className="w-11 h-11 text-amber-500/90 fill-amber-950/40 stroke-[1.8] drop-shadow-[0_0_10px_rgba(245,158,11,0.55)] transition-all duration-300 group-hover:text-amber-400 group-hover:fill-amber-950/60" />
                {/* CCTV Camera Centered inside Shield */}
                <Cctv className="absolute w-[18px] h-[18px] text-amber-300 stroke-[2.2] drop-shadow-[0_0_5px_rgba(251,191,36,0.85)] transition-all duration-300 group-hover:text-yellow-100 group-hover:scale-110" />
                {/* JB Monogram Combination inside Shield Wings */}
                <span className="absolute left-[9px] top-[15px] font-display font-black text-[9px] text-amber-400/80 tracking-tighter select-none transition-all duration-300 group-hover:text-amber-300 group-hover:drop-shadow-[0_0_3px_rgba(245,158,11,0.7)]">J</span>
                <span className="absolute right-[9px] top-[15px] font-display font-black text-[9px] text-amber-400/80 tracking-tighter select-none transition-all duration-300 group-hover:text-amber-300 group-hover:drop-shadow-[0_0_3px_rgba(245,158,11,0.7)]">B</span>
              </div>
              <div>
                <span className="font-display font-bold text-lg xl:text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-neutral-50 via-amber-400 to-orange-500 block leading-none">
                  JB CCTV
                </span>
                <span className="block font-sans text-[8px] xl:text-[9px] tracking-widest text-neutral-400 uppercase font-bold mt-1">
                  SECURITY EXPERTS
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-start gap-2.5 xl:gap-3.5 flex-grow ml-8 xl:ml-12">
            {navItems.map((item) => {
              if (item.id === 'projects') {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className="font-sans text-[11px] lg:text-[12px] xl:text-[13.5px] 2xl:text-[15px] font-extrabold tracking-wider text-neutral-200 hover:text-amber-400 px-3 py-2.5 lg:px-4 lg:py-3 rounded-xl xl:rounded-2xl border border-neutral-800 bg-neutral-900/60 hover:border-amber-500/40 hover:bg-amber-950/20 shadow-sm transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-2 group"
                  >
                    <Folder 
                      className="w-4 h-4 lg:w-[17px] lg:h-[17px] xl:w-[18px] xl:h-[18px] text-amber-450 drop-shadow-[0_0_8px_rgba(245,158,11,0.85)] animate-pulse group-hover:scale-110 transition-transform duration-200" 
                      style={{ animationDuration: '1.6s' }}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              }
              if (item.id === 'services') {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className="font-sans text-[11px] lg:text-[12px] xl:text-[13.5px] 2xl:text-[15px] font-extrabold tracking-wider text-neutral-200 hover:text-blue-400 px-3 py-2.5 lg:px-4 lg:py-3 rounded-xl xl:rounded-2xl border border-neutral-800 bg-neutral-900/60 hover:border-blue-500/40 hover:bg-blue-950/20 shadow-sm transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-2 group"
                  >
                    <Wrench 
                      className="w-4 h-4 lg:w-[17px] lg:h-[17px] xl:w-[18px] xl:h-[18px] text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.85)] animate-pulse group-hover:scale-110 transition-transform duration-200" 
                      style={{ animationDuration: '2.5s' }}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              }
              if (item.id === 'simulator') {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className="font-sans text-[11px] lg:text-[12px] xl:text-[13.5px] 2xl:text-[15px] font-extrabold tracking-wider text-neutral-200 hover:text-red-400 px-3 py-2.5 lg:px-4 lg:py-3 rounded-xl xl:rounded-2xl border border-neutral-800 bg-neutral-900/60 hover:border-red-500/40 hover:bg-red-950/20 shadow-sm transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-2.5"
                  >
                    <span className="relative flex h-2 w-2 lg:h-2.5 lg:w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-80"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 lg:h-2.5 lg:w-2.5 bg-red-550"></span>
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              }
              if (item.id === 'service-areas') {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className="font-sans text-[11px] lg:text-[12px] xl:text-[13.5px] 2xl:text-[15px] font-extrabold tracking-wider text-neutral-200 hover:text-emerald-400 px-3 py-2.5 lg:px-4 lg:py-3 rounded-xl xl:rounded-2xl border border-neutral-800 bg-neutral-900/60 hover:border-emerald-500/40 hover:bg-emerald-950/20 shadow-sm transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-2 group"
                  >
                    <MapPin 
                      className="w-4 h-4 lg:w-[17px] lg:h-[17px] xl:w-[18px] xl:h-[18px] text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.85)] animate-pulse group-hover:scale-110 transition-transform duration-200" 
                      style={{ animationDuration: '3.4s' }}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              }
              if (item.id === 'why-us') {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className="font-sans text-[11px] lg:text-[12px] xl:text-[13.5px] 2xl:text-[15px] font-extrabold tracking-wider text-neutral-200 hover:text-orange-400 px-3 py-2.5 lg:px-4 lg:py-3 rounded-xl xl:rounded-2xl border border-neutral-800 bg-neutral-900/60 hover:border-orange-500/40 hover:bg-orange-950/20 shadow-sm transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-2 group"
                  >
                    <Shield 
                      className="w-4 h-4 lg:w-[17px] lg:h-[17px] xl:w-[18px] xl:h-[18px] text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.85)] animate-pulse group-hover:scale-110 transition-transform duration-200" 
                      style={{ animationDuration: '2.0s' }}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              }
              if (item.id === 'on-site-booking') {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className="font-sans text-[11px] lg:text-[12px] xl:text-[13.5px] 2xl:text-[15px] font-extrabold tracking-wider text-neutral-200 hover:text-purple-400 px-3 py-2.5 lg:px-4 lg:py-3 rounded-xl xl:rounded-2xl border border-neutral-800 bg-neutral-900/60 hover:border-purple-500/40 hover:bg-purple-950/20 shadow-sm transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-2 group"
                  >
                    <Calendar 
                      className="w-4 h-4 lg:w-[17px] lg:h-[17px] xl:w-[18px] xl:h-[18px] text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.85)] animate-pulse group-hover:scale-110 transition-transform duration-200" 
                      style={{ animationDuration: '1.3s' }}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              }
              return null;
            })}
          </nav>

          {/* CTAs Wrapper */}
          <div className="hidden sm:flex items-center justify-end flex-shrink-0 lg:w-[220px] xl:w-[260px] 2xl:w-[290px]">
            <button
              onClick={() => handleLinkClick('calculator')}
              className="relative w-[180px] lg:w-[200px] xl:w-[230px] 2xl:w-[260px] h-[50px] lg:h-[54px] xl:h-[58px] rounded-xl lg:rounded-2xl bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-[size:200%_auto] hover:brightness-110 border-2 border-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] transition-all duration-300 hover:scale-[1.05] active:scale-95 cursor-pointer flex items-center justify-center whitespace-nowrap overflow-hidden"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence mode="sync" initial={false}>
                  <motion.span
                    key={styleIndex}
                    initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.95 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                    exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.95 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                    style={{
                      fontFamily: quoteStyles[styleIndex].fontFamily,
                      fontWeight: quoteStyles[styleIndex].fontWeight,
                      letterSpacing: quoteStyles[styleIndex].letterSpacing,
                      textTransform: 'uppercase',
                      color: quoteStyles[styleIndex].color,
                      fontStyle: quoteStyles[styleIndex].fontStyle,
                      textShadow: quoteStyles[styleIndex].textShadow,
                    }}
                    className="absolute text-[16px] lg:text-[17px] xl:text-[19px] 2xl:text-[21px] select-none text-center uppercase tracking-wider"
                  >
                    GET LIVE QUOTE
                  </motion.span>
                </AnimatePresence>
              </div>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-300 hover:text-amber-400 focus:outline-none cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[64px] left-0 w-full bg-neutral-950 border-b border-amber-500/10 shadow-2xl z-40 animate-fade-in">
          <div className="px-4 pt-4 pb-6 space-y-2 bg-gradient-to-b from-neutral-950 to-neutral-900">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className="w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-neutral-300 hover:text-amber-400 hover:bg-neutral-800/50 hover:border-l-4 hover:border-amber-500 transition-all duration-150 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-neutral-800/60 my-4 pt-4 flex flex-col gap-4">
              <button
                onClick={() => handleLinkClick('calculator')}
                className="w-full text-center px-4 py-3 text-base font-bold rounded-xl text-black bg-gradient-to-r from-amber-400 to-orange-500 cursor-pointer shadow-lg hover:brightness-110"
              >
                Instant Package Configulator
              </button>
              
              {/* Mobile Drawer Social Links */}
              <div className="flex items-center justify-between px-4 py-2 bg-neutral-900/40 border border-neutral-800/50 rounded-xl mt-2">
                <span className="text-xs text-neutral-400 font-medium tracking-wide">Join Our Networks:</span>
                <div className="flex gap-3">
                  <a href="https://web.facebook.com/malaysiacctvs" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-amber-400 transition-colors flex items-center justify-center" aria-label="Facebook">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="https://www.tiktok.com/@jbcctv" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-amber-400 transition-colors flex items-center justify-center" aria-label="TikTok">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/malaysiacctv" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-amber-400 transition-colors flex items-center justify-center" aria-label="Instagram">
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
