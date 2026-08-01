// ============================================================
//  Hiring Funnel — Internship Hiring Tracker
//  Vanilla JS, frontend-only. All data in-memory arrays.
// ============================================================

// ---------- Stages ----------
const STAGES = [
  'Nomination',
  'Startup Review',
  'Interview',
  'Feedback',
  'Offer',
  'Accepted',
  'Documents',
  'Internship Started',
];
// Rejected is a terminal side-state, tracked via status === 'Rejected'.

const STAGE_META = {
  'Nomination':        { color: '#94a3b8', icon: 'apply',   person: 'Talent Sourcer' },
  'Startup Review':    { color: '#2f6fed', icon: 'screen', person: 'Startup Lead' },
  'Interview':         { color: '#0fb9a8', icon: 'calendar',person: 'Hiring Manager' },
  'Feedback':          { color: '#0a8c7e', icon: 'file',    person: 'Hiring Manager' },
  'Offer':             { color: '#f59e0b', icon: 'file',    person: 'Talent Lead' },
  'Accepted':          { color: '#16a34a', icon: 'check',   person: 'Talent Lead' },
  'Documents':         { color: '#7c3aed', icon: 'doc',     person: 'People Ops' },
  'Internship Started': { color: '#15803d', icon: 'rocket', person: 'People Ops' },
  'Rejected':          { color: '#e5484d', icon: 'reject',  person: 'Hiring Manager' },
};

// ---------- Candidates (8 mock) ----------
let candidates = [
  {
    id: 1, name: 'Maya Chen', initials: 'MC', color: '#2f6fed',
    university: 'Stanford University', startup: 'Quantum Labs', role: 'Software Engineer Intern',
    stage: 2, status: 'Interview', feedback: null,
    interview: { date: '2026-08-04', time: '14:00', type: 'Technical', format: 'Video Call', interviewer: 'Dana Cole' },
    timeline: [
      { stage: 'Nomination',     date: 'Jul 02', person: 'Talent Sourcer', notes: 'Nominated from campus career fair.' },
      { stage: 'Startup Review', date: 'Jul 05', person: 'Startup Lead',  notes: 'Strong CS coursework, relevant project.' },
      { stage: 'Interview',      date: 'Jul 12', person: 'Hiring Manager', notes: 'Technical + behavioral scheduled.' },
    ],
    documents: null,
  },
  {
    id: 2, name: 'James Okafor', initials: 'JO', color: '#0fb9a8',
    university: 'MIT', startup: 'DataForge', role: 'Data Science Intern',
    stage: 4, status: 'Offer', feedback: { rating: 5, comment: 'Excellent ML fundamentals and clear communication.', decision: 'Hire' },
    timeline: [
      { stage: 'Nomination',     date: 'Jun 20', person: 'Talent Sourcer', notes: 'Referred by alumni network.' },
      { stage: 'Startup Review', date: 'Jun 24', person: 'Startup Lead',  notes: 'Great portfolio of data projects.' },
      { stage: 'Interview',      date: 'Jul 01', person: 'Hiring Manager', notes: 'Two-panel technical interview.' },
      { stage: 'Feedback',       date: 'Jul 03', person: 'Hiring Manager', notes: 'Decision: Hire. Strong recommendation.' },
      { stage: 'Offer',          date: 'Jul 08', person: 'Talent Lead',   notes: 'Offer letter sent for review.' },
    ],
    documents: null,
  },
  {
    id: 3, name: 'Priya Nair', initials: 'PN', color: '#7c3aed',
    university: 'UC Berkeley', startup: 'BrightApp', role: 'Product Manager Intern',
    stage: 6, status: 'Documents', feedback: { rating: 4, comment: 'Good product sense, needs mentorship.', decision: 'Hire' },
    timeline: [
      { stage: 'Nomination',     date: 'Jun 10', person: 'Talent Sourcer', notes: 'Applied via portal.' },
      { stage: 'Startup Review', date: 'Jun 14', person: 'Startup Lead',  notes: 'Relevant PM internship experience.' },
      { stage: 'Interview',      date: 'Jun 20', person: 'Hiring Manager', notes: 'Case-based interview.' },
      { stage: 'Feedback',       date: 'Jun 22', person: 'Hiring Manager', notes: 'Decision: Hire.' },
      { stage: 'Offer',          date: 'Jun 26', person: 'Talent Lead',   notes: 'Offer sent.' },
      { stage: 'Accepted',       date: 'Jun 30', person: 'Talent Lead',    notes: 'Candidate accepted the offer.' },
      { stage: 'Documents',      date: 'Jul 10', person: 'People Ops',     notes: 'Collecting onboarding documents.' },
    ],
    documents: [
      { name: 'Offer Letter',      status: 'Approved' },
      { name: 'NDA',               status: 'Approved' },
      { name: 'Internship Agreement', status: 'Uploaded' },
      { name: 'ID Copy',           status: 'Pending' },
      { name: 'Bank Details',      status: 'Pending' },
      { name: 'Emergency Contact', status: 'Pending' },
    ],
  },
  {
    id: 4, name: 'Liam Foster', initials: 'LF', color: '#f59e0b',
    university: 'RISD', startup: 'Pixel Studio', role: 'Product Design Intern',
    stage: 1, status: 'Startup Review', feedback: null,
    timeline: [
      { stage: 'Nomination',     date: 'Jul 18', person: 'Talent Sourcer', notes: 'Portfolio review passed.' },
      { stage: 'Startup Review', date: 'Jul 20', person: 'Startup Lead',  notes: 'Design challenge in progress.' },
    ],
    documents: null,
  },
  {
    id: 5, name: 'Sofia Rossi', initials: 'SR', color: '#e5484d',
    university: 'Bocconi', startup: 'MarketGrowth', role: 'Marketing Intern',
    stage: 4, status: 'Rejected', feedback: { rating: 2, comment: 'Limited relevant experience for the role.', decision: 'Reject' },
    timeline: [
      { stage: 'Nomination',     date: 'Jun 05', person: 'Talent Sourcer', notes: 'Nominated from LinkedIn.' },
      { stage: 'Startup Review', date: 'Jun 09', person: 'Startup Lead',  notes: 'Borderline profile, moved to interview.' },
      { stage: 'Interview',      date: 'Jun 15', person: 'Hiring Manager', notes: 'Marketing strategy interview.' },
      { stage: 'Feedback',       date: 'Jun 17', person: 'Hiring Manager', notes: 'Decision: Reject.' },
    ],
    documents: null,
  },
  {
    id: 6, name: 'Noah Kim', initials: 'NK', color: '#16a34a',
    university: 'Carnegie Mellon', startup: 'Quantum Labs', role: 'Software Engineer Intern',
    stage: 2, status: 'Interview', feedback: null,
    interview: { date: '2026-08-06', time: '10:30', type: 'Panel', format: 'In-person', interviewer: 'Dana Cole' },
    timeline: [
      { stage: 'Nomination',     date: 'Jul 06', person: 'Talent Sourcer', notes: 'Strong algorithms background.' },
      { stage: 'Startup Review', date: 'Jul 09', person: 'Startup Lead',  notes: 'Approved for interview.' },
      { stage: 'Interview',      date: 'Jul 15', person: 'Hiring Manager', notes: 'Live coding round scheduled.' },
    ],
    documents: null,
  },
  {
    id: 7, name: 'Ethan Park', initials: 'EP', color: '#2457d4',
    university: 'Georgia Tech', startup: 'DevOps Co', role: 'DevOps Intern',
    stage: 7, status: 'Internship Started', feedback: { rating: 5, comment: 'Outstanding systems thinking.', decision: 'Hire' },
    timeline: [
      { stage: 'Nomination',     date: 'May 20', person: 'Talent Sourcer', notes: 'Nominated from hackathon.' },
      { stage: 'Startup Review', date: 'May 24', person: 'Startup Lead',  notes: 'Excellent infra project.' },
      { stage: 'Interview',      date: 'Jun 01', person: 'Hiring Manager', notes: 'Systems design interview.' },
      { stage: 'Feedback',       date: 'Jun 03', person: 'Hiring Manager', notes: 'Decision: Hire.' },
      { stage: 'Offer',         date: 'Jun 08', person: 'Talent Lead',   notes: 'Offer sent.' },
      { stage: 'Accepted',       date: 'Jun 12', person: 'Talent Lead',    notes: 'Accepted.' },
      { stage: 'Documents',      date: 'Jun 20', person: 'People Ops',     notes: 'All documents approved.' },
      { stage: 'Internship Started', date: 'Jul 01', person: 'People Ops', notes: 'First day completed.' },
    ],
    documents: [
      { name: 'Offer Letter',      status: 'Approved' },
      { name: 'NDA',               status: 'Approved' },
      { name: 'Internship Agreement', status: 'Approved' },
      { name: 'ID Copy',           status: 'Approved' },
      { name: 'Bank Details',      status: 'Approved' },
      { name: 'Emergency Contact', status: 'Approved' },
    ],
  },
  {
    id: 8, name: 'Hana Suzuki', initials: 'HS', color: '#6d28d9',
    university: 'UTokyo', startup: 'BrightApp', role: 'Frontend Engineer Intern',
    stage: 4, status: 'Offer', feedback: { rating: 4, comment: 'Solid React skills, good team fit.', decision: 'Hire' },
    timeline: [
      { stage: 'Nomination',     date: 'Jun 28', person: 'Talent Sourcer', notes: 'Nominated via referral.' },
      { stage: 'Startup Review', date: 'Jul 02', person: 'Startup Lead',  notes: 'Frontend challenge passed.' },
      { stage: 'Interview',      date: 'Jul 09', person: 'Hiring Manager', notes: 'Pair programming interview.' },
      { stage: 'Feedback',       date: 'Jul 11', person: 'Hiring Manager', notes: 'Decision: Hire.' },
      { stage: 'Offer',          date: 'Jul 16', person: 'Talent Lead',   notes: 'Offer letter sent.' },
    ],
    documents: null,
  },
];

// ---------- Recent activity (most recent first) ----------
let activityIdSeq = 4;
let activities = [
  { id: 1, type: 'hire',   color: 'green', text: '<strong>Ethan Park</strong> started their DevOps internship', time: '2 days ago', read: true },
  { id: 2, type: 'offer',  color: 'amber', text: 'Offer letter sent to <strong>Hana Suzuki</strong>', time: '3 days ago', read: true },
  { id: 3, type: 'reject', color: 'red',   text: '<strong>Sofia Rossi</strong> was rejected after feedback', time: '5 days ago', read: true },
];

// ---------- QSTP Inbox (emails) ----------
// direction: 'inbound' (from candidate) | 'outbound' (sent by QSTP)
// type: 'offer-acceptance' | 'documents-required' | 'documents-reminder'
// processed: for inbound offer-acceptance emails — whether the AI scan has actioned it yet
function emailSlug(name) {
  return name.toLowerCase().replace(/[^a-z\s]/g, '').trim().replace(/\s+/g, '.');
}
let emails = [
  {
    id: 1, direction: 'inbound', candidateId: 3, type: 'offer-acceptance', processed: true,
    from: `Priya Nair <${emailSlug('Priya Nair')}@student.edu>`, to: 'qstp-admissions@qstp.org',
    subject: 'Re: Your Offer — Product Manager Intern at BrightApp', date: 'Jun 30',
    body: `Hi,\n\nThank you so much for the offer! I'm thrilled to accept the Product Manager Intern position at BrightApp. Looking forward to getting started.\n\nBest,\nPriya`,
  },
  {
    id: 2, direction: 'outbound', candidateId: 3, type: 'documents-required', processed: true,
    from: 'qstp-onboarding@qstp.org', to: `Priya Nair <${emailSlug('Priya Nair')}@student.edu>`,
    subject: 'Documents Required — Product Manager Intern at BrightApp', date: 'Jul 10',
    body: `Hi Priya,\n\nCongratulations again on accepting your offer! To complete onboarding, please submit:\n- Offer Letter\n- NDA\n- Internship Agreement\n- ID Copy\n- Bank Details\n- Emergency Contact\n\nBest,\nQSTP People Ops`,
  },
  {
    id: 3, direction: 'inbound', candidateId: 7, type: 'offer-acceptance', processed: true,
    from: `Ethan Park <${emailSlug('Ethan Park')}@student.edu>`, to: 'qstp-admissions@qstp.org',
    subject: 'Re: Your Offer — DevOps Intern at DevOps Co', date: 'Jun 12',
    body: `Hello,\n\nI'm excited to accept the DevOps Intern offer at DevOps Co. Thank you for this opportunity!\n\nEthan`,
  },
  {
    id: 4, direction: 'outbound', candidateId: 7, type: 'documents-required', processed: true,
    from: 'qstp-onboarding@qstp.org', to: `Ethan Park <${emailSlug('Ethan Park')}@student.edu>`,
    subject: 'Documents Required — DevOps Intern at DevOps Co', date: 'Jun 20',
    body: `Hi Ethan,\n\nCongratulations again on accepting your offer! To complete onboarding, please submit:\n- Offer Letter\n- NDA\n- Internship Agreement\n- ID Copy\n- Bank Details\n- Emergency Contact\n\nBest,\nQSTP People Ops`,
  },
  {
    id: 5, direction: 'inbound', candidateId: 2, type: 'offer-acceptance', processed: false,
    from: `James Okafor <${emailSlug('James Okafor')}@student.edu>`, to: 'qstp-admissions@qstp.org',
    subject: 'Re: Your Offer — Data Science Intern at DataForge', date: 'Jul 29',
    body: `Hi,\n\nThank you for the offer! I'm happy to accept the Data Science Intern position at DataForge. Please let me know the next steps.\n\nBest,\nJames`,
  },
  {
    id: 6, direction: 'inbound', candidateId: 8, type: 'offer-acceptance', processed: false,
    from: `Hana Suzuki <${emailSlug('Hana Suzuki')}@student.edu>`, to: 'qstp-admissions@qstp.org',
    subject: 'Re: Your Offer — Frontend Engineer Intern at BrightApp', date: 'Jul 30',
    body: `Hello,\n\nI'm delighted to accept the Frontend Engineer Intern offer at BrightApp. Looking forward to joining the team!\n\nHana`,
  },
];
let emailIdSeq = 7;
function queueEmail(e) {
  emails.unshift({
    id: emailIdSeq++,
    processed: e.direction === 'outbound' ? true : false,
    read: e.direction === 'outbound' ? false : true, // unread until the candidate opens their inbox
    ...e,
  });
}

// Snapshot of the initial demo state, used by "Reset Demo"
const INITIAL_STATE_JSON = JSON.stringify({ candidates, activities, emails, emailIdSeq, activityIdSeq });

// ---------- Icon library ----------
const icons = {
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
  rocket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.39 3-4c1.62-.57 3-1 3-1M12 15v5s3.39-.55 4-3c.57-1.62 1-3 1-3"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>',
  apply: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>',
  screen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  reject: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></svg>',
  hire: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m17 11 2 2 4-4"/></svg>',
  pdf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>',
  sheet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8M8 9h2"/></svg>',
  inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
  arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>',
  arrowDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
  sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>',
  starOutline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  feedback: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>',
};

// ---------- Helpers ----------
const $ = (sel, root = document) => root.querySelector(sel);
const content = $('#content');

// ---------- Roles ----------
const ROLES = {
  qstp:    { label: 'QSTP Admin',   name: 'Rita Alvarez', initials: 'RA', startup: null, internId: null },
  startup: { label: 'Startup Lead', name: 'Dana Cole',    initials: 'DC', startup: 'Quantum Labs', internId: null },
  intern:  { label: 'Intern',       name: 'Maya Chen',    initials: 'MC', startup: null, internId: 1 },
};
let currentRole = 'qstp';

function roleConfig() { return ROLES[currentRole]; }
function visibleCandidates() {
  const r = roleConfig();
  if (currentRole === 'startup' && r.startup) return candidates.filter(c => c.startup === r.startup);
  if (currentRole === 'intern' && r.internId) return candidates.filter(c => c.id === r.internId);
  return candidates;
}
function canManageFunnel() { return currentRole === 'qstp' || currentRole === 'startup'; }
// Onboarding documents are owned by People Ops (QSTP admin) per STAGE_META — startups get
// read-only visibility into their own hires' progress, interns never approve their own docs.
function canApproveDocuments() { return currentRole === 'qstp'; }

function statusToStageIndex(status) {
  if (status === 'Rejected') return -1;
  return STAGES.indexOf(status);
}
function stageLabel(c) {
  return c.status === 'Rejected' ? 'Rejected' : STAGES[c.stage] || 'Nomination';
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}
function todayStr() {
  return new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
}

// ---------- Dashboard stats (computed) ----------
function computeStats() {
  const list = visibleCandidates();
  const total = list.length;
  const interviews = list.filter(c => c.status === 'Interview').length;
  const offers = list.filter(c => c.status === 'Offer').length;
  const onboarding = list.filter(c => c.status === 'Documents' || c.status === 'Accepted').length;
  const hires = list.filter(c => c.status === 'Internship Started').length;
  return { total, interviews, offers, onboarding, hires };
}

