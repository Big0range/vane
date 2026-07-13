---
name: n-color-picker
description: A color picker component for selecting colors with support for multiple color modes, alpha channel, swatches, custom triggers, and native color selector integration
author: jiaiyan
version: 1.0.0
---

# n-color-picker Component

The `n-color-picker` component allows users to select colors from various color modes (RGB, HEX, HSL, HSV). It supports alpha channel adjustment, color swatches, custom triggers, and integration with the browser's native color selector.

## When to Use

Use `n-color-picker` when you need to:

- Allow users to select colors for themes, designs, or preferences
- Build color customization interfaces
- Support multiple color formats (RGB, HEX, HSL, HSV)
- Provide preset color swatches for quick selection
- Integrate with form validation
- Create custom color picker triggers

## Basic Usage

### Basic Color Picker

```vue
<template>
  <n-color-picker v-model:value="color" />
</template>

<script setup>
import { ref } from 'vue';

const color = ref('#18A058');
</script>
```

### Without Alpha Channel

```vue
<template>
  <n-color-picker
    v-model:value="color"
    :show-alpha="false"
    :actions="['confirm']"
  />
</template>
```

### Different Sizes

```vue
<template>
  <n-space vertical>
    <n-color-picker size="small" />
    <n-color-picker size="medium" />
    <n-color-picker size="large" />
  </n-space>
</template>
```

## API Reference

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `v-model:value` | `string \| null` | `undefined` | Value of the picker. |
| `actions` | `Array<'confirm' \| 'clear'> \| null` | `null` | The types of buttons in the panel. |
| `default-show` | `boolean` | `undefined` | Whether to show the color panel by default. |
| `default-value` | `string` | Black color | Default value of the picker. |
| `disabled` | `boolean` | `false` | Whether to disable the color picker. |
| `modes` | `Array<'rgb' \| 'hex' \| 'hsl' \| 'hsv'>` | `['rgb', 'hex', 'hsl']` | Available color modes. |
| `placement` | `'top-start' \| 'top' \| ...` | `'bottom-start'` | Color panel placement. |
| `render-label` | `(color: string \| null) => VNodeChild` | `undefined` | Label render function. |
| `show` | `boolean` | `undefined` | Whether the color panel is shown. |
| `show-alpha` | `boolean` | `true` | Whether alpha channel can be adjusted. |
| `show-preview` | `boolean` | `false` | Whether the color preview is shown. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the picker. |
| `swatches` | `string[]` | `undefined` | Preset color swatches. |
| `to` | `string \| HTMLElement \| false` | `'body'` | Where to attach the panel. |

### Events

| Name | Parameters | Description |
| --- | --- | --- |
| `update:value` | `(value: string)` | Triggered when value changes. |
| `update:show` | `(value: boolean)` | Triggered when panel show status changes. |
| `complete` | `(value: string)` | Triggered when value change is complete (not during drag). |
| `confirm` | `(value: string)` | Triggered when confirm button is clicked. |
| `clear` | `()` | Triggered when clear button is clicked. |

### Slots

| Name      | Parameters                | Description                        |
| --------- | ------------------------- | ---------------------------------- |
| `action`  | `()`                      | Custom action buttons.             |
| `label`   | `(color: string \| null)` | Label of the color picker trigger. |
| `trigger` | `{ value, onClick, ref }` | Custom trigger element.            |

## Common Patterns

### Color Swatches

```vue
<template>
  <n-color-picker
    v-model:value="color"
    :swatches="[
      '#FFFFFF',
      '#18A058',
      '#2080F0',
      '#F0A020',
      'rgba(208, 48, 80, 1)',
    ]"
  />
</template>
```

### Specific Color Mode

```vue
<template>
  <n-color-picker v-model:value="color" :modes="['hex']" />
</template>
```

### Clearable Color Picker

```vue
<template>
  <n-color-picker v-model:value="color" :actions="['clear']" />
</template>
```

### With Confirm Button

```vue
<template>
  <n-color-picker
    v-model:value="color"
    :show-alpha="false"
    :actions="['confirm']"
    @confirm="handleConfirm"
  />
</template>

<script setup>
import { ref } from 'vue';

const color = ref('#18A058');

const handleConfirm = value => {
  console.log('Confirmed color:', value);
};
</script>
```

### Custom Trigger

```vue
<template>
  <n-flex :wrap="false" align="center">
    <n-color-picker v-model:value="color">
      <template #trigger="{ value, onClick, ref: triggerRef }">
        <n-button :ref="triggerRef" circle quaternary @click="onClick">
          <template #icon>
            <n-icon :color="value || '#000'">
              <PaletteIcon />
            </n-icon>
          </template>
        </n-button>
      </template>
    </n-color-picker>
  </n-flex>
</template>

<script setup>
import { ref } from 'vue';
import { ColorWand as PaletteIcon } from '@vicons/ionicons5';

const color = ref('#18a058');
</script>
```

### Native Color Selector

```vue
<template>
  <n-color-picker :show-preview="true" />
</template>
```

### With Form Validation

```vue
<template>
  <n-form :model="model">
    <n-form-item label="Color (#18A058)" path="color" :rule="colorRule">
      <n-color-picker v-model:value="model.color" :show-alpha="false" />
    </n-form-item>
  </n-form>
</template>

<script setup>
import { ref } from 'vue';

const model = ref({
  color: null,
});

const colorRule = {
  required: true,
  validator: (rule, value) => {
    return value === '#18A058';
  },
  message: 'Please select #18A058',
  trigger: ['blur', 'change'],
};
</script>
```

### Disabled State

```vue
<template>
  <n-color-picker disabled />
</template>
```

### Custom Label Rendering

```vue
<template>
  <n-color-picker v-model:value="color" :render-label="renderLabel" />
</template>

<script setup>
import { ref, h } from 'vue';

const color = ref('#18A058');

const renderLabel = color => {
  return h('span', { style: { color } }, color || 'No color');
};
</script>
```

## Best Practices

1. **Use `show-alpha: false` for solid colors**: When alpha transparency is not needed, disable it to simplify the UI.

2. **Provide swatches for common colors**: Use the `swatches` prop to offer preset colors for quick selection.

3. **Use `actions: ['confirm']` for important selections**: When color selection has significant effects, require explicit confirmation.

4. **Leverage `show-preview` for native picker**: Enable preview to allow users to use browser's native color picker features.

5. **Choose appropriate modes**: Limit `modes` to only those needed by your application to reduce complexity.

6. **Use custom triggers for unique designs**: The `trigger` slot allows complete customization of the picker's appearance.

7. **Handle `complete` vs `update:value`**: Use `complete` for operations that should only run after user finishes dragging.

8. **Consider form integration**: The color picker works well with `n-form` for validation scenarios.
