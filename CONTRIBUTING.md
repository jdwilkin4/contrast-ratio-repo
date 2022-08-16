# Welcome to CONTRAST RATIO APP's contributing guide

:+1::tada: First off, thank you for investing your time in contributing to our project! :tada::+1:

In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing, and merging the PR.

Use the table of contents icon on the top left corner of this document to get to a specific section of this guide quickly.

## Code of Conduct

Please, read our [Code of Conduct](./CODE_OF_CONDUCT.md) to keep our community approachable and respectable.

## New contributor guide

To get an overview of the project, please read the [README](./README.md).

## Getting started

### Issues

#### Create a new issue

If you spot a problem with the docs, search if an issue already exists. If a related issue doesn't exist, you can open a [new issue](https://github.com/DBenMoshe/contrast-ratio-repo/issues/new).

#### Solve an issue

Scan through our [existing issues](https://github.com/DBenMoshe/contrast-ratio-repo/issues) to find one that interests you. You can narrow down the search using `labels` as filters. See [Labels](https://github.com/DBenMoshe/contrast-ratio-repo/labels) for more information. As a general rule, we don’t assign issues to anyone. If you find an issue to work on, you are welcome to open a PR with a fix.

### Make changes

If you are looking to make your first contribution, follow the steps below.

If you don't have git on your machine, [install it](https://help.github.com/articles/set-up-git/).

#### Fork this repository

Fork this repository by clicking on the fork button on the top of this page.
This will create a copy of this repository in your account.

- Using GitHub Desktop:
  - [Getting started with GitHub Desktop](https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/getting-started-with-github-desktop) will guide you through setting up Desktop.
  - Once Desktop is set up, you can use it to [fork the repo](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/cloning-and-forking-repositories-from-github-desktop)!

#### Clone the repository

Now clone the forked repository to your machine. Go to your GitHub account, open the forked repository, click on the code button and then click the copy to clipboard icon.

Open a terminal and run the following git command:

```
git clone url-you-just-copied
```

where `url-you-just-copied` is the url to this repository (your fork of this project).

#### Install or update to **Node.js v16**

Then read our [README](./README.md) on how to install dependencies.

#### Create a working branch and start with your changes!

Change to the contrast ratio repo directory on your computer (if you are not already there):

```
cd contrast-ratio-repo
```

Now create a branch and switch to that new branch using the `git checkout` command:

```
git checkout -b your-new-branch-name
```

### Commit and push your update

Commit the changes once you are happy with them.
If you go to the project directory and execute the command `git status`, you'll see there are changes.
Add those changes to the branch you just created using the `git add` command:

```
git add changed-file-name
```

Now commit those changes to your local branch using the `git commit` command:

```
git commit -m "commit message"
```

Push your local branch and create a remote branch on GitHub using the command `git push` :

```
git push -u origin branch-name
```

### Pull Request

When you're finished with the changes, create a pull request, also known as a PR.

- Please follow all instructions in the template so that we can review your PR.
- Don't forget to [link PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if you are solving one.
- Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the branch can be updated for a merge.
  Once you submit your PR, a team member will review your proposal. We may ask questions or request for additional information.
- We may ask for changes to be made before a PR can be merged, either using [suggested changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request) or pull request comments. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.
- As you update your PR and apply changes, mark each conversation as [resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).
- If you run into any merge issues, checkout this [git tutorial](https://github.com/skills/resolve-merge-conflicts) to help you resolve merge conflicts and other issues.

### Your PR is merged!

Congratulations :tada::tada: The CONTRAST RATIO APP team thanks you :sparkles:.

<!-- Once your PR is merged, your contributions will be publicly visible on the [CONTRAST RATIO APP](#). -->
