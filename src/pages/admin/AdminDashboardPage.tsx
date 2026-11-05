import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  Download,
  RotateCcw,
  TrendingUp,
} from 'lucide-react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import {
  CategoryIcon,
  SeverityBadge,
  SourceBadge,
  VerificationBadge,
} from '../../components/common/StatusBadges';
import { useCityLens } from '../../context/CityLensContext';
import { downloadCsv } from '../../utils/csvExport';

export const AdminDashboardPage: React.FC = () => {
  const { incidents, pushToast } = useCityLens();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [sourceFilter, setSourceFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [page, setPage] = useState(1);

  const pageSize = 6;

  const filteredIncidents = useMemo(() => {
    return incidents.filter((inc) => {
      if (typeFilter !== 'ALL' && inc.category !== typeFilter) return false;
      if (severityFilter !== 'ALL' && inc.severity !== severityFilter) return false;
      if (sourceFilter !== 'ALL' && inc.source !== sourceFilter) return false;
      if (statusFilter !== 'ALL' && inc.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          inc.id.toLowerCase().includes(q) ||
          inc.title.toLowerCase().includes(q) ||
          inc.location.toLowerCase().includes(q) ||
          inc.zone.toLowerCase().includes(q) ||
          inc.category.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [incidents, searchQuery, severityFilter, sourceFilter, statusFilter, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredIncidents.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginatedRows = filteredIncidents.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  const pendingCount = incidents.filter((i) => i.status === 'Pending').length;
  const highSeverityCount = incidents.filter(
    (i) => i.severity === 'High' && i.status !== 'Resolved'
  ).length;
  const resolvedCount = incidents.filter((i) => i.status === 'Resolved').length;

  const handleResetFilters = () => {
    setSearchQuery('');
    setTypeFilter('ALL');
    setSeverityFilter('ALL');
    setSourceFilter('ALL');
    setStatusFilter('ALL');
    setPage(1);
  };

  const handleExportCsv = () => {
    downloadCsv(
      'citylens-operations-reports-demo.csv',
      [
        'Report ID',
        'Incident Type',
        'Title',
        'Location',
        'GCC Zone',
        'Source',
        'Severity',
        'Reported Time',
        'Verification Status',
        'AI Confidence (%)',
      ],
      filteredIncidents.map((inc) => [
        inc.id,
        inc.category,
        inc.title,
        inc.location,
        inc.zone,
        inc.source,
        inc.severity,
        inc.reportedAt,
        inc.status,
        inc.aiConfidence,
      ])
    );
    pushToast(
      'CSV Export Downloaded',
      `Exported ${filteredIncidents.length} demonstration incident rows.`,
      'success'
    );
  };

  return (
    <AdminLayout
      searchQuery={searchQuery}
      onSearchChange={(q) => {
        setSearchQuery(q);
        setPage(1);
      }}
    >
      {/* Page Title & Export Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
            Mobility Operations Dashboard
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Metropolitan incident triage, verification workflow, and dispatch coordination (Phase 1
            Demo Data).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-2 rounded-xl border border-[#1E3150] bg-[#0B1425] px-3.5 py-2 text-xs text-slate-200">
            <Calendar className="h-3.5 w-3.5 text-sky-400" />
            <span>Demo Dataset • Chennai GCC</span>
          </div>

          <button
            type="button"
            onClick={handleExportCsv}
            className="civic-btn-secondary py-2 px-3.5 text-xs"
          >
            <Download className="h-3.5 w-3.5 text-sky-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Summary Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="civic-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Reports (Sample)</span>
            <span className="rounded-lg bg-sky-500/10 p-2 text-sky-400">
              <TrendingUp className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="text-3xl font-extrabold text-white">{incidents.length}</span>
            <span className="text-xs font-semibold text-sky-400">in local store</span>
          </div>
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-3/4 rounded-full bg-sky-500" />
          </div>
        </div>

        <div className="civic-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Pending Verification</span>
            <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-sky-300">
              • Triage Queue
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="text-3xl font-extrabold text-white">{pendingCount}</span>
            <span className="text-xs text-slate-400">Needs GCC clearance</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Avg waiting: 14 mins</span>
            <button
              type="button"
              onClick={() => {
                setStatusFilter('Pending');
                setPage(1);
              }}
              className="font-semibold text-sky-400 hover:underline"
            >
              Filter Pending
            </button>
          </div>
        </div>

        <div className="civic-card border-l-2 border-l-rose-500 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">High Severity</span>
            <span className="rounded-full border border-rose-500/35 bg-rose-500/15 px-2.5 py-0.5 text-[10px] font-bold text-rose-300">
              ▲ Critical
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="text-3xl font-extrabold text-rose-400">{highSeverityCount}</span>
            <span className="text-xs text-slate-400">active high-impact alerts</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-400">
            • Priority traffic &amp; drainage corridors
          </div>
        </div>

        <div className="civic-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Resolved Reports</span>
            <span className="rounded-full border border-emerald-500/35 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
              ✓ Archive Ready
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="text-3xl font-extrabold text-white">{resolvedCount}</span>
            <span className="text-xs text-slate-400">Avg res: 42 mins</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">SLA adherence: 94.6%</span>
            <Link to="/admin/resolved" className="font-semibold text-emerald-400 hover:underline">
              View Archive
            </Link>
          </div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="mt-6 rounded-2xl border border-[#192944] bg-[#0B1324] p-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase text-slate-400">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(1);
              }}
              aria-label="Filter by incident type"
              className="rounded-xl border border-[#213556] bg-[#08101E] px-3 py-2 text-xs text-slate-200 focus:border-sky-400 focus:outline-none"
            >
              <option value="ALL">All Incident Types</option>
              <option value="Waterlogging">Waterlogging</option>
              <option value="Potholes">Potholes</option>
              <option value="Severe Congestion">Severe Congestion</option>
              <option value="Signal Malfunction">Signal Malfunction</option>
              <option value="Construction">Construction</option>
              <option value="Roadblocks">Roadblocks</option>
              <option value="Fallen Tree / Debris">Fallen Tree / Debris</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase text-slate-400">Severity:</span>
            <select
              value={severityFilter}
              onChange={(e) => {
                setSeverityFilter(e.target.value);
                setPage(1);
              }}
              aria-label="Filter by severity"
              className="rounded-xl border border-[#213556] bg-[#08101E] px-3 py-2 text-xs text-slate-200 focus:border-sky-400 focus:outline-none"
            >
              <option value="ALL">All Severities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase text-slate-400">Source:</span>
            <select
              value={sourceFilter}
              onChange={(e) => {
                setSourceFilter(e.target.value);
                setPage(1);
              }}
              aria-label="Filter by report source"
              className="rounded-xl border border-[#213556] bg-[#08101E] px-3 py-2 text-xs text-slate-200 focus:border-sky-400 focus:outline-none"
            >
              <option value="ALL">All Sources</option>
              <option value="Citizen (Dual AI)">Citizen (Dual AI)</option>
              <option value="Citizen Report">Citizen Report</option>
              <option value="AI NLP Stream">AI NLP Stream</option>
              <option value="Official GCC">Official GCC</option>
              <option value="Citizen Telemetry">Citizen Telemetry</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase text-slate-400">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              aria-label="Filter by verification status"
              className="rounded-xl border border-[#213556] bg-[#08101E] px-3 py-2 text-xs text-slate-200 focus:border-sky-400 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Verified">Verified</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-400 hover:bg-[#132038] hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Incident Management Table */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-[#192944] bg-[#0B1324]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-xs">
            <thead className="border-b border-[#182741] bg-[#09101E] font-mono text-[10px] uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3.5">Report ID</th>
                <th className="px-4 py-3.5">Incident Type</th>
                <th className="px-4 py-3.5">Location</th>
                <th className="px-4 py-3.5">Source</th>
                <th className="px-4 py-3.5">Severity</th>
                <th className="px-4 py-3.5">Reported Time</th>
                <th className="px-4 py-3.5">Verification Status</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#15233B]">
              {paginatedRows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-sm text-slate-400">
                    No incident reports match your active filters. Click &ldquo;Reset Filters&rdquo;
                    to view all reports.
                  </td>
                </tr>
              ) : (
                paginatedRows.map((inc) => {
                  const cleanId = inc.id.replace('#', '');
                  return (
                    <tr
                      key={inc.id}
                      className="transition-colors hover:bg-[#0F1B31]"
                    >
                      <td className="px-5 py-4 font-mono font-bold text-sky-400">{inc.id}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 font-semibold text-slate-100">
                          <CategoryIcon
                            category={inc.category}
                            className="h-4 w-4 text-sky-400 shrink-0"
                          />
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
                      <td className="px-4 py-4">
                        <SeverityBadge severity={inc.severity} />
                      </td>
                      <td className="px-4 py-4 text-slate-300">{inc.reportedRelative}</td>
                      <td className="px-4 py-4">
                        <VerificationBadge status={inc.status} />
                      </td>
                      <td className="px-5 py-4 text-right">
                        {inc.status === 'Pending' ? (
                          <Link
                            to={`/admin/reports/${cleanId}`}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8]"
                          >
                            <span>Inspect &amp; Verify</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        ) : (
                          <Link
                            to={`/admin/reports/${cleanId}`}
                            className="inline-flex items-center justify-center rounded-xl border border-[#243757] bg-[#121E34] px-3.5 py-2 text-xs font-medium text-slate-200 hover:border-slate-500 hover:text-white"
                          >
                            View Details
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-[#182741] bg-[#09101E] px-5 py-3.5 text-xs text-slate-400 sm:flex-row">
          <span>
            Showing{' '}
            <strong className="text-slate-200">
              {filteredIncidents.length === 0 ? 0 : (safePage - 1) * pageSize + 1}–
              {Math.min(safePage * pageSize, filteredIncidents.length)}
            </strong>{' '}
            of <strong className="text-slate-200">{filteredIncidents.length}</strong> reports
          </span>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setPage(num)}
                className={`h-8 w-8 rounded-lg text-xs font-semibold transition-colors ${
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
              Next ›
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
