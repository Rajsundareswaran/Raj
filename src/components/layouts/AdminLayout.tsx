import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Archive,
  Bell,
  Bot,
  CheckSquare,
  Clock,
  GitBranch,
  LayoutGrid,
  Menu,
  Radio,
  Search,
  Settings,
  ShieldAlert,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { AppFooter } from '../common/AppFooter';
import { useCityLens } from '../../context/CityLensContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  searchPlaceholder?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  searchQuery = '',
  onSearchChange,
  searchPlaceholder = 'Search reports by ID, landmark, or street...',
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { incidents, adminUser, pushToast } = useCityLens();

  const pendingCount = incidents.filter((i) => i.status === 'Pending').length;
  const firstPending = incidents.find((i) => i.status === 'Pending') || incidents[0];
  const detailTargetId = (firstPending?.id || '#CHN-88412').replace('#', '');

  const navItems = [
    {
      label: 'Operations Overview',
      path: '/admin/dashboard',
      icon: LayoutGrid,
      active: location.pathname === '/admin/dashboard',
    },
    {
      label: 'Live Route Grid',
      path: '/dashboard',
      icon: GitBranch,
      active: false,
    },
    {
      label: 'AI Pipeline Monitor',
      path: '/admin/ai-monitor',
      icon: Bot,
      badge: 'LIVE',
      badgeStyle: 'bg-indigo-500/25 text-indigo-300 border border-indigo-400/30',
      active: location.pathname === '/admin/ai-monitor',
    },
    {
      label: 'Incident Verifications',
      path: `/admin/reports/${detailTargetId}`,
      icon: CheckSquare,
      badge: String(pendingCount),
      badgeStyle: 'bg-red-600 text-white',
      active: location.pathname.startsWith('/admin/reports'),
    },
    {
      label: 'Archived Records',
      path: '/admin/resolved',
      icon: Archive,
      active: location.pathname === '/admin/resolved',
    },
  ];

  const SidebarContent = () => (
    <div className="flex h-full flex-col justify-between bg-[#070D18] p-4">
      <div>
        <div className="mb-5 px-1">
          <BrandLogo variant="admin" subtitle="Chennai Integrated Command" to="/" />
        </div>

        <button
          type="button"
          onClick={() =>
            pushToast(
              'Emergency Dispatch Broadcast (Demo)',
              'Simulated priority alert queued for GCC Zone 10 & Zone 12 field patrol units.',
              'warning'
            )
          }
          className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600/90 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-red-900/30 transition-colors hover:bg-red-600"
        >
          <ShieldAlert className="h-4 w-4" />
          <span>Emergency Dispatch</span>
        </button>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition-colors ${
                  item.active
                    ? 'bg-[#13233F] border border-sky-500/30 text-sky-300 font-semibold'
                    : 'text-slate-300 hover:bg-[#0E192D] hover:text-white'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${item.active ? 'text-sky-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </span>
                {item.badge && (
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${item.badgeStyle}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-2 border-t border-[#16233B] pt-4">
        <button
          type="button"
          onClick={() =>
            pushToast(
              'Sensor Telemetry (Demo)',
              '15/15 GCC Zone telemetry nodes simulated online in Phase 1.',
              'info'
            )
          }
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2 text-xs text-slate-400 hover:bg-[#0E192D] hover:text-slate-200"
        >
          <Radio className="h-4 w-4" />
          <span>Sensor Telemetry</span>
        </button>
        <Link
          to="/select-role"
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2 text-xs text-slate-400 hover:bg-[#0E192D] hover:text-slate-200"
        >
          <Settings className="h-4 w-4" />
          <span>Switch Portal / Role</span>
        </Link>
        <div className="mt-2 flex items-center justify-between rounded-xl border border-[#182844] bg-[#0A1324] px-3 py-2 text-[11px] text-slate-400">
          <span className="flex items-center gap-2 text-emerald-400 font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            GCC Grid 15/15 Up
          </span>
          <span className="font-mono text-[10px] text-slate-500">v4.18</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#060B14]">
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-[#16233B] lg:block">
          <div className="sticky top-0 h-screen">
            <SidebarContent />
          </div>
        </aside>

        {/* Mobile Drawer Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative z-10 flex w-72 flex-col border-r border-[#1B2B46] bg-[#070D18]">
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close sidebar"
                className="absolute top-4 right-3 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
              <SidebarContent />
            </div>
          </div>
        )}

        {/* Main Column */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top Admin Header */}
          <header className="sticky top-0 z-30 border-b border-[#16233B] bg-[#070D19]/95 px-4 py-3 backdrop-blur-md sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-1 items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open admin menu"
                  className="rounded-lg border border-[#1E2E4A] p-2 text-slate-300 lg:hidden"
                >
                  <Menu className="h-4 w-4" />
                </button>

                <div className="relative w-full max-w-md">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full rounded-xl border border-[#1B2B46] bg-[#0B1425] py-2 pl-10 pr-12 text-xs text-slate-200 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-slate-700 bg-slate-800/80 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
                    ⌘K
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="hidden xl:flex items-center gap-1.5 rounded-xl border border-[#1B2B46] bg-[#0B1425] px-3 py-1.5 text-xs text-slate-300">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>Chennai IST 09:30 AM</span>
                </div>

                <div className="hidden md:flex items-center gap-2 rounded-xl border border-sky-500/25 bg-sky-500/10 px-3 py-1.5 text-xs font-medium text-sky-300">
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                  <span>Ripon ICCC Demo</span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    pushToast(
                      `${pendingCount} Reports Pending Verification`,
                      'Select any Pending report row to verify, dispatch crew, or resolve.',
                      'info'
                    )
                  }
                  aria-label="Admin notifications"
                  className="relative rounded-lg p-2 text-slate-300 hover:bg-[#132038]"
                >
                  <Bell className="h-4 w-4" />
                  {pendingCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    pushToast(
                      'Console Filter Preferences',
                      'Use the dropdown filters directly above the reports table.',
                      'info'
                    )
                  }
                  aria-label="Filter preferences"
                  className="hidden sm:inline-flex rounded-lg p-2 text-slate-400 hover:bg-[#132038] hover:text-white"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </button>

                <Link
                  to="/admin/login"
                  className="flex items-center gap-2.5 rounded-xl border border-[#1E2F4D] bg-[#0D1729] px-3 py-1.5 hover:border-sky-500/40"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/25 text-xs font-bold text-indigo-300">
                    RR
                  </div>
                  <div className="hidden sm:block leading-tight">
                    <div className="text-xs font-semibold text-slate-100">{adminUser.name}</div>
                    <div className="text-[10px] text-sky-400">{adminUser.badge}</div>
                  </div>
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
          <AppFooter compact />
        </div>
      </div>
    </div>
  );
};
