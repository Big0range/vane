---
name: 'n-modal'
description: 'Modal component for displaying dialog boxes and content overlays. Invoke when user needs to implement modal dialogs, confirmations, or floating panels in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Modal Component

It just pops and shows you something. Modal is used for displaying content that requires user attention or interaction.

## When to Use

Use this component when:

- **Dialog boxes**: Show confirmations, alerts, or prompts
- **Form dialogs**: Display forms in a modal overlay
- **Content details**: Show detailed information without navigating
- **Floating panels**: Create draggable floating windows
- **Multi-step workflows**: Guide users through sequential steps

## When to Invoke

Invoke this skill when:

- User needs to implement modal dialogs
- User wants to show confirmations or alerts
- User needs to create floating panels
- User asks about imperative modal API
- User wants draggable modals

## Features

- **Presets**: Built-in `card` and `dialog` presets
- **Imperative API**: Create modals programmatically with `useModal`
- **Draggable**: Support for draggable modals
- **Customizable**: Flexible positioning and styling
- **Mask Control**: Configurable mask visibility and behavior

## API Reference

### ModalProvider Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| to | `string \| HTMLElement` | `body` | Container node of the modal content. | 2.38.0 |

### useModal API

| Name | Type | Description | Version |
| --- | --- | --- | --- |
| create | `(options: ModalOptions) => ModalReactive` | Create a modal. | 2.38.0 |
| destroyAll | `() => void` | Destroy all modals. | 2.38.0 |

### Modal Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| auto-focus | `boolean` | `true` | Whether to focus the first focusable element inside modal. | 2.24.2 |
| block-scroll | `boolean` | `true` | Whether to disabled body scrolling when it's active. | 2.28.3 |
| close-on-esc | `boolean` | `true` | Whether to close modal on Esc is pressed. | 2.24.2 |
| display-directive | `'if' \| 'show'` | `'if'` | Use which directive to control the rendering of modal body. |  |
| draggable | `boolean \| { bounds?: 'window' }` | `false` | Whether the modal is draggable. | 2.41.0 |
| mask-closable | `boolean` | `true` | Whether to emit `hide` event when click mask. |  |
| preset | `'dialog' \| 'card'` | `undefined` | The preset of `n-modal`. |  |
| show | `boolean` | `false` | Whether to show modal. |  |
| show-mask | `boolean` | `true` | Whether to display the mask. | 2.43.0 |
| to | `string \| HTMLElement` | `body` | Container node of the modal content. |  |
| transform-origin | `'mouse' \| 'center'` | `'mouse'` | The transform origin of the modal's display animation. |  |
| trap-focus | `boolean` | `true` | Whether to trap focus inside modal. | 2.24.2 |
| z-index | `number` | `undefined` | Z index of the modal. | 2.24.0 |

## Basic Usage

### Setup Provider

```vue
<!-- App.vue -->
<template>
  <n-modal-provider>
    <content />
  </n-modal-provider>
</template>
```

### Basic Modal

```vue
<template>
  <n-button @click="showModal = true"> Start me up </n-button>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      title="Modal"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra> Oops! </template>
      Content
    </n-card>
  </n-modal>
</template>

<script setup>
import { ref } from 'vue';

const showModal = ref(false);
</script>
```

### Using Preset Card

```vue
<template>
  <n-button @click="showModal = true"> Open Card Modal </n-button>
  <n-modal
    v-model:show="showModal"
    preset="card"
    title="Modal"
    :style="{ width: '600px' }"
  >
    Content goes here
  </n-modal>
</template>

<script setup>
import { ref } from 'vue';

const showModal = ref(false);
</script>
```

### Using Preset Dialog

```vue
<template>
  <n-button @click="showModal = true"> Open Dialog </n-button>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="Dialog"
    content="Are you sure?"
    positive-text="Submit"
    negative-text="Cancel"
    @positive-click="handleSubmit"
    @negative-click="handleCancel"
  />
</template>

<script setup>
import { ref } from 'vue';

const showModal = ref(false);

const handleSubmit = () => {
  console.log('Submitted');
};

const handleCancel = () => {
  console.log('Cancelled');
};
</script>
```

## Common Patterns

### Imperative API

```vue
<template>
  <n-button @click="showDialogPreset"> Create Dialog </n-button>
</template>

<script setup>
import { useModal } from 'naive-ui';

const modal = useModal();

const showDialogPreset = () => {
  modal.create({
    title: 'Title',
    content: 'Content',
    preset: 'dialog',
  });
};
</script>
```

### Draggable Modal

```vue
<template>
  <n-button @click="showModal = true"> Open Draggable </n-button>
  <n-modal
    v-model:show="showModal"
    preset="card"
    title="Draggable Modal"
    draggable
    :style="{ width: '600px' }"
  >
    This modal can be dragged around.
  </n-modal>
</template>

<script setup>
import { ref } from 'vue';

const showModal = ref(false);
</script>
```

### Floating Panel (No Mask)

```vue
<template>
  <n-button @click="showModal = true"> Floating Panel </n-button>
  <n-modal
    v-model:show="showModal"
    style="width: 800px"
    preset="card"
    draggable
    title="Floating Panel"
    :show-mask="false"
  >
    Floating Panel Content
  </n-modal>
</template>

<script setup>
import { ref } from 'vue';

const showModal = ref(false);
</script>
```

### Controlled Modal

```vue
<template>
  <n-button @click="handleClick"> Start me up </n-button>
  <n-modal :show="showModal" @update:show="handleUpdate">
    <n-card style="width: 600px" title="Modal">
      Countdown {{ timeout / 1000 }}s
    </n-card>
  </n-modal>
</template>

<script setup>
import { ref } from 'vue';

const showModal = ref(false);
const timeout = ref(5000);

const handleClick = () => {
  showModal.value = true;
  setTimeout(() => {
    showModal.value = false;
  }, timeout.value);
};

const handleUpdate = value => {
  showModal.value = value;
};
</script>
```

## Best Practices

1. **Use ModalProvider**: Wrap your app with `n-modal-provider` for imperative API

2. **Choose appropriate preset**: Use `card` for complex content, `dialog` for simple confirmations

3. **Handle keyboard events**: Ensure `close-on-esc` and `trap-focus` are properly configured

4. **Manage focus**: Use `auto-focus` to improve accessibility

5. **Control mask behavior**: Set `mask-closable` based on user interaction requirements

6. **Clean up**: Use `destroyAll` to clean up all modals when needed
