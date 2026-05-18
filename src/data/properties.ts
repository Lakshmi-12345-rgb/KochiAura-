import { Property, Testimonial } from '../types';

export const PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'The Zenith Sky Penthouse',
    location: 'Marine Drive, Kochi',
    price: '₹8.5 Cr',
    priceNumeric: 85000000,
    status: 'Available',
    type: 'Penthouse',
    bedrooms: 5,
    bathrooms: 6,
    area: '6,200 Sq.Ft.',
    mainImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop'
    ],
    description: 'Suspended high above the iconic Marine Drive waterfront, The Zenith is a masterpiece of modern luxury. Boasting a double-height panoramic glass facade, this massive automated duplex penthouse offers uninterrupted views of the sparkling Arabian Sea and Kochi backwaters.',
    features: [
      'Private 15m Infinity Deck Pool overlooking backwaters',
      'Dedicated Glass-walled Private Elevator',
      'Italian Calacatta Gold Marble Kitchen Countertops',
      'Crestron Smart Home Automation Integration',
      'Personal Wine Cellar with climate control',
      '24/7 White-glove Elite Concierge'
    ],
    specs: {
      'Floor Number': '24th & 25th (Duplex)',
      'Furnishing Status': 'Bespoke Semi-Furnished',
      'Car Parking Spaces': '4 Covered Bays',
      'Vastu Compliant': '100% East-Facing Main Entrance',
      'Security Tier': 'Triple-level Biometric Encryption',
      'Ownership Type': 'Freehold Title Certificate'
    },
    mapsLocation: 'Marine Drive Waterfront Promenade, Ernakulam, Kochi',
    virtualStagingConcepts: [
      {
        style: 'Modern Imperial Gold',
        description: 'Immaculate black marble with floating gold fixtures, bespoke velvet seating, and cascading crystal chandeliers reflecting a sunset skyline glow.',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop',
        beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop'
      },
      {
        style: 'Minimal Charcoal Noir',
        description: 'Deep matte dark-concrete paneling, micro-cement flooring, warm hidden LED strips, and sleek Italian leather sofas looking like a futuristic sanctuary.',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop',
        beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop'
      }
    ],
    coordinates: { lat: 9.9886, lng: 76.2762 }
  },
  {
    id: 'prop-2',
    title: 'The Travancore Heritage Mansion',
    location: 'Fort Kochi, Kochi',
    price: '₹12.0 Cr',
    priceNumeric: 120000000,
    status: 'Available',
    type: 'Heritage Villa',
    bedrooms: 4,
    bathrooms: 5,
    area: '7,800 Sq.Ft.',
    mainImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?q=80&w=600&auto=format&fit=crop'
    ],
    description: 'A deeply personal historical legacy. This 110-year-old colonial bungalow has been meticulously restored under structural design guidance to combine pristine antique beauty with state-of-the-art thermal and safety engineering. Nestled amidst tall mahogany trees, it exudes aristocratic peace.',
    features: [
      'Hand-crafted Solid Teakwood Pillars and Balustrades',
      'Traditional Internal Swimming Courtyard (Kulam style)',
      'Imported Portuguese hand-painted floor tiles',
      'Private Art Gallery Corridor and Library room',
      'Eco-sustainable underground rainwater harvest well',
      'Attached private quarters for culinary and security staff'
    ],
    specs: {
      'Land Area': '42 Cents',
      'Architectural Style': 'Dutch-Kerala Colonial Fusional',
      'Age of Property': 'Built in 1914 (Fully restored in 2024)',
      'Roof Structure': 'Premium double-layer clay tile with structural glaze',
      'Garden Type': 'Lush botanical curated tropical garden',
      'Ceiling Height': 'Vibrant 16-Foot Teak Wood Ceilings'
    },
    mapsLocation: 'Rose Street, Fort Kochi Historic Quarter, Kochi',
    virtualStagingConcepts: [
      {
        style: 'Royal Travancore Fusion',
        description: 'Bespoke brass floor lamps, deep teak lounge recliners, custom silk tapestry, and golden warm light panels that fuse old Kerala royalty with modern hospitality.',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
        beforeImage: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=800&auto=format&fit=crop'
      }
    ],
    coordinates: { lat: 9.9691, lng: 76.2422 }
  },
  {
    id: 'prop-3',
    title: 'The Obsidian Smart Mansion',
    location: 'Kakkanad, Kochi',
    price: '₹6.8 Cr',
    priceNumeric: 68000000,
    status: 'Sold',
    type: 'Smart Mansion',
    bedrooms: 5,
    bathrooms: 5,
    area: '5,500 Sq.Ft.',
    mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop'
    ],
    description: 'Designed for visionary innovators, The Obsidian is the peak of high-tech living in Kochi’s silicon belt. Built using textured slate stone and dark-stained architectural concrete, the mansion runs entirely on automated solar grid systems, delivering supreme privacy and self-sufficient luxury.',
    features: [
      'Self-heating basalt pool with underwater sound integration',
      'Subterranean automated 500-bottle wine tasting chamber',
      'Sleek invisible magnetic cabinetry with touchless sensors',
      'Soundproofed cinematic Dolby Atmos home theater (9.2.4)',
      'Facial recognition entry gates and perimeter thermal cameras',
      'Tesla Powerwall central backup clean-energy ecosystem'
    ],
    specs: {
      'Smart Ecosystem': 'Savant Centric Voice & App Control',
      'Energy Rating': 'Net Zero Solar (15kW Integrated Roof)',
      'Security Shield': 'Grade-4 biometric military grade smart locks',
      'Water Supply': 'Dual source pristine bored aquifer & corporation pure lines',
      'Home Cinema': '9.2.4 Dolby Atmos Layout with designer recliners',
      'HVAC Ventilation': 'High-spec Daikin VRV Anti-mould filtration'
    },
    mapsLocation: 'Chilavenoor Road Outskirts / Infopark Premium Valley, Kakkanad, Kochi',
    virtualStagingConcepts: [
      {
        style: 'Futuristic Obsidian Lounge',
        description: 'Floating glass stairways, golden steel wall brackets, modular jet-black Italian furniture, and custom luxury lighting accents of deep amber.',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop',
        beforeImage: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop'
      }
    ],
    coordinates: { lat: 10.0159, lng: 76.3419 }
  },
  {
    id: 'prop-4',
    title: 'The Marigold Duplex House',
    location: 'Panampilly Nagar, Kochi',
    price: '₹5.5 Cr',
    priceNumeric: 55000000,
    status: 'Available',
    type: 'Urban Duplex',
    bedrooms: 3,
    bathrooms: 4,
    area: '3,900 Sq.Ft.',
    mainImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502005229762-fc1b2d812ca5?q=80&w=600&auto=format&fit=crop'
    ],
    description: 'Set in Kochi’s elite fashion and design district, This duplex combines high-end boutique living with a stunning residential aesthetic. The centerpiece is the grand double-height living room featuring an artistic gold accent wall and a cascading custom bubble chandelier.',
    features: [
      'Gold structural panel accent walls & hand-polished gold ironwork',
      'Terrace garden with tropical flora & modern sit-out firepit',
      'Designer open layout with floating marble stairs',
      'Miele integrated kitchen appliances and gold faucet details',
      'Private wellness sauna chamber in the master bedroom suite',
      'Secure high-walled structure inside elite gated lane'
    ],
    specs: {
      'Locality Rank': 'Elite Residential Zone A (Panampilly Nagar)',
      'Water Setup': '24/7 Premium Filtered Purification',
      'Floor Plan': 'Open Double-Height Duplex',
      'Kitchen Fitting': 'German Leicht Premium Cabinetry',
      'Ceiling Style': 'Custom wooden slat acoustic accents',
      'Terrace Deck': 'Natural Teak Plating with safety guardrail'
    },
    mapsLocation: 'Main Avenue, Panampilly Nagar Premium Boulevard, Ernakulam, Kochi',
    virtualStagingConcepts: [
      {
        style: 'Art Deco Hollywood Glamour',
        description: 'Vibrant custom gold textures, velvet royal green cushions, brass tables, and bespoke abstract art pieces that turn this duplex into a design masterpiece.',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop',
        beforeImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800&auto=format&fit=crop'
      }
    ],
    coordinates: { lat: 9.9615, lng: 76.2934 }
  },
  {
    id: 'prop-5',
    title: 'The Backwater Sanctuary Peninsula',
    location: 'Kumbalangi, Kochi',
    price: '₹9.2 Cr',
    priceNumeric: 92000000,
    status: 'Rented',
    type: 'Waterfront Retreat',
    bedrooms: 4,
    bathrooms: 5,
    area: '6,500 Sq.Ft.',
    mainImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=600&auto=format&fit=crop'
    ],
    description: 'A breathtaking custom-built estate sitting on its own private finger of land in the tranquility of Kumbalangi. Melding organic architectural design with the finest high-end hospitality, this retreat lets you experience world-class waterfront luxury complete with private boat mooring panels.',
    features: [
      'Private 40-foot Boat Pier with electric catamaran connection',
      'Glass-panel water pavilion gazebo for sunset dining',
      'Master bedrooms featuring outdoor tropical rainshowers',
      'Custom traditional Kerala roof carpentry fused with structural steel',
      'Bespoke bio-filtered Koi freshwater pond running through the estate',
      '270-degree unhindered views of backwater mangrove islands'
    ],
    specs: {
      'Frontage': '220 Meters of pristine private waterfront boundary',
      'Boat Jet Facility': 'Fully automated boat lift ready',
      'Foundation': 'Hydrolocked structural micro-piles (Seismic rated)',
      'Garden Concept': 'Kerala native plants paired with Japanese zen garden decor',
      'Bath Systems': 'Sensory smart water spray with aroma infusions',
      'Floor Framing': 'Solid Brazilian Cherrywood and matte gold marble panels'
    },
    mapsLocation: 'Waterfront Peninsula, Kumbalangi Eco-luxury Outpost, Kochi',
    virtualStagingConcepts: [
      {
        style: 'Eco Luxury Waterfront Haven',
        description: 'Handcrafted premium rattan loungers, neutral linen curtains, golden brass hanging lanterns, and organic wooden sculptures.',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
        beforeImage: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=800&auto=format&fit=crop'
      }
    ],
    coordinates: { lat: 9.8975, lng: 76.2848 }
  },
  {
    id: 'prop-6',
    title: 'Imperial Court Sky Villa',
    location: 'Edappally, Kochi',
    price: '₹4.8 Cr',
    priceNumeric: 48000000,
    status: 'Available',
    type: 'Sky Villa',
    bedrooms: 3,
    bathrooms: 4,
    area: '3,400 Sq.Ft.',
    mainImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&auto=format&fit=crop'
    ],
    description: 'An elite private duplex sky villa situated in the vibrant epicenter of Kochi’s upscale commercial and lifestyle boulevard. Directly linked to premium club facilities and personal chef services, this villa delivers elite, comfortable high-density royal styling.',
    features: [
      'Wrap-around 360 balcony with custom glass jacuzzi deck',
      'Private Chef on-call & 24/7 personal household managers',
      'Sensory walk-in dual master wardrobes with golden cedar wood',
      'Integrated hidden surround sound in custom tray ceilings',
      'Automated high security bullet-resistant structural glass paneling',
      'Exclusive roof-deck helipad landing and charter authorization'
    ],
    specs: {
      'Sky Villa Height': '18th Floor (Premium Level)',
      'Club Access': 'Full Elite Lifetime Gold Club Invitation Included',
      'Wardrobes': 'His & Hers double walk-in with biometric compartments',
      'Kitchen Area': 'Full professional wet and dry kitchen setups',
      'Elevator Priority': 'Priority bypass card (Zero waiting times)',
      'Air Quality': 'Advanced UV-sterilized continuous multi-zone HVAC'
    },
    mapsLocation: 'Bypass Highway Corner, Near Lulu Premium District, Edappally, Kochi',
    virtualStagingConcepts: [
      {
        style: 'Grand Royal Gold Salon',
        description: 'Vibrant golden drapery, massive abstract marble display columns, majestic seating in premium off-white wool, and warm gold luxury floor up-lights.',
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=800&auto=format&fit=crop',
        beforeImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop'
      }
    ],
    coordinates: { lat: 10.0247, lng: 76.3079 }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Dr. Faisal Rahman',
    role: 'Chief Medical Officer & Philanthropist',
    company: 'Aster Healthcare UAE',
    text: 'Acquiring the Zenith sky penthouse was a standard-setting transaction. Kochi Aura’s team handled the purchase with extreme professionalism. Coming home to the unobstructed twilight backwater view from my infinity pool is a peace that words cannot describe. An absolute masterwork.',
    propertyPurchased: 'The Zenith Sky Penthouse',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Anjali Menon',
    role: 'Art Collector & Restorer',
    company: 'Cochin Art Biennale Board',
    text: 'The restoration quality of The Travancore Mansion is staggering. As someone deep in art preservation, I was prepared to inspect every inch. The combination of structural modernization with the pristine heritage of Dutch-Kerala columns is flawlessly executed. Kochi Aura is an elite league of its own.',
    propertyPurchased: 'The Travancore Heritage Mansion',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Mathew Korah',
    role: 'Founder & Venture Partner',
    company: 'Synergy Capital Singapore',
    text: 'For a technology entrepreneur, Kakkanad’s smart infrastructure is vital. The Obsidian Villa exceeded every single criteria. Total off-grid power backups, a premium private room theater, and automated security provide an oasis of secure elite calm near my investment hubs. Flawless concierge services.',
    propertyPurchased: 'The Obsidian Smart Mansion',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    rating: 5
  }
];

