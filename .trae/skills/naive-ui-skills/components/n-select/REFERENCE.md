---
name: n-select
description: A versatile select component for single and multiple selection with features like filtering, remote search, grouping, and virtual scrolling
author: jiaiyan
version: 1.0.0
---

# n-select Component

The `n-select` component is a powerful dropdown selection component in Naive UI that supports single selection, multiple selection, searchable filtering, remote data loading, option grouping, and virtual scrolling for large datasets.

## When to Use

Use `n-select` when you need to:

- **Single Selection**: Allow users to select one option from a dropdown list
- **Multiple Selection**: Enable users to select multiple options with tag display
- **Searchable Dropdowns**: Provide filtering capabilities for large option lists
- **Remote Data Loading**: Fetch options asynchronously from a server
- **Grouped Options**: Organize options into logical groups
- **Tag Input**: Create a tag input box for user-defined entries

## Basic Usage

### Single Select

```vue
<template>
  <n-select v-model:value="selectedValue" :options="options" />
</template>

<script setup>
import { ref } from 'vue';

const selectedValue = ref(null);
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];
</script>
```

### Multiple Select

```vue
<template>
  <n-select v-model:value="selectedValues" multiple :options="options" />
</template>

<script setup>
import { ref } from 'vue';

const selectedValues = ref([]);
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];
</script>
```

### Filterable Select

```vue
<template>
  <n-select
    v-model:value="selectedValue"
    filterable
    placeholder="Search and select..."
    :options="options"
  />
</template>
```

### Disabled State

```vue
<template>
  <n-select v-model:value="selectedValue" disabled :options="options" />
</template>
```

### Different Sizes

```vue
<template>
  <n-space vertical>
    <n-select v-model:value="value" size="tiny" :options="options" />
    <n-select v-model:value="value" size="small" :options="options" />
    <n-select v-model:value="value" size="medium" :options="options" />
    <n-select v-model:value="value" size="large" :options="options" />
  </n-space>
</template>
```

## API Reference

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `v-model:value` | `Array<string \| number> \| string \| number \| null` | `undefined` | The selected value(s). Use array for multiple selection. |
| `options` | `Array<SelectOption \| SelectGroupOption>` | `[]` | The options to display in the dropdown. |
| `multiple` | `boolean` | `false` | Whether to allow multiple selections. |
| `filterable` | `boolean` | `false` | Whether options can be filtered by typing. |
| `clearable` | `boolean` | `false` | Whether the selection can be cleared. |
| `disabled` | `boolean` | `false` | Whether the select is disabled. |
| `placeholder` | `string` | `'Please Select'` | Placeholder text when no value is selected. |
| `loading` | `boolean` | `false` | Whether to show a loading indicator. |
| `remote` | `boolean` | `false` | Whether to use remote search (disables local filter). |
| `size` | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Size of the select input. |
| `menu-size` | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Size of the dropdown menu. |
| `max-tag-count` | `number \| 'responsive'` | `undefined` | Maximum number of tags to display in multiple mode. Use `'responsive'` for automatic adjustment. |
| `tag` | `boolean` | `false` | Whether users can create new options by typing. Requires `filterable`. |
| `fallback-option` | `false \| (value: string \| number) => SelectOption` | `value => ({ label: '' + value, value })` | Function to create display option for values without matching options. Set to `false` to disable. |
| `show` | `boolean` | `undefined` | Controlled visibility of the dropdown menu. |
| `show-arrow` | `boolean` | `true` | Whether to show the dropdown arrow icon. |
| `show-on-focus` | `boolean` | `false` | Whether to show the menu when the input is focused. |
| `consistent-menu-width` | `boolean` | `true` | Whether the menu width matches the input width. Setting to `false` disables virtual scroll. |
| `virtual-scroll` | `boolean` | `true` | Whether to enable virtual scrolling for better performance with large option lists. |
| `placement` | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'` | `'bottom-start'` | Placement of the dropdown menu. |
| `default-value` | `Array<string \| number> \| string \| number \| null` | `null` | Default uncontrolled value. |
| `status` | `'success' \| 'warning' \| 'error'` | `undefined` | Validation status of the select. |
| `filter` | `(pattern: string, option: Object) => boolean` | Default string search | Custom filter function for searching options. |
| `clear-filter-after-select` | `boolean` | `true` | Whether to clear the search filter after selecting an option in multiple mode. |
| `clear-created-options-on-clear` | `boolean` | `true` | Whether to clear user-created options when clearing the selection (with `tag` and `clearable`). |
| `ignore-composition` | `boolean` | `true` | Whether to ignore IME composition events when filtering. |
| `keyboard` | `boolean` | `true` | Whether to enable keyboard navigation. |
| `show-checkmark` | `boolean` | `true` | Whether to show a checkmark on selected options. |
| `reset-menu-on-options-change` | `boolean` | `true` | Whether to reset menu state (e.g., scroll position) when options change. |
| `label-field` | `string` | `'label'` | Field name to use for option labels. |
| `value-field` | `string` | `'value'` | Field name to use for option values. |
| `children-field` | `string` | `'children'` | Field name for group option children. |
| `input-props` | `InputHTMLAttributes` | `undefined` | Additional attributes for the input element. |
| `menu-props` | `HTMLAttributes` | `undefined` | Additional attributes for the menu element. |
| `scrollbar-props` | `ScrollbarProps` | `undefined` | Props for the internal scrollbar component. |
| `ellipsis-tag-popover-props` | `PopoverProps` | `undefined` | Props for the popover showing truncated tags. |
| `node-props` | `(option: SelectOption \| SelectGroupOption) => object` | `undefined` | Function to generate DOM attributes for each option. |
| `render-label` | `(option: SelectOption \| SelectGroupOption, selected: boolean) => VNodeChild` | `undefined` | Custom render function for option labels. |
| `render-option` | `(info: { node: VNode, option: SelectOption \| SelectGroupOption, selected: boolean }) => VNodeChild` | `undefined` | Custom render function for entire options. |
| `render-tag` | `(props: { option: SelectBaseOption, handleClose: () => void }) => VNodeChild` | `undefined` | Custom render function for selected tags. |
| `to` | `string \| HTMLElement \| false` | `body` | Container element for the dropdown menu. Use `false` to keep it inline. |
| `on-create` | `(label: string) => SelectOption` | `label => ({ label, value: label })` | Function to create a new option when using `tag` mode. |

