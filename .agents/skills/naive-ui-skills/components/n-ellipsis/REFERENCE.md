---
name: 'n-ellipsis'
description: 'Text ellipsis component for truncating long text with tooltip support. Invoke when user needs to handle text overflow, multi-line truncation, or expandable text in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Ellipsis Component

Text truncation component that handles overflow with tooltip and expand functionality.

## When to Use

Use this component when:

- **Text overflow**: Truncate long text that exceeds container width
- **Multi-line truncation**: Limit text to specific number of lines
- **Expandable content**: Allow users to expand truncated text on click
- **Tooltip preview**: Show full content in tooltip on hover

## When to Invoke

Invoke this skill when:

- User needs to truncate long text strings
- User wants multi-line text ellipsis with line-clamp
- User needs expandable text with click trigger
- User wants custom tooltip content for truncated text
- User has performance concerns with many ellipsis instances

## Features

- **Single Line Ellipsis**: Basic text truncation with default tooltip
- **Line Clamp**: Multi-line text truncation (check browser compatibility)
- **Expand Trigger**: Click to expand truncated text
- **Custom Tooltip**: Customize tooltip content via slot
- **Performant Variant**: `n-performant-ellipsis` for better render performance

## API Reference

### Ellipsis Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| expand-trigger | `'click'` | `undefined` | Trigger event to expand truncated text to full content. |
| line-clamp | `number \| string` | `undefined` | Maximum number of lines to display. |
| tooltip | `boolean \| TooltipProps` | `true` | Tooltip properties or disable tooltip. |

### PerformantEllipsis Props

Same as Ellipsis props. Available since version 2.35.0.

### Ellipsis Slots

| Name    | Parameters | Description                  |
| ------- | ---------- | ---------------------------- |
| default | `()`       | The content to be truncated. |
| tooltip | `()`       | Custom tooltip content.      |

## Basic Usage

### Single Line Ellipsis

```vue
<template>
  <n-ellipsis style="max-width: 240px">
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
    doloremque laudantium, totam rem aperiam
  </n-ellipsis>
</template>
```

### Multi-line Ellipsis (Line Clamp)

```vue
<template>
  <n-ellipsis :line-clamp="2">
    Lorem ipsum dolor sit amet,<br />
    consectetur adipiscing elit,<br />
    sed do eiusmod tempor incididunt<br />
    ut labore et dolore magna aliqua.<br />
    Ut enim ad minim veniam,<br />
    quis nostrud exercitation ullamco
  </n-ellipsis>
</template>
```

### Expandable Text

```vue
<template>
  <n-ellipsis expand-trigger="click" line-clamp="2" :tooltip="false">
    Lorem ipsum dolor sit amet,<br />
    consectetur adipiscing elit,<br />
    sed do eiusmod tempor incididunt<br />
    ut labore et dolore magna aliqua.<br />
    Ut enim ad minim veniam,<br />
    quis nostrud exercitation ullamco
  </n-ellipsis>
</template>
```

### Custom Tooltip Content

```vue
<template>
  <n-ellipsis style="max-width: 240px">
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
    doloremque laudantium, totam rem aperiam
    <template #tooltip>
      <div style="text-align: center">
        <i>Lorem Ipsum</i><br />
        Sed ut perspiciatis unde omnis<br />
        iste natus error sit voluptatem accusantium doloremque laudantium,<br />
        totam rem aperiam
      </div>
    </template>
  </n-ellipsis>
</template>
```

### Performant Ellipsis

```vue
<template>
  <n-performant-ellipsis style="max-width: 240px">
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
    doloremque laudantium, totam rem aperiam
  </n-performant-ellipsis>
</template>
```

## Common Patterns

### In Table Cells

```vue
<template>
  <n-data-table :columns="columns" :data="data" />
</template>

<script setup>
import { h } from 'vue';
import { NEllipsis } from 'naive-ui';

const columns = [
  {
    title: 'Description',
    key: 'description',
    render(row) {
      return h(
        NEllipsis,
        { style: 'max-width: 200px' },
        { default: () => row.description },
      );
    },
  },
];
</script>
```

### With Dynamic Max Width

```vue
<template>
  <n-ellipsis :style="{ maxWidth: maxWidth + 'px' }">
    {{ longText }}
  </n-ellipsis>
</template>

<script setup>
import { ref } from 'vue';

const maxWidth = ref(200);
const longText = 'Very long text content here...';
</script>
```

### Tooltip with Rich Content

```vue
<template>
  <n-ellipsis style="max-width: 300px">
    {{ truncatedContent }}
    <template #tooltip>
      <n-card size="small" :bordered="false">
        <n-text strong>{{ title }}</n-text>
        <n-p>{{ fullContent }}</n-p>
      </n-card>
    </template>
  </n-ellipsis>
</template>
```

## Best Practices

1. **Set max-width**: Always set a max-width or width constraint for single-line ellipsis

   ```vue
   <n-ellipsis style="max-width: 200px">Long text...</n-ellipsis>
   ```

2. **Use line-clamp for multi-line**: Combine with line-clamp for paragraph truncation

   ```vue
   <n-ellipsis :line-clamp="3">Multi-line content...</n-ellipsis>
   ```

3. **Disable tooltip when expanding**: Set `:tooltip="false"` when using expand-trigger

   ```vue
   <n-ellipsis expand-trigger="click" :tooltip="false" :line-clamp="2">
     Content...
   </n-ellipsis>
   ```

4. **Use performant variant for lists**: Use `n-performant-ellipsis` when rendering many instances
   - Note: Inner components may unmount/remount, use carefully

5. **Check browser compatibility**: Line-clamp may not work in all browsers
   - See [caniuse](https://caniuse.com/?search=line-clamp) for compatibility

6. **Custom tooltip for formatted content**: Use the tooltip slot for rich formatting
