---
name: 'n-message'
description: 'Message component for displaying toast notifications and feedback. Invoke when user needs to show temporary feedback messages, loading states, or success/error notifications in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Message Component

Message component for displaying toast notifications and feedback messages at the top of the viewport.

## When to Use

Use this component when:

- **Operation feedback**: Show success or error messages after user actions
- **Loading states**: Display loading indicators during async operations
- **Notifications**: Show temporary informational messages
- **Validation feedback**: Display form validation results

## When to Invoke

Invoke this skill when:

- User needs to display toast messages programmatically
- User wants to use imperative API with useMessage
- User needs to customize message duration or closability
- User wants to modify existing messages dynamically
- User asks about message provider setup

## Features

- **Multiple Types**: info, success, warning, error, loading
- **Imperative API**: Create messages programmatically with useMessage
- **Custom Duration**: Control how long messages display
- **Closable**: Optional close button
- **Hover to Keep**: Keep message alive on hover
- **Custom Icons**: Support for custom icons
- **Multiple Placements**: top, bottom, left, right variants
- **Dynamic Updates**: Modify messages after creation

## API Reference

### MessageProvider Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| closable | `boolean` | `false` | Whether to show close icon on all messages. |
| container-class | `string` | `undefined` | Message container class. |
| container-style | `string \| CSSProperties` | `undefined` | Message container style. |
| duration | `number` | `3000` | Default duration of on all messages. |
| keep-alive-on-hover | `boolean` | `false` | Whether to destroy while hovering on all messages. |
| max | `number` | `undefined` | Limit the number of messages to display. |
| placement | `'top' \| 'top-left' \| 'top-right' \| 'bottom' \| 'bottom-left' \| 'bottom-right'` | `'top'` | Placement of all messages. |
| to | `string \| HTMLElement` | `'body'` | Container node of message container. |

### useMessage API

| Name | Type | Description |
| --- | --- | --- |
| destroyAll | `() => void` | Destroy all popup messages. |
| create | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | Use create type message. |
| error | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | Use error type message. |
| info | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | Use info type message. |
| loading | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | Use loading type message. |
| success | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | Use success type message. |
| warning | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | Use warning type message. |

### MessageOption Properties

| Name | Type | Description |
| --- | --- | --- |
| closable | `boolean` | Whether to show close icon. |
| duration | `number` | The duration of the message. |
| icon | `() => VNodeChild` | Message icon. |
| keepAliveOnHover | `boolean` | Messages whether to destroy while hover. |
| render | `MessageRenderMessage` | Render function of the entire message. |
| showIcon | `boolean` | Whether to show icon. |
| type | `'info' \| 'success' \| 'warning' \| 'error' \| 'loading' \| 'default'` | Message type. |
| onAfterLeave | `() => void` | Callback after message disappeared. |
| onClose | `() => void` | Callback when close icon is clicked. |
| onLeave | `() => void` | Callback when message start to disappear. |

### MessageReactive Properties

| Name | Type | Description |
| --- | --- | --- |
| closable | `boolean` | Whether to show close icon. |
| content | `string \| (() => VNodeChild)` | Message content. |
| destroy | `() => void` | Message destroy method. |
| icon | `() => VNodeChild` | Message icon. |
| keepAliveOnHover | `boolean` | Messages whether to destroy while hover. |
| showIcon | `boolean` | Whether to show icon. |
| type | `'info' \| 'success' \| 'warning' \| 'error' \| 'loading' \| 'default'` | Message type. |
| onAfterLeave | `() => void` | Callback after message disappeared. |
| onLeave | `() => void` | Callback when message start to disappear. |

### MessageReactive Methods

| Name    | Type | Description             |
| ------- | ---- | ----------------------- |
| destroy | `()` | Message destroy method. |

## Basic Usage

### Setup with MessageProvider

```vue
<!-- App.vue -->
<template>
  <n-message-provider>
    <Content />
  </n-message-provider>
</template>
```

### Basic Message Types

```vue
<template>
  <n-space>
    <n-button @click="showInfo">Info</n-button>
    <n-button @click="showSuccess">Success</n-button>
    <n-button @click="showWarning">Warning</n-button>
    <n-button @click="showError">Error</n-button>
    <n-button @click="showLoading">Loading</n-button>
  </n-space>
</template>

<script setup>
import { useMessage } from 'naive-ui';

const message = useMessage();

const showInfo = () => message.info('This is an info message');
const showSuccess = () => message.success('Operation completed successfully');
const showWarning = () => message.warning('Please review before proceeding');
const showError = () => message.error('Something went wrong');
const showLoading = () => message.loading('Loading...');
</script>
```

### Custom Duration

```vue
<template>
  <n-button @click="showMessage">5 Second Message</n-button>
</template>

<script setup>
import { useMessage } from 'naive-ui';

const message = useMessage();

const showMessage = () => {
  message.info('This message lasts 5 seconds', { duration: 5000 });
};
</script>
```

### Closable Message

```vue
<template>
  <n-button @click="showMessage">Closable Message</n-button>
</template>

<script setup>
import { useMessage } from 'naive-ui';

const message = useMessage();

const showMessage = () => {
  message.info('Click X to close', { closable: true });
};
</script>
```

### Keep Alive on Hover

