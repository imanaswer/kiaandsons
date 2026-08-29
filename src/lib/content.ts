// Single source of truth for K&K Builders content.
// FACTS from the client discovery questionnaire. Do not invent projects,
// clients, awards, statistics, dates, or values. Contact details below are
// PLACEHOLDERS pending the client's real phone/email/address/socials.
// Illustrative imagery is representative until real project photography lands
// (managed via the /admin CMS).

export const company = {
  name: "K&K Builders",
  legal: "K&K Builders®",
  tagline: "Built with intent.",
  differentiator: "One destination for your complete home journey.",
  positioning:
    "A complete home-building company based in Trivandrum, serving Kerala. From architecture and 3D planning to construction, interiors and imported furniture — one destination for your complete home journey.",
  phonePrimary: "+91 96335 38285",
  phoneQuote: "+91 96335 38285",
  email: "projects.kandkbuilders@gmail.com",
  mapsUrl: "https://share.google/iIr9Fteu9xzHsTlZP",
  address: {
    line1: "", // street address — to be provided
    city: "Trivandrum",
    pin: "",
    region: "Kerala, India",
  },
  areasServed: ["Trivandrum", "Kollam", "Alappuzha"],
  // Real social handles to be provided; empty hides the links.
  socials: [] as { label: string; href: string }[],
} as const;

export const pillars = [
  {
    title: "One Destination",
    body: "Design, 3D planning, construction, interiors and imported furniture — handled by one accountable team, from first talk to handover.",
  },
  {
    title: "Quality Craftsmanship",
    body: "Materials and finishing chosen and executed to a high standard — the detail is the structure.",
  },
  {
    title: "Client-Centric Approach",
    body: "Available for the fine details, transparent on timelines, budget and permits — including bank-loan assistance.",
  },
  {
    title: "After You Move In",
    body: "We don't disappear at handover — maintenance and after-sales service keep your home right for the long term.",
  },
] as const;

// The complete home journey (from the client's described process).
export const journey = [
  { n: "01", t: "Talk", d: "Reach us on WhatsApp or by phone and tell us what you're planning." },
  { n: "02", t: "Site visit & consultation", d: "We visit your site and discuss the brief, budget and timeline." },
  { n: "03", t: "Design & 3D", d: "Architecture, structural design and 3D visualisation, so you see it before it's built." },
  { n: "04", t: "Build", d: "Construction managed end-to-end — materials, labour, permits and bank-loan assistance." },
  { n: "05", t: "Interiors & handover", d: "Interiors, imported furniture and lighting — then maintenance and after-sales." },
] as const;

export type Service = {
  slug: string;
  index: string;
  title: string;
  short: string;
  lede: string;
  scope: string[];
  image: string; // representative imagery
};

export const services: Service[] = [
  {
    slug: "architecture",
    index: "01",
    title: "Architecture",
    short: "Design that reads the site, the light and the way you live.",
    lede: "Architecture and building design that begins with how a space will be lived in — then resolves it into 3D visualisations and drawings that build cleanly.",
    scope: [
      "Architectural services",
      "Building design",
      "3D planning & visualisation",
      "Building permits",
      "Estimations",
      "Structural design",
      "Working drawings",
    ],
    image: "/images/projects/renovation-interior.jpg",
  },
  {
    slug: "construction",
    index: "02",
    title: "Construction",
    short: "Turn-key residential & commercial building, one accountable team.",
    lede: "From structural planning to final handover, we manage the build with engineering discipline and attention to detail — residential, commercial, villas, apartments, renovations and extensions.",
    scope: [
      "Residential & commercial construction",
      "Villas, apartments & extensions",
      "Design & build",
      "Construction packages (solar, furnishing)",
      "Materials, procurement & labour",
      "Approvals, permits & bank-loan assistance",
      "Electrical, plumbing, HVAC & finishes",
      "Maintenance & after-sales service",
    ],
    image: "/images/projects/commercial-facade.jpg",
  },
  {
    slug: "interiors",
    index: "03",
    title: "Interior Design",
    short: "Interiors designed and delivered with the build — concept to styling.",
    lede: "Interiors resolved as part of the architecture — space planning, bespoke joinery, lighting and finishes delivered turn-key, so the inside is as considered as the structure.",
    scope: [
      "Interior design & space planning",
      "Bespoke joinery & furnishing",
      "Lighting & electrical layout",
      "Home automation",
      "Finishes, materials & styling",
      "Turnkey fit-out",
    ],
    image: "/images/projects/interiors-living.jpg",
  },
  {
    slug: "renovation",
    index: "04",
    title: "Renovation",
    short: "Giving purpose back to spaces that have outgrown theirs.",
    lede: "Renovation, remodeling and strengthening that respects what stands and rebuilds it for how you live now.",
    scope: [
      "Renovation & remodeling",
      "Extensions & conversions",
      "Structural strengthening",
      "Demolishing of buildings",
    ],
    image: "/images/projects/renovation-interior.jpg",
  },
  {
    slug: "pools-and-water",
    index: "05",
    title: "Pools & Water",
    short: "Swimming pools, koi ponds and living water gardens.",
    lede: "Water as architecture — pools, ponds and living water gardens engineered to stay clear, calm and beautiful.",
    scope: [
      "Swimming pools",
      "Koi ponds",
      "Living water gardens",
      "Water treatment solutions",
      "Aquaculture & hydroponics",
      "Landscaping",
    ],
    image: "/images/projects/pool-water-garden.jpg",
  },
  {
    slug: "fabrication",
    index: "06",
    title: "Fabrication & Stone",
    short: "Handrails, stairs, truss works and natural stone.",
    lede: "Metal and stone worked to fit — handrails, stairs, steel trusses and natural stone detailed and installed in-house.",
    scope: [
      "Handrails",
      "Stairs",
      "Truss works",
      "Fabrication works",
      "Natural stone works",
    ],
    image: "/images/projects/landscape-stone.jpg",
  },
  {
    slug: "waterproofing",
    index: "07",
    title: "Waterproofing",
    short: "Reclaiming control over water, heat and time.",
    lede: "Waterproofing, leakproofing and protective coatings that keep concrete structures dry, cool and lasting.",
    scope: [
      "Waterproofing",
      "Leakproofing",
      "Heat-proof coatings",
      "Epoxy coatings",
    ],
    image: "/images/craft/concrete-macro.jpg",
  },
];

