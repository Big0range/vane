---
name: 'n-breadcrumb'
description: 'Breadcrumb component for navigation path display. Invoke when user needs to implement breadcrumb navigation, show current location, or navigation hierarchy in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Breadcrumb Component

Breadcrumb component for displaying navigation paths and current location within an application.

## When to Use

Use this component when:

- **Page hierarchy**: Show the path from home to current page
- **Navigation context**: Help users understand their location
- **Quick navigation**: Allow users to jump to parent pages
- **E-commerce**: Display category paths for products

## When to Invoke

Invoke this skill when:

- User needs to implement breadcrumb navigation
- User wants to display navigation hierarchy
- User needs custom separators between items
- User wants to integrate dropdown menus in breadcrumbs
- User asks about navigation path display

## Features

- **Custom Separators**: Configure separator text or use slots
- **Dropdown Integration**: Support for dropdown menus in items
- **Icon Support**: Add icons to breadcrumb items
- **Link Support**: Items can be clickable links
- **Per-Item Separators**: Customize separator for each item

## API Reference

### Breadcrumb Props

| Name      | Type     | Default | Description           |
| --------- | -------- | ------- | --------------------- |
| separator | `string` | `'/'`   | Breadcrumb separator. |

### BreadcrumbItem Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| clickable | `boolean` | `true` | Whether it's clickable. | 2.30.0 |
| href | `string` | `undefined` | BreadcrumbItem link. |  |
| separator | `string` | `undefined` | BreadcrumbItem separator. |  |
| show-separator | `boolean` | `true` | Whether to show the separator. | 2.44.0 |

### Breadcrumb Slots

| Name    | Parameters | Description              |
| ------- | ---------- | ------------------------ |
| default | `()`       | Breadcrumb default slot. |

### BreadcrumbItem Slots

| Name      | Parameters | Description                    |
| --------- | ---------- | ------------------------------ |
| default   | `()`       | BreadcrumbItem default slot.   |
| separator | `()`       | BreadcrumbItem separator slot. |

## Basic Usage

### Basic Breadcrumb

```vue
<template>
  <n-breadcrumb>
    <n-breadcrumb-item>
      <n-icon :component="HomeIcon" /> Home
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-icon :component="AccountIcon" /> Account
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-icon :component="CategoryIcon" /> Category
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
```

### Custom Separator

```vue
<template>
  <n-breadcrumb separator=">">
    <n-breadcrumb-item>
      <n-icon><HomeIcon /></n-icon> Home
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-icon><AccountIcon /></n-icon> Account
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-icon><CategoryIcon /></n-icon> Category
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
```

### Custom Separator by Item

```vue
<template>
  <n-breadcrumb>
    <n-breadcrumb-item separator=">">
      <n-icon><HomeIcon /></n-icon> Home
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-icon><AccountIcon /></n-icon> Account
      <template #separator> ~ </template>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-icon><CategoryIcon /></n-icon> Category
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
```

## Common Patterns

### Breadcrumb with Dropdown

```vue
<template>
  <n-breadcrumb>
    <n-breadcrumb-item>
      <n-dropdown :options="options1">
        <div class="trigger">Home</div>
      </n-dropdown>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-dropdown :options="options2">
        <div class="trigger">Category</div>
      </n-dropdown>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<style scoped>
.trigger::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: inherit;
}
</style>
```

### Breadcrumb with Router

```vue
<template>
  <n-breadcrumb>
    <n-breadcrumb-item href="/"> Home </n-breadcrumb-item>
    <n-breadcrumb-item href="/products"> Products </n-breadcrumb-item>
    <n-breadcrumb-item>
      {{ currentProduct }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup>
import { ref } from 'vue';

const currentProduct = ref('Product Name');
</script>
```

### Non-clickable Breadcrumb

```vue
<template>
  <n-breadcrumb>
    <n-breadcrumb-item :clickable="false"> Home </n-breadcrumb-item>
    <n-breadcrumb-item :clickable="false"> Category </n-breadcrumb-item>
    <n-breadcrumb-item :clickable="false"> Current Page </n-breadcrumb-item>
  </n-breadcrumb>
</template>
```

### Hide Last Separator

```vue
<template>
  <n-breadcrumb>
    <n-breadcrumb-item>Home</n-breadcrumb-item>
    <n-breadcrumb-item>Category</n-breadcrumb-item>
    <n-breadcrumb-item :show-separator="false">
      Current Page
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
```

## Best Practices

1. **Show full path**: Display the complete navigation path from home to current page

2. **Make parent items clickable**: Allow users to navigate to parent pages easily

3. **Current page not clickable**: The last item (current page) should not be a link

4. **Use icons sparingly**: Icons can help but don't overuse them

5. **Consistent separators**: Use consistent separators throughout the application

6. **Dropdown for alternatives**: Use dropdowns when there are sibling pages to navigate to
