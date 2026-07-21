import { Service, TargetAudience, ProjectItem, Testimonial, ServiceArea } from './types';

export const SERVICES: Service[] = [
  {
    id: 'cctv',
    title: 'Surveillance CCTV System',
    description: 'High-definition IP surveillance cameras featuring advanced night vision, wide dynamic range, and active AI analytics to capture every detail 24/7.',
    badge: 'Best Seller',
    iconName: 'Camera',
    features: [
      'Ultra HD 4K / 8MP video resolution',
      'True Full-Color night vision up to 45m',
      'AI Smart Detection (Human & Vehicle sorting)',
      'Remote monitoring app (iOS/Android)',
      'Secure edge recorder & redundant clouds storage'
    ]
  },
  {
    id: 'alarm',
    title: 'Alarm System',
    description: 'Intelligent security burglar sensing suites that instantly detect intrusion, glass shattering, or forced entry, and notify you instantly.',
    badge: 'Essential Security',
    iconName: 'ShieldAlert',
    features: [
      'Dual-network support (Wi-Fi + 4G cellular backup)',
      'Pet-immune motion sensors (up to 25kg)',
      'Sleek vibration & door-gap magnet transmitters',
      'Local 110dB high-decibel siren & strobe lights',
      'Direct link to emergency response dispatcher'
    ]
  },
  {
    id: 'access',
    title: 'Biometric and Door Access Control',
    description: 'Eliminate keys. Restrict and log physical access inside your commercial premises with high-accuracy biometrics, RFID codes, or face recognition.',
    badge: 'Enterprise Only',
    iconName: 'Key',
    features: [
      'Multi-spectral facial recognition speed-domes',
      'Scratch-resistant capacitive fingerprint scanners',
      'Tailgating detection & anti-passback protocols',
      'Cloud-managed centralized access logs',
      'Fire alarm emergency integration for auto-unlock'
    ]
  },
  {
    id: 'networking',
    title: 'Enterprise Network & Structured Cabling',
    description: 'We lay the robust foundation. High-speed structured Cat6 cabling, professional server rack installation, and reliable business-grade VLAN mesh networking.',
    badge: 'High Performance',
    iconName: 'Network',
    features: [
      'Professional structured Cat6 / Fiber Optic cabling',
      'SFP+ high-speed distribution switches & central racks',
      'Seamless multi-access point Wi-Fi 6 mesh setup',
      'Guest network isolation (VLAN configuration)',
      'IP address allocation & UPS backup solutions'
    ]
  }
];

