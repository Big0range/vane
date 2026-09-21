---
name: n-time-picker
description: A time selection component for choosing specific times in Naive UI. Supports 12/24 hour formats, time zones, disabled times, step intervals, and custom formatting.
metadata:
  author: jiaiyan
  version: 1.0.0
---

# n-time-picker Component

The `n-time-picker` component allows users to select a specific time. It supports various time formats, 12-hour mode, time zone handling, and customizable time restrictions.

## When to Use

Use `n-time-picker` when you need to:

- **Time Selection**: Allow users to select a specific time of day
- **Scheduling**: Set times for events, reminders, or appointments
- **Time Input**: Collect time information in forms
- **Time Zone Support**: Handle times across different time zones
- **Restricted Times**: Limit selectable times based on business rules

## Basic Usage

### Basic Time Picker

Simple time selection with default settings.

```vue
<template>
  <n-space>
    <n-time-picker default-formatted-value="09:30:00" />
    <n-time-picker :default-value="timestamp" />
  </n-space>
</template>

<script setup>
const timestamp = 1183135260000;
</script>
```

### With Confirmation

Require user confirmation before applying the selected time.

```vue
<template>
  <n-time-picker
    v-model:value="selectedTime"
    default-formatted-value="09:30:00"
    @confirm="handleConfirm"
  />
  <p>Selected time: {{ formattedTime }}</p>
</template>

<script setup>
import { ref, computed } from 'vue';

const selectedTime = ref(null);

const formattedTime = computed(() => {
  if (!selectedTime.value) return 'Not selected';
  return new Date(selectedTime.value).toLocaleTimeString();
});

const handleConfirm = (value, formattedValue) => {
  console.log('Confirmed time:', formattedValue);
};
</script>
```

### Different Sizes

Time picker supports `small`, `medium`, and `large` sizes.

```vue
<template>
  <n-space vertical>
    <n-time-picker v-model:value="time" size="small" placeholder="Small" />
    <n-time-picker v-model:value="time" size="medium" placeholder="Medium" />
    <n-time-picker v-model:value="time" size="large" placeholder="Large" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const time = ref(null);
</script>
```

### Disabled Time

Restrict which times can be selected.

```vue
<template>
  <n-time-picker
    v-model:value="selectedTime"
    :is-hour-disabled="isHourDisabled"
    :is-minute-disabled="isMinuteDisabled"
    :is-second-disabled="isSecondDisabled"
  />
</template>

<script setup>
import { ref } from 'vue';

const selectedTime = ref(null);

const isHourDisabled = hour => {
  return hour < 9 || hour > 18;
};

const isMinuteDisabled = (minute, hour) => {
  if (hour === 18) return minute > 0;
  return false;
};

const isSecondDisabled = (second, minute, hour) => {
  return second !== 0;
};
</script>
```

### Step Time

Define specific time intervals or allowed values.

```vue
<template>
  <n-time-picker
    v-model:value="time"
    :hours="[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]"
    :minutes="[0, 15, 30, 45]"
    :seconds="[0]"
  />
</template>

<script setup>
import { ref } from 'vue';

const time = ref(null);
</script>
```

### Custom Format

Customize the time display format.

```vue
<template>
  <n-space vertical>
    <n-time-picker v-model:value="time1" format="HH:mm" />
    <n-time-picker v-model:value="time2" format="h:mm a" />
    <n-time-picker v-model:value="time3" format="HH:mm:ss.SSS" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const time1 = ref(null);
const time2 = ref(null);
const time3 = ref(null);
</script>
```

### Custom Actions

Customize the action buttons in the picker panel.

```vue
<template>
  <n-space vertical>
    <n-time-picker v-model:value="time1" :actions="['now', 'clear']" />
    <n-time-picker v-model:value="time2" :actions="['confirm']" />
    <n-time-picker v-model:value="time3" :actions="null" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const time1 = ref(null);
const time2 = ref(null);
const time3 = ref(null);
</script>
```

### 12-Hour Format

Enable 12-hour clock with AM/PM selector.

```vue
<template>
  <n-space>
    <n-time-picker use-12-hours v-model:value="time1" />
    <n-time-picker
      use-12-hours
      :default-value="timestamp"
      v-model:value="time2"
    />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const timestamp = 1183135260000;
const time1 = ref(null);
const time2 = ref(null);
</script>
```

### Formatted Value Binding

Bind to formatted string value instead of timestamp.

```vue
<template>
  <n-time-picker
    v-model:formatted-value="formattedValue"
    value-format="HH:mm:ss"
  />
  <p>Formatted value: {{ formattedValue }}</p>
</template>

<script setup>
import { ref } from 'vue';

const formattedValue = ref('12:30:00');
</script>
```

### Manual Focus Control

Programmatically control focus and blur.

