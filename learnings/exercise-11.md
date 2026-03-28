---
exercise: 11
concept: declare module (모듈 타입 선언)
date: 2026-03-26
---

## What I learned
타입이 없는 외부 JavaScript 라이브러리에 `.d.ts` 파일로 타입 선언을 직접 작성하는 방법.
`declare module 'str-utils' { ... }` 문법으로 TypeScript에게 해당 모듈의 타입 형태를 알려줄 수 있다.

## What confused me at first
- `declare module` 문법 자체를 몰랐음
- 일반 TypeScript 모듈 파일과 `.d.ts` 선언 파일의 차이가 처음엔 헷갈렸음
- type alias를 `declare module` 안에서 어떻게 활용하는지 몰랐음

## What I understood
- 타입이 없는 라이브러리를 import하면 컴파일 단계에서 바로 에러가 난다
- `.d.ts` 파일은 런타임에 영향을 주지 않는다 — TypeScript는 컴파일 타임에만 타입을 검사하고, JavaScript로 변환되면 타입 정보는 모두 사라지기 때문
- `@types/react`, `@types/node` 같은 패키지가 바로 이 원리로 만들어진 것
- 5개 함수가 모두 `(str: string) => string`으로 동일하다는 걸 스스로 발견하고 `StringTransformer` type alias로 중복을 줄임

## Alternative approaches
- `export function` 대신 `export const`로 함수 타입을 선언할 수 있음 (둘 다 통과)
- type alias 없이 각 함수마다 타입을 반복 작성하는 방법도 있지만, 중복이 생기고 유지보수가 어려워짐

## References
- https://www.typescriptlang.org/docs/handbook/2/type-declarations.html
- https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules
