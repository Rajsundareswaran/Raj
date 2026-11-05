import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Compass,
  Droplets,
  Filter,
  Layers,
  Maximize2,
  Minus,
  Plus,
  Satellite,
  X,
} from 'lucide-react';
import { ChennaiLocationOption, Incident } from '../../types';

interface ChennaiCorridorMapProps {
  incidents: Incident[];
  origin: ChennaiLocationOption;
  destination: ChennaiLocationOption;
  selectedIncident: Incident | null;
  onSelectIncident: (incident: Incident) => void;
  onInspectIncident: (incident: Incident) => void;
  detourActive?: boolean;
}

export const ChennaiCorridorMap: React.FC<ChennaiCorridorMapProps> = ({
  incidents,
  origin,
  destination,
  selectedIncident,
  onSelectIncident,
  onInspectIncident,
  detourActive = false,
}) => {
  const [heatmapOn, setHeatmapOn] = useState(true);
  const [incidentsOnly, setIncidentsOnly] = useState(false);
  const [satelliteMode, setSatelliteMode] = useState(false);
  const [corridorFilterOn, setCorridorFilterOn] = useState(true);
  const [zoom, setZoom] = useState(1);

  const visibleIncidents = incidents.filter((inc) => {
    if (inc.status === 'Resolved' || inc.status === 'Rejected') return false;
    if (!corridorFilterOn) return true;
    return true;
  });

  const featuredIncident =
    selectedIncident && selectedIncident.status !== 'Resolved'
      ? selectedIncident
      : visibleIncidents[0] || null;

  const handleResetView = () => {
    setZoom(1);
    setCorridorFilterOn(true);
  };

  return (
    <div
      className={`relative h-full min-h-[540px] w-full overflow-hidden rounded-2xl border border-[#182844] select-none ${
        satelliteMode ? 'bg-[#091522]' : 'gis-grid-bg'
      }`}
    >
      {/* Top Floating Corridor Filter & Layer Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-start justify-between gap-3 pointer-events-none">
        {corridorFilterOn ? (
          <div className="pointer-events-auto flex items-center gap-3 rounded-xl border border-[#213556] bg-[#0B1424]/92 px-3.5 py-2.5 text-xs text-slate-200 shadow-xl backdrop-blur-md">
            <Filter className="h-4 w-4 text-sky-400 shrink-0" />
            <div>
              <span className="font-semibold text-sky-400">Corridor Filter Active:</span>{' '}
              <span className="text-slate-300">
                Showing incidents along{' '}
                <strong className="text-white">
                  {origin.name.split(' ')[0]} — {destination.name.split(' ')[0]}
                </strong>{' '}
                corridor.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setCorridorFilterOn(false)}
              aria-label="Clear corridor filter"
              className="ml-1 rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <div />
        )}

        <div className="pointer-events-auto inline-flex items-center rounded-xl border border-[#213556] bg-[#0B1424]/95 p-1 shadow-xl backdrop-blur-md">
          <button
            type="button"
            onClick={() => setHeatmapOn((v) => !v)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              heatmapOn
                ? 'bg-[#162949] text-sky-300 border border-sky-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Traffic Heatmap</span>
          </button>
          <button
            type="button"
            onClick={() => setIncidentsOnly((v) => !v)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              incidentsOnly
                ? 'bg-[#162949] text-sky-300 border border-sky-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Incidents Only</span>
          </button>
          <button
            type="button"
            onClick={() => setSatelliteMode((v) => !v)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              satelliteMode
                ? 'bg-[#162949] text-sky-300 border border-sky-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Satellite className="h-3.5 w-3.5" />
            <span>Satellite</span>
          </button>
        </div>
      </div>

      {/* Interactive SVG GIS Canvas */}
      <div
        className="h-full w-full transition-transform duration-300 ease-out"
        style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
      >
        <svg
          viewBox="0 0 1000 720"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full min-h-[540px]"
        >
          <defs>
            <linearGradient id="bayCoast" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#081223" />
              <stop offset="100%" stopColor="#0a1c34" />
            </linearGradient>
            <linearGradient id="routeActive" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="55%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* Satellite Terrain Overlay when enabled */}
          {satelliteMode && (
            <g opacity="0.35">
              <rect x="0" y="0" width="1000" height="720" fill="#0d1e2d" />
              <circle cx="380" cy="480" r="140" fill="#122938" />
              <circle cx="620" cy="300" r="180" fill="#102536" />
            </g>
          )}

          {/* Bay of Bengal Eastern Shoreline */}
          <path
            d="M 865,0 Q 835,190 820,360 T 805,720 L 1000,720 L 1000,0 Z"
            fill="url(#bayCoast)"
            stroke="#163052"
            strokeWidth="1.5"
          />

          {/* Adyar River & Cooum River Stylized Channels */}
          {!incidentsOnly && (
            <g fill="none" stroke="#0f2847" strokeWidth="10" strokeLinecap="round">
              <path d="M 140,415 Q 410,365 585,355 T 825,390" />
              <path d="M 240,150 Q 510,165 690,145 T 855,140" strokeWidth="7" />
            </g>
          )}

          {/* Chennai Secondary Arterial Road Network */}
          {!incidentsOnly && (
            <g fill="none" stroke="#182844" strokeWidth="2.5">
              {/* GST Road -> Anna Salai Trunk */}
              <path d="M 170,670 L 390,515 L 540,435 L 605,280 L 725,115" />
              {/* Inner Ring Road */}
              <path d="M 535,440 L 420,280 L 390,155 L 520,75" />
              {/* Velachery - Radial Rd - OMR */}
              <path d="M 390,515 L 660,440 L 780,585 L 795,700" />
              <path d="M 605,280 L 740,340 L 780,585" />
              {/* East-West Connectors */}
              <path d="M 280,350 L 610,280 L 820,275" strokeDasharray="6 6" />
            </g>
          )}

          {/* Traffic Heatmap Glow Overlay */}
          {heatmapOn && (
            <g fill="none" strokeLinecap="round" opacity="0.45">
              <path
                d="M 380,522 L 545,432"
                stroke="#ef4444"
                strokeWidth="14"
              />
              <path
                d="M 545,432 L 605,280"
                stroke="#f59e0b"
                strokeWidth="11"
              />
              <path
                d="M 220,620 L 380,522"
                stroke="#22d3ee"
                strokeWidth="10"
              />
            </g>
          )}

          {/* Active Selected Route Polyline (Origin -> Destination) */}
          <line
            x1={origin.coordinates.mapX * 10}
            y1={origin.coordinates.mapY * 7.2}
            x2={destination.coordinates.mapX * 10}
            y2={destination.coordinates.mapY * 7.2}
            stroke="url(#routeActive)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Optional Radial Road Detour Polyline */}
          {detourActive && (
            <path
              d={`M ${origin.coordinates.mapX * 10},${origin.coordinates.mapY * 7.2} Q 650,490 ${
                destination.coordinates.mapX * 10
              },${destination.coordinates.mapY * 7.2}`}
              fill="none"
              stroke="#34d399"
              strokeWidth="3.5"
              strokeDasharray="10 7"
            />
          )}

          {/* Corridor Place Labels */}
          {!incidentsOnly && (
            <g fill="#64748b" fontFamily="monospace" fontSize="11" letterSpacing="0.08em">
              <text x="260" y="595">GST ROAD CORRIDOR</text>
              <text x="620" y="215">ANNA SALAI</text>
              <text x="315" y="250">INNER RING RD</text>
              <text x="690" y="545">OMR IT EXPRESSWAY</text>
              <text x="862" y="340" fill="#334155">BAY OF BENGAL</text>
            </g>
          )}

          {/* Airport Reference Pill */}
          <g transform="translate(835, 255)">
            <rect
              x="0"
              y="0"
              width="155"
              height="40"
              rx="8"
              fill="#0c1729"
              stroke="#1e3354"
            />
            <circle cx="14" cy="20" r="4.5" fill="#38bdf8" />
            <text x="26" y="17" fill="#cbd5e1" fontSize="10" fontWeight="600">
              Meenambakkam
            </text>
            <text x="26" y="30" fill="#94a3b8" fontSize="9">
              / MAA Airport Node
            </text>
          </g>

          {/* Origin Marker (A) */}
          <g
            transform={`translate(${origin.coordinates.mapX * 10}, ${
              origin.coordinates.mapY * 7.2
            })`}
          >
            <circle r="15" fill="#10b981" opacity="0.22" />
            <circle r="9" fill="#10b981" stroke="#ecfdf5" strokeWidth="2.5" />
            <rect
              x="-92"
              y="-40"
              width="184"
              height="24"
              rx="6"
              fill="#0a1526"
              stroke="#10b981"
              strokeWidth="1"
            />
            <text x="0" y="-24" textAnchor="middle" fill="#d1fae5" fontSize="11" fontWeight="600">
              A: {origin.name}
            </text>
          </g>

          {/* Destination Marker (B) */}
          <g
            transform={`translate(${destination.coordinates.mapX * 10}, ${
              destination.coordinates.mapY * 7.2
            })`}
          >
            <circle r="14" fill="#38bdf8" opacity="0.22" />
            <circle r="8" fill="#2563eb" stroke="#e0f2fe" strokeWidth="2.5" />
            <rect
              x="-96"
              y="-38"
              width="192"
              height="24"
              rx="6"
              fill="#0a1526"
              stroke="#38bdf8"
              strokeWidth="1"
            />
            <text x="0" y="-22" textAnchor="middle" fill="#e0f2fe" fontSize="11" fontWeight="600">
              B: {destination.name}
            </text>
          </g>

          {/* Incident Markers */}
          {visibleIncidents.map((inc) => {
            const cx = inc.coordinates.mapX * 10;
            const cy = inc.coordinates.mapY * 7.2;
            const isSelected = featuredIncident?.id === inc.id;
            const fill =
              inc.severity === 'High'
                ? '#ef4444'
                : inc.severity === 'Medium'
                  ? '#f59e0b'
                  : '#38bdf8';

            return (
              <g
                key={inc.id}
                transform={`translate(${cx}, ${cy})`}
                onClick={() => onSelectIncident(inc)}
                className="cursor-pointer"
              >
                <circle r={isSelected ? 24 : 17} fill={fill} opacity={isSelected ? 0.28 : 0.16} />
                <circle
                  r={isSelected ? 13 : 10}
                  fill={fill}
                  stroke="#ffffff"
                  strokeWidth={isSelected ? 2.5 : 1.8}
                />
                {!isSelected && (
                  <g transform="translate(-75, -34)">
                    <rect
                      width="150"
                      height="21"
                      rx="5"
                      fill="#0d1729"
                      stroke={fill}
                      strokeOpacity="0.55"
                    />
                    <text
                      x="75"
                      y="14"
                      textAnchor="middle"
                      fill="#fde68a"
                      fontSize="10"
                      fontWeight="600"
                    >
                      {inc.category} ({inc.location.split(' ')[0]})
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Featured Incident Callout Card (Matching Screen 05 Hazard Card) */}
      {featuredIncident && (
        <div className="absolute right-4 sm:right-8 top-1/2 z-20 w-[calc(100%-2rem)] max-w-sm -translate-y-1/2 rounded-2xl border border-red-500/40 bg-[#121829]/95 p-4 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-rose-400">
              <Droplets className="h-3.5 w-3.5" />
              {featuredIncident.severity === 'High' ? 'Severe Hazard' : 'Active Corridor Alert'}
            </span>
            <span className="rounded-md bg-rose-500/20 px-2 py-0.5 text-[11px] font-semibold text-rose-300">
              {featuredIncident.transitDelay}
            </span>
          </div>

          <h3 className="mt-2 text-sm sm:text-base font-bold text-white leading-snug">
            {featuredIncident.location} {featuredIncident.category}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-sky-300 font-medium">
              {featuredIncident.waterDepthOrMetric}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-amber-300 font-medium">{featuredIncident.laneImpact}</span>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-2.5 text-xs">
            <span className="text-slate-400">
              Reported {featuredIncident.reportedRelative} • {featuredIncident.status}
            </span>
            <button
              type="button"
              onClick={() => onInspectIncident(featuredIncident)}
              className="inline-flex items-center gap-1 font-semibold text-sky-400 hover:text-sky-300"
            >
              <span>Inspect details</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Right Corridor Speed Widget & Zoom Controls */}
      <div className="absolute bottom-12 right-4 z-20 flex flex-col items-end gap-2.5">
        <div className="hidden sm:block w-60 rounded-xl border border-[#1E3150] bg-[#0B1424]/95 p-3 text-xs shadow-lg backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Corridor Avg Speed</span>
            <span className="font-bold text-sky-400">29 km/h avg</span>
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-slate-400">Congestion Delay</span>
            <span className="font-semibold text-amber-300">
              {detourActive ? '+1 min (Detour)' : '+4 mins'}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleResetView}
          className="inline-flex items-center gap-1.5 rounded-xl border border-[#223659] bg-[#0B1424]/95 px-3 py-2 text-xs font-medium text-slate-200 hover:border-sky-400/50 hover:text-white"
        >
          <Maximize2 className="h-3.5 w-3.5 text-sky-400" />
          <span>Reset Corridor View</span>
        </button>

        <div className="flex flex-col overflow-hidden rounded-xl border border-[#223659] bg-[#0B1424]/95">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(1.35, +(z + 0.12).toFixed(2)))}
            aria-label="Zoom in"
            className="p-2 text-slate-300 hover:bg-[#152542] hover:text-white"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.88, +(z - 0.12).toFixed(2)))}
            aria-label="Zoom out"
            className="border-t border-[#1C2D4B] p-2 text-slate-300 hover:bg-[#152542] hover:text-white"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleResetView}
            aria-label="Re-center compass"
            className="border-t border-[#1C2D4B] p-2 text-sky-400 hover:bg-[#152542]"
          >
            <Compass className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Honest Demo GIS Footer Watermark */}
      <div className="absolute bottom-3 left-4 z-10 rounded-md bg-[#060B14]/80 px-2.5 py-1 font-mono text-[10px] tracking-wider text-slate-500">
        PHASE 1 INTERACTIVE CORRIDOR CANVAS • SAMPLE CHENNAI TELEMETRY (GOOGLE MAPS IN PHASE 3)
      </div>
    </div>
  );
};
