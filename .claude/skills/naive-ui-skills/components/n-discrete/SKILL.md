---
name: 'n-discrete'
description: 'Discrete API for using message, dialog, notification, loadingBar, and modal outside setup context. Invoke when user needs to use Naive UI APIs outside Vue components in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Discrete API Component

If you want to use `useDialog`, `useMessage`, `useNotification`, `useLoadingBar`, `useModal` outside `setup`, you can use `createDiscreteApi` to create corresponding API.

## When to Use

Use this component when:

- **Outside setup**: Use Naive UI APIs outside Vue component setup
- **Utility functions**: Call message, dialog, etc. from utility files
- **Global access**: Access APIs from anywhere in the application
- **Third-party integration**: Integrate with non-Vue code

## When to Invoke

Invoke this skill when:

- User needs to use message, dialog, notification outside a component
- User wants to create global API access
- User needs to call APIs from utility functions
- User asks about using Naive UI APIs outside setup

## Features

- **Outside Setup**: Use APIs outside Vue component setup context
- **Multiple APIs**: Create message, dialog, notification, loadingBar, modal
- **Config Provider**: Support for config provider props
- **Theme Support**: Can configure theme and other providers
- **App Access**: Access to the underlying Vue app instance

## API Reference

### createDiscreteApi

```ts
function createDiscreteApi(
  includes: Array<'message' | 'dialog' | 'notification' | 'loadingBar'>,
  options: {
    configProviderProps: Ref<ConfigProviderProps> | ConfigProviderProps;
    messageProviderProps: Ref<MessageProviderProps> | MessageProviderProps;
    dialogProviderProps: Ref<DialogProviderProps> | DialogProviderProps;
    notificationProviderProps:
      | Ref<NotificationProviderProps>
      | NotificationProviderProps;
    modalProviderProps: Ref<ModalProviderProps> | ModalProviderProps;
    loadingBarProviderProps:
      | Ref<LoadingBarProviderProps>
      | LoadingBarProviderProps;
  },
): {
  message: MessageApi;
  dialog: DialogApi;
  notification: NotificationApi;
  loadingBar: LoadingBarApi;
  modal: ModalApi;
  app: App;
  unmount: () => void;
};
```

## Basic Usage

### Basic Discrete API

```vue
<template>
  <n-space>
    <n-button @click="handleMessageTriggerClick"> message </n-button>
    <n-button @click="handleNotificationTriggerClick"> notification </n-button>
    <n-button @click="handleDialogTriggerClick"> dialog </n-button>
    <n-button @click="handleLoadingBarTriggerClick"> loadingBar </n-button>
    <n-button @click="handleModalTriggerClick"> modal </n-button>
  </n-space>
</template>

<script setup>
import { createDiscreteApi, darkTheme } from 'naive-ui';

const { message, notification, dialog, loadingBar, modal } = createDiscreteApi([
  'message',
  'dialog',
  'notification',
  'loadingBar',
  'modal',
]);

const handleMessageTriggerClick = () => {
  message.info('This is a message');
};

const handleNotificationTriggerClick = () => {
  notification.create({
    title: 'Notification',
    content: 'This is a notification',
  });
};

const handleDialogTriggerClick = () => {
  dialog.warning({
    title: 'Warning',
    content: 'Are you sure?',
    positiveText: 'Confirm',
    negativeText: 'Cancel',
  });
};

const handleLoadingBarTriggerClick = () => {
  loadingBar.start();
  setTimeout(() => {
    loadingBar.finish();
  }, 2000);
};

const handleModalTriggerClick = () => {
  modal.create({
    title: 'Modal',
    content: 'This is a modal',
  });
};
</script>
```

## Common Patterns

### With Theme Configuration

```vue
<template>
  <n-space>
    <n-button @click="handleThemeChangeClick"> theme: {{ theme }} </n-button>
    <n-button @click="handleMessageTriggerClick"> message </n-button>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';
import { createDiscreteApi, darkTheme } from 'naive-ui';

const theme = ref(null);

const { message } = createDiscreteApi(['message'], {
  configProviderProps: {
    theme: darkTheme,
  },
});

const handleThemeChangeClick = () => {
  theme.value = theme.value ? null : darkTheme;
};

const handleMessageTriggerClick = () => {
  message.info('Message with dark theme');
};
</script>
```

### Utility File Usage

```ts
import { createDiscreteApi } from 'naive-ui';

const { message, dialog, notification } = createDiscreteApi([
  'message',
  'dialog',
  'notification',
]);

export function showSuccess(msg: string) {
  message.success(msg);
}

export function showError(msg: string) {
  message.error(msg);
}

export function confirmDelete(onConfirm: () => void) {
  dialog.warning({
    title: 'Delete Confirmation',
    content: 'Are you sure you want to delete this item?',
    positiveText: 'Delete',
    negativeText: 'Cancel',
    onPositiveClick: onConfirm,
  });
}

export function notifySuccess(title: string, content: string) {
  notification.success({
    title,
    content,
    duration: 3000,
  });
}
```

### With Loading Bar

```ts
import { createDiscreteApi } from 'naive-ui';

const { loadingBar, message } = createDiscreteApi(['loadingBar', 'message']);

export async function withLoadingBar<T>(
  promise: Promise<T>,
  successMessage?: string,
): Promise<T> {
  loadingBar.start();
  try {
    const result = await promise;
    loadingBar.finish();
    if (successMessage) {
      message.success(successMessage);
    }
    return result;
  } catch (error) {
    loadingBar.error();
    message.error(error.message || 'An error occurred');
    throw error;
  }
}
```

### Selective API Creation

```ts
import { createDiscreteApi } from 'naive-ui';

const { message } = createDiscreteApi(['message']);

message.info('Only message API is created');
```

## Best Practices

1. **Don't call in setup**: Do not call `createDiscreteApi` in `setup` since it may cause unexpected behaviors

2. **Not affected by providers**: Discrete API won't be affected by `n-xxx-provider` in current app

3. **Manual config sync**: If you need to share config, you should sync them manually

4. **Avoid mixing**: Better not use discrete API and normal API together

5. **Create once**: Create the discrete API once and export for reuse

6. **Unmount when done**: Use the returned `unmount` function to clean up when no longer needed
