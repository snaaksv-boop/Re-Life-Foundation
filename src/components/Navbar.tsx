import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, Sliders } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenHelpModal: () => void;
  onOpenAdminModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenHelpModal, onOpenAdminModal }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'treatment', 'facilities', 'gallery', 'videos', 'founder', 'contact'];
      const scrollPosition = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Treatment', id: 'treatment' },
    { name: 'Facilities', id: 'facilities' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Videos', id: 'videos' },
    { name: 'Founder', id: 'founder' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#052421] border-b border-teal-900/60 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo matching screenshot */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="focus:outline-none shrink-0"
        >
          <Logo variant="light" />
        </a>

        {/* Desktop Navigation Links matching screenshot */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`text-sm tracking-wide transition-all duration-150 py-1 ${
                  isActive
                    ? 'text-white font-semibold border-b-2 border-amber-500'
                    : 'text-teal-100/80 hover:text-white font-normal'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right side: Exactly ONE Amber "Get Help Now" button + 3-line menu toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            id="navbar-get-help-btn"
            onClick={onOpenHelpModal}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#D97706] hover:bg-amber-600 active:bg-amber-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
            <span>Get Help Now</span>
          </button>

          {/* 3-line menu button (Hamburger Menu) */}
          <button
            id="navbar-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-teal-100 hover:text-white rounded-lg hover:bg-teal-900/60 focus:outline-none transition-colors cursor-pointer shrink-0"
            aria-label="Toggle Menu"
            title="Menu (3 Lines)"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3-Line Menu Drawer */}
      {mobileMenuOpen && (
        <div className="bg-[#041d1a] border-t border-teal-900/80 px-4 py-4 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-teal-400/80 px-3 pt-1">
            Menu Navigation
          </div>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className="block px-3 py-2 text-sm text-teal-100 hover:text-amber-400 hover:bg-teal-950/60 rounded-md transition-colors"
            >
              {link.name}
            </a>
          ))}

          <div className="pt-3 border-t border-teal-900/60 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHelpModal();
              }}
              className="w-full py-2.5 bg-[#D97706] hover:bg-amber-600 text-white font-semibold text-sm rounded-lg flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>Get Help Now (24/7 Helpline)</span>
            </button>

            {/* Customized option ONLY inside 3-line menu as requested */}
            <button
              id="menu-customized-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminModal();
              }}
              className="w-full py-2.5 bg-[#083531] hover:bg-[#0c4742] text-teal-100 hover:text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-2 border border-teal-700/60 transition-colors shadow-xs cursor-pointer"
              title="Customized website editor (Password Protected)"
            >
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Customized (Password Protected)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
