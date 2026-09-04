import React from 'react';
import { PhoneCall, MessageCircle, MapPin, ExternalLink } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const QuickContactBar: React.FC = () => {
  const { orgInfo } = useContent();

  return (
    <div className="relative -mt-7 sm:-mt-9 z-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-3 sm:p-5 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
        {/* Call Now */}
        <a
          href={`tel:${orgInfo.phone}`}
          className="flex items-center gap-4 p-2.5 sm:p-3 hover:bg-teal-50/60 rounded-xl transition-colors group"
        >
          <div className="w-12 h-12 rounded-xl bg-teal-800 text-amber-300 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold tracking-wider uppercase text-teal-800">
              Immediate Helpline
            </span>
            <p className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-teal-900 transition-colors">
              {orgInfo.phone}
            </p>
            <p className="text-xs text-slate-700">Available 24/7 for urgent admissions</p>
          </div>
        </a>

        {/* WhatsApp */}
        <a
          href={orgInfo.whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 p-2.5 sm:p-3 pt-4 md:pt-2.5 hover:bg-emerald-50/60 rounded-xl transition-colors group"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-800">
              WhatsApp Support
            </span>
            <p className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors flex items-center gap-1.5">
              <span>Chat With Us</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            </p>
            <p className="text-xs text-slate-700">Confidential guidance &amp; queries</p>
          </div>
        </a>

        {/* Location */}
        <a
          href="#location"
          className="flex items-center gap-4 p-2.5 sm:p-3 pt-4 md:pt-2.5 hover:bg-teal-50/60 rounded-xl transition-colors group"
        >
          <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center shrink-0 border border-teal-200 shadow-sm group-hover:scale-105 transition-transform">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold tracking-wider uppercase text-teal-800">
              Centre Location
            </span>
            <p className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-teal-900 transition-colors truncate">
              {orgInfo.city}, Assam
            </p>
            <p className="text-xs text-slate-700 truncate">{orgInfo.landmark}</p>
          </div>
        </a>
      </div>
    </div>
  );
};
