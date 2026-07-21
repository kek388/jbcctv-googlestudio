import { Cctv, Shield, Phone, MapPin, Mail, Clock, ArrowRight, Facebook, Instagram } from 'lucide-react';
import { SERVICES, SERVICE_AREAS } from '../data';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  serviceAreas?: { name: string }[];
}

export default function Footer({ onNavigate, serviceAreas }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const displayAreas = serviceAreas && serviceAreas.length > 0 ? serviceAreas : SERVICE_AREAS;

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('home')}>
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
                <span className="font-display font-bold text-lg tracking-wider text-white">
                  JB CCTV SECURITY
                </span>
                <span className="block text-[9px] tracking-widest text-neutral-400 uppercase font-bold -mt-1">
                  Surveillance Engineering
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-neutral-400">
              Authorised Hikvision distributor providing corporate and residential custom CCTV setups, access barriers, and network structured infrastructure in Johor Bahru.
            </p>
            <div className="text-xs text-amber-400/85">
              <span>Slogan: </span>
              <span className="font-semibold italic">“Security, Feel it with us.”</span>
            </div>
            
            {/* Social Media Links */}
            <div className="pt-2.5">
              <span className="block text-[11px] font-semibold text-neutral-300 uppercase tracking-widest mb-2.5">
                Social Networks
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://web.facebook.com/malaysiacctvs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-2.5 rounded-xl bg-neutral-900 border border-neutral-800/80 text-neutral-400 hover:text-amber-400 hover:border-amber-500/30 hover:bg-neutral-900/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center cursor-pointer shadow-md"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.tiktok.com/@jbcctv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-2.5 rounded-xl bg-neutral-900 border border-neutral-800/80 text-neutral-400 hover:text-amber-400 hover:border-amber-500/30 hover:bg-neutral-900/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center cursor-pointer shadow-md"
                  aria-label="TikTok"
                  title="TikTok"
                >
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
                <a
                  href="https://www.instagram.com/malaysiacctv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-2.5 rounded-xl bg-neutral-900 border border-neutral-800/80 text-neutral-400 hover:text-amber-400 hover:border-amber-500/30 hover:bg-neutral-900/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center cursor-pointer shadow-md"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="pt-2 border-t border-neutral-900 text-[11px] text-neutral-500">
              JB CCTV Security
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h5 className="font-semibold text-sm text-white tracking-widest uppercase border-l-2 border-amber-500 pl-2">
              Our Security Specialties
            </h5>
            <ul className="space-y-2 text-sm">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => onNavigate('services')}
                    className="hover:text-amber-400 hover:translate-x-1 transition-all cursor-pointer flex items-center gap-1.5 text-left text-xs"
                  >
                    <ArrowRight className="w-3 h-3 text-amber-500" />
                    <span>{s.title}</span>
                  </button>
                </li>
              ))}
            </ul>

            <h5 className="font-semibold text-sm text-white tracking-widest uppercase border-l-2 border-amber-500 pl-2 pt-2">
              Customer Hubs
            </h5>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px]">
              <li>Homeowners</li>
              <li>Factories</li>
              <li>Shoplots</li>
              <li>Offices</li>
              <li>Big Brands</li>
              <li>Government</li>
            </ul>
          </div>

          {/* Core Service Areas (Local SEO booster) */}
          <div className="space-y-4">
            <h5 className="font-semibold text-sm text-white tracking-widest uppercase border-l-2 border-amber-500 pl-2">
              Johor Bahru Hubs
            </h5>
            <p className="text-xs text-neutral-500 leading-relaxed">
              We operate emergency service dispatch units directly coverage to the following key locations:
            </p>
            <ul className="grid grid-cols-1 gap-y-1.5 text-xs">
              {displayAreas.map((area) => (
                <li key={area.name} className="flex items-start gap-1 text-neutral-400">
                  <MapPin className="w-3 h-3 text-amber-500/80 shrink-0 mt-0.5" />
                  <span className="hover:text-neutral-100 transition-colors text-[10px] sm:text-[11px] font-medium leading-snug">
                    {area.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h5 className="font-semibold text-sm text-white tracking-widest uppercase border-l-2 border-amber-500 pl-2">
              Contact Center
            </h5>
            <div className="space-y-3.5 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  No. 36A, Jalan Perkasa 2, Tun Aminah Skudai, Johor
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:supershield19@gmail.com" className="hover:text-amber-400">
                  supershield19@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1.5 border-t border-neutral-900">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-100">Daily Operating Hours</p>
                  <p className="text-neutral-400">Monday - Saturday : 9.30am - 5:30pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <hr className="border-neutral-900 my-10" />

        {/* Bottom copyright details */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {currentYear} JB CCTV Security. All rights reserved. Made in Johor Bahru.</p>
          <div className="flex flex-wrap gap-4">
            <a href="#home" className="hover:text-amber-500 transition-colors">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#services" className="hover:text-amber-500 transition-colors">Terms of Workmanship</a>
            <span>&bull;</span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-500/80 px-2 py-0.5 border border-dashed border-amber-500/20 rounded">
              CIDB Registered Contractor
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
