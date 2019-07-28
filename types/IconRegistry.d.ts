declare type Icon = import('./Icon').Icon;
declare type iconMeta = {
    iconSet: string;
    group: string;
    name: string;
};
declare type iconExtractTry = [undefined, Icon | Icon[]] | [Error, undefined];
declare type symbolTry = [undefined, string] | [Error, undefined];
declare type extractorSync = (iconSet: string, group: string, name: string) => iconExtractTry;
declare type extractor = (iconSet: string, group: string, name: string) => Promise<iconExtractTry>;
declare type IconRegistryType = {
    icons: {
        [fullName: string]: {
            icon: Icon;
        } & iconMeta;
    };
    plugins: {
        [iconSet: string]: {
            extractor: extractor;
            extractorSync: extractorSync;
        };
    };
    addIconSync(iconSet: string, group: string, name: string): true | Error;
    removeIconSync(iconSet: string, group: string, name: string): true | Error;
    getIconSync(iconSet: string, group: string, name: string): iconExtractTry;
    getSymbolSync(iconSet: string, group: string, name: string): symbolTry;
    compileSpriteSync(): string | Error;
    addPlugin(): true | Error;
    removePlugin(): true | Error;
};
/**
 * Container for all your icon and job with them
 */
export declare class IconRegistry implements IconRegistryType {
    icons: IconRegistryType['icons'];
    plugins: IconRegistryType['plugins'];
    constructor();
    addIconSync(iconSet: string, group: string, name: string): Error;
    removeIconSync(iconSet: string, group: string, name: string): Error;
    getIconSync(iconSet: string, group: string, name: string): iconExtractTry;
    getSymbolSync(iconSet: string, group: string, name: string): symbolTry;
    compileSpriteSync(): Error;
    addPlugin(): Error;
    removePlugin(): Error;
}
export {};
