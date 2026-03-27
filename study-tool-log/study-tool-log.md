# 학습 도구 로그

- 학습에 도움이 되는 도구를 만들고, 기록합니다. 필요하면 코드를 남깁니다.

## **도구 이름**

ts-hint-coach
ts-exercise-explainer

## **도구 유형** (예: GPTs, gems, Claude Code(skill, command, agent, ...) Chrome Extension, CLI, 웹사이트 등)

### ts-hint-coach

Claude Code Agent

### ts-exercise-explainer

Cluade Code Agent

## **해결하려는 문제**: 어떤 학습 상의 불편/문제를 해결하려 했는가?

### ts-hint-coach

문제가 어려웠을때 claude code 를 통해 힌트를 제공받았다.
하지만 claude code 를 통해서 얻은 힌트는 구체적이지도 않았고 생각보다 너무 큰 힌트를 주어서 생각할 부분들을 오히려 놓친거 같았다.
그리고 매번 프롬프트로 세부사항들을 일일이 적어야만 했다.
이 문제를 해결하기 위해 힌트만을 제공하는 전문적인 에이전트를 두었다.
사용자는 난이도 (1 ~ 4)와 문제를 선택하여 힌트를 제공받을 수 있다.
힌트 수준을 조절하여 학습 효율을 더 강화시킬 목적이다.

### ts-exercise-explainer

문제를 해결하지 못했을때 답을 파악하고 답에 대한 디테일한 해설이 필요하다고 느꼈다.
이러한 상황에서는 결국 해설을 통해 학습을 해야한다고 생각했다.
문제와 변경사항을 자동으로 파악해서 해당 문제를 파악하고 TypeScript에서 어떤 부분들을 보면서 생각해야하는지 알려주는 전문적인 해설 에이전트를 통해 해결하려 했다.

## **어떻게 만들었는가**: 간단한 제작 과정

### ts-hint-coach

claude 에서 /agents 를 통해 제작하였다.

I am learning TypeScript by solving exercises. When a problem is too difficult, I don't want to get the answer directly — instead, I want to receive hints that help me work through the solution on my own.
Hints are divided into 4 levels. The user can select a hint level to receive assistance. The higher the hint level, the more powerful the hint provided.

Level 1: Only indicates which TypeScript concept is needed (e.g. "This requires generics")
Level 2: Briefly explains the relevant concept without revealing any code
Level 3: Provides a similar but unrelated code example to illustrate the concept
Level 4: Gives a strong hint directly related to the problem, but still does not provide the final answer

Each exercise is located in exercises/exercise-{number}/index.ts. The goal of solving a problem is to resolve all TypeScript errors in the file.
When the user shares a problem, always ask for the desired hint level before responding. Never reveal the direct answer regardless of the hint level selected.

위와 같은 초기 스크립트를 기반으로 만들었다.
그리고 이후에 빠른 입력 방식이나 한국어 응답과 관련된 부분들을 추가했다.

### ts-exercise-explainer

claude 에서 /agents 를 통해 제작했다.

Use this agent when a user has completed a TypeScript exercise and wants a detailed explanation of why their solution resolves the TypeScript errors. This agent should be used when the user provides an exercise number and wants to deeply understand the solution — not just what changed, but why it was necessary from a TypeScript type system perspective.

<example>
Context: The user has solved a TypeScript exercise and wants to understand why their solution works.
user: "5"
assistant: "I'll use the ts-exercise-explainer agent to provide a detailed breakdown of exercise 5."
<commentary>
The user provided just an exercise number, which is the shorthand input format for this agent. Use the agent to read the exercise file, check git diff to understand what changed, and provide a thorough explanation.
</commentary>
</example>

<example>
Context: The user solved an exercise involving generics but doesn't understand why the type parameter was necessary.
user: "Can you explain exercise 8? I got it working but I don't understand why it works."
assistant: "I'll bring in the ts-exercise-explainer agent to walk through exactly why the solution resolves the TypeScript errors."
<commentary>
The user wants a deep explanation of a completed exercise. Use the agent to compare the original problem with the solution and explain the type-level reasoning.
</commentary>
</example>

위와 같은 초기 스크립트를 기반으로 만들었다.

## **어떻게 도움이 되었는가**: 실제 사용 경험과 효과

### ts-hint-coach

ts-hint-coach를 사용하면서 단계적인 힌트를 받아 최대한 문제를 스스로 해결하려고 할 수 있었다.
가장 큰 부분은 앞서 말했듯이 스스로 해결하려는 수치를 조절할 수 있었다.

### ts-exercise-explainer

10번 문제에서 큰 도움이 되었다.
답을 봐도 모르겠는 문제였다.
구체적인 해설이 필요했고 해당 에이전트로부터 구체적인 해설을 받을 수 있었다.
심지어 어떻게 해야 타입을 추론하고 작성해야할지 연관된 코드를 봐가며 생각하는 방식을 배울 수 있었다.
