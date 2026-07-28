'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    residence: 'The Garden Villa',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred during submission.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 md:py-44 bg-white text-[#0F172A] border-t border-slate-200 relative">
      <div className="max-w-[90rem] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          <div className="lg:col-span-5 flex flex-col justify-between pr-0 lg:pr-12">
            <div>
              <div className="flex items-center gap-4 text-[10px] font-sans uppercase tracking-[0.3em] text-[#0284C7] mb-8 font-bold">
                <span className="w-12 h-[2px] bg-[#0284C7]" />
                Private Inquiry
              </div>
              <h2
                className="text-5xl md:text-7xl font-serif text-[#0F172A] leading-[0.95] font-normal mb-8"
                style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
              >
                Register <br />
                <span className="italic font-light text-[#0284C7]">Interest</span>
              </h2>
              <p className="text-base font-sans text-slate-600 leading-relaxed max-w-sm mb-16 font-light">
                Consultations and private viewings are arranged strictly by appointment. Please submit your credentials for review by our Senior Portfolio Director.
              </p>
            </div>

            <div className="space-y-8 font-sans text-sm border-t border-slate-200 pt-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold mb-2">Direct</div>
                <div className="text-[#0F172A] font-medium">+1 (555) 019-2834</div>
                <div className="text-[#0284C7] font-medium">portfolio@horizonresidences.com</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold mb-2">Gallery Hours</div>
                <div className="text-[#0F172A] font-medium">Mon–Sat 09:00 - 18:00 EST</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div className="h-full flex flex-col justify-center border border-slate-200 p-12 bg-slate-50">
                <div className="w-12 h-12 flex items-center justify-center text-[#0284C7] mb-8">
                  <CheckCircle2 size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-4xl font-serif mb-4 text-[#0F172A]" style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}>
                  Inquiry Received
                </h3>
                <p className="text-base font-sans text-slate-600 max-w-md mb-12 leading-relaxed font-light">
                  Thank you, {formData.name}. Our Senior Portfolio Director will reach out shortly to provide private residence access and scheduling.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#0284C7] border-b border-[#0284C7]/40 pb-1 hover:border-[#0284C7] transition-colors self-start font-bold"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10 bg-slate-50 p-10 md:p-14 border border-slate-200">
                {errorMessage && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-sans">
                    <AlertCircle size={18} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder=" "
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="peer w-full bg-transparent border-b border-slate-300 py-3 text-base text-[#0F172A] focus:outline-none focus:border-[#0284C7] transition-colors"
                    />
                    <label className="absolute left-0 top-3 text-[10px] font-sans uppercase tracking-[0.2em] text-slate-500 transition-all peer-focus:-top-4 peer-focus:text-[8px] peer-focus:text-[#0284C7] peer-valid:-top-4 peer-valid:text-[8px] peer-valid:text-[#0284C7]">
                      Full Name *
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder=" "
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="peer w-full bg-transparent border-b border-slate-300 py-3 text-base text-[#0F172A] focus:outline-none focus:border-[#0284C7] transition-colors"
                    />
                    <label className="absolute left-0 top-3 text-[10px] font-sans uppercase tracking-[0.2em] text-slate-500 transition-all peer-focus:-top-4 peer-focus:text-[8px] peer-focus:text-[#0284C7] peer-valid:-top-4 peer-valid:text-[8px] peer-valid:text-[#0284C7]">
                      Email Address *
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder=" "
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="peer w-full bg-transparent border-b border-slate-300 py-3 text-base text-[#0F172A] focus:outline-none focus:border-[#0284C7] transition-colors"
                    />
                    <label className="absolute left-0 top-3 text-[10px] font-sans uppercase tracking-[0.2em] text-slate-500 transition-all peer-focus:-top-4 peer-focus:text-[8px] peer-focus:text-[#0284C7] peer-[not(:placeholder-shown)]:-top-4 peer-[not(:placeholder-shown)]:text-[8px] peer-[not(:placeholder-shown)]:text-[#0284C7]">
                      Phone Number
                    </label>
                  </div>
                  <div className="relative">
                    <select
                      value={formData.residence}
                      onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
                      className="w-full bg-transparent border-b border-slate-300 py-3 text-sm font-sans text-[#0F172A] focus:outline-none focus:border-[#0284C7] transition-colors appearance-none cursor-pointer"
                    >
                      <option value="The Garden Villa">The Garden Villa ($4.8M)</option>
                      <option value="The Horizon Sky Suite">The Horizon Sky Suite ($6.5M)</option>
                      <option value="The Crown Penthouse">The Crown Penthouse (Upon Request)</option>
                    </select>
                    <label className="absolute left-0 -top-4 text-[8px] font-sans uppercase tracking-[0.2em] text-slate-500 font-bold">
                      Residence Interest
                    </label>
                  </div>
                </div>

                <div className="relative mt-4">
                  <textarea
                    rows={2}
                    placeholder=" "
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="peer w-full bg-transparent border-b border-slate-300 py-3 text-base text-[#0F172A] focus:outline-none focus:border-[#0284C7] transition-colors resize-none"
                  />
                  <label className="absolute left-0 top-3 text-[10px] font-sans uppercase tracking-[0.2em] text-slate-500 transition-all peer-focus:-top-4 peer-focus:text-[8px] peer-focus:text-[#0284C7] peer-[not(:placeholder-shown)]:-top-4 peer-[not(:placeholder-shown)]:text-[8px] peer-[not(:placeholder-shown)]:text-[#0284C7]">
                    Private Message / Specific Requirements
                  </label>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-4 bg-[#0F172A] text-white font-bold uppercase tracking-[0.2em] hover:bg-[#0284C7] transition-all duration-300 disabled:opacity-50 px-9 py-4 text-[10px] shadow-md"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                    <ArrowRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-2" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
