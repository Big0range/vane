---
name: 'naive-ui-design-typography'
description: 'Typography design specifications for Naive UI. Invoke when user needs to understand font conventions, font-family settings, or text styling guidelines.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Typography Design Specifications

Naive UI creates font conventions to ensure the best presentation across different platforms. Typography is an art that enhances readability and visual hierarchy.

## When to Use

- Understanding font conventions
- Applying consistent text styles
- Setting font-family for cross-platform compatibility
- Managing font sizes and line heights
- Using typography components

---

## Font Family

Naive UI uses a carefully selected font stack for optimal cross-platform display.

### Sans-serif Font (Default)

```css
font-family:
  v-sans,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  sans-serif,
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol';
```

### Monospace Font

```css
font-family: v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace;
```

### Font Stack Explanation

| Font               | Platform  | Purpose                                    |
| ------------------ | --------- | ------------------------------------------ |
| v-sans             | All       | Custom sans-serif font (can be configured) |
| system-ui          | All       | System UI font                             |
| -apple-system      | macOS/iOS | Apple system font                          |
| BlinkMacSystemFont | macOS     | Chrome on macOS                            |
| Segoe UI           | Windows   | Windows system font                        |
| Apple Color Emoji  | macOS/iOS | Emoji support                              |
| Segoe UI Emoji     | Windows   | Emoji support                              |

---

## Font Sizes

Naive UI provides standardized font size variables for different contexts.

| CSS Variable         | Value  | Usage                  |
| -------------------- | ------ | ---------------------- |
| `--font-size`        | `14px` | Base body text         |
| `--font-size-mini`   | `12px` | Mini text, tiny labels |
| `--font-size-tiny`   | `12px` | Tiny text              |
| `--font-size-small`  | `14px` | Small text             |
| `--font-size-medium` | `14px` | Medium text            |
| `--font-size-large`  | `15px` | Large text             |
| `--font-size-huge`   | `16px` | Huge text              |

### Usage Examples

```vue
<script setup>
import { useThemeVars } from 'naive-ui';
const themeVars = useThemeVars();
</script>

<template>
  <p :style="{ fontSize: themeVars.fontSize }">Base text</p>
  <span :style="{ fontSize: themeVars.fontSizeMini }">Mini text</span>
</template>
```

---

## Font Weight

| CSS Variable           | Value | Usage              |
| ---------------------- | ----- | ------------------ |
| `--font-weight`        | `400` | Normal text weight |
| `--font-weight-strong` | `500` | Emphasized text    |

```vue
<template>
  <n-el style="font-weight: var(--font-weight-strong)"> Strong text </n-el>
</template>
```

---

## Line Height

| CSS Variable    | Value | Usage                             |
| --------------- | ----- | --------------------------------- |
| `--line-height` | `1.6` | Default line height for body text |

---

## Header Typography

Naive UI provides typography components with predefined header styles.

### Header Font Sizes

| Level | Font Size | Margin          |
| ----- | --------- | --------------- |
| H1    | `30px`    | `28px 0 20px 0` |
| H2    | `22px`    | `28px 0 20px 0` |
| H3    | `18px`    | `28px 0 20px 0` |
| H4    | `16px`    | `28px 0 18px 0` |
| H5    | `16px`    | `28px 0 18px 0` |
| H6    | `16px`    | `28px 0 18px 0` |

### Header Components

```vue
<template>
  <n-h1>Heading 1</n-h1>
  <n-h2>Heading 2</n-h2>
  <n-h3>Heading 3</n-h3>
  <n-h4>Heading 4</n-h4>
  <n-h5>Heading 5</n-h5>
  <n-h6>Heading 6</n-h6>
</template>
```

### Header with Prefix Bar

Headers can display a colored bar prefix for visual emphasis.

```vue
<template>
  <n-h1 prefix="bar">Heading with bar</n-h1>
  <n-h2 prefix="bar" align-text>Aligned heading</n-h2>
  <n-h3 prefix="bar" type="success">Success heading</n-h3>
</template>
```

---

## Text Component

Naive UI provides a Text component for styled text display.

### Text Types

```vue
<template>
  <n-text>Default text</n-text>
  <n-text type="primary">Primary text</n-text>
  <n-text type="success">Success text</n-text>
  <n-text type="info">Info text</n-text>
  <n-text type="warning">Warning text</n-text>
  <n-text type="error">Error text</n-text>
</template>
```

### Text Depth

```vue
<template>
  <n-text>Primary depth (default)</n-text>
  <n-text depth="2">Secondary depth</n-text>
  <n-text depth="3">Tertiary depth</n-text>
</template>
```

### Text with Tag

```vue
<template>
  <n-text tag="div">Text as div</n-text>
  <n-text tag="span">Text as span</n-text>
  <n-text tag="label">Text as label</n-text>
</template>
```

---

## Paragraph Component

```vue
<template>
  <n-p>
    This is a paragraph with proper spacing and typography. Naive UI provides
    consistent text styling across components.
  </n-p>
</template>
```

---

## Other Typography Components

### Anchor (Link)

```vue
<template>
  <n-a href="https://example.com">Link text</n-a>
</template>
```

### Horizontal Rule

```vue
<template>
  <n-hr />
</template>
```

### Lists

```vue
<template>
  <n-ul>
    <n-li>Unordered list item 1</n-li>
    <n-li>Unordered list item 2</n-li>
  </n-ul>

  <n-ol>
    <n-li>Ordered list item 1</n-li>
    <n-li>Ordered list item 2</n-li>
  </n-ol>
</template>
```

### Blockquote

```vue
<template>
  <n-blockquote>
    <n-p>This is a blockquote with proper styling.</n-p>
  </n-blockquote>
</template>
```

---

## CSS Variables Summary

```css
:root {
  --font-family:
    v-sans, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-family-mono:
    v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace;

  --font-size: 14px;
  --font-size-mini: 12px;
  --font-size-tiny: 12px;
  --font-size-small: 14px;
  --font-size-medium: 14px;
  --font-size-large: 15px;
  --font-size-huge: 16px;

  --font-weight: 400;
  --font-weight-strong: 500;

  --line-height: 1.6;
}
```

---

## Component Heights

Naive UI uses standardized heights for form controls and interactive elements.

| CSS Variable      | Value  | Usage                          |
| ----------------- | ------ | ------------------------------ |
| `--height-mini`   | `16px` | Mini size controls             |
| `--height-tiny`   | `22px` | Tiny size controls             |
| `--height-small`  | `28px` | Small size controls            |
| `--height-medium` | `34px` | Medium size controls (default) |
| `--height-large`  | `40px` | Large size controls            |
| `--height-huge`   | `46px` | Huge size controls             |

---

## Best Practices

1. **Use Typography Components**: Use `n-h1` through `n-h6`, `n-p`, `n-text` for consistent styling
2. **Cross-Platform**: The font stack ensures consistent display across platforms
3. **Hierarchy**: Use font sizes and depths to establish visual hierarchy
4. **Line Height**: Maintain readable line height (1.6) for body text
5. **Dark Mode**: Typography automatically adjusts in dark mode
6. **Semantic HTML**: Use appropriate tags (`tag` prop) for accessibility

---

## Related Resources

| Resource | Description |
| --- | --- |
| [Typography Components](https://www.naiveui.com/en-US/os-theme/components/typography) | Full typography documentation |
| [useThemeVars](https://www.naiveui.com/en-US/os-theme/docs/theme) | Access theme variables |
| [Color Design](./naive-ui-design-color/SKILL.md) | Text color variables |
| [Border Design](./naive-ui-design-border/SKILL.md) | Related design specifications |
