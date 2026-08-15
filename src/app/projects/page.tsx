'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/sections/Footer';
import Link from 'next/link';
import { ArrowRight, Layers, MapPin, Building2, Compass, Ruler } from 'lucide-react';
import { PROJECTS_DATA, type Project } from '@/lib/projectsData';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Supertall', 'Residential', 'Cultural', 'Penthouse'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#0EA5E9] selection:text-white">
      <Navigation />

      {/* Header Section */}
      <section className="relative pt-44 pb-20 md:pt-52 md:pb-28 px-6 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(14,165,233,0.1),transparent_70%)] pointer-events-none" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-2 h-2 bg-[#0EA5E9]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#0EA5E9] font-mono">
              Portfolio & Selected Works
            </span>
          </div>

          <h1 className="font-cinzel text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-8 max-w-4xl">
            Monumental Architecture.
          </h1>

          <p className="text-base md:text-lg text-white/70 font-light leading-relaxed max-w-2xl">
            Explore our global portfolio of supertall residential landmarks, floating alpine villas, 
            and civic cultural pavilions defined by zero-tolerance engineering.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-3 mt-12 pt-8 border-t border-white/10">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 text-[10px] uppercase tracking-widest font-mono transition-all duration-200 border ${
                    isActive
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-transparent text-white/60 border-white/20 hover:border-white hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="py-24 md:py-36 px-6 bg-[#09090B]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {filteredProjects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group bg-[#0F172A] border border-white/10 flex flex-col justify-between hover:border-[#0EA5E9]/60 transition-all duration-300 overflow-hidden"
              >
                {/* Monolithic Visual Frame */}
                <div className="relative h-72 md:h-80 w-full bg-[#18181B] flex items-center justify-center overflow-hidden border-b border-white/10">
                  {/* Subtle Grid blueprint motif */}
                  <div 
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
                      backgroundSize: '32px 32px'
                    }}
                  />
                  
                  {/* Watermark logo */}
                  <img
                    src="/logo.png"
                    alt=""
                    className="absolute w-28 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none"
                    style={{ filter: 'invert(1)' }}
                  />

                  {/* Badges */}
                  <div className="absolute top-6 left-6 flex items-center space-x-3">
                    <span className="text-[9px] uppercase font-mono tracking-widest bg-black/80 px-3 py-1 text-[#0EA5E9] border border-[#0EA5E9]/30">
                      {project.category}
                    </span>
                    <span className="text-[9px] uppercase font-mono tracking-widest bg-black/80 px-3 py-1 text-white/70 border border-white/10">
                      {project.year}
                    </span>
                  </div>

                  <div className="absolute bottom-6 right-6">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-white/50 bg-black/60 px-3 py-1 border border-white/10">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-8 md:p-10 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center space-x-2 text-[10px] uppercase font-mono tracking-widest text-white/50 mb-3">
                      <MapPin size={12} className="text-[#0EA5E9]" />
                      <span>{project.location}</span>
                    </div>

                    <h2 className="font-cinzel text-2xl md:text-3xl text-white group-hover:text-[#0EA5E9] transition-colors mb-3">
                      {project.title}
                    </h2>

                    <p className="text-xs text-white/60 leading-relaxed mb-6 font-light">
                      {project.subtitle}
                    </p>

                    {/* Specs Matrix */}
                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 mb-6 text-[10px] font-mono">
                      <div>
                        <span className="text-white/40 block mb-1">HEIGHT / LEVELS</span>
                        <span className="text-white font-semibold">{project.height} · {project.floors}</span>
                      </div>
                      <div>
                        <span className="text-white/40 block mb-1">GROSS AREA</span>
                        <span className="text-white font-semibold">{project.grossArea}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#0EA5E9] font-mono group-hover:text-white transition-colors pt-2">
                    <span>Inspect Tectonic Blueprint</span>
                    <ArrowRight size={14} className="transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Strip */}
          <div className="mt-24 p-12 bg-black border border-white/10 text-center flex flex-col items-center">
            <h3 className="font-cinzel text-3xl md:text-4xl text-white mb-4">
              Commission a Bespoke Monolith
            </h3>
            <p className="text-sm text-white/60 max-w-xl mb-8">
              HORIZON accepts a strictly limited number of private architectural commissions per calendar year.
            </p>
            <Link
              href="/contact"
              className="bg-white text-black px-10 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-[#0EA5E9] hover:text-white transition-colors"
            >
              Request Acquisition Consultation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
