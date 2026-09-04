import React, { useState } from 'react';
import { Play, User, X } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { VideoItem } from '../types';

export const VideosAndFounderSection: React.FC = () => {
  const { founder, videos } = useContent();
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  // Helper to detect if video is an embed link (YouTube / Vimeo) or direct video file
  const getEmbedInfo = (url: string) => {
    if (!url) return { isEmbed: false, src: '' };
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      return {
        isEmbed: true,
        src: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1`
      };
    }
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      return {
        isEmbed: true,
        src: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`
      };
    }
    return { isEmbed: false, src: url };
  };

  const currentEmbedInfo = activeVideo ? getEmbedInfo(activeVideo.videoUrl) : null;

  return (
    <section id="videos" className="py-16 sm:py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: OUR VIDEOS (approx 65% width) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A413D] block mb-2">
              OUR VIDEOS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C2B29] tracking-tight font-heading mb-6 sm:mb-8">
              See Our Centre in Action
            </h2>

            {/* Video Cards from ContentContext */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="group cursor-pointer flex flex-col"
                  onClick={() => setActiveVideo(video)}
                >
                  {/* Thumbnail with Play Button */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-200 shadow-sm border border-slate-200">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-black/60 border border-white/80 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Caption */}
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-2.5 text-center leading-snug group-hover:text-[#0A413D] transition-colors">
                    {video.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: FOUNDER (approx 35% width) */}
          <div id="founder" className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm flex flex-col items-center text-center">
              <div className="w-full text-left mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A413D] block mb-1">
                  FOUNDER
                </span>
                <h3 className="text-xl font-bold text-[#0C2B29] font-heading">
                  Founder: {founder.name || "Siddik Ali"}
                </h3>
              </div>

              {/* Founder Circular Golden Ring Frame */}
              <div className="relative w-36 h-36 rounded-full border-2 border-amber-400 p-1 bg-slate-50 flex items-center justify-center my-2 shadow-inner">
                {founder.photoUrl ? (
                  <img
                    src={founder.photoUrl}
                    alt={founder.name}
                    className="w-full h-full rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <User className="w-12 h-12 stroke-[1.5]" />
                    <span className="text-[11px] font-medium text-slate-500 mt-1">
                      Founder Photo
                    </span>
                  </div>
                )}
              </div>

              {/* Quote */}
              <p className="text-xs sm:text-sm text-slate-600 italic mt-4 font-normal">
                &ldquo;{founder.quote || "Compassion. Respect. Second Chances."}&rdquo;
              </p>

              {/* Signature in script */}
              <div className="mt-2 text-2xl font-bold text-slate-800 font-serif italic" style={{ fontFamily: "'Caveat', cursive, serif" }}>
                — {founder.name || "Siddik Ali"}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Video Player Modal */}
      {activeVideo && currentEmbedInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 rounded-2xl max-w-3xl w-full p-4 sm:p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-white">
              <h3 className="text-base font-bold truncate pr-4">
                {activeVideo.title}
              </h3>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
              {currentEmbedInfo.isEmbed ? (
                <iframe
                  src={currentEmbedInfo.src}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={currentEmbedInfo.src}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
            {activeVideo.description && (
              <p className="text-xs text-slate-400 mt-3">{activeVideo.description}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
