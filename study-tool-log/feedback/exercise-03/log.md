# Exercise 03 풀이 로그

## 타입체크 결과
✅ 타입 에러 없음

## 루틴 경로
- [x] ① 직접 시도
- [ ] ② 키워드 요청
- [ ] ③ 접근방식 질문
- [x] ④ 피드백 완료

## 핵심 개념
- `in` 연산자를 이용한 타입 narrowing
- Union 타입에서 분기별로 각자 필드에 안전하게 접근

## Before
```ts
export function logPerson(user: User) {
  console.log(` - ${user.name}, ${user.age}`);
}
```

## After
```ts
export function logPerson(person: Person) {
  let additionalInformation: string;
  if ("role" in person) {
    additionalInformation = person.role;
  } else {
    additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}
```

## 시지프 땡스
[작성 예정]
