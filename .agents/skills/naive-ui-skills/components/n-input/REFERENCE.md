---
name: n-input
description: A versatile input component for text, password, and textarea inputs with comprehensive features including validation, icons, and various states
author: jiaiyan
version: 1.0.0
---

# n-input Component

The `n-input` component is a versatile input field that supports text input, password input, and textarea modes. It provides comprehensive features for form handling, validation, and user interaction.

## When to Use

Use `n-input` when you need to:

- Collect user text input in forms
- Create password fields with show/hide functionality
- Build multi-line text areas
- Add prefix/suffix icons or content to inputs
- Create input pairs (e.g., date range, value range)
- Display loading states during async operations
- Show validation status (success, warning, error)

## Basic Usage

### Text Input

```vue
<template>
  <n-input v-model:value="value" type="text" placeholder="Basic Input" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');
</script>
```

### Textarea

```vue
<template>
  <n-input
    v-model:value="value"
    type="textarea"
    placeholder="Basic Textarea"
    :rows="3"
  />
</template>
```

### Different Sizes

```vue
<template>
  <n-space vertical>
    <n-input size="tiny" placeholder="Tiny Input" />
    <n-input size="small" placeholder="Small Input" />
    <n-input placeholder="Medium Input (default)" />
    <n-input size="large" placeholder="Large Input" />
  </n-space>
</template>
```

## API Reference

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `v-model:value` | `string \| [string, string] \| null` | `undefined` | The input value. When `pair` is `true`, this is an array of two strings. |
| `type` | `'text' \| 'password' \| 'textarea'` | `'text'` | Input type. |
| `size` | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Input size. |
| `placeholder` | `string \| [string, string]` | `undefined` | Placeholder text. When `pair` is `true`, this is an array. |
| `disabled` | `boolean` | `false` | Whether to disable the input. |
| `clearable` | `boolean` | `false` | Whether the input is clearable. |
| `readonly` | `boolean` | `false` | Set the readonly state. |
| `round` | `boolean` | `false` | Use a rounded input style. |
| `maxlength` | `number` | `undefined` | Maximum input length. |
| `minlength` | `number` | `undefined` | Minimum input length. |
| `show-password-on` | `'click' \| 'mousedown'` | `undefined` | The event to show the password (for password type). |
| `pair` | `boolean` | `false` | Whether to use pairwise input (two connected inputs). |
| `separator` | `string` | `undefined` | The separator between pairwise inputs. |
| `loading` | `boolean` | `undefined` | Set loading state. Always reserves space for loading indicator when set. |
| `autofocus` | `boolean` | `false` | Whether to autofocus on mount. |
| `input-props` | `InputHTMLAttributes \| TextareaHTMLAttributes` | `undefined` | DOM props passed to the internal input element. |
| `passively-activated` | `boolean` | `false` | Whether to passively activate (requires Enter to activate after focus). |
| `status` | `'success' \| 'warning' \| 'error'` | `undefined` | Validation status. |
| `autosize` | `boolean \| { minRows?: number, maxRows?: number }` | `false` | Auto-sizing for textarea. |
| `rows` | `number` | `3` | Number of rows for textarea. |
| `show-count` | `boolean` | `false` | Whether to show character count. |
| `default-value` | `string \| [string, string] \| null` | `null` | Default value when not controlled. |
| `allow-input` | `(value: string) => boolean` | `undefined` | Filter function for input validation. |
| `count-graphemes` | `(value: string) => number` | `undefined` | Custom grapheme counting function. |
| `render-count` | `(props: { value: string }) => VNode` | `undefined` | Custom render function for word count. |

### Events

| Name | Parameters | Description |
| --- | --- | --- |
| `update:value` | `(value: string \| [string, string])` | Triggered when value changes. |
| `input` | `(value: string \| [string, string])` | Triggered on user input. |
| `change` | `(value: string \| [string, string])` | Triggered on native change event. |
| `blur` | `()` | Triggered when input loses focus. |
| `focus` | `()` | Triggered when input gains focus. |
| `clear` | `()` | Triggered when input is cleared. |

### Slots

| Name | Parameters | Description |
| --- | --- | --- |
| `prefix` | `()` | Prefix content (e.g., icon). |
| `suffix` | `()` | Suffix content (e.g., icon). |
| `password-invisible-icon` | `()` | Custom icon when password is hidden. |
| `password-visible-icon` | `()` | Custom icon when password is visible. |
| `clear-icon` | `()` | Custom clear icon. |
| `separator` | `()` | Custom separator content for pair inputs. |
| `count` | `{ value: string }` | Custom word count display. |

