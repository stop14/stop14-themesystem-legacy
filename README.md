# Stop14 Theme System Legacy

#NOTE
This theme includes build files (final CSS, Javascript, and Image files) for portability. Any changes to the theme should be done through the source files, which requires node.js, npm, and Gulp be installed.
  

#REQUIREMENTS FOR THEME DEVELOPERS
* node.js 10+
* npm 6+
* gulp 4 (installed globally, though package is included)

#INSTALLATION FOR THEME DEVELOPERS
* Run npm install to load vendor packages

#USAGE FOR THEME DEVELOPERS
* gulp build:  Builds entire asset folder (sass, scripts, etc.)
* gulp watch:  Watches for changes in source directory and builds automatically
* gulp js: Builds scripts only
* gulp sass: Builds SASS files only

#COLOUR ROLES
What each palette colour is for, WCAG contrast functions, derived legible variants and the build-time check: see COLOUR-ROLES.md.
