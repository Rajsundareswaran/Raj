import React from 'react';
import {
  AlertTriangle,
  Car,
  Construction,
  Droplets,
  OctagonAlert,
  Radio,
  TrafficCone,
  Trees,
} from 'lucide-react';
import {
  IncidentCategory,
  IncidentSeverity,
  IncidentSource,
  VerificationStatus,
} from '../../types';

export const CategoryIcon: React.FC<{ category: IncidentCategory; className?: string }> = ({
  category,
  className = 'h-4 w-4',
}) => {
  switch (category) {
    case 'Waterlogging':
      return <Droplets className={className} />;
    case 'Potholes':
      return <TrafficCone className={className} />;
    case 'Road Accident':
      return <Car className={className} />;
    case 'Severe Congestion':
      return <AlertTriangle className={className} />;
    case 'Roadblocks':
      return <OctagonAlert className={className} />;
    case 'Construction':
      return <Construction className={className} />;
    case 'Signal Malfunction':
      return <Radio className={className} />;
    case 'Fallen Tree / Debris':
      return <Trees className={className} />;
  }
};

export const SeverityBadge: React.FC<{ severity: IncidentSeverity }> = ({ severity }) => {
  const styles: Record<IncidentSeverity, string> = {
    High: 'bg-red-500/15 text-red-400 border-red-500/30',
    Medium: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    Low: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[severity]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {severity}
    </span>
  );
};

export const VerificationBadge: React.FC<{ status: VerificationStatus }> = ({ status }) => {
  const styles: Record<VerificationStatus, string> = {
    Pending: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    Verified: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    Resolved: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    Rejected: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
};

export const SourceBadge: React.FC<{ source: IncidentSource }> = ({ source }) => {
  const styles: Record<IncidentSource, string> = {
    'Citizen (Dual AI)': 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    'AI NLP Stream': 'bg-indigo-500/15 text-indigo-300 border-indigo-500/35',
    'Official GCC': 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    'Citizen Telemetry': 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    'Citizen Report': 'bg-slate-800 text-slate-300 border-slate-700',
  };
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${styles[source]}`}
    >
      {source}
    </span>
  );
};

export const DemoModeNotice: React.FC<{ label?: string }> = ({
  label = 'Phase 1 Frontend Preview — Simulated local browser data (Backend & live APIs connect in Phases 2–6)',
}) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-500/10 px-3 py-1 text-[11px] font-medium text-amber-200">
    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
    <span>{label}</span>
  </div>
);
