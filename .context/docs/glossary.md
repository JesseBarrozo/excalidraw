---
type: doc
name: glossary
description: Project terminology, type definitions, domain entities, and business rules
category: glossary
generated: 2026-08-11
status: filled
scaffoldVersion: "2.0.0"
---

# Glossary

- **AppState**: serializable and transient editor UI state defined in `packages/excalidraw/types.ts`.
- **Scene**: ordered collection and lookup maps for Excalidraw elements.
- **Element**: immutable, versioned drawing record defined by `@excalidraw/element`.
- **Store increment**: durable or ephemeral delta emitted from scene/AppState commits.
- **Capture**: a durable Store update that becomes undoable.
- **WYSIWYG**: textarea-based text editor in `packages/excalidraw/wysiwyg`.
- **Plain paste**: Ctrl/Cmd+Shift+V mode that bypasses rich clipboard interpretations.
