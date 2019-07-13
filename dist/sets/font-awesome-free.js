"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iconSetName = 'fa';
var fs_1 = require("fs");
exports.extractor = function (group, iconName) {
    var filePath = "node_modules/@fortawesome/fontawesome-free/svgs/" + group + "/" + iconName + ".svg";
    var fileContent = fs_1.readFileSync(filePath, { encoding: 'utf-8' });
    var fileContentInWork = fileContent.slice(49);
    var specialIndex = fileContentInWork.indexOf('"');
    var viewBox = fileContentInWork.slice(0, specialIndex);
    var content = fileContentInWork.slice(specialIndex + 2, -6);
    return [
        undefined, {
            content: content,
            viewBox: viewBox
        }
    ];
};
//# sourceMappingURL=font-awesome-free.js.map