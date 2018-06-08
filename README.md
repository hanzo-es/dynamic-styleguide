# dynamic-styleguide

This projects is used to define and use a set of components and web elements as style guide, serving them with an use explanation, they implementation alternatives and a live editor.
Also provides an alternative use to serve static pages.

## Prerequisites

* install nvm
* install node (>=8.9.0)
* install yarn

## Use the dynamic style guide in your project
### Add it as a development dependency

First, add this project as a npm development dependency in your `package.json` file:

```json
  "devDependencies": {
    "dynamic-styleguide": "^0.1.1"
  }
```

In the same file, but in the scripts node, add `"styleguide": "dynamic-styleguide"`:
```json
  "scripts": {
    "styleguide": "dynamic-styleguide"
  },
  ```
### Configuration 

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

  "pages": {
    "pagesFolder": "pages",
    "distPagesFolder": "demo-dist/pages",
    "pagesDeployPort": 3001,
    "elementsUrlDirectory": "view"
  },

  "contents": {
    "pageTitle": "Hanzo Style Guide",
    "logo": {
      "content": "",
      "href": "/"
    },
    "sideMenuLinks": []
  }
}


```
 - `parent` references another config file from which the current one will 'extends'.
 - `uiFolder` defines the folder where the components to display are placed. 
 - `pagesFolder` defines the folder where the pages to read their comments from are.
 - `distFolder`, where your compiled/transposed files need to be rendered from.
 - `bundled` defines the routes to the specific files that will be loaded.
 - `distPagesFolder` is where the pages to be rendered are. They must have the same name and structure that the defined inside `pagesFolder`.
 - `deployPort` defines which port will be used, by default it is `3000`.
 - `pagesDeployPort` defines which port will be used to serve the static pages, by default it is `3001`.
 - `logo` defines the logo content and where links to.
 - `pageTitle` is the string to be shown as title in the browser.
 - `sideMenuLinks` This array will render links in the side menu instead of the top one. By default it is empty. The objects inside the array must have defined two nodes: `href` (string) and `content (string or HTML).
 - `elementsUrlDirectory` is the the first part of the URL path under which the elements pages will be rendered. The default value is `view` and can not be empty.

### Expected UI folder structure

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

### Elements style alternatives

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

### Arguments

By default, the app try to load the `styleguide.config.json` file, but a custom file name could be passed as argument:

```
$ yarn styleguide --configFile my.config.json
```
The custom config file must the placed in the root folder of the project

This the list of the allowed arguments
- configFile
- pages (take a look at [Use as a pages server in your project](#use-as-a-pages-server-in-your-project))

### Running it

To run the project you need the assets to be present in `distFolder` (that depends on your project dev/builds strategy), then just run
```bash
$ yarn styleguide
```

The app will be deployed by default to [`http://localhost:3000`](http://localhost:3000)

## Use as a pages server in your project

Reads the comments inside the pages (from `pagesFolder` folder) before they are compiled and display a cover page to select a compiled one (from `distPagesFolder`)

### Add it as a development dependency

If you did not before, add this project as a npm development dependency in your `package.json` file (be careful and try to use the latest available version):

```json
  "devDependencies": {
    "dynamic-styleguide": "^0.1.2"
  }
```
Or using yarn
```bash
$ yarn add -D dynamic-styleguide
```

In the same file, but in the scripts node, add `"styleguide": "dynamic-styleguide  --pages"`:
```json
  "scripts": {
    "pages": "dynamic-styleguide --pages"
  },
  ```
The argument `--pages` is what make it works as a pages server instead of the dynamic style guide.

### Pages configuration 
 Take a look at the [Dynamic style guide configuration](#configuration). The entries that mather here are the `pagesFolder`, `pagesDeployPort` and `distPagesFolder`.

### Expected pages folder structure

Both, `distFolder` and `distPagesFolder` should have the same folders and file name structure. The former folder's file are expected to have defines some metadata as comments, e.g:
```
---
  "title": "Main page",
  "template": "default"
---
```
This comments will be used to generate the cover page to chose what page/file to display.
`index.html` filename must not be used, as this will be the cover page file name.
Example of expected file structure for `distPagesFolder`:
```
pages
├── main.html
├── some-category
|   └── other.html
├── ...
```

### Running it

```bash
$ yarn pages
```
 **NOTE:** 
If we have defined inside our `package.json` file this: 
```json
  "scripts": {
    "styleguide": "dynamic-styleguide"
  },
  ```
Pages server also can be started running

```bash
$ yarn styleguide --pages
```

## Develop installation

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

### Run the project for develop
 To launch the project to work on it just launch the start script
 ```
 $ yarn dev
 ```
 or
 ```
 $ yarn dev --pages
 ```
 
 The `example-project` folder will be used to load the different example elements.

 This will launch the server on the default location, [`http://localhost:3000`](http://localhost:3000) or  [`http://localhost:3001`](http://localhost:3001). (See the [Configuration](#configuration) section to change the port).