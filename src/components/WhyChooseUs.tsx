import React from 'react';
import {
  ShieldCheck,
  Lock,
  UserCheck,
  MessagesSquare,
  Sparkles,
  Users,
  Clock,
  HeartHandshake
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      title: "Supportive Environment",
      desc: "A peaceful sanctuary free from triggers, focused solely on emotional recovery and healthy discipline.",
      icon: ShieldCheck,
    },
    {
      title: "Confidential Care",
      desc: "Complete discretion. Your identity and personal journey remain strictly private at all times.",
      icon: Lock,
    },
    {
      title: "Individual Attention",
      desc: "Customized recovery roadmap tailored to your specific substance history, health, and psychological needs.",
      icon: UserCheck,
    },
    {
      title: "Counselling Support",
      desc: "Compassionate psychologists providing regular one-on-one sessions and empathetic guidance.",
      icon: MessagesSquare,
    },
    {
      title: "Wellness Activities",
      desc: "Daily morning yoga, breathwork, meditation, and healthy physical routines restoring vitality.",
      icon: Sparkles,
    },
    {
      title: "Family Guidance",
      desc: "Interactive family counselling healing broken trust and preparing a resilient supportive home environment.",
      icon: Users,
    },
    {
      title: "24/7 Assistance",
      desc: "Round-the-clock supportive staff, crisis handling, and dedicated monitoring whenever needed.",
      icon: Clock,
    },
    {
      title: "Respect & Dignity",
      desc: "Zero judgment and zero stigma. Every human being is treated with profound respect and empathy.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-teal-950 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-800/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400 bg-teal-900/80 px-3.5 py-1 rounded-full border border-teal-700/60">
            OUR COMMITMENT
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-4 font-heading">
            Why Choose Re-Life Foundation?
          </h2>
          <p className="text-base sm:text-lg text-teal-100/80 mt-3 leading-relaxed">
            We understand that deciding to seek help takes immense courage. Here is why families across Assam trust our care.
          </p>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-teal-900/60 hover:bg-teal-900/90 border border-teal-700/50 hover:border-amber-400/60 rounded-2xl p-6 transition-all duration-300 backdrop-blur-sm group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-800/90 group-hover:bg-amber-400 text-amber-300 group-hover:text-slate-950 flex items-center justify-center mb-5 transition-colors shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-heading group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-teal-200/80 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
