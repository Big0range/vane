---
name: n-input-number
description: A numeric input component with step controls, formatting, validation, and min/max constraints
author: jiaiyan
version: 1.0.0
---

# n-input-number Component

The `n-input-number` component is a specialized input for numeric values. It provides increment/decrement buttons, min/max constraints, precision control, and custom formatting capabilities.

## When to Use

Use `n-input-number` when you need to:

- Collect numeric input from users
- Implement quantity selectors with step controls
- Create price or currency inputs with formatting
- Enforce numeric ranges with min/max constraints
- Display numbers with custom formatting (e.g., thousand separators)

## Basic Usage

### Basic Number Input

```vue
<template>
  <n-input-number v-model:value="value" clearable />
</template>

<script setup>
import { ref } from 'vue';

const value = ref(null);
</script>
```

### With Min and Max

```vue
<template>
  <n-input-number
    v-model:value="value"
    :min="-10"
    :max="10"
    placeholder="Enter value"
  />
</template>
```

### With Step

```vue
<template>
  <n-input-number v-model:value="value" :step="5" />
</template>
```

### Different Sizes

```vue
<template>
  <n-space vertical>
    <n-input-number v-model:value="value" size="tiny" />
    <n-input-number v-model:value="value" size="small" />
    <n-input-number v-model:value="value" size="medium" />
    <n-input-number v-model:value="value" size="large" />
  </n-space>
</template>
```

## API Reference

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `v-model:value` | `number \| null` | `undefined` | Manually set the input value. |
| `default-value` | `number \| null` | `null` | Default value when not manually set. |
| `placeholder` | `string` | `'Please Input'` | Placeholder. |
| `disabled` | `boolean` | `false` | Whether to disable the input. |
| `readonly` | `boolean` | `false` | Whether it's readonly. |
| `clearable` | `boolean` | `false` | Whether the input is clearable. |
| `min` | `number` | `undefined` | The min value. |
| `max` | `number` | `undefined` | The max value. |
| `step` | `number` | `1` | The increment/decrement step value. |
| `precision` | `number` | `undefined` | Precision of input value. Disables `update-value-on-input`. |
| `size` | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | The size of input box. |
| `show-button` | `boolean` | `true` | Whether to show increase/decrease buttons. |
| `button-placement` | `'both' \| 'right'` | `'right'` | Placement of add & minus button. |
| `bordered` | `boolean` | `true` | Whether to show a border. |
| `round` | `boolean` | `undefined` | Use a rounded input style. |
| `loading` | `boolean` | `undefined` | Set loading state. |
| `autofocus` | `boolean` | `false` | Whether to autofocus. |
| `status` | `'success' \| 'warning' \| 'error'` | `undefined` | Validation status. |
| `format` | `(value: number \| null) => string` | `undefined` | Method to format display value. Disables `update-value-on-input`. |
| `parse` | `(input: string) => number \| null` | `undefined` | Method to parse input string. Disables `update-value-on-input`. |
| `validator` | `(value: number) => boolean` | `undefined` | Setup custom validation. |
| `keyboard` | `{ ArrowUp?: boolean, ArrowDown?: boolean }` | `{}` | Control keyboard behavior. |
| `update-value-on-input` | `boolean` | `true` | Whether to change value on input if valid. |
| `input-props` | `InputHTMLAttributes` | `undefined` | DOM props of the internal input element. |

### Events

| Name | Parameters | Description |
| --- | --- | --- |
| `update:value` | `(value: number \| null) => void` | Callback when value changes. |
| `focus` | `(event: FocusEvent) => void` | Callback when input is focused. |
| `blur` | `(event: FocusEvent) => void` | Callback when input loses focus. |
| `clear` | `() => void` | Callback when input is cleared. |

### Slots

| Name         | Parameters | Description               |
| ------------ | ---------- | ------------------------- |
| `prefix`     | `()`       | Prefix content slot.      |
| `suffix`     | `()`       | Suffix content slot.      |
| `add-icon`   | `()`       | Icon of the add button.   |
| `minus-icon` | `()`       | Icon of the minus button. |

### Methods

| Name    | Type         | Description             |
| ------- | ------------ | ----------------------- |
| `focus` | `() => void` | Focus the input number. |
| `blur`  | `() => void` | Blur the input number.  |

## Common Patterns

### Currency Input with Formatting

```vue
<template>
  <n-input-number
    :default-value="1075"
    :parse="parseCurrency"
    :format="formatCurrency"
  />
</template>

<script setup>
const parseCurrency = input => {
  const num = parseFloat(input.replace(/[^0-9.-]/g, ''));
  return isNaN(num) ? null : num;
};

const formatCurrency = value => {
  if (value === null) return '';
  return `$${value.toLocaleString()}`;
};
</script>
```

### Thousand Separator Formatting

```vue
<template>
  <n-input-number :default-value="10000" :parse="parse" :format="format" />
</template>

<script setup>
const parse = input => {
  const num = parseFloat(input.replace(/,/g, ''));
  return isNaN(num) ? null : num;
};

const format = value => {
  if (value === null) return '';
  return value.toLocaleString();
};
</script>
```

### With Prefix and Suffix

```vue
<template>
  <n-space vertical>
    <n-input-number v-model:value="price">
      <template #prefix>$</template>
    </n-input-number>
    <n-input-number v-model:value="percent">
      <template #suffix>%</template>
    </n-input-number>
  </n-space>
</template>
```

### Button Placement on Both Sides

```vue
<template>
  <n-input-number v-model:value="value" button-placement="both" />
</template>
```

### Custom Validation

```vue
<template>
  <n-input-number v-model:value="value" :validator="validator" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref(null);

const validator = value => {
  return value % 2 === 0;
};
</script>
```

### Disabled Keyboard Arrow Keys

```vue
<template>
  <n-input-number :keyboard="{ ArrowUp: false, ArrowDown: false }" />
</template>
```

### Update Value on Blur Only

```vue
<template>
  <n-input-number
    v-model:value="value"
    :update-value-on-input="false"
    :min="20"
    :max="50"
  />
</template>
```

### Custom Icons

```vue
<template>
  <n-input-number v-model:value="value">
    <template #minus-icon>
      <n-icon :component="ArrowDownCircleOutline" />
    </template>
    <template #add-icon>
      <n-icon :component="ArrowUpCircleOutline" />
    </template>
  </n-input-number>
</template>
```

## Best Practices

1. **Use `precision` for decimal inputs**: Set precision to control decimal places for prices, percentages, etc.

2. **Combine `format` and `parse` together**: Always set both when implementing custom formatting to ensure proper value handling.

3. **Set `update-value-on-input` to `false` for expensive operations**: Prevent frequent updates during typing for better performance.

4. **Use `validator` for business logic validation**: Implement custom validation rules beyond simple min/max.

5. **Disable buttons with `show-button`**: Hide buttons when you want a cleaner numeric input without step controls.

6. **Use `loading` state for async validation**: Show loading indicator during async validation or calculation.
