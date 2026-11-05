import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Download,
  RefreshCw,
  Search,
  ShieldCheck,
  ThumbsUp,
  Timer,
  X,
} from 'lucide-react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { CategoryIcon, SourceBadge } from '../../components/common/StatusBadges';
import { GCC_ZONES } from '../../data/mockData';
import { useCityLens } from '../../context/CityLensContext';
import { downloadCsv } from '../../utils/csvExport';

export const AdminResolvedPage: React.FC = () => {
  const { incidents, pushToast } = useCityLens();

  const [query, setQuery] = useState('');
  const [timeframe, setTimeframe] = useState('30D');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [zoneFilter, setZoneFilter] = useState('ALL');
  const [page, setPage] = useState(1);

  const pageSize = 5;

  const resolvedIncidents = useMemo(() => {
    return incidents.filter((inc) => {
      if (inc.status !== 'Resolved') return false;
      if (typeFilter !== 'ALL' && inc.category !== typeFilter) return false;
      if (zoneFilter !== 'ALL') {
        const zoneNum = zoneFilter.match(/Zone\s+0?(\d+)/i)?.[1];
        if (zoneNum && !inc.zone.includes(zoneNum)) return false;
      }
      if (query.trim()) {
        const q = query.toLowerCase();
        const match =
          inc.id.toLowerCase().includes(q) ||
          inc.location.toLowerCase().includes(q) ||
          inc.zone.toLowerCase().includes(q) ||
          inc.category.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [incidents, query, typeFilter, zoneFilter]);

  const totalPages = Math.max(1, Math.ceil(resolvedIncidents.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const visibleRows = resolvedIncidents.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  const handleExportComplianceCsv = () => {
    downloadCsv(
      'citylens-resolved-compliance-archive-demo.csv',
      [
        'Report ID',
        'Incident Type',
        'Location',
        'GCC Zone',
        'Source',
        'Reported Date & Time',
        'Resolved Date & Time',
      ],
      resolvedIncidents.map((inc) => [
        inc.id,
        inc.category,
        inc.location,
        inc.zone,
        inc.source,
        inc.reportedAt,
        inc.resolvedAt || 'Resolved (Session)',
      ])
    );
    pushToast(
      'Compliance CSV Exported',
      `Downloaded ${resolvedIncidents.length} resolved maintenance records.`,
      'success'
    );
  };

  const handleClearFilters = () => {
    setQuery('');
    setTimeframe('30D');
    setTypeFilter('ALL');
    setZoneFilter('ALL');
    setPage(1);
  };

  return (
    <AdminLayout
      searchQuery={query}
      onSearchChange={(q) => {
        setQuery(q);
        setPage(1);
      }}
      searchPlaceholder="Global archive query..."
    >
      {/* Breadcrumb & Header */}
      <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-sky-400">
        Operations Hub › <span className="text-slate-300">Audit Archive</span>
      </div>

      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
            Resolved Incidents &amp; Maintenance Archive
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Historical record of cleared road hazards and simulated GCC dispatch completions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() =>
              pushToast(
                'Archive Synchronized',
                `Showing ${resolvedIncidents.length} resolved records from local demo state.`,
                'info'
              )
            }
            className="civic-btn-secondary py-2.5 px-4 text-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Refresh Sync</span>
          </button>

          <button
            type="button"
            onClick={handleExportComplianceCsv}
            className="civic-btn-primary py-2.5 px-4 text-xs"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Compliance Report</span>
          </button>
        </div>
      </div>

      {/* 3 Archive KPI Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="civic-card flex items-center justify-between p-5">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
              Archive Records (Demo)
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">
                {2835 + resolvedIncidents.length}
              </span>
              <span className="text-xs font-semibold text-emerald-400">↑ +14.2%</span>
            </div>
            <div className="mt-1 text-xs text-slate-400">
              {resolvedIncidents.length} interactive sample rows below
            </div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-500/25 bg-sky-500/10 text-sky-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>

        <div className="civic-card flex items-center justify-between p-5">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
              Dispatch Efficiency (Sample)
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-sky-400">48.4 mins</span>
              <span className="text-xs font-semibold text-emerald-400">↓ -6.1m</span>
            </div>
            <div className="mt-1 text-xs text-slate-400">
              Average Mean Time to Resolution (MTTR)
            </div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-400">
            <Timer className="h-5 w-5" />
          </div>
        </div>

        <div className="civic-card flex items-center justify-between p-5">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
              Audit Approval Index
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">94.8%</span>
              <span className="text-xs font-semibold text-emerald-400">5-star avg</span>
            </div>
            <div className="mt-1 text-xs text-slate-400">Sample Commuter Feedback Score</div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-500/25 bg-indigo-500/10 text-indigo-300">
            <ThumbsUp className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="mt-6 rounded-2xl border border-[#192944] bg-[#0B1324] p-4 space-y-3">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="relative md:col-span-5">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search by Report ID, Road, or Ward..."
              className="civic-input py-2 pl-10 text-xs"
            />
          </div>

          <div className="md:col-span-2">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              aria-label="Timeframe filter"
              className="civic-input py-2 text-xs"
            >
              <option value="30D">Last 30 Days</option>
              <option value="7D">Last 7 Days</option>
              <option value="ALL">All Time</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(1);
              }}
              aria-label="Resolved incident type filter"
              className="civic-input py-2 text-xs"
            >
              <option value="ALL">All Resolved Types</option>
              <option value="Waterlogging">Waterlogging</option>
              <option value="Potholes">Potholes</option>
              <option value="Signal Malfunction">Signal Malfunction</option>
              <option value="Fallen Tree / Debris">Fallen Tree / Debris</option>
              <option value="Construction">Construction</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={zoneFilter}
              onChange={(e) => {
                setZoneFilter(e.target.value);
                setPage(1);
              }}
              aria-label="GCC zone filter"
              className="civic-input py-2 text-xs"
            >
              <option value="ALL">All 15 GCC Zones</option>
              {GCC_ZONES.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#16253E] pt-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase text-slate-400">
              Filter Applied:
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-[#223556] bg-[#0F1B30] px-2.5 py-0.5 text-[11px] text-slate-200">
              Status: Resolved
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-[#223556] bg-[#0F1B30] px-2.5 py-0.5 text-[11px] text-slate-200">
              Timeframe: {timeframe}
              <X
                onClick={() => setTimeframe('ALL')}
                className="h-3 w-3 cursor-pointer text-slate-400 hover:text-white"
              />
            </span>
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-sky-400 hover:underline"
            >
              Clear all filters
            </button>
          </div>

          <span className="font-mono text-[11px] text-slate-500">
            Demo Archive Checksum: <strong className="text-slate-300">0x74E9...9B2</strong>
          </span>
        </div>
      </div>

      {/* Resolved Incidents Table */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-[#192944] bg-[#0B1324]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-xs">
            <thead className="border-b border-[#182741] bg-[#09101E] font-mono text-[10px] uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3.5">Report ID</th>
                <th className="px-4 py-3.5">Incident Type</th>
                <th className="px-4 py-3.5">Location</th>
                <th className="px-4 py-3.5">Source</th>
                <th className="px-4 py-3.5">Reported Date &amp; Time</th>
                <th className="px-5 py-3.5">Resolved Date &amp; Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#15233B]">
              {visibleRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-slate-400">
                    No resolved records match your current search or filter criteria.
                  </td>
                </tr>
              ) : (
                visibleRows.map((inc) => (
                  <tr key={inc.id} className="transition-colors hover:bg-[#0F1B31]">
                    <td className="px-5 py-4 font-mono font-bold text-sky-400">
                      <Link
                        to={`/admin/reports/${inc.id.replace('#', '')}`}
                        className="hover:underline"
                      >
                        {inc.id}
                      </Link>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 font-semibold text-slate-100">
                        <CategoryIcon category={inc.category} className="h-4 w-4 text-sky-400" />
                        <span>{inc.category}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-slate-100">{inc.location}</div>
                      <div className="text-[11px] text-slate-400">{inc.zone}</div>
                    </td>
                    <td className="px-4 py-4">
                      <SourceBadge source={inc.source} />
                    </td>
                    <td className="px-4 py-4 text-slate-300">{inc.reportedAt}</td>
                    <td className="px-5 py-4 font-semibold text-emerald-400">
                      {inc.resolvedAt || '24 Oct 2025, 09:30 AM'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-[#182741] bg-[#09101E] px-5 py-3.5 text-xs text-slate-400 sm:flex-row">
          <span>
            Showing{' '}
            <strong className="text-slate-200">
              {resolvedIncidents.length === 0 ? 0 : (safePage - 1) * pageSize + 1}–
              {Math.min(safePage * pageSize, resolvedIncidents.length)}
            </strong>{' '}
            of <strong className="text-slate-200">{resolvedIncidents.length}</strong> sample
            resolved records
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-[#213556] bg-[#0D172B] px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white disabled:opacity-40"
            >
              ← Previous
            </button>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setPage(num)}
                className={`h-8 w-8 rounded-lg text-xs font-semibold ${
                  safePage === num
                    ? 'bg-sky-600 text-white'
                    : 'border border-[#213556] bg-[#0D172B] text-slate-300 hover:text-white'
                }`}
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-lg border border-[#213556] bg-[#0D172B] px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Compliance Strip */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#192944] bg-[#091120] p-4 text-xs text-slate-400">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500/30 bg-sky-500/10 px-2.5 py-1 font-semibold text-sky-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            ODP-2025 Preview
          </span>
          <span>
            Structured for Greater Chennai Corporation Open Municipal Transit Transparency Standard.
          </span>
        </div>
      </div>
    </AdminLayout>
  );
};
