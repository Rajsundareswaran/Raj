import React, { useState } from 'react';
import {
  Bot,
  Camera,
  CheckCircle2,
  Clock,
  CornerUpRight,
  Droplets,
  GitBranch,
  MapPin,
  Radio,
  RefreshCw,
  X,
} from 'lucide-react';
import { Incident } from '../../types';

interface IncidentDetailsModalProps {
  incident: Incident;
  onClose: () => void;
  onSuggestDetour?: (incident: Incident) => void;
  onConfirmStatus?: (incident: Incident) => void;
  standalone?: boolean;
}

export const IncidentDetailsModal: React.FC<IncidentDetailsModalProps> = ({
  incident,
  onClose,
  onSuggestDetour,
  onConfirmStatus,
  standalone = false,
}) => {
  const [activeTab, setActiveTab] = useState<'evidence' | 'micromap'>('evidence');

  const cardBody = (
    <div className="w-full max-w-3xl rounded-2xl border border-[#1F3150] bg-[#0B1323] p-5 sm:p-7 shadow-2xl">
      {/* Top Category & Severity Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/35 bg-rose-500/15 px-3 py-1 text-xs font-semibold text-rose-300">
            <Droplets className="h-3.5 w-3.5" />
            {incident.category} &amp; Road Hazard
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            {incident.severity === 'High'
              ? 'Critical Severity (High Impact)'
              : `${incident.severity} Severity`}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close incident details"
          className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <h2 className="mt-3 text-lg sm:text-xl font-bold text-white leading-snug">
        {incident.title}
      </h2>

      {/* 3 Metric Cards */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-[#1B2B46] bg-[#0F1A2E] p-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>Transit Delay</span>
          </div>
          <div className="mt-1.5 text-xl font-bold text-rose-400">{incident.transitDelay}</div>
          <div className="mt-1 text-[11px] text-slate-500">Heavy congestion ripple</div>
        </div>

        <div className="rounded-xl border border-[#1B2B46] bg-[#0F1A2E] p-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Droplets className="h-3.5 w-3.5 text-sky-400" />
            <span>{incident.metricLabel}</span>
          </div>
          <div className="mt-1.5 text-xl font-bold text-sky-400">
            {incident.waterDepthOrMetric}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">{incident.metricSubtext}</div>
        </div>

        <div className="rounded-xl border border-[#1B2B46] bg-[#0F1A2E] p-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <GitBranch className="h-3.5 w-3.5 text-slate-400" />
            <span>Lane Impact</span>
          </div>
          <div className="mt-1.5 text-base font-bold text-slate-100 leading-snug">
            {incident.laneImpact}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">{incident.laneSubtext}</div>
        </div>
      </div>

      {/* Tabs: Photo Evidence vs Micro-Map Detour */}
      <div className="mt-5 rounded-xl border border-[#1B2B46] bg-[#08101E] p-4">
        <div className="flex flex-wrap gap-4 border-b border-[#182740] pb-2.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('evidence')}
            className={`inline-flex items-center gap-2 border-b-2 pb-2 -mb-[11px] transition-colors ${
              activeTab === 'evidence'
                ? 'border-sky-400 text-sky-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Camera className="h-3.5 w-3.5" />
            <span>Ground Photo / Sensor Preview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('micromap')}
            className={`inline-flex items-center gap-2 border-b-2 pb-2 -mb-[11px] transition-colors ${
              activeTab === 'micromap'
                ? 'border-sky-400 text-sky-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CornerUpRight className="h-3.5 w-3.5" />
            <span>Micro-Map Location &amp; Detour</span>
          </button>
        </div>

        {activeTab === 'evidence' ? (
          <div className="mt-4">
            <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-[#1E3152] bg-[#0A1324] md:grid-cols-3">
              <div className="relative md:col-span-2">
                <img
                  src={incident.evidenceUrl}
                  alt={incident.title}
                  className="h-52 w-full object-cover sm:h-60"
                />
                <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-md bg-black/75 px-2.5 py-1 font-mono text-[10px] font-semibold text-rose-300 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  DEMO PREVIEW • {incident.id}
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between rounded-lg bg-[#08101E]/90 px-3 py-1.5 text-[11px] text-slate-200 backdrop-blur-sm">
                  <span>⚠ Hazard zone highlighted in commuter/sensor frame</span>
                  <span className="font-mono font-semibold text-sky-400">
                    {incident.waterDepthOrMetric}
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between border-t border-[#1A2A46] p-3.5 font-mono text-[11px] md:border-l md:border-t-0">
                <div className="space-y-2.5">
                  <div>
                    <div className="text-[10px] text-slate-500">INCIDENT ID:</div>
                    <div className="text-slate-200 font-semibold">{incident.id}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">LOCATION:</div>
                    <div className="text-slate-300">{incident.location}, Chennai</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">STATUS:</div>
                    <div className="text-rose-400 font-semibold">
                      {incident.status} — {incident.category}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">SUGGESTED BYPASS:</div>
                    <div className="text-sky-300">{incident.suggestedDetour}</div>
                  </div>
                </div>
                <div className="mt-3 border-t border-slate-800 pt-2 text-[10px] text-slate-400">
                  TRAFFIC IMPACT: {incident.laneImpact}
                </div>
              </div>
            </div>
            <p className="mt-2 text-[11px] italic text-slate-400">{incident.evidenceCaption}</p>
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-[#1C2E4C] bg-[#0B1528] p-4">
            <svg viewBox="0 0 600 210" className="h-48 w-full rounded-lg bg-[#070E1B]">
              <path
                d="M 40,175 L 560,35"
                stroke="#334155"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 210,130 L 390,80"
                stroke="#ef4444"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M 130,152 Q 310,25 460,62"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="4"
                strokeDasharray="8 6"
              />
              <circle cx="300" cy="105" r="11" fill="#ef4444" stroke="#fff" strokeWidth="2" />
              <text x="245" y="138" fill="#fca5a5" fontSize="11" fontWeight="bold">
                Blocked Segment ({incident.location})
              </text>
              <text x="235" y="42" fill="#67e8f9" fontSize="11" fontWeight="bold">
                Detour: {incident.suggestedDetour}
              </text>
            </svg>
          </div>
        )}
      </div>

      {/* Telemetry & Audit Metadata */}
      <div className="mt-5 rounded-xl border border-[#1B2B46] bg-[#0A1222] p-4">
        <div className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
          Telemetry &amp; Audit Metadata
        </div>

        <div className="mt-3 grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
          <div className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
            <div>
              <div className="text-slate-400">Exact Location</div>
              <div className="mt-0.5 font-medium text-slate-200">{incident.landmark}</div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <div>
              <div className="text-slate-400">Reported / Detected Time</div>
              <div className="mt-0.5 font-medium text-slate-200">
                {incident.reportedAt}{' '}
                <span className="text-sky-400">({incident.reportedRelative})</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Radio className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <div>
              <div className="text-slate-400">Source Type</div>
              <div className="mt-0.5 font-medium text-slate-200">{incident.source}</div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            <div>
              <div className="text-slate-400">Verification Status</div>
              <div className="mt-0.5 font-medium text-slate-200">
                {incident.status} • {incident.commuterConfirmations} Commuter Confirmations
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-sky-500/20 bg-[#0E192E] p-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-100">
              <Bot className="h-4 w-4 text-sky-400" />
              <span>AI Confidence Score (Demo): {incident.aiConfidence}%</span>
            </div>
            <span className="rounded border border-sky-400/30 bg-sky-500/15 px-2 py-0.5 text-[10px] font-bold uppercase text-sky-300">
              High Accuracy
            </span>
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">
            Demonstration confidence rating combining report metadata and corridor cross-checks;
            live Gemini API structured assessment connects in Phase 5.
          </p>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onClose}
          className="civic-btn-secondary px-5 py-2.5 text-xs"
        >
          Close Details
        </button>

        <div className="flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={() => onSuggestDetour?.(incident)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-500/35 bg-sky-500/10 px-4 py-2.5 text-xs font-semibold text-sky-300 transition-colors hover:bg-sky-500/20"
          >
            <CornerUpRight className="h-3.5 w-3.5" />
            <span>Suggest Detour ({incident.suggestedDetour.split(' ')[0]} Rd)</span>
          </button>

          <button
            type="button"
            onClick={() => onConfirmStatus?.(incident)}
            className="civic-btn-primary px-4 py-2.5 text-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Mark as Solved / Update Ground Status</span>
          </button>
        </div>
      </div>
    </div>
  );

  if (standalone) {
    return <div className="flex justify-center py-8 px-4">{cardBody}</div>;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
    >
      <div className="my-auto w-full max-w-3xl">{cardBody}</div>
    </div>
  );
};
