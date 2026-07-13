---
name: 'naive-ui-design-border'
description: 'Border design specifications for Naive UI components. Invoke when user needs to understand border styles, radius options, or shadow styles used throughout Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Border Design Specifications

Naive UI standardizes borders used in buttons, cards, pop-ups, and other components for consistent visual design.

## When to Use

- Understanding border style options
- Applying consistent radius styles
- Using shadow styles for depth
- Maintaining design consistency
- Creating themed components with proper borders

---

## Border Radius

Naive UI provides standardized border radius values for consistent rounded corners.

| CSS Variable            | Value | Usage                          |
| ----------------------- | ----- | ------------------------------ |
| `--border-radius`       | `3px` | Base radius for components     |
| `--border-radius-small` | `2px` | Small radius for buttons, tags |

### Usage Examples

```vue
<script setup>
import { useThemeVars } from 'naive-ui';
const themeVars = useThemeVars();
</script>

<template>
  <div :style="{ borderRadius: themeVars.borderRadius }">
    Base radius element
  </div>
  <div :style="{ borderRadius: themeVars.borderRadiusSmall }">
    Small radius element
  </div>
</template>
```

### In CSS with n-element

```vue
<template>
  <n-el
    tag="div"
    style="
      border-radius: var(--border-radius);
      border: 1px solid var(--border-color);
    "
  >
    Rounded container
  </n-el>
</template>
```

---

## Border Colors

Naive UI uses semantic border colors that adapt to light and dark themes.

### Light Theme

| CSS Variable      | Value                | Usage                |
| ----------------- | -------------------- | -------------------- |
| `--border-color`  | `rgb(224, 224, 230)` | Default border color |
| `--divider-color` | `rgb(239, 239, 245)` | Divider lines        |

### Dark Theme

| CSS Variable      | Value                       | Usage                |
| ----------------- | --------------------------- | -------------------- |
| `--border-color`  | `rgba(255, 255, 255, 0.24)` | Default border color |
| `--divider-color` | `rgba(255, 255, 255, 0.09)` | Divider lines        |

---

## Box Shadows

Naive UI provides three levels of shadow styles for depth and elevation.

| CSS Variable     | Usage                              |
| ---------------- | ---------------------------------- |
| `--box-shadow-1` | Light shadow for cards, dropdowns  |
| `--box-shadow-2` | Medium shadow for popovers, modals |
| `--box-shadow-3` | Heavy shadow for dialogs, overlays |

### Shadow Values

#### Light Theme

```css
--box-shadow-1:
  0 1px 2px -2px rgba(0, 0, 0, 0.08), 0 3px 6px 0 rgba(0, 0, 0, 0.06),
  0 5px 12px 4px rgba(0, 0, 0, 0.04);

--box-shadow-2:
  0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
  0 9px 28px 8px rgba(0, 0, 0, 0.05);

--box-shadow-3:
  0 6px 16px -9px rgba(0, 0, 0, 0.08), 0 9px 28px 0 rgba(0, 0, 0, 0.05),
  0 12px 48px 16px rgba(0, 0, 0, 0.03);
```

#### Dark Theme

```css
--box-shadow-1:
  0 1px 2px -2px rgba(0, 0, 0, 0.24), 0 3px 6px 0 rgba(0, 0, 0, 0.18),
  0 5px 12px 4px rgba(0, 0, 0, 0.12);

--box-shadow-2:
  0 3px 6px -4px rgba(0, 0, 0, 0.24), 0 6px 12px 0 rgba(0, 0, 0, 0.16),
  0 9px 18px 8px rgba(0, 0, 0, 0.1);

--box-shadow-3:
  0 6px 16px -9px rgba(0, 0, 0, 0.08), 0 9px 28px 0 rgba(0, 0, 0, 0.05),
  0 12px 48px 16px rgba(0, 0, 0, 0.03);
```

### Usage Examples

```vue
<script setup>
import { useThemeVars } from 'naive-ui';
const themeVars = useThemeVars();
</script>

<template>
  <div :style="{ boxShadow: themeVars.boxShadow1 }">Light elevation</div>
  <div :style="{ boxShadow: themeVars.boxShadow2 }">Medium elevation</div>
  <div :style="{ boxShadow: themeVars.boxShadow3 }">Heavy elevation</div>
</template>
```

---

## Scrollbar Styles

Naive UI provides customizable scrollbar styles.

| CSS Variable | Value | Usage |
| --- | --- | --- |
| `--scrollbar-color` | Light: `rgba(0, 0, 0, 0.25)` | Scrollbar thumb color |
| `--scrollbar-color-hover` | Light: `rgba(0, 0, 0, 0.4)` | Scrollbar thumb hover |
| `--scrollbar-width` | `5px` | Scrollbar width |
| `--scrollbar-height` | `5px` | Scrollbar height |
| `--scrollbar-border-radius` | `5px` | Scrollbar thumb radius |

---

## CSS Variables Summary

```css
:root {
  --border-radius: 3px;
  --border-radius-small: 2px;

  --border-color: rgb(224, 224, 230);
  --divider-color: rgb(239, 239, 245);

  --box-shadow-1:
    0 1px 2px -2px rgba(0, 0, 0, 0.08), 0 3px 6px 0 rgba(0, 0, 0, 0.06),
    0 5px 12px 4px rgba(0, 0, 0, 0.04);
  --box-shadow-2:
    0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  --box-shadow-3:
    0 6px 16px -9px rgba(0, 0, 0, 0.08), 0 9px 28px 0 rgba(0, 0, 0, 0.05),
    0 12px 48px 16px rgba(0, 0, 0, 0.03);

  --scrollbar-width: 5px;
  --scrollbar-height: 5px;
  --scrollbar-border-radius: 5px;
}
```

---

## Transition Timing

Naive UI uses standardized cubic-bezier timing functions for smooth transitions.

| CSS Variable | Value | Usage |
| --- | --- | --- |
| `--cubic-bezier-ease-in-out` | `cubic-bezier(.4, 0, .2, 1)` | General transitions |
| `--cubic-bezier-ease-out` | `cubic-bezier(0, 0, .2, 1)` | Enter animations |
| `--cubic-bezier-ease-in` | `cubic-bezier(.4, 0, 1, 1)` | Exit animations |

### Usage Example

```vue
<template>
  <n-el
    tag="div"
    style="
      transition: all 0.3s var(--cubic-bezier-ease-in-out);
      border-radius: var(--border-radius);
    "
  >
    Smooth transition element
  </n-el>
</template>
```

---

## Best Practices

1. **Use CSS Variables**: Always use predefined CSS variables for consistency
2. **Match Context**: Choose appropriate shadow depth based on element importance
3. **Dark Mode**: Border and shadow colors automatically adjust in dark mode
4. **Consistent Radius**: Use `--border-radius` for most components, `--border-radius-small` for compact elements
5. **Smooth Transitions**: Use the provided cubic-bezier functions for consistent animation feel
6. **Accessibility**: Ensure sufficient contrast for borders in both themes

---

## Related Resources

| Resource | Description |
| --- | --- |
| [useThemeVars](https://www.naiveui.com/en-US/os-theme/docs/theme) | Access theme variables in JavaScript |
| [n-element](https://www.naiveui.com/en-US/os-theme/components/element) | Use CSS variables in templates |
| [Color Design](./naive-ui-design-color/SKILL.md) | Color specifications |
