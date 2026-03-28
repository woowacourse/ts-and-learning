/*

소개:

    필터링 요구 사항이 늘어났습니다. 우리는
    모든 종류의 Person을 필터링할 수 있어야 합니다.

연습 문제:

    filterPersons의 타입을 수정하여, personType이 'user'일 때는
    사용자를 필터링하고 User[]를 반환하며, personType이 'admin'일 때는
    Admin[]을 반환하도록 하세요. 
    
    또한 filterPersons는 personType에 따라 User/Admin 타입의 부분 타입을 받아들여야 합니다.
    
    `criteria` 인수는 `personType` 인수의 값에 따라 동작해야 합니다. 
    `criteria` 필드에는 `type` 필드를 포함할 수 없습니다.

난이도 높은 보너스 연습 문제:

    주어진 인자에 대해 더
    편리한 결과를 반환하는 `getObjectKeys()` 함수를 구현하여,
    형변환을 할 필요가 없도록 하십시오.

    let criteriaKeys = Object.keys(criteria) as (keyof User)[];
    -->
    let criteriaKeys = getObjectKeys(criteria);

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
  { type: "user", name: "Wilson", age: 23, occupation: "Ball" },
  { type: "admin", name: "Agent Smith", age: 23, role: "Anti-virus engineer" },
];

export function logPerson(person: Person) {
  console.log(
    ` - ${person.name}, ${person.age}, ${person.type === "admin" ? person.role : person.occupation}`,
  );
}

type Criteria = Partial<Omit<Person, "type">>;

export function filterPersons(
  persons: Person[],
  personType: Person["type"],
  criteria: Criteria,
): Person[] {
  return persons
    .filter((person) => person.type === personType)
    .filter((person) => {
      let criteriaKeys = Object.keys(criteria) as (keyof Criteria)[];
      return criteriaKeys.every((fieldName) => {
        return person[fieldName] === criteria[fieldName];
      });
    });
}

export const usersOfAge23 = filterPersons(persons, "user", { age: 23 });
export const adminsOfAge23 = filterPersons(persons, "admin", { age: 23 });

console.log("Users of age 23:");
usersOfAge23.forEach(logPerson);

console.log();

console.log("Admins of age 23:");
adminsOfAge23.forEach(logPerson);

// In case you are stuck:
// https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads
