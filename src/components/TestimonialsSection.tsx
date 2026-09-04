import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Star, Quote, Plus, User, ShieldCheck } from 'lucide-react';

interface TestimonialsSectionProps {
  onOpenAdminTestimonials: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onOpenAdminTestimonials }) => {
  const { testimonials } = useContent();

  return (
    <section className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <span className="text-xs font-extrabold tracking-widest uppercase text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              COMMUNITY VOICES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 font-heading">
              Stories of Hope
            </h2>
            <p className="text-base text-slate-700 mt-2">
              Reflections shared by recovering individuals and grateful families who found new beginnings.
            </p>
          </div>

          <button
            onClick={onOpenAdminTestimonials}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg border border-teal-200 transition-colors self-start md:self-auto"
          >
            <Plus className="w-3.5 h-3.5 text-teal-700" />
            <span>Add / Manage Stories</span>
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-2xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-5">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-slate-700 italic leading-relaxed mb-6">
                  "{item.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-800 text-teal-100 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                  {item.author.charAt(0) || <User className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    {item.author}
                  </h3>
                  <p className="text-xs text-teal-800 font-medium">
                    {item.relationship}
                  </p>
                  {item.date && (
                    <span className="text-[10px] text-slate-700 block">
                      {item.date}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ethical Note */}
        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-slate-700 text-center">
          <ShieldCheck className="w-4 h-4 text-teal-700" />
          <span>Names and details shared with explicit consent, respecting client privacy laws.</span>
        </div>

      </div>
    </section>
  );
};
