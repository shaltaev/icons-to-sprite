const its = require('../dist')

const err = its.compileSprite('./demo/assets/sprite.svg', {material: './demo/material.txt', fontAwesome: './demo/font_awesome.txt'})

if ( err !== undefined) {
    console.log(err);
    
}
