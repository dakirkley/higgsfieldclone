"use client"

import Link from "next/link"

import { BRAND } from "@/lib/brand"
import { NICHE } from "@/niches"

import { LogoMark } from "./logo"

type Column = {
  title: string
  links: readonly { label: string; href: string }[]
}

/** Niche columns first, then the shared company links. */
const COLUMNS: readonly Column[] = [
  ...NICHE.footer.columns,
  {
    title: "Company",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Community", href: "/community" },
      { label: "Support", href: `mailto:${BRAND.supportEmail}` },
      { label: "Terms", href: "/legal/terms" },
      { label: "Privacy", href: "/legal/privacy" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="mt-24">
      <div className="bg-lime px-6 py-14 text-[#131517] md:px-12">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div className="flex flex-col gap-6">
            <LogoMark inverted className="size-10" />
            <p className="font-display text-4xl leading-[0.95] md:text-5xl">
              {NICHE.footer.tagline[0]}
              <br />
              {NICHE.footer.tagline[1]}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((column) => (
              <div key={column.title} className="flex flex-col gap-3">
                <p className="text-sm font-medium text-[#131517]/70">
                  {column.title}
                </p>
                {column.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-[15px] font-medium hover:underline hover:underline-offset-4"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between gap-3 px-6 py-5 text-sm text-muted-foreground md:flex-row md:items-center md:px-12">
        <p>
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-4 text-foreground">
          <Link href="/legal/terms" className="hover:text-lime">
            Terms
          </Link>
          <Link href="/legal/privacy" className="hover:text-lime">
            Privacy
          </Link>
          <Link href="/legal/acceptable-use" className="hover:text-lime">
            Acceptable use
          </Link>
          <button
            type="button"
            className="hover:text-lime"
            onClick={() =>
              window.dispatchEvent(new Event("vireo:cookie-preferences"))
            }
          >
            Cookie settings
          </button>
        </div>
      </div>
    </footer>
  )
}
