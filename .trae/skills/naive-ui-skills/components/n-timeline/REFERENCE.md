---
name: n-timeline
description: A component for displaying a timeline of events with customizable items, icons, and layout options including horizontal and vertical orientations.
author: jiaiyan
version: 1.0.0
---

# n-timeline Component

The `n-timeline` component is Naive UI's solution for displaying a sequence of events or activities in chronological order. It supports both vertical and horizontal layouts with customizable styling.

## When to Use

Use `n-timeline` when you need to:

- Display chronological events or activities
- Show process steps or progress
- Create activity logs or history views
- Visualize project milestones

## Basic Usage

### Simple Timeline

```vue
<template>
  <n-timeline>
    <n-timeline-item content="Event 1" />
    <n-timeline-item
      type="success"
      title="Success"
      content="Operation completed"
      time="2024-01-15 10:00"
    />
    <n-timeline-item
      type="error"
      content="Error occurred"
      time="2024-01-15 11:00"
    />
    <n-timeline-item
      type="warning"
      title="Warning"
      content="Please check"
      time="2024-01-15 12:00"
    />
  </n-timeline>
</template>
```

### Different Sizes

```vue
<template>
  <n-timeline size="large">
    <n-timeline-item content="Large size item" />
    <n-timeline-item
      type="success"
      title="Success"
      content="Success content"
      time="2024-01-15 10:00"
    />
  </n-timeline>
</template>
```

### Right Placement

```vue
<template>
  <n-timeline item-placement="right">
    <n-timeline-item content="Item on the right" />
    <n-timeline-item
      type="success"
      title="Success"
      content="Success content"
      time="2024-01-15 10:00"
    />
  </n-timeline>
</template>
```

### Horizontal Timeline

```vue
<template>
  <div style="overflow: auto">
    <n-timeline horizontal>
      <n-timeline-item content="Step 1" />
      <n-timeline-item
        type="success"
        title="Step 2"
        content="Completed"
        time="2024-01-15"
      />
      <n-timeline-item type="error" content="Step 3" time="2024-01-16" />
      <n-timeline-item content="Step 4" />
    </n-timeline>
  </div>
</template>
```

### Custom Icon

```vue
<template>
  <n-timeline>
    <n-timeline-item color="grey" content="Custom icon">
      <template #icon>
        <n-icon>
          <CheckCircleIcon />
        </n-icon>
      </template>
    </n-timeline-item>
    <n-timeline-item type="success" content="Default icon" />
  </n-timeline>
</template>
```

## API Reference

### Timeline Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `horizontal` | `boolean` | `false` | Whether to display horizontally |
| `icon-size` | `number` | `undefined` | Size of the icon part |
| `item-placement` | `'left' \| 'right'` | `'left'` | Direction of item placement |
| `size` | `'medium' \| 'large'` | `'medium'` | Size of the timeline |

### TimelineItem Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `color` | `string` | `undefined` | Item color |
| `content` | `string` | `undefined` | Item content |
| `line-type` | `'default' \| 'dashed'` | `'default'` | Line type |
| `time` | `string` | `undefined` | Item time |
| `title` | `string` | `undefined` | Item title |
| `type` | `'default' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'default'` | Item type |

### Timeline Slots

| Name      | Parameters | Description      |
| --------- | ---------- | ---------------- |
| `default` | `()`       | Timeline content |

### TimelineItem Slots

| Name      | Parameters | Description           |
| --------- | ---------- | --------------------- |
| `default` | `()`       | Timeline item content |
| `icon`    | `()`       | Custom timeline icon  |
| `footer`  | `()`       | Content at the bottom |
| `header`  | `()`       | Content at the top    |

## Common Patterns

### Process Steps

```vue
<template>
  <n-timeline>
    <n-timeline-item
      type="success"
      title="Order Placed"
      content="Your order has been placed successfully"
      time="2024-01-15 09:00"
    />
    <n-timeline-item
      type="success"
      title="Payment Confirmed"
      content="Payment received"
      time="2024-01-15 09:05"
    />
    <n-timeline-item
      type="info"
      title="Processing"
      content="Order is being processed"
      time="2024-01-15 10:00"
    />
    <n-timeline-item
      type="warning"
      title="Shipping"
      content="Order is on the way"
      time="2024-01-15 14:00"
    />
    <n-timeline-item
      title="Delivered"
      content="Order delivered"
      time="2024-01-16 10:00"
    />
  </n-timeline>
</template>
```

