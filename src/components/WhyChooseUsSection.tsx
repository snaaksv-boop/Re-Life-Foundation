import React from 'react';
import {
  ShieldCheck,
  HeartHandshake,
  UserCheck,
  Headphones,
  Flower2,
  Users2,
  Clock,
  Sparkles,
  Award
} from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const points = [
    {
      title: "Supportive Environment",
      desc: "A calm, peaceful sanctuary away from urban triggers where every resident feels valued and protected.",
      icon: <HeartHandshake className="w-6 h-6" />
    },
    {
      title: "Confidential Care",
      desc: "Strict adherence to privacy protocols. Your medical records, family history and personal journey remain secure.",
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      title: "Individual Attention",
      desc: "Every recovery plan is tailored with personalized focus on unique behavioral triggers and physical health.",
      icon: <UserCheck className="w-6 h-6" />
    },
    {
      title: "Counselling Support",
      desc: "Empathetic psychological counselling addressing anxiety, withdrawal blues, and emotional healing.",
      icon: <Headphones className="w-6 h-6" />
    },
    {
      title: "Wellness Activities",
      desc: "Daily yoga, mindful pranayama meditation, light recreation and nutritious dietary support.",
      icon: <Flower2 className="w-6 h-6" />
    },
    {
      title: "Family Guidance",
      desc: "Structured family sessions to rebuild communication, mend trust, and foster an encouraging home atmosphere.",
      icon: <Users2 className="w-6 h-6" />
    },
    {
      title: "24/7 Assistance",
      desc: "Round-the-clock supportive staff and emergency response ready whenever crisis or distress strikes.",
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: "Respect & Dignity",
      desc: "Zero judgment and zero punitive measures. We treat addiction as a health challenge with compassion.",
      icon: <Award className="w-6 h-6" />
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-teal-950 text-white relative overflow-hidden">
      {/* Subtle background ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-800/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-extrabold tracking-widest uppercase text-amber-300 bg-teal-900/80 px-3.5 py-1 rounded-full border border-teal-700/60 shadow-sm">
            THE RE-LIFE DIFFERENCE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-3 font-heading">
            Why Choose Re-Life Foundation?
          </h2>
          <p className="text-base sm:text-lg text-teal-200/90 mt-3 leading-relaxed">
            Our holistic and compassionate model is built specifically to guide individuals away from chemical reliance towards purposeful, self-respecting lives.
          </p>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {points.map((point, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-teal-900/50 hover:bg-teal-900/80 border border-teal-800/80 hover:border-amber-400/40 backdrop-blur-sm transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-950 text-amber-400 flex items-center justify-center mb-5 border border-teal-700/60 group-hover:scale-110 group-hover:border-amber-400/60 transition-all shadow-inner">
                {point.icon}
              </div>

              <h3 className="text-lg font-bold text-white mb-2 font-heading group-hover:text-amber-300 transition-colors">
                {point.title}
              </h3>

              <p className="text-xs sm:text-sm text-teal-100/80 leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Registration & Credentials pill */}
        <div className="mt-14 pt-8 border-t border-teal-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-teal-300/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Registration No: <strong>2025/IGR015/4/701</strong></span>
          </div>
          <div>
            <span>Borbhiti, Nagaon, Assam • Serving Northeast India with Dedicated Care</span>
          </div>
        </div>

      </div>
    </section>
  );
};
