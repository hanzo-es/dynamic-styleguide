# dynamic-styleguide

This projects is used to define and use a set of components and web elements as style guide, serving them with an use explanation, they implementation alternatives and a live editor. It also provides a use to serve static pages.

## Prerequisites

* install nvm
* install node (>=8.9.0)
* install yarn

## Add it as a development dependency

First, add this project as a npm development dependency in your `package.json` file:

```json
  "devDependencies": {
    "dynamic-styleguide": "^1.2.1"
  }
```

In the same file, but in the scripts node, add `"styleguide": "dynamic-styleguide"`:
```json
  "scripts": {
    "styleguide": "dynamic-styleguide"
  },
  ```
## Configuration 

 To use this tool under your own project, you should create a `styleguide.config.json` file in your project root folder. This file should look like this: 
 ```json
{
  "parent": "base.config.json",
  "uiFolder": "ui",
  "distFolder": "demo-dist",
  "deployPort": 3000,
  "bundled": {
    "css" : [
      "assets/styles.css"
    ],
    "js" : [
      "assets/app.js"
    ]
  },
  "elementsUrlDirectory": "view",
  "projectType": "HTML",

  "pages": {
    "pagesFolder": "pages",
    "pagesUrlNamespace": "pages"
  },

  "contents": {
    "pageTitle": "Hanzo Style Guide",
    "logo": {
      "content": "",
      "href": "/"
    },
    "sideMenuLinks": []
  },
  "extraHandlers": [
    {
      "folder": "core/colors",
      "loaderName": "color-grid.loader",
      "config": {
        "variationsFileName": "_functions.scss",
        "variationsVarName": "color-grades",
        "colorsFileName": "_vars.scss"
      }
    },
    {
      "folder": "core/typography",
      "loaderName": "typeset-list.loader",
      "config": {
        "typesetVarName": "font-typeset"
      }
    }
  ]

}

```
 - `parent` references another config file from which the current one will 'extends'.
 - `uiFolder` defines the folder where the components to display are placed. 
 - `distFolder`, where your compiled/transposed files need to be rendered from.
 - `deployPort` defines which port will be used, by default it is `3000`.
 - `bundled` defines the routes to the specific files that will be loaded.
 - `elementsUrlDirectory` is the the first part of the URL path under which the elements pages will be rendered. The default value is `view` and can not be empty.
 - `projectType`: Defines how the content will be handled. By default, just plain `HTML` content. The values are unsensitive case
    Allowed project types:
    - hugo
    - html
 
 **pages**
- `pagesFolder` defines the folder where the pages to read their comments are.
- `pagesUrlNamespace` is the the first part of the URL path under which the pages pages will be rendered. The default value is `pages` and can not be empty.

 **contents**
 - `pageTitle` is the string to be shown as title in the browser.
 - `logo` defines the logo content and where links to.
 - `sideMenuLinks` This array will render links in the side menu instead of the top one. By default it is empty. The objects inside the array must have defined two nodes: `href` (string) and `content (string or HTML).

**extraHandlers**
`extraHandlers` is an array with objects that must have the following structure:
 - `folder` defines witch folder will be handled
 - `loaderName` is the loader file name that will be use
 - `config` is the extra data that will be passed to the loader
Take a look at the `default.config.json` file to check what are the handlers implemented by default. For more info go to [Extra handlers](#extra-handlers)

## Expected UI folder structure

UI library architecture and background information will be part of another repository.

```
ui
├── components
|   └── nav #namespace folder --> can be ignored in the navigation
|       └── menu
|           ├── example.txt
|           ├── readme.md
|           └── styles.scss
├── core
|   ├── readme.md --> Optional too
|   └── breakpoints
|       ├── example.txt
|       └── readme.md
└── modules
    └── header
        ├── example.txt
        └── readme.md

```

`example.txt` and `styles.scss` files are optional and should include valid content.

In the `ui` folder and in every first lever folder (namespace) can be defined a `readme.md`.

`components`, `core` and `modules` are part or the web elements that can be use in the app and are shown in this style guide. 

## Elements style alternatives

In the elements folders can exist a `style.scss` file with some styles to be applied to that element. The host project is the responsible for compile it. This project will just read it from the build destination folder (See the [Configuration](#configuration) section).

Inside the `styles.scss` file can be defined a comment block that would specify the render variants for the element. We use [SassDoc](http://sassdoc.com/) to define the structure of the comment block and extended this documentation system to support custom annotations.

These annotations will allow us pick, from the element description page, between different render alternatives.

These are the supporter annotations:

- `@variants`

  This annotation allow us to add classes to our element, and there are two type of them: the `disjunction` and the `exclusive` ones. 
  
  The former are the used by default and render a block of checkboxes to pick variants from. Several variants can be picked at the same time.
  
  The latter will render radio inputs, so one variant at a time can be picked.

  The type is defined by the string following the annotation itself. After this comes title, using a `-` as separator. Then, in a new line, comes the entries: every new line will be considered a new entry, the value and description will be separated by the first `:` occurrence. Title and type are optionals. There can not be a title without a type.

  Example:
  ```
  /// @variants disjunction - Text ype variants
  /// c-hello--underline: Underline the text
  /// c-hello--italic: Make the text italic
  ///
  /// @variants
  /// c-hello--big: Make the text bigger
  ///
  /// @variants exclusive - Background color
  /// c-hello--green: Change the background to green
  /// c-hello--orange: Change the background to orange
  ///
  /// @variants exclusive
  /// c-hello--white-text: Change the color text to to white
  /// c-hello--firebrick-text: Change the color text to to firebrick
  ```
To define where to apply this classes, in own `example.txt` we have to add `{{variant}}`.
```
<div class="c-hello {{variant}}">
  <h2>This is a foo-component</h2>