export const MOCK_INQUIRIES: any[] = [
  {
    id: 'inq-1',
    propertyId: 'prop-1',
    propertyName: 'The Zenith Sky Penthouse',
    name: 'Vikram Sethi',
    email: 'vikram.s@globalauto.com',
    phone: '+91 98450 12345',
    message: 'Interested in a private viewing this weekend. Looking for high-floor units specifically.',
    date: '2024-05-15T10:30:00Z',
    status: 'New'
  },
  {
    id: 'inq-2',
    propertyId: 'prop-2',
    propertyName: 'The Travancore Heritage Mansion',
    name: 'Saira Banu',
    email: 'saira.b@heritage.org',
    phone: '+91 94440 54321',
    message: 'Does the property have any current heritage conservation restrictions for internal modifications?',
    date: '2024-05-16T14:45:00Z',
    status: 'Contacted'
  },
  {
    id: 'inq-3',
    propertyId: 'prop-4',
    propertyName: 'The Marigold Duplex House',
    name: 'Arjun Kapoor',
    email: 'arjun.k@techinnovate.io',
    phone: '+91 90001 11222',
    message: 'Is the terrace garden fully automated? I travel often and need zero-maintenance systems.',
    date: '2024-05-17T09:15:00Z',
    status: 'Qualified'
  },
  {
    id: 'inq-4',
    name: 'General Inquiry',
    email: 'info@investgroup.com',
    phone: '+91 98888 77777',
    message: 'Seeking a portfolio of waterfront properties for a corporate retreat investment.',
    date: '2024-05-18T11:00:00Z',
    status: 'New'
  }
];
