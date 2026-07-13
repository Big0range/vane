---
name: 'n-dropdown'
description: 'Dropdown component for displaying contextual menus and action lists. Invoke when user needs to implement dropdown menus, context menus, or cascading selections in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Dropdown Component

Dropdown component for displaying contextual menus, action lists, and cascading selections.

## When to Use

Use this component when:

- **Context menus**: Right-click or action-triggered menus
- **Navigation menus**: Dropdown navigation items
- **Action lists**: Lists of actions for an item
- **User menus**: Profile and settings dropdowns

## When to Invoke

Invoke this skill when:

- User needs to implement a dropdown menu
- User wants cascading (nested) menus
- User needs context menu (right-click menu)
- User wants to customize option rendering
- User asks about different trigger modes (hover, click, manual)
- User needs to add icons or tooltips to options

## Features

- **Multiple Triggers**: Hover, click, or manual control
- **Cascading Menus**: Support for nested submenus
- **Custom Rendering**: Full control over option rendering
- **Context Menu**: Manual positioning for right-click menus
- **Icons Support**: Add icons to menu options
- **Grouping**: Group related options together
- **Keyboard Navigation**: Full keyboard support
- **Placement Control**: Configurable popup placement

## API Reference

### Dropdown Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| animated | `boolean` | `true` | Use animation when showing options. |
| inverted | `boolean` | `false` | Use inverted style. |
| children-field | `string` | `'children'` | Field name of children. |
| keyboard | `boolean` | `true` | Whether keyboard operation is supported. |
| key-field | `string` | `'key'` | Field name of key. |
| label-field | `string` | `'label'` | Field name of label. |
| node-props | `(option) => HTMLAttributes` | `undefined` | Option HTML attributes generator. |
| menu-props | `(option, options) => HTMLAttributes` | `undefined` | Menu HTML attributes generator. |
| options | `Array<DropdownOption>` | `[]` | Dropdown options. |
| render-icon | `(option) => VNodeChild` | `undefined` | Render function for option icons. |
| render-label | `(option) => VNodeChild` | `undefined` | Render function for option labels. |
| render-option | `({ node, option }) => VNodeChild` | `undefined` | Render function for option itself. |
| size | `'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` | Dropdown size. |
| on-clickoutside | `(e: MouseEvent) => void` | `undefined` | Callback when click outside. |
| on-select | `(key, option) => void` | `undefined` | Callback when option is selected. |

### DropdownOption Type

| Property  | Type                         | Description                      |
| --------- | ---------------------------- | -------------------------------- |
| children? | `Array<DropdownOption>`      | Child options (for cascading).   |
| disabled? | `boolean`                    | Whether to disable the option.   |
| icon?     | `() => VNodeChild`           | Custom render function for icon. |
| key?      | `string \| number`           | Option ID (should be unique).    |
| label?    | `string \| () => VNodeChild` | Displayed label value.           |
| props?    | `HTMLAttributes`             | Customize option props.          |
| show?     | `boolean`                    | Whether to show the option.      |

### DropdownDividerOption Type

| Property | Type               | Description          |
| -------- | ------------------ | -------------------- |
| key?     | `string \| number` | Divider ID.          |
| show?    | `boolean`          | Whether to show.     |
| type     | `'divider'`        | The type identifier. |

### DropdownGroupOption Type

| Property  | Type                    | Description          |
| --------- | ----------------------- | -------------------- |
| children? | `Array<DropdownOption>` | Children options.    |
| icon?     | `() => VNodeChild`      | Custom icon render.  |
| label?    | `string`                | Group label.         |
| key?      | `string \| number`      | Group ID.            |
| show?     | `boolean`               | Whether to show.     |
| type      | `'group'`               | The type identifier. |

### DropdownRenderOption Type

| Property | Type               | Description                  |
| -------- | ------------------ | ---------------------------- |
| key?     | `string \| number` | Render option ID.            |
| render?  | `() => VNodeChild` | Render function for content. |
| show?    | `boolean`          | Whether to show.             |
| type     | `'render'`         | The type identifier.         |