// ---------- Delayed stages (QSTP admin) ----------
// A stage is "delayed" if it's been sitting in the same stage for more than 7 mock-days.
const STAGE_SLAS = {
  'Nomination': 3, 'Startup Review': 4, 'Interview': 5,
  'Feedback': 3, 'Offer': 5, 'Accepted': 4, 'Documents': 7,
};
function daysSince(dateStr) {
  const now = new Date('2026-07-30');
  const then = new Date('2026 ' + dateStr + ' 01');
  return Math.max(0, Math.round((now - then) / 86400000));
}
function delayedCandidates() {
  const out = [];
  candidates.forEach(c => {
    if (c.status === 'Rejected' || c.status === 'Internship Started') return;
    const sla = STAGE_SLAS[c.status];
    if (!sla) return;
    const last = c.timeline[c.timeline.length - 1];
    if (!last) return;
    const days = daysSince(last.date);
    if (days > sla) out.push({ candidate: c, days, sla });
  });
  return out;
}

// ---------- Activity logging ----------
function logActivity(type, text) {
  const colorMap = { hire: 'green', offer: 'amber', reject: 'red', interview: 'teal', feedback: 'teal', accept: 'green', doc: 'violet', apply: 'blue', screen: 'blue', start: 'green' };
  activities.unshift({ id: activityIdSeq++, type, color: colorMap[type] || 'blue', text, time: 'Just now', read: false });
  if (activities.length > 12) activities.pop();
  updateNotifBadge();
}

// ============================================================
//  PAGE: Dashboard
// ============================================================
function renderDashboard() {
  if (currentRole === 'intern') return renderInternDashboard();
  if (currentRole === 'startup') return renderStartupDashboard();
  return renderQstpDashboard();
}

function statCardsHtml(cardDefs) {
  return cardDefs.map(c => `
    <div class="stat-card">
      <div class="stat-card__top">
        <div class="stat-card__icon ${c.color}">${icons[c.icon]}</div>
        <span class="stat-card__trend ${c.dir}">${icons[c.dir === 'up' ? 'arrowUp' : 'arrowDown']}${c.trend}</span>
      </div>
      <div class="stat-card__value">${c.value}</div>
      <div class="stat-card__label">${c.label}</div>
    </div>`).join('');
}

function activityItemsHtml(list) {
  return list.slice(0, 7).map(a => `
    <div class="activity-item">
      <div class="activity-dot ${a.color}">${icons[a.type] || icons.apply}</div>
      <div class="activity-body">
        <div class="activity-text">${a.text}</div>
        <div class="activity-meta">${a.time}</div>
      </div>
    </div>`).join('');
}

function insightsListHtml(insights) {
  return insights.map(i => `
    <div class="insight-item insight-${i.severity}">
      <div class="insight-dot"></div>
      <div class="insight-body">
        <div class="insight-text">${i.text}</div>
        <div class="insight-meta">${i.meta}</div>
      </div>
    </div>`).join('') || '<div class="insights-empty">No actions needed right now.</div>';
}

// ---------- QSTP Admin Dashboard ----------
function renderQstpDashboard() {
  const s = computeStats();
  const cards = statCardsHtml([
    { label: 'Total Candidates', value: s.total, color: 'blue', icon: 'users', trend: '+8%', dir: 'up' },
    { label: 'Interviews', value: s.interviews, color: 'teal', icon: 'calendar', trend: '+3%', dir: 'up' },
    { label: 'Offers', value: s.offers, color: 'amber', icon: 'file', trend: '+2%', dir: 'up' },
    { label: 'Onboarding', value: s.onboarding, color: 'violet', icon: 'rocket', trend: '+1%', dir: 'up' },
    { label: 'Completed Hires', value: s.hires, color: 'green', icon: 'check', trend: '-1%', dir: 'down' },
  ]);
  const delayed = delayedCandidates();
  const insights = generateInsights();
  const interviews = upcomingInterviews();

  content.innerHTML = `
    <div class="page-head">
      <h1 class="page-title">QSTP Admin Dashboard</h1>
      <p class="page-subtitle">Full pipeline visibility across all startups — Summer 2026 cycle</p>
    </div>
    <div class="stat-grid">${cards}</div>
    <div class="two-col">
      <section class="section">
        <div class="section__head">
          <div>
            <div class="section__title">Recent Activity</div>
            <div class="section__sub">Latest updates across all startups</div>
          </div>
          <button class="btn-ghost" data-nav="candidates">View all</button>
        </div>
        <div class="activity-list">${activityItemsHtml(activities)}</div>
      </section>
      <div style="display:flex;flex-direction:column;gap:20px">
        <section class="section">
          <div class="section__head">
            <div>
              <div class="section__title">Pipeline Snapshot</div>
              <div class="section__sub">Candidates per stage (all startups)</div>
            </div>
          </div>
          <div class="funnel">${miniFunnel()}</div>
        </section>
        <section class="section insights-panel">
          <div class="section__head">
            <div>
              <div class="section__title" style="display:flex;align-items:center;gap:8px">${icons.sparkles} AI Insights</div>
              <div class="section__sub">Rule-based recommendations</div>
            </div>
          </div>
          <div class="insights-list">${insightsListHtml(insights)}</div>
        </section>
      </div>
    </div>
    <section class="section" style="margin-top:24px">
      <div class="section__head">
        <div>
          <div class="section__title" style="display:flex;align-items:center;gap:8px">${icons.calendar} Upcoming Interviews</div>
          <div class="section__sub">Scheduled across all startups, soonest first</div>
        </div>
        <span class="pill ${interviews.length ? 'screening' : 'applied'}">${interviews.length} scheduled</span>
      </div>
      ${interviews.length ? `
        <div class="activity-list">
          ${interviews.map(iv => `
            <div class="activity-item">
              <div class="activity-dot teal">${icons.calendar}</div>
              <div class="activity-body" style="flex:1">
                <div class="activity-text"><strong>${iv.candidate.name}</strong> — ${iv.candidate.role} at ${iv.candidate.startup}</div>
                <div class="activity-meta">${formatInterviewWhen(iv.candidate.interview)} · ${iv.candidate.interview.type} · ${iv.days <= 0 ? 'Today' : `in ${iv.days} day${iv.days !== 1 ? 's' : ''}`}</div>
              </div>
              <button class="btn-ghost btn-sm" data-funnel="${iv.candidate.id}">View</button>
            </div>`).join('')}
        </div>` : `<div class="placeholder" style="padding:32px"><div class="placeholder__title">No interviews scheduled</div><div class="placeholder__text">Schedule one from a candidate's "Startup Review" stage.</div></div>`}
    </section>
    <section class="section" style="margin-top:24px">
      <div class="section__head">
        <div>
          <div class="section__title" style="display:flex;align-items:center;gap:8px">${icons.clock} Delayed Stages</div>
          <div class="section__sub">Candidates exceeding their stage SLA</div>
        </div>
        <span class="pill ${delayed.length ? 'offer' : 'applied'}">${delayed.length} delayed</span>
      </div>
      ${delayed.length ? `
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Candidate</th><th>Startup</th><th>Stage</th><th>SLA</th><th>Days waiting</th><th></th></tr></thead>
            <tbody>
              ${delayed.map(d => `
                <tr>
                  <td>
                    <div class="candidate-cell">
                      <div class="candidate-avatar" style="background:${d.candidate.color}">${d.candidate.initials}</div>
                      <div><div class="candidate-name">${d.candidate.name}</div><div class="candidate-role">${d.candidate.role}</div></div>
                    </div>
                  </td>
                  <td>${d.candidate.startup}</td>
                  <td><span class="pill ${pillClass(d.candidate.status)}">${d.candidate.status}</span></td>
                  <td>${d.sla} days</td>
                  <td><span class="pill rejected">${d.days} days</span></td>
                  <td><button class="btn-primary btn-sm" data-funnel="${d.candidate.id}">View</button></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>` : `<div class="placeholder" style="padding:40px"><div class="placeholder__title">No delayed stages</div><div class="placeholder__text">All candidates are within their stage SLAs.</div></div>`}
    </section>`;

  bindNavButtons();
  bindPieChartHover();
  document.querySelectorAll('[data-funnel]').forEach(b => {
    b.addEventListener('click', () => openFunnel(Number(b.dataset.funnel)));
  });
}

// ---------- Startup Dashboard ----------
function renderStartupDashboard() {
  const r = roleConfig();
  const list = visibleCandidates();
  const s = {
    total: list.length,
    interviews: list.filter(c => c.status === 'Interview').length,
    offers: list.filter(c => c.status === 'Offer').length,
    onboarding: list.filter(c => c.status === 'Documents' || c.status === 'Accepted').length,
    hires: list.filter(c => c.status === 'Internship Started').length,
  };
  const cards = statCardsHtml([
    { label: 'Assigned Candidates', value: s.total, color: 'blue', icon: 'users', trend: '+5%', dir: 'up' },
    { label: 'Interviews', value: s.interviews, color: 'teal', icon: 'calendar', trend: '+2%', dir: 'up' },
    { label: 'Offers', value: s.offers, color: 'amber', icon: 'file', trend: '+1%', dir: 'up' },
    { label: 'Onboarding', value: s.onboarding, color: 'violet', icon: 'rocket', trend: '+1%', dir: 'up' },
    { label: 'Completed Hires', value: s.hires, color: 'green', icon: 'check', trend: '0%', dir: 'up' },
  ]);
  const needsFeedback = list.filter(c => c.status === 'Interview' && !c.feedback);
  const pendingOffers = list.filter(c => c.status === 'Offer');
  const insights = generateInsights().filter(i => list.some(c => c.id === i.candidateId));
  const interviews = upcomingInterviews().filter(iv => iv.candidate.startup === r.startup);

  content.innerHTML = `
    <div class="page-head">
      <h1 class="page-title">Startup Dashboard</h1>
      <p class="page-subtitle">${r.startup} — ${list.length} candidates assigned to your team</p>
    </div>
    <div class="stat-grid">${cards}</div>
    <div class="two-col">
      <section class="section">
        <div class="section__head">
          <div>
            <div class="section__title">Awaiting Your Feedback</div>
            <div class="section__sub">Candidates who completed interviews</div>
          </div>
          <button class="btn-ghost" data-nav="candidates">All candidates</button>
        </div>
        ${needsFeedback.length ? `
          <div class="activity-list">
            ${needsFeedback.map(c => `
              <div class="activity-item">
                <div class="activity-dot teal">${icons.calendar}</div>
                <div class="activity-body" style="flex:1">
                  <div class="activity-text"><strong>${c.name}</strong> — ${c.role}</div>
                  <div class="activity-meta">Interview completed · feedback needed</div>
                </div>
                <button class="btn-primary btn-sm" data-funnel="${c.id}">Review</button>
              </div>`).join('')}
          </div>` : `<div class="placeholder" style="padding:32px"><div class="placeholder__title">No pending feedback</div><div class="placeholder__text">All interviews have been reviewed.</div></div>`}
      </section>
      <div style="display:flex;flex-direction:column;gap:20px">
        <section class="section">
          <div class="section__head">
            <div>
              <div class="section__title">Offer Status</div>
              <div class="section__sub">Pending offers for your candidates</div>
            </div>
          </div>
          ${pendingOffers.length ? `
            <div class="activity-list">
              ${pendingOffers.map(c => `
                <div class="activity-item">
                  <div class="activity-dot amber">${icons.file}</div>
                  <div class="activity-body" style="flex:1">
                    <div class="activity-text"><strong>${c.name}</strong> — ${c.role}</div>
                    <div class="activity-meta">Offer sent · awaiting acceptance</div>
                  </div>
                  <button class="btn-ghost btn-sm" data-funnel="${c.id}">Track</button>
                </div>`).join('')}
            </div>` : `<div class="placeholder" style="padding:32px"><div class="placeholder__title">No pending offers</div><div class="placeholder__text">No offers are currently awaiting response.</div></div>`}
        </section>
        <section class="section insights-panel">
          <div class="section__head">
            <div>
              <div class="section__title" style="display:flex;align-items:center;gap:8px">${icons.sparkles} AI Insights</div>
              <div class="section__sub">For ${r.startup}</div>
            </div>
          </div>
          <div class="insights-list">${insightsListHtml(insights)}</div>
        </section>
      </div>
    </div>
    <section class="section" style="margin-top:24px">
      <div class="section__head">
        <div>
          <div class="section__title" style="display:flex;align-items:center;gap:8px">${icons.calendar} Upcoming Interviews</div>
          <div class="section__sub">Scheduled for ${r.startup}, soonest first</div>
        </div>
        <span class="pill ${interviews.length ? 'screening' : 'applied'}">${interviews.length} scheduled</span>
      </div>
      ${interviews.length ? `
        <div class="activity-list">
          ${interviews.map(iv => `
            <div class="activity-item">
              <div class="activity-dot teal">${icons.calendar}</div>
              <div class="activity-body" style="flex:1">
                <div class="activity-text"><strong>${iv.candidate.name}</strong> — ${iv.candidate.role}</div>
                <div class="activity-meta">${formatInterviewWhen(iv.candidate.interview)} · ${iv.candidate.interview.type} · ${iv.days <= 0 ? 'Today' : `in ${iv.days} day${iv.days !== 1 ? 's' : ''}`}</div>
              </div>
              <button class="btn-ghost btn-sm" data-funnel="${iv.candidate.id}">View</button>
            </div>`).join('')}
        </div>` : `<div class="placeholder" style="padding:32px"><div class="placeholder__title">No interviews scheduled</div><div class="placeholder__text">Schedule one from a candidate's "Startup Review" stage.</div></div>`}
    </section>`;

  bindNavButtons();
  document.querySelectorAll('[data-funnel]').forEach(b => {
    b.addEventListener('click', () => openFunnel(Number(b.dataset.funnel)));
  });
}

// ---------- Intern Dashboard ----------
function renderInternDashboard() {
  const r = roleConfig();
  const c = candidates.find(x => x.id === r.internId);
  if (!c) {
    content.innerHTML = `<div class="placeholder"><div class="placeholder__title">No application found</div></div>`;
    return;
  }

  const upcomingInterview = c.status === 'Interview' || c.status === 'Startup Review';
  const offerUpdate = c.status === 'Offer' || c.status === 'Accepted';
  const onboardingActive = c.status === 'Documents' || c.status === 'Accepted' || c.status === 'Internship Started';

  const timelineHtml = c.timeline.map((t, i) => {
    const meta = STAGE_META[t.stage] || STAGE_META['Rejected'];
    const isLast = i === c.timeline.length - 1;
    return `
      <div class="tl-stage tl-done">
        <div class="tl-rail">
          <div class="tl-dot" style="background:${meta.color}">${icons.check}</div>
          ${!isLast ? '<div class="tl-line"></div>' : ''}
        </div>
        <div class="tl-content">
          <div class="tl-head">
            <div class="tl-title">${t.stage}</div>
            <span class="tl-status tl-status--done">Completed</span>
          </div>
          <div class="tl-meta">
            <span>${icons.calendar}<span>${t.date}</span></span>
            <span>${icons.users}<span>${t.person}</span></span>
          </div>
          <div class="tl-notes">${escapeHtml(t.notes)}</div>
        </div>
      </div>`;
  }).join('');

  let docSection = '';
  if (c.status === 'Documents' || c.status === 'Accepted' || c.status === 'Internship Started') {
    if (!c.documents) {
      c.documents = [
        { name: 'Offer Letter', status: 'Pending' },
        { name: 'NDA', status: 'Pending' },
        { name: 'Internship Agreement', status: 'Pending' },
        { name: 'ID Copy', status: 'Pending' },
        { name: 'Bank Details', status: 'Pending' },
        { name: 'Emergency Contact', status: 'Pending' },
      ];
    }
    const approved = c.documents.filter(d => d.status === 'Approved').length;
    const total = c.documents.length;
    const pct = Math.round((approved / total) * 100);
    docSection = `
      <section class="section" style="margin-top:20px">
        <div class="section__head">
          <div>
            <div class="section__title">Onboarding Checklist</div>
            <div class="section__sub">Upload and track your documents</div>
          </div>
          <span class="pill ${pillClass(c.status)}">${c.status}</span>
        </div>
        <div class="doc-progress">
          <div class="doc-progress__top">
            <span>Completion</span>
            <span><strong>${approved}</strong> / ${total} approved · ${pct}%</span>
          </div>
          <div class="doc-progress__bar"><div class="doc-progress__fill" style="width:${pct}%"></div></div>
        </div>
        <div class="doc-checklist">
          ${c.documents.map((d, i) => `
            <div class="doc-checklist__item">
              <div class="doc-checklist__icon doc-status--${d.status.toLowerCase()}">
                ${d.status === 'Approved' ? icons.check : d.status === 'Uploaded' ? icons.upload : icons.doc}
              </div>
              <div class="doc-checklist__info">
                <div class="doc-checklist__name">${d.name}</div>
                <div class="doc-checklist__state state--${d.status.toLowerCase()}">${d.status}</div>
              </div>
              <div class="doc-checklist__actions">
                ${d.status === 'Pending' ? `<button class="btn-ghost btn-sm" data-intern-doc="upload" data-i="${i}">Upload</button>` : ''}
                ${d.status === 'Uploaded' ? `<span class="doc-done">${icons.clock} Under review</span>` : ''}
                ${d.status === 'Approved' ? `<span class="doc-done">${icons.check} Approved</span>` : ''}
              </div>
            </div>`).join('')}
        </div>
      </section>`;
  }

  content.innerHTML = `
    <div class="page-head">
      <div>
        <h1 class="page-title">My Application</h1>
        <p class="page-subtitle">${c.role} · ${c.startup} · ${c.university}</p>
      </div>
      <span class="pill ${pillClass(c.status)}" style="font-size:13px;padding:8px 14px">${c.status}</span>
    </div>

    ${upcomingInterview ? `
      <div class="callout callout--teal">
        <div class="callout__icon">${icons.calendar}</div>
        <div>
          <div class="callout__title">${c.interview && c.interview.date ? 'Interview Scheduled' : 'Upcoming Interview'}</div>
          ${c.interview && c.interview.date ? `
            <div class="callout__text">Your ${escapeHtml(c.interview.type)} interview for ${c.role} is set for <strong>${formatInterviewWhen(c.interview)}</strong> (${escapeHtml(c.interview.format)}) with ${escapeHtml(c.interview.interviewer)}. Good luck!</div>
          ` : `
            <div class="callout__text">${c.startup} is reviewing your application. Once approved, your interview will be scheduled and you'll be notified by email.</div>
          `}
        </div>
      </div>` : ''}

    ${offerUpdate ? `
      <div class="callout callout--amber">
        <div class="callout__icon">${icons.file}</div>
        <div>
          <div class="callout__title">Offer Update</div>
          <div class="callout__text">Congratulations! You have received an offer for ${c.role} at ${c.startup}. ${c.status === 'Accepted' ? 'You have accepted — welcome aboard!' : 'Please review and respond.'}</div>
          ${c.status === 'Offer' ? `<button class="btn-primary btn-sm" id="acceptOfferBtn" style="margin-top:12px">Accept Offer</button>` : ''}
        </div>
      </div>` : ''}

    ${c.status === 'Rejected' ? `
      <div class="callout callout--red">
        <div class="callout__icon">${icons.reject}</div>
        <div>
          <div class="callout__title">Application Update</div>
          <div class="callout__text">Unfortunately, your application was not moved forward this cycle. We encourage you to apply again for future opportunities.</div>
        </div>
      </div>` : ''}

    <div class="two-col" style="${onboardingActive ? '' : 'margin-bottom:24px'}">
      <section class="section">
        <div class="section__head">
          <div>
            <div class="section__title">Application Timeline</div>
            <div class="section__sub">Your journey so far</div>
          </div>
        </div>
        <div class="timeline">${timelineHtml}</div>
      </section>
      <div style="display:flex;flex-direction:column;gap:20px">
        ${c.feedback ? `
          <section class="section">
            <div class="section__head"><div><div class="section__title">Interview Feedback</div></div></div>
            <div class="fb-summary">
              <div class="fb-stars">${Array.from({ length: 5 }, (_, i) => i < c.feedback.rating ? icons.star : icons.starOutline).join('')}</div>
              <div class="fb-comment">${escapeHtml(c.feedback.comment)}</div>
              <div class="pill ${c.feedback.decision === 'Hire' ? 'hired' : c.feedback.decision === 'Reject' ? 'rejected' : 'offer'}">${c.feedback.decision}</div>
            </div>
          </section>` : ''}
        <section class="section insights-panel">
          <div class="section__head">
            <div>
              <div class="section__title" style="display:flex;align-items:center;gap:8px">${icons.sparkles} For You</div>
              <div class="section__sub">Next steps in your process</div>
            </div>
          </div>
          <div class="insights-list">${internTipsHtml(c)}</div>
        </section>
      </div>
    </div>
    ${docSection}`;

  document.querySelectorAll('[data-intern-doc]').forEach(b => {
    b.addEventListener('click', () => {
      const i = Number(b.dataset.i);
      c.documents[i].status = 'Uploaded';
      logActivity('doc', `<strong>${c.name}</strong> uploaded ${c.documents[i].name}`);
      renderInternDashboard();
    });
  });
  const acceptBtn = $('#acceptOfferBtn');
  if (acceptBtn) acceptBtn.addEventListener('click', () => acceptOffer(c.id));
}

// ---------- Intern accepts offer (emails the QSTP inbox) ----------
function acceptOffer(id) {
  const c = candidates.find(x => x.id === id);
  if (!c || c.status !== 'Offer') return;
  c.status = 'Accepted';
  c.stage = STAGES.indexOf('Accepted');
  c.timeline.push({ stage: 'Accepted', date: todayStr(), person: c.name, notes: 'Candidate accepted the offer.' });
  queueEmail({
    direction: 'inbound', candidateId: c.id, type: 'offer-acceptance',
    from: `${c.name} <${emailSlug(c.name)}@student.edu>`, to: 'qstp-admissions@qstp.org',
    subject: `Re: Your Offer — ${c.role} at ${c.startup}`, date: todayStr(),
    body: `Hi,\n\nThank you for the opportunity. I'm excited to accept the offer for the ${c.role} position at ${c.startup}. Looking forward to getting started.\n\nBest,\n${c.name}`,
  });
  logActivity('accept', `<strong>${c.name}</strong> accepted the offer`);
  showToast('Offer accepted! QSTP has been notified.');
  renderInternDashboard();
}