export const TARGET_AUDIENCES: TargetAudience[] = [
  {
    id: 'homeowners',
    name: 'Homeowners',
    category: 'residential',
    iconName: 'Home',
    headline: 'Protecting your family, asset, and peace of mind.',
    painPoints: [
      'Unsupervised blind spots around the house perimeter',
      'Increase in local neighbourhood break-in incidents',
      'Anxiety when going on vacation or business trips'
    ],
    solutions: [
      'Active Deterrence: Cameras with built-in spotlights & sirens that active-alert on motion',
      'Mobile Live: Instant view from anywhere in Malaysia with real-time push alerts',
      'Full Time Color: Night vision captures license plates and clothing colors in absolute dark'
    ],
    recommendedSetup: '4-Camera 4K Full-Color IP CCTV System + Wireless Alarm Suite'
  },
  {
    id: 'shoplots',
    name: 'Shoplots & Retailers',
    category: 'commercial',
    iconName: 'ShoppingBag',
    headline: 'Securing cash points, assets, and resolving disputes.',
    painPoints: [
      'Shoplifting losses and checkout discrepancy disputes',
      'Vandalism and outer break-ins during midnight hours',
      'Monitoring employee attendance and customer traffic patterns'
    ],
    solutions: [
      'Cashier focus high-resolution pinhole and dome cameras',
      'High-decibel break-glass alarms installed at critical glass display panels',
      'Remote multi-branch viewing onto a single client screen application'
    ],
    recommendedSetup: '8-Camera Dome CCTV System with POS Terminal Integration'
  },
  {
    id: 'factories',
    name: 'Factories & Warehouses',
    category: 'industrial',
    iconName: 'Factory',
    headline: 'Perimeter protection, occupational safety, and industrial-scale surveillance.',
    painPoints: [
      'Massive inventory inventory theft and broad yard boundaries',
      'Ensuring strict adherence to safety standard operating procedures (SOPs)',
      'Corrosive, dusty, or wet elements rendering cheap cameras unusable'
    ],
    solutions: [
      'Long-range thermal perimeter patrol and line-crossing warning setups',
      'IP67 weatherproof & IK10 vandal-proof physical dome structures',
      'Industrial server racks with centralized 64-Channel Network Video Recorders'
    ],
    recommendedSetup: '16x 4K Bullet Cameras with Intrusion Analytics + biometric turnstile access'
  },
  {
    id: 'offices',
    name: 'MNC Offices & Shoplots',
    category: 'commercial',
    iconName: 'Briefcase',
    headline: 'Elevating workspace control, modern visitor workflows, and logging data.',
    painPoints: [
      'Unauthorized personnel accessing server rooms or confidential document centers',
      'Inaccurate/manipuable attendance tracking spreadsheets',
      'Old mechanical key systems that present security risks if misplaced'
    ],
    solutions: [
      'Liveness facial recognition and dual-authenticator readers for server room entry',
      'Exportable time attendance reports synced directly with HR payroll apps',
      'Aesthetic magnetic door controllers that match upscale interior corporate design'
    ],
    recommendedSetup: 'Centralized biometric access control + 4-Point High-Fidelity CCTV'
  },
  {
    id: 'businesses',
    name: 'Big Brand Businesses & Multi-Chains',
    category: 'commercial',
    iconName: 'Award',
    headline: 'Standardized security templates with centralized enterprise management.',
    painPoints: [
      'Fragmented vendor management across multiple cities/branches',
      'No central visibility of site security records',
      'Compliance and high-level corporate cybersecurity mandates'
    ],
    solutions: [
      'Enterprise Centralized CMS platform uniting Johor, Singapore, and KL branches',
      'SLA-backed priority hardware replacements (JB-wide)',
      'Encrypted stream storage with zero-trust local network segregation'
    ],
    recommendedSetup: 'Fibre networking backbones + Cloud AI CCTV network with centralized VPN'
  },
  {
    id: 'government',
    name: 'Government Places & Civic centers',
    category: 'government',
    iconName: 'Building',
    headline: 'Ultra-robust CCTV surveillance and absolute reliability backed by rigorous standards.',
    painPoints: [
      'Complex procurement guidelines and strict product verification requirements',
      'Mass public gathering monitoring in broad municipal areas',
      'Extremely high liability and demand for zero downtime solutions'
    ],
    solutions: [
      'Fully compliant ONVIF profile state-mandated equipment',
      'Ultra high-zoom PTZ optical dome cameras with 200m laser IR night range',
      'Redundant RAID recorders and enterprise cooling core installations'
    ],
    recommendedSetup: 'High-speed PTZ cameras + optical fiber loops with power distribution clusters'
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'proj1',
    title: 'Double-Storey Custom Villa Surveillance',
    category: 'Residential',
    location: 'Horizon Hills, Johor Bahru',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    description: 'Custom perimeter line defense installation using 8 units of 4K smart active deterrence IP cameras, integrated seamlessly with the custom autogate and burglar alarm system.'
  },
  {
    id: 'proj2',
    title: 'Industrial Manufacturing Yard CCTV Grid',
    category: 'Industrial',
    location: 'Tampoi Phase 3 Industrial Estate',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    description: 'High-density deployment of 32 units of dustproof bullet cameras and optical fiber network looping, designed to monitor dangerous heavy machinery operations and perimeter control.'
  },
  {
    id: 'proj3',
    title: 'Multi-Storey Retail Chain Smart Security',
    category: 'Commercial',
    location: 'Plaza Pelangi Commercial Centre, JB',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    description: 'High-accuracy cash register focus CCTV integration, complete with biometric access entry controllers for inventory storage and staff attendance logs.'
  },
  {
    id: 'proj4',
    title: 'District Community Council Building Protection',
    category: 'Government',
    location: 'Iskandar Puteri, Johor Bahru',
    image: 'https://images.unsplash.com/photo-1541829019-259276a7f013?auto=format&fit=crop&w=800&q=80',
    description: 'Civic facility overhaul with 48 central IP dome channels, a designated control desk, continuous loop RAID backup servers, and an automated biometric visitor registry.'
  },
  {
    id: 'proj5',
    title: 'Automotive Showroom Full Access & Fiber Ring',
    category: 'Commercial',
    location: 'Mount Austin Automotive Hub',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    description: 'Unified Wi-Fi 6 coverage, biometric glass-door access control, and stylish active-tracking security cameras safeguarding millions of Ringgit of elite auto-fleets.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test1',
    name: 'Mr. Ryan Tan',
    role: 'Homeowner',
    location: 'Bukit Indah, JB',
    rating: 5,
    text: 'Highly recommended! The team installed the 4K CCTV system very quickly. Clean wiring, and the application works flawlessly on my phone. Feel 10 times safer now that my garden has smart line detection.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    date: 'March 2026'
  },
  {
    id: 'test2',
    name: 'Puan Siti Aminah',
    role: 'Operations Director',
    company: 'Synergy Logistics Bhd',
    location: 'Pasir Gudang Industrial Park',
    rating: 5,
    text: 'JB CCTV Security handled our warehouse upgrade extremely professionally. Their custom structured cabling and fiber setup was neat, and their technical support is responsive. A reliable B2B security partner.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    date: 'April 2026'
  },
  {
    id: 'test3',
    name: 'Dato’ Lee Kok Wah',
    role: 'Founder & CEO',
    company: 'Gold Medal Food Chain',
    location: 'Mount Austin HQ, Johor Bahru',
    rating: 5,
    text: 'We have 8 shoplots across JB Town and Kulai. Previously we had trouble managing different CCTV systems. JB CCTV Security unified everything. I can check checkout lanes in real-time from my iPad. Exceptional solution!',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    date: 'May 2026'
  }
];

