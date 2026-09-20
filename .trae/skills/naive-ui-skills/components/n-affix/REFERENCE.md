---
name: 'n-affix'
description: 'Affix component that makes content stick to fixed places when scrolling. Invoke when user needs to implement sticky positioning or fixed elements in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Affix Component

Affix can make content stick to fixed places when scrolling. It's similar to `position: sticky` but can do more things.

## When to Use

Use this component when:

- **Sticky navigation**: Keep navigation visible while scrolling
- **Floating sidebars**: Fix sidebars when scrolling past a certain point
- **Persistent controls**: Keep action buttons visible during scroll
- **Table headers**: Pin table headers while scrolling through data

## When to Invoke

Invoke this skill when:

- User needs to implement sticky positioning for elements
- User wants elements to remain visible during page scroll
- User needs to control affix behavior based on scroll position
- User wants to affix content to top or bottom of viewport
- User asks about scroll-based positioning

## Features

- **Top Affixing**: Stick content to top when scrolling past trigger point
- **Bottom Affixing**: Stick content to bottom when scrolling past trigger point
- **Custom Listen Target**: Listen to specific scrollable container
- **Position Modes**: Support both `fixed` and `absolute` positioning
- **Trigger Points**: Customizable trigger distances for affixing

## API Reference

### Affix Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bottom | `number` | `undefined` | The css bottom property after trigger bottom affix. (if not set, use `trigger-bottom` prop) |
| listen-to | `string \| HTMLElement \| Document \| Window \| (() => HTMLElement)` | `document` | The scrolling element to listen scrolling. |
| trigger-bottom | `number` | `undefined` | The distance px to bottom of target to trigger bottom affix. (if not set, use `bottom` prop) |
| trigger-top | `number` | `undefined` | The distance px to top of target to trigger top affix. (if not set, use `top` prop) |
| position | `'fixed' \| 'absolute'` | `'fixed'` | CSS position of the affix. |
| top | `number` | `undefined` | The css top property after trigger top affix. (if not set, use `trigger-top` prop) |

## Basic Usage

### Basic Top Affix

```vue
<template>
  <n-affix :top="120" :trigger-top="60">
    <n-tag>Affix Trigger Top 60px</n-tag>
  </n-affix>
</template>
```

### Bottom Affix

```vue
<template>
  <n-affix :bottom="120" :trigger-bottom="60">
    <n-tag>Affix Trigger Bottom 60px</n-tag>
  </n-affix>
</template>
```

### Custom Scroll Container

```vue
<template>
  <div ref="containerRef" class="container">
    <div class="padding" />
    <div class="content">
      <n-affix :top="120" :trigger-top="60" :listen-to="() => containerRef">
        <n-tag>Affix in Custom Container</n-tag>
      </n-affix>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 200px;
  background-color: rgba(128, 128, 128, 0.3);
  border-radius: 3px;
  overflow: auto;
}

.padding {
  height: 150px;
  width: 100%;
  background-color: rgba(128, 128, 128, 0.15);
}

.content {
  height: 600px;
}
</style>
```

## Common Patterns

### Absolute Position Mode

```vue
<template>
  <div class="absolute-anchor-container">
    <div ref="containerRef" class="container">
      <div class="padding" />
      <div class="content">
        <n-affix
          :trigger-top="50"
          position="absolute"
          :listen-to="() => containerRef"
        >
          <n-tag>Affix Trigger Top 50px</n-tag>
        </n-affix>
      </div>
    </div>
  </div>
</template>

<style scoped>
.absolute-anchor-container {
  width: 100%;
  height: 200px;
  position: relative;
}

.container {
  height: 200px;
  background-color: rgba(128, 128, 128, 0.3);
  border-radius: 3px;
  overflow: auto;
}
</style>
```

### Sticky Navigation Bar

```vue
<template>
  <n-affix :top="0" :trigger-top="0">
    <n-menu mode="horizontal" :options="menuOptions" />
  </n-affix>
</template>
```

### Affix with Both Top and Bottom

```vue
<template>
  <div ref="containerRef" class="container">
    <n-row>
      <n-col :span="12">
        <n-affix :top="120" :trigger-top="60" :listen-to="() => containerRef">
          <n-tag>Top Affix</n-tag>
        </n-affix>
      </n-col>
      <n-col :span="12">
        <n-affix
          :bottom="120"
          :trigger-bottom="60"
          :listen-to="() => containerRef"
        >
          <n-tag>Bottom Affix</n-tag>
        </n-affix>
      </n-col>
    </n-row>
  </div>
</template>
```

## Best Practices

1. **Choose appropriate position mode**: Use `fixed` for document-level scrolling, `absolute` for container-level scrolling

2. **Set proper trigger points**: `trigger-top` and `top` work together - trigger-top is when affixing starts, top is the final position

3. **Use listen-to for nested scrolling**: When scrolling within a specific container, always set `listen-to` prop

4. **Avoid layout shifts**: Account for the space that will be occupied when element becomes affixed

5. **Combine with other components**: Works well with Menu, Anchor, and navigation components
