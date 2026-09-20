---
name: 'n-infinite-scroll'
description: 'Infinite scroll component for loading content on scroll. Invoke when user needs to implement infinite scrolling lists or lazy loading content in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Infinite Scroll Component

Infinite scroll component for implementing endless scrolling lists with automatic content loading.

## When to Use

Use this component when:

- **Infinite lists**: Load more content as user scrolls
- **Lazy loading**: Implement progressive content loading
- **Chat interfaces**: Display message history with auto-loading
- **Feed layouts**: Social media style content feeds

## When to Invoke

Invoke this skill when:

- User needs to implement infinite scrolling
- User wants to load content progressively on scroll
- User needs to detect when user reaches bottom of container
- User asks about implementing lazy loading lists

## Features

- **Auto Loading**: Automatically triggers load when near bottom
- **Custom Distance**: Configurable distance threshold for loading
- **Scrollbar Integration**: Works with Naive UI Scrollbar
- **Loading States**: Support for loading indicators
- **End Detection**: Handle end of data gracefully

## API Reference

### Infinite Scroll Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| distance | `number` | `0` | Distance threshold that triggers loading. |
| scrollbar-props | `Object` | `undefined` | Props for the internal Scrollbar component. |

### Infinite Scroll Events

| Name | Type | Description |
| --- | --- | --- |
| on-load | `() => Promise<void> \| void` | Callback when scrolling near bottom. |

## Basic Usage

### Basic Infinite Scroll

```vue
<template>
  <n-infinite-scroll style="height: 240px" :distance="10" @load="handleLoad">
    <div v-for="i in count" :key="i" class="item">
      {{ i }}
    </div>
  </n-infinite-scroll>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(10);

const handleLoad = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  count.value += 10;
};
</script>

<style scoped>
.item {
  display: flex;
  align-items: center;
  height: 46px;
  justify-content: center;
  margin-bottom: 10px;
  background-color: rgba(0, 128, 0, 0.16);
}
</style>
```

### With Loading and End States

```vue
<template>
  <n-infinite-scroll style="height: 240px" :distance="10" @load="handleLoad">
    <div v-for="(item, index) in items" :key="item.key" class="message">
      {{ item.content }}
    </div>
    <div v-if="loading" class="text">Loading...</div>
    <div v-if="noMore" class="text">No More Data</div>
  </n-infinite-scroll>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([]);
const loading = ref(false);
const noMore = ref(false);
let page = 1;

const handleLoad = async () => {
  if (loading.value || noMore.value) return;

  loading.value = true;
  const newItems = await fetchData(page);

  if (newItems.length === 0) {
    noMore.value = true;
  } else {
    items.value.push(...newItems);
    page++;
  }

  loading.value = false;
};
</script>
```

## Common Patterns

### Chat Messages

```vue
<template>
  <n-infinite-scroll style="height: 400px" :distance="10" @load="loadMessages">
    <div
      v-for="(message, index) in messages"
      :key="message.id"
      class="message"
      :class="{ reverse: message.isMine }"
    >
      <img class="avatar" :src="message.avatar" alt="" />
      <span>{{ message.content }}</span>
    </div>
    <div v-if="loading" class="text">Loading messages...</div>
    <div v-if="noMoreMessages" class="text">No more messages</div>
  </n-infinite-scroll>
</template>

<script setup>
import { ref } from 'vue';

const messages = ref([]);
const loading = ref(false);
const noMoreMessages = ref(false);

const loadMessages = async () => {
  if (loading.value || noMoreMessages.value) return;

  loading.value = true;
  const olderMessages = await fetchOlderMessages();

  if (olderMessages.length === 0) {
    noMoreMessages.value = true;
  } else {
    messages.value = [...olderMessages, ...messages.value];
  }

  loading.value = false;
};
</script>

<style scoped>
.message {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
}

.reverse {
  flex-direction: row-reverse;
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin: 0 10px;
}

.text {
  text-align: center;
  padding: 10px;
}
</style>
```

### With Custom Scrollbar

```vue
<template>
  <n-infinite-scroll
    style="height: 300px"
    :distance="20"
    :scrollbar-props="{ trigger: 'hover', size: 8 }"
    @load="handleLoad"
  >
    <n-list bordered>
      <n-list-item v-for="item in items" :key="item.id">
        {{ item.title }}
      </n-list-item>
    </n-list>
  </n-infinite-scroll>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([]);

const handleLoad = async () => {
  const newItems = await fetchMoreItems();
  items.value.push(...newItems);
};
</script>
```

### Feed with Cards

```vue
<template>
  <n-infinite-scroll style="height: 600px" :distance="50" @load="loadMore">
    <n-space vertical :size="16">
      <n-card v-for="post in posts" :key="post.id" :title="post.title">
        {{ post.content }}
      </n-card>
    </n-space>
    <template v-if="loading">
      <n-spin size="medium" />
    </template>
  </n-infinite-scroll>
</template>

<script setup>
import { ref } from 'vue';

const posts = ref([]);
const loading = ref(false);
let page = 1;

const loadMore = async () => {
  loading.value = true;
  const newPosts = await fetchPosts(page);
  posts.value.push(...newPosts);
  page++;
  loading.value = false;
};
</script>
```

### Data Table with Infinite Scroll

```vue
<template>
  <n-infinite-scroll style="height: 400px" @load="loadMoreRows">
    <n-data-table :columns="columns" :data="tableData" />
  </n-infinite-scroll>
</template>

<script setup>
import { ref } from 'vue';

const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Age', key: 'age' },
  { title: 'Address', key: 'address' },
];

const tableData = ref([]);

const loadMoreRows = async () => {
  const newRows = await fetchMoreData();
  tableData.value.push(...newRows);
};
</script>
```

## Best Practices

1. **Set explicit height**: Always set a fixed height on the scroll container

   ```vue
   <n-infinite-scroll style="height: 400px" @load="handleLoad">
   ```

2. **Handle loading state**: Prevent multiple simultaneous load calls

   ```javascript
   const handleLoad = async () => {
     if (loading.value) return;
     loading.value = true;
     // ... load data
     loading.value = false;
   };
   ```

3. **Implement end detection**: Show users when all data is loaded

   ```vue
   <div v-if="noMore">No more data</div>
   ```

4. **Use appropriate distance**: Adjust distance based on item size

   ```vue
   <n-infinite-scroll :distance="50" />
   <!-- Larger items -->
   <n-infinite-scroll :distance="10" />
   <!-- Smaller items -->
   ```

5. **Add loading indicators**: Provide visual feedback during loading

   ```vue
   <n-spin v-if="loading" />
   ```

6. **Handle errors gracefully**: Implement error handling for failed loads
   ```javascript
   const handleLoad = async () => {
     try {
       const data = await fetchData();
       items.value.push(...data);
     } catch (error) {
       message.error('Failed to load data');
     }
   };
   ```
