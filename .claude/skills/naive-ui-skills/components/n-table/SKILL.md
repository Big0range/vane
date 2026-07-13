---
name: n-table
description: A basic table component for rendering simple HTML tables with styling options including borders, stripes, and size variations.
author: jiaiyan
version: 1.0.0
---

# n-table Component

The `n-table` component is Naive UI's basic table solution for rendering simple HTML tables. For structured data with sorting, filtering, and pagination, use `n-data-table` instead.

## When to Use

Use `n-table` when you need to:

- Render basic static tables
- Display simple tabular data without complex interactions
- Create styled HTML tables with minimal configuration
- Build custom table layouts with full control over content

## Basic Usage

### Simple Table

```vue
<template>
  <n-table :bordered="false" :single-line="false">
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Address</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Brown</td>
        <td>32</td>
        <td>New York No. 1 Lake Park</td>
      </tr>
      <tr>
        <td>Jim Green</td>
        <td>42</td>
        <td>London No. 1 Lake Park</td>
      </tr>
    </tbody>
  </n-table>
</template>
```

### Bordered Table

```vue
<template>
  <n-table :single-line="false">
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Address</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Brown</td>
        <td>32</td>
        <td>New York No. 1 Lake Park</td>
      </tr>
    </tbody>
  </n-table>
</template>
```

### Striped Table

```vue
<template>
  <n-table striped>
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Address</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Brown</td>
        <td>32</td>
        <td>New York No. 1 Lake Park</td>
      </tr>
      <tr>
        <td>Jim Green</td>
        <td>42</td>
        <td>London No. 1 Lake Park</td>
      </tr>
      <tr>
        <td>Joe Black</td>
        <td>38</td>
        <td>Sidney No. 1 Lake Park</td>
      </tr>
    </tbody>
  </n-table>
</template>
```

### Different Sizes

```vue
<template>
  <n-space vertical>
    <n-table :bordered="false" :single-line="false" size="small">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Small</td>
          <td>Size</td>
        </tr>
      </tbody>
    </n-table>

    <n-table :bordered="false" :single-line="false" size="large">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Large</td>
          <td>Size</td>
        </tr>
      </tbody>
    </n-table>
  </n-space>
</template>
```

### Single Column (No Row Borders)

```vue
<template>
  <n-table single-column :single-line="false">
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Address</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Brown</td>
        <td>32</td>
        <td>New York No. 1 Lake Park</td>
      </tr>
    </tbody>
  </n-table>
</template>
```

## API Reference

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `bordered` | `boolean` | `true` | Whether to show table border |
| `bottom-bordered` | `boolean` | `true` | The bottom border of the table (invalid when `bordered` is `true`) |
| `single-column` | `boolean` | `false` | Whether rows are not divided (no `border-bottom` on cells) |
| `single-line` | `boolean` | `true` | Whether columns are not divided (no `border-right` on cells) |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Table size |
| `striped` | `boolean` | `false` | Whether to show zebra stripes on rows |

### Sub-components

You can use `n-table`, `n-thead`, `n-tbody`, `n-tr`, `n-th` and `n-td`. These sub-components can be used to reduce the granularity of dependency collecting.

## Common Patterns

### Table with Custom Styling

```vue
<template>
  <n-table striped :bordered="false">
    <thead>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Stock</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.stock }}</td>
      </tr>
    </tbody>
  </n-table>
</template>

<script setup>
import { ref } from 'vue';

const products = ref([
  { id: 1, name: 'Apple', price: '$1.00', stock: 100 },
  { id: 2, name: 'Banana', price: '$0.50', stock: 200 },
  { id: 3, name: 'Orange', price: '$0.75', stock: 150 },
]);
</script>
```

### Nested Table

```vue
<template>
  <n-table>
    <thead>
      <tr>
        <th>Category</th>
        <th>Items</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Fruits</td>
        <td>
          <n-table size="small">
            <tbody>
              <tr>
                <td>Apple</td>
              </tr>
              <tr>
                <td>Banana</td>
              </tr>
            </tbody>
          </n-table>
        </td>
      </tr>
    </tbody>
  </n-table>
</template>
```

## Best Practices

### 1. Use n-data-table for Complex Data

For structured data with sorting, filtering, or pagination, use `n-data-table` instead:

```vue
<n-data-table :columns="columns" :data="data" />
```

### 2. Combine with Other Components

Use `n-table` with `n-card` for better presentation:

```vue
<n-card title="User List">
  <n-table striped>
    <!-- table content -->
  </n-table>
</n-card>
```

### 3. Use Appropriate Border Styles

- Use `bordered` for clear cell separation
- Use `single-line` for cleaner look without column borders
- Use `single-column` for compact row display

### 4. Responsive Tables

Wrap tables in scrollable containers for mobile compatibility:

```vue
<div style="overflow-x: auto;">
  <n-table>
    <!-- wide table content -->
  </n-table>
</div>
```
