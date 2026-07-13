---
name: n-dynamic-tags
description: A component for dynamically adding and removing tags with customizable input and trigger elements
author: jiaiyan
version: 1.0.0
---

# n-dynamic-tags Component

The `n-dynamic-tags` component allows users to create and manage tags dynamically. Tags can be added by typing and pressing Enter, and removed by clicking the close button. It supports custom rendering and input elements.

## When to Use

Use `n-dynamic-tags` when you need to:

- Collect multiple tags or labels from users
- Create keyword or category input fields
- Build email recipient or user mention inputs
- Allow users to add and remove items as tags
- Display selected items as removable tags

## Basic Usage

### Basic Tags Input

```vue
<template>
  <n-dynamic-tags v-model:value="tags" />
</template>

<script setup>
import { ref } from 'vue';

const tags = ref(['Tag 1', 'Tag 2']);
</script>
```

### With Maximum Tag Count

```vue
<template>
  <n-dynamic-tags v-model:value="tags" :max="3" />
</template>
```

### Different Tag Styles

```vue
<template>
  <n-space vertical>
    <n-dynamic-tags v-model:value="tags" type="primary" />
    <n-dynamic-tags v-model:value="tags" type="info" />
    <n-dynamic-tags v-model:value="tags" type="success" />
    <n-dynamic-tags v-model:value="tags" type="warning" />
    <n-dynamic-tags v-model:value="tags" type="error" />
    <n-dynamic-tags v-model:value="tags" round />
  </n-space>
</template>
```

## API Reference

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `v-model:value` | `string[] \| DynamicTagsOption[]` | `undefined` | Value if manually set. |
| `default-value` | `string[]` | `[]` | Default value. |
| `disabled` | `boolean` | `false` | Whether the tag is disabled. |
| `closable` | `boolean` | `true` | Whether the tag is closable. |
| `max` | `number` | `undefined` | Maximum number of tags. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the tag. |
| `type` | `'default' \| 'primary' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | Type of the tag. |
| `round` | `boolean` | `false` | Whether the tag has rounded corners. |
| `color` | `{ color?: string, borderColor?: string, textColor?: string }` | `undefined` | Color of the tag. Overrides color set by `type`. |
| `render-tag` | `(tag: string \| DynamicTagsOption, index: number) => VNodeChild` | `undefined` | Custom render tag function. |
| `input-props` | `InputProps` | `undefined` | Props of internal `n-input`. |
| `input-style` | `string \| Object` | `undefined` | Customize the style of the input. |
| `input-class` | `string` | `undefined` | Customize the class of the input. |
| `tag-style` | `string \| Object` | `undefined` | Customize the style of the tag. |
| `tag-class` | `string` | `undefined` | Customize the class of the tag. |

### DynamicTagsOption Type

```ts
interface DynamicTagsOption {
  label: string;
  value: string;
}
```

### Events

| Name | Parameters | Description |
| --- | --- | --- |
| `update:value` | `(value: string[] \| DynamicTagsOption[]) => void` | Callback when value changes. |
| `create` | `(label: string) => string \| DynamicTagsOption` | Create derived value from input. |

### Slots

| Name | Parameters | Description |
| --- | --- | --- |
| `input` | `{ submit: (value: any) => void, deactivate: () => void }` | Custom element to replace the regular input. |
| `trigger` | `{ activate: () => void, disabled: boolean }` | Element that triggers the tag to switch to input. |

## Common Patterns

### Custom Input Element (with AutoComplete)

```vue
<template>
  <n-dynamic-tags v-model:value="tags">
    <template #input="{ submit, deactivate }">
      <n-auto-complete
        ref="autoCompleteInstRef"
        v-model:value="inputValue"
        size="small"
        :options="options"
        placeholder="Email"
        :clear-after-select="true"
        @select="submit($event)"
        @blur="deactivate"
      />
    </template>
  </n-dynamic-tags>
</template>

<script setup>
import { ref } from 'vue';

const tags = ref([]);
const inputValue = ref('');
const options = ref([
  { label: 'user1@example.com', value: 'user1@example.com' },
  { label: 'user2@example.com', value: 'user2@example.com' },
]);
</script>
```

### Custom Tag Rendering

```vue
<template>
  <n-dynamic-tags v-model:value="tags" :render-tag="renderTag" />
</template>

<script setup>
import { h } from 'vue';
import { NTag } from 'naive-ui';

const tags = ref(['Apple', 'Banana', 'Orange']);

const renderTag = (tag, index) => {
  return h(
    NTag,
    {
      type: 'primary',
      bordered: false,
      closable: true,
      onClose: () => tags.value.splice(index, 1),
    },
    { default: () => tag },
  );
};
</script>
```

### Object Formatted Values

```vue
<template>
  <n-dynamic-tags v-model:value="value" @create="onCreate" />
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
</template>

<script setup>
import { ref } from 'vue';

const value = ref([
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
]);

const onCreate = label => {
  return {
    label,
    value: label.toLowerCase().replace(/\s+/g, '-'),
  };
};
</script>
```

### Custom Tag Creation with Validation

```vue
<template>
  <n-dynamic-tags @create="handleCreate" />
</template>

<script setup>
const handleCreate = label => {
  if (label.length < 2) {
    return label;
  }
  return label.toUpperCase();
};
</script>
```

### Use in Form

```vue
<template>
  <n-form :model="model" :rules="rules">
    <n-form-item path="tags" :show-label="false">
      <n-dynamic-tags v-model:value="model.tags" />
    </n-form-item>
  </n-form>
</template>

<script setup>
import { ref } from 'vue';

const model = ref({
  tags: [],
});

const rules = {
  tags: {
    type: 'array',
    required: true,
    message: 'At least one tag is required',
  },
};
</script>
```

## Best Practices

1. **Use `max` to limit tag count**: Set a maximum number of tags to prevent excessive input.

2. **Customize input with slots**: Use the `input` slot for autocomplete or other input components.

3. **Use `on-create` for value transformation**: Transform user input before adding as a tag (e.g., lowercase, trim).

4. **Use object format for complex data**: When tags need both display label and value, use `DynamicTagsOption` format.

5. **Combine with form validation**: Wrap in `n-form-item` for validation support.
