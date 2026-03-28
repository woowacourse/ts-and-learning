# 학습 도구 로그

-   학습에 도움이 되는 도구를 만들고, 기록합니다. 필요하면 코드를 남깁니다.

## **도구 이름**

-   PiFSR 도우미

## **도구 유형** (예: GPTs, gems, Claude Code(skill, command, agent, ...) Chrome Extension, CLI, 웹사이트 등)

-   Claude Code(sub-agents)

## **해결하려는 문제**: 어떤 학습 상의 불편/문제를 해결하려 했는가?

-   문제 위주로 학습할 때 Problem-Driven 단계에서 문제의 목적(왜 배워야하는지)을 파악하기 어려움
-   개념에 대한 이해가 완벽하지 않을 때 i+1 단게에서 어떤 도전을 해야할지 결정하기 어려움

## **어떻게 만들었는가**: 간단한 제작 과정

-   처음에는 tsc-check 스크립트나 typescript best practice skills를 찾아서 적용할까 고민했지만 적절한 외부 skills를 찾기 어려웠고 tsc-check와 같은 스크립트는 터미널에서 간단하게 확인 가능했던 점과 typescript best practice 또한 agent가 별다른 프롬프트 없이 좋은 결과물을 만들어 줄 것이라고 생각하여 sub-agents만 활용하기로 결정했음

    -   problem-prep: 문제 풀기 전 실행. 문제 번호를 말하면 `exercises/exercise-0N/index.ts`를 직접 읽고 핵심 개념과 왜 배워야 하는지(Problem-Driven), 이번에 집중할 한 가지 목표(i+1)를 제시한다.

    -   typescript-mentor: 문제 풀고 나서 실행. 코드를 읽고 사용된 개념 키워드 추출, 실무 예시 연결, Best Practice 개선 제안을 해준다. 정답 코드는 절대 주지 않는다.

## **어떻게 도움이 되었는가**: 실제 사용 경험과 효과

-   problem-prep agent

    -   문제 코드를 직접 읽고 "왜 이 개념이 필요한가"를 맥락과 함께 설명해줘서 막연하게 사용하던 키워드들을 어떤 결핍을 해결하기 위해 만들어진 것인지 이해하고 더 근거 있게 사용할 수 있게 됨
    -   초기에는 풀기 전에 바로 실행해서 키워드를 너무 일찍 알게 되는 문제가 있었음 -> 문제 제공 공식문서 링크 먼저 확인 후 직접 시도하기로 agent 사용 방식을 수정하였음. 그래도 방향이 안 잡힐 때만 agent를 사용하는 방식으로 개선하면서 해소됨

-   typescript-mentor agent
    -   정답 통과 후 best practice와 개선점을 제시해줘서 단순히 에러만 없애는 것에서 끝나지 않고 더 나은 코드를 보는 습관이 생김
    -   실무 예시와 연결해주는 부분이 특히 유용했음 문제 풀이에는 과할 수 있지만 가독성, 유지보수성을 고려한 패턴을 접할 수 있었음
        -   ApiResponse<never>와 ApiResponse<void>의 같지만 다른 점,
        -   useState의 튜플 반환 타입의 실무 예시 ([S, Dispatch<...>]),
        -   isAdmin 함수를 분리하여 판별 기준 바뀌면 한 곳만 수정할 수 있는 개선
        -   등..
