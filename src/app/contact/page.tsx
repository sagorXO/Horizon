import Navigation from '@/components/Navigation';
import Footer from '@/components/sections/Footer';
import InquireForm from '@/components/InquireForm';
import { Mail, Phone, MapPin, Clock, ShieldCheck, Lock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Private Inquiries — HORIZON Atelier',
  description: 'Request a private consultation, schedule an architectural review, or connect with our global concierge desk.',
};

export default function ContactPage() {
  const globalDesks = [
    {
      region: 'Zurich (Headquarters)',
      address: 'Bahnhofstrasse 48, 8001 Zürich, Switzerland',
      phone: '+41 44 220 1800',
      email: 'zurich@horizon-atelier.ch',
      hours: '08:00 – 18:00 CET'
    },
    {
      region: 'New York Atelier',
      address: '520 West 28th St, Chelsea, NY 10001',
      phone: '+1 (212) 840-7200',
      email: 'newyork@horizon-atelier.com',
      hours: '09:00 – 18:00 EST'
    },
    {
      region: 'Tokyo Atelier',
      address: '6-10-1 Roppongi, Minato City, Tokyo 106-6108',
      phone: '+81 3 5770 9400',
      email: 'tokyo@horizon-atelier.jp',
      hours: '09:00 – 19:00 JST'
    },
    {
      region: 'London Studio',
      address: '100 Bishopsgate, London EC2N 4AG',
      phone: '+44 20 7946 0880',
      email: 'london@horizon-atelier.co.uk',
      hours: '08:30 – 17:30 GMT'
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#0EA5E9] selection:text-white">
      <Navigation />

      {/* Header Section */}
      <section className="relative pt-44 pb-20 md:pt-52 md:pb-28 px-6 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.12),transparent_70%)] pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="w-2 h-2 bg-[#0EA5E9]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#0EA5E9] font-mono">
              Inquiry Hub & Private Client Desk
            </span>
          </div>

          <h1 className="font-cinzel text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6">
            Initiate Consultation
          </h1>

          <p className="text-base md:text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
            Direct access to our founding partners, structural directors, and private residence acquisition concierge.
          </p>
        </div>
      </section>

      {/* Main Consultation Form & Contact Matrix */}
      <section className="py-24 md:py-36 px-6 bg-[#09090B] border-b border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left 7 Cols: Form */}
            <div className="lg:col-span-7 bg-[#0F172A] p-8 md:p-14 border border-white/10">
              <div className="mb-10 pb-6 border-b border-white/10">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#0EA5E9] block mb-2">
                  Acquisition & Commissioning Form
                </span>
                <h2 className="font-cinzel text-2xl md:text-3xl text-white">
                  Confidential Inquiry
                </h2>
              </div>
              <InquireForm />
            </div>

            {/* Right 5 Cols: Desks & Security Guarantee */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Security & Confidentiality Badge */}
              <div className="bg-[#11131F] border border-white/10 p-8">
                <div className="flex items-center space-x-3 mb-4 text-[#0EA5E9]">
                  <Lock size={18} />
                  <span className="text-xs uppercase font-mono tracking-widest font-semibold">
                    Client Confidentiality Guarantee
                  </span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  All correspondence is strictly protected under institutional non-disclosure standards. 
                  Inquiries are routed exclusively to senior partners.
                </p>
              </div>

              {/* Global Desks */}
              <div className="bg-[#0F172A] border border-white/10 p-8">
                <h3 className="font-cinzel text-xl text-white mb-6 pb-4 border-b border-white/10">
                  Global Ateliers
                </h3>

                <div className="space-y-6">
                  {globalDesks.map((desk, idx) => (
                    <div key={idx} className="border-b border-white/5 pb-5 last:border-0 last:pb-0">
                      <h4 className="font-cinzel text-base text-white mb-1">{desk.region}</h4>
                      <p className="text-xs text-white/60 mb-2">{desk.address}</p>
                      <div className="flex flex-col space-y-1 text-xs font-mono text-white/50">
                        <span className="text-[#0EA5E9]">{desk.phone}</span>
                        <span>{desk.email}</span>
                        <span className="text-[10px] text-white/40">{desk.hours}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Press & Media */}
              <div className="p-8 border border-white/10 bg-black text-xs font-mono text-white/60 space-y-2">
                <div className="text-[10px] uppercase tracking-widest text-[#0EA5E9]">Press & Academic Inquiries</div>
                <div>press@horizon-atelier.com</div>
                <div className="text-[10px] text-white/40">Response window: 24 Business Hours</div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
