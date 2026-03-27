type Func = (value: string) => string;

declare module 'str-utils' {
  // export const ...
  // export function ...
  export const strReverse: Func;
  export const strToLower: Func;
  export const strToUpper: Func;
  export const strRandomize: Func;
  export const strInvertCase: Func;
}
