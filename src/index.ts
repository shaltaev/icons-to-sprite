import { getList, List } from './getList'
import { getPathMaterial, getPathAndViewBoxFontAwesome } from './extractFromSource'
import { writeFileSync } from 'fs'

function svgTemplate(inject: string): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${inject}</svg>`
}

function iconMaterialTemplate(iconName: string, iconPath: string): string {
    return `<symbol id="material_${iconName}" viewBox="0 0 24 24">${iconPath}</symbol>`
}

function iconFontAwesomeTemplate(iconName: string, iconPath: string, viewBox: string): string {
    return `<symbol id="fa_${iconName}" viewBox="${viewBox}">${iconPath}</symbol>`
}

function materialPrepare(list: List): string {
    let materialInject: string = ''
    for (const iconGroup in list) {
        if (list.hasOwnProperty(iconGroup)) {
            const iconGroupInstance = list[iconGroup];
            iconGroupInstance.forEach((iconName) => {
                const iconPath = getPathMaterial(iconGroup, iconName)
                materialInject = materialInject.concat(iconMaterialTemplate(iconName, iconPath)) 
            })
            
        }
    }

    return materialInject
}

function fontAwesomePrepare(list: List): string {
    let fontAwesomeInject: string = ''
    for (const iconGroup in list) {
        if (list.hasOwnProperty(iconGroup)) {
            const iconGroupInstance = list[iconGroup];
            iconGroupInstance.forEach((iconName) => {
                const {iconPath, iconViewBox} = getPathAndViewBoxFontAwesome(iconGroup, iconName)
                fontAwesomeInject = fontAwesomeInject.concat(iconFontAwesomeTemplate(iconName, iconPath, iconViewBox)) 
            })
            
        }
    }

    return fontAwesomeInject
}

export function compileSprite(writeToFile: string, what: {material?: string | List, fontAwesome?: string | List}): void {
    let materialResult: string = ''
    if ('material' in what) {
        if (typeof what.material === 'string') {
            const materialList = getList(what.material)
            materialResult = materialPrepare(materialList)
        }
    }  
    let fontAwesomeResult: string = ''
    if ('fontAwesome' in what) {
        if (typeof what.fontAwesome === 'string') {
            const fontAwesomeList = getList(what.fontAwesome)
            fontAwesomeResult = fontAwesomePrepare(fontAwesomeList)
        }
    }  
    let allInjectiion: string = materialResult + fontAwesomeResult
    writeFileSync(writeToFile, svgTemplate(allInjectiion))
}