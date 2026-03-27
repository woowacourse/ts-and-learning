# 학습 로그

## 학습 로그 #4 - 26.03.26 (목)

**시간**: 03/26 16:00 ~ 17:00 (약 60분)

**학습 범위**: typescript-exercises #6 (이해하기 어려웠던 문제를 뽑아 복습)

#### 1단계: 의도 파악 (Problem-Driven)

- 행동: [주석 읽기] ➡️ [코드 흐름 파악] ➡️ [필요한 공식 문서 훑기]
- 핵심 질문: "출제자가 지금 나한테 무슨 타입스크립트 기술을 요구하는 걸까?"

#### 2단계: 충돌 테스트 및 '우연한 성공' 검증 (Output First & Feedback Loop)

- 행동 1: 완벽한 답을 찾으려 하지 말고, 일단 생각나는 대로 코드를 던져보고 에러를 맞아보기. (발생한 에러 메시지 툭툭 메모)
- 행동 2 (검증): 만약 코드가 에러 없이 통과했는데 '왜 통과했는지' 명확히 설명할 수 없다면, 즉시 진도를 멈춘다. GPT에게 "이게 왜 통과하는 거야? TS 컴파일 타임과 관련이 있어?"라고 물어보고 찝찝함을 해소한 뒤 넘어간다.

#### 3단계: 키워드 SOS & 팩트 체크 (Resourceful & Structural Thinking)

- 행동 1 (막혔을 때): GPT에 핵심 키워드나 에러 메시지만 하나 툭 던지고 "정답 말고 다음 단계로 갈 힌트나 역질문을 던져줘"라고 유도한다. [에러 - 힌트 - 실험] 과정 기록.
- 행동 2 (풀었을 때): 내 직관으로 푼 게 맞는지 문서나 GPT에 교차 검증한다.

#### 4단계: 마이크로 퀴즈 & Before/After 스냅샷 (Active Recall & i+1)

- 행동 1: AI 프론트엔드 마이크로 퀴즈

  - GPT에게 "방금 배운 [개념]에 대해 고의로 타입 에러가 나는 3~4줄짜리 짧은 퀴즈를 내줘"라고 요구하고 빠르게 푼다.

- 행동 2: Before & After 코드 스냅샷 남기기 (글쓰기 ❌, 코드 복붙 ⭕)

  - 억지로 문장으로 요약하지 말고, **내가 틀렸던 코드(또는 몰랐던 상태)**와 해결한 코드를 나란히 배치하고, 딱 한 줄의 주석만 단다.ㄴ
  - 작성 예시 (학습 로그에 이렇게 남기기):

    ```
    // ❌ Before (에러 났던 방식/오해했던 부분)
    type ApiResponse = { status: string; data: T[] }
    // 💡 깨달음: 아, 항상 배열(T[])로 오는 게 아니라 단일 객체(T)로 올 수도 있구나!

    // ✅ After (해결책)
    type ApiResponse<T> = { status: 'success'; data: T } | { status: 'error'; error: string }

    ```

### 2. 3일차 학습의 목표

- [ ] 몇 번이고 개선시킨 학습법을 순서대로 지키면서 메모를 남기기
- [ ] 순서대로 지키지 못했다면 왜 그랬는지까지도 메모

### 문제 풀이 메모

#### [ts-exercises-06]

#### 메모1 - 의도 파악

```
/*

Intro:

    Time to filter the data! In order to be flexible
    we filter users using a number of criteria and
    return only those matching all of the criteria.
    We don't need Admins yet, we only filter Users.

Exercise:

    Without duplicating type structures, modify
    filterUsers function definition so that we can
    pass only those criteria which are needed,
    and not the whole User information as it is
    required now according to typing.

Higher difficulty bonus exercise:

    Exclude "type" from filter criteria.

*/
```

- 타입 구조를 중복해서 새로 만들지 말고, filterUsers 함수 정의를 수정하라고 한다. 코드를 보니 filterUsers()에서 받는 인자인 criteria의 타입이 User인데, 실제 사용부를 보면 age 프로퍼티만 가진 객체를 인자로 전달하고 있다.
- User 타입의 일부만 받을 수 있도록 criteria의 타입을 수정해야 할 것 같다. 공식문서는 함수 오버로드에 관한 문서였다. 아마 함수 오버로드를 사용해야 할 것 같다.

#### 메모2 - 충돌 테스트 및 우연 검증 / 키워드 SOS & 팩트 체크

- age 프로퍼티만 number 타입이니까 number 타입만 추출해서 받게 하면 되지 않을까? 추출하는 타입은 Extract이니까 사용해보자.
- criteria: Extract<User, number> 라고 수정했지만 다음과 같은 에러가 발생했다.
  > '{ age: number; }' 형식의 인수는 'never' 형식의 매개 변수에 할당될 수 없습니다.
