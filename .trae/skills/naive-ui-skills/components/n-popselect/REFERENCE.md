---
name: 'n-popselect'
description: 'Popselect component for selecting options in a popover. Invoke when user needs a lightweight selection dropdown without a full select component in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Popselect Component

Popselect component for selecting options in a popover, providing a lightweight alternative to the full select component.

## When to Use

Use this component when:

- **Quick selection**: Need a simple option selection without form context
- **Compact UI**: Want selection without dedicated select input
- **Action menus**: Select options from button-triggered menus
- **Filter controls**: Quick filter or sort options

## When to Invoke

Invoke this skill when:

- User needs a lightweight selection dropdown
- User wants to select options from a button trigger
- User needs single or multiple selection in popover
- User wants scrollable option lists
- User asks about popselect vs select differences

## Features

- **Single/Multiple Selection**: Support for single or multiple value selection
- **Size Options**: small, medium, and large sizes
- **Scrollable Options**: Enable scrolling for long option lists
- **Virtual Scroll**: Performance optimization for large lists
- **Custom Slots**: Header, action, and empty slots
- **Popover Integration**: Inherits all popover features

## API Reference

### Popselect Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| multiple | `boolean` | `false` | Whether to select multiple values. |  |
| node-props | `(option: SelectOption \| SelectGroupOption) => object` | `undefined` | Option's DOM attrs generator. | 2.30.4 |
| options | `Array<SelectOption \| SelectGroupOption>` | `[]` | Options configuration. |  |
| render-label | `(option: SelectOption \| SelectGroupOption) => VNodeChild` | `undefined` | Render function for options. |  |
| scrollable | `boolean` | `false` | Whether the select menu is scrollable. |  |
| scrollbar-props | `ScrollbarProps` | `undefined` | Scrollbar props. | 2.44.0 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the Popselect. |  |
| value | `string \| number \| Array<string \| number> \| null` | `null` | Selected value in controlled mode. |  |
| virtual-scroll | `boolean` | `false` | Whether to enable virtual scrolling. | 2.30.4 |
| on-update:value | `(value, option) => void` | `undefined` | Callback on value update. |  |

