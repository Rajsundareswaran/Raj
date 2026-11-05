import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  Lock,
  Megaphone,
  Network,
  Shield,
  Sparkles,
  TrainFront,
  Wrench,
} from 'lucide-react';
import { BrandLogo } from '../../components/common/BrandLogo';

export const RoleSelectionPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#060B14] text-slate-100">
      {/* Top Header */}
      <header className="border-b border-[#152238] bg-[#070D18]/90 px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <BrandLogo variant="landing" subtitle="Greater Chennai Corporation" to="/" />

          <div className="flex items-center gap-3 text-xs">
            <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              DEMO NODE • REGION 04
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-400">
              <Lock className="h-3.5 w-3.5" />
              Phase 1 UI
            </span>
          </div>
        </div>
      </header>

      {/* Main Selection Gateway */}
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-400/30 bg-sky-500/10 text-sky-400 shadow-cyan-glow">
          <Network className="h-7 w-7" />
        </div>

        <h1 className="mt-5 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Welcome to Mobility Intelligence
        </h1>
        <p className="mt-2 text-center text-sm text-slate-400">
          Choose how you would like to continue.
        </p>

        <div className="mt-10 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {/* Citizen & Commuter Portal Card */}
          <div className="civic-card flex flex-col justify-between p-6 sm:p-8 transition-colors hover:border-sky-500/40">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-sky-500/25 bg-sky-500/10 text-sky-400">
                  <TrainFront className="h-6 w-6" />
                </div>
                <span className="rounded-md border border-sky-500/30 bg-sky-500/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-sky-300">
                  Public Access
                </span>
              </div>

              <div className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Commuter Routing Engine
              </div>
              <h2 className="mt-1 text-xl font-bold text-white">
                Citizen &amp; Commuter Portal
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Explore Chennai corridors, view mobility incidents, inspect local road alerts, and
                report road hazards with photo evidence.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#192842] pt-5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-sky-400 shrink-0" />
                  <span>Corridor Route Planner</span>
                </div>
                <div className="flex items-center gap-2">
                  <Megaphone className="h-4 w-4 text-sky-400 shrink-0" />
                  <span>Civic Road Reports</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrainFront className="h-4 w-4 text-sky-400 shrink-0" />
                  <span>MTC &amp; Metro Modes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0" />
                  <span>Alert Verification</span>
                </div>
              </div>
            </div>

            <Link to="/citizen/login" className="civic-btn-primary mt-7 w-full py-3">
              <span>Continue as User</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Admin & Operations Portal Card */}
          <div className="civic-card flex flex-col justify-between p-6 sm:p-8 transition-colors hover:border-indigo-500/40">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                  <Shield className="h-6 w-6" />
                </div>
                <span className="rounded-md border border-indigo-500/35 bg-indigo-500/15 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                  Authorized GCC
                </span>
              </div>

              <div className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Integrated Dispatch Hub
              </div>
              <h2 className="mt-1 text-xl font-bold text-white">
                Admin &amp; Operations Portal
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Monitor incoming reports, review AI-extracted public incidents, dispatch GCC ward
                crews, and manage resolved archives.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#192842] pt-5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span>AI Validation Stream</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span>Rapid Crew Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span>Corridor Telemetry</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span>Incident Resolution</span>
                </div>
              </div>
            </div>

            <Link
              to="/admin/login"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#2B3E63] bg-[#16233B] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1E3050]"
            >
              <span>Continue as Admin</span>
              <Shield className="h-4 w-4 text-indigo-300" />
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
          <span>Node: CHE-CENTRAL-01</span>
          <span>•</span>
          <span>Phase 1 Frontend Demonstration</span>
          <span>•</span>
          <span>Supabase Auth connects in Phase 2</span>
        </div>
      </main>

      {/* Bottom Bar */}
      <footer className="border-t border-[#152238] bg-[#070D18] px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-xs">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 font-medium text-slate-300 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Home</span>
          </Link>

          <span className="rounded-lg border border-[#1B2C47] bg-[#0C1628] px-3 py-1.5 text-[11px] text-slate-400">
            GCC Smart City Integrated Infrastructure
          </span>
        </div>
      </footer>
    </div>
  );
};
