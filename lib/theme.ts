import type { CSSProperties } from "react"

import type { Niche } from "@/niches"

const ALPHAS = [5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100] as const

/**
 * CSS variable overrides that recolor the accent (the Quanta lime primitives
 * and everything built on them) for a niche. Set on <html>; undefined keeps
 * the stock lime so the default niche renders byte-for-byte as before.
 */
export function accentStyle(theme: Niche["theme"]): CSSProperties | undefined {
  if (!theme.accent) return undefined
  const vars: Record<string, string> = {
    "--hf-color-lime-500": theme.accent,
    "--color-lime-highlight": theme.accentHighlight ?? theme.accent,
  }
  for (const alpha of ALPHAS)
    vars[`--hf-color-lime-alpha-${String(alpha).padStart(2, "0")}`] =
      alpha === 100
        ? theme.accent
        : `color-mix(in srgb, ${theme.accent} ${alpha}%, transparent)`
  return vars as CSSProperties
}
