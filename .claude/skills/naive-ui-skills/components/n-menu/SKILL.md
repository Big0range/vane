---
name: 'n-menu'
description: 'Menu component for navigation and actions. Invoke when user needs to implement navigation menus, sidebars, dropdown menus, or hierarchical navigation in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Menu Component

Menu component for navigation and actions. No Food.

## When to Use

Use this component when:

- **Side navigation**: Create sidebar navigation for applications
- **Top navigation**: Build horizontal navigation bars
- **Nested navigation**: Display hierarchical menu structures
- **Admin panels**: Create collapsible sidebar menus

## When to Invoke

Invoke this skill when:

- User needs to implement navigation menus
- User wants to create sidebar or top navigation
- User needs collapsible menu functionality
- User wants to integrate with vue-router
- User asks about menu customization or rendering

## Features

- **Horizontal & Vertical**: Support both layout modes
- **Collapsible**: Collapse menu with icon-only mode
- **Nested Items**: Support multi-level menu structure
- **Router Integration**: Works with vue-router
- **Custom Rendering**: Custom render functions for labels and icons
- **Accordion Mode**: Expand one submenu at a time
- **Responsive**: Auto-collapse overflow items in horizontal mode

## API Reference

### Menu Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| accordion | `boolean` | `false` | Whether to use accordion mode. |  |
| children-field | `string` | `'children'` | Field name of children. |  |
| collapsed-icon-size | `number` | `24` | The icon size when menu is collapsed. |  |
| collapsed-width | `number` | `48` | The menu width after collapsed. |  |
| collapsed | `boolean` | `false` | The collapsed status of menu. |  |
| default-expand-all | `boolean` | `false` | Whether to expand all menus. |  |
| default-expanded-keys | `Array<string>` | `[]` | The default expanded submenu keys. |  |
| default-value | `string \| null` | `null` | Default selected value. |  |
| disabled-field | `string` | `'disabled'` | Field name of disabled. | 2.33.0 |
| dropdown-placement | `string` | `'top'` | Dropdown placement in horizontal mode. |  |
| dropdown-props | `DropdownProps` | `undefined` | Props for dropdown menus. |  |
| expanded-keys | `Array<string>` | `undefined` | Expanded submenu keys (controlled). |  |
| expand-icon | `(option) => VNodeChild` | `undefined` | Render function for expand icon. |  |
| icon-size | `number` | `20` | Icon size when not collapsed. |  |
| indent | `number` | `32` | Menu indent. |  |
| inverted | `boolean` | `false` | Use inverted style. |  |
| key-field | `string` | `'key'` | Field name of key. |  |
| label-field | `string` | `'label'` | Field name of label. |  |
| options | `Array<MenuOption>` | `[]` | Menu items data. |  |
| node-props | `(option) => object` | `undefined` | Node's DOM attrs generator. | 2.28.3 |
| mode | `'vertical' \| 'horizontal'` | `'vertical'` | Menu layout. |  |
| render-extra | `(option) => VNodeChild` | `undefined` | Render function for extras. |  |
| render-icon | `(option) => VNodeChild` | `undefined` | Render function for icons. |  |
| render-label | `(option) => VNodeChild` | `undefined` | Render function for labels. |  |
| responsive | `boolean` | `false` | Auto-collapse overflow in horizontal mode. | 2.36.0 |
| root-indent | `number` | `undefined` | Indent for first level children. |  |
| value | `string \| null` | `undefined` | Selected item key (controlled). |  |
| on-update:expanded-keys | `(keys) => void` | `undefined` | Callback when expanded keys change. |  |
| on-update:value | `(key, item) => void` | `undefined` | Callback when selection changes. |  |

### MenuOption Properties

| Name      | Type                           | Description                  |
| --------- | ------------------------------ | ---------------------------- | ------ |
| children? | `Array<MenuOption>`            | Child menu options.          |
| disabled? | `boolean`                      | Whether to disable the item. |
| extra?    | `string \| (() => VNodeChild)` | Extra content.               |
| icon?     | `() => VNodeChild`             | Icon render function.        |
| key       | `string`                       | Unique identifier.           |
| label     | `string \| (() => VNodeChild)` | Label content.               |
| show?     | `boolean`                      | Whether to show the item.    | 2.32.2 |

