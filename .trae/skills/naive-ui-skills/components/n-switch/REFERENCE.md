---
name: n-switch
description: A toggle switch component for binary choices in Naive UI. Supports custom values, loading states, custom colors, and various sizes with optional content labels.
metadata:
  author: jiaiyan
  version: 1.0.0
---

# n-switch Component

The `n-switch` component is a toggle switch for switching between two states. It provides an intuitive way for users to turn options on or off, with support for custom values, loading states, and custom styling.

## When to Use

Use `n-switch` when you need to:

- **Toggle Settings**: Enable or disable features and options
- **Binary Choices**: Switch between two mutually exclusive states
- **Immediate Actions**: Apply changes immediately without form submission
- **Status Indicators**: Show on/off status of features
- **Permission Controls**: Toggle permissions or access levels

## Basic Usage

### Basic Switch

A simple on/off toggle switch.

```vue
<template>
  <n-space>
    <n-switch v-model:value="active" />
    <n-switch v-model:value="active" disabled />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const active = ref(false);
</script>
```

### Different Sizes

Switch supports `small`, `medium`, and `large` sizes.

```vue
<template>
  <n-space align="center">
    <n-switch size="small" v-model:value="small" />
    <n-switch size="medium" v-model:value="medium" />
    <n-switch size="large" v-model:value="large" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const small = ref(true);
const medium = ref(true);
const large = ref(true);
</script>
```

### Switch with Content

Add labels inside the switch for better clarity.

```vue
<template>
  <n-space vertical>
    <n-switch v-model:value="active1">
      <template #checked>ON</template>
      <template #unchecked>OFF</template>
    </n-switch>
    <n-switch v-model:value="active2">
      <template #checked>Enabled</template>
      <template #unchecked>Disabled</template>
    </n-switch>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const active1 = ref(true);
const active2 = ref(false);
</script>
```

### Loading State

Show a loading indicator during async operations.

```vue
<template>
  <n-space>
    <n-switch :rubber-band="false" loading />
    <n-switch
      :rubber-band="false"
      :value="active"
      :loading="loading"
      @update:value="handleUpdate"
    />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const active = ref(false);
const loading = ref(false);

const handleUpdate = async value => {
  loading.value = true;
  await new Promise(resolve => setTimeout(resolve, 1000));
  active.value = value;
  loading.value = false;
};
</script>
```

### Custom Values

Use custom values instead of boolean.

```vue
<template>
  <n-switch
    v-model:value="status"
    checked-value="active"
    unchecked-value="inactive"
  />
  <p>Status: {{ status }}</p>
</template>

<script setup>
import { ref } from 'vue';

const status = ref('inactive');
</script>
```

### Square Shape

Disable rounded corners for a square appearance.

```vue
<template>
  <n-space>
    <n-switch :round="false" v-model:value="square" />
    <n-switch v-model:value="round" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const square = ref(true);
const round = ref(true);
</script>
```

### Custom Colors

Customize the rail color using `rail-style`.

```vue
<template>
  <n-switch :rail-style="railStyle" v-model:value="active">
    <template #checked>Dark Mode</template>
    <template #unchecked>Light Mode</template>
  </n-switch>
</template>

<script setup>
import { ref } from 'vue';

const active = ref(false);

const railStyle = ({ focused, checked }) => {
  const style = {};
  if (checked) {
    style.background = '#1a1a1a';
    if (focused) {
      style.boxShadow = '0 0 0 2px #1a1a1a40';
    }
  } else {
    style.background = '#d0d0d0';
    if (focused) {
      style.boxShadow = '0 0 0 2px #d0d0d040';
    }
  }
  return style;
};
</script>
```

### Custom Icons

Add icons inside the switch handle.

```vue
<template>
  <n-space>
    <n-switch v-model:value="active1" size="medium">
      <template #icon>
        {{ active1 ? '✓' : '✗' }}
      </template>
    </n-switch>
    <n-switch v-model:value="active2" size="large">
      <template #checked-icon>🌙</template>
      <template #unchecked-icon>☀️</template>
    </n-switch>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const active1 = ref(true);
const active2 = ref(false);
</script>
```

## API Reference

### n-switch Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `checked-value` | `string \| boolean \| number` | `true` | Value when in checked state |
| `default-value` | `boolean` | `false` | Default value (uncontrolled mode) |
| `disabled` | `boolean` | `false` | Whether the switch is disabled |
| `loading` | `boolean` | `false` | Whether to show loading state |
| `rail-style` | `(info: { focused: boolean, checked: boolean }) => (CSSProperties \| string)` | `undefined` | Function to generate rail style |
| `round` | `boolean` | `true` | Whether the switch has rounded corners |
| `rubber-band` | `boolean` | `true` | Whether the switch button has rubber band effect |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the switch |
| `spin-props` | `{ strokeWidth?: number, stroke?: string, scale?: number, radius?: number }` | `undefined` | Loading icon properties |
| `unchecked-value` | `string \| boolean \| number` | `false` | Value when in unchecked state |
| `value` | `string \| number \| boolean \| undefined` | `undefined` | Current value (controlled mode) |

### Events

| Name | Parameters | Description |
| --- | --- | --- |
| `on-update:value` | `(value: boolean \| string \| number) => void` | Callback when value changes |

### Slots

