Contributions are accepted. Please check the [README](README.md) for general statements about the touchy-feely aspects, as this file is meant for more technical answers.

# General

Primary branch is **master**.

Indentation for all code files is **tabs** (fight me) and there is an `.editorconfig` file to support this.

The public site is hosted out of `/docs` and consists of an `index.html` plus other supporting files. It can be viewed online at https://tasairis.github.io/compat/. It can (must be) also functional when running locally, both through a web server (not included) as well as a `file:///` URI.

Supporting files must be all "Web 1.0" static files, suitable for being hosted by GitHub Pages; this means Javascript and CSS and not Typescript or LESS/SCSS. Given the nature of this repository and its website, anything requiring a post-commit build process is considered to be over-engineering.

# Javascript

It's very easy to write poor-quality Javascript. Please prioritize readable and maintainable over compact and terse. Quality code commenting will be encouraged.

Simple libraries for DOM manipulation, or templating, or data tables, or something along those lines are fine to include. They should be hosted on a remote CDN and not bundled into this repository.

Big frameworks like Angular and Vue and React are too much. Sorry. That qualifies as "over-engineering".

# About compat-data

The site is designed to load its data from the remote "compat-data" source, which is deliberately written to use [JSONP](https://en.wikipedia.org/wiki/JSONP). The data it provides is "documented" in [compat-data.ts](compat-data.ts).

Changes to the data can be requested (here - PRs to its repository will not be accepted) but will be highly scrutinized. All of the potentially useful data should already be available; if there's something missing then you can certainly request it, and I won't be offended if you do, however understand that I've probably already considered it and decided against for one reason or another.
