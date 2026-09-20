---
name: n-dynamic-input
description: A dynamic input component for managing arrays of values with add, remove, and sort capabilities, supporting input and pair presets
author: jiaiyan
version: 1.0.0
---

# n-dynamic-input Component

The `n-dynamic-input` component allows users to dynamically add, remove, and manage multiple input fields. It supports different presets (input, pair) and custom rendering for complex use cases like environment variables or key-value pairs.

## When to Use

Use `n-dynamic-input` when you need to:

- Collect multiple values that users can add or remove dynamically
- Create key-value pair inputs (e.g., environment variables, configuration settings)
- Build forms with dynamic field management
- Implement sortable lists of input fields
- Create custom dynamic input layouts with validation

## Basic Usage

### Input Preset (Default)

```vue
<template>
  <n-dynamic-input
    v-model:value="value"
    placeholder="Please type here"
    :min="3"
    :max="6"
  />
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(['', '', '']);
</script>
```

### Pair Preset (Key-Value)

```vue
<template>
  <n-dynamic-input
    v-model:value="value"
    preset="pair"
    key-placeholder="Please input the key"
    value-placeholder="Please input the value"
  />
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
</template>

<script setup>
import { ref } from 'vue';

const value = ref([{ key: '', value: '' }]);
</script>
```

### With Sort Button

```vue
<template>
  <n-dynamic-input
    v-model:value="value"
    placeholder="Come on"
    show-sort-button
  />
</template>
```

## API Reference

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `v-model:value` | `unknown[]` | `undefined` | Value in controlled mode. |
| `default-value` | `unknown[]` | `[]` | Default value. |
| `preset` | `'input' \| 'pair'` | `'input'` | The preset type. Works when `$slots.default` is not set. |
| `disabled` | `boolean` | `false` | Whether to disable the dynamic-input. Won't work for custom content. |
| `min` | `number` | `0` | Minimum number of items. |
| `max` | `number` | `undefined` | Maximum number of items. |
| `show-sort-button` | `boolean` | `false` | Whether to show sort button. |
| `item-style` | `string \| Object` | `undefined` | The style of each item. |
| `item-class` | `string` | `undefined` | The class of each item. |
| `key-field` | `string` | `undefined` | The key for list rendering. |
| `create-button-props` | `ButtonProps` | `undefined` | Props of create item button. |

### Props for Input Preset

| Name          | Type     | Default | Description                |
| ------------- | -------- | ------- | -------------------------- |
| `placeholder` | `string` | `''`    | Placeholder for each item. |

### Props for Pair Preset

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `key-placeholder` | `string` | `''` | The placeholder of each item's key. |
| `value-placeholder` | `string` | `''` | The placeholder of each item's value. |

### Events

| Name | Parameters | Description |
| --- | --- | --- |
| `update:value` | `(value: any) => void` | On value changed callback. |
| `create` | `(index: number) => any` | Add button click callback. Return value becomes the initial value of new item. |
| `remove` | `(index: number) => void` | Remove button callback. |

### Slots

| Name | Parameters | Description |
| --- | --- | --- |
| `default` | `{ value: any, index: number }` | The content of each item. |
| `action` | `{ value, index, create, remove, move }` | Customizing action buttons. |
| `create-button-default` | `()` | Content of create button. |
| `create-button-icon` | `()` | Icon of create button. |

## Common Patterns

### Custom Input Content

```vue
<template>
  <n-dynamic-input v-model:value="customValue" :on-create="onCreate">
    <template #default="{ value, index }">
      <div style="display: flex; align-items: center; gap: 8px;">
        <n-input v-model:value="value.name" placeholder="Name" />
        <n-input v-model:value="value.age" placeholder="Age" />
      </div>
    </template>
    <template #create-button-default> Add whatever you want </template>
  </n-dynamic-input>
</template>

<script setup>
import { ref } from 'vue';

const customValue = ref([]);

const onCreate = () => {
  return { name: '', age: '' };
};
</script>
```

### Form Validation with Dynamic Input

```vue
<template>
  <n-form :model="model">
    <n-dynamic-input
      v-model:value="model.dynamicInputValue"
      item-style="margin-bottom: 0;"
      :on-create="onCreate"
      #="{ index }"
    >
      <div style="display: flex">
        <n-form-item
          ignore-path-change
          :show-label="false"
          :path="`dynamicInputValue[${index}].name`"
          :rule="dynamicInputRule"
        >
          <n-input
            v-model:value="model.dynamicInputValue[index].name"
            placeholder="Name"
            @keydown.enter.prevent
          />
        </n-form-item>
        <div style="height: 34px; line-height: 34px; margin: 0 8px">=</div>
        <n-form-item
          ignore-path-change
          :show-label="false"
          :path="`dynamicInputValue[${index}].value`"
          :rule="dynamicInputRule"
        >
          <n-input
            v-model:value="model.dynamicInputValue[index].value"
            placeholder="Value"
            @keydown.enter.prevent
          />
        </n-form-item>
      </div>
    </n-dynamic-input>
  </n-form>
</template>

<script setup>
import { ref } from 'vue';

const model = ref({
  dynamicInputValue: [{ name: '', value: '' }],
});

const dynamicInputRule = {
  required: true,
  message: 'This field is required',
  trigger: ['blur', 'input'],
};

const onCreate = () => ({ name: '', value: '' });
</script>
```

### Custom Action Buttons

```vue
<template>
  <n-dynamic-input v-model:value="value" placeholder="Come on">
    <template #action="{ index, create, remove, move }">
      <n-space style="margin-left: 20px">
        <n-button @click="() => create(index)">
          <template #icon><AddIcon /></template>
        </n-button>
        <n-button @click="() => remove(index)">
          <template #icon><RemoveIcon /></template>
        </n-button>
        <n-button @click="() => move('up', index)">
          <template #icon><UpIcon /></template>
        </n-button>
        <n-button @click="() => move('down', index)">
          <template #icon><DownIcon /></template>
        </n-button>
      </n-space>
    </template>
  </n-dynamic-input>
</template>
```

## Best Practices

1. **Use `ignore-path-change` for form validation**: When using `n-dynamic-input` inside `n-form`, set `ignore-path-change` on `n-form-item` to prevent validation clearing on path changes.

2. **Prevent Enter key default behavior**: Use `@keydown.enter.prevent` on inputs inside dynamic-input to prevent form submission.

3. **Set `on-create` for custom items**: Always provide an `on-create` callback when using custom slot content to initialize new items properly.

4. **Use `min` and `max` for constraints**: Set minimum and maximum item counts to guide user input.

5. **Consider custom implementation for complex needs**: If the component doesn't fit your use case, it may be easier to build a custom solution.
