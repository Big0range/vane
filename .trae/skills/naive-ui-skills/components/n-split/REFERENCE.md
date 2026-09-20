---
name: 'n-split'
description: 'Split panel component for resizable split layouts. Invoke when user needs to implement resizable split views, pane layouts, or divider-based layouts in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Split Component

The flexible layout tool provides the possibility of customizing the interface layout with resizable panes.

## When to Use

Use this component when:

- **Split views**: Create resizable split panel layouts
- **Code editors**: Build editor-style layouts with resizable panes
- **File explorers**: Create sidebar + content layouts
- **Dashboard panels**: Implement resizable dashboard sections

## When to Invoke

Invoke this skill when:

- User needs to implement a resizable split layout
- User wants to create horizontal or vertical split panes
- User needs nested split layouts
- User wants to control split size programmatically
- User asks about drag-to-resize functionality

## Features

- **Direction Control**: Horizontal or vertical split
- **Resizable**: Drag to resize panes
- **Nested Support**: Nested split layouts
- **Size Control**: Controlled or uncontrolled mode
- **Min/Max Limits**: Set minimum and maximum split thresholds
- **Custom Trigger**: Customizable resize trigger
- **Events**: Drag start, move, and end events

## API Reference

### Split Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| default-size | `number \| string` | `0.5` | Default split size. Number in 0~1, string in `${number}px` format. |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | The direction of the split. |
| disabled | `boolean` | `false` | Whether to disable the split. |
| max | `string \| number` | `1` | Maximum split threshold. |
| min | `string \| number` | `0` | Minimum split threshold. |
| pane1-class | `string` | `undefined` | Class name of the first pane. |
| pane1-style | `Object \| string` | `undefined` | Style of the first pane. |
| pane2-class | `string` | `undefined` | Class name of the second pane. |
| pane2-style | `Object \| string` | `undefined` | Style of the second pane. |
| resize-trigger-size | `number` | `3` | Size of the resize trigger. |
| size | `string \| number` | `undefined` | Controlled split size. |
| watch-props | `Array<'defaultSize'>` | `undefined` | Props to watch for updates. |
| on-drag-start | `(e: Event) => void` | `undefined` | Callback when drag starts. |
| on-drag-move | `(e: Event) => void` | `undefined` | Callback when dragging. |
| on-drag-end | `(e: Event) => void` | `undefined` | Callback when drag ends. |
| on-update:size | `(value: string \| number) => void` | `undefined` | Callback on size changes. |

### Split Slots

| Name           | Parameters | Description              |
| -------------- | ---------- | ------------------------ |
| 1              | `()`       | The first pane content.  |
| 2              | `()`       | The second pane content. |
| resize-trigger | `()`       | Split bar content.       |

## Basic Usage

### Basic Horizontal Split

```vue
<template>
  <n-split direction="horizontal" style="height: 200px" :max="0.75" :min="0.25">
    <template #1>
      <div :style="{ height: '200px', background: 'rgba(0,128,0,0.2)' }">
        Pane 1
      </div>
    </template>
    <template #2>
      <div :style="{ height: '200px', background: 'rgba(0,128,0,0.4)' }">
        Pane 2
      </div>
    </template>
  </n-split>
</template>
```

### Vertical Layout

```vue
<template>
  <n-split direction="vertical" style="height: 200px">
    <template #1>
      <div :style="{ height: '100%', background: 'rgba(0,128,0,0.2)' }">
        Pane 1
      </div>
    </template>
    <template #2>
      <div :style="{ height: '100%', background: 'rgba(0,128,0,0.4)' }">
        Pane 2
      </div>
    </template>
  </n-split>
</template>
```

## Common Patterns

### Nested Layout

```vue
<template>
  <n-split direction="horizontal" style="height: 200px">
    <template #1> Pane 1 </template>
    <template #2>
      <n-split direction="vertical">
        <template #1> Pane 2-1 </template>
        <template #2> Pane 2-2 </template>
      </n-split>
    </template>
  </n-split>
</template>
```

### With Events

```vue
<template>
  <n-split
    direction="horizontal"
    style="height: 200px"
    @drag-start="handleOnDragStart"
    @drag-move="handleOnDragMove"
    @drag-end="handleOnDragEnd"
  >
    <template #1> Pane 1 </template>
    <template #2> Pane 2 </template>
  </n-split>
</template>

<script setup>
const handleOnDragStart = e => {
  console.log('Drag start', e);
};
const handleOnDragMove = e => {
  console.log('Drag move', e);
};
const handleOnDragEnd = e => {
  console.log('Drag end', e);
};
</script>
```

### Custom Resize Trigger

```vue
<template>
  <n-split
    direction="horizontal"
    style="height: 200px"
    :default-size="0.4"
    :resize-trigger-size="16"
    :min="0.25"
    :max="0.75"
  >
    <template #1> Pane 1 </template>
    <template #2> Pane 2 </template>
    <template #resize-trigger>
      <div
        style="width: 16px; height: 100%; background: #ccc; display: flex; align-items: center; justify-content: center;"
      >
        ⋮
      </div>
    </template>
  </n-split>
</template>
```

### Controlled Mode

```vue
<template>
  <n-flex vertical>
    <n-input-number
      v-model:value="split"
      :step="0.1"
      clearable
      :max="1"
      :min="0"
    />
    <n-split v-model:size="split" style="height: 200px">
      <template #1>
        <div style="width: 100%; height: 100%; background: #000" />
      </template>
      <template #2>
        <div style="width: 100%; height: 100%; background: #fff" />
      </template>
    </n-split>
  </n-flex>
</template>

<script setup>
import { ref } from 'vue';

const split = ref(0.5);
</script>
```

### Fixed Size with Pixel

```vue
<template>
  <n-split default-size="200px" min="100px" max="400px" style="height: 200px">
    <template #1>
      <div style="background: rgba(0,128,0,0.2); height: 100%">Fixed 200px</div>
    </template>
    <template #2>
      <div style="background: rgba(0,128,0,0.4); height: 100%">Remaining</div>
    </template>
  </n-split>
</template>
```

## Best Practices

1. **Set height**: Always set a fixed height for the split container

2. **Min/Max constraints**: Use min and max props to prevent panes from becoming too small or large

3. **Controlled mode**: Use v-model:size for programmatic control

4. **Nested splits**: Combine horizontal and vertical splits for complex layouts

5. **Custom trigger**: Customize resize trigger for better UX

6. **Pixel or percentage**: Use pixel values for fixed-size panes, percentage for flexible layouts
