export const computeInjection = (
        getIconContent: import('../types/IconContent').getIconContentType, 
        computeIconTemplate: import('./compute-icon-template').computeLocalIconTemplateType
    ) => (list: import('../types/List').List): string => {
        let injection: string = ''
        for (const iconGroup in list) {
            if (list.hasOwnProperty(iconGroup)) {
                const iconGroupInstance = list[iconGroup];
                iconGroupInstance.forEach((iconName) => {
                    const {iconContent, iconViewBox} = getIconContent(iconGroup, iconName)
                    injection = injection.concat(computeIconTemplate(iconName, iconViewBox, iconContent)) 
                })
                
            }
        }

        return injection
}