---
name: 'n-skeleton'
description: 'Skeleton component for displaying loading placeholders. Invoke when user needs to show content loading states with animated placeholders in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Skeleton Component

Skeleton component for displaying animated loading placeholders while content is being loaded.

## When to Use

Use this component when:

- **Content loading**: Display placeholders while data is being fetched
- **Progressive loading**: Show skeleton during lazy-loaded content
- **Better UX**: Reduce perceived loading time with animated placeholders
- **Layout stability**: Prevent layout shift during content load

## When to Invoke

Invoke this skill when:

- User needs to show loading placeholders
- User wants to create skeleton screens
- User needs different skeleton shapes (text, box, circle)
- User wants to match skeleton size with actual components
- User asks about loading state UI

## Features

- **Text Skeleton**: Animated text placeholders
- **Shape Variants**: Box, circle, and rounded shapes
- **Size Options**: small, medium, and large sizes
- **Repeat Function**: Repeat skeleton elements easily
- **Animation Control**: Enable or disable animation
- **Custom Dimensions**: Set custom width and height

## API Reference

### Skeleton Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| text | `boolean` | `false` | Text skeleton style. |
| round | `boolean` | `false` | Round skeleton style. |
| circle | `boolean` | `false` | Circle skeleton style. |
| height | `string \| number` | `undefined` | Skeleton height. |
| width | `string \| number` | `undefined` | Skeleton width. |
| size | `'small' \| 'medium' \| 'large'` | `undefined` | Skeleton size. |
| repeat | `string \| number` | `1` | Repeat frequency for text skeletons. |
| animated | `boolean` | `true` | Whether to enable animation. |
| sharp | `boolean` | `true` | Whether to display as right-angled skeleton. |

## Basic Usage

### Text Skeleton

```vue
<template>
  <n-skeleton text :repeat="2" />
  <n-skeleton text style="width: 60%" />
</template>
```

### Box Skeleton

```vue
<template>
  <n-space vertical>
    <n-skeleton height="40px" width="33%" />
    <n-skeleton height="40px" width="66%" :sharp="false" />
    <n-skeleton height="40px" round />
    <n-skeleton height="40px" circle />
  </n-space>
</template>
```

### Size Matching

```vue
<template>
  <n-space vertical>
    <n-space>
      <n-switch v-model:value="loading" />
      Loading
    </n-space>
    <n-space>
      <n-skeleton v-if="loading" :width="146" :sharp="false" size="medium" />
      <n-button v-else>Won't you fly high</n-button>

      <n-skeleton v-if="loading" :width="132" round size="medium" />
      <n-button v-else round>free bird, yeah</n-button>

      <n-skeleton v-if="loading" circle size="medium" />
      <n-button v-else circle>?</n-button>
    </n-space>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const loading = ref(true);
</script>
```

### No Animation

```vue
<template>
  <n-skeleton text :animated="false" :repeat="3" />
</template>
```

## Common Patterns

### Card Skeleton

```vue
<template>
  <n-card v-if="loading" style="width: 300px;">
    <n-skeleton text :repeat="2" />
    <n-skeleton text style="width: 60%" />
    <template #footer>
      <n-skeleton text style="width: 100px" />
    </template>
  </n-card>
  <n-card v-else style="width: 300px;" :title="data.title">
    {{ data.content }}
    <template #footer>
      <n-button type="primary">Action</n-button>
    </template>
  </n-card>
</template>

<script setup>
import { ref, reactive } from 'vue';

const loading = ref(true);
const data = reactive({
  title: 'Card Title',
  content: 'Card content goes here.',
});
</script>
```

### List Skeleton

```vue
<template>
  <n-list v-if="loading">
    <n-list-item v-for="i in 3" :key="i">
      <template #prefix>
        <n-skeleton circle size="medium" />
      </template>
      <n-skeleton text style="width: 200px" />
    </n-list-item>
  </n-list>
  <n-list v-else>
    <n-list-item v-for="item in items" :key="item.id">
      <template #prefix>
        <n-avatar :src="item.avatar" />
      </template>
      {{ item.name }}
    </n-list-item>
  </n-list>
</template>

<script setup>
import { ref } from 'vue';

const loading = ref(true);
const items = ref([
  { id: 1, name: 'Item 1', avatar: '/avatar1.jpg' },
  { id: 2, name: 'Item 2', avatar: '/avatar2.jpg' },
  { id: 3, name: 'Item 3', avatar: '/avatar3.jpg' },
]);
</script>
```

### Table Skeleton

```vue
<template>
  <n-data-table v-if="!loading" :columns="columns" :data="data" />
  <div v-else class="table-skeleton">
    <n-skeleton
      v-for="i in 5"
      :key="i"
      text
      :repeat="4"
      style="margin-bottom: 16px;"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const loading = ref(true);
const columns = [];
const data = [];
</script>

<style scoped>
.table-skeleton {
  padding: 16px;
}
</style>
```

### Article Skeleton

