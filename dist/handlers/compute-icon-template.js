"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeIconTemplate = (iconSetName, iconName, viewBox, iconContent) => {
    return `<symbol id="${iconSetName}_${iconName}" viewBox="${viewBox}">${iconContent}</symbol>`;
};
