---
name: 'n-popconfirm'
description: 'Popconfirm component for confirmation dialogs in popover style. Invoke when user needs to implement confirmation prompts, delete confirmations, or action verifications in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Popconfirm Component

A confirm, popped. Popconfirm shows a confirmation dialog in a popover for user actions that need verification.

## When to Use

Use this component when:

- **Delete confirmations**: Confirm destructive actions like delete
- **Action verification**: Verify important user actions
- **Simple confirmations**: Quick yes/no decisions without modal
- **Inline confirmations**: Confirm actions without leaving context

## When to Invoke

Invoke this skill when:

- User needs to implement confirmation dialogs
- User wants delete confirmation before removing items
- User needs inline confirmation prompts
- User asks about popover-based confirmations
- User wants to customize confirmation buttons

## Features

- **Popover Style**: Confirmation appears as a popover
- **Customizable Actions**: Configure confirm and cancel buttons
- **Custom Icon**: Replace default icon with custom one
- **Event Callbacks**: Handle positive and negative click events
- **Inherits Popover**: All popover props are available

## API Reference

### Popconfirm Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| negative-button-props | `ButtonProps` | `undefined` | Cancel button's DOM props | 2.27.0 |
| negative-text | `string \| null` | `'Cancel'` | Cancel button text. | 2.28.0 |
| positive-button-props | `ButtonProps` | `undefined` | Confirm button's DOM props | 2.27.0 |
| positive-text | `string \| null` | `'Confirm'` | Confirm button text. | 2.28.0 |
| show-icon | `boolean` | `true` | Whether to show icon. |  |
| on-positive-click | `() => boolean \| Promise<boolean> \| any` | `undefined` | Callback of confirmation. |  |
| on-negative-click | `() => boolean \| Promise<boolean> \| any` | `undefined` | Callback of cancel. |  |

For more props, see popover props.

### Popconfirm Slots

| Name    | Parameters | Description                           |
| ------- | ---------- | ------------------------------------- |
| action  | `()`       | Custom action.                        |
| default | `()`       | Popconfirm content.                   |
| icon    | `()`       | Popconfirm icon.                      |
| trigger | `()`       | The element that triggers popconfirm. |

### Popconfirm Methods

See popover methods.

## Basic Usage

### Basic Popconfirm

```vue
<template>
  <n-popconfirm
    @positive-click="handlePositiveClick"
    @negative-click="handleNegativeClick"
  >
    <template #trigger>
      <n-button>Quote</n-button>
    </template>
    Are you sure to quote this message?
  </n-popconfirm>
</template>

<script setup>
const handlePositiveClick = () => {
  console.log('Confirmed');
};

const handleNegativeClick = () => {
  console.log('Cancelled');
};
</script>
```

### Custom Button Text

```vue
<template>
  <n-popconfirm positive-text="ok" negative-text="not ok">
    <template #trigger>
      <n-button>Quote</n-button>
    </template>
    Are you sure?
  </n-popconfirm>
</template>
```

## Common Patterns

### Delete Confirmation

```vue
<template>
  <n-popconfirm @positive-click="handleDelete">
    <template #trigger>
      <n-button type="error">Delete</n-button>
    </template>
    Are you sure you want to delete this item? This action cannot be undone.
  </n-popconfirm>
</template>

<script setup>
const handleDelete = () => {
  console.log('Item deleted');
};
</script>
```

### Custom Icon

```vue
<template>
  <n-popconfirm positive-text="ok" negative-text="not ok">
    <template #icon>
      <n-icon color="red">
        <WarningIcon />
      </n-icon>
    </template>
    <template #trigger>
      <n-button>Warning Action</n-button>
    </template>
    This is a dangerous action!
  </n-popconfirm>
</template>
```

### No Icon

```vue
<template>
  <n-popconfirm :show-icon="false">
    <template #trigger>
      <n-button>No icon</n-button>
    </template>
    Simple confirmation without icon.
  </n-popconfirm>
</template>
```

### Custom Actions

```vue
<template>
  <n-popconfirm
    @positive-click="handlePositiveClick"
    @negative-click="handleNegativeClick"
  >
    <template #trigger>
      <n-button>Custom Actions</n-button>
    </template>
    <template #action>
      <n-space>
        <n-button size="small" @click="handleCustomAction">
          Custom Action
        </n-button>
      </n-space>
    </template>
    Choose your action
  </n-popconfirm>
</template>

<script setup>
const handlePositiveClick = () => {
  console.log('Confirmed');
};

const handleNegativeClick = () => {
  console.log('Cancelled');
};

const handleCustomAction = () => {
  console.log('Custom action');
};
</script>
```

### Async Confirmation

```vue
<template>
  <n-popconfirm @positive-click="handleAsyncConfirm">
    <template #trigger>
      <n-button>Async Action</n-button>
    </template>
    This will trigger an async operation.
  </n-popconfirm>
</template>

<script setup>
const handleAsyncConfirm = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Async operation completed');
  return true;
};
</script>
```

### Controlled Visibility

```vue
<template>
  <n-popconfirm v-model:show="show">
    <template #trigger>
      <n-button @click="show = true">Controlled</n-button>
    </template>
    This is a controlled popconfirm.
  </n-popconfirm>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);
</script>
```

### With Button Props

```vue
<template>
  <n-popconfirm
    positive-text="Delete"
    negative-text="Cancel"
    :positive-button-props="{ type: 'error' }"
    :negative-button-props="{ type: 'default' }"
    @positive-click="handleDelete"
  >
    <template #trigger>
      <n-button type="error">Delete Item</n-button>
    </template>
    This action is irreversible. Continue?
  </n-popconfirm>
</template>

<script setup>
const handleDelete = () => {
  console.log('Item deleted');
};
</script>
```

## Best Practices

1. **Use for destructive actions**: Always confirm actions that delete or modify data

2. **Clear messaging**: Provide clear and concise confirmation message

3. **Appropriate button text**: Use descriptive text for confirm/cancel buttons

4. **Consider async operations**: Handle async operations in callbacks properly

5. **Custom icons for warnings**: Use custom icons for dangerous actions

6. **Return false to prevent close**: Return `false` from callbacks to prevent auto-close
