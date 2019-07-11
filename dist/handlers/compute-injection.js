"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeInjection = (getIconContent, computeIconTemplate) => (list) => {
    let injection = '';
    const entries = Object.entries(list);
    for (const [iconGroup, iconGroupInstance] of entries) {
        iconGroupInstance.forEach((iconName) => {
            const { iconContent, iconViewBox } = getIconContent(iconGroup, iconName);
            injection = injection.concat(computeIconTemplate(iconName, iconViewBox, iconContent));
        });
    }
    return injection;
};