function internTipsHtml(c) {
  const tips = [];
  if (c.status === 'Nomination') tips.push({ severity: 'info', text: 'Your nomination is being reviewed', meta: 'The startup team will assess your profile soon' });
  if (c.status === 'Startup Review') tips.push({ severity: 'info', text: 'Startup is reviewing your profile', meta: 'You may be invited to an interview shortly' });
  if (c.status === 'Interview') tips.push({ severity: 'warning', text: 'Prepare for your interview', meta: 'Review the role description and your projects' });
  if (c.status === 'Offer') tips.push({ severity: 'warning', text: 'Respond to your offer', meta: 'Please accept or decline by Aug 15, 2026' });
  if (c.status === 'Documents') {
    const missing = c.documents ? c.documents.filter(d => d.status !== 'Approved').length : 6;
    tips.push({ severity: 'warning', text: `Complete your onboarding documents`, meta: `${missing} document(s) still need to be uploaded` });
  }
  if (c.status === 'Internship Started') tips.push({ severity: 'info', text: 'Welcome to the team!', meta: 'Your internship has begun — reach out to your mentor' });
  if (c.status === 'Rejected') tips.push({ severity: 'info', text: 'Application closed', meta: 'Feel free to apply for future cycles' });
  return insightsListHtml(tips);
}

// ---------- Pie chart helpers (SVG slice geometry) ----------
function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = (angleDeg - 90) * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function describeSlice(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return ['M', cx, cy, 'L', start.x, start.y, 'A', r, r, 0, largeArcFlag, 1, end.x, end.y, 'Z'].join(' ');
}

function miniFunnel() {
  const list = visibleCandidates();
  const counts = {};
  STAGES.forEach(s => counts[s] = 0);
  list.forEach(c => { if (c.status !== 'Rejected') counts[STAGES[c.stage]] = (counts[STAGES[c.stage]] || 0) + 1; });
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  if (!total) {
    return `<div class="placeholder" style="padding:32px"><div class="placeholder__title">No active candidates</div><div class="placeholder__text">Candidates in the pipeline will appear here as a pie chart.</div></div>`;
  }

  const rows = STAGES.map(label => ({ label, count: counts[label], meta: STAGE_META[label] })).filter(r => r.count > 0);
  const cx = 90, cy = 90, r = 88;

  let slicesHtml;
  if (rows.length === 1) {
    slicesHtml = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${rows[0].meta.color}" class="pie-slice" data-label="${rows[0].label}" data-count="${rows[0].count}" data-pct="100"></circle>`;
  } else {
    let cursor = 0;
    slicesHtml = rows.map(row => {
      const pct = (row.count / total) * 100;
      const startAngle = cursor;
      cursor += (pct / 100) * 360;
      const d = describeSlice(cx, cy, r, startAngle, cursor);
      return `<path d="${d}" fill="${row.meta.color}" class="pie-slice" data-label="${row.label}" data-count="${row.count}" data-pct="${Math.round(pct)}"></path>`;
    }).join('');
  }

  const legendHtml = rows.map(row => {
    const pct = Math.round((row.count / total) * 100);
    return `
      <div class="pie-legend__row" data-legend-for="${row.label}">
        <span class="pie-legend__dot" style="background:${row.meta.color}"></span>
        <span class="pie-legend__label">${row.label}</span>
        <span class="pie-legend__count">${row.count}</span>
        <span class="pie-legend__pct">${pct}%</span>
      </div>`;
  }).join('');

  return `
    <div class="pie-chart-wrap">
      <div class="pie-chart-svg-wrap">
        <svg viewBox="0 0 180 180" class="pie-svg" role="img" aria-label="Pipeline snapshot pie chart">${slicesHtml}</svg>
        <div class="pie-tooltip" id="pieTooltip"></div>
      </div>
      <div class="pie-legend">${legendHtml}</div>
    </div>`;
}

// Wires up hover interactions for the pie chart rendered by miniFunnel().
// Call this after the containing page's innerHTML has been set.
function bindPieChartHover() {
  const wrap = $('.pie-chart-svg-wrap');
  if (!wrap) return;
  const tooltip = $('#pieTooltip');
  const slices = wrap.querySelectorAll('.pie-slice');
  const legendRows = document.querySelectorAll('.pie-legend__row');

  function highlight(label) {
    slices.forEach(s => {
      const match = s.dataset.label === label;
      s.classList.toggle('pie-slice--active', match);
      s.classList.toggle('pie-slice--dim', !match);
    });
    legendRows.forEach(l => l.classList.toggle('pie-legend__row--active', l.dataset.legendFor === label));
  }
  function clearHighlight() {
    slices.forEach(s => s.classList.remove('pie-slice--active', 'pie-slice--dim'));
    legendRows.forEach(l => l.classList.remove('pie-legend__row--active'));
    tooltip.classList.remove('show');
  }
  function positionTooltip(e) {
    const rect = wrap.getBoundingClientRect();
    tooltip.style.left = (e.clientX - rect.left + 14) + 'px';
    tooltip.style.top = (e.clientY - rect.top + 10) + 'px';
  }

  slices.forEach(s => {
    s.addEventListener('mouseenter', e => {
      highlight(s.dataset.label);
      tooltip.textContent = `${s.dataset.label} · ${s.dataset.count} (${s.dataset.pct}%)`;
      tooltip.classList.add('show');
      positionTooltip(e);
    });
    s.addEventListener('mousemove', positionTooltip);
    s.addEventListener('mouseleave', clearHighlight);
  });
  legendRows.forEach(l => {
    l.addEventListener('mouseenter', () => highlight(l.dataset.legendFor));
    l.addEventListener('mouseleave', clearHighlight);
  });
}

// ============================================================
//  PAGE: Candidates
// ============================================================
let candidateFilter = { q: '', status: 'all' };

function renderCandidates() {
  const list = visibleCandidates();
  const statusOptions = ['all', ...new Set(list.map(c => c.status))];
  const filtered = list.filter(c => {
    const matchQ = !candidateFilter.q ||
      c.name.toLowerCase().includes(candidateFilter.q) ||
      c.university.toLowerCase().includes(candidateFilter.q) ||
      c.startup.toLowerCase().includes(candidateFilter.q) ||
      c.role.toLowerCase().includes(candidateFilter.q);
    const matchStatus = candidateFilter.status === 'all' || c.status === candidateFilter.status;
    return matchQ && matchStatus;
  });

  const rows = filtered.map(c => `
    <tr data-row-id="${c.id}">
      <td>
        <div class="candidate-cell">
          <div class="candidate-avatar" style="background:${c.color}">${c.initials}</div>
          <div>
            <div class="candidate-name">${c.name}</div>
            <div class="candidate-role">${c.university}</div>
          </div>
        </div>
      </td>
      <td>${c.startup}</td>
      <td>${c.role}</td>
      <td><span class="pill ${pillClass(c.status)}">${c.status}</span></td>
      <td><button class="btn-primary btn-sm" data-funnel="${c.id}">View Funnel</button></td>
    </tr>`).join('') || `<tr><td colspan="5" class="empty-row">No candidates match your filters.</td></tr>`;

  const titleSuffix = currentRole === 'startup' ? ` at ${roleConfig().startup}` : (currentRole === 'intern' ? '' : ' in your pipeline');
  content.innerHTML = `
    <div class="page-head">
      <h1 class="page-title">Candidates</h1>
      <p class="page-subtitle">${list.length} candidate${list.length !== 1 ? 's' : ''}${titleSuffix}</p>
    </div>
    <section class="section">
      <div class="section__head filters">
        <div class="filter-bar">
          <div class="filter-search">
            ${icons.apply}
            <input type="text" id="candSearch" placeholder="Search by name, university, startup, role…" value="${escapeHtml(candidateFilter.q)}" />
          </div>
          <select id="candStatus" class="filter-select">
            ${statusOptions.map(s => `<option value="${s}" ${candidateFilter.status === s ? 'selected' : ''}>${s === 'all' ? 'All statuses' : s}</option>`).join('')}
          </select>
        </div>
        ${currentRole === 'qstp' ? '<button class="btn-ghost" id="addCand">+ Add candidate</button>' : ''}
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr><th>Name</th><th>Startup</th><th>Role</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>`;

  $('#candSearch').addEventListener('input', e => {
    candidateFilter.q = e.target.value;
    renderCandidates();
    $('#candSearch').focus();
  });
  $('#candStatus').addEventListener('change', e => {
    candidateFilter.status = e.target.value;
    renderCandidates();
  });
  const addBtn = $('#addCand');
  if (addBtn) addBtn.addEventListener('click', addCandidate);
  document.querySelectorAll('[data-funnel]').forEach(b => {
    b.addEventListener('click', () => openFunnel(Number(b.dataset.funnel)));
  });
}

function pillClass(status) {
  const map = {
    'Nomination': 'applied', 'Startup Review': 'screening', 'Interview': 'interview',
    'Feedback': 'interview', 'Offer': 'offer', 'Accepted': 'onboarding',
    'Documents': 'onboarding', 'Internship Started': 'hired', 'Rejected': 'rejected',
  };
  return map[status] || 'applied';
}

const KNOWN_STARTUPS = ['Quantum Labs', 'DataForge', 'BrightApp', 'Pixel Studio', 'DevOps Co'];
const COLOR_PALETTE = ['#2f6fed', '#0fb9a8', '#f59e0b', '#7c3aed', '#16a34a', '#e5484d', '#2457d4', '#6d28d9'];

function addCandidate() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal__head">
        <div>
          <div class="modal__title">Add Candidate</div>
          <div class="modal__sub">Nominate a new candidate into the pipeline</div>
        </div>
        <button class="modal__close" id="closeAddCand">&times;</button>
      </div>
      <div class="modal__body">
        <div class="form-group">
          <label>Full name</label>
          <input type="text" id="acName" placeholder="e.g. Alex Rivera" />
        </div>
        <div class="form-group">
          <label>University</label>
          <input type="text" id="acUniversity" placeholder="e.g. Cornell University" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Host startup</label>
            <select id="acStartup">
              ${KNOWN_STARTUPS.map(s => `<option value="${s}">${s}</option>`).join('')}
              <option value="__other__">Other…</option>
            </select>
          </div>
          <div class="form-group">
            <label>Role</label>
            <input type="text" id="acRole" placeholder="e.g. Software Engineer Intern" />
          </div>
        </div>
        <div class="form-group" id="acOtherStartupGroup" style="display:none">
          <label>Startup name</label>
          <input type="text" id="acOtherStartup" placeholder="Startup name" />
        </div>
      </div>
      <div class="modal__foot">
        <button class="btn-ghost" id="cancelAddCand">Cancel</button>
        <button class="btn-primary" id="submitAddCand" disabled>Add candidate</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const nameEl = overlay.querySelector('#acName');
  const uniEl = overlay.querySelector('#acUniversity');
  const startupEl = overlay.querySelector('#acStartup');
  const roleEl = overlay.querySelector('#acRole');
  const otherGroup = overlay.querySelector('#acOtherStartupGroup');
  const otherEl = overlay.querySelector('#acOtherStartup');
  const submitBtn = overlay.querySelector('#submitAddCand');

  function updateSubmit() {
    const startupOk = startupEl.value !== '__other__' || otherEl.value.trim();
    submitBtn.disabled = !(nameEl.value.trim() && uniEl.value.trim() && roleEl.value.trim() && startupOk);
  }
  startupEl.addEventListener('change', () => {
    otherGroup.style.display = startupEl.value === '__other__' ? '' : 'none';
    updateSubmit();
  });
  [nameEl, uniEl, roleEl, otherEl].forEach(el => el.addEventListener('input', updateSubmit));
  overlay.querySelector('#closeAddCand').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#cancelAddCand').addEventListener('click', () => overlay.remove());

  submitBtn.addEventListener('click', () => {
    const name = nameEl.value.trim();
    const startup = startupEl.value === '__other__' ? otherEl.value.trim() : startupEl.value;
    const initials = name.split(/\s+/).map(p => p[0]).join('').slice(0, 2).toUpperCase();
    const c = {
      id: Date.now(),
      name, initials,
      color: COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)],
      university: uniEl.value.trim(),
      startup,
      role: roleEl.value.trim(),
      stage: 0, status: 'Nomination', feedback: null,
      timeline: [{ stage: 'Nomination', date: todayStr(), person: 'Talent Sourcer', notes: 'Newly added candidate.' }],
      documents: null,
    };
    candidates.push(c);
    logActivity('apply', `New candidate <strong>${name}</strong> added to the pipeline`);
    overlay.remove();
    // Make sure the new candidate isn't hidden by an active filter/search, then render + highlight it.
    candidateFilter = { q: '', status: 'all' };
    renderCandidates();
    showToast(`${name} was added to the pipeline.`);
    requestAnimationFrame(() => {
      const row = document.querySelector(`tr[data-row-id="${c.id}"]`);
      if (row) {
        row.classList.add('row-highlight');
        row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });
}

