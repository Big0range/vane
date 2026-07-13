---
name: n-tree
description: A powerful tree component for displaying hierarchical data with features like selection, checking, drag-and-drop, virtual scrolling, async loading, and search filtering.
author: jiaiyan
version: 1.0.0
---

# n-tree Component

The `n-tree` component is Naive UI's comprehensive solution for displaying hierarchical data structures. It provides extensive features for tree selection, checking, searching, and manipulation.

## When to Use

Use `n-tree` when you need to:

- Display hierarchical data structures
- Create file/folder browsers
- Build organization charts
- Implement category selectors
- Handle drag-and-drop tree manipulation
- Support async data loading

## Basic Usage

### Simple Tree

```vue
<template>
  <n-tree
    block-line
    :data="data"
    :default-expanded-keys="defaultExpandedKeys"
    selectable
  />
</template>

<script setup>
import { ref } from 'vue';

const data = ref([
  {
    key: '1',
    label: 'Root Node',
    children: [
      { key: '1-1', label: 'Child 1' },
      { key: '1-2', label: 'Child 2' },
    ],
  },
]);

const defaultExpandedKeys = ref(['1']);
</script>
```

### Tree with Checkboxes

```vue
<template>
  <n-tree
    block-line
    checkable
    :data="data"
    :default-expanded-keys="defaultExpandedKeys"
    :default-checked-keys="defaultCheckedKeys"
  />
</template>

<script setup>
const data = [
  {
    key: '1',
    label: 'Parent',
    children: [
      { key: '1-1', label: 'Child 1' },
      { key: '1-2', label: 'Child 2' },
    ],
  },
];

const defaultExpandedKeys = ['1'];
const defaultCheckedKeys = ['1-1'];
</script>
```

### Cascade Selection

```vue
<template>
  <n-tree
    block-line
    cascade
    checkable
    :data="data"
    :default-expanded-keys="defaultExpandedKeys"
  />
</template>
```

### Multiple Selection

```vue
<template>
  <n-tree
    multiple
    block-line
    :data="data"
    v-model:selected-keys="selectedKeys"
  />
</template>

<script setup>
import { ref } from 'vue';

const selectedKeys = ref([]);
</script>
```

### Custom Key and Label Fields

```vue
<template>
  <n-tree
    block-line
    :data="data"
    key-field="id"
    label-field="name"
    children-field="items"
    selectable
  />
</template>

<script setup>
const data = [
  {
    id: '1',
    name: 'Custom Key',
    items: [{ id: '1-1', name: 'Child' }],
  },
];
</script>
```

## API Reference

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `accordion` | `boolean` | `false` | Whether to use accordion expand mode |
| `allow-checking-not-loaded` | `boolean` | `false` | Allow cascade checking on not loaded nodes |
| `allow-drop` | `(info) => boolean` | - | Whether to allow dropping |
| `animated` | `boolean` | `true` | Whether to show expand animation |
| `block-line` | `boolean` | `false` | Nodes spread out the whole row |
| `block-node` | `boolean` | `false` | Node name spreads out the whole row |
| `cancelable` | `boolean` | `true` | Whether node selection can be cancelled |
| `cascade` | `boolean` | `false` | Whether to cascade checkboxes |
| `check-strategy` | `'all' \| 'parent' \| 'child'` | `'all'` | Strategy for checked callback keys |
| `checkable` | `boolean` | `false` | Whether to display checkboxes |
| `checkbox-placement` | `'left' \| 'right'` | `'left'` | Checkbox placement |
| `checked-keys` | `Array<string \| number>` | `undefined` | Checked keys (controlled) |
| `check-on-click` | `boolean \| ((node) => boolean)` | `false` | Allow click to trigger check |
| `data` | `Array<TreeOption>` | `[]` | Tree node data |
| `default-checked-keys` | `Array<string \| number>` | `[]` | Default checked keys |
| `default-expand-all` | `boolean` | `false` | Expand all nodes |
| `default-expanded-keys` | `Array<string \| number>` | `[]` | Default expanded keys |
| `default-selected-keys` | `Array<string \| number>` | `[]` | Default selected keys |
| `disabled-field` | `string` | `'disabled'` | Disabled field name in TreeOption |
| `draggable` | `boolean` | `false` | Whether nodes can be dragged |
| `ellipsis` | `boolean` | `false` | Whether to ellipsis overflow text |
| `expand-on-click` | `boolean` | `false` | Whether to expand on click |
| `expand-on-dragenter` | `boolean` | `true` | Whether to expand on dragenter |
| `expanded-keys` | `Array<string \| number>` | `undefined` | Expanded keys (controlled) |
| `filter` | `(pattern, node) => boolean` | - | Filter function based on pattern |
| `get-children` | `(option) => unknown` | `undefined` | Get children of option |
| `indent` | `number` | `24` | Indent per level |
| `indeterminate-keys` | `Array<string \| number>` | `undefined` | Indeterminate keys |
| `keyboard` | `boolean` | `true` | Whether to support keyboard |
| `key-field` | `string` | `'key'` | Key field in TreeOption |
| `label-field` | `string` | `'label'` | Label field in TreeOption |
| `multiple` | `boolean` | `false` | Whether to allow multiple selection |
| `node-props` | `(info) => HTMLAttributes` | `undefined` | HTML attributes of node |
| `on-load` | `(node) => Promise<void>` | `undefined` | Async load callback |
| `override-default-node-click-behavior` | `(info) => string` | `undefined` | Override default click behavior |
| `pattern` | `string` | `''` | Search pattern |
| `render-label` | `(info) => VNodeChild` | `undefined` | Render function for label |
| `render-prefix` | `(info) => VNodeChild` | `undefined` | Render function for prefix |
| `render-suffix` | `(info) => VNodeChild` | `undefined` | Render function for suffix |
| `render-switcher-icon` | `(props) => VNodeChild` | `undefined` | Render function for switcher icon |
| `scrollbar-props` | `ScrollbarProps` | `undefined` | Scrollbar props |
| `selectable` | `boolean` | `true` | Whether nodes can be selected |
| `selected-keys` | `Array<string \| number>` | `undefined` | Selected keys (controlled) |
| `show-irrelevant-nodes` | `boolean` | `true` | Show unmatched nodes in filter mode |
| `show-line` | `boolean` | `false` | Whether to show connection line |
| `spin-props` | `object` | `undefined` | Loading icon properties |
| `virtual-scroll` | `boolean` | `false` | Whether to enable virtual scroll |
| `watch-props` | `Array<string>` | `undefined` | Props to watch for updates |

