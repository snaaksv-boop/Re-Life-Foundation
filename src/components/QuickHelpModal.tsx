import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import {
  X,
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  MapPin,
  HeartHandshake
} from 'lucide-react';

interface QuickHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickHelpModal: React.FC<QuickHelpModalProps> = ({ isOpen, onClose }) => {
  const { orgInfo, addContactSubmission } = useContent();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [concern, setConcern] = useState('Alcohol De-Addiction');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleCall = () => {
    window.location.href = `tel:${orgInfo.phone.replace(/[^0-9+]/g, '')}`;
  };

  const handleWhatsApp = () => {
    const cleanNumber = orgInfo.whatsapp.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `URGENT HELP: Hello Re-Life Foundation, I need admission guidance. Concern: ${concern}. Contact: ${phone || 'Direct call'}.`
    );
    window.open(`https://wa.me/91${cleanNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    addContactSubmission({
      name: name.trim(),
      phone: phone.trim(),
      message: `Quick Help Request - Primary Concern: ${concern}`,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setName('');
      setPhone('');
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center border border-teal-100">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block">
              24/7 CONFIDENTIAL ASSISTANCE
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
              Immediate Help &amp; Consultation
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">
          Taking the first step takes courage. We are here to listen with compassion, verify admission options, and protect your privacy completely.
        </p>

        {/* Quick Instant Call / WhatsApp Options */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={handleCall}
            className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-teal-950 transition-colors group cursor-pointer"
          >
            <Phone className="w-5 h-5 text-amber-600 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-extrabold">Instant Phone Call</span>
            <span className="text-[11px] text-slate-700 mt-0.5">{orgInfo.phone}</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 transition-colors group cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-extrabold">Chat on WhatsApp</span>
            <span className="text-[11px] text-emerald-700 mt-0.5">Quick text reply</span>
          </button>
        </div>

        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-3 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
            OR REQUEST A CALL BACK
          </span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Callback Form */}
        {submitted ? (
          <div className="py-6 text-center space-y-2 bg-emerald-50 rounded-2xl border border-emerald-200">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="text-base font-bold text-emerald-950">We Will Call You Shortly</h4>
            <p className="text-xs text-emerald-800">
              Our counsellor is notified and will reach out with utmost discretion.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Name / Contact Person
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone number"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Primary Recovery Concern
              </label>
              <select
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700"
              >
                <option value="Alcohol De-Addiction">Alcohol De-Addiction</option>
                <option value="Drug / Substance Rehabilitation">Drug / Substance Rehabilitation</option>
                <option value="Emotional Support & Counselling">Emotional Support &amp; Counselling</option>
                <option value="Family Guidance / Intervention">Family Guidance / Intervention</option>
                <option value="Admission Criteria & Details">Admission Criteria &amp; Details</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-teal-900 hover:bg-teal-800 active:bg-teal-950 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-amber-300" />
                <span>Request Discretionary Call Back</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-700 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
              <span>We never disclose inquiry data to third parties.</span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
