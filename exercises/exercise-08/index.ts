/*

소개:

    프로젝트가 성장하면서 일부 사용자들이
    점점 더 큰 영향력을 행사하게 되는 상황이 발생했습니다.
    따라서, User와 Admin이 가진 모든 기능을
    통합한 ‘PowerUser’라는 새로운 사용자 유형을
    만들기로 결정했습니다.

연습 문제:

    User와 Admin의 모든 필드(type 필드 제외)를 포함하고,
    코드 내의 모든 필드를 중복하지 않으면서
    'powerUser' 타입을 갖도록 하는 PowerUser 타입을 정의하세요.

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

// type PowerUser = unknown;
type PowerUser = Omit<User, "type"> &
  Omit<Admin, "type"> & { type: "powerUser" };

export type Person = User | Admin | PowerUser;

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
  {
    type: "powerUser",
    name: "Nikki Stone",
    age: 45,
    role: "Moderator",
    occupation: "Cat groomer",
  },
];

function isAdmin(person: Person): person is Admin {
  return person.type === "admin";
}

function isUser(person: Person): person is User {
  return person.type === "user";
}

function isPowerUser(person: Person): person is PowerUser {
  return person.type === "powerUser";
}

export function logPerson(person: Person) {
  let additionalInformation: string = "";
  if (isAdmin(person)) {
    additionalInformation = person.role;
  }
  if (isUser(person)) {
    additionalInformation = person.occupation;
  }
  if (isPowerUser(person)) {
    additionalInformation = `${person.role}, ${person.occupation}`;
  }
  console.log(`${person.name}, ${person.age}, ${additionalInformation}`);
}

console.log("Admins:");
persons.filter(isAdmin).forEach(logPerson);

console.log();

console.log("Users:");
persons.filter(isUser).forEach(logPerson);

console.log();

console.log("Power users:");
persons.filter(isPowerUser).forEach(logPerson);

// In case you are stuck:
// https://www.typescriptlang.org/docs/handbook/utility-types.html
// https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types
