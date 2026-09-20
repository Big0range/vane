---
name: n-transfer
description: A dual-list transfer component for moving items between source and target lists with filtering, virtual scrolling, and custom rendering capabilities
author: jiaiyan
version: 1.0.0
---

# n-transfer Component

The `n-transfer` component is a dual-list selection interface that allows users to move items between a source list and a target list. It's ideal for scenarios where users need to select multiple items from a larger pool, such as assigning permissions, selecting team members, or configuring features.

## When to Use

Use `n-transfer` when you need to:

- **Multi-Item Selection**: Allow users to select multiple items from a large pool of options
- **Permission Assignment**: Assign permissions or roles to users with clear visual feedback
- **Team Member Selection**: Select multiple team members for projects or tasks
- **Feature Configuration**: Enable/disable features with a clear before/after view
- **Large Datasets**: Handle large datasets efficiently with virtual scrolling

## Basic Usage

### Basic Transfer

```vue
<template>
  <n-transfer v-model:value="value" :options="options" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref([]);
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
];
</script>
```

### Large Data with Virtual Scroll

```vue
<template>
  <n-transfer v-model:value="value" :options="options" virtual-scroll />
</template>

<script setup>
import { ref } from 'vue';

const value = ref([]);
const options = Array.from({ length: 1000 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: String(i + 1),
}));
</script>
```

### Filterable Transfer

```vue
<template>
  <n-space vertical>
    <n-transfer
      v-model:value="value1"
      virtual-scroll
      :options="options"
      source-filterable
    />
    <n-transfer
      v-model:value="value2"
      virtual-scroll
      :options="options"
      target-filterable
    />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const value1 = ref([]);
const value2 = ref([]);
const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];
</script>
```

### Custom Labels

```vue
<template>
  <n-transfer
    v-model:value="value"
    :options="options"
    :render-target-label="renderLabel"
  />
</template>

<script setup>
import { ref, h } from 'vue';

const value = ref([]);
const options = [
  { label: 'User A', value: 'a' },
  { label: 'User B', value: 'b' },
];

const renderLabel = ({ option }) => {
  return h('div', { style: { display: 'flex', alignItems: 'center' } }, [
    h('span', { style: { marginRight: '8px' } }, '👤'),
    h('span', option.label),
  ]);
};
</script>
```

### Custom Source List

```vue
<template>
  <n-transfer
    v-model:value="value"
    :options="options"
    :render-source-list="renderSourceList"
    source-filterable
  />
</template>
```

## API Reference

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `v-model:value` | `Array<string \| number> \| null` | `undefined` | Selected values in the target list. |
| `default-value` | `Array<string \| number> \| null` | `null` | Default uncontrolled value. |
| `options` | `TransferOption[]` | `[]` | Options for the transfer list. |
| `disabled` | `boolean` | `false` | Whether the transfer is disabled. |
| `virtual-scroll` | `boolean` | `false` | Enable virtual scrolling for large datasets. |
| `source-filterable` | `boolean` | `false` | Whether the source list can be filtered. |
| `target-filterable` | `boolean` | `false` | Whether the target list can be filtered. |
| `source-filter-placeholder` | `string` | `undefined` | Placeholder for the source search box. |
| `target-filter-placeholder` | `string` | `undefined` | Placeholder for the target search box. |
| `source-title` | `string \| (() => VNodeChild)` | `undefined` | Title for the source panel. |
| `target-title` | `string \| (() => VNodeChild)` | `undefined` | Title for the target panel. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the transfer component. |
| `show-selected` | `boolean` | `true` | Whether to show selected options in the source list. |
| `filter` | `(pattern: string, option: TransferOption, from: 'source' \| 'target') => boolean` | Basic string match | Custom filter function. |
| `render-source-label` | `(props: { option: TransferOption }) => VNodeChild` | `undefined` | Custom render function for source labels. |
| `render-target-label` | `(props: { option: TransferOption }) => VNodeChild` | `undefined` | Custom render function for target labels. |
| `render-source-list` | `(props: { onCheck: (checkedValueList: Array<string \| number>) => void, checkedOptions: TransferOption[], pattern: string }) => VNodeChild` | `undefined` | Custom render function for the source list. |
| `render-target-list` | `(props: { onCheck: (checkedValueList: Array<string \| number>) => void, checkedOptions: TransferOption[], pattern: string }) => VNodeChild` | `undefined` | Custom render function for the target list. |
| `clear-text` | `string` | `undefined` | Text for the clear button. |
| `select-all-text` | `string` | `undefined` | Text for the select all button. |

