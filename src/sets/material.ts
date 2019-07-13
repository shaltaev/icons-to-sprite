type IconSetExtractor = import('../lib/icon-set').IconSet['extractor']
type extractionTry = import('../lib/icon-set').extractionTry

export const iconSetName: string = 'material'

import { readFileSync } from 'fs'

export const extractor: IconSetExtractor = (group: string, iconName: string): extractionTry => {
    const filePath: string = `node_modules/material-design-icons/${group}/svg/production/ic_${iconName}_24px.svg`
    const fileContent: string = readFileSync(filePath, {encoding: 'utf-8'})
    const content: string = fileContent.slice(83, -6)

    return [
        undefined, {
        content,
        viewBox: '0 0 24 24'
        }
    ]
}
