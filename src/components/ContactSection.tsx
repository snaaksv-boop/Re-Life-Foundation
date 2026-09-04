import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  Building2,
  AlertCircle
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { orgInfo, addContactSubmission } = useContent();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

    addContactSubmission({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    });

    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
      });
    }, 600);
  };

  const handleWhatsAppDirect = () => {
    const cleanNumber = orgInfo.whatsapp.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hello Re-Life Foundation, I am reaching out from your website. Name: ${formData.name || 'Not specified'}. I need admission/counselling guidance.`
    );
    window.open(`https://wa.me/91${cleanNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-slate-50 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-extrabold tracking-widest uppercase text-teal-800 bg-teal-100/70 px-3 py-1 rounded-full border border-teal-200">
            CONNECT WITH US
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 font-heading">
            Contact &amp; Admission Helpline
          </h2>
          <p className="text-base text-slate-700 mt-2">
            Reach our caring counsellors anytime. All inquiries are strictly private, respectful, and confidential.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Left Column: Contact Cards & Centre Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm space-y-6">
              
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Centre Information
              </h3>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0 border border-teal-100">
                  <MapPin className="w-5 h-5 text-teal-700" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Campus Location
                  </span>
                  <p className="text-sm font-medium text-slate-800 leading-snug mt-0.5">
                    {orgInfo.address}
                  </p>
                  <p className="text-xs text-slate-700 mt-1 font-mono">
                    Reg. No: {orgInfo.registrationNo}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0 border border-teal-100">
                  <Phone className="w-5 h-5 text-teal-700" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Helpline &amp; Calling Support
                  </span>
                  <a
                    href={`tel:${orgInfo.phone.replace(/[^0-9+]/g, '')}`}
                    className="text-base font-bold text-teal-900 hover:text-teal-700 transition-colors block mt-0.5"
                  >
                    {orgInfo.phone}
                  </a>
                  <span className="text-xs text-emerald-600 font-medium">Available 24 Hours / 7 Days</span>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    WhatsApp Chat Support
                  </span>
                  <button
                    onClick={handleWhatsAppDirect}
                    className="text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors block mt-0.5 text-left"
                  >
                    +91 {orgInfo.whatsapp} (Click to Chat)
                  </button>
                  <span className="text-xs text-slate-700">Instant confidential response</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0 border border-teal-100">
                  <Mail className="w-5 h-5 text-teal-700" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Official Email
                  </span>
                  <a
                    href={`mailto:${orgInfo.email}`}
                    className="text-sm font-medium text-slate-800 hover:text-teal-800 transition-colors block mt-0.5 break-all"
                  >
                    {orgInfo.email}
                  </a>
                </div>
              </div>

            </div>

            {/* Privacy Assurance Card */}
            <div className="p-5 rounded-2xl bg-teal-900 text-teal-100 flex items-start gap-3.5 shadow-md">
              <ShieldCheck className="w-6 h-6 text-amber-300 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  100% Confidentiality Assured
                </h4>
                <p className="text-xs text-teal-200/90 leading-relaxed">
                  We honor your trust. No consultation details, personal names, or inquiries are ever shared with outside parties without consent.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-7 sm:p-9 border border-slate-200/90 shadow-md relative">
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 font-heading">
                  Send Us an Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 mt-1">
                  Fill out the details below. Our team will reach out promptly to answer your questions.
                </p>
              </div>

              {status === 'success' ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 font-heading">
                    Message Received Safely
                  </h4>
                  <p className="text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
                    Thank you. A counsellor from Re-Life Foundation will review your request and contact you confidentially.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      Send Another Message
                    </button>
                    <button
                      onClick={handleWhatsAppDirect}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat on WhatsApp Now</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === 'error' && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Please enter at least your Name and Phone number so we can reach you.</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Your Full Name <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Phone Number <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email Address <span className="text-slate-700 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. name@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      How Can We Support You?
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about the situation, person seeking recovery, or any specific concerns..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 bg-slate-50/50"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[11px] text-slate-700 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                      <span>Encrypted &amp; securely handled</span>
                    </p>

                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-teal-900 hover:bg-teal-800 active:bg-teal-950 text-white font-bold text-sm shadow-md hover:shadow-teal-900/25 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4 text-amber-300" />
                      <span>{status === 'submitting' ? 'Submitting...' : 'Submit Confidential Inquiry'}</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
