---
name: n-time
description: A component for formatting and displaying time values with support for relative time, custom formats, time zones, and Unix timestamps.
author: jiaiyan
version: 1.0.0
---

# n-time Component

The `n-time` component is Naive UI's solution for formatting and displaying time values. It supports various display types including date, datetime, and relative time formats.

## When to Use

Use `n-time` when you need to:

- Display formatted dates and times
- Show relative time (e.g., "2 hours ago")
- Format time in different time zones
- Convert and display Unix timestamps
- Apply custom date formatting

## Basic Usage

### Simple Time Display

```vue
<template>
  <n-time :time="Date.now()" />
</template>
```

### Different Types

```vue
<template>
  <n-time :time="timestamp" type="date" />
  <br />
  <n-time :time="timestamp" type="datetime" />
  <br />
  <n-time :time="timestamp" type="relative" />
</template>

<script setup>
const timestamp = Date.now();
</script>
```

### Custom Format

```vue
<template>
  <n-time :time="0" format="yyyy-MM-dd" />
  <br />
  <n-time :time="0" format="yyyy-MM-dd hh:mm" />
  <br />
  <n-time :time="0" format="yyyy-MM-dd hh:mm:ss" />
  <br />
  <n-time :time="0" format="MMMM do, yyyy" />
</template>
```

### Relative Time

```vue
<template>
  <n-time :time="0" :to="86400000" type="relative" />
  <br />
  <n-time :time="0" :to="864000000" type="relative" />
  <br />
  <n-time :time="0" :to="8640000000" type="relative" />
</template>
```

### Unix Timestamp

```vue
<template>
  <n-time :time="4320000" :to="8640000" unix />
  <br />
  <n-time :time="4320000" format="yyyy-MM-dd hh:mm:ss" unix />
</template>
```

### Time Zone Support

```vue
<template>
  Shanghai: <n-time time-zone="Asia/Shanghai" />
  <br />
  New York: <n-time time-zone="America/New_York" />
  <br />
  UTC: <n-time time-zone="UTC" />
</template>
```

## API Reference

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `format` | `string` | `undefined` | Time format string (see [date-fns format](https://date-fns.org/v2.23.0/docs/format)) |
| `time` | `number \| Date` | `Date.now()` | The time value to display |
| `time-zone` | `string` | `undefined` | Time zone for formatting (IANA time zone format) |
| `to` | `number \| Date` | `Date.now()` | Target time for relative time calculation |
| `type` | `'relative' \| 'date' \| 'datetime'` | `'datetime'` | Time display type |
| `unix` | `boolean` | `false` | Whether the time value is a Unix timestamp (seconds) |

## Common Patterns

### Live Relative Time

```vue
<template>
  <n-time :time="createdTime" type="relative" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const createdTime = ref(Date.now());
let timer = null;

onMounted(() => {
  timer = setInterval(() => {
    createdTime.value = Date.now();
  }, 60000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>
```

### Formatted Date Range

```vue
<template>
  <n-space>
    <n-time :time="startTime" format="MMM dd, yyyy" />
    <span>-</span>
    <n-time :time="endTime" format="MMM dd, yyyy" />
  </n-space>
</template>

<script setup>
const startTime = new Date('2024-01-01').getTime();
const endTime = new Date('2024-12-31').getTime();
</script>
```

### Time Zone Selector

```vue
<template>
  <n-space vertical>
    <n-select v-model:value="timezone" :options="timezoneOptions" />
    <n-time
      :time="currentTime"
      :time-zone="timezone"
      format="yyyy-MM-dd HH:mm:ss"
    />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const currentTime = Date.now();
const timezone = ref('UTC');
const timezoneOptions = [
  { label: 'UTC', value: 'UTC' },
  { label: 'New York', value: 'America/New_York' },
  { label: 'London', value: 'Europe/London' },
  { label: 'Tokyo', value: 'Asia/Tokyo' },
  { label: 'Shanghai', value: 'Asia/Shanghai' },
];
</script>
```

### Unix Timestamp Converter

```vue
<template>
  <n-space vertical>
    <n-input-number
      v-model:value="unixTimestamp"
      placeholder="Unix timestamp"
    />
    <n-time
      v-if="unixTimestamp"
      :time="unixTimestamp"
      unix
      format="yyyy-MM-dd HH:mm:ss"
    />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const unixTimestamp = ref(null);
</script>
```

### Activity Log with Relative Time

```vue
<template>
  <n-list>
    <n-list-item v-for="activity in activities" :key="activity.id">
      <n-thing>
        <template #header>{{ activity.title }}</template>
        <template #description>
          <n-time :time="activity.timestamp" type="relative" />
        </template>
        {{ activity.description }}
      </n-thing>
    </n-list-item>
  </n-list>
</template>

<script setup>
const activities = [
  {
    id: 1,
    title: 'User Login',
    description: 'User logged in from Chrome',
    timestamp: Date.now() - 3600000,
  },
  {
    id: 2,
    title: 'File Upload',
    description: 'Uploaded document.pdf',
    timestamp: Date.now() - 7200000,
  },
];
</script>
```

## Best Practices

### 1. Use Relative Time for Recent Events

```vue
<n-time :time="eventTime" type="relative" />
```

### 2. Use Consistent Date Formats

```vue
<n-time :time="time" format="yyyy-MM-dd HH:mm" />
```

### 3. Handle Unix Timestamps Correctly

Remember that Unix timestamps are in seconds, not milliseconds:

```vue
<n-time :time="unixTimestamp" unix />
```

### 4. Consider Time Zones for Global Users

```vue
<n-time :time="time" :time-zone="userTimezone" />
```

### 5. Use Format Strings for Specific Needs

Common format patterns:

| Format                | Output Example      |
| --------------------- | ------------------- |
| `yyyy-MM-dd`          | 2024-01-15          |
| `MM/dd/yyyy`          | 01/15/2024          |
| `MMM dd, yyyy`        | Jan 15, 2024        |
| `HH:mm:ss`            | 14:30:45            |
| `yyyy-MM-dd HH:mm:ss` | 2024-01-15 14:30:45 |
