"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getList_1 = require("./getList");
const extractFromSource_1 = require("./extractFromSource");
const fs_1 = require("fs");
function svgTemplate(inject) {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${inject}</svg>`;
}
function iconMaterialTemplate(iconName, iconPath) {
    return `<symbol id="material_${iconName}" viewBox="0 0 24 24">${iconPath}</symbol>`;
}
function iconFontAwesomeTemplate(iconName, iconPath, viewBox) {
    return `<symbol id="fa_${iconName}" viewBox="${viewBox}">${iconPath}</symbol>`;
}
function materialPrepare(list) {
    let materialInject = '';
    for (const iconGroup in list) {
        if (list.hasOwnProperty(iconGroup)) {
            const iconGroupInstance = list[iconGroup];
            iconGroupInstance.forEach((iconName) => {
                const iconPath = extractFromSource_1.getPathMaterial(iconGroup, iconName);
                materialInject = materialInject.concat(iconMaterialTemplate(iconName, iconPath));
            });
        }
    }
    return materialInject;
}
function fontAwesomePrepare(list) {
    let fontAwesomeInject = '';
    for (const iconGroup in list) {
        if (list.hasOwnProperty(iconGroup)) {
            const iconGroupInstance = list[iconGroup];
            iconGroupInstance.forEach((iconName) => {
                const { iconPath, iconViewBox } = extractFromSource_1.getPathAndViewBoxFontAwesome(iconGroup, iconName);
                fontAwesomeInject = fontAwesomeInject.concat(iconFontAwesomeTemplate(iconName, iconPath, iconViewBox));
            });
        }
    }
    return fontAwesomeInject;
}
function compileSprite(writeToFile, what) {
    let materialResult = '';
    if ('material' in what) {
        if (typeof what.material === 'string') {
            const materialList = getList_1.getList(what.material);
            materialResult = materialPrepare(materialList);
        }
    }
    let fontAwesomeResult = '';
    if ('fontAwesome' in what) {
        if (typeof what.fontAwesome === 'string') {
            const fontAwesomeList = getList_1.getList(what.fontAwesome);
            fontAwesomeResult = fontAwesomePrepare(fontAwesomeList);
        }
    }
    let allInjection = materialResult + fontAwesomeResult;
    fs_1.writeFileSync(writeToFile, svgTemplate(allInjection));
}
exports.compileSprite = compileSprite;
