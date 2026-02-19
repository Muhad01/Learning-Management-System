"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import {
  type BrandColorId,
  getStoredBrandColor,
  getStoredCustomHex,
  setStoredBrandColor as saveBrandColor,
  setStoredCustomHex as saveCustomHex,
  darkenHex,
  hexToMutedBg,
  hexToMutedFg,
} from "@/lib/color-theme"

interface ColorThemeContextValue {
  brandColor: BrandColorId
  customHex: string | null
  setBrandColor: (id: BrandColorId) => void
  setCustomHex: (hex: string) => void
}

const ColorThemeContext = createContext<ColorThemeContextValue | null>(null)

function applyBrandToDocument(brand: BrandColorId, customHex: string | null) {
  const doc = document.documentElement
  doc.setAttribute("data-brand", brand)
  doc.style.removeProperty("--brand-custom")
  doc.style.removeProperty("--brand-custom-secondary")
  doc.style.removeProperty("--brand-custom-hover")
  doc.style.removeProperty("--brand-custom-muted")
  doc.style.removeProperty("--brand-custom-muted-foreground")
  if (brand === "custom" && customHex) {
    doc.style.setProperty("--brand-custom", customHex)
    doc.style.setProperty("--brand-custom-secondary", darkenHex(customHex, 0.85))
    doc.style.setProperty("--brand-custom-hover", darkenHex(customHex, 0.85))
    doc.style.setProperty("--brand-custom-muted", hexToMutedBg(customHex))
    doc.style.setProperty("--brand-custom-muted-foreground", hexToMutedFg(customHex))
  }
}

export function ColorThemeProvider({ children }: { children: React.ReactNode }) {
  const [brandColor, setBrandColorState] = useState<BrandColorId>("green")
  const [customHex, setCustomHexState] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setBrandColorState(getStoredBrandColor())
    setCustomHexState(getStoredCustomHex())
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    applyBrandToDocument(brandColor, customHex)
  }, [mounted, brandColor, customHex])

  const setBrandColor = useCallback((id: BrandColorId) => {
    setBrandColorState(id)
    saveBrandColor(id)
  }, [])

  const setCustomHex = useCallback((hex: string) => {
    const normalized = hex.startsWith("#") ? hex : "#" + hex
    setCustomHexState(normalized)
    saveCustomHex(normalized)
    setBrandColorState("custom")
    saveBrandColor("custom")
  }, [])

  const value: ColorThemeContextValue = {
    brandColor,
    customHex,
    setBrandColor,
    setCustomHex,
  }

  return (
    <ColorThemeContext.Provider value={value}>
      {children}
    </ColorThemeContext.Provider>
  )
}

export function useColorTheme() {
  const ctx = useContext(ColorThemeContext)
  if (!ctx) {
    throw new Error("useColorTheme must be used within ColorThemeProvider")
  }
  return ctx
}
