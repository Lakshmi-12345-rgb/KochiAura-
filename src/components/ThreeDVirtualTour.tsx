import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import { Compass, Eye, ShieldAlert, Sparkles, Navigation, Layers, RotateCcw, Volume2, VolumeX, Grid3X3, HelpCircle } from 'lucide-react';
import { Property } from '../types';

interface Hotspot {
  id: string;
  targetRoomId: string;
  label: string;
  angle: number; // angle in degrees [0, 360]
  yLevel: number; // height offset on screen [0, 100] (0 = top, 100 = bottom)
}

interface Room {
  id: string;
  name: string;
  image: string;
  blueprintCoords: { x: number; y: number }; // Percentage position on 2D blueprint map
  hotspots: Hotspot[];
  specs: {
    temp: string;
    shielding: string;
    vasteRating: string;
    structuralHealth: string;
  };
}

interface TourConfig {
  [propertyId: string]: {
    startRoomId: string;
    rooms: Room[];
    blueprintSvgPath: string; // Background shape for map
  };
}

// Global Synth Sound Engine using Web Audio API (No files needed!)
const playSynthSound = (frequencyStart: number, frequencyEnd: number, duration: number, type: 'sine' | 'square' | 'triangle' | 'sawtooth' = 'sine') => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequencyStart, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequencyEnd, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Audio Context might be locked by browser policies before user interaction
  }
};

