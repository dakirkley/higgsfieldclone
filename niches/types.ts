import type { GeneratorTab, Surface } from "@/generation/catalog/types"

/**
 * A niche pack: everything that makes one deployment its own brand. The code,
 * billing, ledger and generation pipeline are shared; a deployment picks its
 * pack with NEXT_PUBLIC_NICHE at build time (see niches/index.ts).
 *
 * Packs are plain data — no imports from lib/** — so client components,
 * standalone scripts and the mock platform can all read them.
 */
export interface Niche {
  /** Matches the folder name and the NEXT_PUBLIC_NICHE value. */
  id: string
  brand: NicheBrand
  theme: NicheTheme
  home: NicheHome
  effects: NicheEffects
  /** Login / auth-modal carousel. */
  showcase: readonly ShowcaseSlide[]
  /** Heading + subtitle on each generator's empty canvas, per surface and tab. */
  headlines: Record<Surface, Record<GeneratorTab, readonly [string, string]>>
  /** "How it works" steps on each generator's empty canvas. */
  steps: Record<Surface, readonly Step[]>
  footer: NicheFooter
  /** Which catalog models this deployment sells. Omit to sell every model. */
  models?: ModelFilter
  presets: NichePresets
  /** Display overrides for plans; ids, Stripe env names and limits stay shared. */
  plans?: Partial<Record<PlanKey, PlanCopy>>
  /** Sample outputs the mock platform returns (dirs under /public). */
  mock: { imageDirs: readonly string[]; videoDirs: readonly string[] }
}

export interface NicheBrand {
  name: string
  tagline: string
  description: string
  /** Shown after the name in the default <title>, e.g. "AI image & video studio". */
  titleSuffix: string
  productionUrl: string
  supportEmail: string
  /** Default EMAIL_FROM when the env doesn't set one. */
  emailFrom: string
  /** Author label for community pieces whose creator has no name. */
  creatorFallback: string
  ogImage: string
  /** Square logo mark (SVG/PNG under /public). Omit to use the built-in mark. */
  logoSrc?: string
}

export interface NicheTheme {
  /**
   * Accent for the Generate CTA, active states and highlights (hex, light
   * enough for #131517 text on top). Omit to keep the default lime.
   */
  accent?: `#${string}`
  /** Inner highlight of the Generate button gradient; defaults to the accent. */
  accentHighlight?: `#${string}`
}

export interface Cta {
  label: string
  href: string
}

/** Two-line display heading: the second line takes the accent color. */
export type Headline = readonly [string, string]

export interface NicheHome {
  hero: {
    eyebrow: string
    title: Headline
    body: string
    primary: Cta
    secondary: Cta
    video: string
    poster: string
  }
  promo: {
    title: Headline
    bullets: readonly string[]
    cta: Cta
    image: string
  }
  /** Model ids for the tool cards under the hero (unknown ids are skipped). */
  toolIds: readonly string[]
  sections: {
    effects: { title: string; description: string; cta: string }
    models: { title: string; description: string }
    community: { title: string; description: string }
  }
  closing: { title: Headline; body: string; image: string; primary: Cta }
}

export interface NicheEffects {
  /** Nav and footer label for /effects. */
  navLabel: string
  title: string
  description: string
  ogImage: string
  eyebrow: Cta
}

export interface ShowcaseSlide {
  src: string
  chip: string
  title: string
  caption: string
}

export interface Step {
  title: string
  body: string
  image: string
}

export interface NicheFooter {
  tagline: Headline
  columns: readonly {
    title: string
    links: readonly { label: string; href: string }[]
  }[]
}

export interface ModelFilter {
  /** Sell only these model ids (applied first). */
  include?: readonly string[]
  /** Never sell these model ids. */
  exclude?: readonly string[]
}

/**
 * Seeded Effects presets. Each one is a prompt template plus a model and
 * settings; `{subject}` is replaced with the user's prompt when present.
 */
export interface PresetSeed {
  slug: string
  title: string
  description: string
  surface: Surface
  modelId: string
  promptTemplate: string
  settings: Record<string, unknown>
  category: string
  order: number
}

export interface NichePresets {
  categories: readonly string[]
  seed: readonly PresetSeed[]
  /** Looping covers for motion presets, by slug (image covers live in coverDir). */
  loops: Readonly<Record<string, string>>
  /** Folder holding <slug>.jpg preset covers; defaults to /media/presets. */
  coverDir?: string
}

export type PlanKey = "free" | "starter" | "plus" | "ultra"

export interface PlanCopy {
  name?: string
  tagline?: string
  features?: { label: string; included: boolean; tag?: string }[]
}
