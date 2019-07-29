type Icon = import('./Icon').Icon

export type iconExtractTry = [undefined, Icon | Icon[]] | [Error, undefined]
type symbolTry = [undefined, string] | [Error, undefined]

export type extractorSync = (group: string, name: string) => iconExtractTry

export type extractor = (group: string, name: string) => Promise<iconExtractTry>

type Plugin = {
    extractor: extractor
    extractorSync: extractorSync
}

type IconRegistryType = {
    icons: {
        [fullName: string]: // `${iconSet}__${group}__${name}`
        Icon | Icon[]
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

    addIconSync(iconSet: string, group: string, name: string): true | Error {
        if (!(iconSet in this.plugins)) {
            return new Error('Incorrect Set')
        }
        if (`${iconSet}__${group}__${name}` in this.icons) {
            return new Error('Icon is already added')
        }
        const [err, icon] = this.plugins[iconSet].extractorSync(group, name)
        if (err !== undefined || icon === undefined) {
            return new Error('Icon not exist in this set and/or group')
        }
        this.icons = { ...this.icons, [`${iconSet}__${group}__${name}`]: icon }

        return true
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
