---
type: doc
name: project-overview
description: High-level overview of the project, its purpose, and key components
category: overview
generated: 2026-08-11
status: filled
scaffoldVersion: "2.0.0"
---

# Project overview

Excalidraw is a TypeScript monorepo for a collaborative, canvas-based drawing editor. The reusable editor is in `packages/excalidraw`, element geometry and mutation logic is in `packages/element`, shared primitives are in `packages/common`, and the hosted application is in `excalidraw-app`.

The main UI controller is `packages/excalidraw/components/App.tsx`. Public React exports start at `packages/excalidraw/index.tsx`; persistence and import/export live under `packages/excalidraw/data`. Changes should keep the embedded package and hosted app compatible.
