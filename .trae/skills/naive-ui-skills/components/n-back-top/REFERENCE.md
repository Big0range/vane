---
name: 'n-back-top'
description: 'Back Top component for scrolling back to page top. Invoke when user needs to implement a back-to-top button or scroll-to-top functionality in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Back Top Component

It helps you back to where you were. However, time never goes back.

## When to Use

Use this component when:

- **Long pages**: Provide quick navigation back to top
- **Infinite scroll**: Allow users to return to top after scrolling deep
- **Documentation sites**: Easy navigation for long documentation pages
- **E-commerce**: Quick return to top after browsing products

## When to Invoke

Invoke this skill when:

- User needs to implement a back-to-top button
- User wants to customize back-to-top appearance
- User needs to control visibility based on scroll height
- User wants to target a specific scrollable container
- User asks about scroll-to-top functionality

## Features

- **Auto Detection**: Automatically finds first scrollable ancestor
- **Visibility Control**: Show/hide based on scroll height threshold
- **Custom Position**: Configurable right and bottom positioning
- **Custom Content**: Fully customizable button content
- **Target Listening**: Listen to specific scrollable elements

## API Reference

### BackTop Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bottom | `number \| string` | `40` | The height of BackTop from the bottom of the page |
| listen-to | `string \| HTMLElement` | `undefined` | The element to be listened to scroll event. If it is `undefined` back top will listen to the nearest scrollable parent. |
| right | `number \| string` | `40` | The width of BackTop from the right side of the page |
| show | `boolean` | `undefined` | Whether to show BackTop |
| to | `string \| HTMLElement` | `'body'` | Container node to show BackTop |
| visibility-height | `number` | `180` | BackTop's trigger scroll top. |
| on-update:show | `(value: boolean) => void` | `undefined` | Callback is triggered when back-top display changes. |

## Basic Usage

### Basic Back Top

```vue
<template>
  <n-back-top :right="100" />
</template>
```

### Custom Visibility Height

```vue
<template>
  <n-back-top
    :bottom="100"
    :visibility-height="300"
    :style="{
      transition: 'all .3s cubic-bezier(.4, 0, .2, 1)',
    }"
  >
    <div
      style="
        width: 200px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
      "
    >
      Visibility Height: 300px
    </div>
  </n-back-top>
</template>
```

### Custom Position

```vue
<template>
  <n-back-top
    :right="40"
    :bottom="160"
    :style="{
      transition: 'all .3s cubic-bezier(.4, 0, .2, 1)',
    }"
  >
    <div
      style="
        width: 200px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
      "
    >
      Change Position
    </div>
  </n-back-top>
</template>
```

## Common Patterns

### Target Specific Container

```vue
<template>
  <n-back-top
    :listen-to="target"
    :bottom="220"
    :visibility-height="10"
    :style="{
      transition: 'all .3s cubic-bezier(.4, 0, .2, 1)',
    }"
  >
    <div
      style="
        width: 200px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
      "
    >
      Specify Target
    </div>
  </n-back-top>
  <div
    ref="scrollContainer"
    style="overflow: auto; height: 72px; line-height: 1.5"
  >
    <p v-for="i in 10" :key="i">Scroll content line {{ i }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const scrollContainer = ref(null);
const target = computed(() => scrollContainer.value);
</script>
```

### Custom Icon Back Top

```vue
<template>
  <n-back-top :right="40" :bottom="80">
    <n-button circle size="large">
      <template #icon>
        <n-icon><ArrowUpIcon /></n-icon>
      </template>
    </n-button>
  </n-back-top>
</template>
```

### Controlled Visibility

```vue
<template>
  <n-back-top :show="isVisible" @update:show="handleShowChange" />
</template>

<script setup>
import { ref } from 'vue';

const isVisible = ref(false);

const handleShowChange = value => {
  isVisible.value = value;
};
</script>
```

## Best Practices

1. **Set appropriate visibility-height**: Show button only after meaningful scroll distance

2. **Position for accessibility**: Position where it won't obstruct content but is easily accessible

3. **Customize for branding**: Match button style with your application theme

4. **Use with specific containers**: Set `listen-to` for scrollable containers other than document

5. **Smooth transitions**: Add CSS transitions for better user experience

6. **Mobile considerations**: Adjust position for mobile devices to avoid obstruction
