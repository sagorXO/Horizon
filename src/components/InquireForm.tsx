'use client';

import { useState } from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormValues } from '@/lib/validation';

export default function InquireForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useReactHookForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 border border-[#0EA5E9] rounded-none flex items-center justify-center mx-auto mb-8">
          <div className="w-2 h-2 bg-[#0EA5E9]" />
        </div>
        <h3 className="font-cinzel text-2xl mb-4">Inquiry Received</h3>
        <p className="text-[#64748B]">Our dedicated concierge will be in touch with you shortly.</p>
        <button 
          onClick={() => setSubmitStatus('idle')}
          className="mt-12 text-[10px] uppercase tracking-widest text-[#0EA5E9] hover:text-white transition-colors"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      
      {submitStatus === 'error' && (
        <div className="bg-red-900/20 border border-red-500/50 text-red-200 p-4 text-sm">
          There was an error submitting your inquiry. Please try again.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[#0EA5E9] mb-2">First Name</label>
          <input 
            {...register('firstName')}
            className="w-full bg-transparent border-b border-white/30 pb-3 focus:outline-none focus:border-white transition-colors rounded-none"
            type="text" 
          />
          {errors.firstName && <p className="text-red-400 text-xs mt-2">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[#0EA5E9] mb-2">Last Name</label>
          <input 
            {...register('lastName')}
            className="w-full bg-transparent border-b border-white/30 pb-3 focus:outline-none focus:border-white transition-colors rounded-none"
            type="text" 
          />
          {errors.lastName && <p className="text-red-400 text-xs mt-2">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[#0EA5E9] mb-2">Email Address</label>
          <input 
            {...register('email')}
            className="w-full bg-transparent border-b border-white/30 pb-3 focus:outline-none focus:border-white transition-colors rounded-none"
            type="email" 
          />
          {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[#0EA5E9] mb-2">Phone Number</label>
          <input 
            {...register('phone')}
            className="w-full bg-transparent border-b border-white/30 pb-3 focus:outline-none focus:border-white transition-colors rounded-none"
            type="tel" 
          />
          {errors.phone && <p className="text-red-400 text-xs mt-2">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-widest text-[#0EA5E9] mb-2">Area of Interest</label>
        <select 
          {...register('inquiryType')}
          className="w-full bg-transparent border-b border-white/30 pb-3 focus:outline-none focus:border-white transition-colors appearance-none rounded-none text-white"
        >
          <option value="" className="bg-[#0F172A]">Select an option</option>
          <option value="signature" className="bg-[#0F172A]">Signature Collection ($4.8M+)</option>
          <option value="sky" className="bg-[#0F172A]">Sky Collection ($6.5M+)</option>
          <option value="penthouse" className="bg-[#0F172A]">The Apex Penthouses</option>
          <option value="general" className="bg-[#0F172A]">General Inquiry</option>
        </select>
        {errors.inquiryType && <p className="text-red-400 text-xs mt-2">{errors.inquiryType.message}</p>}
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-widest text-[#0EA5E9] mb-2">Message (Optional)</label>
        <textarea 
          {...register('message')}
          rows={4}
          className="w-full bg-transparent border-b border-white/30 pb-3 focus:outline-none focus:border-white transition-colors resize-none rounded-none"
        />
      </div>

      <div className="flex items-start space-x-3">
        <div className="pt-1">
          <input 
            type="checkbox" 
            {...register('privacyAccepted')}
            className="w-4 h-4 rounded-none border border-white/30 bg-transparent checked:bg-[#0EA5E9] focus:ring-0 focus:ring-offset-0"
          />
        </div>
        <label className="text-sm text-white/50 leading-relaxed">
          I consent to having HORIZON collect my details to respond to this inquiry. I understand 
          and agree to the Privacy Policy.
        </label>
      </div>
      {errors.privacyAccepted && <p className="text-red-400 text-xs">{errors.privacyAccepted.message}</p>}

      <button 
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-white text-black py-5 text-sm uppercase tracking-widest font-bold hover:bg-[#0EA5E9] hover:text-white transition-colors duration-300 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
      </button>

    </form>
  );
}
