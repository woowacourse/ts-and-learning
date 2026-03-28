# Exercise 08 Mistake Notes

## Intersection & Omit

| | 질문 | 답변 | 평가 |
|---|---|---|---|
| Q1 | `type: "user" & "admin"` 교집합이 있어? | "없어" | ✅ |
| Q2 | `keyof (User \| Admin)` 이 뭐야? | "합집합" | ❌ |
| Q3 | `Omit<User \| Admin, "type">` 결과에 `occupation`, `role` 있어? | 직접 확인 후 "없어졌어" | ✅ |
| Q4 | `Omit<User & Admin, "type">` 시도 결과? | "string 형식은 never에 할당할 수 없다" — Omit이 never를 고칠 줄 알았음 | ❌ |

## 핵심 정정
- `keyof (A | B)` 는 합집합이 아니라 **교집합** (두 타입 모두에 안전하게 접근 가능한 키만)
- `Omit<User | Admin, "type">` → `name`, `age`만 남음 (occupation, role 소실)
- `Omit`은 이미 `never`가 된 타입을 고칠 수 없다. `User & Admin` 계산이 먼저 일어남
- `Omit` 두 개 따로 쓰는 게 맞다: `Omit<User, "type"> & Omit<Admin, "type">`

## 아직 모르는 것
- 없음
