---
name: 'n-anchor'
description: 'Anchor component for navigation and table of contents. Invoke when user needs to implement anchor navigation, table of contents, or scroll-based navigation highlighting in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Anchor Component

Anchor component for navigation and table of contents. Tells users where they are on the page.

## When to Use

Use this component when:

- **Documentation pages**: Navigate between sections in documentation
- **Table of contents**: Show current reading position in long articles
- **Single page navigation**: Navigate between sections on the same page
- **Form wizards**: Track progress through multi-section forms

## When to Invoke

Invoke this skill when:

- User needs to implement anchor navigation
- User wants a table of contents with scroll highlighting
- User needs to track scroll position and highlight active section
- User wants to combine anchor with affix behavior
- User asks about scroll-to functionality

## Features

- **Scroll Tracking**: Automatically highlights current section based on scroll
- **Nested Links**: Support for hierarchical navigation structure
- **Affix Mode**: Can work as an affix component
- **Custom Styling**: Configurable rail and background display
- **Manual Scroll**: Programmatic scroll to specific sections
- **Gap Handling**: Option to ignore gap for precise positioning

## API Reference

### Anchor Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| affix | `boolean` | `false` | If it works like an affix. If set to `true`, it will receive props from Affix. |
| bound | `number` | `12` | The height of the border when scrolling. |
| ignore-gap | `boolean` | `false` | If set to `true`, it will be displayed on the exact href. |
| offset-target | `string \| HTMLElement \| Window \| Document \| (() => HTMLElement)` | `document` | The element or selector used to calc offset of link elements. |
| show-rail | `boolean` | `true` | Whether to show the sider rail. |
| show-background | `boolean` | `true` | Whether to show background of links. |
| type | `'rail' \| 'block'` | `'rail'` | The type to use. |

### AnchorLink Props

| Name  | Type     | Default     | Description         |
| ----- | -------- | ----------- | ------------------- |
| href  | `string` | `undefined` | The target of link  |
| title | `string` | `undefined` | The content of link |

### AnchorLink Slots

| Name  | Parameters | Description            | Version |
| ----- | ---------- | ---------------------- | ------- |
| title | `()`       | The title of the link. | 2.42.0  |

### Anchor Methods

| Name | Type | Description |
| --- | --- | --- |
| scrollTo | `(href: string) => void` | Manually scroll to the specific position. |

## Basic Usage

### Basic Anchor

```vue
<template>
  <n-anchor :show-rail="showRail" :show-background="showBackground">
    <n-anchor-link title="Demos" href="#Demos">
      <n-anchor-link title="Basic" href="#basic.vue" />
      <n-anchor-link title="Ignore-Gap" href="#ignore-gap.vue" />
      <n-anchor-link title="Affix" href="#affix.vue" />
      <n-anchor-link title="Scroll To" href="#scrollto.vue" />
    </n-anchor-link>
    <n-anchor-link title="API" href="#API" />
  </n-anchor>
</template>

<script setup>
import { ref } from 'vue';

const showRail = ref(true);
const showBackground = ref(true);
</script>
```

### Anchor with Affix

```vue
<template>
  <n-anchor
    affix
    listen-to=".document-scroll-container"
    :trigger-top="24"
    :top="88"
    style="z-index: 1"
    :bound="24"
  >
    <n-anchor-link title="Demos" href="#Demos">
      <n-anchor-link title="Basic" href="#basic.vue" />
      <n-anchor-link title="Ignore-Gap" href="#ignore-gap.vue" />
    </n-anchor-link>
    <n-anchor-link title="API" href="#API" />
  </n-anchor>
</template>
```

### Ignore Gap Mode

```vue
<template>
  <n-anchor affix :trigger-top="24" :top="88" style="z-index: 1" ignore-gap>
    <n-anchor-link title="Demos" href="#Demos">
      <n-anchor-link title="Basic" href="#basic.vue" />
      <n-anchor-link title="Ignore-Gap" href="#ignore-gap.vue" />
    </n-anchor-link>
    <n-anchor-link title="API" href="#API" />
  </n-anchor>
</template>
```

## Common Patterns

### Programmatic Scroll

```vue
<template>
  <div>
    <n-anchor
      ref="anchorRef"
      affix
      :trigger-top="24"
      :top="88"
      :bound="24"
      style="z-index: 1"
    >
      <n-anchor-link title="Demos" href="#Demos">
        <n-anchor-link title="Basic" href="#basic.vue" />
        <n-anchor-link title="Affix" href="#affix.vue" />
      </n-anchor-link>
      <n-anchor-link title="API" href="#API" />
    </n-anchor>
  </div>
  <n-space>
    <n-button @click="scrollTo('#basic.vue')"> Basic </n-button>
    <n-button @click="scrollTo('#affix.vue')"> Affix </n-button>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const anchorRef = ref(null);

const scrollTo = href => {
  anchorRef.value?.scrollTo(href);
};
</script>
```

### Block Type Anchor

```vue
<template>
  <n-anchor type="block">
    <n-anchor-link title="Introduction" href="#intro" />
    <n-anchor-link title="Installation" href="#installation" />
    <n-anchor-link title="Usage" href="#usage" />
  </n-anchor>
</template>
```

### Custom Offset Target

```vue
<template>
  <div ref="scrollContainer" class="scroll-container">
    <n-anchor :offset-target="() => scrollContainer">
      <n-anchor-link title="Section 1" href="#section1" />
      <n-anchor-link title="Section 2" href="#section2" />
    </n-anchor>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const scrollContainer = ref(null);
</script>
```

## Best Practices

1. **Use with long content**: Anchor works best with pages that have multiple sections

2. **Set proper bound value**: Adjust `bound` to control when anchor links highlight

3. **Combine with Affix**: Use `affix` prop to keep anchor visible while scrolling

4. **Match href with element IDs**: Ensure href values match actual element IDs on the page

5. **Use nested links for hierarchy**: Create nested anchor links for subsections

6. **Consider ignore-gap**: Use `ignore-gap` for precise positioning without offset
