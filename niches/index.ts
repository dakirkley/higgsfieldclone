import { defaultNiche } from "./default"
import type { Niche } from "./types"

/** Every niche pack this codebase can build. Add a pack: one folder + one line here. */
export const NICHES: Readonly<Record<string, Niche>> = {
  default: defaultNiche,
}

/**
 * The pack this deployment is built for. NEXT_PUBLIC_NICHE is inlined at build
 * time, so server, client and scripts agree; an unknown id fails the build.
 */
export const NICHE: Niche = resolveNiche(process.env.NEXT_PUBLIC_NICHE)

export function resolveNiche(id: string | undefined): Niche {
  const key = id?.trim() || "default"
  const niche = NICHES[key]
  if (!niche)
    throw new Error(
      `Unknown NEXT_PUBLIC_NICHE "${key}". Known: ${Object.keys(NICHES).join(", ")}`
    )
  return niche
}

/** Whether a niche sells a model (its include list first, then its exclude list). */
export function nicheAllowsModel(niche: Niche, modelId: string): boolean {
  const filter = niche.models
  if (!filter) return true
  if (filter.include && !filter.include.includes(modelId)) return false
  return !filter.exclude?.includes(modelId)
}

export type {
  Cta,
  Headline,
  Niche,
  PlanCopy,
  PresetSeed,
  ShowcaseSlide,
  Step,
} from "./types"
