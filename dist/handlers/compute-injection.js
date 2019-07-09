"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeInjection = (getIconContent, computeIconTemplate) => (list) => {
    let injection = '';
    for (const iconGroup in list) {
        if (list.hasOwnProperty(iconGroup)) {
            const iconGroupInstance = list[iconGroup];
            iconGroupInstance.forEach((iconName) => {
                const { iconContent, iconViewBox } = getIconContent(iconGroup, iconName);
                injection = injection.concat(computeIconTemplate(iconName, iconViewBox, iconContent));
            });
        }
    }
    return injection;
};