```vue
<template>
  <n-space>
    <n-button @click="focusPicker">Focus</n-button>
    <n-button @click="blurPicker">Blur</n-button>
    <n-time-picker ref="timePickerRef" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const timePickerRef = ref(null);

const focusPicker = () => {
  timePickerRef.value?.focus();
};

const blurPicker = () => {
  timePickerRef.value?.blur();
};
</script>
```

### Validation Status

Display validation status outside of forms.

```vue
<template>
  <n-space vertical>
    <n-time-picker status="warning" placeholder="Warning state" />
    <n-time-picker status="error" placeholder="Error state" />
    <n-time-picker status="success" placeholder="Success state" />
  </n-space>
</template>
```

### Time Zone Support

Display time in different time zones.

```vue
<template>
  <n-grid :cols="3" :x-gap="12">
    <n-gi>
      <n-form-item label="Shanghai" :show-feedback="false">
        <n-time-picker
          v-model:value="value"
          style="width: 100%"
          time-zone="Asia/Shanghai"
        />
      </n-form-item>
    </n-gi>
    <n-gi>
      <n-form-item label="New York" :show-feedback="false">
        <n-time-picker
          v-model:value="value"
          style="width: 100%"
          time-zone="America/New_York"
        />
      </n-form-item>
    </n-gi>
    <n-gi>
      <n-form-item label="UTC" :show-feedback="false">
        <n-time-picker
          v-model:value="value"
          style="width: 100%"
          time-zone="UTC"
        />
      </n-form-item>
    </n-gi>
  </n-grid>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(Date.now());
</script>
```

## API Reference

### n-time-picker Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `actions` | `Array<'clear' \| 'now' \| 'confirm'> \| null` | `['now', 'confirm']` | Action buttons to display |
| `clearable` | `boolean` | `false` | Whether the value can be cleared |
| `default-value` | `number \| null` | `null` | Default value (timestamp in milliseconds) |
| `default-formatted-value` | `string \| null` | `undefined` | Default formatted value |
| `disabled` | `boolean` | `false` | Whether the picker is disabled |
| `format` | `string` | `'HH:mm:ss'` | Time display format (see date-fns format) |
| `formatted-value` | `string \| null` | `undefined` | Formatted value (controlled mode) |
| `hours` | `number \| number[]` | `undefined` | Allowed hours. If number, used as increment step |
| `minutes` | `number \| number[]` | `undefined` | Allowed minutes. If number, used as increment step |
| `seconds` | `number \| number[]` | `undefined` | Allowed seconds. If number, used as increment step |
| `input-readonly` | `boolean` | `false` | Whether input is readonly (not for touch devices) |
| `is-hour-disabled` | `(hour: number) => boolean` | `() => false` | Function to determine if an hour is disabled |
| `is-minute-disabled` | `(minute: number, hour: number \| null) => boolean` | `() => false` | Function to determine if a minute is disabled |
| `is-second-disabled` | `(second: number, minute: number \| null, hour: number \| null) => boolean` | `() => false` | Function to determine if a second is disabled |
| `placeholder` | `string` | `'Select Time'` | Placeholder text |
| `placement` | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'` | `'bottom-start'` | Panel placement |
| `show` | `boolean` | `undefined` | Whether to show the panel |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size |
| `status` | `'success' \| 'warning' \| 'error'` | `undefined` | Validation status |
| `time-zone` | `string` | `undefined` | Time zone for formatting (IANA time zone format) |
| `to` | `string \| HTMLElement \| false` | `body` | Container node for the panel |
| `use-12-hours` | `boolean` | `false` | Whether to use 12-hour format |
| `value` | `number \| null` | `undefined` | Value as timestamp (controlled mode) |
| `value-format` | `string` | follows `format` | Format for formatted-value binding |

### Events

| Name | Parameters | Description |
| --- | --- | --- |
| `on-blur` | `() => void` | Callback when input loses focus |
| `on-clear` | `() => void` | Callback when value is cleared |
| `on-confirm` | `(value: number \| null, formattedValue: string \| null) => void` | Callback when confirm button is clicked |
| `on-focus` | `() => void` | Callback when input gains focus |
| `on-update:formatted-value` | `(value: string \| null, timestampValue: number \| null) => void` | Callback when formatted value changes |
| `on-update:show` | `(show: boolean) => void` | Callback when panel visibility changes |
| `on-update:value` | `(value: number \| null, formattedValue: string \| null) => void` | Callback when value changes |

### Slots

| Name   | Parameters | Description |
| ------ | ---------- | ----------- |
| `icon` | `()`       | Custom icon |

### Methods

| Name    | Type         | Description     |
| ------- | ------------ | --------------- |
| `focus` | `() => void` | Focus the input |
| `blur`  | `() => void` | Blur the input  |

## Common Patterns

### Time Picker in Form

