import React, { useState } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { defaultFacilities } from '../data/defaultContent';

interface FacilitiesSectionProps {
  onViewFullGallery: () => void;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ onViewFullGallery }) => {
  const { facilities } = useContent();
  const [selectedFacilityIndex, setSelectedFacilityIndex] = useState<number | null>(null);

  const displayFacilities = facilities && facilities.length > 0 ? facilities : defaultFacilities;
  const currentFacility = selectedFacilityIndex !== null ? displayFacilities[selectedFacilityIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedFacilityIndex === null) return;
    setSelectedFacilityIndex((selectedFacilityIndex - 1 + displayFacilities.length) % displayFacilities.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedFacilityIndex === null) return;
    setSelectedFacilityIndex((selectedFacilityIndex + 1) % displayFacilities.length);
  };

  return (
    <section id="facilities" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching original design */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0A413D] block mb-2">
            OUR FACILITIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C2B29] tracking-tight font-heading">
            Safe. Supportive. Healing Environment.
          </h2>
        </div>

        {/* Dynamic Facilities Photos Grid - updates live from Customized Admin Panel */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 mb-10">
          {displayFacilities.map((facility, index) => (
            <div
              key={facility.id || `fac-${index}`}
              className="rounded-2xl overflow-hidden shadow-sm aspect-[4/3] sm:aspect-square bg-slate-100 border border-slate-200/80 group cursor-pointer relative"
              onClick={() => setSelectedFacilityIndex(index)}
              title={`Click to view ${facility.title}`}
            >
              <img
                src={facility.imageUrl}
                alt={facility.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Title Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/50 to-transparent p-2.5 sm:p-3 text-white flex flex-col justify-end">
                <p className="text-xs sm:text-sm font-semibold leading-tight line-clamp-1 group-hover:text-amber-300 transition-colors">
                  {facility.title}
                </p>
              </div>

              {/* Zoom badge on hover */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-xs rounded-full p-1.5 text-white">
                <Maximize2 className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>

        {/* Button: View Full Gallery */}
        <div className="text-center">
          <button
            id="facilities-view-gallery-btn"
            onClick={onViewFullGallery}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#0A413D] hover:bg-[#072f2c] active:bg-[#052422] text-white font-semibold text-sm shadow-sm transition-colors cursor-pointer"
          >
            <span>View Full Gallery</span>
            <ImageIcon className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* High-Resolution Facility Lightbox Modal */}
      {currentFacility && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedFacilityIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between text-white pb-3 mb-2 border-b border-white/10">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Facility Photo • {selectedFacilityIndex! + 1} of {displayFacilities.length}
                </span>
                <h3 className="text-base sm:text-lg font-bold truncate mt-0.5">
                  {currentFacility.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedFacilityIndex(null)}
                className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Preview Container */}
            <div className="relative w-full flex items-center justify-center overflow-hidden rounded-2xl bg-black/50 aspect-[16/10] max-h-[65vh]">
              <img
                src={currentFacility.imageUrl}
                alt={currentFacility.title}
                className="max-w-full max-h-full object-contain"
                referrerPolicy="no-referrer"
              />

              {/* Prev / Next Navigation Arrows */}
              {displayFacilities.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
                    title="Previous"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
                    title="Next"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Facility Description & Highlights */}
            <div className="w-full mt-3 bg-slate-900/90 rounded-xl p-4 text-white border border-white/10">
              {currentFacility.description && (
                <p className="text-sm text-slate-200 mb-2">{currentFacility.description}</p>
              )}
              {currentFacility.highlights && currentFacility.highlights.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {currentFacility.highlights.map((h, i) => (
                    <span key={i} className="text-xs bg-teal-900/80 text-teal-200 border border-teal-700/50 px-2.5 py-0.5 rounded-full font-medium">
                      ✓ {h}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