// ============================================================
//  PAGE: Hiring Funnel (timeline view for a candidate)
// ============================================================
let activeFunnelId = null;

function openFunnel(id) {
  activeFunnelId = id;
  navigate('funnel');
}

function renderFunnel() {
  if (activeFunnelId == null) {
    content.innerHTML = `
      <div class="page-head">
        <h1 class="page-title">Hiring Funnel</h1>
        <p class="page-subtitle">Select a candidate to view their hiring timeline</p>
      </div>
      <div class="placeholder">
        <div class="placeholder__icon">${icons.inbox}</div>
        <div class="placeholder__title">No candidate selected</div>
        <div class="placeholder__text">Go to the Candidates page and click "View Funnel" on any candidate to see their timeline here.</div>
      </div>
      <div class="funnel-picker">
        <div class="funnel-picker__label">Quick select:</div>
        ${visibleCandidates().map(c => `<button class="chip" data-funnel="${c.id}">${c.name}</button>`).join('')}
      </div>`;
    document.querySelectorAll('[data-funnel]').forEach(b => {
      b.addEventListener('click', () => openFunnel(Number(b.dataset.funnel)));
    });
    return;
  }

  const c = candidates.find(x => x.id === activeFunnelId);
  if (!c) { activeFunnelId = null; renderFunnel(); return; }

  const isRejected = c.status === 'Rejected';
  const isComplete = c.status === 'Internship Started';
  const isInterviewStage = c.status === 'Interview';
  const isFeedbackStage = c.status === 'Feedback';
  const currentStageIdx = isRejected ? -1 : c.stage;

  const timeline = STAGES.map((stageName, idx) => {
    const entry = c.timeline.find(t => t.stage === stageName);
    const meta = STAGE_META[stageName];
    let state = 'upcoming';
    if (entry) state = 'done';
    else if (idx === currentStageIdx) state = 'current';
    return { stageName, idx, entry, meta, state };
  });

  const timelineHtml = timeline.map(t => {
    const dotClass = t.state === 'done' ? 'done' : t.state === 'current' ? 'current' : 'upcoming';
    const statusLabel = t.state === 'done' ? 'Completed' : t.state === 'current' ? 'In progress' : 'Pending';
    return `
      <div class="tl-stage tl-${dotClass}">
        <div class="tl-rail">
          <div class="tl-dot" style="${t.state === 'done' || t.state === 'current' ? `background:${t.meta.color}` : ''}">${t.state === 'done' ? icons.check : ''}</div>
          ${t.state !== 'last' ? '<div class="tl-line"></div>' : ''}
        </div>
        <div class="tl-content">
          <div class="tl-head">
            <div class="tl-title">${t.stageName}</div>
            <span class="tl-status tl-status--${dotClass}">${statusLabel}</span>
          </div>
          ${t.entry ? `
            <div class="tl-meta">
              <span>${icons.calendar}<span>${t.entry.date}</span></span>
              <span>${icons.users}<span>${t.entry.person}</span></span>
            </div>
            <div class="tl-notes">${escapeHtml(t.entry.notes)}</div>
          ` : `<div class="tl-meta tl-meta--empty">Awaiting this stage</div>`}
        </div>
      </div>`;
  }).join('');

  let actionArea = '';
  const canManage = canManageFunnel();
  if (isRejected) {
    actionArea = `<div class="funnel-action rejected">This candidate was rejected. ${c.feedback ? `<button class="btn-ghost" id="viewRejectEmail">View rejection email</button>` : ''}</div>`;
  } else if (isComplete) {
    actionArea = `<div class="funnel-action complete">${icons.check} This candidate has started their internship.</div>`;
  } else if (c.status === 'Startup Review') {
    actionArea = canManage ? `<div class="funnel-action">
      <button class="btn-primary" id="scheduleInterviewBtn">${icons.calendar} Schedule Interview</button>
    </div>` : `<div class="funnel-action rejected">This stage is managed by the hiring team.</div>`;
  } else if (isInterviewStage && !c.feedback) {
    actionArea = canManage ? `<div class="funnel-action">
      <button class="btn-primary" id="openFeedback">Submit Interview Feedback</button>
    </div>` : `<div class="funnel-action rejected">Awaiting interview feedback from the hiring team.</div>`;
  } else if (isFeedbackStage) {
    actionArea = canManage ? `<div class="funnel-action">
      <button class="btn-primary" id="advanceStage">${icons.arrowRight} Next Stage</button>
    </div>` : `<div class="funnel-action rejected">Awaiting next stage from the hiring team.</div>`;
  } else {
    actionArea = canManage ? `<div class="funnel-action">
      <button class="btn-primary" id="advanceStage">${icons.arrowRight} Next Stage</button>
    </div>` : `<div class="funnel-action rejected">This stage is managed by the hiring team.</div>`;
  }

  content.innerHTML = `
    <div class="page-head">
      <div>
        <h1 class="page-title">${c.name}</h1>
        <p class="page-subtitle">${c.role} · ${c.startup} · ${c.university}</p>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        ${currentRole === 'qstp' ? `<button class="btn-ghost btn-sm btn-outline" id="emailCandidateBtn">${icons.chat} Email candidate</button>` : ''}
        ${currentRole !== 'intern' ? `<button class="btn-ghost" id="switchCandidateBtn">${icons.users} Switch candidate</button>` : ''}
        <button class="btn-ghost" data-nav="candidates">Back to candidates</button>
      </div>
    </div>
    <div class="two-col" style="grid-template-columns:1.5fr 1fr">
      <section class="section">
        <div class="section__head">
          <div>
            <div class="section__title">Hiring Timeline</div>
            <div class="section__sub">Current stage: <strong>${c.status}</strong></div>
          </div>
        </div>
        <div class="timeline">${timelineHtml}</div>
        ${actionArea}
      </section>
      <div style="display:flex;flex-direction:column;gap:20px">
        <section class="section">
          <div class="section__head"><div><div class="section__title">Candidate Details</div></div></div>
          <div class="detail-grid">
            <div class="detail-item"><div class="detail-label">University</div><div class="detail-value">${c.university}</div></div>
            <div class="detail-item"><div class="detail-label">Startup</div><div class="detail-value">${c.startup}</div></div>
            <div class="detail-item"><div class="detail-label">Role</div><div class="detail-value">${c.role}</div></div>
            <div class="detail-item"><div class="detail-label">Status</div><div class="detail-value"><span class="pill ${pillClass(c.status)}">${c.status}</span></div></div>
          </div>
        </section>
        ${c.feedback ? renderFeedbackSummary(c) : ''}
        ${renderInterviewDetails(c)}
        ${renderCommunicationHistory(c)}
        ${renderInsightsForCandidate(c)}
      </div>
    </div>`;

  bindNavButtons();
  const advBtn = $('#advanceStage');
  if (advBtn) advBtn.addEventListener('click', () => advanceStage(c.id));
  const fbBtn = $('#openFeedback');
  if (fbBtn) fbBtn.addEventListener('click', () => openFeedbackForm(c.id));
  const rejBtn = $('#viewRejectEmail');
  if (rejBtn) rejBtn.addEventListener('click', () => openRejectionPreview(c.id));
  const emailBtn = $('#emailCandidateBtn');
  if (emailBtn) emailBtn.addEventListener('click', () => openComposeEmailModal(c.id));
  const schedBtn = $('#scheduleInterviewBtn');
  if (schedBtn) schedBtn.addEventListener('click', () => openScheduleInterviewModal(c.id));
  const switchBtn = $('#switchCandidateBtn');
  if (switchBtn) switchBtn.addEventListener('click', () => { activeFunnelId = null; renderFunnel(); });
}

function renderFeedbackSummary(c) {
  const f = c.feedback;
  const stars = Array.from({ length: 5 }, (_, i) => i < f.rating ? icons.star : icons.starOutline).join('');
  const decisionClass = f.decision === 'Hire' ? 'green' : f.decision === 'Reject' ? 'red' : 'amber';
  return `
    <section class="section">
      <div class="section__head"><div><div class="section__title">Interview Feedback</div></div></div>
      <div class="fb-summary">
        <div class="fb-stars">${stars}</div>
        <div class="fb-decision pill ${decisionClass === 'green' ? 'hired' : decisionClass === 'red' ? 'rejected' : 'offer'}">${f.decision}</div>
        <div class="fb-comment">${escapeHtml(f.comment)}</div>
        ${f.decision === 'Hire' ? `<button class="btn-ghost" id="viewOfferLetter">View offer letter</button>` : ''}
        ${f.decision === 'Reject' ? `<button class="btn-ghost" id="viewRejectEmail2">View rejection email</button>` : ''}
      </div>
    </section>`;
}

// ---------- Communication history ----------
const COMM_EVENT_META = {
  'Nomination':      { icon: 'apply',     label: 'Nomination submitted',    color: 'blue' },
  'Startup Review':  { icon: 'screen',    label: 'Application under review', color: 'blue' },
  'Interview':       { icon: 'calendar',  label: 'Interview invitation sent', color: 'teal' },
  'Feedback':        { icon: 'feedback',   label: 'Feedback submitted',       color: 'amber' },
  'Offer':           { icon: 'file',       label: 'Offer sent',               color: 'amber' },
  'Accepted':        { icon: 'check',      label: 'Offer accepted',           color: 'green' },
  'Documents':       { icon: 'doc',        label: 'Onboarding documents requested', color: 'violet' },
  'Internship Started': { icon: 'rocket',  label: 'Internship started',       color: 'green' },
  'Rejected':        { icon: 'reject',     label: 'Rejection email sent',     color: 'red' },
};

function renderCommunicationHistory(c) {
  const events = c.timeline.map(t => {
    const meta = COMM_EVENT_META[t.stage] || { icon: 'apply', label: t.stage, color: 'blue' };
    return { ...t, meta };
  });

  const rows = events.map(e => `
    <div class="comm-item">
      <div class="comm-dot comm-dot--${e.meta.color}">${icons[e.meta.icon] || icons.apply}</div>
      <div class="comm-body">
        <div class="comm-title">${e.meta.label}</div>
        <div class="comm-meta">
          <span>${icons.calendar}<span>${e.date}</span></span>
          <span class="comm-sep">·</span>
          <span>${icons.users}<span>${e.person}</span></span>
        </div>
        <div class="comm-notes">${escapeHtml(e.notes)}</div>
      </div>
    </div>`).join('');

  return `
    <section class="section">
      <div class="section__head">
        <div>
          <div class="section__title" style="display:flex;align-items:center;gap:8px">${icons.chat} Communication History</div>
          <div class="section__sub">All key events and messages for this candidate</div>
        </div>
        <span class="pill applied">${events.length} event${events.length !== 1 ? 's' : ''}</span>
      </div>
      <div class="comm-list">${rows}</div>
    </section>`;
}

function renderInsightsForCandidate(c) {
  const items = generateInsights().filter(i => i.candidateId === c.id);
  if (!items.length) return '';
  return `
    <section class="section insights-panel">
      <div class="section__head">
        <div><div class="section__title" style="display:flex;align-items:center;gap:8px">${icons.sparkles} Insights</div></div>
      </div>
      <div class="insights-list">
        ${items.map(i => `
          <div class="insight-item insight-${i.severity}">
            <div class="insight-dot"></div>
            <div class="insight-body">
              <div class="insight-text">${i.text}</div>
              <div class="insight-meta">${i.meta}</div>
            </div>
          </div>`).join('')}
      </div>
    </section>`;
}

// ---------- Stage advancement ----------
// ============================================================
//  Interview Scheduling — structured tracking of interviews
// ============================================================
function formatInterviewWhen(details) {
  if (!details || !details.date) return '';
  const d = new Date(`${details.date}T${details.time || '09:00'}`);
  if (isNaN(d.getTime())) return `${details.date}${details.time ? ' at ' + details.time : ''}`;
  return d.toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}

function daysUntil(dateStr) {
  const now = new Date('2026-07-30');
  const d = new Date(dateStr);
  return Math.round((d - now) / 86400000);
}

function upcomingInterviews() {
  return candidates
    .filter(c => c.status === 'Interview' && c.interview && c.interview.date)
    .map(c => ({ candidate: c, days: daysUntil(c.interview.date) }))
    .sort((a, b) => new Date(a.candidate.interview.date) - new Date(b.candidate.interview.date));
}

function openScheduleInterviewModal(id) {
  const c = candidates.find(x => x.id === id);
  if (!c || c.status !== 'Startup Review') return;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal__head">
        <div>
          <div class="modal__title">Schedule Interview — ${escapeHtml(c.name)}</div>
          <div class="modal__sub">${escapeHtml(c.role)} · ${escapeHtml(c.startup)}</div>
        </div>
        <button class="modal__close" id="closeSchedule">&times;</button>
      </div>
      <div class="modal__body">
        <div class="form-row">
          <div class="form-group">
            <label>Date</label>
            <input type="date" id="schedDate" value="2026-08-05" />
          </div>
          <div class="form-group">
            <label>Time</label>
            <input type="time" id="schedTime" value="10:00" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Interview type</label>
            <select id="schedType">
              <option>Technical</option>
              <option>Behavioral</option>
              <option>Panel</option>
              <option>Take-home + Review</option>
            </select>
          </div>
          <div class="form-group">
            <label>Format</label>
            <select id="schedFormat">
              <option>Video Call</option>
              <option>In-person</option>
              <option>Phone</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>Interviewer</label>
          <input type="text" id="schedInterviewer" placeholder="Interviewer name" value="${escapeHtml(STAGE_META['Interview'].person)}" />
        </div>
        <div class="form-group" style="margin-bottom:0">
          <div class="field-hint">${escapeHtml(c.name)} will automatically receive an email with these details once scheduled.</div>
        </div>
      </div>
      <div class="modal__foot">
        <button class="btn-ghost" id="cancelSchedule">Cancel</button>
        <button class="btn-primary" id="submitSchedule">${icons.calendar} Schedule &amp; Notify Candidate</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  overlay.querySelector('#closeSchedule').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#cancelSchedule').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#submitSchedule').addEventListener('click', () => {
    const details = {
      date: overlay.querySelector('#schedDate').value,
      time: overlay.querySelector('#schedTime').value,
      type: overlay.querySelector('#schedType').value,
      format: overlay.querySelector('#schedFormat').value,
      interviewer: overlay.querySelector('#schedInterviewer').value.trim() || STAGE_META['Interview'].person,
    };
    if (!details.date || !details.time) { showToast('Please pick a date and time.'); return; }
    overlay.remove();
    scheduleInterview(c.id, details);
  });
}

