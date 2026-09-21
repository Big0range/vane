---
name: 'n-list'
description: 'List component for displaying structured list items with headers, footers, and dividers. Invoke when user needs to implement list layouts, item lists, or content lists in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI List Component

List component for displaying structured list items with headers, footers, dividers, and interactive states.

## When to Use

Use this component when:

- **Content lists**: Display structured content with consistent layout
- **Item collections**: Show collections of items with similar structure
- **Interactive lists**: Create clickable or hoverable list items
- **Information display**: Display information with prefix and suffix elements

## When to Invoke

Invoke this skill when:

- User needs to display a list of items
- User wants to create interactive list items with hover/click states
- User needs list with header and footer
- User wants to control divider visibility
- User asks about list item with prefix/suffix content

## Features

- **Header & Footer**: Add header and footer sections to the list
- **Bordered Style**: Display list with border
- **Interactive States**: Hoverable and clickable item styles
- **Dividers**: Control visibility of item dividers
- **List Item Slots**: Prefix and suffix slots for flexible content
- **Flexible Content**: Works well with n-thing for rich content

## API Reference

### List Props

| Name         | Type      | Default | Description                       |
| ------------ | --------- | ------- | --------------------------------- |
| bordered     | `boolean` | `false` | Whether to show the border.       |
| clickable    | `boolean` | `false` | Whether item has clickable style. |
| hoverable    | `boolean` | `false` | Whether item has hoverable style. |
| show-divider | `boolean` | `true`  | Whether to show item divider.     |

### List Slots

| Name    | Parameters | Description                           |
| ------- | ---------- | ------------------------------------- |
| default | `()`       | The contents of the list.             |
| footer  | `()`       | Content at the bottom of the list.    |
| header  | `()`       | The contents of the head of the list. |

### ListItem Slots

| Name    | Parameters | Description                         |
| ------- | ---------- | ----------------------------------- |
| default | `()`       | The contents of the list item.      |
| prefix  | `()`       | The first content of the list item. |
| suffix  | `()`       | The end of the list item.           |

## Basic Usage

### Basic List

```vue
<template>
  <n-list>
    <template #header> List Header </template>
    <n-list-item> List Item 1 </n-list-item>
    <n-list-item> List Item 2 </n-list-item>
    <n-list-item> List Item 3 </n-list-item>
    <template #footer> List Footer </template>
  </n-list>
</template>
```

### Hoverable List

```vue
<template>
  <n-list hoverable clickable>
    <n-list-item>
      <n-thing title="Item Title" content-style="margin-top: 10px;">
        <template #description>
          <n-space size="small" style="margin-top: 4px">
            <n-tag :bordered="false" type="info" size="small"> Tag A </n-tag>
            <n-tag :bordered="false" type="info" size="small"> Tag B </n-tag>
          </n-space>
        </template>
        Item content goes here.
      </n-thing>
    </n-list-item>
    <n-list-item>
      <n-thing title="Another Item"> Another item content. </n-thing>
    </n-list-item>
  </n-list>
</template>
```

### Bordered List

```vue
<template>
  <n-list bordered>
    <template #header> Bordered List </template>
    <n-list-item>Item 1</n-list-item>
    <n-list-item>Item 2</n-list-item>
    <n-list-item>Item 3</n-list-item>
    <template #footer> Footer content </template>
  </n-list>
</template>
```

### Without Dividers

```vue
<template>
  <n-list :show-divider="false">
    <n-list-item>Item 1</n-list-item>
    <n-list-item>Item 2</n-list-item>
    <n-list-item>Item 3</n-list-item>
  </n-list>
</template>
```

## Common Patterns

### List with Prefix and Suffix

```vue
<template>
  <n-list bordered>
    <n-list-item>
      <template #prefix>
        <n-avatar round size="small" src="https://example.com/avatar1.jpg" />
      </template>
      <n-thing title="User Name"> User description here </n-thing>
      <template #suffix>
        <n-button size="small">Action</n-button>
      </template>
    </n-list-item>
    <n-list-item>
      <template #prefix>
        <n-avatar round size="small" src="https://example.com/avatar2.jpg" />
      </template>
      <n-thing title="Another User"> Another description </n-thing>
      <template #suffix>
        <n-button size="small">Action</n-button>
      </template>
    </n-list-item>
  </n-list>
</template>
```

### Interactive List with Click Handler

```vue
<template>
  <n-list hoverable clickable>
    <n-list-item
      v-for="item in items"
      :key="item.id"
      @click="handleClick(item)"
    >
      <n-thing :title="item.title">
        {{ item.description }}
      </n-thing>
    </n-list-item>
  </n-list>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([
  { id: 1, title: 'Item 1', description: 'Description 1' },
  { id: 2, title: 'Item 2', description: 'Description 2' },
  { id: 3, title: 'Item 3', description: 'Description 3' },
]);

const handleClick = item => {
  console.log('Clicked:', item);
};
</script>
```

### Notification List

```vue
<template>
  <n-list bordered hoverable>
    <template #header>
      <n-text strong>Notifications</n-text>
    </template>
    <n-list-item v-for="notification in notifications" :key="notification.id">
      <template #prefix>
        <n-badge :dot="!notification.read">
          <n-icon :size="24">
            <NotificationIcon />
          </n-icon>
        </n-badge>
      </template>
      <n-thing :title="notification.title">
        <template #description>
          <n-text depth="3">{{ notification.time }}</n-text>
        </template>
        {{ notification.content }}
      </n-thing>
      <template #suffix>
        <n-button text type="primary" @click="markAsRead(notification)">
          Mark as read
        </n-button>
      </template>
    </n-list-item>
    <template #footer>
      <n-button text block>View All Notifications</n-button>
    </template>
  </n-list>
</template>

<script setup>
import { ref } from 'vue';

const notifications = ref([
  {
    id: 1,
    title: 'New Message',
    content: 'You have a new message',
    time: '2 min ago',
    read: false,
  },
  {
    id: 2,
    title: 'System Update',
    content: 'System will be updated',
    time: '1 hour ago',
    read: true,
  },
]);

const markAsRead = notification => {
  notification.read = true;
};
</script>
```

### Settings List

```vue
<template>
  <n-list bordered>
    <template #header>
      <n-text strong>Settings</n-text>
    </template>
    <n-list-item>
      <template #prefix>
        <n-icon><DarkModeIcon /></n-icon>
      </template>
      <n-thing title="Dark Mode">
        Enable dark mode for better viewing at night
      </n-thing>
      <template #suffix>
        <n-switch v-model:value="settings.darkMode" />
      </template>
    </n-list-item>
    <n-list-item>
      <template #prefix>
        <n-icon><NotificationIcon /></n-icon>
      </template>
      <n-thing title="Notifications">
        Receive notifications for important updates
      </n-thing>
      <template #suffix>
        <n-switch v-model:value="settings.notifications" />
      </template>
    </n-list-item>
  </n-list>
</template>

<script setup>
import { ref } from 'vue';

const settings = ref({
  darkMode: false,
  notifications: true,
});
</script>
```

### Search Results List

```vue
<template>
  <n-list hoverable clickable>
    <template #header>
      <n-text>Search Results ({{ results.length }})</n-text>
    </template>
    <n-list-item v-for="result in results" :key="result.id">
      <template #prefix>
        <n-icon><FileIcon /></n-icon>
      </template>
      <n-thing :title="result.title">
        <template #description>
          <n-ellipsis :line-clamp="2">
            {{ result.excerpt }}
          </n-ellipsis>
        </template>
      </n-thing>
    </n-list-item>
    <template #footer>
      <n-button text block @click="loadMore">Load More</n-button>
    </template>
  </n-list>
</template>

<script setup>
import { ref } from 'vue';

const results = ref([
  { id: 1, title: 'Result 1', excerpt: 'This is an excerpt from result 1...' },
  { id: 2, title: 'Result 2', excerpt: 'This is an excerpt from result 2...' },
]);

const loadMore = () => {
  console.log('Loading more results...');
};
</script>
```

## Best Practices

1. **Use hoverable for interactive lists**: Add visual feedback for clickable items

   ```vue
   <n-list hoverable clickable>
     <n-list-item @click="handleClick">Content</n-list-item>
   </n-list>
   ```

2. **Combine with n-thing for rich content**: Use n-thing for structured item content

   ```vue
   <n-list-item>
     <n-thing title="Title" description="Description">
       Content
     </n-thing>
   </n-list-item>
   ```

3. **Use bordered for standalone lists**: Add border when list is a distinct section

   ```vue
   <n-list bordered>
     <template #header>Header</template>
     <n-list-item>Item</n-list-item>
   </n-list>
   ```

4. **Use prefix/suffix for actions**: Place icons and action buttons in prefix/suffix slots

   ```vue
   <n-list-item>
     <template #prefix><n-icon><UserIcon /></n-icon></template>
     Content
     <template #suffix><n-button size="small">Edit</n-button></template>
   </n-list-item>
   ```

5. **Hide dividers for compact lists**: Remove dividers for denser content

   ```vue
   <n-list :show-divider="false">
     <n-list-item>Compact item</n-list-item>
   </n-list>
   ```

6. **Add header/footer for context**: Provide context with header and footer
   ```vue
   <n-list>
     <template #header>List Title</template>
     <n-list-item>Item</n-list-item>
     <template #footer>
       <n-button text block>View All</n-button>
     </template>
   </n-list>
   ```
