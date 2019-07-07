import { readFileSync } from 'fs'

export function getPathMaterial(iconGroup: string, iconName: string): string {
    const filePath: string = `node_modules/material-design-icons/${iconGroup}/svg/production/ic_${iconName}_24px.svg`
    const fileContent: string = readFileSync(filePath, {encoding: 'utf-8'})

    return fileContent.slice(83, -6)
}

export function getPathAndViewBoxFontAwesome(iconGroup: string, iconName: string): {iconPath: string, iconViewBox: string} {
    const filePath: string = `node_modules/@fortawesome/fontawesome-free/svgs/${iconGroup}/${iconName}.svg`
    const fileContent: string = readFileSync(filePath, {encoding: 'utf-8'})

    let fileContentInWork: string = fileContent.slice(49)
    let specialIndex = fileContentInWork.indexOf('"')

    const iconViewBox = fileContentInWork.slice(0, specialIndex)
    const iconPath = fileContentInWork.slice(specialIndex + 2, -6)

    return {iconPath , iconViewBox }
}