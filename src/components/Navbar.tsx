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
          className="focus:outline-none"
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

        {/* Right side Amber Button "Get Help Now" and "Customized" button */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            id="navbar-customize-btn"
            onClick={onOpenAdminModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#083531] hover:bg-[#0c4742] text-teal-100 hover:text-white text-xs font-semibold border border-teal-700/60 shadow-sm transition-all"
            title="Customized website editor (Password Protected)"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>Customized</span>
          </button>

          <button
            id="navbar-get-help-btn"
            onClick={onOpenHelpModal}
            className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-[#D97706] hover:bg-amber-600 active:bg-amber-700 text-white font-semibold text-sm shadow-md transition-all duration-200"
          >
            <PhoneCall className="w-4 h-4 text-white" />
            <span>Get Help Now</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            id="mobile-customize-btn"
            onClick={onOpenAdminModal}
            className="px-2.5 py-1.5 text-xs font-semibold text-teal-100 bg-[#083531] border border-teal-700/60 rounded-md flex items-center gap-1"
          >
            <Sliders className="w-3 h-3 text-amber-400" />
            <span>Edit</span>
          </button>
          <button
            id="mobile-help-btn"
            onClick={onOpenHelpModal}
            className="px-3 py-1.5 text-xs font-bold text-white bg-[#D97706] rounded-md shadow-sm"
          >
            Get Help
          </button>
          <button
            id="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-teal-200 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#041d1a] border-t border-teal-900/80 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className="block px-3 py-2 text-sm text-teal-100 hover:text-amber-400 hover:bg-teal-950/60 rounded-md"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-teal-900/60 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHelpModal();
              }}
              className="w-full py-2.5 bg-[#D97706] text-white font-semibold text-sm rounded-lg flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>Get Help Now</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminModal();
              }}
              className="w-full py-2 bg-[#083531] text-teal-100 font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 border border-teal-700/60"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Customized (Password Protected)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
