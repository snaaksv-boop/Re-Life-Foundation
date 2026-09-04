import React from 'react';
import { X, ShieldCheck, Heart, Users, MapPin, CheckCircle, Award } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface AboutDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

export const AboutDetailModal: React.FC<AboutDetailModalProps> = ({ isOpen, onClose, onContactClick }) => {
  const { orgInfo } = useContent();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-xs font-bold uppercase tracking-widest text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 inline-block mb-3">
          INSTITUTIONAL PROFILE
        </span>

        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading mb-4">
          About Re-Life Foundation
        </h3>

        <div className="text-sm text-slate-700 space-y-4 leading-relaxed">
          <p>
            <strong>Re-Life Foundation</strong> was founded in Borbhiti, Nagaon, Assam, with a solitary mission: to bridge the critical gap between medical safety, psychological dignity, and sustainable family reintegration for individuals battling addiction.
          </p>

          <p>
            Operating under official Government Registration Number <code className="bg-slate-100 px-2 py-0.5 rounded font-mono text-slate-900 font-semibold">{orgInfo.registrationNo}</code>, our centre functions as an empathetic, stigma-free therapeutic community.
          </p>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3 my-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Our Core Clinical &amp; Social Standards:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Zero Physical Restraint or Humiliation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Confidential Intake &amp; Case Notes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Physician &amp; Psychiatric Health Oversight</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Dedicated Family Reconnection Sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Nutritious Meals &amp; Physical Fitness</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Relapse Prevention Aftercare Planning</span>
              </div>
            </div>
          </div>

          <p>
            Whether addressing alcohol dependence, opioid use, or poly-substance challenges, we emphasize restoring the resident's inner agency and personal accountability.
          </p>
        </div>

        {/* Footer actions */}
        <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <MapPin className="w-4 h-4 text-teal-700 shrink-0" />
            <span>Borbhiti, Nagaon, Assam – 781002</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onContactClick();
              }}
              className="px-5 py-2 rounded-xl bg-teal-800 hover:bg-teal-700 text-white text-xs font-bold shadow-md transition-colors"
            >
              Contact Our Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
