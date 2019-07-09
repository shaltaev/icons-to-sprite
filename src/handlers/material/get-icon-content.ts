import { readFileSync } from 'fs'

export function getIconContent(iconGroup: string, iconName: string): import('../../types/IconContent').IconContent {
    const filePath: string = `node_modules/material-design-icons/${iconGroup}/svg/production/ic_${iconName}_24px.svg`
    const fileContent: string = readFileSync(filePath, {encoding: 'utf-8'})
    const iconContent = fileContent.slice(83, -6)
    return {
        iconContent,
        iconViewBox: "0 0 24 24"
    }
}