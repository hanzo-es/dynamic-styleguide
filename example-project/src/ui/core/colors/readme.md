# Colors
Defines the color set for the application.

# Usage
In your SCSS files call function `color('color-bay')`

**To add new names get a custom color name from here http://www.htmlcsscolor.com/**

When you define a new color on `_vars.scss` it's mandatory to define the color in this set format.
`$my-color:  ( dark: #9B9B9B, base: #2d2d2d, soft: #616161, light: #3d3d3d );`

**Setting at least the color base property**
The other items in list: dark, soft & light definitions are optional


Later you can use your color: 
```
  .myColoredComponent {
    color : color('color-my-color'); // base set variation
    background-color : color('color-my-color', 'dark') // defined variation
  }
```

Alternately you can get a color variation by passing the color index on the set.
```
  .myColoredComponent {
    color : offsetVariation('color-my-color'); // base set variation
    background-color : offsetVariation('color-my-color', 3) // defined variation 'light'
  }
```