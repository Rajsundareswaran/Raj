import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Camera,
  CheckCircle2,
  Clock,
  Crosshair,
  MapPin,
  Send,
  ShieldCheck,
  WifiOff,
  X,
  Zap,
} from 'lucide-react';
import { CitizenHeader } from '../../components/layouts/CitizenHeader';
import { AppFooter } from '../../components/common/AppFooter';
import { CategoryIcon } from '../../components/common/StatusBadges';
import { useCityLens } from '../../context/CityLensContext';
import { IncidentCategory, IncidentSeverity } from '../../types';
import { EVIDENCE_POTHOLE_CLUSTER } from '../../utils/evidenceGraphics';

const CATEGORIES: IncidentCategory[] = [
  'Potholes',
  'Road Accident',
  'Severe Congestion',
  'Roadblocks',
  'Construction',
  'Waterlogging',
  'Signal Malfunction',
  'Fallen Tree / Debris',
];

export const ReportSubmissionPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { savedDraft, submitCitizenReport, saveReportDraft, pushToast } = useCityLens();

  const [category, setCategory] = useState<IncidentCategory>(
    savedDraft?.category || 'Waterlogging'
  );
  const [title, setTitle] = useState(
    savedDraft?.title || 'Deep pothole cluster near Saidapet Maraimalai Adigal Bridge'
  );
  const [description, setDescription] = useState(
    savedDraft?.description ||
      'Right lane has 3 consecutive deep potholes caused by overnight rain. Vehicles swerving into middle lane causing sudden bottlenecks.'
  );
  const [address, setAddress] = useState(
    savedDraft?.address || 'Anna Salai, Saidapet, Chennai - 600015'
  );
  const [lat, setLat] = useState(savedDraft?.lat || 13.0182);
  const [lng, setLng] = useState(savedDraft?.lng || 80.2227);
  const [mapX, setMapX] = useState(savedDraft?.mapX || 52);
  const [mapY, setMapY] = useState(savedDraft?.mapY || 48);
  const [zone, setZone] = useState(savedDraft?.zone || 'Ward 171 • Zone 13 (Adyar)');
  const [date, setDate] = useState(savedDraft?.date || '2026-11-06');
  const [time, setTime] = useState(savedDraft?.time || '08:45');
  const [severity, setSeverity] = useState<IncidentSeverity>(savedDraft?.severity || 'Medium');
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(
    savedDraft?.photoDataUrl !== undefined ? savedDraft.photoDataUrl : EVIDENCE_POTHOLE_CLUSTER
  );
  const [photoName, setPhotoName] = useState<string | null>(
    savedDraft?.photoName || 'IMG_SAIDAPET_SURFACE.jpg'
  );
  const [photoSizeLabel, setPhotoSizeLabel] = useState<string | null>(
    savedDraft?.photoSizeLabel || 'Sample Preview • Geotag Ready'
  );
  const [error, setError] = useState<string | null>(null);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = Math.max(8, Math.min(92, ((e.clientX - rect.left) / rect.width) * 100));
    const relY = Math.max(12, Math.min(88, ((e.clientY - rect.top) / rect.height) * 100));
    setMapX(Math.round(relX));
    setMapY(Math.round(relY));
    const newLat = +(13.09 - (relY / 100) * 0.18).toFixed(4);
    const newLng = +(80.13 + (relX / 100) * 0.14).toFixed(4);
    setLat(newLat);
    setLng(newLng);
  };

  const handleDetectLocation = () => {
    setLat(13.0182);
    setLng(80.2227);
    setMapX(54);
    setMapY(46);
    setAddress('Saidapet Maraimalai Adigal Bridge, Anna Salai, Chennai - 600015');
    setZone('Zone 10 (Kodambakkam/Saidapet)');
    pushToast(
      'Demo Coordinates Populated',
      'Set to LAT 13.0182° N, LON 80.2227° E (Browser GPS + Geocoding connect in Phase 3).',
      'info'
    );
  };

  const handleHappenedNow = () => {
    const now = new Date();
    setDate(now.toISOString().slice(0, 10));
    setTime(now.toTimeString().slice(0, 5));
    pushToast('Timestamp Updated', 'Set occurrence time to current local clock.', 'info');
  };

  const handleFileChange = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPG, PNG, or WEBP).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be under 10 MB.');
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhotoDataUrl(reader.result);
        setPhotoName(file.name);
        setPhotoSizeLabel(`${(file.size / (1024 * 1024)).toFixed(2)} MB • Local Preview`);
      }
    };
    reader.readAsDataURL(file);
  };

  const buildDraftPayload = () => ({
    category,
    title,
    description,
    address,
    lat,
    lng,
    mapX,
    mapY,
    zone,
    date,
    time,
    severity,
    photoDataUrl,
    photoName,
    photoSizeLabel,
  });

  const handleSaveDraft = () => {
    saveReportDraft(buildDraftPayload());
    pushToast(
      'Draft Saved Locally',
      'Cached in browser localStorage (#DRAFT-CHN-9941).',
      'success'
    );
  };

  const handleSimulateFailure = () => {
    saveReportDraft(buildDraftPayload());
    navigate('/citizen/report/error');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (title.trim().length < 5) {
      setError('Please provide a clear incident title (at least 5 characters).');
      return;
    }
    if (description.trim().length < 10) {
      setError('Please enter a brief description of the road issue (at least 10 characters).');
      return;
    }
    if (!address.trim()) {
      setError('Please enter a street location or landmark.');
      return;
    }

    submitCitizenReport({
      category,
      title,
      description,
      address,
      lat,
      lng,
      mapX,
      mapY,
      zone,
      date,
      time,
      severity,
      photoDataUrl,
    });

    navigate('/citizen/report/success');
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#060B14] text-slate-100">
      <CitizenHeader />

      {/* Sub-header Breadcrumb */}
      <div className="border-b border-[#142036] bg-[#070D18]/80 px-4 py-2.5 sm:px-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between text-xs">
          <div className="text-slate-400">
            <Link to="/dashboard" className="hover:text-white">
              Dashboard
            </Link>{' '}
            <span className="mx-1.5 text-slate-600">/</span>
            <span className="font-semibold text-sky-400">Report Incident</span>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E2F4D] bg-[#0C1628] px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-300">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
          Greater Chennai Corporation Citizen Feed (Demo)
        </span>

        <h1 className="mt-3 text-3xl font-extrabold text-white">Report a Road Issue</h1>
        <p className="mt-1.5 max-w-xl text-sm text-slate-400">
          Help fellow Chennai commuters make safer travel decisions. Submitted reports update the
          local Phase 1 Map &amp; Admin Dashboard immediately.
        </p>

        {error && (
          <div
            role="alert"
            className="mt-5 flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-xs text-rose-300"
          >
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 civic-card p-6 sm:p-8 space-y-8" noValidate>
          {/* 1. Incident Category */}
          <section>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white">1. Incident Category</h2>
                <p className="mt-0.5 text-xs text-slate-400">
                  Select the primary hazard type to categorize this report.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-sky-400">Mandatory</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {CATEGORIES.map((cat) => {
                const selected = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`flex flex-col items-center justify-center gap-2 rounded-xl border p-4 text-xs font-medium transition-all ${
                      selected
                        ? 'border-sky-400 bg-sky-500/15 text-sky-300 shadow-cyan-glow font-semibold'
                        : 'border-[#1C2D4A] bg-[#091120] text-slate-300 hover:border-slate-600 hover:text-white'
                    }`}
                  >
                    <CategoryIcon category={cat} className="h-5 w-5" />
                    <span className="text-center">{cat}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 2. Incident Title & Description */}
          <section className="space-y-4 border-t border-[#18263F] pt-6">
            <div>
              <label htmlFor="report-title" className="block text-sm font-bold text-white">
                2. Incident Title
              </label>
              <input
                id="report-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Deep pothole cluster near Saidapet Maraimalai Adigal Bridge"
                className="civic-input mt-2"
                required
              />
            </div>

            <div>
              <label htmlFor="report-desc" className="block text-sm font-bold text-white">
                Detailed Description
              </label>
              <textarea
                id="report-desc"
                rows={3}
                maxLength={500}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Include landmark markers or specific lane obstruction details..."
                className="civic-input mt-2 resize-y"
                required
              />
              <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500">
                <span>Include landmark markers or specific lane obstruction details.</span>
                <span className="font-mono">{description.length} / 500 chars</span>
              </div>
            </div>
          </section>

          {/* 3. Location & GPS Coordinate */}
          <section className="border-t border-[#18263F] pt-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label htmlFor="report-address" className="text-sm font-bold text-white">
                3. Location &amp; GPS Coordinate
              </label>
              <span className="font-mono text-xs font-semibold text-sky-400">
                LAT {lat.toFixed(4)}° N, LON {lng.toFixed(4)}° E
              </span>
            </div>

            <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row">
              <div className="relative flex-1">
                <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400" />
                <input
                  id="report-address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter Chennai street address or landmark"
                  className="civic-input pl-10"
                  required
                />
              </div>

              <button
                type="button"
                onClick={handleDetectLocation}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-500/35 bg-sky-500/10 px-4 py-2.5 text-xs font-semibold text-sky-300 hover:bg-sky-500/20"
              >
                <Crosshair className="h-4 w-4" />
                <span>Detect Current Location</span>
              </button>
            </div>

            {/* Interactive Pin Picker Map */}
            <div
              onClick={handleMapClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleDetectLocation();
              }}
              aria-label="Click anywhere on map preview to position incident pin"
              className="relative mt-3 h-48 w-full cursor-crosshair overflow-hidden rounded-xl border border-[#1D2F4D] gis-grid-bg"
            >
              <svg viewBox="0 0 800 220" className="h-full w-full">
                <path
                  d="M 40,45 Q 380,105 760,185"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  opacity="0.65"
                />
                <path
                  d="M 190,205 Q 430,110 740,55"
                  fill="none"
                  stroke="#0f766e"
                  strokeWidth="12"
                  opacity="0.45"
                />
              </svg>

              {/* Active Pin */}
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: `${mapX}%`, top: `${mapY}%` }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-sky-500 text-xs font-bold text-white shadow-cyan-glow">
                  !
                </div>
                <span className="mt-1.5 whitespace-nowrap rounded-md border border-sky-500/40 bg-[#0A1324]/95 px-2.5 py-0.5 text-[11px] font-medium text-sky-300">
                  {address.split(',')[0]}
                </span>
              </div>

              <div className="absolute bottom-2.5 left-3 rounded-md border border-slate-700 bg-[#0A1324]/90 px-2.5 py-1 text-[10px] text-slate-300">
                {zone} • Click map to move pin
              </div>
            </div>
          </section>

          {/* 4. Occurrence Time */}
          <section className="border-t border-[#18263F] pt-6">
            <h2 className="text-sm font-bold text-white">4. Occurrence Time</h2>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label htmlFor="report-date" className="block text-xs text-slate-400 mb-1">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="report-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="civic-input pl-10 text-xs"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="report-time" className="block text-xs text-slate-400 mb-1">
                  Time
                </label>
                <div className="relative">
                  <Clock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="report-time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="civic-input pl-10 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleHappenedNow}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-sky-500/35 bg-[#0D1A2F] px-4 py-2.5 text-xs font-semibold text-sky-300 hover:bg-sky-500/15"
                >
                  <Zap className="h-3.5 w-3.5" />
                  <span>Happened Just Now</span>
                </button>
              </div>
            </div>
          </section>

          {/* 5. Impact Severity */}
          <section className="border-t border-[#18263F] pt-6">
            <h2 className="text-sm font-bold text-white">5. Impact Severity</h2>
            <p className="mt-0.5 text-xs text-slate-400">
              Rate how heavily this disruption affects through-traffic speed.
            </p>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {(
                [
                  {
                    level: 'Low',
                    label: 'Low',
                    dot: 'bg-emerald-400',
                    text: 'text-emerald-300',
                    desc: 'Minor inconvenience; traffic flows around obstacle with minimal delay.',
                  },
                  {
                    level: 'Medium',
                    label: 'Moderate',
                    dot: 'bg-sky-400',
                    text: 'text-sky-300',
                    desc: 'Traffic slowed noticeably; 5–15 minute speed reductions on stretch.',
                  },
                  {
                    level: 'High',
                    label: 'High / Dangerous',
                    dot: 'bg-rose-400',
                    text: 'text-rose-300',
                    desc: 'Hazardous condition; potential vehicle damage or complete lane block.',
                  },
                ] as const
              ).map((option) => {
                const active = severity === option.level;
                return (
                  <button
                    key={option.level}
                    type="button"
                    onClick={() => setSeverity(option.level)}
                    className={`rounded-xl border p-4 text-left transition-all ${
                      active
                        ? 'border-sky-400 bg-sky-500/10 shadow-cyan-glow'
                        : 'border-[#1C2D4A] bg-[#091120] hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center gap-2 text-xs font-bold ${option.text}`}>
                        <span className={`h-2 w-2 rounded-full ${option.dot}`} />
                        {option.label}
                      </span>
                      <span
                        className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                          active ? 'border-sky-400 bg-sky-400' : 'border-slate-600'
                        }`}
                      >
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-slate-950" />}
                      </span>
                    </div>
                    <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
                      {option.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 6. Evidence & Visual Verification */}
          <section className="border-t border-[#18263F] pt-6">
            <h2 className="text-sm font-bold text-white">
              6. Evidence &amp; Visual Verification
            </h2>
            <p className="mt-0.5 text-xs text-slate-400">
              Upload a photo or dashcam snapshot (Max 10MB) for local preview.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files?.[0])}
              className="hidden"
            />

            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFileChange(e.dataTransfer.files?.[0]);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') fileInputRef.current?.click();
                }}
                className="flex min-h-[168px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#243B61] bg-[#091120] p-5 text-center transition-colors hover:border-sky-400/70 hover:bg-[#0C172B]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-500/10 text-sky-400">
                  <Camera className="h-5 w-5" />
                </div>
                <div className="mt-3 text-xs font-semibold text-slate-200">
                  Drag &amp; drop dashcam capture or tap to browse
                </div>
                <div className="mt-1 text-[11px] text-slate-500">
                  Supports JPG, PNG, WEBP up to 10MB
                </div>
              </div>

              {photoDataUrl ? (
                <div className="relative overflow-hidden rounded-xl border border-[#1E3152] bg-[#091120]">
                  <img
                    src={photoDataUrl}
                    alt="Uploaded road hazard preview"
                    className="h-32 w-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-md border border-cyan-400/35 bg-[#081221]/90 px-2 py-0.5 text-[10px] font-semibold text-cyan-300">
                    <CheckCircle2 className="h-3 w-3" />
                    PREVIEW READY
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoDataUrl(null);
                      setPhotoName(null);
                      setPhotoSizeLabel(null);
                    }}
                    aria-label="Remove uploaded image"
                    className="absolute top-2.5 right-2.5 rounded-full bg-black/75 p-1 text-slate-300 hover:text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <div className="flex items-center justify-between px-3.5 py-2.5 text-xs">
                    <div className="truncate">
                      <div className="truncate font-semibold text-slate-200">
                        {photoName || 'Uploaded_Image.jpg'}
                      </div>
                      <div className="text-[11px] text-slate-400">{photoSizeLabel}</div>
                    </div>
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-sky-400" />
                  </div>
                </div>
              ) : (
                <div className="flex min-h-[168px] flex-col items-center justify-center rounded-xl border border-[#1A2A46] bg-[#080F1D] p-5 text-center text-xs text-slate-500">
                  No image selected. Upload an image on the left to preview it here.
                </div>
              )}
            </div>
          </section>

          {/* Form Action Buttons */}
          <div className="flex flex-col-reverse items-stretch justify-between gap-3 border-t border-[#18263F] pt-6 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleSimulateFailure}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2.5 text-xs font-medium text-rose-300 hover:bg-rose-500/20"
            >
              <WifiOff className="h-3.5 w-3.5" />
              <span>Simulate Timeout (Screen 09)</span>
            </button>

            <div className="flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="civic-btn-secondary px-5 py-2.5 text-xs"
              >
                Cancel / Save Draft
              </button>
              <button type="submit" className="civic-btn-primary px-6 py-2.5 text-xs">
                <Send className="h-3.5 w-3.5" />
                <span>Submit Incident Report</span>
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-[#1A2B48] bg-[#08101E] p-3.5 text-xs text-slate-400">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
            <span>
              <strong className="text-slate-200">Civic Verification Protocol (Phase 1 Demo):</strong>{' '}
              Submitting stores this report in local browser state so you can immediately inspect it
              on the Citizen Map and Admin Dashboard. Supabase persistence &amp; deduplication
              connect in Phases 2–5.
            </span>
          </div>
        </form>
      </main>

      <AppFooter />
    </div>
  );
};
