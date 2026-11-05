import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock,
  Globe,
  Languages,
  MapPin,
  MessageSquare,
  Newspaper,
  RefreshCw,
  Rss,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Target,
} from 'lucide-react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { SeverityBadge } from '../../components/common/StatusBadges';
import { useCityLens } from '../../context/CityLensContext';
import { FeedSourceType } from '../../types';

const FEED_TABS: FeedSourceType[] = [
  'All Feeds',
  'Chennai Traffic Police X',
  'Civic Complaints',
  'Telegram Channels',
  'News RSS',
];

export const AIMonitoringPage: React.FC = () => {
  const {
    aiStreamItems,
    convertAIStreamToIncident,
    syncAIPipelineDemo,
    pushToast,
  } = useCityLens();

  const [selectedSource, setSelectedSource] = useState<FeedSourceType>('All Feeds');
  const [minConfidence, setMinConfidence] = useState<number>(85);
  const [entitySearch, setEntitySearch] = useState('');

  const filteredStream = useMemo(() => {
    return aiStreamItems.filter((item) => {
      if (selectedSource !== 'All Feeds' && item.sourceType !== selectedSource) {
        return false;
      }
      if (item.confidence < minConfidence) {
        return false;
      }
      if (entitySearch.trim()) {
        const q = entitySearch.toLowerCase();
        const matches =
          item.handle.toLowerCase().includes(q) ||
          item.rawText.toLowerCase().includes(q) ||
          (item.translatedText || '').toLowerCase().includes(q) ||
          item.extractedLocation.toLowerCase().includes(q) ||
          item.extractedCategoryLabel.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [aiStreamItems, entitySearch, minConfidence, selectedSource]);

  return (
    <AdminLayout
      searchQuery={entitySearch}
      onSearchChange={setEntitySearch}
      searchPlaceholder="Search detected entities, Chennai roads, or feeds..."
    >
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
              AI Incident Monitoring
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/35 bg-cyan-500/15 px-3 py-1 font-mono text-[10px] font-bold uppercase text-cyan-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              Phase 1 Demo Stream
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Demonstration NLP &amp; LLM extraction interface for public Chennai road alerts (Gemini
            API connects in Phase 5).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={syncAIPipelineDemo}
            className="civic-btn-secondary py-2 px-4 text-xs"
          >
            <RefreshCw className="h-3.5 w-3.5 text-sky-400" />
            <span>Sync Demo Pipeline</span>
          </button>

          <button
            type="button"
            onClick={() =>
              pushToast(
                'Gemini Schema Configuration (Phase 5)',
                'Structured JSON extraction for Tamil + English road alerts will be powered by Gemini in Phase 5.',
                'info'
              )
            }
            className="civic-btn-primary py-2 px-4 text-xs"
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Model Schema Info</span>
          </button>
        </div>
      </div>

      {/* 5-Step AI Processing Pipeline Architecture Banner */}
      <div className="mt-6 civic-card p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Bot className="h-4 w-4 text-sky-400" />
            <span>AI Processing Pipeline Architecture</span>
          </div>
          <span className="rounded-full border border-sky-500/25 bg-sky-500/10 px-3 py-1 font-mono text-[11px] text-sky-300">
            • Tamil + English Entity Extraction Preview • Target: Gemini Structured JSON
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            {
              step: 'STEP 01',
              title: 'Public Content Feeds',
              sub: 'Advisories & Civic Text',
              icon: Rss,
            },
            {
              step: 'STEP 02',
              title: 'Tamil & English NLP',
              sub: 'Bilingual Parsing',
              icon: Languages,
            },
            {
              step: 'STEP 03',
              title: 'Event Identification',
              sub: 'Hazard Detection',
              icon: Target,
            },
            {
              step: 'STEP 04',
              title: 'Location NER',
              sub: 'Chennai Landmark Match',
              icon: MapPin,
            },
            {
              step: 'STEP 05',
              title: 'Incident Classification',
              sub: 'Severity & Confidence',
              icon: ShieldCheck,
            },
          ].map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                className="relative rounded-xl border border-[#1B2C48] bg-[#08101E] p-3.5"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-4 w-4 text-sky-400" />
                  <span className="font-mono text-[10px] text-slate-500">{stage.step}</span>
                </div>
                <div className="mt-2.5 text-xs font-bold text-white">{stage.title}</div>
                <div className="mt-0.5 text-[11px] text-slate-400">{stage.sub}</div>
                {idx < 4 && (
                  <ArrowRight className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-600 z-10" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Feed Source & Confidence Filter Bar */}
      <div className="mt-5 rounded-2xl border border-[#192944] bg-[#0B1324] p-4 space-y-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mr-1">
              Feed Source:
            </span>
            {FEED_TABS.map((tab) => {
              const active = selectedSource === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSelectedSource(tab)}
                  className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? 'border-sky-500/40 bg-[#142748] text-sky-300 font-semibold'
                      : 'border-[#1E3150] bg-[#08101E] text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={entitySearch}
              onChange={(e) => setEntitySearch(e.target.value)}
              placeholder="Search detected entities, roads..."
              className="civic-input py-2 pl-9 text-xs"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-[#16253E] pt-3 text-xs">
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
            Min Confidence:
          </span>
          <select
            value={minConfidence}
            onChange={(e) => setMinConfidence(Number(e.target.value))}
            aria-label="Minimum confidence threshold"
            className="rounded-xl border border-[#213556] bg-[#08101E] px-3 py-1.5 text-xs text-sky-300 focus:border-sky-400 focus:outline-none"
          >
            <option value={0}>All Confidence Levels</option>
            <option value={80}>&gt;80% Confidence</option>
            <option value={85}>&gt;85% Confidence</option>
            <option value={90}>&gt;90% Confidence</option>
            <option value={95}>&gt;95% Confidence</option>
          </select>
        </div>
      </div>

      {/* Live Ingested Stream Header */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base font-bold text-white">Sample Ingested Incidents Stream</h2>
          <span className="rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-0.5 font-mono text-[10px] font-bold text-slate-300">
            {filteredStream.length} ITEMS SHOWN
          </span>
        </div>
        <span className="text-xs text-sky-400">Local Demo Cards</span>
      </div>

      {/* Stream Cards Grid */}
      {filteredStream.length === 0 ? (
        <div className="mt-4 civic-card p-10 text-center text-sm text-slate-400">
          No sample AI stream items match your current source or confidence filter.
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {filteredStream.map((item) => {
            const SourceIcon =
              item.sourceType === 'News RSS'
                ? Newspaper
                : item.sourceType === 'Civic Complaints'
                  ? MessageSquare
                  : Globe;

            return (
              <div
                key={item.id}
                className="civic-card flex flex-col justify-between p-5"
              >
                <div>
                  {/* Card Source Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-sky-500/25 bg-sky-500/10 text-sky-400">
                        <SourceIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white leading-snug">
                          {item.handle}
                        </div>
                        <div className="text-[11px] text-sky-400">{item.subLabel}</div>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-lg border border-cyan-500/35 bg-cyan-500/15 px-2.5 py-1 font-mono text-[10px] font-bold text-cyan-300">
                      {item.confidence}% CONFIDENCE
                    </span>
                  </div>

                  {/* Raw Quote Box */}
                  <div className="mt-4 rounded-xl border border-[#192842] bg-[#08101E] p-3.5 text-xs leading-relaxed">
                    <p className="italic text-slate-200">{item.rawText}</p>
                    {item.translatedText && (
                      <p className="mt-2 border-t border-slate-800 pt-2 text-[11px] text-sky-300">
                        {item.translatedText}
                      </p>
                    )}
                  </div>

                  {/* Extracted Entities */}
                  <div className="mt-4">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      NLP Extracted Entities (Sample)
                    </div>

                    <div className="mt-2 grid grid-cols-2 gap-2.5 text-xs">
                      <div className="rounded-xl border border-[#192842] bg-[#091223] p-2.5">
                        <div className="text-[10px] text-slate-400">Location</div>
                        <div className="mt-0.5 flex items-center gap-1 font-semibold text-white">
                          <MapPin className="h-3 w-3 text-sky-400 shrink-0" />
                          <span className="truncate">{item.extractedLocation}</span>
                        </div>
                      </div>

                      <div className="rounded-xl border border-[#192842] bg-[#091223] p-2.5">
                        <div className="text-[10px] text-slate-400">Time</div>
                        <div className="mt-0.5 flex items-center gap-1 font-semibold text-white">
                          <Clock className="h-3 w-3 text-slate-400 shrink-0" />
                          <span>{item.extractedTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2.5 rounded-xl border border-[#192842] bg-[#091223] p-2.5 text-xs">
                      <div className="text-[10px] text-slate-400">Category</div>
                      <div className="mt-0.5 font-semibold text-white">
                        {item.extractedCategoryLabel}
                      </div>
                    </div>
                  </div>

                  {/* Severity & Validation Tag */}
                  <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">Severity:</span>
                      <SeverityBadge severity={item.severity} />
                    </div>
                    <span className="text-[11px] font-medium text-sky-300">
                      Impact: {item.impactLabel}
                    </span>
                  </div>

                  <div className="mt-3 rounded-xl border border-[#1A2B48] bg-[#091326] px-3 py-2 text-[11px] text-slate-300">
                    • {item.validationNote}
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-4 pt-2">
                  {item.convertedIncidentId ? (
                    <Link
                      to={`/admin/reports/${item.convertedIncidentId.replace('#', '')}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/15 py-2.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/25"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Converted ({item.convertedIncidentId}) — View</span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => convertAIStreamToIncident(item.id)}
                      className="civic-btn-primary w-full py-2.5 text-xs"
                    >
                      <ShieldCheck className="h-4 w-4" />
                      <span>Convert to Verified Incident</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Legal & Ethical Guardrails Banner */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#1B2D4B] bg-[#091223] p-4 text-xs text-slate-400">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
        <div>
          <div className="font-bold text-slate-200">Legal &amp; Ethical Guardrails</div>
          <p className="mt-0.5 leading-relaxed">
            AI Advisory Notice: Automated NLP extractions reflect unstructured public reporting and
            are categorized as probabilistic advisories until verified by municipal supervisors.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};
