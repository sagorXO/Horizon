'use client';

export default function GallerySection() {
  return (
    <section id="gallery" className="bg-white py-36 md:py-48 px-6 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-[10px] tracking-widest text-[#0EA5E9] uppercase mb-4 block">
              The Architecture
            </span>
            <h2 className="font-cinzel text-4xl md:text-5xl text-[#0F172A]">Crafted in Every Detail</h2>
          </div>
          <div className="md:pb-2">
            <a href="/inquire" className="text-[10px] uppercase tracking-widest text-[#0F172A] border-b border-[#0F172A] pb-1 hover:text-[#0EA5E9] hover:border-[#0EA5E9] transition-colors">
              Explore Portfolio
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 h-auto md:h-[800px]">
          {/* Left tall image */}
          <div className="md:col-span-2 h-[500px] md:h-full bg-[#0F172A] relative group overflow-hidden">
            <img src="/logo.png" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 opacity-10" style={{ filter: 'invert(1)' }} />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
          </div>
          
          {/* Right column */}
          <div className="md:col-span-1 flex flex-col gap-6 md:gap-10 h-full">
            <div className="h-[400px] md:h-1/2 bg-[#1E293B] relative group overflow-hidden">
              <img src="/logo.png" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 opacity-10" style={{ filter: 'invert(1)' }} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
            </div>
            <div className="h-[400px] md:h-1/2 bg-[#0F172A] relative group overflow-hidden">
              <img src="/logo.png" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 opacity-10" style={{ filter: 'invert(1)' }} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
