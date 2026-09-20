---
name: 'n-calendar'
description: 'Calendar component for displaying and selecting dates. Invoke when user needs to implement date selection, date display, or calendar-based interfaces in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Calendar Component

Calendar component for displaying dates with customizable content and date selection.

## When to Use

Use this component when:

- **Date selection**: Allow users to select a specific date
- **Date display**: Show calendar views with custom content per date
- **Scheduling interfaces**: Display events or schedules on a calendar
- **Date-based navigation**: Navigate through dates in applications

## When to Invoke

Invoke this skill when:

- User needs to implement a calendar with date selection
- User wants to display custom content for each date cell
- User needs to disable specific dates
- User wants to customize the calendar header
- User asks about handling date changes or panel changes

## Features

- **Date Selection**: Select a single date with v-model binding
- **Custom Cell Content**: Render custom content in each date cell
- **Date Validation**: Disable specific dates using validation function
- **Custom Header**: Customize the calendar header
- **Panel Navigation**: Navigate between months and years
- **Timestamp-based**: Uses timestamps for date values

## API Reference

### Calendar Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| default-value | `number` | `null` | Default selected date's timestamp. |
| is-date-disabled | `(timestamp: number) => boolean` | `undefined` | Validator of the date. |
| value | `number \| null` | `undefined` | Selected date's timestamp. |
| on-panel-change | `(info: { year: number, month: number })` | `undefined` | Callback on panel content is changed. |
| on-update:value | `(timestamp: number, info: { year: number, month: number, date: number }) => void` | `undefined` | Callback on date is selected. `month` starts from 1. |

### Calendar Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `({ year: number, month: number, date: number })` | Content to be rendered in each date cell. |
| header | `(props: { year: number, month: number })` | Header of the calendar. `month` starts from 1. |

## Basic Usage

### Basic Calendar

```vue
<template>
  <n-calendar
    v-model:value="value"
    #="{ year, month, date }"
    :is-date-disabled="isDateDisabled"
    @update:value="handleUpdateValue"
  >
    {{ year }}-{{ month }}-{{ date }}
  </n-calendar>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(Date.now());

const isDateDisabled = timestamp => {
  if (timestamp < Date.now()) {
    return true;
  }
  return false;
};

const handleUpdateValue = (timestamp, { year, month, date }) => {
  console.log(`Selected: ${year}-${month}-${date}`);
};
</script>
```

### Calendar with Custom Header

```vue
<template>
  <n-calendar v-model:value="value">
    <template #header="{ year, month }">
      <div
        style="display: flex; justify-content: space-between; align-items: center;"
      >
        <n-button @click="handlePrevMonth">Previous</n-button>
        <span>{{ year }} - {{ month }}</span>
        <n-button @click="handleNextMonth">Next</n-button>
      </div>
    </template>
    <template #default="{ year, month, date }">
      <div v-if="hasEvent(year, month, date)">
        <n-badge dot />
      </div>
      {{ date }}
    </template>
  </n-calendar>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(Date.now());

const hasEvent = (year, month, date) => {
  return false;
};

const handlePrevMonth = () => {};
const handleNextMonth = () => {};
</script>
```

## Common Patterns

### Disable Past Dates

```vue
<template>
  <n-calendar v-model:value="value" :is-date-disabled="isDateDisabled" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref(Date.now());

const isDateDisabled = timestamp => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return timestamp < today.getTime();
};
</script>
```

### Disable Weekends

```vue
<template>
  <n-calendar v-model:value="value" :is-date-disabled="isDateDisabled" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref(Date.now());

const isDateDisabled = timestamp => {
  const date = new Date(timestamp);
  const day = date.getDay();
  return day === 0 || day === 6;
};
</script>
```

### Display Events on Calendar

```vue
<template>
  <n-calendar v-model:value="value">
    <template #default="{ year, month, date }">
      <div class="calendar-cell">
        <span>{{ date }}</span>
        <div v-for="event in getEvents(year, month, date)" :key="event.id">
          <n-tag size="small" :type="event.type">
            {{ event.title }}
          </n-tag>
        </div>
      </div>
    </template>
  </n-calendar>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(Date.now());

const events = [
  { id: 1, date: '2024-01-15', title: 'Meeting', type: 'info' },
  { id: 2, date: '2024-01-20', title: 'Deadline', type: 'warning' },
];

const getEvents = (year, month, date) => {
  const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
  return events.filter(e => e.date === dateStr);
};
</script>
```

### Track Panel Changes

```vue
<template>
  <n-calendar v-model:value="value" @panel-change="handlePanelChange" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref(Date.now());

const handlePanelChange = ({ year, month }) => {
  console.log(`Viewing: ${year}-${month}`);
};
</script>
```

## Best Practices

1. **Use timestamp for date values**: The calendar uses timestamps for all date operations

   ```vue
   <n-calendar v-model:value="selectedTimestamp" />
   ```

2. **Disable dates efficiently**: Use the `is-date-disabled` prop for validation

   ```vue
   <n-calendar :is-date-disabled="ts => ts < Date.now()" />
   ```

3. **Custom cell content**: Use the default slot for rich date cell content

   ```vue
   <n-calendar #default="{ date }">
     {{ date }}
   </n-calendar>
   ```

4. **Handle date selection**: Use `on-update:value` for side effects

   ```vue
   <n-calendar @update:value="handleDateSelect" />
   ```

5. **Remember month indexing**: The `month` parameter starts from 1, not 0
