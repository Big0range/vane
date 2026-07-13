---
name: 'naive-ui-design-color'
description: 'Color design specifications for Naive UI. Invoke when user needs to understand the color palette, main colors, semantic colors, or neutral colors used in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Color Design Specifications

Naive UI uses a carefully designed color system with primary green color and semantic colors for different states, providing a consistent look and feel for the products you build.

## When to Use

- Understanding the color system
- Applying brand colors correctly
- Using semantic colors (success, warning, error, info)
- Working with neutral colors for text and backgrounds
- Creating themed components

---

## Primary Color

The main color of Naive UI is a vibrant green (#18a058) that conveys freshness and growth.

| Color | CSS Variable | Light Theme | Dark Theme | Usage |
| --- | --- | --- | --- | --- |
| Primary | `--primary-color` | `#18a058` | `#63e2b7` | Main brand color |
| Primary Hover | `--primary-color-hover` | `#36ad6a` | `#7fe7c4` | Hover state |
| Primary Pressed | `--primary-color-pressed` | `#0c7a43` | `#5acea7` | Active/pressed state |
| Primary Suppl | `--primary-color-suppl` | `#36ad6a` | `rgb(42, 148, 125)` | Supplementary |

---

## Semantic Colors

Semantic colors are used in different scenarios to convey meaning.

### Success

| CSS Variable | Light Theme | Dark Theme | Usage |
| --- | --- | --- | --- |
| `--success-color` | `#18a058` | `#63e2b7` | Success operations |
| `--success-color-hover` | `#36ad6a` | `#7fe7c4` | Hover state |
| `--success-color-pressed` | `#0c7a43` | `#5acea7` | Active state |
| `--success-color-suppl` | `#36ad6a` | `rgb(42, 148, 125)` | Supplementary |

### Info

| CSS Variable | Light Theme | Dark Theme | Usage |
| --- | --- | --- | --- |
| `--info-color` | `#2080f0` | `#70c0e8` | Information operations |
| `--info-color-hover` | `#4098fc` | `#8acbec` | Hover state |
| `--info-color-pressed` | `#1060c9` | `#66afd3` | Active state |
| `--info-color-suppl` | `#4098fc` | `rgb(56, 137, 197)` | Supplementary |

### Warning

| CSS Variable | Light Theme | Dark Theme | Usage |
| --- | --- | --- | --- |
| `--warning-color` | `#f0a020` | `#f2c97d` | Warning operations |
| `--warning-color-hover` | `#fcb040` | `#f5d599` | Hover state |
| `--warning-color-pressed` | `#c97c10` | `#e6c260` | Active state |
| `--warning-color-suppl` | `#fcb040` | `rgb(240, 138, 0)` | Supplementary |

### Error

| CSS Variable | Light Theme | Dark Theme | Usage |
| --- | --- | --- | --- |
| `--error-color` | `#d03050` | `#e88080` | Error/danger operations |
| `--error-color-hover` | `#de576d` | `#e98b8b` | Hover state |
| `--error-color-pressed` | `#ab1f3f` | `#e57272` | Active state |
| `--error-color-suppl` | `#de576d` | `rgb(208, 58, 82)` | Supplementary |

---

## Text Colors

Naive UI uses a hierarchical text color system for visual clarity.

### Light Theme

| CSS Variable | Value | Usage |
| --- | --- | --- |
| `--text-color-base` | `#000` | Base text color |
| `--text-color-1` | `rgb(31, 34, 37)` | Primary text - headings, important content |
| `--text-color-2` | `rgb(51, 54, 57)` | Secondary text - body content |
| `--text-color-3` | `rgb(118, 124, 130)` | Tertiary text - captions, hints |
| `--text-color-disabled` | `rgba(0, 0, 0, 0.24)` | Disabled text |
| `--placeholder-color` | `rgba(0, 0, 0, 0.24)` | Placeholder text |
| `--placeholder-color-disabled` | `rgba(0, 0, 0, 0.18)` | Disabled placeholder |

### Dark Theme

| CSS Variable | Value | Usage |
| --- | --- | --- |
| `--text-color-base` | `#fff` | Base text color |
| `--text-color-1` | `rgba(255, 255, 255, 0.9)` | Primary text |
| `--text-color-2` | `rgba(255, 255, 255, 0.82)` | Secondary text |
| `--text-color-3` | `rgba(255, 255, 255, 0.52)` | Tertiary text |
| `--text-color-disabled` | `rgba(255, 255, 255, 0.38)` | Disabled text |
| `--placeholder-color` | `rgba(255, 255, 255, 0.38)` | Placeholder text |
| `--placeholder-color-disabled` | `rgba(255, 255, 255, 0.28)` | Disabled placeholder |

---

## Background Colors

### Light Theme

| CSS Variable      | Value                | Usage                    |
| ----------------- | -------------------- | ------------------------ |
| `--base-color`    | `#fff`               | Base background          |
| `--body-color`    | `#fff`               | Body background          |
| `--card-color`    | `#fff`               | Card background          |
| `--modal-color`   | `#fff`               | Modal background         |
| `--popover-color` | `#fff`               | Popover background       |
| `--table-color`   | `#fff`               | Table background         |
| `--hover-color`   | `rgb(243, 243, 245)` | Hover state background   |
| `--pressed-color` | `rgb(237, 237, 239)` | Pressed state background |
| `--action-color`  | `rgb(250, 250, 252)` | Action area background   |
| `--input-color`   | `#fff`               | Input background         |

### Dark Theme

| CSS Variable      | Value                       | Usage                    |
| ----------------- | --------------------------- | ------------------------ |
| `--base-color`    | `#000`                      | Base background          |
| `--body-color`    | `rgb(16, 16, 20)`           | Body background          |
| `--card-color`    | `rgb(24, 24, 28)`           | Card background          |
| `--modal-color`   | `rgb(44, 44, 50)`           | Modal background         |
| `--popover-color` | `rgb(72, 72, 78)`           | Popover background       |
| `--table-color`   | `rgb(24, 24, 28)`           | Table background         |
| `--hover-color`   | `rgba(255, 255, 255, 0.09)` | Hover state background   |
| `--pressed-color` | `rgba(255, 255, 255, 0.05)` | Pressed state background |
| `--action-color`  | `rgba(255, 255, 255, 0.06)` | Action area background   |
| `--input-color`   | `rgba(255, 255, 255, 0.1)`  | Input background         |

---

## Border & Divider Colors

| CSS Variable | Light Theme | Dark Theme | Usage |
| --- | --- | --- | --- |
| `--border-color` | `rgb(224, 224, 230)` | `rgba(255, 255, 255, 0.24)` | Default border |
| `--divider-color` | `rgb(239, 239, 245)` | `rgba(255, 255, 255, 0.09)` | Divider lines |

---

## Using Theme Variables

### In CSS (with n-element)

```vue
<template>
  <n-config-provider :theme="theme">
    <n-card>
      <n-el
        tag="span"
        style="
          color: var(--primary-color);
          transition: 0.3s var(--cubic-bezier-ease-in-out);
        "
      >
        Styled with theme variables
      </n-el>
    </n-card>
  </n-config-provider>
</template>
```

### In JavaScript (with useThemeVars)

```vue
<script setup>
import { useThemeVars } from 'naive-ui';

const themeVars = useThemeVars();
</script>

<template>
  <div :style="{ color: themeVars.primaryColor }">Primary color text</div>
</template>
```

---

## CSS Variables Summary

```css
:root {
  --primary-color: #18a058;
  --primary-color-hover: #36ad6a;
  --primary-color-pressed: #0c7a43;

  --success-color: #18a058;
  --info-color: #2080f0;
  --warning-color: #f0a020;
  --error-color: #d03050;

  --text-color-1: rgb(31, 34, 37);
  --text-color-2: rgb(51, 54, 57);
  --text-color-3: rgb(118, 124, 130);

  --base-color: #fff;
  --body-color: #fff;
  --card-color: #fff;
  --modal-color: #fff;

  --border-color: rgb(224, 224, 230);
  --divider-color: rgb(239, 239, 245);
}
```

---

## Best Practices

1. **Use CSS Variables**: Always use predefined color variables via `useThemeVars()` or `var(--xxx)` for consistency
2. **Semantic Colors**: Use appropriate semantic colors for their intended purpose
3. **Text Hierarchy**: Use text color variables to establish visual hierarchy
4. **Dark Mode Support**: Colors automatically adjust when using dark theme
5. **Customization**: Override theme variables via `n-config-provider` to match your brand
6. **State Colors**: Use hover/pressed variants for interactive elements

---

## Related Resources

| Resource | Description |
| --- | --- |
| [useThemeVars](https://www.naiveui.com/en-US/os-theme/docs/theme) | Access theme variables in JavaScript |
| [n-element](https://www.naiveui.com/en-US/os-theme/components/element) | Use CSS variables in templates |
| [n-config-provider](https://www.naiveui.com/en-US/os-theme/components/config-provider) | Theme customization |