function scheduleInterview(id, details) {
  const c = candidates.find(x => x.id === id);
  if (!c || c.status !== 'Startup Review') return;

  c.interview = details;
  c.stage = STAGES.indexOf('Interview');
  c.status = 'Interview';
  const when = formatInterviewWhen(details);
  c.timeline.push({
    stage: 'Interview',
    date: todayStr(),
    person: STAGE_META['Interview'].person,
    notes: `Interview scheduled for ${when} — ${details.type} (${details.format}) with ${details.interviewer}.`,
  });
  logActivity('interview', `Interview scheduled for <strong>${c.name}</strong> — ${when}`);

  queueEmail({
    direction: 'outbound', candidateId: c.id, type: 'interview-scheduled', processed: true,
    from: 'qstp-admissions@qstp.org', to: `${c.name} <${emailSlug(c.name)}@student.edu>`,
    subject: `Interview Scheduled — ${c.role} at ${c.startup}`, date: todayStr(),
    body: `Hi ${c.name.split(' ')[0]},\n\nYour interview for the ${c.role} position at ${c.startup} has been scheduled:\n\nDate & Time: ${when}\nFormat: ${details.format}\nType: ${details.type}\nInterviewer: ${details.interviewer}\n\nPlease reply to confirm your availability. Good luck!\n\nBest,\nQSTP Admissions`,
  });

  updateInboxBadge();
  renderFunnel();
  showToast(`Interview scheduled for ${c.name} — notification email sent.`);
}

function renderInterviewDetails(c) {
  if (!c.interview || !c.interview.date) return '';
  const when = formatInterviewWhen(c.interview);
  return `
    <section class="section">
      <div class="section__head"><div><div class="section__title" style="display:flex;align-items:center;gap:8px">${icons.calendar} Interview Details</div></div></div>
      <div class="detail-grid">
        <div class="detail-item"><div class="detail-label">Date &amp; Time</div><div class="detail-value">${when}</div></div>
        <div class="detail-item"><div class="detail-label">Type</div><div class="detail-value">${escapeHtml(c.interview.type)}</div></div>
        <div class="detail-item"><div class="detail-label">Format</div><div class="detail-value">${escapeHtml(c.interview.format)}</div></div>
        <div class="detail-item"><div class="detail-label">Interviewer</div><div class="detail-value">${escapeHtml(c.interview.interviewer)}</div></div>
      </div>
    </section>`;
}

function advanceStage(id) {
  const c = candidates.find(x => x.id === id);
  if (!c || c.status === 'Rejected' || c.status === 'Internship Started') return;

  // Documents stage requires all docs approved before advancing
  if (c.status === 'Documents') {
    if (!c.documents || c.documents.some(d => d.status !== 'Approved')) {
      showToast('All documents must be approved before starting the internship.');
      return;
    }
  }

  const nextIdx = c.stage + 1;
  if (nextIdx >= STAGES.length) return;
  const nextStage = STAGES[nextIdx];
  const meta = STAGE_META[nextStage];
  c.stage = nextIdx;
  c.status = nextStage;
  c.timeline.push({
    stage: nextStage,
    date: todayStr(),
    person: meta.person,
    notes: `Advanced to ${nextStage}.`,
  });

  const actType = nextStage === 'Internship Started' ? 'start' : nextStage === 'Accepted' ? 'accept' : nextStage === 'Offer' ? 'offer' : nextStage === 'Interview' ? 'interview' : 'screen';
  logActivity(actType, `<strong>${c.name}</strong> moved to <strong>${nextStage}</strong>`);

  // Initialize documents when entering Documents stage
  if (nextStage === 'Documents' && !c.documents) {
    c.documents = [
      { name: 'Offer Letter',      status: 'Pending' },
      { name: 'NDA',               status: 'Pending' },
      { name: 'Internship Agreement', status: 'Pending' },
      { name: 'ID Copy',           status: 'Pending' },
      { name: 'Bank Details',      status: 'Pending' },
      { name: 'Emergency Contact', status: 'Pending' },
    ];
  }

  renderFunnel();
}

// ============================================================
//  Interview Feedback form + previews
// ============================================================
let feedbackDraft = { rating: 0, comment: '', decision: '' };

function openFeedbackForm(id) {
  const c = candidates.find(x => x.id === id);
  if (!c) return;
  feedbackDraft = { rating: 0, comment: '', decision: '' };

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal__head">
        <div>
          <div class="modal__title">Interview Feedback — ${c.name}</div>
          <div class="modal__sub">${c.role} · ${c.startup}</div>
        </div>
        <button class="modal__close" id="closeFeedback">&times;</button>
      </div>
      <div class="modal__body">
        <div class="form-group">
          <label>Overall Rating</label>
          <div class="star-rating" id="starRating">
            ${Array.from({ length: 5 }, (_, i) => `<button class="star" data-val="${i + 1}">${icons.starOutline}</button>`).join('')}
          </div>
        </div>
        <div class="form-group">
          <label>Comments</label>
          <textarea id="fbComment" rows="4" placeholder="Share interview notes, strengths, concerns…"></textarea>
        </div>
        <div class="form-group">
          <label>Decision</label>
          <div class="decision-row">
            <button class="decision-btn" data-decision="Hire">Hire</button>
            <button class="decision-btn" data-decision="Reject">Reject</button>
            <button class="decision-btn" data-decision="Hold">Hold</button>
          </div>
        </div>
      </div>
      <div class="modal__foot">
        <button class="btn-ghost" id="cancelFeedback">Cancel</button>
        <button class="btn-primary" id="submitFeedback" disabled>Save feedback</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const stars = overlay.querySelectorAll('.star');
  stars.forEach(s => {
    s.addEventListener('click', () => {
      feedbackDraft.rating = Number(s.dataset.val);
      stars.forEach((st, i) => { st.innerHTML = i < feedbackDraft.rating ? icons.star : icons.starOutline; st.classList.toggle('active', i < feedbackDraft.rating); });
      updateSubmit();
    });
  });
  overlay.querySelector('#fbComment').addEventListener('input', e => { feedbackDraft.comment = e.target.value; updateSubmit(); });
  overlay.querySelectorAll('.decision-btn').forEach(b => {
    b.addEventListener('click', () => {
      feedbackDraft.decision = b.dataset.decision;
      overlay.querySelectorAll('.decision-btn').forEach(x => x.classList.toggle('selected', x === b));
      updateSubmit();
    });
  });
  overlay.querySelector('#closeFeedback').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#cancelFeedback').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#submitFeedback').addEventListener('click', () => saveFeedback(c.id, overlay));

  function updateSubmit() {
    const ok = feedbackDraft.rating > 0 && feedbackDraft.comment.trim() && feedbackDraft.decision;
    overlay.querySelector('#submitFeedback').disabled = !ok;
  }
}

function saveFeedback(id, overlay) {
  const c = candidates.find(x => x.id === id);
  if (!c) return;
  c.feedback = { ...feedbackDraft };
  // Move to Feedback stage
  c.status = 'Feedback';
  c.stage = STAGES.indexOf('Feedback');
  c.timeline.push({
    stage: 'Feedback',
    date: todayStr(),
    person: 'Hiring Manager',
    notes: `Decision: ${c.feedback.decision}. Rating: ${c.feedback.rating}/5. ${c.feedback.comment}`,
  });
  logActivity('feedback', `Feedback submitted for <strong>${c.name}</strong> — decision: ${c.feedback.decision}`);
  overlay.remove();

  if (c.feedback.decision === 'Hire') {
    openOfferPreview(c.id);
  } else if (c.feedback.decision === 'Reject') {
    // Mark rejected
    c.status = 'Rejected';
    c.timeline.push({ stage: 'Rejected', date: todayStr(), person: 'Hiring Manager', notes: 'Candidate rejected.' });
    openRejectionPreview(c.id);
  } else {
    renderFunnel();
  }
}

function openOfferPreview(id) {
  const c = candidates.find(x => x.id === id);
  if (!c) return;
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal modal--wide">
      <div class="modal__head">
        <div><div class="modal__title">Offer Letter Preview</div><div class="modal__sub">${c.name}</div></div>
        <button class="modal__close" id="closeOffer">&times;</button>
      </div>
      <div class="modal__body">
        <div class="letter">
          <div class="letter__header">
            <div class="letter__logo">${icons.rocket}</div>
            <div>
              <div class="letter__from">${c.startup}</div>
              <div class="letter__date">${todayStr()}</div>
            </div>
          </div>
          <p>Dear ${c.name.split(' ')[0]},</p>
          <p>We are delighted to extend you an offer for the position of <strong>${c.role}</strong> at ${c.startup}. Based on your interview performance and the team's recommendation, we believe you will be a fantastic addition to our team.</p>
          <div class="letter__details">
            <div><span>Role</span><strong>${c.role}</strong></div>
            <div><span>Duration</span><strong>12 weeks (Summer 2026)</strong></div>
            <div><span>Start Date</span><strong>Jun 02, 2026</strong></div>
            <div><span>Compensation</span><strong>$8,500 / month</strong></div>
            <div><span>Location</span><strong>Hybrid (On-site + Remote)</strong></div>
          </div>
          <p>Please review the attached terms and confirm your acceptance by <strong>Aug 15, 2026</strong>. We look forward to welcoming you!</p>
          <p>Warm regards,<br/><strong>Talent Team</strong><br/>${c.startup}</p>
        </div>
      </div>
      <div class="modal__foot">
        <button class="btn-ghost" id="closeOffer2">Close</button>
        <button class="btn-primary" id="confirmOffer">Send offer & continue</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#closeOffer').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#closeOffer2').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#confirmOffer').addEventListener('click', () => {
    // Advance to Offer stage
    c.status = 'Offer';
    c.stage = STAGES.indexOf('Offer');
    c.timeline.push({ stage: 'Offer', date: todayStr(), person: 'Talent Lead', notes: 'Offer letter sent to candidate.' });
    logActivity('offer', `Offer letter sent to <strong>${c.name}</strong>`);
    overlay.remove();
    renderFunnel();
  });
}

function openRejectionPreview(id) {
  const c = candidates.find(x => x.id === id);
  if (!c) return;
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal modal--wide">
      <div class="modal__head">
        <div><div class="modal__title">Rejection Email Preview</div><div class="modal__sub">${c.name}</div></div>
        <button class="modal__close" id="closeRej">&times;</button>
      </div>
      <div class="modal__body">
        <div class="letter">
          <div class="letter__header">
            <div class="letter__logo" style="background:var(--error-100);color:var(--error-500)">${icons.reject}</div>
            <div>
              <div class="letter__from">${c.startup}</div>
              <div class="letter__date">${todayStr()}</div>
            </div>
          </div>
          <p>Dear ${c.name.split(' ')[0]},</p>
          <p>Thank you for taking the time to interview for the <strong>${c.role}</strong> position at ${c.startup}. We appreciate the effort and interest you showed throughout the process.</p>
          <p>After careful consideration, we have decided not to move forward with your application at this time. This was a difficult decision given the strength of our candidate pool.</p>
          <p>We encourage you to apply again for future opportunities that match your skills, and we wish you the very best in your career.</p>
          <p>Warm regards,<br/><strong>Talent Team</strong><br/>${c.startup}</p>
        </div>
      </div>
      <div class="modal__foot">
        <button class="btn-ghost" id="closeRej2">Close</button>
        <button class="btn-primary" id="confirmRej">Acknowledge & continue</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#closeRej').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#closeRej2').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#confirmRej').addEventListener('click', () => { overlay.remove(); renderFunnel(); });
}

// ============================================================
//  PAGE: Documents
// ============================================================
let activeDocId = null;

function renderDocuments() {
  const canApprove = canApproveDocuments();

  // Default to first accepted/documents candidate — scoped to what this role can see
  if (activeDocId == null) {
    const eligible = visibleCandidates().find(c => c.status === 'Documents' || c.status === 'Accepted' || c.status === 'Internship Started');
    activeDocId = eligible ? eligible.id : null;
  }

  const eligible = visibleCandidates().filter(c => c.status === 'Documents' || c.status === 'Accepted' || c.status === 'Internship Started');

  if (!eligible.length) {
    content.innerHTML = `
      <div class="page-head">
        <h1 class="page-title">Documents</h1>
        <p class="page-subtitle">Onboarding checklists for accepted candidates</p>
      </div>
      <div class="placeholder">
        <div class="placeholder__icon">${icons.doc}</div>
        <div class="placeholder__title">No accepted candidates yet</div>
        <div class="placeholder__text">Once a candidate accepts an offer, their document checklist will appear here.</div>
      </div>`;
    return;
  }

  const c = eligible.find(x => x.id === activeDocId) || eligible[0];
  activeDocId = c.id;

  if (!c.documents) {
    c.documents = [
      { name: 'Offer Letter',      status: 'Pending' },
      { name: 'NDA',               status: 'Pending' },
      { name: 'Internship Agreement', status: 'Pending' },
      { name: 'ID Copy',           status: 'Pending' },
      { name: 'Bank Details',      status: 'Pending' },
      { name: 'Emergency Contact', status: 'Pending' },
    ];
  }

  const approved = c.documents.filter(d => d.status === 'Approved').length;
  const total = c.documents.length;
  const pct = Math.round((approved / total) * 100);
  const allApproved = approved === total;
  const started = c.status === 'Internship Started';

  const checklist = c.documents.map((d, i) => `
    <div class="doc-checklist__item">
      <div class="doc-checklist__icon doc-status--${d.status.toLowerCase()}">
        ${d.status === 'Approved' ? icons.check : d.status === 'Uploaded' ? icons.upload : icons.doc}
      </div>
      <div class="doc-checklist__info">
        <div class="doc-checklist__name">${d.name}</div>
        <div class="doc-checklist__state state--${d.status.toLowerCase()}">${d.status}</div>
      </div>
      <div class="doc-checklist__actions">
        ${!canApprove ? `<span class="doc-done doc-done--muted">${d.status}</span>` : `
          ${d.status === 'Pending' ? `<button class="btn-ghost btn-sm" data-doc-action="upload" data-i="${i}">Mark uploaded</button>` : ''}
          ${d.status === 'Uploaded' ? `<button class="btn-primary btn-sm" data-doc-action="approve" data-i="${i}">Approve</button>` : ''}
          ${d.status === 'Approved' ? `<span class="doc-done">${icons.check} Approved</span>` : ''}
        `}
      </div>
    </div>`).join('');

  content.innerHTML = `
    <div class="page-head">
      <h1 class="page-title">Documents</h1>
      <p class="page-subtitle">${canApprove ? 'Onboarding checklist for accepted candidates' : 'Read-only view of onboarding progress for your candidates — approvals are handled by People Ops'}</p>
    </div>
    <div class="doc-layout">
      <aside class="doc-sidebar">
        <div class="doc-sidebar__title">Accepted Candidates</div>
        ${eligible.map(x => `
          <button class="doc-cand ${x.id === c.id ? 'active' : ''}" data-doc-id="${x.id}">
            <div class="candidate-avatar" style="background:${x.color};width:32px;height:32px;font-size:11px">${x.initials}</div>
            <div class="doc-cand__info">
              <div class="doc-cand__name">${x.name}</div>
              <div class="doc-cand__role">${x.startup}</div>
            </div>
          </button>`).join('')}
      </aside>
      <section class="section doc-main">
        <div class="section__head">
          <div>
            <div class="section__title">${c.name}</div>
            <div class="section__sub">${c.role} · ${c.startup}</div>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            ${canApprove && !allApproved ? `<button class="btn-primary btn-sm" id="approveAllBtn">${icons.check} Approve All (${total - approved})</button>` : ''}
            <span class="pill ${pillClass(c.status)}">${c.status}</span>
          </div>
        </div>
        <div class="doc-progress">
          <div class="doc-progress__top">
            <span>Checklist completion</span>
            <span><strong>${approved}</strong> / ${total} approved · ${pct}%</span>
          </div>
          <div class="doc-progress__bar"><div class="doc-progress__fill" style="width:${pct}%"></div></div>
          ${canApprove && !allApproved ? `<div class="doc-progress__hint">Got everything at once (e.g. one email with all attachments)? Use <strong>Approve All</strong> above instead of approving each file one by one.</div>` : ''}
        </div>
        <div class="doc-checklist">${checklist}</div>
        <div class="doc-start-area">
          ${started
            ? `<div class="doc-started">${icons.rocket} Internship has started. All documents approved.</div>`
            : allApproved && canApprove
              ? `<button class="btn-primary btn-large" id="startInternship">${icons.rocket} Start Internship</button>`
              : allApproved
                ? `<div class="doc-locked">${icons.clock} All documents approved — People Ops will start the internship shortly.</div>`
                : `<div class="doc-locked">${icons.clock} Internship can start once all documents are approved.</div>`}
        </div>
      </section>
    </div>`;

  document.querySelectorAll('[data-doc-id]').forEach(b => {
    b.addEventListener('click', () => { activeDocId = Number(b.dataset.docId); renderDocuments(); });
  });
  if (canApprove) {
    document.querySelectorAll('[data-doc-action]').forEach(b => {
      b.addEventListener('click', () => {
        const i = Number(b.dataset.i);
        const action = b.dataset.docAction;
        if (action === 'upload') c.documents[i].status = 'Uploaded';
        else if (action === 'approve') c.documents[i].status = 'Approved';
        logActivity('doc', `Document <strong>${c.documents[i].name}</strong> for <strong>${c.name}</strong> marked as ${c.documents[i].status}`);
        renderDocuments();
      });
    });
    const startBtn = $('#startInternship');
    if (startBtn) startBtn.addEventListener('click', () => {
      c.status = 'Internship Started';
      c.stage = STAGES.indexOf('Internship Started');
      c.timeline.push({ stage: 'Internship Started', date: todayStr(), person: 'People Ops', notes: 'All documents approved. Internship started.' });
      logActivity('start', `<strong>${c.name}</strong> started their internship!`);
      renderDocuments();
    });
    const approveAllBtn = $('#approveAllBtn');
    if (approveAllBtn) approveAllBtn.addEventListener('click', () => {
      const remaining = c.documents.filter(d => d.status !== 'Approved').length;
      if (!remaining) return;
      if (!confirm(`Approve all ${remaining} remaining document${remaining !== 1 ? 's' : ''} for ${c.name} at once? Use this when everything arrived together (e.g. in one email) and you've already verified them.`)) return;
      c.documents.forEach(d => { if (d.status !== 'Approved') d.status = 'Approved'; });
      logActivity('doc', `All documents for <strong>${c.name}</strong> approved at once (${remaining} file${remaining !== 1 ? 's' : ''})`);
      queueEmail({
        direction: 'outbound', candidateId: c.id, type: 'general', processed: true,
        from: 'qstp-onboarding@qstp.org', to: `${c.name} <${emailSlug(c.name)}@student.edu>`,
        subject: `All Documents Approved — ${c.role} at ${c.startup}`, date: todayStr(),
        body: `Hi ${c.name.split(' ')[0]},\n\nGreat news — all your onboarding documents have been reviewed and approved. You're all set for your internship to begin.\n\nBest,\nQSTP People Ops`,
      });
      updateInboxBadge();
      renderDocuments();
      showToast(`All documents approved for ${c.name}.`);
    });
  }
}