</div>
```

## Expected pages folder structure

To allow compatibility with any kind of static site generator, pages section reads a `sitemap.xml` to build the pages list.

We updated `dist` property on config object so we can have separated folder for assets and pages. Pages and assets now are objects with `relPath` and `slug` properties. This will make sure that the styleguide and the project itself serve static content properly.

## Arguments

By default, the app try to load the `styleguide.config.json` file, but a custom file name could be passed as argument:

```
$ yarn styleguide --configFile my.config.json
```
The custom config file must the placed in the root folder of the project

This the list of the allowed arguments
- configFile

## Extra handlers

As some elements need to render extra information, extra handlers can be defined in the *config file*,as an object in `extraHandlers` array. Every one of these objects must have defined a `folder`, and every element path that match that folder, will be handled with the defined loader (`loaderName`).
`folder` is the relative path of the element starting from the *ui folder*.

The data that the loader(s) return will be passed to the element template.
The element's folders that have defined extra handler are:
- `core/colors`
- `core/typography`
- `core/icons`

### Available handlers

#### Color Grid

Used to render a grid with the different variables colors. These are obtained parsing some SCSS files. This is the config that must be defined in the handler:
```
  {
    "folder": "core/colors",
    "loaderName": "color-grid.loader",
    "config": {
      "variationsFileName": "_functions.scss",
      "variationsVarName": "color-grades",
      "colorsFileName": "_vars.scss"
    }
  },
```
- `variationsFileName` is the file in which is defined `variationsVarName` that have assigned the allowed colors grades. That variable must be in the root of the file.
E.g.:
```
$color-grades: dark, base, soft, light;
```

- `colorsFileName` is the file in which are defined all the colors and their variations that will me rendered in the element page. Every variable will be considered a color.
E.g.:
```
$blue : ( dark: #20438D, base: #315AAF, light: #729AEC );
```

#### Typeset

Used to render all the typographies variants defined in a SCSS file. These is the expected config definition:
```
  {
    "folder": "core/typography",
    "loaderName": "typeset-list.loader",
    "config": {
      "typesetVarName": "font-typeset"
    }
  }
```
- `typesetVarName` the variable that have the font alternatives.

A `styles.scss` file in the defined `folder` path is mandatory to be loaded and get from there the `typesetVarName` values.

**E.g.**:
```
$font-typeset: (
  cs-book-xxl: (
    xs: (
      font-family: font(circular),
      font-size: 35px,
      line-height: 48px,
      font-weight: weight(regular)
    ),
    sm: (
      font-size: 12px,
      line-height: 13px
    )
    ...
  ),
  ...
```

#### Icons table
Used to render a table with all the svg icon files from the `assets` folder. These icons are clickable, which will update the editor and the rendered example, applying the selected variants too.
```
  {
    "folder": "core/icons",
    "loaderName": "icons-table.loader",
    "config": {
      "containerTemplate": "<span class=\"cr-icon {{variant}}\">{{content}}</span>"
    }
  }
```
 - `containerTemplate`: Is the HTML template into which the SVG code will be injected, replacing the `{{content}}` key. Also `{{variant}}` need to be defined in order to apply the icon's variants.
## Running it

To run the project you need the assets to be present in `distFolder` (that depends on your project dev/builds strategy), then just run
```bash
$ yarn styleguide
```

The app will be deployed by default to [`http://localhost:3000`](http://localhost:3000)


## Add it as a development dependency

If you did not before, add this project as a npm development dependency in your `package.json` file (be careful and try to use the latest available version):

```json
  "devDependencies": {
    "dynamic-styleguide": "^1.2.1"
  }
```
Or using yarn
```bash
$ yarn add -D dynamic-styleguide
```

#  Develop installation

If you want to modify this project, you should run it in development mode:

 * Clone the project from
 [git@github.com:hanzo-es/dynamic-styleguide.git](git@github.com:hanzo-es/dynamic-styleguide.git)

 * Install nvm and required node version:
  
    Install [nvm](https://github.com/creationix/nvm#installation) and them

 ```
 $ nvm install && nvm use
 ```

 * install the dependencies
 ```
 $ yarn install
 ```

## Run the project for develop
 To launch the project to work on it just launch the start script
 ```
 $ yarn dev
 ```
 
 The `example-project` folder will be used to load the different example elements.

 This will launch the server on the default location, [`http://localhost:3000`](http://localhost:3000) or  [`http://localhost:3001`](http://localhost:3001). (See the [Configuration](#configuration) section to change the port).