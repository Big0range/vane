---
name: 'n-dialog'
description: 'Dialog component for modal confirmations and user interactions. Invoke when user needs to create modal dialogs, confirmations, or async operations with user confirmation in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Dialog Component

Dialog component for modal confirmations, alerts, and user interactions requiring attention.

## When to Use

Use this component when:

- **Confirmations**: Ask users to confirm destructive or important actions
- **Alerts**: Display important information that requires user acknowledgment
- **Form dialogs**: Collect user input in a modal context
- **Async operations**: Handle operations that require user confirmation before proceeding

## When to Invoke

Invoke this skill when:

- User needs to create confirmation dialogs
- User wants to use imperative API with useDialog
- User needs async dialog operations
- User wants to customize dialog content and actions
- User asks about dialog provider setup

## Features

- **Imperative API**: Create dialogs programmatically with useDialog
- **Multiple Types**: info, success, warning, error
- **Async Support**: Handle async operations with loading states
- **Customizable Actions**: Custom action buttons and content
- **Draggable**: Optional drag functionality
- **Mask Control**: Configurable mask click behavior
- **Keyboard Support**: ESC key to close
- **Component Mode**: Use as a declarative component

## API Reference

### useDialog API

| Name | Type | Description |
| --- | --- | --- |
| destroyAll | `() => void` | Destroy all popup dialogs. |
| create | `(options: DialogOptions) => DialogReactive` | Create a dialog. |
| error | `(options: DialogOptions) => DialogReactive` | Use `error` type dialog. |
| info | `(options: DialogOptions) => DialogReactive` | Use `info` type dialog. |
| success | `(options: DialogOptions) => DialogReactive` | Use `success` type dialog. |
| warning | `(options: DialogOptions) => DialogReactive` | Use `warning` type dialog. |

### useDialogReactiveList API

`() => Ref<readonly DialogReactive[]>`

### DialogOptions Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| action | `() => VNodeChild` | `undefined` | Content of the operation area, must be a render function. |
| bordered | `boolean` | `false` | Whether to show `border`. |
| closable | `boolean` | `true` | Whether to show `close` icon. |
| closeOnEsc | `boolean` | `true` | Whether to close the dialog when the Esc key is pressed. |
| content | `string \| (() => VNodeChild)` | `undefined` | Content, can be a render function. |
| draggable | `boolean \| { bounds?: 'none' }` | `false` | Whether it is draggable. |
| iconPlacement | `'left' \| 'top'` | `'left'` | Icon placement. |
| icon | `() => VNodeChild` | `undefined` | Render function of icon. |
| loading | `boolean` | `false` | Whether to display loading status. |
| maskClosable | `boolean` | `true` | Whether the dialog can be closed by clicking the mask. |
| negativeText | `string` | `undefined` | Cancel button text. |
| positiveText | `string` | `undefined` | Confirm button text. |
| showIcon | `boolean` | `true` | Whether to show icon. |
| title | `string \| (() => VNodeChild)` | `undefined` | Title, can be a render function. |
| type | `'error' \| 'success' \| 'warning'` | `'warning'` | Dialog type. |
| onClose | `() => boolean \| Promise<boolean> \| any` | `undefined` | Callback on close button clicked. |
| onNegativeClick | `(e: MouseEvent) => boolean \| Promise<boolean> \| any` | `undefined` | Callback on negative button clicked. |
| onPositiveClick | `(e: MouseEvent) => boolean \| Promise<boolean> \| any` | `undefined` | Callback on positive button clicked. |
| onMaskClick | `() => void` | `undefined` | Callback triggered when click the mask. |

### DialogReactive Methods

| Name    | Type | Description   |
| ------- | ---- | ------------- |
| destroy | `()` | Close dialog. |

### Dialog Props (Component Mode)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` | Whether to show border. |
| closable | `boolean` | `true` | Whether to show close icon. |
| content | `string \| (() => VNodeChild)` | `undefined` | Content, can be a render function. |
| icon-placement | `'left' \| 'top'` | `'left'` | Icon placement. |
| icon | `() => VNodeChild` | `undefined` | Render function of icon. |
| loading | `boolean` | `false` | Whether to display loading status. |
| negative-text | `string` | `undefined` | Cancel button text. |
| positive-text | `string` | `undefined` | Confirm button text. |
| show-icon | `boolean` | `true` | Whether to display the icon. |
| title | `string \| (() => VNodeChild)` | `undefined` | Title, can be a render function. |
| type | `'error' \| 'success' \| 'warning' \| 'info'` | `'warning'` | Dialog type. |

### Dialog Slots

| Name    | Parameters | Description     |
| ------- | ---------- | --------------- |
| action  | `()`       | Action content. |
| default | `()`       | Dialog content. |
| header  | `()`       | Header content. |
| icon    | `()`       | Icon content.   |
| close   | `()`       | Close content.  |

## Basic Usage

### Setup with DialogProvider

```vue
<!-- App.vue -->
<template>
  <n-dialog-provider>
    <Content />
  </n-dialog-provider>
</template>
```

### Basic Dialog Types

```vue
<template>
  <n-space>
    <n-button @click="handleConfirm">Confirm</n-button>
    <n-button @click="handleSuccess">Success</n-button>
    <n-button @click="handleError">Error</n-button>
  </n-space>
</template>

<script setup>
import { useDialog } from 'naive-ui';

const dialog = useDialog();

const handleConfirm = () => {
  dialog.warning({
    title: 'Confirm',
    content: 'Are you sure you want to proceed?',
    positiveText: 'Confirm',
    negativeText: 'Cancel',
    onPositiveClick: () => {
      console.log('Confirmed');
    },
  });
};

const handleSuccess = () => {
  dialog.success({
    title: 'Success',
    content: 'Operation completed successfully',
    positiveText: 'OK',
  });
};

const handleError = () => {
  dialog.error({
    title: 'Error',
    content: 'Something went wrong',
    positiveText: 'OK',
  });
};
</script>
```

### Async Dialog

```vue
<template>
  <n-button @click="handleAsync">Async Operation</n-button>
</template>

<script setup>
import { useDialog } from 'naive-ui';

const dialog = useDialog();

const handleAsync = () => {
  const d = dialog.warning({
    title: 'Async Operation',
    content: 'Processing...',
    positiveText: 'Submit',
    loading: true,
    onPositiveClick: async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        d.loading = false;
        return true;
      } catch {
        d.loading = false;
        return false;
      }
    },
  });
};
</script>
```

### Component Mode

```vue
<template>
  <n-dialog
    v-model:show="show"
    title="Dialog"
    content="Are you sure?"
    negative-text="Cancel"
    positive-text="Submit"
    @positive-click="handlePositiveClick"
    @negative-click="handleNegativeClick"
  />
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);

const handlePositiveClick = () => {
  console.log('Positive clicked');
};

const handleNegativeClick = () => {
  console.log('Negative clicked');
};
</script>
```

### Custom Actions

```vue
<template>
  <n-button @click="showCustomDialog">Custom Actions</n-button>
</template>

<script setup>
import { h } from 'vue';
import { useDialog, NButton } from 'naive-ui';

const dialog = useDialog();

const showCustomDialog = () => {
  dialog.warning({
    title: 'Custom Actions',
    content: 'Dialog with custom action buttons',
    action: () => [
      h(NButton, { onClick: () => dialog.destroyAll() }, () => 'Close All'),
      h(
        NButton,
        { type: 'primary', onClick: () => console.log('Custom') },
        () => 'Custom',
      ),
    ],
  });
};
</script>
```

### Mask Click Callback

```vue
<template>
  <n-button @click="showDialog">Mask Click Callback</n-button>
</template>

<script setup>
import { useDialog, useMessage } from 'naive-ui';

const dialog = useDialog();
const message = useMessage();

const showDialog = () => {
  dialog.warning({
    title: 'Click Mask',
    content: 'Try clicking the mask',
    maskClosable: true,
    onMaskClick: () => {
      message.info('Mask clicked');
    },
  });
};
</script>
```

### Draggable Dialog

```vue
<template>
  <n-button @click="showDraggable">Draggable Dialog</n-button>
</template>

<script setup>
import { useDialog } from 'naive-ui';

const dialog = useDialog();

const showDraggable = () => {
  dialog.warning({
    title: 'Draggable',
    content: 'This dialog can be dragged',
    draggable: true,
  });
};
</script>
```

## Common Patterns

### Delete Confirmation

```vue
<template>
  <n-button type="error" @click="handleDelete">Delete Item</n-button>
</template>

<script setup>
import { useDialog } from 'naive-ui';

const dialog = useDialog();

const handleDelete = () => {
  dialog.error({
    title: 'Delete Confirmation',
    content:
      'This action cannot be undone. Are you sure you want to delete this item?',
    positiveText: 'Delete',
    negativeText: 'Cancel',
    onPositiveClick: () => {
      // Perform delete operation
      console.log('Item deleted');
    },
  });
};
</script>
```

### Form in Dialog

```vue
<template>
  <n-button @click="showFormDialog">Open Form</n-button>
</template>

<script setup>
import { h, ref } from 'vue';
import { useDialog, NInput, NSpace } from 'naive-ui';

const dialog = useDialog();
const inputValue = ref('');

const showFormDialog = () => {
  const d = dialog.warning({
    title: 'Enter Name',
    content: () =>
      h(NInput, {
        value: inputValue.value,
        onUpdateValue: v => {
          inputValue.value = v;
        },
      }),
    positiveText: 'Submit',
    negativeText: 'Cancel',
    onPositiveClick: () => {
      console.log('Submitted:', inputValue.value);
    },
  });
};
</script>
```

### Access All Dialog Instances

```vue
<template>
  There is {{ dialogReactiveList.length }} dialog(s) on the current page.
</template>

<script setup>
import { useDialogReactiveList } from 'naive-ui';

const dialogReactiveList = useDialogReactiveList();
</script>
```

## Best Practices

1. **Wrap with DialogProvider**: Always use `n-dialog-provider` at app root

   ```vue
   <n-dialog-provider>
     <App />
   </n-dialog-provider>
   ```

2. **Use appropriate types**: Match dialog type to message severity
   - `warning` for confirmations
   - `error` for error states
   - `success` for success messages
   - `info` for information

3. **Handle async operations properly**: Use loading state and return promises

   ```js
   onPositiveClick: async () => {
     d.loading = true;
     await someAsyncOperation();
     return true; // close dialog
   };
   ```

4. **Provide clear action labels**: Use descriptive positive/negative text

5. **Consider keyboard accessibility**: Users can close with ESC by default

6. **Destroy all dialogs when needed**: Use `destroyAll` for cleanup
   ```js
   dialog.destroyAll();
   ```
