"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_list_from_file_1 = require("./lib/get-list-from-file");
var fs_1 = require("fs");
var icon_sets_registry_1 = require("./lib/icon-sets-registry");
var material_1 = require("./sets/material");
var font_awesome_free_1 = require("./sets/font-awesome-free");
function svgTemplate(inject) {
    return "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">" + inject + "</svg>";
}
function compileSprite(fileName, what) {
    var registry = icon_sets_registry_1.createRegistry();
    if (what.material !== undefined) {
        var materialList = void 0;
        if (typeof what.material === 'string') {
            materialList = get_list_from_file_1.getListFromFile(what.material);
        }
        else {
            materialList = what.material;
        }
        registry.setIconSet(material_1.iconSetName, material_1.extractor);
        registry.iconSets[material_1.iconSetName].loadAllIconFromList(materialList);
    }
    if (what.fontAwesome !== undefined) {
        var fontAwesomeList = void 0;
        if (typeof what.fontAwesome === 'string') {
            fontAwesomeList = get_list_from_file_1.getListFromFile(what.fontAwesome);
        }
        else {
            fontAwesomeList = what.fontAwesome;
        }
        registry.setIconSet(font_awesome_free_1.iconSetName, font_awesome_free_1.extractor);
        registry.iconSets[font_awesome_free_1.iconSetName].loadAllIconFromList(fontAwesomeList);
    }
    var whatToWriteTry = registry.packAll();
    if (whatToWriteTry instanceof Error) {
        return whatToWriteTry;
    }
    fs_1.writeFileSync(fileName, svgTemplate(whatToWriteTry));
}
exports.compileSprite = compileSprite;
//# sourceMappingURL=index.js.map