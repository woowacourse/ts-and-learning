declare module 'stats' {
  type Comparator<T> = (a: T, b: T) => number;
  type Selector<T> = (item: T) => number;

  //   export function getMaxIndex<T>(input: T[], comparator: Comparator<T>): number;
  //   export function getMedianIndex<T>(
  //     input: T[],
  //     comparator: Comparator<T>,
  //   ): number;
  //   export function getMinIndex<T>(input: T[], comparator: Comparator<T>): number;

  //   export function getMaxElement<T>(
  //     input: T[],
  //     comparator: Comparator<T>,
  //   ): T | null;
  //   export function getMinElement<T>(
  //     input: T[],
  //     comparator: Comparator<T>,
  //   ): T | null;
  //   export function getMedianElement<T>(
  //     input: T[],
  //     comparator: Comparator<T>,
  //   ): T | null;

  //   export function getAverageValue<T>(
  //     input: T[],
  //     selector: Selector<T>,
  //   ): number | null;

  type GetIndex = <T>(input: T[], comparator: Comparator<T>) => number;
  export const getMaxIndex: GetIndex;
  export const getMinIndex: GetIndex;
  export const getMedianIndex: GetIndex;

  type GetElement = <T>(input: T[], comparator: Comparator<T>) => T | null;
  export const getMaxElement: GetElement;
  export const getMinElement: GetElement;
  export const getMedianElement: GetElement;

  type GetAverage = <T>(input: T[], comparator: Selector<T>) => number | null;
  export const getAverageValue: GetAverage;
}
