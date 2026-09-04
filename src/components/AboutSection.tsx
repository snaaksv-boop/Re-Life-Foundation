import React, { useState, useRef } from 'react';
import { ArrowRight, HeartHandshake, Sparkles, Heart, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface AboutSectionProps {
  onLearnMore?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMore }) => {
  const { aboutData } = useContent();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Helper to handle YouTube or HTML5 video
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

  const embedInfo = getEmbedInfo(aboutData.videoUrl);

  const handlePlayToggle = () => {
    if (embedInfo.isEmbed) {
      setIsPlaying(true);
      return;
    }

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.warn("Autoplay was blocked or video error:", err);
          setIsPlaying(true);
        });
      }
    } else {
      setIsPlaying(true);
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section id="about" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column matching screenshot */}
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A413D] block">
              {aboutData.badge || 'ABOUT US'}
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C2B29] tracking-tight leading-tight font-heading">
              {aboutData.title || 'About Re-Life Foundation'}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {aboutData.description ||
                'Re-Life Foundation is a trusted rehabilitation and de-addiction centre located in Borbhiti, Nagaon, Assam. We provide a safe, supportive and structured environment for individuals struggling with alcohol and drug addiction.'}
            </p>

            {/* 3 bullet items with icons matching screenshot */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-3">
                <div className="text-[#0A413D] shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <span className="text-sm text-slate-700 font-medium">
                  {aboutData.bullets?.[0] || 'Personalized care and evidence-informed approach'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-[#0A413D] shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-sm text-slate-700 font-medium">
                  {aboutData.bullets?.[1] || 'Holistic healing for mind, body and spirit'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-[#0A413D] shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <span className="text-sm text-slate-700 font-medium">
                  {aboutData.bullets?.[2] || 'Respect, dignity and a second chance at life'}
                </span>
              </div>
            </div>

            {/* Dark teal button */}
            <div className="pt-3">
              <button
                id="about-learn-more-btn"
                onClick={onLearnMore || (() => {
                  const el = document.getElementById('treatment');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0A413D] hover:bg-[#072f2c] active:bg-[#052422] text-white font-semibold text-sm shadow-sm transition-colors duration-150"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Video replacing the static photo */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-slate-900 border border-teal-900/40 group">
              
              {/* If YouTube/Vimeo embed and playing */}
              {embedInfo.isEmbed && isPlaying ? (
                <iframe
                  src={embedInfo.src}
                  title={aboutData.videoTitle || 'Re-Life Foundation Video Tour'}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                /* HTML5 Video or Poster with Play button */
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    src={embedInfo.src}
                    poster={aboutData.videoPoster}
                    controls={isPlaying}
                    playsInline
                    loop
                    className="w-full h-full object-cover"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    Your browser does not support the video tag.
                  </video>

                  {/* Overlay Play Button when paused or initial state */}
                  {!isPlaying && (
                    <div
                      onClick={handlePlayToggle}
                      className="absolute inset-0 bg-slate-950/40 hover:bg-slate-950/30 backdrop-blur-[2px] transition-all flex flex-col items-center justify-center cursor-pointer p-6 text-center"
                    >
                      {/* Video Badge */}
                      <div className="absolute top-4 left-4 bg-[#0A413D]/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 border border-teal-500/30 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Centre Tour &amp; Care Video</span>
                      </div>

                      {/* Large Golden Play Button */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500 hover:bg-amber-400 text-white flex items-center justify-center shadow-2xl transform transition group-hover:scale-110 active:scale-95">
                        <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                      </div>

                      <div className="mt-4 max-w-sm">
                        <h4 className="text-white font-bold text-base sm:text-lg drop-shadow-md">
                          {aboutData.videoTitle || 'Re-Life Foundation Centre Walkthrough'}
                        </h4>
                        <p className="text-teal-100/90 text-xs mt-1 drop-shadow">
                          Watch our compassionate environment, counselling &amp; recovery routine
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Video Controls overlay when playing HTML5 video */}
                  {isPlaying && !embedInfo.isEmbed && (
                    <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                      <button
                        onClick={handleMuteToggle}
                        className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white text-xs backdrop-blur-md transition-all border border-white/20"
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={handleFullscreen}
                        className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white text-xs backdrop-blur-md transition-all border border-white/20"
                        title="Fullscreen"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
