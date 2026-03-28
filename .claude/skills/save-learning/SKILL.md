---
name: save-learning
description: Save learning notes for the current exercise. Use when the student says "save", "정리해줘", "학습 기록", or "/save-learning".
user-invocable: true
disable-model-invocation: true
allowed-tools: Read, Write, Edit
---

Save learning notes for the current exercise.

1. Identify the exercise number from the current conversation
2. Save to `learnings/exercise-{number}.md` in this format:

```markdown
---
exercise: {number}
concept: {core TypeScript concept}
date: {YYYY-MM-DD}
---

## What I learned
{Core concept summary for this exercise}

## What confused me at first
{Parts where the student got stuck, based on actual conversation}

## What I understood
{Based on what the student actually explained, not Claude's interpretation}

## Alternative approaches
{Alternatives or trade-offs from follow-up discussion}

## References
{Official docs links shared during the conversation}
```

3. If the file already exists, update rather than overwrite
4. Show the student a brief summary of what was saved
5. Update `context/plan.md` status to `done`
