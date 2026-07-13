---
name: n-cascader
description: A cascader component for displaying and selecting tree-structured data with support for single/multiple selection, async loading, filtering, and various check strategies
author: jiaiyan
version: 1.0.0
---

# n-cascader Component

The `n-cascader` component is used to display and select tree-structured data. It supports single and multiple selection modes, async data loading, filtering, and various check strategies for flexible selection behavior.

## When to Use

Use `n-cascader` when you need to:

- Select from hierarchical data (e.g., region selection, category selection)
- Build multi-level navigation or selection interfaces
- Support both single and multiple selection in tree structures
- Load data asynchronously as users navigate
- Filter through large hierarchical datasets
- Display selected values as paths or individual items

## Basic Usage

### Single Selection

```vue
<template>
  <n-cascader
    v-model:value="value"
    placeholder="Select option"
    :options="options"
    check-strategy="child"
    @update:value="handleUpdateValue"
  />
</template>

<script setup>
import { ref } from 'vue';

const value = ref(null);

const options = [
  {
    label: 'Asia',
    value: 'asia',
    children: [
      {
        label: 'China',
        value: 'china',
        children: [
          { label: 'Beijing', value: 'beijing' },
          { label: 'Shanghai', value: 'shanghai' },
        ],
      },
    ],
  },
];

const handleUpdateValue = value => {
  console.log(value);
};
</script>
```

### Multiple Selection

```vue
<template>
  <n-cascader
    v-model:value="value"
    multiple
    placeholder="Select options"
    clearable
    :options="options"
    cascade
    check-strategy="all"
    @update:value="handleUpdateValue"
  />
</template>

<script setup>
import { ref } from 'vue';

const value = ref([]);
const options = [];
</script>
```

### Different Sizes

```vue
<template>
  <n-space vertical>
    <n-cascader
      v-model:value="value"
      placeholder="Small"
      :options="options"
      size="small"
    />
    <n-cascader
      v-model:value="value"
      placeholder="Medium (default)"
      :options="options"
      size="medium"
    />
    <n-cascader
      v-model:value="value"
      placeholder="Large"
      :options="options"
      size="large"
    />
  </n-space>
</template>
```

## API Reference

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `v-model:value` | `string \| number \| Array<number \| string> \| null` | `undefined` | Value of the cascader. |
| `allow-checking-not-loaded` | `boolean` | `false` | Whether to allow cascade checking on not loaded nodes. |
| `cascade` | `boolean` | `true` | Whether to cascade the checkbox selection onto children. |
| `check-strategy` | `'all' \| 'parent' \| 'child'` | `'all'` | The way to show checked options. |
| `children-field` | `string` | `'children'` | The children field in `CascaderOption`. |
| `clearable` | `boolean` | `false` | Whether the cascader is clearable. |
| `clear-filter-after-select` | `boolean` | `true` | Whether to clear filter keyword after select. |
| `default-value` | `string \| number \| Array<number \| string> \| null` | `null` | Default selected value. |
| `disabled` | `boolean` | `false` | Whether to disable the cascader. |
| `disabled-field` | `string` | `'disabled'` | The disabled field in `CascaderOption`. |
| `ellipsis-tag-popover-props` | `PopoverProps` | `undefined` | Popover props of the preview ellipsis tag. |
| `expand-trigger` | `'click' \| 'hover'` | `'click'` | Trigger for expanding options. |
| `filterable` | `boolean` | `false` | Whether the cascader is filterable. |
| `filter` | `(pattern: string, option: CascaderOption, path: CascaderOption[]) => boolean` | - | Filter function of the cascader. |
| `filter-menu-props` | `HTMLAttributes` | `undefined` | The filter menu's DOM props. |
| `get-column-style` | `(detail: { level: number }) => string \| object` | `undefined` | Function that resolves column style. |
| `value-field` | `string` | `'value'` | The value field in `CascaderOption`. |
| `label-field` | `string` | `'label'` | The label field in `CascaderOption`. |
| `max-tag-count` | `number \| 'responsive'` | `undefined` | Max tag count in multiple select mode. |
| `menu-props` | `HTMLAttributes` | `undefined` | The menu's DOM props. |
| `multiple` | `boolean` | `false` | Whether to allow multiple selection. |
| `options` | `CascaderOption[]` | `[]` | Options of the cascader. |
| `placeholder` | `string` | `'Please Select'` | Placeholder text. |
| `placement` | `'top-start' \| 'top' \| ...` | `'bottom-start'` | Cascader placement. |
| `remote` | `boolean` | `false` | Whether to obtain data remotely. |
| `render-prefix` | `(info: { option, node, checked }) => VNodeChild` | `undefined` | Render function of options' prefix. |
| `render-label` | `(option: CascaderOption, checked: boolean) => VNodeChild` | `undefined` | Render function for option label. |
| `render-suffix` | `(info: { option, node, checked }) => VNodeChild` | `undefined` | Render function of options' suffix. |
| `scrollbar-props` | `ScrollbarProps` | `undefined` | Scrollbar props. |
| `separator` | `string` | `' / '` | Selected option path value separator. |
| `show` | `boolean` | `undefined` | Whether to show the menu. |
| `show-path` | `boolean` | `true` | Whether to show selected options as a path. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Cascader size. |
| `spin-props` | `object` | `undefined` | Loading icon properties. |
| `status` | `'success' \| 'warning' \| 'error'` | `undefined` | Validation status. |
| `to` | `string \| HTMLElement \| false` | `body` | Container node of the menu. |
| `virtual-scroll` | `boolean` | `true` | Whether to enable virtual scrolling. |

