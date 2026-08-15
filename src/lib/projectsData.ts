export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: 'Supertall' | 'Residential' | 'Cultural' | 'Penthouse';
  year: string;
  location: string;
  height: string;
  floors: string;
  grossArea: string;
  status: 'Completed' | 'Under Construction' | 'Pre-Commission';
  structuralEngineer: string;
  facadeSystem: string;
  materials: string[];
  tagline: string;
  description: string;
  narrative: string[];
  keyFeatures: string[];
  blueprintStats: { label: string; value: string }[];
}

export const PROJECTS_DATA: Project[] = [
  {
    slug: 'the-apex-tower',
    title: 'The Apex Spire',
    subtitle: '88-Story Monolithic Residential Superstructure',
    category: 'Supertall',
    year: '2026',
    location: 'Metropolitan Core, Financial District',
    height: '420 Meters',
    floors: '88 Levels',
    grossArea: '3.8M Sq Ft',
    status: 'Under Construction',
    structuralEngineer: 'Arup International & Horizon Structural Labs',
    facadeSystem: 'Unitized Triple-Glazed Low-E Acoustic Curtain Wall',
    materials: [
      'High-Strength Post-Tensioned Concrete (C80/95)',
      'Aero-Grade Anodized Titanium Mullions',
      'Solar-Responsive Photovoltaic Glazing',
      'Honed Charcoal Basalt Cladding'
    ],
    tagline: 'A sculptural monument piercing the stratosphere with zero-tolerance engineering.',
    description: 'The Apex Spire represents the pinnacle of vertical living. Rising 420 meters above the urban canopy, this monolithic skyscraper utilizes an aerodynamic aerodynamic diagrid core that dissipates high-altitude wind vortexes while allowing 360-degree unobstructed column-free interior floor plates.',
    narrative: [
      'Designed with uncompromising modernist austerity, the spire is anchored into deep subterranean bedrock by 80-meter post-tensioned friction pilings. The superstructure utilizes an ultra-high performance concrete core coupled with perimeter composite mega-columns.',
      'The exterior skin features unitized double-curved glazing panels coated in nanotech low-emissivity ceramic frit, optimizing thermodynamic insulation and providing world-class acoustic dampening against urban resonance.',
      'At level 88 sits the private Sky Observatory and crown tuned mass damper, visible through an architectural glass atrium that serves as both structural counterweight and sculptural centerpiece.'
    ],
    keyFeatures: [
      '80m deep bedrock anchor foundation',
      'Aerodynamic wind-dissipating tapering geometry',
      'Column-free continuous panoramic glass corners',
      'Integrated rainwater harvesting & greywater bio-filtration',
      'High-speed pressurized double-deck destination elevators'
    ],
    blueprintStats: [
      { label: 'Wind Load Resistance', value: 'Category 5 (280 km/h)' },
      { label: 'Thermal Performance', value: 'U-Value 0.85 W/m²K' },
      { label: 'Acoustic Rating', value: 'STC 54 dB Isolation' },
      { label: 'Energy Efficiency', value: 'LEED Platinum Certified' }
    ]
  },
  {
    slug: 'monolith-residence',
    title: 'Monolith Alpine Villa',
    subtitle: 'Cantilevered Natural Stone & Exposed Concrete Sanctuary',
    category: 'Residential',
    year: '2025',
    location: 'Engadin Valley, Switzerland',
    height: '18 Meters',
    floors: '3 Levels',
    grossArea: '14,200 Sq Ft',
    status: 'Completed',
    structuralEngineer: 'Schlaich Bergermann Partner',
    facadeSystem: 'Frameless Structural Triple-Laminated Glass & Swiss Gneiss',
    materials: [
      'Locally Quarried Valser Quartzite',
      'Board-Formed Carbon-Neutral Concrete',
      'Brushed Stainless Steel Hardware',
      'Thermally Modified Swiss Larch'
    ],
    tagline: 'An architectural fortress carved into mountain bedrock, floating above alpine vistas.',
    description: 'Cantilevered 14 meters over a sheer granite precipice, the Monolith Alpine Villa reinterprets high-altitude residential architecture. Massive stone monoliths frame panoramic vistas of snowcapped peaks, balancing primeval stone mass with weightless floating glass volumes.',
    narrative: [
      'Constructed directly upon pre-existing rock outcrops, the villa minimizes excavation footprint through an inverted cantilever steel truss anchored by high-tensile rock anchors.',
      'The interior program flows around a central geothermal thermal core. High thermal mass walls store ambient solar gain during day cycles, passively radiating warmth through sub-zero alpine nights.',
      'Floor-to-ceiling motorized frameless sliding glass panels disappear into stone pockets, converting the primary living pavilion into an open-air promontory during summer months.'
    ],
    keyFeatures: [
      '14m unsupported structural cantilever span',
      'Geothermal ground-source heat pump matrix',
      'Triple-sealed frameless glass facade system',
      'Private subterranean wine vault carved in live bedrock',
      'Hidden 25m heated cantilever infinity lap pool'
    ],
    blueprintStats: [
      { label: 'Snow Load Capacity', value: '8.5 kN/m² Heavy Alpine' },
      { label: 'Thermal Envelope', value: 'Passivhaus Standard' },
      { label: 'Solar Capture Ratio', value: '112% Net-Positive' },
      { label: 'Cantilever Deflection', value: '< 4.2mm under full load' }
    ]
  },
  {
    slug: 'aether-pavilion',
    title: 'Aether Cultural Pavilion',
    subtitle: 'Parametric Titanium Canopy & Museum of Contemporary Art',
    category: 'Cultural',
    year: '2025',
    location: 'Roppongi Arts Precinct, Tokyo',
    height: '32 Meters',
    floors: '4 Levels',
    grossArea: '95,000 Sq Ft',
    status: 'Completed',
    structuralEngineer: 'Buro Happold Engineering',
    facadeSystem: 'Custom Anodized Titanium Shingles & Structural Glass Fins',
    materials: [
      'Grade 2 Commercial Pure Titanium Plate',
      'Ultra-Clear Optiwhite Low-Iron Glass',
      'Cast Architectural Bronze Portals',
      'Polished Terrazzo Flooring with River Aggregate'
    ],
    tagline: 'A luminous cultural temple where parametric structural poetry meets Japanese craft.',
    description: 'The Aether Cultural Pavilion is a civic landmark devoted to contemporary art, performance, and public dialogue. Its diagrid titanium canopy mimics the fluid dynamics of ocean mist, filtering natural daylight through thousands of computational perforations into soaring 18-meter exhibition galleries.',
    narrative: [
      'The building structural grid utilizes four primary hyper-hollow concrete cores that support a free-spanning 60-meter column-free auditorium and grand exhibition hall.',
      'The titanium shingle skin was engineered through parametric fluid simulation to maximize natural ventilation stack effects, eliminating 45% of mechanical HVAC cooling requirements.',
      'At night, subtle fiber-optic light conduits embedded behind the titanium shingles illuminate the facade, transforming the pavilion into a glowing lantern on Tokyo skyline.'
    ],
    keyFeatures: [
      '60m column-free clear span exhibition hall',
      'Parametrically perforated acoustic titanium skin',
      'Base-isolated seismic dampening system (Level 7+ proof)',
      'Subterranean acoustically isolated recital chamber',
      'Public rooftop sculpture garden with reflecting pool'
    ],
    blueprintStats: [
      { label: 'Seismic Damping', value: 'Base Isolated 3D Dampers' },
      { label: 'Acoustic Clarity', value: 'NC-15 Concert Grade' },
      { label: 'Daylight Autonomy', value: '82% Daylight Harvested' },
      { label: 'Carbon Embodiment', value: '-38% vs Industry Benchmark' }
    ]
  },
  {
    slug: 'solaris-atrium',
    title: 'Solaris Waterfront Tower',
    subtitle: 'Biophilic Coastal Residences with Sculptural Terraces',
    category: 'Residential',
    year: '2026',
    location: 'Biscayne Bay Promenade, Miami',
    height: '210 Meters',
    floors: '54 Levels',
    grossArea: '1.6M Sq Ft',
    status: 'Under Construction',
    structuralEngineer: 'Thornton Tomasetti',
    facadeSystem: 'Curved High-Impact Hurricane Glazing & Marine-Grade Bronze',
    materials: [
      'Marine-Grade Marine Aluminum & Bronze Alloy',
      'Salt-Resistant Self-Cleaning Glass Coatings',
      'White Travertine Slab Terraces',
      'Precast Fluted Concrete Spandrels'
    ],
    tagline: 'Cascading oceanic terraces merging private sky gardens with coastal serenity.',
    description: 'Solaris Waterfront Tower reimagines coastal high-density living. Every residence enjoys deep, undulating wrap-around private terraces with integrated private plunge pools and indigenous subtropical flora, shielding interior spaces from intense tropical solar gain.',
    narrative: [
      'Designed to respond dynamically to maritime conditions, Solaris utilizes curved aero-sculpted balcony profiles that guide sea breezes into residential suites for natural cross-ventilation.',
      'The foundation incorporates advanced anti-corrosive epoxy-coated rebar and high-density marine concrete formulations rated for 150+ year immersion lifespans.',
      'A private marina dock and multi-level bayfront wellness club ground the residential tower into its coastal ecosystem.'
    ],
    keyFeatures: [
      'Wrap-around 3.5m deep private sky gardens',
      'Hurricane Category 5 impact-resistant curved glazing',
      'Private marina yacht slip access',
      'Saltwater infinity pool on level 42 overlooking bay',
      'Smart home climate modulation tuned to solar trajectory'
    ],
    blueprintStats: [
      { label: 'Impact Glass Standard', value: 'TAS 201/202/203 Certified' },
      { label: 'Wind Tunnel Pressure', value: '+/- 110 psf Extreme Zone' },
      { label: 'Thermal Shading Index', value: '68% Direct Solar Rejection' },
      { label: 'Water Recycling', value: '100% Condensate Recovery' }
    ]
  },
  {
    slug: 'zenith-penthouse',
    title: 'Zenith Crown Triplex',
    subtitle: 'The Ultimate Sky Mansion at the Top of HORIZON',
    category: 'Penthouse',
    year: '2026',
    location: 'HORIZON Tower, Floors 86-88',
    height: '415 Meters (Elevation)',
    floors: '3 Levels (Triplex)',
    grossArea: '18,500 Sq Ft',
    status: 'Pre-Commission',
    structuralEngineer: 'Horizon Structural Labs',
    facadeSystem: 'Structural Glass Spire Curtain Wall & Private Helipad Deck',
    materials: [
      'Bookmatched Calacatta Oro Italian Marble',
      'Smoked European Oak Plank Millwork',
      'Satin Gunmetal Architectural Hardware',
      'Acoustic Multi-Layer Laminated Glass'
    ],
    tagline: 'An unmatched sovereign penthouse suspended between the city lights and the stars.',
    description: 'Commanding the topmost three floors of the HORIZON Tower, the Zenith Crown Triplex represents the pinnacle of private luxury. Features an 11-meter double-height grand salon, private glass elevator, rooftop heated pool, and private cantilevered stargazing deck.',
    narrative: [
      'Crafted for the discerning international collector, the triplex features museum-grade variable LED lighting, climate-controlled art storage chambers, and military-grade biometric security access corridors.',
      'A sculptural monolithic spiral staircase crafted from a single structural steel torsion tube and cantilevered marble treads links the three residential tiers.',
      'The private rooftop terrace features a 15-meter heated glass-bottom infinity pool projecting 4 meters past the building perimeter, offering vertigo-inducing views of the city below.'
    ],
    keyFeatures: [
      '18,500 sq ft across 3 full private floorplates',
      '11-meter double-height grand entertaining salon',
      'Private glass observation elevator & discrete staff quarters',
      'Cantilevered glass-bottom rooftop infinity pool',
      'Direct FAA-compliant rooftop helipad boarding access'
    ],
    blueprintStats: [
      { label: 'Ceiling Clearance', value: '4.5m - 11.2m Double Height' },
      { label: 'Elevator Velocity', value: '10 m/s Dedicated Express' },
      { label: 'Security Grade', value: 'Bank-Vault Biometric Integration' },
      { label: 'Acoustic Sound Level', value: '< 24 dBA Quiet Luxury' }
    ]
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS_DATA.find((p) => p.slug === slug);
}