| Name             | Parameters | Description                                |
| ---------------- | ---------- | ------------------------------------------ |
| `checked`        | `()`       | Content displayed when switch is checked   |
| `checked-icon`   | `()`       | Icon inside handle when checked            |
| `icon`           | `()`       | Icon inside handle (for both states)       |
| `unchecked`      | `()`       | Content displayed when switch is unchecked |
| `unchecked-icon` | `()`       | Icon inside handle when unchecked          |

## Common Patterns

### Settings Panel

```vue
<template>
  <n-card title="Settings">
    <n-space vertical size="large">
      <n-space justify="space-between">
        <span>Dark Mode</span>
        <n-switch v-model:value="settings.darkMode">
          <template #checked-icon>🌙</template>
          <template #unchecked-icon>☀️</template>
        </n-switch>
      </n-space>
      <n-space justify="space-between">
        <span>Notifications</span>
        <n-switch v-model:value="settings.notifications" />
      </n-space>
      <n-space justify="space-between">
        <span>Auto-save</span>
        <n-switch v-model:value="settings.autoSave">
          <template #checked>ON</template>
          <template #unchecked>OFF</template>
        </n-switch>
      </n-space>
      <n-space justify="space-between">
        <span>Public Profile</span>
        <n-switch
          v-model:value="settings.isPublic"
          checked-value="public"
          unchecked-value="private"
        />
      </n-space>
    </n-space>
  </n-card>
</template>

<script setup>
import { ref } from 'vue';

const settings = ref({
  darkMode: false,
  notifications: true,
  autoSave: true,
  isPublic: 'private',
});
</script>
```

### Async Toggle with Confirmation

```vue
<template>
  <n-space align="center">
    <n-switch
      v-model:value="enabled"
      :loading="loading"
      @update:value="handleToggle"
    />
    <span>{{ enabled ? 'Feature Enabled' : 'Feature Disabled' }}</span>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';
import { useMessage } from 'naive-ui';

const message = useMessage();
const enabled = ref(false);
const loading = ref(false);

const handleToggle = async value => {
  loading.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    message.success(value ? 'Feature enabled' : 'Feature disabled');
  } catch (error) {
    enabled.value = !value;
    message.error('Failed to update setting');
  } finally {
    loading.value = false;
  }
};
</script>
```

### Switch in Form

```vue
<template>
  <n-form ref="formRef" :model="formData" :rules="rules">
    <n-form-item label="Username" path="username">
      <n-input v-model:value="formData.username" />
    </n-form-item>
    <n-form-item label="Enable 2FA" path="twoFactorEnabled">
      <n-switch v-model:value="formData.twoFactorEnabled">
        <template #checked>Enabled</template>
        <template #unchecked>Disabled</template>
      </n-switch>
    </n-form-item>
    <n-form-item label="Marketing Emails" path="marketingEmails">
      <n-switch v-model:value="formData.marketingEmails" />
    </n-form-item>
  </n-form>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  username: '',
  twoFactorEnabled: false,
  marketingEmails: true,
});

const rules = {
  username: {
    required: true,
    message: 'Please enter username',
  },
};
</script>
```

### Permission Control

```vue
<template>
  <n-card title="User Permissions">
    <n-space vertical>
      <n-space
        v-for="permission in permissions"
        :key="permission.key"
        justify="space-between"
      >
        <span>{{ permission.label }}</span>
        <n-switch v-model:value="permission.enabled" :disabled="!canEdit" />
      </n-space>
    </n-space>
  </n-card>
</template>

<script setup>
import { ref } from 'vue';

const canEdit = ref(true);
const permissions = ref([
  { key: 'read', label: 'Read Access', enabled: true },
  { key: 'write', label: 'Write Access', enabled: false },
  { key: 'delete', label: 'Delete Access', enabled: false },
  { key: 'admin', label: 'Admin Access', enabled: false },
]);
</script>
```

## Best Practices

### 1. Use for Immediate Actions

Switches should apply changes immediately, not require a save button:

```vue
<template>
  <n-switch v-model:value="enabled" @update:value="saveImmediately" />
</template>
```

### 2. Provide Clear Labels

Always label what the switch controls:

```vue
<template>
  <n-space justify="space-between">
    <span>Enable notifications</span>
    <n-switch v-model:value="notifications" />
  </n-space>
</template>
```

### 3. Use Loading State for Async Operations

Show loading during async operations:

```vue
<template>
  <n-switch :loading="isLoading" v-model:value="active" />
</template>
```

### 4. Disable Rubber Band for Precise Control

Disable rubber band effect for more precise toggle control:

```vue
<template>
  <n-switch :rubber-band="false" v-model:value="value" />
</template>
```

### 5. Use Custom Values for Non-Boolean States

When the on/off values are not true/false:

```vue
<template>
  <n-switch
    v-model:value="status"
    checked-value="published"
    unchecked-value="draft"
  />
</template>
```

### 6. Add Icons for Better Visual Feedback

Use icons to enhance the visual meaning:

```vue
<template>
  <n-switch v-model:value="sound">
    <template #checked-icon>🔊</template>
    <template #unchecked-icon>🔇</template>
  </n-switch>
</template>
```

### 7. Consider Size Context

Match switch size with surrounding elements:

```vue
<template>
  <n-space align="center">
    <n-text>Compact view</n-text>
    <n-switch size="small" v-model:value="compact" />
  </n-space>
</template>
```
