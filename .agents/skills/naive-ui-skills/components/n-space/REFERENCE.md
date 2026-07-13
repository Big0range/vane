---
name: 'n-space'
description: 'Spacing component for consistent gaps between elements. Invoke when user needs to add spacing between components or create layouts with gaps in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Space Component

A great invention for adding consistent spacing between elements. If you don't have compatibility issues for `gap` CSS property, it's suggested to use Flex (n-flex).

## When to Use

Use this component when:

- **Component spacing**: Add consistent gaps between buttons, inputs, etc.
- **Layout spacing**: Create vertical or horizontal spacing
- **Flexible layouts**: Layout with wrapping support
- **Legacy browser support**: When CSS gap is not available

## When to Invoke

Invoke this skill when:

- User needs to add spacing between elements
- User wants to create a horizontal or vertical layout with gaps
- User needs to reverse element order
- User wants to control alignment and justification
- User asks about spacing between components

## Features

- **Flexible Spacing**: Small, medium, large, or custom number
- **Direction Control**: Horizontal or vertical layout
- **Wrap Support**: Automatic line wrapping
- **Justify Options**: start, end, center, space-between, space-around, space-evenly
- **Align Options**: start, end, center, baseline, stretch
- **Reverse Order**: Reverse element order
- **Inline Mode**: Display as inline element
- **Item Wrapping**: Optional item wrapper control

## API Reference

### Space Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| align | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'` | `undefined` | Vertical arrangement. |
| inline | `boolean` | `false` | Is it an inline element. |
| wrap-item | `boolean` | `true` | Whether a container exists to wrap the child elements. |
| item-class | `string` | `undefined` | Node class, valid when `wrap-item` is `true`. |
| item-style | `string \| object` | `undefined` | Node style, valid when `wrap-item` is `true`. |
| justify | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `'start'` | Horizontal arrangement. |
| reverse | `boolean` | `false` | Whether to reverse inner items. |
| size | `'small' \| 'medium' \| 'large' \| number \| [number, number]` | `'medium'` | Gap size. |
| vertical | `boolean` | `false` | Whether to lay out vertically. |
| wrap | `boolean` | `true` | Whether to exceed the line break. |

### Space Slots

| Name    | Parameters | Description      |
| ------- | ---------- | ---------------- |
| default | `()`       | Spacing content. |

## Basic Usage

### Basic Space

```vue
<template>
  <n-space>
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
    <n-button>Long! Long! Cross the line!</n-button>
  </n-space>
</template>
```

### Vertical Layout

```vue
<template>
  <n-space vertical>
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
  </n-space>
</template>
```

### Justify End

```vue
<template>
  <n-space justify="end">
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
  </n-space>
</template>
```

### Space Between

```vue
<template>
  <n-space justify="space-between">
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
  </n-space>
</template>
```

### Space Around

```vue
<template>
  <n-space justify="space-around" size="large">
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
  </n-space>
</template>
```

### Center Content

```vue
<template>
  <n-space justify="center">
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
  </n-space>
</template>
```

### Reverse Order

```vue
<template>
  <n-space reverse>
    <n-button>1</n-button>
    <n-button>2</n-button>
    <n-button>3</n-button>
  </n-space>
</template>
```

## Common Patterns

### Custom Gap Size

```vue
<template>
  <n-space :size="24">
    <n-button>Button 1</n-button>
    <n-button>Button 2</n-button>
    <n-button>Button 3</n-button>
  </n-space>
</template>
```

### Different Horizontal and Vertical Gap

```vue
<template>
  <n-space :size="[16, 8]" wrap>
    <n-button v-for="i in 10" :key="i">Button {{ i }}</n-button>
  </n-space>
</template>
```

### Align Items

```vue
<template>
  <n-space align="center">
    <n-button>Small</n-button>
    <n-button size="large">Large Button</n-button>
    <n-button>Tiny</n-button>
  </n-space>
</template>
```

### No Wrap

```vue
<template>
  <n-space :wrap="false" style="overflow-x: auto">
    <n-button v-for="i in 20" :key="i">Button {{ i }}</n-button>
  </n-space>
</template>
```

### With Item Style

```vue
<template>
  <n-space item-style="background: rgba(0, 128, 0, 0.1); padding: 8px;">
    <span>Item 1</span>
    <span>Item 2</span>
    <span>Item 3</span>
  </n-space>
</template>
```

### Form Actions

```vue
<template>
  <n-space justify="end">
    <n-button>Cancel</n-button>
    <n-button type="primary">Submit</n-button>
  </n-space>
</template>
```

## Best Practices

1. **Prefer n-flex**: Use `n-flex` when possible as it uses native CSS gap property

2. **Use semantic justify values**: Choose appropriate justify values based on your layout needs

3. **Size options**: Use preset sizes for consistency, custom numbers for precise control

4. **Vertical layouts**: Use `vertical` prop for stacked layouts

5. **Form actions**: Use `justify="end"` for right-aligned form actions

6. **Reverse for RTL**: Use `reverse` prop for RTL layouts or reversed order
