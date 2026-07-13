---
name: 'n-spin'
description: 'Spin component for displaying loading spinners. Invoke when user needs to show loading states with customizable spin indicators in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Spin Component

Spin component for displaying loading spinners and wrapping content with loading overlays.

## When to Use

Use this component when:

- **Loading states**: Show loading indicator during async operations
- **Content wrapping**: Overlay spinner on existing content
- **Form submissions**: Indicate processing state
- **Data fetching**: Show loading while fetching data

## When to Invoke

Invoke this skill when:

- User needs to display a loading spinner
- User wants to wrap content with loading overlay
- User needs custom loading icons
- User wants to add loading descriptions
- User asks about loading state UI

## Features

- **Size Options**: small, medium, and large sizes
- **Content Wrapping**: Wrap any content with loading overlay
- **Custom Icons**: Replace default spinner with custom icon
- **Description Support**: Add text description below spinner
- **Delay Display**: Prevent spinner flash with delay option
- **Custom Styling**: Customize stroke color and width

## API Reference

### Spin Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| content-class | `string` | `undefined` | Content class of the spin. | 2.36.0 |
| content-style | `string \| Object` | `undefined` | Content style of the spin. | 2.36.0 |
| description | `string` | `undefined` | Description of the spin. |  |
| rotate | `boolean` | `true` | Whether icon rotates (for custom icon). |  |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | Size of the spin. |  |
| show | `boolean` | `true` | Whether spin is active (when has content). |  |
| stroke-width | `number` | `undefined` | Relative width of spin's stroke. |  |
| radius | `number` | `100` | Outer radius of the spin icon. | 2.44.0 |
| scale | `number` | `1` | Scale factor of the spin icon. | 2.44.0 |
| stroke | `string` | `undefined` | Color of the spin. |  |
| delay | `number` | `undefined` | Delay in milliseconds for loading state. |  |

### Spin Slots

| Name        | Parameters | Description                         |
| ----------- | ---------- | ----------------------------------- |
| default     | `()`       | If set, spin will wrap the content. |
| description | `()`       | Description of the spin.            |
| icon        | `()`       | Customize the spin icon.            |

## Basic Usage

### Basic Spin

```vue
<template>
  <n-space>
    <n-spin size="small" />
    <n-spin size="medium" />
    <n-spin size="large" />
  </n-space>
</template>
```

### Wrap Content

```vue
<template>
  <n-space vertical>
    <n-spin :show="show">
      <n-alert title="La La La" type="success">
        Leave it till tomorrow to unpack my case. Honey disconnect the phone.
      </n-alert>
    </n-spin>
    <n-button @click="show = !show">Click to Spin</n-button>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);
</script>
```

### With Description

```vue
<template>
  <n-spin :show="show" description="Loading...">
    <n-alert title="Content" type="info">
      This content is wrapped by spin.
    </n-alert>
  </n-spin>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(true);
</script>
```

### Custom Icon

```vue
<template>
  <n-spin :show="show">
    <template #icon>
      <n-icon>
        <Reload />
      </n-icon>
    </template>
    <n-alert title="Custom Spinner" type="info">
      Content with custom loading icon.
    </n-alert>
  </n-spin>
</template>

<script setup>
import { ref } from 'vue';
import { Reload } from '@vicons/ionicons5';

const show = ref(true);
</script>
```

### Delay Display

```vue
<template>
  <n-space vertical>
    <n-spin :show="show" :delay="1000">
      <n-alert title="Delayed Spin" type="success">
        Spinner appears after 1 second delay.
      </n-alert>
    </n-spin>
    <n-button @click="show = !show">
      {{ show ? 'Stop' : 'Start' }} Spin
    </n-button>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);
</script>
```

### Custom Color

```vue
<template>
  <n-space>
    <n-spin stroke="#18a058" />
    <n-spin stroke="#2080f0" />
    <n-spin stroke="#d03050" />
  </n-space>
</template>
```

## Common Patterns

### Loading Button

```vue
<template>
  <n-button :loading="loading" @click="handleClick"> Submit </n-button>
</template>

<script setup>
import { ref } from 'vue';

const loading = ref(false);

const handleClick = async () => {
  loading.value = true;
  await new Promise(resolve => setTimeout(resolve, 2000));
  loading.value = false;
};
</script>
```

### Form Submission

