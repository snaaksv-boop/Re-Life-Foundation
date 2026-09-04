import React from 'react';
import { Phone, MessageCircle, HeartHandshake } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface FloatingMobileBarProps {
  onOpenHelpModal: () => void;
}

export const FloatingMobileBar: React.FC<FloatingMobileBarProps> = ({ onOpenHelpModal }) => {
  const { orgInfo } = useContent();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 shadow-2xl sm:hidden">
      <div className="grid grid-cols-2 gap-2">
        {/* WhatsApp Button (as shown in reference screenshot) */}
        <a
          href={orgInfo.whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-bold text-xs shadow-md"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <div className="text-left leading-tight">
            <span className="block text-[10px] font-normal opacity-90">WhatsApp</span>
            <span className="text-xs font-extrabold">Chat with us</span>
          </div>
        </a>

        {/* Call Now Button (as shown in reference screenshot) */}
        <a
          href={`tel:${orgInfo.phone}`}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-teal-900 active:bg-teal-950 text-white font-bold text-xs shadow-md"
        >
          <Phone className="w-4 h-4 text-amber-400 fill-current" />
          <div className="text-left leading-tight">
            <span className="block text-[10px] font-normal opacity-90">Call Now</span>
            <span className="text-xs font-extrabold">{orgInfo.phone}</span>
          </div>
        </a>
      </div>
    </div>
  );
};
