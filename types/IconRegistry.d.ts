declare type iconType = import('./Icon').iconType;
export declare type iconExtractTryType = [undefined, iconType] | [Error, undefined];
declare type symbolTryType = [undefined, string] | [Error, undefined];
export declare type extractorSyncType = (group: string, name: string) => iconExtractTryType;
export declare type extractorType = (group: string, name: string) => Promise<iconExtractTryType>;
declare type Plugin = {
    extractor: extractorType;
    extractorSync: extractorSyncType;
};
declare type IconRegistryType = {
    icons: {
        [fullName: string]: iconType;
    };
    plugins: {
        [iconSet: string]: Plugin;
    };
    addIconSync(iconSet: string, group: string, name: string): true | Error;
    removeIconSync(iconSet: string, group: string, name: string): true | Error;
    getIconSync(iconSet: string, group: string, name: string): iconExtractTryType;
    getSymbolSync(iconSet: string, group: string, name: string): symbolTryType;
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
    getIconSync(iconSet: string, group: string, name: string): iconExtractTryType;
    getSymbolSync(iconSet: string, group: string, name: string): symbolTryType;
    addPlugin(iconSet: string, plugin: Plugin): true | Error;
    removePlugin(iconSet: string): true | Error;
    compileSprite(): string;
}
export {};