```vue
<template>
  <div class="article-skeleton" v-if="loading">
    <n-skeleton text style="width: 50%; height: 32px; margin-bottom: 24px;" />
    <n-skeleton text :repeat="4" />
    <n-skeleton text style="width: 70%" />
    <n-skeleton height="200px" style="margin: 24px 0;" />
    <n-skeleton text :repeat="3" />
    <n-skeleton text style="width: 60%" />
  </div>
  <article v-else>
    <h1>{{ article.title }}</h1>
    <p>{{ article.content }}</p>
    <img :src="article.image" alt="Article image" />
    <p>{{ article.moreContent }}</p>
  </article>
</template>

<script setup>
import { ref, reactive } from 'vue';

const loading = ref(true);
const article = reactive({
  title: 'Article Title',
  content: 'Article content...',
  image: '/article.jpg',
  moreContent: 'More content...',
});
</script>
```

### Profile Card Skeleton

```vue
<template>
  <n-card style="width: 300px;">
    <div class="profile-skeleton" v-if="loading">
      <n-skeleton circle :size="80" style="margin: 0 auto 16px;" />
      <n-skeleton text style="width: 60%; margin: 0 auto 8px;" />
      <n-skeleton text style="width: 80%; margin: 0 auto;" />
      <n-divider />
      <n-space justify="center">
        <n-skeleton :width="80" :height="32" round />
        <n-skeleton :width="80" :height="32" round />
      </n-space>
    </div>
    <div class="profile" v-else>
      <n-avatar :src="user.avatar" :size="80" style="margin: 0 auto 16px;" />
      <h3 style="text-align: center;">{{ user.name }}</h3>
      <p style="text-align: center; color: #999;">{{ user.bio }}</p>
      <n-divider />
      <n-space justify="center">
        <n-button size="small">Follow</n-button>
        <n-button size="small">Message</n-button>
      </n-space>
    </div>
  </n-card>
</template>

<script setup>
import { ref, reactive } from 'vue';

const loading = ref(true);
const user = reactive({
  name: 'John Doe',
  bio: 'Software Developer',
  avatar: '/avatar.jpg',
});
</script>
```

### Form Skeleton

```vue
<template>
  <n-form v-if="!loading" :model="formData">
    <n-form-item label="Name">
      <n-input v-model:value="formData.name" />
    </n-form-item>
    <n-form-item label="Email">
      <n-input v-model:value="formData.email" />
    </n-form-item>
    <n-button type="primary">Submit</n-button>
  </n-form>
  <div v-else class="form-skeleton">
    <n-skeleton text style="width: 80px; margin-bottom: 8px;" />
    <n-skeleton :height="34" style="margin-bottom: 16px;" />
    <n-skeleton text style="width: 80px; margin-bottom: 8px;" />
    <n-skeleton :height="34" style="margin-bottom: 16px;" />
    <n-skeleton :width="100" :height="34" round />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const loading = ref(true);
const formData = reactive({
  name: '',
  email: '',
});
</script>
```

### Grid Skeleton

```vue
<template>
  <n-grid v-if="loading" :cols="3" :x-gap="16" :y-gap="16">
    <n-gi v-for="i in 6" :key="i">
      <n-card>
        <n-skeleton height="150px" style="margin-bottom: 12px;" />
        <n-skeleton text style="width: 70%; margin-bottom: 8px;" />
        <n-skeleton text style="width: 50%;" />
      </n-card>
    </n-gi>
  </n-grid>
  <n-grid v-else :cols="3" :x-gap="16" :y-gap="16">
    <n-gi v-for="item in items" :key="item.id">
      <n-card>
        <img
          :src="item.image"
          style="width: 100%; height: 150px; object-fit: cover;"
        />
        <h4>{{ item.title }}</h4>
        <p>{{ item.description }}</p>
      </n-card>
    </n-gi>
  </n-grid>
</template>

<script setup>
import { ref } from 'vue';

const loading = ref(true);
const items = ref([]);
</script>
```

## Best Practices

1. **Match skeleton dimensions**: Size skeleton to match actual content

   ```vue
   <n-skeleton :width="200" :height="34" />
   <!-- Match button size -->
   ```

2. **Use appropriate shapes**: Match skeleton shape to content type

   ```vue
   <n-skeleton circle />
   <!-- For avatars -->
   <n-skeleton text />
   <!-- For text -->
   ```

3. **Disable animation for static content**: Turn off animation when not needed

   ```vue
   <n-skeleton :animated="false" />
   ```

4. **Use repeat for multiple lines**: Efficiently create multiple text lines

   ```vue
   <n-skeleton text :repeat="3" />
   ```

5. **Maintain layout stability**: Ensure skeleton matches final content layout

   ```vue
   <n-skeleton style="width: 100%; height: 200px;" />
   ```

6. **Use size prop for component matching**: Match skeleton size with components

   ```vue
   <n-skeleton size="small" />
   <!-- Matches small components -->
   ```

7. **Combine with loading states**: Use with conditional rendering
   ```vue
   <n-skeleton v-if="loading" />
   <div v-else>{{ content }}</div>
   ```
