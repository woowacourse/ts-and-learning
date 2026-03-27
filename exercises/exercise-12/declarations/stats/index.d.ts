declare module 'stats' {
  type Comparator<T> = (a: T, b: T) => number;

  type IndexFinder = <T>(input: T[], comparator: Comparator<T>) => number;
  type ElementFinder = <T>(input: T[], comparator: Comparator<T>) => T | null;
  type AverageValueFinder = <T>(input: T[], getValue: (item: T) => number) => number | null;

  export const getMaxIndex: IndexFinder;
  export const getMaxElement: ElementFinder;
  export const getMinIndex: IndexFinder;
  export const getMinElement: ElementFinder;
  export const getMedianIndex: IndexFinder;
  export const getMedianElement: ElementFinder;
  export const getAverageValue: AverageValueFinder;
}
