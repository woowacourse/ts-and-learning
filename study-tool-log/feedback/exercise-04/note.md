# Exercise 04 Mistake Notes

## Type Predicate

| | 질문 | 답변 | 평가 |
|---|---|---|---|
| Q1 | `isAdmin`이 `boolean` 리턴할 때 TS 입장에서 뭘 몰랐던 거야? | "어드민이랑 유저의 타입을 같이 받는 타입이라 어떤 타입으로 생성됐는지 몰랐어" | ✅ |
| Q2 | `filter(isAdmin)` 리턴 타입이 어떻게 될 것 같아? | "`isAdmin[]` 이 나올 거 같아" | ✅ (Admin[]로 좁혀짐) |

## 핵심 정정
- `isAdmin`이 `boolean`을 반환하면 TS는 호출부에서 타입을 좁히지 못함 → `person is Admin` 명시로 호출부 narrowing 가능

## 아직 모르는 것
- `&` (intersection type) 개념

## 참고 자료
- https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
