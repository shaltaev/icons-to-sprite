const its = require('../dist')
const itsPluginMaterial = require('its-plugin-material-design-icons')

const fs = require('fs')

const iconRegistry = new its.IconRegistry()

// mds is my abbreviation material-design-icons
iconRegistry.addPlugin('mds', {
    extractor: its.mockExtractor,
    extractorSync: itsPluginMaterial.extractorSync
})

iconRegistry.addIconSync('mds', 'action', 'alarm')
iconRegistry.addIconSync('mds', 'av', 'album')

const spriteString = iconRegistry.compileSprite()

fs.writeFileSync('./demo/assets/sprite.svg', spriteString)
