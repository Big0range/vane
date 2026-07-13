---
name: 'n-collapse-transition'
description: 'Collapse transition component for smooth show/hide animations. Invoke when user needs to implement expand/collapse animations in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Collapse Transition Component

A collapse transition without any form of encapsulation. Provides smooth expand/collapse animations.

## When to Use

Use this component when:

- **Expand/Collapse**: Smooth show/hide animations for content
- **Accordion effects**: Animated content panels
- **Toggle visibility**: Animated visibility transitions
- **Menu items**: Collapsible menu animations

## When to Invoke

Invoke this skill when:

- User needs to implement expand/collapse animations
- User wants smooth height transitions
- User needs to animate content visibility
- User asks about collapse transitions

## Features

- **Smooth Animation**: CSS-based height transition
- **Appear Support**: Animation on first mount
- **Simple API**: Show prop for visibility control
- **No Encapsulation**: Works with any content

## API Reference

### CollapseTransition Props

| Name   | Type      | Default | Description                                 |
| ------ | --------- | ------- | ------------------------------------------- |
| appear | `boolean` | `false` | Whether to play animation on first mounted. |
| show   | `boolean` | `true`  | Whether to show content.                    |

### CollapseTransition Slots

| Name    | Parameters | Description                        |
| ------- | ---------- | ---------------------------------- |
| default | `()`       | The content inside the transition. |

## Basic Usage

### Basic Collapse Transition

```vue
<template>
  <n-space vertical>
    <n-switch v-model:value="show">
      <template #checked> Show </template>
      <template #unchecked> Hide </template>
    </n-switch>
    <n-collapse-transition :show="show">
      <div style="background: rgba(128, 128, 128, 0.2); padding: 24px;">
        Content that can be collapsed
      </div>
    </n-collapse-transition>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(true);
</script>
```

### With Appear

```vue
<template>
  <n-collapse-transition appear :show="show">
    <div style="background: rgba(128, 128, 128, 0.2); padding: 24px;">
      This content will animate on mount
    </div>
  </n-collapse-transition>
</template>
```

## Common Patterns

### Accordion Style

```vue
<template>
  <n-space vertical>
    <n-button @click="expanded = !expanded">
      {{ expanded ? 'Collapse' : 'Expand' }}
    </n-button>
    <n-collapse-transition :show="expanded">
      <n-card>
        <p>Line 1</p>
        <p>Line 2</p>
        <p>Line 3</p>
      </n-card>
    </n-collapse-transition>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const expanded = ref(false);
</script>
```

### Multiple Collapsible Sections

```vue
<template>
  <n-space vertical>
    <n-button @click="section1 = !section1"> Toggle Section 1 </n-button>
    <n-collapse-transition :show="section1">
      <div style="background: rgba(0, 128, 0, 0.1); padding: 16px;">
        Section 1 Content
      </div>
    </n-collapse-transition>

    <n-button @click="section2 = !section2"> Toggle Section 2 </n-button>
    <n-collapse-transition :show="section2">
      <div style="background: rgba(0, 128, 0, 0.2); padding: 16px;">
        Section 2 Content
      </div>
    </n-collapse-transition>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const section1 = ref(true);
const section2 = ref(false);
</script>
```

### With v-model

```vue
<template>
  <n-space vertical>
    <n-checkbox v-model:checked="isVisible"> Show Content </n-checkbox>
    <n-collapse-transition :show="isVisible">
      <div style="background: rgba(128, 128, 128, 0.2); padding: 24px;">
        Content controlled by checkbox
      </div>
    </n-collapse-transition>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const isVisible = ref(true);
</script>
```

### Nested Collapse Transitions

```vue
<template>
  <n-space vertical>
    <n-button @click="outer = !outer"> Toggle Outer </n-button>
    <n-collapse-transition :show="outer">
      <div style="background: rgba(0, 128, 0, 0.1); padding: 16px;">
        <n-button @click="inner = !inner" size="small"> Toggle Inner </n-button>
        <n-collapse-transition :show="inner">
          <div
            style="background: rgba(0, 128, 0, 0.2); padding: 16px; margin-top: 8px;"
          >
            Inner Content
          </div>
        </n-collapse-transition>
      </div>
    </n-collapse-transition>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const outer = ref(true);
const inner = ref(true);
</script>
```

## Best Practices

1. **Use with v-model**: Combine with v-model for reactive visibility control

2. **Appear for initial animation**: Use `appear` prop when you want animation on first mount

3. **Avoid margin collapse**: Be aware of margin collapse inside the transition

4. **Content height**: The transition works best with content that has a defined height

5. **Combine with other components**: Works well with cards, panels, and other containers

6. **Performance**: CSS-based transition is performant for most use cases
