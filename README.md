# Insight Studio

## Client Template

A Front-End / Full Stack Framework for the Insight Studio. Intended to be used with [Express API Template](http://10.25.34.113:4700/bberzellini/express-api-template) or another server-side API for data.

### Tooling
-   Webpack
-   Gulp
-   BroswerSync
-   Handlebars
-   Bootstrap
-   Navigo Routing
-   Font Awesome
-   HELIX CLI - Insight Studio specific

### Installation
1.  [Download](../../archive/master.zip) this template.
1.  Unzip and rename the template directory.
1.  Empty [`README.md`](README.md) and fill with your own content.
1.  Move into the new project and `git init`.
1.  Install NPM dependencies with `npm install`.
1.  Install HELIX CLI with `npm link`.
1.  You're all set!

### GULP COMMANDS
-   Open a terminal windown and run `npm run serve` - will launch a BroswerSync server on http://localhost:8080 with live updating from `public/`.
-   For Deployment / Production, run `npm run build` - will fire Webpack to bundle all Javascript and Styling into one bundled files in `dist/`.

### HELIX CLI
This framework has a built in CLI for you convience. It is intended to help you create new components, along with the necessary code changes to ensure the newly created component works. The commands in the CLI will give the starter code and from there, you customize as needed. 

*NOTE*  DO NOT use this CLI should you plan adjust any of the file structure!

#### HELIX COMMANDS
-   Test to ensure you have successfully added set up Helix by typing `helix` in terminal. You should see:

```sh

                                        WELCOME TO HELIX!

                    INSIGHT STUDIO COMMAND LINE INTERFACE FOR CLIENT TEMPLATES.

                                             ENJOY!
```

-   `helix help` will provide a list of the tasks, commands and how to use them
-   `helix generate [NAME]` or `helix g [NAME]` will generate a Component's directory, necessary files and add a route for the component for quick and efficient building. `[NAME]` is what you want to call the component. I.E. `helix generate products` will generate a products component and necessary files
-   `helix destroy [NAME]` or `helix d [NAME]` will destroy an already make component. *BE CAREFUL* ANY files or code in the components folder will be destroyed! `[NAME]` will look for the component. If non-existant or spelled incorrectly, it will not execute. 

### FILE STRUCTURE

The framework utilizes a component based approached. All of the components can be found in `app/`.

All files that consist of `app.<%something%>.ext` are part of the application component. Consider this to be the global level of the application. This includes any navigation or application wide functionality. Sub-directories in `app/` are components (could also be thought of as views).

#### ROUTES
`app/routes.js` handles the routes which the application will recognize.

#### STYLES
`assets/styles/**` are the applications styles. `index.scss` acts as the manifest for all the styling of the application. `components.scss` acts as the manifest for the components.

#### IMAGES
`assets/images/**` is the folder where all images will be placed. To add an image to ANY `html` or `hbs` file, the path will be as follows:

```html
<img src="assets/images/example.jpg" rel="Example Image"/>
```

This is due to the fact of where all the components `.hbs` files are being rendering from - `index.html`. Therefore, the path to the asset must start at the root.

#### BROWSERSYNC
Browsersync is the web server that handles the compiling and rendering of the application. `npm run serve` will run watch functions on ALL `.js` `.hbs` `.scss` files and if a change is made to a file, it will recompile and refresh the browser

#### PUBLIC
`public/` is the location of the development javascript and styling files. This will automatically be updated with the most recent saved code changes when the application is running through `npm run serve` or `gulp serve`.

#### PRODUCTION (DIST/)
When the time comes to deploy the application onto a client server, `npm run launch` will handle all minification, compiling, image optimzation, move all necessary assets into a `dist/` directory, and launch the node server. BEFORE DOING THIS, you must change the `selectedProxy` in `proxy/config.js` to the server which you will be placing the code.

