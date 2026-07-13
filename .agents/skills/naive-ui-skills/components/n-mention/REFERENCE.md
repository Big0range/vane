---
name: n-mention
description: A mention input component for @mentions with dropdown suggestions, supporting both text and textarea modes
author: jiaiyan
version: 1.0.0
---

# n-mention Component

The `n-mention` component is an input field that supports @mentions with a dropdown suggestion list. It's useful for mentioning users, tags, or other entities in text content with autocomplete functionality.

## When to Use

Use `n-mention` when you need to:

- Implement @mentions for users in comments or messages
- Create hashtag or tag inputs with autocomplete
- Build rich text inputs with entity references
- Provide autocomplete suggestions while typing
- Create mention functionality in chat applications

## Basic Usage

### Basic Mention Input

```vue
<template>
  <n-mention :options="options" default-value="@" />
</template>

<script setup>
const options = [
  { label: 'John Doe', value: 'john' },
  { label: 'Jane Smith', value: 'jane' },
  { label: 'Bob Wilson', value: 'bob' },
];
</script>
```

### Textarea Mode

```vue
<template>
  <n-mention type="textarea" :options="options" />
</template>
```

### Autosize Textarea

```vue
<template>
  <n-mention type="textarea" :options="options" autosize />
</template>
```

## API Reference

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `v-model:value` | `string \| null` | `undefined` | Manually set input value. |
| `default-value` | `string` | `''` | Default value when not manually set. |
| `type` | `'text' \| 'textarea'` | `'text'` | Input type. |
| `options` | `MentionOption[]` | `[]` | Mention options list. |
| `prefix` | `string \| string[]` | `'@'` | Prefix character(s) to trigger mentions. Must be exactly 1 character each. |
| `separator` | `string` | `' '` | Character to split mentions. Must be exactly 1 character. |
| `placeholder` | `string` | `''` | Placeholder. |
| `disabled` | `boolean` | `false` | Whether to disable the input. |
| `bordered` | `boolean` | `true` | Whether to display the border. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Input size. |
| `loading` | `boolean` | `false` | Whether the selection panel is loading. |
| `autosize` | `boolean \| { maxRows?: number, minRows?: number }` | `false` | Autosize for textarea. |
| `placement` | `Placement` | `'bottom-start'` | Selection panel's placement. |
| `status` | `'success' \| 'warning' \| 'error'` | `undefined` | Validation status. |
| `filter` | `(pattern: string, option: MentionOption) => boolean` | Default filter | Method to filter options. |
| `render-label` | `(option: MentionOption) => VNodeChild` | `undefined` | Options' labels render function. |
| `scrollbar-props` | `ScrollbarProps` | `undefined` | Scrollbar props for the dropdown. |
| `to` | `string \| HTMLElement \| false` | `body` | Container node of the menu. |

### MentionOption Properties

| Name | Type | Description |
| --- | --- | --- |
| `label` | `string \| (option: MentionOption) => VNodeChild` | Option label. |
| `value` | `string` | Option value. Must be unique. |
| `disabled` | `boolean` | Option disabled state. |
| `class` | `string` | Option class property. |
| `style` | `string` | Option style property. |
| `render` | `(option: MentionOption) => VNodeChild` | Custom render function. |

### Events

| Name | Parameters | Description |
| --- | --- | --- |
| `update:value` | `(value: string) => void` | Triggered when value changes. |
| `update:show` | `(show: boolean) => void` | Callback when panel is shown or hidden. |
| `focus` | `(e: FocusEvent) => void` | Triggered when input is focused. |
| `blur` | `(e: FocusEvent) => void` | Triggered when input loses focus. |
| `search` | `(pattern: string, prefix: string) => void` | Triggered when searching. |
| `select` | `(option: MentionOption, prefix: string) => void` | Triggered when option is selected. |

### Slots

| Name    | Parameters | Description                 |
| ------- | ---------- | --------------------------- |
| `empty` | `()`       | Slot when menu has no data. |

### Methods

