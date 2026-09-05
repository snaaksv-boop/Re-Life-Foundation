import React, { useRef, useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Camera, Upload, Quote, CheckCircle2, User, Sparkles, Loader2 } from 'lucide-react';
import { compressImage } from '../lib/imageUtils';

interface FounderSectionProps {
  onOpenEditFounder: () => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ onOpenEditFounder }) => {
  const { founder, setFounderPhoto } = useContent();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const compressed = await compressImage(file, 800, 800, 0.72);
        await setFounderPhoto(compressed);
      } catch (err) {
        console.warn('Compression fallback', err);
        const reader = new FileReader();
        reader.onload = async () => {
          if (typeof reader.result === 'string') {
            await setFounderPhoto(reader.result);
          }
        };
        reader.readAsDataURL(file);
      } finally {
        setIsUploading(false);
      }
    }
    e.target.value = '';
  };

  return (
    <section id="founder" className="py-20 sm:py-24 bg-slate-50 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Founder Card Container */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-14 border border-slate-200/90 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Founder Philosophy & Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-widest uppercase text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>MEET OUR FOUNDER</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
                Founder: {founder.name}
              </h2>

              <div className="relative pl-6 border-l-4 border-amber-400 py-1">
                <Quote className="w-8 h-8 text-amber-400/40 absolute -top-3 -left-3" />
                <p className="text-lg sm:text-xl font-medium italic text-slate-800 leading-snug">
                  "{founder.quote}"
                </p>
              </div>

              <div className="text-base text-slate-700 leading-relaxed space-y-4 pt-2">
                <p>
                  {founder.message}
                </p>
                <p>
                  "When a person is trapped by addiction, the whole family suffers in silence. Our mission at Borbhiti, Nagaon is to offer an unwavering haven of medical safety, emotional listening, and moral restoration, free of fear or rejection."
                </p>
              </div>

              {/* Founder Signature & Title */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-100 gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">
                    {founder.name}
                  </h3>
                  <p className="text-xs font-semibold text-teal-800">
                    {founder.title}, {founder.organization}
                  </p>
                </div>

                {/* Stylish cursive signature area */}
                <div className="pr-4 select-none">
                  <span className="font-signature text-3xl sm:text-4xl text-slate-800 tracking-wider">
                    — {founder.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Dedicated Founder Photo Upload Area (as explicitly requested & pictured in mock) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-2 bg-gradient-to-tr from-amber-300 via-teal-700 to-teal-900 shadow-xl flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-white overflow-hidden relative flex flex-col items-center justify-center p-4 border-4 border-white shadow-inner">
                  {founder.photoUrl ? (
                    <img
                      src={founder.photoUrl}
                      alt={`Founder ${founder.name}`}
                      className="w-full h-full object-cover object-top rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-4">
                      {/* Clean outline icon */}
                      <div className="w-20 h-20 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-400 mb-2">
                        <User className="w-12 h-12 stroke-[1.5]" />
                      </div>
                      <span className="text-sm font-bold text-slate-700">
                        Founder Photo
                      </span>
                      <span className="text-[11px] text-slate-700 mt-1 max-w-[140px]">
                        Click camera icon to upload photo
                      </span>
                    </div>
                  )}

                  {/* Camera icon button to trigger upload */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 p-3 rounded-full bg-teal-800 hover:bg-teal-700 text-white shadow-lg border-2 border-white hover:scale-105 active:scale-95 transition-all disabled:opacity-75"
                    title="Upload / Change Founder Photo"
                  >
                    {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Photo Caption & Admin quick edit */}
              <div className="mt-5 text-center">
                <p className="text-xs font-semibold text-slate-700">
                  {founder.photoUrl ? "Custom Founder Photo Active" : "Dedicated Image Upload Placeholder"}
                </p>
                <div className="mt-2 flex items-center justify-center gap-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-bold text-teal-800 hover:text-teal-950 underline decoration-dotted"
                  >
                    {founder.photoUrl ? "Change Photo" : "Upload Founder Photo"}
                  </button>
                  {founder.photoUrl && (
                    <button
                      onClick={() => setFounderPhoto(null)}
                      className="text-xs text-rose-600 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
