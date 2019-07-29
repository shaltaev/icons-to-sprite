# Icon To Sprite

Extract icons to single sprite .svg file

## Getting Started

### Installing

Add to your nodeJS project

```sh
npm install -D icons-to-sprite
```

or

```sh
yarn add -D icons-to-sprite
```

### Usage

#### Generate sprite

```js
const its = require('icons-to-sprite')

// this is binding for material-design-icons
const itsPluginMaterial = require('its-plugin-material-design-icons')

const fs = require('fs')

const iconRegistry = new its.IconRegistry()

// mds is my abbreviation material-design-icons
iconRegistry.addPlugin('mds', {
    extractor: its.mockExtractor,
    extractorSync: itsPluginMaterial.extractorSync
})

iconRegistry.addIconSync('mds', 'action', 'alarm')
// -> symbol with id: mds__action__alarm

iconRegistry.addIconSync('mds', 'av', 'album')
// -> symbol with id: mds__av__album

const spriteString = iconRegistry.compileSprite()

fs.writeFileSync('./demo/assets/sprite.svg', spriteString)
```

#### Use sprite

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Document</title>
    </head>
    <body>
        <svg viewBox="0 0 24 24" style="height: 100px; width: 100px;">
            <use href="assets/sprite.svg#mds__av__album" fill="black" />
        </svg>
    </body>
</html>
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/shaltaev/icons-to-sprite/tags).

## Authors

-   **Shaltaev** - _Initial work_ - [Shaltaev](https://github.com/shaltaev)

See also the list of [contributors](https://github.com/shaltaev/icons-to-sprite/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
