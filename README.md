# TS와 학습법 튜닝하기

## 학습 목표

- TypeScript 기초 문법을 익힌다.
- 학습법 설계 → 시도 → 피드백 → … 루프를 반복하며, 학습법을 개선한다.

## Claude Code 실행 방법

### 실행

```bash
cd ts-and-learning
claude
```

프로젝트 루트에서 `claude`를 실행하면 `CLAUDE.md`가 자동으로 로드되어 TypeScript 튜터 모드로 동작한다.

### 주요 명령어

| 명령어 | 설명 |
|--------|------|
| `/start {번호}` | exercise 시작. 핵심 개념 + 유도 질문 안내 (답은 안 줌) |
| `/save-learning` | 대화에서 배운 내용을 `learnings/exercise-{번호}.md`에 저장 |
| `npm run ex {번호}` | 개별 exercise 타입체크 |
| `npm run typecheck` | 전체 타입체크 |

### 학습 흐름

```
/start 5 → 개념 파악 → 공식 문서 읽기 → 직접 코드 작성
→ 막히면 대화로 힌트 (단계별) → 풀고 나면 되묻기
→ /save-learning으로 정리
```

## Claude 구조

```
ts-and-learning/
├── CLAUDE.md                         # 튜터 역할 + 핵심 규칙 (자동 로드)
├── .claude/
│   ├── settings.json                 # 권한 설정
│   ├── rules/
│   │   ├── no-answer.md              # exercises/**/*.ts 작업 시 정답 금지
│   │   └── save-learning.md          # learnings/**/*.md 작성 시 학생 발화 기반 강제
│   └── skills/
│       ├── start/SKILL.md            # /start 슬래시 커맨드
│       └── save-learning/SKILL.md    # /save-learning 슬래시 커맨드
├── context/
│   ├── curriculum.md                 # exercise별 커리큘럼 (개념, 힌트, 연결 관계)
│   ├── plan.md                       # 진행 상태 추적
│   ├── changelog.md                  # 도구 구조 변경 기록
│   └── troubleshooting.md            # 문제 발생 시 기록
├── learnings/                        # /save-learning으로 자동 생성
├── exercises/                        # 15개 TypeScript exercises
└── src/lib/type-assertions/          # 타입 테스트 유틸리티
```

### 각 파일의 역할

**CLAUDE.md** — 세션 시작 시 자동 로드. 튜터 역할 정의, "절대 답을 주지 않는다" 등 핵심 규칙, 되묻기 순서, 진행 상태 관리 정책을 영어로 작성. 응답만 한국어.

**.claude/settings.json** — 프로젝트 레벨 권한 설정. `npm run ex`, 파일 읽기, `learnings/` 쓰기, `exercises/` 편집, `context/` 편집만 허용.

**.claude/rules/** — 파일 패턴별 조건부 규칙. 해당 파일을 다룰 때만 로드되어 토큰 절약.
- `no-answer.md`: exercise 파일 작업 시 정답 코드 작성 절대 금지
- `save-learning.md`: 학습 기록은 학생 실제 발화 기반으로만 작성

**.claude/skills/** — YAML frontmatter로 도구 제한, 호출 방식을 제어하는 실행 단위.
- `start/SKILL.md`: curriculum.md 해당 섹션만 읽고 → 개념/유도질문 안내 → plan.md 업데이트
- `save-learning/SKILL.md`: 대화 기반 학습 기록 저장 → plan.md 완료 처리

**context/** — Claude가 참조하는 학습 문맥 자료. `.claude/` 밖에 둔 이유: 학생도 직접 열람할 수 있도록.

### 설계 원칙

이 도구는 Claude Code의 Context Engineering과 Harness Engineering을 적용했다.

- **지식 레이어**: CLAUDE.md + context/ (역할, 규칙, 커리큘럼)
- **도구 레이어**: skills/ (명시적 실행 단위)
- **패키지 레이어**: rules/ (파일 패턴별 조건부 규칙)
- **통제 레이어**: settings.json (권한 제한)
