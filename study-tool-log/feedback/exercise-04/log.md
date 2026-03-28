# Exercise 04 풀이 로그

## 타입체크 결과
✅ 타입 에러 없음

## 루틴 경로
- [x] ① 직접 시도
- [x] ② 키워드 요청 (type predicate)
- [ ] ③ 접근방식 질문
- [x] ④ 피드백 완료

## Before

```ts
export function isAdmin(person: Person) {
  return person.type === "admin";
}

export function isUser(person: Person) {
  return person.type === "user";
}
```

## After

```ts
export function isAdmin(person: Person): person is Admin {
  return person.type === "admin";
}

export function isUser(person: Person): person is User {
  return person.type === "user";
}
```

## 핵심 개념
type predicate — 함수 리턴 타입에 `person is Admin` 형태로 명시해서 TS가 호출부에서 타입을 좁힐 수 있게 함

## 최종 코드 요약
`isAdmin`, `isUser` 리턴 타입에 각각 `person is Admin`, `person is User` 추가

## 시지프 피드백
- type predicate 개념은 키워드 받고 바로 적용함. 이해 빠름.
- `boolean` vs `person is Admin` 차이 — TS가 호출부에서 타입을 좁히려면 명시적 predicate 필요하다는 것 이해함.
- `filter(isAdmin)`의 리턴 타입이 `Admin[]`로 좁혀지는 것도 정확히 파악.
- `&` (intersection) 은 아직 모름. 다음 기회에.
