---
name: 'n-descriptions'
description: 'Descriptions component for displaying key-value pairs in a structured layout. Invoke when user needs to display item details, configuration info, or form-like read-only data in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Descriptions Component

Descriptions component for displaying key-value pairs in a structured, readable layout.

## When to Use

Use this component when:

- **Detail pages**: Display object or entity details
- **Configuration display**: Show settings or configuration information
- **Profile information**: Present user or item profiles
- **Read-only forms**: Display form data in a non-editable format

## When to Invoke

Invoke this skill when:

- User needs to display key-value pairs in a structured layout
- User wants to create detail pages or information panels
- User needs to customize label placement or alignment
- User wants to span items across multiple columns
- User asks about bordered vs non-bordered layouts

## Features

- **Flexible Layout**: Control columns and label placement
- **Bordered Mode**: Display with borders for structured data
- **Column Span**: Items can span multiple columns
- **Size Options**: Small, medium, and large sizes
- **Custom Styling**: Style labels and content separately
- **Header Support**: Add title or custom header content

## API Reference

### Descriptions Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` | Whether to display border. |
| column | `number` | `3` | Total columns. |
| content-class | `string` | `undefined` | Class of the item content. |
| content-style | `Object \| string` | `undefined` | Style of the item content. |
| label-align | `'center' \| 'left' \| 'right'` | `'left'` | Label align. |
| label-placement | `'top' \| 'left'` | `'top'` | Label placement. |
| label-class | `string` | `undefined` | Class of the item label. |
| label-style | `Object \| string` | `undefined` | Style of the item label. |
| separator | `string` | `':'` | Separator, only work when `label-placement` is `left` and `bordered` is `false`. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the description. |
| title | `string` | `undefined` | Title of the description. |

### DescriptionItem Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| content-class | `string` | `undefined` | Class of the item content. |
| content-style | `Object \| string` | `undefined` | Style of the item content. |
| label | `string` | `undefined` | Label of the item. |
| label-class | `string` | `undefined` | Class of the item label. |
| label-style | `Object \| string` | `undefined` | Style of the item label. |
| span | `number` | `1` | Column span of the item. |

### Descriptions Slots

| Name    | Parameters | Description     |
| ------- | ---------- | --------------- |
| default | `()`       | Content.        |
| header  | `()`       | Header content. |

### DescriptionItem Slots

| Name    | Parameters | Description   |
| ------- | ---------- | ------------- |
| default | `()`       | Item content. |
| label   | `()`       | Item label.   |

## Basic Usage

### Basic Descriptions

```vue
<template>
  <n-descriptions label-placement="top" title="User Profile">
    <n-descriptions-item label="Name"> John Doe </n-descriptions-item>
    <n-descriptions-item label="Age"> 28 </n-descriptions-item>
    <n-descriptions-item label="Email"> john@example.com </n-descriptions-item>
    <n-descriptions-item label="Phone"> +1 234 567 890 </n-descriptions-item>
    <n-descriptions-item label="Address" :span="2">
      123 Main Street, New York, NY 10001
    </n-descriptions-item>
  </n-descriptions>
</template>
```

### Columns Control

```vue
<template>
  <n-descriptions label-placement="top" :column="4">
    <n-descriptions-item label="Product"> Laptop </n-descriptions-item>
    <n-descriptions-item label="Price"> $999 </n-descriptions-item>
    <n-descriptions-item label="Stock"> 100 </n-descriptions-item>
    <n-descriptions-item label="Category"> Electronics </n-descriptions-item>
  </n-descriptions>
</template>
```

### Span Items

```vue
<template>
  <n-descriptions label-placement="top" bordered :column="6">
    <n-descriptions-item label="Name" :span="2"> John Doe </n-descriptions-item>
    <n-descriptions-item label="Age" :span="2"> 28 </n-descriptions-item>
    <n-descriptions-item label="Status" :span="2">
      <n-tag type="success">Active</n-tag>
    </n-descriptions-item>
    <n-descriptions-item label="Bio" :span="6">
      A software developer with 5 years of experience in web development.
    </n-descriptions-item>
  </n-descriptions>
</template>
```

### Label Placement

```vue
<template>
  <n-descriptions label-placement="left" title="Description">
    <n-descriptions-item label="Name"> John Doe </n-descriptions-item>
    <n-descriptions-item label="Age"> 28 </n-descriptions-item>
    <n-descriptions-item label="Email"> john@example.com </n-descriptions-item>
  </n-descriptions>
</template>
```

### Bordered Mode

```vue
<template>
  <n-descriptions bordered>
    <n-descriptions-item label="Name"> John Doe </n-descriptions-item>
    <n-descriptions-item label="Age"> 28 </n-descriptions-item>
    <n-descriptions-item label="Email"> john@example.com </n-descriptions-item>
    <n-descriptions-item label="Address">
      123 Main Street, New York, NY 10001
    </n-descriptions-item>
  </n-descriptions>
</template>
```

