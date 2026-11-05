import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Bot,
  ExternalLink,
  Gauge,
  GitBranch,
  PlayCircle,
  Send,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { PublicNavbar } from '../../components/layouts/PublicNavbar';
import { AppFooter } from '../../components/common/AppFooter';
import { DemoModeNotice } from '../../components/common/StatusBadges';
import { useCityLens } from '../../context/CityLensContext';

export const LandingPage: React.FC = () => {
  const { incidents, openIncidentModal, pushToast } = useCityLens();

  const handleOpenSamplePin = (matchCategory: string) => {
    const found =
      incidents.find((i) => i.category.toLowerCase().includes(matchCategory.toLowerCase())) ||
      incidents[0];
    if (found) openIncidentModal(found);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060B14] text-slate-100">
      <PublicNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 lg:px-8 text-center">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-[#0D182C] px-3.5 py-1 text-[11px] font-semibold tracking-wide text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              <span>AI-POWERED URBAN TRANSIT INTELLIGENCE V2.4</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300 font-normal">Chennai Corridor Preview</span>
            </div>
          </div>

          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[54px] lg:leading-[1.12]">
            Navigate Chennai.
            <span className="block mt-1">
              Stay{' '}
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                Ahead of Every
              </span>{' '}
              Disruption.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-400">
            NLP incident intelligence from civic feeds, citizen telemetry, and corridor dynamics
            across Greater Chennai Corporation.
          </p>

          <div className="mt-4 flex justify-center">
            <DemoModeNotice label="Phase 1 UI Demonstration — Sample Chennai corridor data & simulated state" />
          </div>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/select-role" className="civic-btn-primary w-full sm:w-auto px-6 py-3">
              <Send className="h-4 w-4" />
              <span>Get Started</span>
              <span className="text-xs font-normal text-blue-200">(Civic &amp; Operator)</span>
            </Link>

            <a
              href="#features"
              className="civic-btn-secondary w-full sm:w-auto px-6 py-3"
            >
              <PlayCircle className="h-4 w-4 text-sky-400" />
              <span>Explore Features</span>
            </a>
          </div>

          {/* 3 Hero Metric Strip */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 divide-y divide-[#1A2942] rounded-2xl border border-[#1A2942] bg-[#0B1322]/90 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="flex items-center justify-center gap-3.5 px-5 py-4 text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                <GitBranch className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">1,420+ Km</div>
                <div className="text-xs text-slate-400">Monitored Arterials</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3.5 px-5 py-4 text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <Gauge className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-sky-400">18s AI Detection</div>
                <div className="text-xs text-slate-400">Target Pipeline Latency</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3.5 px-5 py-4 text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">45.2k Daily</div>
                <div className="text-xs text-slate-400">Sample Commuter Cohort</div>
              </div>
            </div>
          </div>

          {/* Interactive Corridor Telemetry Preview Card */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#1D2F4D] bg-[#0A1221] shadow-2xl text-left">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#182741] bg-[#0D1729] px-4 py-2.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                <span className="font-mono text-[11px] font-semibold tracking-wider text-slate-300">
                  CORRIDOR TELEMETRY PREVIEW: GCC ZONE 04 - 13
                </span>
                <span className="rounded bg-sky-500/15 px-1.5 py-0.5 font-mono text-[10px] text-sky-300">
                  EPSG:4326
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <Activity className="h-3.5 w-3.5 text-sky-400" />
                <span>Sample Corridor Nodes • Click any pin to inspect</span>
              </div>
            </div>

            <div className="relative h-[360px] sm:h-[420px] w-full gis-grid-bg overflow-hidden">
              <svg
                viewBox="0 0 1000 440"
                preserveAspectRatio="xMidYMid slice"
                className="h-full w-full"
              >
                {/* Arterial Corridors */}
                <line
                  x1="220"
                  y1="420"
                  x2="650"
                  y2="45"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeOpacity="0.85"
                />
                <line
                  x1="365"
                  y1="45"
                  x2="445"
                  y2="345"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                <line
                  x1="640"
                  y1="230"
                  x2="680"
                  y2="425"
                  stroke="#22d3ee"
                  strokeWidth="3"
                />
                <circle
                  cx="415"
                  cy="280"
                  r="9"
                  fill="#2563eb"
                  stroke="#e0f2fe"
                  strokeWidth="2.5"
                />

                <text x="580" y="92" fill="#94a3b8" fontFamily="monospace" fontSize="10">
                  ANNA SALAI
                </text>
                <text x="305" y="102" fill="#64748b" fontFamily="monospace" fontSize="10">
                  INNER RING ROAD
                </text>
                <text x="275" y="365" fill="#94a3b8" fontFamily="monospace" fontSize="10">
                  GST ROAD
                </text>
                <text x="665" y="305" fill="#64748b" fontFamily="monospace" fontSize="10">
                  OMR (IT CORRIDOR)
                </text>
              </svg>

              {/* Top Right Protocol Pill */}
              <div className="absolute top-4 right-4 rounded-lg border border-sky-500/25 bg-[#0C172A]/90 px-3 py-1.5 font-mono text-[10px] text-sky-300">
                • CITP-CORE PREVIEW: DEMO MODE
              </div>

              {/* Interactive Callout Badges */}
              <button
                type="button"
                onClick={() => handleOpenSamplePin('Severe Congestion')}
                className="absolute left-[36%] top-[34%] rounded-xl border border-amber-500/50 bg-[#1B1A14]/95 px-3.5 py-2 text-xs font-semibold text-amber-300 shadow-lg transition-transform hover:scale-105"
              >
                • Severe Jam: Guindy Industrial Est.
              </button>

              <button
                type="button"
                onClick={() => handleOpenSamplePin('Potholes')}
                className="absolute left-[22%] top-[53%] rounded-xl border border-rose-500/50 bg-[#23141B]/95 px-3.5 py-2 text-xs font-semibold text-rose-300 shadow-lg transition-transform hover:scale-105"
              >
                ▲ Pothole &amp; Bottleneck: Kathipara
              </button>

              <button
                type="button"
                onClick={() => handleOpenSamplePin('Waterlogging')}
                className="absolute left-[48%] top-[58%] rounded-xl border border-cyan-500/50 bg-[#0E2231]/95 px-3.5 py-2 text-xs font-semibold text-cyan-300 shadow-lg transition-transform hover:scale-105"
              >
                💧 Waterlogging: Velachery Main Rd
              </button>

              {/* Bottom Left Corridor Flow Pulse Card */}
              <div className="absolute bottom-4 left-4 w-72 rounded-xl border border-[#1E3150] bg-[#0B1425]/95 p-3.5 text-xs shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-semibold text-slate-200">Corridor Flow Pulse</span>
                  <span className="font-mono text-[10px] font-bold text-sky-400">SAMPLE FEED</span>
                </div>
                <div className="mt-2.5 space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Anna Salai - DMS stretch:</span>
                    <span className="font-semibold text-emerald-400">38 km/h • Smooth</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">OMR Tidel Park Node:</span>
                    <span className="font-semibold text-amber-300">14 km/h • Dense</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Inner Ring Rd (Airport):</span>
                    <span className="font-semibold text-rose-400">06 km/h • Critical</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-[11px] font-bold uppercase tracking-widest text-sky-400">
              Engineered For Metropolises
            </div>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Unifying AI Intelligence with Real-World Commutes
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
              Designed for Greater Chennai&apos;s monsoon surges, micro-grid disruptions, and rapid
              corridor changes.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="civic-card flex flex-col justify-between p-6">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-500/25 bg-sky-500/10 text-sky-400">
                  <GitBranch className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">
                  Real-Time Mobility Intelligence
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                  Impact scoring and detour recommendations across Chennai arterials, adapting to
                  sudden bus lane priority and monsoon waterlogging alerts.
                </p>
              </div>
              <Link
                to="/dashboard"
                className="mt-6 inline-flex items-center justify-between border-t border-[#1A2942] pt-4 text-xs font-semibold text-sky-400 hover:text-sky-300"
              >
                <span>Open Corridor Route Explorer</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="civic-card flex flex-col justify-between p-6">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-400">
                  <Bot className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">
                  AI-Powered Incident Detection
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                  Structured LLM parsing across civic digital feeds, Tamil &amp; English public
                  advisories, and transit broadcast dispatches.
                </p>
              </div>
              <Link
                to="/admin/ai-monitor"
                className="mt-6 inline-flex items-center justify-between border-t border-[#1A2942] pt-4 text-xs font-semibold text-sky-400 hover:text-sky-300"
              >
                <span>Multi-Lingual Civic NLP Preview</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="civic-card flex flex-col justify-between p-6">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-500/25 bg-indigo-500/10 text-indigo-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">Citizen-Powered Reporting</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                  Geo-tagged community hazard submissions with photo evidence previews, severity
                  selection, and municipal verification workflows.
                </p>
              </div>
              <Link
                to="/citizen/report"
                className="mt-6 inline-flex items-center justify-between border-t border-[#1A2942] pt-4 text-xs font-semibold text-sky-400 hover:text-sky-300"
              >
                <span>Submit a Road Hazard Report</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Operational Pipeline Section */}
        <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-[11px] font-bold uppercase tracking-widest text-sky-400">
              Operational Pipeline
            </div>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              From Civic Ingestion to Actionable Guidance
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
              How CITYLENS transforms unstructured urban road reports into verified street-level
              corridor intelligence.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                step: '01',
                tag: 'RAW INPUT',
                title: 'Ingestion & Citizen Telemetry',
                desc: 'Citizen road hazard reports, traffic advisories, and public civic alerts enter a unified intake queue.',
                line1: '> Source: @ChennaiTrafficPolice',
                line2: '> Citizen Geo-Reports + Photos',
                accent: false,
              },
              {
                step: '02',
                tag: 'SYNTHESIS',
                title: 'AI Spatial Verification',
                desc: 'NLP models extract Tamil and English entities, deduplicate nearby reports, and assign confidence scores.',
                line1: '> NLP Confidence: 94.2% (Sample)',
                line2: '> Deduplication Radius: 200m',
                accent: true,
              },
              {
                step: '03',
                tag: 'EXECUTION',
                title: 'Admin Dispatch & Routing',
                desc: 'GCC operators verify high-impact hazards and broadcast corridor detours across commuter views.',
                line1: '> Detour: Via 200ft Radial Rd',
                line2: '> Status: Crew Dispatched',
                accent: false,
              },
            ].map((item) => (
              <div key={item.step} className="civic-card p-6">
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
                      item.accent
                        ? 'bg-cyan-400 text-slate-950 shadow-cyan-glow'
                        : 'bg-[#14223A] text-slate-300 border border-[#24395E]'
                    }`}
                  >
                    {item.step}
                  </span>
                  <span className="rounded border border-[#213556] bg-[#0B1425] px-2.5 py-1 font-mono text-[10px] text-sky-300">
                    {item.tag}
                  </span>
                </div>

                <h3 className="mt-5 text-base font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{item.desc}</p>

                <div className="mt-5 rounded-xl border border-[#17263F] bg-[#070E1B] p-3 font-mono text-[11px] text-sky-300 space-y-1">
                  <div>{item.line1}</div>
                  <div className="text-slate-400">{item.line2}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() =>
                pushToast(
                  'CITYLENS Architecture Specification',
                  'Phase 1 implements all 15 UI screens; Supabase, Maps & Gemini connect in Phases 2–6.',
                  'info'
                )
              }
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300"
            >
              <span>Read the Technical Architecture Overview</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section id="about" className="mx-auto max-w-6xl px-4 pt-6 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#1E3152] bg-gradient-to-br from-[#0F1B31] via-[#0B1426] to-[#091120] p-8 sm:p-12 shadow-2xl">
            <span className="inline-block rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-[11px] font-semibold text-sky-300">
              Metropolitan Deployment Preview
            </span>
            <h2 className="mt-4 max-w-xl text-2xl font-extrabold text-white sm:text-3xl">
              Experience Smarter Commuting Across Chennai Today.
            </h2>
            <p className="mt-2.5 max-w-xl text-sm text-slate-400">
              Explore the Citizen Route Planner &amp; Hazard Reporter, or inspect the GCC Admin
              Operations &amp; AI Incident Monitoring Portal.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/dashboard" className="civic-btn-primary px-6 py-3">
                Launch Citizen Explorer
              </Link>
              <Link to="/admin/login" className="civic-btn-secondary px-6 py-3">
                Request Command Access
              </Link>
            </div>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
};
