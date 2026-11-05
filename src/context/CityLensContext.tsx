import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { INITIAL_AI_STREAM, INITIAL_INCIDENTS } from '../data/mockData';
import {
  AIStreamItem,
  DemoSessionUser,
  Incident,
  IncidentCategory,
  IncidentSeverity,
  ReportDraft,
  ToastMessage,
  VerificationStatus,
} from '../types';
import {
  EVIDENCE_CONGESTION_CORRIDOR,
  EVIDENCE_POTHOLE_CLUSTER,
  EVIDENCE_UNDERPASS_FLOOD,
} from '../utils/evidenceGraphics';

const DRAFT_STORAGE_KEY = 'citylens_phase1_report_draft';

interface SubmitReportPayload {
  category: IncidentCategory;
  title: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  mapX: number;
  mapY: number;
  zone: string;
  date: string;
  time: string;
  severity: IncidentSeverity;
  photoDataUrl: string | null;
}

interface CityLensContextValue {
  incidents: Incident[];
  aiStreamItems: AIStreamItem[];
  citizenUser: DemoSessionUser;
  adminUser: DemoSessionUser;
  activeIncidentModal: Incident | null;
  lastSubmittedIncident: Incident | null;
  savedDraft: ReportDraft | null;
  toasts: ToastMessage[];
  setCitizenUser: React.Dispatch<React.SetStateAction<DemoSessionUser>>;
  setAdminUser: React.Dispatch<React.SetStateAction<DemoSessionUser>>;
  openIncidentModal: (incident: Incident) => void;
  closeIncidentModal: () => void;
  submitCitizenReport: (payload: SubmitReportPayload) => Incident;
  saveReportDraft: (draft: Omit<ReportDraft, 'id' | 'savedAt'>) => ReportDraft;
  clearReportDraft: () => void;
  updateIncidentStatus: (incidentId: string, status: VerificationStatus) => void;
  dispatchCrewForIncident: (incidentId: string) => void;
  confirmIncidentByCommuter: (incidentId: string) => void;
  convertAIStreamToIncident: (streamId: string) => Incident | null;
  syncAIPipelineDemo: () => void;
  pushToast: (title: string, description?: string, tone?: ToastMessage['tone']) => void;
  dismissToast: (id: string) => void;
  resetDemoState: () => void;
}

const DEFAULT_CITIZEN: DemoSessionUser = {
  name: 'Alex Pandian',
  email: 'alex.commuter@chennaimobility.org',
  role: 'citizen',
  badge: 'Verified Commuter',
  zone: 'Zone 10 (Kodambakkam/Saidapet)',
  karmaPoints: 145,
};

const DEFAULT_ADMIN: DemoSessionUser = {
  name: 'Officer R. Raghavan',
  email: 'officer.raghavan@chennaicorporation.gov.in',
  role: 'admin',
  badge: 'Zone 10 Lead',
  zone: 'Zone 10 - Kodambakkam / T. Nagar',
  karmaPoints: 0,
};

const CityLensContext = createContext<CityLensContextValue | undefined>(undefined);

function defaultEvidenceForCategory(category: IncidentCategory): string {
  if (category === 'Waterlogging') return EVIDENCE_UNDERPASS_FLOOD;
  if (category === 'Potholes' || category === 'Fallen Tree / Debris') return EVIDENCE_POTHOLE_CLUSTER;
  return EVIDENCE_CONGESTION_CORRIDOR;
}