```vue
<template>
  <n-form ref="formRef" :model="formData" :rules="rules">
    <n-form-item label="Start Time" path="startTime">
      <n-time-picker
        v-model:value="formData.startTime"
        format="HH:mm"
        clearable
      />
    </n-form-item>
    <n-form-item label="End Time" path="endTime">
      <n-time-picker
        v-model:value="formData.endTime"
        format="HH:mm"
        :is-hour-disabled="isEndHourDisabled"
        clearable
      />
    </n-form-item>
    <n-form-item>
      <n-button type="primary" @click="handleSubmit">Submit</n-button>
    </n-form-item>
  </n-form>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  startTime: null,
  endTime: null,
});

const rules = {
  startTime: {
    required: true,
    type: 'number',
    message: 'Please select start time',
    trigger: 'blur',
  },
};

const isEndHourDisabled = hour => {
  if (!formData.value.startTime) return false;
  const startHour = new Date(formData.value.startTime).getHours();
  return hour < startHour;
};

const handleSubmit = () => {
  console.log('Form submitted:', formData.value);
};
</script>
```

### Business Hours Picker

```vue
<template>
  <n-time-picker
    v-model:value="businessTime"
    :hours="[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]"
    :minutes="[0, 30]"
    :seconds="[0]"
    format="HH:mm"
    placeholder="Select business hours"
  />
</template>

<script setup>
import { ref } from 'vue';

const businessTime = ref(null);
</script>
```

### Time Range Selection

```vue
<template>
  <n-space>
    <n-time-picker
      v-model:value="startTime"
      placeholder="Start"
      format="HH:mm"
      @update:value="handleStartTimeChange"
    />
    <span>to</span>
    <n-time-picker
      v-model:value="endTime"
      placeholder="End"
      format="HH:mm"
      :is-hour-disabled="isEndHourDisabled"
      :is-minute-disabled="isEndMinuteDisabled"
    />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const startTime = ref(null);
const endTime = ref(null);

const handleStartTimeChange = () => {
  if (endTime.value && startTime.value > endTime.value) {
    endTime.value = null;
  }
};

const isEndHourDisabled = hour => {
  if (!startTime.value) return false;
  const startHour = new Date(startTime.value).getHours();
  return hour < startHour;
};

const isEndMinuteDisabled = (minute, hour) => {
  if (!startTime.value) return false;
  const startDate = new Date(startTime.value);
  const startHour = startDate.getHours();
  const startMinute = startDate.getMinutes();

  if (hour === startHour) {
    return minute <= startMinute;
  }
  return false;
};
</script>
```

### Meeting Scheduler

```vue
<template>
  <n-card title="Schedule Meeting">
    <n-space vertical>
      <n-time-picker
        v-model:formatted-value="meetingTime"
        value-format="HH:mm"
        format="h:mm a"
        use-12-hours
        :minutes="[0, 15, 30, 45]"
        placeholder="Select meeting time"
      />
      <n-tag v-if="meetingTime" type="success">
        Meeting scheduled for {{ meetingTime }}
      </n-tag>
    </n-space>
  </n-card>
</template>

<script setup>
import { ref } from 'vue';

const meetingTime = ref(null);
</script>
```

## Best Practices

### 1. Use Appropriate Format

Choose format based on your use case:

```vue
<template>
  <n-space vertical>
    <n-time-picker format="HH:mm" placeholder="Hours and minutes only" />
    <n-time-picker format="HH:mm:ss" placeholder="Full time" />
    <n-time-picker format="h:mm a" use-12-hours placeholder="12-hour format" />
  </n-space>
</template>
```

### 2. Restrict Times Logically

Disable times that don't make sense for your use case:

```vue
<template>
  <n-time-picker
    :is-hour-disabled="hour => hour < 9 || hour > 17"
    placeholder="Business hours only (9 AM - 5 PM)"
  />
</template>
```

### 3. Use Formatted Value for String Binding

When you need string values instead of timestamps:

```vue
<template>
  <n-time-picker v-model:formatted-value="timeString" value-format="HH:mm:ss" />
</template>
```

### 4. Provide Clear Placeholder

Use descriptive placeholder text:

```vue
<template>
  <n-time-picker placeholder="Select appointment time" />
</template>
```

### 5. Consider Time Zones for Global Apps

Use time zone support for applications with international users:

```vue
<template>
  <n-time-picker v-model:value="time" time-zone="America/New_York" />
</template>
```

### 6. Use Actions Wisely

Customize actions based on user needs:

```vue
<template>
  <n-space vertical>
    <n-time-picker
      :actions="['now', 'confirm']"
      placeholder="Quick selection"
    />
    <n-time-picker
      :actions="['clear', 'confirm']"
      placeholder="With clear option"
    />
    <n-time-picker :actions="null" placeholder="No actions" />
  </n-space>
</template>
```

### 7. Validate Time Ranges

Ensure end times are after start times:

```vue
<template>
  <n-time-picker
    v-model:value="endTime"
    :is-hour-disabled="hour => hour < minHour"
  />
</template>

<script setup>
import { computed } from 'vue';

const minHour = computed(() => {
  if (!startTime.value) return 0;
  return new Date(startTime.value).getHours();
});
</script>
```