For other props, see [Popover Props](popover#Popover-Props).

### Popselect Slots

| Name   | Parameters | Description               | Version |
| ------ | ---------- | ------------------------- | ------- |
| header | `()`       | Header menu slot.         | 2.36.0  |
| action | `()`       | Options menu action slot. | 2.22.0  |
| empty  | `()`       | Empty state slot.         | 2.22.0  |

### SelectOption Properties

| Name     | Type               | Default     | Description                 |
| -------- | ------------------ | ----------- | --------------------------- |
| label    | `string`           | `undefined` | Option label.               |
| value    | `string \| number` | `undefined` | Option value.               |
| disabled | `boolean`          | `false`     | Whether option is disabled. |
| class    | `string`           | `undefined` | Option CSS class.           |
| style    | `string \| Object` | `undefined` | Option CSS style.           |

## Basic Usage

### Basic Popselect

```vue
<template>
  <n-popselect v-model:value="value" :options="options">
    <n-button>{{ value || 'Select Option' }}</n-button>
  </n-popselect>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(null);
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];
</script>
```

### Different Sizes

```vue
<template>
  <n-space>
    <n-popselect v-model:value="value" :options="options" size="small">
      <n-button size="small">{{ value || 'Small' }}</n-button>
    </n-popselect>

    <n-popselect v-model:value="value" :options="options" size="medium">
      <n-button>{{ value || 'Medium' }}</n-button>
    </n-popselect>

    <n-popselect v-model:value="value" :options="options" size="large">
      <n-button size="large">{{ value || 'Large' }}</n-button>
    </n-popselect>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(null);
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
];
</script>
```

### Scrollable Options

```vue
<template>
  <n-popselect v-model:value="value" :options="options" scrollable>
    <n-button>{{ value || 'Select' }}</n-button>
  </n-popselect>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(null);
const options = Array.from({ length: 20 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: String(i + 1),
}));
</script>
```

### Multiple Selection

```vue
<template>
  <n-popselect v-model:value="values" multiple :options="options">
    <n-button>{{
      values.length > 0 ? values.join(', ') : 'Select Multiple'
    }}</n-button>
  </n-popselect>
</template>

<script setup>
import { ref } from 'vue';

const values = ref([]);
const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
];
</script>
```

### With Slots

```vue
<template>
  <n-popselect v-model:value="value" :options="options" trigger="click">
    <n-button>{{ value || 'Select' }}</n-button>
    <template #header>
      <div style="padding: 8px; font-weight: bold;">Select an option</div>
    </template>
    <template #action>
      <n-button text type="primary" @click="handleClear">Clear</n-button>
    </template>
  </n-popselect>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(null);
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
];

const handleClear = () => {
  value.value = null;
};
</script>
```

## Common Patterns

### Sort Control

```vue
<template>
  <n-space align="center">
    <n-text>Sort by:</n-text>
    <n-popselect v-model:value="sortBy" :options="sortOptions">
      <n-button text>
        <template #icon>
          <n-icon><ArrowDown /></n-icon>
        </template>
        {{ sortOptions.find(o => o.value === sortBy)?.label || 'Default' }}
      </n-button>
    </n-popselect>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';
import { ArrowDown } from '@vicons/ionicons5';

const sortBy = ref('default');
const sortOptions = [
  { label: 'Default', value: 'default' },
  { label: 'Name', value: 'name' },
  { label: 'Date', value: 'date' },
  { label: 'Price', value: 'price' },
];
</script>
```

### Filter Dropdown

```vue
<template>
  <n-space>
    <n-popselect v-model:value="status" :options="statusOptions">
      <n-button>
        <template #icon>
          <n-icon><Filter /></n-icon>
        </template>
        {{ statusOptions.find(o => o.value === status)?.label || 'All Status' }}
      </n-button>
    </n-popselect>

    <n-popselect v-model:value="category" :options="categoryOptions">
      <n-button>
        {{
          categoryOptions.find(o => o.value === category)?.label ||
          'All Categories'
        }}
      </n-button>
    </n-popselect>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';
import { Filter } from '@vicons/ionicons5';

const status = ref('all');
const category = ref('all');

const statusOptions = [
  { label: 'All Status', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
];

const categoryOptions = [
  { label: 'All Categories', value: 'all' },
  { label: 'Electronics', value: 'electronics' },
  { label: 'Clothing', value: 'clothing' },
];
</script>
```

### Theme Switcher

```vue
<template>
  <n-popselect v-model:value="theme" :options="themeOptions">
    <n-button circle>
      <template #icon>
        <n-icon><ColorPalette /></n-icon>
      </template>
    </n-button>
  </n-popselect>
</template>

<script setup>
import { ref } from 'vue';
import { ColorPalette } from '@vicons/ionicons5';

const theme = ref('light');
const themeOptions = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'Auto', value: 'auto' },
];
</script>
```

### Language Selector

```vue
<template>
  <n-popselect v-model:value="language" :options="languageOptions">
    <n-button text>
      <n-icon size="20"><Language /></n-icon>
    </n-button>
  </n-popselect>
</template>

<script setup>
import { ref } from 'vue';
import { Language } from '@vicons/ionicons5';

const language = ref('en');
const languageOptions = [
  { label: 'English', value: 'en' },
  { label: '中文', value: 'zh' },
  { label: '日本語', value: 'ja' },
  { label: 'Español', value: 'es' },
];
</script>
```

### Action Menu

```vue
<template>
  <n-popselect
    v-model:value="action"
    :options="actionOptions"
    @update:value="handleAction"
  >
    <n-button>
      <template #icon>
        <n-icon><EllipsisVertical /></n-icon>
      </template>
    </n-button>
  </n-popselect>
</template>

<script setup>
import { ref } from 'vue';
import { EllipsisVertical } from '@vicons/ionicons5';

const action = ref(null);
const actionOptions = [
  { label: 'Edit', value: 'edit' },
  { label: 'Duplicate', value: 'duplicate' },
  { label: 'Delete', value: 'delete' },
];

const handleAction = value => {
  console.log('Action:', value);
  action.value = null;
};
</script>
```

### Tag Filter

```vue
<template>
  <n-space vertical>
    <n-popselect v-model:value="selectedTags" multiple :options="tagOptions">
      <n-button>
        <template #icon>
          <n-icon><Tag /></n-icon>
        </template>
        {{
          selectedTags.length > 0
            ? `${selectedTags.length} tags selected`
            : 'Filter by tags'
        }}
      </n-button>
    </n-popselect>
    <n-space>
      <n-tag
        v-for="tag in selectedTags"
        :key="tag"
        closable
        @close="removeTag(tag)"
      >
        {{ tag }}
      </n-tag>
    </n-space>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';
import { Tag } from '@vicons/ionicons5';

const selectedTags = ref([]);
const tagOptions = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
];

const removeTag = tag => {
  selectedTags.value = selectedTags.value.filter(t => t !== tag);
};
</script>
```

### With Empty State

```vue
<template>
  <n-popselect v-model:value="value" :options="[]" trigger="click">
    <n-button>No Options</n-button>
    <template #empty>
      <div style="padding: 16px; text-align: center;">
        <n-text depth="3">No options available</n-text>
      </div>
    </template>
  </n-popselect>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(null);
</script>
```

### Custom Option Rendering

```vue
<template>
  <n-popselect
    v-model:value="value"
    :options="options"
    :render-label="renderLabel"
  >
    <n-button>{{ selectedLabel || 'Select User' }}</n-button>
  </n-popselect>
</template>

<script setup>
import { ref, computed, h } from 'vue';
import { NAvatar, NText } from 'naive-ui';

const value = ref(null);
const options = [
  {
    label: 'John Doe',
    value: '1',
    avatar: '/avatar1.jpg',
    email: 'john@example.com',
  },
  {
    label: 'Jane Smith',
    value: '2',
    avatar: '/avatar2.jpg',
    email: 'jane@example.com',
  },
];

const selectedLabel = computed(() => {
  const option = options.find(o => o.value === value.value);
  return option?.label;
});

const renderLabel = option => {
  return h(
    'div',
    { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
    [
      h(NAvatar, { src: option.avatar, size: 'small' }),
      h('div', {}, [
        h(NText, {}, () => option.label),
        h(NText, { depth: 3, style: { fontSize: '12px' } }, () => option.email),
      ]),
    ],
  );
};
</script>
```

### Virtual Scroll for Large Lists

```vue
<template>
  <n-popselect
    v-model:value="value"
    :options="largeOptions"
    virtual-scroll
    scrollable
  >
    <n-button>{{ value || 'Select from 1000 options' }}</n-button>
  </n-popselect>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(null);
const largeOptions = Array.from({ length: 1000 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: String(i + 1),
}));
</script>
```

## Best Practices

1. **Use for quick selections**: Ideal for simple, quick selections

   ```vue
   <n-popselect :options="options">...</n-popselect>
   ```

2. **Match trigger button size**: Keep button and popselect size consistent

   ```vue
   <n-popselect size="small">
     <n-button size="small">...</n-button>
   </n-popselect>
   ```

3. **Use scrollable for long lists**: Enable scrolling for many options

   ```vue
   <n-popselect scrollable :options="manyOptions" />
   ```

4. **Clear display for multiple selection**: Show selected count or values

   ```vue
   <n-button>{{ values.length > 0 ? `${values.length} selected` : 'Select' }}</n-button>
   ```

5. **Use virtual scroll for performance**: Enable for large option lists

   ```vue
   <n-popselect virtual-scroll :options="largeOptions" />
   ```

6. **Provide empty state**: Handle empty options gracefully

   ```vue
   <n-popselect :options="[]">
     <template #empty>No options</template>
   </n-popselect>
   ```

7. **Use appropriate trigger**: Match trigger to use case
   ```vue
   <n-popselect trigger="hover"> <!-- Quick access -->
   <n-popselect trigger="click"> <!-- Deliberate action -->
   ```
