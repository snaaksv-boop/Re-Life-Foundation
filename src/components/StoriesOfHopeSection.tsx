import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Quote, Star, Heart, MessageSquarePlus, User, CheckCircle2, X } from 'lucide-react';

export const StoriesOfHopeSection: React.FC = () => {
  const { testimonials, addTestimonial } = useContent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    relation: 'Family Member',
    story: '',
    recoveryDuration: '1 Year Drug-Free',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.story.trim()) return;

    addTestimonial({
      name: formData.name.trim(),
      relation: formData.relation,
      story: formData.story.trim(),
      recoveryDuration: formData.recoveryDuration,
      verified: false
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
      setFormData({
        name: '',
        relation: 'Family Member',
        story: '',
        recoveryDuration: '1 Year Drug-Free',
      });
    }, 1800);
  };

  return (
    <section id="stories" className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold tracking-widest uppercase text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              STORIES OF HOPE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 font-heading">
              Voices of Recovery &amp; Reconnection
            </h2>
            <p className="text-base text-slate-700 mt-2 leading-relaxed">
              Real reflections from residents and families who discovered renewed health, peaceful reconciliation, and restored hope.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs sm:text-sm font-bold border border-teal-200 transition-colors self-start md:self-auto cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-teal-700" />
            <span>Share Your Reflection</span>
          </button>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50/80 rounded-2xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="w-10 h-10 text-amber-400/30 absolute top-6 right-6" />

              <div>
                {/* 5 Stars representation */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic relative z-10 mb-6">
                  "{item.story}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">
                    {item.name}
                  </h3>
                  <span className="text-xs text-slate-700 block">
                    {item.relation}
                  </span>
                </div>

                {item.recoveryDuration && (
                  <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                    {item.recoveryDuration}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Ethical Note */}
        <div className="mt-12 text-center text-xs text-slate-700">
          <p>
            * Names and identifying details may be adjusted upon request to protect client and family confidentiality in compliance with medical privacy ethics.
          </p>
        </div>

      </div>

      {/* Reflection Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block mb-1">
              COMMUNITY REFLECTIONS
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mb-2">
              Share Your Journey of Hope
            </h3>
            <p className="text-xs text-slate-700 mb-6">
              Your words can give courage to a struggling family taking their very first step today.
            </p>

            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Thank You For Sharing</h4>
                <p className="text-xs text-slate-700 max-w-xs mx-auto">
                  Your heartfelt reflection has been added to our Stories of Hope.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name (or Initials / Anonymous)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. R. Bora or Grateful Mother"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Relationship
                    </label>
                    <select
                      value={formData.relation}
                      onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700"
                    >
                      <option value="Resident Alumnus">Resident Alumnus</option>
                      <option value="Family Member">Family Member (Parent / Spouse / Sibling)</option>
                      <option value="Well-wisher & Visitor">Well-wisher &amp; Visitor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Milestone / Timeframe
                    </label>
                    <input
                      type="text"
                      value={formData.recoveryDuration}
                      onChange={(e) => setFormData({ ...formData, recoveryDuration: e.target.value })}
                      placeholder="e.g. 6 Months Sober"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Reflection / Experience
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.story}
                    onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                    placeholder="Describe how the environment, guidance, and caring staff supported you or your loved one..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-teal-800 hover:bg-teal-700 text-white text-xs font-bold shadow-md transition-colors"
                  >
                    Publish Reflection
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