### Option Properties

#### SelectOption

| Name | Type | Description |
| --- | --- | --- |
| `value` | `string \| number` | Unique value for the option (required). |
| `label` | `string \| ((option: SelectOption, selected: boolean) => VNodeChild)` | Display label for the option. |
| `disabled` | `boolean` | Whether the option is disabled. |
| `class` | `string` | CSS class for the option element. |
| `style` | `string \| CSSProperties` | Inline styles for the option element. |
| `render` | `(info: { node: VNode, option: SelectOption, selected: boolean }) => VNodeChild` | Custom render function for the option. |

#### SelectGroupOption

| Name | Type | Description |
| --- | --- | --- |
| `type` | `'group'` | Must be set to `'group'`. |
| `label` | `string \| ((option: SelectGroupOption) => VNodeChild)` | Label for the group header. |
| `key` | `string \| number` | Unique key for the group. |
| `children` | `Array<SelectOption>` | Array of options in the group. |
| `render` | `(info: { node: VNode, option: SelectOption, selected: boolean }) => VNodeChild` | Custom render function for the group. |

### Events

| Name | Parameters | Description |
| --- | --- | --- |
| `update:value` | `(value: Array \| string \| number \| null, option: SelectBaseOption \| null \| SelectBaseOption[]) => void` | Emitted when the selected value changes. |
| `update:show` | `(show: boolean) => void` | Emitted when the dropdown visibility changes. |
| `focus` | `() => void` | Emitted when the select input gains focus. |
| `blur` | `() => void` | Emitted when the select input loses focus. |
| `clear` | `() => void` | Emitted when the selection is cleared. |
| `scroll` | `(e: ScrollEvent) => void` | Emitted when the dropdown menu is scrolled. |
| `search` | `(value: string) => void` | Emitted when a search is performed (useful for remote search). |

### Slots

| Name     | Parameters | Description                                 |
| -------- | ---------- | ------------------------------------------- |
| `empty`  | `()`       | Content to show when there are no options.  |
| `action` | `()`       | Content at the bottom of the dropdown menu. |
| `header` | `()`       | Content at the top of the dropdown menu.    |
| `arrow`  | `()`       | Custom dropdown arrow icon.                 |

### Methods

| Name         | Type         | Description                       |
| ------------ | ------------ | --------------------------------- |
| `focus`      | `() => void` | Focus the select input.           |
| `blur`       | `() => void` | Blur the select input.            |
| `focusInput` | `() => void` | Focus the internal input element. |
| `blurInput`  | `() => void` | Blur the internal input element.  |

## Common Patterns

### Remote Search

