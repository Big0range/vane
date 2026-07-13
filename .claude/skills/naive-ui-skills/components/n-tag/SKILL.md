---
name: 'n-tag'
description: 'Tag component for displaying labels, categories, or toggle options. Invoke when user needs to implement tags, labels, status indicators, or checkable tags in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Tag Component

Tag component for displaying labels, categories, or toggle options with various types and styles.

## When to Use

Use this component when:

- **Labels and categories**: Display item categories, tags, or labels
- **Status indicators**: Show status like success, warning, error, info
- **Filter options**: Use checkable tags for filtering
- **User attributes**: Display user roles, skills, or attributes
- **Closable items**: Show removable tags like selected filters

## When to Invoke

Invoke this skill when:

- User needs to implement tags or labels
- User wants to create checkable tags for filtering
- User needs closable tags for removable items
- User wants to customize tag colors
- User needs tags with icons or avatars
- User asks about tag types or sizes

## Features

- **Multiple Types**: default, primary, info, success, warning, error
- **Multiple Sizes**: tiny, small, medium, large
- **Shape Options**: round for capsule shape
- **Closable**: Close button with callback
- **Checkable**: Toggle selection state
- **Custom Colors**: Custom background, border, and text colors
- **Borderless**: Option to hide border
- **Icon/Avatar Support**: Slots for icons and avatars
- **Disabled State**: Disable interactions

## API Reference

### Tag Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` | Whether the tag has border. |
| checkable | `boolean` | `false` | Whether the tag is checkable. Note: this nullifies the type property. |
| checked | `boolean` | `false` | Whether the tag is checked. Note: used with `checkable`. |
| closable | `boolean` | `false` | Whether the tag shows a close button. |
| color | `{ color?: string, borderColor?: string, textColor?: string }` | `undefined` | Color of the tag. Note: this will override the type property's color. |
| disabled | `boolean` | `false` | Whether the tag is disabled. |
| round | `boolean` | `false` | Whether the tag has rounded corners. |
| size | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Size of the tag. |
| strong | `boolean` | `false` | Whether to use strong text. |
| trigger-click-on-close | `boolean` | `false` | Whether the tag triggers click on close. |
| type | `'default' \| 'primary' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | Type of the tag. |
| on-close | `(e: MouseEvent) => void` | `undefined` | Close clicked callback. |
| on-update:checked | `(value: boolean) => void` | `undefined` | Checked status change callback. |

### Tag Slots

| Name    | Parameters | Description    |
| ------- | ---------- | -------------- |
| avatar  | `()`       | Tag's avatar.  |
| default | `()`       | Tag's content. |
| icon    | `()`       | Tag's icon.    |

## Basic Usage

### Basic Types

```vue
<template>
  <n-space>
    <n-tag>Real Love</n-tag>
    <n-tag type="success">Yes It Is</n-tag>
    <n-tag type="warning">I'm Down</n-tag>
    <n-tag type="error">Yesterday</n-tag>
    <n-tag type="info">I'm Looking Through You</n-tag>
  </n-space>
</template>
```

### Borderless Tags

```vue
<template>
  <n-space>
    <n-tag :bordered="false">Real Love</n-tag>
    <n-tag :bordered="false" type="success">Yes It Is</n-tag>
    <n-tag :bordered="false" type="warning">I'm Down</n-tag>
    <n-tag :bordered="false" type="error">Yesterday</n-tag>
  </n-space>
</template>
```

### Closable Tags

```vue
<template>
  <n-space>
    <n-tag closable @close="handleClose">Real Love</n-tag>
    <n-tag type="success" closable @close="handleClose">Yes It Is</n-tag>
    <n-tag type="warning" closable @close="handleClose">I'm Down</n-tag>
  </n-space>
</template>

<script setup>
const handleClose = () => {
  console.log('Tag closed');
};
</script>
```

### Tag Sizes

```vue
<template>
  <n-space>
    <n-tag size="tiny">Tiny</n-tag>
    <n-tag size="small">Small</n-tag>
    <n-tag size="medium">Medium</n-tag>
    <n-tag size="large">Large</n-tag>
  </n-space>
</template>
```

### Checkable Tags

```vue
<template>
  <n-space>
    <n-tag v-model:checked="checked" checkable>Real Love</n-tag>
    <n-tag v-model:checked="checked" checkable>Yes It Is</n-tag>
    <n-tag v-model:checked="checked" checkable>I'm Down</n-tag>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(false);
</script>
```

### Round Tags

```vue
<template>
  <n-space>
    <n-tag closable size="small" round @close="handleClose">Real Love</n-tag>
    <n-tag type="success" size="large" round closable>Yes It Is</n-tag>
    <n-tag type="warning" closable round>I'm Down</n-tag>
  </n-space>
</template>
```

### Custom Color

```vue
<template>
  <n-tag :color="{ color: '#BBB', textColor: '#555', borderColor: '#555' }">
    Farewell to the night, waiting for dawn
  </n-tag>
