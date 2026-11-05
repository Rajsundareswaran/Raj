import React from 'react';
import { useCityLens } from '../../context/CityLensContext';

interface AppFooterProps {
  compact?: boolean;
}

export const AppFooter: React.FC<AppFooterProps> = ({ compact = false }) => {
  const { pushToast } = useCityLens();

  const handleInfoLink = (label: string) => {
    pushToast(
      label,
      'Phase 1 static civic documentation link placeholder.',
      'info'
    );
  };

  return (
    <footer
      className={`border-t border-[#16233A] bg-[#060B14]/95 ${
        compact ? 'py-3.5 px-4 sm:px-6' : 'py-6 px-4 sm:px-8'
      }`}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-slate-400 md:flex-row">
        <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
          <span className="font-bold tracking-wide text-sky-400">
            Chennai Mobility Intelligence
          </span>
          <span className="hidden text-slate-700 sm:inline">|</span>
          <span className="text-center sm:text-left text-[11px] text-slate-500">
            © 2025 Greater Chennai Corporation &amp; Metropolitan Transport Corporation. Mobility
            Intelligence Platform.
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
          {['Civic Guidelines', 'Open Data Protocol', 'Telemetry API', 'Privacy Policy'].map(
            (item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleInfoLink(item)}
                className="text-slate-400 transition-colors hover:text-sky-300"
              >
                {item}
              </button>
            )
          )}
          <span className="inline-flex items-center gap-1.5 text-sky-400 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            Demo Mode Active
          </span>
        </div>
      </div>
    </footer>
  );
};