// Import & sourcing — furniture and lighting brought in from China for clients.
export const importOffer = {
  eyebrow: "Import & Sourcing",
  title: "Furniture & lighting, from China to your doorstep.",
  body: "Beyond the build, we import furniture and lighting directly from China for our clients — curated to your interior and quality-checked. We handle international shipping, local delivery and installation, and every piece is covered by warranty.",
  steps: [
    { n: "01", t: "Select", d: "Choose from our catalogue or brief us on the look." },
    { n: "02", t: "Ship", d: "We handle sourcing and international shipping." },
    { n: "03", t: "Deliver", d: "Local delivery to your project, coordinated with the build." },
    { n: "04", t: "Install & warrant", d: "We install it, and it's covered by warranty." },
  ],
  catalogueNote: "A full product catalogue is on the way.",
};

// Additional capabilities offered (shown as a supporting list, not full pages).
export const alsoOffer = [
  "Electrical works",
  "Solar energy solutions",
  "Sports flooring",
  "Land survey",
];

export type CraftItem = {
  title: string;
  image: string;
};

// "Selected Work" — framed as capability areas with representative imagery,
// NOT as specific completed projects (no invented client/location/value/date).
export type Work = {
  slug: string;
  index: string;
  title: string;
  discipline: string;
  image: string;
  intro: string;
  craft: CraftItem[];
};

export const work: Work[] = [
  {
    slug: "residential",
    index: "01",
    title: "Private Residences",
    discipline: "Architecture · Construction",
    image: "/images/projects/villa-dusk.jpg",
    intro:
      "Homes built around light, material and the way a family moves through a space — resolved from first sketch to final handover.",
    craft: [
      { title: "Exposed Concrete", image: "/images/craft/concrete-macro.jpg" },
      { title: "Teak & Timber", image: "/images/craft/timber-macro.jpg" },
      { title: "Natural Stone", image: "/images/craft/stone-macro.jpg" },
    ],
  },
  {
    slug: "commercial",
    index: "02",
    title: "Commercial Builds",
    discipline: "Civil Contracting",
    image: "/images/projects/commercial-facade.jpg",
    intro:
      "Clean, durable commercial structures delivered turn-key, with the engineering discipline a working building demands.",
    craft: [
      { title: "Structural Steel", image: "/images/craft/steel-macro.jpg" },
      { title: "Reinforced Concrete", image: "/images/craft/concrete-macro.jpg" },
      { title: "Architectural Glazing", image: "/images/craft/glass-facade-macro.jpg" },
    ],
  },
  {
    slug: "water-landscape",
    index: "03",
    title: "Water & Landscape",
    discipline: "Pools · Ponds · Gardens",
    image: "/images/projects/pool-water-garden.jpg",
    intro:
      "Swimming pools, koi ponds and living water gardens engineered to stay clear and calm, set into considered landscape.",
    craft: [
      { title: "Pool Mosaic", image: "/images/craft/pool-mosaic-macro.jpg" },
      { title: "Natural Stone", image: "/images/craft/stone-macro.jpg" },
      { title: "Hydraulic Concrete", image: "/images/craft/concrete-macro.jpg" },
    ],
  },
  {
    slug: "interiors",
    index: "04",
    title: "Interiors & Styling",
    discipline: "Interior Design",
    image: "/images/projects/interiors-living.jpg",
    intro:
      "Interiors resolved with the architecture — space planning, bespoke joinery, lighting and finishes delivered turn-key, so the inside is as considered as the structure.",
    craft: [
      { title: "Imported Marble", image: "/images/craft/marble-macro.jpg" },
      { title: "Teak & Fine Veneer", image: "/images/craft/timber-macro.jpg" },
      { title: "Brushed Brass", image: "/images/craft/brass-macro.jpg" },
    ],
  },
  {
    slug: "renovation",
    index: "05",
    title: "Renovation & Remodeling",
    discipline: "Remodeling · Strengthening",
    image: "/images/projects/renovation-interior.jpg",
    intro:
      "Renewing and strengthening what stands — giving purpose back to spaces that have outgrown their original one.",
    craft: [
      { title: "Structural Steel Retrofit", image: "/images/craft/steel-macro.jpg" },
      { title: "Lime Plaster & Masonry", image: "/images/craft/lime-plaster-macro.jpg" },
      { title: "Microcement & Screed", image: "/images/craft/concrete-macro.jpg" },
    ],
  },
  {
    slug: "fabrication",
    index: "06",
    title: "Fabrication & Stone",
    discipline: "Metal · Stone · Detail",
    image: "/images/projects/landscape-stone.jpg",
    intro:
      "Handrails, stairs, trusses and natural stone worked in-house and installed to fit — where the detail becomes the structure.",
    craft: [
      { title: "TIG-Welded Steel", image: "/images/craft/steel-macro.jpg" },
      { title: "Natural Granite & Slate", image: "/images/craft/stone-macro.jpg" },
      { title: "Architectural Brass", image: "/images/craft/brass-macro.jpg" },
    ],
  },
];

