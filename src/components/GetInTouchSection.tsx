import React from 'react';
import { MapPin, Phone, FileText, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface GetInTouchSectionProps {
  onOpenHelpModal?: () => void;
}

export const GetInTouchSection: React.FC<GetInTouchSectionProps> = ({ onOpenHelpModal }) => {
  const { orgInfo } = useContent();

  const handleOpenMap = (e: React.MouseEvent) => {
    e.preventDefault();
    const query = encodeURIComponent("Borbhiti, Nagaon, Assam, Near Nidan Hospital");
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Heading and Text */}
          <div className="lg:col-span-4 xl:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A413D] block">
              GET IN TOUCH
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C2B29] tracking-tight leading-tight font-heading">
              We're Here to Help You
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              Reach out to us for confidential support and guidance. Your journey to a better life starts today.
            </p>
          </div>

          {/* Right Column: 3 Info Cards matching screenshot */}
          <div className="lg:col-span-8 xl:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Card 1: Our Location */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#0A413D] text-white flex items-center justify-center mb-3">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1 font-heading">
                    Our Location
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Near Nidan Hospital, Opposite Jatiya Bidyalaya, Borbhiti, Nagaon, Assam – 781002
                  </p>
                </div>

                <div>
                  <a
                    href="#map"
                    onClick={handleOpenMap}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A413D] hover:text-teal-700 transition-colors"
                  >
                    <span>View on Map</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 2: Call Us */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#0A413D] text-white flex items-center justify-center mb-3">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1 font-heading">
                    Call Us
                  </h3>
                  <a
                    href={`tel:${orgInfo.phone}`}
                    className="text-lg font-extrabold text-slate-900 tracking-tight block hover:text-[#0A413D] transition-colors mb-1 font-heading"
                  >
                    {orgInfo.phone}
                  </a>
                </div>
                <p className="text-xs text-slate-600">
                  Available 24/7 for assistance
                </p>
              </div>

              {/* Card 3: Registration No. */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#0A413D] text-white flex items-center justify-center mb-3">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1 font-heading">
                    Registration No.
                  </h3>
                  <div className="text-sm sm:text-base font-bold text-slate-900 font-mono tracking-tight mb-1">
                    {orgInfo.registrationNo}
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-snug">
                  Government Registered Rehabilitation Centre
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
