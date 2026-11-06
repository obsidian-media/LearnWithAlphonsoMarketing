import { LAUNCH } from "./launch-state";

/**
 * The only file allowed to name the paid tier (app/claims-guard.test.ts). Never a price, a trial length or a
 * Hector message count here: those come from the store at purchase time, inside the app.
 */
export const PRO = {
  name: "Alphonso Pro",
  /** Shown wherever the tier is named while it cannot be bought. */
  status: LAUNCH.proOnSale ? null : "Coming soon",
  priceNote: "Price and free trial are shown in the app.",
  priceDetail:
    "They come from the App Store or the web checkout, in your currency, before you pay anything.",
} as const;
