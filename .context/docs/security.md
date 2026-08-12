---
type: doc
name: security
description: Security policies, authentication, secrets management, and compliance requirements
category: security
generated: 2026-08-11
status: filled
scaffoldVersion: "2.0.0"
---

# Security

Treat clipboard, imported files, URLs, and serialized scenes as untrusted. Reuse sanitization and validation in `packages/excalidraw/clipboard.ts`, `packages/excalidraw/data`, and embeddable URL helpers rather than parsing external content ad hoc. Do not commit secrets; hosted-app configuration belongs in environment variables documented by the application.

Keep browser APIs behind capability checks and preserve MIME/event timing constraints, especially clipboard reads that browsers require during the originating event frame.
