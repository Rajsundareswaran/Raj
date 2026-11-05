import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  CreditCard,
  Eye,
  EyeOff,
  Fingerprint,
  HelpCircle,
  Lock,
  Mail,
  User,
} from 'lucide-react';
import { BrandLogo } from '../../components/common/BrandLogo';
import { AppFooter } from '../../components/common/AppFooter';
import { useCityLens } from '../../context/CityLensContext';

export const CitizenSignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCitizenUser, pushToast } = useCityLens();

  const [fullName, setFullName] = useState('Alex Pandian');
  const [email, setEmail] = useState('alex@example.com');
  const [phone, setPhone] = useState('9840123456');
  const [password, setPassword] = useState('ChennaiPulse@2025');
  const [confirmPassword, setConfirmPassword] = useState('ChennaiPulse@2025');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const passwordChecks = useMemo(() => {
    const hasLen = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasNumSymbol = /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password);
    const score = [hasLen, hasUpper, hasNumSymbol, password.length >= 12].filter(Boolean).length;
    return { hasLen, hasUpper, hasNumSymbol, score };
  }, [password]);

  const strengthLabel =
    passwordChecks.score >= 4
      ? 'Strong'
      : passwordChecks.score >= 2
        ? 'Medium Strength'
        : 'Weak';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (fullName.trim().length < 2) {
      setError('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    const digitsOnly = phone.replace(/\s+/g, '');
    if (!/^\d{10}$/.test(digitsOnly)) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (!passwordChecks.hasLen) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreed) {
      setError('Please agree to the Terms of Service and Civic Reporting Code of Conduct.');
      return;
    }

    setCitizenUser({
      name: fullName.trim(),
      email: email.trim(),
      role: 'citizen',
      badge: 'Verified Commuter',
      zone: 'Zone 10 (Kodambakkam/Saidapet)',
      karmaPoints: 100,
    });

    pushToast(
      'Demo Citizen Account Created',
      `Welcome, ${fullName.trim()}! Local session initialized (Supabase registration connects in Phase 2).`,
      'success'
    );
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#060B14] text-slate-100">
      {/* Top Bar */}
      <header className="border-b border-[#16233B] bg-[#070D19] px-4 py-3.5 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo variant="citizen" to="/" />
            <span className="rounded-md border border-slate-700 bg-slate-800/80 px-2.5 py-0.5 text-[11px] text-slate-300">
              Citizen Portal
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-sky-500/10 px-3 py-1 text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Node: Anna Salai Corridor Preview
            </span>
            <button
              type="button"
              onClick={() =>
                pushToast(
                  'Citizen Support',
                  'GCC Helpline 1913 • Phase 1 UI demonstration.',
                  'info'
                )
              }
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Support</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Split Grid */}
      <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-8 px-4 py-10 sm:px-8 lg:grid-cols-12">
        {/* Left Feature Showcase */}
        <div className="flex flex-col justify-between lg:col-span-6 lg:pr-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-sky-300">
              Civic Intelligence Network
            </span>

            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Empowering Chennai&apos;s Daily Arteries Through Citizen Telemetry.
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Join the community bridging Metropolitan Transport Corporation buses, Chennai Metro
              Rail corridors, and arterial choke-points with field ground-truth reports.
            </p>

            {/* Preview Telemetry Card */}
            <div className="mt-6 rounded-2xl border border-[#1B2C48] bg-[#0B1425] p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="rounded-xl border border-sky-500/25 bg-[#0F1D35] px-3 py-2 text-xs">
                  <div className="text-[10px] text-slate-400">MTC Network Demo</div>
                  <div className="font-bold text-sky-400">Sample Fleet Feed</div>
                </div>
                <span className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 font-mono text-[10px] font-semibold text-cyan-300">
                  GPS-TELEMETRY PREVIEW
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-[#192944] bg-[#0E1A2F] p-3.5 text-xs">
                <div>
                  <div className="flex items-center gap-2 font-semibold text-white">
                    <span>Kathipara Junction Grade Separator</span>
                    <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[10px] text-cyan-300">
                      VERIFIED
                    </span>
                  </div>
                  <div className="mt-1 text-slate-400">
                    Congestion cleared • Speed normal: 42 km/h
                  </div>
                </div>
                <span className="text-[11px] text-slate-500">2m ago</span>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[#18263F] pt-4 text-xs">
                <div>
                  <div className="font-bold text-white">
                    Community-powered Chennai corridor reporting
                  </div>
                  <div className="text-slate-400">
                    Across T. Nagar, OMR, Velachery &amp; North Chennai zones
                  </div>
                </div>
                <span className="rounded-lg border border-sky-500/25 bg-sky-500/10 px-2.5 py-1.5 font-semibold text-sky-300">
                  +18.4% activity
                </span>
              </div>
            </div>

            {/* 3 Mini Value Cards */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-[#192842] bg-[#0B1323] p-4">
                <AlertTriangle className="h-5 w-5 text-sky-400" />
                <div className="mt-2.5 text-xs font-bold text-white">Hazard alerts</div>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                  Timely reports on road flooding, waterlogging &amp; gridlock bottlenecks.
                </p>
              </div>
              <div className="rounded-xl border border-[#192842] bg-[#0B1323] p-4">
                <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                <div className="mt-2.5 text-xs font-bold text-white">Verified ground truth</div>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                  Reports reviewed with AI confidence scoring &amp; municipal operators.
                </p>
              </div>
              <div className="rounded-xl border border-[#192842] bg-[#0B1323] p-4">
                <Award className="h-5 w-5 text-indigo-400" />
                <div className="mt-2.5 text-xs font-bold text-white">Civic mobility badges</div>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                  Earn Civic Karma points for accurate hazard submissions.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
            <span className="uppercase tracking-wider">Aligned With:</span>
            {['GCC Smart City', 'MTC Chennai', 'CMRL Corridors'].map((badge) => (
              <span
                key={badge}
                className="rounded border border-[#1B2B46] bg-[#0B1323] px-2.5 py-1 text-slate-300"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Right Signup Form */}
        <div className="lg:col-span-6 lg:pl-4">
          <div className="civic-card p-6 sm:p-8">
            <Link
              to="/citizen/login"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-400 hover:text-sky-300"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Sign In</span>
            </Link>

            <h2 className="mt-3 text-2xl font-bold text-white">Create Your Account</h2>
            <p className="mt-1 text-xs text-slate-400">
              Join the community helping make Chennai&apos;s roads safer and smarter.
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
                <label htmlFor="signup-name" className="block text-xs font-medium text-slate-300">
                  Full Name
                </label>
                <div className="relative mt-1.5">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="signup-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Alex Pandian"
                    className="civic-input pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signup-email" className="block text-xs font-medium text-slate-300">
                  Email Address
                </label>
                <div className="relative mt-1.5">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="civic-input pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signup-phone" className="block text-xs font-medium text-slate-300">
                  Phone Number
                </label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center rounded-l-xl border border-r-0 border-[#1E2E4A] bg-[#0D182C] px-3.5 text-xs font-semibold text-sky-400">
                    +91
                  </span>
                  <input
                    id="signup-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98401 23456"
                    className="civic-input rounded-l-none"
                    required
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  Used for high-priority civic hazard alert notifications in future phases.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="signup-password" className="font-medium text-slate-300">
                    Password
                  </label>
                  <span className="font-semibold text-sky-400">{strengthLabel}</span>
                </div>
                <div className="relative mt-1.5">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="signup-password"
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

                {/* 4-segment strength bar */}
                <div className="mt-2 grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map((seg) => (
                    <div
                      key={seg}
                      className={`h-1 rounded-full ${
                        passwordChecks.score >= seg ? 'bg-sky-400' : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
                <div className="mt-2 flex flex-wrap gap-3 text-[11px]">
                  <span
                    className={passwordChecks.hasLen ? 'text-sky-400' : 'text-slate-500'}
                  >
                    ✓ 8+ chars
                  </span>
                  <span
                    className={passwordChecks.hasUpper ? 'text-sky-400' : 'text-slate-500'}
                  >
                    ✓ Uppercase
                  </span>
                  <span
                    className={passwordChecks.hasNumSymbol ? 'text-sky-400' : 'text-slate-500'}
                  >
                    ✓ Number &amp; symbol
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="signup-confirm-password"
                  className="block text-xs font-medium text-slate-300"
                >
                  Confirm Password
                </label>
                <div className="relative mt-1.5">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="signup-confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="civic-input pl-10 pr-10"
                    required
                  />
                  {confirmPassword && password === confirmPassword && (
                    <Check className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400" />
                  )}
                </div>
              </div>

              <label className="flex items-start gap-2.5 text-xs text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-900 text-blue-600"
                />
                <span>
                  I agree to the <span className="text-sky-400 underline">Terms of Service</span>,{' '}
                  <span className="text-sky-400 underline">Civic Reporting Code of Conduct</span>,
                  and <span className="text-sky-400 underline">Privacy Policy</span>.
                </span>
              </label>

              <button type="submit" className="civic-btn-primary w-full py-3">
                <span>Create Citizen Account</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="my-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              <div className="h-px flex-1 bg-[#1B2B46]" />
              <span>Or Register With</span>
              <div className="h-px flex-1 bg-[#1B2B46]" />
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  pushToast(
                    'DigiLocker Demo Placeholder',
                    'Civic identity federation is a visual placeholder in Phase 1.',
                    'info'
                  )
                }
                className="civic-btn-secondary text-xs"
              >
                <Fingerprint className="h-4 w-4 text-sky-400" />
                <span>Aadhaar DigiLocker</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  pushToast(
                    'GCC Transit Pass Placeholder',
                    'Singara Chennai Transit Pass linking is a visual placeholder in Phase 1.',
                    'info'
                  )
                }
                className="civic-btn-secondary text-xs"
              >
                <CreditCard className="h-4 w-4 text-sky-400" />
                <span>GCC Transit Pass</span>
              </button>
            </div>

            <p className="mt-5 text-center text-xs text-slate-400">
              Already have an account?{' '}
              <Link to="/citizen/login" className="font-semibold text-sky-400 hover:text-sky-300">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
};
