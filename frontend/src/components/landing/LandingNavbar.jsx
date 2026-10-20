import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/**
 * LandingNavbar
 * Public header for the luxury wellness editorial landing page.
 * Implements:
 * - Warm Ivory background with hairline Stone rule
 * - Editorial serif wordmark
 * - Accessible mobile navigation drawer
 * - Seamless transition to authenticated member preview
 */
export const LandingNavbar = ({ onEnterPlatform }) => {
  const { currentUser, logout, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'The Architecture', href: '#pillars' },
    { label: 'Computer Vision', href: '#ai-nutrition' },
    { label: 'The Protocol', href: '#protocol' },
    { label: 'Philosophy', href: '#philosophy' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F4F1E9]/95 backdrop-blur-md border-b border-[#D9D5CB]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between">
        {/* Brand Wordmark */}
        <div className="flex items-baseline gap-3">
          <a
            href="#hero"
            className="font-serif text-2xl tracking-[0.12em] font-medium text-[#171916] hover:opacity-85 transition-opacity"
          >
            ATHLY
          </a>
          <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.16em] text-[#4B4F48] font-sans border-l border-[#D9D5CB] pl-3 py-0.5">
            The Discipline of Wellness
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs uppercase tracking-[0.12em] font-medium text-[#4B4F48] hover:text-[#171916] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#171916]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Controls */}
        <div className="hidden sm:flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#4B4F48]">
                {currentUser.displayName || currentUser.email}
              </span>
              <button
                type="button"
                onClick={logout}
                className="text-xs uppercase tracking-[0.12em] font-medium text-[#4B4F48] hover:text-[#171916] transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openAuthModal('signin')}
              className="text-xs uppercase tracking-[0.12em] font-medium text-[#171916] px-3 py-2 hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#171916]"
            >
              Sign In
            </button>
          )}
          <button
            type="button"
            onClick={onEnterPlatform}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#171916] text-[#F4F1E9] hover:bg-[#282B26] text-xs uppercase tracking-[0.14em] font-medium transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5D99A] active:scale-[0.98]"
          >
            <span>Explore Demo</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C5D99A]" />
          </button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden p-2 text-[#171916] hover:bg-[#EBE7DC] rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#171916]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FAF8F3] border-b border-[#D9D5CB] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm uppercase tracking-[0.1em] font-medium text-[#171916] py-1 border-b border-[#EBE7DC]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onEnterPlatform();
              }}
              className="w-full py-3 rounded-full bg-[#171916] text-[#F4F1E9] text-xs uppercase tracking-[0.14em] font-medium flex items-center justify-center gap-2"
            >
              <span>Enter Platform Preview</span>
              <ArrowUpRight className="w-4 h-4 text-[#C5D99A]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
