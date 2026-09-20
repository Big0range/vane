---
name: n-data-table
description: A powerful data table component for displaying structured tabular data with features like sorting, filtering, pagination, selection, tree data, virtual scrolling, and more.
author: jiaiyan
version: 1.0.0
---

# n-data-table Component

The `n-data-table` component is Naive UI's comprehensive solution for displaying structured tabular data. It provides extensive features for data grids, tables, and tabular data display.

## When to Use

Use `n-data-table` when you need to:

- Display structured data in rows and columns
- Create data grids with sorting, filtering, and pagination
- Show tabular data with selection capabilities
- Render tree-structured hierarchical data
- Handle large datasets with virtual scrolling
- Build editable data tables
- Export data to CSV format

## Basic Usage

### Simple Data Table

```vue
<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :bordered="false"
  />
</template>

<script setup>
import { ref } from 'vue';

const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Age', key: 'age' },
  { title: 'Address', key: 'address' },
];

const data = ref([
  { name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { name: 'Joe Black', age: 38, address: 'Sidney No. 1 Lake Park' },
]);

const pagination = ref({
  pageSize: 10,
});
</script>
```

### Data Table with Selection

```vue
<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :row-key="rowKey"
    @update:checked-row-keys="handleCheck"
  />
</template>

<script setup>
import { ref } from 'vue';

const rowKey = row => row.id;

const columns = [
  { type: 'selection' },
  { title: 'Name', key: 'name' },
  { title: 'Age', key: 'age' },
];

const data = ref([
  { id: 1, name: 'John Brown', age: 32 },
  { id: 2, name: 'Jim Green', age: 42 },
]);

const handleCheck = keys => {
  console.log('Selected rows:', keys);
};
</script>
```

### Async Data Table

```vue
<template>
  <n-data-table
    remote
    :columns="columns"
    :data="data"
    :loading="loading"
    :pagination="pagination"
    @update:page="handlePageChange"
    @update:sorter="handleSorterChange"
    @update:filters="handleFiltersChange"
  />
</template>

<script setup>
import { ref, reactive } from 'vue';

const loading = ref(false);
const data = ref([]);

const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0,
});

const handlePageChange = async page => {
  loading.value = true;
  pagination.page = page;
  await fetchData();
  loading.value = false;
};

const fetchData = async () => {
  // Fetch data from server
};
</script>
```

## API Reference

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `allow-checking-not-loaded` | `boolean` | `false` | Whether to allow cascade checking on not loaded nodes in tree data |
| `bordered` | `boolean` | `true` | Whether to show border |
| `bottom-bordered` | `boolean` | `true` | Whether to show bottom border |
| `cascade` | `boolean` | `true` | Whether to do cascade checking when using tree data |
| `checked-row-keys` | `Array<string \| number>` | `undefined` | The keys of checked rows (controlled) |
| `children-key` | `string` | `'children'` | The key of children data in tree data's data entity |
| `columns` | `Array<DataTableColumn>` | `[]` | Columns to display |
| `data` | `Array<object>` | `[]` | Data to display |
| `default-checked-row-keys` | `Array<string \| number>` | `[]` | Default checked row keys (uncontrolled) |
| `default-expand-all` | `boolean` | `false` | Whether to expand all expandable rows |
| `default-expanded-row-keys` | `Array<string \| number>` | `[]` | Default expanded row keys (uncontrolled) |
| `expanded-row-keys` | `Array<string \| number>` | `undefined` | Expanded row keys (controlled) |
| `filter-icon-popover-props` | `PopoverProps` | `{ trigger: click, placement: bottom }` | Filter icon's Popover attributes |
| `flex-height` | `boolean` | `false` | Whether to make table body height auto fit table area |
| `get-csv-cell` | `(value, row, col) => string` | `undefined` | Custom function to get CSV cell content |
| `get-csv-header` | `(cols) => string` | `undefined` | Custom function to get CSV header content |
| `header-height` | `number` | `28` | Header height when virtual-scroll-header is enabled |
| `height-for-row` | `(rowData, index) => number` | `undefined` | Height configuration function for each row |
| `indent` | `number` | `16` | Indent of row content when using tree data |
| `loading` | `boolean` | `false` | Whether to display loading status |
| `max-height` | `number \| string` | `undefined` | Max height of the table content |
| `min-height` | `number \| string` | `undefined` | Min height of the table content |
| `min-row-height` | `number` | `28` | Min row height when virtual-scroll is enabled |
| `paginate-single-page` | `boolean` | `true` | Whether to show pagination when data is less than one page |
| `pagination` | `false \| object` | `false` | Pagination configuration or false to disable |
| `pagination-behavior-on-filter` | `'first' \| 'current'` | `'current'` | Pagination behavior after filter state changes |
| `remote` | `boolean` | `false` | Whether to use remote data (disables automatic paging) |
| `render-cell` | `(value, rowData, column) => VNodeChild` | `undefined` | Custom render function for all cells |
| `render-expand-icon` | `({ expanded, rowData }) => VNodeChild` | `undefined` | Custom render function for expand icon |
| `row-class-name` | `string \| (rowData, rowIndex) => string` | `undefined` | Class name for each row |
| `row-key` | `(rowData) => number \| string` | `undefined` | Function to generate unique row key |
| `row-props` | `(rowData, rowIndex) => HTMLAttributes` | `undefined` | Customize row HTML attributes |
| `scroll-x` | `number \| string` | `undefined` | Horizontal scroll width (required for fixed columns) |
| `scrollbar-props` | `ScrollbarProps` | `undefined` | Scrollbar component props |
| `single-column` | `boolean` | `false` | Whether rows are not divided (no border-bottom) |
| `single-line` | `boolean` | `true` | Whether columns are not divided (no border-right) |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Table size |
| `spin-props` | `object` | `undefined` | Loading spin props |
| `sticky-expanded-rows` | `boolean` | `false` | Whether expanded row content remains sticky |
| `striped` | `boolean` | `false` | Whether to show zebra stripes on rows |
| `summary` | `DataTableCreateSummary` | `undefined` | Summary row data configuration |
| `summary-placement` | `'top' \| 'bottom'` | `'bottom'` | Summary rows placement |
| `table-layout` | `'auto' \| 'fixed'` | `'auto'` | CSS table-layout property |
| `virtual-scroll` | `boolean` | `false` | Whether to use virtual scrolling for large data |
| `virtual-scroll-header` | `boolean` | `false` | Whether to use virtual scrolling in header |
| `virtual-scroll-x` | `boolean` | `false` | Whether to use horizontal virtual scrolling |

### Column Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `'left' \| 'right' \| 'center'` | `'left'` | Text alignment in column |
| `allowExport` | `boolean` | `true` | Whether the column can be exported |
| `cellProps` | `(rowData, rowIndex) => object` | `undefined` | HTML attributes for the cell |
| `children` | `DataTableColumn[]` | `undefined` | Child columns for grouped header |
| `className` | `string` | `undefined` | Class name for the column |
| `colSpan` | `(rowData, rowIndex) => number` | `undefined` | Column span of the cell |
| `customNextSortOrder` | `(order) => order` | `undefined` | Custom next sorting status function |
| `defaultFilterOptionValue` | `string \| number \| null` | `null` | Default filter value (uncontrolled, single) |
| `defaultFilterOptionValues` | `Array<string \| number>` | `[]` | Default filter values (uncontrolled, multiple) |
| `defaultSortOrder` | `'descend' \| 'ascend' \| false` | `false` | Default sort order (uncontrolled) |
| `disabled` | `(rowData) => boolean` | `() => false` | Whether the row is checkable |
| `ellipsis` | `boolean \| EllipsisProps` | `false` | Ellipsis options for overflow content |
| `ellipsis-component` | `'ellipsis' \| 'performant-ellipsis'` | `'ellipsis'` | Component for rendering text ellipsis |
| `expandable` | `(rowData) => boolean` | `undefined` | Whether the row is expandable |
| `filter` | `boolean \| function` | `false` | Filter function or true for async filter |
| `filterMode` | `'and' \| 'or'` | `'or'` | Filter mode for multiple values |
| `filterMultiple` | `boolean` | `true` | Whether multiple filter values allowed |
| `filterOptionValue` | `string \| number \| null` | `undefined` | Active filter value (controlled, single) |
| `filterOptionValues` | `Array<string \| number> \| null` | `undefined` | Active filter values (controlled, multiple) |
| `filterOptions` | `Array<{ label, value }>` | `undefined` | Filter options |
| `fixed` | `'left' \| 'right' \| false` | `false` | Whether the column is fixed |
| `key` | `string \| number` | `undefined` | Unique key of the column |
| `maxWidth` | `number \| string` | `undefined` | Max width (when resizable is true) |
| `minWidth` | `number \| string` | `undefined` | Min width of the column |
| `multiple` | `boolean` | `true` | Whether multiple selection mode |
| `options` | `Array` | `undefined` | Custom selection options |
| `render` | `(rowData, rowIndex) => VNodeChild` | `undefined` | Custom cell render function |
| `renderExpand` | `(rowData, rowIndex) => VNodeChild` | `undefined` | Render function for expand area |
| `renderFilter` | `(options) => VNodeChild` | `undefined` | Custom filter trigger render |
| `renderFilterIcon` | `(options) => VNodeChild` | `undefined` | Custom filter icon render |
| `renderFilterMenu` | `(actions) => VNodeChild` | `undefined` | Custom filter menu render |
| `renderSorter` | `(options) => VNodeChild` | `undefined` | Custom sorter trigger render |
| `renderSorterIcon` | `(options) => VNodeChild` | `undefined` | Custom sorter icon render |
| `resizable` | `boolean` | `undefined` | Whether column width is resizable |
| `rowSpan` | `(rowData, rowIndex) => number` | `undefined` | Row span of the cell |
| `sortOrder` | `'descend' \| 'ascend' \| false` | `undefined` | Sort order (controlled) |
| `sorter` | `boolean \| function \| 'default'` | `false` | Sorter function or 'default' for built-in |
| `title` | `string \| (() => VNodeChild)` | `undefined` | Column title |
| `titleAlign` | `'left' \| 'right' \| 'center'` | `null` | Header text alignment |
| `titleColSpan` | `number` | `undefined` | Column span for the title |
| `tree` | `boolean` | `false` | Whether to show tree expand trigger |
| `type` | `'selection' \| 'expand'` | `undefined` | Column type |
| `width` | `number \| string` | `undefined` | Width of the column |

