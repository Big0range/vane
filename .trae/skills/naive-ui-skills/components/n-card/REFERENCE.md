---
name: 'n-card'
description: 'Card component for displaying content in a contained, organized manner. Invoke when user needs to implement content cards, panels, or customizable containers in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Card Component

Card component for displaying content in a contained, organized manner with multiple slots and customization options.

## When to Use

Use this component when:

- **Content organization**: Group related content in a visually distinct container
- **Dashboard panels**: Display statistics, charts, or summary information
- **Form containers**: Wrap forms in a card for better visual separation
- **Image cards**: Display images with titles and descriptions
- **Modal content**: Use as content container in modals or dialogs

## When to Invoke

Invoke this skill when:

- User needs to implement a card layout
- User wants to create cards with headers, footers, or actions
- User needs closable cards for modal-like behavior
- User wants to customize card styling (bordered, embedded, hoverable)
- User needs scrollable content within cards
- User asks about card segmentation or slots

## Features

- **Multiple Sizes**: small, medium, large, huge
- **Slot System**: cover, header, header-extra, default, footer, action
- **Border Options**: bordered or borderless
- **Hover Effects**: Shadow effect on hover
- **Closable**: Close button with callback
- **Segmented**: Visual separation between sections
- **Embedded Style**: Darker background for embedding effect
- **Content Scrollable**: Fixed header/footer with scrollable content
- **Custom Styling**: Custom styles for header, content, footer areas

## API Reference

### Card Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| action | `() => VNodeChild` | `undefined` | Operating area content, must be a render function. |
| bordered | `boolean` | `true` | Whether to show the card border. |
| closable | `boolean` | `false` | Is it allowed to close. |
| close-focusable | `boolean` | `false` | Whether the close button can be focused. |
| content | `string \| (() => VNodeChild)` | `undefined` | Card content, can be a render function. |
| content-class | `string` | `undefined` | The class of the card content area. |
| content-scrollable | `boolean` | `false` | Whether only the card content area is scrollable. |
| content-style | `Object \| string` | `undefined` | The style of the card content area. |
| cover | `() => VNodeChild` | `undefined` | Cover content, must be a render function. |
| embedded | `boolean` | `false` | Use a darker background color to show the embedding effect. |
| footer | `() => VNodeChild` | `undefined` | Footer content, must be a render function. |
| footer-class | `string` | `undefined` | The class of the bottom area of the card. |
| footer-style | `Object \| string` | `undefined` | The style of the bottom area of the card. |
| header-class | `string` | `undefined` | The class of the card head area. |
| header-style | `Object \| string` | `undefined` | The style of the card head area. |
| header-extra | `() => VNodeChild` | `undefined` | Header extra content, must be a render function. |
| header-extra-class | `string` | `undefined` | The class of the card head extra area. |
| header-extra-style | `Object \| string` | `undefined` | The style of the card head extra area. |
| hoverable | `boolean` | `false` | Whether to show shadow when hovering on the card. |
| segmented | `boolean \| { [part in 'content' \| 'footer' \| 'action']?: boolean \| 'soft' }` | `false` | Segment divider settings of the card. |
| size | `'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` | Card size. |
| tag | `string` | `'div'` | What tag need the card be rendered as. |
| title | `string \| (() => VNodeChild)` | `undefined` | Card title. |
| on-close | `() => void` | `undefined` | Callback function triggered upon closing the card. |

### Card Slots

| Name         | Parameters | Description             |
| ------------ | ---------- | ----------------------- |
| cover        | `()`       | Cover content.          |
| header       | `()`       | Header content.         |
| header-extra | `()`       | Header extra content.   |
| default      | `()`       | Card content.           |
| footer       | `()`       | Footer content.         |
| action       | `()`       | Operating area content. |

## Basic Usage

### Basic Card

```vue
<template>
  <n-card title="Card"> Card Content </n-card>
</template>

<style scoped>
.n-card {
  max-width: 300px;
}
</style>
```

### Card Sizes

```vue
<template>
  <n-space vertical>
    <n-card title="Small Card" size="small"> Card Content </n-card>
    <n-card title="Medium Card" size="medium"> Card Content </n-card>
    <n-card title="Large Card" size="large"> Card Content </n-card>
    <n-card title="Huge Card" size="huge"> Card Content </n-card>
  </n-space>
</template>
```

### Card with Cover

```vue
<template>
  <n-card title="Card with Cover">
    <template #cover>
      <img src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
    </template>
    Card Content
  </n-card>
</template>
```

### Hoverable Card

