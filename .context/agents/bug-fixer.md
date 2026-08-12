---
type: agent
name: Bug Fixer
description: Analyze bug reports and error messages
agentType: bug-fixer
phases: [E, V]
generated: 2026-08-11
status: filled
scaffoldVersion: "2.0.0"
---

## Repository playbook

Reproduce failures with the helpers in `packages/excalidraw/tests/helpers`, trace the smallest owning layer, and add a regression test before or with the fix. Check element versions, deleted-element semantics, Store capture mode, browser event timing, and frame ordering when relevant.

## Available Skills

The following skills provide detailed procedures for specific tasks. Activate them when needed:

| Skill | Description |
|-------|-------------|
| [bug-investigation](./../skills/bug-investigation/SKILL.md) | Investigate bugs systematically and perform root cause analysis. Use when Investigating reported bugs, Diagnosing unexpected behavior, or Finding the root cause of issues |