const TOUR_DATA: TourConfig = {
  'prop-1': {
    startRoomId: 'living-room',
    blueprintSvgPath: 'M20,20 L80,20 L90,50 L80,80 L20,80 Z',
    rooms: [
      {
        id: 'living-room',
        name: 'Grand Royal Living Suite',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1400&auto=format&fit=crop',
        blueprintCoords: { x: 30, y: 40 },
        hotspots: [
          { id: 'h1', targetRoomId: 'jacuzzi-deck', label: '⚜ Access Backwater Deck & Pool', angle: 45, yLevel: 55 },
          { id: 'h2', targetRoomId: 'master-bedroom', label: '⚜ Royal Master Suite', angle: 220, yLevel: 50 },
        ],
        specs: { temp: '22.4°C (Dynamic Clim)', shielding: 'Grade-5 Carbon Filtered', vasteRating: '100% Sun-Aligned', structuralHealth: '99.9%' }
      },
      {
        id: 'jacuzzi-deck',
        name: 'Backwater Infinity Jacuzzi Deck',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1400&auto=format&fit=crop',
        blueprintCoords: { x: 75, y: 25 },
        hotspots: [
          { id: 'h3', targetRoomId: 'living-room', label: '⚜ Re-enter Grand Living Suite', angle: 180, yLevel: 60 },
          { id: 'h4', targetRoomId: 'master-bedroom', label: '⚜ Direct Entrance to Master Suite', angle: 310, yLevel: 50 },
        ],
        specs: { temp: '26.8°C (Backwater Breeze)', shielding: 'Aero UV Ionized Shield', vasteRating: 'Infinity Sea-facing', structuralHealth: '100%' }
      },
      {
        id: 'master-bedroom',
        name: 'Royal Master Penthouse Suite',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1400&auto=format&fit=crop',
        blueprintCoords: { x: 70, y: 70 },
        hotspots: [
          { id: 'h5', targetRoomId: 'living-room', label: '⚜ Walk to Grand Living Area', angle: 40, yLevel: 55 },
          { id: 'h6', targetRoomId: 'jacuzzi-deck', label: '⚜ Step out to Jacuzzi Infinity Deck', angle: 130, yLevel: 50 }
        ],
        specs: { temp: '21.0°C (Hypoallergenic)', shielding: 'Soundproofed 55dB Dampened', vasteRating: 'Sandalwood Sanctified', structuralHealth: '99.8%' }
      }
    ]
  },
  'prop-2': {
    startRoomId: 'grand-salon',
    blueprintSvgPath: 'M30,10 L70,10 L80,40 L70,90 L30,90 L20,40 Z',
    rooms: [
      {
        id: 'grand-salon',
        name: 'Traditional Royal Grand Salon',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop',
        blueprintCoords: { x: 50, y: 25 },
        hotspots: [
          { id: 'h7', targetRoomId: 'heritage-library', label: '⚜ Direct to Teak Biblioteca', angle: 90, yLevel: 52 },
          { id: 'h8', targetRoomId: 'water-courtyard', label: '⚜ Traditional Central Kulam Courtyard', angle: 260, yLevel: 58 },
        ],
        specs: { temp: '23.1°C (Natural Slat Draft)', shielding: 'Biological Microbe Block', vasteRating: 'East Sunrise Entry', structuralHealth: '100% Vetted' }
      },
      {
        id: 'heritage-library',
        name: 'Dutch-Kerala Colonial Biblioteca',
        image: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?q=80&w=1400&auto=format&fit=crop',
        blueprintCoords: { x: 80, y: 65 },
        hotspots: [
          { id: 'h9', targetRoomId: 'grand-salon', label: '⚜ Back to Grand Salon Lounge', angle: 270, yLevel: 55 },
          { id: 'h10', targetRoomId: 'water-courtyard', label: '⚜ Slip into Kulam Courtyard', angle: 160, yLevel: 50 },
        ],
        specs: { temp: '21.5°C (Climate Slat Guard)', shielding: 'Teak Acoustic Plywood Frame', vasteRating: 'Brahmasthan Aligned', structuralHealth: '99.7%' }
      },
      {
        id: 'water-courtyard',
        name: 'Inner Kulam Courtyard',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1400&auto=format&fit=crop',
        blueprintCoords: { x: 30, y: 70 },
        hotspots: [
          { id: 'h11', targetRoomId: 'grand-salon', label: '⚜ Royal Entrance Hallway', angle: 80, yLevel: 52 },
          { id: 'h12', targetRoomId: 'heritage-library', label: '⚜ Walk to Teakwood Library', angle: 340, yLevel: 50 }
        ],
        specs: { temp: '25.0°C (Water Cooled)', shielding: 'Atmospheric Micro-mist Spray', vasteRating: 'Prana Energy Purified', structuralHealth: '100%' }
      }
    ]
  },
  'prop-3': {
    startRoomId: 'smart-lounge',
    blueprintSvgPath: 'M15,30 L85,15 L95,65 L50,85 L15,65 Z',
    rooms: [
      {
        id: 'smart-lounge',
        name: 'Cyber-Smart Obsidian Lounge',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop',
        blueprintCoords: { x: 30, y: 35 },
        hotspots: [
          { id: 'h13', targetRoomId: 'cinematic-vault', label: '⚜ Enter Obsidian Dolby Cinema', angle: 315, yLevel: 50 },
          { id: 'h14', targetRoomId: 'wine-chamber', label: '⚜ Subterranean Fine Wine Lounge', angle: 95, yLevel: 60 },
        ],
        specs: { temp: '20.8°C (Heurist Shield)', shielding: 'Military-Grade Faraday EMF Shield', vasteRating: 'Central Magnetic Grid', structuralHealth: '99.99%' }
      },
      {
        id: 'wine-chamber',
        name: 'Subterranean 500-Bottle Cellar Lounge',
        image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1400&auto=format&fit=crop',
        blueprintCoords: { x: 80, y: 40 },
        hotspots: [
          { id: 'h15', targetRoomId: 'smart-lounge', label: '⚜ Elevate to Smart Lounge Panel', angle: 260, yLevel: 55 },
          { id: 'h16', targetRoomId: 'cinematic-vault', label: '⚜ Crestron Controlled Home Theater', angle: 15, yLevel: 50 },
        ],
        specs: { temp: '14.0°C (Savant Chill)', shielding: 'Vibration & Acoustic Block', vasteRating: 'Sub-terrain Anchored', structuralHealth: '100%' }
      },
      {
        id: 'cinematic-vault',
        name: 'Atmos Luxury Theater Crypt',
        image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1400&auto=format&fit=crop',
        blueprintCoords: { x: 45, y: 75 },
        hotspots: [
          { id: 'h17', targetRoomId: 'smart-lounge', label: '⚜ Rise to Ground Obsidian Salon', angle: 135, yLevel: 55 },
          { id: 'h18', targetRoomId: 'wine-chamber', label: '⚜ Wine Tasting Vault Corridor', angle: 220, yLevel: 50 }
        ],
        specs: { temp: '19.5°C (Dolby Configed)', shielding: 'Soundproofed -70dB Dampening', vasteRating: 'Aura Harmonized Center', structuralHealth: '99.9%' }
      }
    ]
  },
  // Default fallback setup if properties aren't in config
  'default': {
    startRoomId: 'r1',
    blueprintSvgPath: 'M20,20 L80,20 L80,80 L20,80 Z',
    rooms: [
      {
        id: 'r1',
        name: 'Immense Living Salon',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop',
        blueprintCoords: { x: 35, y: 50 },
        hotspots: [
          { id: 'dh1', targetRoomId: 'r2', label: '⚜ Panoramic Terrace Access', angle: 110, yLevel: 55 },
          { id: 'dh2', targetRoomId: 'r3', label: '⚜ Master Living Sanctuary', angle: 280, yLevel: 50 },
        ],
        specs: { temp: '22.0°C', shielding: 'Biomimetic HEPA Guard', vasteRating: '100% East Facing', structuralHealth: '99.9%' }
      },
      {
        id: 'r2',
        name: 'Deluxe Scenic Terrace Deck',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1400&auto=format&fit=crop',
        blueprintCoords: { x: 75, y: 30 },
        hotspots: [
          { id: 'dh3', targetRoomId: 'r1', label: '⚜ Re-enter Living Salon', angle: 290, yLevel: 55 },
          { id: 'dh4', targetRoomId: 'r3', label: '⚜ Access Master Sanctuary Room', angle: 170, yLevel: 50 },
        ],
        specs: { temp: '26.2°C', shielding: 'Seismic Glass Guard', vasteRating: 'Prana Solar Ingress', structuralHealth: '100%' }
      },
      {
        id: 'r3',
        name: 'Prestige Master Sanctuary',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop',
        blueprintCoords: { x: 65, y: 75 },
        hotspots: [
          { id: 'dh5', targetRoomId: 'r1', label: '⚜ Living Area Pathway', angle: 100, yLevel: 55 },
          { id: 'dh6', targetRoomId: 'r2', label: '⚜ Push out to Deluxe Terrace', angle: 350, yLevel: 50 }
        ],
        specs: { temp: '20.5°C', shielding: 'Triple Glazed Silent Windows', vasteRating: 'Dharma Aligned', structuralHealth: '99.8%' }
      }
    ]
  }
};

