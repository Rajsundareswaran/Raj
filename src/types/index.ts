export type IncidentCategory =
  | 'Potholes'
  | 'Road Accident'
  | 'Severe Congestion'
  | 'Roadblocks'
  | 'Construction'
  | 'Waterlogging'
  | 'Signal Malfunction'
  | 'Fallen Tree / Debris';

export type IncidentSeverity = 'Low' | 'Medium' | 'High';

export type VerificationStatus = 'Pending' | 'Verified' | 'Resolved' | 'Rejected';

export type IncidentSource =
  | 'Citizen Report'
  | 'Citizen (Dual AI)'
  | 'AI NLP Stream'
  | 'Official GCC'
  | 'Citizen Telemetry';

export type TransitMode = 'car' | 'two-wheeler' | 'bus' | 'metro';

export interface Coordinates {
  lat: number;
  lng: number;
  /** Normalized 0..100 coordinates for Phase 1 interactive Chennai corridor canvas */
  mapX: number;
  mapY: number;
}

export interface Incident {
  id: string; // e.g. "#CHN-88412"
  title: string;
  category: IncidentCategory;
  description: string;
  location: string;
  landmark: string;
  zone: string; // e.g. "Zone 12 • Alandur Border"
  ward: string; // e.g. "Ward 156"
  coordinates: Coordinates;
  severity: IncidentSeverity;
  status: VerificationStatus;
  source: IncidentSource;
  reportedAt: string; // Display timestamp e.g. "Today, 08:14 AM IST"
  reportedRelative: string; // e.g. "18m ago"
  resolvedAt?: string;
  aiConfidence: number; // e.g. 94.2
  transitDelay: string; // e.g. "+8 mins"
  waterDepthOrMetric: string; // e.g. "24 – 30 cm" or "3 Deep Craters"
  metricLabel: string; // e.g. "Water Depth" or "Surface Impact"
  metricSubtext: string; // e.g. "Exceeds wheel rim threshold"
  laneImpact: string; // e.g. "Left 2 Lanes Inoperable"
  laneSubtext: string; // e.g. "1 single lane open (crawl)"
  reporterName: string;
  reporterBadge?: string;
  commuterConfirmations: number;
  affectedRoutes: Array<{
    code: string;
    corridor: string;
  }>;
  suggestedDetour: string;
  passengerExposure: string;
  metroAlternative: string;
  evidenceUrl: string;
  evidenceCaption: string;
  crewDispatched?: boolean;
  corridorId: string;
}

export interface ReportDraft {
  id: string;
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
  photoName: string | null;
  photoSizeLabel: string | null;
  savedAt: string;
}

export type FeedSourceType =
  | 'All Feeds'
  | 'Chennai Traffic Police X'
  | 'Civic Complaints'
  | 'Telegram Channels'
  | 'News RSS';

export interface AIStreamItem {
  id: string;
  sourceType: Exclude<FeedSourceType, 'All Feeds'>;
  handle: string;
  subLabel: string;
  confidence: number;
  rawText: string;
  translatedText?: string;
  extractedLocation: string;
  extractedTime: string;
  extractedCategory: IncidentCategory;
  extractedCategoryLabel: string;
  severity: IncidentSeverity;
  impactLabel: string;
  validationNote: string;
  zone: string;
  coordinates: Coordinates;
  convertedIncidentId?: string;
}

export interface ChennaiLocationOption {
  id: string;
  name: string;
  zone: string;
  ward: string;
  corridorId: string;
  coordinates: Coordinates;
}

export interface DemoSessionUser {
  name: string;
  email: string;
  role: 'citizen' | 'admin';
  badge: string;
  zone: string;
  karmaPoints: number;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  tone: 'info' | 'success' | 'warning' | 'error';
}

export interface ScreenDefinition {
  number: string;
  title: string;
  portal: 'Public' | 'Citizen' | 'Admin';
  path: string;
}
