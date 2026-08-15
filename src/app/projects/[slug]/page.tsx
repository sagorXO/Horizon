import Navigation from '@/components/Navigation';
import Footer from '@/components/sections/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ShieldCheck, MapPin, Building2, Layers, CheckCircle2, Ruler } from 'lucide-react';
import { PROJECTS_DATA, getProjectBySlug } from '@/lib/projectsData';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found — HORIZON' };

  return {
    title: `${project.title} — HORIZON Architectural Portfolio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#0EA5E9] selection:text-white">
      <Navigation />

      {/* Header Banner */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 px-6 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.12),transparent_70%)] pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <Link
            href="/projects"
            className="inline-flex items-center text-[10px] uppercase font-mono tracking-widest text-white/50 hover:text-[#0EA5E9] transition-colors mb-10"
          >
            <ArrowLeft size={14} className="mr-2" /> Back to Portfolio Index
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-[10px] uppercase font-mono tracking-widest bg-[#0EA5E9]/10 text-[#0EA5E9] border border-[#0EA5E9]/30 px-3 py-1">
              {project.category}
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-white/60 bg-white/5 border border-white/10 px-3 py-1">
              {project.year}
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1">
              {project.status}
            </span>
          </div>

          <h1 className="font-cinzel text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 max-w-4xl">
            {project.title}
          </h1>

          <p className="text-lg md:text-xl text-white/70 font-light max-w-3xl leading-relaxed">
            {project.subtitle}
          </p>

          {/* Key Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-white/10">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 block mb-1">
                LOCATION
              </span>
              <span className="text-sm font-mono text-white flex items-center">
                <MapPin size={12} className="mr-1 text-[#0EA5E9]" /> {project.location}
              </span>
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 block mb-1">
                HEIGHT / LEVELS
              </span>
              <span className="text-sm font-mono text-white">
                {project.height} · {project.floors}
              </span>
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 block mb-1">
                GROSS FLOOR AREA
              </span>
              <span className="text-sm font-mono text-white">
                {project.grossArea}
              </span>
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 block mb-1">
                STRUCTURAL LEAD
              </span>
              <span className="text-xs font-mono text-white/80">
                {project.structuralEngineer.split('&')[0]}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Blueprint Visual Preview */}
      <section className="py-16 md:py-24 px-6 bg-[#09090B] border-b border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="relative aspect-[16/9] w-full bg-[#11131F] border border-white/10 flex flex-col items-center justify-center overflow-hidden">
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'linear-gradient(#0EA5E9 1px, transparent 1px), linear-gradient(90deg, #0EA5E9 1px, transparent 1px)',
                backgroundSize: '48px 48px'
              }}
            />

            <div className="relative z-10 text-center p-8">
              <div className="w-12 h-12 border border-[#0EA5E9] flex items-center justify-center mx-auto mb-6">
                <Layers size={24} className="text-[#0EA5E9]" />
              </div>
              <div className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#0EA5E9] mb-2">
                Structural Blueprint & CAD Wireframe
              </div>
              <div className="font-cinzel text-2xl md:text-3xl text-white mb-4">
                {project.title} — Elevation & Spatial Geometry
              </div>
              <div className="text-xs text-white/50 font-mono">
                CAD ID: HRZ-{project.slug.toUpperCase()} // REV 4.2
              </div>
            </div>

            <div className="absolute bottom-4 left-6 text-[9px] font-mono text-white/30">
              SCALE: 1:100 ARCHITECTURAL PROJECTION
            </div>
            <div className="absolute bottom-4 right-6 text-[9px] font-mono text-[#0EA5E9]">
              TECTONIC INTEGRITY: VERIFIED
            </div>
          </div>
        </div>
      </section>

      {/* Narrative & Engineering Deep Dive */}
      <section className="py-24 md:py-36 px-6 bg-black border-b border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left 2 Cols: Narrative */}
            <div className="lg:col-span-2 space-y-8">
              <div className="border-b border-white/10 pb-6">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#0EA5E9] block mb-3">
                  Architectural Narrative
                </span>
                <h2 className="font-cinzel text-3xl md:text-4xl text-white">
                  Concept, Structural Physics & Craft
                </h2>
              </div>

              <p className="text-base md:text-lg text-white/80 font-light leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-6 pt-4">
                {project.narrative.map((paragraph, idx) => (
                  <p key={idx} className="text-sm text-white/65 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Key Features */}
              <div className="pt-8 border-t border-white/10">
                <h3 className="font-cinzel text-xl text-white mb-6">Key Engineering Innovations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start space-x-3 p-4 bg-[#0F172A] border border-white/5">
                      <CheckCircle2 size={16} className="text-[#0EA5E9] shrink-0 mt-0.5" />
                      <span className="text-xs text-white/80 leading-relaxed font-mono">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 1 Col: Specs & Materials */}
            <div className="space-y-8">
              {/* Tectonic Specs Card */}
              <div className="bg-[#0F172A] border border-white/10 p-8">
                <h3 className="font-cinzel text-xl text-white mb-6 pb-4 border-b border-white/10">
                  Engineering Benchmarks
                </h3>
                <div className="space-y-5 text-xs font-mono">
                  {project.blueprintStats.map((stat, i) => (
                    <div key={i} className="border-b border-white/5 pb-3">
                      <span className="text-white/40 block text-[9px] uppercase tracking-wider mb-1">
                        {stat.label}
                      </span>
                      <span className="text-white font-semibold">{stat.value}</span>
                    </div>
                  ))}
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase tracking-wider mb-1">
                      FACADE SYSTEM
                    </span>
                    <span className="text-white/90 leading-relaxed block">{project.facadeSystem}</span>
                  </div>
                </div>
              </div>

              {/* Materials Card */}
              <div className="bg-[#0F172A] border border-white/10 p-8">
                <h3 className="font-cinzel text-xl text-white mb-6 pb-4 border-b border-white/10">
                  Materials Palette
                </h3>
                <ul className="space-y-3 text-xs font-mono">
                  {project.materials.map((mat, i) => (
                    <li key={i} className="flex items-center text-white/70 before:content-[''] before:w-1.5 before:h-1.5 before:bg-[#0EA5E9] before:mr-3">
                      {mat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Acquisition CTA */}
              <div className="bg-[#11131F] border border-[#0EA5E9]/40 p-8 text-center">
                <h4 className="font-cinzel text-xl text-white mb-2">Private Acquisition</h4>
                <p className="text-xs text-white/60 mb-6 font-light">
                  Direct concierge consultations available for remaining residences.
                </p>
                <Link
                  href="/contact"
                  className="block w-full bg-white text-black py-4 text-[10px] uppercase font-bold tracking-widest hover:bg-[#0EA5E9] hover:text-white transition-colors"
                >
                  Inquire For Portfolio Access
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
