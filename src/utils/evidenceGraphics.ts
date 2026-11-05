/**
 * Generates crisp, self-contained dark-mode SVG data URIs representing road hazard
 * evidence photos so no external image CDNs are required in offline/sandboxed previews.
 */
function toSvgDataUrl(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}

export const EVIDENCE_UNDERPASS_FLOOD = toSvgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 440">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0b1528"/>
      <stop offset="55%" stop-color="#152642"/>
      <stop offset="100%" stop-color="#0a1629"/>
    </linearGradient>
    <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0f2942"/>
      <stop offset="50%" stop-color="#0a1f36"/>
      <stop offset="100%" stop-color="#061222"/>
    </linearGradient>
  </defs>
  <rect width="800" height="440" fill="url(#sky)"/>
  <!-- Concrete flyover deck & pillars -->
  <polygon points="0,40 800,115 800,175 0,115" fill="#1e293b" stroke="#334155" stroke-width="2"/>
  <rect x="90" y="115" width="48" height="150" fill="#172033"/>
  <rect x="420" y="140" width="44" height="130" fill="#172033"/>
  <!-- Retaining walls -->
  <polygon points="0,160 280,245 280,310 0,340" fill="#111c30"/>
  <polygon points="800,175 540,245 540,310 800,345" fill="#111c30"/>
  <!-- Flooded carriageway -->
  <rect x="0" y="255" width="800" height="185" fill="url(#water)"/>
  <!-- Warm streetlamp reflections -->
  <circle cx="210" cy="185" r="7" fill="#fbbf24"/>
  <circle cx="585" cy="195" r="6" fill="#fbbf24"/>
  <ellipse cx="210" cy="330" rx="28" ry="65" fill="#f59e0b" opacity="0.16"/>
  <ellipse cx="585" cy="335" rx="24" ry="55" fill="#f59e0b" opacity="0.14"/>
  <!-- MTC Bus silhouette in flooded lane -->
  <rect x="255" y="205" width="145" height="82" rx="8" fill="#1e3a5f" stroke="#38bdf8" stroke-width="1.5"/>
  <rect x="267" y="216" width="54" height="32" rx="3" fill="#0f172a"/>
  <rect x="328" y="216" width="58" height="32" rx="3" fill="#0f172a"/>
  <circle cx="282" cy="272" r="7" fill="#fde68a"/>
  <circle cx="380" cy="272" r="7" fill="#fde68a"/>
  <!-- Auto rickshaw -->
  <rect x="455" y="242" width="58" height="46" rx="6" fill="#ca8a04" stroke="#facc15" stroke-width="1.2"/>
  <rect x="463" y="249" width="42" height="19" rx="2" fill="#0f172a"/>
  <!-- AI Detection Bounding Boxes -->
  <rect x="246" y="196" width="164" height="98" fill="none" stroke="#22d3ee" stroke-width="2" stroke-dasharray="6,4"/>
  <rect x="246" y="180" width="94" height="16" fill="#0891b2"/>
  <text x="252" y="192" fill="#e0f2fe" font-family="monospace" font-size="10" font-weight="bold">MTC BUS • 28cm</text>
  <rect x="448" y="235" width="72" height="58" fill="none" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="5,3"/>
  <!-- Water ripple lines -->
  <line x1="120" y1="312" x2="680" y2="312" stroke="#38bdf8" stroke-opacity="0.35" stroke-width="1.5" stroke-dasharray="18,12"/>
  <line x1="80" y1="348" x2="720" y2="348" stroke="#38bdf8" stroke-opacity="0.25" stroke-width="1.5" stroke-dasharray="24,16"/>
  <line x1="150" y1="385" x2="650" y2="385" stroke="#38bdf8" stroke-opacity="0.2" stroke-width="1.2" stroke-dasharray="14,18"/>
  <!-- Rain streaks -->
  <g stroke="#94a3b8" stroke-opacity="0.22" stroke-width="1">
    <line x1="110" y1="30" x2="95" y2="95"/><line x1="240" y1="45" x2="225" y2="110"/>
    <line x1="390" y1="25" x2="375" y2="90"/><line x1="530" y1="50" x2="515" y2="115"/>
    <line x1="690" y1="35" x2="675" y2="100"/>
  </g>
