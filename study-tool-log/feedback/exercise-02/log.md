# Exercise 02 풀이 로그

## 타입체크 결과
✅ 타입 에러 없음

## 루틴 경로
- [x] ① 직접 시도
- [ ] ② 키워드 요청
- [x] ③ 접근방식 질문
- [x] ④ 피드백 완료

## 핵심 개념
- Union 타입 (`User | Admin`)
- Union 타입은 정의뿐 아니라 사용처(함수 파라미터 등)도 함께 바꿔야 함
- `in` 연산자로 타입 좁히기 (narrowing)

## Before
```ts
export type Person = unknown;

export const persons: User[] /* <- Person[] */ = [...];

export function logPerson(user: User) {
  console.log(` - ${user.name}, ${user.age}`);
}

persons.forEach(logPerson);
```

## After
```ts
export type Person = User | Admin;

export const persons: Person[] /* <- Person[] */ = [...];

export function logPerson(user: Person) {
  if ("occupation" in user) {
    console.log(`${user.occupation}`);
    return;
  }
  console.log(` - ${user.name}, ${user.age}`);
}

persons.forEach(logPerson);
```

## 시지프 땡스
- Person 타입 정의는 바로 잡았으나 logPerson 파라미터 수정을 처음에 놓침
- Union 타입 안에서 특정 필드 접근 시 narrowing 필요하다는 것을 직접 부딪혀서 익힘
- `in` 연산자로 narrowing하는 패턴 습득
