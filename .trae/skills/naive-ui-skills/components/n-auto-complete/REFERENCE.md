---
name: n-auto-complete
description: An autocomplete input component that provides search hints and suggestions as users type, with support for grouping, custom rendering, and various input configurations
author: jiaiyan
version: 1.0.0
---

# n-auto-complete Component

The `n-auto-complete` component is an input field with autocomplete functionality that provides search hints and likely options as users type. It supports grouped options, custom input elements, and various selection behaviors.

## When to Use

Use `n-auto-complete` when you need to:

- Provide search hints or suggestions based on user input
- Create email input fields with domain suggestions
- Build search inputs with autocomplete options
- Offer likely options while users are typing
- Create custom input elements with autocomplete (e.g., textarea)
- Implement append-mode autocomplete for continuous input

## Basic Usage

### Basic Autocomplete

```vue
<template>
  <n-auto-complete
    v-model:value="value"
    :input-props="{
      autocomplete: 'disabled',
    }"
    :options="options"
    placeholder="Email"
    clearable
  />
</template>

<script setup>
import { ref, computed } from 'vue';

const value = ref('');

const options = computed(() => {
  return ['@gmail.com', '@outlook.com', '@yahoo.com'].map(suffix => ({
    label: value.value.split('@')[0] + suffix,
    value: value.value.split('@')[0] + suffix,
  }));
});
</script>
```

### Different Sizes

```vue
<template>
  <n-space vertical>
    <n-auto-complete
      v-model:value="value"
      :options="options"
      placeholder="Small"
      size="small"
    />
    <n-auto-complete
      v-model:value="value"
      :options="options"
      placeholder="Medium (default)"
      size="medium"
    />
    <n-auto-complete
      v-model:value="value"
      :options="options"
      placeholder="Large"
      size="large"
    />
  </n-space>
</template>
```

### Grouped Options

```vue
<template>
  <n-auto-complete
    v-model:value="value"
    :options="options"
    placeholder="Search..."
  />
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');

const options = [
  {
    type: 'group',
    label: 'Cities',
    key: 'cities',
    children: [
      { label: 'Beijing', value: 'beijing' },
      { label: 'Shanghai', value: 'shanghai' },
    ],
  },
  {
    type: 'group',
    label: 'Countries',
    key: 'countries',
    children: [
      { label: 'China', value: 'china' },
      { label: 'USA', value: 'usa' },
    ],
  },
];
</script>
```

## API Reference

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `v-model:value` | `string` | `undefined` | Input value of autocomplete. |
| `append` | `boolean` | `false` | Whether to append content to input instead of overwriting. |
| `blur-after-select` | `boolean` | `false` | Whether to blur after selection. |
| `clear-after-select` | `boolean` | `false` | Whether to clear after selection. |
| `clearable` | `boolean` | `false` | Whether autocomplete is clearable. |
| `default-value` | `string` | `null` | Default value of autocomplete. |
| `disabled` | `boolean` | `false` | Whether the autocomplete is disabled. |
| `get-show` | `(value: string) => boolean` | `undefined` | Use the input to determine whether to show options on focus. |
| `input-props` | `InputHTMLAttributes` | `undefined` | The attributes of input element in autocomplete. |
| `loading` | `boolean` | `false` | Whether to show a loading status. |
| `menu-props` | `HTMLAttributes` | `undefined` | The menu's DOM props. |
| `options` | `Array<string \| AutoCompleteOption \| AutoCompleteGroupOption>` | `[]` | Options to autocomplete from. |
| `placeholder` | `string` | `'Please Input'` | Autocomplete's placeholder. |
| `placement` | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'` | `'bottom-start'` | Autocomplete's placement. |
| `render-label` | `(option: SelectOption \| SelectGroupOption, selected: boolean) => VNodeChild` | `undefined` | Render function for each option label. |
| `render-option` | `(info: { node: VNode, option: SelectOption \| SelectGroupOption, selected: boolean }) => VNodeChild` | `undefined` | Render function for each option. |
| `scrollbar-props` | `ScrollbarProps` | `undefined` | Scrollbar props for the menu. |
| `show-empty` | `boolean` | `false` | Whether to show menu if there's no option. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Autocomplete size. |
| `status` | `'success' \| 'warning' \| 'error'` | `undefined` | Validation status. |
| `to` | `string \| HTMLElement \| false` | `body` | Container node of the menu. `false` will keep it not detached. |

### AutoCompleteOption Properties

