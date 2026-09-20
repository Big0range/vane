---
name: 'n-page-header'
description: 'Page header component for page titles with navigation and content slots. Invoke when user needs page headers, breadcrumb navigation, or page title sections in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Page Header Component

Page header component with title, subtitle, navigation, and content slots.

## When to Use

Use this component when:

- **Page titles**: Display page title with subtitle and navigation
- **Back navigation**: Provide back button for nested pages
- **Page statistics**: Show related statistics in header
- **Page actions**: Add action buttons in header area

## When to Invoke

Invoke this skill when:

- User needs a page header with title
- User wants back navigation functionality
- User needs to display page-level statistics
- User wants to organize page header content

## Features

- **Back Navigation**: Built-in back button with callback
- **Flexible Slots**: Multiple slots for customization
- **Subtitle Support**: Display subtitle text or slot
- **Extra Content**: Add extra content via prop or slot
- **Footer Content**: Add footer content for additional info

## API Reference

### PageHeader Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| extra | `string` | `undefined` | Extra text information (overwritten by extra slot). |
| subtitle | `string` | `undefined` | Subtitle text. |
| title | `string` | `undefined` | Title text. |
| on-back | `() => void` | `undefined` | Callback when back button is pressed. |

### PageHeader Slots

| Name     | Parameters | Description             |
| -------- | ---------- | ----------------------- |
| avatar   | `()`       | Avatar/image slot.      |
| header   | `()`       | Header content slot.    |
| default  | `()`       | Main content area.      |
| extra    | `()`       | Extra information slot. |
| footer   | `()`       | Footer content slot.    |
| subtitle | `()`       | Subtitle content slot.  |
| title    | `()`       | Title content slot.     |
| back     | `()`       | Custom back icon slot.  |

## Basic Usage

### Basic Page Header

```vue
<template>
  <n-page-header title="Page Title" subtitle="Page description">
    <template #extra>
      <n-button type="primary">Action</n-button>
    </template>
  </n-page-header>
</template>
```

### With Back Navigation

```vue
<template>
  <n-page-header
    title="Detail Page"
    subtitle="View item details"
    @back="handleBack"
  >
    Content goes here
  </n-page-header>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleBack = () => {
  router.back();
};
</script>
```

### With Statistics

```vue
<template>
  <n-page-header subtitle="A podcast to improve designs" @back="handleBack">
    <n-grid :cols="5">
      <n-gi>
        <n-statistic label="Episodes" value="125" />
      </n-gi>
      <n-gi>
        <n-statistic label="Guests" value="22" />
      </n-gi>
      <n-gi>
        <n-statistic label="Apologies" value="36" />
      </n-gi>
      <n-gi>
        <n-statistic label="Topics" value="83" />
      </n-gi>
      <n-gi>
        <n-statistic label="Reference Links" value="2,346" />
      </n-gi>
    </n-grid>
    <template #title>
      <a
        href="https://anyway.fm/"
        style="text-decoration: none; color: inherit"
      >
        Anyway.FM
      </a>
    </template>
  </n-page-header>
</template>
```

## Common Patterns

### With Avatar

```vue
<template>
  <n-page-header title="User Profile" subtitle="View and edit profile">
    <template #avatar>
      <n-avatar :src="userAvatar" />
    </template>
    <template #extra>
      <n-button type="primary">Edit Profile</n-button>
    </template>
  </n-page-header>
</template>
```

### With Breadcrumb

```vue
<template>
  <n-page-header title="Product Details" @back="handleBack">
    <template #header>
      <n-breadcrumb>
        <n-breadcrumb-item>Home</n-breadcrumb-item>
        <n-breadcrumb-item>Products</n-breadcrumb-item>
        <n-breadcrumb-item>Details</n-breadcrumb-item>
      </n-breadcrumb>
    </template>
  </n-page-header>
</template>
```

### With Actions

```vue
<template>
  <n-page-header title="Document" subtitle="Edit document">
    <template #extra>
      <n-space>
        <n-button>Save Draft</n-button>
        <n-button type="primary">Publish</n-button>
      </n-space>
    </template>
    <template #footer>
      <n-space>
        <n-tag type="info">Draft</n-tag>
        <n-text depth="3">Last edited: 2 hours ago</n-text>
      </n-space>
    </template>
  </n-page-header>
</template>
```

### Custom Back Icon

```vue
<template>
  <n-page-header title="Settings" @back="handleBack">
    <template #back>
      <n-icon :size="20">
        <ArrowLeftIcon />
      </n-icon>
    </template>
  </n-page-header>
</template>
```

### With Tabs

```vue
<template>
  <n-page-header title="User Management" @back="handleBack">
    <template #footer>
      <n-tabs v-model:value="activeTab">
        <n-tab-pane name="list" tab="User List" />
        <n-tab-pane name="roles" tab="Roles" />
        <n-tab-pane name="permissions" tab="Permissions" />
      </n-tabs>
    </template>
  </n-page-header>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('list');
</script>
```

### Form Page Header

```vue
<template>
  <n-page-header
    title="Create New Order"
    subtitle="Fill in the order details"
    @back="handleBack"
  >
    <template #extra>
      <n-space>
        <n-button @click="handleCancel">Cancel</n-button>
        <n-button type="primary" @click="handleSubmit">Submit</n-button>
      </n-space>
    </template>
    <n-form ref="formRef" :model="formData">
      <!-- Form content -->
    </n-form>
  </n-page-header>
</template>
```

## Best Practices

1. **Provide back handler**: Always implement on-back for navigation

   ```vue
   <n-page-header title="Detail" @back="router.back()">
     Content
   </n-page-header>
   ```

2. **Use slots for rich content**: Use title/subtitle slots for complex content

   ```vue
   <n-page-header>
     <template #title>
       <a href="...">Link Title</a>
     </template>
   </n-page-header>
   ```

3. **Add extra actions**: Use extra slot for page-level actions

   ```vue
   <n-page-header title="Users">
     <template #extra>
       <n-button type="primary">Add User</n-button>
     </template>
   </n-page-header>
   ```

4. **Show context in subtitle**: Provide brief description in subtitle

   ```vue
   <n-page-header
     title="Settings"
     subtitle="Configure your application preferences"
   />
   ```

5. **Use footer for tabs or filters**: Footer slot is ideal for navigation tabs

   ```vue
   <n-page-header title="Dashboard">
     <template #footer>
       <n-tabs>...</n-tabs>
     </template>
   </n-page-header>
   ```

6. **Consistent styling**: Keep page header styling consistent across pages
