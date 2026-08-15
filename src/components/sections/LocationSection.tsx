'use client';

export default function LocationSection() {
  const distances = [
    { name: 'Financial District', dist: '5', unit: 'min' },
    { name: 'International Airport', dist: '22', unit: 'min' },
    { name: 'Fine Dining District', dist: '3', unit: 'min' },
    { name: 'Cultural Precinct', dist: '8', unit: 'min' },
  ];

  return (
    <section id="location" className="bg-white py-36 md:py-48 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Map Placeholder */}
          <div className="w-full aspect-square bg-[#0F172A] relative flex items-center justify-center border border-[#0F172A]/10 overflow-hidden">
            {/* Subtle Grid */}
            <div className="absolute inset-0 opacity-20" 
              style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
            />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-4 h-4 bg-[#0EA5E9] shadow-[0_0_20px_rgba(14,165,233,1)] mb-4 animate-pulse" />
              <span className="text-[10px] tracking-widest uppercase text-white font-bold">Horizon</span>
            </div>
          </div>

          {/* Right: Data */}
          <div>
            <span className="text-[10px] tracking-widest text-[#0EA5E9] uppercase mb-6 block">
              The Epicenter
            </span>
            <h2 className="font-cinzel text-4xl md:text-5xl text-[#0F172A] mb-16">
              Connected to the City's Pulse
            </h2>

            <div className="flex flex-col">
              {distances.map((item, i) => (
                <div key={i} className="flex items-end justify-between border-b border-[#0F172A]/10 py-8 group">
                  <h3 className="font-cinzel text-xl md:text-2xl text-[#0F172A] group-hover:text-[#0EA5E9] transition-colors">
                    {item.name}
                  </h3>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-cinzel text-4xl md:text-5xl text-[#0F172A]">{item.dist}</span>
                    <span className="text-[10px] tracking-widest uppercase text-[#64748B]">{item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
