# Exercise 01 Mistake Notes

## interface vs type

| | 질문 | 답변 | 평가 |
|---|---|---|---|
| Q1 | interface와 type 차이는? | "interface는 추상적인 구현체, type은 좁은 범위" | ❌ OOP 개념을 TS에 잘못 적용 |
| Q2 | type만 되는 게 뭐야? | "유니온, 튜플" | ✅ |
| Q3 | interface만 되는 게 뭐야? | 모름 | ❌ declaration merging |
| Q4 | 왜 둘이 교환 가능했어? | "structural typing, 속성으로 타입 검사" | ✅ |

## structural typing 힌트를 준 이유

| | 질문 | 답변 | 평가 |
|---|---|---|---|
| Q1 | 왜 structural typing을 키워드로 줬어? | 몰랐음 | ❌ |

**정답**: "동작원리가 같다"는 방향은 맞았지만 왜 같은지를 설명 못 했음. TS는 이름이 아닌 구조로 타입을 비교하기 때문에 `type`과 `interface`가 교환 가능 → 이게 structural typing. declaration merging은 그 다음 단계.

## 핵심 정정
- `interface`는 "추상타입"이 아님. 구조를 기술하는 도구.
- `type`이 `interface`보다 좁은 게 아니라, 오히려 더 많은 걸 표현할 수 있음 (union, tuple, conditional 등)
- 교환 가능한 이유: TS는 structural typing — 이름이 아니라 구조로 비교

## 아직 모르는 것
- declaration merging: `interface`만 가능, `type`은 불가

## 참고 자료
- https://toss.tech/article/typescript-type-compatibility
