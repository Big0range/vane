---
name: 'n-virtual-list'
description: 'Virtual list component for efficient rendering of large lists. Invoke when user needs to implement high-performance lists with thousands of items in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Virtual List Component

When it comes to virtual lists, it can feel like a list is infinitely long, but in reality it just secretly hides the invisible elements. Perfect for rendering large datasets efficiently.

## When to Use

Use this component when:

- **Large lists**: Render lists with thousands of items efficiently
- **Chat messages**: Display large message histories
- **Data tables**: Show large datasets without performance issues
- **Infinite scroll**: Implement virtual scrolling for better performance

## When to Invoke

Invoke this skill when:

- User needs to render large lists efficiently
- User wants to implement virtual scrolling
- User needs dynamic item sizes
- User wants to scroll to specific items programmatically
- User asks about performance optimization for large lists

## Features

- **Virtual Rendering**: Only renders visible items for performance
- **Fixed or Dynamic Size**: Support for fixed or dynamic item heights
- **Programmatic Scroll**: Scroll to index, key, or position
- **Keep-alive Support**: Preserve scroll state with keep-alive
- **Resizable Items**: Dynamic item size calculation
- **Scrollbar Integration**: Built-in scrollbar support

## API Reference

### Virtual List Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| default-scroll-key | `string \| number` | `undefined` | Default scroll key. |
| default-scroll-index | `number` | `undefined` | Default scroll index. |
| ignore-item-resize | `boolean` | `false` | Ignore item resize for slightly better performance. |
| items | `Array<object>` | `[]` | Data to display. |
| item-resizable | `boolean` | `false` | Whether dynamic sizing is enabled. |
| item-size | `number` | required | Minimum height of the item in pixels. |
| items-style | `string \| CSSProperties` | `undefined` | Items container style. |
| key-field | `string` | `'key'` | Field name of option key. |
| padding-top | `string \| number` | `undefined` | Distance from the top. |
| padding-bottom | `string \| number` | `undefined` | Distance from the bottom. |
| scrollbar-props | `ScrollbarProps` | `undefined` | Scrollbar props. |
| visible-items-tag | `string` | `'div'` | Items container tag. |
| visible-items-props | `object` | `undefined` | Items container props. |
| on-scroll | `(event: Event) => void` | `undefined` | Scrolling callback function. |
| on-wheel | `(event: WheelEvent) => void` | `undefined` | Callback for wheel event. |
| on-resize | `(event: ResizeObserverEntry) => void` | `undefined` | Element resizing callback. |

### Virtual List Methods

| Name     | Type       | Description           |
| -------- | ---------- | --------------------- |
| scrollTo | `ScrollTo` | Scroll to a position. |

#### ScrollTo Type

```ts
interface ScrollTo {
  (x: number, y: number): void;
  (options: {
    left?: number;
    top?: number;
    behavior?: ScrollBehavior;
    debounce?: boolean;
  }): void;
  (options: {
    index: number;
    behavior?: ScrollBehavior;
    debounce?: boolean;
  }): void;
  (options: {
    key: string | number;
    behavior?: ScrollBehavior;
    debounce?: boolean;
  }): void;
  (options: {
    position: 'top' | 'bottom';
    behavior?: ScrollBehavior;
    debounce?: boolean;
  }): void;
}
```

## Basic Usage

### Fixed Size Items

```vue
<template>
  <n-virtual-list style="max-height: 240px" :item-size="42" :items="items">
    <template #default="{ item }">
      <div :key="item.key" class="item" style="height: 42px">
        <img class="avatar" :src="item.avatar" alt="" />
        <span>{{ item.value }}</span>
      </div>
    </template>
  </n-virtual-list>
</template>

<script setup>
import { ref } from 'vue';

const items = ref(
  Array.from({ length: 1000 }).map((_, i) => ({
    key: i,
    value: `Item ${i}`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
  })),
);
</script>

<style scoped>
.item {
  display: flex;
  align-items: center;
}
.avatar {
  width: 28px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
```

### Dynamic Size Items

