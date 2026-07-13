---
name: n-rate
description: A rating component for collecting user feedback with customizable icons, colors, and half-star support in Naive UI. Ideal for product reviews, feedback forms, and rating systems.
metadata:
  author: jiaiyan
  version: 1.0.0
---

# n-rate Component

The `n-rate` component allows users to provide ratings, typically represented as stars or custom icons. It supports half-star ratings, custom colors, and various sizes.

## When to Use

Use `n-rate` when you need to:

- **Product Reviews**: Allow users to rate products or services
- **Feedback Collection**: Gather user satisfaction ratings
- **Content Rating**: Rate articles, videos, or other content
- **Skill Assessment**: Display or collect skill level ratings
- **Quick Evaluation**: Provide a simple, intuitive rating interface

## Basic Usage

### Basic Rate

A simple 5-star rating component.

```vue
<template>
  <n-rate v-model:value="rating" />
  <p>Rating: {{ rating }}</p>
</template>

<script setup>
import { ref } from 'vue';

const rating = ref(0);
</script>
```

### Different Sizes

Rate supports `small`, `medium`, `large` sizes, or custom numeric sizes.

```vue
<template>
  <n-space align="center">
    <n-rate size="small" v-model:value="small" />
    <n-rate size="medium" v-model:value="medium" />
    <n-rate size="large" v-model:value="large" />
    <n-rate :size="30" v-model:value="custom" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const small = ref(3);
const medium = ref(3);
const large = ref(3);
const custom = ref(3);
</script>
```

### Custom Color

Customize the color of active icons.

```vue
<template>
  <n-space vertical>
    <n-rate color="#4fb233" v-model:value="rating1" />
    <n-rate color="#f0a020" v-model:value="rating2" />
    <n-rate color="rgb(255, 0, 100)" v-model:value="rating3" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const rating1 = ref(4);
const rating2 = ref(3);
const rating3 = ref(5);
</script>
```

### Custom Icon

Use custom icons via the default slot.

```vue
<template>
  <n-rate v-model:value="rating">
    <template #default>
      <n-icon size="20">
        <CashIcon />
      </n-icon>
    </template>
  </n-rate>
</template>

<script setup>
import { ref } from 'vue';
import { CashOutline as CashIcon } from '@vicons/ionicons5';

const rating = ref(3);
</script>
```

### Half Star Rating

Enable half-star precision with `allow-half`.

```vue
<template>
  <n-rate allow-half v-model:value="rating" />
  <p>Rating: {{ rating }}</p>
</template>

<script setup>
import { ref } from 'vue';

const rating = ref(3.5);
</script>
```

### Readonly Mode

Display rating without user interaction.

```vue
<template>
  <n-space vertical>
    <n-rate readonly :value="3" />
    <n-rate readonly :value="4.5" allow-half />
    <n-rate readonly :value="2" color="#ff6b6b" />
  </n-space>
</template>
```

### Clearable

Allow users to clear the rating by clicking on the current value.

```vue
<template>
  <n-rate clearable allow-half v-model:value="rating" @clear="handleClear" />
  <p>Rating: {{ rating }}</p>
</template>

<script setup>
import { ref } from 'vue';

const rating = ref(3.5);

const handleClear = () => {
  console.log('Rating cleared');
};
</script>
```

### Custom Count

Set a custom maximum rating value.

```vue
<template>
  <n-rate :count="10" v-model:value="rating" />
  <p>Rating: {{ rating }} / 10</p>
</template>

<script setup>
import { ref } from 'vue';

const rating = ref(7);
</script>
```

## API Reference

### n-rate Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `allow-half` | `boolean` | `false` | Allow activating half of the icon |
| `clearable` | `boolean` | `false` | Whether the rate is clearable. Clicking on current value resets to `null` |
| `color` | `string` | `undefined` | Activated icon color. Supports `#FFF`, `#FFFFFF`, `yellow`, `rgb(0, 0, 0)` formats |
| `count` | `number` | `5` | Number of icons (maximum rating) |
| `default-value` | `number \| null` | `null` | Default value of activated icons |
| `readonly` | `boolean` | `false` | Readonly state |
| `size` | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | Icon size |
| `value` | `number \| null` | `undefined` | Value of activated icons (controlled mode) |

### Events

| Name | Parameters | Description |
| --- | --- | --- |
| `on-clear` | `() => void` | Callback when value is cleared |
| `on-update:value` | `(value: number) => void` | Callback when the value (rating) changes |

### Slots

| Name | Parameters | Description |
| --- | --- | --- |
| `default` | `(info: { index: number })` | Custom icon for the rating. `index` is the position (0-based) |

