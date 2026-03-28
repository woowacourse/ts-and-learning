# TypeScript Exercises 커리큘럼

각 exercise의 핵심 개념, 선수 지식, 힌트 단계, 연결 관계를 정리한다.
Claude는 `/start` 시 이 파일을 먼저 읽고 안내한다.

## exercise-01: interface 정의

- **핵심 개념**: interface로 객체 형태를 정의하는 법
- **선수 지식**: 없음 (첫 문제)
- **읽어볼 자료**: https://www.typescriptlang.org/docs/handbook/2/objects.html
- **유도 질문**: JavaScript 객체와 다르게, 왜 형태를 미리 정해두면 좋을까?
- **힌트 단계**:
  1. "객체의 속성 이름과 타입을 나열하는 문법을 찾아봐"
  2. "interface 키워드로 시작해서 중괄호 안에 속성을 적어봐"
  3. 예제: `interface Animal { name: string; legs: number; }`
- **되묻기**: interface 대신 type으로 썼다면 뭐가 달랐을까?
- **다음 연결**: exercise-02에서 union type으로 확장됨

## exercise-02: union type

- **핵심 개념**: 여러 타입 중 하나일 수 있는 union type (`|`)
- **선수 지식**: exercise-01 (interface 정의)
- **읽어볼 자료**: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types
- **유도 질문**: User와 Admin이 비슷하지만 다른 속성을 가질 때, 하나의 타입으로 어떻게 표현할까?
- **힌트 단계**:
  1. "두 interface를 합치는 게 아니라, 둘 중 하나라는 걸 표현하는 방법을 찾아봐"
  2. "파이프(|) 기호가 TypeScript에서 뭘 의미하는지 검색해봐"
  3. 예제: `type Pet = Dog | Cat`
- **되묻기**: union type을 쓰면 공통 속성만 접근 가능한 이유는?
- **다음 연결**: exercise-03에서 union을 구분하는 type guard로 이어짐

## exercise-03: type guard (in 연산자)

- **핵심 개념**: union type을 조건문으로 좁히는 type narrowing
- **선수 지식**: exercise-02 (union type)
- **읽어볼 자료**: https://www.typescriptlang.org/docs/handbook/2/narrowing.html
- **유도 질문**: User | Admin 타입인데, Admin만의 속성에 접근하려면 TypeScript를 어떻게 설득할까?
- **힌트 단계**:
  1. "TypeScript가 타입을 좁히는 방법들을 찾아봐 — typeof, instanceof 말고도 있어"
  2. "'role' in person 같은 문법이 뭘 하는지 검색해봐"
  3. 예제: `if ('bark' in animal) { animal.bark(); }`
- **되묻기**: in 연산자 말고 type을 좁히는 다른 방법은 뭐가 있을까?
- **다음 연결**: exercise-04에서 type predicate로 더 명시적인 가드를 만듦

## exercise-04: type predicate

- **핵심 개념**: 반환 타입에 `person is Admin`을 쓰는 사용자 정의 type guard
- **선수 지식**: exercise-03 (type narrowing)
- **읽어볼 자료**: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
- **유도 질문**: isAdmin 함수가 boolean을 반환하는데, TypeScript는 그걸로 타입을 좁힐 수 있을까?
- **힌트 단계**:
  1. "함수의 반환 타입 자리에 boolean 대신 뭘 쓸 수 있는지 찾아봐"
  2. "type predicate라는 키워드로 검색해봐"
  3. 예제: `function isFish(pet: Pet): pet is Fish { return 'swim' in pet; }`
- **되묻기**: type predicate가 없으면 매번 호출하는 쪽에서 뭘 해야 할까?
- **다음 연결**: exercise-05에서 유틸리티 타입으로 넘어감

## exercise-05: Partial & Omit 유틸리티 타입

- **핵심 개념**: 기존 타입에서 일부를 선택적으로 만들거나 제외하는 유틸리티 타입
- **선수 지식**: exercise-01~04 (interface, union, narrowing)
- **읽어볼 자료**: https://www.typescriptlang.org/docs/handbook/utility-types.html
- **유도 질문**: filterUsers에 User 전체를 넘기면 왜 불편할까? 일부 속성만 선택적으로 받으려면?
- **힌트 단계**:
  1. "TypeScript에 내장된 유틸리티 타입 목록을 훑어봐 — 이름만 봐도 감이 올 거야"
  2. "Partial<Type>이 뭘 하는지 읽어보고, 거기서 특정 속성을 빼려면 뭘 조합할지 생각해봐"
  3. 예제: `type UpdateUser = Partial<Pick<User, 'name' | 'email'>>`
