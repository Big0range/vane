---
name: 'n-countdown'
description: 'Countdown component for displaying time countdown. Invoke when user needs to implement countdown timers, deadlines, or time-based displays in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Countdown Component

Countdown component for displaying time-based countdown with customizable precision and rendering.

## When to Use

Use this component when:

- **Countdown timers**: Display time remaining for events or deadlines
- **Promotional campaigns**: Show time-limited offers
- **Session timeouts**: Warn users about session expiration
- **Time tracking**: Display elapsed or remaining time

## When to Invoke

Invoke this skill when:

- User needs to implement a countdown timer
- User wants to customize countdown display
- User needs precise time display (milliseconds)
- User wants to handle countdown completion
- User asks about resetting or controlling countdown state

## Features

- **Configurable Duration**: Set countdown duration in milliseconds
- **Precision Control**: Display time with 0-3 decimal precision
- **Active Control**: Start/stop countdown programmatically
- **Custom Rendering**: Fully customize countdown display
- **Reset Support**: Reset countdown to initial state
- **Completion Callback**: Handle countdown finish event

## API Reference

### Countdown Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| active | `boolean` | `true` | Whether countdown is active. |
| duration | `number` | `0` | The duration of the countdown (unit is millisecond). Not reactive. |
| precision | `0 \| 1 \| 2 \| 3` | `0` | The precision of the second. |
| render | `(props: { hours: number, minutes: number, seconds: number, milliseconds: number }) => VNodeChild` | `undefined` | Time's render function. |
| on-finish | `() => void` | `undefined` | The callback on countdown is finished. |

### Countdown Methods

| Name  | Type         | Description      |
| ----- | ------------ | ---------------- |
| reset | `() => void` | Reset countdown. |

## Basic Usage

### Basic Countdown

```vue
<template>
  <n-space>
    <span style="font-variant-numeric: tabular-nums">
      <n-countdown :duration="5000" :active="active" />
    </span>
    <n-switch v-model:value="active" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const active = ref(true);
</script>
```

### Precision Control

```vue
<template>
  <n-space>
    <span style="font-variant-numeric: tabular-nums; white-space: nowrap">
      <n-countdown :duration="3600 * 1000" :active="active" />
    </span>
    <span style="font-variant-numeric: tabular-nums; white-space: nowrap">
      <n-countdown :duration="3600 * 1000" :active="active" :precision="1" />
    </span>
    <span style="font-variant-numeric: tabular-nums; white-space: nowrap">
      <n-countdown :duration="3600 * 1000" :active="active" :precision="2" />
    </span>
    <span style="font-variant-numeric: tabular-nums; white-space: nowrap">
      <n-countdown :duration="3600 * 1000" :active="active" :precision="3" />
    </span>
    <n-switch v-model:value="active" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const active = ref(true);
</script>
```

### Custom Rendering

```vue
<template>
  <n-space item-style="display: flex; align-items: center;">
    <n-statistic label="Countdown" tabular-nums>
      <n-countdown
        :render="renderCountdown"
        :duration="996 * 1000"
        :active="active"
      />
    </n-statistic>
    <n-switch v-model:value="active" />
  </n-space>
</template>

<script setup>
import { ref, h } from 'vue';

const active = ref(true);

const renderCountdown = ({ hours, minutes, seconds, milliseconds }) => {
  return h('span', {}, [
    h('span', { style: { color: 'red' } }, hours),
    'h ',
    h('span', { style: { color: 'green' } }, minutes),
    'm ',
    h('span', { style: { color: 'blue' } }, seconds),
    's',
  ]);
};
</script>
```

### Reset Countdown

```vue
<template>
  <n-space>
    <span style="font-variant-numeric: tabular-nums">
      <n-countdown ref="countdown" :duration="86400000" :active="active" />
    </span>
    <n-button size="tiny" @click="handleReset"> Reset </n-button>
    <n-switch v-model:value="active" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const active = ref(true);
const countdown = ref(null);

const handleReset = () => {
  countdown.value?.reset();
};
</script>
```

## Common Patterns

### Countdown with Finish Handler

