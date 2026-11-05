import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bot,
  Eye,
  EyeOff,
  GitBranch,
  KeyRound,
  Lock,
  Mail,
  Server,
  Shield,
  ShieldCheck,
} from 'lucide-react';
import { BrandLogo } from '../../components/common/BrandLogo';
import { AppFooter } from '../../components/common/AppFooter';
import { useCityLens } from '../../context/CityLensContext';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setAdminUser, pushToast } = useCityLens();

  const [email, setEmail] = useState('officer.raghavan@chennaicorporation.gov.in');
  const [password, setPassword] = useState('GCCCommand@2025!');
  const [pin, setPin] = useState('940122');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberTerminal, setRememberTerminal] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid official administrator email address.');
      return;
    }
    if (password.trim().length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (!/^\d{6}$/.test(pin.trim())) {
      setError('Employee Security PIN must be a 6-digit numeric code.');
      return;
    }

    setAdminUser((prev) => ({
      ...prev,
      email: email.trim(),
    }));

    pushToast(
      'Demo Admin Session Active',
      'Signed in to Transit Control Room (Phase 1 local demo — Supabase RBAC connects in Phase 2).',
      'success'
    );
    navigate('/admin/dashboard');
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#060B14] text-slate-100">
      {/* Top Command Bar */}
      <header className="border-b border-[#16233B] bg-[#070D19] px-4 py-3.5 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <BrandLogo
            variant="citizen"
            subtitle="• ICCC Terminal Preview Environment"
            to="/"
          />

          <div className="flex items-center gap-3 text-xs">
            <span className="hidden md:inline-flex items-center gap-2 rounded-lg border border-[#1E3150] bg-[#0B1528] px-3 py-1.5 font-mono text-[10px] text-slate-300">
              <Lock className="h-3.5 w-3.5 text-sky-400" />
              PHASE 1 DEMO // ADMIN GATEWAY
            </span>
            <Link
              to="/select-role"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#223556] bg-[#0D182C] px-3 py-1.5 font-medium text-slate-200 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Portal Select</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Split Command Content */}
      <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-8 px-4 py-10 sm:px-8 lg:grid-cols-12 lg:items-center">
        {/* Left GCC Topology Overview */}
        <div className="lg:col-span-7 lg:pr-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-sky-300">
            <Shield className="h-3.5 w-3.5" />
            GCC Smart City Operations Command
          </span>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            Greater Chennai Corporation
            <span className="block bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Integrated Mobility Command
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
            Centralized incident triage, civic NLP monitoring, and road maintenance dispatch across
            metropolitan Greater Chennai Corporation zones.
          </p>

          {/* 15 GCC Zones Topology Card */}
          <div className="mt-7 rounded-2xl border border-[#1B2C48] bg-[#0B1324] p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold text-white">
                Chennai 15 GCC Zones Network Topology (Sample)
              </div>
              <span className="rounded border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
                DEMO: ONLINE
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
              {[
                { z: 'Z-01', name: 'Thiruvottiyur', status: '99.4% Flow', color: 'text-cyan-400' },
                { z: 'Z-05', name: 'Royapuram', status: 'Nominal', color: 'text-emerald-400' },
                { z: 'Z-08', name: 'Anna Nagar', status: '4.2k V/hr', color: 'text-sky-400' },
                { z: 'Z-09', name: 'Teynampet', status: 'Dense P1', color: 'text-amber-300' },
                { z: 'Z-13', name: 'Adyar Core', status: 'Monitored', color: 'text-cyan-300' },
              ].map((zone) => (
                <div
                  key={zone.z}
                  className="rounded-xl border border-[#192842] bg-[#08101E] p-3 text-xs"
                >
                  <div className="font-mono text-[10px] text-slate-400">{zone.z}</div>
                  <div className="mt-0.5 font-semibold text-white truncate">{zone.name}</div>
                  <div className={`mt-1.5 text-[10px] font-medium ${zone.color}`}>
                    • {zone.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Diagnostic Cards */}
          <div className="mt-5">
            <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Sample Node Diagnostic Status
            </div>
            <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-[#192842] bg-[#0B1324] p-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Server className="h-4 w-4 text-sky-400" />
                  <span>Central Telemetry Host</span>
                </div>
                <div className="mt-2 text-base font-bold text-white">Ripon Building Hub</div>
                <div className="mt-1 text-[11px] text-sky-400">ICCC Demo Node 01</div>
              </div>

              <div className="rounded-xl border border-[#192842] bg-[#0B1324] p-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <GitBranch className="h-4 w-4 text-cyan-400" />
                  <span>Active Corridor Array</span>
                </div>
                <div className="mt-2 text-base font-bold text-white">48 Arterials</div>
                <div className="mt-1 text-[11px] text-cyan-400">Sample Corridor Feed</div>
              </div>

              <div className="rounded-xl border border-[#192842] bg-[#0B1324] p-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Bot className="h-4 w-4 text-indigo-400" />
                  <span>AI Classifier Pipeline</span>
                </div>
                <div className="mt-2 text-base font-bold text-white">Ready (Phase 5)</div>
                <div className="mt-1 text-[11px] text-indigo-300">Gemini API Target</div>
              </div>
            </div>
          </div>

          <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#1A2A46] bg-[#091222] px-4 py-2.5 text-xs text-slate-300">
            <ShieldCheck className="h-4 w-4 text-cyan-400 shrink-0" />
            <span>
              <strong>Phase 1 Frontend Preview:</strong> Use the prefilled demo credentials to
              inspect the Admin Operations &amp; AI Monitoring screens.
            </span>
          </div>
        </div>

        {/* Right Admin Login Form */}
        <div className="lg:col-span-5">
          <div className="civic-card p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-400">
                <Shield className="h-5 w-5" />
              </div>
              <span className="rounded-md border border-[#223556] bg-[#0B1425] px-2.5 py-1 font-mono text-[10px] text-slate-300">
                PORTAL // SEC-ID: 8092
              </span>
            </div>

            <h2 className="mt-5 text-2xl font-bold text-white">Admin &amp; Operations Portal</h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              Sign in with demonstration GCC operator credentials to manage and verify reports.
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
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="admin-email" className="font-medium text-slate-300">
                    Official Admin Email
                  </label>
                  <span className="font-mono text-[11px] text-sky-400">gov.in / org</span>
                </div>
                <div className="relative mt-1.5">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="civic-input pl-10 text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="admin-password" className="font-medium text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      pushToast(
                        'Admin Credential Recovery',
                        'Supabase Auth recovery connects in Phase 2.',
                        'info'
                      )
                    }
                    className="text-sky-400 hover:text-sky-300"
                  >
                    Forgot Admin Credentials
                  </button>
                </div>
                <div className="relative mt-1.5">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="civic-input pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label="Toggle password visibility"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="admin-pin" className="font-medium text-slate-300">
                    Employee Security PIN (6-digit)
                  </label>
                  <span className="font-mono text-[10px] uppercase text-slate-500">
                    Demo PIN
                  </span>
                </div>
                <div className="relative mt-1.5">
                  <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="admin-pin"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                    placeholder="940122"
                    className="civic-input pl-10 font-mono tracking-widest"
                    required
                  />
                </div>
              </div>

              <label className="flex items-center gap-2.5 text-xs text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberTerminal}
                  onChange={(e) => setRememberTerminal(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-sky-500"
                />
                <span>Remember Session on this demo terminal</span>
              </label>

              <button type="submit" className="civic-btn-primary w-full py-3">
                <Shield className="h-4 w-4" />
                <span>Sign In as Admin (ICCC Access)</span>
              </button>
            </form>

            <div className="mt-5 border-t border-[#18263F] pt-4 text-center space-y-2.5 text-xs">
              <p className="text-slate-400">
                New Administrator or Field Officer?{' '}
                <Link
                  to="/admin/signup"
                  className="font-semibold text-sky-400 hover:text-sky-300"
                >
                  Register for Admin Access
                </Link>
              </p>
              <div>
                <Link to="/select-role" className="text-slate-500 hover:text-slate-300">
                  ⇄ Back to Login Type Selection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
};