## Basic Usage

### Basic Dropdown

```vue
<template>
  <n-dropdown trigger="hover" :options="options" @select="handleSelect">
    <n-button>Hover Me</n-button>
  </n-dropdown>
</template>

<script setup>
const options = [
  { label: 'Edit', key: 'edit' },
  { label: 'Delete', key: 'delete' },
  { label: 'Share', key: 'share' },
];

const handleSelect = key => {
  console.log(`Selected: ${key}`);
};
</script>
```

### Click Trigger

```vue
<template>
  <n-dropdown trigger="click" :options="options" @select="handleSelect">
    <n-button>Click Me</n-button>
  </n-dropdown>
</template>
```

### Dropdown with Icons

```vue
<template>
  <n-dropdown :options="options">
    <n-button>User Profile</n-button>
  </n-dropdown>
</template>

<script setup>
import { h } from 'vue';
import {
  PersonOutline,
  SettingsOutline,
  LogOutOutline,
} from '@vicons/ionicons5';

const options = [
  {
    label: 'Profile',
    key: 'profile',
    icon: () => h(PersonOutline),
  },
  {
    label: 'Settings',
    key: 'settings',
    icon: () => h(SettingsOutline),
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    label: 'Logout',
    key: 'logout',
    icon: () => h(LogOutOutline),
  },
];
</script>
```

## Common Patterns

### Cascading Menu

```vue
<template>
  <n-dropdown
    :options="options"
    placement="bottom-start"
    trigger="click"
    @select="handleSelect"
  >
    <n-button>Menu</n-button>
  </n-dropdown>
</template>

<script setup>
const options = [
  {
    label: 'File',
    key: 'file',
    children: [
      { label: 'New', key: 'new' },
      { label: 'Open', key: 'open' },
      { type: 'divider', key: 'd1' },
      { label: 'Save', key: 'save' },
    ],
  },
  {
    label: 'Edit',
    key: 'edit',
    children: [
      { label: 'Undo', key: 'undo' },
      { label: 'Redo', key: 'redo' },
    ],
  },
];
</script>
```

### Context Menu (Right-Click)

```vue
<template>
  <div
    style="width: 200px; height: 200px; background: rgba(0, 128, 0, 0.5)"
    @contextmenu="handleContextMenu"
  >
    Right Click Here
  </div>

  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    :x="x"
    :y="y"
    :options="options"
    :show="showDropdown"
    :on-clickoutside="onClickoutside"
    @update:show="showDropdown = $event"
    @select="handleSelect"
  />
</template>

<script setup>
import { ref } from 'vue';

const showDropdown = ref(false);
const x = ref(0);
const y = ref(0);

const options = [
  { label: 'Copy', key: 'copy' },
  { label: 'Paste', key: 'paste' },
  { label: 'Delete', key: 'delete' },
];

const handleContextMenu = e => {
  e.preventDefault();
  showDropdown.value = false;
  x.value = e.clientX;
  y.value = e.clientY;
  showDropdown.value = true;
};

const onClickoutside = () => {
  showDropdown.value = false;
};

const handleSelect = () => {
  showDropdown.value = false;
};
</script>
```

### Grouped Options

```vue
<template>
  <n-dropdown :options="options" trigger="click">
    <n-button>Grouped Menu</n-button>
  </n-dropdown>
</template>

<script setup>
const options = [
  {
    type: 'group',
    label: 'Actions',
    key: 'actions',
    children: [
      { label: 'Edit', key: 'edit' },
      { label: 'Delete', key: 'delete' },
    ],
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    type: 'group',
    label: 'Export',
    key: 'export',
    children: [
      { label: 'PDF', key: 'pdf' },
      { label: 'Excel', key: 'excel' },
    ],
  },
];
</script>
```

### Custom Render