```vue
<template>
  <div>
    <n-countdown
      v-if="!finished"
      :duration="10000"
      :active="active"
      @finish="handleFinish"
    />
    <n-alert v-else type="success" title="Time's up!">
      The countdown has finished.
    </n-alert>
    <n-switch v-model:value="active" :disabled="finished" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const active = ref(true);
const finished = ref(false);

const handleFinish = () => {
  finished.value = true;
};
</script>
```

### Sale Countdown

```vue
<template>
  <n-card title="Flash Sale Ends In">
    <n-statistic tabular-nums>
      <n-countdown
        :duration="remainingTime"
        :active="saleActive"
        @finish="handleSaleEnd"
      />
    </n-statistic>
    <template #footer>
      <n-button type="primary" :disabled="!saleActive"> Shop Now </n-button>
    </template>
  </n-card>
</template>

<script setup>
import { ref, computed } from 'vue';

const saleEndTime = new Date();
saleEndTime.setHours(saleEndTime.getHours() + 24);

const remainingTime = computed(() => saleEndTime.getTime() - Date.now());
const saleActive = ref(true);

const handleSaleEnd = () => {
  saleActive.value = false;
};
</script>
```

### Session Timeout Warning

```vue
<template>
  <n-alert v-if="showWarning" type="warning" title="Session Expiring">
    Your session will expire in:
    <n-countdown
      :duration="timeoutDuration"
      :active="true"
      @finish="handleTimeout"
    />
    <n-button size="small" @click="extendSession"> Extend Session </n-button>
  </n-alert>
</template>

<script setup>
import { ref } from 'vue';

const showWarning = ref(true);
const timeoutDuration = ref(5 * 60 * 1000);

const handleTimeout = () => {
  showWarning.value = false;
  console.log('Session expired');
};

const extendSession = () => {
  timeoutDuration.value = 5 * 60 * 1000;
};
</script>
```

### Custom Styled Countdown

```vue
<template>
  <div class="countdown-container">
    <n-countdown :duration="3600000" :render="renderStyledCountdown" />
  </div>
</template>

<script setup>
import { h } from 'vue';

const renderStyledCountdown = ({ hours, minutes, seconds }) => {
  const renderUnit = (value, label) => {
    return h('div', { class: 'countdown-unit' }, [
      h('div', { class: 'countdown-value' }, String(value).padStart(2, '0')),
      h('div', { class: 'countdown-label' }, label),
    ]);
  };

  return h('div', { class: 'countdown-wrapper' }, [
    renderUnit(hours, 'Hours'),
    h('span', { class: 'countdown-separator' }, ':'),
    renderUnit(minutes, 'Minutes'),
    h('span', { class: 'countdown-separator' }, ':'),
    renderUnit(seconds, 'Seconds'),
  ]);
};
</script>

<style scoped>
.countdown-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}
.countdown-unit {
  text-align: center;
}
.countdown-value {
  font-size: 24px;
  font-weight: bold;
}
.countdown-label {
  font-size: 12px;
  color: #999;
}
.countdown-separator {
  font-size: 24px;
  font-weight: bold;
}
</style>
```

## Best Practices

1. **Use tabular-nums for alignment**: Apply `font-variant-numeric: tabular-nums` for consistent digit width

   ```vue
   <span style="font-variant-numeric: tabular-nums">
     <n-countdown :duration="60000" />
   </span>
   ```

2. **Handle completion**: Always handle the finish event for user feedback

   ```vue
   <n-countdown :duration="10000" @finish="handleFinish" />
   ```

3. **Control active state**: Use the `active` prop to pause/resume countdown

   ```vue
   <n-countdown :duration="60000" :active="isRunning" />
   ```

4. **Use ref for reset**: Access the reset method via template ref

   ```vue
   <n-countdown ref="countdownRef" :duration="60000" />
   <n-button @click="countdownRef?.reset()">Reset</n-button>
   ```

5. **Duration is not reactive**: The `duration` prop is not reactive, use reset to restart

   ```vue
   <n-countdown ref="countdown" :duration="fixedDuration" />
   ```

6. **Custom rendering for complex UI**: Use the `render` prop for custom layouts
   ```vue
   <n-countdown :render="customRenderer" :duration="60000" />
   ```
