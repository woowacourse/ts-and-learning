declare module 'stats' {
    export function getMaxIndex<T>(input: Array<T>, comparator: (a:T,b:T)=>number): number | -1;
    export function getMaxElement<T>(input: Array<T>, comparator: (a:T,b:T)=>number):T | null;
    export function getMinIndex<T>(input: Array<T>, comparator: (a:T,b:T)=>number):number | -1;
    export function getMinElement<T>(input: Array<T>, comparator:(a:T,b:T)=>number):T | null;
    export function getMedianIndex<T>(input: Array<T>, comparator: (a:T,b:T)=>number):number | -1;
    export function getMedianElement<T>(input: Array<T>, comparator: (a:T,b:T)=>number):T | null;
    export function getAverageValue<T>(input: Array<T>, getValue:(item:T) => number):number | null;
    
}
