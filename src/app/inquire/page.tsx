import Navigation from '@/components/Navigation';
import Footer from '@/components/sections/Footer';
import InquireForm from '@/components/InquireForm';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Request Consultation — HORIZON Atelier',
  description: 'Confidential inquiry portal for private residence acquisitions and architectural commissions.',
};

export default function InquirePage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#0EA5E9] selection:text-white">
      <Navigation />

      <section className="pt-40 pb-24 px-6 flex flex-col items-center">
        <div className="w-full max-w-3xl mb-12 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center text-[10px] uppercase font-mono tracking-widest text-white/50 hover:text-[#0EA5E9] transition-colors mb-10"
          >
            <ArrowLeft size={14} className="mr-2" /> Back to Main Showcase
          </Link>
          
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-2 h-2 bg-[#0EA5E9]" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#0EA5E9]">
              Confidential Private Desk
            </span>
          </div>

          <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Private Consultation
          </h1>

          <p className="text-sm text-white/60 max-w-xl mx-auto font-light">
            Inquire regarding available residence tiers, custom penthouse configurations, or full architectural commissions.
          </p>
        </div>
        
        <div className="w-full max-w-2xl bg-[#0F172A] p-8 md:p-14 border border-white/10">
          <InquireForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