- Extract는 유니온타입과 같은 것에서 타입을 추출하는 것이지, 객체 프로퍼티의 타입을 검사하는 도구가 아니었다. 또한 문제를 잘 읽어보니 number로만 필터링하는 것이 아니라는 것도 알았다.
- 그렇다면 프로퍼티를 선택적으로 받아야 하는 것인데.. 그럼 Partial을 사용해본다면?
- 조건에서 type 프로퍼티를 제거하라고도 했으니 Omit을 사용하고 Partial을 사용하면 될 것 같다.

  - `Partial<Omit<Person, 'type'>>` 라고 수정했지만 여전히 에러가 발생했다. 왜지? 에러 메세지를 GPT에 던져봤다.
  - Person은 User와 Admin의 유니온 타입이기 때문에 Omit을 호출하려고 하면 keyof 연산자가 자동으로 적용되어 role이나 occupation 정보가 아예 사라진다고 한다.
  - 그럼 filterUsers() 메서드 안에서 받는 personType을 이용해야 할 것 같은데, personType이 user일 경우 User[]을 반환하고, personType이 admin인 경우 Admin[]을 반환해야 한다. 그러기 위해서는 하나의 타입으로 정의할 수 없고, 함수 오버로드 문서가 있으니까 아마 함수 오버로드를 사용하는 게 아닐까?

- 함수를 User타입인 경우와 Admin 타입인 경우 총 2가지로 선언했다. 하지만 여전히 에러가 발생한다.
  > 이 오버로드 시그니처는 해당 구현 시그니처와 호환되지 않습니다.
- gpt에게 물어보자. personType이 여전히 string 타입이므로 어떤 값이 들어와도 구분할 수 없고, 오버로드된 메서드의 구현부와 선언부가 분리되어야 된다고 피드백을 줬다.
- 그래서 메서드 선언부에서 personType을 오버로드된 메서드 각각에서 "user", "admin"으로 정의하고, 메서드 구현부에서 Person으로 범용적으로 처리하면 통과하지 않을까?
- 그럼 Person의 타입은 뭐지? Person["type"]으로 처리하면 나머지도 수정해야 할 것 같다.

- 에러가 한 줄로 줄었다.

  > '"type" | "name" | "age"' 형식의 식을 'Partial<Omit<Person, "type">>' 인덱스 형식에 사용할 수 없으므로 요소에 암시적으로 'any' 형식이 있습니다.
  > 'Partial<Omit<Person, "type">>' 형식에 'type' 속성이 없습니다.

- 메서드 구현부 인자에서의 타입이 잘못된 모양이다. 앞에서는 type 프로퍼티를 제거했는데, 왜 Person에서는 타입을 제거하면 안되는 거지? GPT에게 물어보자.
- 앞에서 Omit을 사용하게 되면 자동으로 role과 occupation이 사라진다고 했지! 더 넓은 범위니까 Omit을 하지 않고 Partial만 사용해서 선택적으로 만들면 범용 의도에 적합하겠구나!

- 그럼 보너스 문제도 도전해보자. 타입 단언, 즉 `as (keyof Person)[]` 이부분을 제거하라고 한다. Object.keys가 자동으로 `string` 타입이 되므로 단언을 해준 것인데, 객체들의 키값의 타입을 반환하는 메서드를 구현하면 되는 문제이다.
- 어떤 객체들 들어오기 위해서는 처음 떠오르는 것은 제네릭이다. T로 받은 후 T의 키들을 가져오는 연산자가 필요하므로, keyof를 사용하면 될 것 같다.
- T를 받고, Object.keys()를 keyof T 배열로 단언하여 return 하도록 수정했다. 근데 처음 보는 오류가 또 발생했다.
  > 'T' 형식의 인수는 '{}' 형식의 매개 변수에 할당될 수 없습니다.
- 이게 무슨 소리지? 처음 봐서 전혀 모르겠다. GPT에게 힌트를 요청하자.
- T의 타입을 Object라고 알려줄 문법이 필요하다고 한다. 마침 1시간 전에 들은 도넛의 테코톡에서 extends 문법을 배웠으니 써먹어보자. `<T extends Object>` 라고 작성하니 문제가 해결되었다.

#### 메모3 - 마이크로 퀴즈 & Before/After 스냅샷

- 문제를 해결했으니 예제 문제와 질문을 요청해보자.

