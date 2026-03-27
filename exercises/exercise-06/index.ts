/*

Intro:

    Filtering requirements have grown. We need to be
    able to filter any kind of Persons.

    Filtering 요구사항이 늘어났습니다. 이제 어떤 종류의 Person이든 filtering할 수 있어야 합니다

Exercise:

    Fix typing for the filterPersons so that it can filter users
    and return User[] when personType='user' and return Admin[]
    when personType='admin'. Also filterPersons should accept
    partial User/Admin type according to the personType.
    `criteria` argument should behave according to the
    `personType` argument value. `type` field is not allowed in
    the `criteria` field.

    filterPersons의 typing을 수정하여 personType이 'user'일 때는 User[]를 반환하고, 
    personType이 'admin'일 때는 Admin[]을 반환하도록 만드세요. 
    또한 filterPersons는 personType에 따라 User 또는 Admin의 partial type(일부 속성만 포함된 타입)을 받아야 합니다.
    `criteria` 인자는 `personType` 인자 값에 따라 동작해야 합니다. `criteria` 필드 내에서 `type` 필드는 허용되지 않습니다.

Higher difficulty bonus exercise:

    Implement a function `getObjectKeys()` which returns more
    convenient result for any argument given, so that you don't
    need to cast it.

    let criteriaKeys = Object.keys(criteria) as (keyof User)[];
    -->
    let criteriaKeys = getObjectKeys(criteria);

    어떤 인자가 주어지든 별도의 casting(타입 변환) 없이 더 편리한 결과를 반환하는 `getObjectKeys()` 함수를 구현하세요.
    let criteriaKeys = Object.keys(criteria) as (keyof User)[];
    -->
    let criteriaKeys = getObjectKeys(criteria);

*/

interface User {
    type: 'user';
    name: string;
    age: number;
    occupation: string;
}

interface Admin {
    type: 'admin';
    name: string;
    age: number;
    role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
    { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
    { type: 'admin', name: 'Agent Smith', age: 23, role: 'Anti-virus engineer' }
];

export function logPerson(person: Person) {
    console.log(
        ` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
    );
}

export function getObjectKeys<T extends object>(obj: T) {
    return Object.keys(obj) as (keyof T)[];
}

export function filterPersons(
    persons: Person[],
    personType: 'user',
    criteria: Partial<Omit<User, 'type'>>
): User[];

export function filterPersons(
    persons: Person[],
    personType: 'admin',
    criteria: Partial<Omit<Admin, 'type'>>
): Admin[];

export function filterPersons(persons: Person[], personType: string, criteria: any): any[] {
    return persons
        .filter((person) => person.type === personType)
        .filter((person: any) => {
            let criteriaKeys = getObjectKeys(criteria);
            return criteriaKeys.every((fieldName) => {
                return person[fieldName] === criteria[fieldName];
            });
        });
}

export const usersOfAge23 = filterPersons(persons, 'user', { age: 23 });
export const adminsOfAge23 = filterPersons(persons, 'admin', { age: 23 });

console.log('Users of age 23:');
usersOfAge23.forEach(logPerson);

console.log();

console.log('Admins of age 23:');
adminsOfAge23.forEach(logPerson);

// In case you are stuck:
// https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads
