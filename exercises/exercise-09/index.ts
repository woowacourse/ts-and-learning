/*

소개:

    파워 유저 제도는 좋지 않은 아이디어였습니다. 해당 유저들이
    확장된 권한을 얻자마자 다른 유저들을 괴롭히기 시작했고,
    결국 우리는 훌륭한 유저들을 많이 잃게 되었습니다.
    이에 대응해 남은 자금을 모두
    마케팅에 쏟아부어 더 많은 유저를 확보했습니다.
    이제 모든 데이터를 본격적인 데이터베이스로
    이전할 준비를 시작해야 합니다. 당분간은 모의 데이터만 처리하겠습니다.

    서버 API 형식은 다음과 같이 결정되었습니다:

    성공 시: { status: 'success', data: RESPONSE_DATA }
    오류 시: { status: 'error', error: ERROR_MESSAGE }

    API 엔지니어는 이 API를 위한 타입을 만들기 시작했고,
    곧바로 생성해야 할 타입의 양이
    너무 많다는 것을 깨달았습니다.

연습 문제:

    UsersApiResponse 및 AdminsApiResponse 타입을 제거하고
    각 함수에 대한 API 응답 형식을 지정하기 위해
    제네릭 타입 ApiResponse를 사용하세요.

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

type AdminsApiResponse = ApiResponse<Admin[]>;

export function requestAdmins(callback: (response: AdminsApiResponse) => void) {
  callback({
    status: "success",
    data: admins,
  });
}

type UsersApiResponse = ApiResponse<User[]>;

export function requestUsers(callback: (response: UsersApiResponse) => void) {
  callback({
    status: "success",
    data: users,
  });
}

export function requestCurrentServerTime(
  callback: (response: ApiResponse<number>) => void,
) {
  callback({
    status: "success",
    data: Date.now(),
  });
}

export function requestCoffeeMachineQueueLength(
  callback: (response: ApiResponse<unknown>) => void,
) {
  callback({
    status: "error",
    error: "Numeric value has exceeded Number.MAX_SAFE_INTEGER.",
  });
}

function logPerson(person: Person) {
  console.log(
    ` - ${person.name}, ${person.age}, ${person.type === "admin" ? person.role : person.occupation}`,
  );
}

function startTheApp(callback: (error: Error | null) => void) {
  requestAdmins((adminsResponse) => {
    console.log("Admins:");
    if (adminsResponse.status === "success") {
      adminsResponse.data.forEach(logPerson);
    } else {
      return callback(new Error(adminsResponse.error));
    }

    console.log();

    requestUsers((usersResponse) => {
      console.log("Users:");
      if (usersResponse.status === "success") {
        usersResponse.data.forEach(logPerson);
      } else {
        return callback(new Error(usersResponse.error));
      }

      console.log();

      requestCurrentServerTime((serverTimeResponse) => {
        console.log("Server time:");
        if (serverTimeResponse.status === "success") {
          console.log(
            `   ${new Date(serverTimeResponse.data).toLocaleString()}`,
          );
        } else {
          return callback(new Error(serverTimeResponse.error));
        }

        console.log();

        requestCoffeeMachineQueueLength((coffeeMachineQueueLengthResponse) => {
          console.log("Coffee machine queue length:");
          if (coffeeMachineQueueLengthResponse.status === "success") {
            console.log(`   ${coffeeMachineQueueLengthResponse.data}`);
          } else {
            return callback(new Error(coffeeMachineQueueLengthResponse.error));
          }

          callback(null);
        });
      });
    });
  });
}

startTheApp((e: Error | null) => {
  console.log();
  if (e) {
    console.log(
      `Error: "${e.message}", but it's fine, sometimes errors are inevitable.`,
    );
  } else {
    console.log("Success!");
  }
});

// In case you are stuck:
// https://www.typescriptlang.org/docs/handbook/2/generics.html
