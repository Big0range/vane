---
name: n-form
description: A comprehensive form component for data collection, validation, and submission in Naive UI. Provides flexible layout options, built-in validation rules, and seamless integration with various input components.
metadata:
  author: jiaiyan
  version: 1.0.0
---

# n-form Component

The `n-form` component is the primary element for collecting and validating user input data in Naive UI applications. It works in conjunction with `n-form-item` to create structured, validated forms.

## When to Use

Use `n-form` when you need to:

- **Data Collection**: Gather structured user input through various form controls
- **Form Validation**: Apply validation rules with automatic error display
- **Form Submission**: Handle form submission with validation checks
- **Dynamic Forms**: Create forms that can add or remove fields dynamically
- **Complex Layouts**: Build forms with flexible label placements and grid layouts

## Basic Usage

### Inline Form

An inline form displays form items horizontally in a single row.

```vue
<template>
  <n-form
    ref="formRef"
    inline
    :label-width="80"
    :model="formValue"
    :rules="rules"
  >
    <n-form-item label="Name" path="user.name">
      <n-input v-model:value="formValue.user.name" placeholder="Input Name" />
    </n-form-item>
    <n-form-item label="Age" path="user.age">
      <n-input v-model:value="formValue.user.age" placeholder="Input Age" />
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
  user: {
    name: '',
    age: '',
  },
});

const rules = {
  user: {
    name: {
      required: true,
      message: 'Please input name',
      trigger: 'blur',
    },
    age: {
      required: true,
      message: 'Please input age',
      trigger: 'blur',
    },
  },
};

const handleValidateClick = () => {
  formRef.value?.validate(errors => {
    if (!errors) {
      console.log('Validation passed');
    } else {
      console.log('Validation failed', errors);
    }
  });
};
</script>
```

### Form with Validation

A standard form with comprehensive validation rules.

```vue
<template>
  <n-form ref="formRef" :model="modelRef" :rules="rules">
    <n-form-item path="age" label="Age">
      <n-input v-model:value="modelRef.age" @keydown.enter.prevent />
    </n-form-item>
    <n-form-item path="password" label="Password">
      <n-input
        v-model:value="modelRef.password"
        type="password"
        @input="handlePasswordInput"
        @keydown.enter.prevent
      />
    </n-form-item>
    <n-form-item
      ref="rPasswordFormItemRef"
      first
      path="reenteredPassword"
      label="Re-enter Password"
    >
      <n-input
        v-model:value="modelRef.reenteredPassword"
        :disabled="!modelRef.password"
        type="password"
        @keydown.enter.prevent
      />
    </n-form-item>
    <n-form-item>
      <n-button type="primary" @click="handleValidateButtonClick">
        Validate
      </n-button>
    </n-form-item>
  </n-form>
</template>

<script setup>
import { ref } from 'vue';

const formRef = ref(null);
const rPasswordFormItemRef = ref(null);
const modelRef = ref({
  age: null,
  password: '',
  reenteredPassword: '',
});

const rules = {
  age: [
    {
      required: true,
      type: 'number',
      message: 'Please input age',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: 'Please input password',
      trigger: 'blur',
    },
  ],
  reenteredPassword: [
    {
      required: true,
      message: 'Please re-enter password',
      trigger: 'blur',
    },
    {
      validator: (rule, value) => {
        return value === modelRef.value.password;
      },
      message: 'Password does not match',
      trigger: 'blur',
    },
  ],
};

const handlePasswordInput = () => {
  if (modelRef.value.reenteredPassword) {
    rPasswordFormItemRef.value?.validate({ trigger: 'password-input' });
  }
};

const handleValidateButtonClick = () => {
  formRef.value?.validate(errors => {
    if (!errors) {
      console.log('Validation passed');
    }
  });
};
</script>
```

### Label Placement Top with Grid

Use `n-grid` and `n-form-item-gi` for precise form layout control.