### TransferOption Type

| Property   | Type               | Description                     |
| ---------- | ------------------ | ------------------------------- |
| `label`    | `string`           | Display label for the option.   |
| `value`    | `string \| number` | Unique value for the option.    |
| `disabled` | `boolean`          | Whether the option is disabled. |

### Events

| Name | Parameters | Description |
| --- | --- | --- |
| `update:value` | `(value: Array<string \| number>) => void` | Emitted when the selected values change. |

## Common Patterns

### Permission Assignment

```vue
<template>
  <n-transfer
    v-model:value="selectedPermissions"
    :options="permissions"
    source-title="Available Permissions"
    target-title="Assigned Permissions"
    source-filterable
    target-filterable
  />
</template>

<script setup>
import { ref } from 'vue';

const selectedPermissions = ref([]);
const permissions = [
  { label: 'Read Users', value: 'users:read' },
  { label: 'Write Users', value: 'users:write' },
  { label: 'Delete Users', value: 'users:delete' },
  { label: 'Read Posts', value: 'posts:read' },
  { label: 'Write Posts', value: 'posts:write' },
];
</script>
```

### Team Member Selection

```vue
<template>
  <n-transfer
    v-model:value="selectedMembers"
    :options="members"
    :render-source-label="renderMemberLabel"
    :render-target-label="renderMemberLabel"
    source-title="All Members"
    target-title="Project Team"
    source-filterable
    virtual-scroll
  />
</template>

<script setup>
import { ref, h } from 'vue';

const selectedMembers = ref([]);
const members = [
  { label: 'John Doe', value: 'john', disabled: false },
  { label: 'Jane Smith', value: 'jane', disabled: false },
  { label: 'Bob Wilson', value: 'bob', disabled: true },
];

const renderMemberLabel = ({ option }) => {
  return h(
    'div',
    { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
    [
      h('span', option.disabled ? '🚫' : '👤'),
      h('span', option.label),
      option.disabled &&
        h('span', { style: { color: '#999' } }, '(Unavailable)'),
    ],
  );
};
</script>
```

### Custom Filter Function

```vue
<template>
  <n-transfer
    v-model:value="value"
    :options="options"
    :filter="filterMethod"
    source-filterable
    target-filterable
  />
</template>

<script setup>
import { ref } from 'vue';

const value = ref([]);
const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

const filterMethod = (pattern, option, from) => {
  return option.label.toLowerCase().includes(pattern.toLowerCase());
};
</script>
```

### With Custom Titles

```vue
<template>
  <n-transfer
    v-model:value="value"
    :options="options"
    :source-title="
      () => h('span', { style: { color: '#18a058' } }, 'Available')
    "
    :target-title="() => h('span', { style: { color: '#2080f0' } }, 'Selected')"
  />
</template>

<script setup>
import { ref, h } from 'vue';

const value = ref([]);
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
];
</script>
```

## Best Practices

### Performance

1. **Use Virtual Scroll**: Always enable `virtual-scroll` when dealing with more than 100 options for optimal performance.

2. **Debounce Filter**: For custom filter functions with complex logic, consider debouncing the filter operation.

3. **Lazy Loading**: For extremely large datasets, consider implementing custom list rendering with lazy loading.

### User Experience

1. **Clear Titles**: Provide meaningful `source-title` and `target-title` to help users understand the context.

2. **Enable Filtering**: Enable `source-filterable` for lists with more than 20 items to help users find options quickly.

3. **Show Selected State**: Keep `show-selected` enabled (default) so users can see which items are already selected in the source list.

4. **Provide Feedback**: Use appropriate `clear-text` and `select-all-text` for better localization support.

### Data Handling

1. **Unique Values**: Ensure each option has a unique `value` property to prevent unexpected behavior.

2. **Disabled Options**: Use the `disabled` property on options to indicate unavailable items rather than removing them from the list.

3. **Consistent Data Structure**: Maintain a consistent data structure for options throughout your application.

### Accessibility

1. **Keyboard Navigation**: The transfer component supports keyboard navigation by default. Ensure your custom renderers don't break this functionality.

2. **Clear Labels**: Provide clear and descriptive labels for each option.

3. **Visual Feedback**: Use custom renderers to provide additional visual feedback for different option states.
