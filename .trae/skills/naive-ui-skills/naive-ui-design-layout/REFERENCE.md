---
name: 'naive-ui-design-layout'
description: 'Layout system for Naive UI including Grid, Flex, Space, and Layout components. Invoke when user needs to create responsive layouts, grid systems, or understand layout components.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Layout System

Naive UI provides a comprehensive layout system including CSS Grid-based layout, Flexbox, Space, and Layout components for building responsive page structures.

## When to Use

- Creating responsive grid layouts
- Building page structures with header, sidebar, content, and footer
- Implementing flexible layouts with Flexbox
- Adding consistent spacing between elements

---

## Grid System (n-grid)

Naive UI uses a CSS Grid-based layout system with 24 columns by default.

### Basic Concepts

- **24-column system**: Default is 24 columns, configurable
- **CSS Grid**: Uses native CSS Grid for layout
- **Responsive**: Supports responsive breakpoints
- **Flexible**: Items can span multiple columns

### Basic Grid

```vue
<template>
  <n-grid :cols="24">
    <n-gi :span="24">Full width</n-gi>
  </n-grid>

  <n-grid :cols="24">
    <n-gi :span="12">Half width</n-gi>
    <n-gi :span="12">Half width</n-gi>
  </n-grid>

  <n-grid :cols="24">
    <n-gi :span="8">One third</n-gi>
    <n-gi :span="8">One third</n-gi>
    <n-gi :span="8">One third</n-gi>
  </n-grid>
</template>
```

### Grid with Gaps

```vue
<template>
  <n-grid :cols="4" :x-gap="12" :y-gap="8">
    <n-gi v-for="i in 8" :key="i">
      <div class="item">{{ i }}</div>
    </n-gi>
  </n-grid>
</template>
```

### Responsive Grid

```vue
<template>
  <n-grid :cols="4" responsive="screen">
    <n-gi :span="4" :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
      Responsive item
    </n-gi>
  </n-grid>
</template>
```

### Grid Item Offset

```vue
<template>
  <n-grid :cols="24">
    <n-gi :span="6" :offset="6">Offset by 6</n-gi>
  </n-grid>
</template>
```

### Grid Props

| Name          | Description         | Type                 | Default  |
| ------------- | ------------------- | -------------------- | -------- |
| cols          | Number of columns   | `number \| string`   | `24`     |
| x-gap         | Horizontal gap      | `number \| string`   | `0`      |
| y-gap         | Vertical gap        | `number \| string`   | `0`      |
| responsive    | Responsive mode     | `'self' \| 'screen'` | `'self'` |
| collapsed     | Collapsed state     | `boolean`            | `false`  |
| collapsedRows | Rows when collapsed | `number`             | `1`      |

### Grid Item Props

| Name   | Description                 | Type               | Default |
| ------ | --------------------------- | ------------------ | ------- |
| span   | Number of columns to span   | `number \| string` | `1`     |
| offset | Number of columns to offset | `number`           | `0`     |
| suffix | Whether it's a suffix item  | `boolean`          | `false` |

---

## Flex Component (n-flex)

A flexible flexbox layout component.

### Basic Flex

```vue
<template>
  <n-flex>
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </n-flex>
</template>
```

### Flex with Justify

```vue
<template>
  <n-flex justify="center">
    <div>Centered</div>
  </n-flex>

  <n-flex justify="space-between">
    <div>Left</div>
    <div>Right</div>
  </n-flex>
</template>
```

### Flex Vertical

```vue
<template>
  <n-flex vertical>
    <div>Item 1</div>
    <div>Item 2</div>
  </n-flex>
</template>
```

### Flex Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| justify | Horizontal alignment | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `'start'` |
| align | Vertical alignment | `'start' \| 'end' \| 'center' \| 'stretch' \| 'baseline'` | — |
| vertical | Vertical direction | `boolean` | `false` |
| reverse | Reverse direction | `boolean` | `false` |
| wrap | Enable wrapping | `boolean` | `true` |
| inline | Inline flex | `boolean` | `false` |
| size | Gap size | `'small' \| 'medium' \| 'large' \| number \| [number, number]` | `'medium'` |

---

## Space Component (n-space)

Add consistent spacing between elements.

### Basic Space

