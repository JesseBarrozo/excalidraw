---
type: doc
name: testing-strategy
description: Test frameworks, patterns, coverage requirements, and quality gates
category: testing
generated: 2026-08-11
status: filled
scaffoldVersion: "2.0.0"
---

# Testing strategy

Vitest and Testing Library cover editor behavior under `packages/excalidraw/tests`; lower-level package tests live beside their source or in each package's `tests` directory. Prefer behavior assertions through shared helpers (`API`, `UI`, `Keyboard`, `Pointer`) and deterministic clipboard events from `packages/excalidraw/clipboard.ts`.

Required checks are targeted Vitest, TypeScript (`corepack yarn test:typecheck`), ESLint, and Prettier. Async canvas changes must be awaited with `waitFor`; history tests should remember that deleted elements remain in the including-deleted scene array.