### Events

| Name | Parameters | Description |
| --- | --- | --- |
| `update:checked-row-keys` | `(keys, rows, meta)` | Emitted when checked row keys change |
| `update:expanded-row-keys` | `(keys)` | Emitted when expanded row keys change |
| `update:filters` | `(filters, initiatorColumn)` | Emitted when filters change |
| `update:page` | `(page)` | Emitted when page changes |
| `update:page-size` | `(pageSize)` | Emitted when page size changes |
| `update:sorter` | `(sortState)` | Emitted when sorter changes |

### Slots

| Name      | Parameters | Description                       |
| --------- | ---------- | --------------------------------- |
| `empty`   | -          | Custom content when data is empty |
| `loading` | -          | Custom content when loading       |

### Methods

| Name           | Type                         | Description                 |
| -------------- | ---------------------------- | --------------------------- |
| `clearFilters` | `() => void`                 | Clear all filter state      |
| `clearSorter`  | `() => void`                 | Clear all sort state        |
| `downloadCsv`  | `(options?) => void`         | Download data as CSV file   |
| `filters`      | `(filters) => void`          | Set active filters          |
| `page`         | `(page) => void`             | Manually set the page       |
| `scrollTo`     | `(options) => void`          | Scroll to specific position |
| `sort`         | `(columnKey, order) => void` | Set sort state              |

## Common Patterns

### Pagination

```vue
<template>
  <n-data-table :columns="columns" :data="data" :pagination="pagination" />
</template>

<script setup>
import { ref, reactive } from 'vue';

const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  onChange: page => {
    pagination.page = page;
  },
  onUpdatePageSize: pageSize => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
  },
});
</script>
```

### Sorting

```vue
<template>
  <n-data-table
    :columns="columns"
    :data="data"
    @update:sorter="handleSorterChange"
  />
</template>

<script setup>
const columns = [
  {
    title: 'Name',
    key: 'name',
    sorter: (row1, row2) => row1.name.localeCompare(row2.name),
  },
  {
    title: 'Age',
    key: 'age',
    sorter: (row1, row2) => row1.age - row2.age,
  },
];

const handleSorterChange = sortState => {
  console.log('Sort state:', sortState);
};
</script>
```

### Filtering

```vue
<template>
  <n-data-table
    :columns="columns"
    :data="data"
    @update:filters="handleFiltersChange"
  />
</template>

<script setup>
const columns = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Address',
    key: 'address',
    filterOptions: [
      { label: 'London', value: 'London' },
      { label: 'New York', value: 'New York' },
    ],
    filter: (value, row) => row.address.includes(value),
  },
];

const handleFiltersChange = filters => {
  console.log('Filters:', filters);
};
</script>
```

### Row Selection

```vue
<template>
  <n-data-table
    v-model:checked-row-keys="checkedRowKeys"
    :columns="columns"
    :data="data"
    :row-key="rowKey"
  />
</template>

<script setup>
import { ref } from 'vue';

const checkedRowKeys = ref([]);

const rowKey = row => row.id;

const columns = [
  { type: 'selection' },
  { title: 'Name', key: 'name' },
  { title: 'Age', key: 'age' },
];
</script>
```

