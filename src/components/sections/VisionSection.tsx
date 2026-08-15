'use client';

export default function VisionSection() {
  const pillars = [
    { title: 'Resilience', desc: 'Engineered to withstand the tests of time and nature.' },
    { title: 'Precision', desc: 'Every angle calculated, every material flawlessly sourced.' },
    { title: 'Sustainability', desc: 'Leading the future of green architectural integration.' },
    { title: 'Privacy', desc: 'Exclusive access corridors and sound-isolated environments.' },
  ];

  return (
    <section id="vision" className="bg-white text-[#0F172A] py-36 md:py-48 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-xl">
            <span className="text-[10px] tracking-widest text-[#0EA5E9] uppercase mb-6 block">
              The Horizon Standard
            </span>
            <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl leading-tight">
              Architecture That Transcends Time
            </h2>
          </div>
          <div className="max-w-md pt-4 md:pt-12">
            <p className="text-base text-[#64748B] leading-relaxed">
              We did not just aim to build another skyscraper. We set out to redefine the relationship 
              between vertical living and the natural environment. A monumental achievement in structural 
              expression, combining brute strength with ethereal elegance.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-32">
          {pillars.map((pillar, i) => (
            <div key={i} className="flex flex-col">
              <div className="w-3 h-3 bg-[#0EA5E9] mb-6" />
              <h3 className="font-cinzel text-xl mb-4">{pillar.title}</h3>
              <p className="text-sm text-[#64748B]">{pillar.desc}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-[#0F172A]/10 pt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '100%', label: 'Renewable Energy' },
            { value: '4.2', label: 'Million Sq Ft' },
            { value: '360°', label: 'Unobstructed Views' },
            { value: 'LEED', label: 'Platinum Certified' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="font-cinzel text-4xl md:text-5xl mb-2">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-[#64748B]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
