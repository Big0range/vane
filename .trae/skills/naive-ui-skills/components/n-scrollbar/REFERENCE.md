---
name: 'n-scrollbar'
description: 'Custom scrollbar component with consistent styling. Invoke when user needs to implement custom styled scrollbars or scrollable containers in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Scrollbar Component

It looks better but it's not as reliable as native scrollbar. Provides custom styled scrollbars for consistent UI.

## When to Use

Use this component when:

- **Custom styling**: Need scrollbars that match your UI theme
- **Consistent look**: Want consistent scrollbar appearance across browsers
- **Horizontal scroll**: Need horizontal scrolling with custom scrollbar
- **Scroll position**: Need programmatic scroll control

## When to Invoke

Invoke this skill when:

- User needs to implement custom styled scrollbars
- User wants horizontal scrolling
- User needs to control scroll position programmatically
- User asks about scrollbar styling or customization

## Features

- **Custom Styling**: Consistent scrollbar appearance
- **Horizontal Scroll**: Support for horizontal scrolling
- **Trigger Modes**: Hover or always visible
- **Placement Control**: Left/right for vertical, top/bottom for horizontal
- **Scroll Methods**: Programmatic scroll control
- **Theme Customization**: Customize via theme overrides

## API Reference

### Scrollbar Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| content-class | `string` | `undefined` | Class name of content div. |
| content-style | `string \| object` | `undefined` | Style of content div. |
| size | `number` | `undefined` | Size of scrollbar. |
| trigger | `'hover' \| 'none'` | `'hover'` | Trigger of show scrollbar. `'none'` means always show. |
| x-scrollable | `boolean` | `false` | Whether it can scroll horizontally. |
| x-placement | `'top' \| 'bottom'` | `bottom` | Scrollbar placement when scrolling horizontally. |
| y-placement | `'left' \| 'right'` | `right` | Scrollbar placement when scrolling vertically. |
| on-scroll | `(e: Event) => void` | `undefined` | Callback on scroll. |

### Scrollbar Slots

| Name    | Parameters | Description     |
| ------- | ---------- | --------------- |
| default | `()`       | Scroll content. |

### Scrollbar Methods

| Name | Type | Description |
| --- | --- | --- |
| scrollBy | `(options: { left?: number, top?: number, behavior?: ScrollBehavior }): void \| (x: number, y: number) => void` | Scroll content by specific distance. |
| scrollTo | `(options: { left?: number, top?: number, behavior?: ScrollBehavior }): void \| (x: number, y: number) => void` | Scroll content. |

## Basic Usage

### Basic Scrollbar

```vue
<template>
  <n-scrollbar style="max-height: 120px">
    And as I sat there, brooding on the old unknown world, I thought of Gatsby's
    wonder when he first picked out the green light at the end of Daisy's dock.
    He had come a long way to this blue lawn and his dream must have seemed so
    close that he could hardly fail to grasp it. He did not know that it was
    already behind him, somewhere back in that vast obscurity beyond the city,
    where the dark fields of the republic rolled on under the night.<br /><br />

    Gatsby believed in the green light, the orgastic future that year by year
    recedes before us. It eluded us then, but that's no matter—tomorrow we will
    run faster, stretch out our arms farther. . . . And one fine morning——<br /><br />

    So we beat on, boats against the current, borne back ceaselessly into the
    past.
  </n-scrollbar>
</template>
```

### Horizontal Scroll

```vue
<template>
  <n-scrollbar x-scrollable>
    <div style="white-space: nowrap; padding: 12px">
      And as I sat there, brooding on the old unknown world, I thought of
      Gatsby's wonder when he first picked out the green light at the end of
      Daisy's dock. He had come a long way to this blue lawn and his dream must
      have seemed so close that he could hardly fail to grasp it.
    </div>
  </n-scrollbar>
</template>
```

### Always Visible

```vue
<template>
  <n-scrollbar style="max-height: 120px" trigger="none">
    Content that always shows the scrollbar...
  </n-scrollbar>
</template>
```

## Common Patterns

### Fix Margin-bottom Issue

```vue
<template>
  <n-scrollbar style="max-height: 120px" content-style="overflow: hidden;">
    <p style="margin-bottom: 90px">Content with margin-bottom</p>
    <p style="margin-bottom: 90px">Content with margin-bottom</p>
  </n-scrollbar>
</template>
```

### Custom Scrollbar Style

```vue
<template>
  <n-config-provider
    :theme-overrides="{
      Scrollbar: {
        width: '8px',
        railInsetHorizontal: '4px 4px 4px auto',
        borderRadius: 0,
      },
    }"
  >
    <n-scrollbar style="max-height: 120px">
      Custom styled scrollbar content...
    </n-scrollbar>
  </n-config-provider>
</template>
```

### Left Placement

```vue
<template>
  <n-scrollbar style="max-height: 120px" y-placement="left">
    Content with scrollbar on the left...
  </n-scrollbar>
</template>
```

### Top Placement for Horizontal

```vue
<template>
  <n-scrollbar x-scrollable x-placement="top" style="white-space: nowrap">
    Content with horizontal scrollbar on top...
  </n-scrollbar>
</template>
```

### Programmatic Scroll

```vue
<template>
  <n-space vertical>
    <n-button @click="scrollToTop">Scroll to Top</n-button>
    <n-button @click="scrollToBottom">Scroll to Bottom</n-button>
    <n-scrollbar ref="scrollbarRef" style="max-height: 120px">
      <div v-for="i in 20" :key="i" style="padding: 8px">Line {{ i }}</div>
    </n-scrollbar>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const scrollbarRef = ref(null);

const scrollToTop = () => {
  scrollbarRef.value?.scrollTo({ top: 0, behavior: 'smooth' });
};

const scrollToBottom = () => {
  scrollbarRef.value?.scrollTo({ top: 1000, behavior: 'smooth' });
};
</script>
```

### Both Directions

```vue
<template>
  <n-scrollbar style="height: 200px; width: 300px" x-scrollable>
    <div style="width: 600px; height: 400px; padding: 12px">
      Content that scrolls both horizontally and vertically...
    </div>
  </n-scrollbar>
</template>
```

## Best Practices

1. **Native vs Custom**: Use native scrollbar for better reliability, custom for consistent styling

2. **Set height**: Always set a max-height or height for vertical scrolling

3. **Content-style for margin issues**: Use `content-style="overflow: hidden"` to fix margin-bottom scroll issues

4. **Trigger modes**: Use `trigger="none"` for always visible, `trigger="hover"` for hover-only

5. **Custom size**: Use `size` prop or theme overrides for custom scrollbar width

6. **Placement**: Use placement props to change scrollbar position
