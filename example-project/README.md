# Example project

Project use as example to show how `hz-dynamic-stylesheets` works.

## Install dependencies

```
$ yarn
```

## Run 
```bash
$ yarn styleguide
```
 or
```bash
$ yarn pages
```
## Config

The `styleguide.config.json` should be in the project's root folder

### UI folder

`uiFolder` values specifies where the `hz-dynamic-stylesheets` module will look up for the components.

Example:
```
"uiFolder": "uiCatalog"
```
Its default values is `"ui"`