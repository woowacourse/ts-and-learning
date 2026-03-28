# Exercise 10 Mistake Notes

> ⚠️ 스스로 풀지 못함. 코드 보고 이해 후 다시 풀 것.

## promisify 구조

| | 질문 | 답변 | 평가 |
|---|---|---|---|
| Q1 | `promisify`가 받는 인자 타입이 뭐야? | `ApiResponse<T[]>` | ❌ |
| Q2 | `return callback`이 왜 틀렸어? | 모르겠음 | ❌ |
| Q3 | `await api.requestAdmins()`하면 뭐가 나와야 해? | `ApiResponse<T>` | ❌ |
| Q4 | `resolve`와 `reject` 차이? | 성공/실패 | ✅ |

## 핵심 정정
- `promisify`가 받는 건 callback이 아니라 **callback 기반 함수 자체** (`fn`)
- `return callback` → 틀림. `return () => new Promise(...)` 로 새 함수를 반환해야 함
- `await api.requestAdmins()` → `Admin[]` 반환. `ApiResponse` 전체가 아님
- `resolve(response.data)` — status 분기 후 data만 resolve, 에러는 reject(new Error(...))

## 핵심 패턴
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

## 아직 모르는 것
- `promisifyAll` 타입에서 `any` 완전 제거 (higher-kinded type 한계로 TS에서 불가)
- `new Promise` 구조가 머릿속에 안 떠오름 → 반복 학습 필요

## 참고 자료
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise
