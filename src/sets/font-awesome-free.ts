type IconSetExtractor = import('../lib/icon-set').IconSet['extractor']
type extractionTry = import('../lib/icon-set').extractionTry

export const iconSetName: string = 'fa'

import { readFileSync } from 'fs'

export const extractor: IconSetExtractor = (group: string, iconName: string): extractionTry => {
    const filePath: string = `node_modules/@fortawesome/fontawesome-free/svgs/${group}/${iconName}.svg`
    const fileContent: string = readFileSync(filePath, {encoding: 'utf-8'})

    const fileContentInWork: string = fileContent.slice(49)
    const specialIndex: number = fileContentInWork.indexOf('"')

    const viewBox: string = fileContentInWork.slice(0, specialIndex)
    const content: string = fileContentInWork.slice(specialIndex + 2, -6)

    return [
        undefined, {
        content,
        viewBox
        }
    ]
}
