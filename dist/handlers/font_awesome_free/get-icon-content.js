"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function getIconContent(iconGroup, iconName) {
    const filePath = `node_modules/@fortawesome/fontawesome-free/svgs/${iconGroup}/${iconName}.svg`;
    const fileContent = fs_1.readFileSync(filePath, { encoding: 'utf-8' });
    let fileContentInWork = fileContent.slice(49);
    let specialIndex = fileContentInWork.indexOf('"');
    const iconViewBox = fileContentInWork.slice(0, specialIndex);
    const iconContent = fileContentInWork.slice(specialIndex + 2, -6);
    return { iconContent, iconViewBox };
}
exports.getIconContent = getIconContent;