- **되묻기**: Partial<Omit<User, 'type'>>에서 Omit과 Partial의 순서를 바꾸면 어떻게 될까?
- **다음 연결**: exercise-06부터 제네릭으로 확장

## exercise-06: 제네릭 기초

- **핵심 개념**: 함수에 제네릭 타입 파라미터를 붙여서 타입을 유연하게 만드는 법
- **선수 지식**: exercise-01~05
- **읽어볼 자료**: https://www.typescriptlang.org/docs/handbook/2/generics.html
- **유도 질문**: 같은 로직인데 입력 타입만 다른 함수를 여러 개 만들지 않으려면?
- **힌트 단계**:
  1. "함수 이름 뒤에 <T> 같은 문법이 뭘 하는지 찾아봐"
  2. "제네릭 타입 파라미터가 함수 안에서 어떻게 흘러가는지 추적해봐"
  3. 예제: `function identity<T>(arg: T): T { return arg; }`
- **되묻기**: 제네릭 대신 any를 쓰면 뭐가 달라질까?
- **다음 연결**: exercise-07에서 제네릭에 제약을 거는 법으로 이어짐

## exercise-07: 제네릭 제약 (extends)

- **핵심 개념**: 제네릭에 `extends`로 제약을 걸어 특정 속성을 보장하는 법
- **선수 지식**: exercise-06 (제네릭 기초)
- **읽어볼 자료**: https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints
- **유도 질문**: 제네릭 T가 아무 타입이나 될 수 있으면, T의 속성에 접근할 수 있을까?
- **힌트 단계**:
  1. "T extends { name: string } 같은 문법이 뭘 의미하는지 찾아봐"
  2. "제약을 걸면 T 안에서 어떤 속성에 접근 가능해지는지 생각해봐"
  3. 예제: `function getLength<T extends { length: number }>(arg: T): number { return arg.length; }`
- **되묻기**: extends를 안 쓰고 같은 걸 달성하려면 어떻게 해야 할까?
- **다음 연결**: exercise-08에서 제네릭 + Promise 조합으로 확장

## exercise-08: 제네릭 + Promise

- **핵심 개념**: 비동기 함수의 반환 타입을 제네릭으로 정확하게 표현하는 법
- **선수 지식**: exercise-06~07, Promise 기본 이해
- **읽어볼 자료**: https://www.typescriptlang.org/docs/handbook/2/generics.html
- **유도 질문**: Promise를 반환하는 함수의 타입을 쓸 때, resolve되는 값의 타입은 어떻게 표현할까?
- **힌트 단계**:
  1. "Promise<T>에서 T가 뭘 의미하는지 생각해봐"
  2. "async 함수의 반환 타입이 자동으로 뭘로 감싸지는지 확인해봐"
  3. 예제: `function fetchUser(): Promise<User> { ... }`
- **되묻기**: Promise<any>로 퉁치면 어디서 문제가 터질까?
- **다음 연결**: exercise-09에서 더 복잡한 타입 추론으로 이어짐

## exercise-09: 고급 타입 추론

- **핵심 개념**: 조건부 타입, infer 키워드를 활용한 타입 추출
- **선수 지식**: exercise-06~08
- **읽어볼 자료**: https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
- **유도 질문**: 함수 타입에서 반환 타입만 뽑아내려면 어떻게 할까?
- **힌트 단계**:
  1. "conditional type이라는 문법을 찾아봐 — T extends ... ? A : B 형태야"
  2. "infer 키워드가 뭘 하는지 검색해봐"
  3. 예제: `type ReturnOf<T> = T extends (...args: any[]) => infer R ? R : never`
- **되묻기**: 내장 유틸리티 타입 ReturnType<T>은 내부적으로 어떻게 구현되어 있을까?
- **다음 연결**: exercise-10에서 오버로드로 이어짐

## exercise-10: 함수 오버로드

