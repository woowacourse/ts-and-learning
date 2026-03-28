# Exercise 06 Mistake Notes

## Function Overloads

## 핵심 정정
- `personType: string` / `"user" | "admin"` 으로는 리턴 타입 좁히기 불가 → 오버로드 시그니처 2개 + 구현 1개 구조 필요
- `User[] | Admin[]` 은 호출부에서 어느 쪽인지 TS가 모름 → 오버로드로 각각 선언해야 좁혀짐

---

## Generics (getObjectKeys 보너스)

| | 질문 | 답변 | 평가 |
|---|---|---|---|
| Q1 | `getObjectKeys<T>`에서 T는 뭘 대신해야 해? | `T extends keyof Partial<Person>` — 키 타입으로 잡으려 함 | ❌ |
| Q2 | 리턴 타입은? | `Required<User>[] \| Required<Admin>[]` — 객체 배열로 잡음 | ❌ |

## 핵심 정정
- 제네릭 `T`는 키가 아니라 **객체 타입**을 대신함 → `T extends object`
- 리턴은 객체가 아니라 키 배열 → `(keyof T)[]`
- `Object.keys`가 `string[]`인 이유: JS 스펙상 객체 키는 string (또는 Symbol), TS도 그대로 따라감

## 아직 모르는 것
- `as (keyof T)[]` 캐스팅이 필요한 구조적 타입 시스템의 이유 (런타임에 더 많은 키가 있을 수 있는 문제)

## 참고 자료
- https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads

---

## 오버로드 시그니처 & Omit/Partial (복습 세션)

| | 질문 | 답변 | 평가 |
|---|---|---|---|
| Q1 | 구현체 `criteria`가 넓은 타입이어야 하는 이유? | "설명할 수 없어" | ❌ |
| Q2 | `Omit<T, K>` 에서 T와 K가 뭔지? | 처음에 순서 반대로 씀 (`Omit<"type", Partial<User>>`) | ❌ |
| Q3 | `Omit<Partial<User>, "type">` vs `Partial<Omit<User, "type">>` 같아? | "같다 — 부분집합에서 제거나 제거 후 부분집합이나 동일" | ✅ |

## 핵심 정정
- 오버로드 시그니처 `criteria: Partial<Person>` → `Partial<User>` / `Partial<Admin>` 으로 분리 (`Person = User | Admin` 이라 합집합 속성이 섞임)
- 구현체 시그니처는 두 오버로드를 모두 커버해야 하므로 `Partial<Person>` (넓은 타입) 유지
- `Omit<T, K>` 순서: T = 원본 타입, K = 제거할 키

## 아직 모르는 것
- `Omit`과 `Partial` 외의 mapped type과 엮였을 때 순서에 따라 결과가 달라지는 케이스
