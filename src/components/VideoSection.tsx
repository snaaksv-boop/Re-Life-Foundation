import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { VideoItem } from '../types';
import { Play, X, Video, Plus } from 'lucide-react';

interface VideoSectionProps {
  onOpenAdminVideos: () => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ onOpenAdminVideos }) => {
  const { videos } = useContent();
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  // Helper to get embeddable URL or handle native video
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtube.com/embed/')) {
      return url.includes('?') ? `${url}&autoplay=1` : `${url}?autoplay=1`;
    }
    return url;
  };

  return (
    <section id="videos" className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-4">
          <div>
            <span className="text-xs font-extrabold tracking-widest uppercase text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              OUR VIDEOS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 font-heading">
              See Our Centre in Action
            </h2>
            <p className="text-base text-slate-700 mt-2">
              Watch real moments of therapeutic routines, morning wellness, and community fellowship at Re-Life Foundation.
            </p>
          </div>

          <button
            onClick={onOpenAdminVideos}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg border border-teal-200 transition-colors self-start md:self-auto"
          >
            <Plus className="w-3.5 h-3.5 text-teal-700" />
            <span>Manage Videos</span>
          </button>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Thumbnail with Play Overlay */}
              <div
                onClick={() => setActiveVideo(vid)}
                className="aspect-video relative overflow-hidden bg-slate-900 cursor-pointer"
              >
                <img
                  src={vid.thumbnailUrl}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-teal-800/90 text-white flex items-center justify-center shadow-lg border-2 border-amber-400 group-hover:scale-110 group-hover:bg-teal-700 transition-all">
                    <Play className="w-6 h-6 fill-current text-amber-300 ml-0.5" />
                  </div>
                </div>

                {vid.duration && (
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/75 text-[11px] font-mono font-bold text-white">
                    {vid.duration}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => setActiveVideo(vid)}
                    className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-teal-900 cursor-pointer transition-colors font-heading"
                  >
                    {vid.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
                    {vid.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-semibold text-teal-800 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5" />
                    <span>Watch Video</span>
                  </span>
                  <span className="text-[11px] text-slate-700">{vid.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 bg-slate-900 text-white border-b border-white/10">
              <h3 className="text-base font-bold truncate pr-4">
                {activeVideo.title}
              </h3>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video embed frame */}
            <div className="aspect-video w-full bg-black">
              {activeVideo.videoUrl.endsWith('.mp4') ? (
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={getEmbedUrl(activeVideo.videoUrl)}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            <div className="p-4 bg-slate-900 text-slate-300 text-xs sm:text-sm">
              <p>{activeVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
