---
name: n-radio
description: A radio button component for single selection from a set of options in Naive UI. Supports individual radio buttons, radio groups, and button-style radio groups with various sizes and states.
metadata:
  author: jiaiyan
  version: 1.0.0
---

# n-radio Component

The `n-radio` component allows users to select a single option from a set of choices. It works with `n-radio-group` for coordinated selection and `n-radio-button` for button-style radio options.

## When to Use

Use `n-radio` when you need to:

- **Single Selection**: Allow users to select exactly one option from a set
- **Mutually Exclusive Options**: When selecting one option should automatically deselect others
- **Limited Options**: When there are a small number of choices (2-7 options)
- **Button Style Selection**: When you want a more prominent, button-like selection interface
- **Form Integration**: Integrate with forms for data collection

## Basic Usage

### Basic Radio

A simple radio button with manual state management.

```vue
<template>
  <n-space>
    <n-radio
      :checked="checkedValue === 'Option1'"
      value="Option1"
      name="basic-demo"
      @change="handleChange"
    >
      Option 1
    </n-radio>
    <n-radio
      :checked="checkedValue === 'Option2'"
      value="Option2"
      name="basic-demo"
      @change="handleChange"
    >
      Option 2
    </n-radio>
    <n-radio
      :checked="checkedValue === 'Option3'"
      value="Option3"
      :disabled="disabled"
      name="basic-demo"
      @change="handleChange"
    >
      Option 3 (Disabled)
    </n-radio>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const checkedValue = ref('Option1');
const disabled = ref(true);

const handleChange = e => {
  checkedValue.value = e.target.value;
};
</script>
```

### Radio Group

Using `n-radio-group` for coordinated selection with `v-model`.

```vue
<template>
  <n-radio-group v-model:value="selectedValue" name="radiogroup">
    <n-space>
      <n-radio
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :label="option.label"
      />
    </n-space>
  </n-radio-group>
  <p>Selected: {{ selectedValue }}</p>
</template>

<script setup>
import { ref } from 'vue';

const selectedValue = ref(null);
const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];
</script>
```

### Button Style Radio Group

A more prominent button-style radio group.

```vue
<template>
  <n-space vertical>
    <n-radio-group v-model:value="selectedSize" name="size-group">
      <n-radio-button
        v-for="size in sizes"
        :key="size.value"
        :value="size.value"
        :disabled="size.disabled"
      >
        {{ size.label }}
      </n-radio-button>
    </n-radio-group>
    <p>Selected size: {{ selectedSize }}</p>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const selectedSize = ref('medium');
const sizes = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large', disabled: true },
];
</script>
```

### Different Sizes

Radio buttons support different sizes.

```vue
<template>
  <n-space vertical>
    <n-radio-group v-model:value="value" size="small" name="small-group">
      <n-radio-button value="a">Small A</n-radio-button>
      <n-radio-button value="b">Small B</n-radio-button>
    </n-radio-group>
    <n-radio-group v-model:value="value" size="medium" name="medium-group">
      <n-radio-button value="a">Medium A</n-radio-button>
      <n-radio-button value="b">Medium B</n-radio-button>
    </n-radio-group>
    <n-radio-group v-model:value="value" size="large" name="large-group">
      <n-radio-button value="a">Large A</n-radio-button>
      <n-radio-button value="b">Large B</n-radio-button>
    </n-radio-group>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('a');
</script>
```

## API Reference

### n-radio Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean` | `undefined` | Checked state (controlled mode) |
| `default-checked` | `boolean` | `false` | Default checked state (uncontrolled mode) |
| `disabled` | `boolean` | `false` | Whether the radio is disabled |
| `label` | `string` | `undefined` | Radio label text. If not set, renders default slot content |
| `name` | `string` | `undefined` | The name attribute of the radio element. Inherits from `n-radio-group` if not set |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the radio |
| `value` | `string \| number \| boolean` | `'on'` | The value when checked |

### n-radio-button Props

Same props as `n-radio`, plus:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| All props from `n-radio` | - | - | Inherits all props from `n-radio` |

### n-radio-group Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | Whether all radios in the group are disabled |
| `name` | `string` | `undefined` | The name attribute for all radio elements in the group |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size for all radios in the group |
| `value` | `string \| number \| boolean \| null` | `null` | The selected value (controlled mode) |
| `default-value` | `string \| number \| boolean \| null` | `null` | Default selected value (uncontrolled mode) |

### Events

#### n-radio Events

| Name | Parameters | Description |
| --- | --- | --- |
| `on-update:checked` | `(checked: boolean) => void` | Callback when checked state changes |

#### n-radio-group Events

