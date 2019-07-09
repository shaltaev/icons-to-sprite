"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compute_icon_template_1 = require("./compute-icon-template");
exports.returnLocalTemplateHandler = (iconsSetName) => (iconName, viewBox, iconContent) => {
    return compute_icon_template_1.computeIconTemplate(iconsSetName, iconName, viewBox, iconContent);
};