| Name    | Type         | Description                   |
| ------- | ------------ | ----------------------------- |
| `focus` | `() => void` | Manually focus the component. |
| `blur`  | `() => void` | Manually blur the component.  |

## Common Patterns

### Load Remote Options

```vue
<template>
  <n-mention :options="options" :loading="loading" @search="handleSearch" />
</template>

<script setup>
import { ref } from 'vue';

const options = ref([]);
const loading = ref(false);

const handleSearch = async (pattern, prefix) => {
  loading.value = true;
  try {
    const response = await fetch(`/api/users?q=${pattern}`);
    const users = await response.json();
    options.value = users.map(user => ({
      label: user.name,
      value: user.username,
    }));
  } finally {
    loading.value = false;
  }
};
</script>
```

### Custom Render Label

```vue
<template>
  <n-mention :options="options" :render-label="renderLabel" />
</template>

<script setup>
import { h } from 'vue';

const options = [
  { label: 'John Doe', value: 'john', avatar: 'john.jpg' },
  { label: 'Jane Smith', value: 'jane', avatar: 'jane.jpg' },
];

const renderLabel = option => {
  return h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
    h('img', {
      src: option.avatar,
      style: 'width: 24px; height: 24px; border-radius: 50%;',
    }),
    option.label,
  ]);
};
</script>
```

### Multiple Trigger Prefixes

```vue
<template>
  <n-mention :options="options" :prefix="['@', '#']" @search="handleSearch" />
</template>

<script setup>
import { ref } from 'vue';

const options = ref([]);

const handleSearch = (pattern, prefix) => {
  if (prefix === '@') {
    options.value = getUserOptions(pattern);
  } else if (prefix === '#') {
    options.value = getTagOptions(pattern);
  }
};
</script>
```

### Work with Form

```vue
<template>
  <n-form ref="formInstRef" :model="formModel" :rules="rules">
    <n-form-item label="Comment" path="comment">
      <n-mention
        v-model:value="formModel.comment"
        :options="options"
        type="textarea"
      />
    </n-form-item>
    <n-button @click="handleButtonClick">Submit</n-button>
  </n-form>
</template>

<script setup>
import { ref } from 'vue';

const formInstRef = ref(null);
const formModel = ref({
  comment: '',
});

const rules = {
  comment: {
    required: true,
    message: 'Please enter a comment',
  },
};

const handleButtonClick = () => {
  formInstRef.value?.validate();
};
</script>
```

### Manual Focus/Blur Control

```vue
<template>
  <n-space>
    <n-mention ref="myMention" :options="options" />
    <n-button @click="triggerFocus">Focus</n-button>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const myMention = ref(null);

const triggerFocus = () => {
  myMention.value?.focus();
  setTimeout(() => {
    myMention.value?.blur();
  }, 1000);
};
</script>
```

### Custom Filter Function

```vue
<template>
  <n-mention :options="options" :filter="customFilter" />
</template>

<script setup>
const customFilter = (pattern, option) => {
  return option.value.toLowerCase().includes(pattern.toLowerCase());
};
</script>
```

### Validation Status

```vue
<template>
  <n-space vertical>
    <n-mention status="warning" placeholder="Warning state" />
    <n-mention status="error" placeholder="Error state" />
    <n-mention status="success" placeholder="Success state" />
  </n-space>
</template>
```

## Best Practices

1. **Use `search` event for async data**: Load options asynchronously when the user types to improve performance.

2. **Set `loading` during async operations**: Show loading state while fetching remote options.

3. **Use `render-label` for rich option display**: Display avatars or additional info in the dropdown.

4. **Configure `prefix` for different mention types**: Use multiple prefixes (@ for users, # for tags, etc.).

5. **Set `autosize` for textarea mode**: Enable autosize for better UX in comment/message inputs.

6. **Use `filter` for custom matching logic**: Implement custom filtering when default behavior doesn't fit your needs.

7. **Handle `select` event for tracking mentions**: Track which mentions were selected for your application logic.
