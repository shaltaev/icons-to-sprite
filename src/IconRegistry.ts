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

export const mockExtractorSync: extractorSync = (
    iconSet: string,
    group: string,
    name: string
): iconExtractTry => {
    return [new Error('This is mock ExtractorSync'), undefined]
}

type extractor = (
    iconSet: string,
    group: string,
    name: string
) => Promise<iconExtractTry>

export const mockExtractor: extractor = async (
    iconSet: string,
    group: string,
    name: string
): Promise<iconExtractTry> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([new Error('This is mock Extractor'), undefined])
        }, 2000)
    })
}

type Plugin = {
    extractor: extractor
    extractorSync: extractorSync
}

type IconRegistryType = {
    icons: {
        [fullName: string]: {
            icon: Icon
        } & iconMeta
    }
    plugins: {
        [iconSet: string]: // as Plugin Name
        Plugin
    }

    // SyncMethods
    addIconSync(iconSet: string, group: string, name: string): true | Error
    removeIconSync(iconSet: string, group: string, name: string): true | Error
    getIconSync(iconSet: string, group: string, name: string): iconExtractTry
    getSymbolSync(iconSet: string, group: string, name: string): symbolTry
    compileSpriteSync(): string | Error

    addPlugin(iconSet: string, plugin: Plugin): true | Error
    removePlugin(iconSet: string): true | Error
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
    addPlugin(iconSet: string, plugin: Plugin): true | Error {
        if (iconSet in this.plugins) {
            return new Error('Plugin already registered')
        }

        this.plugins = {
            ...this.plugins,
            [iconSet]: {
                extractor: plugin.extractor,
                extractorSync: plugin.extractorSync
            }
        }

        return true
    }

    removePlugin(iconSet: string): true | Error {
        if (!(iconSet in this.plugins)) {
            return new Error('Plugin not exist in registry')
        }

        this.plugins = Object.keys(this.plugins)
            .filter((key: string) => key !== iconSet)
            .reduce((acc: IconRegistryType['plugins'], key: string) => {
                return { ...acc, [key]: this.plugins[key] }
            }, {})

        return true
    }
}
