import Navigation from '@/components/Navigation';
import Footer from '@/components/sections/Footer';
import Link from 'next/link';
import { Compass, Shield, Award, Globe, ArrowRight, Layers, Cpu, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About HORIZON — Architectural Legacy & Atelier',
  description: 'Learn about HORIZON atelier philosophy, structural mastery, leadership, and global architectural studios.',
};

export default function AboutPage() {
  const principles = [
    {
      num: '01',
      title: 'Tectonic Honesty',
      desc: 'We reject decorative superficiality. Every structural line, post-tensioned beam, and monolithic stone mass exists for structural purpose and poetic clarity.'
    },
    {
      num: '02',
      title: 'Centennial Permanence',
      desc: 'Engineered not for speculative cycles, but for century-spanning endurance. Our materials are tested against seismic, aerodynamic, and environmental extremes.'
    },
    {
      num: '03',
      title: 'Radical Minimalism',
      desc: 'Precision Swiss geometry stripped of superfluous ornament. Monolithic surfaces, razor-sharp shadow gaps, and zero-radius transitions define our visual lexicon.'
    },
    {
      num: '04',
      title: 'Biophilic Integration',
      desc: 'Synthesizing dense vertical architecture with living ecosystems. Passive solar orientation, wind harvesting, and cascading private sky gardens.'
    }
  ];

  const leadership = [
    {
      name: 'Alexander Sterling, RIBA',
      role: 'Founding Principal & Chief Design Director',
      bio: 'Former lead architect at Foster + Partners and Zaha Hadid Architects. Over 28 years directing landmark supertall skyscrapers across Zurich, London, and Tokyo.',
      accolade: 'Pritzker Architecture Prize Nominee (2024)'
    },
    {
      name: 'Dr. Helena Rostova, Ph.D.',
      role: 'Principal Partner & Head of Structural Engineering',
      bio: 'Pioneered ultra-high performance post-tensioned diagrid cores at ETH Zurich. Published 40+ papers on aerodynamic vortex shedding in supertall structures.',
      accolade: 'RIBA International Award of Excellence'
    },
    {
      name: 'Kenji Takahashi',
      role: 'Director of Parametric Computation & Tectonics',
      bio: 'Leads computational morphogenesis, robotic stone carving interfaces, and aerodynamic wind tunnel physics simulations across all HORIZON developments.',
      accolade: 'AIA Innovation Medal'
    }
  ];

  const studios = [
    { city: 'Zurich', region: 'Global Headquarters', address: 'Bahnhofstrasse 48, 8001 Zürich', coord: '47.3769° N, 8.5417° E' },
    { city: 'Tokyo', region: 'Asia-Pacific Atelier', address: '6-10-1 Roppongi, Minato City, Tokyo', coord: '35.6628° N, 139.7314° E' },
    { city: 'New York', region: 'Americas Studio', address: '520 West 28th St, Chelsea, NY 10001', coord: '40.7516° N, 74.0044° W' },
    { city: 'London', region: 'European Atelier', address: '100 Bishopsgate, London EC2N 4AG', coord: '51.5155° N, 0.0818° W' },
    { city: 'Dubai', region: 'Middle East Studio', address: 'DIFC Gate Precinct 4, Dubai', coord: '25.2048° N, 55.2708° E' }
  ];

  const awards = [
    { year: '2025', title: 'World Architecture Festival (WAF)', category: 'Supertall Project of the Year' },
    { year: '2024', title: 'Council on Tall Buildings and Urban Habitat (CTBUH)', category: 'Best Tall Building Innovation Award' },
    { year: '2024', title: 'RIBA International Award of Excellence', category: 'Architectural Craft & Structural Tectonics' },
    { year: '2023', title: 'AIA Gold Medal Finalist', category: 'Masterplanning & Sustainable Landmark' }
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#0EA5E9] selection:text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-44 pb-24 md:pt-52 md:pb-36 px-6 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.12),transparent_70%)] pointer-events-none" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-2 h-2 bg-[#0EA5E9]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#0EA5E9] font-mono">
              Atelier Profile & Legacy
            </span>
          </div>

          <h1 className="font-cinzel text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-10 max-w-4xl">
            Form Dictated by Eternity.
          </h1>

          <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-3xl mb-12">
            HORIZON is a multidisciplinary architectural atelier and structural engineering laboratory. 
            We design and realize monumental residential superstructures, private sky villas, and civic landmarks 
            that redefine vertical living on the global stage.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/10">
            <div>
              <div className="font-cinzel text-3xl md:text-4xl text-white mb-1">1998</div>
              <div className="text-[9px] uppercase tracking-widest text-[#64748B]">Founded in Zurich</div>
            </div>
            <div>
              <div className="font-cinzel text-3xl md:text-4xl text-[#0EA5E9] mb-1">420m</div>
              <div className="text-[9px] uppercase tracking-widest text-[#64748B]">Peak Height Realized</div>
            </div>
            <div>
              <div className="font-cinzel text-3xl md:text-4xl text-white mb-1">18+</div>
              <div className="text-[9px] uppercase tracking-widest text-[#64748B]">Global Monoliths</div>
            </div>
            <div>
              <div className="font-cinzel text-3xl md:text-4xl text-[#0EA5E9] mb-1">100%</div>
              <div className="text-[9px] uppercase tracking-widest text-[#64748B]">LEED Platinum Portfolio</div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Philosophy & Pillars */}
      <section className="py-28 md:py-40 px-6 bg-[#09090B] border-b border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-20">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#0EA5E9] font-mono block mb-4">
              Structural Tectonics
            </span>
            <h2 className="font-cinzel text-3xl md:text-5xl text-white">The Four Tectonic Pillars</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((p) => (
              <div 
                key={p.num} 
                className="bg-[#11131F]/60 border border-white/10 p-8 md:p-12 hover:border-[#0EA5E9]/50 transition-colors"
              >
                <div className="flex justify-between items-center mb-8">
                  <span className="text-sm font-mono text-[#0EA5E9]">{p.num}</span>
                  <div className="w-4 h-[1px] bg-white/20" />
                </div>
                <h3 className="font-cinzel text-2xl text-white mb-4">{p.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principals & Leadership */}
      <section className="py-28 md:py-40 px-6 bg-black border-b border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-20">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#0EA5E9] font-mono block mb-4">
              Atelier Leadership
            </span>
            <h2 className="font-cinzel text-3xl md:text-5xl text-white">Master Architects & Engineers</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {leadership.map((leader, i) => (
              <div 
                key={i} 
                className="bg-[#0F172A] border border-white/10 p-8 md:p-10 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[9px] uppercase tracking-widest text-[#0EA5E9] mb-4">
                    {leader.accolade}
                  </div>
                  <h3 className="font-cinzel text-2xl text-white mb-2">{leader.name}</h3>
                  <div className="text-[10px] uppercase tracking-widest text-white/50 mb-6 font-mono">
                    {leader.role}
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed mb-8">
                    {leader.bio}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 text-[9px] uppercase tracking-widest text-white/40 font-mono">
                  Principal Partner // HORIZON
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Studios Matrix */}
      <section className="py-28 md:py-40 px-6 bg-[#09090B] border-b border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#0EA5E9] font-mono block mb-4">
                Global Footprint
              </span>
              <h2 className="font-cinzel text-3xl md:text-5xl text-white">Atelier Network</h2>
            </div>
            <p className="text-sm text-white/50 max-w-md">
              Collaborating seamlessly across timezones with dedicated private client partners in Zurich, Tokyo, New York, London, and Dubai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studios.map((studio, idx) => (
              <div 
                key={idx} 
                className="p-8 border border-white/10 bg-black/40 hover:border-white/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-cinzel text-2xl text-white">{studio.city}</h3>
                  <span className="text-[9px] uppercase font-mono text-[#0EA5E9] px-2 py-1 border border-[#0EA5E9]/30">
                    Active
                  </span>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-white/50 mb-2 font-mono">
                  {studio.region}
                </div>
                <p className="text-sm text-white/70 mb-4">{studio.address}</p>
                <div className="text-[10px] font-mono text-white/40">{studio.coord}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Honors */}
      <section className="py-28 md:py-36 px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#0EA5E9] font-mono block mb-4">
              Industry Distinctions
            </span>
            <h2 className="font-cinzel text-3xl md:text-5xl text-white">Honors & Accreditations</h2>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {awards.map((award, i) => (
              <div key={i} className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-6">
                  <span className="font-mono text-sm text-[#0EA5E9]">{award.year}</span>
                  <span className="font-cinzel text-lg md:text-xl text-white">{award.title}</span>
                </div>
                <span className="text-xs uppercase tracking-widest text-white/50 font-mono">
                  {award.category}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center bg-white text-black px-12 py-5 text-xs uppercase tracking-widest font-bold hover:bg-[#0EA5E9] hover:text-white transition-colors duration-300"
            >
              Initiate Private Atelier Dialogue <ArrowRight size={16} className="ml-3" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
