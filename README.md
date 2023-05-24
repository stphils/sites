# Belong Sites Monorepo

This monorepo contains all the Belong Church sites and packages.

**Why a monorepo?**

A monorepo architecture makes it easy to share code between all of our church sites, which share a single UI component library and content fetches.

## Using this repo

> It's recommended to use [pnpm](https://pnpm.io/) as your package manager, as it makes working with monorepos easier

1. Clone the project

   ```sh
   git clone https://github.com/stphils/sites.git
   cd sites
   ```

2. Install the dependencies

   ```sh
   pnpm install
   ```

3. Start the development process

   ```sh
   pnpm run dev
   ```

   > You can run commands for a single package by using `--filter`, e.g. `pnpm run dev --filter belong`

## Apps and Packages

### Apps

All of our apps, except for out Sanity CMS, are built with NextJs.

- `apps/content`

  [stphils.sanity.studio](stphils.sanity.studio) \
  Sanity CMS source.

- `apps/belong`

  [belongchurch.au](https://belongchurch.au) \
  Landing page for our parent church.

- `apps/stphils`

  [stphils.org.au](https://stphils.org.au) \
  St Phil's Eastwood church site.

- `apps/stmarks`

  [stmarksanglican.org.au](https://stmarksanglican.org.au) \
  St Marks Ermington church site.

- `apps/docs`

  [docs.belongchurch.au](https://docs.belongchurch.au) \
  Church group documentation site.

### Packages

- `packages/eslint-config-custom` Shared ESLint config
- `packages/tailwind-config` Shared tailwind config
- `packages/tsconfig` Shared TSConfig
- `packages/ui` UI component library

## Guides

This repo is based on the [Turborepo Tailwind starter repo](https://github.com/vercel/turbo/tree/main/examples/with-tailwind). More info can be found there on why the `ui` package is compiled rather than imported directly.
