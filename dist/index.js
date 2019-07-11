"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_list_from_file_1 = require("./lib/get-list-from-file");
const fs_1 = require("fs");
const compute_local_injection_1 = require("./handlers/material/compute-local-injection");
const compute_local_injection_2 = require("./handlers/font_awesome_free/compute-local-injection");
function svgTemplate(inject) {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${inject}</svg>`;
}
function compileSprite(writeToFile, what) {
    let materialResult = '';
    if ('material' in what) {
        if (typeof what.material === 'string') {
            const materialList = get_list_from_file_1.getListFromFile(what.material);
            materialResult = compute_local_injection_1.computeLocalInjection(materialList);
        }
    }
    let fontAwesomeResult = '';
    if ('fontAwesome' in what) {
        if (typeof what.fontAwesome === 'string') {
            const fontAwesomeList = get_list_from_file_1.getListFromFile(what.fontAwesome);
            fontAwesomeResult = compute_local_injection_2.computeLocalInjection(fontAwesomeList);
        }
    }
    const allInjection = materialResult + fontAwesomeResult;
    fs_1.writeFileSync(writeToFile, svgTemplate(allInjection));
}
exports.compileSprite = compileSprite;
