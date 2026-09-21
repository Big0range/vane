---
name: 'n-badge'
description: 'Badge component for displaying status indicators and notification counts. Invoke when user needs to show numerical badges, status dots, or custom badge content in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Badge Component

Badge component for displaying notification counts, status indicators, and labels on elements.

## When to Use

Use this component when:

- **Notification counts**: Display unread message counts
- **Status indicators**: Show online/offline or processing status
- **Labels**: Add labels or tags to elements
- **Visual markers**: Highlight elements with dots or numbers

## When to Invoke

Invoke this skill when:

- User needs to display notification counts on avatars or icons
- User wants to create status dot indicators
- User needs to show overflow numbers (e.g., 99+)
- User wants to customize badge colors or content
- User asks about badge positioning or visibility control

## Features

- **Multiple Types**: default, info, success, warning, error
- **Dot Mode**: Display as a small dot indicator
- **Overflow Handling**: Max value support for large numbers
- **Processing Animation**: Animated processing indicator
- **Custom Content**: Support for text or custom content
- **Custom Colors**: Customizable badge colors
- **Position Offset**: Adjustable badge position
- **Visibility Control**: Show/hide badges conditionally

## API Reference

### Badge Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| color | `string` | `undefined` | Badge color. |
| dot | `boolean` | `false` | Show badge as dot. |
| max | `number` | `undefined` | The maximum number of the badge when its value overflows. |
| offset | `[string \| number, string \| number]` | `undefined` | Offset of the badge from the left and top of the default position. |
| processing | `boolean` | `false` | Show processing status. |
| show-zero | `boolean` | `false` | Whether to display the badge, even if provided value equals 0. |
| show | `boolean` | `true` | Whether the badge should be shown altogether. |
| type | `'default' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'default'` | Type of the badge. |
| value | `string \| number` | `undefined` | Badge's value. |

### Badge Slots

| Name    | Parameters | Description                 |
| ------- | ---------- | --------------------------- |
| default | `()`       | Badge's content.            |
| value   | `()`       | Custom badge value content. |

## Basic Usage

### Basic Badge

```vue
<template>
  <n-space :size="24" align="center">
    <n-badge :value="5">
      <n-avatar />
    </n-badge>
    <n-badge :value="20">
      <n-avatar />
    </n-badge>
  </n-space>
</template>
```

### Dot Badge

```vue
<template>
  <n-space :size="24" align="center">
    <n-badge dot>
      <n-avatar />
    </n-badge>
    <n-badge dot type="error">
      <n-avatar />
    </n-badge>
    <n-badge dot type="info">
      <n-avatar />
    </n-badge>
    <n-badge dot type="success">
      <n-avatar />
    </n-badge>
    <n-badge dot type="warning">
      <n-avatar />
    </n-badge>
  </n-space>
</template>
```

### Badge Types

```vue
<template>
  <n-space :size="24" align="center">
    <n-badge :value="10" type="default">
      <n-avatar />
    </n-badge>
    <n-badge :value="10" type="error">
      <n-avatar />
    </n-badge>
    <n-badge :value="10" type="info">
      <n-avatar />
    </n-badge>
    <n-badge :value="10" type="success">
      <n-avatar />
    </n-badge>
    <n-badge :value="10" type="warning">
      <n-avatar />
    </n-badge>
  </n-space>
</template>
```

### Processing Animation

```vue
<template>
  <n-space :size="24" align="center">
    <n-badge dot processing>
      <n-avatar />
    </n-badge>
    <n-badge :value="20" processing>
      <n-avatar />
    </n-badge>
    <n-badge dot type="info" processing>
      <n-avatar />
    </n-badge>
  </n-space>
</template>
```

### Overflow Handling

```vue
<template>
  <n-space :size="24" align="center">
    <n-badge :value="99" :max="99">
      <n-avatar />
    </n-badge>
    <n-badge :value="100" :max="99">
      <n-avatar />
    </n-badge>
    <n-badge :value="1000" :max="999">
      <n-avatar />
    </n-badge>
  </n-space>
</template>
```

### Show Zero

```vue
<template>
  <n-space :size="24" align="center">
    <n-badge :value="0">
      <n-avatar />
    </n-badge>
    <n-badge :value="0" show-zero>
      <n-avatar />
    </n-badge>
  </n-space>
</template>
```

### Custom Content

```vue
<template>
  <n-space :size="24" align="center">
    <n-badge value="new">
      <n-avatar />
    </n-badge>
    <n-badge value="hot">
      <n-avatar />
    </n-badge>
    <n-badge processing>
      <n-avatar />
      <template #value>
        <n-icon :component="LockClosedOutline" />
      </template>
    </n-badge>
  </n-space>
</template>
```

### Custom Color

```vue
<template>
  <n-badge value="15" color="grey">
    <n-avatar />
  </n-badge>
</template>
```

### Position Offset

```vue
<template>
  <n-badge :value="5" :offset="[10, 10]">
    <n-avatar />
  </n-badge>
</template>
```

### Controlled Visibility

```vue
<template>
  <n-space :size="24" align="center">
    <n-badge :value="5" :show="show">
      <n-avatar />
    </n-badge>
    <n-button @click="show = !show"> Toggle Badge </n-button>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(true);
</script>
```

### Standalone Badge (No Wrapper)

```vue
<template>
  <n-space :size="24" align="center">
    <n-badge :value="5" :max="15" />
    <n-badge :value="10" dot />
  </n-space>
</template>
```

## Common Patterns

### Notification Icon with Count

```vue
<template>
  <n-badge :value="unreadCount" :max="99">
    <n-button circle quaternary>
      <template #icon>
        <n-icon><BellIcon /></n-icon>
      </template>
    </n-button>
  </n-badge>
</template>

<script setup>
import { ref } from 'vue';

const unreadCount = ref(25);
</script>
```

### Status Indicator

```vue
<template>
  <n-space align="center">
    <n-badge dot :type="isOnline ? 'success' : 'default'" />
    <span>{{ isOnline ? 'Online' : 'Offline' }}</span>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const isOnline = ref(true);
</script>
```

### Dynamic Badge Value

```vue
<template>
  <n-space align="center">
    <n-badge :value="count" :max="99">
      <n-avatar />
    </n-badge>
    <n-button-group>
      <n-button @click="count = Math.max(0, count - 1)">-</n-button>
      <n-button @click="count = Math.min(999, count + 1)">+</n-button>
    </n-button-group>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(5);
</script>
```

## Best Practices

1. **Use appropriate max values**: Set reasonable max values for overflow

   ```vue
   <n-badge :value="count" :max="99">
   ```

2. **Use dot for status indicators**: When only status matters, not count

   ```vue
   <n-badge dot type="success">
   ```

3. **Show zero when meaningful**: Use `show-zero` when zero is a valid state

   ```vue
   <n-badge :value="0" show-zero>
   ```

4. **Use processing for loading states**: Show processing animation during async operations

   ```vue
   <n-badge :value="pending" processing>
   ```

5. **Consistent positioning**: Use offset sparingly and consistently across the app

6. **Accessibility**: Ensure badge purpose is clear from context
