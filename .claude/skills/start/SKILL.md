---
name: start
description: Start a new TypeScript exercise. Use when the student says "start exercise", "문제 시작", or "/start {number}".
user-invocable: true
disable-model-invocation: true
allowed-tools: Read, Bash, Edit, Write
---

Start exercise $ARGUMENTS.

1. Read the matching section in `context/curriculum.md`
2. Read `exercises/exercise-$ARGUMENTS/index.ts` for the problem description (comments)
3. Read `exercises/exercise-$ARGUMENTS/test.ts` for pass conditions
4. Based on context/curriculum.md, present to the student (never give the answer):
   - Core concept (from "core concept" field)
   - Prerequisites check: if prior exercise knowledge is needed, ask if they understand it
   - Reading material (from "reading" field)
   - 1 guiding question only (from "guiding question" field)
5. Run `npm run ex $ARGUMENTS` to check current status and prompt the student to begin
6. Update `context/plan.md` status to `in progress`

Rules:
- Never reveal solution code or approach directly
- Do not give all hint levels at once
- If prerequisites seem weak, suggest going back to the earlier exercise
