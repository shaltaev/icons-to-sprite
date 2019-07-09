"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
exports.getListFromFile = (fileName) => {
    let result = {};
    const fileAsString = fs_1.readFileSync(fileName, { encoding: 'utf-8' });
    const lines = fileAsString.split(/\r?\n/);
    lines.forEach((line) => {
        const lineParse = line.split(' >>> ');
        if ((0 in lineParse) && (1 in lineParse)) {
            if (!(lineParse[0] in result)) {
                result[lineParse[0]] = [];
            }
            result[lineParse[0]].push(lineParse[1]);
        }
    });
    return result;
};
