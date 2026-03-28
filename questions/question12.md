# 문제 12

## 막혔던 부분

```ts
type comparatorType<T> = (a: T, b: T) => number;

type getIndexFunctionType<T> = (
  input: T[],
  comparator: comparatorType<T>,
) => number;

type getElementFunctionType<T> = (
  input: T[],
  comparator: comparatorType<T>,
) => T;

type getAverageValueType<T> = (
  input: T[],
  getValue: (arg: T) => number,
) => number;

declare module "stats" {
  export const getMaxIndex: getIndexFunctionType;
  export const getMinIndex: getIndexFunctionType;
  export const getMedianIndex: getIndexFunctionType;

  export const getMaxElement: getElementFunctionType;
  export const getMinElement: getElementFunctionType;
  export const getMedianElement: getElementFunctionType;

  export const getAverageValue: getAverageValueType;
}
```

이렇게 했는데, getIndexFunctionType가 제네릭이라는 것을 알려주지 못해서 실제 사용할 때 getMaxIndx같은 메서드가 모두 any타입으로 추론되는 문제를 겪고 있다

내가 해결해야하는 것은 타입별칭을 제네릭으로 설정을 완료했는데, 이를 함수에 할당할 때 제네릭으로 어떻게 할당하냐를 고민해봐야 할 것 같다.

## 해결을 위해 필요한 키워드 1개

제네릭의 위치

## 키워드 단순 학습

```ts
    type Foo<T> = ... 와
    type Foo = <T>(...) => ...
```

    어떤 차이가 존재할까 ?

    type Foo<T> 방식은 `제네릭 타입 별칭`이라고 부릅니다.
    타입을 사용 또는 정의하는 시점에 제네릭 변수 T를 받게 됩니다.

    type Foo = <T>() => 방식은 `제네릭 함수 타입`이라고 부릅니다.
    실제 함수를 호출할 때 제네릭 변수 T를 받게 됩니다.

## 문제에 적용시켜 해결한 방법

comparatorType을 포함해서 모두 `type Foo<T> = ... ` 형식으로 작성했었는데, comparatorType은 다른 타입의 가독성 및 재사용을 위한 타입이므로 그대로 두고, 나머지 실사용 함수들의 타입을 `type Foo = <T>(...) => ...`로 바꿔서 해결했다.

내 생각: 다른 타입 내부로 들어가는 애면 `제네릭 타입 별칭`을 쓰면 되고, 실제 사용되는 함수를 정의할 때는 `제네릭 함수 타입`을 쓰면 될 것 같음

## 2회차 이상 풀 때 확장할 키워드 (AI 추천 5개)

- 키워드
  • 제네릭 호출 시그니처
  • 타입 별칭의 제네릭 스코프
  • 값 자체가 제네릭 함수라는 뜻
  • 타입 인수 고정 vs 호출 시 추론
  • declaration file에서 함수 타입 표현

- 왜 다시 봐야 하는지: 위에서 언급한 나의 생각이 너무 성급한 일반화였다.

## 다시 풀 때 체크할 문장 1개

제네릭을 어느 위치에 두냐에 따라 성질이 달라진다.
