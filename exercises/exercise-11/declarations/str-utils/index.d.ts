declare module 'str-utils' {
    type strFun = (input: string) => string;
    
    export const strReverse: strFun;
    export const strToLower: strFun;
    export const strToUpper: strFun;
    export const strRandomize: strFun;
    export const strInvertCase: strFun;
}
