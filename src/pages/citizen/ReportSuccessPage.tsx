import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  History,
  LayoutGrid,
  MapPin,
  Phone,
} from 'lucide-react';
import { BrandLogo } from '../../components/common/BrandLogo';
import { CategoryIcon } from '../../components/common/StatusBadges';
import { useCityLens } from '../../context/CityLensContext';

export const ReportSuccessPage: React.FC = () => {
  const { lastSubmittedIncident, citizenUser, incidents, pushToast } = useCityLens();
  const [copied, setCopied] = useState(false);

  const report = lastSubmittedIncident || incidents[0];

  const handleCopyId = () => {
    navigator.clipboard?.writeText(report.id).catch(() => {});
    setCopied(true);
    pushToast('Incident Reference Copied', `${report.id} copied to clipboard.`, 'success');
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#060B14] text-slate-100">
      {/* Top Bar */}
      <header className="border-b border-[#152238] bg-[#070D19] px-4 py-3.5 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <BrandLogo
            variant="citizen"
            subtitle="Citizen Telemetry Incident Portal"
            to="/"
          />

          <div className="flex items-center gap-2.5 rounded-full border border-[#1E3150] bg-[#0C1628] px-3.5 py-1.5 text-xs">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 font-bold text-cyan-300 text-[11px]">
              {citizenUser.name
                .split(' ')
                .map((p) => p[0])
                .join('')
                .slice(0, 2)}
            </span>
            <div className="leading-tight">
              <div className="font-semibold text-slate-100">{citizenUser.name}</div>
              <div className="text-[10px] text-cyan-400">{citizenUser.badge}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Center Confirmation Card */}
      <main className="mx-auto flex w-full max-w-xl flex-1 items-center justify-center px-4 py-12">
        <div className="w-full civic-card p-6 sm:p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/15 text-cyan-300 shadow-cyan-glow">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-white">
            Report Submitted Successfully!
          </h1>
          <p className="mx-auto mt-1.5 max-w-md text-xs leading-relaxed text-slate-400">
            Thank you for helping make Chennai&apos;s roads safer and keeping fellow commuters
            informed. (Recorded in local Phase 1 demo state.)
          </p>

          {/* Reference Summary Box */}
          <div className="mt-6 rounded-xl border border-[#1B2C48] bg-[#091120] p-5 text-left space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#16243C] pb-3.5">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                  Incident Reference
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-sky-400">{report.id}</span>
                  <button
                    type="button"
                    onClick={handleCopyId}
                    aria-label="Copy incident reference"
                    className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/35 bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-300">
                <Clock className="h-3.5 w-3.5" />
                Pending Verification
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
              <div>
                <div className="text-slate-400">Incident Type</div>
                <div className="mt-1 flex items-center gap-2 font-semibold text-white">
                  <CategoryIcon category={report.category} className="h-4 w-4 text-sky-400" />
                  <span>{report.category} &amp; Hazard</span>
                </div>
              </div>

              <div>
                <div className="text-slate-400">Estimated Review Time</div>
                <div className="mt-1 font-medium text-slate-200">
                  Simulated Admin Triage Queue (~45s)
                </div>
              </div>
            </div>

            <div className="text-xs">
              <div className="text-slate-400">Location</div>
              <div className="mt-1 flex items-center gap-1.5 font-medium text-slate-200">
                <MapPin className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                <span>{report.landmark}</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#16243C] pt-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                Demo Intake Queue: Ready for Admin Review
              </span>
              <span className="font-mono text-slate-300">Queue Pos: #01</span>
            </div>
          </div>

          {/* Karma Reward Banner */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#1E2F4E] bg-[#0B1528] p-3.5 text-left text-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <div className="font-bold text-white">+25 Civic Karma Points awarded</div>
                <div className="text-[11px] text-slate-400">Account: {citizenUser.name}</div>
              </div>
            </div>
            <span className="rounded-lg border border-sky-500/25 bg-sky-500/10 px-2.5 py-1 text-[11px] font-medium text-sky-300">
              Contributed to {report.zone.split('•')[0]}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link to="/dashboard" className="civic-btn-primary py-3 text-xs">
              <LayoutGrid className="h-4 w-4" />
              <span>Back to Route Planner Dashboard</span>
            </Link>
            <Link
              to="/dashboard?tab=community"
              className="civic-btn-secondary py-3 text-xs"
            >
              <History className="h-4 w-4" />
              <span>View Submitted Reports</span>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#152238] bg-[#070D19] px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-xs text-slate-500 sm:flex-row">
          <span>
            © 2025 Greater Chennai Corporation &amp; Metropolitan Transport Corporation.
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-300">
            <Phone className="h-3.5 w-3.5 text-sky-400" />
            GCC Civic Grievance Helpline: <strong className="text-sky-400">1913</strong>
          </span>
        </div>
      </footer>
    </div>
  );
};
