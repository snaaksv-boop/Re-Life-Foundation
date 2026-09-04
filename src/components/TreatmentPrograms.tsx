import React, { useState } from 'react';
import { HeartHandshake, Users, Plus, Flower2, ArrowRight, X } from 'lucide-react';

interface ProgramItem {
  id: string;
  title: string;
  desc: string;
  icon: 'addiction' | 'counselling' | 'medical' | 'yoga';
  details: string[];
}

const treatmentData: ProgramItem[] = [
  {
    id: 'prog-1',
    title: 'Addiction Recovery',
    desc: 'Structured de-addiction programs to help individuals break free and rebuild their lives with dignity.',
    icon: 'addiction',
    details: [
      'Comprehensive initial evaluation & health stabilization',
      '24/7 supportive and respectful care environment',
      'Cognitive and behavioral habit restructuring',
      'Relapse-prevention planning and lifelong guidance'
    ]
  },
  {
    id: 'prog-2',
    title: 'Counselling',
    desc: 'One-on-one and group counselling sessions to address emotional and psychological well-being.',
    icon: 'counselling',
    details: [
      'Confidential 1-on-1 psychological counselling',
      'Daily peer group therapy and shared reflections',
      'Emotional trauma & trigger resolution',
      'Family counselling and rebuilding trusted relationships'
    ]
  },
  {
    id: 'prog-3',
    title: 'Medical Support',
    desc: 'Medical evaluation, regular monitoring and support to manage withdrawal and improve overall health.',
    icon: 'medical',
    details: [
      'Continuous vital signs and physiological monitoring',
      'Coordination with qualified medical doctors',
      'Nutrition-dense balanced recovery meal plans',
      'Safe, compassionate withdrawal symptom management'
    ]
  },
  {
    id: 'prog-4',
    title: 'Yoga & Wellness',
    desc: 'Yoga, meditation and fitness activities to restore balance, reduce stress and promote holistic well-being.',
    icon: 'yoga',
    details: [
      'Daily morning guided asanas on green mats',
      'Pranayama breathwork for nervous system calm',
      'Mindfulness meditation and stress relief',
      'Indoor recreation and physical vitality routines'
    ]
  }
];

export const TreatmentPrograms: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);

  const renderIcon = (type: string) => {
    switch (type) {
      case 'addiction':
        return <HeartHandshake className="w-6 h-6 text-teal-200" />;
      case 'counselling':
        return <Users className="w-6 h-6 text-teal-200" />;
      case 'medical':
        return (
          <div className="w-6 h-6 rounded-md border-2 border-teal-200 flex items-center justify-center">
            <Plus className="w-4 h-4 text-teal-200" />
          </div>
        );
      case 'yoga':
      default:
        return <Flower2 className="w-6 h-6 text-teal-200" />;
    }
  };

  return (
    <section id="treatment" className="py-16 sm:py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching screenshot */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0A413D] block mb-2">
            OUR TREATMENT PROGRAMS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0C2B29] tracking-tight font-heading">
            Comprehensive Care for Lasting Recovery
          </h2>
        </div>

        {/* 4 Cards Grid in a row matching screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {treatmentData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-sm flex flex-col justify-between text-center hover:shadow-md transition-shadow"
            >
              <div>
                {/* Circular dark teal badge */}
                <div className="w-14 h-14 rounded-full bg-[#0A413D] flex items-center justify-center mx-auto mb-5 shadow-sm">
                  {renderIcon(item.icon)}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2.5 font-heading">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              {/* Learn More link */}
              <div>
                <button
                  onClick={() => setSelectedProgram(item)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0A413D] hover:text-teal-700 transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95">
            <button
              onClick={() => setSelectedProgram(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#0A413D] flex items-center justify-center mb-4">
              {renderIcon(selectedProgram.icon)}
            </div>

            <h3 className="text-2xl font-bold text-[#0C2B29] font-heading mb-2">
              {selectedProgram.title}
            </h3>

            <p className="text-sm text-slate-600 mb-5 leading-relaxed">
              {selectedProgram.desc}
            </p>

            <div className="space-y-2.5 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Key Components:
              </h4>
              {selectedProgram.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedProgram(null)}
              className="w-full py-2.5 rounded-lg bg-[#0A413D] text-white font-semibold text-sm hover:bg-[#072f2c]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
