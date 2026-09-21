---
name: 'n-avatar'
description: 'Avatar component for displaying user profile images, icons, or text. Invoke when user needs to implement user avatars, avatar groups, or customize avatar appearance in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Avatar Component

Avatar component for displaying user profile images, icons, or text with various sizes and shapes.

## When to Use

Use this component when:

- **User profiles**: Display user avatar images in navigation bars, comment sections, or user cards
- **Team displays**: Show multiple user avatars in a group layout
- **Icon placeholders**: Use icons or text as avatar placeholders when images are unavailable
- **Notification badges**: Combine with badge component to show notification counts

## When to Invoke

Invoke this skill when:

- User needs to implement user avatar display
- User wants to create avatar groups with overflow handling
- User needs lazy loading for avatar images
- User wants to customize avatar size, shape, or color
- User needs fallback images when avatar fails to load
- User asks about avatar with icons or text content

## Features

- **Multiple Sizes**: small, medium, large, or custom pixel size
- **Shape Options**: square or round (circular)
- **Image Support**: src for image URL, fallback-src for error handling
- **Lazy Loading**: Load images only when entering viewport
- **Avatar Groups**: Display multiple avatars with max count and overflow
- **Icon/Text Support**: Use icons or text as avatar content
- **Custom Colors**: Custom background and text colors
- **Object Fit**: Control how images fit within the avatar

## API Reference

### Avatar Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` | Whether to display a avatar with border. |
| color | `string` | `undefined` | The background color of the avatar. |
| fallback-src | `string` | `undefined` | Image URL to show when avatar fails to load. |
| img-props | `ImgHTMLAttributes` | `undefined` | The props of the img element inside the component. |
| intersection-observer-options | `{ root?: Element \| Document \| string \| null, rootMargin?: string, threshold?: number \| number[] }` | `undefined` | Intersection observer's config to be applied when `lazy=true`. |
| lazy | `boolean` | `false` | Load image after it enters viewport. |
| object-fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'fill'` | Object-fit type of the image in the container. |
| render-fallback | `() => VNodeChild` | `undefined` | Render function of fallback content. |
| render-placeholder | `() => VNodeChild` | `undefined` | Render function of placeholder. |
| round | `boolean` | `false` | Whether to display a rounded avatar. |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | Avatar's size. |
| src | `string` | `undefined` | Avatar's image source. |
| on-error | `(e: Event) => void` | `undefined` | Callback executed when the avatar image fails to load. |

### AvatarGroup Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| expand-on-hover | `boolean` | `false` | Expand on hover. |
| max | `number` | `undefined` | Max avatar count in the group. |
| max-style | `Object \| string` | `undefined` | The style of the overflow placeholder. |
| options | `Array<AvatarGroupOption>` | `[]` | Avatar group options. |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | Avatar's size. |
| vertical | `boolean` | `false` | Whether display a vertical avatar group. |

### Avatar Slots

| Name        | Parameters | Description                                 |
| ----------- | ---------- | ------------------------------------------- |
| default     | `()`       | The content of the avatar.                  |
| fallback    | `()`       | Content if avatar load fails.               |
| placeholder | `()`       | Placeholder shown when image is not loaded. |

### AvatarGroup Slots

| Name | Parameters | Description |
| --- | --- | --- |
| avatar | `(info: { option: { src: string } })` | Avatar of the avatar group. |
| default | `()` | The content of the avatar group. |
| rest | `(info: { options: Array<{ src: string }>, rest: number })` | Overflow indicator of the avatar group. |

## Basic Usage

### Basic Sizes

```vue
<template>
  <n-space align="flex-end">
    <n-avatar
      size="small"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    />
    <n-avatar
      size="medium"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    />
    <n-avatar
      size="large"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    />
    <n-avatar
      :size="48"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    />
  </n-space>
</template>
```

### Round Avatars

```vue
<template>
  <n-space align="flex-end">
    <n-avatar
      round
      size="small"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    />
    <n-avatar
      round
      size="medium"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    />
    <n-avatar
      round
      size="large"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    />
  </n-space>
