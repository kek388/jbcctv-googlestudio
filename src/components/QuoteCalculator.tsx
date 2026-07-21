import { useState } from 'react';
import { Sliders, Shield, Cctv, Info, HardDrive, Eye, Mic, BellRing, Phone, CheckCircle2, MapPin, Sparkles, HelpCircle } from 'lucide-react';

interface PropertyType {
  name: string;
  description: string;
  icon: string;
  isSpecialVisit: boolean;
}

const PROPERTIES: PropertyType[] = [
  { name: 'Home / Villa', description: 'Terrace, Semi-D, or Bungalow', icon: 'Home', isSpecialVisit: false },
  { name: 'Retail Shoplot', description: 'Storefronts, Cafes & Retail', icon: 'ShoppingBag', isSpecialVisit: false },
  { name: 'MNC Office Space', description: 'Corporate Offices & Workspaces', icon: 'Briefcase', isSpecialVisit: false },
  { name: 'Factory / Large Area', description: 'Industrial Yards & Warehouses', icon: 'Factory', isSpecialVisit: true },
];

interface CameraTier {
  id: string;
  name: string;
  megapixel: string;
  nightView: string;
  description: string;
  features: string[];
  // Prices map to base 4-channel and 8-channel versions
  price4Ch: number;
  price8Ch: number;
  hdd4Ch: string;
  hdd8Ch: string;
  // Dynamic upgrades
  upgrade?: {
    label: string;
    cost4Ch: number;
    cost8Ch: number;
    description: string;
  };
}

const ANALOG_TIERS: CameraTier[] = [
  {
    id: 'a1',
    name: '2MP Eco Analog',
    megapixel: '2 Megapixel Full HD',
    nightView: 'Smart Infrared (Black & White)',
    description: 'Cost-effective high-durability system with solid day performance.',
    features: ['Coaxial copper cabling', 'Mobile App live view', '12 Months Warranty'],
    price4Ch: 1900,
    price8Ch: 3300,
    hdd4Ch: '1TB Seagate Surveillance HDD',
    hdd8Ch: '1TB Seagate Surveillance HDD',
    upgrade: {
      label: 'Upgrade to 24H Full Color & Mic',
      cost4Ch: 200,
      cost8Ch: 300,
      description: 'Upgrades to 24-hour color night vision and built-in mic recording.'
    }
  },
  {
    id: 'a2',
    name: '5MP Eco Analog',
    megapixel: '5 Megapixel Ultra HD',
    nightView: 'Smart Infrared (Black & White)',
    description: 'Extra sharp digital zoom and resolution for wide outdoor angles.',
    features: ['Deep digital zoom crops', 'Heavy-duty DVR housing', 'Instant security alerts'],
    price4Ch: 2200,
    price8Ch: 3900,
    hdd4Ch: '1TB Seagate Surveillance HDD',
    hdd8Ch: '1TB Seagate Surveillance HDD',
    upgrade: {
      label: 'Upgrade to 24H Full Color & Mic',
      cost4Ch: 200,
      cost8Ch: 400,
      description: 'Upgrades to 24H full-color night view and high-definition audio.'
    }
  },
  {
    id: 'a3',
    name: '2MP Advance ColorVu',
    megapixel: '2 Megapixel Full HD',
    nightView: '24H Crystal Clear Color',
    description: 'Continuous daytime color reproduction even in pitch darkness.',
    features: ['ColorVu premium low-light lens', 'Built-in Audio recording', 'Warm ambient fill-light'],
    price4Ch: 2400,
    price8Ch: 3900,
    hdd4Ch: '1TB Seagate Surveillance HDD',
    hdd8Ch: '1TB Seagate Surveillance HDD'
  },
  {
    id: 'a4',
    name: '5MP ColorVu CCTV',
    megapixel: '5 Megapixel Ultra HD',
    nightView: '24H Crystal Clear Color',
    description: 'Top-tier combination of high 5MP details and F1.0 full color night vision.',
    features: ['Elite F1.0 super aperture', 'Built-in high-gain microphone', 'Premium backlight protection'],
    price4Ch: 2700,
    price8Ch: 4600,
    hdd4Ch: '1TB Seagate Surveillance HDD',
    hdd8Ch: '1TB Seagate Surveillance HDD'
  },
  {
    id: 'a5',
    name: '2MP deterrence Alarm + Two-Way Audio',
    megapixel: '2 Megapixel Smart Hybrid',
    nightView: 'Smart Hybrid (B/W to Color on alert)',
    description: 'Active strobe warnings and two-way talk inter-com features.',
    features: ['Two-Way audio talking', 'Strobe alarm spotlight', 'Built-in alert warning siren'],
    price4Ch: 2600,
    price8Ch: 4200,
    hdd4Ch: '1TB Seagate Surveillance HDD',
    hdd8Ch: '1TB Seagate Surveillance HDD',
    upgrade: {
      label: 'Upgrade to 5MP High Resolution',
      cost4Ch: 400,
      cost8Ch: 600,
      description: 'Upgrades all cameras to 5MP Ultra HD sensors for sharper details.'
    }
  }
];

