import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const FloatingActions: React.FC = () => {
  const { orgInfo } = useContent();

  const handleCall = () => {
    window.location.href = `tel:${orgInfo.phone.replace(/[^0-9+]/g, '')}`;
  };

  const handleWhatsApp = () => {
    const cleanNumber = orgInfo.phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      "Hello Re-Life Foundation, I need urgent assistance regarding rehabilitation support in Nagaon, Assam."
    );
    window.open(`https://wa.me/91${cleanNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-3 sm:bottom-4 left-3 sm:left-4 z-40 flex items-center gap-2 sm:gap-3 max-w-[calc(100vw-1.5rem)] select-none">
      
      {/* 1. Green WhatsApp Pill matching screenshot */}
      <button
        id="floating-whatsapp-btn"
        onClick={handleWhatsApp}
        className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#059669] hover:bg-emerald-700 text-white shadow-xl hover:shadow-2xl transition-all duration-150 transform hover:-translate-y-0.5 shrink-0"
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white" />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-bold text-xs sm:text-sm leading-tight text-white">
            WhatsApp
          </span>
          <span className="text-[9px] sm:text-[11px] text-emerald-100 leading-tight hidden xs:inline">
            Chat with us
          </span>
        </div>
      </button>

      {/* 2. White Call Now Pill matching screenshot */}
      <button
        id="floating-call-btn"
        onClick={handleCall}
        className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-200/90 shadow-xl hover:shadow-2xl transition-all duration-150 transform hover:-translate-y-0.5 shrink-0"
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0A413D] flex items-center justify-center text-white shrink-0">
          <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-[#0A413D]" />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-bold text-xs sm:text-sm leading-tight text-slate-900">
            Call Now
          </span>
          <span className="text-[9px] sm:text-[11px] text-slate-600 leading-tight hidden xs:inline">
            {orgInfo.phone}
          </span>
        </div>
      </button>

    </div>
  );
};