### Methods

| Name | Type | Description |
| --- | --- | --- |
| `focus` | `() => void` | Focus the input element. |
| `blur` | `() => void` | Remove focus from the input element. |
| `select` | `() => void` | Select all text in the input. |
| `clear` | `() => void` | Clear the input value. |
| `scrollTo` | `(options: { left?: number, top?: number, behavior?: 'auto' \| 'smooth' }) => void` | Scroll textarea content. |

## Common Patterns

### Password Input with Toggle

```vue
<template>
  <n-input
    v-model:value="password"
    type="password"
    show-password-on="mousedown"
    placeholder="Enter password"
    :maxlength="16"
  />
</template>

<script setup>
import { ref } from 'vue';

const password = ref('');
</script>
```

### Input with Prefix and Suffix

```vue
<template>
  <n-input v-model:value="value" placeholder="Search...">
    <template #prefix>
      <n-icon :component="SearchOutline" />
    </template>
    <template #suffix>
      <n-icon :component="CloseCircleOutline" />
    </template>
  </n-input>
</template>
```

### Loading State

```vue
<template>
  <n-input
    v-model:value="value"
    :loading="isLoading"
    placeholder="Loading state..."
  />
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');
const isLoading = ref(true);
</script>
```

### Pair Input (Range)

```vue
<template>
  <n-input
    v-model:value="range"
    pair
    separator="-"
    :placeholder="['From', 'To']"
    clearable
  />
</template>

<script setup>
import { ref } from 'vue';

const range = ref(['', '']);
</script>
```

### Auto-resize Textarea

```vue
<template>
  <n-input
    v-model:value="value"
    type="textarea"
    :autosize="{ minRows: 3, maxRows: 6 }"
    placeholder="Auto-resizing textarea"
  />
</template>
```

### Input Validation with Status

```vue
<template>
  <n-space vertical>
    <n-input v-model:value="value" status="success" placeholder="Valid input" />
    <n-input v-model:value="value" status="warning" placeholder="Warning" />
    <n-input v-model:value="value" status="error" placeholder="Error" />
  </n-space>
</template>
```

### Limit Input Format

```vue
<template>
  <n-input
    v-model:value="value"
    :allow-input="onlyAllowNumber"
    placeholder="Numbers only"
  />
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');

const onlyAllowNumber = value => {
  return !value || /^\d+$/.test(value);
};
</script>
```

### Using Methods via Ref

```vue
<template>
  <n-space vertical>
    <n-space>
      <n-button @click="handleFocus">Focus</n-button>
      <n-button @click="handleBlur">Blur</n-button>
      <n-button @click="handleSelect">Select</n-button>
      <n-button @click="handleClear">Clear</n-button>
    </n-space>
    <n-input
      ref="inputRef"
      v-model:value="value"
      placeholder="Control via methods"
    />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const inputRef = ref(null);
const value = ref('Hello World');

const handleFocus = () => inputRef.value?.focus();
const handleBlur = () => inputRef.value?.blur();
const handleSelect = () => inputRef.value?.select();
const handleClear = () => inputRef.value?.clear();
</script>
```

## Best Practices

1. **Use `v-model:value` for two-way binding**: Always use `v-model:value` instead of separate `value` and `@update:value` for cleaner code.

2. **Choose appropriate `show-password-on`**: Use `'mousedown'` for better UX (password visible while holding) or `'click'` for toggle behavior.

3. **Set `loading` to `undefined` when not loading**: When using `clearable` with `loading`, set `loading` to `undefined` (not `false`) when not loading to avoid extra spacing.

4. **Use `allow-input` for format validation**: Prefer `allow-input` over manual validation for real-time input filtering.

5. **Leverage `input-props` for native attributes**: Use `input-props` to pass native HTML attributes like `autocomplete`, `type="tel"`, etc.

6. **Use `count-graphemes` for emoji support**: For correct emoji/unicode character counting, provide a custom `count-graphemes` function.

7. **Consider `passively-activated` for keyboard navigation**: Use this when you want Tab to skip to the next focusable element without activating the input.

8. **Use `status` prop for form validation**: Display validation feedback using the `status` prop instead of custom styling.