```vue
<template>
  <n-form ref="formRef" :model="model" :rules="rules" label-placement="top">
    <n-grid :span="24" :x-gap="24">
      <n-form-item-gi :span="12" label="Input" path="inputValue">
        <n-input v-model:value="model.inputValue" placeholder="Input" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Select" path="selectValue">
        <n-select
          v-model:value="model.selectValue"
          placeholder="Select"
          :options="generalOptions"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Datetime" path="datetimeValue">
        <n-date-picker v-model:value="model.datetimeValue" type="datetime" />
      </n-form-item-gi>
      <n-gi :span="24">
        <n-button type="primary" @click="handleValidateButtonClick">
          Validate
        </n-button>
      </n-gi>
    </n-grid>
  </n-form>
</template>
```

## API Reference

### n-form Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | Whether to disable all form items |
| `inline` | `boolean` | `false` | Whether to display as an inline form |
| `label-width` | `number \| string \| 'auto'` | `undefined` | The width of label. `'auto'` means label width will be auto adjusted |
| `label-align` | `'left' \| 'right'` | `-` | Label text alignment |
| `label-placement` | `'left' \| 'top'` | `'top'` | Label placement |
| `model` | `Object` | `{}` | The object to get/set form item values |
| `rules` | `FormRules` | `{}` | The rules to validate form items |
| `show-feedback` | `boolean` | `true` | Whether to show the feedback area |
| `show-label` | `boolean` | `true` | Whether to show the label |
| `show-require-mark` | `boolean` | `-` | Whether to show a required symbol when a form item is required |
| `require-mark-placement` | `'left' \| 'right' \| 'right-hanging'` | `'right'` | Require mark placement |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of form items |
| `validate-messages` | `FormValidateMessages` | `undefined` | Custom validation messages |

### n-form-item Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `content-class` | `string` | `undefined` | The class name of the content |
| `content-style` | `string \| object` | `undefined` | The style of the content |
| `feedback` | `string` | `undefined` | The feedback message. If set, it replaces rule-based validation result |
| `feedback-class` | `string` | `undefined` | Feedback class for styling |
| `feedback-style` | `string \| object` | `undefined` | Feedback style for positioning |
| `first` | `boolean` | `false` | Whether to only show the first validation error message |
| `ignore-path-change` | `boolean` | `false` | Whether to ignore path change and preserve validation result |
| `label` | `string` | `undefined` | Label text |
| `label-align` | `'left' \| 'right'` | `undefined` | Label text alignment (inherits from parent form) |
| `label-placement` | `'left' \| 'top'` | `undefined` | Label placement (inherits from parent form) |
| `label-props` | `LabelHTMLAttributes` | `undefined` | HTML attributes of the label element |
| `label-style` | `CSSProperties \| string` | `undefined` | Label style |
| `label-width` | `number \| string \| 'auto'` | `undefined` | Label width (inherits from parent form) |
| `path` | `string` | `undefined` | The path to use in the parent form's model object |
| `required` | `boolean` | `false` | Whether to show the "required" symbol (does not affect validation) |
| `rule` | `FormItemRule \| Array<FormItemRule>` | `undefined` | The rule to validate this form item |
| `rule-path` | `string` | `undefined` | The path to get rules from parent form's rule object |
| `show-feedback` | `boolean` | `true` | Whether to show the feedback area |
| `show-label` | `boolean` | `true` | Whether to show a label |
| `show-require-mark` | `boolean` | `-` | Whether to show required symbol |
| `require-mark-placement` | `'left' \| 'right' \| 'right-hanging'` | `'right'` | Require mark placement |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size |
| `validation-status` | `'error' \| 'success' \| 'warning'` | `undefined` | The validation status (overrides rule-based validation) |

### n-form-item-gi Props

Accepts all props from `n-form-item` and `n-grid-item`.