```vue
<template>
  <n-dropdown
    :options="options"
    :render-label="renderLabel"
    :render-icon="renderIcon"
    trigger="click"
  >
    <n-button>Custom Render</n-button>
  </n-dropdown>
</template>

<script setup>
import { h } from 'vue';
import { NText } from 'naive-ui';

const options = [
  { label: 'Edit', key: 'edit' },
  { label: 'Delete', key: 'delete', disabled: true },
];

const renderLabel = option => {
  return h(
    NText,
    { type: option.disabled ? 'disabled' : 'default' },
    {
      default: () => option.label,
    },
  );
};

const renderIcon = option => {
  if (option.key === 'edit') {
    return h('span', '✏️');
  }
  return null;
};
</script>
```

### With Arrow

```vue
<template>
  <n-dropdown
    trigger="click"
    :options="options"
    :show-arrow="true"
    @select="handleSelect"
  >
    <n-button>Dropdown with Arrow</n-button>
  </n-dropdown>
</template>
```

### Placement Control

```vue
<template>
  <n-space>
    <n-dropdown placement="bottom-start" :options="options" trigger="click">
      <n-button>Bottom Start</n-button>
    </n-dropdown>
    <n-dropdown placement="bottom-end" :options="options" trigger="click">
      <n-button>Bottom End</n-button>
    </n-dropdown>
    <n-dropdown placement="top" :options="options" trigger="click">
      <n-button>Top</n-button>
    </n-dropdown>
  </n-space>
</template>
```

### Different Sizes

```vue
<template>
  <n-space>
    <n-dropdown size="small" :options="options" trigger="click">
      <n-button>Small</n-button>
    </n-dropdown>
    <n-dropdown size="medium" :options="options" trigger="click">
      <n-button>Medium</n-button>
    </n-dropdown>
    <n-dropdown size="large" :options="options" trigger="click">
      <n-button>Large</n-button>
    </n-dropdown>
  </n-space>
</template>
```

### Add Tooltip for Option

```vue
<template>
  <n-dropdown
    trigger="hover"
    :options="options"
    :render-option="renderOption"
    @select="handleSelect"
  >
    <n-button>With Tooltips</n-button>
  </n-dropdown>
</template>

<script setup>
import { h } from 'vue';
import { NTooltip } from 'naive-ui';

const options = [
  { label: 'Edit', key: 'edit' },
  { label: 'Delete', key: 'delete' },
];

const renderOption = ({ node, option }) => {
  return h(NTooltip, null, {
    trigger: () => node,
    default: () => `Click to ${option.label}`,
  });
};
</script>
```

### Pure Render Content

```vue
<template>
  <n-dropdown trigger="hover" :options="options">
    <n-button>Custom Content</n-button>
  </n-dropdown>
</template>

<script setup>
import { h } from 'vue';
import { NText } from 'naive-ui';

const options = [
  {
    type: 'render',
    key: 'render',
    render: () =>
      h(
        NText,
        { type: 'primary' },
        { default: () => 'Custom rendered content' },
      ),
  },
];
</script>
```

## Best Practices

1. **Use appropriate trigger**: Choose hover or click based on use case
   - Hover: Quick access menus
   - Click: Action menus, forms
   - Manual: Context menus

2. **Unique keys**: Ensure each option has a unique key

   ```javascript
   { label: 'Edit', key: 'edit' }
   ```

3. **Group related options**: Use dividers and groups

   ```javascript
   [
     { label: 'Edit', key: 'edit' },
     { type: 'divider', key: 'd1' },
     { label: 'Delete', key: 'delete' },
   ];
   ```

4. **Disable unavailable options**: Use `disabled` for unavailable actions

   ```javascript
   { label: 'Delete', key: 'delete', disabled: true }
   ```

5. **Context menu pattern**: Always handle clickoutside for manual triggers

   ```vue
   <n-dropdown trigger="manual" :on-clickoutside="() => (show = false)" />
   ```

6. **Keyboard accessibility**: Keep `keyboard` enabled for accessibility

   ```vue
   <n-dropdown keyboard :options="options">
   ```

7. **Icons for clarity**: Add icons to improve visual recognition
   ```javascript
   { label: 'Delete', key: 'delete', icon: () => h(TrashIcon) }
   ```
