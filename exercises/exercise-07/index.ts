/*

Intro:
프로젝트에서 필터링 기능이 완전히 제거되었습니다.
    결국 이 기능은 최종 사용자에게 전혀 필요하지 않은 것으로 드러났고,
    우리는 단지 사무실 관리자가 그렇게 하라고 지시했다는 이유만으로
    많은 시간을 낭비한 셈이었습니다. 다음번에는
    제품 관리팀의 의견을 따르는 편이 낫겠습니다.

    어쨌든 새로운 계획이 생겼습니다. CEO의 친구 닉이
    커뮤니티에서 가끔씩 사용자 이름을 무작위로 바꿔주면
    정말 재미있을 것이고, 프로젝트도
    분명 성공할 것이라고 말해주었습니다!

연습 문제:

    두 명의 인물을 입력으로 받아 역순으로 반환하는
    swap 함수를 구현하세요. 사실 함수 자체는
    이미 존재합니다. 단지 적절한 타입을 지정해 주기만 하면 됩니다.
    또한 이 함수는 반드시 Person 타입에만
    제한될 필요는 없으니, 지정된 두 가지 타입이라면
    무엇이든 작동하도록 타입을 지정해 보세요.
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

function logUser(user: User) {
  const pos = users.indexOf(user) + 1;
  console.log(` - #${pos} User: ${user.name}, ${user.age}, ${user.occupation}`);
}

function logAdmin(admin: Admin) {
  const pos = admins.indexOf(admin) + 1;
  console.log(` - #${pos} Admin: ${admin.name}, ${admin.age}, ${admin.role}`);
}

const admins: Admin[] = [
  {
    type: "admin",
    name: "Will Bruces",
    age: 30,
    role: "Overseer",
  },
  {
    type: "admin",
    name: "Steve",
    age: 40,
    role: "Steve",
  },
];

const users: User[] = [
  {
    type: "user",
    name: "Moses",
    age: 70,
    occupation: "Desert guide",
  },
  {
    type: "user",
    name: "Superman",
    age: 28,
    occupation: "Ordinary person",
  },
];

export function swap<T1, T2>(v1: T1, v2: T2): [T2, T1] {
  return [v2, v1];
}

function test1() {
  console.log("test1:");
  const [secondUser, firstAdmin] = swap(admins[0], users[1]);
  logUser(secondUser);
  logAdmin(firstAdmin);
}

function test2() {
  console.log("test2:");
  const [secondAdmin, firstUser] = swap(users[0], admins[1]);
  logAdmin(secondAdmin);
  logUser(firstUser);
}

function test3() {
  console.log("test3:");
  const [secondUser, firstUser] = swap(users[0], users[1]);
  logUser(secondUser);
  logUser(firstUser);
}

function test4() {
  console.log("test4:");
  const [firstAdmin, secondAdmin] = swap(admins[1], admins[0]);
  logAdmin(firstAdmin);
  logAdmin(secondAdmin);
}

function test5() {
  console.log("test5:");
  const [stringValue, numericValue] = swap(123, "Hello World");
  console.log(` - String: ${stringValue}`);
  console.log(` - Numeric: ${numericValue}`);
}

[test1, test2, test3, test4, test5].forEach((test) => test());

// In case you are stuck:
// https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types
// https://www.typescriptlang.org/docs/handbook/2/generics.html
