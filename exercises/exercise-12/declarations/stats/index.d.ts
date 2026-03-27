declare module 'stats' {
  type Comparator<T> = (a: T, b: T) => number;
  type GetValue<T> = (a: T) => number;

  type IndexFunc = <T>(input: T[], comparator: Comparator<T>) => number;
  type ElementFunc = <T>(input: T[], comparator: Comparator<T>) => T | null;
  type ValueFunc = <T>(input: T[], getValue: GetValue<T>) => number | null;

  export const getMaxIndex: IndexFunc;
  export const getMaxElement: ElementFunc;
  export const getMinIndex: IndexFunc;
  export const getMinElement: ElementFunc;
  export const getMedianIndex: IndexFunc;
  export const getMedianElement: ElementFunc;
  export const getAverageValue: ValueFunc;
}
