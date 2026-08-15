import InquireForm from '@/components/InquireForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function InquirePage() {
  return (
    <main className="min-h-screen bg-black text-white py-24 px-6 flex flex-col items-center">
      <div className="w-full max-w-3xl mb-16">
        <Link 
          href="/" 
          className="inline-flex items-center text-[10px] uppercase tracking-widest text-white/50 hover:text-[#0EA5E9] transition-colors mb-12"
        >
          <ArrowLeft size={14} className="mr-2" /> Back to Home
        </Link>
        <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-center">
          Request Private Consultation
        </h1>
      </div>
      
      <div className="w-full max-w-2xl bg-[#0F172A] p-8 md:p-12 border border-white/5">
        <InquireForm />
      </div>
    </main>
  );
}
