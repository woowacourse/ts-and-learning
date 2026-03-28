# 문제 4

## 막혔던 부분

문제 풀이 자체는 했는데 올바르게 풀지 못한 것 같음

```
 문제 정의 -> 저 조건문에서는 타입 내부에 type이 admin이라고, role이 있다고 생각을 하지 못함
 role이 있다는 것을 알려줘야함

 처음에는   if (isAdmin(person) && "role" in person) { 이런 방식을 시도함
 근데 그러면 isAdmin이라는 함수를 만들 필요가 있나?
중복 느낌이 강하게 들었음
```

## 해결을 위해 필요한 키워드 1개

타입 가드

## 키워드 단순 학습

타입 가드는 is 연산자를 활용하고, 주로 if문과 함께 사용된다

타입 가드는 왜 하나? → 변수가 특정 타입인지 여부를 확인하고, 타입을 좁혀주는 역할을 한다.

내가 느끼기엔 이정표 같은 느낌인 것 같다.

person is Admin → 만약 이 함수가 true를 반환한다면 person은 Admin이라는 것을 알려주는 것임 !!

## 문제에 적용시켜 해결한 방법

```tsx
export function isAdmin(person: Person): person is Admin {
  return person.type === "admin";
}

export function isUser(person: Person): person is User {
  return person.type === "user";
}
```

## 키워드 심화학습 (생각해볼만한 질문)

## 2회 이상 풀어보며 새로 깨달은 것

타입 가드도 타입 좁히기의 한 방법인 것을 알게 되었음
