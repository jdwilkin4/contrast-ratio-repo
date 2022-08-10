# CONTRAST RATIO APP

## Description

The app evaluates the readability of page content by comparing the text color with the background color,this is done by calculating the contrast ratio and comparing the result to w3c provided standards.

## Technology Stack

- HTML
- CSS
- JavaScript

## How to contribute

1. Clone the project to your own machine.
   `git clone url`
2. Create a branch.
   `git checkout -b branch_name`
3. Stage changes.
   `git add file_name`
4. Commit changes to your own branch.
   `git commit -m "commit message"`
5. Push your branch back up to github.
   `git push -u origin branch_name`
6. Submit a Pull request so that we can review your changes.
   `click compare, leave a comment and click the create pull request button.`

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