```vue
<template>
  <n-spin :show="submitting" description="Submitting...">
    <n-form :model="formData">
      <n-form-item label="Name">
        <n-input v-model:value="formData.name" :disabled="submitting" />
      </n-form-item>
      <n-form-item label="Email">
        <n-input v-model:value="formData.email" :disabled="submitting" />
      </n-form-item>
      <n-button type="primary" :disabled="submitting" @click="handleSubmit">
        Submit
      </n-button>
    </n-form>
  </n-spin>
</template>

<script setup>
import { ref, reactive } from 'vue';

const submitting = ref(false);
const formData = reactive({
  name: '',
  email: '',
});

const handleSubmit = async () => {
  submitting.value = true;
  await new Promise(resolve => setTimeout(resolve, 2000));
  submitting.value = false;
};
</script>
```

### Card Loading

```vue
<template>
  <n-spin :show="loading">
    <n-card title="User Profile">
      <n-descriptions :column="1">
        <n-descriptions-item label="Name">{{ user.name }}</n-descriptions-item>
        <n-descriptions-item label="Email">{{
          user.email
        }}</n-descriptions-item>
        <n-descriptions-item label="Role">{{ user.role }}</n-descriptions-item>
      </n-descriptions>
    </n-card>
  </n-spin>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

const loading = ref(true);
const user = reactive({
  name: '',
  email: '',
  role: '',
});

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  user.name = 'John Doe';
  user.email = 'john@example.com';
  user.role = 'Admin';
  loading.value = false;
});
</script>
```

### Table Loading

```vue
<template>
  <n-spin :show="loading">
    <n-data-table :columns="columns" :data="data" />
  </n-spin>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const loading = ref(true);
const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Age', key: 'age' },
];
const data = ref([]);

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  data.value = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
  ];
  loading.value = false;
});
</script>
```

### Full Page Loading

```vue
<template>
  <div class="page-container">
    <n-spin :show="loading" description="Loading page...">
      <div class="content">
        <h1>Page Content</h1>
        <p>{{ content }}</p>
      </div>
    </n-spin>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const loading = ref(true);
const content = ref('');

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  content.value = 'Page loaded successfully!';
  loading.value = false;
});
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  padding: 20px;
}
</style>
```

### Custom Animated Icon

```vue
<template>
  <n-spin :show="show" :rotate="true">
    <template #icon>
      <n-icon size="24">
        <Refresh />
      </n-icon>
    </template>
    <template #description>
      <span style="color: #2080f0;">Syncing data...</span>
    </template>
    <n-alert type="info"> Data is being synchronized with the server. </n-alert>
  </n-spin>
</template>

<script setup>
import { ref } from 'vue';
import { Refresh } from '@vicons/ionicons5';

const show = ref(true);
</script>
```

### Multiple Spin States

```vue
<template>
  <n-space vertical>
    <n-spin :show="loading" size="small" description="Small spinner" />
    <n-spin :show="loading" size="medium" description="Medium spinner" />
    <n-spin :show="loading" size="large" description="Large spinner" />
    <n-button @click="loading = !loading">Toggle Loading</n-button>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const loading = ref(true);
</script>
```

### Conditional Content Style

```vue
<template>
  <n-spin :show="loading" :content-style="{ opacity: loading ? '0.5' : '1' }">
    <n-list>
      <n-list-item v-for="item in items" :key="item.id">
        {{ item.name }}
      </n-list-item>
    </n-list>
  </n-spin>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const loading = ref(true);
const items = ref([]);

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  items.value = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];
  loading.value = false;
});
</script>
```

## Best Practices

1. **Use delay for fast operations**: Prevent spinner flash

   ```vue
   <n-spin :show="loading" :delay="500" />
   ```

2. **Provide descriptions**: Add context to loading state

   ```vue
   <n-spin description="Loading data..." />
   ```

3. **Match size to context**: Use appropriate spinner size

   ```vue
   <n-spin size="small" />
   <!-- For inline loading -->
   <n-spin size="large" />
   <!-- For full page loading -->
   ```

4. **Disable interactions during loading**: Prevent user actions

   ```vue
   <n-spin :show="loading">
     <n-form :disabled="loading">...</n-form>
   </n-spin>
   ```

5. **Use custom icons for branding**: Match brand style

   ```vue
   <n-spin>
     <template #icon>
       <BrandLogo />
     </template>
   </n-spin>
   ```

6. **Customize stroke color**: Match theme colors

   ```vue
   <n-spin stroke="#18a058" />
   ```

7. **Control rotation for custom icons**: Enable/disable rotation
   ```vue
   <n-spin :rotate="false">
     <template #icon><CustomIcon /></template>
   </n-spin>
   ```
