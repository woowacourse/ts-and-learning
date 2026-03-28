/*

소개:

    이제 우리는 비동기 함수를 갖게 되었습니다. 정말 첨단 기술이죠.
    이것만으로도 우리는 이제 공식적으로 기술 스타트업이 되었습니다.
    하지만 한 컨설턴트가 우리가 꿈꾸던
    미래 IT 업계의 리더십에 대한 희망을 무너뜨렸습니다.
    그는 콜백 기반의 비동기 방식은 더 이상
    유행하지 않으며, 모두가 Promise를 사용해야 한다고 말했습니다.
    그는 우리가 Promise로 전환하면
    유망한 결과를 가져올 것이라고 약속했습니다.

연습 문제:

    데이터 요청 기능을 모두 다시 구현하고 싶지는 않습니다.
    기존의 콜백 기반 함수들을 새로운 Promise 호환 결과로
    포장해 봅시다.
    최종 함수는 Promise를 반환해야 하며,
    이 Promise는 최종 데이터(예: 사용자 또는 관리자)를
    직접 반환하거나 오류(또는 Error 타입)를 반환해야 합니다.
    함수 이름은 promisify로 정합시다.

    이 함수의 이름은 promisify로 지정해야 합니다.

난이도 높은 보너스 연습 문제:

    함수들이 포함된 객체를 받아,
    각 함수가 Promise로 변환된 새로운 객체를 반환하는
    promisifyAll 함수를 만들어 보세요.

    이에 따라 API 생성 코드를 다음과 같이 재작성하세요:

        const api = promisifyAll(oldApi);
*/

interface User {
  type: "user";
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: "admin";
  name: string;
  age: number;
  role: string;
}

type Person = User | Admin;

const admins: Admin[] = [
  { type: "admin", name: "Jane Doe", age: 32, role: "Administrator" },
  { type: "admin", name: "Bruce Willis", age: 64, role: "World saver" },
];

const users: User[] = [
  {
    type: "user",
    name: "Max Mustermann",
    age: 25,
    occupation: "Chimney sweep",
  },
  { type: "user", name: "Kate Müller", age: 23, occupation: "Astronaut" },
];

export type ApiResponse<T> =
  | {
      status: "success";
      data: T;
    }
  | {
      status: "error";
      error: string;
    };

export function promisify<T>(
  arg: (callback: (response: ApiResponse<T>) => void) => void,
): () => Promise<T> {
  return () => {
    return new Promise<T>((resolve, reject) => {
      arg((response) => {
        if (response.status === "success") {
          resolve(response.data);
        } else {
          reject(new Error(response.error));
        }
      });
    });
  };
}

const oldApi = {
  requestAdmins(callback: (response: ApiResponse<Admin[]>) => void) {
    callback({
      status: "success",
      data: admins,
    });
  },
  requestUsers(callback: (response: ApiResponse<User[]>) => void) {
    callback({
      status: "success",
      data: users,
    });
  },
  requestCurrentServerTime(callback: (response: ApiResponse<number>) => void) {
    callback({
      status: "success",
      data: Date.now(),
    });
  },
  requestCoffeeMachineQueueLength(
    callback: (response: ApiResponse<number>) => void,
  ) {
    callback({
      status: "error",
      error: "Numeric value has exceeded Number.MAX_SAFE_INTEGER.",
    });
  },
};

export const api = {
  requestAdmins: promisify(oldApi.requestAdmins),
  requestUsers: promisify(oldApi.requestUsers),
  requestCurrentServerTime: promisify(oldApi.requestCurrentServerTime),
  requestCoffeeMachineQueueLength: promisify(
    oldApi.requestCoffeeMachineQueueLength,
  ),
};

function logPerson(person: Person) {
  console.log(
    ` - ${person.name}, ${person.age}, ${person.type === "admin" ? person.role : person.occupation}`,
  );
}

async function startTheApp() {
  console.log("Admins:");
  (await api.requestAdmins()).forEach(logPerson);
  console.log();

  console.log("Users:");
  (await api.requestUsers()).forEach(logPerson);
  console.log();

  console.log("Server time:");
  console.log(
    `   ${new Date(await api.requestCurrentServerTime()).toLocaleString()}`,
  );
  console.log();

  console.log("Coffee machine queue length:");
  console.log(`   ${await api.requestCoffeeMachineQueueLength()}`);
}

startTheApp().then(
  () => {
    console.log("Success!");
  },
  (e: Error) => {
    console.log(
      `Error: "${e.message}", but it's fine, sometimes errors are inevitable.`,
    );
  },
);

// In case you are stuck:
// https://www.typescriptlang.org/docs/handbook/2/generics.html
