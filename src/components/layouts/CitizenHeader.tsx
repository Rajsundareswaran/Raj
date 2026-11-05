import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AlertTriangle,
  Bell,
  CloudSun,
  Compass,
  Menu,
  MessageSquare,
  Radio,
  Shield,
  SlidersHorizontal,
  User,
  X,
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { useCityLens } from '../../context/CityLensContext';

interface CitizenHeaderProps {
  activeSubTab?: 'route' | 'alerts' | 'community';
  onSelectSubTab?: (tab: 'route' | 'alerts' | 'community') => void;
}

export const CitizenHeader: React.FC<CitizenHeaderProps> = ({
  activeSubTab = 'route',
  onSelectSubTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { incidents, citizenUser, pushToast } = useCityLens();

  const activeAlertsCount = incidents.filter(
    (inc) => inc.status === 'Pending' || inc.status === 'Verified'
  ).length;

  const isReportRoute = location.pathname.startsWith('/citizen/report');
  const isDashboardRoute = location.pathname === '/dashboard';

  return (
    <header className="sticky top-0 z-40 border-b border-[#16233B] bg-[#070D19]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-6">
          <BrandLogo
            variant="citizen"
            subtitle="• Chennai Network Demo Active"
            to="/"
          />

          <nav className="hidden items-center gap-1 lg:flex">
            {isDashboardRoute && onSelectSubTab ? (
              <button
                type="button"
                onClick={() => onSelectSubTab('route')}
                className={`inline-flex items-center gap-2 border-b-2 px-3 py-2 text-xs font-semibold transition-colors ${
                  activeSubTab === 'route'
                    ? 'border-sky-400 text-sky-300'
                    : 'border-transparent text-slate-300 hover:text-white'
                }`}
              >
                <Compass className="h-3.5 w-3.5" />
                Route Explorer
              </button>
            ) : (
              <Link
                to="/dashboard"
                className={`inline-flex items-center gap-2 border-b-2 px-3 py-2 text-xs font-semibold transition-colors ${
                  isDashboardRoute
                    ? 'border-sky-400 text-sky-300'
                    : 'border-transparent text-slate-300 hover:text-white'
                }`}
              >
                <Compass className="h-3.5 w-3.5" />
                Live Route Planner
              </Link>
            )}

            {isDashboardRoute && onSelectSubTab ? (
              <button
                type="button"
                onClick={() => onSelectSubTab('alerts')}
                className={`inline-flex items-center gap-2 border-b-2 px-3 py-2 text-xs font-semibold transition-colors ${
                  activeSubTab === 'alerts'
                    ? 'border-sky-400 text-sky-300'
                    : 'border-transparent text-slate-300 hover:text-white'
                }`}
              >
                <Radio className="h-3.5 w-3.5" />
                Live Alerts ({activeAlertsCount})
              </button>
            ) : null}

            <Link
              to="/citizen/report"
              className={`inline-flex items-center gap-2 border-b-2 px-3 py-2 text-xs font-semibold transition-colors ${
                isReportRoute
                  ? 'border-sky-400 text-sky-300'
                  : 'border-transparent text-slate-300 hover:text-white'
              }`}
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              Report Issue
            </Link>

            {isDashboardRoute && onSelectSubTab ? (
              <button
                type="button"
                onClick={() => onSelectSubTab('community')}
                className={`inline-flex items-center gap-2 border-b-2 px-3 py-2 text-xs font-semibold transition-colors ${
                  activeSubTab === 'community'
                    ? 'border-sky-400 text-sky-300'
                    : 'border-transparent text-slate-300 hover:text-white'
                }`}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Community Feed
              </button>
            ) : (
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center gap-1.5 border-b-2 border-transparent px-3 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Operations Hub
              </Link>
            )}
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="hidden xl:flex items-center gap-2 rounded-xl border border-[#1B2B46] bg-[#0C1526] px-3 py-1.5 text-xs text-slate-300">
            <CloudSun className="h-4 w-4 text-sky-400" />
            <span>Chennai 31°C • Partly Cloudy • Humidity 74%</span>
          </div>

          <button
            type="button"
            onClick={() =>
              pushToast(
                `${activeAlertsCount} Active Chennai Corridor Alerts`,
                'Showing local demonstration telemetry notifications.',
                'info'
              )
            }
            aria-label="View alerts"
            className="relative rounded-lg p-2 text-slate-300 hover:bg-[#132038]"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white">
              {Math.min(activeAlertsCount, 9)}
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              pushToast(
                'Map & Layer Settings',
                'Use the Traffic Heatmap, Incidents Only, and Satellite toggles on the map.',
                'info'
              )
            }
            aria-label="Settings"
            className="rounded-lg p-2 text-slate-400 hover:bg-[#132038] hover:text-slate-200"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>

          <Link
            to="/select-role"
            className="flex items-center gap-2.5 rounded-xl border border-[#1E2F4D] bg-[#0D1729] px-3 py-1.5 text-left transition-colors hover:border-sky-500/40"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500/20 text-xs font-bold text-sky-300">
              <User className="h-3.5 w-3.5" />
            </div>
            <div className="leading-tight">
              <div className="text-xs font-semibold text-slate-100">{citizenUser.name}</div>
              <div className="text-[10px] text-sky-400">
                {citizenUser.badge} • {citizenUser.karmaPoints} pts
              </div>
            </div>
          </Link>

          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8]"
          >
            <Shield className="h-3.5 w-3.5" />
            <span>Admin Portal</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Toggle mobile navigation"
          className="rounded-lg border border-[#1E2E4A] p-2 text-slate-300 md:hidden"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[#16233B] bg-[#09101D] px-4 py-4 md:hidden">
          <div className="flex flex-col space-y-2.5 text-sm">
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-2 py-1.5 text-slate-200 hover:bg-slate-800"
            >
              Route Explorer Dashboard
            </Link>
            <Link
              to="/citizen/report"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-2 py-1.5 text-sky-300 font-medium hover:bg-slate-800"
            >
              + Report Road Issue
            </Link>
            <Link
              to="/citizen/login"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-2 py-1.5 text-slate-300 hover:bg-slate-800"
            >
              Citizen Login / Switch Account
            </Link>
            <Link
              to="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-2 py-1.5 text-indigo-300 hover:bg-slate-800"
            >
              Switch to Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
