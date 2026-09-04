import React from 'react';
import { useContent } from '../context/ContentContext';
import { Compass, Sparkles } from 'lucide-react';

export const ApproachSection: React.FC = () => {
  const { recoverySteps } = useContent();

  return (
    <section id="approach" className="py-20 sm:py-24 bg-slate-50 border-t border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-extrabold tracking-widest uppercase text-teal-800 bg-teal-100/70 px-3 py-1 rounded-full border border-teal-200">
            OUR RECOVERY JOURNEY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 font-heading">
            A Step-by-Step Path to Healing
          </h2>
          <p className="text-base text-slate-700 mt-3 leading-relaxed">
            Our multi-disciplinary methodology ensures that every stage of physical, emotional, and relational recovery is nurtured with professional oversight.
          </p>
        </div>

        {/* 6-Step Journey Grid with connecting visual logic */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {recoverySteps.map((step, idx) => (
            <div
              key={step.step}
              className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 relative group hover:border-teal-300"
            >
              {/* Step number badge with gold highlight */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-3xl font-black font-heading text-teal-800 group-hover:text-amber-500 transition-colors">
                  {step.step}
                </span>
                <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 group-hover:bg-teal-50 group-hover:text-teal-800 transition-colors">
                  Phase {idx + 1}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1 font-heading group-hover:text-teal-900 transition-colors">
                {step.title}
              </h3>

              <p className="text-xs font-semibold text-teal-800 mb-3">
                {step.subtitle}
              </p>

              <p className="text-sm text-slate-700 leading-relaxed">
                {step.description}
              </p>

              {/* Bottom decorative bar */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                <span>Care &amp; Guidance</span>
                <span className="w-2 h-2 rounded-full bg-teal-400 group-hover:bg-amber-400 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner quote */}
        <div className="mt-14 max-w-3xl mx-auto text-center p-6 rounded-2xl bg-teal-900 text-white shadow-lg border border-teal-800">
          <p className="text-base sm:text-lg font-medium italic text-teal-100">
            "Recovery is not a race; it is a gradual awakening to health, peace, and meaningful purpose."
          </p>
          <span className="block mt-2 text-xs font-bold uppercase tracking-widest text-amber-300">
            Re-Life Foundation Care Team
          </span>
        </div>

      </div>
    </section>
  );
};
