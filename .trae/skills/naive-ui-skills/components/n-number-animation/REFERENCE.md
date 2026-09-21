---
name: 'n-number-animation'
description: 'Number Animation component for animating number transitions with customizable duration, precision, and formatting. Invoke when user needs to implement animated number counters, statistics displays, or number transitions in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Number Animation Component

Number Animation component for animating number transitions with customizable duration, precision, separators, and internationalization support.

## When to Use

Use this component when:

- **Statistics displays**: Animate statistical numbers for visual impact
- **Counters**: Create animated counters that transition between values
- **Dashboard metrics**: Display changing metrics with smooth animations
- **Financial data**: Show currency or financial figures with formatting

## When to Invoke

Invoke this skill when:

- User needs to animate number transitions
- User wants to create animated counters
- User needs number formatting with separators
- User wants to control animation timing
- User asks about number animation with precision

## Features

- **Smooth Transitions**: Animate from one number to another
- **Precision Control**: Set decimal precision for displayed values
- **Number Separators**: Show thousands separators for large numbers
- **Internationalization**: Format numbers according to locale
- **Animation Control**: Control animation duration and trigger
- **Finish Callback**: Execute code when animation completes

## API Reference

### NumberAnimation Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| active | `boolean` | `true` | Whether to play the animation. |
| duration | `number` | `3000` | The duration of animation in milliseconds. |
| from | `number` | `0` | Start value of the animation. |
| locale | `string` | Follows config provider. | Language of the number. |
| precision | `number` | `0` | Decimal precision of the displayed value. |
| show-separator | `boolean` | `false` | Whether to show thousands separator. |
| to | `number` | `undefined` | Target value. |
| on-finish | `() => void` | `undefined` | The callback when animation is finished. |

### NumberAnimation Methods

| Name | Parameters | Description         |
| ---- | ---------- | ------------------- |
| play | `()`       | Play the animation. |

## Basic Usage

### Basic Animation

```vue
<template>
  <n-statistic label="Well" tabular-nums>
    <n-number-animation
      ref="numberAnimationInstRef"
      :from="0"
      :to="100"
      :active="false"
    />
  </n-statistic>
  <n-button @click="handleClick"> Play </n-button>
</template>

<script setup>
import { ref } from 'vue';

const numberAnimationInstRef = ref(null);

const handleClick = () => {
  numberAnimationInstRef.value?.play();
};
</script>
```

### With Precision

```vue
<template>
  <n-statistic label="Precision Demo" tabular-nums>
    <n-number-animation
      ref="numberAnimationInstRef"
      :from="0.0"
      :to="24.56"
      :active="false"
      :precision="2"
    />
  </n-statistic>
  <n-button @click="handleClick"> Play </n-button>
</template>

<script setup>
import { ref } from 'vue';

const numberAnimationInstRef = ref(null);

const handleClick = () => {
  numberAnimationInstRef.value?.play();
};
</script>
```

### With Separator

```vue
<template>
  <n-statistic label="A little goal" tabular-nums>
    <n-number-animation
      ref="numberAnimationInstRef"
      show-separator
      :from="0"
      :to="100000000"
      :active="false"
    />
  </n-statistic>
  <n-button @click="handleClick"> Play </n-button>
</template>

<script setup>
import { ref } from 'vue';

const numberAnimationInstRef = ref(null);

const handleClick = () => {
  numberAnimationInstRef.value?.play();
};
</script>
```

### With Locale

```vue
<template>
  <n-statistic label="ru-RU" tabular-nums>
    <n-number-animation
      ref="numberAnimationInstRef"
      :from="0.0"
      :to="699700.699"
      :active="false"
      :precision="3"
      locale="ru-RU"
      show-separator
    />
  </n-statistic>
  <n-button @click="handleClick"> Play </n-button>
</template>

<script setup>
import { ref } from 'vue';

const numberAnimationInstRef = ref(null);

const handleClick = () => {
  numberAnimationInstRef.value?.play();
};
</script>
```

### With Finish Callback

```vue
<template>
  <n-statistic label="Post message on finish" tabular-nums>
    <n-number-animation
      ref="numberAnimationInstRef"
      show-separator
      :from="0"
      :to="100000000"
      :active="false"
      @finish="handleFinish"
    />
  </n-statistic>
  <n-button @click="handleClick"> Play </n-button>
</template>

<script setup>
import { ref } from 'vue';
import { useMessage } from 'naive-ui';

const message = useMessage();
const numberAnimationInstRef = ref(null);

const handleClick = () => {
  numberAnimationInstRef.value?.play();
};

const handleFinish = () => {
  message.success('Animation finished!');
};
</script>
```

## Common Patterns

### Auto-play Animation

```vue
<template>
  <n-statistic label="Auto-play" tabular-nums>
    <n-number-animation :from="0" :to="1000" :duration="2000" />
  </n-statistic>
</template>
```

### Multiple Statistics