export const process = [
  {
    index: "01",
    title: "Discover",
    body: "We start with the brief, the site and the budget — understanding how the space needs to work before a line is drawn.",
    image: "/images/projects/architect-desk.jpg",
  },
  {
    index: "02",
    title: "Design",
    body: "Architecture and building design resolve the idea into a space, then into permit and working drawings that build cleanly.",
    image: "/images/projects/renovation-interior.jpg",
  },
  {
    index: "03",
    title: "Engineer",
    body: "Structural design and estimation turn the drawings into a build that stands — costed honestly and planned to sequence.",
    image: "/images/craft/steel-macro.jpg",
  },
  {
    index: "04",
    title: "Build",
    body: "Civil contracting managed with discipline — the right materials, the right craftsmen, and finishing that holds up.",
    image: "/images/projects/craftsmen.jpg",
  },
  {
    index: "05",
    title: "Deliver",
    body: "Waterproofing, fabrication, landscape and services brought together to a clean, on-time, turn-key handover.",
    image: "/images/projects/villa-dusk.jpg",
  },
];

export const craft = [
  { title: "Concrete", image: "/images/craft/concrete-macro.jpg" },
  { title: "Steel", image: "/images/craft/steel-macro.jpg" },
  { title: "Stone", image: "/images/craft/stone-macro.jpg" },
];


export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/services" },
  { label: "Journal", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Options for the multi-step quote form (step 1).
export const projectTypes = [
  "New Construction",
  "Architecture",
  "Interior Design",
  "Imported Furniture & Lighting",
  "Renovation",
  "Pool / Pond",
  "Fabrication",
  "Waterproofing",
  "Other",
];

// FAQ — honest, generic answers (no fabricated timelines, prices, or counts).
export const faqs = [
  {
    q: "Do you handle interiors as well as construction?",
    a: "Yes. Architecture, structural engineering, construction and interior design are all delivered in-house by one accountable team — so your project runs from concept to a finished, styled space without handing off between separate firms.",
  },
  {
    q: "Which areas do you work in?",
    a: "We are based in Trivandrum and take on residential and commercial projects across Kerala. Reach out with your location and we'll tell you how we can help.",
  },
  {
    q: "Can you take a project from design all the way through to handover?",
    a: "Yes — this is how we prefer to work. We can start at the first sketch and building permits, carry the project through structural design, construction and fabrication, and finish with interiors and services for a turn-key handover.",
  },
  {
    q: "Do you take on renovations and smaller works, or only new builds?",
    a: "Both. We handle new construction, renovation and remodeling, structural strengthening, and focused works such as swimming pools, natural stone, fabrication and waterproofing.",
  },
  {
    q: "How do timelines and budgets work?",
    a: "Every project is estimated individually against your brief, site and budget. After a consultation we prepare a transparent estimate and a planned schedule before work begins — timelines depend on the scope and are agreed up front.",
  },
  {
    q: "How do I get started?",
    a: "Start a project brief or book a free consultation. Tell us what you're building and we'll get back to you to discuss the details — there's no obligation.",
  },
];

// Book-a-consultation flow options.
export const consultationModes = [
  { label: "Phone call", note: "A quick call to talk it through" },
  { label: "Video call", note: "Screen-share plans and references" },
  { label: "Site visit", note: "We visit your plot or property" },
  { label: "Studio visit", note: "Meet us at our Trivandrum studio" },
];

export const consultationTimes = [
  "This week",
  "Next week",
  "This month",
  "Flexible",
];
