![Zenkom](assets/logo.png)

Zentrale Kommunikationsplattform der vernetzten Fahrzeugsysteme.

issues: https://gitlab.com/janikvonrotz/Zenkom/issues

# Resources

http://codepen.io/zavoloklom/pen/IGkDz

## Meteor project structure

There are several basic distinctions when building the Meteor project structure. First there is a client, server and imports folder. All folders have specific naming rules and differ in their structure.

Global restrictions:

* Non package import sources are always `index.js` files.
* Every first-level subfolder contains an `index.js` file.
* Only a subfolder depth of three is allowed.
* Everything else which is not defined in this guide must be according to the [Meteor code style guide]( https://guide.meteor.com/code-style.html).

Modularity is key when designing a structure. A module is a namespace reserved for an component of the whole application.

### client

Client restrictions:

* Component file names are PascalCase.
* Folder and module names are lower case.
* Css files can be placed anywhere.

Folders and files:

* `actions/` Redux methods to dispatch actions.
  * `core.js` App action.
  * `[modules].js` Module actions.
* `core/` App react components.
* `main.js` Client startup.
* `main.html` Contains the render target for the react-dom mount and static header tags.
* `MainLayout.js` Is the main template of the app.
* `[modules]/` Module react components.
* `reducers/` Redux state reducers.
  * `[filename].js` Filename is equal the state name.
* `users/` User react components.

React component naming:

* `[Entity].js` Single entity react component.
* `[Entity]List.js` React list view component.
* `[Entity]Search.js` React search form component.
* `[Entity][Suffix]Container.js` React component container.

### imports

* `collections/` Mongo collections.
  * `[Modules.js]` Collection definitions.
* `schemas/` Schemas.
  * `[Module.js]` Schema definitions.
* `helpers/` Helper functions for client and server.

### server

Server restrictions:

* Folder and module names are lower case.

* `methods/` Meteor methods.
  * `[modules].js` Module Meteor methods.
* `methods/` Meteor publications.
  * `[modules].js` Module Meteor publications.
* `main.js` Server startup.
* `seeds.js` Contains database seed datasets.
* `accounts.js` User account configurations.

Publications and methods naming:

Component -> Publication  
`PostList` -> `posts.list`  
`Post` -> `posts.item`  

Action -> Method  
`Update post` -> `posts.update`  
`Remove post` -> `posts.remove`
