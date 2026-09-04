import React from 'react';
import { MapPin, Navigation, Compass, Car, Bus, Train, Phone, ExternalLink } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const LocationSection: React.FC = () => {
  const { orgInfo } = useContent();

  const handleOpenGoogleMaps = () => {
    const query = encodeURIComponent("Borbhiti, Nagaon, Assam, India");
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="location" className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs font-extrabold tracking-widest uppercase text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            LOCATION &amp; ACCESSIBILITY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 font-heading">
            Visit Our Peaceful Campus
          </h2>
          <p className="text-base text-slate-700 mt-2 leading-relaxed">
            Conveniently situated in Borbhiti, Nagaon — nestled in a tranquil, nature-rich environment designed for therapeutic contemplation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Map Frame */}
          <div className="lg:col-span-7 bg-slate-100 rounded-3xl overflow-hidden border border-slate-200/90 shadow-md min-h-[380px] sm:min-h-[440px] flex flex-col relative">
            <iframe
              title="Re-Life Foundation Location Map - Borbhiti, Nagaon"
              src="https://maps.google.com/maps?q=Borbhiti%2C%20Nagaon%2C%20Assam&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full flex-1 border-0 min-h-[350px]"
              loading="lazy"
              allowFullScreen
            />

            {/* Map bottom bar */}
            <div className="p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-700 shrink-0" />
                <span className="text-xs font-semibold text-slate-800">
                  {orgInfo.address}
                </span>
              </div>

              <button
                onClick={handleOpenGoogleMaps}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-800 hover:bg-teal-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
              </button>
            </div>
          </div>

          {/* Right Column: Directional Guidance & Transport */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-5">
              <h3 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
                <Navigation className="w-5 h-5 text-teal-700" />
                <span>How to Reach Us</span>
              </h3>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                      By Road / Private Vehicle
                    </h4>
                    <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                      Easily connected to Nagaon Town via major arterial roads. Dedicated parking and ambulance access on site.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Bus className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                      From Nagaon ASTC Bus Stand
                    </h4>
                    <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                      Frequent local auto-rickshaws, shared taxis, and local transit available toward Borbhiti.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Train className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                      By Rail (Nagaon / Senchoa Railway)
                    </h4>
                    <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                      Approx. 15–20 minutes drive from Nagaon Railway Station. We also arrange transport pickup assistance upon prior request.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Assistance Card */}
            <div className="bg-teal-900 text-white rounded-2xl p-6 shadow-md border border-teal-800">
              <div className="flex items-center gap-2 mb-2 text-amber-300 text-xs font-bold tracking-wider uppercase">
                <Compass className="w-4 h-4" />
                <span>Need Pick-up or Navigation Assistance?</span>
              </div>
              <p className="text-xs text-teal-100 leading-relaxed mb-4">
                If you are arriving with a family member and require transport coordination, call our admission coordinator ahead of time.
              </p>
              <a
                href={`tel:${orgInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="inline-flex items-center gap-2 text-xs font-extrabold text-amber-300 hover:text-amber-200 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Coordinator: {orgInfo.phone}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