interface ThreeDVirtualTourProps {
  property: Property;
}

// Represent 48 procedurally computed spatial node cloud targets scattered 360 degrees
const LIDAR_MESH_NODES = Array.from({ length: 48 }, (_, i) => {
  const angle = (i * 360) / 48;
  const yLevel = 22 + ((i * 19) % 60) + Math.sin(i) * 3.5;
  const distance = (2.1 + ((i * 3) % 45) * 0.1).toFixed(2);
  const nodeName = `N-${String(200 + i).slice(-3)}`;
  return { id: `node-${i}`, angle, yLevel, distance, name: nodeName };
});

export default function ThreeDVirtualTour({ property }: ThreeDVirtualTourProps) {
  // Get property-specific tour or load fallback
  const tourConfig = TOUR_DATA[property.id] || TOUR_DATA['default'];
  const [currentRoomId, setCurrentRoomId] = useState(tourConfig.startRoomId);
  const [viewAngle, setViewAngle] = useState(180); // Center looks forward
  const [isLidarMode, setIsLidarMode] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [fovAngle] = useState(100); // 100° FOV window
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [angleOnDragStart, setAngleOnDragStart] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Auto scanning ticker in Lidar Mode
  const [radarPulsePercent, setRadarPulsePercent] = useState(0);
  const [lidarDiagnostics, setLidarDiagnostics] = useState<string[]>([]);

  // Real-time Lidar telemetry metrics
  const [meshPointsCount, setMeshPointsCount] = useState(148202);
  const [liveStructuralIntegrity, setLiveStructuralIntegrity] = useState(99.85);
  const [telemetryTime, setTelemetryTime] = useState(0);
  const [laserIntensity, setLaserIntensity] = useState(45.2);
  const [beamPurity, setBeamPurity] = useState(98.92);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const currentRoom = tourConfig.rooms.find(r => r.id === currentRoomId) || tourConfig.rooms[0];

  // Random Diagnostics Tick for futuristic touch
  useEffect(() => {
    if (!isLidarMode) return;
    const diagnosticsEntries = [
      'LIDAR: LASER ARRAY ACTIVE (905nm)',
      'GRID: SPATIAL MESH CONSTRUCTED',
      'SYS: DEPTH MODEL COMPILING',
      'COORDS: CALIBRATING MATRIX',
      'ROOM_HEALTH: STRUCTURAL INTEGRITY 99.85%',
      'WEATHER_SENS: CLIMATE OPTIMAL',
      'RF_POISON_GUARD: INTRUSION RATIO 0.00%',
    ];
    setLidarDiagnostics([diagnosticsEntries[0], diagnosticsEntries[1], diagnosticsEntries[2]]);
    
    const interval = setInterval(() => {
      const randomMsg = diagnosticsEntries[Math.floor(Math.random() * diagnosticsEntries.length)];
      setLidarDiagnostics(prev => [randomMsg, prev[0], prev[1]]);
      if (isSoundOn) {
        playSynthSound(900, 450, 0.06, 'triangle');
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isLidarMode, isSoundOn]);

  // Scan-line animation loop in Lidar Mode
  useEffect(() => {
    if (!isLidarMode) return;
    let animId: number;
    let lastTime = Date.now();
    
    const tick = () => {
      const now = Date.now();
      const delta = now - lastTime;
      
      // Accumulate scanning points
      setMeshPointsCount(prev => prev + Math.floor(Math.sin(Date.now() / 1500) * 12 + 28));
      
      // Laser intensity fluctuation
      setLaserIntensity(prev => {
        const noise = Math.sin(Date.now() / 600) * 0.12;
        return Number((45.2 + noise).toFixed(2));
      });
      
      // Beam purity calibration modulation
      setBeamPurity(prev => {
        const noise = Math.cos(Date.now() / 1000) * 0.05;
        return Number((98.92 + noise).toFixed(2));
      });

      // Modulate safety structural health slightly based on actual specs
      setLiveStructuralIntegrity(prev => {
        const structuralSpec = currentRoom.specs.structuralHealth ? parseFloat(currentRoom.specs.structuralHealth) : 99.85;
        const noise = (Math.sin(Date.now() / 400) * 0.0015) + (Math.cos(Date.now() / 250) * 0.0008);
        const nextVal = (structuralSpec > 0 ? structuralSpec : 99.85) - 0.015 + noise;
        return Number(nextVal.toFixed(4));
      });

      setRadarPulsePercent(p => (p + 1.2) % 100);
      setTelemetryTime(t => t + (delta * 0.006));
      
      lastTime = now;
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isLidarMode, currentRoom]);

  // Compass direction utility
  const getCompassDirection = (deg: number) => {
    const d = (deg + 360) % 360;
    if (d > 337.5 || d <= 22.5) return 'N';
    if (d > 22.5 && d <= 67.5) return 'NE';
    if (d > 67.5 && d <= 112.5) return 'E';
    if (d > 112.5 && d <= 157.5) return 'SE';
    if (d > 157.5 && d <= 202.5) return 'S';
    if (d > 202.5 && d <= 247.5) return 'SW';
    if (d > 247.5 && d <= 292.5) return 'W';
    return 'NW';
  };

  // Sound triggers
  const triggerSound = (type: 'chirp' | 'sweep' | 'lidarToggle') => {
    if (!isSoundOn) return;
    if (type === 'chirp') {
      playSynthSound(1200, 1600, 0.04, 'sine');
    } else if (type === 'sweep') {
      playSynthSound(300, 950, 0.35, 'sine');
    } else if (type === 'lidarToggle') {
      playSynthSound(80, 400, 0.4, 'sawtooth');
    }
  };

  // Drag-to-Pan Logic Handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setDragStartX(clientX);
    setAngleOnDragStart(viewAngle);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging || !containerRef.current) return;
    const containerWidth = containerRef.current.clientWidth;
    const deltaX = clientX - dragStartX;
    
    // Map drag distance of full screen to 150 degrees rotation
    const rotationFactor = 160;
    const deltaAngle = (deltaX / containerWidth) * rotationFactor;
    
    // Wrap angle correctly between [0, 360]
    let newAngle = (angleOnDragStart - deltaAngle) % 360;
    if (newAngle < 0) newAngle += 360;
    
    setViewAngle(newAngle);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Mouse pan handlers
  const onMouseDown = (e: ReactMouseEvent) => {
    // Left-click only
    if (e.button !== 0) return;
    handleDragStart(e.clientX);
  };

  const onMouseMove = (e: ReactMouseEvent) => {
    handleDragMove(e.clientX);
  };

  // Touch pan handlers
  const onTouchStart = (e: ReactTouchEvent) => {
    if (e.touches.length === 1) {
      handleDragStart(e.touches[0].clientX);
    }
  };

  const onTouchMove = (e: ReactTouchEvent) => {
    if (e.touches.length === 1) {
      handleDragMove(e.touches[0].clientX);
    }
  };

  // Handle transitioning room with a sweeping futuristic visual fade
  const handleRoomTransition = (targetId: string) => {
    if (targetId === currentRoomId) return;
    triggerSound('sweep');
    setIsFading(true);
    setTimeout(() => {
      setCurrentRoomId(targetId);
      // Face towards the center of the new room (180 deg)
      setViewAngle(180);
      setIsFading(false);
    }, 350); // elegant fade duration
  };

  // Hotspot Visiblity and 2D-screen Coordinate translation math
  const getHotspotPosition = (hotspotAngle: number) => {
    // Find shortest angular distance between screen center (viewAngle) and hotspot
    let diff = hotspotAngle - viewAngle;
    while (diff < -180) diff += 360;
    while (diff > 180) diff -= 360;

    const halfFov = fovAngle / 2;
    // Map bounds to viewport percent (if outside FOV, do not display)
    if (Math.abs(diff) > halfFov) return null;

    // Normalize from [-halfFov, halfFov] to range [5%, 95%] to keep nicely inside physical limits
    const relativeX = 50 + (diff / halfFov) * 45;
    return relativeX;
  };

  // Compute visible Lidar mesh nodes dynamically
  const visibleMeshNodes = isLidarMode ? LIDAR_MESH_NODES.map(node => {
    const x = getHotspotPosition(node.angle);
    return { ...node, x };
  }).filter(n => n.x !== null) as Array<{ id: string; angle: number; yLevel: number; distance: string; name: string; x: number }> : [];

  return (
    <div className="flex flex-col h-full bg-[#050505] rounded-lg border border-[#d4af37]/30 overflow-hidden relative select-none shadow-[0_0_20px_rgba(212,175,55,0.05)]">
      
      {/* Immersive HUD Top Info Header bar */}
      <div className="z-10 bg-black/85 backdrop-blur-md border-b border-neutral-900 px-4 py-2.5 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#d4af37]/80">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="uppercase text-neutral-300">IMMERse_3D: LIVE STREAM</span>
          <span className="text-[9px] text-neutral-500">⚜ VASTU_CALIBRATED</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-[#d4af37]/10 px-2 py-0.5 rounded border border-[#d4af37]/30 text-white flex items-center space-x-1">
            <Compass className="w-3 h-3 text-[#d4af37] animate-spin" style={{ animationDuration: '6s' }} />
            <span>{Math.round(viewAngle)}° {getCompassDirection(viewAngle)}</span>
          </div>
          {/* Sound Toggle */}
          <button 
            onClick={() => {
              setIsSoundOn(!isSoundOn);
              if(!isSoundOn) {
                // play a fast double key click
                playSynthSound(1000, 1200, 0.05, 'sine');
              }
            }}
            className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1 uppercase text-[9px] text-neutral-400"
            title="Toggle spatial audio synthesizers"
          >
            {isSoundOn ? <Volume2 className="w-3.5 h-3.5 text-[#d4af37]" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isSoundOn ? 'SND_ON' : 'MUTED'}</span>
          </button>
        </div>
      </div>

      {/* Main 3D Panoramic Render Stage */}
      <div 
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={handleDragEnd}
        className={`relative h-64 sm:h-[340px] w-full overflow-hidden bg-[#030303] cursor-ew-resize border-b border-neutral-900 transition-all duration-300 ${
          isDragging ? 'cursor-grabbing scale-[0.995]' : ''
        }`}
      >
        {/* Dynamic Multi-layered Background 3D Panorama cylinder effect */}
        <div 
          className={`absolute inset-0 bg-no-repeat transition-opacity duration-300 select-none ${
            isFading ? 'opacity-30' : 'opacity-100'
          }`}
          style={{
            backgroundImage: `url(${currentRoom.image})`,
            // Maps the viewAngle (0-360) directly to horizontal background shift percentage
            backgroundPosition: `${(viewAngle / 360) * 100}% center`,
            backgroundSize: '240% 100%', // Wide panoramic scaling projection
            // If in lidar mode, we apply spectacular cyber glow styling
            filter: isLidarMode 
              ? 'invert(1) hue-rotate(140deg) saturate(1.8) contrast(1.5) brightness(0.6)' 
              : 'none'
          }}
        />

        {/* Lidar Spatial Grid Mesh Layer (Futuristic scanning effect) */}
        {isLidarMode && (
          <div className="absolute inset-0 pointer-events-none z-10 select-none">
            {/* Horizontal scan line */}
            <div 
              className="absolute left-0 right-0 h-[2px] bg-[#d4af37]/35 shadow-[0_0_12px_rgba(212,175,55,1)] animate-pulse"
              style={{ top: `${radarPulsePercent}%` }}
            />
            {/* CRT Phosphor Scan lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] opacity-25" />
            
            {/* Lidar Point Cloud Mesh Vectors (3D Perspective simulation) */}
            <svg className="absolute inset-0 w-full h-full text-[#d4af37]/20">
              {visibleMeshNodes.map((n1, idx) => {
                const connections = [];
                for (let j = idx + 1; j < idx + 4; j++) {
                  if (j < visibleMeshNodes.length) {
                    const n2 = visibleMeshNodes[j];
                    const angleDiff = Math.abs(n1.angle - n2.angle);
                    const yDiff = Math.abs(n1.yLevel - n2.yLevel);
                    if (yDiff < 32 && angleDiff < 35) {
                      connections.push(
                        <line
                          key={`${n1.id}-${n2.id}`}
                          x1={`${n1.x}%`}
                          y1={`${n1.yLevel}%`}
                          x2={`${n2.x}%`}
                          y2={`${n2.yLevel}%`}
                          stroke="rgba(212, 175, 55, 0.22)"
                          strokeWidth="0.5"
                          strokeDasharray={idx % 4 === 0 ? "1 3" : "none"}
                        />
                      );
                    }
                  }
                }
                return connections;
              })}
            </svg>

            {/* Glowing nodes & coordinate projections */}
            {visibleMeshNodes.map((node, i) => (
              <div
                key={node.id}
                className="absolute transition-all duration-75"
                style={{
                  left: `${node.x}%`,
                  top: `${node.yLevel}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className={`rounded-full transition-all duration-300 ${
                  i % 3 === 0 
                    ? 'w-1.5 h-1.5 bg-[#d4af37] shadow-[0_0_6px_#d4af37]' 
                    : i % 2 === 0
                    ? 'w-1 h-1 bg-[#d4af37]/75 shadow-[0_0_4px_rgba(212,175,55,0.4)]'
                    : 'w-[1.5px] h-[1.5px] bg-neutral-400/60'
                }`} />

                {i % 7 === 0 && (
                  <div className="absolute -inset-1 border border-[#d4af37]/35 rounded-xs animate-ping" style={{ animationDuration: '3s' }} />
                )}

                {i % 5 === 0 && (
                  <div className="absolute left-2.5 top-0 flex flex-col font-mono text-[6px] text-[#d4af37]/75 scale-90 -translate-y-1/2 leading-none whitespace-nowrap bg-black/65 px-1 py-0.5 rounded border border-[#d4af37]/25">
                    <span className="font-semibold text-white">{node.name}</span>
                    <span>D: {node.distance}m</span>
                  </div>
                )}
              </div>
            ))}

            {/* Immersive Top-Right Telemetry Dashboard */}
            <div className="absolute top-3 right-3 bg-black/85 backdrop-blur-md p-2 rounded border border-[#d4af37]/35 font-mono text-[8px] text-[#d4af37] space-y-1 w-40 sm:w-44 leading-tight pointer-events-none z-15 shadow-lg">
              <div className="font-bold border-b border-[#d4af37]/20 pb-0.5 uppercase flex justify-between items-center text-[#d4af37]">
                <span>STREAM FEED</span>
                <span className="text-[6.5px] text-green-400 bg-green-950 px-1 rounded animate-pulse">LOCK</span>
              </div>
              <div className="grid grid-cols-2 gap-x-1 gap-y-0.5 text-neutral-400">
                <span>PTS CLOUD:</span>
                <span className="text-right text-white font-semibold">{meshPointsCount.toLocaleString()}</span>
                
                <span>M_INTEGRITY:</span>
                <span className="text-right text-white font-semibold">{liveStructuralIntegrity.toFixed(4)}%</span>
                
                <span>LASER BEAM:</span>
                <span className="text-right text-amber-300 font-medium">{laserIntensity} kW</span>
                
                <span>BEAM PURITY:</span>
                <span className="text-right text-emerald-400">{beamPurity}%</span>
              </div>
              
              {/* Telemetry Sensor Waveform */}
              <div className="pt-1.5 border-t border-neutral-900 mt-1">
                <div className="flex justify-between text-[6px] text-neutral-500 mb-0.5 uppercase">
                  <span>SENSOR SCAN RETURN</span>
                  <span>40 Hz</span>
                </div>
                <div className="h-6 w-full bg-neutral-950 rounded border border-neutral-800/60 overflow-hidden relative">
                  <svg className="absolute inset-0 w-full h-full text-[#d4af37]/75">
                    <path
                      d={`M ${Array.from({ length: 25 }, (_, idx) => {
                        const xVal = (idx / 24) * 176;
                        const yVal = 12 + Math.sin(idx * 0.45 + telemetryTime) * 6 + Math.cos(idx * 0.9 - telemetryTime) * 2;
                        return `${xVal},${yVal}`;
                      }).join(' L ')}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                  <div className="absolute top-0 bottom-0 w-[1px] bg-red-500/80 shadow-[0_0_4px_rgba(239,68,68,1)] animate-ping" style={{ left: '55%' }} />
                </div>
              </div>
            </div>

            {/* Scrolling Cyber Telemetry Console Logs */}
            <div className="absolute bottom-3 left-3 bg-black/85 p-2 rounded border border-[#d4af37]/35 font-mono text-[8px] text-[#d4af37] space-y-1 max-w-[200px] leading-tight z-15 shadow-lg">
              <div className="font-bold border-b border-[#d4af37]/20 pb-0.5 uppercase mb-1 flex items-center space-x-1.5">
                <Grid3X3 className="w-2.5 h-2.5 animate-pulse" />
                <span>Diagnostics Monitor</span>
              </div>
              {lidarDiagnostics.map((log, idx) => (
                <div key={idx} className="truncate animate-pulse" style={{ animationDelay: `${idx * 150}ms` }}>
                  &gt; {log}
                </div>
              ))}
              {/* Progress Scan Bar */}
              <div className="pt-1.5 border-t border-[#d4af37]/25 mt-1">
                <div className="flex justify-between text-[6.5px] text-neutral-400 mb-0.5 font-sans leading-none">
                  <span>ROOM SCAN REFIT COMPLETENESS</span>
                  <span className="text-[#d4af37] font-mono">{Math.floor(radarPulsePercent * 0.15 + 85)}%</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden p-[1px]">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-[#d4af37] rounded-xs shadow-[0_0_4px_#d4af37] transition-all duration-300"
                    style={{ width: `${Math.floor(radarPulsePercent * 0.15 + 85)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hotspots Integration Overlay (Spatially pinned inside 3D cylinder) */}
        {!isFading && currentRoom.hotspots.map((hotspot) => {
          const xPercent = getHotspotPosition(hotspot.angle);
          if (xPercent === null) return null; // Safe guard outside FOV

          return (
            <button
              key={hotspot.id}
              onClick={() => handleRoomTransition(hotspot.targetRoomId)}
              onMouseEnter={() => triggerSound('chirp')}
              className="absolute z-20 group -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
              style={{
                left: `${xPercent}%`,
                top: `${hotspot.yLevel}%`
              }}
            >
              {/* Pulsing Target Rings */}
              <div className="relative flex items-center justify-center">
                <span className="absolute inline-flex h-7 w-7 rounded-full bg-[#d4af37]/45 animate-ping opacity-80" />
                <span className="absolute inline-flex h-10 w-10 rounded-full bg-[#d4af37]/15 animate-ping opacity-30" style={{ animationDuration: '2s' }} />
                
                <div className="w-5 h-5 rounded-full bg-black/90 border border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.7)] flex items-center justify-center group-hover:bg-[#d4af37] group-hover:scale-110 transition-all duration-300">
                  <span className="text-[10px] text-[#d4af37] group-hover:text-black font-serif font-bold">⚜</span>
                </div>

                {/* Floating Info Label */}
                <span className="absolute top-7 bg-black/85 backdrop-blur-md text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-sm border border-[#d4af37]/35 whitespace-nowrap opacity-60 group-hover:opacity-100 group-hover:scale-105 group-hover:border-[#d4af37] shadow-md transition-all duration-300">
                  {hotspot.label}
                </span>
              </div>
            </button>
          );
        })}

        {/* Visual Fade Overlay on change */}
        {isFading && (
          <div className="absolute inset-0 bg-[#050505] opacity-80 backdrop-blur-sm z-30 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-8 h-8 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="font-mono text-[9px] uppercase tracking-widest text-[#d4af37] animate-pulse">
                Establishing Spatial Gateway...
              </p>
            </div>
          </div>
        )}

        {/* Swipe instructions helper (Fades out quickly) */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-neutral-800 text-[8px] font-mono text-neutral-400 uppercase tracking-widest flex items-center space-x-1.5 z-10 font-medium">
          <RotateCcw className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Click & Drag panorama to look 360°</span>
        </div>
      </div>

      {/* Interface Controls & Interactive Minimap Blueprint Footer */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-neutral-950/75 backdrop-blur-md relative z-10">
        
        {/* Room Spec Panels & Thermal Readouts (Left Side) - 7 cols */}
        <div className="md:col-span-7 space-y-3 flex flex-col justify-between">
          <div>
            <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block">ACTIVE MODULE LOCATION</span>
            <h3 className="text-sm font-serif font-semibold text-white tracking-wide mt-0.5">
              {currentRoom.name}
            </h3>
            <p className="text-[11px] text-neutral-400 mt-1 leading-normal font-sans">
              Drag left or right inside the viewport screen to inspect the room space, or click any highlighted golden ⚜ nodes to walk from room to room instantly.
            </p>
          </div>

          {/* Room Specs Grid */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div className="bg-black/40 border border-neutral-900 p-2 rounded flex flex-col justify-center">
              <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-500">Aero Shielding</span>
              <span className="text-xs text-white font-mono mt-0.5">{currentRoom.specs.shielding}</span>
            </div>
            <div className="bg-black/40 border border-neutral-900 p-2 rounded flex flex-col justify-center">
              <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-500">Thermal Index</span>
              <span className="text-xs text-white font-mono mt-0.5">{currentRoom.specs.temp}</span>
            </div>
            <div className="bg-black/40 border border-neutral-900 p-2 rounded flex flex-col justify-center">
              <span className="text-[8px] font-mono uppercase tracking-widest text-[#d4af37]">Vastu Core</span>
              <span className="text-xs text-[#d4af37] font-mono mt-0.5">{currentRoom.specs.vasteRating}</span>
            </div>
            <div className="bg-black/40 border border-neutral-900 p-2 rounded flex flex-col justify-center">
              <span className="text-[8px] font-mono uppercase tracking-widest text-[#d4af37]">Structural Scan</span>
              <span className="text-xs text-neutral-300 font-mono mt-0.5">
                {isLidarMode ? `${liveStructuralIntegrity.toFixed(4)}%` : `${currentRoom.specs.structuralHealth}`} Safe
              </span>
            </div>
          </div>

          {/* Mode Toggles */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsLidarMode(!isLidarMode);
                triggerSound('lidarToggle');
              }}
              className={`flex-1 py-1.5 px-3 rounded border text-[10px] font-mono tracking-widest uppercase font-semibold text-center flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
                isLidarMode 
                  ? 'bg-[#d4af37]/25 border-[#d4af37] text-white shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                  : 'bg-black/60 border-neutral-800 text-[#d4af37] hover:border-neutral-700'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>{isLidarMode ? 'NORMAL_LIGHT_VIEW' : 'SPECTRAL_LIDAR_MESH'}</span>
            </button>
          </div>
        </div>

        {/* Blueprint Minimap Layout Panel (Right Side) - 5 cols */}
        <div className="md:col-span-5 flex flex-col items-center justify-center bg-black/60 border border-neutral-900 rounded p-3">
          <div className="w-full flex items-center justify-between border-b border-neutral-900 pb-1.5 mb-2.5 text-[8px] font-mono tracking-widest uppercase text-neutral-500">
            <span>⚜ PORTFOLIO BLOCK BLUEPRINT</span>
            <span className="text-[#d4af37]">RADAR SYNC ACTIVE</span>
          </div>

          <div className="relative w-full aspect-square max-h-[140px] bg-neutral-950 rounded border border-neutral-900/60 flex items-center justify-center overflow-hidden">
            
            {/* Cyber Radar Swirl sweeps background */}
            <div className="absolute inset-0 bg-[#d4af37]/3 rounded-full scale-95 border border-[#d4af37]/5 animate-pulse" />
            <div className="absolute w-[1px] h-full bg-neutral-900/40 left-1/2" />
            <div className="absolute h-[1px] w-full bg-neutral-900/40 top-1/2" />

            {/* Custom SVG Architecture Vector Blueprint shape */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-2 text-neutral-800/60" preserveAspectRatio="none">
              <path 
                d={tourConfig.blueprintSvgPath} 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.2" 
                strokeDasharray="2 3"
              />
              <rect x="5" y="5" width="90" height="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 15" fill="none" opacity="0.3" />
            </svg>

            {/* Directional Radar Camera cone, rotated in sync with active viewAngle */}
            <div 
              className="absolute w-28 h-28 pointer-events-none transition-transform duration-100"
              style={{
                left: `calc(${currentRoom.blueprintCoords.x}% - 56px)`,
                top: `calc(${currentRoom.blueprintCoords.y}% - 56px)`,
                transform: `rotate(${viewAngle}deg)`,
              }}
            >
              {/* Pie cone representing FOV */}
              <div 
                className="w-full h-full bg-gradient-to-t from-transparent via-[#d4af37]/8 to-[#d4af37]/25"
                style={{
                  clipPath: 'polygon(50% 50%, 20% 0%, 80% 0%)'
                }}
              />
            </div>

            {/* Clickable room markers on the blueprint */}
            {tourConfig.rooms.map(room => (
              <button
                key={room.id}
                onClick={() => handleRoomTransition(room.id)}
                onMouseEnter={() => triggerSound('chirp')}
                title={room.name}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                style={{
                  left: `${room.blueprintCoords.x}%`,
                  top: `${room.blueprintCoords.y}%`
                }}
              >
                <span className={`block w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                  room.id === currentRoomId 
                    ? 'bg-[#d4af37] border-white scale-110 shadow-[0_0_8px_#d4af37]' 
                    : 'bg-black/90 border-[#d4af37]/60 group-hover:bg-[#d4af37]/25 hover:border-[#d4af37]'
                }`}>
                  <span className={`block w-1.5 h-1.5 rounded-full ${room.id === currentRoomId ? 'bg-black' : 'bg-[#d4af37]/85'}`} />
                </span>
                
                {/* Micro tooltip */}
                <span className="hidden group-hover:block absolute bottom-5 left-1/2 -translate-x-1/2 bg-black border border-neutral-800 text-[7px] font-mono text-white whitespace-nowrap px-1 rounded uppercase tracking-wider shadow-md select-none">
                  {room.name.split(' ').slice(-2).join(' ')}
                </span>
              </button>
            ))}

          </div>

          <div className="w-full mt-2.5 flex items-center justify-between text-[7px] font-mono text-neutral-500 uppercase tracking-widest">
            <span>X_COORD: {Math.round(currentRoom.blueprintCoords.x * 2.4)}m</span>
            <span>Y_COORD: {Math.round(currentRoom.blueprintCoords.y * 3.1)}m</span>
          </div>
        </div>

      </div>
    </div>
  );
}
