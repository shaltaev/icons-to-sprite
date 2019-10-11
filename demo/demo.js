const its = require('../dist')
const itsPluginMaterial = require('its-plugin-material-design-icons')
const itsPluginFontawesome = require('its-plugin-fontawesome-free')

const fs = require('fs')

const iconRegistry = new its.IconRegistry()

// mds is my abbreviation material-design-icons
iconRegistry.addPlugin('mds', {
    extractor: its.mockExtractor,
    extractorSync: itsPluginMaterial.extractorSync
})

iconRegistry.addPlugin('faf', {
    extractor: its.mockExtractor,
    extractorSync: itsPluginFontawesome.extractorSync
})

iconRegistry.addIconSync('mds', 'action', 'alarm')
iconRegistry.addIconSync('mds', 'av', 'album')
iconRegistry.addIconSync('faf', 'solid', 'ad')
iconRegistry.addIconSync('faf', 'regular', 'angry')

const spriteString = iconRegistry.compileSprite()

fs.writeFileSync('./demo/assets/sprite.svg', spriteString)
