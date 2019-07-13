declare type List = import('./types/List').List;
export declare function compileSprite(fileName: string, what: {
    material?: string | List;
    fontAwesome?: string | List;
}): void | Error;
export {};
