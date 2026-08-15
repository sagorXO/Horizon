'use client';

import Link from 'next/link';

export default function ContactCTASection() {
  return (
    <section className="bg-black text-white py-48 px-6 text-center border-t border-white/10">
      <div className="container mx-auto max-w-3xl">
        <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl mb-8">
          Begin Your Horizon Journey
        </h2>
        <p className="text-[#64748B] mb-16 max-w-xl mx-auto text-lg">
          Private consultations available by appointment.
        </p>
        
        <Link 
          href="/inquire"
          className="inline-block bg-white text-black px-12 py-5 text-xs uppercase tracking-widest font-bold hover:bg-[#0EA5E9] hover:text-white transition-colors duration-300"
        >
          Request Consultation
        </Link>
      </div>
    </section>
  );
}
