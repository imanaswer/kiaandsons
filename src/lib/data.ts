import { work, CraftItem } from "@/lib/content";
import { createPublicClient } from "@/lib/supabase/public";

export type Project = {
  slug: string;
  title: string;
  discipline: string;
  category: string | null;
  location: string | null;
  year: string | null;
  summary: string;
  body: string | null;
  cover_image: string;
  gallery: string[];
  craft?: CraftItem[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image: string | null;
  author: string | null;
  published_at: string | null;
  reading_time?: string;
  tags?: string[];
};

// ---- Fallbacks (used until Supabase is configured & populated) -------------
const fallbackProjects: Project[] = work.map((w) => ({
  slug: w.slug,
  title: w.title,
  discipline: w.discipline,
  category: w.discipline,
  location: null,
  year: null,
  summary: w.intro,
  body: null,
  cover_image: w.image,
  gallery: [],
  craft: w.craft,
}));

const fallbackPosts: Post[] = [
  {
    slug: "cost-of-building-a-house-in-kerala-guide",
    title: "House Construction Cost in Kerala: A Realistic Step-by-Step Guide",
    excerpt:
      "A breakdown of construction costs per sq ft in Kerala — from foundation and structural engineering to premium finishes, approvals, and turn-key budgeting.",
    body: `Building a home in Kerala is one of the most significant investments a family will make. Yet, one of the most frequent challenges homeowners face is budget overrun. Understanding what actually drives construction costs per square foot in Kerala helps you plan with clarity from day one.

## The Key Drivers of Construction Cost in Kerala

Construction costs across Trivandrum, Kollam, and Kerala generally range depending on design complexity, topography, and material specifications:

- **Site Conditions & Topography:** Kerala's terrain varies from sloping hill plots to clayey lowlands. Sloping plots require retaining walls and step-foundations, while marshy soil demands pile foundations or raft foundations.
- **Structural Engineering & Shell (Grey Structure):** Accounting for roughly 45%–55% of the total cost, this includes earthwork, high-grade TMT steel, ready-mix or on-site graded concrete, laterite or wire-cut brick masonry, and structural roof slabs.
- **Finishes & Flooring:** The choice between vitrified tiles, honed natural granite, Italian marble, or hardwood flooring creates significant cost variations.
- **Electrical, Plumbing & Sanitary:** Concealed piping, multi-circuit distribution boards, heat pumps, pressure boosters, and luxury sanitaryware make up roughly 15%–20% of your build cost.

## Grey Structure vs Turn-Key Handover

Many contractors quote solely for the "grey structure" (the raw concrete shell), leaving clients surprised by electrical, plastering, waterproofing, painting, and joinery bills later.

At K&K Builders, we operate on an all-inclusive, turn-key delivery model. Our estimates cover every layer — architectural drawings, 3D visualization, permit assistance, civil construction, bespoke joinery, waterproofing warranties, and final styled handover.

## Controlling Costs Without Compromising Quality

1. **Lock Down Design Before Breaking Ground:** Changes made on paper cost nothing; alterations made in reinforced concrete multiply expenses exponentially.
2. **Prioritize Structural & Climate Integrity First:** Invest in high-grade waterproofing, seismic structural engineering, and weather-resistant joinery before allocating budget to surface decor.
3. **Choose Single-Source Accountability:** When architecture, engineering, and execution sit under one team, material procurement is streamlined and duplicate contractor margins are eliminated.`,
    cover_image: "/images/projects/hero-wide.jpg",
    author: "K&K Builders",
    published_at: "2026-03-01",
    reading_time: "6 min read",
    tags: ["Construction Cost", "Kerala Homes", "Civil Engineering", "Turn-Key Build"],
  },
  {
    slug: "modern-tropical-villa-design-kerala",
    title: "Designing Modern Tropical Villas in Kerala: Climate, Light & Form",
    excerpt:
      "How contemporary architecture in Kerala harmonizes monsoon management, natural cross-ventilation, and inner courtyards with sleek minimalist aesthetics.",
    body: `Kerala's unique tropical monsoon climate demands an architecture that breathes. While contemporary minimalist villas with expansive glass facades are highly sought after, directly transplanting European or arid-climate designs into Kerala results in heat traps and dampness.

Modern tropical architecture bridges this divide — honoring the wisdom of traditional Kerala architecture while delivering the clean lines, generous volumes, and open-plan spatial flow of modern luxury living.

## 1. Deep Overhangs and Cantilevered Eaves

Heavy monsoon downpours and intense tropical sun are Kerala's two weather extremes. Deep cantilevered roof slabs and horizontal timber or concrete louvers serve a dual purpose: they shade floor-to-ceiling glass walls from harsh direct solar radiation and shield exterior walls from wind-driven driving rain.

## 2. Reimagining the Nadumuttam (Central Courtyard)

The traditional Kerala *Nadumuttam* was the thermal lung of the home. In modern villa design, we transform this concept into double-height glass atriums, internal koi ponds, and landscaped pebble gardens. Warm air rises and escapes through high-level clerestory vents, drawing cooler ambient air across living areas through the stack effect.

## 3. Tactile Natural Materials

Contemporary luxury in Kerala is tactile:
- **Exposed Board-Marked Concrete:** Providing structural strength with an organic wood grain imprint.
- **Natural Teak & Fine Hardwoods:** Bringing warmth to ceilings, bespoke rafters, and custom pivoting entry doors.
- **Locally Sourced Stone & Laterite:** Dressed granite floors and textured laterite accent walls that age gracefully in coastal humidity.

By designing with the sun, the wind, and the rain rather than against them, a luxury villa remains naturally cool, luminous, and effortless to live in throughout the seasons.`,
    cover_image: "/images/projects/villa-dusk.jpg",
    author: "K&K Builders",
    published_at: "2026-02-24",
    reading_time: "5 min read",
    tags: ["Architecture", "Tropical Design", "Villas", "Kerala Architecture"],
  },
  {
    slug: "sourcing-furniture-lighting-china",
    title: "Sourcing Furniture & Lighting from China, the Right Way",
    excerpt:
      "We import furniture and lighting directly from China for our clients — curated to the interior, quality-checked, and delivered to the project.",
    body: `Great interiors need the right pieces, and the right pieces aren't always available in local retail showrooms without exorbitant retail markups.

We import custom luxury furniture and architectural lighting directly from specialized manufacturing hubs in China for our clients — selected to suit your interior architectural palette, quality-checked before loading, and delivered directly to your site in Kerala.

## Why Factory Sourcing Transforms Interior Projects

- **Unmatched Material Variety:** Access to sintered stone dining tables, curved Italian-inspired bouclé sofas, acoustic wall paneling, and custom brass architectural lighting profiles.
- **Dimensional Customization:** Customizing sofas, beds, and modular systems to the exact millimeter dimensions of your floor plan rather than settling for showroom stock sizes.
- **Significant Cost Advantages:** By eliminating multi-tier distributor markups, clients often achieve high-end European design aesthetics at a fraction of domestic retail cost.

## The End-to-End Import Process

1. **Curate & Brief:** During the 3D interior design phase, we select materials, fabrics, marble tops, and lighting specifications that harmonize with your space.
2. **Quality Verification on Ground:** Factory inspections ensure frame joinery, foam density, upholstery stitching, and CE/BIS certified electrical fixtures meet strict performance standards.
3. **Consolidation & Shipping:** All pieces are securely crated in moisture-sealed containers and shipped through sea freight to Cochin or Tuticorin ports.
4. **Customs, Delivery & Installation:** We manage port customs clearance, surface transport to your site in Trivandrum or across Kerala, uncrating, assembly, and comprehensive warranty coverage.`,
    cover_image: "/images/projects/interiors-living.jpg",
    author: "K&K Builders",
    published_at: "2026-02-18",
    reading_time: "5 min read",
    tags: ["Import & Sourcing", "Lighting", "Furniture", "Interior Design"],
  },
  {
    slug: "swimming-pool-construction-maintenance-kerala",
    title: "Private Swimming Pools & Water Features: Engineering for Kerala's Climate",
    excerpt:
      "Structural waterproofing, biological filtration, and material selection for infinity pools, plunge pools, and koi ponds built to stay crystal-clear.",
    body: `A private swimming pool, reflection pond, or natural water garden transforms a Kerala residence into a tranquil resort sanctuary. However, designing aquatic structures in a tropical region with heavy monsoons and high water tables requires rigorous civil and hydraulic engineering.

## Overcoming High Hydrostatic Pressure

In many parts of Kerala, subterranean water levels rise dramatically during monsoon months. An empty or improperly engineered pool can experience hydrostatic uplift—causing cracks or structural displacement.

- We engineer monolithic reinforced concrete shells with integrated hydrostatic relief valves.
- Concrete mixes incorporate crystalline admixtures to make the structural shell itself impermeable to water ingress from both inside and outside.

## Multi-Stage Waterproofing & Finishes

Standard cementitious plaster quickly degrades under continuous water immersion. We apply multi-layer elastomeric waterproofing membranes followed by epoxy-grouted glass mosaics or natural basalt stone coping.

## Smart, Low-Maintenance Filtration

- **Salt Chlorinators & UV Sterilizers:** Enjoy soft, gentle water free from harsh chemical odors and eye irritation.
- **Glass Media Filtration:** Replaces traditional sand filters for sharper filtration and lower backwash frequency.
- **Living Water Features:** For koi ponds and natural swimming ponds, biological wetland filtration zones use aquatic plants and lava stone to maintain crystal-clear water naturally without chemical additives.`,
    cover_image: "/images/projects/pool-water-garden.jpg",
    author: "K&K Builders",
    published_at: "2026-02-10",
    reading_time: "5 min read",
    tags: ["Swimming Pools", "Landscape Design", "Waterproofing", "Water Features"],
  },
  {
    slug: "monsoon-proof-waterproofing-concrete-structures-kerala",
    title: "Monsoon-Proof Waterproofing: Protecting Concrete Structures in Kerala",
    excerpt:
      "Why standard coatings fail in high humidity and tropical rains, and how multi-layer elastomeric systems, crystalline technology, and proper slope design safeguard your building.",
    body: `Water is the most destructive natural force acting upon a concrete building in Kerala. With over 3,000 mm of annual rainfall across two vigorous monsoon seasons, minor waterproofing omissions during construction manifest as damp walls, paint peeling, fungal efflorescence, and corroded reinforcing steel.

## The Most Common Waterproofing Vulnerabilities

1. **Flat Roof Slabs & Terrace Water Stagnation:** Inadequate slope grading (less than 1:100) causes rainwater puddling, finding microscopic capillary pathways into the slab.
2. **Parapet Wall & Slab Junctions:** The 90-degree interface between parapet walls and the floor slab experiences differential thermal expansion, causing continuous joint cracks.
3. **Plumbing & Sanitary Core Penetrations:** Gaps around drain pipes in bathrooms and utility shafts allow moisture to migrate horizontally across floor slabs.

## The 3-Tier Defense System

To guarantee permanent waterproofing integrity, K&K Builders implements a comprehensive 3-tier defense:

- **Tier 1: Integral Crystalline Waterproofing:** Added directly during concrete batching, these chemicals react with moisture and unhydrated cement particles to grow microscopic crystals that seal all concrete pores internally.
- **Tier 2: Flexible Elastomeric Membrane:** Applied across terraces and wet areas, offering high elongation to bridge structural thermal movement without tearing.
- **Tier 3: Chamfered Fillets & Protective Screed:** All slab-to-wall corners are coved with polymer-modified mortar fillets, and membranes are capped with protective screed and heat-reflective roof finishes.`,
    cover_image: "/images/craft/concrete-macro.jpg",
    author: "K&K Builders",
    published_at: "2026-02-01",
    reading_time: "4 min read",
    tags: ["Waterproofing", "Structural Engineering", "Concrete Craft", "Monsoon Care"],
  },
  {
    slug: "bespoke-interiors-joinery-vs-ready-made-furniture",
    title: "Bespoke Joinery vs Ready-Made Interiors: Crafting Spaces with Longevity",
    excerpt:
      "Why millwork, integrated storage, and hand-finished hardwood veneers tailored to structural geometry elevate daily living far beyond off-the-shelf units.",
    body: `When finishing a home, the debate between bespoke architectural joinery and modular flat-pack furniture is central to both aesthetics and long-term durability.

In tropical coastal climates like Kerala, ready-made particle-board furniture frequently swells, delaminates, and sags under high ambient humidity. Bespoke joinery engineered and built into the architecture represents an entirely different class of craftsmanship.

## Maximizing Every Cubic Foot

Ready-made wardrobes and consoles leave awkward gaps at walls and ceilings that accumulate dust and break visual continuity. Bespoke millwork is built flush from floor to ceiling, concealing structural columns, electrical wiring, and AC ductwork into seamless architectural surfaces.

## Materials That Endure Tropical Humidity

- **Calibrated BWP (Boiling Water Proof) Marine Plywood:** Essential substrate for kitchens and vanity cabinetry in Kerala.
- **Natural Hardwood Edging & Solid Teak Framing:** Protects vulnerable edges from impact and moisture intrusion.
- **High-Pressure Veneers & Polyurethane Finishes:** Sealed against fungal growth and UV discoloration.

When interiors are developed alongside architectural drawings by one unified team, every niche, lighting cove, and joinery reveal aligns in perfect structural harmony.`,
    cover_image: "/images/projects/renovation-interior.jpg",
    author: "K&K Builders",
    published_at: "2026-01-25",
    reading_time: "5 min read",
    tags: ["Interior Design", "Joinery", "Timber Craft", "Luxury Homes"],
  },
  {
    slug: "one-team-concept-to-completion",
    title: "Why We Keep Architecture, Engineering & Construction Under One Roof",
    excerpt:
      "When architecture, structural engineering, construction and interiors answer to one team, nothing falls between the trades — and the finished space matches the first sketch.",
    body: `The traditional construction process is notoriously fragmented. A client hires an independent architect, bids out the structural drawings to a civil contractor, brings in separate sub-contractors for electrical, plumbing, and HVAC, and later engages an interior designer.

When complications arise—such as budget overruns, timeline delays, or structural clashes—each party blames the other, leaving the client frustrated and financially vulnerable.

## The Single-Source Advantage

At K&K Builders, we eliminate this friction by keeping all disciplines under one accountable roof:

- **Constructability from the First Sketch:** Our structural engineers and site supervisors review architectural concepts in real time, ensuring complex design features can be built efficiently and cost-effectively.
- **Transparent Budget Alignment:** Accurate estimations and material procurement schedules are determined before foundation excavation begins.
- **Unified Quality Standards:** The master craftsmen pouring concrete, fabricating steel handrails, and fitting teak joinery work to one singular standard of finish.

From initial 3D planning and building permits to turn-key handover and after-sales service, one team takes total responsibility for your home journey.`,
    cover_image: "/images/projects/architect-desk.jpg",
    author: "K&K Builders",
    published_at: "2026-01-15",
    reading_time: "4 min read",
    tags: ["Design & Build", "Turn-Key Construction", "Project Management"],
  },
  {
    slug: "renovation-structural-strengthening-older-homes-kerala",
    title: "Renovating & Strengthening Older Homes in Kerala: Modern Living in Heritage Frames",
    excerpt:
      "From retrofitting foundations and steel beam insertions to damp-proofing antique masonry, how to transform traditional homes into open-plan modern sanctuaries.",
    body: `Many older residences in Kerala possess extraordinary character—spacious plots, mature trees, high ceilings, and solid laterite or brick walls. However, their cellular, compartmentalized layouts, dark interior corridors, and aging utilities rarely suit modern family lifestyle needs.

Renovation and structural remodeling allow homeowners to preserve the emotional value and prime location of an existing property while creating a bright, contemporary, energy-efficient home.

## Structural Retrofitting & Opening Up Living Spaces

Older homes in Kerala were constructed with load-bearing masonry walls that divide spaces into small, dark rooms. 

- **Steel Universal Beam (RSJ) Insertion:** We install engineered structural steel I-beams and load-distributing column pads to safely remove internal load-bearing walls, creating expansive open-plan living, dining, and kitchen zones.
- **Foundation Underpinning:** Strengthening sub-foundations to support vertical floor additions or rooftop terrace gardens.

## Modernizing Building Services

- **Upgrading Electrical & Plumbing Networks:** Replacing old wiring with multi-circuit distribution boards, solar inverter readiness, and modern PEX plumbing manifolds.
- **Eliminating Rising Damp:** Installing chemical damp-proof courses (DPC) and breathable lime-based plaster coats to permanently resolve wall moisture in heritage structures.
- **Thermal & Natural Light Upgrades:** Introducing skylights, double-glazed energy-efficient sliding doors, and roof insulation to dramatically reduce air-conditioning energy consumption.`,
    cover_image: "/images/projects/craftsmen.jpg",
    author: "K&K Builders",
    published_at: "2026-01-08",
    reading_time: "6 min read",
    tags: ["Renovation", "Structural Retrofit", "Heritage Homes", "Remodeling"],
  },
];

// ---- Access layer ----------------------------------------------------------
export async function getProjects(): Promise<Project[]> {
  const supabase = createPublicClient();
  if (!supabase) return fallbackProjects;
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error || !data || data.length === 0) return fallbackProjects;
  return (data as Project[]).map((p) => ({
    ...p,
    craft: p.craft && p.craft.length > 0 ? p.craft : work.find((w) => w.slug === p.slug)?.craft,
  }));
}

export async function getProject(slug: string): Promise<Project | null> {
  const supabase = createPublicClient();
  const fallback = fallbackProjects.find((p) => p.slug === slug) ?? null;
  if (!supabase) return fallback;
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (!data) return fallback;
  const proj = data as Project;
  if (!proj.craft || proj.craft.length === 0) {
    proj.craft = fallback?.craft ?? work.find((w) => w.slug === slug)?.craft;
  }
  return proj;
}

export async function getPosts(): Promise<Post[]> {
  const supabase = createPublicClient();
  if (!supabase) return fallbackPosts;
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error || !data || data.length === 0) return fallbackPosts;
  return data as Post[];
}

export async function getPost(slug: string): Promise<Post | null> {
  const supabase = createPublicClient();
  if (!supabase) return fallbackPosts.find((p) => p.slug === slug) ?? null;
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return (data as Post) ?? fallbackPosts.find((p) => p.slug === slug) ?? null;
}
