---
name: n-tree-select
description: A tree-structured select component for hierarchical data selection with features like multiple selection, checkboxes, filtering, and async loading
author: jiaiyan
version: 1.0.0
---

# n-tree-select Component

The `n-tree-select` component combines the functionality of a select dropdown with a tree structure, allowing users to select values from hierarchical data. It's ideal for scenarios like organization charts, file system navigation, category selection, and any nested data structure.

## When to Use

Use `n-tree-select` when you need to:

- **Hierarchical Selection**: Select values from nested/hierarchical data structures
- **Category Selection**: Choose categories from a multi-level category tree
- **Organization Picker**: Select departments or teams from an organizational hierarchy
- **File/Folder Selection**: Navigate and select files from a folder structure
- **Multi-Level Filtering**: Filter and select from nested option groups

## Basic Usage

### Basic Tree Select

```vue
<template>
  <n-tree-select
    :options="options"
    default-value="Drive My Car"
    @update:value="handleUpdateValue"
  />
</template>

<script setup>
import { ref } from 'vue';

const options = [
  {
    label: 'Rubber Soul',
    key: 'Rubber Soul',
    children: [
      { label: 'Drive My Car', key: 'Drive My Car' },
      { label: 'Norwegian Wood', key: 'Norwegian Wood' },
    ],
  },
  {
    label: 'Let It Be',
    key: 'Let It Be',
    children: [
      { label: 'Dig It', key: 'Dig It' },
      { label: 'Let It Be', key: 'Let It Be' },
    ],
  },
];

const handleUpdateValue = (value, option) => {
  console.log(value, option);
};
</script>
```

### Multiple Selection

```vue
<template>
  <n-tree-select
    multiple
    :options="options"
    :default-value="['Norwegian Wood']"
    @update:value="handleUpdateValue"
  />
</template>
```

### Checkable with Cascade

```vue
<template>
  <n-tree-select
    multiple
    cascade
    checkable
    :options="options"
    :default-value="['Norwegian Wood']"
  />
</template>
```

### Filterable

```vue
<template>
  <n-space vertical>
    <n-tree-select
      filterable
      :options="options"
      default-value="Drive My Car"
      clearable
    />
    <n-tree-select
      multiple
      checkable
      filterable
      :clear-filter-after-select="false"
      :options="options"
      :default-value="['Norwegian Wood']"
      clearable
    />
  </n-space>
</template>
```

### Show Line

```vue
<template>
  <n-tree-select
    show-line
    default-expand-all
    :options="options"
    default-value="Drive My Car"
  />
</template>
```