## Common Patterns

### User Profile Card

```vue
<template>
  <n-card title="User Profile">
    <n-descriptions label-placement="left" :column="2">
      <n-descriptions-item label="Username"> johndoe </n-descriptions-item>
      <n-descriptions-item label="Full Name"> John Doe </n-descriptions-item>
      <n-descriptions-item label="Email">
        john@example.com
      </n-descriptions-item>
      <n-descriptions-item label="Phone"> +1 234 567 890 </n-descriptions-item>
      <n-descriptions-item label="Role">
        <n-tag type="info">Admin</n-tag>
      </n-descriptions-item>
      <n-descriptions-item label="Status">
        <n-tag type="success">Active</n-tag>
      </n-descriptions-item>
      <n-descriptions-item label="Bio" :span="2">
        Software developer passionate about Vue.js and open source.
      </n-descriptions-item>
    </n-descriptions>
  </n-card>
</template>
```

### Product Details

```vue
<template>
  <n-descriptions bordered label-placement="left" title="Product Details">
    <n-descriptions-item label="Product Name">
      MacBook Pro 14"
    </n-descriptions-item>
    <n-descriptions-item label="SKU"> MBP-14-2023 </n-descriptions-item>
    <n-descriptions-item label="Price"> $1,999.00 </n-descriptions-item>
    <n-descriptions-item label="Stock">
      <n-tag :type="stock > 10 ? 'success' : 'warning'">
        {{ stock }} units
      </n-tag>
    </n-descriptions-item>
    <n-descriptions-item label="Category">
      Electronics / Computers
    </n-descriptions-item>
    <n-descriptions-item label="Brand"> Apple </n-descriptions-item>
    <n-descriptions-item label="Description" :span="2">
      The most powerful MacBook Pro ever. Features M3 Pro or M3 Max chip.
    </n-descriptions-item>
  </n-descriptions>
</template>

<script setup>
const stock = 25;
</script>
```

### Custom Header

```vue
<template>
  <n-descriptions label-placement="left">
    <template #header>
      <n-space justify="space-between" align="center">
        <span style="font-weight: bold; font-size: 16px;">Order Details</span>
        <n-button size="small">Edit</n-button>
      </n-space>
    </template>
    <n-descriptions-item label="Order ID"> #12345 </n-descriptions-item>
    <n-descriptions-item label="Status">
      <n-tag type="warning">Processing</n-tag>
    </n-descriptions-item>
    <n-descriptions-item label="Total"> $299.00 </n-descriptions-item>
  </n-descriptions>
</template>
```

### Custom Label Slot

```vue
<template>
  <n-descriptions label-placement="left">
    <n-descriptions-item>
      <template #label>
        <n-space align="center">
          <n-icon><UserIcon /></n-icon>
          <span>Username</span>
        </n-space>
      </template>
      johndoe
    </n-descriptions-item>
    <n-descriptions-item>
      <template #label>
        <n-space align="center">
          <n-icon><EmailIcon /></n-icon>
          <span>Email</span>
        </n-space>
      </template>
      john@example.com
    </n-descriptions-item>
  </n-descriptions>
</template>
```

### Responsive Columns

```vue
<template>
  <n-descriptions label-placement="top" :column="responsiveColumn" bordered>
    <n-descriptions-item label="Field 1">Value 1</n-descriptions-item>
    <n-descriptions-item label="Field 2">Value 2</n-descriptions-item>
    <n-descriptions-item label="Field 3">Value 3</n-descriptions-item>
    <n-descriptions-item label="Field 4">Value 4</n-descriptions-item>
  </n-descriptions>
</template>

<script setup>
import { computed } from 'vue';

const responsiveColumn = computed(() => {
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1024) return 2;
  return 4;
});
</script>
```

## Best Practices

1. **Use bordered for dense data**: Apply `bordered` when displaying many fields

   ```vue
   <n-descriptions bordered>
     <!-- many items -->
   </n-descriptions>
   ```

2. **Label placement choice**: Use `left` for compact layouts, `top` for wider content

   ```vue
   <n-descriptions label-placement="left">
     <!-- compact -->
   </n-descriptions>
   ```

3. **Span for full-width items**: Use `span` for items that need more space

   ```vue
   <n-descriptions-item :span="2" label="Description">
     Long content here...
   </n-descriptions-item>
   ```

4. **Consistent sizing**: Use the `size` prop for consistent spacing

   ```vue
   <n-descriptions size="small">
     <!-- compact items -->
   </n-descriptions>
   ```

5. **Custom separator**: Change the separator when needed

   ```vue
   <n-descriptions label-placement="left" separator="-">
     <!-- items -->
   </n-descriptions>
   ```

6. **Style labels and content separately**: Use `label-style` and `content-style`
   ```vue
   <n-descriptions
     label-style="{ fontWeight: 'bold' }"
     content-style="{ color: '#666' }"
   >
     <!-- items -->
   </n-descriptions>
   ```
