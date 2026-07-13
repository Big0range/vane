---
name: 'n-progress'
description: 'Progress component for displaying operation progress. Invoke when user needs to implement progress bars, loading indicators, or completion status in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Progress Component

Progress component displays the completion status of an operation or task.

## When to Use

Use this component when:

- **File operations**: Show upload/download progress
- **Task completion**: Display task or process progress
- **Loading states**: Indicate loading status
- **Data visualization**: Show percentage-based metrics

## When to Invoke

Invoke this skill when:

- User needs to implement progress indicators
- User wants to show completion percentage
- User needs circular or linear progress bars
- User asks about progress customization
- User wants to display multiple progress indicators

## Features

- **Multiple Types**: Line, circle, multiple-circle, and dashboard types
- **Status Indicators**: Default, info, success, warning, error statuses
- **Customizable Appearance**: Control color, height, border-radius
- **Custom Indicator**: Replace default percentage display
- **Gradient Support**: Linear gradient colors for progress

## API Reference

### Progress Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| border-radius | `number \| string` | `undefined` | Line progress's border-radius. |  |
| circle-gap | `number` | `1` | The gap between circles for multiple-circle type. |  |
| color | `string \| string[] \| { stops: string[] } \| Array<{ stops: string[] }>` | `undefined` | Progress color. Supports gradient. | `stops` since 2.40.2 |
| fill-border-radius | `number \| string` | `undefined` | Line progress's fill border-radius. |  |
| gap-degree | `number` | `75` | The gap degree of half circle, 0 ~ 360. | 2.25.2 |
| gap-offset-degree | `number` | `0` | The gap offset degree. | 2.25.2 |
| height | `number` | `undefined` | Line progress's height. |  |
| indicator-placement | `'inside' \| 'outside'` | `'outside'` | Indicator placement. |  |
| indicator-text-color | `string` | `undefined` | Indicator text color. |  |
| offset-degree | `number` | `0` | Offset degree of circular progress. | 2.24.0 |
| percentage | `number \| number[]` | `0` | Percentage value. |  |
| processing | `boolean` | `false` | Processing status. |  |
| rail-color | `string \| string[]` | `undefined` | Rail color. |  |
| rail-style | `string \| CSS \| Array<string \| CSS>` | `undefined` | Rail style. |  |
| show-indicator | `boolean` | `true` | Whether to display indicators. |  |
| status | `'default' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'default'` | Progress status. |  |
| stroke-width | `number` | `7` | Progress width. |  |
| type | `'line' \| 'circle' \| 'multiple-circle' \| 'dashboard'` | `line` | Progress type. | `'dashboard'` 2.25.2 |
| unit | `string` | `%` | Progress unit. |  |

### Progress Slots

| Name    | Parameters | Description                                     |
| ------- | ---------- | ----------------------------------------------- |
| default | `()`       | Content will replace default indicator content. |

## Basic Usage

### Line Progress

```vue
<template>
  <n-space vertical>
    <n-progress type="line" :percentage="percentage" />
    <n-progress type="line" :percentage="percentage" :show-indicator="false" />
    <n-progress
      type="line"
      :percentage="percentage"
      indicator-placement="inside"
    />
    <n-space>
      <n-button @click="minus">Minus 10%</n-button>
      <n-button @click="add">Add 10%</n-button>
    </n-space>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const percentage = ref(50);

const add = () => {
  percentage.value = Math.min(100, percentage.value + 10);
};

const minus = () => {
  percentage.value = Math.max(0, percentage.value - 10);
};
</script>
```

### Circle Progress

```vue
<template>
  <n-space>
    <n-progress type="circle" :percentage="percentage" />
    <n-progress type="circle" status="info" :percentage="percentage" />
    <n-progress type="circle" status="success" :percentage="percentage" />
    <n-progress type="circle" status="warning" :percentage="percentage" />
    <n-progress type="circle" status="error" :percentage="percentage" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const percentage = ref(75);
</script>
```

## Common Patterns

### Different Statuses

```vue
<template>
  <n-space vertical>
    <n-progress type="line" status="default" :percentage="60" />
    <n-progress type="line" status="info" :percentage="60" />
    <n-progress type="line" status="success" :percentage="60" />
    <n-progress type="line" status="warning" :percentage="60" />
    <n-progress type="line" status="error" :percentage="60" />
  </n-space>
</template>
```

### Dashboard Type

```vue
<template>
  <n-space>
    <n-progress type="dashboard" gap-position="bottom" :percentage="80" />
    <n-progress
      type="dashboard"
      :gap-offset-degree="120"
      :gap-degree="120"
      :percentage="80"
    />
  </n-space>
</template>
```

### Multiple Circle

```vue
<template>
  <n-progress
    type="multiple-circle"
    :stroke-width="6"
    :circle-gap="0.5"
    :percentage="[60, 40, 20]"
    :color="['#2080f0', '#18a058', '#f0a020']"
  />
</template>
```

### Custom Indicator

```vue
<template>
  <n-progress type="circle" :percentage="20">
    <span style="text-align: center">20% is small</span>
  </n-progress>
  <n-progress type="line" status="success" :percentage="20">
    Don't put too much content here.
  </n-progress>
</template>
```

### Custom Colors

```vue
<template>
  <n-progress
    type="circle"
    :percentage="20"
    color="#18a058"
    rail-color="rgba(24, 160, 88, 0.2)"
  />
  <n-progress
    type="line"
    :color="{ stops: ['white', 'pink'] }"
    :percentage="60"
  />
</template>
```

### No Indicator

```vue
<template>
  <n-progress type="circle" :show-indicator="false" :percentage="20" />
  <n-progress type="line" :show-indicator="false" :percentage="20" />
</template>
```

### Custom Height and Border Radius

```vue
<template>
  <n-space vertical>
    <n-progress
      type="line"
      :percentage="50"
      :height="24"
      :border-radius="4"
      :fill-border-radius="0"
    />
    <n-progress
      type="line"
      status="error"
      :percentage="50"
      :height="24"
      border-radius="12px 0 12px 0"
      fill-border-radius="12px 0 12px 0"
    >
      A Kind of Art
    </n-progress>
  </n-space>
</template>
```

### Processing Animation

```vue
<template>
  <n-progress
    type="line"
    :percentage="60"
    indicator-placement="inside"
    processing
  />
</template>
```

### Offset Degree

```vue
<template>
  <n-progress type="circle" :percentage="80" :offset-degree="120" />
</template>
```

### Linear Gradient

```vue
<template>
  <n-flex vertical>
    <n-progress
      type="line"
      :percentage="percentage"
      :show-indicator="false"
      :color="{ stops: ['white', 'pink'] }"
    />
    <n-flex>
      <n-progress
        type="circle"
        :percentage="percentage"
        :color="{ stops: ['#E3F2FD', '#2080f0'] }"
      />
    </n-flex>
  </n-flex>
</template>

<script setup>
import { ref } from 'vue';

const percentage = ref(70);
</script>
```

## Best Practices

1. **Choose appropriate type**: Use line for horizontal space, circle for compact displays

2. **Use meaningful status**: Match status with operation result (success, error, etc.)

3. **Custom indicator for context**: Replace percentage with meaningful text when appropriate

4. **Consider height**: Adjust height based on visual hierarchy

5. **Use processing for indeterminate**: Enable `processing` for ongoing operations

6. **Multiple circles for comparison**: Use multiple-circle to show related metrics
