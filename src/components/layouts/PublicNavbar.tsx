import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bell, Menu, SlidersHorizontal, X } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { useCityLens } from '../../context/CityLensContext';

export const PublicNavbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pushToast } = useCityLens();

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#16233B] bg-[#060B14]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <BrandLogo variant="landing" to="/" />

        <nav className="hidden items-center gap-7 text-xs font-medium text-slate-300 lg:flex">
          <Link
            to="/"
            className="border-b-2 border-sky-400 pb-1 text-white transition-colors"
          >
            Home
          </Link>
          <button
            type="button"
            onClick={() => scrollToSection('features')}
            className="pb-1 text-slate-300 transition-colors hover:text-white"
          >
            Features
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('how-it-works')}
            className="pb-1 text-slate-300 transition-colors hover:text-white"
          >
            How It Works
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            className="pb-1 text-slate-300 transition-colors hover:text-white"
          >
            About
          </button>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 pb-1 text-slate-200 transition-colors hover:text-sky-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            Live Route Planner
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() =>
              pushToast(
                'Corridor Notifications (Demo)',
                '3 sample Chennai corridor alerts are active in the Route Planner.',
                'info'
              )
            }
            aria-label="Notifications"
            className="rounded-lg p-2 text-slate-400 hover:bg-[#111C30] hover:text-slate-200"
          >
            <Bell className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() =>
              pushToast(
                'Telemetry Display Preferences',
                'Metric units (km/h, cm) active in Phase 1 demo.',
                'info'
              )
            }
            aria-label="Display settings"
            className="rounded-lg p-2 text-slate-400 hover:bg-[#111C30] hover:text-slate-200"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
          <Link
            to="/select-role"
            className="rounded-lg border border-[#243656] bg-[#0F192C] px-3.5 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
          >
            Sign In
          </Link>
          <Link
            to="/select-role"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white shadow-civic-glow transition-colors hover:bg-[#1D4ED8]"
          >
            <span>Launch Portal</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          className="rounded-lg border border-[#1E2E4A] p-2 text-slate-300 md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#16233B] bg-[#09101D] px-4 py-4 md:hidden">
          <div className="flex flex-col space-y-3 text-sm">
            <Link to="/" onClick={() => setMobileOpen(false)} className="text-white font-medium">
              Home
            </Link>
            <button
              type="button"
              onClick={() => scrollToSection('features')}
              className="text-left text-slate-300"
            >
              Features
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('how-it-works')}
              className="text-left text-slate-300"
            >
              How It Works
            </button>
            <Link
              to="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="text-sky-400 font-medium"
            >
              • Live Route Planner
            </Link>
            <div className="flex gap-2 pt-2">
              <Link
                to="/select-role"
                onClick={() => setMobileOpen(false)}
                className="civic-btn-secondary flex-1 text-xs"
              >
                Sign In
              </Link>
              <Link
                to="/select-role"
                onClick={() => setMobileOpen(false)}
                className="civic-btn-primary flex-1 text-xs"
              >
                Launch Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
