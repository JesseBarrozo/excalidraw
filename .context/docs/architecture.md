---
type: doc
name: architecture
description: System architecture, layers, patterns, and design decisions
category: architecture
generated: 2026-08-11
status: filled
scaffoldVersion: "2.0.0"
---

# Architecture

- `packages/excalidraw/components/App.tsx` coordinates editor input, React state, scene mutation, clipboard handling, and rendering.
- `packages/element/src` owns immutable element types, constructors, geometry, binding, text measurement, and `Store` history deltas.
- `packages/excalidraw/scene` and `packages/excalidraw/renderer` turn scene elements into static and interactive canvases.
- `packages/excalidraw/actions` contains command definitions dispatched by the `ActionManager`.
- `excalidraw-app` integrates collaboration, storage, sharing, and production application concerns around the reusable package.

Element updates should use existing constructors and `newElementWith`/scene mutation APIs so versions, caches, collaboration, and undo remain coherent.
