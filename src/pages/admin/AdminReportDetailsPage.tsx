import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  Bot,
  Bus,
  Camera,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Truck,
  UserCheck,
  XCircle,
} from 'lucide-react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { SeverityBadge, VerificationBadge } from '../../components/common/StatusBadges';
import { useCityLens } from '../../context/CityLensContext';

export const AdminReportDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    incidents,
    updateIncidentStatus,
    dispatchCrewForIncident,
  } = useCityLens();

  const normalizedId = id ? (id.startsWith('#') ? id : `#${id}`) : '#CHN-88412';
  const incident =
    incidents.find((item) => item.id.toLowerCase() === normalizedId.toLowerCase()) ||
    incidents[0];

  return (
    <AdminLayout>
      {/* Breadcrumb Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#17263F] pb-4 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Link to="/admin/dashboard" className="hover:text-white">
            Dashboard
          </Link>
          <span>›</span>
          <Link to="/admin/dashboard" className="hover:text-white">
            Reports
          </Link>
          <span>›</span>
          <span className="font-mono font-bold text-sky-400">{incident.id}</span>
        </div>

        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-1.5 rounded-xl border border-[#223659] bg-[#0D172B] px-3.5 py-2 font-medium text-slate-200 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Reports Table</span>
        </Link>
      </div>

      {/* Top Incident Status Header Card */}
      <div className="mt-5 civic-card p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <VerificationBadge status={incident.status} />
              <SeverityBadge severity={incident.severity} />
              <span className="text-xs text-slate-400">
                {incident.zone} • {incident.ward}
              </span>
              {incident.crewDispatched && (
                <span className="rounded-full border border-amber-500/35 bg-amber-500/15 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
                  ✓ GCC Crew Dispatched
                </span>
              )}
            </div>

            <h1 className="mt-2.5 text-xl font-extrabold text-white sm:text-2xl">
              Incident Report Details —{' '}
              <span className="font-mono text-sky-400">{incident.id}</span>
            </h1>
          </div>

          <div className="inline-flex items-center gap-2.5 rounded-xl border border-[#1E3150] bg-[#091120] px-4 py-2.5 text-xs">
            <Clock className="h-4 w-4 text-sky-400" />
            <div>
              <div className="text-[10px] text-slate-400">Reported Elapsed</div>
              <div className="font-bold text-white">{incident.reportedRelative}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Prominently Placed Verification & Dispatch Action Console (Matching Screen 13) */}
      <div className="mt-5 rounded-2xl border border-sky-500/35 bg-gradient-to-r from-[#0E1B31] to-[#0B1527] p-5 shadow-xl">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                Incident Verification &amp; Dispatch Console (Local Demo Actions)
              </h2>
              <p className="mt-0.5 text-xs text-slate-400">
                Target Report ID:{' '}
                <span className="font-mono font-semibold text-sky-400">{incident.id}</span> •
                Current Status: <strong className="text-white">{incident.status}</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => updateIncidentStatus(incident.id, 'Verified')}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-colors hover:bg-emerald-500"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Mark as Verified &amp; Broadcast Alert</span>
            </button>

            <button
              type="button"
              onClick={() => dispatchCrewForIncident(incident.id)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-colors hover:bg-amber-500"
            >
              <Truck className="h-4 w-4" />
              <span>Dispatch GCC Ward Crew</span>
            </button>

            <button
              type="button"
              onClick={() => updateIncidentStatus(incident.id, 'Resolved')}
              className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-3.5 py-2.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/25"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Mark as Resolved</span>
            </button>

            <button
              type="button"
              onClick={() => updateIncidentStatus(incident.id, 'Rejected')}
              className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/40 bg-rose-500/15 px-3.5 py-2.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/25"
            >
              <XCircle className="h-3.5 w-3.5" />
              <span>Reject Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Details Grid */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Left Column: Categorization, AI Score & Photo Evidence */}
        <div className="space-y-5 lg:col-span-7">
          <div className="civic-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-sky-400">
                Categorization &amp; Ground Report
              </span>
              <span className="rounded-lg border border-sky-500/30 bg-sky-500/10 px-2.5 py-1 text-xs font-semibold text-sky-300">
                {incident.category} &amp; Hazard
              </span>
            </div>

            <h2 className="mt-2 text-lg font-bold text-white">{incident.title}</h2>

            <div className="mt-4">
              <div className="text-xs font-medium text-slate-400">Incident Description</div>
              <div className="mt-1.5 rounded-xl border border-[#192842] bg-[#08101E] p-4 text-xs leading-relaxed text-slate-200">
                {incident.description}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
              <div className="rounded-xl border border-[#192842] bg-[#08101E] p-3.5">
                <div className="text-slate-400">Reported Timestamp</div>
                <div className="mt-1 font-semibold text-white">{incident.reportedAt}</div>
              </div>
              <div className="rounded-xl border border-[#192842] bg-[#08101E] p-3.5">
                <div className="text-slate-400">Incident Source</div>
                <div className="mt-1 font-semibold text-sky-300">{incident.source}</div>
              </div>
              <div className="rounded-xl border border-[#192842] bg-[#08101E] p-3.5">
                <div className="text-slate-400">Submitted By</div>
                <div className="mt-1 flex items-center gap-1.5 font-semibold text-white">
                  <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{incident.reporterName}</span>
                </div>
              </div>
              <div className="rounded-xl border border-[#192842] bg-[#08101E] p-3.5">
                <div className="text-slate-400">Community Corroboration</div>
                <div className="mt-1 font-semibold text-cyan-300">
                  {incident.commuterConfirmations} Commuters Confirmed
                </div>
              </div>
            </div>

            {/* AI Validation Engine Score Card */}
            <div className="mt-5 rounded-xl border border-[#1D3050] bg-[#091325] p-4">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-bold text-white">
                  <Bot className="h-4 w-4 text-sky-400" />
                  GCC AI Validation Score (Demo)
                </span>
                <span className="font-mono text-sm font-extrabold text-sky-400">
                  {incident.aiConfidence}%
                </span>
              </div>

              <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400"
                  style={{ width: `${incident.aiConfidence}%` }}
                />
              </div>

              <p className="mt-2 text-[11px] text-slate-400">
                Simulated confidence metric for Phase 1 UI preview. Gemini structured assessment
                and spatial deduplication connect in Phase 5.
              </p>
            </div>
          </div>

          {/* Attached Visual Evidence Card */}
          <div className="civic-card p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Camera className="h-4 w-4 text-sky-400" />
                <span>Attached Visual Evidence</span>
              </div>
              <span className="rounded-md border border-sky-500/30 bg-sky-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-sky-300">
                GEOTAG PREVIEW
              </span>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-[#1C2E4C] bg-[#08101E]">
              <img
                src={incident.evidenceUrl}
                alt={incident.title}
                className="h-60 w-full object-cover"
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-slate-400">
              <span>
                LAT {incident.coordinates.lat.toFixed(4)} N, LON{' '}
                {incident.coordinates.lng.toFixed(4)} E • {incident.reportedAt}
              </span>
              <span className="text-sky-400">{incident.metricLabel}: {incident.waterDepthOrMetric}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Spatial GIS Mini-Map & Transit Impact Assessment */}
        <div className="space-y-5 lg:col-span-5">
          <div className="civic-card p-6">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-bold text-white">
                <MapPin className="h-4 w-4 text-sky-400" />
                <span>Spatial GIS Telemetry</span>
              </span>
              <span className="font-mono text-xs text-sky-400">
                {incident.coordinates.lat.toFixed(4)}° N, {incident.coordinates.lng.toFixed(4)}° E
              </span>
            </div>

            <div className="relative mt-4 h-56 overflow-hidden rounded-xl border border-[#1D2F4D] gis-grid-bg">
              <svg viewBox="0 0 500 240" className="h-full w-full">
                <line x1="40" y1="210" x2="460" y2="30" stroke="#334155" strokeWidth="10" />
                <line x1="160" y1="158" x2="340" y2="82" stroke="#f59e0b" strokeWidth="5" />
                <path
                  d="M 110,180 Q 260,30 395,58"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeDasharray="7 5"
                />
                <circle cx="250" cy="120" r="18" fill="#f59e0b" opacity="0.25" />
                <circle cx="250" cy="120" r="10" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
              </svg>

              <div className="absolute top-3 left-3 rounded-lg border border-[#223556] bg-[#0B1425]/90 px-2.5 py-1.5 text-[11px] text-slate-200">
                Corridor: <strong>{incident.corridorId}</strong>
              </div>

              <div className="absolute top-3 right-3 rounded-lg border border-rose-500/35 bg-[#1B131E]/90 px-2.5 py-1.5 text-[11px] text-rose-300">
                {incident.metricLabel}: <strong>{incident.waterDepthOrMetric}</strong>
              </div>

              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between rounded-lg border border-[#1E3150] bg-[#091120]/95 px-3 py-2 text-[11px]">
                <span className="text-slate-300">
                  Suggested Bypass: <strong className="text-white">{incident.suggestedDetour}</strong>
                </span>
                <span className="font-semibold text-sky-400">Bypass Open</span>
              </div>
            </div>
          </div>

          {/* Transit Impact Assessment Card */}
          <div className="civic-card p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Bus className="h-4 w-4 text-sky-400" />
                <span>Transit Impact Assessment</span>
              </div>
              <span className="rounded-lg bg-rose-500/15 px-2.5 py-1 text-xs font-bold text-rose-300">
                {incident.transitDelay} Delay
              </span>
            </div>

            <div className="mt-4 text-xs text-slate-400">
              Affected MTC Public Transit Lines (Sample)
            </div>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5">
              {incident.affectedRoutes.map((rt) => (
                <div
                  key={rt.code}
                  className="rounded-xl border border-[#1B2C48] bg-[#091120] p-3 text-center"
                >
                  <div className="text-xs font-bold text-sky-400">{rt.code}</div>
                  <div className="mt-0.5 truncate text-[10px] text-slate-400">{rt.corridor}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-2.5 border-t border-[#182741] pt-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Passenger Exposure:</span>
                <span className="font-semibold text-white">{incident.passengerExposure}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-400">Active Metro Alternative:</span>
                <span className="text-right font-medium text-sky-400">
                  {incident.metroAlternative}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Ward Jurisdiction:</span>
                <span className="font-medium text-slate-200">
                  {incident.zone} ({incident.ward})
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-500/25 bg-amber-500/10 p-3 text-[11px] text-amber-200">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
              <span>
                Status updates made above immediately reflect across the Citizen Map and Admin
                Resolved Archive in local state.
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