</svg>
`);

export const EVIDENCE_POTHOLE_CLUSTER = toSvgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 440">
  <rect width="800" height="440" fill="#0c1424"/>
  <!-- Road perspective -->
  <polygon points="230,90 570,90 800,440 0,440" fill="#162032"/>
  <line x1="400" y1="95" x2="400" y2="440" stroke="#facc15" stroke-width="4" stroke-dasharray="28,22" opacity="0.65"/>
  <!-- Horizon skyline -->
  <rect x="0" y="0" width="800" height="96" fill="#08101f"/>
  <rect x="120" y="42" width="60" height="54" fill="#132038"/>
  <rect x="200" y="28" width="85" height="68" fill="#162642"/>
  <rect x="530" y="36" width="90" height="60" fill="#132038"/>
  <!-- Pothole craters with rainwater reflection -->
  <ellipse cx="345" cy="295" rx="115" ry="44" fill="#09111e" stroke="#475569" stroke-width="3"/>
  <ellipse cx="345" cy="298" rx="96" ry="32" fill="#0ea5e9" opacity="0.28"/>
  <ellipse cx="515" cy="355" rx="88" ry="34" fill="#09111e" stroke="#475569" stroke-width="2.5"/>
  <ellipse cx="515" cy="358" rx="72" ry="24" fill="#38bdf8" opacity="0.24"/>
  <ellipse cx="250" cy="375" rx="64" ry="24" fill="#09111e" stroke="#475569" stroke-width="2"/>
  <!-- AI Hazard Polygon -->
  <rect x="215" y="240" width="395" height="158" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="8,5"/>
  <rect x="215" y="220" width="188" height="20" fill="#b45309"/>
  <text x="223" y="234" fill="#fef3c7" font-family="monospace" font-size="11" font-weight="bold">SURFACE CRATER CLUSTER (x3)</text>
</svg>
`);

export const EVIDENCE_CONGESTION_CORRIDOR = toSvgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 440">
  <rect width="800" height="440" fill="#08101e"/>
  <polygon points="290,70 510,70 790,440 10,440" fill="#131e31"/>
  <line x1="400" y1="70" x2="400" y2="440" stroke="#334155" stroke-width="3"/>
  <!-- Vehicle tail-light clusters -->
  <g>
    <rect x="250" y="290" width="95" height="52" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
    <circle cx="266" cy="318" r="6" fill="#ef4444"/><circle cx="329" cy="318" r="6" fill="#ef4444"/>
    <rect x="435" y="270" width="105" height="58" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
    <circle cx="452" cy="300" r="6" fill="#ef4444"/><circle cx="522" cy="300" r="6" fill="#ef4444"/>
    <rect x="310" y="195" width="76" height="44" rx="6" fill="#1e293b" stroke="#f97316" stroke-width="1.2"/>
    <circle cx="322" cy="218" r="5" fill="#ef4444"/><circle cx="374" cy="218" r="5" fill="#ef4444"/>
    <rect x="418" y="185" width="72" height="42" rx="6" fill="#1e293b" stroke="#f97316" stroke-width="1.2"/>
    <circle cx="430" cy="208" r="5" fill="#ef4444"/><circle cx="478" cy="208" r="5" fill="#ef4444"/>
  </g>
  <rect x="230" y="170" width="335" height="190" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="7,5"/>
  <rect x="230" y="150" width="195" height="20" fill="#991b1b"/>
  <text x="238" y="164" fill="#fee2e2" font-family="monospace" font-size="11" font-weight="bold">BOTTLENECK • AVG 09 KM/H</text>
</svg>
`);
