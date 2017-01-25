![Zenkom](assets/logo.png)

Zentrale Kommunikationsplattform der vernetzten Fahrzeugsysteme.

## Proof of Concept

Das Proof of Concept von Zenkom dient als Machbarkeitsstudie und soll Wegweisend bei der Auswahl des Entwicklungsframework sein.

## Packages

* babel-runtime
* meteor-node-stubs
* react
* react-dom

## Meteor folder structure

### folder structure

* Non package import sources are always `index.js` files.
* Every first-level subfolder contains an `index.js` file.
* Css files can be placed anywhere.
* Only a subfolder depth of three is allowed.

### Coding style

* Component file names are PascalCase.
* Folder and module names are lower case.
* Everything else must be according to the [Meteor code style guide]( https://guide.meteor.com/code-style.html).

### client

* `main.js` Imports all components and initializes the app.
* `main.html` Simply contains the render target for the react-dom mount and static header tags.
* `MainLayout.js` Is the main template of the app.
* `[Modules]` Self contained app module that represents an entity.
  * `[Entity].js` Single entity React component.
  * `[Entity]List.js` List React component.

### imports

* `collections`

### server

* `main.js` Imports all server modules.
