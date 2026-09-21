---
name: 'n-legacy-grid'
description: 'Legacy grid system based on row and column layout. Invoke when user needs to implement traditional 24-column grid layouts in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Legacy Grid Component

A basic grid system based on traditional row and column layout. At most of time you should use Grid (n-grid) instead.

## When to Use

Use this component when:

- **Legacy projects**: Maintaining older codebases that use traditional grid
- **Simple grids**: Basic row-column layouts without responsive needs
- **Browser compatibility**: When CSS Grid support is not available

## When to Invoke

Invoke this skill when:

- User needs to implement a traditional row-column grid
- User wants to use push/pull for column reordering
- User needs basic offset functionality
- User asks about legacy grid system

## Features

- **24-Column System**: Standard 24-column grid
- **Gutter Support**: Horizontal and vertical gutters
- **Offset**: Column offset support
- **Push & Pull**: Column reordering with push/pull
- **Simple API**: Straightforward row and column structure

## API Reference

### Row Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| gutter | `number \| string \| [number, number] \| [string, string]` | `0` | `horizontal gutter` or `[horizontal gutter, vertical gutter]` |

### Col Props

| Name   | Type     | Default | Description                     |
| ------ | -------- | ------- | ------------------------------- |
| span   | `number` | `1`     | Number of columns to span       |
| offset | `number` | `0`     | Number of columns to offset     |
| push   | `number` | `0`     | Number of columns to push right |
| pull   | `number` | `0`     | Number of columns to pull left  |

## Basic Usage

### Basic Grid

```vue
<template>
  <n-row gutter="12">
    <n-col :span="6">
      <div class="light-green" />
    </n-col>
    <n-col :span="6">
      <div class="green" />
    </n-col>
    <n-col :span="6">
      <div class="light-green" />
    </n-col>
    <n-col :span="6">
      <div class="green" />
    </n-col>
  </n-row>
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

### Gutter

```vue
<template>
  <n-row :gutter="[12, 8]">
    <n-col :span="6">
      <div class="light-green" />
    </n-col>
    <n-col :span="6">
      <div class="green" />
    </n-col>
    <n-col :span="6">
      <div class="light-green" />
    </n-col>
    <n-col :span="6">
      <div class="green" />
    </n-col>
  </n-row>
</template>
```

### Offset

```vue
<template>
  <n-row :gutter="12">
    <n-col :span="6" :offset="6">
      <div class="light-green" />
    </n-col>
    <n-col :span="6" :offset="6">
      <div class="green" />
    </n-col>
  </n-row>
</template>
```

## Common Patterns

### Push & Pull

```vue
<template>
  <n-row :gutter="12">
    <n-col :span="6" :push="6">
      <div class="light-green">Pushed 6</div>
    </n-col>
    <n-col :span="6" :pull="6">
      <div class="green">Pulled 6</div>
    </n-col>
    <n-col :span="6">
      <div class="light-green">Normal</div>
    </n-col>
    <n-col :span="6">
      <div class="green">Normal</div>
    </n-col>
  </n-row>
</template>
```

### Full Width Column

```vue
<template>
  <n-row :gutter="12">
    <n-col :span="24">
      <div class="green">Full Width</div>
    </n-col>
  </n-row>
</template>
```

### Mixed Column Sizes

```vue
<template>
  <n-row :gutter="12">
    <n-col :span="8">
      <div class="light-green">Span 8</div>
    </n-col>
    <n-col :span="8">
      <div class="green">Span 8</div>
    </n-col>
    <n-col :span="4">
      <div class="light-green">Span 4</div>
    </n-col>
    <n-col :span="4">
      <div class="green">Span 4</div>
    </n-col>
  </n-row>
</template>
```

### Nested Rows

```vue
<template>
  <n-row :gutter="12">
    <n-col :span="12">
      <n-row :gutter="8">
        <n-col :span="12">
          <div class="light-green">Nested 1</div>
        </n-col>
        <n-col :span="12">
          <div class="green">Nested 2</div>
        </n-col>
      </n-row>
    </n-col>
    <n-col :span="12">
      <div class="light-green">Main Column</div>
    </n-col>
  </n-row>
</template>
```

## Best Practices

1. **Prefer n-grid**: At most of time you should use the newer Grid component based on CSS Grid

2. **Use for legacy support**: Use legacy grid when maintaining older projects

3. **Gutter format**: Use array format `[horizontal, vertical]` for both directions

4. **Push/Pull for reordering**: Use push and pull for visual reordering without changing DOM order

5. **24-column system**: Remember the total is 24 columns

6. **Span calculation**: Ensure total span in a row doesn't exceed 24
