# Exercise 05 풀이 로그

## 타입체크 결과

✅ 타입 에러 없음

## 루틴 경로

- [x] ① 직접 시도
- [x] ② 키워드 요청 (Partial, Omit)
- [x] ③ 접근방식 질문
- [ ] ④ 피드백 완료

## Before

```ts
export function filterUsers(persons: Person[], criteria: User): User[] {
  return persons.filter(isUser).filter((user) => {
    const criteriaKeys = Object.keys(criteria) as (keyof User)[];
    return criteriaKeys.every((fieldName) => {
      return user[fieldName] === criteria[fieldName];
    });
  });
}
```

## After

```ts
export function filterUsers(persons: Person[], criteria: Partial<Omit<User, "type">>): User[] {
  return persons.filter(isUser).filter((user) => {
    const criteriaKeys = Object.keys(criteria) as (keyof typeof criteria)[];
    return criteriaKeys.every((fieldName) => {
      return user[fieldName] === criteria[fieldName];
    });
  });
}
```

## 핵심 개념

- `Partial<T>` — 모든 프로퍼티를 optional로 만듦
- `Omit<T, K>` — 특정 키를 타입에서 제거
- `keyof typeof criteria` — criteria의 실제 타입 기반으로 키 추론 (함수 시그니처 변경 시 바디도 함께 수정 필요)