const IP_TIERS: CameraTier[] = [
  {
    id: 'i1',
    name: '2MP Smart IP Standard',
    megapixel: '2 Megapixel IP Digital',
    nightView: 'Smart Infrared (Black & White)',
    description: 'True lossless digital IP network with streamlined single-cable PoE installation.',
    features: ['Single-cable PoE setup', '100% Digital signal transmission', 'App instant recording retrieval'],
    price4Ch: 2476,
    price8Ch: 3676,
    hdd4Ch: '1TB Seagate Surveillance HDD',
    hdd8Ch: '2TB Seagate Surveillance HDD'
  },
  {
    id: 'i2',
    name: '2MP ColorVu IP',
    megapixel: '2 Megapixel IP Digital',
    nightView: '24H Crystal Clear Color',
    description: 'Pristine digital network system paired with F1.0 permanent color night vision.',
    features: ['High-gain audio recording', 'ColorVu low-light performance', 'Prism light reduction'],
    price4Ch: 2676,
    price8Ch: 4176,
    hdd4Ch: '1TB Seagate Surveillance HDD',
    hdd8Ch: '2TB Seagate Surveillance HDD'
  },
  {
    id: 'i3',
    name: '4MP Smart Hybrid IP',
    megapixel: '4 Megapixel 2.5K IP',
    nightView: 'Smart Hybrid (B/W to Color on motion)',
    description: 'Intelligent cameras that switch from discreet B/W to bright color on movement.',
    features: ['AcuSense human/car filter', 'Advanced spotlight triggers', 'High dynamic range (HDR)'],
    price4Ch: 2976,
    price8Ch: 4876,
    hdd4Ch: '1TB Seagate Surveillance HDD',
    hdd8Ch: '2TB Seagate Surveillance HDD'
  },
  {
    id: 'i4',
    name: '4MP ColorVu IP',
    megapixel: '4 Megapixel 2.5K IP',
    nightView: '24H Crystal Clear Color',
    description: 'High-definition 4MP digital streams with elite permanent color detail at night.',
    features: ['Crystal clear 2.5K pixels', 'Built-in real-time audio', 'Advanced intrusion alerts'],
    price4Ch: 3276,
    price8Ch: 5176,
    hdd4Ch: '1TB Seagate Surveillance HDD',
    hdd8Ch: '2TB Seagate Surveillance HDD'
  },
  {
    id: 'i5',
    name: '6MP Smart Hybrid IP',
    megapixel: '6 Megapixel 3K IP',
    nightView: 'Smart Hybrid (B/W to Color on motion)',
    description: 'Massive 3K canvas size with ultra wide surveillance scope and heavy storage.',
    features: ['High capacity surveillance pool', 'Superior perimeter tripwire', 'Professional 3K lenses'],
    price4Ch: 3476,
    price8Ch: 5676,
    hdd4Ch: '1TB Seagate Surveillance HDD',
    hdd8Ch: '4TB Seagate Surveillance HDD'
  },
  {
    id: 'i6',
    name: '8MP 4K Smart Hybrid IP',
    megapixel: '8 Megapixel 4K Ultra HD',
    nightView: 'Smart Hybrid (B/W to Color on motion)',
    description: 'Cinematic 4K network nodes. Ultimate security setup for high-detail requirements.',
    features: ['Enterprise 4K optical clarity', 'Smart target tracking', 'Enterprise-grade HDD specs'],
    price4Ch: 3876,
    price8Ch: 6388,
    hdd4Ch: '2TB Seagate Surveillance HDD',
    hdd8Ch: '4TB Seagate Surveillance HDD'
  }
];

