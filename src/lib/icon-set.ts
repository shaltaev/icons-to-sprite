import { inspect } from 'util'

type extractedIcon = { content: string, viewBox: string}
export type extractionTry = [Error, undefined] | [ undefined , extractedIcon]
type iconExtractor = (group: string, iconName: string) => extractionTry

type List = import('../types/List').List

/**
 * This class Handle IconSet
 */
export class IconSet {
    name: string
    extractor: iconExtractor
    iconContentRegistry: { [K:string]: extractedIcon }

    constructor(name: string, extractor: iconExtractor) {
        this.name = name
        this.extractor = extractor
        this.iconContentRegistry = {}
    }

    getIconContentFromRegistryOrLoadAndGet(iconName: string, group?: string): extractionTry {
        const keys: string[] = Object.keys(this.iconContentRegistry)
        if(keys.includes(iconName)) {
            return [ undefined , this.iconContentRegistry[iconName]]
        }

        if(group !== undefined) {
            const loadTry: undefined | Error = this.loadIconFromSource(group, iconName)
            if (loadTry instanceof Error) {
                return [loadTry, undefined]
            }

            return [ undefined , this.iconContentRegistry[iconName]]
        }

        return [new Error(`Can't find icon with name ${iconName}`), undefined]
    }

    loadIconFromSource(group: string, iconName: string): undefined | Error {
        const keys: string[] = Object.keys(this.iconContentRegistry)
        if(keys.includes(iconName)) {
            return new Error(`Icon with name ${iconName} is already loaded`)
        }
    
        const ext: extractionTry  = this.extractor(group, iconName)

        if ( ext[0] !== undefined ) {
            return ext[0]
        }

        this.iconContentRegistry = {
            ...this.iconContentRegistry,
            [iconName]: ext[1]
        }

        return undefined
    }

    loadAllIconFromList(list: List): void | Error {
        const groups: string[] = Object.keys(list)
        groups.forEach((group: string) => {
            const iconsToLoad: string[] = [...list[group] ]
            iconsToLoad.forEach((iconToLoad: string) => {
                try {
                    this.loadIconFromSource(group, iconToLoad)
                } catch (err) {
                    if (err instanceof Error) {
                        return err
                    } else {
                        return new Error(`We catch something that shouldn't exist: ${inspect(err)}`)
                    }
                }
            })
        })
    }

    packIconContentIntoTemplate(iconName: string): string | Error {
        const res: extractionTry = this.getIconContentFromRegistryOrLoadAndGet(iconName)

        if(res[0] !== undefined) {
            return res[0]
        } else {
            return `<symbol id="${this.name}_${iconName}" viewBox="${res[1].viewBox}">${res[1].content}</symbol>`
        }
    }

    packAllIconContentFromIconContentRegistry(): string | Error {

        const keys: string[] = Object.keys(this.iconContentRegistry)

        const allSymbols: string[] = []

        for(const key of keys) {
            const symbolTry: string | Error = this.packIconContentIntoTemplate(key)
            
            if ( symbolTry instanceof Error ) {
                return symbolTry
            }
            
            allSymbols.push( symbolTry )
        }

        return allSymbols.join('')

    }

}
