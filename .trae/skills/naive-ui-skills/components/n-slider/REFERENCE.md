---
name: n-slider
description: A versatile slider component for selecting values within a range in Naive UI. Supports single value, range selection, marks, vertical mode, and custom handles.
metadata:
  author: jiaiyan
  version: 1.0.0
---

# n-slider Component

The `n-slider` component allows users to select values by moving a handle along a track. It supports single value selection, range selection, custom marks, and both horizontal and vertical orientations.

## When to Use

Use `n-slider` when you need to:

- **Range Selection**: Allow users to select a value within a defined range
- **Volume/Brightness Control**: Adjust settings with continuous values
- **Price Filtering**: Set minimum and maximum price ranges
- **Progress Indication**: Display and adjust progress or position
- **Numeric Input**: Provide an intuitive way to input numeric values

## Basic Usage

### Basic Slider

A simple slider with step increments.

```vue
<template>
  <n-space vertical>
    <n-slider v-model:value="value" :step="10" />
    <n-input-number v-model:value="value" size="small" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(50);
</script>
```

### Range Slider

Select a range with two handles.

```vue
<template>
  <n-space vertical>
    <n-slider v-model:value="range" range :step="1" />
    <n-space>
      <n-input-number v-model:value="range[0]" size="small" />
      <span>to</span>
      <n-input-number v-model:value="range[1]" size="small" />
    </n-space>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const range = ref([20, 80]);
</script>
```

### Slider with Marks

Display marks at specific positions on the track.

```vue
<template>
  <n-slider v-model:value="value" :marks="marks" :step="10" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref(50);
const marks = {
  0: '0°C',
  20: '20°C',
  40: '40°C',
  60: '60°C',
  80: '80°C',
  100: '100°C',
};
</script>
```

### Restrict to Mark Values

Set `step="mark"` to restrict selection to mark values only.

```vue
<template>
  <n-slider v-model:value="value" :marks="marks" step="mark" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref(20);
const marks = {
  0: 'Low',
  25: 'Medium-Low',
  50: 'Medium',
  75: 'Medium-High',
  100: 'High',
};
</script>
```

### Disabled Slider

```vue
<template>
  <n-slider :default-value="50" disabled />
</template>
```

### Disable Tooltip

Hide the tooltip that shows the current value.

```vue
<template>
  <n-slider :step="10" :tooltip="false" v-model:value="value" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref(30);
</script>
```

### Format Tooltip

Customize the tooltip display format.

```vue
<template>
  <n-slider v-model:value="value" :step="10" :format-tooltip="formatTooltip" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref(50);

const formatTooltip = value => `${value}%`;
</script>
```

### Reverse Direction

Invert the track direction.

```vue
<template>
  <n-space vertical>
    <n-slider v-model:value="value" :step="10" reverse />
    <n-input-number v-model:value="value" size="small" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(30);
</script>
```

### Vertical Slider

Enable vertical orientation.

```vue
<template>
  <n-space style="height: 300px; justify-content: center">
    <n-slider :default-value="77" vertical />
    <n-slider :default-value="20" vertical reverse />
    <n-slider :default-value="30" vertical disabled />
    <n-slider v-model:value="range" :marks="marks" vertical range />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const range = ref([30, 70]);
const marks = {
  0: '0',
  50: '50',
  100: '100',
};
</script>
```

### Always Show Tooltip

Keep the tooltip always visible.

```vue
<template>
  <n-slider show-tooltip v-model:value="value" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref(50);
</script>
```

### Custom Handle

Customize the slider handle using the `thumb` slot.

```vue
<template>
  <n-slider v-model:value="value" :step="10">
    <template #thumb>
      <n-icon-wrapper :size="24" :border-radius="12">
        <n-icon :size="18" :component="CustomIcon" />
      </n-icon-wrapper>
    </template>
  </n-slider>
</template>

<script setup>
import { ref } from 'vue';
import { SettingsOutline as CustomIcon } from '@vicons/ionicons5';

const value = ref(50);
</script>
```

### Custom Marks

Use render functions for custom mark labels.

```vue
<template>
  <n-slider v-model:value="value" :marks="customMarks" range />
</template>

<script setup>
import { ref, h } from 'vue';

const value = ref([20, 80]);

const customMarks = {
  0: () => h('span', { style: { color: '#999' } }, 'Start'),
  50: () => h('span', { style: { color: '#18a058' } }, 'Middle'),
  100: () => h('span', { style: { color: '#999' } }, 'End'),
};
</script>
```

## API Reference

### n-slider Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `default-value` | `number \| [number, number] \| null` | `null` | Default value |
| `disabled` | `boolean` | `false` | Whether the slider is disabled |
| `format-tooltip` | `(value: number) => string \| number` | `undefined` | Format tooltip content |
| `keyboard` | `boolean` | `true` | Whether the slider can be controlled by keyboard |
| `marks` | `{ [markValue: number]: string \| (() => VNodeChild) }` | `undefined` | Marks on the slider track |
| `max` | `number` | `100` | Maximum value |
| `min` | `number` | `0` | Minimum value |
| `placement` | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'` | `undefined` | Tooltip placement |
| `range` | `boolean` | `false` | Whether to use range selection |
| `reverse` | `boolean` | `false` | Whether to reverse the track direction |
| `show-tooltip` | `boolean` | `false` | Whether to always show tooltip (non-range only) |
| `step` | `number \| 'mark'` | `1` | Step value. Use `'mark'` to restrict to mark values |
| `tooltip` | `boolean` | `true` | Whether to show tooltip |
| `vertical` | `boolean` | `false` | Whether to enable vertical mode |
| `value` | `number \| [number, number] \| null` | `undefined` | Current value (controlled mode) |

