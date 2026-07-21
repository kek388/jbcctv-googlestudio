import { useState, useEffect } from 'react';
import { Camera, Eye, Siren, Maximize2, ShieldAlert, Cpu, Layers } from 'lucide-react';

interface Feed {
  id: string;
  name: string;
  location: string;
  image: string;
  annotations: {
    label: string;
    top: string;
    left: string;
    width: string;
    height: string;
  }[];
}

const FEEDS: Feed[] = [
  {
    id: 'feed1',
    name: 'Home Front Lawn',
    location: 'Austin Heights, Johor Bahru',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    annotations: [
      { label: 'VEHICLE [98%]', top: '65%', left: '42%', width: '38%', height: '25%' },
      { label: 'HUMAN [99.4%]', top: '48%', left: '20%', width: '12%', height: '35%' }
    ]
  },
  {
    id: 'feed2',
    name: 'Retail Checkout Lanes',
    location: 'Bukit Indah shoplot, JB',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    annotations: [
      { label: 'CASHPOINT_01 [100%]', top: '25%', left: '60%', width: '28%', height: '40%' },
      { label: 'HUMAN [97.5%]', top: '35%', left: '15%', width: '18%', height: '55%' }
    ]
  },
  {
    id: 'feed3',
    name: 'Industrial Storage Yard',
    location: 'Senai Industrial Park',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    annotations: [
      { label: 'ZONE_A LOCK [SECURE]', top: '30%', left: '10%', width: '35%', height: '55%' },
      { label: 'HUMAN [INTRUSION]', top: '40%', left: '72%', width: '15%', height: '45%' }
    ]
  }
];