</template>
```

### Custom Color

```vue
<template>
  <n-avatar
    :style="{
      color: 'yellow',
      backgroundColor: 'red',
    }"
  >
    M
  </n-avatar>
</template>
```

### With Badge

```vue
<template>
  <n-badge value="999+">
    <n-avatar>App</n-avatar>
  </n-badge>
</template>
```

### With Icon

```vue
<template>
  <n-avatar>
    <n-icon>
      <MdCash />
    </n-icon>
  </n-avatar>
</template>
```

### Fallback Image

```vue
<template>
  <n-avatar
    round
    size="small"
    src="empty.png"
    fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
  />
</template>
```

### Lazy Loading

```vue
<template>
  <n-avatar
    lazy
    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
  />
</template>
```

## Common Patterns

### Avatar Group

```vue
<template>
  <n-avatar-group :options="options" :size="40" :max="3">
    <template #avatar="{ option: { name, src } }">
      <n-tooltip>
        <template #trigger>
          <n-avatar :src="src" />
        </template>
        {{ name }}
      </n-tooltip>
    </template>
  </n-avatar-group>
</template>

<script setup>
import { ref } from 'vue';

const options = ref([
  { name: 'User 1', src: 'https://example.com/avatar1.jpg' },
  { name: 'User 2', src: 'https://example.com/avatar2.jpg' },
  { name: 'User 3', src: 'https://example.com/avatar3.jpg' },
  { name: 'User 4', src: 'https://example.com/avatar4.jpg' },
]);
</script>
```

### Avatar with Error Handling

```vue
<template>
  <n-avatar :src="avatarUrl" :fallback-src="defaultAvatar" @error="handleError">
    <template #fallback>
      <n-icon><UserIcon /></n-icon>
    </template>
  </n-avatar>
</template>

<script setup>
import { ref } from 'vue';

const avatarUrl = ref('https://example.com/user-avatar.jpg');
const defaultAvatar = ref('https://example.com/default-avatar.jpg');

const handleError = e => {
  console.error('Avatar failed to load:', e);
};
</script>
```

### User Card with Avatar

```vue
<template>
  <n-card>
    <n-space align="center">
      <n-avatar round :size="64" :src="user.avatar" />
      <div>
        <n-text strong>{{ user.name }}</n-text>
        <n-text depth="3">{{ user.email }}</n-text>
      </div>
    </n-space>
  </n-card>
</template>

<script setup>
import { ref } from 'vue';

const user = ref({
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://example.com/avatar.jpg',
});
</script>
```

### Lazy Loading with Intersection Observer

```vue
<template>
  <div id="scroll-container" style="overflow: auto; height: 200px;">
    <n-space vertical>
      <n-avatar
        v-for="src in avatarList"
        :key="src"
        size="small"
        lazy
        :src="src"
        :intersection-observer-options="{
          root: '#scroll-container',
        }"
      />
    </n-space>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const avatarList = ref([
  'https://example.com/avatar1.jpg',
  'https://example.com/avatar2.jpg',
]);
</script>
```

## Best Practices

1. **Use fallback images**: Always provide a fallback-src for better user experience

   ```vue
   <n-avatar :src="userAvatar" fallback-src="/default-avatar.png" />
   ```

2. **Use round avatars for user profiles**: Circular avatars are more common for user representation

   ```vue
   <n-avatar round :src="user.avatar" />
   ```

3. **Lazy load avatars in lists**: Use lazy loading for avatar lists to improve performance

   ```vue
   <n-avatar lazy :src="avatar" />
   ```

4. **Use appropriate sizes**: Match avatar size with context
   - Small for inline text or compact lists
   - Medium for comments or cards
   - Large for profile pages or headers

5. **Combine with Badge for notifications**: Show notification counts on avatars

   ```vue
   <n-badge :value="unreadCount" :show="unreadCount > 0">
     <n-avatar :src="user.avatar" />
   </n-badge>
   ```

6. **Use object-fit for image cropping**: Control how images fit within avatar

   ```vue
   <n-avatar object-fit="cover" :src="user.avatar" />
   ```

7. **Avatar groups for teams**: Use n-avatar-group for displaying multiple users
   ```vue
   <n-avatar-group :options="teamMembers" :max="5" />
   ```
