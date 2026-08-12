---
type: doc
name: data-flow
description: How data moves through the system and external integrations
category: data-flow
generated: 2026-08-11
status: filled
scaffoldVersion: "2.0.0"
---

# Data flow

Pointer, keyboard, clipboard, and drop events enter through `packages/excalidraw/components/App.tsx`. Commands may route through `packages/excalidraw/actions`; direct editor interactions mutate the `Scene`. React renders observe scene elements and `AppState`, while `Store` emits durable or ephemeral increments for history, persistence, collaboration, and public `onChange` consumers.

Clipboard data is normalized in `packages/excalidraw/clipboard.ts`, interpreted by `App.insertClipboardContent`, and inserted as restored elements, files, embeddables, charts, or text. Serialized scene and file flows are implemented under `packages/excalidraw/data` and composed by `excalidraw-app/data`.
