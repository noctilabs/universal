"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import type { LandingLocale } from "@modules/landing/data/landing-translations"

const STORAGE_KEY = "universal_landing_locale"

function readStoredLocale(): LandingLocale {
  if (typeof window === "undefined") return "en"
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "es" || stored === "en") return stored
  } catch {
    // ignore
  }
  return "en"
}

type LandingLocaleContextValue = {
  locale: LandingLocale
  setLocale: (locale: LandingLocale) => void
}

const LandingLocaleContext = createContext<LandingLocaleContextValue | null>(
  null
)

type LandingLocaleProviderProps = {
  children: React.ReactNode
}

/**
 * Provides the current landing language (en/es) and setter. Preference is persisted to localStorage.
 * Does not change the URL; use this for in-place language switching on the landing experience.
 */
export function LandingLocaleProvider({ children }: LandingLocaleProviderProps) {
  const [locale, setLocaleState] = useState<LandingLocale>("en")

  useEffect(() => {
    setLocaleState(readStoredLocale())
  }, [])

  const setLocale = useCallback((next: LandingLocale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }, [])

  const value = useMemo<LandingLocaleContextValue>(
    () => ({ locale, setLocale }),
    [locale, setLocale]
  )

  return (
    <LandingLocaleContext.Provider value={value}>
      {children}
    </LandingLocaleContext.Provider>
  )
}

/**
 * Returns the current landing locale and setter. Must be used within LandingLocaleProvider.
 */
export function useLandingLocale(): LandingLocaleContextValue {
  const ctx = useContext(LandingLocaleContext)
  if (!ctx) {
    throw new Error(
      "useLandingLocale must be used within a LandingLocaleProvider"
    )
  }
  return ctx
}
