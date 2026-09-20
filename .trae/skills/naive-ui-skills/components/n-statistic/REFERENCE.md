---
name: 'n-statistic'
description: 'Statistic component for displaying statistical values with labels, prefixes, and suffixes. Invoke when user needs to implement statistics displays, metrics dashboards, or data summaries in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Statistic Component

Statistic component for displaying statistical values with labels, prefixes, suffixes, and support for animated numbers.

## When to Use

Use this component when:

- **Dashboard metrics**: Display key performance indicators
- **Data summaries**: Show summary statistics for data sets
- **Analytics displays**: Present analytical results
- **Financial data**: Display monetary values with currency symbols

## When to Invoke

Invoke this skill when:

- User needs to display statistical values
- User wants to show metrics with labels
- User needs prefix or suffix for values
- User wants to combine with number animation
- User asks about tabular number alignment

## Features

- **Label Support**: Add descriptive labels above values
- **Prefix & Suffix**: Add symbols or text before/after values
- **Tabular Numbers**: Align numbers with equal width
- **Slot Support**: Customize all parts of the statistic
- **Animation Compatible**: Works with n-number-animation

## API Reference

### Statistic Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| label | `string` | `undefined` | Label of the statistics. |
| tabular-nums | `boolean` | `false` | Whether to make numbers with same width. |
| value | `string \| number` | `undefined` | Statistics value. |

### Statistic Slots

| Name    | Parameters | Description   |
| ------- | ---------- | ------------- |
| default | `()`       | Value slot.   |
| label   | `()`       | Label slot.   |
| prefix  | `()`       | Value prefix. |
| suffix  | `()`       | Value suffix. |

## Basic Usage

### Basic Statistic

```vue
<template>
  <n-statistic label="Statistic" :value="99" />
</template>
```

### With Prefix

```vue
<template>
  <n-statistic label="Active Users" :value="12345">
    <template #prefix>
      <n-icon>
        <MdPeople />
      </n-icon>
    </template>
  </n-statistic>
</template>
```

### With Suffix

```vue
<template>
  <n-statistic label="Growth Rate" :value="23.5">
    <template #suffix>%</template>
  </n-statistic>
</template>
```

### With Prefix and Suffix

```vue
<template>
  <n-statistic label="Total Revenue" :value="1234567.89">
    <template #prefix>$</template>
    <template #suffix>USD</template>
  </n-statistic>
</template>
```

### Tabular Numbers

```vue
<template>
  <n-space>
    <n-statistic label="Value A" tabular-nums :value="12345" />
    <n-statistic label="Value B" tabular-nums :value="67890" />
  </n-space>
</template>
```

### Custom Label Slot

```vue
<template>
  <n-statistic :value="100">
    <template #label>
      <n-space align="center">
        <n-icon><TrendingUpIcon /></n-icon>
        <span>Custom Label</span>
      </n-space>
    </template>
  </n-statistic>
</template>
```

## Common Patterns

### Dashboard Statistics

```vue
<template>
  <n-grid :cols="4" :x-gap="16">
    <n-gi>
      <n-card>
        <n-statistic label="Total Users" tabular-nums>
          <template #prefix>
            <n-icon><UsersIcon /></n-icon>
          </template>
          {{ stats.totalUsers }}
        </n-statistic>
      </n-card>
    </n-gi>
    <n-gi>
      <n-card>
        <n-statistic label="Revenue" tabular-nums>
          <template #prefix>$</template>
          {{ stats.revenue }}
        </n-statistic>
      </n-card>
    </n-gi>
    <n-gi>
      <n-card>
        <n-statistic label="Orders" tabular-nums>
          <template #prefix>
            <n-icon><CartIcon /></n-icon>
          </template>
          {{ stats.orders }}
        </n-statistic>
      </n-card>
    </n-gi>
    <n-gi>
      <n-card>
        <n-statistic label="Growth" tabular-nums>
          {{ stats.growth }}
          <template #suffix>%</template>
        </n-statistic>
      </n-card>
    </n-gi>
  </n-grid>
</template>

<script setup>
import { ref } from 'vue';

const stats = ref({
  totalUsers: '12,345',
  revenue: '98,765',
  orders: '1,234',
  growth: '23.5',
});
</script>
```

### With Number Animation

```vue
<template>
  <n-statistic label="Animated Value" tabular-nums>
    <n-number-animation
      ref="numberAnimationRef"
      :from="0"
      :to="10000"
      show-separator
      :active="false"
    />
  </n-statistic>
  <n-button @click="play">Play Animation</n-button>
</template>

<script setup>
import { ref } from 'vue';

const numberAnimationRef = ref(null);

const play = () => {
  numberAnimationRef.value?.play();
};
</script>
```

### Comparison Statistics

