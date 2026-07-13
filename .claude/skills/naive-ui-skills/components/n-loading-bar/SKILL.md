---
name: 'n-loading-bar'
description: 'Loading Bar component for showing loading progress. Invoke when user needs to implement loading indicators, route transition loading, or async operation feedback in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Loading Bar Component

A kind of good placebo for anxiety. Shows loading progress for async operations.

## When to Use

Use this component when:

- **Route transitions**: Show loading during page navigation
- **API requests**: Indicate pending async operations
- **File operations**: Display progress for file uploads/downloads
- **Long processes**: Provide feedback during lengthy operations

## When to Invoke

Invoke this skill when:

- User needs to implement loading indicators
- User wants to show loading progress for async operations
- User needs route transition loading feedback
- User wants to customize loading bar appearance
- User asks about loading state management

## Features

- **Global Provider**: Wrap app with LoadingBarProvider
- **Injection API**: Use `useLoadingBar` hook in components
- **Multiple States**: Support start, finish, and error states
- **Custom Styling**: Configure loading bar style
- **Local Mounting**: Mount to specific container

## API Reference

### LoadingBarProvider Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| container-class | `string` | `undefined` | Class of the loading bar container. | 2.33.4 |
| container-style | `string \| object` | `undefined` | Style of the loading bar container. | 2.33.4 |
| loading-bar-style | `{ loading?: string \| object, error?: string \| object }` | `undefined` | Style of the loading bar. |  |
| to | `string \| HTMLElement \| false` | `undefined` | Mount target of loading bar. | 2.33.4 |

### loadingBar Injection Methods

| Name | Type | Description |
| --- | --- | --- |
| error | `() => void` | Callback function for loading bar error. |
| finish | `() => void` | The callback function when the loading bar finishes loading. |
| start | `() => void` | Callback function for loading bar to start loading. |

## Basic Usage

### Setup Provider

```vue
<!-- App.vue -->
<template>
  <n-loading-bar-provider>
    <router-view />
  </n-loading-bar-provider>
</template>
```

### Using in Components

```vue
<template>
  <n-space>
    <n-button @click="handleStart"> Start </n-button>
    <n-button :disabled="loading" @click="handleFinish"> Finish </n-button>
    <n-button @click="handleError"> Error </n-button>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';
import { useLoadingBar } from 'naive-ui';

const loadingBar = useLoadingBar();
const loading = ref(false);

const handleStart = () => {
  loading.value = true;
  loadingBar.start();
};

const handleFinish = () => {
  loading.value = false;
  loadingBar.finish();
};

const handleError = () => {
  loading.value = false;
  loadingBar.error();
};
</script>
```

## Common Patterns

### Local Loading Bar

```vue
<template>
  <n-loading-bar-provider
    :to="loadingBarTargetRef"
    container-style="position: absolute;"
  >
    <div
      ref="loadingBarTargetRef"
      style="
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: var(--n-border-radius);
        overflow: hidden;
        pointer-events: none;
      "
    />
    <Content />
  </n-loading-bar-provider>
</template>
```

### API Request Loading

```vue
<template>
  <n-button @click="fetchData" :loading="loading"> Fetch Data </n-button>
</template>

<script setup>
import { ref } from 'vue';
import { useLoadingBar } from 'naive-ui';

const loadingBar = useLoadingBar();
const loading = ref(false);

const fetchData = async () => {
  loadingBar.start();
  loading.value = true;

  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    loadingBar.finish();
  } catch (error) {
    loadingBar.error();
  } finally {
    loading.value = false;
  }
};
</script>
```

### Route Transition Loading

```vue
<!-- router/index.js -->
import { createRouter, createWebHistory } from 'vue-router' const router =
createRouter({ history: createWebHistory(), routes: [...] }) export default
router
```

```vue
<!-- App.vue -->
<template>
  <n-loading-bar-provider>
    <router-view />
  </n-loading-bar-provider>
</template>

<script setup>
import { useLoadingBar } from 'naive-ui';
import { useRouter } from 'vue-router';

const loadingBar = useLoadingBar();
const router = useRouter();

router.beforeEach(() => {
  loadingBar.start();
});

router.afterEach(() => {
  loadingBar.finish();
});

router.onError(() => {
  loadingBar.error();
});
</script>
```

### Custom Loading Bar Style

```vue
<template>
  <n-loading-bar-provider
    :loading-bar-style="{
      loading: {
        background: '#18a058',
      },
      error: {
        background: '#d03050',
      },
    }"
  >
    <Content />
  </n-loading-bar-provider>
</template>
```

## Best Practices

1. **Wrap at app root**: Place `n-loading-bar-provider` at the top level of your app

2. **Use with router**: Combine with router guards for automatic route transition feedback

3. **Handle errors**: Always call `error()` when operations fail

4. **Don't forget finish**: Ensure `finish()` is called after operations complete

5. **Local vs Global**: Use local loading bar for component-specific operations

6. **Combine with other feedback**: Use alongside loading spinners for better UX
