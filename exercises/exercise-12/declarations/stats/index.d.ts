type comparatorType<T> = (a: T, b: T) => number;

type getIndexFunctionType = <T>(
  input: T[],
  comparator: comparatorType<T>,
) => number;

type getElementFunctionType = <T>(
  input: T[],
  comparator: comparatorType<T>,
) => T | null;

type getAverageValueType = <T>(
  input: T[],
  getValue: (arg: T) => number,
) => number | null;

declare module "stats" {
  export const getMaxIndex: getIndexFunctionType;
  export const getMinIndex: getIndexFunctionType;
  export const getMedianIndex: getIndexFunctionType;

  export const getMaxElement: getElementFunctionType;
  export const getMinElement: getElementFunctionType;
  export const getMedianElement: getElementFunctionType;

  export const getAverageValue: getAverageValueType;
}
