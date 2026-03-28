---
exercise: 02
concept: Union Type
date: 2026-03-27
---

## What I learned

`User | Admin`처럼 `|` 연산자로 "둘 중 하나"를 표현하는 union type을 정의하는 법을 배웠다.
Union type에서는 모든 멤버 타입에 공통으로 있는 속성만 타입 에러 없이 접근할 수 있다.

## What confused me at first

처음에는 `User | Admin`과 `{ name: string; age: number } & ({ occupation: string } | { role: string })`이
왜 같은 타입인지 명확히 설명하기 어려웠다.

## What I understood

TypeScript 타입 시스템에서 **분배 법칙(distributive law)** 이 성립한다는 것을 이해했다.
수학의 `a × (b + c) = a×b + a×c`처럼, `&`를 곱셈, `|`를 덧셈으로 보면:

```
{ name, age } & ({ occupation } | { role })
= ({ name, age } & { occupation }) | ({ name, age } & { role })
= User | Admin
```

또한 `logPerson(user: Person)`에서 `user.occupation`에 접근할 수 없는 이유도 설명할 수 있었다.
TypeScript는 `Person`이 `User`인지 `Admin`인지 확정할 수 없기 때문에,
공통 속성인 `name`, `age`만 안전하게 접근 가능하다.

## Alternative approaches

특정 타입의 속성에 접근하려면 타입을 좁혀야 한다 → exercise-03에서 다룰 type guard로 해결.

## References

- https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types
