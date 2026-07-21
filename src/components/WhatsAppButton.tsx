import { useState, useEffect } from 'react';
import { ShieldCheck, X, Facebook, Instagram } from 'lucide-react';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Delay showing tooltip slightly to catch the user's attention
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const rawMessage = "Hello JB CCTV Security! I am browsing your website and would like to consult with a specialist on security systems for my property.";
    const url = `https://wa.me/601133901688?text=${encodeURIComponent(rawMessage)}`;
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
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 font-sans select-none">
      {/* Tooltip Notification Banner */}
      {showTooltip && (
        <div className="bg-neutral-900 border border-emerald-500/30 text-white rounded-2xl p-3.5 shadow-2xl max-w-[280px] animate-fade-in relative flex items-start gap-2.5 mb-1 group">
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute top-2 right-2 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>

          <div className="relative mt-1">
            <div className="w-9 h-9 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-neutral-900 rounded-full animate-ping" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-neutral-900 rounded-full" />
          </div>

          <div className="text-left">
            <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase block mb-0.5">
              SUPPORT IS ONLINE
            </span>
            <p className="text-xs font-bold text-neutral-100">
              Free Site Survey Johor Bahru
            </p>
            <p className="text-[11px] text-neutral-400 mt-1 leading-normal">
              Click to instant message our technical specialist now!
            </p>
            <button
              onClick={handleClick}
              className="text-[11px] font-bold text-emerald-400 group-hover:underline mt-1.5 flex items-center gap-1 cursor-pointer"
            >
              Start Chat Now &rarr;
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Floating Social Media Icons Panel */}
        <div className="flex items-center gap-1.5 bg-neutral-900/90 border border-neutral-800/60 backdrop-blur-md p-1.5 rounded-full shadow-lg">
          <a
            href="https://web.facebook.com/malaysiacctvs"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[#1877F2] text-white hover:bg-[#166FE5] transition-all duration-200 flex items-center justify-center cursor-pointer shadow-md hover:shadow-[#1877F2]/30 hover:scale-110"
            aria-label="Facebook"
            title="Facebook"
          >
            <Facebook className="w-4.5 h-4.5 fill-current" />
          </a>
          <a
            href="https://www.tiktok.com/@jbcctv"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[#000000] text-white border border-neutral-800 transition-all duration-200 flex items-center justify-center cursor-pointer shadow-[1px_1px_0px_#00f2fe,-1px_-1px_0px_#fe0979] hover:scale-110"
            aria-label="TikTok"
            title="TikTok"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4.5 h-4.5"
            >
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/malaysiacctv"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white transition-all duration-200 flex items-center justify-center cursor-pointer shadow-md hover:shadow-pink-500/20 hover:scale-110"
            aria-label="Instagram"
            title="Instagram"
          >
            <Instagram className="w-4.5 h-4.5" />
          </a>
        </div>

        {/* Main Floating Pulse Pulsing WhatsApp Button */}
        <button
          onClick={handleClick}
          className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-110 active:scale-90 relative cursor-pointer group"
          aria-label="Contact us of WhatsApp"
          onMouseEnter={() => setShowTooltip(true)}
        >
          {/* Glow rings */}
          <span className="absolute inset-0 bg-green-500/30 rounded-full animate-ping pointer-events-none" style={{ animationDuration: '2s' }} />
          <span className="absolute inset-[-4px] bg-green-500/10 rounded-full animate-pulse pointer-events-none" />

          <svg className="w-6.5 h-6.5 text-white fill-current transition-transform duration-200" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>

          {/* Simple red dot indicator if tooltip is closed */}
          {!showTooltip && (
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 border-2 border-neutral-900 rounded-full animate-pulse" />
          )}
        </button>
      </div>
    </div>
  );
}
