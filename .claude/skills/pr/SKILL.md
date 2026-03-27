---
name: pr
description: woowacourse/ts-and-learning 저장소의 inaemin 브랜치로 PR을 생성한다. PR 템플릿과 리뷰 가이드라인을 기반으로 작성한다.
---

# PR 생성

로컬 `inaemin` 브랜치를 `woowacourse/ts-and-learning` 저장소의 `inaemin` 브랜치로 PR을 생성한다.

## 실행 절차

1. 로컬 `inaemin` 브랜치의 변경사항을 `origin`에 push한다.
2. `gh pr create`로 PR을 생성한다.
   - base 저장소: `woowacourse/ts-and-learning`
   - base 브랜치: `inaemin`
   - head: `inaemin/ts-and-learning`의 `inaemin` 브랜치
3. PR 본문은 아래 템플릿을 기반으로 작성한다.
4. 사용자에게 각 섹션 내용을 질문하여 채운다.

## PR 템플릿

```markdown
## 학습 목표

이번 미션을 통해 다음과 같은 학습 경험들을 쌓는 것을 목표로 합니다.

- TypeScript 기초 문법을 익힌다.
- 학습법을 설계 → 시도 → 피드백 → … 루프를 반복하며, 학습법을 개선한다.

## 제출 전 체크 리스트

### 과제 완료

- [ ] typescript-exercises 12번까지 풀이 완료
- [ ] 학습 로그 하루 4회 이상 작성
- [ ] 학습 도구 1개 이상 제작 및 로그 작성

## 리뷰 요청 & 논의하고 싶은 내용

### 1) 이번 단계에서 가장 많이 고민했던 문제와 해결 과정에서 배운 점

(사용자에게 질문하여 채운다)

### 2) 이번 리뷰를 통해 논의하고 싶은 부분

(사용자에게 질문하여 채운다)
```

## 리뷰 가이드라인 참고사항

PR 작성 시 다음 리뷰 관점을 고려하여 내용을 구성한다:

- **TS 지식 피드백**: 이해되지 않는 부분이나 고민이 있는 경우 질문으로 작성
- **학습 과정 피드백**: 학습로그 변천사를 공유하고, 학습 방식에 대한 피드백을 요청
- **학습 도구 피드백**: 어떤 문제를 해결하려 했는지, 실제로 도움이 되었는지, 다른 방법은 없는지 공유

## 실행 명령어

```bash
git push origin inaemin
gh pr create --repo woowacourse/ts-and-learning --base inaemin --head inaemin:inaemin --title "제목" --body "본문"
```
