type comp = (getIconContent: import('../types/IconContent').getIconContentType, computeIconTemplate: import('./compute-icon-template').computeLocalIconTemplateType) => (list: import('../types/List').List) => string
type compFirstStep = (list: import('../types/List').List) => string

export const computeInjection: comp = (
        getIconContent: import('../types/IconContent').getIconContentType, 
        computeIconTemplate: import('./compute-icon-template').computeLocalIconTemplateType
    ): compFirstStep => (list: import('../types/List').List): string => {
        let injection: string = ''

        const entries: [string, string[]][] = Object.entries(list)
        for (const [iconGroup, iconGroupInstance] of entries) {
            iconGroupInstance.forEach((iconName: string) => {
                const {iconContent, iconViewBox} = getIconContent(iconGroup, iconName)
                injection = injection.concat(computeIconTemplate(iconName, iconViewBox, iconContent)) 
            })
        }

        return injection
}