## Common Patterns

### Rate in Form

```vue
<template>
  <n-form ref="formRef" :model="formData" :rules="rules">
    <n-form-item label="Overall Rating" path="rating">
      <n-rate allow-half clearable v-model:value="formData.rating" />
      <span style="margin-left: 12px">{{ formData.rating || 0 }} / 5</span>
    </n-form-item>
    <n-form-item label="Service Quality" path="serviceRating">
      <n-rate v-model:value="formData.serviceRating" />
    </n-form-item>
    <n-form-item>
      <n-button type="primary" @click="handleSubmit">Submit Review</n-button>
    </n-form-item>
  </n-form>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  rating: null,
  serviceRating: 0,
});

const rules = {
  rating: {
    required: true,
    type: 'number',
    min: 1,
    message: 'Please provide a rating',
    trigger: 'change',
  },
};

const handleSubmit = () => {
  console.log('Review submitted:', formData.value);
};
</script>
```

### Display Rating with Text

```vue
<template>
  <n-space align="center">
    <n-rate readonly :value="productRating" allow-half />
    <span>{{ productRating.toFixed(1) }}</span>
    <span style="color: #999">({{ reviewCount }} reviews)</span>
  </n-space>
</template>

<script setup>
const productRating = 4.5;
const reviewCount = 128;
</script>
```

### Emoji Rating

```vue
<template>
  <n-rate :count="5" v-model:value="emojiRating">
    <template #default="{ index }">
      <span style="font-size: 24px">{{ getEmoji(index) }}</span>
    </template>
  </n-rate>
  <p>Selected: {{ getEmojiLabel(emojiRating) }}</p>
</template>

<script setup>
import { ref } from 'vue';

const emojiRating = ref(3);

const emojis = ['😠', '😕', '😐', '😊', '😄'];
const labels = ['Very Bad', 'Bad', 'Okay', 'Good', 'Excellent'];

const getEmoji = index => emojis[index] || '😐';
const getEmojiLabel = value => labels[Math.floor(value) - 1] || 'Not rated';
</script>
```

### Rating with Feedback

```vue
<template>
  <n-space vertical>
    <n-rate v-model:value="rating" @update:value="handleRatingChange" />
    <n-tag v-if="feedbackText" :type="feedbackType">
      {{ feedbackText }}
    </n-tag>
  </n-space>
</template>

<script setup>
import { ref, computed } from 'vue';

const rating = ref(0);

const feedbackMap = {
  1: { text: 'Very Dissatisfied', type: 'error' },
  2: { text: 'Dissatisfied', type: 'warning' },
  3: { text: 'Neutral', type: 'default' },
  4: { text: 'Satisfied', type: 'success' },
  5: { text: 'Very Satisfied', type: 'success' },
};

const feedbackText = computed(() => feedbackMap[rating.value]?.text || '');
const feedbackType = computed(
  () => feedbackMap[rating.value]?.type || 'default',
);

const handleRatingChange = value => {
  console.log('Rating changed to:', value);
};
</script>
```

## Best Practices

### 1. Use Half-Star for Precise Ratings

Enable `allow-half` when users need to provide more precise ratings:

```vue
<template>
  <n-rate allow-half v-model:value="rating" />
</template>
```

### 2. Provide Clear Feedback

Show the current rating value alongside the component:

```vue
<template>
  <n-space align="center">
    <n-rate v-model:value="rating" />
    <span>{{ rating }} / 5</span>
  </n-space>
</template>
```

### 3. Use Readonly for Display

When displaying existing ratings, use `readonly` mode:

```vue
<template>
  <n-rate readonly :value="averageRating" allow-half />
</template>
```

### 4. Consider Clearable Option

Allow users to reset their rating when appropriate:

```vue
<template>
  <n-rate clearable v-model:value="rating" />
</template>
```

### 5. Use Custom Colors Wisely

Choose colors that match your design system and are accessible:

```vue
<template>
  <n-rate color="#18a058" v-model:value="rating" />
</template>
```

### 6. Match Size with Context

Use appropriate sizes based on the context:

```vue
<template>
  <n-space vertical>
    <n-rate size="small" v-model:value="compact" />
    <n-rate size="medium" v-model:value="standard" />
    <n-rate size="large" v-model:value="prominent" />
  </n-space>
</template>
```

### 7. Validate in Forms

Add validation rules when using in forms:

```javascript
const rules = {
  rating: {
    required: true,
    type: 'number',
    min: 1,
    message: 'Please provide a rating',
    trigger: 'change',
  },
};
```
