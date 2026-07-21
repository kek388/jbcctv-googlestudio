import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  MapPin, 
  Filter, 
  FolderPlus, 
  Image, 
  Layers, 
  Sparkles, 
  Check, 
  Building2, 
  Wrench,
  Camera,
  Home,
  Briefcase,
  Factory,
  Cpu,
  ArrowLeft,
  Upload,
  Info,
  Search,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface EnhancedProject {
  id: string;
  title: string;
  category: 'House' | 'Office' | 'Factory' | 'Industrial';
  projectType: 'Full Installation' | 'System Upgrade' | 'Maintenance' | 'Security Survey';
  productType: string;
  location: string;
  image: string;
  images?: string[];
  description: string;
  completionDate?: string;
}

export const DEFAULT_PROJECTS: EnhancedProject[] = [
  {
    id: 'proj-1',
    title: 'Precision Villa Surrounding Surveillance',
    category: 'House',
    projectType: 'Full Installation',
    productType: 'Smart IP Camera',
    location: 'Horizon Hills, Johor Bahru',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Custom perimeter line defense installation using 8 units of 4K smart active deterrence IP cameras, integrated with standard smart security sensors and push notifications.',
    completionDate: '2026-04-12'
  },
  {
    id: 'proj-2',
    title: 'Smart Headquarters Access & Lobby Camera',
    category: 'Office',
    projectType: 'System Upgrade',
    productType: 'Biometric Access Control',
    location: 'Mount Austin Commercial Hub, JB',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Multi-door biometric entry system with high-speed liveness check and POS registration logs, combined with high-fidelity indoor hemispheric focal cameras.',
    completionDate: '2026-05-18'
  },
  {
    id: 'proj-3',
    title: 'Heavy Machinery CCTV Loop & Fiber Networking',
    category: 'Factory',
    projectType: 'Full Installation',
    productType: 'Structured Cabling',
    location: 'Tampoi Phase 3 Industrial Estate',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    description: 'Dust-proof bullet cams under specialized steel hoods deployed along crane gantries, running on a resilient fiber ring circuit back to central servers.',
    completionDate: '2026-03-05'
  },
  {
    id: 'proj-4',
    title: 'Explosive Hazards Ward Active Deterrence Block',
    category: 'Industrial',
    projectType: 'Full Installation',
    productType: 'Smart IP Camera',
    location: 'Senai West Logistics Complex, JB',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    description: 'Industrial-grade corrosion and explosion resistant camera housings with specialized ground isolation hubs, protecting inventory from unauthorized yard access.',
    completionDate: '2026-05-24'
  },
  {
    id: 'proj-5',
    title: 'Premium Shoplot Multi-Point Vault Protection',
    category: 'Office',
    projectType: 'Maintenance',
    productType: 'Wireless Alarm',
    location: 'Plaza Pelangi Commercial Centre, JB',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    description: 'Relocating detectors and upgrading software control panels to log smart notifications, maintaining zero downtime across multi-point checkout stations.',
    completionDate: '2026-06-01'
  },
  {
    id: 'proj-6',
    title: 'Bungalow Multi-Channel Wireless Perimeter Alarms',
    category: 'House',
    projectType: 'Full Installation',
    productType: 'Wireless Alarm',
    location: 'Bukit Indah Garden Heights, JB',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    description: 'Dual-frequency wireless glassbreak alarms and high-strength magnetic detectors synced to a smart keypad with cloud backup, delivering instant phone warnings on perimeter breaches.',
    completionDate: '2026-05-10'
  }
];

interface ProjectPageProps {
  onBackToHome: () => void;
  initialSearch?: string;
  initialProductType?: 'All' | 'CCTV' | 'ALARM' | 'DOOR ACCESS';
  onClearFilters?: () => void;
  projects?: EnhancedProject[];
  onUpdateProjects?: (updated: EnhancedProject[]) => void;
}

async function computeSHA256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

interface ProjectImageScrollerProps {
  image: string;
  images?: string[];
  title: string;
}

