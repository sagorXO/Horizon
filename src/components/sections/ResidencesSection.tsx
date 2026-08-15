'use client';

import { Bed, Bath, Maximize } from 'lucide-react';

export default function ResidencesSection() {
  const residences = [
    {
      name: 'Garden Villa',
      category: 'Signature Collection',
      beds: 3,
      baths: 3.5,
      sqft: 3850,
      price: 'From $4.8M',
      tag: 'AVAILABLE',
      features: ['Private Terrace', 'Plunge Pool', 'Direct Elevator Access']
    },
    {
      name: 'Horizon Sky Suite',
      category: 'Sky Collection',
      beds: 4,
      baths: 4.5,
      sqft: 5200,
      price: 'From $6.5M',
      tag: 'EXCLUSIVE',
      features: ['Panoramic Corner Views', 'Wine Cellar', 'Chef\'s Kitchen']
    },
    {
      name: 'Crown Penthouse',
      category: 'The Apex',
      beds: 5,
      baths: 6.0,
      sqft: 8400,
      price: 'Price Upon Request',
      tag: 'PENTHOUSE',
      features: ['Triplex Layout', 'Private Rooftop Pool', 'Helipad Access']
    }
  ];

  return (
    <section id="residences" className="bg-black text-white py-36 md:py-48 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <span className="text-[10px] tracking-widest text-[#0EA5E9] uppercase mb-4 block">
            The Collections
          </span>
          <h2 className="font-cinzel text-4xl md:text-5xl">Elevated Living</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {residences.map((res, i) => (
            <div key={i} className="bg-[#0F172A] p-8 md:p-10 flex flex-col h-full border border-white/5 transition-colors hover:border-white/20">
              <div className="flex justify-between items-start mb-12">
                <span className="text-[9px] tracking-widest uppercase border border-[#0EA5E9] text-[#0EA5E9] px-3 py-1">
                  {res.tag}
                </span>
              </div>
              
              <div className="mb-8">
                <span className="text-[10px] uppercase tracking-widest text-[#64748B] block mb-2">
                  {res.category}
                </span>
                <h3 className="font-cinzel text-3xl">{res.name}</h3>
              </div>

              <div className="flex items-center space-x-6 mb-12 text-sm text-white/70">
                <div className="flex items-center space-x-2">
                  <Bed size={16} /> <span>{res.beds}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bath size={16} /> <span>{res.baths}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Maximize size={16} /> <span>{res.sqft}</span>
                </div>
              </div>

              <div className="mb-12 flex-grow">
                <ul className="space-y-3">
                  {res.features.map((feat, j) => (
                    <li key={j} className="text-sm text-white/50 flex items-center before:content-[''] before:w-1 before:h-1 before:bg-[#0EA5E9] before:mr-3">
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-8 border-t border-white/10 flex flex-col space-y-6">
                <div className="font-cinzel text-2xl">{res.price}</div>
                <a href="/inquire" className="text-[10px] uppercase tracking-widest text-[#0EA5E9] hover:text-white transition-colors flex items-center">
                  View Details <span className="ml-2">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
