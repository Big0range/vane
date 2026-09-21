---
name: n-date-picker
description: A comprehensive date picker component supporting various date types (date, datetime, range, month, year, quarter, week) with formatting, validation, shortcuts, and async operations
author: jiaiyan
version: 1.0.0
---

# n-date-picker Component

The `n-date-picker` component is a comprehensive date selection component that supports multiple date types including date, datetime, date range, month, year, quarter, and week. It offers extensive customization for formatting, validation, shortcuts, and panel behavior.

## When to Use

Use `n-date-picker` when you need to:

- Collect date or datetime input from users
- Select date ranges for filtering or scheduling
- Choose months, years, quarters, or weeks
- Format dates in specific patterns
- Disable specific dates or time ranges
- Provide quick selection shortcuts
- Integrate with forms for date validation

## Basic Usage

### Date Picker

```vue
<template>
  <n-date-picker v-model:value="timestamp" type="date" />
</template>

<script setup>
import { ref } from 'vue';

const timestamp = ref(null);
</script>
```

### DateTime Picker

```vue
<template>
  <n-date-picker v-model:value="timestamp" type="datetime" clearable />
</template>
```

### Date Range Picker

```vue
<template>
  <n-date-picker v-model:value="range" type="daterange" clearable />
</template>

<script setup>
import { ref } from 'vue';

const range = ref([null, null]);
</script>
```

### Different Sizes

```vue
<template>
  <n-space vertical>
    <n-date-picker v-model:value="timestamp" size="small" type="date" />
    <n-date-picker v-model:value="timestamp" size="medium" type="date" />
    <n-date-picker v-model:value="timestamp" size="large" type="date" />
  </n-space>
</template>
```

## API Reference

### General Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `v-model:value` | `number \| [number, number] \| null` | `undefined` | Value as timestamp (ms). |
| `clearable` | `boolean` | `false` | Whether the picker is clearable. |
| `default-value` | `number \| [number, number] \| null` | `undefined` | Default value. |
| `disabled` | `boolean` | `false` | Whether the picker is disabled. |
| `first-day-of-week` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `undefined` | First day of week (0 = Monday). |
| `input-readonly` | `boolean` | `false` | Set readonly on input. |
| `panel` | `boolean` | `false` | Use as panel only (no input). |
| `placement` | `'top-start' \| 'top' \| ...` | `'bottom-start'` | Panel placement. |
| `placeholder` | `string` | Type-specific | Placeholder text. |
| `shortcuts` | `Record<string, number \| (() => number)>` | `undefined` | Shortcut buttons. |
| `show` | `boolean` | `undefined` | Whether to show panel. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Picker size. |
| `status` | `'success' \| 'warning' \| 'error'` | `undefined` | Validation status. |
| `to` | `string \| HTMLElement \| false` | `body` | Panel container. |
| `type` | `'date' \| 'datetime' \| 'daterange' \| ...` | `'date'` | Picker type. |
| `value-format` | `string` | Follows `format` | Format of binding value. |
| `format` | `string` | Type-specific | Display format. |

### Date Type Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `actions` | `Array<'clear' \| 'now'> \| null` | `['clear', 'now']` | Panel actions. |
| `is-date-disabled` | `(current, detail) => boolean` | `() => false` | Date validator. |
| `fast-year-select` | `boolean` | `false` | Close panel after year select. |
| `fast-month-select` | `boolean` | `false` | Close panel after month select. |

### DateTime Type Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `actions` | `Array<'clear' \| 'now' \| 'confirm'> \| null` | `['clear', 'now', 'confirm']` | Panel actions. |
| `default-time` | `string \| (timestamp) => string` | `undefined` | Default time for selected date. |
| `is-time-disabled` | `(current) => {...}` | `undefined` | Time validator. |
| `time-picker-props` | `TimePickerProps` | `undefined` | Time picker props. |
| `update-value-on-close` | `boolean` | `false` | Update value on panel close. |

### DateRange Type Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `actions` | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` | Panel actions. |
| `bind-calendar-months` | `boolean` | `false` | Consecutive calendar months. |
| `start-placeholder` | `string` | `'Start Date'` | Start placeholder. |
| `end-placeholder` | `string` | `'End Date'` | End placeholder. |
| `separator` | `string` | internal icon | Range separator. |
| `close-on-select` | `boolean` | `false` | Close after selection. |
| `update-value-on-close` | `boolean` | `false` | Update on close. |

### Events

| Name | Parameters | Description |
| --- | --- | --- |
| `update:value` | `(value, formattedValue)` | Triggered when value changes. |
| `update:formatted-value` | `(value, timestampValue)` | Triggered for formatted value. |
| `update:show` | `(show: boolean)` | Triggered when panel shows/hides. |
| `blur` | `()` | Triggered on blur. |
| `focus` | `()` | Triggered on focus. |
| `clear` | `()` | Triggered on clear. |
| `confirm` | `(value, formattedValue)` | Triggered on confirm. |
| `prev-month` | `()` | Triggered on previous month click. |
| `next-month` | `()` | Triggered on next month click. |
| `prev-year` | `()` | Triggered on previous year click. |
| `next-year` | `()` | Triggered on next year click. |

### Slots