```vue
<template>
  <n-space>
    <n-button>Button 1</n-button>
    <n-button>Button 2</n-button>
    <n-button>Button 3</n-button>
  </n-space>
</template>
```

### Space Sizes

```vue
<template>
  <n-space size="small">Small gap</n-space>
  <n-space size="medium">Medium gap</n-space>
  <n-space size="large">Large gap</n-space>
  <n-space :size="24">Custom 24px gap</n-space>
</template>
```

### Vertical Space

```vue
<template>
  <n-space vertical>
    <n-button>Top</n-button>
    <n-button>Bottom</n-button>
  </n-space>
</template>
```

### Space Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| size | Gap size | `'small' \| 'medium' \| 'large' \| number \| [number, number]` | `'small'` |
| vertical | Vertical direction | `boolean` | `false` |
| wrap | Enable wrapping | `boolean` | `true` |
| inline | Inline mode | `boolean` | `false` |

---

## Layout Components (n-layout)

Build complete page layouts with header, sidebar, content, and footer.

### Basic Layout

```vue
<template>
  <n-layout>
    <n-layout-header>Header</n-layout-header>
    <n-layout-content>Content</n-layout-content>
    <n-layout-footer>Footer</n-layout-footer>
  </n-layout>
</template>
```

### Layout with Sidebar

```vue
<template>
  <n-layout has-sider>
    <n-layout-sider>Sidebar</n-layout-sider>
    <n-layout>
      <n-layout-header>Header</n-layout-header>
      <n-layout-content>Content</n-layout-content>
      <n-layout-footer>Footer</n-layout-footer>
    </n-layout>
  </n-layout>
</template>
```

### Collapsible Sidebar

```vue
<script setup>
import { ref } from 'vue';
const collapsed = ref(false);
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      Sidebar
    </n-layout-sider>
    <n-layout-content>Content</n-layout-content>
  </n-layout>
</template>
```

### Layout Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| embedded | Embedded mode (no background) | `boolean` | `false` |
| position | Position mode | `'static' \| 'absolute'` | `'static'` |
| native-scrollbar | Use native scrollbar | `boolean` | `true` |
| has-sider | Has sidebar | `boolean` | `false` |
| sider-placement | Sidebar placement | `'left' \| 'right'` | `'left'` |

### Layout Sider Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| bordered | Show border | `boolean` | `false` |
| collapsed | Collapsed state | `boolean` | `false` |
| collapse-mode | Collapse mode | `'width' \| 'transform'` | `'transform'` |
| collapsed-width | Width when collapsed | `number` | `48` |
| width | Sidebar width | `number` | `272` |
| show-trigger | Show collapse trigger | `boolean` | `false` |

---

## Responsive Breakpoints

Naive UI uses default breakpoints for responsive design:

| Breakpoint | Screen Width |
| ---------- | ------------ |
| `xs`       | `< 640px`    |
| `s`        | `≥ 640px`    |
| `m`        | `≥ 1024px`   |
| `l`        | `≥ 1280px`   |
| `xl`       | `≥ 1536px`   |
| `xxl`      | `≥ 1920px`   |

### Using Breakpoints

```vue
<template>
  <n-grid :cols="4" responsive="screen">
    <n-gi :span="1" :xs="4" :s="2" :m="1"> Responsive grid item </n-gi>
  </n-grid>
</template>
```

---

## Best Practices

1. **Use Grid for 2D layouts**: Use `n-grid` when you need both rows and columns
2. **Use Flex for 1D layouts**: Use `n-flex` for single-row or single-column layouts
3. **Use Space for simple gaps**: Use `n-space` for consistent spacing between elements
4. **Layout composition**: Combine Layout components for full-page structures
5. **Responsive design**: Use responsive props for mobile-first design
6. **Collapsed sidebar**: Use `collapse-mode="width"` for better animation performance

---

## Related Resources

| Resource | Description |
| --- | --- |
| [Grid Component](https://www.naiveui.com/en-US/os-theme/components/grid) | Grid documentation |
| [Flex Component](https://www.naiveui.com/en-US/os-theme/components/flex) | Flex documentation |
| [Space Component](https://www.naiveui.com/en-US/os-theme/components/space) | Space documentation |
| [Layout Component](https://www.naiveui.com/en-US/os-theme/components/layout) | Layout documentation |