```vue
<template>
  <n-card title="Card" hoverable> Card Content </n-card>
</template>
```

### Borderless Card

```vue
<template>
  <n-card :bordered="false" title="Borderless Card"> Card Content </n-card>
</template>
```

### Closable Card

```vue
<template>
  <n-card title="Card" closable @close="handleClose"> Card Content </n-card>
</template>

<script setup>
const handleClose = () => {
  console.log('Card closed');
};
</script>
```

### Segmented Card

```vue
<template>
  <n-card
    title="Card Segmented Demo"
    :segmented="{
      content: true,
      footer: 'soft',
    }"
  >
    <template #header-extra> Extra </template>
    Card Content
    <template #footer> Footer </template>
  </n-card>
</template>
```

### Embedded Card

```vue
<template>
  <n-card title="Embedded Card" embedded :bordered="false">
    Content with embedded effect
  </n-card>
</template>
```

## Common Patterns

### Card with All Slots

```vue
<template>
  <n-card title="Card Slots Demo">
    <template #cover>
      <img src="https://example.com/cover.jpg" />
    </template>
    <template #header> Custom Header </template>
    <template #header-extra>
      <n-button size="small">Action</n-button>
    </template>
    Main content goes here
    <template #footer> Footer content </template>
    <template #action>
      <n-space>
        <n-button>Action 1</n-button>
        <n-button>Action 2</n-button>
      </n-space>
    </template>
  </n-card>
</template>
```

### Scrollable Content Card

```vue
<template>
  <n-card
    title="Task List"
    content-scrollable
    style="max-height: 280px"
    segmented
  >
    <p v-for="i in 20" :key="i" style="margin: 0 0 8px 0">
      Task {{ i }}: only content area scrolls.
    </p>
    <template #footer> Footer actions stay fixed </template>
  </n-card>
</template>
```

### Loading Card

```vue
<template>
  <n-space vertical>
    <n-switch v-model:value="loading" />
    <n-card>
      <template #header>
        <n-skeleton v-if="loading" text width="60%" />
        <template v-else> Lorem Ipsum </template>
      </template>
      <n-skeleton v-if="loading" text :repeat="2" />
      <template v-else> Content goes here </template>
    </n-card>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const loading = ref(true);
</script>
```

### Card with Tabs

```vue
<template>
  <n-card content-style="padding: 0;">
    <n-tabs
      type="line"
      size="large"
      :tabs-padding="20"
      pane-style="padding: 20px;"
    >
      <n-tab-pane name="tab1"> Tab 1 Content </n-tab-pane>
      <n-tab-pane name="tab2"> Tab 2 Content </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
```

### Card Grid

```vue
<template>
  <n-grid :cols="3" :x-gap="16" :y-gap="16">
    <n-gi v-for="item in items" :key="item.id">
      <n-card :title="item.title" hoverable>
        {{ item.content }}
      </n-card>
    </n-gi>
  </n-grid>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([
  { id: 1, title: 'Card 1', content: 'Content 1' },
  { id: 2, title: 'Card 2', content: 'Content 2' },
  { id: 3, title: 'Card 3', content: 'Content 3' },
]);
</script>
```

### Closable Card with Animation

```vue
<template>
  <n-card
    v-if="visible"
    title="Closable Card"
    closable
    @close="visible = false"
  >
    This card can be closed
  </n-card>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(true);
</script>
```

## Best Practices

1. **Use appropriate sizes**: Match card size with content density
   - Small for compact information
   - Medium for standard content
   - Large/Huge for complex layouts

2. **Use hoverable for interactive cards**: Add hover effect for clickable cards

   ```vue
   <n-card hoverable @click="handleClick">
     Clickable content
   </n-card>
   ```

3. **Use segmented for visual separation**: Separate header, content, and footer

   ```vue
   <n-card :segmented="{ content: true, footer: 'soft' }">
   ```

4. **Use embedded for nested cards**: Darker background for embedded effect

   ```vue
   <n-card embedded :bordered="false">
   ```

5. **Use content-scrollable for fixed headers**: Keep header/footer visible while scrolling

   ```vue
   <n-card content-scrollable style="max-height: 300px">
   ```

6. **Combine with skeleton for loading states**: Show loading placeholders

   ```vue
   <n-card>
     <template #header>
       <n-skeleton v-if="loading" text />
       <template v-else>{{ title }}</template>
     </template>
   </n-card>
   ```

7. **Use custom tag for semantic HTML**: Render as article, section, etc.
   ```vue
   <n-card tag="article" title="Blog Post">
   ```
