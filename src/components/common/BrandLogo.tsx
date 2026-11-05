import React from 'react';
import { Link } from 'react-router-dom';
import { Network, Shield } from 'lucide-react';

interface BrandLogoProps {
  variant?: 'landing' | 'citizen' | 'admin';
  subtitle?: string;
  to?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'citizen',
  subtitle,
  to = '/',
}) => {
  return (
    <Link to={to} className="inline-flex items-center gap-3 group focus:outline-none">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors ${
          variant === 'admin'
            ? 'bg-sky-500/10 border-sky-500/30 text-sky-400 group-hover:border-sky-400/60'
            : 'bg-sky-500/10 border-sky-400/25 text-sky-400 group-hover:border-sky-400/60'
        }`}
      >
        {variant === 'admin' ? <Shield className="h-4 w-4" /> : <Network className="h-4 w-4" />}
      </div>
      <div className="leading-tight">
        {variant === 'landing' ? (
          <>
            <div className="text-sm font-bold tracking-wider text-sky-400 uppercase">
              Mobility Intelligence
            </div>
            <div className="text-[10px] font-medium tracking-widest text-slate-400 uppercase">
              {subtitle || 'Chennai Integrated Transit Grid'}
            </div>
          </>
        ) : variant === 'admin' ? (
          <>
            <div className="text-sm font-bold text-slate-100">Transit Control Room</div>
            <div className="text-[11px] text-slate-400">
              {subtitle || 'Chennai Integrated Command'}
            </div>
          </>
        ) : (
          <>
            <div className="text-sm sm:text-base font-bold text-sky-400 tracking-tight">
              Chennai Mobility Intelligence
            </div>
            {subtitle && <div className="text-[11px] text-slate-400">{subtitle}</div>}
          </>
        )}
      </div>
    </Link>
  );
};
