# 학습 도구 로그

- 학습에 도움이 되는 도구를 만들고, 기록합니다. 필요하면 코드를 남깁니다.

---

## 도구 이름

TypeScript Learning Tutor (Claude Code 기반 학습 하네스)

## 도구 유형

Claude Code (CLAUDE.md + skills + rules + settings.json + context/)

## 해결하려는 문제

typescript-exercises를 풀 때 Claude Code가 바로 정답 코드를 써주면 학습 효과가 없었다. 답을 받으면 그 순간은 이해한 것 같지만, 다음 문제에서 같은 개념이 나오면 또 막혔다. 결국에는 왜 이 타입을 써야 하는지, 다른 방법은 없는지를 스스로 생각하는 과정이 빠져 있었다.

또한 문제를 풀면서 배운 내용이 대화창에만 남아서, 나중에 복습하려면 채팅 기록을 뒤져야 했다. 공부한 내용이 파일로 남지 않으니 학습이 축적되지 않는 느낌이었다.

## 어떻게 만들었는가

Claude Code의 Context Engineering과 Harness Engineering 개념을 적용해서, AI의 행동 방식 자체를 설계하는 방향으로 접근했다. 책(Claude Master Guide)에서 말하는 4계층(지식/도구/패키지/통제)을 기준으로 구조를 잡았다.

### 지식 레이어: CLAUDE.md + context/

프로젝트 루트에 `CLAUDE.md`를 작성하고, `context/` 폴더에 커리큘럼과 진행 상태 등 문맥 자료를 분리했다. CLAUDE.md의 지시는 영어로 작성했다. Claude가 영어 지시를 더 정확하게 따르고 토큰도 절약되기 때문이다. 대화 응답은 한국어로 하도록 설정했다.

핵심 규칙은 세 가지다.

1. **절대 답을 주지 않는다.** exercise의 정답 코드를 직접 작성하지 않고, 개념 설명 → 질문 → 공식 문서 링크 → 유사 예제 순서로 단계별 유도한다.
2. **풀고 나면 되묻는다.** 타입체크를 통과해도 바로 넘어가지 않고, "왜 이 타입을 선택했는지", "다른 방법은 없었을까" 같은 질문을 한 번에 하나씩 던진다.
3. **질문은 한 번에 1개만.** 처음에 3개씩 쏟아냈더니 학생이 압도당해서, 꼬리를 물고 이어가는 방식으로 수정했다.

`context/curriculum.md`에는 exercise별 핵심 개념, 선수 지식, 3단계 힌트, 유도 질문, 되묻기 질문, 다음 exercise와의 연결 관계를 미리 정의해두었다. Claude가 매번 문제를 추론하지 않고 커리큘럼을 참조하기 때문에 안내 품질이 일관된다.

### 도구 레이어: skills

`.claude/skills/`에 두 개의 스킬을 만들었다. 처음에는 `.claude/commands/`로 만들었지만, skills로 업그레이드했다. skills는 YAML frontmatter로 도구 제한(`allowed-tools`), 설명(`description`), 호출 방식(`user-invocable`, `disable-model-invocation`) 등을 제어할 수 있어서 더 정밀하다.

- `/start {번호}`: curriculum.md에서 해당 exercise 섹션만 읽고, 핵심 개념 + 선수 지식 확인 + 공식 문서 링크 + 유도 질문 1개를 안내한다. 코드는 안 줌. plan.md 상태도 자동 업데이트. `allowed-tools: Read, Bash, Edit, Write`로 필요한 도구만 허용.
- `/save-learning`: 대화에서 배운 내용을 `learnings/exercise-{번호}.md`에 자동 저장한다. 핵심 개념, 헷갈렸던 것, 이해한 내용, 대안 접근법, 참고 자료가 정리된다. `allowed-tools: Read, Write, Edit`로 제한.

둘 다 `disable-model-invocation: true`로 설정해서, Claude가 알아서 호출하지 않고 학생이 명시적으로 실행해야만 동작한다. 힌트와 리뷰는 별도 스킬 없이, 대화 흐름에서 CLAUDE.md 규칙에 따라 자연스럽게 진행된다.

### 패키지 레이어: rules (조건부 규칙)

`.claude/rules/`에 파일 패턴별 규칙을 분리했다.

- `no-answer.md` (exercises/**/*.ts): exercise 파일 작업 시 정답 코드 작성 금지 강제
- `save-learning.md` (learnings/**/*.md): 학습 기록은 학생이 실제로 말한 내용 기반, Claude가 대신 이해한 척 쓰지 않도록 강제

이렇게 분리하면 CLAUDE.md에 모든 규칙을 넣지 않아도 되고, 해당 파일을 다룰 때만 규칙이 로드되어 토큰도 절약된다.

### 통제 레이어: settings.json

`.claude/settings.json`으로 권한을 설정했다. `npm run ex`(타입체크), 파일 읽기, `learnings/` 쓰기, `exercises/` 편집, `context/` 편집만 허용한다.

### 문맥 레이어: context/

Claude가 참조하는 학습 문맥 자료를 모아둔 폴더다.

- `curriculum.md`: exercise별 커리큘럼 (개념, 힌트, 연결 관계)
- `plan.md`: 진행 상태 추적 (세션 간 이어받기용)
- `changelog.md`: 도구 구조 변경 기록
- `troubleshooting.md`: 문제 발생 시 상황/증상/원인/해결 기록

### 최종 파일 구조

```
ts-and-learning/
├── CLAUDE.md
├── .claude/
│   ├── settings.json
│   ├── rules/
│   │   ├── no-answer.md
│   │   └── save-learning.md
│   └── skills/
│       ├── start/SKILL.md
│       └── save-learning/SKILL.md
├── context/
│   ├── curriculum.md
│   ├── plan.md
│   ├── changelog.md
│   └── troubleshooting.md
├── learnings/
└── exercises/
```

### 각 파일/폴더 상세 설명

**CLAUDE.md**
세션 시작 시 자동 로드. 튜터 역할, 학습 유도 규칙, 되묻기 순서, 진행 상태 관리 정책을 영어로 정의. `Always respond in Korean`으로 출력 언어만 한국어 지정. 실무/시니어 시선/오버엔지니어링 유도 규칙도 포함.

**.claude/settings.json**
프로젝트 레벨 권한 설정. allow: `npm run ex/typecheck`, `Read`, `Write(learnings/*)`, `Edit(exercises/*, context/*)`. 이외 도구는 승인 필요.

**.claude/rules/no-answer.md**
`paths: exercises/**/*.ts`. exercise 파일 작업 시에만 로드. 정답 코드 작성 절대 금지. 학생만 코드 수정 가능.

**.claude/rules/save-learning.md**
`paths: learnings/**/*.md`. 학습 기록 작성 시에만 로드. Claude 해석이 아닌 학생 실제 발화 기반으로만 기록.

**.claude/skills/start/SKILL.md**
`/start {번호}` 슬래시 커맨드. `user-invocable: true`, `disable-model-invocation: true`, `allowed-tools: Read, Bash, Edit, Write`. curriculum.md 해당 섹션만 읽고 → 핵심 개념/선수지식/유도질문 안내 → `npm run ex` 실행 → plan.md 상태를 `in progress`로 업데이트.

**.claude/skills/save-learning/SKILL.md**
`/save-learning` 슬래시 커맨드. `user-invocable: true`, `disable-model-invocation: true`, `allowed-tools: Read, Write, Edit`. 대화 기반 학습 기록을 `learnings/exercise-{번호}.md`에 저장 → plan.md 상태를 `done`으로 업데이트.

**context/**
Claude가 참조하는 학습 문맥 자료. 학생도 직접 열람 가능. `.claude/` 안에 넣지 않은 이유: 숨김 폴더는 접근이 불편하기 때문.

**context/curriculum.md**
15개 exercise 개별 정의. 각 항목에 핵심 개념, 선수 지식, 읽어볼 자료(공식 문서 링크), 유도 질문, 힌트 3단계(키워드 → 문서 → 유사 예제), 되묻기 질문, 다음 exercise 연결 포함. Claude는 전체를 읽지 않고 해당 섹션만 참조.

**context/plan.md**
진행 상태 테이블. exercise별 미시작/진행중/완료/막힘 상태 관리. 세션 시작 시 자동 읽기 → 이어받기 가능. 세션 종료 시 "다음에 할 것" 업데이트.

**context/changelog.md**
도구 구조 변경 이력. CLAUDE.md, skills, rules 등 수정 시 날짜 + 변경 내용 기록.

**context/troubleshooting.md**
도구 사용 중 발생한 문제의 상황/증상/원인/해결 기록. 같은 문제 재발 방지용.

**learnings/**
`/save-learning` 실행 시 자동 생성. `exercise-{번호}.md` 형태로 frontmatter(exercise, concept, date) + 배운 것/헷갈렸던 것/이해한 내용/대안/참고 자료 포함. 복습 시 이 폴더만 보면 됨.

**exercises/**
typescript-exercises 기반 15문제. 난이도 순 (interface → union → narrowing → utility types → generics → declare module → augmentation → currying → generic class). 각 exercise에 `index.ts`(문제 파일, 학생이 코드 작성)와 `test.ts`(type-assertions 기반 타입 검증, `npm run ex {번호}`로 실행) 포함.

**src/lib/type-assertions/index.ts**
커스텀 타입 테스트 유틸리티. `IsTypeEqual`, `typeAssert` 등. test.ts에서 import하여 런타임 없이 타입 레벨에서 정답 검증.

## 어떻게 도움이 되었는가

### 학습 흐름 변화

이전: 문제 읽기 → Claude한테 물어보기 → 답 받기 → 복붙 → 다음 문제
이후: `/start 5` → 개념 파악 → 공식 문서 읽기 → 직접 코드 작성 → 막히면 대화로 힌트 → 풀고 나면 되묻기 → `/save-learning`으로 정리

### 설계 과정에서 배운 것

1. 프롬프트를 길게 잘 쓰는 것보다, CLAUDE.md와 settings.json으로 AI의 행동 방식을 설계하는 게 더 효과적이었다. 예를 들어 "답을 주지 마"라고 매번 프롬프트에 쓰는 대신, CLAUDE.md에 규칙으로 한 번 박아두면 모든 대화에서 일관되게 적용된다. 아마도 이게 책에서 말하는 Context Engineering의 핵심이었다고 생각한다.

2. "질문은 한 번에 1개만"이라는 규칙도 직접 써보면서 발견한 것이다. 처음에는 3개씩 쏟아냈는데, 학생(본인) 입장에서 압도당하는 느낌이 있어서 CLAUDE.md를 수정했다. 도구를 만들고 → 써보고 → 고치는 루프가 자연스럽게 돌아갔다.

3. 지시는 영어, 대화는 한국어로 분리하면 Claude가 규칙을 더 정확하게 따른다. 한국어 지시에서 미묘하게 무시되던 규칙이 영어로 바꾸니 잘 작동했다.

4. curriculum.md를 만들어 exercise별 힌트와 개념을 미리 정의해두니, Claude가 매번 추론하지 않아도 되어 안내 품질이 일관되었다. 이 문제들 같은 경우에는 3번 -> 4번 이렇게 흐름이 있어서 그 문제 단 하나만 보면 혼란스러운 답변을 받을 상황이 많았었다. 이제는 커리큘럼이 있는 튜터로 바뀐 셈이다.

5. rules/를 활용해 파일 패턴별 규칙을 분리하면, 모든 규칙을 항상 로드하지 않아도 되어 토큰이 절약되고 규칙도 더 명확해진다.

6. commands에서 skills로 업그레이드하면서, frontmatter로 도구 제한(allowed-tools)과 호출 방식(disable-model-invocation) 등을 제어할 수 있게 되었다. 단순 마크다운 파일에서 실행 단위로 격상되었다.

7. 최종적으로는 되묻기가 끝난 뒤 실무 연결("프로덕션에서 이 패턴 어디서 쓸까?"), 시니어 시선("시니어가 리뷰하면 뭘 물어볼까?"), 오버엔지니어링 유도("이걸 완전히 제네릭하게 만들어보면?") 단계를 추가했다. 답을 맞히는 것에서 끝나지 않고, 설계 감각까지 확장하는 구조이다.
