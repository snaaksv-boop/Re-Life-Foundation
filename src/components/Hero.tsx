import React from 'react';
import { Phone, HeartHandshake, Lock, Users } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface HeroProps {
  onOpenHelpModal: () => void;
  onCallClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenHelpModal }) => {
  const { orgInfo, heroBgUrl } = useContent();

  return (
    <section id="home" className="relative min-h-[580px] lg:min-h-[640px] flex flex-col justify-between bg-[#052421] overflow-hidden">
      {/* Background Image of the Centre Building */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBgUrl}
          alt="Re-Life Foundation Rehabilitation Centre Building in Nagaon, Assam"
          className="w-full h-full object-cover object-center lg:object-right"
          referrerPolicy="no-referrer"
        />
        {/* Left-to-right gradient mask matching the screenshot */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#052421] via-[#052421]/90 to-transparent lg:w-3/5" />
        <div className="absolute inset-0 bg-[#052421]/30" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-8 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-4 font-heading">
            A New Beginning. <br />
            A <span className="text-[#D97706]">Healthier</span> Life.
          </h1>

          {/* Subtitle paragraph */}
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal mb-8 max-w-lg">
            Compassionate care and support for alcohol &amp; drug rehabilitation.
            We walk with you every step of the way.
          </p>

          {/* Two Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-12 sm:mb-16">
            <button
              id="hero-get-help-btn"
              onClick={onOpenHelpModal}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#D97706] hover:bg-amber-600 active:bg-amber-700 text-white font-semibold text-base shadow-md transition-all duration-150"
            >
              <span>Get Help</span>
              <HeartHandshake className="w-5 h-5 text-white" />
            </button>

            <a
              id="hero-call-now-btn"
              href={`tel:${orgInfo.phone}`}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#072d29]/80 hover:bg-[#072d29] text-white font-semibold text-base border border-teal-700/80 shadow-sm transition-all duration-150"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>Call Now</span>
            </a>
          </div>
        </div>

        {/* Bottom Trust Badge Bar inside Hero as in screenshot */}
        <div className="w-full max-w-3xl rounded-xl bg-[#031715]/80 border border-teal-800/60 p-4 sm:p-5 backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-teal-800/50">
            {/* Column 1: 24/7 Support */}
            <div className="flex items-center gap-3.5 sm:pr-4">
              <div className="w-10 h-10 rounded-full border-2 border-amber-500 text-amber-500 flex items-center justify-center font-bold text-xs shrink-0">
                24/7
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">24/7 Support</h3>
                <p className="text-xs text-teal-200/80 leading-snug mt-0.5">
                  We are here for you, anytime you need.
                </p>
              </div>
            </div>

            {/* Column 2: Confidential Care */}
            <div className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:px-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">Confidential Care</h3>
                <p className="text-xs text-teal-200/80 leading-snug mt-0.5">
                  Your privacy and dignity are our priority.
                </p>
              </div>
            </div>

            {/* Column 3: Experienced Team */}
            <div className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:pl-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">Experienced Team</h3>
                <p className="text-xs text-teal-200/80 leading-snug mt-0.5">
                  Trained professionals with care and compassion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
