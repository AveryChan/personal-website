This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy on Cloudflare

Deploy this site to [Cloudflare Workers](https://developers.cloudflare.com/workers/frameworks/framework-guides/nextjs/) with [vinext](https://github.com/cloudflare/vinext). The initializer leaves `npm run dev` in place and adds a parallel Workers setup.

This project uses `cacheComponents` and `partialPrefetching` in `next.config.ts`. Run the compatibility check first and read anything it reports before deploying.

```bash
npx vinext check
npx vinext init --platform=cloudflare --cdn-cache=none --data-cache=none --image-optimization=none
```

`vinext init` installs the Workers packages, adds `dev:vinext` and `build:vinext` scripts, and generates `cloudflare.config.ts`. Log in, then build and deploy the Worker named `avery-chan-site`:

```bash
npx cf auth login
npm run dev:vinext
npm run build:vinext
npx @vinext/cloudflare deploy
```

The deploy command prints a `*.workers.dev` URL. `vinext init` writes `cloudflare.config.ts` for this site. Keep the generated `entrypoint`, `assets`, and `ASSETS` binding, then set the account and custom domain and deploy again. The account ID is the first path segment of a dashboard URL (`https://dash.cloudflare.com/<account-id>`). You can set `CLOUDFLARE_ACCOUNT_ID` in the environment instead of `accountId`.

```ts
import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
  worker: defineWorker({
    name: "avery-chan-site",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-02",
    domains: ["example.com"],
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
    },
  }),
});
```

For CI, create an API token from the **Edit Cloudflare Workers** template and set `CLOUDFLARE_API_TOKEN`. That token is what `npx @vinext/cloudflare deploy` uses when there is no local `cf auth login` session.
