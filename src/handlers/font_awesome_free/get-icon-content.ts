import { readFileSync } from 'fs'

export function getIconContent(iconGroup: string, iconName: string): import('../../types/IconContent').IconContent {
    const filePath: string = `node_modules/@fortawesome/fontawesome-free/svgs/${iconGroup}/${iconName}.svg`
    const fileContent: string = readFileSync(filePath, {encoding: 'utf-8'})

    let fileContentInWork: string = fileContent.slice(49)
    let specialIndex = fileContentInWork.indexOf('"')

    const iconViewBox = fileContentInWork.slice(0, specialIndex)
    const iconContent = fileContentInWork.slice(specialIndex + 2, -6)

    return {iconContent , iconViewBox }
}