## API Reference

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `v-model:value` | `string \| number \| Array<string \| number> \| null` | `undefined` | Selected key(s). Use array for multiple selection. |
| `default-value` | `string \| number \| Array<string \| number> \| null` | `null` | Default uncontrolled value. |
| `options` | `TreeSelectOption[]` | `[]` | Tree options data. |
| `multiple` | `boolean` | `false` | Allow multiple selections. |
| `checkable` | `boolean` | `false` | Show checkboxes for selection. |
| `cascade` | `boolean` | `false` | Link parent and child selection. |
| `check-strategy` | `'all' \| 'parent' \| 'child'` | `'all'` | How to display selected nodes when both parent and children are selected. |
| `filterable` | `boolean` | `false` | Enable search filtering. |
| `filter` | `(pattern: string, option: TreeSelectOption) => boolean` | - | Custom filter function. |
| `clearable` | `boolean` | `false` | Allow clearing selection. |
| `clear-filter-after-select` | `boolean` | `true` | Clear filter keyword after selection in multiple mode. |
| `disabled` | `boolean` | `false` | Disable the component. |
| `placeholder` | `string` | `'Please Select'` | Placeholder text. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Component size. |
| `loading` | `boolean` | `false` | Show loading state. |
| `default-expand-all` | `boolean` | `false` | Expand all nodes by default. |
| `default-expanded-keys` | `Array<string \| number>` | `[]` | Default expanded keys. |
| `expanded-keys` | `Array<string \| number>` | `undefined` | Controlled expanded keys. |
| `show-line` | `boolean` | `false` | Show tree connecting lines. |
| `show-path` | `boolean` | `false` | Show hierarchy path in selected label. |
| `separator` | `string` | `' / '` | Separator for path display. |
| `indent` | `number` | `24` | Indentation per level. |
| `max-tag-count` | `number \| 'responsive'` | `undefined` | Max tags to display in multiple mode. |
| `virtual-scroll` | `boolean` | `true` | Enable virtual scrolling. |
| `consistent-menu-width` | `boolean` | `true` | Match menu width to input width. |
| `placement` | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'` | `'bottom-start'` | Menu placement. |
| `status` | `'success' \| 'warning' \| 'error'` | `undefined` | Validation status. |
| `to` | `string \| HTMLElement \| false` | `body` | Container for the menu. |
| `key-field` | `string` | `'key'` | Field name for option keys. |
| `label-field` | `string` | `'label'` | Field name for option labels. |
| `children-field` | `string` | `'children'` | Field name for child options. |
| `disabled-field` | `string` | `'disabled'` | Field name for disabled state. |
| `allow-checking-not-loaded` | `boolean` | `false` | Allow cascade checking on unloaded nodes. |
| `indeterminate-keys` | `Array<string \| number>` | `undefined` | Indeterminate keys. |
| `menu-props` | `HTMLAttributes` | `undefined` | Menu DOM attributes. |
| `node-props` | `(info: { option: TreeSelectOption }) => HTMLAttributes` | `undefined` | Node DOM attributes. |
| `render-label` | `(info: { option: TreeSelectOption, checked: boolean, selected: boolean }) => VNodeChild` | `undefined` | Custom label renderer. |
| `render-prefix` | `(info: { option: TreeSelectOption, checked: boolean, selected: boolean }) => VNodeChild` | `undefined` | Custom prefix renderer. |
| `render-suffix` | `(info: { option: TreeSelectOption, checked: boolean, selected: boolean }) => VNodeChild` | `undefined` | Custom suffix renderer. |
| `render-switcher-icon` | `() => VNodeChild` | `undefined` | Custom switcher icon renderer. |
| `render-tag` | `(props: { option: TreeSelectOption, handleClose: () => void }) => VNodeChild` | `undefined` | Custom tag renderer. |
| `override-default-node-click-behavior` | `(info: { option: TreeSelectOption }) => 'toggleExpand' \| 'toggleSelect' \| 'toggleCheck' \| 'default' \| 'none'` | `undefined` | Override node click behavior. |
| `get-children` | `(option: any) => unknown` | `undefined` | Get children function. |
| `ellipsis-tag-popover-props` | `PopoverProps` | `undefined` | Props for ellipsis tag popover. |

### TreeSelectOption Properties

| Name | Type | Description |
| --- | --- | --- |
| `key` | `string \| number` | Unique key for the option. |
| `label` | `string` | Display label. |
| `children` | `TreeSelectOption[]` | Child options. |
| `disabled` | `boolean` | Whether the option is disabled. |
| `isLeaf` | `boolean` | Whether the node is a leaf (required for async loading). |

### Events

| Name | Parameters | Description |
| --- | --- | --- |
| `update:value` | `(value: string \| number \| Array<string \| number> \| null, option: TreeSelectOption \| null \| Array<TreeSelectOption \| null>, meta: { node: TreeOption \| null, action: 'select' \| 'unselect' \| 'delete' \| 'clear' }) => void` | Emitted when value changes. |
| `update:expanded-keys` | `(value: Array<string \| number>, meta: { node: TreeOption \| null, action: 'expand' \| 'collapse' \| 'filter' }) => void` | Emitted when expanded keys change. |
| `update:indeterminate-keys` | `(keys: Array<string \| number>) => void` | Emitted when indeterminate keys change. |
| `focus` | `(e: FocusEvent) => void` | Emitted on focus. |
| `blur` | `(e: FocusEvent) => void` | Emitted on blur. |
| `load` | `(node: TreeSelectOption) => Promise<void>` | Async data loading callback. |

### Slots

| Name     | Parameters | Description                               |
| -------- | ---------- | ----------------------------------------- |
| `header` | `()`       | Header content in the menu.               |
| `action` | `()`       | Action content at the bottom of the menu. |
| `arrow`  | `()`       | Custom arrow icon.                        |
| `empty`  | `()`       | Empty state content.                      |

### Methods

| Name | Type | Description |
| --- | --- | --- |
| `focus` | `() => void` | Focus the component. |
| `blur` | `() => void` | Blur the component. |
| `focusInput` | `() => void` | Focus the input element. |
| `blurInput` | `() => void` | Blur the input element. |
| `getCheckedData` | `() => { keys: Array<string \| number>, options: Array<TreeOption \| null> }` | Get checked data. |
| `getIndeterminateData` | `() => { keys: Array<string \| number>, options: Array<TreeOption \| null> }` | Get indeterminate data. |

## Common Patterns

### Async Loading

