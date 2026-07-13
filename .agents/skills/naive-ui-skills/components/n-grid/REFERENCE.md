---
name: 'n-grid'
description: 'CSS Grid-based responsive grid system component. Invoke when user needs to implement grid layouts, responsive designs, or column-based layouts in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Grid Component

Based on CSS Grid. Responsive. Keep away from IE.

## When to Use

Use this component when:

- **Grid layouts**: Create multi-column layouts
- **Responsive designs**: Build responsive grid systems
- **Dashboard layouts**: Arrange content in grid patterns
- **Form layouts**: Create multi-column form layouts

## When to Invoke

Invoke this skill when:

- User needs to implement a responsive grid layout
- User wants to create multi-column designs
- User needs collapsible grid items
- User wants responsive breakpoints
- User asks about grid item spanning or offsetting

## Features

- **CSS Grid Based**: Uses modern CSS Grid layout
- **Responsive**: Self-responsive or screen-responsive modes
- **Item Responsive**: Individual grid items can be responsive
- **Collapsible**: Support for collapsed rows with overflow detection
- **Gap Control**: Horizontal and vertical gap support
- **Span & Offset**: Control column spanning and offsetting
- **Suffix Support**: Special suffix slot for overflow content

## API Reference

### Grid Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| cols | `number \| ResponsiveDescription` | `24` | Number of grids displayed. |
| collapsed | `boolean` | `false` | Whether to fold by default. |
| collapsed-rows | `number` | `1` | The number of rows displayed by default. |
| layout-shift-disabled | `boolean` | `false` | Disable responsive functionality to avoid SSR layout shift. |
| responsive | `'self' \| 'screen'` | `'self'` | `'self'` triggers responsive layout by its own width. `'screen'` triggers responsive layout by viewport's width. |
| item-responsive | `boolean` | `false` | Whether the grid item is responsive. |
| x-gap | `number \| ResponsiveDescription` | `0` | Horizontal gap. |
| y-gap | `number \| ResponsiveDescription` | `0` | Vertical gap. |

### GridItem Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| offset | `number \| ResponsiveDescription` | `0` | The number of intervals to the left of the grid. |
| span | `number \| ResponsiveDescription` | `1` | The number of columns occupied by the grid. The grid item would be hidden if it's 0. |
| suffix | `boolean` | `false` | Grid suffix. |

### Grid Slots

| Name    | Parameters | Description   |
| ------- | ---------- | ------------- |
| default | `()`       | Grid content. |

### GridItem Slots

| Name    | Parameters                | Description        |
| ------- | ------------------------- | ------------------ |
| default | `({ overflow: boolean })` | Grid item content. |

## Basic Usage

### Basic Grid

`n-grid-item` has an alias called `n-gi`.

```vue
<template>
  <n-grid x-gap="12" :cols="4">
    <n-gi>
      <div class="light-green" />
    </n-gi>
    <n-gi>
      <div class="green" />
    </n-gi>
    <n-gi>
      <div class="light-green" />
    </n-gi>
    <n-gi>
      <div class="green" />
    </n-gi>
  </n-grid>
</template>

<style scoped>
.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
}
.green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.24);
}
</style>
```

### Gap

```vue
<template>
  <n-grid :x-gap="12" :y-gap="8" :cols="4">
    <n-grid-item>
      <div class="light-green" />
    </n-grid-item>
    <n-grid-item>
      <div class="green" />
    </n-grid-item>
    <n-grid-item>
      <div class="light-green" />
    </n-grid-item>
    <n-grid-item>
      <div class="green" />
    </n-grid-item>
  </n-grid>
</template>
```

### Offset

```vue
<template>
  <n-grid :x-gap="12" :cols="4">
    <n-grid-item :offset="1">
      <div class="light-green" />
    </n-grid-item>
    <n-grid-item :offset="1">
      <div class="green" />
    </n-grid-item>
  </n-grid>
</template>
```

## Common Patterns

### Responsive Columns

```vue
<template>
  <n-divider>Self Responsive</n-divider>
  <n-grid cols="2 400:4 600:6">
    <n-grid-item>
      <div class="light-green">1</div>
    </n-grid-item>
    <n-grid-item>
      <div class="green">2</div>
    </n-grid-item>
    <n-grid-item>
      <div class="light-green">3</div>
    </n-grid-item>
    <n-grid-item>
      <div class="green">4</div>
    </n-grid-item>
  </n-grid>

  <n-divider>Screen Responsive</n-divider>
  <n-grid cols="2 s:3 m:4 l:5 xl:6 2xl:7" responsive="screen">
    <n-grid-item>
      <div class="light-green">1</div>
    </n-grid-item>
    <n-grid-item>
      <div class="green">2</div>
    </n-grid-item>
  </n-grid>
</template>
```

### Responsive Grid Item

```vue
<template>
  <n-grid cols="4" item-responsive>
    <n-grid-item span="0 400:1 600:2 800:3">
      <div class="light-green">
        0 ~ 400px: hidden<br />
        400 ~ 600px: span 1<br />
        600 ~ 800px: span 2<br />
        800px +: span 3
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="green">2</div>
    </n-grid-item>
  </n-grid>
</template>
```

### Collapse with Suffix

```vue
<template>
  <n-grid
    :cols="5"
    :collapsed="gridCollapsed"
    :collapsed-rows="gridCollapsedRows"
  >
    <n-gi
      v-for="i in gridItemCount"
      :key="i"
      :class="i % 2 ? 'green' : 'light-green'"
    >
      {{ i }}
    </n-gi>
    <n-gi v-if="showSuffix" suffix class="suffix" #="{ overflow }">
      {{ overflow ? 'Node Overflows Exists' : 'No Node Overflows' }}
    </n-gi>
  </n-grid>
</template>
```

### Avoid SSR Layout Shift

```vue
<template>
  <n-grid :x-gap="12" :y-gap="12" :cols="4" layout-shift-disabled>
    <n-gi>
      <div class="light-green" />
    </n-gi>
    <n-gi :span="2">
      <div class="green" />
    </n-gi>
    <n-gi>
      <div class="light-green" />
    </n-gi>
  </n-grid>
</template>
```

### Span Multiple Columns

```vue
<template>
  <n-grid :cols="4" :x-gap="12">
    <n-gi :span="2">
      <div class="green">Span 2</div>
    </n-gi>
    <n-gi>
      <div class="light-green">Span 1</div>
    </n-gi>
    <n-gi>
      <div class="light-green">Span 1</div>
    </n-gi>
  </n-grid>
</template>
```

## Best Practices

1. **Use n-grid over n-legacy-grid**: Prefer the CSS Grid-based component for modern browsers

2. **Encapsulation warning**: `n-grid-item` can't be encapsulated in another component

3. **SSR considerations**: Use `layout-shift-disabled` to avoid SSR layout shift if you don't need responsive functionality

4. **Responsive breakpoints**: Customize breakpoints in `n-config-provider`

5. **Hidden items**: Set `span` to 0 to hide grid items

6. **Suffix slot**: Use suffix slot for "show more" or overflow indicators
