![Zenkom](assets/logo.png)

Zentrale Kommunikationsplattform der vernetzten Fahrzeugsysteme.

## Proof of Concept

Das Proof of Concept von Zenkom dient als Machbarkeitsstudie und soll Wegweisend bei der Auswahl des Entwicklungsframework sein.

Ziel: Material UI Applikation mit Login und Post verwaltung. Auf dem Client sollte Redux verwendet werden.

* Test ldap auth
* Create fully functional posts management

http://notjoshmiller.com/using-ldaps-in-meteor/

## Meteor project structure

### folder structure

* Non package import sources are always `index.js` files.
* Every first-level subfolder contains an `index.js` file.
* Css files can be placed anywhere.
* Only a subfolder depth of three is allowed.

### Coding style and naming

* Component file names are PascalCase.
* Folder and module names are lower case.
* Publications and methods named plural.

`PostList` -> `posts.list`
`Post` -> `posts.item`

Everything else must be according to the [Meteor code style guide]( https://guide.meteor.com/code-style.html).

### client

* `main.js` Client startup.
* `main.html` Contains the render target for the react-dom mount and static header tags.
* `MainLayout.js` Is the main template of the app.
* `[Modules]` Self contained app module that represents an entity.

Components in modules:

* `[Entity].js` Single entity React component.
* `[Entity]List.js` List React component.

### imports

* `collections` Mongo collections and schemas.
* `helpers` Helper functions for client and server.

### server

* `main.js` Server startup.
* `seeds.js` Contains database seed datasets.
* `accounts.js` User account configurations.
* `publications` Meteor publications.
* `methods` Meteor methods.