```
우리는 어떤 값이든 받아서 숫자로 변환해 주는 아주 유연한 유틸리티 함수를 제네릭을 사용해 만들려고 합니다. 자바스크립트의 내장 함수인 parseInt()를 활용해서요.

TypeScript
function convertToNumber<T>(value: T): number {
  return parseInt(value, 10);
}
하지만 이 코드를 작성하면, 방금 전과 소름 돋게 비슷한 에러가 발생합니다.

에러 메시지:
'T' 형식의 인수는 'string' 형식의 매개 변수에 할당될 수 없습니다.

🤔 메타 코칭 질문
방금 보너스 문제에서 extends object라는 열쇠(제약 조건)로 문제를 해결하셨죠? 그 경험을 살려 다음 질문들에 답해 봅시다!
에러 원인 분석: parseInt 함수는 TypeScript에게 어떤 불만을 표출하고 있는 걸까요? 왜 그냥 T를 넣으면 안 된다고 화를 내는 걸까요?
코드 수정: 이 에러를 잠재우고 TypeScript를 안심시키려면, <T> 부분을 어떻게 수정해야 할까요?
```

- 제네릭으로 받은 변수 `value`가 string 타입일 경우에만 parseInt 메서드가 올바른 값을 return할 것이기 때문에 `<T>`가 아니라 `<T extends string>`이라고 작성해야 타입스크립트가 안십할 것 같다.
- 코드 메모

  ```
  // X
  export function getObjectKeys<T>(obj: T) {
    return Object.keys(obj) as (keyof T)[];
  }

  // O -> T가 Object임을 확인할 수 있도록 하기
  export function getObjectKeys<T extends Object>(obj: T) {
    return Object.keys(obj) as (keyof T)[];
  }
  ```

### 3. 전략 평가

- 효과적이었던 것과 그 이유

  - 충돌 테스트의 빠른 실행: Extract를 먼저 써보고 "유니온 타입 추출용이구나"를 깨달은 것. 완벽한 문법을 찾느라 시간을 낭비하지 않고 코드로 검증하여 피드백 루프를 단축함.
  - 학습법 4단계: 억지로 글을 쓰는 대신, X/O 코드 스냅샷을 남기고 GPT의 퀴즈를 풀며 extends의 본질을 상황으로 이해함.

- 비효과적이었던 것과 그 이유

  - 유니온 타입에 유틸리티 타입을 무작정 덧씌운 것: Person이 유니온 타입이라는 점을 구조적으로 먼저 그리지 않고 Partial<Omit>을 시도하다 보니 불필요한 에러를 맞음.
  - 타입의 근본적인 생김새(구조)보다 도구(유틸리티)를 먼저 들이밀었음.

### 4. AI 피드백

1. Structural Thinking (구조적 사고): "타입스크립트는 극단적인 비관주의자입니다."

이번 학습에서 가장 크게 얻어간 개념은 **제네릭의 타입 제약(Type Constraints, extends)**입니다. 보너스 문제에서 T를 넘겼을 때 에러가 나고, 퀴즈에서 parseInt에 T를 넘겼을 때 에러가 난 이유는 같습니다.

TypeScript 컴파일러는 T에 무엇이 들어올지 모를 때, "최악의 경우(예: null, undefined, 숫자, 함수 등)가 들어오면 어떡하지?"라고 비관적으로 가정합니다. 따라서 "이 T는 적어도 객체(extends object)야!", "이 T는 적어도 문자열(extends string)이야!"라고 울타리를 쳐주지 않으면 에러를 뱉는 것입니다. 이 원리를 이해하셨다면 제네릭의 가장 큰 산을 넘으신 겁니다.

2. i+1 (점진적 도전): 유니온과 유틸리티 타입의 함정

Partial<Omit<Person, 'type'>>에서 겪은 혼란은 아주 자연스러운 통과의례입니다. 유니온 타입에 Omit이나 Pick 같은 객체 전용 유틸리티를 씌우면, TS는 "두 타입의 공통된 키"만 남기고 나머지를 파괴해 버립니다. 다음부터 복잡한 유니온 타입을 조작해야 할 때는, 머릿속으로 (또는 메모장에) 두 타입의 교집합과 차집합을 벤 다이어그램으로 살짝 그려보는 시간을 1분만 가져보세요.

### 5. 다음 타임에 바꿀 것

- 유지할 것과 그 이유

  - 현재의 1~4단계 프로세스: 특히 4단계의 'Before/After 스냅샷'과 '마이크로 퀴즈'는 글쓰기 부담을 덜어주면서도 핵심 개념(extends)을 정확히 찌르는 데 성공했기 때문이다.
  - AI를 정답용이 아닌 질의응답 에이전트로 사용하기: 답을 알려주지 않고 생각을 유도하고 질문을 계속해서 사용자에게 던지는 방식이 꽤 효과적이었다.

- 바꿀 것과 그 이유

  - 충돌 테스트 전에, 대상이 되는 타입을 파악하기 위해 주석으로 10초만 뼈대를 그려보기. <- 타입을 무조건 덧씌운 문제점에서 개선된 점

- 추가할 것
  - 앞으로 <T>를 선언할 때마다 속으로 extends 필요성 여부를 파악하기
  - 외부 지식 끌어오기: AI뿐만 아니라 블로그와 공식 문서를 정독하기

---
