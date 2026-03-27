declare module 'str-utils' {
  // export const ...
  // export function ...

  type StringDecorator = (value: string) => string;

  export const strReverse: StringDecorator;
  export const strToLower: StringDecorator;
  export const strToUpper: StringDecorator;
  export const strRandomize: StringDecorator;
  export const strInvertCase: StringDecorator;
}
