---
name: 'n-heatmap'
description: 'Heatmap component for displaying calendar-style data visualization like GitHub contribution graphs. Invoke when user needs to visualize time-series data or activity patterns in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Heatmap Component

Heatmap component for displaying calendar-style data visualization, similar to GitHub's contribution graph. Perfect for showing activity patterns over time.

## When to Use

Use this component when:

- **Activity visualization**: Display user activity over time (commits, logins, etc.)
- **Contribution graphs**: Create GitHub-style contribution calendars
- **Time-series data**: Visualize data patterns across days/weeks
- **Analytics dashboards**: Show historical data trends

## When to Invoke

Invoke this skill when:

- User needs to display a GitHub-style contribution graph
- User wants to visualize time-based activity data
- User needs to customize heatmap colors and themes
- User asks about displaying calendar-based data visualizations

## Features

- **Calendar Layout**: GitHub-style calendar grid layout
- **Built-in Themes**: Multiple color themes (green, blue, orange, purple, red)
- **Custom Colors**: Fully customizable color schemes
- **Responsive**: Horizontal scrollable for full year view
- **Tooltips**: Interactive tooltips for data details
- **Loading State**: Built-in loading state support
- **Slots**: Customizable footer, indicator, and tooltip slots

## API Reference

### Heatmap Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| active-colors | `string[]` | `undefined` | Color array from light to dark, higher priority than color-theme. |
| color-theme | `'green' \| 'blue' \| 'orange' \| 'purple' \| 'red'` | `undefined` | Built-in color theme. |
| data | `Array<{ timestamp: number, value?: number \| null }>` | `[]` | Heatmap data with timestamp and value. |
| first-day-of-week | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `0` | Start day of week (0=Monday, 6=Sunday). |
| fill-calendar-leading | `boolean` | `false` | Fill leading calendar grid for GitHub-style year view. |
| loading | `boolean` | `false` | Show loading state. |
| loading-data | `Array<{ timestamp: number, value?: number \| null }>` | `undefined` | Data for loading state display. |
| minimum-color | `string` | `undefined` | Minimum color for heatmap. |
| show-color-indicator | `boolean` | `true` | Show color level indicator at bottom. |
| show-month-labels | `boolean` | `true` | Show month labels. |
| show-week-labels | `boolean` | `true` | Show week labels. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Heatmap size. |
| tooltip | `boolean \| TooltipProps` | `false` | Tooltip configuration. |
| x-gap | `number \| string` | `undefined` | Horizontal gap between cells. |
| y-gap | `number \| string` | `undefined` | Vertical gap between cells. |

### Heatmap Slots

| Name | Parameters | Description |
| --- | --- | --- |
| footer | `()` | Left footer slot, aligned with heatmap left. |
| indicator | `()` | Right footer indicator slot. |
| indicator-leading-text | `()` | Leading text for color level indicator. |
| indicator-trailing-text | `()` | Trailing text for color level indicator. |
| tooltip | `(props: { timestamp, value })` | Custom tooltip content. |

## Basic Usage

### Basic Heatmap

```vue
<template>
  <n-heatmap :data="data" unit="commits" />
</template>

<script setup>
import { ref } from 'vue';

const data = ref([
  { timestamp: 1704067200000, value: 5 },
  { timestamp: 1704153600000, value: 12 },
  { timestamp: 1704240000000, value: 3 },
]);
</script>
```

### Built-in Color Themes

```vue
<template>
  <n-flex vertical size="large">
    <div v-for="theme in themes" :key="theme.value">
      <n-divider title-placement="left">
        {{ theme.name }}
      </n-divider>
      <n-heatmap :data="data" unit="commits" :color-theme="theme.value" />
    </div>
  </n-flex>
</template>

<script setup>
const themes = [
  { name: 'Green (GitHub Style)', value: 'green' },
  { name: 'Blue', value: 'blue' },
  { name: 'Orange', value: 'orange' },
  { name: 'Purple', value: 'purple' },
  { name: 'Red', value: 'red' },
];
</script>
```

### Custom Colors

```vue
<template>
  <n-heatmap
    :data="data"
    unit="commits"
    :active-colors="customColors"
    minimum-color="#ebedf0"
  />
</template>

<script setup>
const customColors = ['#c6e48b', '#7bc96f', '#239a3b', '#196127'];
</script>
```

### With Tooltips

```vue
<template>
  <n-heatmap :data="data" unit="commits" :tooltip="true">
    <template #tooltip="{ timestamp, value }">
      <div>{{ value }} commits on {{ formatDate(timestamp) }}</div>
    </template>
  </n-heatmap>
</template>

<script setup>
const formatDate = timestamp => {
  return new Date(timestamp).toLocaleDateString();
};
</script>
```

## Common Patterns

### GitHub-Style Year View

```vue
<template>
  <n-scrollbar x-scrollable style="max-width: 100%">
    <n-heatmap
      :data="yearData"
      unit="contributions"
      :fill-calendar-leading="true"
      :tooltip="true"
    >
      <template #footer>
        <n-text depth="3">Less</n-text>
      </template>
      <template #indicator>
        <n-text depth="3">More</n-text>
      </template>
    </n-heatmap>
  </n-scrollbar>
</template>

<script setup>
import { heatmapMockData } from 'naive-ui';

const yearData = heatmapMockData('recent');
</script>
```

### With Loading State

```vue
<template>
  <n-heatmap
    :data="data"
    :loading="loading"
    :loading-data="loadingData"
    unit="activities"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';

const loading = ref(true);
const data = ref([]);
const loadingData = ref([]);

onMounted(async () => {
  const response = await fetch('/api/activities');
  data.value = await response.json();
  loading.value = false;
});
</script>
```

### Custom Size and Gaps

```vue
<template>
  <n-flex vertical>
    <n-heatmap :data="data" size="small" :x-gap="2" :y-gap="2" />
    <n-divider />
    <n-heatmap :data="data" size="medium" />
    <n-divider />
    <n-heatmap :data="data" size="large" :x-gap="4" :y-gap="4" />
  </n-flex>
</template>
```

### Activity Dashboard

```vue
<template>
  <n-card title="Your Activity">
    <n-flex vertical>
      <n-scrollbar x-scrollable>
        <n-heatmap
          :data="activityData"
          unit="actions"
          color-theme="blue"
          :tooltip="{
            placement: 'top',
            trigger: 'hover',
          }"
        >
          <template #indicator-leading-text>
            <n-text depth="3">Less</n-text>
          </template>
          <template #indicator-trailing-text>
            <n-text depth="3">More</n-text>
          </template>
        </n-heatmap>
      </n-scrollbar>
      <n-statistic label="Total Actions" :value="totalActions" />
    </n-flex>
  </n-card>
</template>

<script setup>
import { computed } from 'vue';

const totalActions = computed(() =>
  activityData.value.reduce((sum, item) => sum + (item.value || 0), 0),
);
</script>
```

## Best Practices

1. **Use scrollbar for year view**: Wrap in n-scrollbar for horizontal scrolling

   ```vue
   <n-scrollbar x-scrollable style="max-width: 100%">
     <n-heatmap :data="yearData" />
   </n-scrollbar>
   ```

2. **Choose appropriate color theme**: Use color-theme for quick styling

   ```vue
   <n-heatmap :data="data" color-theme="green" />
   ```

3. **Use mock data for development**: Use heatmapMockData for testing

   ```javascript
   import { heatmapMockData } from 'naive-ui';
   const testData = heatmapMockData(2024);
   ```

4. **Customize tooltips for context**: Provide meaningful tooltip content

   ```vue
   <template #tooltip="{ timestamp, value }">
     <div>{{ value }} activities</div>
   </template>
   ```

5. **Consider first-day-of-week**: Adjust based on regional preferences
   ```vue
   <n-heatmap :data="data" :first-day-of-week="6" />
   <!-- Sunday start -->
   ```
