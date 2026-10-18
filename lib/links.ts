// Every outbound link to the app lives here so a campaign change is one edit.

/** Web app sign-up. utm_source=site tells the app which visitors came from this website. */
export const START_LEARNING_URL =
  "https://learn.alphonsoecosystem.app/auth?utm_source=site&utm_medium=button&utm_campaign=beta1";

/**
 * TestFlight public link of the "Other" group. Reddit posts use their own group
 * links so TestFlight's tester counts show the source; never put those here.
 * app/claims-guard.test.ts fails the build if any other TestFlight link appears.
 */
export const IPHONE_BETA_URL = "https://testflight.apple.com/join/AVAgvB3y";