### FormItemRule Type

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `asyncValidator` | `(rule, value, callback) => void` | `undefined` | Asynchronous validation callback |
| `key` | `string` | `undefined` | Unique key for partial rule application |
| `level` | `'error' \| 'warning'` | `undefined` | Validation level. `'warning'` is skipped if errors exist |
| `message` | `string` | `undefined` | Error message when validation fails |
| `renderMessage` | `() => VNodeChild` | `undefined` | Render function for message |
| `required` | `boolean` | `undefined` | Whether the field is required |
| `trigger` | `string \| Array<string>` | `undefined` | Validation trigger type(s) |
| `validator` | `(rule, value) => boolean \| Error` | `undefined` | Custom validation function |
| `type` | `string` | `undefined` | Value type (e.g., `'number'`, `'string'`, `'email'`) |
| `min` | `number` | `undefined` | Minimum length/value |
| `max` | `number` | `undefined` | Maximum length/value |
| `pattern` | `RegExp` | `undefined` | Pattern to match |
| `enum` | `Array` | `undefined` | Enumerated values |
| `whitespace` | `boolean` | `undefined` | Whether to treat whitespace as error |
| `fields` | `object` | `undefined` | Nested field rules |

### Events

| Name | Parameters | Description                        |
| ---- | ---------- | ---------------------------------- |
| -    | -          | n-form does not emit custom events |

### Slots

#### n-form Slots

| Name      | Parameters | Description  |
| --------- | ---------- | ------------ |
| `default` | `()`       | Form content |

#### n-form-item Slots

| Name       | Parameters | Description             |
| ---------- | ---------- | ----------------------- |
| `default`  | `()`       | Form item content       |
| `feedback` | `()`       | Custom feedback content |
| `label`    | `()`       | Custom label content    |

### Methods

#### n-form Methods

| Name | Type | Description |
| --- | --- | --- |
| `validate` | `(validateCallback?, shouldRuleBeApplied?) => Promise` | Validate the form. Returns promise that rejects with `Array<FormValidationError>` on failure |
| `restoreValidation` | `() => void` | Restore/clear all validation states |
| `invalidateLabelWidth` | `() => void` | Recalculate label widths (useful with `label-width="auto"`) |

#### n-form-item Methods

| Name | Type | Description |
| --- | --- | --- |
| `validate` | `(options?) => Promise` | Validate the form item with optional trigger and callback |
| `restoreValidation` | `() => void` | Restore/clear validation state |

## Common Patterns

### Validation Rules Examples

```javascript
const rules = {
  // Required field
  name: {
    required: true,
    message: 'Please input name',
    trigger: 'blur',
  },

  // Number type with range
  age: [
    { required: true, type: 'number', message: 'Please input age' },
    {
      type: 'number',
      min: 0,
      max: 150,
      message: 'Age must be between 0 and 150',
    },
  ],

  // Email validation
  email: {
    type: 'email',
    message: 'Please input valid email',
    trigger: 'blur',
  },

  // Custom validator
  password: {
    validator: (rule, value) => {
      return value.length >= 8;
    },
    message: 'Password must be at least 8 characters',
    trigger: 'blur',
  },

  // Async validation
  username: {
    asyncValidator: async (rule, value) => {
      const exists = await checkUsernameExists(value);
      if (exists) {
        throw new Error('Username already exists');
      }
    },
    trigger: 'blur',
  },

  // Warning level validation
  score: {
    level: 'warning',
    validator: (rule, value) => value >= 60,
    message: 'Score is below passing grade',
    trigger: 'blur',
  },
};
```

### Custom Validation

```vue
<template>
  <n-form-item
    label="Airports"
    :validation-status="inputValidationStatus"
    :feedback="inputFeedback"
  >
    <n-input v-model:value="inputValue" clearable />
  </n-form-item>
</template>

<script setup>
import { ref, computed } from 'vue';

const inputValue = ref('');

const inputValidationStatus = computed(() => {
  if (!inputValue.value) return undefined;
  return inputValue.value.length < 3 ? 'error' : 'success';
});

const inputFeedback = computed(() => {
  if (!inputValue.value) return '';
  return inputValue.value.length < 3 ? 'Minimum 3 characters' : '';
});
</script>
```

