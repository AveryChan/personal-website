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

## Updating content

Almost all site text lives in one file: [`src/content/profile.ts`](src/content/profile.ts). Edit that file when your CV, copy, or links change. Components only decide how the data is displayed.

With `npm run dev` running, save the file and refresh the browser to see the change. When you are happy with it, [redeploy to Cloudflare](#redeploy-to-the-existing-worker).

| What to change | Where in `profile.ts` |
| --- | --- |
| Name, title, tagline, location, status | Top of the `profile` object |
| About paragraphs and focus areas | `about` |
| Impact numbers | `metrics` (keep matching notes in `runLog` in sync) |
| Jobs and career highlights | `roles` |
| Tools and disciplines | `stack` and `skills` |
| Certificates and degree | `credentials` and `education` |
| Section headings | `sections` |
| LinkedIn contact button | `contact` |
| GitHub (or other) links under Contact | `socials` — fill in `href` to show the link |

### Adding or publishing portfolio items

Portfolio cards are the `portfolio` array near the top of `profile.ts`. Each item looks like:

```ts
{
  id: "case-studies",
  title: "Pipeline case studies",
  description:
    "Deep dives into migrations, architecture decisions and the cost and runtime numbers behind them.",
  tag: "Case studies",
  // href: "https://example.com/case-studies",
}
```

- **Publish an existing card:** add an `href`. The dashed "Coming soon" card becomes a live link with no other code changes.
- **Add a new card:** append another object to the `portfolio` array with a unique `id`, `title`, `description`, and `tag`. Include `href` when the work is ready to share; omit it to keep "Coming soon".
- **Update the Portfolio section intro** (for example once work has shipped) in `sections.portfolio`.

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

`vinext init` installs the Workers packages, adds `dev:vinext` and `build:vinext` scripts, and generates `cloudflare.config.ts`. Log in, then build and deploy the Worker named `personal-site`:

```bash
npx cf auth login
npm run dev:vinext
npm run build:vinext
npx @vinext/cloudflare deploy
```

The deploy command prints a `*.workers.dev` URL. `vinext init` writes `cloudflare.config.ts` for this site. Keep the generated `entrypoint`, `assets`, and `ASSETS` binding, then set the account and custom domain and deploy again. The account ID is the first path segment of a dashboard URL (`https://dash.cloudflare.com/<account-id>`). You can set `CLOUDFLARE_ACCOUNT_ID` in the environment instead of `accountId`.

### Redeploy to the existing Worker

After the first deploy, you do **not** need to run `npx vinext init` again. Rebuild and push to the existing Worker named `personal-site` in `cloudflare.config.ts`:

```bash
npm run build:vinext
npm run deploy:vinext
```

This project has `cacheComponents` enabled, so production deploys need a persistent cache. That is already wired up: `kvDataAdapter()` in `vite.config.ts` and a `VINEXT_KV_CACHE` KV binding in `cloudflare.config.ts`. Keep both when you change those files.

That is equivalent to `vite build` followed by `vinext-cloudflare deploy`.

If your local Cloudflare login has expired:

```bash
npx cf auth login
```

Or set `CLOUDFLARE_API_TOKEN` (and optionally `CLOUDFLARE_ACCOUNT_ID`) in the environment.

Optional: preview the vinext build locally before deploying:

```bash
npm run build:vinext
npm run start:vinext
```

```ts
import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
  worker: defineWorker({
    name: "personal-site",
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
