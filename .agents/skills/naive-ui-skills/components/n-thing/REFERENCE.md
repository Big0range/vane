---
name: n-thing
description: A versatile component for displaying entity information with customizable sections including avatar, header, description, content, and footer.
author: jiaiyan
version: 1.0.0
---

# n-thing Component

The `n-thing` component is Naive UI's solution for displaying information about an entity or "thing". It provides multiple slots for organizing content in a structured layout.

## When to Use

Use `n-thing` when you need to:

- Display entity information with multiple sections
- Create card-like layouts with avatar, title, and description
- Build comment or post components
- Show structured information with header, content, and actions

## Basic Usage

### Simple Thing

```vue
<template>
  <n-thing title="User Profile" description="Basic information about the user">
    <template #avatar>
      <n-avatar>
        <n-icon>
          <UserIcon />
        </n-icon>
      </n-avatar>
    </template>
    This is the main content area.
  </n-thing>
</template>
```

### Full Featured Thing

```vue
<template>
  <n-thing>
    <template #avatar>
      <n-avatar round :size="48"> JD </n-avatar>
    </template>

    <template #header> John Doe </template>

    <template #header-extra>
      <n-button size="small">Follow</n-button>
    </template>

    <template #description> Software Engineer at Tech Company </template>

    Main content goes here. This can be any text or components.

    <template #footer>
      <n-space>
        <n-button text>Like</n-button>
        <n-button text>Comment</n-button>
        <n-button text>Share</n-button>
      </n-space>
    </template>

    <template #action>
      <n-button>More Actions</n-button>
    </template>
  </n-thing>
</template>
```

### Content Indented

```vue
<template>
  <n-thing content-indented>
    <template #avatar>
      <n-avatar>
        <n-icon>
          <DocumentIcon />
        </n-icon>
      </n-avatar>
    </template>

    <template #header> Document Title </template>

    <template #description> Last modified: 2024-01-15 </template>

    The content area will be indented to align with the header text, creating a
    cleaner visual hierarchy.
  </n-thing>
</template>
```

### Using Props Instead of Slots

```vue
<template>
  <n-thing
    title="Project Alpha"
    title-extra="v2.0.0"
    description="A revolutionary new project"
    content="This is the main content of the thing component."
  />
</template>
```

## API Reference

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `content` | `string` | `undefined` | Content area text |
| `content-class` | `string` | `undefined` | Content area class name |
| `content-indented` | `boolean` | `false` | Whether to enable content indentation |
| `content-style` | `string \| Object` | `undefined` | Content area style |
| `description` | `string` | `undefined` | Description information |
| `description-class` | `string` | `undefined` | Description area class name |
| `description-style` | `string \| Object` | `undefined` | Description area style |
| `title` | `string` | `undefined` | Title information |
| `title-extra` | `string` | `undefined` | Additional information for the title |

### Slots

| Name | Parameters | Description |
| --- | --- | --- |
| `action` | `()` | Action area slot (typically for buttons) |
| `avatar` | `()` | Avatar slot |
| `default` | `()` | Main content slot |
| `description` | `()` | Description slot |
| `footer` | `()` | Footer slot |
| `header` | `()` | Header slot |
| `header-extra` | `()` | Header extra slot (for additional info or actions) |

## Common Patterns

### Comment Component

```vue
<template>
  <n-thing content-indented>
    <template #avatar>
      <n-avatar :src="comment.avatar" round />
    </template>

    <template #header>
      <n-space align="center">
        <span>{{ comment.author }}</span>
        <n-tag size="small" v-if="comment.isAuthor">Author</n-tag>
      </n-space>
    </template>

    <template #header-extra>
      <span class="time">{{ comment.time }}</span>
    </template>

    {{ comment.content }}

    <template #footer>
      <n-space>
        <n-button text size="small">
          <template #icon>
            <n-icon><LikeIcon /></n-icon>
          </template>
          {{ comment.likes }}
        </n-button>
        <n-button text size="small">Reply</n-button>
      </n-space>
    </template>
  </n-thing>
</template>

<script setup>
defineProps({
  comment: {
    type: Object,
    required: true,
  },
});
</script>
```

### Card with Thing

```vue
<template>
  <n-card>
    <n-thing>
      <template #avatar>
        <n-avatar :src="user.avatar" />
      </template>

      <template #header>
        {{ user.name }}
      </template>

      <template #description>
        {{ user.email }}
      </template>

      <n-descriptions :column="1">
        <n-descriptions-item label="Department">
          {{ user.department }}
        </n-descriptions-item>
        <n-descriptions-item label="Location">
          {{ user.location }}
        </n-descriptions-item>
      </n-descriptions>
    </n-thing>
  </n-card>
</template>
```

### Activity Feed Item

```vue
<template>
  <n-thing content-indented>
    <template #avatar>
      <n-avatar :style="{ backgroundColor: activity.color }">
        <n-icon>
          <component :is="activity.icon" />
        </n-icon>
      </n-avatar>
    </template>

    <template #header>
      {{ activity.title }}
    </template>

    <template #description>
      {{ activity.timestamp }}
    </template>

    {{ activity.description }}
  </n-thing>
</template>
```

## Best Practices

### 1. Use Content Indented for Better Alignment

When using an avatar, enable `content-indented` for cleaner visual alignment:

```vue
<n-thing content-indented>
  <template #avatar>...</template>
  <!-- Content aligns with header text -->
</n-thing>
```

### 2. Combine with Card for Bordered Layout

```vue
<n-card hoverable>
  <n-thing>
    <!-- Content -->
  </n-thing>
</n-card>
```

### 3. Use Header-Extra for Actions

Place primary actions in the header-extra slot for easy access:

```vue
<template #header-extra>
  <n-button-group>
    <n-button size="small">Edit</n-button>
    <n-button size="small">Delete</n-button>
  </n-button-group>
</template>
```

### 4. Style Consistency

Use `content-style` and `description-style` for consistent styling:

```vue
<n-thing content-style="margin-top: 12px;" description-style="color: #999;">
  <!-- Content -->
</n-thing>
```

### 5. Responsive Layout

Combine with `n-space` for responsive layouts:

```vue
<n-space vertical>
  <n-thing v-for="item in items" :key="item.id">
    <!-- Content -->
  </n-thing>
</n-space>
```
