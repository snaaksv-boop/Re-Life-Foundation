import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { X, Phone, MessageCircle, HeartHandshake, Shield, Send, CheckCircle } from 'lucide-react';

interface HelpRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpRequestModal: React.FC<HelpRequestModalProps> = ({ isOpen, onClose }) => {
  const { orgInfo, addSubmission } = useContent();

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    personSeekingSupport: 'Family Member' as const,
    preferredContactMethod: 'Call' as const,
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim()) return;

    addSubmission({
      fullName: form.fullName,
      phone: form.phone,
      personSeekingSupport: form.personSeekingSupport,
      preferredContactMethod: form.preferredContactMethod,
      message: form.message || 'Urgent Help Request via Quick Modal'
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-md">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-teal-800">
              Immediate Assistance
            </span>
            <h3 className="text-xl font-bold text-slate-900 font-heading">
              Get Help Now
            </h3>
          </div>
        </div>

        {/* Instant Action options */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <a
            href={`tel:${orgInfo.phone}`}
            className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-teal-900 hover:bg-teal-800 text-white transition-colors text-center shadow-sm"
          >
            <Phone className="w-5 h-5 text-amber-400 mb-1" />
            <span className="text-xs font-bold">Call 24/7 Helpline</span>
            <span className="text-[11px] text-teal-200 font-mono mt-0.5">{orgInfo.phone}</span>
          </a>

          <a
            href={orgInfo.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors text-center shadow-sm"
          >
            <MessageCircle className="w-5 h-5 mb-1" />
            <span className="text-xs font-bold">WhatsApp Chat</span>
            <span className="text-[11px] text-emerald-100 mt-0.5">Instant message</span>
          </a>
        </div>

        <div className="relative flex items-center justify-center mb-6">
          <hr className="w-full border-slate-200" />
          <span className="absolute bg-white px-3 text-xs font-bold uppercase tracking-wider text-slate-700">
            or request a callback
          </span>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-teal-50 border border-teal-200 text-center space-y-2">
            <CheckCircle className="w-10 h-10 text-teal-700 mx-auto" />
            <h4 className="text-lg font-bold text-teal-950 font-heading">
              Help Request Received
            </h4>
            <p className="text-xs sm:text-sm text-teal-800 leading-relaxed">
              We understand the urgency. Our duty officer at Borbhiti, Nagaon will reach out to you quietly and respectfully.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-teal-800 text-white text-xs font-bold hover:bg-teal-700"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Name"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-700 focus:ring-1 focus:ring-teal-700 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="Mobile number for confidential call"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-700 focus:ring-1 focus:ring-teal-700 text-sm outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Seeking Support For
                </label>
                <select
                  value={form.personSeekingSupport}
                  onChange={(e) => setForm({ ...form, personSeekingSupport: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none bg-white"
                >
                  <option value="Family Member">Family Member</option>
                  <option value="Self">Myself</option>
                  <option value="Friend">Friend</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Contact
                </label>
                <select
                  value={form.preferredContactMethod}
                  onChange={(e) => setForm({ ...form, preferredContactMethod: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none bg-white"
                >
                  <option value="Call">Phone Call</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Email">Email</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Any specific concern? (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g., alcohol addiction, drug dependency, urgent admission..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-teal-700 text-xs outline-none resize-none"
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-teal-800 bg-teal-50 p-2.5 rounded-lg border border-teal-100">
              <Shield className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span>100% Confidential. Never shared with outside parties.</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-slate-950" />
              <span>Submit Confidential Request</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
