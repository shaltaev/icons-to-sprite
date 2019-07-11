import { computeIconTemplate } from './compute-icon-template'

type ret =  (iconsSetName: string) => (iconName: string, viewBox: string, iconContent: string) => string
type computeLocalIconTemplateType = import('./compute-icon-template').computeLocalIconTemplateType

export const returnLocalTemplateHandler: ret = (iconsSetName: string): computeLocalIconTemplateType => (iconName: string, viewBox: string, iconContent: string): string => {
    return computeIconTemplate(iconsSetName, iconName, viewBox, iconContent)
}
