# Hanzo styleguide spec

## Project description

The Hanzo Styleguide is a web application able to read the `Hanzo CSS architecture`  and publish a website with the documentation and the example for each of the packages and components included there.

The goals are:

- Having an environment to develop the components isolated from the main app.
- Building a styleguide documentating how to instantiate each one of the components, its variations, states and rendering examples.


## Basic requirements

The Hanzo styleguide must:

- Publish an interface in the browser.
- Listen the changes in the ui folder and hot reload the interface.

Navigation has to:

- Show a first level menu with the first level folder names: `core`, `components`, `modules`.
- Show a secondary nav with the contents of those folders. Keep in mind `components` has a namespacing level which we can avoid if necessary.

The details page of a package/compontent needs to:

- Show the compiled content of the local `readme.me` file.
- Inject the `html` described in the `example.txt` file.

## Next steps

- Load an external css with the compiled `styles` of the components. Remember there will be other application compiling the css, so our Styleguide only has to be able to link it.
- Parametrize the app on a configuration file `.styleguide` to specify:
	- where is the `ui` folder.
	- where is the css to import
- Add Javascript support for components with Vanila/jQuery. In case of statics files, adding a Javascript file and being able to trigger the `document ready` event would work.
- Make the styleguide importable with `npm`.
- Add a design for the Styleguide. Talk to the design team for that.
- Add support for other types of JS components:
	- React
	- Ember



## Related info

Basic UI folder structure structure:

```
ui
├── components
|   └── nav #namespace folder - can be ignored in the navigation
|       └── menu
|           ├── example.txt
|           └── readme.md
├── core
|   └── breakpoints
|       ├── example.txt
|       └── readme.md
└── modules
    └── header
        ├── example.txt
        └── readme.md


```

Reference: [Hanzo CSS Style GUuide](https://repos.codehanzo.com/hanzo/coding-guidelines/blob/master/guide-css-architecture.md)
