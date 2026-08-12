---
type: doc
name: development-workflow
description: Day-to-day engineering processes, branching, and contribution guidelines
category: workflow
generated: 2026-08-11
status: filled
scaffoldVersion: "2.0.0"
---

# Development workflow

Use Yarn 1 through Corepack (`corepack yarn`). Keep changes scoped and preserve unrelated worktree modifications. Format touched files with Prettier and run targeted Vitest files during iteration.

Before handoff, run `corepack yarn test:typecheck`, targeted ESLint with `--max-warnings=0`, and the relevant `corepack yarn test:app <files> --watch=false` command. Add regression tests beside the affected package; integration behavior for the editor generally belongs under `packages/excalidraw/tests`.
