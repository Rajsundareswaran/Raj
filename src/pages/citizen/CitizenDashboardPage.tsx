import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpDown,
  Bike,
  Bus,
  Car,
  GitBranch,
  PlusCircle,
  Search,
  TrainFront,
} from 'lucide-react';
import { CitizenHeader } from '../../components/layouts/CitizenHeader';
import { AppFooter } from '../../components/common/AppFooter';
import { ChennaiCorridorMap } from '../../components/map/ChennaiCorridorMap';
import {
  CategoryIcon,
  SeverityBadge,
  SourceBadge,
  VerificationBadge,
} from '../../components/common/StatusBadges';
import { CHENNAI_LOCATIONS } from '../../data/mockData';
import { useCityLens } from '../../context/CityLensContext';
import { Incident, TransitMode } from '../../types';

export const CitizenDashboardPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTab =
    searchParams.get('tab') === 'community'
      ? 'community'
      : searchParams.get('tab') === 'alerts'
        ? 'alerts'
        : 'route';

  const {
    incidents,
    citizenUser,
    openIncidentModal,
    pushToast,
  } = useCityLens();

  const [subTab, setSubTab] = useState<'route' | 'alerts' | 'community'>(initialTab);
  const [originId, setOriginId] = useState<string>('tambaram');
  const [destinationId, setDestinationId] = useState<string>('guindy');
  const [mode, setMode] = useState<TransitMode>('two-wheeler');
  const [detourActive, setDetourActive] = useState(false);
  const [selectedMapIncident, setSelectedMapIncident] = useState<Incident | null>(
    incidents[0] || null
  );
  const [feedFilter, setFeedFilter] = useState('');

  const origin = useMemo(
    () => CHENNAI_LOCATIONS.find((l) => l.id === originId) || CHENNAI_LOCATIONS[0],
    [originId]
  );
  const destination = useMemo(
    () => CHENNAI_LOCATIONS.find((l) => l.id === destinationId) || CHENNAI_LOCATIONS[3],
    [destinationId]
  );

  // Calculate demonstration route metrics based on coordinates & selected transit mode
  const routeMetrics = useMemo(() => {
    const dx = origin.coordinates.lat - destination.coordinates.lat;
    const dy = origin.coordinates.lng - destination.coordinates.lng;
    const rawDistKm = Math.max(3.4, Math.sqrt(dx * dx + dy * dy) * 145);
    const distanceKm = detourActive ? +(rawDistKm + 1.9).toFixed(1) : +rawDistKm.toFixed(1);

    const speedByMode: Record<TransitMode, number> = {
      car: 25,
      'two-wheeler': 28,
      bus: 20,
      metro: 38,
    };
    const baseMins = Math.round((distanceKm / speedByMode[mode]) * 60);
    const lagMins = mode === 'metro' ? 0 : detourActive ? 1 : 4;

    return {
      distanceKm,
      durationMins: baseMins + lagMins,
      lagMins,
      congestionPct: mode === 'metro' ? 22 : detourActive ? 36 : 58,
      congestionLabel: mode === 'metro' ? 'Low' : detourActive ? 'Bypass Clear' : 'Medium',
    };
  }, [destination.coordinates, detourActive, mode, origin.coordinates]);

  const handleSwapLocations = () => {
    setOriginId(destinationId);
    setDestinationId(originId);
    setDetourActive(false);
  };

  const handleSearchRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (originId === destinationId) {
      pushToast(
        'Select Distinct Endpoints',
        'Origin and destination junctions cannot be identical.',
        'warning'
      );
      return;
    }
    pushToast(
      'Demonstration Route Updated',
      `${origin.name} → ${destination.name} (${routeMetrics.distanceKm} km, ~${routeMetrics.durationMins} mins). Live Google Maps routing connects in Phase 3.`,
      'info'
    );
  };

  const activeIncidents = incidents.filter((i) => i.status !== 'Rejected');
  const filteredFeed = activeIncidents.filter(
    (i) =>
      i.title.toLowerCase().includes(feedFilter.toLowerCase()) ||
      i.location.toLowerCase().includes(feedFilter.toLowerCase()) ||
      i.category.toLowerCase().includes(feedFilter.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#060B14] text-slate-100">
      <CitizenHeader activeSubTab={subTab} onSelectSubTab={setSubTab} />

      <main className="mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-1 gap-4 p-4 lg:grid-cols-12">
        {/* Left Route Planner Sidebar */}
        <section className="flex flex-col justify-between rounded-2xl border border-[#17263F] bg-[#0A1222] p-5 lg:col-span-4 xl:col-span-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-sky-400">
                Corridor Transit Intel
              </span>
              <span className="rounded-md border border-[#1E3150] bg-[#0F1B30] px-2 py-0.5 font-mono text-[10px] text-slate-400">
                {origin.corridorId}
              </span>
            </div>

            <h1 className="mt-2 text-xl font-bold text-white">
              Good Morning, {citizenUser.name.split(' ')[0]}!
            </h1>
            <p className="mt-0.5 text-xs text-slate-400">
              Plan your journey with demonstration Chennai corridor telemetry.
            </p>

            {/* Route Planner Form Card */}
            <form
              onSubmit={handleSearchRoute}
              className="mt-4 rounded-2xl border border-[#192944] bg-[#0D172B] p-4 space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-[11px]">
                  <label htmlFor="route-origin" className="font-medium text-slate-300">
                    Journey Origin
                  </label>
                  <span className="font-mono text-[10px] text-sky-400">{origin.zone}</span>
                </div>
                <div className="relative mt-1.5">
                  <span className="pointer-events-none absolute left-3 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20" />
                  <select
                    id="route-origin"
                    value={originId}
                    onChange={(e) => setOriginId(e.target.value)}
                    className="civic-input pl-8 text-xs font-medium"
                  >
                    {CHENNAI_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end -my-1">
                <button
                  type="button"
                  onClick={handleSwapLocations}
                  aria-label="Swap origin and destination"
                  className="rounded-full border border-[#24395E] bg-[#13223C] p-1.5 text-sky-400 transition-transform hover:rotate-180 hover:border-sky-400"
                >
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px]">
                  <label htmlFor="route-dest" className="font-medium text-slate-300">
                    Destination Junction
                  </label>
                  <span className="font-mono text-[10px] text-sky-400">{destination.zone}</span>
                </div>
                <div className="relative mt-1.5">
                  <span className="pointer-events-none absolute left-3 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-rose-500 ring-4 ring-rose-500/20" />
                  <select
                    id="route-dest"
                    value={destinationId}
                    onChange={(e) => setDestinationId(e.target.value)}
                    className="civic-input pl-8 text-xs font-medium"
                  >
                    {CHENNAI_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Transit Modality Selector */}
              <div className="pt-1">
                <div className="text-[11px] font-medium text-slate-300 mb-2">
                  Transit Modality
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {(
                    [
                      { id: 'car', label: 'Car', icon: Car },
                      { id: 'two-wheeler', label: '2-Wheeler', icon: Bike },
                      { id: 'bus', label: 'MTC Bus', icon: Bus },
                      { id: 'metro', label: 'Metro', icon: TrainFront },
                    ] as const
                  ).map((item) => {
                    const Icon = item.icon;
                    const active = mode === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setMode(item.id)}
                        className={`flex flex-col items-center justify-center gap-1 rounded-xl border py-2.5 text-[11px] font-medium transition-all ${
                          active
                            ? 'border-sky-400 bg-sky-500/15 text-sky-300 shadow-cyan-glow'
                            : 'border-[#1C2D4A] bg-[#091120] text-slate-400 hover:border-slate-600 hover:text-slate-200'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button type="submit" className="civic-btn-primary w-full py-2.5 text-xs">
                <GitBranch className="h-4 w-4" />
                <span>Search Route</span>
              </button>
            </form>

            {/* Active Corridor Summary Card */}
            <div className="mt-4 rounded-2xl border border-[#192944] bg-[#0D172B] p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Active Path: GST Road Corridor
                </div>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${
                    detourActive
                      ? 'border-emerald-500/35 bg-emerald-500/15 text-emerald-300'
                      : 'border-amber-500/35 bg-amber-500/15 text-amber-300'
                  }`}
                >
                  • {detourActive ? 'Radial Bypass Active' : 'Moderate Disruption'}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 border-t border-[#182741] pt-3">
                <div>
                  <div className="text-[11px] text-slate-400">Optimal Distance</div>
                  <div className="mt-0.5 text-xl font-extrabold text-white">
                    {routeMetrics.distanceKm}{' '}
                    <span className="text-xs font-normal text-slate-400">km</span>
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Est. Duration (Demo)</div>
                  <div className="mt-0.5 text-xl font-extrabold text-sky-400">
                    {routeMetrics.durationMins}{' '}
                    <span className="text-xs font-normal text-sky-300">mins</span>{' '}
                    {routeMetrics.lagMins > 0 && (
                      <span className="text-[11px] font-medium text-amber-300">
                        (+{routeMetrics.lagMins}m lag)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">((•)) Corridor Congestion Index</span>
                  <span className="font-semibold text-amber-300">
                    {routeMetrics.congestionPct}% ({routeMetrics.congestionLabel})
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full transition-all ${
                      detourActive ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                    style={{ width: `${routeMetrics.congestionPct}%` }}
                  />
                </div>
              </div>

              {detourActive && (
                <button
                  type="button"
                  onClick={() => setDetourActive(false)}
                  className="mt-3 text-[11px] font-medium text-sky-400 hover:underline"
                >
                  Revert to direct GST Road route
                </button>
              )}
            </div>
          </div>

          {/* Bottom Prominent Report CTA */}
          <Link
            to="/citizen/report"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-civic-glow transition-all hover:from-cyan-400 hover:to-blue-500"
          >
            <PlusCircle className="h-4 w-4" />
            <span>+ Report an Issue</span>
          </Link>
        </section>

        {/* Right Interactive Map or Alerts/Community Panel */}
        <section className="lg:col-span-8 xl:col-span-9">
          {subTab === 'route' ? (
            <ChennaiCorridorMap
              incidents={incidents}
              origin={origin}
              destination={destination}
              selectedIncident={selectedMapIncident}
              onSelectIncident={setSelectedMapIncident}
              onInspectIncident={(inc) => openIncidentModal(inc)}
              detourActive={detourActive}
            />
          ) : (
            <div className="civic-card h-full p-5 sm:p-6">
              <div className="flex flex-col gap-3 border-b border-[#1A2A46] pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {subTab === 'alerts'
                      ? 'Live Chennai Corridor Alerts (Demo)'
                      : 'Citizen Community Ground-Truth Feed'}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Click any incident card to open the Screen 06 Expanded Telemetry Modal.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={feedFilter}
                      onChange={(e) => setFeedFilter(e.target.value)}
                      placeholder="Filter road or type..."
                      className="civic-input py-1.5 pl-8 text-xs w-52"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubTab('route')}
                    className="civic-btn-secondary py-1.5 px-3 text-xs"
                  >
                    Map View
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                {filteredFeed.map((inc) => (
                  <div
                    key={inc.id}
                    onClick={() => openIncidentModal(inc)}
                    className="cursor-pointer rounded-xl border border-[#1C2D4A] bg-[#0A1324] p-4 transition-colors hover:border-sky-500/45"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-sky-400">{inc.id}</span>
                      <div className="flex items-center gap-1.5">
                        <SeverityBadge severity={inc.severity} />
                        <VerificationBadge status={inc.status} />
                      </div>
                    </div>

                    <div className="mt-2.5 flex items-start gap-2.5">
                      <div className="mt-0.5 rounded-lg bg-sky-500/10 p-2 text-sky-400">
                        <CategoryIcon category={inc.category} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-white">{inc.title}</h3>
                        <p className="mt-1 line-clamp-2 text-xs text-slate-400">
                          {inc.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-2.5 text-[11px] text-slate-400">
                      <SourceBadge source={inc.source} />
                      <span className="inline-flex items-center gap-1 font-semibold text-sky-400">
                        Inspect details <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <AppFooter compact />
    </div>
  );
};
