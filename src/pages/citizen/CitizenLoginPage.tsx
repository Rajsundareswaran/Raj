import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Droplets,
  Eye,
  EyeOff,
  Gauge,
  Landmark,
  Lock,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { BrandLogo } from '../../components/common/BrandLogo';
import { useCityLens } from '../../context/CityLensContext';

export const CitizenLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCitizenUser, pushToast } = useCityLens();

  const [email, setEmail] = useState('alex.commuter@chennaimobility.org');
  const [password, setPassword] = useState('ChennaiPulse@2025');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.trim().length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const displayName = trimmedEmail
      .split('@')[0]
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

    setCitizenUser((prev) => ({
      ...prev,
      name: displayName || 'Alex Pandian',
      email: trimmedEmail,
    }));

    pushToast(
      'Demo Citizen Session Active',
      'Signed in locally for Phase 1 UI preview (Supabase Auth connects in Phase 2).',
      'success'
    );
    navigate('/dashboard');
  };

  const handleDemoProvider = (provider: string) => {
    pushToast(
      `${provider} (Phase 1 Placeholder)`,
      'External OAuth/SSO will be configured during Phase 2 authentication integration.',
      'info'
    );
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-[#060B14] lg:grid-cols-12">
      {/* Left Visual Telemetry Showcase Panel */}
      <div className="relative hidden flex-col justify-between border-r border-[#16233B] bg-gradient-to-b from-[#091326] to-[#060B14] p-10 lg:col-span-6 lg:flex">
        <div className="flex items-center justify-between">
          <BrandLogo
            variant="citizen"
            subtitle="• Arterial Telemetry Preview v4.8"
            to="/"
          />
          <span className="rounded-full border border-[#1E3252] bg-[#0D182C] px-3 py-1 font-mono text-xs text-sky-300">
            ((•)) Sample Nodes
          </span>
        </div>

        {/* Stylized Chennai Corridor Card */}
        <div className="my-auto py-8">
          <div className="relative overflow-hidden rounded-2xl border border-[#1E3252] bg-[#0C172B] p-5 shadow-2xl">
            <svg viewBox="0 0 560 320" className="h-64 w-full rounded-xl bg-[#091221]">
              <path
                d="M 75,285 L 255,140 L 395,82 L 430,245"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3.5"
              />
              <path
                d="M 335,190 L 385,295"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="3"
              />
              <circle cx="255" cy="140" r="7" fill="#38bdf8" />
              <circle cx="395" cy="82" r="6" fill="#c084fc" />
              <text x="200" y="185" fill="#475569" fontSize="18" fontWeight="bold" opacity="0.45">
                CHENNAI • சென்னை
              </text>
              <g transform="translate(205, 108)">
                <rect width="108" height="24" rx="6" fill="#0f1d35" stroke="#38bdf8" />
                <text x="54" y="16" textAnchor="middle" fill="#e0f2fe" fontSize="10" fontWeight="600">
                  • Guindy Junction
                </text>
              </g>
              <g transform="translate(300, 68)">
                <rect width="88" height="22" rx="6" fill="#0f1d35" stroke="#64748b" />
                <text x="44" y="15" textAnchor="middle" fill="#e2e8f0" fontSize="10">
                  T. Nagar Hub
                </text>
              </g>
              <g transform="translate(310, 212)">
                <rect width="116" height="24" rx="6" fill="#0f1d35" stroke="#22d3ee" />
                <text x="58" y="16" textAnchor="middle" fill="#67e8f9" fontSize="10" fontWeight="600">
                  ⚡ OMR IT Corridor
                </text>
              </g>
            </svg>

            {/* Floating Waterlogging Alert Overlay */}
            <div className="absolute top-8 left-8 max-w-[230px] rounded-xl border border-amber-500/35 bg-[#12192A]/95 p-3 text-xs shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-1.5 font-bold text-amber-300 text-[10px] uppercase">
                <Droplets className="h-3.5 w-3.5" />
                Waterlogging Alert
              </div>
              <div className="mt-1 font-semibold text-white">
                Velachery Main Rd — Sample Feed
              </div>
              <div className="mt-1 text-[11px] text-amber-200/80">• Drain pumps operational</div>
            </div>

            {/* Bottom Corridor Speed Card */}
            <div className="absolute bottom-8 left-8 rounded-xl border border-sky-500/30 bg-[#0B1527]/95 px-3.5 py-2.5 text-xs shadow-lg">
              <div className="flex items-center gap-2 text-[10px] uppercase text-emerald-400 font-bold">
                <Gauge className="h-3.5 w-3.5" />
                Sample Corridor • Optimal
              </div>
              <div className="mt-0.5 font-semibold text-slate-200">
                GST Rd moving at <span className="text-sky-400 font-bold">38 km/h</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {['Guindy Ring', 'T. Nagar Central', 'Marina Promenade', 'OMR IT Expressway'].map(
              (corridor) => (
                <span
                  key={corridor}
                  className="rounded-full border border-[#1B2B46] bg-[#0C1526] px-3 py-1 text-[11px] text-slate-400"
                >
                  • {corridor}
                </span>
              )
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#16233B] pt-5 text-xs text-slate-400">
          <span className="text-sm font-medium text-slate-200">
            &ldquo;Your city. Your route. Your awareness.&rdquo;
          </span>
          <span>Metropolitan Transit Grid • Chennai</span>
        </div>
      </div>

      {/* Right Login Form Panel */}
      <div className="flex flex-col justify-between p-6 sm:p-10 lg:col-span-6">
        <div className="mx-auto flex w-full max-w-md items-center justify-between text-xs">
          <Link
            to="/select-role"
            className="inline-flex items-center gap-1.5 font-medium text-slate-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Selection</span>
          </Link>
          <span className="inline-flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="h-4 w-4 text-sky-400" />
            <span>Demo Citizen Portal</span>
          </span>
        </div>

        <div className="mx-auto my-8 w-full max-w-md civic-card p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-500/25 bg-sky-500/10 text-sky-400">
              <Lock className="h-5 w-5" />
            </div>
            <span className="rounded-md border border-sky-500/30 bg-sky-500/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-sky-300">
              Citizen Access
            </span>
          </div>

          <h1 className="mt-5 text-2xl font-bold text-white">Welcome Back</h1>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">
            Enter demonstration credentials to explore personalized Chennai route telemetry.
          </p>

          {error && (
            <div
              role="alert"
              className="mt-4 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3.5 py-2.5 text-xs text-rose-300"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
            <div>
              <label htmlFor="citizen-email" className="block text-xs font-medium text-slate-300">
                Email Address
              </label>
              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="citizen-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.commuter@chennaimobility.org"
                  className="civic-input pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="citizen-password"
                  className="block text-xs font-medium text-slate-300"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() =>
                    pushToast(
                      'Password Reset (Phase 2)',
                      'Supabase password recovery emails will be wired in Phase 2.',
                      'info'
                    )
                  }
                  className="text-xs font-medium text-sky-400 hover:text-sky-300"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="citizen-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="civic-input pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-sky-500"
              />
              <span>Remember Me</span>
            </label>

            <button type="submit" className="civic-btn-primary w-full py-3">
              <span>Sign In to Mobility Intelligence</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            <div className="h-px flex-1 bg-[#1B2B46]" />
            <span>Or Continue With</span>
            <div className="h-px flex-1 bg-[#1B2B46]" />
          </div>

          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => handleDemoProvider('Google Sign-In')}
              className="civic-btn-secondary w-full text-xs"
            >
              <span className="font-bold text-sky-400">G</span>
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoProvider('Tamil Nadu Civic SSO')}
              className="civic-btn-secondary w-full text-xs"
            >
              <Landmark className="h-3.5 w-3.5 text-sky-400" />
              <span>Tamil Nadu Civic Single Sign-On</span>
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Don&apos;t have an account?{' '}
            <Link to="/citizen/signup" className="font-semibold text-sky-400 hover:text-sky-300">
              Create Account
            </Link>
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-md items-center justify-center gap-4 text-[11px] text-slate-500">
          <span>Phase 1 Local Demo Auth</span>
          <span>•</span>
          <span>Open Data Protocol</span>
          <span>•</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};
