import { useState, useEffect, FormEvent, useMemo } from 'react';
import {
  Shield,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Camera,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  HelpCircle,
  TrendingUp,
  Cpu,
  BookmarkCheck,
  Menu,
  ChevronDown,
  User,
  ExternalLink,
  Target,
  ShieldAlert,
  Key,
  Network
} from 'lucide-react';
// Import local datasets & types
import { SERVICES, TARGET_AUDIENCES, PROJECTS, SERVICE_AREAS, FAQS } from './data';
import { Service, TargetAudience, ProjectItem } from './types.ts';
// Import components
import Navbar from './components/Navbar';
import CCTVInteractiveSimulator from './components/CCTVInteractiveSimulator';
import QuoteCalculator from './components/QuoteCalculator';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import ProjectPage, { DEFAULT_PROJECTS } from './components/ProjectPage';
import { motion, AnimatePresence } from 'motion/react';
// Generated Premium Core Images from AI Studio
const HERO_BANNER_IMAGES = [
  {
    url: '/src/assets/images/cctv cove photo.png',
    alt: 'Professional CCTV Security Systems Cover Photo'
  },
  {
    url: '/src/assets/images/edited banner dome.png',
    alt: 'JB CCTV Security Camera Banner'
  },
  {
    url: '/src/assets/images/hikvision_hero_vivid_right_aligned_1780885455591.png',
    alt: 'Smart AI Security Camera Matrix'
  },
  {
    url: '/src/assets/images/hikvision_hero_vibrant_bg_1780884949076.png',
    alt: 'Vibrant Corporate Security Solutions Johor Bahru'
  }
];
const COVER_INSTALL_IMG = '/src/assets/images/clean_cctv_install_1780884272341.png';
const getServiceStyle = (id: string) => {
  switch (id) {
    case 'cctv':
      return {
        cardHover: 'hover:border-amber-400/80 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]',
        textColor: 'group-hover:text-amber-400',
        bgImage: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80',
        iconBg: 'bg-amber-500/10 border-amber-500/20',
        neonStrip: 'bg-gradient-to-b from-amber-400 to-amber-500',
        btnHover: 'group-hover:from-amber-400 group-hover:to-orange-500',
        checkColor: 'text-amber-500'
      };
    case 'alarm':
      return {
        cardHover: 'hover:border-red-500 hover:shadow-[0_0_35px_rgba(239,68,68,0.55)]',
        textColor: 'group-hover:text-red-500 font-extrabold',
        bgImage: 'https://images.unsplash.com/photo-1610056494052-6a4f83a8368c?auto=format&fit=crop&w=600&q=80',
        iconBg: 'bg-red-500/20 border-red-500/35',
        neonStrip: 'bg-gradient-to-b from-red-500 to-rose-600',
        btnHover: 'group-hover:from-red-500 group-hover:to-rose-600',
        checkColor: 'text-red-500'
      };
    case 'access':
      return {
        cardHover: 'hover:border-emerald-400/80 hover:shadow-[0_0_30px_rgba(52,211,153,0.25)]',
        textColor: 'group-hover:text-emerald-400',
        bgImage: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=600&q=80',
        iconBg: 'bg-emerald-500/10 border-emerald-500/20',
        neonStrip: 'bg-gradient-to-b from-emerald-400 to-teal-500',
        btnHover: 'group-hover:from-emerald-400 group-hover:to-teal-500',
        checkColor: 'text-emerald-500'
      };
    case 'networking':
      return {
        cardHover: 'hover:border-cyan-400/80 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]',
        textColor: 'group-hover:text-cyan-400',
        bgImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
        iconBg: 'bg-cyan-500/10 border-cyan-500/20',
        neonStrip: 'bg-gradient-to-b from-cyan-400 to-blue-500',
        btnHover: 'group-hover:from-cyan-400 group-hover:to-blue-500',
        checkColor: 'text-cyan-500'
      };
    default:
      return {
        cardHover: 'hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]',
        textColor: 'group-hover:text-amber-400',
        bgImage: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80',
        iconBg: 'bg-amber-500/10 border-amber-500/20',
        neonStrip: 'bg-gradient-to-b from-amber-400 to-orange-500',
        btnHover: 'group-hover:from-amber-400 group-hover:to-orange-500',
        checkColor: 'text-amber-500'
      };
  }
};
const getServiceIcon = (id: string) => {
  switch (id) {
    case 'cctv':
      return <Camera className="w-7 h-7 text-amber-500 group-hover:text-amber-400 group-hover:scale-110 transition-all duration-300" />;
    case 'alarm':
      return <ShieldAlert className="w-7 h-7 text-red-500 group-hover:text-red-400 group-hover:scale-110 transition-all duration-300" />;
    case 'access':
      return <Key className="w-7 h-7 text-emerald-500 group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-300" />;
    case 'networking':
      return <Network className="w-7 h-7 text-cyan-500 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300" />;
    default:
      return <Shield className="w-7 h-7 text-amber-500 group-hover:text-amber-400 group-hover:scale-110 transition-all duration-300" />;
  }
};
function isProjectInJohorBahru(location: string): boolean {
  if (!location) return false;
  const loc = location.toLowerCase();
  const jbKeywords = [
    'johor', 'jb', 'kulai', 'senai', 'pasir gudang', 'skudai', 'permas jaya', 
    'tampoi', 'mount austin', 'horizon hills', 'bukit indah', 'nusa bestari', 
    'taman perling', 'johor jaya', 'taman molek', 'plentong', 'kempas', 
    'iskandar puteri', 'ulu tiram', 'desa cemerlang', 'setia tropika', 
    'impian emas', 'masai', 'austin heights', 'plaza pelangi'
  ];
  return jbKeywords.some(keyword => loc.includes(keyword));
}
function getAreaFromLocation(location: string): string {
  if (!location) return '';
  const loc = location.toLowerCase();
  const areaMapping = [
    { keywords: ['horizon hills'], name: 'Horizon Hills' },
    { keywords: ['mount austin', 'austin heights'], name: 'Mount Austin' },
    { keywords: ['bukit indah'], name: 'Bukit Indah' },
    { keywords: ['skudai', 'tun aminah', 'mutiara rini'], name: 'Skudai' },
    { keywords: ['pasir gudang'], name: 'Pasir Gudang' },
    { keywords: ['johor jaya'], name: 'Johor Jaya' },
    { keywords: ['taman molek'], name: 'Taman Molek' },
    { keywords: ['tampoi'], name: 'Tampoi' },
    { keywords: ['kempas'], name: 'Kempas' },
    { keywords: ['iskandar puteri', 'medini'], name: 'Iskandar Puteri' },
    { keywords: ['kulai'], name: 'Kulai' },
    { keywords: ['senai'], name: 'Senai' },
    { keywords: ['permas jaya'], name: 'Permas Jaya' },
    { keywords: ['ulu tiram'], name: 'Ulu Tiram' },
    { keywords: ['desa cemerlang'], name: 'Desa Cemerlang' },
    { keywords: ['setia tropika'], name: 'Setia Tropika' },
    { keywords: ['impian emas'], name: 'Impian Emas' },
    { keywords: ['plaza pelangi', 'jb town', 'johor bahru town'], name: 'Johor Bahru Town (JB Town)' },
  ];
  for (const mapping of areaMapping) {
    if (mapping.keywords.some(k => loc.includes(k))) {
      return mapping.name;
    }
  }
  const parts = location.split(',');
  return parts[0].trim();
}
function matchesArea(locationRaw: string, areaName: string): boolean {
  if (!locationRaw) return false;
  const loc = locationRaw.toLowerCase();
  
  // Custom split parts
  const parts = areaName.split('/').map(p => p.trim().toLowerCase());
  
  for (const part of parts) {
    // If part contains parentheses (like "(jb town)"), extract subparts
    const cleanSubParts = [part];
    const matchParens = part.match(/\(([^)]+)\)/);
    if (matchParens && matchParens[1]) {
      cleanSubParts.push(matchParens[1].trim());
      cleanSubParts.push(part.replace(/\([^)]+\)/, '').trim());
    }
    
    for (const sub of cleanSubParts) {
      if (!sub) continue;
      // Exact substring match
      if (loc.includes(sub)) {
        return true;
      }
      // Special case standard mapping for JB / Johor Bahru
      if (sub === 'jb' && (loc.includes('jb') || loc.includes('johor bahru'))) {
        return true;
      }
      if (sub.includes('johor bahru') && (loc.includes('jb') || loc.includes('johor bahru'))) {
        return true;
      }
    }
  }
  return false;
}
function getDynamicServicesForArea(areaName: string, projects: any[]): ('CCTV' | 'ALARM' | 'ACCESS CONTROL')[] {
  const matches = projects.filter(proj => matchesArea(proj.location, areaName));
  const matchedServices = new Set<'CCTV' | 'ALARM' | 'ACCESS CONTROL'>();
  matches.forEach(proj => {
    const fieldsToSearch = [
      (proj.title || ''),
      (proj.description || ''),
      (proj.productType || ''),
      (proj.projectType || '')
    ].map(f => f.toLowerCase());
    const checkMatch = (keywordsList: string[]) => {
      return fieldsToSearch.some(f => keywordsList.some(k => f.includes(k)));
    };
    // CCTV match check
    if (checkMatch(['cctv', 'camera', 'surveillance', 'ip', 'dome', 'bullet'])) {
      matchedServices.add('CCTV');
    }
    // ALARM match check
    if (checkMatch(['alarm', 'burglar', 'deterr', 'glassbreak', 'infrared', 'sensor'])) {
      matchedServices.add('ALARM');
    }
    // ACCESS CONTROL match check
    if (checkMatch(['access', 'biometric', 'lock', 'liveness', 'barrier', 'gate', 'autogate', 'cabling', 'network', 'fiber'])) {
      matchedServices.add('ACCESS CONTROL');
    }
  });
  return Array.from(matchedServices);
}
// DEFAULT_PROJECTS is imported directly from ProjectPage component to prevent duplication.
export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'projects'>('home');
  const [activeAudienceId, setActiveAudienceId] = useState('homeowners');
  const [activeGalleryFilter, setActiveGalleryFilter] = useState('All');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [quickContactName, setQuickContactName] = useState('');
  const [quickContactAddress, setQuickContactAddress] = useState('');
  const [quickContactDate, setQuickContactDate] = useState('');
  const [quickContactTime, setQuickContactTime] = useState('');
  const [quickContactMsg, setQuickContactMsg] = useState('Hello! I would like to schedule a free security survey in JB.');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [projectProductTypeFilter, setProjectProductTypeFilter] = useState<'All' | 'CCTV' | 'ALARM' | 'DOOR ACCESS'>('All');
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  // Auto-scroll banner interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % HERO_BANNER_IMAGES.length);
    }, 5000); // changes every 5 seconds
    return () => clearInterval(timer);
  }, []);
  // Load dynamically updated projects from localStorage
  useEffect(() => {
    const updateProjectsList = () => {
      try {
        const saved = typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem('jb_cctv_saved_projects') : null;
        if (saved) {
          setProjectsList(JSON.parse(saved));
        } else {
          setProjectsList(DEFAULT_PROJECTS);
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem('jb_cctv_saved_projects', JSON.stringify(DEFAULT_PROJECTS));
          }
        }
      } catch (e) {
        setProjectsList(DEFAULT_PROJECTS);
      }
    };
    updateProjectsList();
    
    // Listen to changes (e.g., when adding/deleting on projects sub-page)
    window.addEventListener('storage', updateProjectsList);
    return () => {
      window.removeEventListener('storage', updateProjectsList);
    };
  }, [currentPage]);
  // Scroll function mapping
  const navigateToSection = (id: string) => {
    if (id === 'projects') {
      setProjectSearchQuery('');
      setProjectProductTypeFilter('All');
      setCurrentPage('projects');
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      const isSwitchingPage = currentPage !== 'home';
      setCurrentPage('home');
      // Delay slightly to let the home component render and register IDs
      // If switching from projects, wait longer for the exit transition (300ms) to complete
      const delay = isSwitchingPage ? 350 : 50;
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const offset = 85; // height of sticky navbar
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, delay);
    }
  };
  const handleServiceAreaClick = (areaName: string, serviceName: 'CCTV' | 'ALARM' | 'ACCESS CONTROL') => {
    // Extract main area name (e.g. "Skudai" or "Bukit Indah")
    const mainArea = areaName.split('/')[0].trim();
    setProjectSearchQuery(mainArea);
    if (serviceName === 'CCTV') {
      setProjectProductTypeFilter('CCTV');
    } else if (serviceName === 'ALARM') {
      setProjectProductTypeFilter('ALARM');
    } else if (serviceName === 'ACCESS CONTROL') {
      setProjectProductTypeFilter('DOOR ACCESS');
    }
    setCurrentPage('projects');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };
  const handleAreaOnlyClick = (areaName: string) => {
    setProjectSearchQuery(areaName);
    setProjectProductTypeFilter('All');
    setCurrentPage('projects');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };
  // Dynamic service areas based on projects in Johor Bahru
  const dynamicServiceAreas = useMemo(() => {
    const areaMap = new Map<string, { name: string; productTypes: Set<string> }>();
    projectsList.forEach((proj) => {
      const loc = proj.location || '';
      if (loc.trim() !== '') {
        const areaName = getAreaFromLocation(loc);
        if (areaName) {
          const normKey = areaName.toLowerCase().trim();
          
          if (!areaMap.has(normKey)) {
            areaMap.set(normKey, {
              name: areaName,
              productTypes: new Set<string>()
            });
          }
          
          const entry = areaMap.get(normKey)!;
          
          // Determine product/system type installed
          const pType = (proj.productType || '').toLowerCase();
          const titleDesc = `${proj.title || ''} ${proj.description || ''}`.toLowerCase();
          
          if (pType.includes('camera') || pType.includes('cctv') || titleDesc.includes('cctv') || titleDesc.includes('camera') || titleDesc.includes('surveillance')) {
            entry.productTypes.add('CCTV');
          }
          if (pType.includes('alarm') || titleDesc.includes('alarm') || titleDesc.includes('burglar') || titleDesc.includes('sensor')) {
            entry.productTypes.add('ALARM');
          }
          if (pType.includes('access') || pType.includes('lock') || titleDesc.includes('access') || titleDesc.includes('biometric') || titleDesc.includes('lock') || titleDesc.includes('gate') || titleDesc.includes('barrier') || titleDesc.includes('autogate')) {
            entry.productTypes.add('DOOR ACCESS');
          }
        }
      }
    });
    // Convert map to sorted array of service areas
    return Array.from(areaMap.values()).map(entry => ({
      name: entry.name,
      coverage: 'System Installed' as const,
      systems: Array.from(entry.productTypes) as ('CCTV' | 'ALARM' | 'DOOR ACCESS')[]
    })).sort((a, b) => a.name.localeCompare(b.name));
  }, [projectsList]);
  const selectedAudience = TARGET_AUDIENCES.find((a) => a.id === activeAudienceId) || TARGET_AUDIENCES[0];
  // Filter gallery items
  const filteredProjects = activeGalleryFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeGalleryFilter);
  // Quick form WhatsApp forwarder
  const handleQuickSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!quickContactAddress) return;
    const encodedMessage = encodeURIComponent(
      `Hello JB CCTV Security! I submitted an inspection request form on your website:
👤 NAME: ${quickContactName || 'Customer'}
📍 ADDRESS: ${quickContactAddress}
📅 DATE: ${quickContactDate || 'No preference'}
⏰ TIME: ${quickContactTime || 'No preference'}
📝 DETAILS: ${quickContactMsg || 'Interested in onsite survey.'}`
    );
    const url = `https://wa.me/601133901688?text=${encodedMessage}`;
    try {
      if (typeof window !== 'undefined') {
        const win = window.open(url, '_blank');
        if (!win) {
          window.location.href = url;
        }
      }
    } catch (err) {
      try {
        window.location.href = url;
      } catch (e) {
        console.error("Popup blocked and fallback failed:", e);
      }
    }
    setIsFormSubmitted(true);
  };
  return (
    <div className="bg-neutral-950 text-neutral-100 font-sans min-h-screen relative overflow-x-hidden selection:bg-amber-400 selection:text-black">
      
      {/* Structural Headers */}
      <Navbar onNavigate={navigateToSection} />
      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.div
            key="home-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* 1. FULL-SCREEN HERO SECTION */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col landscape:block lg:block pt-16 sm:pt-20 lg:pt-0 overflow-hidden bg-black"
      >
        {/* Background Premium AI Generated Graphic */}
        <div className="relative w-full h-[50vh] xs:h-[55vh] sm:h-[60vh] landscape:absolute landscape:inset-0 landscape:h-full lg:absolute lg:inset-0 lg:h-full z-0 overflow-hidden shrink-0 bg-neutral-950">
          {HERO_BANNER_IMAGES.map((img, i) => (
            <img
              key={img.url}
              src={img.url}
              alt={img.alt}
              referrerPolicy="no-referrer"
              className={`absolute inset-0 w-full h-full object-cover object-[82%_center] lg:object-right scale-100 select-none transition-opacity duration-1000 ${
                i === currentBannerIndex ? 'opacity-95 lg:opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            />
          ))}
          {/* Elite Layer Gradients & Vibrant Glow Overlay optimized for maximum camera clarity on the right */}
          {/* Transition gradient from bottom of the image to the content - ONLY ON PORTRAIT MOBILE */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-950 via-neutral-950/45 to-transparent z-20 block landscape:hidden lg:hidden" />
          
          {/* Desktop & Landscape elite gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent z-20 hidden landscape:block lg:block" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/40 via-transparent to-transparent z-20 hidden landscape:block lg:block" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(245,158,11,0.15)_0%,transparent_75%)] pointer-events-none z-20 hidden landscape:block lg:block" />
          {/* Elegant active indicators overlay */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 landscape:left-8 landscape:-translate-x-0 lg:left-8 lg:-translate-x-0 flex items-center gap-2 z-30 bg-black/45 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-neutral-800/50">
            {HERO_BANNER_IMAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentBannerIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentBannerIndex 
                    ? 'bg-amber-400 w-5' 
                    : 'bg-neutral-600 hover:bg-neutral-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        {/* Small Ambient Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24 pt-12 pb-20 landscape:pt-24 landscape:pb-24 lg:pt-36 lg:pb-28 xl:pt-44 xl:pb-36 text-left">
          <div className="max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl space-y-8 lg:space-y-10">
            
            {/* Left High Impact Heading Text */}
            <div className="space-y-6 lg:space-y-8">
              
              {/* Premium micro badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 lg:px-5 lg:py-2.5 rounded-full text-xs lg:text-sm xl:text-base font-semibold uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-500/20 shadow-sm self-start animate-fade-in">
                <Sparkles className="w-3.5 h-3.5 lg:w-4 lg:h-4 xl:w-4.5 xl:h-4.5" />
                No.1 Professional CCTV Integrated Studio in Johor Bahru
              </div>
              {/* Bold Title */}
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6.5xl xl:text-7.5xl 2xl:text-8.5xl tracking-tight leading-none text-white lg:leading-[1.05]">
                Security, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-orange-500">
                  Feel it with us.
                </span>
              </h1>
              {/* Business Slogan Explanation */}
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-neutral-300 max-w-2xl lg:max-w-3xl xl:max-w-4xl leading-relaxed font-light">
                Protect your family and business with elite AI-powered surveillance. Get real-time tracking, active triggers, and instant mobile alerts today.
              </p>
              {/* Unique Selling Bullets */}
              <div className="flex flex-col gap-3 lg:gap-4 pt-2 text-left">
                <div className="inline-flex items-center gap-2.5 lg:gap-3.5 bg-neutral-900/40 px-4 py-2.5 lg:px-6 lg:py-3.5 border border-neutral-800/40 rounded-xl lg:rounded-2xl backdrop-blur-sm w-fit">
                  <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5 xl:w-5.5 xl:h-5.5 text-amber-500 shrink-0" />
                  <span className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl font-semibold text-neutral-200">Full CCTV Range Product Available</span>
                </div>
                <div className="inline-flex items-center gap-2.5 lg:gap-3.5 bg-neutral-900/40 px-4 py-2.5 lg:px-6 lg:py-3.5 border border-neutral-800/40 rounded-xl lg:rounded-2xl backdrop-blur-sm w-fit">
                  <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5 xl:w-5.5 xl:h-5.5 text-amber-500 shrink-0" />
                  <span className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl font-semibold text-neutral-200">Serviced Johor Bahru Area</span>
                </div>
              </div>
              {/* Primary Call-to-Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:gap-6 pt-4 lg:pt-6">
                <button
                  onClick={() => navigateToSection('calculator')}
                  className="px-8 py-4 lg:px-10 lg:py-5 xl:px-12 xl:py-6 text-sm lg:text-base xl:text-lg 2xl:text-xl font-bold rounded-xl lg:rounded-2xl text-black bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-95 text-center cursor-pointer"
                >
                  Configure Custom CCTV Bundle
                </button>
                <button
                  onClick={() => navigateToSection('simulator')}
                  className="px-8 py-4 lg:px-10 lg:py-5 xl:px-12 xl:py-6 text-sm lg:text-base xl:text-lg 2xl:text-xl font-bold rounded-xl lg:rounded-2xl text-white bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition-all hover:scale-[1.02] active:scale-95 text-center flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Camera className="w-4 h-4 lg:w-5 lg:h-5 xl:w-5.5 xl:h-5.5 text-amber-500" />
                  <span>Try Interactive Simulator</span>
                </button>
              </div>
              {/* Trusted Industry Logos Badge Row */}
              <div className="pt-8 lg:pt-14 xl:pt-20 space-y-2 lg:space-y-4">
                <span className="text-[10px] sm:text-xs lg:text-sm xl:text-base uppercase font-extrabold text-amber-500 tracking-wider block">
                  HIKVISION AUTHORISED DISTRIBUTOR
                </span>
                <span className="text-sm sm:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl font-display font-black text-white tracking-tight block uppercase">
                  NO1 WORLD WIDE SECURITY SOLUTION PROVIDER
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 6. PROJECT PORTFOLIO TEASER */}
      <section id="projects" className="py-20 lg:py-24 bg-neutral-950 relative border-t border-neutral-900">
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full inline-block">
              LIVE PORTFOLIO & MANAGER
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4.5xl text-white">
              Secures Across Real Environments
            </h2>
            <p className="text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              We deploy custom-engineered safety layers tailored for specialized environments here in Johor Bahru. Explore real client blueprints on our interactive project page.
            </p>
          </div>
          {/* Premium cards mapping real dynamic projects from our live database */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto pt-4">
            {projectsList.slice(0, 4).map((item) => {
              const area = getAreaFromLocation(item.location);
              return (
                <div 
                  key={item.id}
                  onClick={() => handleAreaOnlyClick(area)}
                  className="bg-neutral-900 border border-neutral-800/80 hover:border-amber-500/40 hover:bg-neutral-850/45 rounded-2xl overflow-hidden text-left cursor-pointer transition-all hover:scale-[1.03] duration-300 group flex flex-col justify-between shadow-lg"
                >
                  <div>
                    {/* Image Header with Fallback */}
                    <div className="relative aspect-[16/10] bg-neutral-950 overflow-hidden">
                      <img 
                        src={item.image || 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80'} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-neutral-950/90 border border-neutral-800 text-amber-400 text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded backdrop-blur-sm shadow-md">
                        {item.category}
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 bg-neutral-950/90 border border-neutral-800 text-neutral-300 text-[9px] font-medium font-mono px-2 py-0.5 rounded backdrop-blur-sm shadow-md flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 text-amber-500 shrink-0" />
                        <span>{area || 'Johor Bahru'}</span>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <h4 className="font-display font-bold text-sm text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-neutral-450 leading-relaxed line-clamp-3 font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-2.5 border-t border-neutral-850/60 bg-neutral-950/40 flex items-center justify-between text-[10px] font-mono font-bold tracking-wider uppercase text-amber-500 group-hover:text-amber-300">
                    <span className="truncate max-w-[150px]">Area: {area || 'JB Town'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pt-6">
            <button
              onClick={() => {
                setCurrentPage('projects');
                window.scrollTo({ top: 0, behavior: 'auto' });
              }}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-neutral-900 font-extrabold text-xs uppercase tracking-widest rounded-xl hover:scale-[1.03] transition-all shadow-lg shadow-amber-500/15 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>MANAGE EXPERT DONE PROJECTS & PHOTOS &rarr;</span>
            </button>
          </div>
          
        </div>
      </section>
      {/* 2. SERVICES SECTION */}
      <section id="services" className="py-20 landscape:py-[clamp(3rem,8vh,8rem)] lg:py-24 bg-neutral-950 border-t border-neutral-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 landscape:mb-[clamp(2rem,6vh,4rem)] space-y-3 landscape:space-y-[clamp(0.5rem,1.5vh,1rem)]">
            <span className="text-xs landscape:text-[clamp(0.65rem,1vw,0.85rem)] uppercase font-extrabold tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full inline-block">
              ENGINEERING CORE
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4.5xl landscape:text-[clamp(1.75rem,4.5vw,3.75rem)] text-white">
              Smarter Systems, Complete Shielding
            </h2>
            <p className="text-sm sm:text-base landscape:text-[clamp(0.8rem,1.6vw,1.1rem)] text-neutral-400">
              We install reliable tech stacks. Every product is backed by direct local warranties, neat insulated wiring layouts, and mobile integration.
            </p>
          </div>
          {/* Grid of Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 landscape:gap-[clamp(1rem,2vw,1.5rem)]">
            {SERVICES.map((serv) => {
              const style = getServiceStyle(serv.id);
              return (
                <div
                  key={serv.id}
                  className={`bg-neutral-900/60 border border-neutral-800/85 ${style.cardHover} rounded-2xl p-6 sm:p-8 landscape:p-[clamp(1rem,2.5vw,2rem)] flex flex-col justify-between group transition-all duration-300 relative overflow-hidden z-10`}
                >
                  {/* Low Opacity Background Image on Hover */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 opacity-0 group-hover:opacity-[0.4] pointer-events-none z-0"
                    style={{ backgroundImage: `url(${style.bgImage})` }}
                  />
                  {/* Visual overlay gradient for perfect text legibility when hovered with higher opacity background image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
                  {/* Left edge neon gradient strip */}
                  <div className={`absolute top-0 left-0 w-2 h-0 group-hover:h-full ${style.neonStrip} transition-all duration-300 z-10`} />
                  <div className="relative z-10">
                    <div className="mb-6 flex items-center justify-between">
                      <div className={`p-3 rounded-xl border ${style.iconBg} transition-all duration-300`}>
                        {getServiceIcon(serv.id)}
                      </div>
                    </div>
                    <h3 className={`font-display font-bold text-xl landscape:text-[clamp(1.1rem,2vw,1.5rem)] text-neutral-100 ${style.textColor} transition-colors`}>
                      {serv.title}
                    </h3>
                    
                    <p className="text-xs landscape:text-[clamp(11px,1.2vw,13px)] text-neutral-400 leading-normal mt-2">
                      {serv.description}
                    </p>
                    <hr className="border-neutral-800 my-4 landscape:my-[clamp(0.5rem,1.5vh,1rem)]" />
                    {/* Bullet Spec Checklist */}
                    <ul className="space-y-2 landscape:space-y-[clamp(0.25rem,1vh,0.5rem)]">
                      {serv.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs landscape:text-[clamp(10px,1.1vw,13px)] text-neutral-300 text-left">
                          <CheckCircle2 className={`w-4 h-4 ${style.checkColor} shrink-0 mt-0.5`} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-6 landscape:pt-[clamp(0.75rem,2vh,1.5rem)] relative z-10">
                    
                      href={`https://wa.me/601133901688?text=${encodeURIComponent(
                        `Hello! I want a custom quote for ${serv.title} installation at my property in Johor Bahru.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2.5 landscape:py-[clamp(0.5rem,1.2vh,0.75rem)] rounded-lg border border-neutral-800 bg-neutral-950 group-hover:bg-gradient-to-r ${style.btnHover} text-neutral-300 group-hover:text-neutral-900 group-hover:border-transparent font-semibold text-xs landscape:text-[clamp(10px,1vw,12px)] tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer`}
                    >
                      <span>Enquire Module</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* 5. INSTANT ESTIMATE BUNDLE CALCULATOR */}
      <section id="calculator" className="py-20 lg:py-24 bg-neutral-950 relative border-t border-neutral-900">
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-500 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full inline-block">
              INSTANT QUOTE CONSOLE
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4.5xl text-white">
              Design your system package estimate
            </h2>
            <p className="text-sm sm:text-base text-neutral-400">
              Customize cameras, switches, and lock options according to your premises sizes. Click apply to directly schedule a dispatch technician survey of your site.
            </p>
          </div>
          <QuoteCalculator />
        </div>
      </section>
      {/* 4. CCTV PLAYGROUND INTERACTIVE SIMULATOR */}
      <section id="simulator" className="py-20 lg:py-24 bg-neutral-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full inline-block">
              TECHNOLOGY DEMO
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4.5xl text-white">
              Try Our Interactive CCTV Live Desk
            </h2>
            <p className="text-sm sm:text-base text-neutral-400">
              Select channels, test digital zooms, check infrared matrix night-vision overrides, or hear the virtual 110dB active deterrence perimeter warning siren.
            </p>
          </div>
          {/* CCTVSimulator Embed */}
          <CCTVInteractiveSimulator />
        </div>
      </section>
      {/* 8. DETAILED SERVICE AREAS (LOCAL SEO EXPANDER) */}
      <section id="service-areas" className="py-20 lg:py-24 bg-neutral-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full inline-block">
              GEOGRAPHICAL COVERAGE
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4.5xl text-white">
              Johor Bahru Service Coverage Areas
            </h2>
            <p className="text-sm sm:text-base text-neutral-400">
              We cover these areas in Johor Bahru and provide a premium, free on-site survey & safety inspection, but do not promise immediate response or on-site arrival within the same day.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dynamicServiceAreas.map((area) => {
              return (
                <div
                  key={area.name}
                  onClick={() => handleAreaOnlyClick(area.name)}
                  className="bg-neutral-900 hover:bg-neutral-850 border border-neutral-800/80 hover:border-amber-500/30 p-5 rounded-xl shadow-lg flex flex-col justify-between cursor-pointer transition-all duration-200 group active:scale-[0.99]"
                  title={`Click to view completed projects in ${area.name}`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <h4 className="font-display font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                        {area.name}
                      </h4>
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/10 shrink-0">
                        {area.coverage}
                      </span>
                    </div>
                    {area.systems && area.systems.length > 0 ? (
                      <>
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-2 px-1 font-mono">
                          Systems Installed (Click to filter):
                        </span>
                        
                        <ul className="flex flex-wrap gap-2 pt-1">
                          {area.systems.map((ser) => (
                            <li
                              key={ser}
                              onClick={(e) => {
                                e.stopPropagation(); // Avoid triggering parent card click
                                handleServiceAreaClick(area.name, ser === 'DOOR ACCESS' ? 'ACCESS CONTROL' : ser);
                              }}
                              className="text-[10px] bg-neutral-950 hover:bg-amber-400 hover:text-black hover:border-amber-400 text-amber-400 border border-neutral-850 px-2.5 py-1.5 rounded-lg font-mono leading-none transition-all duration-150 cursor-pointer shadow-sm active:scale-95 flex items-center gap-1 font-semibold"
                              title={`Filter to completed ${ser} projects in ${area.name}`}
                            >
                              <span>{ser}</span>
                              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <div className="text-[11px] font-mono text-neutral-400 italic px-1 pt-2">
                        Premium CCTV & Security solutions installed.
                      </div>
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t border-neutral-800/50 flex items-center justify-between text-[11px] font-mono text-neutral-500 group-hover:text-amber-400/80 transition-colors">
                    <span>View project footprints</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
          {/* Quick service footer block */}
          <div className="mt-12 bg-gradient-to-br from-neutral-950 to-neutral-900 border border-amber-500/10 px-6 py-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-1 max-w-xl">
              <h4 className="font-display font-bold text-lg text-white">
                Outside Johor Bahru region?
              </h4>
              <p className="text-xs text-neutral-400 leading-normal">
                Don’t worry! We periodically undertake corporate factory installations and multi-branch surveillance deployments across Kulai, Pontian, Batu Pahat, and Singapore with scheduled logistical support.
              </p>
            </div>
            
              href="https://wa.me/601133901688?text=Hello%20JB%20CCTV%20Security!%20I%20live%20outside%20of%20Johor%20Bahru%20town%2520and%2520want%2520to%2520see%2520if%2520you%2520cover%2520my%2520area."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-amber-450 hover:bg-amber-400 text-neutral-955 font-bold text-xs rounded-lg uppercase transition-all tracking-wider shrink-0 cursor-pointer"
            >
              Enquire Regional Support
            </a>
          </div>
        </div>
      </section>
      {/* 3. TARGET AUDIENCES SECTOR HUB (WHY US) */}
      <section id="why-us" className="py-20 lg:py-24 bg-neutral-950 relative border-t border-neutral-900">
        <div className="absolute top-10 right-1/3 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Left Showcase Image (C-5) */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full inline-block">
                CRAFTSMANSHIP
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4.5xl text-white tracking-tight">
                1000+ Sites Installed
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed font-light">
                We believe security systems are only as good as their installation. With over 1000 successfully completed residential, commercial, and industrial sites across Johor Bahru, we set the benchmark for pristine conduit routing, zero-exposed cables, and rugged lightning protection.
              </p>
              <div className="pt-2">
                
                  href="https://web.facebook.com/malaysiacctvs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors bg-neutral-900 border border-neutral-800 px-4 py-2.5 rounded-lg select-none"
                >
                  <ExternalLink className="w-4 h-4 text-amber-500" />
                  <span>View Our Facebook Portfolio</span>
                </a>
              </div>
              {/* Technical installation image card with info frame */}
              <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-950">
                <img
                  src="/src/assets/images/hikvision_installer_van_1784195511675.jpg"
                  alt="JB CCTV & HIKVISION Gold Dealer Partner Installation Site"
                  referrerPolicy="no-referrer"
                  className="w-full object-cover aspect-[16/9]"
                />
                <div className="absolute bottom-3 left-3 z-10 max-w-[calc(100%-24px)]">
                  <div className="flex items-center gap-2 font-mono text-[8px] min-[360px]:text-[9.5px] min-[400px]:text-[10.5px] sm:text-[11px] md:text-xs text-amber-400 bg-neutral-950/85 backdrop-blur-md px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-neutral-800/80 shadow-lg select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                    <span className="font-semibold uppercase tracking-wider whitespace-nowrap">Experienced CCTV Team &bull; Multiple Projects Done</span>
                  </div>
                </div>
              </div>
              {/* Trust counters */}
              <div className="grid grid-cols-3 gap-4 text-center py-4 bg-neutral-900 border border-neutral-850 rounded-xl">
                <div>
                  <span className="block font-display font-black text-2xl tracking-tight text-white">1000+</span>
                  <span className="text-[10px] text-neutral-400 block uppercase">Sites Installed</span>
                </div>
                <div>
                  <span className="block font-display font-black text-2xl tracking-tight text-white">100%</span>
                  <span className="text-[10px] text-neutral-400 block uppercase">Solid Copper</span>
                </div>
                <div>
                  <span className="block font-display font-black text-2xl tracking-tight text-white">24/7</span>
                  <span className="text-[10px] text-neutral-400 block uppercase">App Access</span>
                </div>
              </div>
            </div>
            {/* Target Audience Tabs Segment Selector (C-7) */}
            <div className="lg:col-span-7 space-y-6 bg-neutral-900 p-6 sm:p-8 rounded-2xl border border-neutral-800/85">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-amber-500" />
                  Target Sector Solutions
                </span>
              </div>
              <h4 className="font-display font-bold text-2xl text-white pb-3 border-b border-neutral-800">
                Specifically Configured for your Premises
              </h4>
              {/* Selector Tabs buttons */}
              <div className="flex flex-wrap gap-2.5">
                {TARGET_AUDIENCES.map((audience) => (
                  <button
                    key={audience.id}
                    onClick={() => setActiveAudienceId(audience.id)}
                    className={`px-4 py-2.5 rounded-lg text-xs font-semibold cursor-pointer border transition-all ${
                      activeAudienceId === audience.id
                        ? 'bg-amber-450 text-neutral-950 border-amber-450 shadow-md shadow-amber-500/10'
                        : 'bg-neutral-950 border-neutral-800/90 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                    }`}
                  >
                    {audience.name}
                  </button>
                ))}
              </div>
              {/* Selected Audience Output Box */}
              <div className="space-y-4 pt-3 bg-neutral-950/80 p-5 rounded-xl border border-neutral-850/60 animate-fade-in">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase block">
                    SECTOR CORE TARGET
                  </span>
                  <h4 className="font-display font-bold text-lg text-white mt-0.5">
                    {selectedAudience.headline}
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block">
                      Critical Vulnerabilities
                    </span>
                    <ul className="space-y-1.5">
                      {selectedAudience.painPoints.map((point, i) => (
                        <li key={i} className="text-xs text-neutral-300 flex items-start gap-1.5 leading-normal">
                          <span className="text-red-500 block font-bold leading-none mt-[1px] shrink-0">&bull;</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                      Our Engineered Workaround
                    </span>
                    <ul className="space-y-1.5">
                      {selectedAudience.solutions.map((sol, i) => (
                        <li key={i} className="text-xs text-neutral-300 flex items-start gap-1.5 leading-normal">
                          <span className="text-emerald-500 block font-bold leading-none mt-[1px] shrink-0">&bull;</span>
                          <span>{sol}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="border-t border-neutral-800/80 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-neutral-500 block">
                      RECOMMENDED STANDARD EQUIPMENT PACKAGE
                    </span>
                    <span className="text-xs font-semibold text-neutral-200">
                      {selectedAudience.recommendedSetup}
                    </span>
                  </div>
                  <button
                    onClick={() => navigateToSection('calculator')}
                    className="self-start sm:self-center bg-neutral-900 border border-neutral-800 text-amber-400 hover:text-black hover:bg-amber-400 hover:border-transparent px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-all shrink-0"
                  >
                    <span>Estimate Package</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 1.5 RAPID ON-SITE SURVEY BOOKING SECTION (PHONE NUMBER) */}
      <section id="on-site-booking" className="py-16 bg-neutral-950 border-t border-neutral-900 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800 p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Decorative corner glows */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
              <div className="md:col-span-5 space-y-4 text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full inline-block">
                  RAPID ENQUIRY CORE
                </span>
                <h3 className="font-display font-bold text-2xl text-white leading-tight">
                  Get Free On-Site Inspection
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  Our professional security technicians will map blind spots at your JB building, and quote the exact equipment free of charge.
                </p>
                
                <div className="flex items-center gap-2.5 pt-2 text-[10px] text-neutral-500 font-mono">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>On-call dispatch active. Responding in Johor 9 AM - 7 PM today.</span>
                </div>
              </div>
              <div className="md:col-span-7">
                {isFormSubmitted ? (
                  <div className="bg-emerald-950/40 border border-emerald-500/30 p-6 rounded-2xl text-center space-y-3">
                    <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto" />
                    <p className="text-sm font-bold text-emerald-300">Config Dispatch Ready!</p>
                    <p className="text-xs text-neutral-300">
                      We have redirected you to WhatsApp. If it did not open, please click standard connection underneath or choose floating chat!
                    </p>
                    <button
                      onClick={() => setIsFormSubmitted(false)}
                      className="text-xs font-semibold text-amber-400 underline cursor-pointer"
                    >
                      Fill another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuickSubmit} className="space-y-3.5 text-left">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Your Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Mr. Tan / Puan Siti"
                        value={quickContactName}
                        onChange={(e) => setQuickContactName(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 text-neutral-100 rounded-lg p-2.5 text-xs focus:border-amber-500 outline-none transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">On-Site Installation / Inspection Address</label>
                      <input
                        type="text"
                        placeholder="e.g. No. 12, Jalan Austin Heights 8/1, Johor Bahru"
                        value={quickContactAddress}
                        onChange={(e) => setQuickContactAddress(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 text-neutral-100 rounded-lg p-2.5 text-xs focus:border-amber-500 outline-none transition-colors"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Preferred Date</label>
                        <input
                          type="date"
                          value={quickContactDate}
                          onChange={(e) => setQuickContactDate(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 text-neutral-100 rounded-lg p-2.5 text-xs focus:border-amber-500 outline-none transition-colors text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Preferred Time</label>
                        <input
                          type="time"
                          value={quickContactTime}
                          onChange={(e) => setQuickContactTime(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 text-neutral-100 rounded-lg p-2.5 text-xs focus:border-amber-500 outline-none transition-colors text-white"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Property Type or Message</label>
                      <textarea
                        rows={2}
                        placeholder="e.g. 2-storey house at Horizon Hills, need 4 cameras"
                        value={quickContactMsg}
                        onChange={(e) => setQuickContactMsg(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 text-neutral-100 rounded-lg p-2.5 text-xs focus:border-amber-500 outline-none transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-neutral-900 font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-amber-500/10 cursor-pointer text-center"
                    >
                      Open Free Booking on WhatsApp
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 9. ACCORDION FAQS */}
      <section id="faq" className="py-20 lg:py-24 bg-neutral-950 relative border-t border-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full inline-block">
              Q&A RESOURCE
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4.5xl text-white">
              CCTV Selection Decoded
            </h2>
            <p className="text-sm text-neutral-400 max-w-2xl mx-auto mt-1">
              Be a smart buyer. We break down the technical concerns regarding night-vision streams, cloud security backups, and server configurations below.
            </p>
          </div>
          {/* Accordion List */}
          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaqIndex(expandedFaqIndex === idx ? null : idx)}
                  className="w-full text-left p-5 flex items-start justify-between gap-4 font-semibold text-xs sm:text-sm text-neutral-100 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <span className="leading-normal">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-500 shrink-0 mt-0.5 transition-transform duration-250 ${
                      expandedFaqIndex === idx ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>
                {expandedFaqIndex === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs text-neutral-400 leading-relaxed border-t border-neutral-850/60 animate-fade-in font-light">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
          </motion.div>
        ) : (
          <motion.div
            key="projects-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectPage 
              onBackToHome={() => navigateToSection('home')} 
              initialSearch={projectSearchQuery}
              initialProductType={projectProductTypeFilter}
              onClearFilters={() => {
                setProjectSearchQuery('');
                setProjectProductTypeFilter('All');
              }}
              projects={projectsList}
              onUpdateProjects={(updated) => {
                setProjectsList(updated);
                try {
                  if (typeof window !== 'undefined' && window.localStorage) {
                    window.localStorage.setItem('jb_cctv_saved_projects', JSON.stringify(updated));
                  }
                } catch (e) {
                  console.error("Local storage error:", e);
                }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* FOOTER & OVERLAY HOOKS */}
      <Footer onNavigate={navigateToSection} serviceAreas={dynamicServiceAreas} />
      <WhatsAppButton />
    </div>
  );
}
