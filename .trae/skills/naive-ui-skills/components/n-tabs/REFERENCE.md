---
name: 'n-tabs'
description: 'Tabs component for switching content in same area. Invoke when user needs to implement tabbed interfaces, content switching, or tab navigation in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Tabs Component

Switch contents in same area. Organize content into separate tabbed panels.

## When to Use

Use this component when:

- **Content organization**: Group related content into tabs
- **Form sections**: Separate form fields into logical groups
- **Settings panels**: Organize settings into categories
- **Dashboard views**: Switch between different data views

## When to Invoke

Invoke this skill when:

- User needs to implement tabbed interfaces
- User wants to switch between content panels
- User needs addable or closable tabs
- User wants to customize tab appearance
- User asks about tab navigation or switching

## Features

- **Multiple Types**: Bar, line, card, and segment types
- **Addable/Closable**: Add and remove tabs dynamically
- **Animated Transitions**: Smooth tab switching animations
- **Placement Options**: Top, bottom, left, right placement
- **Trigger Modes**: Click or hover to activate
- **Before Leave Hook**: Intercept tab switching
- **Display Directives**: Control content rendering behavior

## API Reference

### Tabs Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| addable | `boolean \| object` | `false` | Whether to allow adding tabs (card type only). |  |
| add-tab-class | `string` | `undefined` | Class of the add tab. | 2.37.0 |
| add-tab-style | `string \| object` | `undefined` | Style of the add tab. | 2.37.0 |
| animated | `boolean` | `false` | Whether to enable animation. | 2.27.0 |
| bar-width | `number` | `undefined` | Width of the tab bar. | 2.25.0 |
| closable | `boolean` | `false` | Whether to allow closing tabs (card type only). |  |
| default-value | `string \| number` | `undefined` | Default value in uncontrolled mode. |  |
| justify-content | `string` | `undefined` | Flex justify-content value. | 2.29.1 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of tabs. |  |
| pane-class | `string` | `undefined` | Class of the pane. |  |
| pane-style | `string \| object` | `undefined` | Style of the pane. |  |
| pane-wrapper-class | `string` | `undefined` | Class of the pane wrapper. | 2.34.4 |
| pane-wrapper-style | `string \| object` | `undefined` | Style of the pane wrapper. | 2.34.4 |
| placement | `'left' \| 'right' \| 'top' \| 'bottom'` | `'top'` | Placement of tabs. | 2.34.4 |
| tab-class | `string` | `undefined` | Class of the tab. | 2.37.0 |
| tab-style | `string \| object` | `undefined` | Style of the tab. |  |
| tabs-padding | `number` | `0` | Left & right padding of tabs. |  |
| trigger | `'click' \| 'hover'` | `'click'` | Trigger of activating a tab. | 2.27.0 |
| type | `'bar' \| 'line' \| 'card' \| 'segment'` | `'bar'` | Tabs type. |  |
| value | `string \| number` | `undefined` | Value in controlled mode. |  |
| on-add | `() => void` | `undefined` | Callback when adding tab. |  |
| on-before-leave | `(name, oldName) => boolean \| Promise` | `undefined` | Hook before switching tabs. |  |
| on-close | `(name) => void` | `undefined` | Callback when closing tab. |  |
| on-update:value | `(value) => void` | `undefined` | Callback when value changes. |  |

### TabPane Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| closable | `boolean` | `false` | Whether to allow closing (card type only). |  |
| disabled | `boolean` | `false` | Whether to disable the tab. |  |
| display-directive | `'if' \| 'show' \| 'show:lazy'` | `'if'` | Conditional rendering directive. |  |
| name | `string \| number` | `undefined` | Required, the name of the tab. |  |
| tab | `string \| VNode \| (() => VNodeChild)` | `undefined` | Tab label. |  |
| tab-props | `Object` | `undefined` | DOM attributes of tab label. | 2.24.2 |

### Tab Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| closable | `boolean` | `false` | Whether to allow closing (card type only). |
| disabled | `boolean` | `false` | Whether to disable. |
| name | `string \| number` | `undefined` | Required, the name of the tab. |

### Tabs Slots

| Name    | Parameters | Description   |
| ------- | ---------- | ------------- |
| default | `()`       | Tabs content. |
| prefix  | `()`       | Tabs prefix.  |
| suffix  | `()`       | Tabs suffix.  |

### TabPane Slots

| Name    | Parameters | Description        |
| ------- | ---------- | ------------------ |
| default | `()`       | Tab pane content.  |
| tab     | `()`       | Tab label content. |

### Tabs Methods

| Name            | Type         | Description              | Version |
| --------------- | ------------ | ------------------------ | ------- |
| syncBarPosition | `() => void` | Sync tab bar's position. | 2.24.0  |

## Basic Usage

### Basic Tabs

```vue
<template>
  <n-tabs type="line" animated>
    <n-tab-pane name="oasis" tab="Oasis"> Wonderwall </n-tab-pane>
    <n-tab-pane name="the beatles" tab="the Beatles"> Hey Jude </n-tab-pane>
    <n-tab-pane name="jay chou" tab="Jay Chou"> Qilixiang </n-tab-pane>
  </n-tabs>
</template>
```

### Segment Type

