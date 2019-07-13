import { getListFromFile } from './lib/get-list-from-file'
import { writeFileSync } from 'fs'

import { createRegistry } from './lib/icon-sets-registry'

import { iconSetName as materialName, extractor as materialExtractor } from './sets/material'
import { iconSetName as faName, extractor as faExtractor } from './sets/font-awesome-free'


type List = import('./types/List').List

function svgTemplate(inject: string): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${inject}</svg>`
}

export function compileSprite(fileName: string, what: {material?: string | List, fontAwesome?: string | List}): void | Error {
    const registry: import('./lib/icon-sets-registry').IconSetsRegistry = createRegistry()

    if (what.material !== undefined) {
        let materialList: List
        if (typeof what.material === 'string') {
            materialList = getListFromFile(what.material)
        } else {
            materialList = what.material 
        }
        registry.setIconSet(materialName, materialExtractor)
        registry.iconSets[materialName].loadAllIconFromList(materialList)
    }

    if (what.fontAwesome !== undefined) {
        let fontAwesomeList: List
        if (typeof what.fontAwesome === 'string') {
            fontAwesomeList = getListFromFile(what.fontAwesome)
        } else {
            fontAwesomeList = what.fontAwesome 
        }
        registry.setIconSet(faName, faExtractor)
        registry.iconSets[faName].loadAllIconFromList(fontAwesomeList)
    }

    const whatToWriteTry: string | Error = registry.packAll()

    if(whatToWriteTry instanceof Error) {
        return whatToWriteTry
    }

    writeFileSync(fileName, svgTemplate(whatToWriteTry))
}