```vue
<template>
  <n-select
    v-model:value="selectedValue"
    filterable
    remote
    :options="options"
    :loading="loading"
    placeholder="Search..."
    @search="handleSearch"
  />
</template>

<script setup>
import { ref } from 'vue';

const selectedValue = ref(null);
const options = ref([]);
const loading = ref(false);

const handleSearch = async query => {
  if (!query) return;

  loading.value = true;
  try {
    const response = await fetch(`/api/search?q=${query}`);
    const data = await response.json();
    options.value = data.map(item => ({
      label: item.name,
      value: item.id,
    }));
  } finally {
    loading.value = false;
  }
};
</script>
```

### Group Options

```vue
<template>
  <n-select v-model:value="selectedValue" :options="groupedOptions" />
</template>

<script setup>
import { ref } from 'vue';

const selectedValue = ref(null);
const groupedOptions = [
  {
    type: 'group',
    label: 'Group A',
    key: 'group-a',
    children: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ],
  },
  {
    type: 'group',
    label: 'Group B',
    key: 'group-b',
    children: [
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4' },
    ],
  },
];
</script>
```

### Tag Input Mode

```vue
<template>
  <n-select
    v-model:value="tags"
    filterable
    multiple
    tag
    :show-arrow="false"
    :show="false"
    placeholder="Type and press enter to add tags"
  />
</template>

<script setup>
import { ref } from 'vue';

const tags = ref([]);
</script>
```

### Custom Field Names

```vue
<template>
  <n-select
    v-model:value="selectedValue"
    label-field="name"
    value-field="id"
    children-field="items"
    :options="customOptions"
  />
</template>

<script setup>
import { ref } from 'vue';

const selectedValue = ref(null);
const customOptions = [
  { name: 'Item 1', id: 1 },
  { name: 'Item 2', id: 2 },
];
</script>
```

### Infinite Scroll Loading

```vue
<template>
  <n-select
    :options="options"
    :reset-menu-on-options-change="false"
    @scroll="handleScroll"
  />
</template>

<script setup>
import { ref } from 'vue';

const options = ref([]);
const page = ref(1);

const loadMore = async () => {
  const newOptions = await fetchOptions(page.value);
  options.value = [...options.value, ...newOptions];
  page.value++;
};

const handleScroll = e => {
  const { scrollTop, scrollHeight, clientHeight } = e.target;
  if (scrollHeight - scrollTop <= clientHeight + 50) {
    loadMore();
  }
};

loadMore();
</script>
```

### Custom Option Rendering

```vue
<template>
  <n-select :options="options" :render-label="renderLabel" />
</template>

<script setup>
import { h } from 'vue';

const renderLabel = (option, selected) => {
  return h('div', { style: { display: 'flex', alignItems: 'center' } }, [
    h('span', { style: { marginRight: '8px' } }, option.label),
    selected && h('span', { style: { color: 'green' } }, '✓'),
  ]);
};

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
];
</script>
```

## Best Practices

### Performance

1. **Use Virtual Scroll**: For large datasets (100+ options), keep `virtual-scroll` enabled (default) for optimal performance.

2. **Limit Options**: When possible, limit the number of options displayed at once, especially for remote search scenarios.

3. **Debounce Remote Search**: Add debouncing to remote search handlers to reduce API calls:

```vue
<script setup>
import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';

const handleSearch = useDebounceFn(async query => {
  // API call here
}, 300);
</script>
```

### User Experience

1. **Provide Clear Feedback**: Use `loading` state during async operations to inform users that data is being fetched.

2. **Use Meaningful Placeholders**: Provide clear placeholder text that guides users on what to select or search.

3. **Consider Max Tag Count**: In multiple selection mode, use `max-tag-count="responsive"` or a specific number to prevent layout issues when many items are selected.

4. **Enable Clearable**: Allow users to easily clear their selection, especially for single-select scenarios.

### Data Handling

1. **Unique Values**: Ensure each option has a unique `value` property to prevent unexpected behavior.

2. **Handle Fallback Options**: Decide whether to show fallback options for values without matching options. Set `fallback-option="false"` to automatically clear invalid values.

3. **Custom Field Mapping**: Use `label-field`, `value-field`, and `children-field` props when working with backend data that doesn't match the default field names.

### Accessibility

1. **Keyboard Navigation**: Keep `keyboard` enabled (default) to allow users to navigate options using arrow keys.

2. **Focus Management**: Use the `focus` and `blur` methods for programmatic control when needed.

### Form Integration

1. **Validation Status**: Use the `status` prop to show validation feedback (success, warning, error).

2. **Disabled State**: Use `disabled` prop to prevent selection when the field should be read-only.

3. **Default Values**: Set appropriate `default-value` for uncontrolled usage scenarios.
