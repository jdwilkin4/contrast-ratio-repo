# CONTRAST RATIO APP

## Prerequisites

Install Node.js in order to have access to npm.

[Click here to get info about downloading and installing Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Description

The app evaluates the readability of page content by comparing the text color with the background color,this is done by calculating the contrast ratio and comparing the result to w3c provided standards.

## Technology Stack

- HTML
- CSS
- JavaScript

## How to contribute

1.  Fork the repo ([How to fork a repo instructions](https://docs.github.com/en/get-started/quickstart/fork-a-repo))
2.  Clone the repo to your local machine. `git clone https://github.com/GITHUB-USERNAME-GOES-HERE/contrast-ratio-repo.git`
3.  Change directories to the contrast ratio repo `cd contrast-ratio-repo`
4.  Create a branch and switch to that new branch. `git checkout -b new-branch-name`
5.  Make some changes to the project
6.  Stage changes. `git add .`
7.  Commit changes to your local branch. `git commit -m "commit message"`
8.  Push up your local branch and create a remote branch on GitHub `git push -u origin branch_name`
9.  Submit a Pull request so that we can review your changes. click compare, leave a comment and click the create pull request button.

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
