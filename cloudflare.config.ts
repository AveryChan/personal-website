import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "personal-site",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-26",
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
      // Backs vinext's data cache (binding name expected by kvDataAdapter()).
      VINEXT_KV_CACHE: bindings.kv(),
    },
  }),
});
