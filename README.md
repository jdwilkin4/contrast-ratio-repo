# Contrast Ratio

## How to install the dependencies

In order to use the Prettier and browser-sync packages, you will need to install the package dependencies.

Make sure you are in the project directory `contrast-ratio-repo`.
Then run `npm install` which will install the package dependencies.
This will add a `node_modules` folder to the root directory.
The `node_modules` folder has already been added to the `.gitignore` file because it should never be committed or included in the production build of the site.

## Prettier pre-commit hook

Whenever you push changes to GitHub, the Prettier pre-commit hook will automatically format all of your staged files. This ensures that the whole team has clean and consistent formatting throughout the entire project.

## Script commands

### browser-sync

The `npm start` command will start the local server at port 3000 and automatically open a new browser window. Whenever you make changes, it will hot reload the page.

To stop the local server, use the `Ctrl+C` command.

### Prettier formatting script

The `npm run format` command will format all of the files for the project.
