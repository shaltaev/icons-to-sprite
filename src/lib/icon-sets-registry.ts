import { IconSet } from './icon-set'

/**
 * Singleton Registry for handle IconSets
 */
export class IconSetsRegistry {
    iconSets: { [K:string]: IconSet }
    
    constructor() {
        this.iconSets = {}
    }

    setIconSet(name: string, extractor: IconSet['extractor']): true | Error {
        const keys: string[] = Object.keys(this.iconSets)
        if(keys.includes(name)) {
            return new Error(`Set with name ${name} is already exist in IconSets registry`)
        } else {

            this.iconSets = {
                ...this.iconSets,
                [name]: new IconSet(name, extractor)
            }

            return true;
        }
    }

    packAll(): string | Error {
        const keys: string[] = Object.keys(this.iconSets)

        const allSetPacks: string[] = []
        
        for(const key of keys) {
            const resultTry: string | Error = this.iconSets[key].packAllIconContentFromIconContentRegistry()

            if (resultTry instanceof Error) {
                return resultTry
            }
            
            allSetPacks.push(resultTry)
        }

        return allSetPacks.join('')
    }
} 

let registry: IconSetsRegistry | undefined

export function createRegistry(): IconSetsRegistry {
    if(registry === undefined) {
        registry = new IconSetsRegistry()
    }

    return registry
}