```vue
<template>
  <n-virtual-list
    style="max-height: 240px"
    :item-size="42"
    :items="items"
    item-resizable
  >
    <template #default="{ item, index }">
      <div :key="item.key" class="item">
        <img class="avatar" :src="item.avatar" alt="" />
        <span>{{ index }} - {{ item.message }}</span>
      </div>
    </template>
  </n-virtual-list>
</template>
```

## Common Patterns

### Scroll to Position

```vue
<template>
  <n-space vertical>
    <n-space>
      <n-button @click="handleScrollToKey"> Scroll to Key </n-button>
      <n-button @click="handleScrollToPosition"> Scroll to Position </n-button>
      <n-button @click="handleScrollToIndex"> Scroll to Index </n-button>
      <n-button @click="handleScrollToDistance"> Scroll to Distance </n-button>
    </n-space>
    <n-virtual-list
      ref="virtualListInst"
      style="max-height: 240px"
      :item-size="42"
      :items="items"
      item-resizable
    >
      <template #default="{ item, index }">
        <div :key="item.key" class="item" style="height: 42px">
          <img class="avatar" :src="item.avatar" alt="" />
          <span>{{ index }}</span>
        </div>
      </template>
    </n-virtual-list>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const virtualListInst = ref(null);
const items = ref([]);

const handleScrollToKey = () => {
  virtualListInst.value?.scrollTo({ key: 500, behavior: 'smooth' });
};

const handleScrollToPosition = () => {
  virtualListInst.value?.scrollTo({ top: 1000, behavior: 'smooth' });
};

const handleScrollToIndex = () => {
  virtualListInst.value?.scrollTo({ index: 200, behavior: 'smooth' });
};

const handleScrollToDistance = () => {
  virtualListInst.value?.scrollTo({ position: 'bottom', behavior: 'smooth' });
};
</script>
```

### Keep State with Keep-alive

```vue
<template>
  <n-space vertical>
    <n-button @click="showVirtualList = !showVirtualList">
      Toggle visibility
    </n-button>
    <keep-alive>
      <n-virtual-list
        v-if="showVirtualList"
        style="max-height: 240px"
        :item-size="42"
        :items="items"
        item-resizable
      >
        <template #default="{ item, index }">
          <div :key="item.key" class="item" style="height: 42px">
            <img class="avatar" :src="item.avatar" alt="" />
            <span>{{ index }}</span>
          </div>
        </template>
      </n-virtual-list>
    </keep-alive>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const showVirtualList = ref(true);
const items = ref([]);
</script>
```

### With Custom Scrollbar

```vue
<template>
  <n-virtual-list
    style="max-height: 240px"
    :item-size="42"
    :items="items"
    :scrollbar-props="{ trigger: 'none', size: 10 }"
  >
    <template #default="{ item, index }">
      <div :key="item.key" style="height: 42px; padding: 8px">
        {{ index }}: {{ item.value }}
      </div>
    </template>
  </n-virtual-list>
</template>
```

### Chat Message List

```vue
<template>
  <n-virtual-list
    ref="chatListRef"
    style="height: 400px"
    :item-size="60"
    :items="messages"
    item-resizable
    :default-scroll-index="messages.length - 1"
  >
    <template #default="{ item }">
      <div :key="item.id" class="message">
        <div class="sender">{{ item.sender }}</div>
        <div class="content">{{ item.content }}</div>
      </div>
    </template>
  </n-virtual-list>
</template>

<script setup>
import { ref } from 'vue';

const messages = ref([
  { id: 1, sender: 'Alice', content: 'Hello!' },
  { id: 2, sender: 'Bob', content: 'Hi there!' },
]);
</script>
```

## Best Practices

1. **Set item-size**: Always provide a reasonable `item-size` estimate for better scroll calculation

2. **Use item-resizable**: Enable `item-resizable` when items have variable heights

3. **Unique keys**: Ensure each item has a unique key field

4. **Performance**: Use `ignore-item-resize` if items don't resize for slightly better performance

5. **Keep-alive**: Use keep-alive to preserve scroll state when toggling visibility

6. **Debounce scroll**: Use `debounce: true` in scrollTo for smoother scrolling

7. **Scrollbar props**: Customize scrollbar via `scrollbar-props`
