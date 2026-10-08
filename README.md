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

#CHANGELOG

- 3.0.0 (2026-10-19) — the colour-roles build report also prints the button pair (on-impact on visual-impact)
  with the white and black alternatives, so the measured grade is visible at build time, not only the guarantee.
- 3.0.0 — Colour roles (COLOUR-ROLES.md). Form elements: bare elements get resets only; `%button` split into
  `%button-base` / `%button-sized` / `%button-styled`; the button class vocabulary is configurable
  (`$ui_button_classes`); no global `<select>` width; `$ui_fieldset_border`; the `all: unset` escape hatch and the
  duplicated legacy UI configuration blocks removed (FORM-ELEMENTS.md).
