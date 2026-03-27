declare module 'stats' {
  type Comapre<T> = (a: T, b: T) => number;
  type Getter<T> = (a: T) => number;
  type GetIndexFn = <T>(input: T[], comparator: Comapre<T>) => number;
  type GetElementFn = <T>(input: T[], comparator: Comapre<T>) => T | null;
  type GetValueFn = <T>(input: T[], getter: Getter<T>) => number | null;

  export const getMaxIndex: GetIndexFn;
  export const getMinIndex: GetIndexFn;
  export const getMaxElement: GetElementFn;
  export const getMinElement: GetElementFn;
  export const getMedianIndex: GetIndexFn;
  export const getMedianElement: GetElementFn;
  export const getAverageValue: GetValueFn;

  //   export function getMaxIndex<T>(input: T[], comparator: (a: T, b: T) => number): number;
  //   export function getMaxElement<T>(input: T[], comparator: (a: T, b: T) => number): T | null;
  //   export function getMinIndex<T>(input: T[], comparator: (a: T, b: T) => number): number;
  //   export function getMinElement<T>(input: T[], comparator: (a: T, b: T) => number): T | null ;
  //   export function getMedianIndex<T>(input: T[], comparator: (a: T, b: T) => number): number;
  //   export function getMedianElement<T>(input: T[], comparator: (a: T, b: T) => number): T | null;
  //   export function getAverageValue<T>(input: T[], getter: (a: T) => number): number | null;
}