- **핵심 개념**: 같은 함수에 여러 시그니처를 정의하는 오버로드
- **선수 지식**: exercise-06~09
- **읽어볼 자료**: https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads
- **유도 질문**: 입력 타입에 따라 반환 타입이 달라져야 하는 함수를 어떻게 표현할까?
- **힌트 단계**:
  1. "function overloads라는 키워드로 검색해봐"
  2. "오버로드 시그니처와 구현 시그니처가 어떻게 다른지 살펴봐"
  3. 예제: `function parse(input: string): number; function parse(input: number): string; function parse(input: string | number) { ... }`
- **되묻기**: 오버로드 대신 제네릭 + 조건부 타입으로 같은 걸 표현할 수 있을까?
- **다음 연결**: exercise-11에서 외부 모듈 타입 선언으로 방향 전환

## exercise-11: 모듈 선언 (declare module) 기초

- **핵심 개념**: 타입이 없는 외부 라이브러리에 타입 선언 파일(.d.ts) 작성
- **선수 지식**: exercise-01~05 (interface, 유틸리티 타입)
- **읽어볼 자료**: https://www.typescriptlang.org/docs/handbook/2/type-declarations.html
- **유도 질문**: npm에서 받은 라이브러리에 타입이 없으면 TypeScript는 어떻게 반응할까?
- **힌트 단계**:
  1. "declare module이라는 문법을 찾아봐"
  2. "declarations/ 폴더의 .d.ts 파일이 어떤 역할을 하는지 생각해봐"
  3. 예제: `declare module 'my-lib' { export function greet(name: string): string; }`
- **되묻기**: .d.ts 파일은 런타임에 영향을 줄까, 안 줄까?
- **다음 연결**: exercise-12에서 더 복잡한 모듈 선언으로 이어짐

## exercise-12: 모듈 선언 심화

- **핵심 개념**: 여러 함수와 타입을 가진 외부 모듈의 완전한 타입 선언
- **선수 지식**: exercise-11 (declare module 기초)
- **읽어볼 자료**: https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html
- **유도 질문**: 라이브러리가 여러 함수를 export하고, 각각 다른 시그니처를 가지면 .d.ts를 어떻게 구성할까?
- **힌트 단계**:
  1. "node_modules/stats/ 폴더를 열어서 실제 구현을 먼저 봐"
  2. "각 함수가 어떤 인자를 받고 뭘 반환하는지 하나씩 정리해봐"
  3. 예제: 여러 export가 있는 declare module 블록 구조
- **되묻기**: @types 패키지와 직접 .d.ts를 쓰는 것의 차이는?

## exercise-13: 모듈 augmentation

- **핵심 개념**: 이미 존재하는 모듈의 타입을 확장(augmentation)
- **선수 지식**: exercise-11~12 (declare module)
- **읽어볼 자료**: https://www.typescriptlang.org/docs/handbook/declaration-merging.html
- **유도 질문**: 외부 라이브러리의 타입에 우리만의 속성이나 메서드를 추가하려면?
- **힌트 단계**:
  1. "declaration merging이라는 개념을 찾아봐"
  2. "module-augmentations/ 폴더 구조를 보고 어디에 코드를 써야 할지 생각해봐"
  3. 예제: `declare module 'express' { interface Request { user?: User; } }`
- **되묻기**: augmentation이 원본 라이브러리를 실제로 바꾸는 건 아닌데, 어떻게 동작하는 걸까?

## exercise-14: 커링과 함수형 타이핑

- **핵심 개념**: 고차 함수의 타입 정의, 커링 패턴
- **선수 지식**: exercise-06~10 (제네릭)
- **읽어볼 자료**: https://www.typescriptlang.org/docs/handbook/2/functions.html
- **유도 질문**: map, filter, reduce를 직접 타이핑한다면 제네릭을 어떻게 쓸까?
- **힌트 단계**: test.ts의 기대 타입을 하나씩 읽으며 유도
- **되묻기**: pipe 함수의 타입을 완벽하게 정의하는 게 왜 어려울까?

## exercise-15: 제네릭 클래스

- **핵심 개념**: 클래스에 제네릭을 적용하고, 메서드 체이닝의 타입 추론
- **선수 지식**: exercise-06~10 (제네릭), exercise-14 (함수형 타이핑)
- **읽어볼 자료**: https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-classes
- **유도 질문**: set을 호출할 때마다 객체 타입이 확장되는 걸 TypeScript가 어떻게 추적할까?
- **힌트 단계**: test.ts의 체이닝 패턴을 보며 유도
- **되묻기**: 이 패턴이 실무에서 Builder 패턴과 어떻게 연결될까?