```vue
<template>
  <n-button @click="showMessage">Hover to Keep</n-button>
</template>

<script setup>
import { useMessage } from 'naive-ui';

const message = useMessage();

const showMessage = () => {
  message.info('Hover over me to keep alive', { keepAliveOnHover: true });
};
</script>
```

### Custom Icon

```vue
<template>
  <n-button @click="showMessage">Custom Icon</n-button>
</template>

<script setup>
import { h } from 'vue';
import { useMessage, NIcon } from 'naive-ui';

const message = useMessage();

const showMessage = () => {
  message.info('Custom icon message', {
    icon: () => h(NIcon, null, () => '🔔'),
  });
};
</script>
```

### No Icon

```vue
<template>
  <n-button @click="showMessage">No Icon</n-button>
</template>

<script setup>
import { useMessage } from 'naive-ui';

const message = useMessage();

const showMessage = () => {
  message.info('Message without icon', { showIcon: false });
};
</script>
```

### Modify Existing Message

```vue
<template>
  <n-space>
    <n-button @click="createMessage">Create</n-button>
    <n-button @click="changeType">Change Type</n-button>
    <n-button @click="plus">Plus 1</n-button>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';
import { useMessage } from 'naive-ui';

const message = useMessage();
const msg = ref(null);
const count = ref(0);

const createMessage = () => {
  count.value = 0;
  msg.value = message.info(`Count: ${count.value}`, { duration: 0 });
};

const changeType = () => {
  if (msg.value) {
    msg.value.type = msg.value.type === 'info' ? 'success' : 'info';
  }
};

const plus = () => {
  if (msg.value) {
    count.value++;
    msg.value.content = `Count: ${count.value}`;
  }
};
</script>
```

### Manually Close

```vue
<template>
  <n-space>
    <n-button @click="createMessage">Create</n-button>
    <n-button @click="removeMessage">Destroy</n-button>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';
import { useMessage } from 'naive-ui';

const message = useMessage();
const msg = ref(null);

const createMessage = () => {
  msg.value = message.loading('Loading...', { duration: 0 });
};

const removeMessage = () => {
  if (msg.value) {
    msg.value.destroy();
    msg.value = null;
  }
};
</script>
```

### Multiple Line Content

```vue
<template>
  <n-button @click="showMessage">Multiple Lines</n-button>
</template>

<script setup>
import { useMessage } from 'naive-ui';

const message = useMessage();

const showMessage = () => {
  message.info('Line 1\nLine 2\nLine 3');
};
</script>
```

### Custom Placement

```vue
<template>
  <n-message-provider placement="bottom">
    <Content />
  </n-message-provider>
</template>
```

### Destroy All Messages

```vue
<template>
  <n-button @click="clearAll">Clear All Messages</n-button>
</template>

<script setup>
import { useMessage } from 'naive-ui';

const message = useMessage();

const clearAll = () => {
  message.destroyAll();
};
</script>
```

## Common Patterns

### Async Operation with Loading

```vue
<template>
  <n-button @click="handleAsync">Submit</n-button>
</template>

<script setup>
import { useMessage } from 'naive-ui';

const message = useMessage();

const handleAsync = async () => {
  const msg = message.loading('Submitting...', { duration: 0 });
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    msg.destroy();
    message.success('Submitted successfully');
  } catch (error) {
    msg.destroy();
    message.error('Submission failed');
  }
};
</script>
```

### Form Submission Feedback

```vue
<template>
  <n-form @submit="handleSubmit">
    <n-button type="primary" attr-type="submit">Submit Form</n-button>
  </n-form>
</template>

<script setup>
import { useMessage } from 'naive-ui';

const message = useMessage();

const handleSubmit = async () => {
  const msg = message.loading('Processing...', { duration: 0 });
  try {
    await submitForm();
    msg.destroy();
    message.success('Form submitted successfully!');
  } catch (error) {
    msg.destroy();
    message.error(error.message || 'Submission failed');
  }
};
</script>
```

### Global Message (Outside Setup)

```vue
<!-- content.vue -->
<template>
  <!-- content -->
</template>

<script setup>
import { useMessage } from 'naive-ui';

window.$message = useMessage();
</script>
```

```js
// utils.js
export function showGlobalMessage() {
  window.$message?.success('Global message');
}
```

## Best Practices

1. **Wrap with MessageProvider**: Always use `n-message-provider` at app root

   ```vue
   <n-message-provider>
     <App />
   </n-message-provider>
   ```

2. **Use appropriate types**: Match message type to context
   - `success` for positive outcomes
   - `error` for failures
   - `warning` for cautionary notes
   - `info` for neutral information
   - `loading` for async operations

3. **Keep messages concise**: Toast messages should be brief and clear

4. **Use loading for async operations**: Show loading state, then success/error

   ```js
   const msg = message.loading('Loading...', { duration: 0 });
   // after operation
   msg.destroy();
   message.success('Done');
   ```

5. **Enable hover to keep for important messages**: Allow users to read longer messages

   ```js
   message.info('Important info', { keepAliveOnHover: true });
   ```

6. **Clean up messages**: Use `destroyAll` when navigating between pages

7. **Set reasonable duration**: Default 3000ms works for most cases, adjust as needed
