---
type: doc
name: tooling
description: Scripts, IDE settings, automation, and developer productivity tips
category: tooling
generated: 2026-08-11
status: filled
scaffoldVersion: "2.0.0"
---

# Tooling

The repository uses Yarn workspaces, TypeScript, React, Vite, Vitest, ESLint, and Prettier. Useful commands are `corepack yarn start`, `corepack yarn test:app <test> --watch=false`, `corepack yarn test:typecheck`, and `corepack yarn build:packages`.

Path aliases in `tsconfig.json` map `@excalidraw/common`, `@excalidraw/element`, and other workspace packages to their source. Prefer `rg`/`rg --files` for navigation and package-local imports that follow nearby conventions.
