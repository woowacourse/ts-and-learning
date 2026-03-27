---
name: Project Structure
description: Exercise file naming conventions, directory layout, and TypeScript config for this repo
type: project
---

Exercises live at `exercises/exercise-N/index.ts` (e.g., `exercises/exercise-10/index.ts`).

The repo is a TypeScript learning set (likely based on typescript-exercises.github.io or similar).
Each file contains:
- A comment block with the exercise intro and instructions
- A problem stub (e.g., `function foo(arg: unknown): unknown { return null; }`)
- Usage code (`startTheApp`, `logPerson`, etc.) that must type-check against the solution

**Why:** Understanding the structure lets us locate files quickly and know where to look for the "before" state (the stub) vs. the "after" state (the solution).
**How to apply:** When given an exercise number N, go straight to `exercises/exercise-N/index.ts`. The git diff on that file shows the stub → solution transition.
