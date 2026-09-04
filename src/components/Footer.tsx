import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="bg-[#051C1A] text-slate-300 py-6 border-t border-teal-900/60 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left: Copyright matching screenshot */}
        <div>
          <p className="text-slate-300 font-normal">
            &copy; 2025 Re-Life Foundation. All Rights Reserved.
          </p>
        </div>

        {/* Right: Privacy Policy | Terms & Conditions matching screenshot */}
        <div className="flex items-center gap-2 text-slate-300">
          <button
            onClick={() => setLegalModal('privacy')}
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </button>
          <span>|</span>
          <button
            onClick={() => setLegalModal('terms')}
            className="hover:text-white transition-colors"
          >
            Terms &amp; Conditions
          </button>
          <span>|</span>
          <button
            onClick={onOpenAdmin}
            className="text-teal-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-semibold"
            title="Customized website editor (Password Protected)"
          >
            <Lock className="w-3 h-3 text-amber-400" />
            <span>Customized</span>
          </button>
        </div>

      </div>

      {/* Modal for Privacy Policy / Terms */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
            <h3 className="text-xl font-bold font-heading mb-4 text-teal-950">
              {legalModal === 'privacy' ? 'Client Privacy & Confidentiality' : 'Terms & Conditions'}
            </h3>
            
            <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    Re-Life Foundation is firmly committed to maintaining absolute confidentiality regarding resident records, consultation notes, and family inquiries.
                  </p>
                  <p>
                    No personal details, names, or contact records are disclosed to unauthorized third parties. All therapy and rehabilitation records are stored under strict physical and ethical standards.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Re-Life Foundation is a registered de-addiction and rehabilitation centre (Registration No: 2025/IGR015/4/701) located in Borbhiti, Nagaon, Assam.
                  </p>
                  <p>
                    Rehabilitation requires dedication from the resident, care staff, and family members. We provide structured evidence-informed therapeutic recovery programs.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 rounded-lg bg-[#0A413D] text-white font-semibold text-xs hover:bg-[#072f2c]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
