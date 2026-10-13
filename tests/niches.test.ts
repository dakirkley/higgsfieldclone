import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"

import { describe, expect, it } from "vitest"

import { MODELS as ALL_MODELS } from "@/generation/catalog/models.generated"
import type { GeneratorTab } from "@/generation/catalog/types"
import { NICHES, nicheAllowsModel, resolveNiche } from "@/niches"
import type { Niche } from "@/niches"

const PUBLIC = join(process.cwd(), "public")
const byId = new Map(ALL_MODELS.map((model) => [model.id, model]))

function sold(niche: Niche) {
  return ALL_MODELS.filter((model) => nicheAllowsModel(niche, model.id))
}

/** Every /public path a pack points at. */
function mediaPaths(niche: Niche): string[] {
  const { home, presets } = niche
  return [
    niche.brand.ogImage,
    ...(niche.brand.logoSrc ? [niche.brand.logoSrc] : []),
    home.hero.video,
    home.hero.poster,
    home.promo.image,
    home.closing.image,
    niche.effects.ogImage,
    ...niche.showcase.map((slide) => slide.src),
    ...Object.values(niche.steps).flatMap((steps) =>
      steps.map((step) => step.image)
    ),
    ...presets.seed.map(
      (seed) => `${presets.coverDir ?? "/media/presets"}/${seed.slug}.jpg`
    ),
    ...Object.values(presets.loops),
  ]
}

describe("niche registry", () => {
  it("resolves the default pack when unset and rejects unknown ids", () => {
    expect(resolveNiche(undefined).id).toBe("default")
    expect(resolveNiche("").id).toBe("default")
    expect(() => resolveNiche("no-such-niche")).toThrow(
      /Unknown NEXT_PUBLIC_NICHE/
    )
  })

  it("applies include before exclude", () => {
    const niche = {
      ...NICHES.default!,
      models: { include: ["soul-2", "kling-3-std"], exclude: ["kling-3-std"] },
    }
    expect(nicheAllowsModel(niche, "soul-2")).toBe(true)
    expect(nicheAllowsModel(niche, "kling-3-std")).toBe(false)
    expect(nicheAllowsModel(niche, "seedance-2.5")).toBe(false)
  })
})

describe.each(Object.entries(NICHES))("niche %s", (key, niche) => {
  const models = sold(niche)
  const soldIds = new Set(models.map((model) => model.id))

  it("is registered under its own id", () => {
    expect(niche.id).toBe(key)
  })

  it("names only real catalog models in its filter", () => {
    const named = [
      ...(niche.models?.include ?? []),
      ...(niche.models?.exclude ?? []),
    ]
    expect(named.filter((id) => !byId.has(id))).toEqual([])
    expect(models.some((model) => model.surface === "image")).toBe(true)
    expect(models.some((model) => model.surface === "video")).toBe(true)
  })

  it("leads with models it sells", () => {
    expect(niche.home.toolIds.filter((id) => !soldIds.has(id))).toEqual([])
  })

  it("seeds presets that run on models it sells", () => {
    const { seed, categories, loops } = niche.presets
    const slugs = seed.map((preset) => preset.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const preset of seed) {
      const model = byId.get(preset.modelId)
      expect(soldIds.has(preset.modelId), preset.slug).toBe(true)
      expect(model?.surface, preset.slug).toBe(preset.surface)
      expect(categories, preset.slug).toContain(preset.category)
    }
    expect(Object.keys(loops).filter((slug) => !slugs.includes(slug))).toEqual(
      []
    )
  })

  it("links the footer only to models and tabs it sells", () => {
    const broken: string[] = []
    for (const column of niche.footer.columns)
      for (const link of column.links) {
        const url = new URL(link.href, "https://example.test")
        const surface = url.pathname.slice(1)
        const model = url.searchParams.get("model")
        const tab = url.searchParams.get("tab") as GeneratorTab | null
        if (model && byId.get(model)?.surface !== surface)
          broken.push(link.href)
        else if (model && !soldIds.has(model)) broken.push(link.href)
        if (
          tab &&
          !models.some(
            (entry) =>
              entry.surface === surface && (entry.tab ?? "create") === tab
          )
        )
          broken.push(link.href)
      }
    expect(broken).toEqual([])
  })

  it("points at media that exists under /public", () => {
    const missing = mediaPaths(niche).filter(
      (path) => !path.startsWith("/") || !existsSync(join(PUBLIC, path))
    )
    expect(missing).toEqual([])
  })

  it("gives the mock sample media to return", () => {
    const count = (dirs: readonly string[], ext: string) =>
      dirs.flatMap((dir) =>
        readdirSync(join(PUBLIC, dir)).filter((file) => file.endsWith(ext))
      ).length
    expect(count(niche.mock.imageDirs, ".jpg")).toBeGreaterThan(0)
    expect(count(niche.mock.videoDirs, ".mp4")).toBeGreaterThan(0)
  })

  it("uses hex colors for its accent", () => {
    for (const color of [niche.theme.accent, niche.theme.accentHighlight])
      if (color) expect(color).toMatch(/^#[0-9a-f]{6}$/i)
  })
})