| Name       | Type      | Description                     |
| ---------- | --------- | ------------------------------- |
| `disabled` | `boolean` | Whether the option is disabled. |
| `label`    | `string`  | Option label value.             |
| `value`    | `string`  | Option ID (should be unique).   |

### AutoCompleteGroupOption Properties

| Name       | Type                                  | Description             |
| ---------- | ------------------------------------- | ----------------------- |
| `children` | `Array<string \| AutoCompleteOption>` | Group children options. |
| `label`    | `string`                              | Group label.            |
| `key`      | `string \| number`                    | Unique group key.       |
| `type`     | `'group'`                             | Required group type.    |

### Events

| Name | Parameters | Description |
| --- | --- | --- |
| `update:value` | `(value: string \| null)` | Triggered when value changes. |
| `blur` | `(event: FocusEvent)` | Triggered on blur. |
| `focus` | `(event: FocusEvent)` | Triggered on focus. |
| `select` | `(value: string)` | Triggered when an option is selected. |

### Slots

| Name | Parameters | Description |
| --- | --- | --- |
| `default` | `{ handleInput, handleFocus, handleBlur, value, theme }` | Custom input elements. |
| `empty` | `()` | Menu's content when there's no option. |
| `prefix` | `()` | Input's prefix content. |
| `suffix` | `()` | Input's suffix content. |

### Methods

| Name    | Type         | Description              |
| ------- | ------------ | ------------------------ |
| `blur`  | `() => void` | Blur the input element.  |
| `focus` | `() => void` | Focus the input element. |

## Common Patterns

### Custom Input Element (Textarea)

```vue
<template>
  <n-auto-complete v-model:value="value" :options="options">
    <template
      #default="{ handleInput, handleBlur, handleFocus, value: slotValue }"
    >
      <n-input
        type="textarea"
        :value="slotValue"
        placeholder="Email"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </template>
  </n-auto-complete>
</template>
```

### Conditional Menu Display

```vue
<template>
  <n-auto-complete
    v-model:value="value"
    :options="options"
    placeholder="Input 'a' to show menu"
    :get-show="getShow"
  />
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');

const getShow = value => {
  return value.includes('a');
};
</script>
```

### Append Mode

```vue
<template>
  <n-space vertical>
    <n-auto-complete
      v-model:value="value"
      :options="options"
      :append="false"
      placeholder="Select and overwrite"
    />
    <n-auto-complete
      v-model:value="appendValue"
      :options="appendOptions"
      :append="true"
      :get-show="getShow"
      placeholder="Select and append"
    />
  </n-space>
</template>
```

### Custom Label Rendering

```vue
<template>
  <n-auto-complete
    v-model:value="value"
    :options="options"
    placeholder="Email"
    :render-label="renderLabel"
  />
</template>

<script setup>
import { h } from 'vue';

const renderLabel = option => {
  return h('span', { style: { color: '#18a058' } }, option.label);
};
</script>
```

### Validation Status

```vue
<template>
  <n-space vertical>
    <n-auto-complete status="warning" placeholder="Warning status" />
    <n-auto-complete status="error" placeholder="Error status" />
  </n-space>
</template>
```

### Async Options with Loading

```vue
<template>
  <n-auto-complete
    v-model:value="value"
    :options="options"
    :loading="loading"
    placeholder="Search..."
    @input="handleInput"
  />
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');
const options = ref([]);
const loading = ref(false);

const handleInput = async val => {
  if (!val) {
    options.value = [];
    return;
  }
  loading.value = true;
  const results = await fetchSuggestions(val);
  options.value = results;
  loading.value = false;
};
</script>
```

## Best Practices

1. **Use `input-props` to disable browser autocomplete**: Set `autocomplete: 'disabled'` in `input-props` to prevent browser autocomplete from interfering.

2. **Choose appropriate selection behavior**: Use `blur-after-select` for single-selection scenarios, or `clear-after-select` when you want users to make another selection.

3. **Use `get-show` for conditional display**: Control when the dropdown appears based on input content for better UX.

4. **Leverage `append` mode for continuous input**: When users need to add multiple items, use `append: true` to append instead of replace.

5. **Implement debouncing for async options**: When fetching options asynchronously, debounce the input handler to reduce API calls.

6. **Use `render-label` for custom styling**: Customize option appearance while maintaining consistent behavior.

7. **Handle empty states gracefully**: Use the `empty` slot to provide helpful feedback when no options match.

8. **Consider keyboard navigation**: The component supports keyboard navigation by default - ensure your custom implementations maintain this accessibility.
