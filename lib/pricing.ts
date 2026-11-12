/**
 * PRICING CONFIG
 *
 * Amounts in rupees are HIDDEN while HOURLY_RATE is null: the site then shows a project size (Small, Medium,
 * Large, Enterprise) only, and says that the price is negotiable and shared after a short call.
 * Hours are used internally to size a project and are never displayed.
 * To show amounts, set HOURLY_RATE to your real rate (INR per hour), for example 1200, and push.
 * The hours below are estimates based on real projects. Adjust them if they do not match your experience.
 */
export const HOURLY_RATE: number | null = null;
export const ESTIMATE_LOW = 0.9; // low end of the range = estimate x 0.9
export const ESTIMATE_HIGH = 1.15; // high end of the range = estimate x 1.15

export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
export const roundTo = (n: number, step: number) => Math.round(n / step) * step;

/** true only when a rate has been set; every amount on the site goes through these helpers */
export const hasRate = HOURLY_RATE !== null;
export const rateLabel = (): string | null => (HOURLY_RATE === null ? null : inr(HOURLY_RATE));
export const costOf = (hours: number): string | null => (HOURLY_RATE === null ? null : inr(hours * HOURLY_RATE));
export const costRange = (lo: number, hi: number): string | null =>
  HOURLY_RATE === null ? null : inr(roundTo(lo * HOURLY_RATE, 500)) + " to " + inr(roundTo(hi * HOURLY_RATE, 500));

export type ProjectType = { id: string; bestFor: string; name: string; hours: number; note: string; ref: string };
export const projectTypes: ProjectType[] = [
  {
    id: "landing",
    bestFor: "Small businesses",
    name: "Landing / brochure site",
    hours: 8,
    note: "1 to 5 pages, responsive and fast.",
    ref: "Reference: Siddhivinayak and Starlite, quick brochure-style builds.",
  },
  {
    id: "business",
    bestFor: "Growing companies",
    name: "Business website",
    hours: 30,
    note: "Up to about 10 pages, contact form, SEO basics and smooth interactions.",
    ref: "Built on the same approach as the quick-build sites, with more pages and polish.",
  },
  {
    id: "store",
    bestFor: "Online sellers",
    name: "Full-stack e-commerce store",
    hours: 72,
    note: "Storefront, accounts, admin dashboard, database and image storage.",
    ref: "Reference: Vaymora Foods, built end to end.",
  },
  {
    id: "webapp",
    bestFor: "Teams needing tools",
    name: "Custom web app / dashboard",
    hours: 60,
    note: "Authenticated app with forms, data tables and API integration.",
    ref: "Scope varies a lot, so use the add-ons below to shape it.",
  },
];

export type Feature = { id: string; name: string; hours: number; note: string };
export const features: Feature[] = [
  { id: "form", name: "Contact form with email delivery", hours: 3, note: "Validation, spam protection, delivered to your inbox." },
  { id: "anim", name: "Premium animation and interactions", hours: 10, note: "Scroll effects, transitions, hover states." },
  { id: "seo", name: "SEO, analytics and performance setup", hours: 4, note: "Metadata, sitemap, analytics, Lighthouse tuning." },
  { id: "api", name: "Integrate a client-provided API (each)", hours: 8, note: "You provide the API and docs, I wire it in with loading and error states." },
  { id: "backend", name: "Build a custom backend / API (each module)", hours: 24, note: "I design and build the endpoints and database tables." },
  { id: "auth", name: "User accounts and login", hours: 16, note: "Sign-up, login, profile and protected pages." },
  { id: "admin", name: "Admin dashboard", hours: 24, note: "Manage products, orders or content without touching code." },
  { id: "pay", name: "Payment gateway integration", hours: 16, note: "Checkout, order status and payment confirmation." },
  { id: "state", name: "Complex state management (Redux)", hours: 12, note: "Shared state for multi-step flows and many API calls." },
  { id: "migrate", name: "Migrate an existing site (per 10 pages)", hours: 12, note: "Content mapping, import scripts and validation." },
  { id: "i18n", name: "Multi-language support", hours: 14, note: "Language switcher and translated content structure." },
  { id: "host", name: "Go-live and domain setup", hours: 2, note: "Deployment, domain connection and final checks." },
];

export type Complexity = { id: string; name: string; mult: number; note: string };
export const complexities: Complexity[] = [
  { id: "simple", name: "Simple", mult: 0.85, note: "Clear scope, standard patterns, few unknowns." },
  { id: "standard", name: "Standard", mult: 1, note: "Typical business requirements with some custom behaviour." },
  { id: "complex", name: "Complex", mult: 1.35, note: "Many integrations, edge cases or fast-changing requirements." },
];

/** What the client provides changes how many hours I need. Each choice adds a percentage of the base work. */
export type Choice = { id: string; label: string; pct: number };
export type Provided = { id: string; title: string; choices: Choice[] };
export const provided: Provided[] = [
  {
    id: "design",
    title: "Design",
    choices: [
      { id: "has", label: "I have designs (Figma or similar)", pct: 0 },
      { id: "need", label: "Design it for me from scratch", pct: 0.25 },
    ],
  },
  {
    id: "content",
    title: "Content and images",
    choices: [
      { id: "has", label: "I will supply text and images", pct: 0 },
      { id: "need", label: "Help me write and source them", pct: 0.1 },
    ],
  },
  {
    id: "feedback",
    title: "Feedback speed",
    choices: [
      { id: "fast", label: "Quick replies, one decision-maker", pct: 0 },
      { id: "slow", label: "Slower, several stakeholders", pct: 0.1 },
    ],
  },
];

export const iNeedFromYou = [
  "A short written brief, or a 30-minute call to walk me through the goal",
  "Designs, brand assets and content (or tell me to create them, see above)",
  "Access to anything I must integrate: APIs, documentation, test credentials",
  "One point of contact who can approve work quickly",
];
export const iDoForYou = [
  "Plan the scope and timeline, and confirm them before I start",
  "Design (if needed), build, test, connect the database and host the site",
  "Make it responsive, accessible and fast, checked with Lighthouse",
  "Share previews regularly and fix the feedback you give",
  "Hand over clearly, with the go-live checklist done",
];

export type Plan = { name: string; bestFor: string; hours: number; blurb: string };
export const plans: Plan[] = [
  { name: "Landing / brochure site", bestFor: "Small businesses", hours: projectTypes[0].hours, blurb: "Up to 5 pages, responsive, fast and hosted." },
  { name: "Business website", bestFor: "Growing companies", hours: projectTypes[1].hours, blurb: "About 10 pages, forms, SEO and animation." },
  { name: "Full-stack online store", bestFor: "Online sellers", hours: projectTypes[2].hours, blurb: "Storefront, admin, database and images." },
];

/** What every project includes, shown in the estimator next to the features a visitor picks. */
export const standardIncluded = [
  "Responsive, mobile-first build",
  "Accessibility and Lighthouse checks",
  "Testing across devices",
  "Database connection and hosting setup",
  "Go-live checklist",
];