export function ProjectImageScroller({ image, images, title }: ProjectImageScrollerProps) {
  const list = images && images.length > 0 ? images : [image];

  if (list.length <= 1) {
    return (
      <img
        src={list[0] || image}
        alt={title}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 select-none"
      />
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      <motion.div
        className="flex h-full w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          ease: "linear",
          duration: list.length * 7,
          repeat: Infinity,
        }}
      >
        {/* First copy set */}
        {list.map((img, i) => (
          <div key={`orig-${i}`} className="h-full aspect-[3/4] relative shrink-0">
            <img
              src={img || image}
              alt={`${title} - image ${i + 1}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Duplicate copy set for loop seamless scrolling */}
        {list.map((img, i) => (
          <div key={`dup-${i}`} className="h-full aspect-[3/4] relative shrink-0">
            <img
              src={img || image}
              alt={`${title} - image ${i + 1} backup`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function ProjectPage({ 
  onBackToHome, 
  initialSearch = '', 
  initialProductType = 'All', 
  onClearFilters,
  projects: propProjects,
  onUpdateProjects
}: ProjectPageProps) {
  const [localProjects, setLocalProjects] = useState<EnhancedProject[]>([]);
  const isControlled = propProjects !== undefined;
  const projects = isControlled ? propProjects : localProjects;

  const setProjectsState = (updated: EnhancedProject[]) => {
    if (isControlled) {
      onUpdateProjects?.(updated);
    } else {
      setLocalProjects(updated);
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<'All' | 'House' | 'Office' | 'Factory' | 'Industrial'>('All');
  const [selectedProjectType, setSelectedProjectType] = useState<'All' | 'Full Installation' | 'System Upgrade'>('All');
  const [selectedProductType, setSelectedProductType] = useState<'All' | 'CCTV' | 'ALARM' | 'DOOR ACCESS'>(initialProductType);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [showAll, setShowAll] = useState(false);

  // Sync initial parameters to state if shifted from outer scope
  useEffect(() => {
    setSearchQuery(initialSearch || '');
  }, [initialSearch]);

  useEffect(() => {
    setSelectedProductType(initialProductType || 'All');
  }, [initialProductType]);
  
  // Modal Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'House' | 'Office' | 'Factory' | 'Industrial'>('House');
  const [newProjectType, setNewProjectType] = useState<'Full Installation' | 'System Upgrade'>('Full Installation');
  const [selectedHardwares, setSelectedHardwares] = useState<string[]>([]);
  const [newLocation, setNewLocation] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newImages, setNewImages] = useState<string[]>([]);
  const [newImageUrlInput, setNewImageUrlInput] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [validationError, setValidationError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Custom Confirmation States to avoid iframe sandbox confirm() limitations
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [authPassword, setAuthPassword] = useState('');
  const [deleteAuthPassword, setDeleteAuthPassword] = useState('');
  const [deleteAuthError, setDeleteAuthError] = useState('');

  // Initialize and load from local storage (if uncontrolled)
  useEffect(() => {
    if (isControlled) return;
    try {
      const saved = typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem('jb_cctv_saved_projects') : null;
      if (saved) {
        try {
          setLocalProjects(JSON.parse(saved));
        } catch (e) {
          setLocalProjects(DEFAULT_PROJECTS);
        }
      } else {
        setLocalProjects(DEFAULT_PROJECTS);
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem('jb_cctv_saved_projects', JSON.stringify(DEFAULT_PROJECTS));
        }
      }
    } catch (e) {
      setLocalProjects(DEFAULT_PROJECTS);
    }
  }, [isControlled]);

  // Sync to local storage
  const syncToLocalStorage = (newProjects: EnhancedProject[]) => {
    setProjectsState(newProjects);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('jb_cctv_saved_projects', JSON.stringify(newProjects));
        // Dispatch standard storage event to trigger parent updates in real-time
        window.dispatchEvent(new Event('storage'));
      }
    } catch (e) {
      console.error("Local storage sync error:", e);
    }
  };

  // Compress and resize images to prevent local storage quota exceeded errors
  const compressAndResizeImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Max dimension 800px for standard grid previews
          const MAX_DIM = 800;
          if (width > MAX_DIM || height > MAX_DIM) {
            if (width > height) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            } else {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            // Compress quality to 0.7 JPEG
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
            resolve(compressedBase64);
          } else {
            resolve(event.target?.result as string);
          }
        };
        img.onerror = () => {
          resolve(event.target?.result as string);
        };
        img.src = event.target?.result as string;
      };
      reader.onerror = () => {
        resolve('');
      };
      reader.readAsDataURL(file);
    });
  };

  // Image upload with on-the-fly compression (supporting multiple files up to 5)
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const remainingSlots = 5 - newImages.length;
      if (remainingSlots <= 0) {
        setValidationError('You can only add up to 5 images per project.');
        return;
      }
      
      const filesToProcess = (Array.from(files).slice(0, remainingSlots) as File[]);
      if (files.length > remainingSlots) {
        setValidationError(`Only ${remainingSlots} slots remaining. Selected excess files were skipped.`);
      }

      try {
        const compressionPromises = filesToProcess.map(file => compressAndResizeImage(file));
        const loadedBase64s = await Promise.all(compressionPromises);
        const validBase64s = loadedBase64s.filter(base64 => base64 !== '');

        if (validBase64s.length > 0) {
          setNewImages(prev => {
            const updated = [...prev, ...validBase64s].slice(0, 5);
            if (updated.length > 0) {
              setNewImage(updated[0]);
              setImagePreview(updated[updated.length - 1]);
            }
            return updated;
          });
          setValidationError('');
        }
      } catch (err) {
        setValidationError('Failed to process one or more images. Please try another photo.');
      }
    }
  };

  const handleAddImageUrl = () => {
    if (!newImageUrlInput.trim()) return;
    if (newImages.length >= 5) {
      setValidationError('You can only add up to 5 images per project.');
      return;
    }
    const url = newImageUrlInput.trim();
    setNewImages(prev => [...prev, url]);
    setNewImage(url);
    setImagePreview(url);
    setNewImageUrlInput('');
    setValidationError('');
  };

  // Preset default icons based on category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'House': return <Home className="w-4 h-4 text-amber-400" />;
      case 'Office': return <Briefcase className="w-4 h-4 text-blue-400" />;
      case 'Factory': return <Factory className="w-4 h-4 text-emerald-400" />;
      case 'Industrial': return <Cpu className="w-4 h-4 text-rose-400" />;
      default: return <Building2 className="w-4 h-4 text-neutral-400" />;
    }
  };

  // Handle Add Submit
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setValidationError('Please specify a project title.');
      return;
    }
    if (selectedHardwares.length === 0) {
      setValidationError('Please select at least one primary hardware checklist element.');
      return;
    }
    if (!newLocation.trim()) {
      setValidationError('Please specify the site location (e.g., Mount Austin, JB).');
      return;
    }
    if (!newDescription.trim()) {
      setValidationError('Please specify a brief project summary description.');
      return;
    }
    if (!authPassword) {
      setValidationError('Please enter the administrator authorization password.');
      return;
    }
    const hashed = await computeSHA256(authPassword);
    if (hashed !== '14bb9b6b2f2587c22d9181b40eaddc8be70bffcee55a0ad61459237f3af8978e') {
      setValidationError('Incorrect administrator authorization password.');
      return;
    }

    // Default premium security placeholder if none loaded
    const finalImages = newImages.length > 0 ? newImages : [newImage || 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80'];
    const finalImage = finalImages[0];
    const finalProductType = selectedHardwares.join(', ');

    const newProjItem: EnhancedProject = {
      id: 'proj-' + Date.now(),
      title: newTitle,
      category: newCategory,
      projectType: newProjectType,
      productType: finalProductType,
      location: newLocation,
      image: finalImage,
      images: finalImages,
      description: newDescription
    };

    const updated = [newProjItem, ...projects];
    syncToLocalStorage(updated);

    // Reset Form
    setNewTitle('');
    setNewCategory('House');
    setNewProjectType('Full Installation');
    setSelectedHardwares([]);
    setNewLocation('');
    setNewImage('');
    setNewImages([]);
    setNewImageUrlInput('');
    setImagePreview(null);
    setNewDescription('');
    setAuthPassword('');
    setIsFormOpen(false);
    setValidationError('');
  };

  // Handle Delete
  const handleDeleteProject = (id: string) => {
    setDeleteTargetId(id);
    setDeleteAuthPassword('');
    setDeleteAuthError('');
  };

  const confirmDeleteProject = async () => {
    if (deleteTargetId) {
      if (!deleteAuthPassword) {
        setDeleteAuthError('Please enter the administrator authorization password.');
        return;
      }
      const hashed = await computeSHA256(deleteAuthPassword);
      if (hashed !== '14bb9b6b2f2587c22d9181b40eaddc8be70bffcee55a0ad61459237f3af8978e') {
        setDeleteAuthError('Incorrect administrator authorization password.');
        return;
      }
      const filtered = projects.filter(p => p.id !== deleteTargetId);
      syncToLocalStorage(filtered);
      setDeleteTargetId(null);
      setDeleteAuthPassword('');
      setDeleteAuthError('');
    }
  };

  // Filter gallery items
  const filteredList = projects.filter((proj) => {
    const categoryMatch = selectedCategory === 'All' || proj.category === selectedCategory;
    const projectTypeMatch = selectedProjectType === 'All' || proj.projectType === selectedProjectType;
    
    // Checked product type compatibility matching
    let productTypeMatch = false;
    if (selectedProductType === 'All') {
      productTypeMatch = true;
    } else {
      const projProd = (proj.productType || '').toUpperCase();
      const selProd = selectedProductType.toUpperCase();
      if (projProd.includes(selProd)) {
        productTypeMatch = true;
      } else if (selProd === 'CCTV' && (projProd.includes('CAMERA') || projProd.includes('CCTV') || projProd.includes('IP'))) {
        productTypeMatch = true;
      } else if (selProd === 'ALARM' && projProd.includes('ALARM')) {
        productTypeMatch = true;
      } else if (selProd === 'DOOR ACCESS' && (projProd.includes('ACCESS') || projProd.includes('BIOMETRIC') || projProd.includes('CABLING') || projProd.includes('DOOR'))) {
        productTypeMatch = true;
      }
    }

    let searchMatch = true;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      searchMatch = 
        proj.title.toLowerCase().includes(q) ||
        proj.description.toLowerCase().includes(q) ||
        proj.location.toLowerCase().includes(q) ||
        proj.category.toLowerCase().includes(q) ||
        proj.projectType.toLowerCase().includes(q) ||
        proj.productType.toLowerCase().includes(q);
    }
    
    return categoryMatch && projectTypeMatch && productTypeMatch && searchMatch;
  });

  const displayedList = showAll ? filteredList : filteredList.slice(0, 6);

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen pt-24 pb-20 relative font-sans selection:bg-amber-400 selection:text-black">
      {/* Visual Ambient Decorative Circles */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Row with Return Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="space-y-2">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-amber-400 cursor-pointer transition-colors group mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Security HQ</span>
            </button>
            <div className="flex items-center gap-3">
              <span className="text-xs font-extrabold uppercase tracking-widest bg-gradient-to-r from-amber-400 to-orange-500 text-black px-3 py-1 rounded-full inline-block">
                Security Portfolio
              </span>
              <span className="text-neutral-500 font-mono text-xs">Total Tracked: {projects.length} Sites</span>
            </div>
            <h1 className="text-3xl sm:text-4.5xl font-display font-black text-white leading-tight">
              JB Completed Work Footprints
            </h1>
            <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
              Explore real security systems engineered and certified across housing estates, MNC offices, and industrial hubs in Johor Bahru. Add or update items live to showcase your team’s latest works.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setIsFormOpen(true);
                setAuthPassword('');
                setValidationError('');
              }}
              className="px-5 py-2.5 text-xs font-extrabold rounded-xl text-black bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-110 shadow-lg shadow-amber-500/10 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>ADD COMPLETED PROJECT</span>
            </button>
          </div>
        </div>

        {/* Interactive Filter Control Panel */}
        <div className="bg-neutral-900/60 border border-neutral-800/80 p-5 rounded-2xl backdrop-blur-md mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/60 pb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-amber-500" />
              <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-neutral-200">
                Multi-Attribute Smart Filter Console
              </h3>
            </div>
            {/* Active Filters reset button */}
            {(searchQuery || selectedCategory !== 'All' || selectedProjectType !== 'All' || selectedProductType !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedProjectType('All');
                  setSelectedProductType('All');
                  if (onClearFilters) onClearFilters();
                }}
                className="text-xs font-mono text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            )}
          </div>

          {/* Live Search Input Bar */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-neutral-500" />
            </span>
            <input
              type="text"
              placeholder="Search completed project footprints by area, client title, specs, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-950/80 border border-neutral-850 focus:border-amber-500 rounded-xl py-3 pl-10 pr-10 text-xs sm:text-sm text-neutral-200 placeholder-neutral-500 outline-none transition-all duration-200"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  if (onClearFilters) onClearFilters();
                }}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-neutral-300 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
            {/* 1. Sector Orientation (House, Office, Factory, Industrial) */}
            <div className="space-y-2">
              <label className="text-[10px] font-extrabold tracking-wider text-neutral-400 uppercase block">
                Sector Orientation Category
              </label>
              <div className="flex flex-wrap gap-1.5">
                {(['All', 'House', 'Office', 'Factory', 'Industrial'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all border ${
                      selectedCategory === cat
                        ? 'bg-amber-400 text-neutral-950 border-amber-400 font-bold'
                        : 'bg-neutral-950 border-neutral-850 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Project Type Filter */}
            <div className="space-y-2">
              <label className="text-[10px] font-extrabold tracking-wider text-neutral-400 uppercase block">
                Contractual Work Type
              </label>
              <div className="flex flex-wrap gap-1.5">
                {(['All', 'Full Installation', 'System Upgrade'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedProjectType(type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all border ${
                      selectedProjectType === type
                        ? 'bg-blue-500 text-white border-blue-500 font-bold'
                        : 'bg-neutral-950 border-neutral-850 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {type === 'All' ? 'All Types' : type}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Product Type Filter */}
            <div className="space-y-2">
              <label className="text-[10px] font-extrabold tracking-wider text-neutral-400 uppercase block">
                Primary Product Spec Deployed
              </label>
              <select
                value={selectedProductType}
                onChange={(e) => setSelectedProductType(e.target.value as any)}
                className="w-full bg-neutral-950 border border-neutral-850 text-neutral-200 rounded-lg p-2 text-xs focus:border-amber-500 outline-none cursor-pointer"
              >
                <option value="All">All Hardware Types</option>
                <option value="CCTV">CCTV</option>
                <option value="ALARM">ALARM</option>
                <option value="DOOR ACCESS">DOOR ACCESS</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid List View */}
        {filteredList.length === 0 ? (
          <div className="bg-neutral-900/40 border border-neutral-850 rounded-2xl py-16 px-4 text-center">
            <Info className="w-12 h-12 text-amber-500/60 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-neutral-200">No project matches found</h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto mt-1">
              There are no complete work files matching current combination criteria. Try resetting the filters or add a new completed card!
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedProjectType('All');
                setSelectedProductType('All');
              }}
              className="mt-4 px-4 py-2 bg-neutral-900 border border-neutral-800 text-amber-400 rounded-lg text-xs font-semibold cursor-pointer hover:bg-neutral-850 transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {displayedList.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl group hover:shadow-amber-500/5 hover:border-neutral-700/60 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Card Media Header */}
                      <div className="relative overflow-hidden aspect-[3/4] bg-neutral-950">
                        <ProjectImageScroller
                          image={item.image}
                          images={item.images}
                          title={item.title}
                        />
                        <div className="absolute top-3 left-3 bg-neutral-950/80 border border-neutral-800 text-amber-450 text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded flex items-center gap-1.5 backdrop-blur-sm shadow">
                          {getCategoryIcon(item.category)}
                          <span>{item.category}</span>
                        </div>

                        <div className="absolute top-3 right-3 flex gap-1">
                          <button
                            onClick={() => handleDeleteProject(item.id)}
                            className="p-1 px-1.5 rounded bg-red-950/80 hover:bg-red-900 border border-red-800/40 text-red-300 hover:text-white text-[10px] font-bold flex items-center gap-1 transition-all shadow cursor-pointer"
                            title="Remove this completed project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>

                        {/* Floating Project Specs badge */}
                        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 max-w-[90%]">
                          <span className="bg-blue-950/80 border border-blue-800/40 text-blue-300 text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded backdrop-blur-sm">
                            {item.projectType}
                          </span>
                          <span className="bg-indigo-950/80 border border-indigo-800/40 text-indigo-300 text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded backdrop-blur-sm">
                            {item.productType}
                          </span>
                        </div>
                      </div>

                      {/* Card Text Descriptions */}
                      <div className="p-5 space-y-3">
                        <div className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-400 select-none">
                          <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>{item.location}</span>
                          {item.completionDate && (
                            <>
                              <span className="text-neutral-700">&bull;</span>
                              <span className="text-neutral-500 font-sans">{item.completionDate}</span>
                            </>
                          )}
                        </div>

                        <h4 className="font-display font-bold text-lg text-neutral-100 group-hover:text-amber-400 transition-colors leading-snug">
                          {item.title}
                        </h4>

                        <p className="text-xs text-neutral-400 leading-relaxed font-light">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Actions / Highlights strip */}
                    <div className="border-t border-neutral-850/80 px-5 py-3.5 bg-neutral-900/40 flex items-center justify-between text-[11px] font-mono text-neutral-500 select-none">
                      <a 
                        href={`https://wa.me/601133901688?text=${encodeURIComponent(
                          `Hello JB CCTV Security! I am interested in a similar security solution or product setup in ${item.location}. I saw your completed group project "${item.title}" on your website and would like to request more details.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="uppercase text-[9px] sm:text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 cursor-pointer hover:underline"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                        <span>WhatsApp Enquire</span>
                      </a>
                      <span className="text-neutral-400 font-semibold uppercase truncate max-w-[140px]" title={item.productType}>{item.productType}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* "Show all projects" toggle linkage */}
            {!showAll && filteredList.length > 6 && (
              <div className="flex justify-center pt-4">
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 border border-amber-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-xl hover:scale-[1.02] shadow-xl shadow-amber-500/10 cursor-pointer transition-all"
                >
                  Show All Projects ({filteredList.length})
                </button>
              </div>
            )}
          </div>
        )}

        {/* Back To Home Section Quick Hub Banner */}
        <div className="mt-16 bg-gradient-to-br from-neutral-950 to-neutral-900 border border-neutral-850 p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1.5 max-w-xl">
            <h4 className="font-display font-bold text-lg text-white">
              Need standard quotes for any of these premises?
            </h4>
            <p className="text-xs text-neutral-400 leading-normal">
              Go back below to check our standard packages or design your custom layouts directly on our live estimators.
            </p>
          </div>
          <button
            onClick={onBackToHome}
            className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-amber-400 font-bold text-xs rounded-xl uppercase transition-all tracking-wider shrink-0 cursor-pointer"
          >
            Return to Security Desk
          </button>
        </div>

        {/* Form Modal (Pop-up slide over standard dialog overlay) */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-neutral-900 border-2 border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative"
            >
              <div className="mb-6 flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
                    <FolderPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-xl text-white">
                      Record Completed Project Footprint
                    </h2>
                    <p className="text-xs text-neutral-400">
                      Enter equipment details of your done projects to share with client audiences.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-1 rounded-lg text-neutral-450 hover:text-white bg-neutral-950 hover:bg-neutral-850 transition-colors font-bold text-base w-8 h-8 flex items-center justify-center border border-neutral-800 cursor-pointer"
                >
                  X
                </button>
              </div>

              {validationError && (
                <div className="mb-4 text-xs font-medium text-red-400 border border-red-500/20 bg-red-950/30 p-3 rounded-lg flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  <span>{validationError}</span>
                </div>
              )}

              <form onSubmit={handleAddProject} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase font-extrabold text-neutral-400 block mb-1">
                      Project Title / Client Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 16-Channel 4K Setup at Austin Factory Hub"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 text-neutral-100 rounded-xl p-3 text-xs focus:border-amber-500 outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Category Type Selector */}
                  <div>
                    <label className="text-[10px] uppercase font-extrabold text-neutral-400 block mb-1">
                      Sector Orientation
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full bg-neutral-950 border border-neutral-800 text-neutral-100 rounded-xl p-3 text-xs focus:border-amber-500 outline-none cursor-pointer"
                    >
                      <option value="House">House (Residential Villa / Bungalow)</option>
                      <option value="Office">Office (Corporate / HQ / Shop Lot)</option>
                      <option value="Factory">Factory (Heavy Production / Warehouse)</option>
                      <option value="Industrial">Industrial (Marine / Hazardous Yard)</option>
                    </select>
                  </div>

                  {/* Product Type Deployed (Checkbox multi-selection) */}
                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase font-extrabold text-amber-400 block mb-2 tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      Primary Hardware Deployed (Tick multiple if applicable)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {['CCTV', 'ALARM', 'DOOR ACCESS'].map((hw) => {
                        const isChecked = selectedHardwares.includes(hw);
                        return (
                          <label
                            key={hw}
                            className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer select-none transition-all ${
                              isChecked
                                ? 'bg-amber-400/5 border-amber-500/80 text-amber-400 font-bold shadow-lg shadow-amber-500/5'
                                : 'bg-neutral-950 border-neutral-800/80 text-neutral-400 hover:text-neutral-200'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedHardwares([...selectedHardwares, hw]);
                                } else {
                                  setSelectedHardwares(selectedHardwares.filter((h) => h !== hw));
                                }
                              }}
                              className="rounded border-neutral-800 bg-neutral-950 text-amber-500 focus:ring-amber-500 focus:ring-offset-neutral-900 w-4 h-4 cursor-pointer"
                            />
                            <span className="text-xs font-semibold tracking-wider">{hw}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Project Type Deployed */}
                  <div>
                    <label className="text-[10px] uppercase font-extrabold text-neutral-400 block mb-1">
                      Service Type Performed
                    </label>
                    <select
                      value={newProjectType}
                      onChange={(e) => setNewProjectType(e.target.value as any)}
                      className="w-full bg-neutral-950 border border-neutral-800 text-neutral-100 rounded-xl p-3 text-xs focus:border-amber-500 outline-none cursor-pointer"
                    >
                      <option value="Full Installation">Full Installation (New Setup)</option>
                      <option value="System Upgrade">System Upgrade (Replacing Cameras)</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-[10px] uppercase font-extrabold text-neutral-400 block mb-1">
                      Precise JB Location / Suburb
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bukit Indah, Johor Bahru"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 text-neutral-100 rounded-xl p-3 text-xs focus:border-amber-500 outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Photo Upload or URL (Up to 5) */}
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-[10px] uppercase font-extrabold text-neutral-400 block mb-1">
                      Project Photos (Add up to 5 images)
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Paste Image URL and click '+ Add URL'"
                          value={newImageUrlInput}
                          onChange={(e) => setNewImageUrlInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddImageUrl();
                            }
                          }}
                          className="w-full bg-neutral-950 border border-neutral-800 text-neutral-100 rounded-xl p-3 text-xs focus:border-amber-500 outline-none transition-colors"
                        />
                      </div>
                      
                      <button
                        type="button"
                        onClick={handleAddImageUrl}
                        className="px-4 py-3 bg-neutral-900 hover:bg-neutral-850 hover:text-amber-400 border border-neutral-800 text-neutral-300 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0"
                      >
                        + Add URL
                      </button>

                      <div className="relative">
                        <label className="p-3 bg-neutral-950 border border-neutral-850 hover:bg-neutral-800 hover:text-amber-400 text-neutral-300 rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-1 h-full">
                          <Upload className="w-4 h-4 shrink-0" />
                          <span>Upload File</span>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageFileChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Thumbnail gallery showing the loaded list */}
                    <div className="flex flex-wrap items-center gap-2 bg-neutral-950/40 p-3 rounded-xl border border-neutral-850">
                      {newImages.length === 0 ? (
                        <p className="text-[10px] text-neutral-600 font-medium tracking-wide">
                          No images added yet. Deployed work profiles will fall back to default if empty.
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-2 w-full">
                          {newImages.map((img, idx) => (
                            <div key={idx} className="relative w-14 h-14 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950 group">
                              <img src={img} alt="" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => {
                                  const filtered = newImages.filter((_, i) => i !== idx);
                                  setNewImages(filtered);
                                  if (filtered.length === 0) {
                                    setImagePreview(null);
                                  } else {
                                    setImagePreview(filtered[filtered.length - 1]);
                                  }
                                }}
                                className="absolute inset-0 bg-neutral-950/90 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 hover:text-red-300 font-extrabold text-[9px] uppercase cursor-pointer transition-opacity"
                              >
                                Trash
                              </button>
                            </div>
                          ))}
                          {newImages.length < 5 ? (
                            <div className="w-14 h-14 rounded-lg border border-dashed border-neutral-800 flex flex-col items-center justify-center text-neutral-500 select-none">
                              <span className="text-[10px] font-bold font-mono">{newImages.length}/5</span>
                              <span className="text-[8px] uppercase tracking-tighter text-neutral-600">images</span>
                            </div>
                          ) : (
                            <div className="w-14 h-14 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center justify-center text-emerald-400 select-none">
                              <span className="text-[10px] font-bold">Max</span>
                              <span className="text-[8px] uppercase tracking-tighter text-neutral-650">Images</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Info summary & interactive preview frame */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 bg-neutral-950/60 p-4 border border-neutral-800/80 rounded-2xl">
                  <div className="sm:col-span-8 space-y-3">
                    <div>
                      <label className="text-[10px] uppercase font-extrabold text-neutral-400 block mb-1">
                        Project Description / Technical Overview
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Detail cabling layouts, cameras count, zoom capabilities, or custom client priorities resolved..."
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 text-neutral-100 rounded-xl p-3 text-xs focus:border-amber-500 outline-none transition-colors resize-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4 flex flex-col justify-center items-center">
                    <span className="text-[9px] uppercase font-extrabold text-neutral-500 mb-1.5 self-center">Image Preview</span>
                    <div className="w-full h-[95px] rounded-xl bg-neutral-950 border border-neutral-850 overflow-hidden flex items-center justify-center relative">
                      {imagePreview ? (
                        <img 
                           src={imagePreview} 
                           alt="Layout view" 
                           className="w-full h-full object-cover"
                           onError={() => {
                             setImagePreview(null);
                             setValidationError('Invalid image resource. Load from direct URL or local storage upload.');
                           }}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-2 text-center select-none text-neutral-600">
                          <Image className="w-6 h-6 mb-1 opacity-40 text-neutral-500" />
                          <span className="text-[9px] leading-tight">No image uploaded</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Secure Auth Password Gate */}
                <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4 space-y-2">
                  <label className="text-[10px] uppercase font-extrabold text-amber-500 block">
                    Administrator Security Authorization
                  </label>
                  <input
                    type="password"
                    placeholder="Enter admin password to save project data..."
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 text-neutral-100 rounded-xl p-3 text-xs focus:border-amber-500 outline-none transition-colors"
                    required
                  />
                  <p className="text-[9px] text-neutral-500 leading-normal">
                    Authorized administration password is required to secure project listings from unauthorized changes.
                  </p>
                </div>

                {/* Actions buttons */}
                <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsFormOpen(false);
                      setAuthPassword('');
                      setSelectedHardwares([]);
                    }}
                    className="px-5 py-3 rounded-xl border border-neutral-800 hover:bg-neutral-850 text-neutral-300 font-bold text-xs uppercase cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl text-black bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-110 font-bold text-xs uppercase cursor-pointer transition-all shadow shadow-amber-500/10 flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Save Project Data</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Custom Delete Confirmation Modal */}
        {deleteTargetId !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setDeleteTargetId(null);
                setDeleteAuthPassword('');
                setDeleteAuthError('');
              }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden text-neutral-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
                  <Trash2 className="w-6 h-6 border-none" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Delete Site Footprint</h3>
                  <p className="text-xs text-neutral-400">This action cannot be undone.</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                Are you sure you want to remove this completed project footprint from your galleries? It will be cleared from your local storage profile.
              </p>

              {/* Secure Admin Authorization Gate */}
              <div className="mb-4 space-y-1.5">
                <label className="text-[10px] uppercase font-extrabold text-amber-500 block">
                  Admin Authorization Password
                </label>
                <input
                  type="password"
                  placeholder="Enter admin password to delete..."
                  value={deleteAuthPassword}
                  onChange={(e) => {
                    setDeleteAuthPassword(e.target.value);
                    setDeleteAuthError('');
                  }}
                  className="w-full bg-neutral-950 border border-neutral-800 text-neutral-100 rounded-xl p-3 text-xs focus:border-red-500 outline-none transition-colors"
                  required
                />
                {deleteAuthError && (
                  <p className="text-[11px] text-red-400 font-medium animate-pulse">
                    {deleteAuthError}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800/60">
                <button
                  type="button"
                  onClick={() => {
                    setDeleteTargetId(null);
                    setDeleteAuthPassword('');
                    setDeleteAuthError('');
                  }}
                  className="px-4 py-2.5 rounded-lg border border-neutral-800 hover:bg-neutral-850 text-neutral-400 hover:text-neutral-200 font-semibold text-xs uppercase cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteProject}
                  className="px-5 py-2.5 rounded-lg text-white bg-red-650 hover:bg-red-700 font-bold text-xs uppercase cursor-pointer transition-all shadow-md shadow-red-500/10"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}
