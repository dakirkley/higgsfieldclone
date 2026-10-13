import { NICHE } from "@/niches"

/**
 * Marketing media for this deployment. Niche-specific slides, hero and steps
 * come from the niche pack (niches/<id>); model family covers are shared.
 */

/** Login / auth-modal carousel. */
export const SHOWCASE = NICHE.showcase

/** Cover image per model family (picker cards and the model card). */
export const FAMILY_COVERS: Record<string, string> = {
  Seedance: "/media/models/seedance.jpg",
  Kling: "/media/models/kling.jpg",
  Wan: "/media/models/wan.jpg",
  "Cinema Studio": "/media/models/cinema-studio.jpg",
  MiniMax: "/media/models/minimax.jpg",
  "Happy Horse": "/media/models/happy-horse.jpg",
  LTX: "/media/models/ltx.jpg",
  PixVerse: "/media/models/pixverse.jpg",
  Grok: "/media/models/grok.jpg",
  Genjutsu: "/media/showcase/dancer.jpg",
  Soul: "/media/models/soul.jpg",
  "Marketing Studio": "/media/models/marketing-studio.jpg",
  Recraft: "/media/models/recraft.jpg",
  Qwen: "/media/models/qwen.jpg",
  Ideogram: "/media/models/ideogram.jpg",
  "Z-Image": "/media/models/z-image.jpg",
}

/** Looping preview videos for model cards (falls back to the cover image). */
export const FAMILY_LOOPS: Record<string, string> = {
  Seedance: "/media/loops/seedance.mp4",
  Kling: "/media/loops/kling.mp4",
}

export function familyCover(
  family: string,
  surface: "image" | "video" | "audio"
): string {
  return (
    FAMILY_COVERS[family] ??
    (surface === "image"
      ? "/media/models/soul.jpg"
      : "/media/models/seedance.jpg")
  )
}

/** Empty-canvas heading and subtitle per surface and tab. */
export const HEADLINES = NICHE.headlines

/** "How it works" steps on the generator canvas. */
export const STEPS = NICHE.steps
