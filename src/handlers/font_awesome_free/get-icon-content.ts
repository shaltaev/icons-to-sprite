import { readFileSync } from 'fs'

export function getIconContent(iconGroup: string, iconName: string): import('../../types/IconContent').IconContent {
    const filePath: string = `node_modules/@fortawesome/fontawesome-free/svgs/${iconGroup}/${iconName}.svg`
    const fileContent: string = readFileSync(filePath, {encoding: 'utf-8'})

    const fileContentInWork: string = fileContent.slice(49)
    const specialIndex: number = fileContentInWork.indexOf('"')

    const iconViewBox: string = fileContentInWork.slice(0, specialIndex)
    const iconContent: string = fileContentInWork.slice(specialIndex + 2, -6)

    return { iconContent , iconViewBox }
}