### Dynamic Form

```vue
<template>
  <n-form ref="formRef" :model="dynamicForm">
    <n-form-item
      v-for="(item, index) in dynamicForm.hobbies"
      :key="index"
      :label="`Hobby ${index + 1}`"
      :path="`hobbies[${index}].name`"
      :rule="{
        required: true,
        message: 'Please input hobby',
        trigger: 'blur',
      }"
    >
      <n-input v-model:value="item.name" />
      <n-button @click="removeHobby(index)">Remove</n-button>
    </n-form-item>

    <n-form-item>
      <n-button @click="addHobby">Add Hobby</n-button>
    </n-form-item>
  </n-form>
</template>

<script setup>
import { ref } from 'vue';

const dynamicForm = ref({
  hobbies: [{ name: '' }],
});

const addHobby = () => {
  dynamicForm.value.hobbies.push({ name: '' });
};

const removeHobby = index => {
  dynamicForm.value.hobbies.splice(index, 1);
};
</script>
```

### Partial Validation

```vue
<template>
  <n-form ref="formRef" :model="model" :rules="rules">
    <n-form-item label="Field A" path="fieldA">
      <n-input v-model:value="model.fieldA" />
    </n-form-item>
    <n-form-item label="Field B" path="fieldB">
      <n-input v-model:value="model.fieldB" />
    </n-form-item>
    <n-button @click="validateFieldAOnly">Validate Field A Only</n-button>
  </n-form>
</template>

<script setup>
const validateFieldAOnly = () => {
  formRef.value?.validate(undefined, rule => {
    return rule.key === 'fieldA';
  });
};
</script>
```

## Best Practices

### 1. Use Nested Paths for Complex Data

```javascript
// Model structure
const model = {
  user: {
    profile: {
      name: '',
      email: '',
    },
  },
};

// Form item path
// <n-form-item path="user.profile.name">
```

### 2. Set Proper Triggers

```javascript
const rules = {
  // Validate on blur for text inputs
  name: { required: true, trigger: 'blur' },

  // Validate on input for immediate feedback
  password: { required: true, trigger: ['input', 'blur'] },

  // Multiple triggers
  email: { type: 'email', trigger: ['input', 'blur'] },
};
```

### 3. Use `first` for Better UX

When a field has multiple validation rules, use `first` to show only the first error:

```vue
<n-form-item first path="password" label="Password">
  <n-input v-model:value="model.password" type="password" />
</n-form-item>
```

### 4. Number Type for Required Number Fields

```javascript
const rules = {
  age: {
    required: true,
    type: 'number', // Important for number validation
    message: 'Please input age',
  },
};
```

### 5. Reset Form Properly

```javascript
const resetForm = () => {
  formRef.value?.restoreValidation();
  Object.assign(model, getDefaultModel());
};
```

### 6. Use Warning Level for Non-blocking Validations

```javascript
const rules = {
  score: {
    level: 'warning', // Won't block form submission
    validator: (rule, value) => value >= 60,
    message: 'Score is below passing grade',
  },
};
```

### 7. Leverage Grid for Complex Layouts

Use `n-form-item-gi` with `n-grid` for responsive, multi-column layouts:

```vue
<n-form label-placement="top">
  <n-grid :cols="24" :x-gap="24">
    <n-form-item-gi :span="12" label="First Name" path="firstName">
      <n-input v-model:value="model.firstName" />
    </n-form-item-gi>
    <n-form-item-gi :span="12" label="Last Name" path="lastName">
      <n-input v-model:value="model.lastName" />
    </n-form-item-gi>
  </n-grid>
</n-form>
```

### 8. Custom Validation Messages

```vue
<template>
  <n-form :model="form" :rules="rules" :validate-messages="customMessages">
    <!-- form items -->
  </n-form>
</template>

<script setup>
const customMessages = {
  required: 'This field is required',
  types: {
    email: 'Please enter a valid email address',
  },
};
</script>
```
