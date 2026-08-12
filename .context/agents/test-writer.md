---
type: agent
name: Test Writer
description: Write comprehensive unit and integration tests
agentType: test-writer
phases: [E, V]
generated: 2026-08-11
status: filled
scaffoldVersion: "2.0.0"
---

## Repository playbook

Use Vitest and the editor helpers in `packages/excalidraw/tests/helpers`. Assert user-visible state, element ordering, Store/history outcomes, and async completion with `waitFor`. Add lower-level tests beside pure utilities and keep timing assertions bounded and deterministic.

## Available Skills

The following skills provide detailed procedures for specific tasks. Activate them when needed:

| Skill | Description |
|-------|-------------|
| [test-generation](./../skills/test-generation/SKILL.md) | Generate comprehensive test cases for code. Use when Writing tests for new functionality, Adding tests for bug fixes (regression tests), or Improving test coverage for existing code |
