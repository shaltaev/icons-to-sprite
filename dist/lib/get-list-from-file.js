"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function getListFromFile(fileName) {
    var result = {};
    var fileAsString = fs_1.readFileSync(fileName, { encoding: 'utf-8' });
    var lines = fileAsString.split(/\r?\n/);
    lines.forEach(function (line) {
        var lineParse = line.split(' >>> ');
        if ((0 in lineParse) && (1 in lineParse)) {
            if (!(lineParse[0] in result)) {
                result[lineParse[0]] = [];
            }
            result[lineParse[0]].push(lineParse[1]);
        }
    });
    return result;
}
exports.getListFromFile = getListFromFile;
//# sourceMappingURL=get-list-from-file.js.map