```vue
<template>
  <n-grid :cols="3" :x-gap="16">
    <n-gi>
      <n-statistic label="Users" tabular-nums>
        <n-number-animation :from="0" :to="12345" show-separator />
      </n-statistic>
    </n-gi>
    <n-gi>
      <n-statistic label="Revenue" tabular-nums>
        <n-number-animation
          :from="0"
          :to="9876543"
          show-separator
          :precision="2"
        />
      </n-statistic>
    </n-gi>
    <n-gi>
      <n-statistic label="Growth" tabular-nums>
        <n-number-animation :from="0" :to="99.9" :precision="1" />
        <template #suffix>%</template>
      </n-statistic>
    </n-gi>
  </n-grid>
</template>
```

### Animated Counter with Controls

```vue
<template>
  <n-space vertical>
    <n-statistic label="Counter" tabular-nums>
      <n-number-animation
        ref="numberAnimationInstRef"
        :from="currentValue"
        :to="targetValue"
        :active="false"
        :duration="1000"
        @finish="onAnimationFinish"
      />
    </n-statistic>
    <n-space>
      <n-input-number v-model:value="targetValue" :min="0" :max="10000" />
      <n-button type="primary" @click="animate"> Animate </n-button>
    </n-space>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const numberAnimationInstRef = ref(null);
const currentValue = ref(0);
const targetValue = ref(1000);

const animate = () => {
  numberAnimationInstRef.value?.play();
};

const onAnimationFinish = () => {
  currentValue.value = targetValue.value;
};
</script>
```

### Dashboard Metrics

```vue
<template>
  <n-grid :cols="4" :x-gap="16">
    <n-gi v-for="metric in metrics" :key="metric.label">
      <n-card>
        <n-statistic :label="metric.label" tabular-nums>
          <n-number-animation
            :from="0"
            :to="metric.value"
            :precision="metric.precision || 0"
            :show-separator="metric.showSeparator !== false"
            :duration="2000"
          />
          <template v-if="metric.suffix" #suffix>
            {{ metric.suffix }}
          </template>
        </n-statistic>
      </n-card>
    </n-gi>
  </n-grid>
</template>

<script setup>
import { ref } from 'vue';

const metrics = ref([
  { label: 'Total Users', value: 123456, suffix: '' },
  { label: 'Revenue', value: 9876543.21, precision: 2, suffix: '$' },
  {
    label: 'Conversion',
    value: 87.5,
    precision: 1,
    suffix: '%',
    showSeparator: false,
  },
  { label: 'Active Sessions', value: 45678, suffix: '' },
]);
</script>
```

### Countdown Animation

```vue
<template>
  <n-space vertical align="center">
    <n-statistic tabular-nums>
      <n-number-animation
        ref="countdownRef"
        :from="countdown"
        :to="0"
        :duration="countdown * 1000"
        :active="isRunning"
        :precision="0"
        @finish="onCountdownFinish"
      />
    </n-statistic>
    <n-button-group>
      <n-button type="primary" @click="startCountdown" :disabled="isRunning">
        Start
      </n-button>
      <n-button @click="resetCountdown" :disabled="isRunning"> Reset </n-button>
    </n-button-group>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';
import { useMessage } from 'naive-ui';

const message = useMessage();
const countdownRef = ref(null);
const countdown = ref(10);
const isRunning = ref(false);

const startCountdown = () => {
  isRunning.value = true;
};

const resetCountdown = () => {
  countdown.value = 10;
};

const onCountdownFinish = () => {
  isRunning.value = false;
  message.success('Time is up!');
  countdown.value = 10;
};
</script>
```

### Currency Display

```vue
<template>
  <n-space vertical>
    <n-statistic label="Price (USD)" tabular-nums>
      <template #prefix>$</template>
      <n-number-animation
        :from="0"
        :to="1234.56"
        :precision="2"
        show-separator
        :duration="1500"
      />
    </n-statistic>
    <n-statistic label="Price (EUR)" tabular-nums>
      <template #prefix>€</template>
      <n-number-animation
        :from="0"
        :to="987.65"
        :precision="2"
        locale="de-DE"
        :duration="1500"
      />
    </n-statistic>
  </n-space>
</template>
```

## Best Practices

1. **Use tabular-nums for alignment**: Ensure numbers align properly

   ```vue
   <n-statistic tabular-nums>
     <n-number-animation :from="0" :to="1000" />
   </n-statistic>
   ```

2. **Set appropriate precision**: Match precision to your data

   ```vue
   <n-number-animation :to="99.99" :precision="2" />
   ```

3. **Use show-separator for large numbers**: Improve readability

   ```vue
   <n-number-animation :to="1000000" show-separator />
   ```

4. **Control animation with active prop**: Trigger animation conditionally

   ```vue
   <n-number-animation :active="isVisible" :to="targetValue" />
   ```

5. **Use play() method for manual control**: Trigger animation programmatically

   ```vue
   const playAnimation = () => { numberAnimationRef.value?.play() }
   ```

6. **Set appropriate duration**: Match animation speed to context
   - Short (500-1000ms): Quick feedback, small changes
   - Medium (2000-3000ms): Standard transitions
   - Long (5000ms+): Dramatic reveals, large changes

7. **Combine with n-statistic**: Use together for complete statistics display
   ```vue
   <n-statistic label="Total">
     <template #prefix>$</template>
     <n-number-animation :to="1000" />
     <template #suffix>USD</template>
   </n-statistic>
   ```
