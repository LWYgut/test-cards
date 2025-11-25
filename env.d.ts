// Augment the NodeJS namespace to include API_KEY in ProcessEnv.
// This avoids redeclaring the global 'process' variable which causes conflicts.

declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string | undefined;
  }
}
