# Exercise 10 풀이 로그

## 타입체크 결과
✅ 타입 에러 없음

## 루틴 경로
- [x] ① 직접 시도
- [ ] ② 키워드 요청
- [x] ③ 접근방식 질문
- [x] ④ 피드백 완료

## Before

```ts
export function promisifyL<T>(callback: (response: ApiResponse<T>) => void): () => Promise<T> {
  return () => new Promise((resolve, reject) => ...);
}
```

## After

```ts
export function promisify<T>(
  fn: (callback: (response: ApiResponse<T>) => void) => void
): () => Promise<T> {
  return () =>
    new Promise((resolve, reject) => {
      fn((response) => {
        if (response.status === "success") {
          resolve(response.data);
        } else {
          reject(new Error(response.error));
        }
      });
    });
}
```

## 시지프 피드백
(리뷰 후 업데이트 예정)
