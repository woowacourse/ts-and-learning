declare module 'str-utils' {
  type StringToStringFunction = (value: string) => string;

  export const strReverse: StringToStringFunction;
  export const strToLower: StringToStringFunction;
  export const strToUpper: StringToStringFunction;
  export const strRandomize: StringToStringFunction;
  export const strInvertCase: StringToStringFunction;
}
