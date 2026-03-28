# 문제 5

## 막혔던 부분

```
 문제 정의 : 밑에 함수 호출 부에서 {age:23} 이런 식으로 넘기고 있음
 예상 풀이법 : filterUsers의 creteria 파라미터의 타입을 User가 아니라 User 안에있는 프로퍼티 1개라고 하면 될 것 같음
 방법은 모름
```

## 해결을 위해 필요한 키워드 1개

Utility Types (Partial, Omit)

## 키워드 단순 학습

유틸리티 타입이란?

타입스크립트가 자체적으로 만들어놓은 타입들 (실무에서 자주 사용된다고 함)

1. Partial\<T> → 부분적 → 특정 객체 타입의 모든 프로퍼티를 선택적 프로퍼티로 바꿔주는 타입
2. Required\<T> -> Type 집합의 프로퍼티를 모두 필수로 만듦
3. Pick<Type, Keys>
4. Omit<Type, Keys> -> Type에서 모든 프로퍼티를 선택하고 키를 제거한 타입을 생성합니다.
5. ReadOnly\<T> -> 해당 타입을 읽기 전용으로 생성한다
6. Record<Keys,Type> -> 타입 Type의 프로퍼티 키의 집합으로 타입을 생성합니다.
   -> Type이 Keys value가 됨 key : type 느낌

일단 1회차에서는 Partial까지만 알아봄

## 문제에 적용시켜 해결한 방법

    const criteriaKeys = Object.keys(criteria) as (keyof User)[];

## 키워드 심화학습 (생각해볼만한 질문)

Q1. **(Level 1 - 용어)** `Partial<User>`를 적용하면 `User` 인터페이스 내부의 모든 프로퍼티 뒤에 어떤 기호(`?` 등)가 붙는 것과 같은 효과가 나나요?

A. `?`를 붙이는 것과 같은 효과가 나는 것 같아요.

---

Q2. **(Level 2 - 설명)** 연습 문제의 보너스 과제였던 **"Exclude 'type' from filter criteria"**를 해결하려면 `Partial` 외에 어떤 유틸리티 타입이 추가로 필요할까요?

A. Omit 타입을 해서 type 프로퍼티를 제거하면 되는 것 같습니다!

---

Q3. **(Level 2 - 설명)** 왜 `Partial<Omit<User, 'type'>>`와 `Omit<Partial<User>, 'type'>`는 서로 결과가 같을까요, 다를까요? (순서의 중요성)

A. 음 뭔가 똑같을 것 같은데 아닌가요?

---

Q4. **(Level 3 - 적용)** 만약 `criteria`에 `User`에 없는 `hobby: 'reading'` 같은 값을 넣으면 어떻게 될까요? `Partial<User>`는 이를 막아줄 수 있을까요?

A. Partial 자체는 막아줄 수 없을 것 같아요

---

Q5. **(Level 4 - 변형/설계)** `Object.keys(criteria) as (keyof User)[]`라고 단언하셨는데, 만약 `criteria` 객체가 런타임에 외부 API에서 온 데이터라 예상치 못한 값이 섞여 있다면 어떤 문제가 생길까요?

A. 타입 에러가 날 것 같아요

## 2회 이상 풀어보며 새로 깨달은 것