export default function QuoteCalculator() {
  const [propertyIdx, setPropertyIdx] = useState(0);
  const [techType, setTechType] = useState<'analog' | 'ip'>('analog');
  const [cameraCount, setCameraCount] = useState<number>(4);
  const [selectedTierId, setSelectedTierId] = useState<string>('a1');
  const [applyUpgrade, setApplyUpgrade] = useState<boolean>(false);

  const activeProperty = PROPERTIES[propertyIdx] || PROPERTIES[0];

  // Pick tiers and set defaults
  const currentTiers = techType === 'analog' ? ANALOG_TIERS : IP_TIERS;
  
  // Safeguard selection when switching technology
  let activeTier = currentTiers.find((t) => t.id === selectedTierId);
  if (!activeTier) {
    activeTier = currentTiers[0];
  }

  // Calculate dynamic price based on camera count slider using ratios
  const calculateEstimate = () => {
    // We have base 4-channel price (P4) and 8-channel price (P8)
    const p4 = activeTier.price4Ch;
    const p8 = activeTier.price8Ch;

    let finalPrice = 0;

    if (cameraCount <= 4) {
      // 1 to 4 Cameras: Uses a 4-channel recorder
      // Subtract a dynamic ratio discount for fewer cameras (e.g. RM 120 discount per missing camera)
      const missingCameras = 4 - cameraCount;
      finalPrice = p4 - (missingCameras * 120);
      
      // Apply upgrade if selected
      if (applyUpgrade && activeTier.upgrade) {
        finalPrice += activeTier.upgrade.cost4Ch;
      }
    } else if (cameraCount <= 8) {
      // 5 to 8 Cameras: Uses an 8-channel recorder
      // Subtract a dynamic ratio discount for fewer cameras below 8 (e.g. RM 180 discount per missing camera)
      const missingCameras = 8 - cameraCount;
      finalPrice = p8 - (missingCameras * 180);

      // Apply upgrade if selected
      if (applyUpgrade && activeTier.upgrade) {
        finalPrice += activeTier.upgrade.cost8Ch;
      }
    } else {
      // 9 to 16 Cameras: Uses a high-capacity 16-channel recorder
      // Estimate 16-channel package base price at 1.75x of 8-channel package
      const estimatedP16 = Math.round((p8 * 1.75) / 50) * 50;
      const missingCameras = 16 - cameraCount;
      finalPrice = estimatedP16 - (missingCameras * 220);

      // Apply upgrade proportionally
      if (applyUpgrade && activeTier.upgrade) {
        finalPrice += activeTier.upgrade.cost8Ch * 1.8;
      }
    }

    // Guarantee a realistic minimum floor
    const absoluteMin = Math.round((p4 * 0.7) / 50) * 50;
    return Math.max(finalPrice, absoluteMin);
  };

  const estimatedTotal = calculateEstimate();

  const formatMaskedPrice = (price: number) => {
    const thousands = Math.floor(price / 1000);
    return `RM ${thousands},xxx`;
  };

  // Handle tech toggle cleanly
  const handleTechChange = (tech: 'analog' | 'ip') => {
    setTechType(tech);
    const defaultId = tech === 'analog' ? 'a1' : 'i1';
    setSelectedTierId(defaultId);
    setApplyUpgrade(false);
  };

  const handleTierChange = (tierId: string) => {
    setSelectedTierId(tierId);
    setApplyUpgrade(false);
  };

  const getActiveHdd = () => {
    if (cameraCount <= 4) return activeTier.hdd4Ch;
    if (cameraCount <= 8) return activeTier.hdd8Ch;
    // Over 8 cameras gets enterprise 4TB or higher
    return activeTier.hdd8Ch.includes('4TB') ? '6TB Seagate Surveillance HDD' : '4TB Seagate Surveillance HDD';
  };

  const getActiveRecorder = () => {
    if (cameraCount <= 4) return `4-Channel PoE ${techType === 'ip' ? 'NVR' : 'DVR'} Recorder`;
    if (cameraCount <= 8) return `8-Channel PoE ${techType === 'ip' ? 'NVR' : 'DVR'} Recorder`;
    return `16-Channel High-Capacity ${techType === 'ip' ? 'NVR' : 'DVR'} Recorder`;
  };

  // Generate WhatsApp customized config link
  const generateWhatsAppUrl = () => {
    let rawMessage = '';
    if (activeProperty.isSpecialVisit) {
      rawMessage = `Hello JB CCTV Security! I am looking for a professional CCTV setup for our Factory / Industrial premises in Johor Bahru.

🏢 PREMISES SECTOR: Factory & Industrial Area
🛠️ REQUEST: Requesting a FREE physical site visit to survey our layout, suggest optimal cabling plans, plan blind spots mapping, and estimate custom budgets.

Please schedule a suitable site-survey timing with me on WhatsApp. Thank you!`;
    } else {
      const upgradeDetail = (applyUpgrade && activeTier.upgrade)
        ? `\n✨ SELECTED UPGRADE: ${activeTier.upgrade.label}`
        : '';

      rawMessage = `Hello JB CCTV Security! I customized our system package via your website Quote Console:

🏢 PREMISES SECTOR: ${activeProperty.name}
🎥 TECHNOLOGY: HIKVISION ${techType.toUpperCase()} SYSTEM
🔌 CAMERA COUNT: ${cameraCount} Cameras selected
⚙️ QUALITY TIER: ${activeTier.name}
🎥 RESOLUTION: ${activeTier.megapixel}
🌙 NIGHT VISION MODE: ${activeTier.nightView}
🗄️ STORAGE RECORD: ${getActiveHdd()}${upgradeDetail}

💰 ESTIMATED SYSTEM PRICE: ${formatMaskedPrice(estimatedTotal)} (Exact Config Ref: RM ${estimatedTotal.toLocaleString()})
*Note: Includes standard professional wiring & configuration.*

Please confirm package availability and schedule a survey for my place in Johor Bahru!`;
    }

    const encodedText = encodeURIComponent(rawMessage);
    return `https://wa.me/601133901688?text=${encodedText}`;
  };

  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-5">
      {/* Configuration Controls (Left 3 cols) */}
      <div className="lg:col-span-3 p-6 sm:p-8 bg-neutral-950 flex flex-col justify-between border-b lg:border-b-0 border-neutral-800">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-xl text-black">
              <Sliders className="w-5 h-5 text-neutral-950 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-display font-medium text-lg text-white">Instant Custom Quote Console</h4>
              <p className="text-xs text-neutral-400">Drag to adjust the number of cameras and customize live estimations.</p>
            </div>
          </div>

          <hr className="border-neutral-800" />

          {/* Step 1: Premises Type Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
              1. Select Premises Sector
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {PROPERTIES.map((prop, idx) => (
                <button
                  key={prop.name}
                  type="button"
                  onClick={() => setPropertyIdx(idx)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    propertyIdx === idx
                      ? 'bg-amber-400/10 border-amber-500 text-amber-300 ring-2 ring-amber-500/20'
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                  }`}
                >
                  <span className="text-xs font-bold leading-tight">{prop.name}</span>
                  <span className="text-[9px] text-neutral-500 leading-none block line-clamp-1">{prop.description}</span>
                </button>
              ))}
            </div>
          </div>

          {activeProperty.isSpecialVisit ? (
            /* Special site visit layout for Factory / Industry */
            <div className="p-5 sm:p-6 bg-gradient-to-b from-amber-950/20 to-neutral-900/80 border border-amber-500/30 rounded-2xl space-y-4 animate-fadeIn">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-amber-400 inline-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-bold text-amber-300 uppercase tracking-wide">Factory & Industrial Survey Mandatory</h5>
                  <p className="text-xs text-neutral-300 leading-relaxed mt-1">
                    For large industrial areas, accurate estimations require personalized inspection. We provide a **100% Free Site Visit** to check structural routes, blind spots, cable distance constraints, and power requirements to compile an optimized proposal.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-neutral-950/80 border border-neutral-800 rounded-xl flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 inline-shrink-0" />
                  <span className="text-[11px] font-semibold text-neutral-200">Optimal Cable Plan</span>
                </div>
                <div className="p-3 bg-neutral-950/80 border border-neutral-800 rounded-xl flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 inline-shrink-0" />
                  <span className="text-[11px] font-semibold text-neutral-200">Custom Budget Ratio</span>
                </div>
                <div className="p-3 bg-neutral-950/80 border border-neutral-800 rounded-xl flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 inline-shrink-0" />
                  <span className="text-[11px] font-semibold text-neutral-200">Zero Obligation Fees</span>
                </div>
              </div>
            </div>
          ) : (
            /* Interactive slider layout */
            <>
              {/* Step 2: System Technology Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2.5">
                  2. Choose System Technology
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleTechChange('analog')}
                    className={`py-3 px-4 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      techType === 'analog'
                        ? 'bg-amber-400/10 border-amber-500 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                        : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-300 hover:bg-neutral-900'
                    }`}
                  >
                    <span>HIKVISION Analog Series</span>
                    <span className="text-[10px] text-neutral-500 font-normal">Highly robust coaxial system</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTechChange('ip')}
                    className={`py-3 px-4 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      techType === 'ip'
                        ? 'bg-amber-400/10 border-amber-500 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                        : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-300 hover:bg-neutral-900'
                    }`}
                  >
                    <span>HIKVISION Digital IP Series</span>
                    <span className="text-[10px] text-neutral-500 font-normal">Pristine lossless digital network</span>
                  </button>
                </div>
              </div>

              {/* Step 3: CLICK AND DRAG CAMERA COUNT SLIDER */}
              <div>
                <div className="flex justify-between items-end mb-2.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
                    3. Drag to Select Number of CCTV Cameras
                  </label>
                  <span className="text-sm font-extrabold text-amber-300 font-display flex items-center gap-1.5 bg-amber-500/10 px-2.5 py-0.5 border border-amber-500/20 rounded-md">
                    <Cctv className="w-3.5 h-3.5" />
                    {cameraCount} {cameraCount === 1 ? 'Camera' : 'Cameras'}
                  </span>
                </div>
                
                <div className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-4 sm:p-5 space-y-4">
                  {/* Slider Control */}
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="1"
                      max="16"
                      value={cameraCount}
                      onChange={(e) => setCameraCount(parseInt(e.target.value))}
                      className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-neutral-500 px-1 font-semibold">
                      <span>1 Cam</span>
                      <span>4 Cams</span>
                      <span>8 Cams</span>
                      <span>12 Cams</span>
                      <span>16 Cams</span>
                    </div>
                  </div>

                  {/* Dynamic Technical Specifications based on selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs border-t border-neutral-800/60">
                    <div className="flex items-center gap-2 text-neutral-300">
                      <HardDrive className="w-3.5 h-3.5 text-amber-500/80" />
                      <div>
                        <span className="text-[9px] text-neutral-500 block uppercase font-bold leading-none">CCTV NVR/DVR Setup</span>
                        <span className="font-semibold">{getActiveRecorder()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-300">
                      <Shield className="w-3.5 h-3.5 text-amber-500/80" />
                      <div>
                        <span className="text-[9px] text-neutral-500 block uppercase font-bold leading-none">Security Retention</span>
                        <span className="font-semibold">{getActiveHdd()} included</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Quality Tier Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2.5">
                  4. Select Camera Quality Tier
                </label>
                
                {/* Elegant custom dropdown picker instead of printing all direct package prices */}
                <div className="relative">
                  <select
                    value={selectedTierId}
                    onChange={(e) => handleTierChange(e.target.value)}
                    className="w-full bg-neutral-900/90 border border-neutral-800 text-neutral-200 text-xs rounded-xl p-3.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-medium outline-none cursor-pointer appearance-none"
                  >
                    {currentTiers.map((tier) => (
                      <option key={tier.id} value={tier.id} className="bg-neutral-950 text-neutral-200">
                        {tier.name} ({tier.megapixel})
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-[10px] uppercase font-bold tracking-widest flex items-center gap-1">
                    <span>Choose</span>
                    <Sparkles className="w-3 h-3 text-amber-400" />
                  </div>
                </div>

                {/* Render Selected Tier Detail Panel */}
                <div className="mt-3 p-4 bg-neutral-900/40 border border-neutral-800/80 rounded-xl space-y-3 animate-fadeIn">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase bg-amber-400/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                        {activeTier.megapixel}
                      </span>
                      <h5 className="text-xs font-bold text-white mt-1.5">{activeTier.name}</h5>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-neutral-500 block uppercase font-bold leading-none">Night Vision</span>
                      <span className="text-xs font-semibold text-amber-400">{activeTier.nightView}</span>
                    </div>
                  </div>
                  
                  <p className="text-[11px] text-neutral-400 leading-relaxed">{activeTier.description}</p>

                  <div className="flex flex-wrap gap-2 pt-1 border-t border-neutral-800/50">
                    {activeTier.features.map((feat) => (
                      <span key={feat} className="text-[10px] bg-neutral-900 text-neutral-300 px-2 py-0.5 rounded-md border border-neutral-800/60">
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 5: Recommended Upgrades if available */}
              {activeTier.upgrade && (
                <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2.5 animate-fadeIn">
                  <div className="flex items-start gap-3">
                    <input
                      id="pkg-upgrade-custom"
                      type="checkbox"
                      checked={applyUpgrade}
                      onChange={(e) => setApplyUpgrade(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-neutral-700 bg-neutral-900 text-amber-500 focus:ring-amber-500 accent-amber-500 cursor-pointer"
                    />
                    <label htmlFor="pkg-upgrade-custom" className="cursor-pointer select-none">
                      <span className="block text-xs font-bold text-white flex items-center gap-1.5">
                        <span className="text-[9px] font-bold tracking-wider text-black bg-amber-400 px-1 py-0.2 rounded-sm uppercase">
                          RECOMMENDED UPGRADE
                        </span>
                        {activeTier.upgrade.label} (+RM {cameraCount <= 4 ? activeTier.upgrade.cost4Ch : activeTier.upgrade.cost8Ch})
                      </span>
                      <span className="block text-[11px] text-neutral-400 leading-snug mt-0.5">
                        {activeTier.upgrade.description}
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Console Footnote */}
        <p className="text-[10px] text-neutral-500 leading-relaxed mt-5">
          *Estimations include solid copper Cat6 cabling, weatherproof junction boxes, premium surge blocks, DVR/NVR setup, full configuration for phone app live view, and a 12-month installation workmanship guarantee inside Johor Bahru.
        </p>
      </div>

      {/* Live Estimate & Proposal Summary (Right 2 cols) */}
      <div className="lg:col-span-2 p-6 sm:p-8 bg-gradient-to-b from-neutral-900 to-neutral-950 border-t lg:border-t-0 lg:border-l border-neutral-800 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full">
              LIVE ESTIMATION
            </span>
            <span className="text-[9px] font-mono text-neutral-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-500" /> Johor Bahru
            </span>
          </div>

          {activeProperty.isSpecialVisit ? (
            /* Factory Side Panel */
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-neutral-950/80 p-4 rounded-xl border border-neutral-800 space-y-4">
                <div className="text-center py-2">
                  <Cctv className="w-10 h-10 text-amber-400 mx-auto animate-pulse" />
                  <h6 className="text-xs font-bold text-white uppercase tracking-wider mt-2">Factory Survey Configured</h6>
                  <p className="text-[11px] text-neutral-400 mt-1">Our consultant will bring product samples directly to your location.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Free on-site layout measurement</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Wiring distance and route planning</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Suggestions matching client budget</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl text-center">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block mb-1">
                  OFFICIAL VALUATION
                </span>
                <span className="text-xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white">
                  CUSTOM DESIGNED
                </span>
                <p className="text-[10px] text-neutral-500 mt-1.5 leading-tight">
                  Pricing depends on specific cable length, camera nodes, and conduits used.
                </p>
              </div>
            </div>
          ) : (
            /* Home/Office Live Estimator Side Panel */
            <div className="space-y-4 animate-fadeIn">
              {/* Price package highlight warning badge */}
              <div className="bg-amber-500/10 border border-amber-500/30 px-3 py-2 rounded-lg text-center">
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400 block">
                  ⚠️ ESTIMATE PRICE PACKAGE HIGHLIGHT
                </span>
                <span className="text-[10px] text-neutral-300 block mt-0.5">
                  Dynamic calculation based on exact Johor Bahru package rates.
                </span>
              </div>

              <div className="bg-neutral-950/60 p-4 rounded-xl border border-neutral-800 space-y-3.5 text-xs">
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-bold">Property Sector</span>
                  <span className="text-xs font-semibold text-white">{activeProperty.name}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-bold">Tech System</span>
                    <span className="text-xs font-semibold text-white">HIKVISION {techType.toUpperCase()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-bold">CCTV Cameras</span>
                    <span className="text-xs font-semibold text-amber-400">{cameraCount} Nodes</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-bold">Hardware Quality Tier</span>
                  <span className="text-xs font-semibold text-white">{activeTier.name}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-bold">Final Resolution</span>
                    <span className="text-xs font-semibold text-amber-400">
                      {applyUpgrade && activeTier.upgrade?.label.includes('5MP') ? '5 Megapixel' : activeTier.megapixel}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-bold">Night Vision mode</span>
                    <span className="text-xs font-semibold text-amber-400">
                      {applyUpgrade && activeTier.upgrade?.label.includes('Color') ? '24H Crystal Clear Color' : activeTier.nightView}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-bold">Central Recorder</span>
                    <span className="text-xs font-semibold text-neutral-300">{getActiveRecorder()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-bold">Surveillance Storage</span>
                    <span className="text-xs font-semibold text-neutral-300">{getActiveHdd()}</span>
                  </div>
                </div>

                <div className="border-t border-neutral-800/80 pt-2.5">
                  <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-bold mb-1">Professional Inclusions</span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                      <CheckCircle2 className="w-3 h-3 text-amber-500/80 inline-shrink-0" />
                      <span>Full professional copper wiring & termination</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                      <CheckCircle2 className="w-3 h-3 text-amber-500/80 inline-shrink-0" />
                      <span>Mobile application streaming config</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center py-4 bg-amber-400/5 border border-amber-500/10 rounded-xl">
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium block">ESTIMATED PRICE RANGE</span>
                <span className="text-2xl sm:text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 block mt-0.5">
                  {formatMaskedPrice(estimatedTotal)}
                </span>
                <span className="block text-[10px] text-neutral-500 mt-1">*Remark: All prices include wiring & installation</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3 mt-6">
          <a
            href={generateWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-extrabold text-sm tracking-wide shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <Phone className="w-4 h-4 text-black fill-black" />
            <span>{activeProperty.isSpecialVisit ? 'Request Free Factory Site Visit' : 'Apply This Quote via WhatsApp'}</span>
          </a>
          <p className="text-[10px] text-center text-neutral-400 leading-normal">
            Click to dispatch your customized config directly to our technical line. A specialist will coordinate within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
