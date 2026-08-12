---
type: agent
name: Refactoring Specialist
description: Identify code smells and improvement opportunities
agentType: refactoring-specialist
phases: [E]
generated: 2026-08-11
status: filled
scaffoldVersion: "2.0.0"
---

## Repository playbook

Refactor behind existing tests and preserve public exports, serialized element shapes, and history behavior. Prefer small package-local helpers over widening `App.tsx`; run focused tests after each mechanical move and full typecheck before handoff.

## Available Skills

The following skills provide detailed procedures for specific tasks. Activate them when needed:

| Skill | Description |
|-------|-------------|
| [refactoring](./../skills/refactoring/SKILL.md) | Refactor code safely with a step-by-step approach. Use when Improving code structure without changing behavior, Reducing code duplication, or Simplifying complex logic |
