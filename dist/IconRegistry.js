"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Container for all your icon and job with them
 */
class IconRegistry {
    constructor() {
        this.icons = {};
        this.plugins = {};
    }
    addIconSync(iconSet, group, name) {
        if (!(iconSet in this.plugins)) {
            return new Error('Incorrect Set');
        }
        if (`${iconSet}__${group}__${name}` in this.icons) {
            return new Error('Icon is already added');
        }
        const [err, icon] = this.plugins[iconSet].extractorSync(group, name);
        if (err !== undefined || icon === undefined) {
            return new Error('Icon not exist in this set and/or group');
        }
        this.icons = Object.assign({}, this.icons, { [`${iconSet}__${group}__${name}`]: icon });
        return true;
    }
    removeIconSync(iconSet, group, name) {
        const iconFullName = `${iconSet}__${group}__${name}`;
        if (!(iconFullName in this.icons)) {
            return new Error('Icon not exist in registry');
        }
        this.icons = Object.keys(this.icons)
            .filter((key) => key !== iconFullName)
            .reduce((acc, key) => {
            return Object.assign({}, acc, { [key]: this.icons[key] });
        }, {});
        return true;
    }
    getIconSync(iconSet, group, name) {
        const iconFullName = `${iconSet}__${group}__${name}`;
        if (!(iconFullName in this.icons)) {
            return [new Error('Icon not exist in registry'), undefined];
        }
        return [undefined, this.icons[iconFullName]];
    }
    getSymbolSync(iconSet, group, name) {
        const iconFullName = `${iconSet}__${group}__${name}`;
        if (!(iconFullName in this.icons)) {
            return [new Error('Icon not exist in registry'), undefined];
        }
        const icon = this.icons[iconFullName];
        const coverOneContent = (content) => `<path d="${content}"/>`;
        let allContent;
        if (Array.isArray(icon.content)) {
            allContent = icon.content.map(coverOneContent).join('');
        }
        else {
            allContent = coverOneContent(icon.content);
        }
        const templateFulled = String.raw `<symbol id="${iconFullName}" viewBox="${icon.viewBox[0]} ${icon.viewBox[1]} ${icon.viewBox[2]} ${icon.viewBox[3]}">${allContent}</symbol>`;
        return [undefined, templateFulled];
    }
    addPlugin(iconSet, plugin) {
        if (iconSet in this.plugins) {
            return new Error('Plugin already registered');
        }
        this.plugins = Object.assign({}, this.plugins, { [iconSet]: {
                extractor: plugin.extractor,
                extractorSync: plugin.extractorSync
            } });
        return true;
    }
    removePlugin(iconSet) {
        if (!(iconSet in this.plugins)) {
            return new Error('Plugin not exist in registry');
        }
        this.plugins = Object.keys(this.plugins)
            .filter((key) => key !== iconSet)
            .reduce((acc, key) => {
            return Object.assign({}, acc, { [key]: this.plugins[key] });
        }, {});
        return true;
    }
    compileSprite() {
        let contentToSprite = '';
        Object.keys(this.icons).map((iconFullName) => {
            const icon = this.icons[iconFullName];
            const coverOneContent = (content) => `<path d="${content}"/>`;
            let allContent;
            if (Array.isArray(icon.content)) {
                allContent = icon.content.map(coverOneContent).join('');
            }
            else {
                allContent = coverOneContent(icon.content);
            }
            const templateFulled = String.raw `<symbol id="${iconFullName}" viewBox="${icon.viewBox[0]} ${icon.viewBox[1]} ${icon.viewBox[2]} ${icon.viewBox[3]}">${allContent}</symbol>`;
            contentToSprite = `${contentToSprite}${templateFulled}`;
        });
        const spriteTemplate = (content) => `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${content}</svg>`;
        return spriteTemplate(contentToSprite);
    }
}
exports.IconRegistry = IconRegistry;
