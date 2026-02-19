export const COLOR_THEME_STORAGE_KEY = "lms-brand-color"
export const CUSTOM_COLOR_STORAGE_KEY = "lms-brand-custom-hex"

export type BrandColorId = "green" | "blue" | "purple" | "red" | "orange" | "teal" | "custom"

export interface BrandColorOption {
  id: BrandColorId
  name: string
  /** Main hex for swatch and custom fallback */
  hex: string
}

export const BRAND_COLOR_OPTIONS: BrandColorOption[] = [
  { id: "green", name: "Green", hex: "#16a34a" },
  { id: "blue", name: "Blue", hex: "#2563eb" },
  { id: "purple", name: "Purple", hex: "#9333ea" },
  { id: "red", name: "Red", hex: "#dc2626" },
  { id: "orange", name: "Orange", hex: "#ea580c" },
  { id: "teal", name: "Teal", hex: "#0d9488" },
  { id: "custom", name: "Custom", hex: "#16a34a" },
]

/** Darken hex by a simple ratio for secondary/hover (approx 90%) */
export function darkenHex(hex: string, ratio = 0.9): string {
  const n = hex.slice(1)
  const r = Math.max(0, Math.floor(parseInt(n.slice(0, 2), 16) * ratio))
  const g = Math.max(0, Math.floor(parseInt(n.slice(2, 4), 16) * ratio))
  const b = Math.max(0, Math.floor(parseInt(n.slice(4, 6), 16) * ratio))
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")
}

/** Light tint for muted background (approx 15% opacity of brand) */
export function hexToMutedBg(hex: string): string {
  const n = hex.slice(1)
  const r = parseInt(n.slice(0, 2), 16)
  const g = parseInt(n.slice(2, 4), 16)
  const b = parseInt(n.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, 0.15)`
}

export function hexToMutedFg(hex: string): string {
  return darkenHex(hex, 0.6)
}

export function getStoredBrandColor(): BrandColorId {
  if (typeof window === "undefined") return "green"
  const stored = localStorage.getItem(COLOR_THEME_STORAGE_KEY) as BrandColorId | null
  if (stored && BRAND_COLOR_OPTIONS.some((o) => o.id === stored)) return stored
  return "green"
}

export function getStoredCustomHex(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(CUSTOM_COLOR_STORAGE_KEY)
}

export function setStoredBrandColor(id: BrandColorId): void {
  if (typeof window === "undefined") return
  localStorage.setItem(COLOR_THEME_STORAGE_KEY, id)
}

export function setStoredCustomHex(hex: string): void {
  if (typeof window === "undefined") return
  localStorage.setItem(CUSTOM_COLOR_STORAGE_KEY, hex)
}
