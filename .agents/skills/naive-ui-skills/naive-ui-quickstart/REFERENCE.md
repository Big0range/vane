---
name: naive-ui-quickstart
description: Get started with Naive UI - a Vue 3 component library with comprehensive installation and setup guide
metadata:
  author: jiaiyan
  version: 1.0.0
---

# Naive UI Quickstart

A comprehensive guide to installing and setting up Naive UI in your Vue 3 project.

## When to Use

Use this skill when you need to:

- Set up Naive UI in a new Vue 3 project
- Install Naive UI dependencies
- Configure basic Naive UI usage
- Understand the prerequisites for using Naive UI

## Prerequisites

- **Vue 3**: Naive UI only supports Vue 3. If you are using Vue 2, consider other UI libraries.
- **Node.js**: Ensure you have Node.js installed (version 14+ recommended)
- **Package Manager**: npm, yarn, or pnpm

## Installation

### Install Naive UI

```bash
npm i -D naive-ui
```

Or using yarn:

```bash
yarn add -D naive-ui
```

Or using pnpm:

```bash
pnpm add -D naive-ui
```

### Install Fonts

Naive UI uses vfonts for typography:

```bash
npm i -D vfonts
```

### Install Icons (Recommended)

Naive UI recommends using [xicons](https://www.xicons.org) as the icon library:

```bash
npm i -D @vicons/ionicons5
# or other icon packs
npm i -D @vicons/fluent
npm i -D @vicons/antd
```

## Basic Usage

### Global Registration

Register Naive UI globally in your main entry file:

```js
// main.js
import { createApp } from 'vue';
import naive from 'naive-ui';
import App from './App.vue';

const app = createApp(App);
app.use(naive);
app.mount('#app');
```

### On-Demand Import

Import components as needed:

```vue
<template>
  <n-button @click="handleClick">Click Me</n-button>
</template>

<script setup>
import { NButton } from 'naive-ui';

const handleClick = () => {
  console.log('Button clicked!');
};
</script>
```

### Tree-Shaking Support

Naive UI supports tree-shaking out of the box. When using bundlers like Vite or webpack, only the components you import will be included in the final bundle.

```js
// This will only bundle the Button component
import { NButton } from 'naive-ui';
```

## Configuration Options

### Using Config Provider

Wrap your application with `n-config-provider` for global configuration:

```vue
<template>
  <n-config-provider>
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <App />
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import {
  NConfigProvider,
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider,
} from 'naive-ui';
</script>
```

### Provider Hierarchy

| Provider                | Purpose                                    |
| ----------------------- | ------------------------------------------ |
| `NConfigProvider`       | Global configuration (theme, locale, etc.) |
| `NMessageProvider`      | Message notification context               |
| `NDialogProvider`       | Dialog/Modal context                       |
| `NNotificationProvider` | Notification context                       |

## Common Patterns

### Basic Application Setup

```vue
<!-- App.vue -->
<template>
  <n-config-provider>
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <div class="app-container">
            <router-view />
          </div>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import {
  NConfigProvider,
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider,
} from 'naive-ui';
</script>
```

### Using with TypeScript

Naive UI is written in TypeScript and provides full type definitions:

```vue
<template>
  <n-button type="primary" @click="handleClick"> Submit </n-button>
</template>

<script setup lang="ts">
import { NButton, ButtonProps } from 'naive-ui';

const handleClick: ButtonProps['onClick'] = e => {
  console.log('Clicked', e);
};
</script>
```

## Best Practices

1. **Use On-Demand Imports**: Import only the components you need to reduce bundle size
2. **Set Up Providers Early**: Configure all necessary providers at the root level of your application
3. **Install Fonts**: Always install vfonts for consistent typography
4. **Use TypeScript**: Leverage Naive UI's TypeScript support for better development experience
5. **Check Browser Compatibility**: Naive UI supports modern browsers (Chrome, Firefox, Safari, Edge)

## Design Resources

- [Naive UI Design Library (Sketch)](https://naive-ui.oss-accelerate.aliyuncs.com/NaiveUI-Design-Library-en-US.sketch)
- [Official Documentation](https://www.naiveui.com)
- [GitHub Repository](https://github.com/tusen-projects/naive-ui)
