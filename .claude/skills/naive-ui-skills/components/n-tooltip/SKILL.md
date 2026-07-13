---
name: 'n-tooltip'
description: 'Tooltip component for displaying contextual information on hover or focus. Invoke when user needs to show helpful hints or additional context in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Tooltip Component

Tooltip component for displaying contextual information, hints, and additional details on hover or focus.

## When to Use

Use this component when:

- **Contextual hints**: Provide additional information about elements
- **Form labels**: Show help text for form fields
- **Icon explanations**: Explain icon button functionality
- **Truncated text**: Show full text for truncated content

## When to Invoke

Invoke this skill when:

- User needs to display tooltip hints
- User wants to show contextual help text
- User needs different trigger modes
- User wants to customize tooltip placement
- User asks about hover/focus information display

## Features

- **Multiple Triggers**: hover, click, focus, or manual
- **Placement Options**: 12 placement positions
- **Arrow Control**: Show or hide tooltip arrow
- **Custom Styling**: Apply custom styles to tooltip body
- **Event Handling**: Respond to show/hide events

## API Reference

### Tooltip Props

See [Popover Props](popover#Popover-Props) for full API reference. Key props include:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| trigger | `'hover' \| 'click' \| 'focus' \| 'manual'` | `'hover'` | Trigger mode. |
| placement | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | `'top'` | Tooltip placement. |
| show | `boolean` | `false` | Whether to show tooltip (manual mode). |
| show-arrow | `boolean` | `true` | Whether to show arrow. |
| style | `string \| Object` | `undefined` | Tooltip body style. |
| disabled | `boolean` | `false` | Whether to disable tooltip. |
| delay | `number` | `0` | Delay in milliseconds before showing. |
| duration | `number` | `100` | Duration in milliseconds before hiding. |

### Tooltip Slots

| Name    | Parameters | Description                        |
| ------- | ---------- | ---------------------------------- |
| default | `()`       | Tooltip content.                   |
| trigger | `()`       | Element that triggers the tooltip. |

### Tooltip Events

| Name        | Parameters        | Description                               |
| ----------- | ----------------- | ----------------------------------------- |
| update:show | `(show: boolean)` | Callback when tooltip visibility changes. |

## Basic Usage

### Basic Tooltip

```vue
<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button>Hover Me</n-button>
    </template>
    This is a tooltip
  </n-tooltip>
</template>
```

### Different Triggers

```vue
<template>
  <n-space>
    <n-tooltip placement="bottom" trigger="hover">
      <template #trigger>
        <n-button>Hover</n-button>
      </template>
      Hover tooltip
    </n-tooltip>

    <n-tooltip placement="bottom" trigger="click">
      <template #trigger>
        <n-button>Click</n-button>
      </template>
      Click tooltip
    </n-tooltip>

    <n-tooltip placement="bottom" trigger="focus">
      <template #trigger>
        <n-input placeholder="Focus me" />
      </template>
      Focus tooltip
    </n-tooltip>
  </n-space>
</template>
```

### Placement Options

```vue
<template>
  <n-space>
    <n-tooltip placement="top-start" trigger="hover">
      <template #trigger>
        <n-button>Top Start</n-button>
      </template>
      Tooltip content
    </n-tooltip>

    <n-tooltip placement="bottom" trigger="hover">
      <template #trigger>
        <n-button>Bottom</n-button>
      </template>
      Tooltip content
    </n-tooltip>

    <n-tooltip placement="left" trigger="hover">
      <template #trigger>
        <n-button>Left</n-button>
      </template>
      Tooltip content
    </n-tooltip>

    <n-tooltip placement="right" trigger="hover">
      <template #trigger>
        <n-button>Right</n-button>
      </template>
      Tooltip content
    </n-tooltip>
  </n-space>
</template>
```

### No Arrow

```vue
<template>
  <n-tooltip trigger="hover" :show-arrow="false">
    <template #trigger>
      <n-button>No Arrow</n-button>
    </template>
    Tooltip without arrow
  </n-tooltip>
</template>
```

### Custom Style

```vue
<template>
  <n-tooltip :style="{ maxWidth: '400px' }" trigger="click">
    <template #trigger>
      <n-button>Wide Tooltip</n-button>
    </template>
    This is a very long tooltip content that will wrap to multiple lines when it
    exceeds the maximum width.
  </n-tooltip>
</template>
```

## Common Patterns

### Icon Button Tooltip

```vue
<template>
  <n-space>
    <n-tooltip trigger="hover">
      <template #trigger>
        <n-button circle>
          <template #icon>
            <n-icon><SettingsOutline /></n-icon>
          </template>
        </n-button>
      </template>
      Settings
    </n-tooltip>

    <n-tooltip trigger="hover">
      <template #trigger>
        <n-button circle>
          <template #icon>
            <n-icon><TrashOutline /></n-icon>
          </template>
        </n-button>
      </template>
      Delete
    </n-tooltip>
  </n-space>
</template>

<script setup>
import { SettingsOutline, TrashOutline } from '@vicons/ionicons5';
</script>
```

### Form Field Help

```vue
<template>
  <n-form-item>
    <template #label>
      <n-space align="center" :size="4">
        <span>Password</span>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon size="16" style="cursor: help;">
              <HelpCircleOutline />
            </n-icon>
          </template>
          Password must be at least 8 characters with uppercase, lowercase, and
          numbers
        </n-tooltip>
      </n-space>
    </template>
    <n-input type="password" v-model:value="password" />
  </n-form-item>
</template>

<script setup>
import { ref } from 'vue';
import { HelpCircleOutline } from '@vicons/ionicons5';

const password = ref('');
</script>
```

### Truncated Text Tooltip

```vue
<template>
  <n-tooltip trigger="hover" :style="{ maxWidth: '300px' }">
    <template #trigger>
      <n-ellipsis style="max-width: 200px;">
        {{ longText }}
      </n-ellipsis>
    </template>
    {{ longText }}
  </n-tooltip>
</template>

<script setup>
const longText =
  'This is a very long text that will be truncated and shown in tooltip on hover.';
</script>
```

### Event Handling

```vue
<template>
  <n-space vertical>
    <n-tooltip
      placement="bottom"
      trigger="hover"
      @update:show="handleUpdateShow"
    >
      <template #trigger>
        <n-button>Hover and Check Console</n-button>
      </template>
      Tooltip content
    </n-tooltip>
    <n-text>Tooltip is: {{ visible ? 'visible' : 'hidden' }}</n-text>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);

const handleUpdateShow = show => {
  visible.value = show;
  console.log('Tooltip visibility:', show);
};
</script>
```

### Manual Control

```vue
<template>
  <n-space vertical>
    <n-tooltip v-model:show="show" trigger="manual" placement="right">
      <template #trigger>
        <n-input v-model:value="value" placeholder="Type something" />
      </template>
      Press Enter to confirm
    </n-tooltip>
    <n-button @click="show = !show">Toggle Tooltip</n-button>
  </n-space>
</template>

<script setup>
import { ref, watch } from 'vue';

const show = ref(false);
const value = ref('');

watch(value, newVal => {
  show.value = newVal.length > 0;
});
</script>
```

### Rich Content Tooltip

```vue
<template>
  <n-tooltip trigger="hover" :style="{ maxWidth: '250px' }">
    <template #trigger>
      <n-button type="primary">User Info</n-button>
    </template>
    <div>
      <n-text strong>John Doe</n-text>
      <br />
      <n-text depth="3">john@example.com</n-text>
      <n-divider style="margin: 8px 0;" />
      <n-text>Last login: 2 hours ago</n-text>
    </div>
  </n-tooltip>
</template>
```

### Table Cell Tooltip

```vue
<template>
  <n-data-table :columns="columns" :data="data" />
</template>

<script setup>
import { h } from 'vue';
import { NTooltip, NButton } from 'naive-ui';

const columns = [
  {
    title: 'Name',
    key: 'name',
    render(row) {
      return h(
        NTooltip,
        {
          trigger: 'hover',
        },
        {
          trigger: () => h('span', { style: 'cursor: pointer;' }, row.name),
          default: () => `Full name: ${row.fullName}`,
        },
      );
    },
  },
  { title: 'Age', key: 'age' },
];

const data = [
  { name: 'John', fullName: 'John Doe', age: 25 },
  { name: 'Jane', fullName: 'Jane Smith', age: 30 },
];
</script>
```

### Delayed Tooltip

```vue
<template>
  <n-space>
    <n-tooltip trigger="hover" :delay="500">
      <template #trigger>
        <n-button>Delayed (500ms)</n-button>
      </template>
      This tooltip appears after 500ms delay
    </n-tooltip>

    <n-tooltip trigger="hover" :duration="1000">
      <template #trigger>
        <n-button>Long Duration (1000ms)</n-button>
      </template>
      This tooltip stays for 1000ms after mouse leave
    </n-tooltip>
  </n-space>
</template>
```

### Disabled Tooltip

```vue
<template>
  <n-space vertical>
    <n-switch v-model:value="enabled" />
    <n-tooltip trigger="hover" :disabled="!enabled">
      <template #trigger>
        <n-button>Hover Me</n-button>
      </template>
      Tooltip is {{ enabled ? 'enabled' : 'disabled' }}
    </n-tooltip>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const enabled = ref(true);
</script>
```

## Best Practices

1. **Keep content concise**: Tooltips should be brief

   ```vue
   <n-tooltip>Short, helpful text</n-tooltip>
   ```

2. **Use appropriate triggers**: Match trigger to use case

   ```vue
   <n-tooltip trigger="hover"> <!-- For quick hints -->
   <n-tooltip trigger="click"> <!-- For detailed info -->
   ```

3. **Position wisely**: Place tooltip where it won't obstruct

   ```vue
   <n-tooltip placement="top"> <!-- For buttons -->
   <n-tooltip placement="right"> <!-- For sidebar items -->
   ```

4. **Hide arrow for cleaner look**: When appropriate

   ```vue
   <n-tooltip :show-arrow="false" />
   ```

5. **Add delay for hover tooltips**: Prevent accidental triggers

   ```vue
   <n-tooltip :delay="200" />
   ```

6. **Limit width for long content**: Prevent overly wide tooltips

   ```vue
   <n-tooltip :style="{ maxWidth: '300px' }" />
   ```

7. **Don't use for critical info**: Tooltips may not be seen
   ```vue
   <!-- Bad: Critical info in tooltip -->
   <!-- Good: Critical info visible, tooltip for extra context -->
   ```
