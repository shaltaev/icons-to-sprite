declare type Icon = import('./Icon').Icon;
export declare type iconExtractTry = [undefined, Icon] | [Error, undefined];
declare type symbolTry = [undefined, string] | [Error, undefined];
export declare type extractorSync = (group: string, name: string) => iconExtractTry;
export declare type extractor = (group: string, name: string) => Promise<iconExtractTry>;
declare type Plugin = {
    extractor: extractor;
    extractorSync: extractorSync;
};
declare type IconRegistryType = {
    icons: {
        [fullName: string]: Icon;
    };
    plugins: {
        [iconSet: string]: Plugin;
    };
    addIconSync(iconSet: string, group: string, name: string): true | Error;
    removeIconSync(iconSet: string, group: string, name: string): true | Error;
    getIconSync(iconSet: string, group: string, name: string): iconExtractTry;
    getSymbolSync(iconSet: string, group: string, name: string): symbolTry;
    addPlugin(iconSet: string, plugin: Plugin): true | Error;
    removePlugin(iconSet: string): true | Error;
    compileSprite(): string;
};
/**
 * Container for all your icon and job with them
 */
export declare class IconRegistry implements IconRegistryType {
    icons: IconRegistryType['icons'];
    plugins: IconRegistryType['plugins'];
    constructor();
    addIconSync(iconSet: string, group: string, name: string): true | Error;
    removeIconSync(iconSet: string, group: string, name: string): true | Error;
    getIconSync(iconSet: string, group: string, name: string): iconExtractTry;
    getSymbolSync(iconSet: string, group: string, name: string): symbolTry;
    addPlugin(iconSet: string, plugin: Plugin): true | Error;
    removePlugin(iconSet: string): true | Error;
    compileSprite(): string;
}
export {};