// ============================================================
//  PAGE: Inbox (QSTP Admin) — simulated LLM inbox scanning
// ============================================================
const EMAIL_TYPE_META = {
  'offer-acceptance':   { label: 'Offer Accepted',      color: 'green',  icon: 'check' },
  'documents-required': { label: 'Documents Required',  color: 'violet', icon: 'doc' },
  'documents-reminder': { label: 'Documents Reminder',  color: 'amber',  icon: 'clock' },
  'interview-scheduled': { label: 'Interview Scheduled', color: 'blue',  icon: 'calendar' },
  'general':            { label: 'Message',             color: 'blue',   icon: 'chat' },
};

// perspective: 'qstp' (default, QSTP Inbox) | 'candidate' (an intern reading their own inbox)
// The same email object reads as "Received" or "Sent" differently depending on who's looking at it.
function emailListHtml(list, perspective = 'qstp') {
  if (!list.length) return `<div class="insights-empty">No emails yet.</div>`;
  return list.map(e => {
    const c = candidates.find(x => x.id === e.candidateId);
    const typeMeta = EMAIL_TYPE_META[e.type] || { label: e.type, color: 'blue', icon: 'chat' };
    const isInbound = e.direction === 'inbound'; // inbound = candidate -> QSTP
    const isReceivedByViewer = perspective === 'candidate' ? !isInbound : isInbound;
    const unprocessed = perspective === 'qstp' && isInbound && !e.processed;
    const isUnread = perspective === 'candidate' && isReceivedByViewer && e.read === false;
    const partyLabel = perspective === 'candidate'
      ? (isInbound ? 'You' : 'QSTP Team')
      : (c ? c.name : (isInbound ? e.from : e.to));
    return `
      <details class="email-item ${unprocessed ? 'email-item--unprocessed' : ''}">
        <summary class="email-item__summary">
          <div class="email-item__dot email-item__dot--${typeMeta.color}">${icons[typeMeta.icon] || icons.chat}</div>
          <div class="email-item__main">
            <div class="email-item__top">
              <span class="email-item__party">${partyLabel}</span>
              <span class="pill ${isReceivedByViewer ? 'applied' : 'onboarding'}" style="font-size:10.5px;padding:3px 8px">${isReceivedByViewer ? 'Received' : 'Sent'}</span>
              <span class="pill ${typeMeta.color === 'green' ? 'hired' : typeMeta.color === 'amber' ? 'offer' : 'screening'}" style="font-size:10.5px;padding:3px 8px">${typeMeta.label}</span>
              ${unprocessed ? `<span class="pill offer" style="font-size:10.5px;padding:3px 8px">Needs AI review</span>` : ''}
              ${isUnread ? `<span class="pill offer" style="font-size:10.5px;padding:3px 8px">New</span>` : ''}
            </div>
            <div class="email-item__subject">${escapeHtml(e.subject)}</div>
          </div>
          <div class="email-item__date">${e.date}</div>
        </summary>
        <div class="email-item__body">
          <div style="font-size:11.5px;color:var(--neutral-400);margin-bottom:10px">From: ${escapeHtml(e.from)}<br>To: ${escapeHtml(e.to)}</div>
          ${escapeHtml(e.body).replace(/\n/g, '<br>')}
        </div>
      </details>`;
  }).join('');
}

function renderInbox() {
  if (currentRole === 'intern') return renderInternInbox();

  const unprocessed = emails.filter(e => e.direction === 'inbound' && !e.processed);

  content.innerHTML = `
    <div class="page-head" style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap">
      <div>
        <h1 class="page-title">QSTP Inbox</h1>
        <p class="page-subtitle">${emails.length} email${emails.length !== 1 ? 's' : ''} · ${unprocessed.length} awaiting AI review</p>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn-ghost btn-sm btn-outline" id="composeEmailBtn">${icons.chat} Compose Email</button>
        <button class="btn-ghost btn-sm btn-outline" id="sendReminders">${icons.clock} Send Reminders</button>
        <button class="btn-primary btn-sm" id="scanInboxBtn">${icons.sparkles} Scan Inbox (AI)</button>
      </div>
    </div>
    ${unprocessed.length ? `
      <div class="callout callout--amber">
        <div class="callout__icon">${icons.sparkles}</div>
        <div>
          <div class="callout__title">${unprocessed.length} email${unprocessed.length !== 1 ? 's' : ''} need AI review</div>
          <div class="callout__text">Run the AI scan to detect offer acceptances and automatically send "Documents Required" emails to those candidates.</div>
        </div>
      </div>` : ''}
    <section class="section">
      <div class="section__head">
        <div>
          <div class="section__title">All Emails</div>
          <div class="section__sub">Inbound replies and outbound notifications, most recent first</div>
        </div>
        <span class="pill ${unprocessed.length ? 'offer' : 'applied'}">${unprocessed.length} unprocessed</span>
      </div>
      <div class="email-list">${emailListHtml(emails, 'qstp')}</div>
    </section>`;

  $('#scanInboxBtn').addEventListener('click', scanInboxWithAI);
  $('#sendReminders').addEventListener('click', sendDocumentReminders);
  $('#composeEmailBtn').addEventListener('click', () => openComposeEmailModal());
}

// ---------- Intern's personal inbox — the other side of the same conversation ----------
function renderInternInbox() {
  const r = roleConfig();
  const c = candidates.find(x => x.id === r.internId);
  const mine = c ? emails.filter(e => e.candidateId === c.id) : [];
  const unreadCount = mine.filter(e => e.direction === 'outbound' && e.read === false).length;

  content.innerHTML = `
    <div class="page-head" style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap">
      <div>
        <h1 class="page-title">My Inbox</h1>
        <p class="page-subtitle">${mine.length} email${mine.length !== 1 ? 's' : ''} with QSTP${c ? ` · ${c.role} at ${c.startup}` : ''}</p>
      </div>
      <button class="btn-primary btn-sm" id="composeToQstpBtn">${icons.chat} Message QSTP</button>
    </div>
    ${unreadCount ? `
      <div class="callout callout--amber">
        <div class="callout__icon">${icons.sparkles}</div>
        <div>
          <div class="callout__title">${unreadCount} new email${unreadCount !== 1 ? 's' : ''} from QSTP</div>
          <div class="callout__text">Open a message below to read it.</div>
        </div>
      </div>` : ''}
    <section class="section">
      <div class="section__head">
        <div>
          <div class="section__title">Conversation with QSTP</div>
          <div class="section__sub">Offers, document requests, and messages from the QSTP team</div>
        </div>
      </div>
      <div class="email-list">${mine.length ? emailListHtml(mine, 'candidate') : `<div class="insights-empty">No emails yet — QSTP hasn't messaged you.</div>`}</div>
    </section>`;

  const composeBtn = $('#composeToQstpBtn');
  if (composeBtn) composeBtn.addEventListener('click', openInternComposeModal);

  // Reading the inbox marks QSTP's messages to this intern as read.
  let changed = false;
  mine.forEach(e => { if (e.direction === 'outbound' && e.read === false) { e.read = true; changed = true; } });
  if (changed) updateInboxBadge();
}

// ---------- Compose Email (QSTP → any candidate) ----------
function openComposeEmailModal(presetCandidateId) {
  if (!candidates.length) return;
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  const options = candidates.map(c => `<option value="${c.id}" ${presetCandidateId === c.id ? 'selected' : ''}>${escapeHtml(c.name)} — ${escapeHtml(c.role)} at ${escapeHtml(c.startup)}</option>`).join('');
  overlay.innerHTML = `
    <div class="modal modal--wide">
      <div class="modal__head">
        <div>
          <div class="modal__title">Compose Email</div>
          <div class="modal__sub">Send a message to a candidate from qstp-admissions@qstp.org</div>
        </div>
        <button class="modal__close" id="closeCompose">&times;</button>
      </div>
      <div class="modal__body">
        <div class="form-group">
          <label>To</label>
          <select id="composeCandidate">${options}</select>
        </div>
        <div class="form-group">
          <label>Subject</label>
          <input type="text" id="composeSubject" placeholder="e.g. Update on your application" />
        </div>
        <div class="form-group">
          <label>Message</label>
          <textarea id="composeBody" rows="6" placeholder="Write your message…"></textarea>
        </div>
      </div>
      <div class="modal__foot">
        <button class="btn-ghost" id="cancelCompose">Cancel</button>
        <button class="btn-primary" id="sendComposeBtn" disabled>Send Email</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const subjectEl = overlay.querySelector('#composeSubject');
  const bodyEl = overlay.querySelector('#composeBody');
  const sendBtn = overlay.querySelector('#sendComposeBtn');
  function updateSend() {
    sendBtn.disabled = !(subjectEl.value.trim() && bodyEl.value.trim());
  }
  subjectEl.addEventListener('input', updateSend);
  bodyEl.addEventListener('input', updateSend);
  overlay.querySelector('#closeCompose').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#cancelCompose').addEventListener('click', () => overlay.remove());
  sendBtn.addEventListener('click', () => {
    const candidateId = Number(overlay.querySelector('#composeCandidate').value);
    const c = candidates.find(x => x.id === candidateId);
    if (!c) return;
    queueEmail({
      direction: 'outbound', candidateId: c.id, type: 'general', processed: true,
      from: 'qstp-admissions@qstp.org', to: `${c.name} <${emailSlug(c.name)}@student.edu>`,
      subject: subjectEl.value.trim(), date: todayStr(), body: bodyEl.value.trim(),
    });
    logActivity('doc', `Email sent to <strong>${c.name}</strong>: "${escapeHtml(subjectEl.value.trim())}"`);
    overlay.remove();
    updateInboxBadge();
    renderInbox();
    showToast(`Email sent to ${c.name}. Switch to the Intern role to see it arrive in their inbox.`);
  });
}

// ---------- Intern composing a message back to QSTP ----------
function openInternComposeModal() {
  const r = roleConfig();
  const c = candidates.find(x => x.id === r.internId);
  if (!c) return;
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal modal--wide">
      <div class="modal__head">
        <div>
          <div class="modal__title">Message QSTP</div>
          <div class="modal__sub">Sending as ${escapeHtml(c.name)} &lt;${emailSlug(c.name)}@student.edu&gt;</div>
        </div>
        <button class="modal__close" id="closeInternCompose">&times;</button>
      </div>
      <div class="modal__body">
        <div class="form-group">
          <label>Subject</label>
          <input type="text" id="internSubject" placeholder="e.g. Question about my onboarding" />
        </div>
        <div class="form-group">
          <label>Message</label>
          <textarea id="internBody" rows="6" placeholder="Write your message to the QSTP team…"></textarea>
        </div>
      </div>
      <div class="modal__foot">
        <button class="btn-ghost" id="cancelInternCompose">Cancel</button>
        <button class="btn-primary" id="sendInternComposeBtn" disabled>Send Email</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const subjectEl = overlay.querySelector('#internSubject');
  const bodyEl = overlay.querySelector('#internBody');
  const sendBtn = overlay.querySelector('#sendInternComposeBtn');
  function updateSend() {
    sendBtn.disabled = !(subjectEl.value.trim() && bodyEl.value.trim());
  }
  subjectEl.addEventListener('input', updateSend);
  bodyEl.addEventListener('input', updateSend);
  overlay.querySelector('#closeInternCompose').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#cancelInternCompose').addEventListener('click', () => overlay.remove());
  sendBtn.addEventListener('click', () => {
    queueEmail({
      direction: 'inbound', candidateId: c.id, type: 'general', processed: true,
      from: `${c.name} <${emailSlug(c.name)}@student.edu>`, to: 'qstp-admissions@qstp.org',
      subject: subjectEl.value.trim(), date: todayStr(), body: bodyEl.value.trim(),
    });
    logActivity('doc', `<strong>${c.name}</strong> sent a message to QSTP`);
    overlay.remove();
    renderInternInbox();
    showToast('Message sent to QSTP. Switch to the QSTP Admin role to see it in their inbox.');
  });
}

// Unread badge on the sidebar Inbox item — only meaningful for the Intern role right now,
// since that's the role reading mail sent *to* them.
function updateInboxBadge() {
  const navInbox = document.querySelector('.nav-item[data-page="inbox"]');
  if (navInbox) {
    let badge = navInbox.querySelector('.nav-badge');
    let count = 0;
    if (currentRole === 'intern') {
      const r = roleConfig();
      count = emails.filter(e => e.candidateId === r.internId && e.direction === 'outbound' && e.read === false).length;
    }
    if (count > 0) {
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'nav-badge';
        navInbox.appendChild(badge);
      }
      badge.textContent = String(count);
    } else if (badge) {
      badge.remove();
    }
  }
  updateNotifBadge();
}

// ============================================================
//  Notification Center (bell icon) — latest activity + latest emails,
//  scoped to whichever role is currently active.
// ============================================================
function emailsForRole() {
  if (currentRole === 'intern') {
    const r = roleConfig();
    return emails.filter(e => e.candidateId === r.internId);
  }
  if (currentRole === 'startup') {
    const r = roleConfig();
    return emails.filter(e => {
      const c = candidates.find(x => x.id === e.candidateId);
      return c && c.startup === r.startup;
    });
  }
  return emails; // qstp sees everything
}

function notifUnreadCount() {
  if (currentRole === 'intern') {
    const r = roleConfig();
    return emails.filter(e => e.candidateId === r.internId && e.direction === 'outbound' && e.read === false).length;
  }
  return activities.filter(a => !a.read).length;
}

