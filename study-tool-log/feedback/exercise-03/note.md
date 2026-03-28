# Exercise 03 Mistake Notes

## Narrowing & typeof

| | 질문 | 답변 | 평가 |
|---|---|---|---|
| Q1 | `typeof person`이 뭘 반환해? | "Admin" | ❌ |

## 핵심 정정
- `typeof person` → 런타임에 항상 `"object"` 반환. 인터페이스 타입은 런타임에 존재하지 않음.
- `typeof`는 원시값(`string`, `number` 등) 체크용. 객체 타입 구분엔 사용 불가.

## 아직 모르는 것
- discriminated union 개념 (4번에서 만날 예정)
