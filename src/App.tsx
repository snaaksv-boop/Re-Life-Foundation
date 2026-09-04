import React, { useState } from 'react';
import { ContentProvider } from './context/ContentContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { TreatmentPrograms } from './components/TreatmentPrograms';
import { FacilitiesSection } from './components/FacilitiesSection';
import { VideosAndFounderSection } from './components/VideosAndFounderSection';
import { GetInTouchSection } from './components/GetInTouchSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { QuickHelpModal } from './components/QuickHelpModal';
import { AdminModal } from './components/AdminModal';
import { GallerySection } from './components/GallerySection';

export default function App() {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [adminTab, setAdminTab] = useState<string>('about');

  const handleOpenAdminWithTab = (tab: string) => {
    setAdminTab(tab);
    setIsAdminModalOpen(true);
  };

  return (
    <ContentProvider>
      <div className="min-h-screen bg-white text-slate-800 flex flex-col selection:bg-teal-800 selection:text-white relative">
        
        {/* Navbar */}
        <Navbar
          onOpenHelpModal={() => setIsHelpModalOpen(true)}
          onOpenAdminModal={() => handleOpenAdminWithTab('founder')}
        />

        {/* Main Sections matching the exact reference screenshot */}
        <main className="flex-1">
          {/* 1. Hero Section */}
          <Hero
            onOpenHelpModal={() => setIsHelpModalOpen(true)}
          />

          {/* 2. About Us Section */}
          <AboutSection
            onLearnMore={() => {
              const el = document.getElementById('treatment');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* 3. Our Treatment Programs (4 Cards in a row) */}
          <TreatmentPrograms />

          {/* 4. Our Facilities (5 Photos in a row + View Full Gallery button) */}
          <FacilitiesSection
            onViewFullGallery={() => {
              const el = document.getElementById('gallery');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                setIsGalleryModalOpen(true);
              }
            }}
          />

          {/* 4.5 Photo Gallery (New photos appear 1st, delete option available) */}
          <GallerySection
            onOpenAdminUpload={() => handleOpenAdminWithTab('gallery')}
          />

          {/* 5. Our Videos (3 cards) + Founder (Siddik Ali golden frame) in 1 row */}
          <VideosAndFounderSection />

          {/* 6. Get In Touch (Heading + 3 Cards: Location, Call Us, Reg No) */}
          <GetInTouchSection
            onOpenHelpModal={() => setIsHelpModalOpen(true)}
          />
        </main>

        {/* 7. Footer matching screenshot */}
        <Footer
          onOpenAdmin={() => handleOpenAdminWithTab('inquiries')}
        />

        {/* 8. Floating Action Buttons (Green WhatsApp pill + White Call Now pill) */}
        <FloatingActions />

        {/* Quick Help Modal */}
        <QuickHelpModal
          isOpen={isHelpModalOpen}
          onClose={() => setIsHelpModalOpen(false)}
        />

        {/* Admin / Photo Management Modal */}
        <AdminModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          defaultTab={adminTab}
        />

        {/* Full Gallery Modal */}
        {isGalleryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-5xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8">
              <button
                onClick={() => setIsGalleryModalOpen(false)}
                className="absolute top-5 right-5 p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors z-10"
              >
                ✕
              </button>
              <GallerySection
                onOpenAdminUpload={() => {
                  setIsGalleryModalOpen(false);
                  handleOpenAdminWithTab('gallery');
                }}
              />
            </div>
          </div>
        )}

      </div>
    </ContentProvider>
  );
}
