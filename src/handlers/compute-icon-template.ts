export const computeIconTemplate: computeIconTemplateType = (iconSetName: string, iconName: string, viewBox: string, iconContent: string): string => {
    return `<symbol id="${iconSetName}_${iconName}" viewBox="${viewBox}">${iconContent}</symbol>`
}

export type computeIconTemplateType = (iconSetName: string, iconName: string, viewBox: string, iconContent: string) => string
export type computeLocalIconTemplateType = (iconName: string, viewBox: string, iconContent: string) => string