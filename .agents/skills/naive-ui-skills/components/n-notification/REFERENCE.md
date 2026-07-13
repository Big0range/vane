---
name: 'n-notification'
description: 'Notification component for displaying toast messages and alerts. Invoke when user needs to implement notification system, toast messages, or status alerts in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Notification Component

If something is to be told to somebody. Notification component displays global notification messages at the corner of the page.

## When to Use

Use this component when:

- **System notifications**: Show success, error, warning, or info messages
- **Operation feedback**: Provide feedback after user actions
- **Background process alerts**: Notify users about async operations
- **Persistent messages**: Display important information that needs attention

## When to Invoke

Invoke this skill when:

- User needs to implement toast notifications
- User wants to show success/error/warning messages
- User needs notification system with different types
- User asks about notification placement options
- User wants to customize notification behavior

## Features

- **Multiple Types**: Support for info, success, warning, error types
- **Flexible Placement**: Configurable position on screen
- **Dynamic Content**: Can update notification content after creation
- **Auto Close**: Configurable duration for auto-dismiss
- **Max Limit**: Control maximum number of visible notifications

## API Reference

### NotificationProvider Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| container-class | `string` | `undefined` | Class of notification container. | 2.36.0 |
| container-style | `string \| Object` | `undefined` | Style of notification container. | 2.25.0 |
| placement | `'top' \| 'bottom' \| 'top-right' \| 'top-left' \| 'bottom-left' \| 'bottom-right'` | `'top-right'` | Placement of all notifications. | `'top' \| 'bottom'` 2.29.0 |
| max | `number` | `undefined` | Limit the number of notifications to display. |  |
| scrollable | `boolean` | `true` | Whether notification can be scroll. |  |
| to | `string \| HTMLElement` | `'body'` | Container node of notification container. |  |

### notification Injection Methods

| Name | Type | Description |
| --- | --- | --- |
| create | `(option: NotificationOption) => NotificationReactive` | Create a notification. |
| destroyAll | `() => void` | Destroy all popup notifications. |
| error | `(option: NotificationOption) => NotificationReactive` | Use `error` type notification. |
| info | `(option: NotificationOption) => NotificationReactive` | Use `info` type notification. |
| success | `(option: NotificationOption) => NotificationReactive` | Use `success` type notification. |
| warning | `(option: NotificationOption) => NotificationReactive` | Use `warning` type notification. |

### NotificationOption Properties

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| action | `string \| (() => VNodeChild)` | `undefined` | Content of the operation area. |  |
| avatar | `() => VNodeChild` | `undefined` | Content of the avatar. |  |
| closable | `boolean` | `true` | Whether to show close icon. |  |
| content | `string \| (() => VNodeChild)` | `undefined` | Content, can be a render function. |  |
| description | `string \| (() => VNodeChild)` | `undefined` | Content of the description. |  |
| duration | `number` | `undefined` | Auto close duration in milliseconds. |  |
| keepAliveOnHover | `boolean` | `false` | Whether to keep the notification when mouse hover. | 2.32.0 |
| meta | `string \| (() => VNodeChild)` | `undefined` | Content of the meta. |  |
| title | `string \| (() => VNodeChild)` | `undefined` | Content of the title. |  |
| onClose | `() => boolean \| Promise<boolean>` | `undefined` | Callback of notification closing. |  |

## Basic Usage

### Setup Provider

```vue
<!-- App.vue -->
<template>
  <n-notification-provider>
    <content />
  </n-notification-provider>
</template>
```

### Basic Notification

```vue
<template>
  <n-space>
    <n-button @click="handleClick1"> Wouldn't it be Nice </n-button>
    <n-button @click="handleClick2"> Satisfaction </n-button>
  </n-space>
</template>

<script setup>
import { useNotification } from 'naive-ui';

const notification = useNotification();

const handleClick1 = () => {
  notification.create({
    title: "Wouldn't it be Nice",
    content: 'From the Beach Boys',
    duration: 3000,
  });
};

const handleClick2 = () => {
  notification.create({
    title: 'Satisfaction',
    content: 'From the Rolling Stones',
    duration: 3000,
  });
};
</script>
```

### Different Types

```vue
<template>
  <n-space>
    <n-button @click="notify('info')">Info</n-button>
    <n-button @click="notify('success')">Success</n-button>
    <n-button @click="notify('warning')">Warning</n-button>
    <n-button @click="notify('error')">Error</n-button>
  </n-space>
</template>

<script setup>
import { useNotification } from 'naive-ui';

const notification = useNotification();

const notify = type => {
  notification[type]({
    content: `${type} message`,
    duration: 3000,
  });
};
</script>
```

## Common Patterns

### Change Content Dynamically

```vue
<template>
  <n-space>
    <n-button @click="open">Open it</n-button>
    <n-button :disabled="!nRef" @click="change">Change it</n-button>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';
import { useNotification } from 'naive-ui';

const notification = useNotification();
const nRef = ref(null);

const open = () => {
  nRef.value = notification.create({
    title: 'Initial Title',
    content: 'Initial Content',
  });
};

const change = () => {
  if (nRef.value) {
    nRef.value.title = 'Changed Title';
    nRef.value.content = 'Changed Content';
  }
};
</script>
```

### With Duration

```vue
<template>
  <n-button @click="handleClick"> Duration: 10000ms </n-button>
</template>

<script setup>
import { useNotification } from 'naive-ui';

const notification = useNotification();

const handleClick = () => {
  notification.create({
    title: 'Auto Close',
    content: 'This will close in 10 seconds',
    duration: 10000,
  });
};
</script>
```

### Unclosable Notification

```vue
<template>
  <n-button @click="handleClick"> Unclosable </n-button>
</template>

<script setup>
import { useNotification } from 'naive-ui';

const notification = useNotification();

const handleClick = () => {
  notification.create({
    title: 'Unclosable',
    content: 'This notification cannot be closed by user',
    closable: false,
    duration: 5000,
  });
};
</script>
```

### Max Notifications

```vue
<template>
  <n-notification-provider :max="3">
    <NotificationButton />
  </n-notification-provider>
</template>

<script setup>
import { useNotification } from 'naive-ui';

const notification = useNotification();

const handleClick = () => {
  notification.create({
    content: 'New notification',
  });
};
</script>
```

### Custom Placement

```vue
<template>
  <n-notification-provider placement="bottom-left">
    <Content />
  </n-notification-provider>
</template>
```

### With Action

```vue
<template>
  <n-button @click="handleClick"> Notification with Action </n-button>
</template>

<script setup>
import { h } from 'vue';
import { useNotification, NButton } from 'naive-ui';

const notification = useNotification();

const handleClick = () => {
  notification.create({
    title: 'Update Available',
    content: 'A new version is available',
    action: () =>
      h(
        NButton,
        {
          size: 'small',
          onClick: () => console.log('Update clicked'),
        },
        { default: () => 'Update Now' },
      ),
  });
};
</script>
```

## Best Practices

1. **Wrap with Provider**: Always wrap components using notification with `n-notification-provider`

2. **Choose appropriate type**: Use the correct notification type (info, success, warning, error)

3. **Set reasonable duration**: Configure duration based on message importance

4. **Limit notifications**: Use `max` prop to prevent notification overflow

5. **Keep alive on hover**: Enable `keepAliveOnHover` for important messages

6. **Clean up**: Use `destroyAll` to clear all notifications when needed
