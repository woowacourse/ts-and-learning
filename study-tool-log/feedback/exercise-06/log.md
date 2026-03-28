# Exercise 06 풀이 로그

## 타입체크 결과
✅ 타입 에러 없음

## 루틴 경로
- [x] ① 직접 시도
- [x] ② 키워드 요청 (function overloads)
- [x] ③ 접근방식 질문
- [x] ④ 피드백 완료

## Before

```ts
export function filterPersons(persons: Person[], personType: string, criteria: Partial<Person>): Person[] {
```

## After

```ts
export function filterPersons(persons: Person[], personType: "user", criteria: Partial<Person>): User[];
export function filterPersons(persons: Person[], personType: "admin", criteria: Partial<Person>): Admin[];
export function filterPersons(persons: Person[], personType: "user" | "admin", criteria: Partial<Person>): Person[] {
```

## 핵심 개념
function overloads — 동일한 함수에 입력값에 따라 다른 타입 시그니처를 선언해 호출부에서 리턴 타입이 좁혀지게 함

## 최종 코드 요약
오버로드 시그니처 2개 + 구현 시그니처 1개. personType 값에 따라 User[] / Admin[] 로 좁혀짐.

## 시지프 피드백
- `personType: string` → `"user" | "admin"` → 오버로드 순서로 점진적으로 좁혀감. 방향은 맞았음.
- 오버로드 구조(시그니처 여러 개 + 구현 하나)를 파악하는 데 시간이 걸렸지만 결국 스스로 적용함.
- bonus: `getObjectKeys`에서 `T`를 키로 혼동하다 제네릭 개념 잡고 완성.

## Bonus: getObjectKeys

```ts
export function getObjectKeys<T extends Object>(object: T): (keyof T)[] {
  return Object.keys(object) as (keyof T)[];
}
```
