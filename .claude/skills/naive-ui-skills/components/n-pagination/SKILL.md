---
name: 'n-pagination'
description: 'Pagination component for navigating through data pages. Invoke when user needs to implement pagination, page navigation, or data pagination controls in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Pagination Component

Long data's friend. Navigate through paginated data with ease.

## When to Use

Use this component when:

- **Data tables**: Navigate through table data pages
- **Search results**: Browse through paginated search results
- **Product listings**: Navigate product catalog pages
- **Content lists**: Browse articles, posts, or other content

## When to Invoke

Invoke this skill when:

- User needs to implement pagination
- User wants to customize page navigation
- User needs page size selection
- User wants quick jump functionality
- User asks about pagination configuration

## Features

- **Multiple Sizes**: Small, medium, and large sizes
- **Page Size Picker**: Let users select items per page
- **Quick Jumper**: Jump to specific page number
- **Simple Mode**: Minimal pagination UI
- **Custom Slots**: Customize prev/next buttons and labels
- **Item Count**: Use total items instead of page count

## API Reference

### Pagination Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| default-page | `number` | `1` | Current page in uncontrolled mode. |  |
| default-page-size | `number` | `10` | Page size in uncontrolled mode. |  |
| disabled | `boolean` | `false` | Whether to disable the pagination. |  |
| display-order | `Array<string>` | `['pages', 'size-picker', 'quick-jumper']` | Display order of parts. | 2.32.2 |
| goto | `() => VNodeChild` | `undefined` | Fast jump content render function. | 2.34.3 |
| item-count | `number` | `undefined` | Total number of items. |  |
| next | `(info) => VNodeChild` | `undefined` | Next page render function. |  |
| prev | `(info) => VNodeChild` | `undefined` | Previous page render function. |  |
| label | `PaginationRenderLabel` | `undefined` | Item content render function. | 2.24.0 |
| page-count | `number` | `1` | Total pages. |  |
| page-sizes | `Array<number \| object>` | `[10]` | Items per page options. |  |
| page-size | `number` | `undefined` | Page size (controlled). |  |
| page-slot | `number` | `9` | Number of pages displayed. |  |
| page | `number` | `undefined` | Current page (controlled). |  |
| prefix | `(info) => VNodeChild` | `undefined` | Prefix render function. |  |
| scrollbar-props | `ScrollbarProps` | `undefined` | Scrollbar props. | 2.44.0 |
| select-props | `SelectProps` | `undefined` | Page size select props. | 2.34.3 |
| show-quick-jumper | `boolean` | `false` | Whether to show quick jump input. |  |
| show-quick-jump-dropdown | `boolean` | `true` | Whether to show quick jump dropdown. | 2.37.0 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of page item. | 2.29.0 |
| simple | `boolean` | `false` | Whether to use simple mode. | 2.32.2 |
| suffix | `(info) => VNodeChild` | `undefined` | Suffix render function. |  |
| show-size-picker | `boolean` | `false` | Whether to show size picker. |  |
| to | `string \| HTMLElement \| false` | `'body'` | Container node of pop menu. | 2.33.4 |
| on-update:page | `(page) => void` | `undefined` | Callback when page changes. |  |
| on-update:page-size | `(pageSize) => void` | `undefined` | Callback when page size changes. |  |

### Pagination Slots

| Name   | Parameters | Description                         | Version |
| ------ | ---------- | ----------------------------------- | ------- |
| goto   | `()`       | Fast jump text before quick jumper. | 2.27.0  |
| label  | Label info | Item content.                       | 2.24.0  |
| next   | `(info)`   | Next page.                          |         |
| prev   | `(info)`   | Previous page.                      |         |
| prefix | `(info)`   | Page prefix.                        |         |
| suffix | `(info)`   | Page suffix.                        |         |

## Basic Usage

### Basic Pagination

```vue
<template>
  <n-pagination v-model:page="page" :page-count="100" />
</template>

<script setup>
import { ref } from 'vue';

const page = ref(1);
</script>
```

### Simple Mode

```vue
<template>
  <n-pagination v-model:page="page" :page-count="100" simple />
</template>
```

### With Page Size Picker

```vue
<template>
  <n-pagination
    v-model:page="page"
    v-model:page-size="pageSize"
    :page-count="100"
    show-size-picker
    :page-sizes="[10, 20, 30, 40]"
  />
</template>

<script setup>
import { ref } from 'vue';

const page = ref(1);
const pageSize = ref(10);
</script>
```

## Common Patterns

### With Quick Jumper

```vue
<template>
  <n-pagination :page-count="100" show-quick-jumper>
    <template #goto> Go! </template>
  </n-pagination>
</template>
```

### Using Item Count

```vue
<template>
  <n-pagination
    :item-count="201"
    :page-sizes="[10, 20, 30, 40]"
    show-size-picker
  />
</template>
```

### Custom Prev/Next Buttons

```vue
<template>
  <n-pagination :page-count="101">
    <template #prev> Go Prev </template>
    <template #next> Go Next </template>
  </n-pagination>
</template>
```

### With Prefix and Suffix

```vue
<template>
  <n-pagination :item-count="101">
    <template #prefix="{ itemCount, startIndex }">
      From Item No.{{ startIndex }}, Total is {{ itemCount }}
    </template>
    <template #suffix="{ endIndex }"> To Item No.{{ endIndex }} </template>
  </n-pagination>
</template>
```

### Different Sizes

```vue
<template>
  <n-space vertical>
    <n-pagination
      v-model:page="page"
      :page-count="100"
      size="small"
      show-quick-jumper
      show-size-picker
    />
    <n-pagination
      v-model:page="page"
      :page-count="100"
      size="medium"
      show-quick-jumper
      show-size-picker
    />
    <n-pagination
      v-model:page="page"
      :page-count="100"
      size="large"
      show-quick-jumper
      show-size-picker
    />
  </n-space>
</template>
```

### Custom Page Size Options

```vue
<template>
  <n-pagination
    v-model:page="page"
    v-model:page-size="pageSize"
    :page-count="100"
    show-size-picker
    :page-sizes="pageSizes"
  />
</template>

<script setup>
import { ref } from 'vue';

const page = ref(1);
const pageSize = ref(10);
const pageSizes = [
  { label: '10 / page', value: 10 },
  { label: '20 / page', value: 20 },
  { label: '50 / page', value: 50 },
  { label: '100 / page', value: 100 },
];
</script>
```

### Disabled State

```vue
<template>
  <n-space vertical>
    <n-pagination
      v-model:page="page"
      v-model:page-size="pageSize"
      :page-count="100"
      show-size-picker
      :page-sizes="[10, 20, 30, 40]"
      show-quick-jumper
      :disabled="disabled"
    />
    <n-switch v-model:value="disabled" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const page = ref(1);
const pageSize = ref(10);
const disabled = ref(false);
</script>
```

## Best Practices

1. **Use item-count for dynamic data**: When total items change, use `item-count` instead of `page-count`

2. **Provide page size options**: Let users choose how many items to display

3. **Show quick jumper for many pages**: Enable quick jump when there are many pages

4. **Consistent sizing**: Match pagination size with other UI elements

5. **Handle page changes**: Always handle `on-update:page` and `on-update:page-size` events

6. **Use prefix/suffix for context**: Show item range information with prefix/suffix slots