```vue
<template>
  <n-tabs type="segment" animated>
    <n-tab-pane name="oasis" tab="Oasis"> Wonderwall </n-tab-pane>
    <n-tab-pane name="the beatles" tab="the Beatles"> Hey Jude </n-tab-pane>
    <n-tab-pane name="jay chou" tab="Jay Chou"> Qilixiang </n-tab-pane>
  </n-tabs>
</template>
```

### Card Type with Closable

```vue
<template>
  <n-tabs
    v-model:value="name"
    type="card"
    closable
    tab-style="min-width: 80px;"
    @close="handleClose"
  >
    <n-tab-pane
      v-for="panel in panels"
      :key="panel"
      :tab="panel.toString()"
      :name="panel"
    >
      {{ panel }}
    </n-tab-pane>
  </n-tabs>
</template>

<script setup>
import { ref } from 'vue';

const name = ref(1);
const panels = ref([1, 2, 3, 4]);

const handleClose = name => {
  const index = panels.value.indexOf(name);
  if (index > -1) {
    panels.value.splice(index, 1);
  }
};
</script>
```

## Common Patterns

### Addable Tabs

```vue
<template>
  <n-tabs
    v-model:value="value"
    type="card"
    :addable="addable"
    :closable="closable"
    tab-style="min-width: 80px;"
    @close="handleClose"
    @add="handleAdd"
  >
    <n-tab-pane v-for="panel in panels" :key="panel" :name="panel">
      {{ panel }}
    </n-tab-pane>
  </n-tabs>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(1);
const panels = ref([1, 2, 3]);
const addable = ref(true);
const closable = ref(true);

const handleAdd = () => {
  const newPanel = Math.max(...panels.value) + 1;
  panels.value.push(newPanel);
  value.value = newPanel;
};

const handleClose = name => {
  const index = panels.value.indexOf(name);
  if (index > -1) {
    panels.value.splice(index, 1);
  }
};
</script>
```

### Before Leave Hook

```vue
<template>
  <n-tabs
    type="line"
    default-value="okay"
    @before-leave="handleBeforeLeave"
    @update:value="handleUpdateValue"
  >
    <n-tab-pane name="wait" tab="Wait for 1s"> +1s </n-tab-pane>
    <n-tab-pane name="not-allowed" tab="Not allowed"> ??? </n-tab-pane>
    <n-tab-pane name="okay" tab="Okay"> Just so so </n-tab-pane>
  </n-tabs>
</template>

<script setup>
const handleBeforeLeave = async (activeName, oldActiveName) => {
  if (activeName === 'not-allowed') {
    return false;
  }
  if (activeName === 'wait') {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  return true;
};

const handleUpdateValue = value => {
  console.log('Tab changed to:', value);
};
</script>
```

### Prefix and Suffix

```vue
<template>
  <n-tabs default-value="oasis">
    <template #prefix> Prefix </template>
    <n-tab-pane name="oasis" tab="Oasis"> Wonderwall </n-tab-pane>
    <n-tab-pane name="the beatles" tab="the Beatles"> Hey Jude </n-tab-pane>
    <template #suffix> Suffix </template>
  </n-tabs>
</template>
```

### Tabs Without Pane

```vue
<template>
  <n-tabs type="line">
    <n-tab name="Riders On the Storm"> Riders On the Storm </n-tab>
    <n-tab name="Light My Fire"> Light My Fire </n-tab>
    <n-tab name="Break On Through"> Break On Through </n-tab>
  </n-tabs>
</template>
```

### Placement Options

```vue
<template>
  <n-tabs
    :type="type"
    animated
    :placement="placement"
    :style="
      placement === 'left' || placement === 'right'
        ? { height: '240px' }
        : undefined
    "
  >
    <n-tab-pane name="oasis" tab="Oasis"> Wonderwall </n-tab-pane>
    <n-tab-pane name="the beatles" tab="the Beatles"> Hey Jude </n-tab-pane>
    <n-tab-pane name="jay chou" tab="Jay Chou"> Qilixiang </n-tab-pane>
  </n-tabs>
</template>

<script setup>
import { ref } from 'vue';

const type = ref('line');
const placement = ref('top');
</script>
```

### Display Directive

```vue
<template>
  <n-tabs default-value="show">
    <n-tab-pane name="show" display-directive="show" tab="show">
      Content preserved when switching
    </n-tab-pane>
    <n-tab-pane name="if" display-directive="if" tab="if">
      Content reset when switching
    </n-tab-pane>
    <n-tab-pane name="show:lazy" display-directive="show:lazy" tab="show:lazy">
      Lazy loaded and preserved
    </n-tab-pane>
  </n-tabs>
</template>
```

### Hover Trigger

```vue
<template>
  <n-tabs type="line" trigger="hover">
    <n-tab-pane name="oasis" tab="Oasis"> Wonderwall </n-tab-pane>
    <n-tab-pane name="the beatles" tab="the Beatles"> Hey Jude </n-tab-pane>
    <n-tab-pane name="jay chou" tab="Jay Chou"> Qilixiang </n-tab-pane>
  </n-tabs>
</template>
```

## Best Practices

1. **Use appropriate type**: Choose tab type based on context - card for editable, segment for toggle groups

2. **Set default-value**: Always set `default-value` to avoid Vue slot warnings

3. **Use display-directive wisely**: Use `show` to preserve state, `if` for fresh content

4. **Implement before-leave**: Validate form data before allowing tab switch

5. **Animated transitions**: Enable `animated` for better UX

6. **Limit tab count**: Keep tabs manageable, use scrolling or dropdowns for many tabs
