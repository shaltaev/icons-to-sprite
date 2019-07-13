declare type extractedIcon = {
    content: string;
    viewBox: string;
};
export declare type extractionTry = [Error, undefined] | [undefined, extractedIcon];
declare type iconExtractor = (group: string, iconName: string) => extractionTry;
declare type List = import('../types/List').List;
/**
 * This class Handle IconSet
 */
export declare class IconSet {
    name: string;
    extractor: iconExtractor;
    iconContentRegistry: {
        [K: string]: extractedIcon;
    };
    constructor(name: string, extractor: iconExtractor);
    getIconContentFromRegistryOrLoadAndGet(iconName: string, group?: string): extractionTry;
    loadIconFromSource(group: string, iconName: string): undefined | Error;
    loadAllIconFromList(list: List): void | Error;
    packIconContentIntoTemplate(iconName: string): string | Error;
    packAllIconContentFromIconContentRegistry(): string | Error;
}
export {};