export const SERVICE_AREAS: ServiceArea[] = [
  {
    name: 'Johor Bahru Town (JB Town)',
    coverage: 'Full Coverage',
    deliveryTime: 'Within 1 Hour',
    popularServices: ['CCTV & Facial Recognition', 'Biometric Access', 'Central Networking']
  },
  {
    name: 'Mount Austin / Austin Heights / Setia Indah',
    coverage: 'Full Coverage',
    deliveryTime: 'Within 30 Mins (Same-Day Depot)',
    popularServices: ['Retail Shop Surveillance', 'Alarm System', 'Door Access']
  },
  {
    name: 'Skudai / Tun Aminah / Mutiara Rini',
    coverage: 'Full Coverage',
    deliveryTime: 'Within 30 Mins',
    popularServices: ['Residential 4K CCTV', 'Active Burglar Alarms', 'Autogate Sync']
  },
  {
    name: 'Pasir Gudang / Masai / Plentong',
    coverage: 'Full Coverage',
    deliveryTime: 'Within 1 Hour',
    popularServices: ['Industrial Explosion-Proof Surveillance', 'Long Range Alarms']
  },
  {
    name: 'Bukit Indah / Nusa Bestari / Taman Perling',
    coverage: 'Full Coverage',
    deliveryTime: 'Within 45 Mins',
    popularServices: ['Home CCTV Installation', 'Perimeter Infrared Security', 'Smart Locks']
  },
  {
    name: 'Johor Jaya / Taman Molek / Plentong',
    coverage: 'Full Coverage',
    deliveryTime: 'Within 45 Mins',
    popularServices: ['Office Access Barrier', 'Faceted Night-vision CCTV']
  },
  {
    name: 'Tampoi / Kempas / Jalan Kempas Baru',
    coverage: 'Full Coverage',
    deliveryTime: 'Within 45 Mins',
    popularServices: ['Factory CCTV Upgrade', 'Enterprise Access Control', 'Fiber Infrastructure']
  },
  {
    name: 'Iskandar Puteri / Horizon Hills / Medini',
    coverage: 'Full Coverage',
    deliveryTime: 'Within 45 Mins',
    popularServices: ['Gated Estate Smart Access', 'AI Human-Detection CCTV']
  },
  {
    name: 'Kulai / Senai / Saleng',
    coverage: 'Full Coverage',
    deliveryTime: 'Within 1 Hour',
    popularServices: ['Warehouse Network Racks', 'Perimeter Thermal Cameras', 'Door Access']
  },
  {
    name: 'Permas Jaya / Megah Ria / Bandar Seri Alam',
    coverage: 'Full Coverage',
    deliveryTime: 'Within 45 Mins',
    popularServices: ['Commercial Retail Camera Overhauls', 'Dual-Sensor Alarm Sensors']
  },
  {
    name: 'Ulu Tiram / Desa Cemerlang / Pelangi Indah',
    coverage: 'Full Coverage',
    deliveryTime: 'Within 45 Mins',
    popularServices: ['SME Commercial Security', 'Waterproof Outdoor Cameras']
  },
  {
    name: 'Kempas Utama / Setia Tropika / Impian Emas',
    coverage: 'Full Coverage',
    deliveryTime: 'Within 45 Mins',
    popularServices: ['Cabling Upgrade', 'Motion Tracking CCTV']
  }
];

export const FAQS = [
  {
    q: 'How long does physical CCTV installation take for a standard shoplot or double-storey house?',
    a: 'For a standard 4 to 8 camera residential or retail layout, it typically takes 1 working day. This includes all trunking, neat routing, setting up the central network box (NVR), application configuration, and tutoring you on smartphone streaming settings.'
  },
  {
    q: 'Do I need an internet connection at my premises to install a CCTV system?',
    a: 'No, an internet connection is not required for the cameras to record locally to your central recorder (NVR). However, if you would like to view live feeds, playback footage, and receive real-time push alerts on your smartphone while away from your premises, a stable fiber broadband connection is highly recommended.'
  },
  {
    q: 'Can I monitor the security cameras live, even when I am traveling overseas or on vacation?',
    a: 'Yes, absolutely. All our NVR cameras sync to our secure local platform. As long as you have internet connection on your phone, tablet, or laptop, you can view live streams, retrieve recordings (smart search alerts), listen to microphone audio, and receive high-priority push notifications.'
  },
  {
    q: 'Will my CCTV cameras work during a blackout or high-voltage lightning surge?',
    a: 'We strongly suggest adding an Uninterruptible Power Supply (UPS) with lightning surge protectors to your security recorder. We can size and supply a UPS that keeps your cameras and alarms running for up to 2-4 hours after total electric cuts, protecting delicate microchips from damage.'
  },
  {
    q: 'Do you provide consultation and paperwork for Johor Government civic places or factory compliance requests?',
    a: 'Yes. We are licensed security vendors capable of drafting technical datasheets, schematics, and structural cabling test results required for complex warehouse compliance, DOSH occupational safety, Bomba safety overrides, or municipal licenses.'
  }
];
