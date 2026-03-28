import {
  strReverse,
  strToLower,
  strToUpper,
  strRandomize,
  strInvertCase,
} from "str-utils";

/*

소개:

    사용자들이 서로 소통할 수 있도록
    사용자 이름을 다양한 방식으로 꾸미기로 했습니다.
    간단히 검색해 본 결과 "str-utils"라는 라이브러리를
    찾게 되었습니다. 문제는 이 라이브러리에
    TypeScript 선언이 없다는 점입니다.

연습 문제:

    다음 위치에서 str-utils 모듈의 구현을 확인하세요:
    node_modules/str-utils/index.js
    node_modules/str-utils/README.md

    다음 위치에 해당 모듈의 타입 선언을 작성하세요:
    declarations/str-utils/index.d.ts

    타입 선언의 중복을 피하고,
    타입 별칭을 사용하세요.

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

const isAdmin = (person: Person): person is Admin => person.type === "admin";
const isUser = (person: Person): person is User => person.type === "user";

export const nameDecorators = [
  strReverse,
  strToLower,
  strToUpper,
  strRandomize,
  strInvertCase,
];

function logPerson(person: Person) {
  let additionalInformation: string = "";
  if (isAdmin(person)) {
    additionalInformation = person.role;
  }
  if (isUser(person)) {
    additionalInformation = person.occupation;
  }
  const randomNameDecorator =
    nameDecorators[Math.round(Math.random() * (nameDecorators.length - 1))];
  const name = randomNameDecorator(person.name);
  console.log(` - ${name}, ${person.age}, ${additionalInformation}`);
}

([] as Person[]).concat(users, admins).forEach(logPerson);

// In case you are stuck:
// https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules
