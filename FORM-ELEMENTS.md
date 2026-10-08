# Form elements and buttons (ui_element_base_v002, 3.0.0)

## Principle

Elements get resets, classes and containers get design. The bare `<button>` receives `%button-base` only (appearance
reset, pointer cursor). Text inputs receive `%input-text` (one height, radius, border and background: the sizing
baseline). `<select>` receives the indicator icon and no width. `fieldset` receives `$ui_fieldset_border`. Nothing
is applied to `[type=submit]`, `[type=reset]` or `[type=search]`: a form stylesheet applies the variant it wants to
its own buttons, by class or by container, so third-party markup keeps its own look and no escape hatches
(`all: unset` on `.icon`, `.trigger`, `.MuiButtonBase-root`) are needed.

## Button layers

| Placeholder | Holds | Apply to |
|---|---|---|
| `%button-base` | appearance reset, cursor | bare elements |
| `%button-sized` | `$btn_height`, `$btn_minwidth`, `width: fit-content`, `white-space: nowrap` | with `%button-styled` |
| `%button-styled` | flex centring, uppercase, font, padding, border, radius, colours, hover | with `%button-sized` |
| `%button` | all three | the class vocabulary and the variants |

Variants (`%button-standard`, `-link`, `-outline`, `-reverse`, `-feature-cta`, `-submit`, `-reset`, `-cta`,
`-search`, `-search-clear`, `-ghost`, `-text`, `-more`, `-compact`, `-large`) are unchanged in what they draw.
`%button-ghost`, `%button-text` and `%button-search` carry their own uppercase/nowrap/fit-content, since those left
`%button-base`.

## Class vocabulary

`$ui_button_classes` (default `".button, .btn"`) names the selector(s) that get `%button` and the modifier classes
`.compact .large .standard .link .outline .cta .feature-cta .more .submit .reset .ghost .search`. Omeka themes set it to
`".agile-button, .btn"`: Omeka core uses `.button` on its own icon buttons, so `.button` is not a safe opt-in there.
`button.search-submit` keeps `%button-search` for the Omeka search box.

## Selects

`$ui_select_width`, `$ui_select_min_width`, `$ui_select_max_width` are tokens for the form that owns the select; the
library no longer sets a global minimum width (Select2 and Chosen size themselves from the element).

## Migrating a theme from 2.x

1. Set `ui_button_classes` in `_00_main_configuration.yml` (drop `btn_min_width`, which nothing read).
2. Where a form relied on `button[type=submit]` / `[type=reset]` looking like a button, give the button the class
   vocabulary (`agile-button submit`) or extend `%button-submit` / `%button-reset` from the form's own selector.
3. Where a select relied on the global minimum width, set it in the form's stylesheet with the `$ui_select_*` tokens.
