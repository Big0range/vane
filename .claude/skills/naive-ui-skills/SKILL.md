---
name: naive-ui-skills
description: Use when implementing, debugging, or designing Vue 3 UI with Naive UI components, including component APIs, props, events, slots, forms, tables, overlays, theming, dark mode, i18n, SSR, and Naive UI design specifications.
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Skills

A Claude Code project skill for working with **Naive UI** in Vue 3. This is the single discoverable skill entry; the component, foundation, and design files in this directory are supporting references.

## When to Use

Use this skill when the task involves Naive UI, including:

- Implementing or debugging Naive UI components.
- Looking up component props, events, slots, exposes, or common usage patterns.
- Building forms, tables, modals, dialogs, menus, layouts, feedback UI, or data-display UI.
- Configuring `n-config-provider`, global providers, themes, dark mode, i18n, or SSR.
- Applying Naive UI design guidance for color, border, typography, layout, or visual consistency.

## Do Not Use For

- Element Plus, Ant Design Vue, Arco, TDesign, Vant, or other UI libraries unless the user is migrating to/from Naive UI.
- Generic Vue issues with no Naive UI-specific component, provider, theme, or design-system concern.
- FormCreate rule/option/api usage; use the FormCreate skill for that and only consult this skill for Naive UI component details.

## Workflow

1. Identify the user's Naive UI intent and target component/topic.
2. Read the most specific `REFERENCE.md` file first.
3. Prefer component references over broad indexes when a component is named.
4. Use foundation references for setup, components overview, theming, dark mode, i18n, or SSR.
5. Use design references for visual/design-system guidance.
6. If the request spans multiple components, read each relevant reference and explain how they fit together.
7. Answer with Vue 3 + Naive UI conventions and mention important provider/setup requirements when relevant.

## Reference Lookup

| Need | Reference path |
| --- | --- |
| Component APIs and examples | `components/n-{component-name}/REFERENCE.md` |
| Naive UI setup / component overview | `naive-ui-quickstart/REFERENCE.md`, `naive-ui-components/REFERENCE.md` |
| Theme customization | `naive-ui-theming/REFERENCE.md` |
| Dark mode | `naive-ui-dark-mode/REFERENCE.md` |
| Internationalization | `naive-ui-i18n/REFERENCE.md` |
| Server-side rendering | `naive-ui-ssr/REFERENCE.md` |
| Design overview | `naive-ui-design-overview/REFERENCE.md` |
| Color / border / layout / typography | `naive-ui-design-color/REFERENCE.md`, `naive-ui-design-border/REFERENCE.md`, `naive-ui-design-layout/REFERENCE.md`, `naive-ui-design-typography/REFERENCE.md` |

### Component Path Convention

Component references live at:

```text
components/n-{component-name}/REFERENCE.md
```

Examples:

- Button: `components/n-button/REFERENCE.md`
- Form: `components/n-form/REFERENCE.md`
- Input: `components/n-input/REFERENCE.md`
- Select: `components/n-select/REFERENCE.md`
- Data table: `components/n-data-table/REFERENCE.md`
- Modal: `components/n-modal/REFERENCE.md`
- Dialog: `components/n-dialog/REFERENCE.md`
- Config provider: `components/n-config-provider/REFERENCE.md`

## Common Intent Mapping

| User intent | Read first |
| --- | --- |
| Button/action UI | `components/n-button/REFERENCE.md` |
| Form model, validation, submit flow | `components/n-form/REFERENCE.md` plus relevant input references |
| Text input | `components/n-input/REFERENCE.md` |
| Select/dropdown input | `components/n-select/REFERENCE.md` |
| Date/time input | `components/n-date-picker/REFERENCE.md`, `components/n-time-picker/REFERENCE.md` |
| Checkbox/radio/switch | `components/n-checkbox/REFERENCE.md`, `components/n-radio/REFERENCE.md`, `components/n-switch/REFERENCE.md` |
| Table or complex data grid | `components/n-data-table/REFERENCE.md` |
| Simple table markup | `components/n-table/REFERENCE.md` |
| Modal overlay | `components/n-modal/REFERENCE.md` |
| Confirmation/dialog API | `components/n-dialog/REFERENCE.md` |
| Message/notification feedback | `components/n-message/REFERENCE.md`, `components/n-notification/REFERENCE.md` |
| Theme customization | `naive-ui-theming/REFERENCE.md` |
| Dark mode | `naive-ui-dark-mode/REFERENCE.md` |
| Locale/i18n | `naive-ui-i18n/REFERENCE.md` |
| SSR | `naive-ui-ssr/REFERENCE.md` |
| Design tokens/specs | matching `naive-ui-design-*/REFERENCE.md` |

## Naive UI Guardrails

- Use Vue 3 and Naive UI 2.x patterns.
- Prefer Naive UI naming and binding conventions; many controlled components use `v-model:value`.
- For forms, use `n-form`, `n-form-item`, `model`, `rules`, and `path`.
- For global configuration, wrap the app or subtree with `n-config-provider`.
- For programmatic message/dialog/notification/loading-bar APIs, ensure the matching provider is installed in the component tree when required.
- Do not apply Element Plus or Ant Design Vue prop/event names unless explicitly discussing migration.
- Check the relevant `REFERENCE.md` before giving exact prop, event, slot, or expose names.

## Output Expectations

When answering Naive UI usage questions:

1. State the relevant component/topic and reference path when useful.
2. Provide a minimal Vue 3 example that matches Naive UI conventions.
3. Include required providers, imports, and `v-model:value` bindings when relevant.
4. Explain validation, event, slot, or theme details briefly instead of dumping full docs.
5. If multiple UI libraries appear in the user's code, call out which parts are Naive UI-specific.