| Name         | Parameters                      | Description                 |
| ------------ | ------------------------------- | --------------------------- |
| `date-icon`  | `()`                            | Date icon in input.         |
| `footer`     | `()`                            | Extra footer content.       |
| `separator`  | `()`                            | Separator for range picker. |
| `prev-month` | `()`                            | Previous month icon.        |
| `next-month` | `()`                            | Next month icon.            |
| `prev-year`  | `()`                            | Previous year icon.         |
| `next-year`  | `()`                            | Next year icon.             |
| `clear`      | `{ onClear, text }`             | Clear button.               |
| `confirm`    | `{ onConfirm, disabled, text }` | Confirm button.             |
| `now`        | `{ onNow, text }`               | Now button.                 |

### Methods

| Name    | Type         | Description       |
| ------- | ------------ | ----------------- |
| `focus` | `() => void` | Focus the picker. |
| `blur`  | `() => void` | Blur the picker.  |

## Common Patterns

### Formatted Value Binding

```vue
<template>
  <n-date-picker
    v-model:formatted-value="formattedValue"
    value-format="yyyy-MM-dd HH:mm:ss"
    type="datetime"
    clearable
  />
</template>

<script setup>
import { ref } from 'vue';

const formattedValue = ref(null);
</script>
```

### Date Range with Shortcuts

```vue
<template>
  <n-date-picker
    v-model:value="range"
    type="daterange"
    :shortcuts="shortcuts"
  />
</template>

<script setup>
import { ref } from 'vue';

const range = ref(null);

const shortcuts = {
  Today: () => {
    const now = Date.now();
    return [now, now];
  },
  'Last 7 Days': () => {
    const now = Date.now();
    return [now - 7 * 86400000, now];
  },
  'Last 30 Days': () => {
    const now = Date.now();
    return [now - 30 * 86400000, now];
  },
};
</script>
```

### Disabled Specific Dates

```vue
<template>
  <n-space vertical>
    <n-date-picker type="date" :is-date-disabled="isDateDisabled" />
    <n-date-picker type="daterange" :is-date-disabled="isRangeDateDisabled" />
  </n-space>
</template>

<script setup>
const isDateDisabled = ts => {
  const date = new Date(ts);
  return date.getDate() <= 15;
};

const isRangeDateDisabled = (ts, phase, value) => {
  if (!value) return false;
  const [start] = value;
  if (phase === 'end' && start) {
    return ts < start + 7 * 86400000;
  }
  return false;
};
</script>
```

### Default Time for DateTime

```vue
<template>
  <n-space vertical>
    <n-date-picker type="datetime" default-time="13:22:11" clearable />
    <n-date-picker
      type="datetimerange"
      :default-time="['09:00:00', '18:00:00']"
      clearable
    />
  </n-space>
</template>
```

### Custom Actions

```vue
<template>
  <n-space vertical>
    <n-date-picker v-model:value="ts1" type="date" :actions="['now']" />
    <n-date-picker v-model:value="ts2" type="datetime" :actions="['now']" />
    <n-date-picker
      v-model:value="range"
      type="daterange"
      :actions="null"
      update-value-on-close
    />
  </n-space>
</template>
```

### Panel Only Mode

```vue
<template>
  <n-date-picker panel type="date" v-model:value="value" />
</template>
```

### Custom Format

```vue
<template>
  <n-date-picker
    v-model:value="timestamp"
    type="datetime"
    format="yyyy/MM/dd HH:mm"
    clearable
  />
</template>
```

### Month, Year, Quarter, Week Pickers

```vue
<template>
  <n-space vertical>
    <n-date-picker v-model:value="month" type="month" clearable />
    <n-date-picker v-model:value="year" type="year" clearable />
    <n-date-picker v-model:value="quarter" type="quarter" clearable />
    <n-date-picker v-model:value="week" type="week" clearable />
  </n-space>
</template>
```

### Using Methods via Ref

```vue
<template>
  <n-space item-style="display: flex; align-item: center;">
    <n-button @click="handleClick">Focus then blur in 1 second</n-button>
    <n-date-picker ref="datePickerRef" style="width: 200px" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const datePickerRef = ref(null);

const handleClick = () => {
  datePickerRef.value?.focus();
  setTimeout(() => {
    datePickerRef.value?.blur();
  }, 1000);
};
</script>
```

### Custom Icons

```vue
<template>
  <n-date-picker type="date">
    <template #date-icon>
      <n-icon :size="16" :component="RocketOutline" />
    </template>
  </n-date-picker>
</template>

<script setup>
import { RocketOutline } from '@vicons/ionicons5';
</script>
```

## Best Practices

1. **Use timestamps for value binding**: The component uses millisecond timestamps for consistent date handling.

2. **Use `formatted-value` for string values**: When you need string values (e.g., for API), use `v-model:formatted-value` with `value-format`.

3. **Implement shortcuts for common selections**: Provide shortcuts for frequently used date ranges to improve UX.

4. **Use `is-date-disabled` for validation**: Disable invalid dates proactively rather than showing errors after selection.

5. **Set `update-value-on-close` for range pickers**: This prevents intermediate updates during range selection.

6. **Use `panel` mode for embedded calendars**: When embedding in custom UI, use `panel` mode without the input field.

7. **Configure `first-day-of-week` for locale**: Set appropriately for your target audience (0 = Monday, 6 = Sunday).

8. **Use `default-time` for consistent datetime selection**: Set default times to ensure consistent datetime values.

9. **Leverage `fast-year-select` and `fast-month-select`**: Enable these for quicker date selection in forms.
