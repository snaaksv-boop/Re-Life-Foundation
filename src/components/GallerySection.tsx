import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { GalleryPhoto } from '../types';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';

interface GallerySectionProps {
  onOpenAdminUpload?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = () => {
  const { gallery } = useContent();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const categories: Array<GalleryPhoto['category']> = [
    'All',
    'Centre',
    'Counselling',
    'Activities',
    'Wellness',
    'Accommodation',
    'Events',
  ];

  const filteredPhotos = activeCategory === 'All'
    ? gallery
    : gallery.filter(p => p.category === activeCategory);

  const handleOpenLightbox = (photo: GalleryPhoto) => {
    const idx = filteredPhotos.findIndex(p => p.id === photo.id);
    if (idx !== -1) setSelectedPhotoIndex(idx);
  };

  const handleNext = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
  };

  const handlePrev = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const currentPhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  const isNewPhoto = (photo: GalleryPhoto): boolean => {
    if (photo.createdAt) return true;
    if (photo.id && photo.id.startsWith('gal-')) {
      const num = Number(photo.id.replace('gal-', ''));
      if (!isNaN(num) && num > 1000000000) return true;
    }
    return false;
  };

  return (
    <section id="gallery" className="py-20 sm:py-24 bg-slate-50 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Clean, public visitor view without admin controls */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-extrabold tracking-widest uppercase text-teal-800 bg-teal-100/70 px-3 py-1 rounded-full border border-teal-200">
            CENTRE GLIMPSES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 font-heading">
            Photo Gallery
          </h2>
          <p className="text-base text-slate-700 mt-2">
            Authentic glimpses of our rehabilitation campus, group sessions, and healing spaces in Borbhiti, Nagaon.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-teal-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-700 text-sm">No photos available in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredPhotos.map((photo, index) => {
              const isNewlyAdded = isNewPhoto(photo);
              return (
                <div
                  key={photo.id}
                  onClick={() => handleOpenLightbox(photo)}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 aspect-[4/3]"
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
                    <div className="flex items-center gap-1.5">
                      {isNewlyAdded && (
                        <span className="text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-md flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>NEW • #{index + 1}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Gradient overlay on hover/tap */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 sm:p-4 text-white">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-teal-800/90 backdrop-blur-sm border border-teal-600/40">
                        {photo.category}
                      </span>
                      
                      {/* Zoom Icon */}
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold leading-snug line-clamp-2">
                        {photo.title}
                      </h3>
                      <p className="text-[11px] text-teal-200/90 line-clamp-1 mt-0.5">
                        {photo.description || 'Centre view & activities'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {currentPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/95 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Title & Close Button */}
            <div className="w-full flex items-center justify-between text-white pb-3 mb-2 border-b border-white/10 gap-3">
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    {currentPhoto.category} • {selectedPhotoIndex! + 1} of {filteredPhotos.length}
                  </span>
                  {isNewPhoto(currentPhoto) && (
                    <span className="text-[10px] bg-emerald-600 text-white font-extrabold px-2 py-0.5 rounded-full">
                      NEW PHOTO
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-bold truncate mt-0.5">
                  {currentPhoto.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPhotoIndex(null)}
                  className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Main Image View */}
            <div className="relative w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-xl bg-black">
              <img
                src={currentPhoto.imageUrl}
                alt={currentPhoto.title}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />

              {/* Prev / Next controls */}
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-teal-700 text-white shadow-lg transition-colors cursor-pointer"
                title="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-teal-700 text-white shadow-lg transition-colors cursor-pointer"
                title="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Caption */}
            {currentPhoto.description && (
              <p className="text-xs sm:text-sm text-slate-300 mt-3 text-center max-w-2xl">
                {currentPhoto.description}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