### Events

| Name | Parameters | Description |
| --- | --- | --- |
| `update:checked-keys` | `(keys, options, meta)` | Emitted when checked keys change |
| `update:expanded-keys` | `(keys, options, meta)` | Emitted when expanded keys change |
| `update:selected-keys` | `(keys, options, meta)` | Emitted when selected keys change |
| `update:indeterminate-keys` | `(keys, options)` | Emitted when indeterminate keys change |
| `dragstart` | `({ node, event })` | Emitted when drag starts |
| `dragend` | `({ node, event })` | Emitted when drag ends |
| `dragenter` | `({ node, event })` | Emitted on dragenter |
| `dragleave` | `({ node, event })` | Emitted on dragleave |
| `drop` | `({ node, dragNode, dropPosition, event })` | Emitted on drop |

### TreeOption Properties

| Name | Type | Description |
| --- | --- | --- |
| `key` | `string \| number` | Unique key of the node |
| `label` | `string` | Display label |
| `checkboxDisabled` | `boolean` | Whether checkbox is disabled |
| `children` | `TreeOption[]` | Child nodes |
| `disabled` | `boolean` | Whether node is disabled |
| `isLeaf` | `boolean` | Whether node is a leaf (for async loading) |
| `prefix` | `string \| (() => VNodeChild)` | Prefix content |
| `suffix` | `string \| (() => VNodeChild)` | Suffix content |

### Slots

| Name    | Parameters | Description      |
| ------- | ---------- | ---------------- |
| `empty` | `()`       | Empty state slot |

### Methods

| Name | Parameters | Description |
| --- | --- | --- |
| `scrollTo` | `ScrollTo` | Scroll to a node in virtual scroll mode |
| `getCheckedData` | `()` | Get checked data |
| `getIndeterminateData` | `()` | Get indeterminate data |

## Common Patterns

### Search/Filter

```vue
<template>
  <n-space vertical>
    <n-input v-model:value="pattern" placeholder="Search" />
    <n-tree :pattern="pattern" :data="data" block-line />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const pattern = ref('');
</script>
```

### Async Loading

```vue
<template>
  <n-tree
    block-line
    :data="data"
    :on-load="handleLoad"
    :expanded-keys="expandedKeys"
    @update:expanded-keys="handleExpandedChange"
  />
</template>

<script setup>
import { ref } from 'vue';

const data = ref([{ key: '1', label: 'Root', isLeaf: false }]);

const expandedKeys = ref([]);

const handleLoad = async node => {
  return new Promise(resolve => {
    setTimeout(() => {
      node.children = [{ key: `${node.key}-1`, label: 'Loaded Child' }];
      resolve();
    }, 1000);
  });
};

const handleExpandedChange = keys => {
  expandedKeys.value = keys;
};
</script>
```

### Drag and Drop

```vue
<template>
  <n-tree block-line draggable :data="data" @drop="handleDrop" />
</template>

<script setup>
import { ref } from 'vue';

const data = ref([
  { key: '1', label: 'Node 1', children: [] },
  { key: '2', label: 'Node 2', children: [] },
]);

const handleDrop = ({ node, dragNode, dropPosition }) => {
  // Handle drop logic
};
</script>
```

### Virtual Scroll for Large Data

```vue
<template>
  <n-tree
    block-line
    :data="largeData"
    default-expand-all
    virtual-scroll
    style="height: 400px"
  />
</template>

<script setup>
const largeData = Array.from({ length: 1000 }, (_, i) => ({
  key: `${i}`,
  label: `Node ${i}`,
  children: Array.from({ length: 5 }, (_, j) => ({
    key: `${i}-${j}`,
    label: `Child ${i}-${j}`,
  })),
}));
</script>
```

### Custom Render Functions

```vue
<template>
  <n-tree
    block-line
    :data="data"
    :render-prefix="renderPrefix"
    :render-label="renderLabel"
    :render-suffix="renderSuffix"
  />
</template>

<script setup>
import { h } from 'vue';
import { NIcon, NButton } from 'naive-ui';

const renderPrefix = ({ option }) => {
  return h(NIcon, null, { default: () => '📁' });
};

const renderLabel = ({ option }) => {
  return h('span', { style: { fontWeight: 'bold' } }, option.label);
};

const renderSuffix = ({ option }) => {
  return h(NButton, { size: 'tiny', text: true }, { default: () => 'Edit' });
};
</script>
```

### File Tree

```vue
<template>
  <n-tree
    block-line
    expand-on-click
    :data="fileData"
    :render-switcher-icon="renderSwitcherIcon"
  />
</template>

<script setup>
import { h } from 'vue';

const fileData = [
  {
    key: 'src',
    label: 'src',
    isLeaf: false,
    children: [
      { key: 'src/main.js', label: 'main.js', isLeaf: true },
      { key: 'src/App.vue', label: 'App.vue', isLeaf: true },
    ],
  },
];

const renderSwitcherIcon = ({ option, expanded }) => {
  if (option.isLeaf) return null;
  return h('span', expanded ? '📂' : '📁');
};
</script>
```

### Context Menu

```vue
<template>
  <n-tree block-line :data="data" :node-props="nodeProps" />
  <n-dropdown
    trigger="manual"
    :show="showDropdown"
    :options="dropdownOptions"
    :x="x"
    :y="y"
    @select="handleDropdownSelect"
    @clickoutside="showDropdown = false"
  />
</template>

<script setup>
import { ref } from 'vue';

const showDropdown = ref(false);
const x = ref(0);
const y = ref(0);
const currentNode = ref(null);

const nodeProps = ({ option }) => ({
  onClick: e => {
    e.preventDefault();
    currentNode.value = option;
    showDropdown.value = true;
    x.value = e.clientX;
    y.value = e.clientY;
  },
  onContextmenu: e => {
    e.preventDefault();
    currentNode.value = option;
    showDropdown.value = true;
    x.value = e.clientX;
    y.value = e.clientY;
  },
});

const dropdownOptions = [
  { label: 'Add Child', key: 'add' },
  { label: 'Edit', key: 'edit' },
  { label: 'Delete', key: 'delete' },
];

const handleDropdownSelect = key => {
  showDropdown.value = false;
  // Handle action
};
</script>
```

## Best Practices

### 1. Always Define Unique Keys

```vue
const data = [ { key: 'unique-id-1', label: 'Node 1' }, { key: 'unique-id-2',
label: 'Node 2' } ]
```

### 2. Use Virtual Scroll for Large Trees

```vue
<n-tree :data="largeData" virtual-scroll style="height: 400px" />
```

### 3. Use Controlled Mode for Dynamic Data

```vue
<n-tree
  :expanded-keys="expandedKeys"
  :checked-keys="checkedKeys"
  :selected-keys="selectedKeys"
  @update:expanded-keys="handleExpandedChange"
  @update:checked-keys="handleCheckedChange"
  @update:selected-keys="handleSelectedChange"
/>
```

### 4. Set isLeaf for Async Loading

```vue
const data = [ { key: '1', label: 'Folder', isLeaf: false }, // Will show expand
icon { key: '2', label: 'File', isLeaf: true } // No expand icon ]
```

### 5. Use block-line for Better Click Area

```vue
<n-tree block-line :data="data" />
```

### 6. Handle Empty States

```vue
<n-tree :data="data">
  <template #empty>
    <n-empty description="No data available" />
  </template>
</n-tree>
```
