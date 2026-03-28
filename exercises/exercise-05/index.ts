/*

Intro:

    Time to filter the data! In order to be flexible
    we filter users using a number of criteria and
    return only those matching all of the criteria.
    We don't need Admins yet, we only filter Users.

Exercise:

    Without duplicating type structures, modify
    filterUsers function definition so that we can
    pass only those criteria which are needed,
    and not the whole User information as it is
    required now according to typing.

Higher difficulty bonus exercise:

    Exclude "type" from filter criteria.

*/

/*
    유형 구조를 중복하지 않도록
    filterUsers 함수 정의를 수정하여,
    현재 타입 정의에 따라
    전체 사용자 정보를 전달해야 하는 대신
    필요한 조건만 전달할 수 있게 하십시오.

난이도 높은 보너스 과제:

    필터 조건에서 "type"을 제외하십시오.
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
  {
    type: "admin",
    name: "Jane Doe",
    age: 32,
    role: "Administrator",
  },
  {
    type: "user",
    name: "Kate Müller",
    age: 23,
    occupation: "Astronaut",
  },
  {
    type: "admin",
    name: "Bruce Willis",
    age: 64,
    role: "World saver",
  },
  {
    type: "user",
    name: "Wilson",
    age: 23,
    occupation: "Ball",
  },
  {
    type: "admin",
    name: "Agent Smith",
    age: 23,
    role: "Administrator",
  },
];

export const isAdmin = (person: Person): person is Admin =>
  person.type === "admin";
export const isUser = (person: Person): person is User =>
  person.type === "user";

export function logPerson(person: Person) {
  let additionalInformation = "";
  if (isAdmin(person)) {
    additionalInformation = person.role;
  }
  if (isUser(person)) {
    additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

export function filterUsers(
  persons: Person[],
  criteria: Partial<User>,
): User[] {
  return persons.filter(isUser).filter((user) => {
    const criteriaKeys = Object.keys(criteria) as (keyof User)[];

    return criteriaKeys.every((fieldName) => {
      return user[fieldName] === criteria[fieldName];
    });
  });
}

console.log("Users of age 23:");

filterUsers(persons, {
  age: 23,
}).forEach(logPerson);

// In case you are stuck:
// https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types
