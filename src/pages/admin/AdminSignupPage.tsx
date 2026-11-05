import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  Building2,
  KeyRound,
  Lock,
  Mail,
  Map,
  Shield,
  User,
} from 'lucide-react';
import { BrandLogo } from '../../components/common/BrandLogo';
import { AppFooter } from '../../components/common/AppFooter';
import { GCC_ZONES } from '../../data/mockData';
import { useCityLens } from '../../context/CityLensContext';

export const AdminSignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { setAdminUser, pushToast } = useCityLens();

  const [fullName, setFullName] = useState('Inspector R. Raghavan');
  const [officialEmail, setOfficialEmail] = useState('r.raghavan@chennaicorporation.gov.in');
  const [employeeId, setEmployeeId] = useState('GCC-TRAFFIC-Z10-8841');
  const [assignedZone, setAssignedZone] = useState(GCC_ZONES[9]);
  const [mobile, setMobile] = useState('9840123456');
  const [password, setPassword] = useState('ChennaiICCC@2025!');
  const [confirmPassword, setConfirmPassword] = useState('ChennaiICCC@2025!');
  const [clearanceCode, setClearanceCode] = useState('GCC-9K2M');
  const [affirmed, setAffirmed] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const protocolChecks = useMemo(
    () => ({
      len12: password.length >= 12,
      symbol: /[^A-Za-z0-9]/.test(password),
      alnum: /[A-Za-z]/.test(password) && /[0-9]/.test(password),
      token: clearanceCode.trim().length >= 4,
    }),
    [clearanceCode, password]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (fullName.trim().length < 3) {
      setError('Please enter the officer full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(officialEmail.trim())) {
      setError('Please enter a valid official email address.');
      return;
    }
    if (!employeeId.trim()) {
      setError('Employee / Department ID is required.');
      return;
    }
    if (!/^\d{10}$/.test(mobile.replace(/\s+/g, ''))) {
      setError('Please enter a valid 10-digit emergency dispatch mobile number.');
      return;
    }
    if (password.length < 8) {
      setError('Portal Master Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Master password confirmation does not match.');
      return;
    }
    if (clearanceCode.trim().length < 4) {
      setError('Please enter the mandatory Admin Access Token (e.g., GCC-9K2M).');
      return;
    }
    if (!affirmed) {
      setError('Please affirm the Civic Data Confidentiality Protocol checkbox.');
      return;
    }

    setAdminUser({
      name: fullName.trim(),
      email: officialEmail.trim(),
      role: 'admin',
      badge: `${assignedZone.split('-')[0].trim()} Lead`,
      zone: assignedZone,
      karmaPoints: 0,
    });

    pushToast(
      'Demo Admin Account Provisioned',
      `Registered ${fullName.trim()} (${assignedZone}) in local Phase 1 session.`,
      'success'
    );
    navigate('/admin/dashboard');
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#060B14] text-slate-100">
      {/* Top Bar */}
      <header className="border-b border-[#16233B] bg-[#070D19] px-4 py-3.5 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo
              variant="citizen"
              subtitle="Greater Chennai Corporation • Integrated Transit Command"
              to="/"
            />
            <span className="hidden sm:inline-block rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
              ICCC DEMO NODE
            </span>
          </div>

          <Link
            to="/admin/login"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#223556] bg-[#0D182C] px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Admin Login</span>
          </Link>
        </div>
      </header>

      {/* Main Centered Onboarding Card */}
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
        <div className="civic-card p-6 sm:p-9">
          <div className="border-b border-[#182741] pb-4">
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-sky-400">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              Operational Clearance Onboarding (Phase 1 Demo)
            </div>
            <div className="mt-1 font-mono text-[10px] text-slate-500">
              GATEWAY: ICCC-CHN-TN-04 • ROLE-BASED ACCESS CONNECTS IN PHASE 2
            </div>
          </div>

          <div className="mt-5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-400">
              <BadgeCheck className="h-4 w-4" />
              <span>Field Officer Onboarding</span>
            </div>
            <h1 className="mt-1 text-2xl font-extrabold text-white">Create Admin Account</h1>
            <p className="mt-1 text-xs text-slate-400">
              Register authorized personnel to monitor, verify, and resolve mobility incidents.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mt-4 rounded-xl border border-rose-500/35 bg-rose-500/10 px-4 py-2.5 text-xs text-rose-300"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="adm-name" className="block text-xs font-medium text-slate-300">
                  Full Name <span className="text-sky-400">*</span>
                </label>
                <div className="relative mt-1.5">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="adm-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="civic-input pl-10 text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="adm-email" className="block text-xs font-medium text-slate-300">
                  Official Email (.gov.in / .org) <span className="text-sky-400">*</span>
                </label>
                <div className="relative mt-1.5">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="adm-email"
                    type="email"
                    value={officialEmail}
                    onChange={(e) => setOfficialEmail(e.target.value)}
                    className="civic-input pl-10 text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="adm-emp" className="block text-xs font-medium text-slate-300">
                  Employee / Department ID <span className="text-sky-400">*</span>
                </label>
                <div className="relative mt-1.5">
                  <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="adm-emp"
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="civic-input pl-10 font-mono text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="adm-zone" className="block text-xs font-medium text-slate-300">
                  Assigned GCC Zone / Division <span className="text-sky-400">*</span>
                </label>
                <div className="relative mt-1.5">
                  <Map className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <select
                    id="adm-zone"
                    value={assignedZone}
                    onChange={(e) => setAssignedZone(e.target.value)}
                    className="civic-input pl-10 text-xs"
                  >
                    {GCC_ZONES.map((z) => (
                      <option key={z} value={z}>
                        {z}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="adm-mobile" className="font-medium text-slate-300">
                  Emergency Dispatch Mobile Number <span className="text-sky-400">*</span>
                </label>
                <span className="text-[11px] text-sky-400">⚡ Demo Verification</span>
              </div>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center rounded-l-xl border border-r-0 border-[#1E2E4A] bg-[#0D182C] px-3.5 text-xs font-semibold text-slate-300">
                  +91
                </span>
                <input
                  id="adm-mobile"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="civic-input rounded-l-none text-xs"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="adm-pass" className="block text-xs font-medium text-slate-300">
                  Portal Master Password <span className="text-sky-400">*</span>
                </label>
                <div className="relative mt-1.5">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="adm-pass"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="civic-input pl-10 text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="adm-confirm" className="block text-xs font-medium text-slate-300">
                  Confirm Master Password <span className="text-sky-400">*</span>
                </label>
                <div className="relative mt-1.5">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="adm-confirm"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="civic-input pl-10 text-xs"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[#192842] bg-[#091120] px-3.5 py-2.5 text-[11px]">
              <span className="text-slate-400 font-medium">Credentials Protocol:</span>
              {[
                { ok: protocolChecks.len12, label: '12+ Characters' },
                { ok: protocolChecks.symbol, label: 'Special Symbol' },
                { ok: protocolChecks.alnum, label: 'Alphanumeric Mix' },
                { ok: protocolChecks.token, label: 'GCC Token Ready' },
              ].map((rule) => (
                <span
                  key={rule.label}
                  className={`rounded px-2 py-0.5 ${
                    rule.ok
                      ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  ✓ {rule.label}
                </span>
              ))}
            </div>

            {/* Highlighted Admin Clearance Token Box */}
            <div className="rounded-xl border border-cyan-500/35 bg-[#0A1629] p-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="adm-clearance"
                  className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300"
                >
                  <KeyRound className="h-4 w-4" />
                  <span>Admin Access Token / Clearance Code *</span>
                </label>
                <span className="rounded border border-cyan-500/35 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
                  MANDATORY TOKEN
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Enter the 8-character clearance token (Demo token prefilled: <code>GCC-9K2M</code>).
              </p>
              <input
                id="adm-clearance"
                type="text"
                value={clearanceCode}
                onChange={(e) => setClearanceCode(e.target.value.toUpperCase())}
                placeholder="E.G. GCC-9K2M"
                className="mt-3 w-full rounded-xl border border-cyan-500/30 bg-[#070E1C] py-3 text-center font-mono text-sm font-bold tracking-[0.25em] text-cyan-200 focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>

            <label className="flex items-start gap-2.5 text-xs text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={affirmed}
                onChange={(e) => setAffirmed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-900 text-blue-600"
              />
              <span>
                I affirm that I am an authorized operator or project evaluator and agree to the
                Civic Data Confidentiality Protocol.
              </span>
            </label>

            <button type="submit" className="civic-btn-primary w-full py-3.5">
              <Shield className="h-4 w-4" />
              <span>Create Admin Account</span>
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-slate-400">
            Already registered?{' '}
            <Link to="/admin/login" className="font-semibold text-sky-400 hover:text-sky-300">
              Admin Login
            </Link>
          </p>

          <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-rose-500/25 bg-rose-950/20 p-3.5 text-[11px] text-rose-200/80">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
            <span>
              <strong>Notice:</strong> Phase 1 onboarding operates on local demonstration state;
              PostgreSQL Row-Level Security &amp; server-side clearance token verification connect
              in Phase 2.
            </span>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
};
