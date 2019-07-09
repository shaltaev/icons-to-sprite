import { computeIconTemplate } from './compute-icon-template'

export const returnLocalTemplateHandler = (iconsSetName: string) => (iconName: string, viewBox: string, iconContent: string) => {
    return computeIconTemplate(iconsSetName, iconName, viewBox, iconContent)
}