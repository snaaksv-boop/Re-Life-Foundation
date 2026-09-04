import React from 'react';
import { Phone, MessageCircle, ArrowRight, ShieldCheck, Heart, Clock } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface CallToActionSectionProps {
  onContactClick: () => void;
}

export const CallToActionSection: React.FC<CallToActionSectionProps> = ({ onContactClick }) => {
  const { orgInfo } = useContent();

  const handleCall = () => {
    window.location.href = `tel:${orgInfo.phone.replace(/[^0-9+]/g, '')}`;
  };

  const handleWhatsApp = () => {
    const cleanNumber = orgInfo.whatsapp.replace(/[^0-9]/g, '');
    const message = encodeURIComponent("Hello Re-Life Foundation, I need information and support regarding addiction recovery care in Nagaon.");
    window.open(`https://wa.me/91${cleanNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-teal-900 via-teal-950 to-slate-950 text-white relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-teal-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Urgent Compassionate Badge */}
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300 bg-teal-900/90 px-3.5 py-1.5 rounded-full border border-teal-700 shadow-sm mb-6">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>24/7 Immediate &amp; Confidential Support</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
          You Don't Have to Fight Addiction Alone.
        </h2>

        <p className="text-base sm:text-xl text-teal-100/90 max-w-2xl mx-auto mt-4 leading-relaxed font-light">
          Start the journey of recovery today with Re-Life Foundation. Compassionate, respectful guidance is just one phone call away.
        </p>

        {/* 3 Call-To-Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          <button
            id="cta-call-btn"
            onClick={handleCall}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-teal-950 font-extrabold text-sm sm:text-base shadow-xl hover:shadow-amber-400/20 transition-all cursor-pointer group"
          >
            <Phone className="w-5 h-5 text-teal-900" />
            <span>Call Us: {orgInfo.phone}</span>
          </button>

          <button
            id="cta-whatsapp-btn"
            onClick={handleWhatsApp}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-xl hover:shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
            <span>Chat on WhatsApp</span>
          </button>

          <button
            id="cta-contact-form-btn"
            onClick={onContactClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/5 text-white font-bold text-sm sm:text-base border border-white/20 backdrop-blur-sm transition-all cursor-pointer"
          >
            <span>Send Enquiry</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        </div>

        {/* Security & Non-Judgmental Promises */}
        <div className="mt-10 pt-6 border-t border-teal-800/60 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-teal-200/80 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>100% Confidential Inquiries</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Zero Stigma &amp; Non-Judgmental</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Immediate Assistance Available</span>
          </div>
        </div>

      </div>
    </section>
  );
};
