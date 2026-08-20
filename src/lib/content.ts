// Single source of truth for K&K Company content.
// FACTS sourced from https://kjasons.com (audited). Do not invent projects,
// clients, awards, statistics, dates, or values. Illustrative imagery is
// clearly framed as representative until real project photography is supplied.

export const company = {
  name: "K&K Company",
  legal: "K&K Company®",
  tagline: "Built with intent.",
  positioning:
    "A full-service civil contracting company in Kochi. From architecture to handover, we turn an idea into a space that lasts.",
  founded: 1983,
  phonePrimary: "+91 9400726668",
  phoneQuote: "+91 9061226668",
  email: "info@kjasons.com",
  address: {
    line1: "CC – 15/68 A, West Karuvelipady",
    city: "Kochi",
    pin: "682005",
    region: "Kerala, India",
  },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/kja.sons/" },
    { label: "Facebook", href: "https://www.facebook.com/kjaandsons" },
    { label: "YouTube", href: "https://www.youtube.com/c/KJAandSons" },
    { label: "Twitter", href: "https://twitter.com/kja_sons" },
    { label: "Pinterest", href: "https://in.pinterest.com/kjaandsonsindia" },
  ],
} as const;

// Verified history (provided by the company). Two dated milestones + present.
export const timeline = [
  {
    year: "1983",
    title: "K.R. Joseph & Sons",
    body: "The practice begins in Ernakulam — a family trade built on caring, craftsmanship and doing right by the client.",
  },
  {
    year: "2012",
    title: "K&K Company",
    body: "The family tradition is reorganised as K&K Company, a full-service civil contracting company serving Kochi and Kerala.",
  },
  {
    year: "Today",
    title: "Design to handover",
    body: "Architecture, engineering and construction under one roof — turn-key delivery for residential and commercial clients.",
  },
] as const;

export const pillars = [
  {
    title: "Quality Craftsmanship",
    body: "Materials and finishing chosen and executed to the highest standard — the detail is the structure.",
  },
  {
    title: "Innovation & Adaptability",
    body: "We bring current methods and materials to every build, adapting the approach to the site and the brief.",
  },
  {
    title: "Client-Centric Approach",
    body: "Available for the fine details, transparent on timelines, and driven to exceed what clients expect.",
  },
  {
    title: "Integrity & Ethics",
    body: "A family tradition of caring — honest work, honest advice, and a build you can rely on for the long term.",
  },
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
    lede: "Architecture and building design that begins with how a space will be lived in — then resolves it into drawings that build cleanly.",
    scope: [
      "Architectural services",
      "Building design",
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
    short: "Turn-key civil building, managed with engineering discipline.",
    lede: "From structural planning to final handover, we manage the build with engineering discipline and attention to detail.",
    scope: [
      "Civil building contracting",
      "New construction",
      "Design & build",
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

// Additional capabilities offered (shown as a supporting list, not full pages).
export const alsoOffer = [
  "Electrical works",
  "Solar energy solutions",
  "Sports flooring",
  "Land survey",
];

// "Selected Work" — framed as capability areas with representative imagery,
// NOT as specific completed projects (no invented client/location/value/date).
export type Work = {
  slug: string;
  index: string;
  title: string;
  discipline: string;
  image: string;
  intro: string;
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
  },
  {
    slug: "commercial",
    index: "02",
    title: "Commercial Builds",
    discipline: "Civil Contracting",
    image: "/images/projects/commercial-facade.jpg",
    intro:
      "Clean, durable commercial structures delivered turn-key, with the engineering discipline a working building demands.",
  },
  {
    slug: "water-landscape",
    index: "03",
    title: "Water & Landscape",
    discipline: "Pools · Ponds · Gardens",
    image: "/images/projects/pool-water-garden.jpg",
    intro:
      "Swimming pools, koi ponds and living water gardens engineered to stay clear and calm, set into considered landscape.",
  },
  {
    slug: "interiors",
    index: "04",
    title: "Interiors & Styling",
    discipline: "Interior Design",
    image: "/images/projects/interiors-living.jpg",
    intro:
      "Interiors resolved with the architecture — space planning, bespoke joinery, lighting and finishes delivered turn-key, so the inside is as considered as the structure.",
  },
  {
    slug: "renovation",
    index: "05",
    title: "Renovation & Remodeling",
    discipline: "Remodeling · Strengthening",
    image: "/images/projects/renovation-interior.jpg",
    intro:
      "Renewing and strengthening what stands — giving purpose back to spaces that have outgrown their original one.",
  },
  {
    slug: "fabrication",
    index: "06",
    title: "Fabrication & Stone",
    discipline: "Metal · Stone · Detail",
    image: "/images/projects/landscape-stone.jpg",
    intro:
      "Handrails, stairs, trusses and natural stone worked in-house and installed to fit — where the detail becomes the structure.",
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

export const testimonials = [
  {
    name: "Dias V",
    role: "Doctor",
    quote:
      "The quality of the building materials and the finishing is by far the best you can get, and everything got done on time.",
  },
  {
    name: "Arun Jose",
    role: "Software Engineer",
    quote:
      "The team was always available to us to discuss fine details in spite of time limits. We loved working with K&K Company.",
  },
  {
    name: "Roshan Krishna",
    role: "Lawyer",
    quote:
      "We highly appreciate the team for the handrail job completed within the time period, with perfection.",
  },
];

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Options for the multi-step quote form (step 1).
export const projectTypes = [
  "New Construction",
  "Architecture",
  "Interior Design",
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
    a: "We are based in Kochi and take on residential and commercial projects across Kerala. Reach out with your location and we'll tell you how we can help.",
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
  { label: "Studio visit", note: "Meet us at our Kochi studio" },
];

export const consultationTimes = [
  "This week",
  "Next week",
  "This month",
  "Flexible",
];
