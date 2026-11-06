/**
 * What is true today. A section that depends on one of these renders only when it is true, so the site never
 * shows something as live before it is. Flipping one is a one-line PR the owner approves.
 */
export const LAUNCH = {
  /** The paid tier can be bought (Paid Apps Agreement active, production web checkout, owner-approved copy). */
  proOnSale: false,
  /** The iPhone app is on the App Store (not only the TestFlight beta). */
  iosOnAppStore: false,
  /** The Android app is on Google Play. */
  androidOnPlay: false,
  /**
   * The lesson flow from visual round 6 (each unit in its painted room, as in the screenshots on this site) is in the web
   * app. Merged to the app's main in #445; this site goes live only after the owner confirms it is deployed.
   */
  lessonRoomsLive: true,
  /** The painted profile animals are in the app. Not yet: the art exists, the app does not use it. */
  profileAvatarsLive: false,
} as const;
