import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  CloudOff,
  FileEdit,
  HelpCircle,
  RefreshCw,
  Save,
} from 'lucide-react';
import { CitizenHeader } from '../../components/layouts/CitizenHeader';
import { AppFooter } from '../../components/common/AppFooter';
import { useCityLens } from '../../context/CityLensContext';

export const ReportFailurePage: React.FC = () => {
  const navigate = useNavigate();
  const { savedDraft, submitCitizenReport, pushToast } = useCityLens();

  const handleRetryNow = () => {
    if (savedDraft) {
      submitCitizenReport({
        category: savedDraft.category,
        title: savedDraft.title,
        description: savedDraft.description,
        address: savedDraft.address,
        lat: savedDraft.lat,
        lng: savedDraft.lng,
        mapX: savedDraft.mapX,
        mapY: savedDraft.mapY,
        zone: savedDraft.zone,
        date: savedDraft.date,
        time: savedDraft.time,
        severity: savedDraft.severity,
        photoDataUrl: savedDraft.photoDataUrl,
      });
    }
    pushToast(
      'Retry Succeeded (Simulated)',
      'Cached report draft submitted into local demo state.',
      'success'
    );
    navigate('/citizen/report/success');
  };

  const handleSaveOfflineAndExit = () => {
    pushToast(
      'Offline Draft Preserved',
      'Draft remains stored in your browser until you return to Report Issue.',
      'info'
    );
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#060B14] text-slate-100">
      <CitizenHeader />

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full rounded-2xl border border-rose-500/30 bg-[#0C1425] p-6 sm:p-8 text-center shadow-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-rose-500/40 bg-rose-500/15 text-rose-400">
            <AlertTriangle className="h-8 w-8" />
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-white">
            Unable to Submit Your Report
          </h1>
          <p className="mx-auto mt-1.5 max-w-md text-xs leading-relaxed text-slate-400">
            Simulated gateway timeout demonstration. Your report data has been cached locally in
            your browser so no details are lost.
          </p>

          {/* Diagnostic Console Card */}
          <div className="mt-6 rounded-xl border border-[#1E2E4A] bg-[#08101E] p-4 text-left text-xs">
            <div className="flex items-center justify-between border-b border-[#16253E] pb-2.5">
              <span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-300">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                Telemetry Diagnostic Console
              </span>
              <span className="rounded border border-sky-500/25 bg-sky-500/10 px-2 py-0.5 font-mono text-[10px] text-sky-300">
                Node: CHN-CENTRAL-04
              </span>
            </div>

            <div className="mt-3 space-y-2.5">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-500">Error Code:</span>
                <span className="col-span-2 font-mono font-semibold text-rose-400">
                  ERR_GATEWAY_TIMEOUT (HTTP 504 — Simulated)
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-500">Cause:</span>
                <span className="col-span-2 text-slate-300">
                  Simulated network packet loss during telemetry sync
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-t border-[#152238] pt-2.5">
                <span className="text-slate-500">Local Cache:</span>
                <span className="col-span-2 flex items-center gap-1.5 text-cyan-300">
                  <Save className="h-3.5 w-3.5 shrink-0" />
                  <span>
                    Draft <strong className="text-white">{savedDraft?.id || '#DRAFT-CHN-9941'}</strong>{' '}
                    is safely preserved
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Retry & Draft Actions */}
          <div className="mt-6 space-y-2.5">
            <button
              type="button"
              onClick={handleRetryNow}
              className="civic-btn-primary w-full py-3 text-xs"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Retry Submission Now</span>
            </button>

            <Link
              to="/citizen/report"
              className="civic-btn-secondary w-full py-3 text-xs"
            >
              <FileEdit className="h-4 w-4" />
              <span>Back to Report Form (Edit Draft)</span>
            </Link>

            <button
              type="button"
              onClick={handleSaveOfflineAndExit}
              className="inline-flex w-full items-center justify-center gap-1.5 py-2 text-xs font-semibold text-sky-400 hover:text-sky-300"
            >
              <CloudOff className="h-3.5 w-3.5" />
              <span>Save as Offline Draft &amp; Return to Dashboard</span>
            </button>
          </div>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#1B2B46] bg-[#091222] px-3.5 py-1 text-[11px] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            <span>Draft recovery will sync with Supabase in Phase 4</span>
          </div>
        </div>

        <p className="mt-6 flex items-center gap-2 text-center text-xs text-slate-500">
          <HelpCircle className="h-4 w-4 shrink-0 text-slate-400" />
          <span>
            Experiencing continuous connectivity issues? Contact{' '}
            <strong className="text-sky-400">GCC Toll-free helpline 1913</strong>.
          </span>
        </p>
      </main>

      <AppFooter />
    </div>
  );
};
