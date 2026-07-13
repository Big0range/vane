---
name: n-input-otp
description: A one-time password input component for entering verification codes with support for masking, custom rendering, and form integration
author: jiaiyan
version: 1.0.0
---

# n-input-otp Component

The `n-input-otp` component is designed for entering one-time passwords (OTP) or verification codes. It provides individual input boxes for each character, with support for masking, custom rendering, and paste functionality.

## When to Use

Use `n-input-otp` when you need to:

- Collect verification codes or OTPs
- Create PIN input fields
- Build authentication code entry forms
- Implement two-factor authentication UI
- Create any fixed-length code input

## Basic Usage

### Basic OTP Input

```vue
<template>
  <n-input-otp
    v-model:value="value"
    @focus="onFocus"
    @blur="onBlur"
    @finish="onFinish"
    @update:value="onUpdateValue"
  />
</template>

<script setup>
import { ref } from 'vue';

const value = ref([]);

const onFocus = (e, index) => console.log('Focus:', index);
const onBlur = (e, index) => console.log('Blur:', index);
const onFinish = value => console.log('Finished:', value.join(''));
const onUpdateValue = (value, meta) => console.log('Update:', value, meta);
</script>
```

### Custom Length

```vue
<template>
  <n-input-otp v-model:value="value" :length="4" />
</template>
```

### With Mask (Password Mode)

```vue
<template>
  <n-input-otp v-model:value="value" mask />
</template>
```

### Different Sizes

```vue
<template>
  <n-space vertical>
    <n-input-otp v-model:value="value" size="small" />
    <n-input-otp v-model:value="value" />
    <n-input-otp v-model:value="value" size="large" />
  </n-space>
</template>
```

## API Reference

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `v-model:value` | `string[]` | `undefined` | Value of the component (in controlled mode). |
| `default-value` | `string[]` | `[]` | Default value. |
| `length` | `number` | `6` | Number of characters to initiate. |
| `disabled` | `boolean` | `false` | Whether the component is disabled. |
| `readonly` | `boolean` | `false` | Whether the component is readonly. |
| `mask` | `boolean` | `false` | Whether to enable password mode. |
| `placeholder` | `string` | `''` | Input placeholder. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the component. |
| `status` | `'success' \| 'warning' \| 'error'` | `undefined` | The validation status. |
| `block` | `boolean` | `false` | Whether to fit its width to its parent's width. |
| `gap` | `string \| number` | `undefined` | Gap between different inputs. |
| `allow-input` | `(char: string, index: number, currentValue: string[]) => boolean` | `undefined` | Check the incoming value, if it returns `false`, input will not be accepted. |

### Events

| Name | Parameters | Description |
| --- | --- | --- |
| `update:value` | `(value: string[], meta: { diff, index, source }) => void` | Callback fired when user inputs value. |
| `focus` | `(event: FocusEvent, index: number) => void` | Callback fired when focus moves to the component. |
| `blur` | `(event: FocusEvent, index: number) => void` | Callback fired when focus leaves the component. |
| `finish` | `(value: string[]) => void` | Callback fired when all inputs are filled. |

### Slots

| Name      | Parameters                 | Description             |
| --------- | -------------------------- | ----------------------- |
| `default` | `{ index, ...inputProps }` | Custom input rendering. |

### Methods

| Name | Type | Description |
| --- | --- | --- |
| `focusOnChar` | `(charIndex: number) => void` | Focus on a specific input box. |

## Common Patterns

### Limit to Numbers Only

```vue
<template>
  <n-input-otp :allow-input="onlyAllowNumber" />
</template>

<script setup>
const onlyAllowNumber = char => {
  return /^\d$/.test(char);
};
</script>
```

### Limit to Letters Only

```vue
<template>
  <n-input-otp :allow-input="onlyAllowEnglish" />
</template>

<script setup>
const onlyAllowEnglish = char => {
  return /^[a-zA-Z]$/.test(char);
};
</script>
```

### Custom Rendering with Separators

```vue
<template>
  <n-input-otp v-model:value="value" gap="0">
    <template #default="{ index, ...inputProps }">
      <n-input
        v-bind="inputProps"
        :style="index === 0 ? '' : 'margin-left: 6px;'"
      />
      <span v-if="index === 1" style="padding-left: 6px">-</span>
      <span v-if="index === 3" style="padding-left: 6px">-</span>
    </template>
  </n-input-otp>
</template>
```

### Block Width

```vue
<template>
  <n-input-otp v-model:value="value" block />
</template>
```

### Use with Form Validation

```vue
<template>
  <n-form ref="formRef" :model="formValue" :rules="rules">
    <n-form-item path="passcode" label="Pass Code">
      <n-input-otp v-model:value="formValue.passcode" />
    </n-form-item>
    <n-form-item>
      <n-button @click="handleValidateClick">Validate</n-button>
    </n-form-item>
  </n-form>
</template>

<script setup>
import { ref } from 'vue';

const formRef = ref(null);
const formValue = ref({
  passcode: [],
});

const rules = {
  passcode: {
    required: true,
    validator: (rule, value) => {
      if (value.length !== 6 || value.some(v => !v)) {
        return new Error('Please enter complete 6-digit code');
      }
      return true;
    },
  },
};

const handleValidateClick = () => {
  formRef.value?.validate();
};
</script>
```

### Different Status States

```vue
<template>
  <n-space vertical>
    <n-input-otp :default-value="'123456'.split('')" readonly />
    <n-input-otp :default-value="'123456'.split('')" disabled />
    <n-input-otp :default-value="'123456'.split('')" status="warning" />
    <n-input-otp :default-value="'123456'.split('')" status="error" />
    <n-input-otp :default-value="'123456'.split('')" status="success" />
  </n-space>
</template>
```

### Auto-submit on Complete

```vue
<template>
  <n-input-otp v-model:value="value" @finish="handleSubmit" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref([]);

const handleSubmit = code => {
  const otp = code.join('');
  console.log('Submitting OTP:', otp);
};
</script>
```

## Best Practices

1. **Use `finish` event for auto-submission**: Automatically submit when all characters are entered for better UX.

2. **Set `allow-input` for format restriction**: Restrict input to numbers or letters based on your OTP format.

3. **Use `mask` for sensitive codes**: Enable mask mode for PINs or security codes.

4. **Provide `status` feedback**: Show success/error status after validation.

5. **Use `block` for full-width layouts**: Make the component fill its container for mobile-friendly designs.

6. **Handle paste events gracefully**: The component supports paste by default; ensure your backend handles the complete code.
