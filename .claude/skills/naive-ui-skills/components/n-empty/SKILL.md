---
name: 'n-empty'
description: 'Empty component for displaying empty states. Invoke when user needs to show empty data states, no results, or placeholder content in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Empty Component

Empty component for displaying empty states with customizable icons and descriptions.

## When to Use

Use this component when:

- **Empty data states**: Display when lists, tables, or data sets are empty
- **No search results**: Show when search returns no matches
- **Placeholder content**: Display placeholder for unavailable content
- **Error states**: Show when content failed to load

## When to Invoke

Invoke this skill when:

- User needs to display an empty state
- User wants to customize the empty state icon
- User needs different sizes of empty states
- User wants to add action buttons to empty states
- User asks about handling empty data displays

## Features

- **Customizable Description**: Set custom text for empty state
- **Custom Icon**: Replace the default icon
- **Size Options**: tiny, small, medium, large, and huge sizes
- **Extra Content**: Add action buttons or additional content
- **Show/Hide Controls**: Toggle description and icon visibility

## API Reference

### Empty Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| description | `string` | `'No Data'` | Description of the empty. |
| show-description | `boolean` | `true` | Whether to show description of empty. |
| show-icon | `boolean` | `true` | Whether to show icon of empty. |
| size | `'tiny' \| 'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` | Empty's size. |

### Empty Slots

| Name    | Parameters | Description                   |
| ------- | ---------- | ----------------------------- |
| default | `()`       | In place of description prop. |
| extra   | `()`       | Extra content.                |
| icon    | `()`       | Custom icon.                  |

## Basic Usage

### Basic Empty

```vue
<template>
  <n-empty description="You can't find anything">
    <template #extra>
      <n-button size="small"> Find Something New </n-button>
    </template>
  </n-empty>
</template>
```

### Custom Icon

```vue
<template>
  <n-empty description="Custom your icon">
    <template #icon>
      <n-icon>
        <IosAirplane />
      </n-icon>
    </template>
  </n-empty>
</template>

<script setup>
import { IosAirplane } from '@vicons/ionicons4';
</script>
```

### Different Sizes

```vue
<template>
  <n-space vertical>
    <n-empty size="tiny" description="Tiny size" />
    <n-empty size="small" description="Small size" />
    <n-empty size="medium" description="Medium size" />
    <n-empty size="large" description="Large size" />
    <n-empty size="huge" description="Huge size" />
  </n-space>
</template>
```

## Common Patterns

### Empty List State

```vue
<template>
  <div class="list-container">
    <div v-if="items.length > 0">
      <div v-for="item in items" :key="item.id">
        {{ item.name }}
      </div>
    </div>
    <n-empty v-else description="No items found">
      <template #extra>
        <n-button type="primary" size="small" @click="handleAdd">
          Add Item
        </n-button>
      </template>
    </n-empty>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([]);

const handleAdd = () => {
  items.value.push({ id: 1, name: 'New Item' });
};
</script>
```

### Empty Search Results

```vue
<template>
  <div>
    <n-input v-model:value="searchQuery" placeholder="Search..." />
    <div v-if="filteredResults.length > 0">
      <!-- Display results -->
    </div>
    <n-empty v-else description="No results found">
      <template #icon>
        <n-icon><SearchIcon /></n-icon>
      </template>
      <template #extra>
        <n-button size="small" @click="clearSearch"> Clear Search </n-button>
      </template>
    </n-empty>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Search as SearchIcon } from '@vicons/ionicons5';

const searchQuery = ref('');
const items = ref([]);
const filteredResults = computed(() => {
  if (!searchQuery.value) return items.value;
  return items.value.filter(item =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

const clearSearch = () => {
  searchQuery.value = '';
};
</script>
```

### Empty Table State

```vue
<template>
  <n-data-table :columns="columns" :data="tableData" :empty="emptyRender" />
</template>

<script setup>
import { h } from 'vue';

const columns = [];
const tableData = [];

const emptyRender = () => {
  return h('div', { class: 'empty-table' }, [
    h(
      NEmpty,
      {
        description: 'No data available',
        size: 'small',
      },
      {
        extra: () =>
          h(
            NButton,
            {
              size: 'small',
              onClick: () => console.log('Refresh'),
            },
            () => 'Refresh',
          ),
      },
    ),
  ]);
};
</script>
```

### Error State

```vue
<template>
  <n-empty v-if="error" description="Failed to load data">
    <template #icon>
      <n-icon color="#d03050">
        <ErrorIcon />
      </n-icon>
    </template>
    <template #extra>
      <n-button type="primary" size="small" @click="retry"> Retry </n-button>
    </template>
  </n-empty>
</template>

<script setup>
import { ref } from 'vue';
import { Warning as ErrorIcon } from '@vicons/ionicons5';

const error = ref(true);

const retry = () => {
  error.value = false;
};
</script>
```

### Custom Empty with Illustration

```vue
<template>
  <n-empty>
    <template #icon>
      <img src="/empty-illustration.svg" alt="Empty" style="width: 200px;" />
    </template>
    <template #default>
      <div style="text-align: center;">
        <h3>No projects yet</h3>
        <p style="color: #999;">Create your first project to get started</p>
      </div>
    </template>
    <template #extra>
      <n-button type="primary">
        <template #icon>
          <n-icon><AddIcon /></n-icon>
        </template>
        Create Project
      </n-button>
    </template>
  </n-empty>
</template>

<script setup>
import { Add as AddIcon } from '@vicons/ionicons5';
</script>
```

### Empty in Card

```vue
<template>
  <n-card title="Recent Activity">
    <n-empty size="small" description="No recent activity">
      <template #extra>
        <n-button text type="primary" size="small"> View All </n-button>
      </template>
    </n-empty>
  </n-card>
</template>
```

### Conditional Icon and Description

```vue
<template>
  <n-empty
    :show-icon="showIcon"
    :show-description="showDescription"
    description="Customizable empty state"
  >
    <template #extra>
      <n-space>
        <n-switch v-model:value="showIcon">Icon</n-switch>
        <n-switch v-model:value="showDescription">Description</n-switch>
      </n-space>
    </template>
  </n-empty>
</template>

<script setup>
import { ref } from 'vue';

const showIcon = ref(true);
const showDescription = ref(true);
</script>
```

## Best Practices

1. **Provide actionable feedback**: Add action buttons in the extra slot

   ```vue
   <n-empty description="No items">
     <template #extra>
       <n-button @click="handleAdd">Add Item</n-button>
     </template>
   </n-empty>
   ```

2. **Use appropriate size**: Match the empty state size to the context

   ```vue
   <n-empty size="small" description="No data" />
   ```

3. **Contextual icons**: Use icons that match the empty state context

   ```vue
   <n-empty description="No search results">
     <template #icon>
       <n-icon><SearchIcon /></n-icon>
     </template>
   </n-empty>
   ```

4. **Clear description**: Write clear, helpful descriptions

   ```vue
   <n-empty description="No messages in your inbox" />
   ```

5. **Hide elements when needed**: Use `show-icon` and `show-description` for flexibility

   ```vue
   <n-empty :show-icon="false" description="Simple text only" />
   ```

6. **Use in containers**: Place empty states in cards or containers for better layout
   ```vue
   <n-card>
     <n-empty description="No content" />
   </n-card>
   ```