export default function CCTVInteractiveSimulator() {
  const [activeFeedId, setActiveFeedId] = useState('feed1');
  const [isNightVision, setIsNightVision] = useState(false);
  const [isAISmartMode, setIsAISmartMode] = useState(true);
  const [isSirenActive, setIsSirenActive] = useState(false);
  const [isZoomActive, setIsZoomActive] = useState(false);
  const [timestamp, setTimestamp] = useState('');
  const [bitrate, setBitrate] = useState(4.24);
  const [fps, setFps] = useState(30);

  const activeFeed = FEEDS.find((f) => f.id === activeFeedId) || FEEDS[0];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimestamp(
        now.getFullYear() +
          '/' +
          String(now.getMonth() + 1).padStart(2, '0') +
          '/' +
          String(now.getDate()).padStart(2, '0') +
          ' ' +
          String(now.getHours()).padStart(2, '0') +
          ':' +
          String(now.getMinutes()).padStart(2, '0') +
          ':' +
          String(now.getSeconds()).padStart(2, '0') +
          '.' +
          String(now.getMilliseconds()).slice(0, 2)
      );

      // Random slight jitter for bitrates/fps to make it look active
      setBitrate((prev) => Math.max(3.1, Math.min(5.8, +(prev + (Math.random() - 0.5) * 0.2).toFixed(2))));
      setFps((prev) => Math.max(28, Math.min(30, +(prev + (Math.random() - 0.5) * 0.4).toFixed(1))));
    };

    const interval = setInterval(updateTime, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
      {/* Absolute gold glow design details */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-400/10 text-amber-400 border border-amber-500/20 mb-2">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            Interactive Technology Playground
          </span>
          <h3 className="font-display font-bold text-2xl text-neutral-100 flex items-center gap-2">
            Live 4K UltraHD Stream Console
          </h3>
          <p className="text-sm text-neutral-400 max-w-lg mt-1">
            Toggle our specialized smart lenses to test real-world commercial analytics. Try triggering active defense to see intrusion overrides.
          </p>
        </div>

        {/* Channel Selector */}
        <div className="flex bg-neutral-950 p-1.5 rounded-xl border border-neutral-800 self-start md:self-center">
          {FEEDS.map((feed, idx) => (
            <button
              key={feed.id}
              onClick={() => setActiveFeedId(feed.id)}
              className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                activeFeedId === feed.id
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-md'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
            >
              CH-0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* CCTV Monitor Screen (C-3 columns) */}
        <div className="lg:col-span-3 relative bg-black aspect-video rounded-xl border-4 border-neutral-950 overflow-hidden shadow-2xl flex flex-col justify-between group">
          {/* Main Visual Image Layer */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={activeFeed.image}
              alt={activeFeed.name}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-all duration-700 select-none ${
                isNightVision ? 'grayscale brightness-[0.75] contrast-[1.3] sepia-[20%] hue-rotate-[90deg]' : 'brightness-[0.95]'
              } ${isZoomActive ? 'scale-150 translate-y-[-10%] translate-x-[-5%]' : 'scale-100'}`}
            />
          </div>

          {/* CCTV Night Vision / Scan Lines Overlays */}
          {isNightVision && (
            <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,120,0,0.1)_0%,rgba(0,0,0,0.4)_100%)] opacity-80" />
          )}

          {/* Dynamic Siren Strobe Flasher Overlay */}
          {isSirenActive && (
            <div className="absolute inset-0 animate-pulse z-10 pointer-events-none" style={{
              background: 'linear-gradient(rgba(239, 68, 68, 0.15), rgba(59, 130, 246, 0.15))',
              animation: 'pulse 0.4s infinite alternate'
            }} />
          )}

          {/* CRT Grid Scanline */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,6px_100%]" />

          {/* AI Bounding Boxes Smart Layer */}
          {isAISmartMode && (
            <div className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300">
              {activeFeed.annotations.map((box, i) => (
                <div
                  key={i}
                  className="absolute border border-dashed border-amber-400 group-hover:border-solid transition-colors duration-200"
                  style={{
                    top: box.top,
                    left: box.left,
                    width: box.width,
                    height: box.height,
                    boxShadow: '0 0 10px rgba(245, 158, 11, 0.3)',
                    transform: isZoomActive ? 'scale(1.1)' : 'scale(1)'
                  }}
                >
                  <span className="absolute -top-5 left-0 px-1 py-0.5 text-[9px] font-mono font-bold tracking-wider rounded text-black bg-amber-400 border border-amber-500 shadow shadow-amber-500/30 animate-pulse">
                    {box.label}
                  </span>
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-orange-500" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-orange-500" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-orange-500" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-orange-500" />
                </div>
              ))}
            </div>
          )}

          {/* HUD Top Bar */}
          <div className="z-30 p-3 bg-gradient-to-b from-black/80 to-transparent flex items-start justify-between font-mono text-neutral-300 text-[11px] sm:text-xs">
            <div className="flex flex-col gap-0.5">
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                REC [LIVE]
              </span>
              <span>JB_SEC_CAM_0{(FEEDS.findIndex(f => f.id === activeFeedId)) + 1}</span>
              <span className="text-neutral-400">{activeFeed.location}</span>
            </div>
            <div className="text-right flex flex-col gap-0.5">
              <span>{timestamp}</span>
              <span>UTC+08:00 (Johor)</span>
              <span className="text-neutral-400">FPS: <span className="text-neutral-100">{fps}</span></span>
            </div>
          </div>

          {/* Siren Active Alert Banner */}
          {isSirenActive && (
            <div className="z-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 border border-red-500 px-6 py-3 rounded-lg flex items-center gap-3 animate-bounce shadow-lg shadow-red-600/50">
              <Siren className="w-6 h-6 text-white animate-spin" />
              <div className="text-left font-sans text-white">
                <p className="font-bold text-sm tracking-wide">ACTIVE DETERRENCE ALARM</p>
                <p className="text-[10px] uppercase opacity-90">110dB Siren & Blue/Red Strobes Onsite</p>
              </div>
            </div>
          )}

          {/* HUD Bottom Bar */}
          <div className="z-30 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between font-mono text-[10px] sm:text-xs text-neutral-400">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span>RES: <span className="text-neutral-200">3840 x 2160 (4K)</span></span>
              <span>CODEC: <span className="text-amber-400 font-bold">H.265+ PRO</span></span>
              <span>BITRATE: <span className="text-neutral-200">{bitrate} Mbps</span></span>
            </div>
            <div className="flex items-center gap-1.5 bg-neutral-900/60 px-2 py-0.5 rounded border border-neutral-800">
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span>SIG: <span className="text-green-400 font-bold">98%</span></span>
            </div>
          </div>
        </div>

        {/* Controls Panel (C-1 column) */}
        <div className="flex flex-col justify-between gap-4">
          <div className="space-y-4">
            <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
              <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 block mb-2">
                Operational Camera Overrides
              </span>
              <p className="text-[11px] text-neutral-400 mb-4">
                Simulate different Hikvision hardware filters applied on our modern systems.
              </p>

              <div className="space-y-2.5">
                {/* Night vision toggle */}
                <button
                  onClick={() => setIsNightVision(!isNightVision)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    isNightVision
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Eye className={`w-4 h-4 ${isNightVision ? 'text-emerald-400 animate-pulse' : 'text-neutral-400'}`} />
                    <span>IR Night Vision Feed</span>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${isNightVision ? 'bg-emerald-400 shadow shadow-emerald-400' : 'bg-neutral-600'}`} />
                </button>

                {/* AI Detection toggle */}
                <button
                  onClick={() => setIsAISmartMode(!isAISmartMode)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    isAISmartMode
                      ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Cpu className={`w-4 h-4 ${isAISmartMode ? 'text-amber-400 animate-spin' : 'text-neutral-400'}`} style={{ animationDuration: '4s' }} />
                    <span>AI Deep Search Sorting</span>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${isAISmartMode ? 'bg-amber-400 shadow shadow-amber-400' : 'bg-neutral-600'}`} />
                </button>

                {/* Siren alarm trigger */}
                <button
                  onClick={() => {
                    setIsSirenActive(!isSirenActive);
                    if (!isSirenActive) {
                      setIsAISmartMode(true);
                    }
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    isSirenActive
                      ? 'bg-red-950/40 border-red-500/40 text-red-400 animate-pulse'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Siren className={`w-4 h-4 ${isSirenActive ? 'text-red-500 animate-bounce' : 'text-neutral-400'}`} />
                    <span>Trigger Sirens & Lights</span>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${isSirenActive ? 'bg-red-500 animate-ping' : 'bg-neutral-600'}`} />
                </button>

                {/* Zoom toggle */}
                <button
                  onClick={() => setIsZoomActive(!isZoomActive)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    isZoomActive
                      ? 'bg-orange-950/40 border-orange-500/40 text-orange-300'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Maximize2 className={`w-4 h-4 ${isZoomActive ? 'text-orange-400' : 'text-neutral-400'}`} />
                    <span>Digital Zoom Focus (4X)</span>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${isZoomActive ? 'bg-orange-400' : 'bg-neutral-600'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Informational Box */}
          <div className="bg-gradient-to-br from-neutral-950 to-neutral-900 border border-amber-500/10 p-4 rounded-xl text-xs flex flex-col gap-2">
            <span className="font-bold text-amber-400 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              Proactive CCTV Security Specialist
            </span>
            <p className="text-neutral-400 leading-relaxed">
              We specify cameras with active deterrence, true backlight compensators (WDR), and optical night vision matrices standard in JB.
            </p>
            <div className="border-t border-neutral-800 my-1 pt-1 text-[10px] text-neutral-500">
              Authorised Hikvision Distributor.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