### Menu Methods

| Name | Type | Description | Version |
| --- | --- | --- | --- |
| deriveResponsiveState | `() => void` | Recalculate responsive state. | 2.36.0 |
| showOption | `(key) => void` | Expand menu to show option. | 2.27.0 |

## Basic Usage

### Horizontal Menu

```vue
<template>
  <n-menu
    v-model:value="activeKey"
    mode="horizontal"
    :options="menuOptions"
    responsive
  />
</template>

<script setup>
import { ref } from 'vue';
import { h } from 'vue';

const activeKey = ref(null);

const menuOptions = [
  {
    label: 'Home',
    key: 'home',
  },
  {
    label: 'About',
    key: 'about',
  },
  {
    label: 'Contact',
    key: 'contact',
  },
];
</script>
```

### Vertical Menu with Selection

```vue
<template>
  <n-menu :options="menuOptions" @update:value="handleUpdateValue" />
</template>

<script setup>
import { h } from 'vue';

const handleUpdateValue = (key, item) => {
  console.log('Selected:', key, item);
};

const menuOptions = [
  {
    label: 'Dashboard',
    key: 'dashboard',
  },
  {
    label: 'Settings',
    key: 'settings',
    children: [
      { label: 'Profile', key: 'profile' },
      { label: 'Security', key: 'security' },
    ],
  },
];
</script>
```

## Common Patterns

### Collapsible Sidebar Menu

```vue
<template>
  <n-space vertical>
    <n-switch v-model:value="collapsed" />
    <n-layout has-sider>
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-menu
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
        />
      </n-layout-sider>
      <n-layout>
        <span>Content</span>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script setup>
import { ref } from 'vue'

const collapsed = ref(false)
const menuOptions = [...]
</script>
```

### Menu with Icons

```vue
<template>
  <n-menu :options="menuOptions" :render-icon="renderMenuIcon" />
</template>

<script setup>
import { h } from 'vue';
import { HomeOutline, SettingsOutline } from '@vicons/ionicons5';

const renderMenuIcon = option => {
  if (option.key === 'home') return h(HomeOutline);
  if (option.key === 'settings') return h(SettingsOutline);
  return null;
};

const menuOptions = [
  { label: 'Home', key: 'home' },
  { label: 'Settings', key: 'settings' },
];
</script>
```

### Menu with Vue Router

```vue
<template>
  <n-menu :options="menuOptions" />
</template>

<script setup>
import { h } from 'vue';
import { RouterLink } from 'vue-router';

const menuOptions = [
  {
    label: () => h(RouterLink, { to: '/' }, { default: () => 'Home' }),
    key: 'home',
  },
  {
    label: () => h(RouterLink, { to: '/about' }, { default: () => 'About' }),
    key: 'about',
  },
];
</script>
```

### Accordion Mode

```vue
<template>
  <n-menu
    :options="menuOptions"
    :default-expanded-keys="defaultExpandedKeys"
    accordion
  />
</template>
```

### Inverted Style

```vue
<template>
  <n-layout has-sider>
    <n-layout-sider bordered inverted>
      <n-menu inverted :options="menuOptions" />
    </n-layout-sider>
    <n-layout> Content </n-layout>
  </n-layout>
</template>
```

### Control Option Visibility

```vue
<template>
  <n-menu :options="filteredOptions" />
</template>

<script setup>
import { computed } from 'vue';

const isAdmin = ref(false);

const menuOptions = [
  { label: 'Dashboard', key: 'dashboard', show: true },
  { label: 'Admin', key: 'admin', show: isAdmin.value },
  { label: 'Settings', key: 'settings', show: true },
];

const filteredOptions = computed(() =>
  menuOptions.filter(item => item.show !== false),
);
</script>
```

## Best Practices

1. **Use with Layout**: Combine with `n-layout-sider` for sidebar navigation

2. **Router integration**: Render labels as RouterLink for SPA navigation

3. **Collapsed state**: Set appropriate `collapsed-width` for icon-only mode

4. **Custom field names**: Use `key-field`, `label-field` for backend data mapping

5. **Accordion for limited space**: Use accordion mode to prevent menu from getting too tall

6. **Responsive horizontal menu**: Enable `responsive` for horizontal menus that may overflow
