import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layers, RotateCcw, X } from 'lucide-react';
import { ALL_15_SCREENS } from '../../data/mockData';
import { useCityLens } from '../../context/CityLensContext';

export const ScreenNavigator: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { resetDemoState } = useCityLens();

  return (
    <div className="fixed bottom-4 right-4 z-[80]">
      {open ? (
        <div className="w-80 sm:w-96 rounded-2xl border border-sky-500/30 bg-[#0A1222]/95 p-4 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Phase 1 Screen Directory (15 / 15)
              </div>
              <div className="text-[11px] text-slate-400">
                Jump directly to any Figma screen route
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close screen navigator"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 max-h-80 space-y-1 overflow-y-auto pr-1">
            {ALL_15_SCREENS.map((scr) => {
              const active =
                location.pathname === scr.path ||
                (scr.number === '13' && location.pathname.startsWith('/admin/reports/')) ||
                (scr.number === '06' && location.pathname.startsWith('/citizen/incidents/'));
              return (
                <Link
                  key={scr.number}
                  to={scr.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-colors ${
                    active
                      ? 'bg-sky-500/20 border border-sky-400/40 text-sky-200 font-semibold'
                      : 'text-slate-300 hover:bg-[#132038] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <span className="inline-flex h-5 w-6 shrink-0 items-center justify-center rounded bg-slate-800 font-mono text-[10px] text-sky-300">
                      {scr.number}
                    </span>
                    <span className="truncate">{scr.title}</span>
                  </span>
                  <span
                    className={`ml-2 shrink-0 rounded px-1.5 py-0.5 text-[10px] ${
                      scr.portal === 'Admin'
                        ? 'bg-indigo-500/15 text-indigo-300'
                        : scr.portal === 'Citizen'
                          ? 'bg-cyan-500/15 text-cyan-300'
                          : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {scr.portal}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-3">
            <span className="text-[11px] text-slate-500">Local demo state</span>
            <button
              type="button"
              onClick={resetDemoState}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <RotateCcw className="h-3 w-3" />
              Reset Demo Data
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-sky-500/35 bg-[#0C1629]/95 px-3.5 py-2 text-xs font-semibold text-sky-300 shadow-lg backdrop-blur-md transition-all hover:border-sky-400 hover:bg-[#13223D] hover:text-white"
        >
          <Layers className="h-3.5 w-3.5 text-sky-400" />
          <span>All 15 Screens</span>
        </button>
      )}
    </div>
  );
};