export const CityLensProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [aiStreamItems, setAiStreamItems] = useState<AIStreamItem[]>(INITIAL_AI_STREAM);
  const [citizenUser, setCitizenUser] = useState<DemoSessionUser>(DEFAULT_CITIZEN);
  const [adminUser, setAdminUser] = useState<DemoSessionUser>(DEFAULT_ADMIN);
  const [activeIncidentModal, setActiveIncidentModal] = useState<Incident | null>(null);
  const [lastSubmittedIncident, setLastSubmittedIncident] = useState<Incident | null>(
    INITIAL_INCIDENTS[0]
  );
  const [savedDraft, setSavedDraft] = useState<ReportDraft | null>(() => {
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as ReportDraft) : null;
    } catch {
      return null;
    }
  });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    try {
      if (savedDraft) {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(savedDraft));
      } else {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      }
    } catch {
      // Ignore storage quota errors in restricted browsers
    }
  }, [savedDraft]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    (title: string, description?: string, tone: ToastMessage['tone'] = 'info') => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev.slice(-3), { id, title, description, tone }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4200);
    },
    []
  );

  const openIncidentModal = useCallback((incident: Incident) => {
    setActiveIncidentModal(incident);
  }, []);

  const closeIncidentModal = useCallback(() => {
    setActiveIncidentModal(null);
  }, []);

  const submitCitizenReport = useCallback(
    (payload: SubmitReportPayload): Incident => {
      const randomNum = Math.floor(88420 + Math.random() * 500);
      const refId = `#CHN-${randomNum}`;
      const newIncident: Incident = {
        id: refId,
        title: payload.title.trim() || `${payload.category} near ${payload.address}`,
        category: payload.category,
        description: payload.description.trim(),
        location: payload.address.split(',')[0] || payload.address,
        landmark: payload.address,
        zone: payload.zone || 'Zone 13 • Adyar',
        ward: 'Ward 171',
        coordinates: {
          lat: payload.lat,
          lng: payload.lng,
          mapX: payload.mapX,
          mapY: payload.mapY,
        },
        severity: payload.severity,
        status: 'Pending',
        source: 'Citizen Report',
        reportedAt: `${payload.date}, ${payload.time}`,
        reportedRelative: 'Just now',
        aiConfidence: 91.4,
        transitDelay:
          payload.severity === 'High'
            ? '+11 mins'
            : payload.severity === 'Medium'
              ? '+6 mins'
              : '+2 mins',
        waterDepthOrMetric:
          payload.category === 'Waterlogging' ? '18 – 24 cm' : 'Reported Hazard',
        metricLabel: payload.category === 'Waterlogging' ? 'Water Depth' : 'Field Telemetry',
        metricSubtext: 'Submitted via Citizen Portal (Demo)',
        laneImpact:
          payload.severity === 'High'
            ? '2 Lanes Obstructed'
            : payload.severity === 'Medium'
              ? 'Single Lane Slowdown'
              : 'Shoulder Caution',
        laneSubtext: 'Pending GCC Traffic Cell verification',
        reporterName: citizenUser.name,
        reporterBadge: citizenUser.badge,
        commuterConfirmations: 1,
        affectedRoutes: [
          { code: 'Route 18A', corridor: 'Anna Salai Arterial' },
          { code: 'Route 45B', corridor: 'Central – South Feeder' },
        ],
        suggestedDetour: 'Adjacent Zonal Ring Connector',
        passengerExposure: '~1,800 Commuters / Hour',
        metroAlternative: 'Nearest Metro Corridor Unaffected',
        evidenceUrl: payload.photoDataUrl || defaultEvidenceForCategory(payload.category),
        evidenceCaption: payload.photoDataUrl
          ? 'Uploaded citizen evidence preview (local browser state).'
          : 'Default demonstration road hazard illustration.',
        corridorId: 'GST-CORRIDOR-04',
      };

      setIncidents((prev) => [newIncident, ...prev]);
      setLastSubmittedIncident(newIncident);
      setCitizenUser((prev) => ({ ...prev, karmaPoints: prev.karmaPoints + 25 }));
      setSavedDraft(null);
      return newIncident;
    },
    [citizenUser.badge, citizenUser.name]
  );

  const saveReportDraft = useCallback(
    (draftInput: Omit<ReportDraft, 'id' | 'savedAt'>): ReportDraft => {
      const draft: ReportDraft = {
        ...draftInput,
        id: '#DRAFT-CHN-9941',
        savedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setSavedDraft(draft);
      return draft;
    },
    []
  );

  const clearReportDraft = useCallback(() => {
    setSavedDraft(null);
  }, []);

  const updateIncidentStatus = useCallback(
    (incidentId: string, status: VerificationStatus) => {
      const nowLabel = new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      setIncidents((prev) =>
        prev.map((inc) => {
          if (inc.id !== incidentId) return inc;
          return {
            ...inc,
            status,
            resolvedAt: status === 'Resolved' ? nowLabel : inc.resolvedAt,
            transitDelay: status === 'Resolved' ? '0 mins (Cleared)' : inc.transitDelay,
          };
        })
      );

      setActiveIncidentModal((prev) =>
        prev && prev.id === incidentId
          ? {
              ...prev,
              status,
              resolvedAt: status === 'Resolved' ? nowLabel : prev.resolvedAt,
            }
          : prev
      );

      const toneMap: Record<VerificationStatus, ToastMessage['tone']> = {
        Verified: 'success',
        Resolved: 'success',
        Rejected: 'warning',
        Pending: 'info',
      };
      pushToast(
        `${incidentId} marked as ${status}`,
        'Updated in local Phase 1 demo state across Citizen & Admin views.',
        toneMap[status]
      );
    },
    [pushToast]
  );

  const dispatchCrewForIncident = useCallback(
    (incidentId: string) => {
      setIncidents((prev) =>
        prev.map((inc) => (inc.id === incidentId ? { ...inc, crewDispatched: true } : inc))
      );
      pushToast(
        `GCC Ward Crew Dispatched for ${incidentId}`,
        'Simulated field maintenance unit assignment recorded in local state.',
        'info'
      );
    },
    [pushToast]
  );

  const confirmIncidentByCommuter = useCallback(
    (incidentId: string) => {
      setIncidents((prev) =>
        prev.map((inc) =>
          inc.id === incidentId
            ? { ...inc, commuterConfirmations: inc.commuterConfirmations + 1 }
            : inc
        )
      );
      setActiveIncidentModal((prev) =>
        prev && prev.id === incidentId
          ? { ...prev, commuterConfirmations: prev.commuterConfirmations + 1 }
          : prev
      );
      pushToast(
        'Ground Status Feedback Recorded',
        'Commuter confirmation incremented in local demo state.',
        'success'
      );
    },
    [pushToast]
  );

  const convertAIStreamToIncident = useCallback(
    (streamId: string): Incident | null => {
      const target = aiStreamItems.find((item) => item.id === streamId);
      if (!target) return null;
      if (target.convertedIncidentId) {
        const existing = incidents.find((i) => i.id === target.convertedIncidentId) || null;
        return existing;
      }

      const newId = `#CHN-${Math.floor(88500 + Math.random() * 450)}`;
      const created: Incident = {
        id: newId,
        title: `${target.extractedCategoryLabel} — ${target.extractedLocation}`,
        category: target.extractedCategory,
        description: target.translatedText
          ? `${target.rawText} ${target.translatedText}`
          : target.rawText.replace(/^“|”$/g, ''),
        location: target.extractedLocation,
        landmark: `${target.extractedLocation}, Chennai`,
        zone: target.zone,
        ward: 'Ward 128',
        coordinates: target.coordinates,
        severity: target.severity,
        status: 'Verified',
        source: 'AI NLP Stream',
        reportedAt: `Today, ${target.extractedTime} IST`,
        reportedRelative: 'Just verified',
        aiConfidence: target.confidence,
        transitDelay: target.severity === 'High' ? '+10 mins' : '+6 mins',
        waterDepthOrMetric: `${target.confidence}% NLP`,
        metricLabel: 'AI Extraction',
        metricSubtext: target.subLabel,
        laneImpact: target.impactLabel,
        laneSubtext: 'Converted from AI Monitoring Stream',
        reporterName: target.handle,
        reporterBadge: 'AI Verified Feed',
        commuterConfirmations: 3,
        affectedRoutes: [{ code: 'Route 21G', corridor: 'City Arterial Trunk' }],
        suggestedDetour: 'Inner Ring Parallel Bypass',
        passengerExposure: '~2,600 Commuters / Hour',
        metroAlternative: 'CMRL Corridor Operational',
        evidenceUrl: defaultEvidenceForCategory(target.extractedCategory),
        evidenceCaption: 'Promoted from AI NLP Monitoring Stream (Demo).',
        corridorId: 'ANNA-SALAI-02',
      };

      setIncidents((prev) => [created, ...prev]);
      setAiStreamItems((prev) =>
        prev.map((item) =>
          item.id === streamId ? { ...item, convertedIncidentId: newId } : item
        )
      );
      pushToast(
        `Converted to Active Incident ${newId}`,
        `${target.extractedLocation} is now visible on the Citizen Map & Admin Dashboard.`,
        'success'
      );
      return created;
    },
    [aiStreamItems, incidents, pushToast]
  );

  const syncAIPipelineDemo = useCallback(() => {
    const sampleId = `ai-stream-${Date.now()}`;
    const sample: AIStreamItem = {
      id: sampleId,
      sourceType: 'Chennai Traffic Police X',
      handle: '@ChennaiTrafficPolice Advisory',
      subLabel: 'Simulated Demo Feed Sync',
      confidence: 94.3,
      rawText:
        '“Water stagnation reported near Adyar Madhya Kailash junction towards Sardar Patel Rd. Expect 10 min delay; pump team alerted.”',
      extractedLocation: 'Madhya Kailash Jn, Adyar',
      extractedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      extractedCategory: 'Waterlogging',
      extractedCategoryLabel: 'Waterlogging / Slow Traffic',
      severity: 'Medium',
      impactLabel: '+10m Delay',
      validationNote: 'Simulated Demo Ingestion (Phase 1)',
      zone: 'Zone 13 • Adyar',
      coordinates: { lat: 13.0064, lng: 80.2496, mapX: 71, mapY: 54 },
    };
    setAiStreamItems((prev) => [sample, ...prev]);
    pushToast(
      'Demo Pipeline Synced',
      'Added 1 sample NLP incident card to local browser state (Gemini integration arrives in Phase 5).',
      'info'
    );
  }, [pushToast]);

  const resetDemoState = useCallback(() => {
    setIncidents(INITIAL_INCIDENTS);
    setAiStreamItems(INITIAL_AI_STREAM);
    setCitizenUser(DEFAULT_CITIZEN);
    setAdminUser(DEFAULT_ADMIN);
    setSavedDraft(null);
    setActiveIncidentModal(null);
    pushToast('Demo Data Reset', 'Restored initial Chennai sample incidents and streams.', 'info');
  }, [pushToast]);

  const value = useMemo<CityLensContextValue>(
    () => ({
      incidents,
      aiStreamItems,
      citizenUser,
      adminUser,
      activeIncidentModal,
      lastSubmittedIncident,
      savedDraft,
      toasts,
      setCitizenUser,
      setAdminUser,
      openIncidentModal,
      closeIncidentModal,
      submitCitizenReport,
      saveReportDraft,
      clearReportDraft,
      updateIncidentStatus,
      dispatchCrewForIncident,
      confirmIncidentByCommuter,
      convertAIStreamToIncident,
      syncAIPipelineDemo,
      pushToast,
      dismissToast,
      resetDemoState,
    }),
    [
      incidents,
      aiStreamItems,
      citizenUser,
      adminUser,
      activeIncidentModal,
      lastSubmittedIncident,
      savedDraft,
      toasts,
      openIncidentModal,
      closeIncidentModal,
      submitCitizenReport,
      saveReportDraft,
      clearReportDraft,
      updateIncidentStatus,
      dispatchCrewForIncident,
      confirmIncidentByCommuter,
      convertAIStreamToIncident,
      syncAIPipelineDemo,
      pushToast,
      dismissToast,
      resetDemoState,
    ]
  );

  return <CityLensContext.Provider value={value}>{children}</CityLensContext.Provider>;
};

export function useCityLens(): CityLensContextValue {
  const ctx = useContext(CityLensContext);
  if (!ctx) {
    throw new Error('useCityLens must be used inside a CityLensProvider');
  }
  return ctx;
}
