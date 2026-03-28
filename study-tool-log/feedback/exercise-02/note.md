# Exercise 02 Mistake Notes

## Union 타입과 Narrowing

| | 질문 | 답변 | 평가 |
|---|---|---|---|
| Q1 | Person 타입 정의 후 logPerson 파라미터도 바꿔야 해 | 처음에 함수 파라미터 안 바꿈 | ❌ |
| Q2 | 객체에 특정 키가 존재하는지 확인하는 연산자 | `in?` → `person in occupation` → `occupation in person` → `"occupation" in person` | ❌→✅ |
| Q3 | occupation 값을 출력하려면? | `console.log("person.occupation ")` (문자열로 감쌈) | ❌ |

## 핵심 정정
- `person in occupation` → `"occupation" in person` (키가 문자열, 객체가 오른쪽)
- `console.log("person.occupation")` → `console.log(\`${person.occupation}\`)` (템플릿 리터럴)
- Union 타입 정의만 바꾸면 끝이 아님 → 사용처(함수 파라미터 등)도 함께 수정 필요

## 아직 모르는 것
- 없음 (세션 내 모두 해결)
