type Icon = import('./Icon').Icon

export type iconExtractTry = [undefined, Icon] | [Error, undefined]
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
        Icon
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
    removeIconSync(iconSet: string, group: string, name: string): true | Error {
        const iconFullName: string = `${iconSet}__${group}__${name}`
        if (!(iconFullName in this.icons)) {
            return new Error('Icon not exist in registry')
        }

        this.icons = Object.keys(this.icons)
            .filter((key: string) => key !== iconFullName)
            .reduce((acc: IconRegistryType['icons'], key: string) => {
                return { ...acc, [key]: this.icons[key] }
            }, {})

        return true
    }
    getIconSync(iconSet: string, group: string, name: string): iconExtractTry {
        const iconFullName: string = `${iconSet}__${group}__${name}`
        if (!(iconFullName in this.icons)) {
            return [new Error('Icon not exist in registry'), undefined]
        }

        return [undefined, this.icons[iconFullName]]
    }
    getSymbolSync(iconSet: string, group: string, name: string): symbolTry {
        const iconFullName: string = `${iconSet}__${group}__${name}`
        if (!(iconFullName in this.icons)) {
            return [new Error('Icon not exist in registry'), undefined]
        }

        const icon: Icon = this.icons[iconFullName]

        const coverOneContent: (content: string) => string = (
            content: string
        ): string => `<path d="${content}"/>`

        let allContent: string
        if (Array.isArray(icon.content)) {
            allContent = icon.content.map(coverOneContent).join('')
        } else {
            allContent = coverOneContent(icon.content)
        }

        const templateFulled: string = String.raw`<symbol id="${iconFullName}" viewBox="${
            icon.viewBox[0]
        } ${icon.viewBox[1]} ${icon.viewBox[2]} ${
            icon.viewBox[3]
        }">${allContent}</symbol>`

        return [undefined, templateFulled]
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