### Activity Log

```vue
<template>
  <n-timeline>
    <n-timeline-item
      v-for="log in activityLogs"
      :key="log.id"
      :type="log.type"
      :title="log.title"
      :content="log.description"
      :time="log.timestamp"
    >
      <template #icon>
        <n-icon>
          <component :is="getIcon(log.type)" />
        </n-icon>
      </template>
    </n-timeline-item>
  </n-timeline>
</template>

<script setup>
import { CheckCircleIcon, AlertIcon, InfoIcon } from '@vicons/ionicons5';

const activityLogs = [
  {
    id: 1,
    type: 'success',
    title: 'Task Completed',
    description: 'All items processed',
    timestamp: '10:00',
  },
  {
    id: 2,
    type: 'warning',
    title: 'Warning',
    description: 'Low disk space',
    timestamp: '11:00',
  },
  {
    id: 3,
    type: 'error',
    title: 'Error',
    description: 'Connection failed',
    timestamp: '12:00',
  },
];

const getIcon = type => {
  const icons = {
    success: CheckCircleIcon,
    warning: AlertIcon,
    error: AlertIcon,
    info: InfoIcon,
  };
  return icons[type] || InfoIcon;
};
</script>
```

### Horizontal Progress

```vue
<template>
  <n-timeline horizontal>
    <n-timeline-item
      v-for="(step, index) in steps"
      :key="index"
      :type="step.completed ? 'success' : 'default'"
      :title="step.title"
    >
      <template #icon>
        <n-icon v-if="step.completed">
          <CheckIcon />
        </n-icon>
        <span v-else>{{ index + 1 }}</span>
      </template>
    </n-timeline-item>
  </n-timeline>
</template>

<script setup>
import { ref } from 'vue';

const steps = ref([
  { title: 'Cart', completed: true },
  { title: 'Shipping', completed: true },
  { title: 'Payment', completed: false },
  { title: 'Confirm', completed: false },
]);
</script>
```

### Dashed Line Style

```vue
<template>
  <n-timeline>
    <n-timeline-item
      type="info"
      title="Upcoming Event"
      content="This event is in the future"
      line-type="dashed"
    />
    <n-timeline-item
      type="success"
      title="Completed"
      content="This event is done"
    />
  </n-timeline>
</template>
```

### Rich Content

```vue
<template>
  <n-timeline>
    <n-timeline-item>
      <template #header>
        <n-space align="center">
          <n-avatar :size="24">JD</n-avatar>
          <span>John Doe</span>
        </n-space>
      </template>

      <template #default>
        <n-card size="small">
          <p>Posted a new article about Vue.js best practices</p>
        </n-card>
      </template>

      <template #footer>
        <n-space>
          <n-button text size="small">Like</n-button>
          <n-button text size="small">Comment</n-button>
        </n-space>
      </template>
    </n-timeline-item>
  </n-timeline>
</template>
```

## Best Practices

### 1. Use Appropriate Types

Match the timeline item type with the event status:

```vue
<n-timeline-item type="success" content="Completed" />
<n-timeline-item type="error" content="Failed" />
<n-timeline-item type="warning" content="Attention needed" />
<n-timeline-item type="info" content="Information" />
```

### 2. Use Horizontal for Process Steps

```vue
<n-timeline horizontal>
  <!-- Step items -->
</n-timeline>
```

### 3. Add Context with Time

```vue
<n-timeline-item title="Event" content="Description" time="2024-01-15 10:00" />
```

### 4. Use Custom Icons for Visual Clarity

```vue
<template #icon>
  <n-icon :color="statusColor">
    <StatusIcon />
  </n-icon>
</template>
```

### 5. Combine with Cards for Rich Content

```vue
<n-timeline-item>
  <n-card>
    <!-- Rich content -->
  </n-card>
</n-timeline-item>
```