function updateNotifBadge() {
  const badge = $('#notifBadge');
  if (!badge) return;
  const count = notifUnreadCount();
  if (count > 0) {
    badge.textContent = count > 9 ? '9+' : String(count);
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

function notifActivityItemHtml(a) {
  return `
    <button class="notif-item ${!a.read ? 'unread' : ''}" data-notif-activity="${a.id}">
      <div class="notif-item__dot ${a.color}">${icons[a.type] || icons.apply}</div>
      <div class="notif-item__body">
        <div class="notif-item__text">${a.text}</div>
        <div class="notif-item__meta">${a.time}</div>
      </div>
      ${!a.read ? '<div class="notif-item__unreadmark"></div>' : ''}
    </button>`;
}

function notifEmailItemHtml(e, perspective) {
  const c = candidates.find(x => x.id === e.candidateId);
  const typeMeta = EMAIL_TYPE_META[e.type] || { label: e.type, color: 'blue', icon: 'chat' };
  const isUnread = perspective === 'candidate' && e.direction === 'outbound' && e.read === false;
  const who = perspective === 'candidate' ? (e.direction === 'outbound' ? 'QSTP Team' : 'You') : (c ? c.name : e.from);
  return `
    <button class="notif-item ${isUnread ? 'unread' : ''}" data-notif-email="${e.id}">
      <div class="notif-item__dot ${typeMeta.color}">${icons[typeMeta.icon] || icons.chat}</div>
      <div class="notif-item__body">
        <div class="notif-item__text"><strong>${escapeHtml(who)}</strong> — ${escapeHtml(e.subject)}</div>
        <div class="notif-item__meta">${e.date} · ${typeMeta.label}</div>
      </div>
      ${isUnread ? '<div class="notif-item__unreadmark"></div>' : ''}
    </button>`;
}

function notifPanelHtml() {
  const perspective = currentRole === 'intern' ? 'candidate' : 'qstp';
  const recentActivity = activities.slice(0, 6);
  const recentEmails = emailsForRole().slice(0, 6);
  const unreadCount = notifUnreadCount();

  const activitySection = currentRole === 'intern' ? '' : `
    <div class="notif-panel__section-label">Latest Activity</div>
    ${recentActivity.length ? recentActivity.map(notifActivityItemHtml).join('') : `<div class="notif-panel__empty">Nothing new yet.</div>`}`;

  const emailSection = `
    <div class="notif-panel__section-label">${currentRole === 'intern' ? 'Messages from QSTP' : 'Recent Emails'}</div>
    ${recentEmails.length ? recentEmails.map(e => notifEmailItemHtml(e, perspective)).join('') : `<div class="notif-panel__empty">No emails yet.</div>`}`;

  return `
    <div class="notif-panel__head">
      <div class="notif-panel__title">Notifications</div>
      <button class="notif-panel__mark" id="notifMarkAll" ${unreadCount ? '' : 'disabled'}>Mark all as read</button>
    </div>
    <div class="notif-panel__list">
      ${activitySection}
      ${emailSection}
    </div>
    <div class="notif-panel__foot">
      <button id="notifViewInbox">${icons.inbox} Open Inbox</button>
    </div>`;
}

function renderNotifPanel() {
  const panel = $('#notifPanel');
  if (!panel) return;
  panel.innerHTML = notifPanelHtml();

  panel.querySelectorAll('[data-notif-activity]').forEach(btn => {
    btn.addEventListener('click', () => {
      const a = activities.find(x => x.id === Number(btn.dataset.notifActivity));
      if (a) a.read = true;
      updateNotifBadge();
      $('#notifPanel').classList.remove('show');
      navigate('candidates');
    });
  });
  panel.querySelectorAll('[data-notif-email]').forEach(btn => {
    btn.addEventListener('click', () => {
      const e = emails.find(x => x.id === Number(btn.dataset.notifEmail));
      if (e && e.direction === 'outbound') e.read = true;
      updateInboxBadge();
      $('#notifPanel').classList.remove('show');
      navigate(currentRole === 'intern' ? 'inbox' : (ROLE_PAGES[currentRole].includes('inbox') ? 'inbox' : 'candidates'));
    });
  });
  const markAllBtn = $('#notifMarkAll');
  if (markAllBtn) markAllBtn.addEventListener('click', () => {
    activities.forEach(a => { a.read = true; });
    if (currentRole === 'intern') {
      const r = roleConfig();
      emails.forEach(e => { if (e.candidateId === r.internId && e.direction === 'outbound') e.read = true; });
    }
    updateInboxBadge();
    renderNotifPanel();
  });
  const viewInboxBtn = $('#notifViewInbox');
  if (viewInboxBtn) viewInboxBtn.addEventListener('click', () => {
    $('#notifPanel').classList.remove('show');
    navigate(ROLE_PAGES[currentRole].includes('inbox') ? 'inbox' : 'candidates');
  });
}

// Simulated LLM pass over the inbox: detects offer-acceptance emails and
// automatically sends the "Documents Required" email for each candidate.
function scanInboxWithAI() {
  const btn = $('#scanInboxBtn');
  if (btn) { btn.disabled = true; btn.innerHTML = `${icons.sparkles} Scanning inbox…`; }

  setTimeout(() => {
    const unprocessed = emails.filter(e => e.direction === 'inbound' && e.type === 'offer-acceptance' && !e.processed);
    let sent = 0;

    unprocessed.forEach(e => {
      e.processed = true;
      const c = candidates.find(x => x.id === e.candidateId);
      if (!c || c.status === 'Documents' || c.status === 'Internship Started') return;

      if (c.status === 'Offer') {
        c.status = 'Accepted';
        c.stage = STAGES.indexOf('Accepted');
        c.timeline.push({ stage: 'Accepted', date: todayStr(), person: 'Talent Lead', notes: 'Candidate accepted the offer (via email).' });
      }

      c.status = 'Documents';
      c.stage = STAGES.indexOf('Documents');
      if (!c.documents) {
        c.documents = [
          { name: 'Offer Letter',      status: 'Pending' },
          { name: 'NDA',               status: 'Pending' },
          { name: 'Internship Agreement', status: 'Pending' },
          { name: 'ID Copy',           status: 'Pending' },
          { name: 'Bank Details',      status: 'Pending' },
          { name: 'Emergency Contact', status: 'Pending' },
        ];
      }
      c.timeline.push({ stage: 'Documents', date: todayStr(), person: 'People Ops', notes: 'AI scan detected offer acceptance — Documents Required email sent automatically.' });

      queueEmail({
        direction: 'outbound', candidateId: c.id, type: 'documents-required',
        from: 'qstp-onboarding@qstp.org', to: `${c.name} <${emailSlug(c.name)}@student.edu>`,
        subject: `Documents Required — ${c.role} at ${c.startup}`, date: todayStr(),
        body: `Hi ${c.name.split(' ')[0]},\n\nCongratulations again on accepting your offer! To complete your onboarding, please submit the following documents:\n- Offer Letter\n- NDA\n- Internship Agreement\n- ID Copy\n- Bank Details\n- Emergency Contact\n\nBest,\nQSTP People Ops`,
      });
      logActivity('doc', `AI scan detected <strong>${c.name}</strong> accepted the offer — Documents Required email sent automatically`);
      sent++;
    });

    renderInbox();
    showToast(sent ? `AI scan complete — ${sent} "Documents Required" email${sent !== 1 ? 's' : ''} sent automatically.` : 'AI scan complete — no new offer acceptances found.');
  }, 650);
}

// Sends a "Documents Required Reminder" email to every candidate in the
// Documents stage who still has at least one document not yet submitted.
function sendDocumentReminders() {
  const targets = candidates.filter(c => c.status === 'Documents' && c.documents && c.documents.some(d => d.status === 'Pending'));

  targets.forEach(c => {
    const missing = c.documents.filter(d => d.status === 'Pending').map(d => d.name);
    queueEmail({
      direction: 'outbound', candidateId: c.id, type: 'documents-reminder',
      from: 'qstp-onboarding@qstp.org', to: `${c.name} <${emailSlug(c.name)}@student.edu>`,
      subject: `Documents Required Reminder — ${c.role} at ${c.startup}`, date: todayStr(),
      body: `Hi ${c.name.split(' ')[0]},\n\nThis is a friendly reminder that we're still waiting on the following onboarding documents:\n- ${missing.join('\n- ')}\n\nPlease submit these as soon as possible so we can proceed with your internship start date.\n\nBest,\nQSTP People Ops`,
    });
    logActivity('doc', `Reminder email sent to <strong>${c.name}</strong> — ${missing.length} document${missing.length !== 1 ? 's' : ''} outstanding`);
  });

  showToast(targets.length ? `Reminder sent to ${targets.length} candidate${targets.length !== 1 ? 's' : ''}.` : 'All candidates have submitted their documents — no reminders needed.');
  renderInbox();
}

// ============================================================
//  PAGE: Analytics
// ============================================================
function renderAnalytics() {
  const list = visibleCandidates();
  const counts = {};
  STAGES.forEach(s => counts[s] = 0);
  let rejected = 0;
  list.forEach(c => {
    if (c.status === 'Rejected') rejected++;
    else counts[STAGES[c.stage]] = (counts[STAGES[c.stage]] || 0) + 1;
  });

  // Funnel chart (horizontal bars)
  const maxCount = Math.max(...STAGES.map(s => counts[s]), 1);
  const funnelChart = STAGES.map((s, i) => {
    const cnt = counts[s];
    const pct = (cnt / maxCount) * 100;
    const meta = STAGE_META[s];
    return `
      <div class="a-funnel-row">
        <div class="a-funnel__label">${s}</div>
        <div class="a-funnel__bar-wrap">
          <div class="a-funnel__bar" style="width:${Math.max(pct, cnt ? 6 : 0)}%; background:${meta.color}"></div>
        </div>
        <div class="a-funnel__val">${cnt}</div>
      </div>`;
  }).join('');

  // Conversion rate: hired / total nominated
  const total = list.length;
  const hired = counts['Internship Started'];
  const conversion = total ? Math.round((hired / total) * 1000) / 10 : 0;

  // Acceptance rate: accepted+documents+started / offers made (offer+accepted+documents+started)
  const offersMade = counts['Offer'] + counts['Accepted'] + counts['Documents'] + counts['Internship Started'];
  const accepted = counts['Accepted'] + counts['Documents'] + counts['Internship Started'];
  const acceptance = offersMade ? Math.round((accepted / offersMade) * 1000) / 10 : 0;

  // Avg hiring time (mock-ish computed from timeline days)
  const completed = list.filter(c => c.status === 'Internship Started');
  let avgDays = 0;
  if (completed.length) {
    const days = completed.map(c => {
      const first = c.timeline[0];
      const last = c.timeline[c.timeline.length - 1];
      const d1 = new Date('2026 ' + first.date + ' 01');
      const d2 = new Date('2026 ' + last.date + ' 01');
      return Math.max(1, Math.round((d2 - d1) / 86400000));
    });
    avgDays = Math.round(days.reduce((a, b) => a + b, 0) / days.length);
  }

  // Waiting candidates (in interview or feedback stage)
  const waiting = counts['Interview'] + counts['Feedback'];

  // Donut for acceptance
  const accDeg = (acceptance / 100) * 360;
  const donut = `<div class="donut" style="background:conic-gradient(var(--success-500) ${accDeg}deg, var(--neutral-200) 0deg)">
    <div class="donut__hole"><div class="donut__val">${acceptance}%</div><div class="donut__label">Acceptance</div></div>
  </div>`;

  const convDeg = (conversion / 100) * 360;
  const convDonut = `<div class="donut" style="background:conic-gradient(var(--primary-500) ${convDeg}deg, var(--neutral-200) 0deg)">
    <div class="donut__hole"><div class="donut__val">${conversion}%</div><div class="donut__label">Conversion</div></div>
  </div>`;

  content.innerHTML = `
    <div class="page-head">
      <h1 class="page-title">Analytics</h1>
      <p class="page-subtitle">Insights and trends across your hiring funnel</p>
    </div>
    <div class="analytics-grid">
      <section class="section a-card a-card--wide">
        <div class="section__head"><div><div class="section__title">Hiring Funnel</div><div class="section__sub">Candidates at each stage</div></div></div>
        <div class="a-funnel">${funnelChart}</div>
      </section>
      <section class="section a-card">
        <div class="section__head"><div><div class="section__title">Conversion Rate</div><div class="section__sub">Nominated → Hired</div></div></div>
        <div class="a-center">${convDonut}</div>
        <div class="a-center-meta">${hired} of ${total} candidates hired</div>
      </section>
      <section class="section a-card">
        <div class="section__head"><div><div class="section__title">Acceptance Rate</div><div class="section__sub">Offer → Accepted</div></div></div>
        <div class="a-center">${donut}</div>
        <div class="a-center-meta">${accepted} of ${offersMade} offers accepted</div>
      </section>
      <section class="section a-card">
        <div class="section__head"><div><div class="section__title">Average Hiring Time</div><div class="section__sub">From nomination to start</div></div></div>
        <div class="a-big-stat">
          <div class="a-big-stat__val">${avgDays || '—'}</div>
          <div class="a-big-stat__unit">days</div>
        </div>
        <div class="a-center-meta">Across ${completed.length} completed hires</div>
      </section>
      <section class="section a-card">
        <div class="section__head"><div><div class="section__title">Candidates Waiting</div><div class="section__sub">In interview or feedback</div></div></div>
        <div class="a-big-stat">
          <div class="a-big-stat__val">${waiting}</div>
          <div class="a-big-stat__unit">candidates</div>
        </div>
        <div class="a-center-meta">${counts['Interview']} in interview · ${counts['Feedback']} awaiting feedback</div>
      </section>
      <section class="section a-card a-card--wide">
        <div class="section__head">
          <div><div class="section__title" style="display:flex;align-items:center;gap:8px">${icons.sparkles} AI Insights</div><div class="section__sub">Rule-based recommendations</div></div>
        </div>
        <div class="insights-list">
          ${generateInsights().filter(i => list.some(c => c.id === i.candidateId)).map(i => `
            <div class="insight-item insight-${i.severity}">
              <div class="insight-dot"></div>
              <div class="insight-body">
                <div class="insight-text">${i.text}</div>
                <div class="insight-meta">${i.meta}</div>
              </div>
            </div>`).join('') || '<div class="insights-empty">No actions needed right now.</div>'}
        </div>
      </section>
    </div>`;
}

// ============================================================
//  AI Insights (rule-based)
// ============================================================
function generateInsights() {
  const out = [];
  candidates.forEach(c => {
    // Waiting for interview feedback
    if (c.status === 'Interview' && !c.feedback) {
      out.push({ candidateId: c.id, severity: 'warning', text: `<strong>${c.name}</strong> is waiting for interview feedback`, meta: `Interview stage · ${c.startup}` });
    }
    if (c.status === 'Feedback' && c.feedback && c.feedback.decision === 'Hold') {
      out.push({ candidateId: c.id, severity: 'warning', text: `<strong>${c.name}</strong> is on hold after feedback`, meta: `Decision: Hold · needs follow-up` });
    }
    // Missing documents
    if (c.status === 'Documents' && c.documents) {
      const missing = c.documents.filter(d => d.status !== 'Approved').length;
      if (missing > 0) {
        out.push({ candidateId: c.id, severity: 'info', text: `<strong>${c.name}</strong> has ${missing} document${missing > 1 ? 's' : ''} not yet approved`, meta: `Onboarding · ${missing} of ${c.documents.length} pending` });
      }
    }
    // Offer pending
    if (c.status === 'Offer') {
      out.push({ candidateId: c.id, severity: 'info', text: `Offer pending for <strong>${c.name}</strong>`, meta: `Awaiting acceptance · ${c.startup}` });
    }
    // Onboarding incomplete
    if (c.status === 'Accepted') {
      out.push({ candidateId: c.id, severity: 'warning', text: `Onboarding incomplete for <strong>${c.name}</strong>`, meta: `Accepted · documents not started` });
    }
    // Rejected but no feedback note
    if (c.status === 'Rejected' && !c.feedback) {
      out.push({ candidateId: c.id, severity: 'danger', text: `<strong>${c.name}</strong> rejected without recorded feedback`, meta: `Process gap` });
    }
  });
  return out;
}

// ============================================================
//  Toast
// ============================================================
function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2800);
}

// ============================================================
//  Navigation
// ============================================================
// ============================================================
//  PAGE: Guide (How to use the platform)
// ============================================================
const STAGE_GUIDE_INFO = {
  'Nomination': {
    description: 'A candidate enters the pipeline — nominated by a career fair, referral, portal application, or direct sourcing for a specific host startup and role.',
    points: [
      'The Talent Sourcer logs the candidate, target startup, and role',
      'Nothing has happened with the host startup yet — this is just the intake',
    ],
  },
  'Startup Review': {
    description: 'The host startup\'s Startup Lead reviews the candidate\'s background against the role before committing to an interview.',
    points: [
      'Startup Lead screens CV/portfolio for fit',
      'Once approved, QSTP schedules the interview and the candidate is notified by email',
    ],
  },
  'Interview': {
    description: 'The candidate meets the host startup for a structured interview — technical, behavioral, panel, or take-home — based on the role.',
    points: [
      'Date, time, format, type, and interviewer are all recorded, not just a status label',
      'The candidate automatically receives an email with the full interview details',
    ],
  },
  'Feedback': {
    description: 'Right after the interview, the Hiring Manager submits a rating, written comments, and a Hire / Reject decision.',
    points: [
      'A Hire decision moves the candidate to Offer with a generated offer letter preview',
      'A Reject decision moves them to a terminal Rejected status with an automatic rejection email',
    ],
  },
  'Offer': {
    description: 'QSTP\'s Talent Lead sends a formal offer for the specific role and startup, and the candidate reviews it.',
    points: [
      'The candidate typically replies by email to accept',
      'The AI Inbox scan detects an acceptance reply and advances the candidate automatically',
    ],
  },
  'Accepted': {
    description: 'The offer has been accepted — onboarding officially begins and ownership shifts to People Ops.',
    points: [
      'A "Documents Required" email goes out automatically with the checklist',
      'No more informal chasing — every requirement is now a tracked checklist item',
    ],
  },
  'Documents': {
    description: 'People Ops collects and approves onboarding paperwork: Offer Letter, NDA, Internship Agreement, ID, bank details, emergency contact.',
    points: [
      'Startups and candidates get visibility, but only QSTP can approve a document',
      'Reminder emails go out automatically for anything still pending',
    ],
  },
  'Internship Started': {
    description: 'All documents are approved and the candidate has begun their internship — the funnel is complete.',
    points: [
      'This is the terminal success state, with a full paper trail behind it',
      'Candidate, startup, and QSTP all have a shared, structured record of how they got here',
    ],
  },
};

