import { NICHE } from "@/niches"

/** Public brand constants for this deployment's niche, safe for client and server. */
export const BRAND = {
  ...NICHE.brand,
  name: process.env.NEXT_PUBLIC_BRAND_NAME || NICHE.brand.name,
  /** Dismissible promo bar above the nav; empty string hides it. */
  promo: process.env.NEXT_PUBLIC_PROMO_BAR ?? "",
  promoHref: process.env.NEXT_PUBLIC_PROMO_HREF ?? "/pricing",
} as const