### Tree Data

```vue
<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :row-key="rowKey"
    default-expand-all
  />
</template>

<script setup>
const columns = [
  { title: 'Name', key: 'name', tree: true },
  { title: 'Age', key: 'age' },
];

const data = [
  {
    id: 1,
    name: 'Parent',
    age: 40,
    children: [
      { id: 2, name: 'Child 1', age: 20 },
      { id: 3, name: 'Child 2', age: 18 },
    ],
  },
];

const rowKey = row => row.id;
</script>
```

### Virtual Scrolling for Large Data

```vue
<template>
  <n-data-table
    :columns="columns"
    :data="largeData"
    :max-height="400"
    virtual-scroll
  />
</template>

<script setup>
const largeData = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  age: Math.floor(Math.random() * 50) + 18,
}));
</script>
```

### Fixed Columns

```vue
<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :scroll-x="1200"
    :max-height="300"
  />
</template>

<script setup>
const columns = [
  { title: 'ID', key: 'id', fixed: 'left', width: 100 },
  { title: 'Name', key: 'name', width: 200 },
  { title: 'Age', key: 'age', width: 100 },
  { title: 'Address', key: 'address', width: 300 },
  { title: 'Actions', key: 'actions', fixed: 'right', width: 150 },
];
</script>
```

### Expandable Rows

```vue
<template>
  <n-data-table :columns="columns" :data="data" />
</template>

<script setup>
import { h } from 'vue';

const columns = [
  {
    type: 'expand',
    expandable: row => row.children?.length > 0,
    renderExpand: row => {
      return h(
        'div',
        { style: 'padding: 16px;' },
        `Expanded content for ${row.name}`,
      );
    },
  },
  { title: 'Name', key: 'name' },
  { title: 'Age', key: 'age' },
];
</script>
```

### Export CSV

```vue
<template>
  <n-space vertical>
    <n-button @click="exportCsv">Export CSV</n-button>
    <n-data-table ref="tableRef" :columns="columns" :data="data" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const tableRef = ref(null);

const exportCsv = () => {
  tableRef.value?.downloadCsv({ fileName: 'data-export.csv' });
};
</script>
```

## Best Practices

### 1. Always Define Row Keys

Each row should have a unique key for proper rendering and selection:

```vue
<n-data-table :row-key="row => row.id" :columns="columns" :data="data" />
```

### 2. Use Controlled Mode for Async Operations

When fetching data from a server, use controlled mode:

```vue
<n-data-table
  remote
  :loading="loading"
  :data="serverData"
  :pagination="{
    page: currentPage,
    pageSize: pageSize,
    itemCount: totalItems,
  }"
  @update:page="handlePageChange"
/>
```

### 3. Optimize Large Datasets with Virtual Scrolling

For datasets with thousands of rows, enable virtual scrolling:

```vue
<n-data-table :data="largeData" :max-height="400" virtual-scroll />
```

### 4. Set Column Widths for Fixed Columns

When using fixed columns, always set explicit widths:

```javascript
const columns = [
  { title: 'ID', key: 'id', fixed: 'left', width: 80 },
  // ... other columns
];
```

### 5. Use Pagination for Better Performance

Avoid rendering all data at once:

```javascript
const pagination = {
  pageSize: 20,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100],
};
```

### 6. Handle Empty States

Provide meaningful empty state feedback:

```vue
<n-data-table :columns="columns" :data="data">
  <template #empty>
    <n-empty description="No data available" />
  </template>
</n-data-table>
```

### 7. Use Custom Render Functions for Complex Cells

For complex cell content, use render functions:

```javascript
const columns = [
  {
    title: 'Status',
    key: 'status',
    render: row => {
      return h(
        NTag,
        { type: row.status === 'active' ? 'success' : 'warning' },
        () => row.status,
      );
    },
  },
];
```

### 8. Avoid Deep Nesting in Tree Data

Keep tree data structures reasonably shallow for better performance.

### 9. Use `table-layout: fixed` for Consistent Column Widths

When precise column widths are needed:

```vue
<n-data-table :columns="columns" :data="data" table-layout="fixed" />
```

### 10. Clean Up Filters and Sorters

Provide clear actions for users to reset table state:

```vue
<n-space>
  <n-button @click="tableRef?.clearFilters()">Clear Filters</n-button>
  <n-button @click="tableRef?.clearSorter()">Clear Sorter</n-button>
</n-space>
```