```vue
<template>
  <n-tree-select
    v-model:value="value"
    multiple
    checkable
    :options="options"
    :cascade="cascade"
    :check-strategy="checkStrategy"
    :show-path="showPath"
    :allow-checking-not-loaded="cascade"
    :on-load="handleLoad"
  />
</template>

<script setup>
import { ref } from 'vue';

const value = ref([]);
const options = ref([
  {
    label: 'Root',
    key: 'root',
    children: [{ label: 'Loading...', key: 'child1', isLeaf: false }],
  },
]);

const handleLoad = async node => {
  const children = await fetchChildren(node.key);
  node.children = children;
};
</script>
```

### Custom Field Names

```vue
<template>
  <n-tree-select
    :options="options"
    default-value="Drive My Car"
    label-field="whateverLabel"
    key-field="whateverKey"
    children-field="whateverChildren"
  />
</template>

<script setup>
const options = [
  {
    whateverLabel: 'Album',
    whateverKey: 'album',
    whateverChildren: [{ whateverLabel: 'Song 1', whateverKey: 'song1' }],
  },
];
</script>
```

### Check Strategy Demo

```vue
<template>
  <n-space vertical>
    <n-radio-group v-model:value="checkStrategy">
      <n-radio-button value="all">All</n-radio-button>
      <n-radio-button value="parent">Parent</n-radio-button>
      <n-radio-button value="child">Child</n-radio-button>
    </n-radio-group>
    <n-tree-select
      multiple
      cascade
      checkable
      :check-strategy="checkStrategy"
      :options="options"
      :default-value="['Dig It', 'go']"
    />
  </n-space>
</template>
```

### File Picker Simulation

```vue
<template>
  <n-tree-select
    block-line
    :options="fileOptions"
    :override-default-node-click-behavior="override"
  />
</template>

<script setup>
const override = ({ option }) => {
  if (option.isFolder) {
    return 'toggleExpand';
  }
  return 'toggleSelect';
};

const fileOptions = [
  {
    label: 'Documents',
    key: 'docs',
    isFolder: true,
    children: [{ label: 'report.pdf', key: 'report', isFolder: false }],
  },
];
</script>
```

### Validation Status

```vue
<template>
  <n-space vertical>
    <n-tree-select status="warning" placeholder="Warning state" />
    <n-tree-select status="error" placeholder="Error state" />
  </n-space>
</template>
```

### Custom Rendering

```vue
<template>
  <n-tree-select
    :options="options"
    :render-label="renderLabel"
    :render-prefix="renderPrefix"
  />
</template>

<script setup>
import { h } from 'vue';

const renderLabel = ({ option, checked, selected }) => {
  return h(
    'span',
    { style: { fontWeight: selected ? 'bold' : 'normal' } },
    option.label,
  );
};

const renderPrefix = ({ option }) => {
  return h('span', option.children ? '📁' : '📄');
};

const options = [
  {
    label: 'Folder',
    key: 'folder',
    children: [{ label: 'File', key: 'file' }],
  },
];
</script>
```

## Best Practices

### Performance

1. **Virtual Scroll**: Keep `virtual-scroll` enabled (default) for large tree structures.

2. **Lazy Loading**: Use async loading with `on-load` for deeply nested trees to improve initial load time.

3. **Limit Expanded Nodes**: Avoid `default-expand-all` for very large trees; use `default-expanded-keys` instead.

### User Experience

1. **Check Strategy**: Choose appropriate `check-strategy`:
   - `'all'`: Show all selected nodes (default)
   - `'parent'`: Show only parent when all children selected
   - `'child'`: Show only leaf nodes

2. **Show Path**: Enable `show-path` for deep hierarchies to help users understand the selection context.

3. **Filterable**: Enable `filterable` for trees with many nodes to help users find options quickly.

4. **Clearable**: Enable `clearable` to allow users to easily reset their selection.

### Data Handling

1. **Unique Keys**: Ensure each option has a unique `key` property.

2. **isLeaf Property**: Set `isLeaf: false` for nodes that will have children loaded asynchronously.

3. **Custom Field Names**: Use `key-field`, `label-field`, and `children-field` when your data doesn't match the default structure.

4. **Cascade Selection**: Be careful with `cascade` and `allow-checking-not-loaded` when using async loading, as values may be incomplete.

### Form Integration

1. **Validation Status**: Use the `status` prop to show validation feedback.

2. **Disabled State**: Use `disabled` to prevent selection in read-only scenarios.

3. **Loading State**: Show `loading` state during async operations.
