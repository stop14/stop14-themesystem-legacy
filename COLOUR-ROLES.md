# Colour roles

What each colour in a palette is for, how the library checks it, and how a theme gets a legible variant of a
colour that does not read on a surface. Added with the Agile generic release (2026-10); the functions live in
`10_colours_and_patterns/00_core/11_functions/_contrast.sass`, the defaults in
`10_colours_and_patterns/00_core/_01_configuration_colour_and_patterns.sass`, the build-time check in the
`colour_roles` component.

## The model

**The continuum.** The canvas and the surfaces form four steps:

    $black  |  $surface-dark  |  $surface-light  |  $white

`$white` is the page and `$black` its inverse: the blackpoint, a design value chosen to suit the palette, true black
only when that is what the designer wants. Contrast is measured from these two and the derivations lean on them,
so a legible result always exists. `$surface-dark` and `$surface-light` are a small step in from each end: panels,
bands and blocks that stand out from the page without having to contrast with it, a common design situation. A
designer may set a surface equal to its end.

**Text colours belong to a side**, not to one step:

| Role | Meaning | Default |
|---|---|---|
| `$on-light` | text and icons on the light side: `$white` and `$surface-light` | `$black` |
| `$on-dark` | text and icons on the dark side: `$black` and `$surface-dark` | `$white` |

Each must read on both steps of its side; `$black` must read on both light steps and `$white` on both dark steps.
Those eight pairs are the guaranteed ones.

Neutrals (`neutral(N)`) mix `$black` and `$white`, so a palette-aware blackpoint gives palette-aware greys. A tint or
shade of a surface colour is `mix()` with that colour.

**Impact.** `$visual-impact` (buttons, calls to action; default slot 5) with `$on-impact`, its text colour, picked
by `on-colour()`: the side's text colour when it reads, else the other side's, else black or white.

**Brand colours.** `$brand-primary` (slot 1, the default accent) and `$brand-secondary` (slot 2) are whatever the
brand mandates. They are never enforced: the build reports how each reads on each surface, as permitted uses.

**Contrast classes.** A component binds a colour to a property for one of three uses: *text* (4.5:1), *large text
and UI parts* (3:1), or *accent* (decoration that carries nothing; no requirement). Text-class bindings never use a
raw brand slot; they use a derived role:

| Role | Value |
|---|---|
| `$brand-primary-on-light` | `ensure-contrast($brand-primary, $surface-light)` |
| `$brand-primary-on-dark` | `ensure-contrast($brand-primary, $surface-dark)` |
| `$brand-secondary-on-light` / `-on-dark` | likewise |

`ensure-contrast()` returns the colour itself when it reaches the ratio on the surface, otherwise the colour mixed
step by step toward the opposite fixed point until it does. The raw slot stays available for accents.

## Configuration

The roles are ordinary configuration variables. The core configuration file holds the fallbacks; a theme's
`_00_main_configuration.yml` restates them for its palette, including the derived ones, so they are computed from
that palette and not from the fallbacks (the same convention as the neutral aliases):

```yaml
surface_dark: $clr3
surface_light: $clr4
on_dark: $white
on_light: $black
visual_impact: $clr5
brand_primary: $clr1
brand_secondary: $clr2
on_impact: on-colour($visual_impact)
brand_primary_on_light: ensure-contrast($brand_primary, $surface_light)
brand_primary_on_dark: ensure-contrast($brand_primary, $surface_dark)
brand_secondary_on_light: ensure-contrast($brand_secondary, $surface_light)
brand_secondary_on_dark: ensure-contrast($brand_secondary, $surface_dark)
```

The scaffolding configurations carry these lines, with the palette slots arranged to fit: 1 and 2 brand, 3 dark
surface, 4 light surface, 5 impact, 6 onward accents.

## Functions

| | |
|---|---|
| `luminance($c)` | relative luminance, 0 to 1 |
| `contrast($a, $b)` | WCAG 2 contrast ratio, 1 to 21 |
| `contrast-grade($ratio)` | `'aaa'`, `'aa'`, `'aa-large'` or `'fail'` |
| `passes-contrast($fg, $bg, $ratio: 4.5)` | boolean |
| `ensure-contrast($c, $surface, $ratio: 4.5, $toward: null)` | `$c`, or a variant that reaches the ratio |
| `on-colour($surface, $light: $on-dark, $dark: $on-light, $ratio: 4.5)` | a text colour for the surface, guaranteed |
| `colour-map(N)` | shade / primary / tint / fade / watermark of slot N, from the configured palette |
| `contrast-label($a, $b)` | `"4.33:1 (aa-large)"`, for messages |

## The build-time check

The `colour_roles` component (imported by the standard profile after the configuration) warns when a guaranteed
pair fails — the eight continuum pairs and `on-impact` on `visual-impact` — and prints, as `@debug` lines, each
brand colour's permitted use on each of the four steps and the derived variants. `$colour-roles-report: false` silences the report, `$colour-roles-check: false` all of
it. The mixin `assert-contrast($fg, $bg, $ratio, $label)` is available to themes for their own pairs.

## What changed for existing themes

- `$clr1_map` … `$clr9_map` are gone. They were computed when the core configuration loaded, before a theme's own
  configuration, and so always held derivatives of the library's grey defaults. `colour-map(N)` and
  `set-colour-legacy(N, 'shade')` give the same maps from the configured palette.
- `root_colour_variables` no longer overwrites `$neutral` (its loop variables are now prefixed), and exports the
  roles as `--colour--surface-light`, `--colour--on-light`, … `--colour--brand-secondary-on-dark`.