const GUIDE_CONTENT = {
  qstp: {
    label: 'QSTP Admin',
    intro: 'You have full visibility across every startup, candidate and stage. Use this view to keep the whole cycle moving and to step in wherever things stall.',
    steps: [
      { title: 'Check the Dashboard first', text: 'Start each day on <strong>Dashboard</strong> — it shows totals across all startups, a Pipeline Snapshot pie chart, AI Insights, and a Delayed Stages table for anything past its SLA.' },
      { title: 'Browse and filter Candidates', text: 'Open <strong>Candidates</strong> to search or filter by stage/status across every startup and role.' },
      { title: 'Manage an individual funnel', text: 'Click "View Funnel" on any candidate to <strong>Schedule an Interview</strong> once Startup Review is done, submit interview feedback, or advance them to the next stage.' },
      { title: 'Approve onboarding Documents', text: 'Once a candidate accepts an offer, open <strong>Documents</strong> to mark files uploaded and approve them one by one — or use <strong>Approve All</strong> to clear every remaining file in one click when everything arrived together (e.g. one email with all attachments). Start the internship once the checklist is complete. Approval is a People Ops (QSTP) responsibility — startups and candidates only get visibility, not approval rights.' },
      { title: 'Review the Inbox', text: 'The <strong>Inbox</strong> shows incoming emails (like offer acceptances) auto-detected and matched to a candidate — and lets you <strong>Compose</strong> a message to any candidate directly. Scheduling an interview or sending documents also queues a real email here.' },
      { title: 'Watch the trends in Analytics', text: 'Use <strong>Analytics</strong> for conversion rate, acceptance rate, average hiring time, and stage-by-stage counts.' },
    ],
  },
  startup: {
    label: 'Startup Lead',
    intro: 'You see only the candidates nominated to your startup. Use this view to review, interview, and give feedback quickly so candidates don\'t stall waiting on you.',
    steps: [
      { title: 'Check your Dashboard', text: 'It highlights candidates <strong>Awaiting Your Feedback</strong> after an interview and any <strong>Offers</strong> still pending a response.' },
      { title: 'Review your Candidates', text: 'Open <strong>Candidates</strong> to see everyone nominated to your startup and their current stage.' },
      { title: 'Submit feedback and advance stages', text: 'From a candidate\'s funnel page, submit interview feedback (rating, comment, hire/reject decision) and move them forward when ready.' },
      { title: 'Check onboarding status', text: 'Once a candidate accepts, <strong>Documents</strong> shows a read-only view of their checklist for your own candidates only — approving files stays with QSTP\'s People Ops team.' },
      { title: 'Check your Analytics', text: 'See conversion and acceptance rates for candidates assigned to your startup.' },
    ],
  },
  intern: {
    label: 'Intern',
    intro: 'This is your application view — you can only see and act on your own candidacy.',
    steps: [
      { title: 'Track your status', text: 'Your <strong>Dashboard</strong> ("My Application") shows your current stage, your full timeline, and any interview feedback once it\'s shared.' },
      { title: 'Respond to an offer', text: 'If you receive an offer, use the <strong>Accept Offer</strong> button — it notifies QSTP automatically.' },
      { title: 'Upload onboarding documents', text: 'Once you\'ve accepted, the <strong>Onboarding Checklist</strong> section appears right on your Dashboard — upload each required file there. QSTP\'s People Ops team reviews and approves them; you can\'t self-approve.' },
      { title: 'Check your Inbox', text: 'Your <strong>Inbox</strong> shows every email exchanged with QSTP — offers, document requests, reminders — and lets you message QSTP directly.' },
    ],
  },
};

function pipelineStepperHtml(activeStage) {
  return STAGES.map((label, i) => {
    const meta = STAGE_META[label];
    const isActive = label === activeStage;
    return `
      <button class="pipeline-step ${isActive ? 'active' : ''}" data-stage="${label}" style="--stage-color:${meta.color}">
        <div class="pipeline-step__row">
          <div class="pipeline-step__circle-wrap">
            <div class="pipeline-step__circle">${icons[meta.icon] || icons.doc}</div>
            <div class="pipeline-step__index">${i + 1}</div>
          </div>
          ${i < STAGES.length - 1 ? '<div class="pipeline-step__connector"></div>' : ''}
        </div>
        <div class="pipeline-step__label">${label}</div>
        <div class="pipeline-step__owner">${meta.person}</div>
      </button>`;
  }).join('');
}

function pipelineDetailHtml(stageName) {
  const meta = STAGE_META[stageName];
  const info = STAGE_GUIDE_INFO[stageName];
  const sla = STAGE_SLAS[stageName];
  return `
    <div class="pipeline-detail__card" style="--stage-color:${meta.color}">
      <div class="pipeline-detail__head">
        <div class="pipeline-detail__icon">${icons[meta.icon] || icons.doc}</div>
        <div>
          <div class="pipeline-detail__title">${stageName}</div>
          <div class="pipeline-detail__owner">Owned by ${meta.person}${sla ? ` · Target: ${sla} day${sla !== 1 ? 's' : ''}` : ' · Terminal stage'}</div>
        </div>
      </div>
      <p class="pipeline-detail__desc">${info.description}</p>
      <div class="pipeline-detail__list">
        ${info.points.map(p => `<div class="pipeline-detail__point">${icons.check}<span>${p}</span></div>`).join('')}
      </div>
    </div>`;
}

function guideStepsHtml(roleKey) {
  const g = GUIDE_CONTENT[roleKey];
  return `
    <p class="guide-tab-intro">${g.intro}</p>
    <div class="guide-steps">
      ${g.steps.map((s, i) => `
        <div class="guide-step">
          <div class="guide-step__num">${i + 1}</div>
          <div class="guide-step__body">
            <div class="guide-step__title">${s.title}</div>
            <div class="guide-step__text">${s.text}</div>
          </div>
        </div>`).join('')}
    </div>`;
}

const ROLE_ICON = { qstp: 'users', startup: 'rocket', intern: 'apply' };
const ROLE_COLOR = { qstp: '#2f6fed', startup: '#0fb9a8', intern: '#7c3aed' };

function roleGuideCardsHtml(activeTab) {
  return Object.keys(GUIDE_CONTENT).map(key => {
    const g = GUIDE_CONTENT[key];
    return `
      <div class="role-guide-card ${key === activeTab ? 'active' : ''}" data-guide-tab="${key}" style="--role-color:${ROLE_COLOR[key]}">
        <div class="role-guide-card__icon">${icons[ROLE_ICON[key]] || icons.users}</div>
        <div class="role-guide-card__label">${g.label}</div>
        <div class="role-guide-card__tagline">${g.intro}</div>
        <button class="role-guide-card__switch" data-switch-role="${key}" ${key === currentRole ? 'disabled style="opacity:.5;cursor:default"' : ''}>
          ${key === currentRole ? `${icons.check} Currently viewing this role` : `${icons.arrowRight} Try this role`}
        </button>
      </div>`;
  }).join('');
}

function renderGuide() {
  const activeTab = currentRole; // default to whichever role is currently active
  let selectedStage = 'Nomination';

  content.innerHTML = `
    <div class="page-head">
      <h1 class="page-title">Platform Guide</h1>
      <p class="page-subtitle">How the Hiring Funnel platform works, from nomination to Day 1</p>
    </div>

    <div class="guide-intro-banner">
      <div class="guide-intro-banner__icon">${icons.sparkles}</div>
      <div>
        <div class="guide-intro-banner__title">From chaos to clarity</div>
        <div class="guide-intro-banner__text">Every candidate follows the exact same 8-stage pipeline, no matter which startup they're headed to. Click any stage below to see what happens, who owns it, and what target turnaround it has.</div>
      </div>
    </div>

    <section class="section" style="margin-bottom:20px">
      <div class="section__head">
        <div>
          <div class="section__title">The Pipeline, Stage by Stage</div>
          <div class="section__sub">Click a stage to see what happens, who owns it, and its target SLA</div>
        </div>
      </div>
      <div class="pipeline-stepper" id="pipelineStepper">${pipelineStepperHtml(selectedStage)}</div>
      <div class="pipeline-branch">
        <span class="pipeline-branch__icon">${icons.reject}</span>
        <span>A candidate can be moved to <strong>Rejected</strong> at the Feedback stage — a terminal status tracked separately from the main flow, with an automatic rejection email.</span>
      </div>
      <div class="pipeline-detail" id="pipelineDetail">${pipelineDetailHtml(selectedStage)}</div>
    </section>

    <section class="section">
      <div class="section__head">
        <div>
          <div class="section__title">How to Use It, by Role</div>
          <div class="section__sub">Click a role card to read its walkthrough, or jump straight into that view</div>
        </div>
      </div>
      <div class="role-guide-grid" id="guideTabs">${roleGuideCardsHtml(activeTab)}</div>
      <div class="guide-tab-panel" id="guideTabPanel">${guideStepsHtml(activeTab)}</div>
    </section>

    <section class="section" style="margin-top:20px">
      <div class="section__head">
        <div>
          <div class="section__title" style="display:flex;align-items:center;gap:8px">${icons.sparkles} What's New</div>
          <div class="section__sub">Recently added to make the pipeline feel real</div>
        </div>
      </div>
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-card__top">
            <div class="feature-card__icon blue">${icons.chat}</div>
            <div class="feature-card__title">Two-way Email<span class="feature-card__badge">NEW</span></div>
          </div>
          <div class="feature-card__text">QSTP can message any candidate directly from the Inbox or a candidate's funnel page — and interns now have their own Inbox to read and reply.</div>
        </div>
        <div class="feature-card">
          <div class="feature-card__top">
            <div class="feature-card__icon violet">${icons.calendar}</div>
            <div class="feature-card__title">Interview Scheduling<span class="feature-card__badge">NEW</span></div>
          </div>
          <div class="feature-card__text">Startup Review now leads to a real Schedule Interview step — date, time, format, and interviewer are recorded, and the candidate is emailed automatically.</div>
        </div>
        <div class="feature-card">
          <div class="feature-card__top">
            <div class="feature-card__icon green">${icons.users}</div>
            <div class="feature-card__title">Structured Add Candidate<span class="feature-card__badge">NEW</span></div>
          </div>
          <div class="feature-card__text">Adding a candidate now opens a real form (name, university, startup, role) with visible confirmation — no more silent, random inserts.</div>
        </div>
        <div class="feature-card">
          <div class="feature-card__top">
            <div class="feature-card__icon amber">${icons.calendar}</div>
            <div class="feature-card__title">Upcoming Interviews</div>
          </div>
          <div class="feature-card__text">QSTP and Startup dashboards now surface a soonest-first list of scheduled interviews, so nothing gets missed.</div>
        </div>
      </div>
    </section>

    <section class="section" style="margin-top:20px">
      <div class="section__head">
        <div>
          <div class="section__title">Good to Know</div>
        </div>
      </div>
      <div class="insights-list">
        ${insightsListHtml([
          { severity: 'info', text: 'Rejections are handled automatically', meta: 'When a candidate is marked "Reject" at the Feedback stage, they move to a terminal Rejected status — no separate step needed.' },
          { severity: 'info', text: 'Delayed Stages use per-stage SLAs', meta: 'The Dashboard flags any candidate who has spent longer than expected at their current stage, so nothing sits unnoticed.' },
          { severity: 'info', text: 'AI Insights are rule-based', meta: 'Suggestions like "follow up" or "SLA at risk" are generated from stage timing and status, not a live model — a lightweight nudge, not a black box.' },
          { severity: 'info', text: 'Reset Demo restores sample data', meta: 'Use the "Reset Demo" button in the top bar to undo any changes made during a walkthrough, including emails and scheduled interviews.' },
        ])}
      </div>
    </section>`;

  // Pipeline stepper interactivity
  document.querySelectorAll('[data-stage]').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('[data-stage]').forEach(x => x.classList.toggle('active', x === b));
      $('#pipelineDetail').innerHTML = pipelineDetailHtml(b.dataset.stage);
    });
  });

  // Role guide cards — click card body to switch the walkthrough tab
  document.querySelectorAll('.role-guide-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('[data-switch-role]')) return; // handled separately below
      document.querySelectorAll('.role-guide-card').forEach(x => x.classList.toggle('active', x === card));
      $('#guideTabPanel').innerHTML = guideStepsHtml(card.dataset.guideTab);
    });
  });

  // "Try this role" — actually switches the active role
  document.querySelectorAll('[data-switch-role]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (btn.disabled) return;
      switchRole(btn.dataset.switchRole);
    });
  });
}

const pages = {
  dashboard: renderDashboard,
  candidates: renderCandidates,
  funnel: renderFunnel,
  documents: renderDocuments,
  inbox: renderInbox,
  analytics: renderAnalytics,
  guide: renderGuide,
};

// Pages visible per role
const ROLE_PAGES = {
  qstp:    ['dashboard', 'candidates', 'funnel', 'documents', 'inbox', 'analytics', 'guide'],
  startup: ['dashboard', 'candidates', 'funnel', 'documents', 'analytics', 'guide'],
  intern:  ['dashboard', 'funnel', 'inbox', 'guide'],
};

const navItems = document.querySelectorAll('.nav-item');
const sidebar = $('#sidebar');
const overlay = $('#sidebarOverlay');
const menuToggle = $('#menuToggle');

function applyRoleToNav() {
  const allowed = ROLE_PAGES[currentRole];
  navItems.forEach(n => {
    n.style.display = allowed.includes(n.dataset.page) ? '' : 'none';
  });
}

function navigate(page) {
  const allowed = ROLE_PAGES[currentRole];
  if (!allowed.includes(page)) page = 'dashboard';
  navItems.forEach(n => n.classList.toggle('active', n.dataset.page === page));
  (pages[page] || renderDashboard)();
  if (window.innerWidth <= 860) {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function bindNavButtons() {
  document.querySelectorAll('[data-nav]').forEach(b => {
    b.addEventListener('click', () => navigate(b.dataset.nav));
  });
}

navItems.forEach(n => n.addEventListener('click', e => {
  e.preventDefault();
  // Clicking the Funnel nav link should always return to the "pick a candidate" screen,
  // not silently keep showing whichever candidate was last opened via "View Funnel".
  if (n.dataset.page === 'funnel' && currentRole !== 'intern') {
    activeFunnelId = null;
  }
  navigate(n.dataset.page);
}));
menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
});
overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
});

// ---------- Role switcher ----------
const roleSwitcherBtn = $('#roleSwitcherBtn');
const roleSwitcherMenu = $('#roleSwitcherMenu');

function updateRoleDisplay() {
  const r = roleConfig();
  $('#roleAvatar').textContent = r.initials;
  $('#roleName').textContent = r.name;
  $('#roleLabel').textContent = r.label;
}

function switchRole(role) {
  currentRole = role;
  updateRoleDisplay();
  applyRoleToNav();
  updateInboxBadge();
  activeFunnelId = role === 'intern' ? ROLES.intern.internId : null;
  activeDocId = null;
  candidateFilter = { q: '', status: 'all' };
  roleSwitcherMenu.classList.remove('show');
  navigate('dashboard');
}

roleSwitcherBtn.addEventListener('click', e => {
  e.stopPropagation();
  notifPanel.classList.remove('show');
  roleSwitcherMenu.classList.toggle('show');
});
document.addEventListener('click', () => roleSwitcherMenu.classList.remove('show'));
roleSwitcherMenu.addEventListener('click', e => e.stopPropagation());
document.querySelectorAll('.role-option').forEach(b => {
  b.addEventListener('click', () => switchRole(b.dataset.role));
});

// ---------- Notification bell ----------
const notifBtn = $('#notifBtn');
const notifPanel = $('#notifPanel');
notifBtn.addEventListener('click', e => {
  e.stopPropagation();
  const willShow = !notifPanel.classList.contains('show');
  roleSwitcherMenu.classList.remove('show');
  notifPanel.classList.toggle('show', willShow);
  if (willShow) renderNotifPanel();
});
document.addEventListener('click', () => notifPanel.classList.remove('show'));
notifPanel.addEventListener('click', e => e.stopPropagation());

// ---------- Reset Demo ----------
function resetDemo() {
  if (!confirm('Reset all demo data to its initial state? Any changes made in this session will be lost.')) return;
  const snap = JSON.parse(INITIAL_STATE_JSON);
  candidates = snap.candidates;
  activities = snap.activities;
  emails = snap.emails;
  emailIdSeq = snap.emailIdSeq;
  activityIdSeq = snap.activityIdSeq;

  activeFunnelId = null;
  activeDocId = null;
  candidateFilter = { q: '', status: 'all' };
  currentRole = 'qstp';

  updateRoleDisplay();
  applyRoleToNav();
  updateInboxBadge();
  navigate('dashboard');
  showToast('Demo data has been reset.');
}
$('#resetDemoBtn').addEventListener('click', resetDemo);

// Initial load
applyRoleToNav();
updateRoleDisplay();
updateInboxBadge();
navigate('dashboard');
