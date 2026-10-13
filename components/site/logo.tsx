import Link from "next/link"

import { BRAND } from "@/lib/brand"
import { cn } from "@/lib/utils"

/**
 * The niche's logo mark: its own image when the pack sets brand.logoSrc,
 * otherwise the built-in tile (accent fill, dark V). `inverted` swaps the two
 * for use on an accent background (the footer).
 */
export function LogoMark({
  className,
  inverted = false,
}: {
  className?: string
  inverted?: boolean
}) {
  if (BRAND.logoSrc)
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={BRAND.logoSrc}
        alt=""
        aria-hidden
        className={cn("size-8 rounded-lg object-contain", className)}
      />
    )
  const tile = inverted ? "fill-[#131517]" : "fill-lime"
  const ink = inverted ? "fill-lime" : "fill-[#131517]"
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      <rect width="32" height="32" rx="8" className={tile} />
      <path
        d="M7.5 9.5c2.6 0 4.4 1.3 5.6 3.9L16 19.6l4.3-9.2c.5-1 1.4-1.6 2.5-1.6h1.7L17.6 23.5h-3.2L9.2 12.4c-.4-.9-1-1.4-1.7-1.6V9.5z"
        className={ink}
      />
      <circle cx="23.6" cy="8.6" r="1.3" className={ink} />
    </svg>
  )
}

export function Logo({
  compact = false,
  className,
}: {
  compact?: boolean
  className?: string
}) {
  return (
    <Link
      href="/"
      aria-label={`${BRAND.name} home`}
      className={cn("flex shrink-0 items-center gap-2", className)}
    >
      <LogoMark className={compact ? "size-6" : "size-8"} />
      <span
        className={cn(
          "font-display text-foreground",
          compact ? "text-base" : "text-lg"
        )}
      >
        {BRAND.name}
      </span>
    </Link>
  )
}
