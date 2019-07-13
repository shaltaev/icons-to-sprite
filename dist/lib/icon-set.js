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
var util_1 = require("util");
/**
 * This class Handle IconSet
 */
var IconSet = /** @class */ (function () {
    function IconSet(name, extractor) {
        this.name = name;
        this.extractor = extractor;
        this.iconContentRegistry = {};
    }
    IconSet.prototype.getIconContentFromRegistryOrLoadAndGet = function (iconName, group) {
        var keys = Object.keys(this.iconContentRegistry);
        if (keys.includes(iconName)) {
            return [undefined, this.iconContentRegistry[iconName]];
        }
        if (group !== undefined) {
            var loadTry = this.loadIconFromSource(group, iconName);
            if (loadTry instanceof Error) {
                return [loadTry, undefined];
            }
            return [undefined, this.iconContentRegistry[iconName]];
        }
        return [new Error("Can't find icon with name " + iconName), undefined];
    };
    IconSet.prototype.loadIconFromSource = function (group, iconName) {
        var _a;
        var keys = Object.keys(this.iconContentRegistry);
        if (keys.includes(iconName)) {
            return new Error("Icon with name " + iconName + " is already loaded");
        }
        var ext = this.extractor(group, iconName);
        if (ext[0] !== undefined) {
            return ext[0];
        }
        this.iconContentRegistry = __assign({}, this.iconContentRegistry, (_a = {}, _a[iconName] = ext[1], _a));
        return undefined;
    };
    IconSet.prototype.loadAllIconFromList = function (list) {
        var _this = this;
        var groups = Object.keys(list);
        groups.forEach(function (group) {
            var iconsToLoad = list[group].slice();
            iconsToLoad.forEach(function (iconToLoad) {
                try {
                    _this.loadIconFromSource(group, iconToLoad);
                }
                catch (err) {
                    if (err instanceof Error) {
                        return err;
                    }
                    else {
                        return new Error("We catch something that shouldn't exist: " + util_1.inspect(err));
                    }
                }
            });
        });
    };
    IconSet.prototype.packIconContentIntoTemplate = function (iconName) {
        var res = this.getIconContentFromRegistryOrLoadAndGet(iconName);
        if (res[0] !== undefined) {
            return res[0];
        }
        else {
            return "<symbol id=\"" + this.name + "_" + iconName + "\" viewBox=\"" + res[1].viewBox + "\">" + res[1].content + "</symbol>";
        }
    };
    IconSet.prototype.packAllIconContentFromIconContentRegistry = function () {
        var keys = Object.keys(this.iconContentRegistry);
        var allSymbols = [];
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var symbolTry = this.packIconContentIntoTemplate(key);
            if (symbolTry instanceof Error) {
                return symbolTry;
            }
            allSymbols.push(symbolTry);
        }
        return allSymbols.join('');
    };
    return IconSet;
}());
exports.IconSet = IconSet;
//# sourceMappingURL=icon-set.js.map