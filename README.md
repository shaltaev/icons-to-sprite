# Icon To Sprite

Extract icons to single sprite .svg file

CURRENT STATUS :: ReWriting with TDD
WarkAble version on npmjs

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

#### Prepare Sprite

For now only material-design-icons & font-awesome-free is available for shrink

This is example of ./scripts/sprite/material.txt
material_group >>> material_icon_name

```
navigation >>> more_vert
action >>> assignment
action >>> account_circle
action >>> alarm
action >>> book
action >>> code
```

This is example of ./scripts/sprite/font_awesome.txt
fa_group >>> fa_icon_name

```
brands >>> 500px
regular >>> angry
solid >>> ad
```

```js
// ./scripts/prepare-sprite.js
var iconsTS = require('icons-to-sprite')
iconsTS.compileSprite('./src/sprite.svg', {
    material: './scripts/sprite/material.txt',
    fontAwesome: './scripts/sprite/font_awesome.txt'
})
```

```sh
node ./scripts/prepare-sprite.js
```

#### Into your App

Please replace sprite.svg (below) to right way (from ./scripts/prepare-sprite.js) in your project

```html
<!DOCTYPE html>
<html>
    <body>
        <svg
            viewBox="0 0 24 24"
            style="display: inline-block; height: 100px; width: 100px;"
        >
            <use xlink:href="sprite.svg#material_alarm" fill="black" />
        </svg>
        <svg
            viewBox="0 0 24 24"
            style="display: inline-block; height: 100px; width: 100px;"
        >
            <use xlink:href="sprite.svg#fa_500px" fill="black" />
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