### CascaderOption Properties

| Name        | Type               | Description                      |
| ----------- | ------------------ | -------------------------------- |
| `label`     | `string`           | Label of the option.             |
| `value`     | `string \| number` | Value of the option.             |
| `disabled?` | `boolean`          | Whether this option is disabled. |
| `children?` | `CascaderOption[]` | The children options.            |

### Events

| Name | Parameters | Description |
| --- | --- | --- |
| `update:value` | `(value, option, pathValues)` | Triggered when value changes. |
| `update:show` | `(value: boolean)` | Triggered when menu opens/closes. |
| `blur` | `()` | Triggered on blur. |
| `focus` | `()` | Triggered on focus. |
| `load` | `(option: CascaderOption) => Promise<void>` | Callback when a node is loaded (for remote). |

### Slots

| Name        | Parameters | Description                           |
| ----------- | ---------- | ------------------------------------- |
| `action`    | `()`       | Action content in the cascading menu. |
| `arrow`     | `()`       | Arrow content in the cascading menu.  |
| `empty`     | `()`       | Empty state slot for options.         |
| `not-found` | `()`       | Data not found slot when searching.   |

### Methods

| Name                   | Type                      | Description             |
| ---------------------- | ------------------------- | ----------------------- |
| `blur`                 | `() => void`              | Blur the cascader.      |
| `focus`                | `() => void`              | Focus the cascader.     |
| `getCheckedData`       | `() => { keys, options }` | Get checked data.       |
| `getIndeterminateData` | `() => { keys, options }` | Get indeterminate data. |

## Common Patterns

### Async Loading

```vue
<template>
  <n-cascader
    v-model:value="value"
    placeholder="Select option"
    :options="options"
    remote
    :on-load="handleLoad"
  />
</template>

<script setup>
import { ref } from 'vue';

const value = ref(null);
const options = ref([
  {
    label: 'Root',
    value: 'root',
  },
]);

const handleLoad = async option => {
  const children = await fetchChildren(option.value);
  option.children = children;
};
</script>
```

### Check Strategies

```vue
<template>
  <n-space vertical>
    <n-radio-group v-model:value="checkStrategy">
      <n-radio-button value="all">All</n-radio-button>
      <n-radio-button value="parent">Parent</n-radio-button>
      <n-radio-button value="child">Child</n-radio-button>
    </n-radio-group>

    <n-cascader
      multiple
      cascade
      :check-strategy="checkStrategy"
      :options="options"
    />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const checkStrategy = ref('all');
</script>
```

### Custom Field Names

```vue
<template>
  <n-cascader
    :options="options"
    label-field="name"
    value-field="id"
    children-field="items"
  />
</template>

<script setup>
const options = [
  {
    name: 'Category',
    id: 'cat1',
    items: [{ name: 'Sub Category', id: 'sub1' }],
  },
];
</script>
```

### Filterable with Hover Trigger

```vue
<template>
  <n-cascader
    v-model:value="value"
    placeholder="Select option"
    :options="options"
    :expand-trigger="'hover'"
    :filterable="true"
  />
</template>
```

### Custom Label Rendering

```vue
<template>
  <n-cascader
    v-model:value="value"
    :options="options"
    :render-label="renderLabel"
  />
</template>

<script setup>
import { h } from 'vue';

const renderLabel = option => {
  return h('span', { style: { fontWeight: 'bold' } }, option.label);
};
</script>
```

### Large Data Handling

```vue
<template>
  <n-cascader
    v-model:value="value"
    placeholder="Select from large dataset"
    :options="options"
    :virtual-scroll="true"
    :filterable="true"
  />
</template>
```

### Using Methods via Ref

```vue
<template>
  <n-space item-style="display: flex; align-item: center;">
    <n-button @click="handleClick">Focus then blur in 1 second</n-button>
    <n-cascader ref="cascaderRef" style="width: 200px" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const cascaderRef = ref(null);

const handleClick = () => {
  cascaderRef.value?.focus();
  setTimeout(() => {
    cascaderRef.value?.blur();
  }, 1000);
};
</script>
```

## Best Practices

1. **Choose appropriate check-strategy**: Use `'child'` when you only want leaf nodes selected, `'parent'` for cleaner display when all children are selected, and `'all'` for full flexibility.

2. **Use `cascade` wisely**: Enable `cascade` when parent-child selection should be linked. Disable it for independent selection behavior.

3. **Implement async loading for large datasets**: Use `remote` and `on-load` for lazy loading to improve initial render performance.

4. **Enable virtual-scroll for large data**: Keep `virtual-scroll: true` (default) for smooth scrolling with thousands of options.

5. **Customize field names for backend data**: Use `label-field`, `value-field`, and `children-field` to match your API response structure without data transformation.

6. **Use `show-path` for clarity**: Keep `show-path: true` to show the full selection path, helping users understand their selection context.

7. **Handle disabled nodes carefully**: When using `allow-checking-not-loaded`, be aware of consistency between frontend and backend checking logic.

8. **Use `max-tag-count: 'responsive'`**: For multiple selection with many items, this keeps the display clean and responsive.
