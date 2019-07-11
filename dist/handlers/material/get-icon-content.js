"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function getIconContent(iconGroup, iconName) {
    const filePath = `node_modules/material-design-icons/${iconGroup}/svg/production/ic_${iconName}_24px.svg`;
    const fileContent = fs_1.readFileSync(filePath, { encoding: 'utf-8' });
    const iconContent = fileContent.slice(83, -6);
    return {
        iconContent,
        iconViewBox: '0 0 24 24'
    };
}
exports.getIconContent = getIconContent;