```vue
<template>
  <n-space vertical>
    <n-statistic label="Current Month" tabular-nums>
      <template #prefix>$</template>
      {{ currentMonth }}
    </n-statistic>
    <n-space>
      <n-text>vs Last Month: </n-text>
      <n-text :type="changeType"> {{ changeSign }}{{ lastMonth }} </n-text>
    </n-space>
  </n-space>
</template>

<script setup>
import { ref, computed } from 'vue';

const currentMonth = ref(12500);
const lastMonth = ref(10000);

const changeType = computed(() =>
  currentMonth.value >= lastMonth.value ? 'success' : 'error',
);

const changeSign = computed(() =>
  currentMonth.value >= lastMonth.value ? '+' : '',
);
</script>
```

### Statistics in Card

```vue
<template>
  <n-card title="Performance Overview">
    <n-grid :cols="3" :x-gap="24">
      <n-gi>
        <n-statistic label="Page Views" tabular-nums>
          <template #prefix>
            <n-icon color="#18a058"><EyeIcon /></n-icon>
          </template>
          123,456
        </n-statistic>
      </n-gi>
      <n-gi>
        <n-statistic label="Unique Visitors" tabular-nums>
          <template #prefix>
            <n-icon color="#2080f0"><UserIcon /></n-icon>
          </template>
          45,678
        </n-statistic>
      </n-gi>
      <n-gi>
        <n-statistic label="Bounce Rate" tabular-nums>
          <template #prefix>
            <n-icon color="#f0a020"><ChartIcon /></n-icon>
          </template>
          32.5
          <template #suffix>%</template>
        </n-statistic>
      </n-gi>
    </n-grid>
  </n-card>
</template>
```

### Real-time Statistics

```vue
<template>
  <n-statistic label="Live Viewers" tabular-nums>
    <n-number-animation
      :from="previousValue"
      :to="currentValue"
      :duration="500"
    />
    <template #suffix>
      <n-badge dot :type="isIncreasing ? 'success' : 'error'" />
    </template>
  </n-statistic>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const currentValue = ref(1000);
const previousValue = ref(1000);
const isIncreasing = ref(true);
let interval = null;

onMounted(() => {
  interval = setInterval(() => {
    previousValue.value = currentValue.value;
    const change = Math.floor(Math.random() * 100) - 50;
    currentValue.value = Math.max(0, currentValue.value + change);
    isIncreasing.value = change > 0;
  }, 2000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>
```

### Currency Statistics

```vue
<template>
  <n-space vertical>
    <n-statistic label="Total Balance" tabular-nums>
      <template #prefix>
        <n-text type="success">$</n-text>
      </template>
      {{ formatCurrency(balance) }}
    </n-statistic>
    <n-divider />
    <n-grid :cols="2">
      <n-gi>
        <n-statistic label="Income" tabular-nums>
          <template #prefix>
            <n-text type="success">+$</n-text>
          </template>
          {{ formatCurrency(income) }}
        </n-statistic>
      </n-gi>
      <n-gi>
        <n-statistic label="Expenses" tabular-nums>
          <template #prefix>
            <n-text type="error">-$</n-text>
          </template>
          {{ formatCurrency(expenses) }}
        </n-statistic>
      </n-gi>
    </n-grid>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const balance = ref(12345.67);
const income = ref(5000.0);
const expenses = ref(2345.33);

const formatCurrency = value => {
  return value.toLocaleString('en-US', { minimumFractionDigits: 2 });
};
</script>
```

### Progress Statistics

```vue
<template>
  <n-space vertical>
    <n-statistic label="Completion Rate" tabular-nums>
      {{ completed }} / {{ total }}
      <template #suffix> ({{ percentage }}%) </template>
    </n-statistic>
    <n-progress type="line" :percentage="percentage" :show-indicator="false" />
  </n-space>
</template>

<script setup>
import { ref, computed } from 'vue';

const completed = ref(75);
const total = ref(100);

const percentage = computed(() =>
  Math.round((completed.value / total.value) * 100),
);
</script>
```

## Best Practices

1. **Use tabular-nums for number alignment**: Ensure consistent number width

   ```vue
   <n-statistic tabular-nums :value="12345" />
   ```

2. **Add context with labels**: Always provide descriptive labels

   ```vue
   <n-statistic label="Monthly Revenue" :value="50000" />
   ```

3. **Use prefix for currency symbols**: Place currency in prefix slot

   ```vue
   <n-statistic :value="1234.56">
     <template #prefix>$</template>
   </n-statistic>
   ```

4. **Combine with n-number-animation**: Create animated statistics

   ```vue
   <n-statistic label="Total">
     <n-number-animation :from="0" :to="1000" />
   </n-statistic>
   ```

5. **Use icons in prefix/suffix**: Add visual indicators

   ```vue
   <n-statistic :value="100">
     <template #prefix>
       <n-icon><UserIcon /></n-icon>
     </template>
   </n-statistic>
   ```

6. **Group related statistics**: Use grid layout for dashboards

   ```vue
   <n-grid :cols="4">
     <n-gi v-for="stat in stats" :key="stat.label">
       <n-statistic :label="stat.label" :value="stat.value" />
     </n-gi>
   </n-grid>
   ```

7. **Use cards for visual separation**: Wrap statistics in cards
   ```vue
   <n-card>
     <n-statistic label="Key Metric" :value="value" />
   </n-card>
   ```
