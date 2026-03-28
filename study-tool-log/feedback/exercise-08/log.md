# Exercise 08 풀이 로그

## 타입체크 결과
✅ 타입 에러 없음

## 루틴 경로
- [x] ① 직접 시도
- [x] ② 키워드 요청
- [ ] ③ 접근방식 질문
- [x] ④ 피드백 완료

## 핵심 개념
- `Omit<T, K>` — 특정 필드를 제거한 타입
- intersection `&` — 두 타입의 필드를 합산
- 충돌 필드(`type`) 제거 후 새 리터럴 타입 추가

## Before
```ts
type PowerUser = unknown;
```

## After
```ts
type PowerUser = Omit<User, "type"> & Omit<Admin, "type"> & { type: "powerUser" };
```

## 시지프 피드백
- 키워드 받고 스스로 완성 (② 단계)
- 킹핀: `Omit`으로 충돌 필드를 제거한 뒤 `&`로 합치는 패턴
- i+1: intersection 결과 타입에서 중복 필드(`name`, `age`)는 어떻게 처리되는지
