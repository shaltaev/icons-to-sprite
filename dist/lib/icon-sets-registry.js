"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var icon_set_1 = require("./icon-set");
/**
 * Singleton Registry for handle IconSets
 */
var IconSetsRegistry = /** @class */ (function () {
    function IconSetsRegistry() {
        this.iconSets = {};
    }
    IconSetsRegistry.prototype.setIconSet = function (name, extractor) {
        var _a;
        var keys = Object.keys(this.iconSets);
        if (keys.includes(name)) {
            return new Error("Set with name " + name + " is already exist in IconSets registry");
        }
        else {
            this.iconSets = __assign({}, this.iconSets, (_a = {}, _a[name] = new icon_set_1.IconSet(name, extractor), _a));
            return true;
        }
    };
    IconSetsRegistry.prototype.packAll = function () {
        var keys = Object.keys(this.iconSets);
        var allSetPacks = [];
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var resultTry = this.iconSets[key].packAllIconContentFromIconContentRegistry();
            if (resultTry instanceof Error) {
                return resultTry;
            }
            allSetPacks.push(resultTry);
        }
        return allSetPacks.join('');
    };
    return IconSetsRegistry;
}());
exports.IconSetsRegistry = IconSetsRegistry;
var registry;
function createRegistry() {
    if (registry === undefined) {
        registry = new IconSetsRegistry();
    }
    return registry;
}
exports.createRegistry = createRegistry;
//# sourceMappingURL=icon-sets-registry.js.map