# Exercise 09 Mistake Notes

## Generic 타입 제약 (extends)

| | 질문 | 답변 | 평가 |
|---|---|---|---|
| Q1 | `T extends [User, Admin]` 이게 어떤 의미야? | User 아니면 Admin | ❌ |
| Q2 | `[User, Admin]`이랑 `User \| Admin` 뭐가 달라? | 이해함 (튜플 vs 유니온) | ✅ |
| Q3 | T를 제한할 필요가 있었어? | 없었어 | ✅ |

## Generic T의 역할

| | 질문 | 답변 | 평가 |
|---|---|---|---|
| Q1 | 에러일 때 응답 구조가 `{ status: 'error', data: ... }` 야? | 스트링이 있구나 | ✅ |
| Q2 | `ApiResponse<Admin[] \| string>` — data가 왜 string도 돼? | 저장 안 했다 | ❌ |

## Date.now()

| | 질문 | 답변 | 평가 |
|---|---|---|---|
| Q1 | `Date.now()` 반환 타입이 뭐야? | Date 객체 아님? | ❌ |

## 핵심 정정
- `[User, Admin]` → 튜플 (순서 고정 배열). `User | Admin` 이 유니온
- `T extends [User, Admin]` → T를 튜플로 제한하는 것. 의도와 다름
- `ApiResponse<Admin[] | string>` → 틀림. T는 성공 시 data 타입만. 에러는 union의 다른 쪽이 담당
- `Date.now()` → `number` 반환. `new Date()` 가 Date 객체

## Discriminated Union과 Status 타입 분리

| | 질문 | 답변 | 평가 |
|---|---|---|---|
| Q1 | status를 별도 타입으로 빼면 뭐가 문제야? | 에러에 데이터 T가 들어갈 수 있나 | ✅ |

## 핵심 정정 (추가)
- `type Status = "success" | "error"` 로 합치면 discriminated union 깨짐. TS가 success/error 분기 시 data vs error 필드를 추론 못 함
- `ApiResponse<T, E = string>` — 완성. E가 default string이라 기존 코드 그대로 동작

## 아직 모르는 것
- 없음 (이번 세션 완료)

