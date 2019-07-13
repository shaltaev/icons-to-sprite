"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iconSetName = 'material';
var fs_1 = require("fs");
exports.extractor = function (group, iconName) {
    var filePath = "node_modules/material-design-icons/" + group + "/svg/production/ic_" + iconName + "_24px.svg";
    var fileContent = fs_1.readFileSync(filePath, { encoding: 'utf-8' });
    var content = fileContent.slice(83, -6);
    return [
        undefined, {
            content: content,
            viewBox: '0 0 24 24'
        }
    ];
};
//# sourceMappingURL=material.js.map