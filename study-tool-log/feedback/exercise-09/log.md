# Exercise 09 풀이 로그

## 타입체크 결과
✅ 타입 에러 없음

## 루틴 경로
- [x] ① 직접 시도
- [ ] ② 키워드 요청
- [x] ③ 접근방식 질문
- [x] ④ 피드백 완료

## Before

```ts
export type ApiResponse<T> = { status: "success"; data: T } | { status: "error"; error: string };

type AdminsApiResponse = { status: "success"; data: Admin[] } | { status: "error"; error: string };
export function requestAdmins(callback: (response: AdminsApiResponse) => void) { ... }

type UsersApiResponse = { status: "success"; data: User[] } | { status: "error"; error: string };
export function requestUsers(callback: (response: UsersApiResponse) => void) { ... }

export function requestCurrentServerTime(callback: (response: ApiResponse<number>) => void) { ... }
export function requestCoffeeMachineQueueLength(callback: (response: ApiResponse<number>) => void) { ... }
```

## After

```ts
export type ApiResponse<T> = { status: "success"; data: T } | { status: "error"; error: string };

export function requestAdmins(callback: (response: ApiResponse<Admin[]>) => void) { ... }
export function requestUsers(callback: (response: ApiResponse<User[]>) => void) { ... }
export function requestCurrentServerTime(callback: (response: ApiResponse<number>) => void) { ... }
export function requestCoffeeMachineQueueLength(callback: (response: ApiResponse<number>) => void) { ... }
```

## 시지프 피드백
(리뷰 후 업데이트 예정)
