import React from 'react';
import { Target, Eye, Sparkles, Shield, HeartHandshake } from 'lucide-react';

export const MissionVisionSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <span className="text-xs font-extrabold tracking-widest uppercase text-teal-800 bg-teal-100/60 px-3 py-1 rounded-full border border-teal-200">
            GUIDING PRINCIPLES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3 font-heading">
            Our Purpose &amp; Core Convictions
          </h2>
          <p className="text-sm sm:text-base text-slate-700 mt-2">
            Every therapy session, routine and program is rooted in deep respect for human potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Mission Card */}
          <div className="bg-white rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-md border border-slate-200/80 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-13 h-13 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center mb-6 group-hover:bg-teal-800 group-hover:text-amber-300 transition-colors border border-teal-100">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block mb-1">
                OUR MISSION
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-3 font-heading">
                Empowering Recovery
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                "To support individuals in overcoming addiction and moving towards healthier, more meaningful lives."
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-teal-800 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Individual-Centric Care
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-md border border-slate-200/80 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-13 h-13 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center mb-6 group-hover:bg-teal-800 group-hover:text-amber-300 transition-colors border border-teal-100">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block mb-1">
                OUR VISION
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-3 font-heading">
                Dignity &amp; Acceptance
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                "A society where individuals affected by addiction receive compassion, dignity, support and opportunities for recovery."
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-teal-800 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Stigma-Free Society
            </div>
          </div>

          {/* Values Card */}
          <div className="bg-white rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-md border border-slate-200/80 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-13 h-13 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 group-hover:bg-teal-800 group-hover:text-amber-300 transition-colors border border-amber-100">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
                OUR VALUES
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-3 font-heading">
                Compassionate Code
              </h3>
              <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed">
                Compassion • Respect • Confidentiality • Responsibility • Hope
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-teal-800 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Guiding Every Interaction
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
