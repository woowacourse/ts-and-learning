type StrUtilType = (arg: string) => string;

declare module "str-utils" {
  export const strReverse: StrUtilType;
  export const strToLower: StrUtilType;
  export const strToUpper: StrUtilType;
  export const strRandomize: StrUtilType;
  export const strInvertCase: StrUtilType;
}