### Events

| Name | Parameters | Description |
| --- | --- | --- |
| `on-update:value` | `(value: number \| [number, number]) => void` | Callback when value updates |
| `on-dragstart` | `() => void` | Callback when dragging starts |
| `on-dragend` | `() => void` | Callback when dragging ends |

### Slots

| Name    | Parameters | Description                 |
| ------- | ---------- | --------------------------- |
| `thumb` | `()`       | Custom thumb/handle element |

## Common Patterns

### Price Range Filter

```vue
<template>
  <n-card title="Price Range">
    <n-slider
      v-model:value="priceRange"
      range
      :min="0"
      :max="1000"
      :step="10"
      :format-tooltip="formatPrice"
    />
    <n-space justify="space-between" style="margin-top: 12px">
      <span>${{ priceRange[0] }}</span>
      <span>${{ priceRange[1] }}</span>
    </n-space>
  </n-card>
</template>

<script setup>
import { ref } from 'vue';

const priceRange = ref([100, 500]);

const formatPrice = value => `$${value}`;
</script>
```

### Volume Control

```vue
<template>
  <n-space align="center">
    <n-icon :component="VolumeLow" />
    <n-slider
      v-model:value="volume"
      :min="0"
      :max="100"
      :step="1"
      style="width: 200px"
    />
    <n-icon :component="VolumeHigh" />
    <span>{{ volume }}%</span>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';
import {
  VolumeLowOutline as VolumeLow,
  VolumeHighOutline as VolumeHigh,
} from '@vicons/ionicons5';

const volume = ref(50);
</script>
```

### Temperature Selector

```vue
<template>
  <n-space vertical>
    <n-slider
      v-model:value="temperature"
      :min="16"
      :max="30"
      :marks="tempMarks"
      :format-tooltip="formatTemp"
    />
    <n-space justify="center">
      <n-tag :type="tempType">Current: {{ temperature }}°C</n-tag>
    </n-space>
  </n-space>
</template>

<script setup>
import { ref, computed } from 'vue';

const temperature = ref(22);

const tempMarks = {
  16: '16°C',
  20: '20°C',
  24: '24°C',
  28: '28°C',
  30: '30°C',
};

const formatTemp = value => `${value}°C`;

const tempType = computed(() => {
  if (temperature.value < 20) return 'info';
  if (temperature.value < 26) return 'success';
  return 'warning';
});
</script>
```

### Slider in Form

```vue
<template>
  <n-form ref="formRef" :model="formData">
    <n-form-item label="Brightness" path="brightness">
      <n-slider
        v-model:value="formData.brightness"
        :min="0"
        :max="100"
        :format-tooltip="v => `${v}%`"
      />
    </n-form-item>
    <n-form-item label="Contrast" path="contrast">
      <n-slider
        v-model:value="formData.contrast"
        :min="-100"
        :max="100"
        :format-tooltip="v => `${v > 0 ? '+' : ''}${v}`"
      />
    </n-form-item>
  </n-form>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  brightness: 50,
  contrast: 0,
});
</script>
```

## Best Practices

### 1. Provide Visual Feedback

Always show the current value alongside the slider:

```vue
<template>
  <n-space vertical>
    <n-slider v-model:value="value" />
    <span>Value: {{ value }}</span>
  </n-space>
</template>
```

### 2. Use Marks for Key Values

Add marks to help users understand the scale:

```vue
<template>
  <n-slider
    v-model:value="value"
    :marks="{ 0: 'Min', 50: 'Mid', 100: 'Max' }"
  />
</template>
```

### 3. Format Tooltips for Clarity

Use `format-tooltip` to display meaningful values:

```vue
<template>
  <n-slider :format-tooltip="v => `$${v}`" v-model:value="price" />
</template>
```

### 4. Set Appropriate Step Values

Choose step values that match your use case:

```vue
<template>
  <n-space vertical>
    <n-slider :step="1" v-model:value="precise" />
    <n-slider :step="10" v-model:value="coarse" />
  </n-space>
</template>
```

### 5. Use Range for Interval Selection

Use range mode when users need to select an interval:

```vue
<template>
  <n-slider range v-model:value="range" />
</template>
```

### 6. Consider Vertical for Space-Constrained Layouts

Use vertical sliders when horizontal space is limited:

```vue
<template>
  <div style="height: 200px">
    <n-slider vertical v-model:value="value" />
  </div>
</template>
```

### 7. Disable Keyboard When Needed

Disable keyboard control for touch-optimized interfaces:

```vue
<template>
  <n-slider :keyboard="false" v-model:value="value" />
</template>
```
