# Exercise 05 Mistake Notes

## Partial + Omit

| | 질문 | 답변 | 평가 |
|---|---|---|---|
| Q1 | 함수 시그니처를 바꿨을 때 바디도 같이 봐야 하는 이유가 뭐야? | - | - |

## 핵심 정정
- 파라미터 타입을 `Partial<Omit<User, "type">>`으로 바꾸면, 바디 안 `as (keyof User)[]` 캐스팅도 깨짐
- `keyof User`에는 `"type"`이 포함되어 있지만 criteria엔 없기 때문
- `as (keyof typeof criteria)[]`로 바꾸면 criteria의 실제 타입 기반으로 추론됨

## 아직 모르는 것
- conditional type (2.8 릴리즈 노트 링크가 있었지만 이번엔 불필요했음)

## 참고 자료
- https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype
