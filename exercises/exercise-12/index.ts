import {
  getMaxIndex,
  getMaxElement,
  getMinIndex,
  getMinElement,
  getMedianIndex,
  getMedianElement,
  getAverageValue,
} from "stats";

/*

소개:

    데이터베이스에 사용자와 관리자가 정말 많네요!
    CEO의 아버지 제프는 우리가 이제 빅데이터
    스타트업이라고 말합니다. 그게 무슨 뜻인지 우리는 전혀 모르겠지만,
    제프는 우리가 통계와
    분석을 해야 한다고 합니다.

    통계에 대해 우리가 얼마나 알고 있는지 파악하기 위해
    팀 내에서 설문조사를 진행했습니다.
    설문지를 작성한 사람은 커피
    머신 관리자 한 명뿐이었습니다. 답변 내용은 다음과 같았습니다:

     * 최대값
     * 최소값
     * 중앙값
     * 평균값

    스택오버플로우에서 코드 조각을 찾아
    `stats` 모듈로 컴파일했습니다. 문제는
    타입 선언이 빠져 있다는 점입니다.

연습 문제:

    다음 위치에서 stats 모듈의 구현을 확인하세요:
    node_modules/stats/index.js
    node_modules/stats/README.md

    다음 위치에 해당 모듈의 타입 선언을 추가하세요:
    declarations/stats/index.d.ts

난이도 높은 보너스 문제:

    타입 선언의 중복을 피하세요.

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

const admins: Admin[] = [
  { type: "admin", name: "Jane Doe", age: 32, role: "Administrator" },
  { type: "admin", name: "Bruce Willis", age: 64, role: "World saver" },
  { type: "admin", name: "Steve", age: 40, role: "Steve" },
  { type: "admin", name: "Will Bruces", age: 30, role: "Overseer" },
  { type: "admin", name: "Superwoman", age: 28, role: "Customer support" },
];

const users: User[] = [
  {
    type: "user",
    name: "Max Mustermann",
    age: 25,
    occupation: "Chimney sweep",
  },
  { type: "user", name: "Kate Müller", age: 23, occupation: "Astronaut" },
  { type: "user", name: "Moses", age: 70, occupation: "Desert guide" },
  { type: "user", name: "Superman", age: 28, occupation: "Ordinary person" },
  { type: "user", name: "Inspector Gadget", age: 31, occupation: "Undercover" },
];

function logUser(user: User | null) {
  if (!user) {
    console.log(" - none");
    return;
  }
  const pos = users.indexOf(user) + 1;
  console.log(` - #${pos} User: ${user.name}, ${user.age}, ${user.occupation}`);
}

function logAdmin(admin: Admin | null) {
  if (!admin) {
    console.log(" - none");
    return;
  }
  const pos = admins.indexOf(admin) + 1;
  console.log(` - #${pos} Admin: ${admin.name}, ${admin.age}, ${admin.role}`);
}

const compareUsers = (a: User, b: User) => a.age - b.age;
const compareAdmins = (a: Admin, b: Admin) => a.age - b.age;
const colorizeIndex = (value: number) => String(value + 1);

export {
  getMaxIndex,
  getMaxElement,
  getMinIndex,
  getMinElement,
  getMedianIndex,
  getMedianElement,
  getAverageValue,
};

console.log("Youngest user:");
logUser(getMinElement(users, compareUsers));
console.log(
  ` - was ${colorizeIndex(getMinIndex(users, compareUsers))}th to register`,
);

console.log();

console.log("Median user:");
logUser(getMedianElement(users, compareUsers));
console.log(
  ` - was ${colorizeIndex(getMedianIndex(users, compareUsers))}th to register`,
);

console.log();

console.log("Oldest user:");
logUser(getMaxElement(users, compareUsers));
console.log(
  ` - was ${colorizeIndex(getMaxIndex(users, compareUsers))}th to register`,
);

console.log();

console.log("Average user age:");
console.log(
  ` - ${String(getAverageValue(users, ({ age }: User) => age))} years`,
);

console.log();

console.log("Youngest admin:");
logAdmin(getMinElement(admins, compareAdmins));
console.log(
  ` - was ${colorizeIndex(getMinIndex(users, compareUsers))}th to register`,
);

console.log();

console.log("Median admin:");
logAdmin(getMedianElement(admins, compareAdmins));
console.log(
  ` - was ${colorizeIndex(getMedianIndex(users, compareUsers))}th to register`,
);

console.log();

console.log("Oldest admin:");
logAdmin(getMaxElement(admins, compareAdmins));
console.log(
  ` - was ${colorizeIndex(getMaxIndex(users, compareUsers))}th to register`,
);

console.log();

console.log("Average admin age:");
console.log(
  ` - ${String(getAverageValue(admins, ({ age }: Admin) => age))} years`,
);
