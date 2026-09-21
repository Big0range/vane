---
name: 'n-flex'
description: 'Flex layout component using CSS flexbox with gap support. Invoke when user needs to implement flexible layouts, spacing between elements, or alignment in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Flex Component

Flex layout component using CSS flexbox with gap property for spacing between elements.

## When to Use

Use this component when:

- **Flexible layouts**: Create responsive flexbox-based layouts
- **Element spacing**: Add consistent gaps between child elements
- **Alignment control**: Align items horizontally or vertically
- **Content distribution**: Distribute space between, around, or evenly

## When to Invoke

Invoke this skill when:

- User needs to implement a flex layout with consistent spacing
- User wants to align elements horizontally or vertically
- User needs to control content justification
- User wants to create responsive layouts with wrapping
- User asks about spacing between components

## Features

- **Flexbox Based**: Uses CSS flexbox for layout
- **Gap Property**: Native CSS gap support for spacing
- **Direction Control**: Horizontal or vertical layout
- **Justify Content**: start, end, center, space-between, space-around
- **Align Items**: Control vertical alignment
- **Wrap Support**: Automatic line wrapping
- **Inline Mode**: Display as inline-flex
- **Responsive Size**: Small, medium, large, or custom number

## API Reference

### Flex Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| align | `string` | `undefined` | Way to align items, see [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items). |
| inline | `boolean` | `false` | Whether it's display is `inline-flex`. |
| justify | `string` | `'start'` | Way to justify content, see [justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content). |
| size | `'small' \| 'medium' \| 'large' \| number \| [number, number]` | `'medium'` | When it's a number, it will be used as vertical and horizontal gap, or it is `[horizontalGap, verticalGap]`. |
| vertical | `boolean` | `false` | Whether to layout content vertically. |
| wrap | `boolean` | `true` | Whether to wrap content if `n-flex`'s width is exceeded. |

### Flex Slots

| Name    | Parameters | Description      |
| ------- | ---------- | ---------------- |
| default | `()`       | Spacing content. |

## Basic Usage

### Basic Flex

```vue
<template>
  <n-flex>
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
    <n-button>Long! Long! Cross the line!</n-button>
  </n-flex>
</template>
```

### Vertical Layout

```vue
<template>
  <n-flex vertical>
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
  </n-flex>
</template>
```

### Justify End

```vue
<template>
  <n-flex justify="end">
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
  </n-flex>
</template>
```

### Space Between

```vue
<template>
  <n-flex justify="space-between">
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
  </n-flex>
</template>
```

### Space Around

```vue
<template>
  <n-flex justify="space-around" size="large">
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
  </n-flex>
</template>
```

### Center Content

```vue
<template>
  <n-flex justify="center">
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
  </n-flex>
</template>
```

## Common Patterns

### Custom Gap Size

```vue
<template>
  <n-flex :size="24">
    <n-button>Button 1</n-button>
    <n-button>Button 2</n-button>
    <n-button>Button 3</n-button>
  </n-flex>
</template>
```

### Different Horizontal and Vertical Gap

```vue
<template>
  <n-flex :size="[16, 8]" wrap>
    <n-button v-for="i in 10" :key="i">Button {{ i }}</n-button>
  </n-flex>
</template>
```

### Align Items

```vue
<template>
  <n-flex align="center">
    <n-button>Small</n-button>
    <n-button size="large">Large Button</n-button>
    <n-button>Tiny</n-button>
  </n-flex>
</template>
```

### No Wrap

```vue
<template>
  <n-flex :wrap="false" style="overflow-x: auto">
    <n-button v-for="i in 20" :key="i">Button {{ i }}</n-button>
  </n-flex>
</template>
```

### Inline Flex

```vue
<template>
  <div>
    Some text
    <n-flex inline>
      <n-button>A</n-button>
      <n-button>B</n-button>
    </n-flex>
    more text
  </div>
</template>
```

## Best Practices

1. **Prefer n-flex over n-space**: Use `n-flex` when possible as it uses native CSS gap property

2. **Browser compatibility**: Note that the gap property might have compatibility issues with some older browsers

3. **Use semantic justify values**: Choose appropriate justify values based on your layout needs
   - `start` for left-aligned content
   - `center` for centered content
   - `space-between` for equal spacing between items
   - `space-around` for equal spacing around items

4. **Responsive layouts**: Combine with `wrap` prop for responsive designs

5. **Vertical layouts**: Use `vertical` prop for stacked layouts

6. **Custom spacing**: Use number or array for precise gap control
