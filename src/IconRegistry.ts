type Icon = import('./Icon').Icon

type iconMeta = {
    iconSet: string
    group: string
    name: string
}

type iconExtractTry = [undefined, Icon | Icon[]] | [Error, undefined]
type symbolTry = [undefined, string] | [Error, undefined]

type extractorSync = (
    iconSet: string,
    group: string,
    name: string
) => iconExtractTry

type extractor = (
    iconSet: string,
    group: string,
    name: string
) => Promise<iconExtractTry>

type IconRegistryType = {
    icons: {
        [fullName: string]: {
            icon: Icon
        } & iconMeta
    }
    plugins: {
        [iconSet: string]: {
            extractor: extractor
            extractorSync: extractorSync
        }
    }

    // SyncMethods
    addIconSync(iconSet: string, group: string, name: string): true | Error
    removeIconSync(iconSet: string, group: string, name: string): true | Error
    getIconSync(iconSet: string, group: string, name: string): iconExtractTry
    getSymbolSync(iconSet: string, group: string, name: string): symbolTry
    compileSpriteSync(): string | Error

    addPlugin(): true | Error
    removePlugin(): true | Error
}

/**
 * Container for all your icon and job with them
 */
export class IconRegistry implements IconRegistryType {
    icons: IconRegistryType['icons']
    plugins: IconRegistryType['plugins']
    constructor() {
        this.icons = {}
        this.plugins = {}
    }

    addIconSync(iconSet: string, group: string, name: string): Error {
        return new Error('No implemented yet')
    }
    removeIconSync(iconSet: string, group: string, name: string): Error {
        return new Error('No implemented yet')
    }
    getIconSync(iconSet: string, group: string, name: string): iconExtractTry {
        return [new Error('No implemented yet'), undefined]
    }
    getSymbolSync(iconSet: string, group: string, name: string): symbolTry {
        return [new Error('No implemented yet'), undefined]
    }
    compileSpriteSync(): Error {
        return new Error('No implemented yet')
    }
    addPlugin(): Error {
        return new Error('No implemented yet')
    }
    removePlugin(): Error {
        return new Error('No implemented yet')
    }
}
