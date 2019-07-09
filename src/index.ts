import { getListFromFile } from './lib/get-list-from-file'
import { List } from "./types/List";
import { writeFileSync } from 'fs'

import { computeLocalInjection as getMaterialInject} from './handlers/material/compute-local-injection'
import { computeLocalInjection as getFontAwesomeInject} from './handlers/font_awesome_free/compute-local-injection'


function svgTemplate(inject: string): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${inject}</svg>`
}

export function compileSprite(writeToFile: string, what: {material?: string | List, fontAwesome?: string | List}): void {
    let materialResult: string = ''
    if ('material' in what) {
        if (typeof what.material === 'string') {
            const materialList = getListFromFile(what.material)
            materialResult = getMaterialInject(materialList)
        }
    }  
    let fontAwesomeResult: string = ''
    if ('fontAwesome' in what) {
        if (typeof what.fontAwesome === 'string') {
            const fontAwesomeList = getListFromFile(what.fontAwesome)
            fontAwesomeResult = getFontAwesomeInject(fontAwesomeList)
        }
    }  
    let allInjection: string = materialResult + fontAwesomeResult
    writeFileSync(writeToFile, svgTemplate(allInjection))
}