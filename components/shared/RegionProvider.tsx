"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  BASE_REGION,
  detectRegion,
  dismissBanner as persistDismissal,
  getStoredRegion,
  isBannerDismissed,
  regionById,
  setStoredRegion,
  type CurrencyCode,
  type Region,
  type RegionId,
} from "@/lib/regions";

type RegionContextValue = {
  /** The active region: the visitor's own choice if they made one, else the guess. */
  region: Region;
  currency: CurrencyCode;
  /** What detection thinks, regardless of what is active. */
  detected: RegionId | null;
  /** True once the client has read the cookie and storage. */
  ready: boolean;
  bannerVisible: boolean;
  chooseRegion: (id: RegionId) => void;
  dismiss: () => void;
};

const RegionContext = createContext<RegionContextValue | null>(null);

export function useRegion(): RegionContextValue {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error("useRegion must be used inside <RegionProvider>.");
  return ctx;
}

/**
 * Holds the active region and currency for the whole page.
 *
 * The first render is always the base region, on the server and on the client
 * alike, so hydration matches. Detection and the stored preference are read in
 * an effect afterwards; `ready` says when that has happened. Prices therefore
 * paint in AED and switch a frame later for a visitor whose region differs —
 * unavoidable on a statically generated page, and the pricing section is well
 * below the fold in any case.
 *
 * Precedence is: an explicit choice, then detection, then the base.
 */
export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [regionId, setRegionId] = useState<RegionId>(BASE_REGION);
  const [detected, setDetected] = useState<RegionId | null>(null);
  const [ready, setReady] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const [chosen, setChosen] = useState(false);

  useEffect(() => {
    const stored = getStoredRegion();
    const guess = detectRegion();

    setDetected(guess);
    setChosen(stored !== null);
    setRegionId(stored ?? guess);
    setDismissed(isBannerDismissed());
    setReady(true);
  }, []);

  const chooseRegion = useCallback((id: RegionId) => {
    setRegionId(id);
    setStoredRegion(id);
    setChosen(true);
    setDismissed(true);
    persistDismissal();
  }, []);

  const dismiss = useCallback(() => {
    setDismissed(true);
    persistDismissal();
  }, []);

  const value = useMemo<RegionContextValue>(() => {
    const region = regionById(regionId);

    // Only offer the switch to someone detection places outside the home
    // market, who has neither chosen nor dismissed before. Anyone already on
    // the right region has nothing to act on.
    const bannerVisible =
      ready && !dismissed && !chosen && detected !== null && detected !== BASE_REGION;

    return {
      region,
      currency: region.currency,
      detected,
      ready,
      bannerVisible,
      chooseRegion,
      dismiss,
    };
  }, [regionId, detected, ready, dismissed, chosen, chooseRegion, dismiss]);

  return <RegionContext.Provider value={value}>{children}</RegionContext.Provider>;
}
