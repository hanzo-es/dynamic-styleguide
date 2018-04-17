# dynamic-styleguide

## Prerequisites

* install node (>=6.11.5)
* install yarn

## Use it in your project
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
  "uiFolder": "src/ui",
  "distFolder": "dist/theme",
  "bundled": {
    "css" : [
      "assets/styles.css"
    ],
    "js" : [
      "assets/app.js"
    ]
  },
  "deployPort": 3001
}
```
 - `uiFolder` defines the folder where the components to display are placed. 
 - `distFolder`, where your compiled/transposed files need to be rendered from
 - `bundled` defines the routes to the specific files that will be loaded
 - `deployPort` defines which port will be used, by default it is `3000` 

### Expected UI folder structure

UI library architecture and background information will be part of another repository.

```
ui
├── components
|   └── nav #namespace folder --> can be ignored in the navigation
|       ├── readme.md --> Optional too
|       └── menu
|           ├── example.txt
|           └── readme.md
|           └── styles.scss
├── core
|   └── breakpoints
|       ├── example.txt
|       └── readme.md
└── modules
    └── header
        ├── example.txt
        └── readme.md
```

`example.txt` files are optional and should include valid HTML content.

### Running it

To run the project you need the assets to be present in `distFolder` (that depends on your project dev/buils strategy), then just run
```bash
$ yarn styleguide
```

The app will be deployed by default to [`http://localhost:3000`](http://localhost:3000)


## Develop installation

If you want to modify this project, you should run it in development mode:

 * Clone the project from
 [git@github.com:hanzo-es/dynamic-styleguide.git](git@github.com:hanzo-es/dynamic-styleguide.git)

 * install the dependencies
 `$ yarn install`

### Run the project for develop
 To launch the project to work on it just launch the start script
 `$ yarn dev`
 
 The `example-project` folder will be used to load the components

 This will launch the server on the default location, [`http://localhost:3000`](http://localhost:3000)