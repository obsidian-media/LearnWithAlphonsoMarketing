import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    exclude: ["node_modules/**", "e2e/**"],
    // This dev machine intermittently fails to start multiple fork workers
    // (vitest-pool-runner worker-response timeouts) under load; a single
    // worker is slower but reliable here. (isolate:false was tried for
    // speed but caused real cross-file DOM pollution -- RTL's cleanup
    // wasn't enough without per-file isolation -- so it's not used.)
    fileParallelism: false,
  },
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "./") },
  },
});