</template>
```

### Tag with Avatar

```vue
<template>
  <n-space>
    <n-tag>
      <template #avatar>
        <n-avatar
          src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"
        />
      </template>
      Anyway.FM
    </n-tag>
  </n-space>
</template>
```

### Tag with Icon

```vue
<template>
  <n-space>
    <n-tag type="success">
      Checked
      <template #icon>
        <n-icon :component="CheckmarkCircle" />
      </template>
    </n-tag>
  </n-space>
</template>
```

## Common Patterns

### Filter Tags

```vue
<template>
  <n-space>
    <n-tag
      v-for="filter in filters"
      :key="filter.value"
      v-model:checked="filter.checked"
      checkable
      @update:checked="handleFilterChange"
    >
      {{ filter.label }}
    </n-tag>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const filters = ref([
  { label: 'All', value: 'all', checked: true },
  { label: 'Active', value: 'active', checked: false },
  { label: 'Completed', value: 'completed', checked: false },
]);

const handleFilterChange = value => {
  console.log('Filter changed:', value);
};
</script>
```

### Removable Tags

```vue
<template>
  <n-space>
    <n-tag v-for="tag in tags" :key="tag" closable @close="removeTag(tag)">
      {{ tag }}
    </n-tag>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const tags = ref(['Vue', 'React', 'Angular']);

const removeTag = tag => {
  tags.value = tags.value.filter(t => t !== tag);
};
</script>
```

### Status Tags

```vue
<template>
  <n-space>
    <n-tag type="success" :bordered="false">
      <template #icon>
        <n-icon :component="CheckmarkCircle" />
      </template>
      Active
    </n-tag>
    <n-tag type="warning" :bordered="false">
      <template #icon>
        <n-icon :component="Warning" />
      </template>
      Pending
    </n-tag>
    <n-tag type="error" :bordered="false">
      <template #icon>
        <n-icon :component="CloseCircle" />
      </template>
      Failed
    </n-tag>
  </n-space>
</template>
```

### User Role Tags

```vue
<template>
  <n-space>
    <n-tag
      v-for="role in userRoles"
      :key="role"
      :type="getRoleType(role)"
      size="small"
    >
      {{ role }}
    </n-tag>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const userRoles = ref(['Admin', 'Editor', 'Viewer']);

const getRoleType = role => {
  const types = {
    Admin: 'error',
    Editor: 'warning',
    Viewer: 'info',
  };
  return types[role] || 'default';
};
</script>
```

### Tag Input

```vue
<template>
  <n-space vertical>
    <n-input
      v-model:value="inputValue"
      @keyup.enter="addTag"
      placeholder="Press Enter to add tag"
    />
    <n-space>
      <n-tag v-for="tag in tags" :key="tag" closable @close="removeTag(tag)">
        {{ tag }}
      </n-tag>
    </n-space>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const tags = ref(['Vue', 'Naive UI']);
const inputValue = ref('');

const addTag = () => {
  if (inputValue.value && !tags.value.includes(inputValue.value)) {
    tags.value.push(inputValue.value);
    inputValue.value = '';
  }
};

const removeTag = tag => {
  tags.value = tags.value.filter(t => t !== tag);
};
</script>
```

### Disabled Tags

```vue
<template>
  <n-space align="center">
    <n-tag closable :disabled="disabled" @close="handleClose">
      Real Love
    </n-tag>
    <n-tag type="success" closable :disabled="disabled"> Yes It Is </n-tag>
    <n-switch v-model:value="disabled" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const disabled = ref(true);
</script>
```

## Best Practices

1. **Use semantic types**: Match tag type with content meaning
   - `success` for positive states
   - `warning` for caution states
   - `error` for error states
   - `info` for informational states

2. **Use appropriate sizes**: Match tag size with context
   - `tiny` for compact inline usage
   - `small` for dense lists
   - `medium` for standard usage
   - `large` for emphasis

3. **Use round for softer appearance**: Round tags look more friendly

   ```vue
   <n-tag round>Soft Tag</n-tag>
   ```

4. **Combine with icons for clarity**: Add icons for visual communication

   ```vue
   <n-tag type="success">
     <template #icon>
       <n-icon :component="CheckIcon" />
     </template>
     Verified
   </n-tag>
   ```

5. **Use checkable for filters**: Allow users to toggle tag selection

   ```vue
   <n-tag v-model:checked="selected" checkable>Filter Option</n-tag>
   ```

6. **Provide close callback**: Handle tag removal properly

   ```vue
   <n-tag closable @close="handleRemove">Removable</n-tag>
   ```

7. **Use custom colors for branding**: Match brand colors when needed

   ```vue
   <n-tag :color="{ color: '#1890ff', textColor: '#fff' }">
     Brand Tag
   </n-tag>
   ```

8. **Disable interactions when needed**: Use disabled state for non-interactive tags
   ```vue
   <n-tag disabled>Read-only Tag</n-tag>
   ```
