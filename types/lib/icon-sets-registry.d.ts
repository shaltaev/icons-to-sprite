import { IconSet } from './icon-set';
/**
 * Singleton Registry for handle IconSets
 */
export declare class IconSetsRegistry {
    iconSets: {
        [K: string]: IconSet;
    };
    constructor();
    setIconSet(name: string, extractor: IconSet['extractor']): true | Error;
    packAll(): string | Error;
}
export declare function createRegistry(): IconSetsRegistry;
