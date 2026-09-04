import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface FacilitiesSectionProps {
  onViewFullGallery: () => void;
}

const facilityPhotos = [
  {
    id: 'fac-photo-1',
    title: 'Group Session Hall',
    url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'fac-photo-2',
    title: 'Clean Accommodation Rooms',
    url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'fac-photo-3',
    title: 'Yoga & Meditation Hall',
    url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'fac-photo-4',
    title: 'Counselling & Reading Space',
    url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'fac-photo-5',
    title: 'Consultation & Doctor Office',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  }
];

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ onViewFullGallery }) => {
  return (
    <section id="facilities" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching screenshot */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0A413D] block mb-2">
            OUR FACILITIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C2B29] tracking-tight font-heading">
            Safe. Supportive. Healing Environment.
          </h2>
        </div>

        {/* 5 Photos in a row matching screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-10">
          {facilityPhotos.map((photo) => (
            <div
              key={photo.id}
              className="rounded-2xl overflow-hidden shadow-sm aspect-[4/3] sm:aspect-square bg-slate-100 border border-slate-200/80 group cursor-pointer"
              onClick={onViewFullGallery}
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>

        {/* Button: View Full Gallery matching screenshot */}
        <div className="text-center">
          <button
            id="facilities-view-gallery-btn"
            onClick={onViewFullGallery}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#0A413D] hover:bg-[#072f2c] active:bg-[#052422] text-white font-semibold text-sm shadow-sm transition-colors"
          >
            <span>View Full Gallery</span>
            <ImageIcon className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
