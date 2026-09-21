---
name: 'n-alert'
description: 'Alert component for displaying important messages and notifications. Invoke when user needs to show contextual feedback messages with different types and styles in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Alert Component

Alert component for displaying important messages, warnings, and contextual feedback to users.

## When to Use

Use this component when:

- **System notifications**: Display system-level messages like maintenance alerts
- **Form feedback**: Show validation errors or success messages
- **Contextual warnings**: Alert users about important information related to current content
- **Dismissible messages**: Display messages that users can close

## When to Invoke

Invoke this skill when:

- User needs to display alert messages with different types (info, success, warning, error)
- User wants to create closable alerts
- User needs to customize alert icons
- User wants to create bordered or borderless alerts
- User asks about integrating alerts with marquee effects

## Features

- **Multiple Types**: default, info, success, warning, error
- **Closable**: Optional close button with callback support
- **Custom Icons**: Support for custom icon slots
- **Border Control**: Toggle border visibility
- **Header Slot**: Custom header content support
- **Marquee Integration**: Works with n-marquee for scrolling content

## API Reference

### Alert Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` | Whether the alert can show border. |
| closable | `boolean` | `false` | Whether the alert can be closed. |
| show-icon | `boolean` | `true` | Whether to show the icon of alert. |
| title | `string` | `undefined` | Title of the alert. |
| type | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | Alert type. |
| on-after-leave | `Function` | `undefined` | Callback function executed when the alert disappears. |
| on-close | `() => boolean \| Promise<boolean> \| any` | `() => true` | The callback function executed when the close icon is clicked. |

### Alert Slots

| Name    | Parameters | Description                             |
| ------- | ---------- | --------------------------------------- |
| default | `()`       | The content of the alert.               |
| header  | `()`       | The content placed in the alert header. |
| icon    | `()`       | Icon displayed in the alert.            |

## Basic Usage

### Basic Alert Types

```vue
<template>
  <n-space vertical :size="12">
    <n-alert title="Default Text" type="default">
      Default alert content
    </n-alert>
    <n-alert title="Info" type="info"> Information message </n-alert>
    <n-alert title="Success" type="success">
      Operation completed successfully
    </n-alert>
    <n-alert title="Warning" type="warning">
      Please review before proceeding
    </n-alert>
    <n-alert title="Error" type="error"> Something went wrong </n-alert>
  </n-space>
</template>
```

### Closable Alert

```vue
<template>
  <n-alert title="Dismissible" type="info" closable>
    This alert can be closed by clicking the X button
  </n-alert>
</template>
```

### Custom Icon

```vue
<template>
  <n-alert title="Custom Icon" type="info">
    <template #icon>
      <n-icon>
        <IosAirplane />
      </n-icon>
    </template>
    Alert with custom icon
  </n-alert>
</template>
```

### No Icon

```vue
<template>
  <n-alert :show-icon="false"> Alert without icon </n-alert>
</template>
```

### Bordered Toggle

```vue
<template>
  <n-space vertical :size="12">
    <n-switch v-model:value="bordered" />
    <n-alert title="Bordered Alert" type="info" :bordered="bordered">
      Toggle border visibility
    </n-alert>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const bordered = ref(true);
</script>
```

### With Marquee

```vue
<template>
  <n-alert type="error" title="Warning">
    <n-marquee>
      <div style="margin-right: 64px">Test environment is offline again.</div>
    </n-marquee>
  </n-alert>
</template>
```

## Common Patterns

### Form Validation Feedback

```vue
<template>
  <n-form>
    <n-alert
      v-if="errors.length"
      type="error"
      title="Validation Errors"
      closable
    >
      <n-ul>
        <n-li v-for="error in errors" :key="error">
          {{ error }}
        </n-li>
      </n-ul>
    </n-alert>
  </n-form>
</template>

<script setup>
import { ref } from 'vue';

const errors = ref(['Name is required', 'Email is invalid']);
</script>
```

### Conditional Alert Display

```vue
<template>
  <n-alert
    v-if="showAlert"
    :type="alertType"
    :title="alertTitle"
    closable
    @close="showAlert = false"
  >
    {{ alertMessage }}
  </n-alert>
</template>

<script setup>
import { ref } from 'vue';

const showAlert = ref(true);
const alertType = ref('success');
const alertTitle = ref('Success');
const alertMessage = ref('Operation completed successfully');
</script>
```

### Custom Header

```vue
<template>
  <n-alert type="warning">
    <template #header>
      <n-space align="center">
        <n-icon><WarningIcon /></n-icon>
        <span>Custom Header</span>
      </n-space>
    </template>
    Alert content with custom header
  </n-alert>
</template>
```

## Best Practices

1. **Use appropriate types**: Match alert type to message context
   - `info` for informational messages
   - `success` for positive confirmations
   - `warning` for cautionary messages
   - `error` for error states

2. **Keep messages concise**: Alert messages should be brief and actionable

3. **Use closable for non-critical alerts**: Allow users to dismiss informational alerts

4. **Provide clear titles**: Use descriptive titles to quickly convey the alert's purpose

5. **Consider accessibility**: Ensure alert content is accessible to screen readers