| Name | Parameters | Description |
| --- | --- | --- |
| `on-update:value` | `(value: string \| number \| boolean) => void` | Callback when selected value changes |

### Slots

#### n-radio Slots

| Name      | Parameters | Description         |
| --------- | ---------- | ------------------- |
| `default` | `()`       | Radio label content |

#### n-radio-button Slots

| Name      | Parameters | Description          |
| --------- | ---------- | -------------------- |
| `default` | `()`       | Radio button content |

## Common Patterns

### Radio in Form

```vue
<template>
  <n-form ref="formRef" :model="formData" :rules="rules">
    <n-form-item label="Gender" path="gender">
      <n-radio-group v-model:value="formData.gender">
        <n-radio value="male">Male</n-radio>
        <n-radio value="female">Female</n-radio>
        <n-radio value="other">Other</n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="Subscription" path="subscription">
      <n-radio-group v-model:value="formData.subscription">
        <n-radio-button value="free">Free</n-radio-button>
        <n-radio-button value="pro">Pro</n-radio-button>
        <n-radio-button value="enterprise">Enterprise</n-radio-button>
      </n-radio-group>
    </n-form-item>
  </n-form>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  gender: null,
  subscription: 'free',
});

const rules = {
  gender: {
    required: true,
    message: 'Please select gender',
    trigger: 'change',
  },
};
</script>
```

### Dynamic Radio Options

```vue
<template>
  <n-radio-group v-model:value="selectedCity">
    <n-space>
      <n-radio
        v-for="city in cities"
        :key="city.id"
        :value="city.id"
        :disabled="city.disabled"
      >
        {{ city.name }}
      </n-radio>
    </n-space>
  </n-radio-group>
</template>

<script setup>
import { ref } from 'vue';

const selectedCity = ref(null);
const cities = ref([
  { id: 'beijing', name: 'Beijing', disabled: false },
  { id: 'shanghai', name: 'Shanghai', disabled: false },
  { id: 'guangzhou', name: 'Guangzhou', disabled: true },
]);
</script>
```

### With Conditional Rendering

```vue
<template>
  <n-radio-group v-model:value="deliveryMethod">
    <n-radio value="standard">Standard Delivery</n-radio>
    <n-radio value="express">Express Delivery</n-radio>
    <n-radio value="pickup">Store Pickup</n-radio>
  </n-radio-group>

  <n-card v-if="deliveryMethod === 'express'" title="Express Options">
    <n-radio-group v-model:value="expressOption">
      <n-radio-button value="same-day">Same Day</n-radio-button>
      <n-radio-button value="next-day">Next Day</n-radio-button>
    </n-radio-group>
  </n-card>
</template>

<script setup>
import { ref } from 'vue';

const deliveryMethod = ref('standard');
const expressOption = ref('next-day');
</script>
```

## Best Practices

### 1. Use Radio Group for Multiple Options

Always use `n-radio-group` when you have multiple radio buttons that should work together:

```vue
<template>
  <n-radio-group v-model:value="selected">
    <n-radio value="a">Option A</n-radio>
    <n-radio value="b">Option B</n-radio>
  </n-radio-group>
</template>
```

### 2. Use Button Style for Prominent Options

Use `n-radio-button` when options need to be more visually prominent:

```vue
<template>
  <n-radio-group v-model:value="viewMode">
    <n-radio-button value="grid">Grid View</n-radio-button>
    <n-radio-button value="list">List View</n-radio-button>
  </n-radio-group>
</template>
```

### 3. Provide Clear Labels

Always provide clear, descriptive labels for each option:

```vue
<template>
  <n-radio value="save">Save to local storage</n-radio>
</template>
```

### 4. Consider Checkbox for Non-Exclusive Options

Use `n-checkbox` instead when users can select multiple options:

```vue
<template>
  <n-checkbox-group v-model:value="selected">
    <n-checkbox value="a">Option A</n-checkbox>
    <n-checkbox value="b">Option B</n-checkbox>
  </n-checkbox-group>
</template>
```

### 5. Disable Unavailable Options

Disable options that are not currently available rather than hiding them:

```vue
<template>
  <n-radio-group v-model:value="plan">
    <n-radio value="free">Free Plan</n-radio>
    <n-radio value="pro" :disabled="!canUpgrade"
      >Pro Plan (Upgrade Required)</n-radio
    >
  </n-radio-group>
</template>
```

### 6. Set Consistent Size at Group Level

Set size on the group to ensure all radios have consistent sizing:

```vue
<template>
  <n-radio-group v-model:value="value" size="large">
    <n-radio value="a">Option A</n-radio>
    <n-radio value="b">Option B</n-radio>
  </n-radio-group>
</template>
```
