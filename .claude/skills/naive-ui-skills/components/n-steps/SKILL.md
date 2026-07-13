---
name: 'n-steps'
description: 'Steps component for showing progress through a sequence. Invoke when user needs to implement step indicators, wizards, or progress tracking in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Steps Component

1, 2, 3... done! Show progress through a sequence of steps.

## When to Use

Use this component when:

- **Form wizards**: Guide users through multi-step forms
- **Checkout process**: Show progress in e-commerce checkout
- **Onboarding**: Display progress through setup steps
- **Task completion**: Track progress through sequential tasks

## When to Invoke

Invoke this skill when:

- User needs to implement step indicators
- User wants to create a wizard or multi-step form
- User needs to track progress through a sequence
- User wants clickable step navigation
- User asks about step customization

## Features

- **Multiple Sizes**: Small and medium sizes
- **Vertical Layout**: Support for vertical step display
- **Status States**: Process, finish, error, and wait states
- **Custom Icons**: Customize icons for different states
- **Clickable Steps**: Allow clicking to navigate between steps
- **Content Placement**: Control where description appears

## API Reference

### Steps Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| content-placement | `'right' \| 'bottom'` | `'right'` | Steps content placement (horizontal only). | 2.43.2 |
| current | `number` | `undefined` | Currently active step index. |  |
| size | `'small' \| 'medium'` | `'medium'` | Steps size. |  |
| status | `'process' \| 'finish' \| 'error' \| 'wait'` | `'process'` | Steps status. |  |
| vertical | `boolean` | `false` | Steps vertical. |  |
| on-update:current | `(index) => void` | `undefined` | Callback on active step change. | 2.29.1 |

### Step Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| description | `string` | `undefined` | Step description. |  |
| disabled | `boolean` | `false` | Whether it's clickable. | 2.29.1 |
| status | `'process' \| 'finish' \| 'error' \| 'wait'` | `undefined` | Step status. |  |
| title | `string` | `undefined` | Step title. |  |

### Steps Slots

| Name        | Parameters | Description         |
| ----------- | ---------- | ------------------- |
| default     | `()`       | Steps content.      |
| finish-icon | `()`       | Finish status icon. |
| error-icon  | `()`       | Error status icon.  |

### Step Slots

| Name    | Parameters | Description   | Version |
| ------- | ---------- | ------------- | ------- |
| default | `()`       | Step content. |         |
| icon    | `()`       | Step icon.    | 2.26.1  |
| title   | `()`       | Step title.   |         |

## Basic Usage

### Basic Steps

```vue
<template>
  <n-steps :current="current" :status="currentStatus">
    <n-step
      title="I Me Mine"
      description="All through the day, I me mine I me mine, I me mine"
    />
    <n-step
      title="Let It Be"
      description="When I find myself in times of trouble Mother Mary comes to me"
    />
    <n-step
      title="Come Together"
      description="Here come old flat top He come grooving up slowly"
    />
    <n-step
      title="Something"
      description="Something in the way she moves Attracts me like no other lover"
    />
  </n-steps>
</template>

<script setup>
import { ref } from 'vue';

const current = ref(1);
const currentStatus = ref('process');
</script>
```

### Vertical Steps

```vue
<template>
  <n-steps vertical :current="current" :status="currentStatus">
    <n-step
      title="I Me Mine"
      description="All through the day, I me mine I me mine, I me mine"
    />
    <n-step
      title="Let It Be"
      description="When I find myself in times of trouble Mother Mary comes to me"
    />
    <n-step title="Break" />
    <n-step
      title="Come Together"
      description="Here come old flat top He come grooving up slowly"
    />
  </n-steps>
</template>
```

## Common Patterns

### Interactive Steps with Navigation

```vue
<template>
  <n-space vertical>
    <n-steps :current="current" :status="currentStatus">
      <n-step title="Step 1" description="First step description" />
      <n-step title="Step 2" description="Second step description" />
      <n-step title="Step 3" description="Third step description" />
      <n-step title="Step 4" description="Final step description" />
    </n-steps>
    <n-button-group>
      <n-button @click="prev">
        <template #icon>
          <n-icon><ArrowBackIcon /></n-icon>
        </template>
        Previous
      </n-button>
      <n-button @click="next">
        Next
        <template #icon>
          <n-icon><ArrowForwardIcon /></n-icon>
        </template>
      </n-button>
    </n-button-group>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const current = ref(1);
const currentStatus = ref('process');

const prev = () => {
  if (current.value > 1) current.value--;
};

const next = () => {
  if (current.value < 4) current.value++;
};
</script>
```

### Clickable Steps

```vue
<template>
  <n-steps v-model:current="current">
    <n-step
      title="I Me Mine"
      description="All through the day, I me mine I me mine, I me mine"
    />
    <n-step
      title="Let It Be"
      description="When I find myself in times of trouble Mother Mary comes to me"
    />
    <n-step
      title="Come Together"
      description="Here come old flat top He come grooving up slowly"
    />
    <n-step
      disabled
      title="Something"
      description="Something in the way she moves"
    />
  </n-steps>
</template>

<script setup>
import { ref } from 'vue';

const current = ref(1);
</script>
```

### Custom Icons

```vue
<template>
  <n-steps :current="current" :status="currentStatus">
    <template #finish-icon>
      <n-icon><CheckIcon /></n-icon>
    </template>
    <template #error-icon>
      <n-icon><CloseIcon /></n-icon>
    </template>
    <n-step title="Step 1" description="First step" />
    <n-step title="Step 2" description="Second step" />
    <n-step title="Step 3" description="Third step" />
  </n-steps>
</template>
```

### Content Placement

```vue
<template>
  <n-steps
    :content-placement="contentPlacement"
    :current="current"
    :status="currentStatus"
  >
    <n-step title="Step 1" description="First step description" />
    <n-step title="Step 2" description="Second step description" />
    <n-step title="Step 3" description="Third step description" />
  </n-steps>
</template>

<script setup>
import { ref } from 'vue';

const contentPlacement = ref('right');
</script>
```

### Step with Custom Content

```vue
<template>
  <n-steps :current="current" :status="currentStatus">
    <n-step title="I Me Mine">
      <div class="n-step-description">
        <p>All through the day, I me mine I me mine, I me mine</p>
        <n-button
          v-if="current === 1"
          type="primary"
          size="small"
          @click="next"
        >
          Next
        </n-button>
      </div>
    </n-step>
    <n-step title="Let It Be">
      <div class="n-step-description">
        <p>When I find myself in times of trouble Mother Mary comes to me</p>
        <n-button
          v-if="current === 2"
          type="primary"
          size="small"
          @click="next"
        >
          Next
        </n-button>
      </div>
    </n-step>
  </n-steps>
</template>
```

### Error State

```vue
<template>
  <n-steps :current="2" status="error">
    <n-step title="Personal Info" description="Completed" />
    <n-step title="Verification" description="Validation failed" />
    <n-step title="Complete" description="Waiting" />
  </n-steps>
</template>
```

## Best Practices

1. **Limit step count**: Keep steps between 3-7 for best UX

2. **Clear descriptions**: Provide meaningful descriptions for each step

3. **Show progress**: Always indicate current step clearly

4. **Handle errors**: Use error state when a step fails validation

5. **Clickable navigation**: Enable clicking for navigation when appropriate

6. **Consistent sizing**: Use consistent size throughout the application
