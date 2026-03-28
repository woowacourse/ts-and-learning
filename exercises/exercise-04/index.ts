/*

Intro:
    User와 Admin 모두에 "type"을 도입함에 따라
    이제 두 객체를 더 쉽게 구분할 수 있게 되었습니다.
    객체 유형 검사 로직을 별도의 함수인 isUser와 isAdmin으로 분리하자
    logPerson 함수에서 새로운 유형 오류가 발생했습니다.

연습 문제:

    이 상황에서 TypeScript가 유형을 올바르게 인식할 수 있도록
    방법을 찾아보고 필요한 수정 사항을 적용해 보세요.

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

export type Person = User | Admin;

export const persons: Person[] = [
  {
    type: "user",
    name: "Max Mustermann",
    age: 25,
    occupation: "Chimney sweep",
  },
  { type: "admin", name: "Jane Doe", age: 32, role: "Administrator" },
  { type: "user", name: "Kate Müller", age: 23, occupation: "Astronaut" },
  { type: "admin", name: "Bruce Willis", age: 64, role: "World saver" },
];

export function isAdmin(person: Person): person is Admin {
  return person.type === "admin";
}

export function isUser(person: Person): person is User {
  return person.type === "user";
}

export function logPerson(person: Person) {
  let additionalInformation: string = "";
  if (isAdmin(person)) {
    additionalInformation = person.role;
  }
  if (isUser(person)) {
    additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

console.log("Admins:");
persons.filter(isAdmin).forEach(logPerson);

console.log();

console.log("Users:");
persons.filter(isUser).forEach(logPerson);

// In case you are stuck:
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
