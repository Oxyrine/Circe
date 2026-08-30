/*
 * Static demo data for the CIRCE Investigation Console wireframe.
 * All figures are fictional and for illustration only — this file is not
 * wired to artifacts/scored_rings.json or any other pipeline output.
 * Mirrors the content used in the Figma low/mid-fidelity wireframe.
 */

const SIMULATED = true;

const INVESTIGATOR = { name: 'R. Chandran', role: 'Senior Investigator', initials: 'RC' };

const SUMMARY = {
  openCases: 47,
  totalExposure: '₹18.4 Cr',
  corporateClosed: 9,
  avgAggregate: '0.71',
  escalatedToday: 3,
};

const QUEUE = [
  { id: 'CR-0512', entities: 4, hops: 6, risk: 'CRITICAL', agg: 0.81, exposure: '₹3.42 Cr', status: 'New', assigned: null },
  { id: 'CR-0498', entities: 5, hops: 7, risk: 'CRITICAL', agg: 0.82, exposure: '₹2.78 Cr', status: 'Under Review', assigned: 'R.C.' },
  { id: 'CR-0455', entities: 8, hops: 8, risk: 'LOW', agg: 0.32, exposure: '₹2.62 Cr', status: 'Dismissed', assigned: 'A.M.' },
  { id: 'CR-0501', entities: 4, hops: 4, risk: 'CRITICAL', agg: 0.89, exposure: '₹2.60 Cr', status: 'Escalated', assigned: 'R.C.' },
  { id: 'CR-0489', entities: 7, hops: 7, risk: 'ELEVATED', agg: 0.75, exposure: '₹2.53 Cr', status: 'Under Review', assigned: null },
  { id: 'CR-0470', entities: 3, hops: 5, risk: 'ELEVATED', agg: 0.68, exposure: '₹1.94 Cr', status: 'New', assigned: null },
  { id: 'CR-0442', entities: 6, hops: 6, risk: 'LOW', agg: 0.41, exposure: '₹1.20 Cr', status: 'Under Review', assigned: 'A.M.' },
  { id: 'CR-0431', entities: 4, hops: 3, risk: 'LOW', agg: 0.29, exposure: '₹0.87 Cr', status: 'Closed', assigned: 'R.C.' },
];

// Full detail is authored for CR-0512; other case IDs reuse this template
// with their own header stats substituted in from the queue row above.
const CASE_TEMPLATE = {
  whyFlagged: 'CIRCE detected a potentially circular transaction network involving 4 entities across 6 hops.',
  topSignals: [
    { name: 'VALUE', score: '0.97' },
    { name: 'TIMING', score: '0.88' },
    { name: 'EXTERNALITY', score: '0.94' },
  ],
  closureType: 'Transaction',
  overview: '4 entities, 6 transaction hops, closed on-platform (no hidden legs). Longest span in the ring: 11 days.',
  firstDetected: '2026-08-14',
  lastActivity: '2026-08-27',
  similarCases: 3,
  entityTags: ['E019', 'E007', 'E003', 'E022'],
  signals: [
    { name: 'VALUE', score: 0.97, note: 'Net position score — 0.97. Interior entities net near-zero.' },
    { name: 'PRODUCT', score: null, note: 'Abstained — insufficient HS codes to compare.' },
    { name: 'TIMING', score: 0.88, note: 'Regularity score — 0.88. Legs spaced 1–3 days apart.' },
    { name: 'EXTERNALITY', score: 0.94, note: '0.94 of trading volume is internal to this ring.' },
  ],
  trail: [
    { flow: 'E019 → E007', value: '₹1,82,40,000', meta: '2025-11-05 · HS 74031100', bridge: false },
    { flow: 'E007 → E003', value: '₹1,81,90,500', meta: '2025-11-08 · HS 74031100', bridge: false },
    { flow: 'E003 → E022', value: '₹1,84,10,220', meta: '2025-11-11 · HS 74031100', bridge: false },
    { flow: 'E022 → E009', value: '', meta: 'CORPORATE BRIDGE — shared director D247', bridge: true },
  ],
};

const RELATED_ENTITIES = [
  { id: 'E019', name: 'Ashoka Impex Pvt Ltd', role: 'Origin — sells & buys', networks: 2 },
  { id: 'E007', name: 'Kaveri Trading Co', role: 'Interior — sells & buys', networks: 1 },
  { id: 'E003', name: 'Deccan Distribution LLP', role: 'Interior — sells & buys', networks: 1 },
  { id: 'E022', name: 'Granite Advisory Ltd', role: 'Closes via corporate bridge', networks: 2 },
  { id: 'E009', name: 'Meridian Supply Chain Ltd', role: 'Bridge counterparty', networks: 3 },
];

const CORPORATE_BRIDGES = [
  { pair: 'E022 ↔ E009', kind: 'SHARED DIRECTOR', evidence: 'D247' },
  { pair: 'E007 ↔ E015', kind: 'SHARED ADDRESS', evidence: '26 Nariman Point, Mumbai' },
];

const ENTITY_DETAIL = {
  name: 'Meridian Supply Chain Ltd',
  industry: 'Distribution',
  address: '18 Avinashi Road, Chennai 600002',
  registrationDate: '2012-11-24',
  directors: 'D045, D162',
  relatedInvoices: '14 (dataset)',
  flaggedNetworks: 2,
};

const GRAPH = {
  nodes: [
    { id: 'E019', cx: 280, cy: 60 },
    { id: 'E007', cx: 460, cy: 200 },
    { id: 'E003', cx: 280, cy: 400 },
    { id: 'E022', cx: 100, cy: 200 },
    { id: 'E009', cx: 460, cy: 400, dim: true },
  ],
  edges: [
    { from: 'E019', to: 'E007', kind: 'hop' },
    { from: 'E007', to: 'E003', kind: 'hop' },
    { from: 'E003', to: 'E022', kind: 'hop' },
    { from: 'E022', to: 'E019', kind: 'hop' },
    { from: 'E022', to: 'E009', kind: 'bridge' },
  ],
  backdrop: [[30,30],[530,40],[20,440],[540,450],[15,250],[545,230],[210,20],[350,460],[480,70],[70,455],[300,445],[520,320],[45,150],[480,150]],
};

const AUDIT_LOG = [
  { action: 'FLAGGED', actor: 'System', role: null, ts: '2026-08-14 · 09:12', agg: '0.81', note: null },
  { action: 'ESCALATED', actor: 'R. Chandran', role: 'Senior Investigator', ts: '2026-08-19 · 14:03', agg: '0.81', note: 'HS-code mismatch across all downstream legs — checking product classification with compliance.' },
  { action: 'OVERRIDE DOCUMENTED', actor: 'A. Mehta', role: 'Compliance Lead', ts: '2026-08-24 · 11:47', agg: '0.81', note: 'Reviewed with buyer — confirmed genuine trade despite signal pattern. Downgrading to monitoring. Note required for any override, per policy.' },
];
