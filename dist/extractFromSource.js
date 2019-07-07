"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function getPathMaterial(iconGroup, iconName) {
    const filePath = `node_modules/material-design-icons/${iconGroup}/svg/production/ic_${iconName}_24px.svg`;
    const fileContent = fs_1.readFileSync(filePath, { encoding: 'utf-8' });
    return fileContent.slice(83, -6);
}
exports.getPathMaterial = getPathMaterial;
function getPathAndViewBoxFontAwesome(iconGroup, iconName) {
    const filePath = `node_modules/@fortawesome/fontawesome-free/svgs/${iconGroup}/${iconName}.svg`;
    const fileContent = fs_1.readFileSync(filePath, { encoding: 'utf-8' });
    let fileContentInWork = fileContent.slice(49);
    let specialIndex = fileContentInWork.indexOf('"');
    const iconViewBox = fileContentInWork.slice(0, specialIndex);
    const iconPath = fileContentInWork.slice(specialIndex + 2, -6);
    return { iconPath, iconViewBox };
}
exports.getPathAndViewBoxFontAwesome = getPathAndViewBoxFontAwesome;
