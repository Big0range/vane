---
name: 'n-log'
description: 'Log component for displaying log content with syntax highlighting, lazy loading, and scroll controls. Invoke when user needs to implement log viewers, terminal output, or console displays in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Log Component

Log component for displaying log content with syntax highlighting, lazy loading, scroll controls, and loading states.

## When to Use

Use this component when:

- **Log viewers**: Display application or system logs
- **Terminal output**: Show command-line output or console logs
- **Real-time logs**: Display streaming log data
- **Code display**: Show code or text with syntax highlighting

## When to Invoke

Invoke this skill when:

- User needs to display log content
- User wants to implement a log viewer with lazy loading
- User needs syntax highlighting for logs
- User wants to control scroll position programmatically
- User asks about loading more logs on scroll

## Features

- **Syntax Highlighting**: Highlight log content using highlight.js
- **Lazy Loading**: Load more logs when scrolling to top/bottom
- **Scroll Control**: Programmatically scroll to top or bottom
- **Loading State**: Show loading indicator while fetching logs
- **Trim Support**: Trim whitespace from log content
- **Customizable Appearance**: Configure font size and line height

## API Reference

### Log Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| font-size | `number` | `14` | Font size. |
| hljs | `Object` | `undefined` | If you want to set `hljs` locally, pass it using this prop. |
| language | `string` | `undefined` | The language of the log in `highlightjs`. |
| line-height | `number` | `1.25` | Line height. |
| lines | `Array<string>` | `undefined` | Display the log content by line. |
| loading | `boolean` | `false` | Whether to show loading. |
| log | `string` | `undefined` | The content of the log. |
| rows | `number` | `15` | Log size (number of visible rows). |
| spin-props | `object` | `undefined` | Loading icon properties. |
| trim | `boolean` | `false` | Whether to display the log after `trim`. |
| on-require-more | `(from: 'top' \| 'bottom') => void` | `undefined` | Callback for scroll loading log. |
| on-reach-top | `() => void` | `undefined` | Scroll to the top callback. |
| on-reach-bottom | `() => void` | `undefined` | Scroll to the bottom callback. |

### Log Methods

| Name | Parameters | Description |
| --- | --- | --- |
| scrollTo | `(options: { top?: number, position?: 'top' \| 'bottom', silent?: boolean })` | Scroll to specified position. |

## Basic Usage

### Basic Log

```vue
<template>
  <n-log
    :rows="5"
    log="1
  2
  3
  4
  5
  6"
  />
</template>
```

### Log with Lines Array

```vue
<template>
  <n-log :lines="logLines" :rows="10" />
</template>

<script setup>
import { ref } from 'vue';

const logLines = ref([
  '[INFO] Application started',
  '[DEBUG] Loading configuration...',
  '[INFO] Configuration loaded successfully',
  '[WARN] Cache is empty',
  '[INFO] Initializing database connection',
]);
</script>
```

### Lazy Loading

```vue
<template>
  <n-log
    :log="logRef"
    :loading="loadingRef"
    trim
    @require-more="handleRequireMore"
    @reach-top="handleReachTop"
    @reach-bottom="handleReachBottom"
  />
</template>

<script setup>
import { ref } from 'vue';

const logRef = ref('Initial log content...');
const loadingRef = ref(false);

const handleRequireMore = from => {
  loadingRef.value = true;
  setTimeout(() => {
    if (from === 'top') {
      logRef.value = 'More logs at top\n' + logRef.value;
    } else {
      logRef.value = logRef.value + '\nMore logs at bottom';
    }
    loadingRef.value = false;
  }, 1000);
};

const handleReachTop = () => {
  console.log('Reached top');
};

const handleReachBottom = () => {
  console.log('Reached bottom');
};
</script>
```

### Scroll Control

```vue
<template>
  <n-space vertical>
    <n-button-group>
      <n-button @click="scrollTo({ position: 'bottom', silent: false })">
        Scroll To Bottom
      </n-button>
      <n-button @click="scrollTo({ position: 'bottom', silent: true })">
        Scroll To Bottom (silent)
      </n-button>
      <n-button @click="scrollTo({ position: 'top', silent: false })">
        Scroll To Top
      </n-button>
      <n-button @click="scrollTo({ position: 'top', silent: true })">
        Scroll To Top (silent)
      </n-button>
    </n-button-group>
    <n-log
      ref="logInstRef"
      :log="logRef"
      :loading="loadingRef"
      trim
      @require-more="handleRequireMore"
    />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const logInstRef = ref(null);
const logRef = ref('Log content...');
const loadingRef = ref(false);

const scrollTo = options => {
  logInstRef.value?.scrollTo(options);
};

const handleRequireMore = from => {
  console.log('Require more from:', from);
};
</script>
```

### Syntax Highlighting

```vue
<template>
  <n-config-provider :hljs="hljs">
    <n-log :log="logRef" language="naive-log" trim />
  </n-config-provider>
</template>

<script setup>
import { ref } from 'vue';
import hljs from 'highlight.js/lib/core';

hljs.registerLanguage('naive-log', () => ({
  contains: [
    {
      className: 'number',
      begin: /\d+/,
    },
  ],
}));

const logRef = ref(`
2024-01-01 10:00:00 [INFO] Application started
2024-01-01 10:00:01 [DEBUG] Loading modules...
2024-01-01 10:00:02 [INFO] Server listening on port 3000
`);
</script>
```

### Loading State

```vue
<template>
  <n-switch v-model:value="loading" />
  <n-log :loading="loading" :log="logRef" />
</template>

<script setup>
import { ref } from 'vue';

const loading = ref(false);
const logRef = ref('Log content here...');
</script>
```

## Common Patterns

### Real-time Log Viewer

```vue
<template>
  <n-space vertical>
    <n-button-group>
      <n-button @click="startLogging" :disabled="isRunning"> Start </n-button>
      <n-button @click="stopLogging" :disabled="!isRunning"> Stop </n-button>
      <n-button @click="clearLogs"> Clear </n-button>
    </n-button-group>
    <n-log ref="logInstRef" :log="logRef" :rows="20" trim />
  </n-space>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';

const logInstRef = ref(null);
const logRef = ref('');
const isRunning = ref(false);
let intervalId = null;

const addLog = message => {
  const timestamp = new Date().toISOString();
  logRef.value += `[${timestamp}] ${message}\n`;
  logInstRef.value?.scrollTo({ position: 'bottom' });
};

const startLogging = () => {
  isRunning.value = true;
  addLog('Logging started');
  intervalId = setInterval(() => {
    addLog(`Log entry ${Date.now()}`);
  }, 1000);
};

const stopLogging = () => {
  isRunning.value = false;
  clearInterval(intervalId);
  addLog('Logging stopped');
};

const clearLogs = () => {
  logRef.value = '';
};

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>
```

### Log with Custom Styling

```vue
<template>
  <n-log :log="logRef" :rows="15" :font-size="12" :line-height="1.5" trim />
</template>

<script setup>
import { ref } from 'vue';

const logRef = ref(`
[ERROR] Failed to connect to database
[WARN] Retrying connection...
[INFO] Connection established
[DEBUG] Query executed: SELECT * FROM users
[INFO] 100 rows returned
`);
</script>
```

### Log with Pagination

```vue
<template>
  <n-space vertical>
    <n-log
      ref="logInstRef"
      :log="currentPageLogs"
      :loading="loading"
      :rows="20"
      @reach-top="loadPreviousPage"
      @reach-bottom="loadNextPage"
    />
    <n-pagination v-model:page="currentPage" :page-count="totalPages" />
  </n-space>
</template>

<script setup>
import { ref, computed } from 'vue';

const logInstRef = ref(null);
const loading = ref(false);
const currentPage = ref(1);
const totalPages = ref(10);

const allLogs = ref([]);

const currentPageLogs = computed(() => {
  const start = (currentPage.value - 1) * 100;
  const end = start + 100;
  return allLogs.value.slice(start, end).join('\n');
});

const loadPreviousPage = () => {
  if (currentPage.value > 1) {
    loading.value = true;
    setTimeout(() => {
      currentPage.value--;
      loading.value = false;
    }, 500);
  }
};

const loadNextPage = () => {
  if (currentPage.value < totalPages.value) {
    loading.value = true;
    setTimeout(() => {
      currentPage.value++;
      loading.value = false;
    }, 500);
  }
};
</script>
```

### Console-like Log

```vue
<template>
  <n-card title="Console">
    <n-log
      ref="logInstRef"
      :log="consoleOutput"
      :rows="15"
      :font-size="13"
      language="javascript"
      trim
    />
    <template #footer>
      <n-input
        v-model:value="command"
        placeholder="Enter command..."
        @keyup.enter="executeCommand"
      >
        <template #prefix>
          <n-text>> </n-text>
        </template>
      </n-input>
    </template>
  </n-card>
</template>

<script setup>
import { ref } from 'vue';

const logInstRef = ref(null);
const consoleOutput = ref('Welcome to Console\n');
const command = ref('');

const executeCommand = () => {
  if (!command.value.trim()) return;

  consoleOutput.value += `> ${command.value}\n`;

  try {
    const result = eval(command.value);
    consoleOutput.value += `${result}\n`;
  } catch (e) {
    consoleOutput.value += `Error: ${e.message}\n`;
  }

  command.value = '';
  logInstRef.value?.scrollTo({ position: 'bottom' });
};
</script>
```

## Best Practices

1. **Use trim for cleaner output**: Remove extra whitespace from logs

   ```vue
   <n-log :log="logContent" trim />
   ```

2. **Scroll to bottom for real-time logs**: Keep latest logs visible

   ```vue
   const addLog = (message) => { logRef.value += message + '\n'
   logInstRef.value?.scrollTo({ position: 'bottom' }) }
   ```

3. **Use silent scroll to avoid triggering events**: Prevent infinite loops

   ```vue
   logInstRef.value?.scrollTo({ position: 'bottom', silent: true })
   ```

4. **Set up highlight.js for syntax highlighting**: Configure in n-config-provider

   ```vue
   <n-config-provider :hljs="hljs">
     <n-log :log="logContent" language="javascript" />
   </n-config-provider>
   ```

5. **Use loading state for async operations**: Show feedback during data fetching

   ```vue
   <n-log :log="logContent" :loading="isLoading" />
   ```

6. **Configure font size for readability**: Adjust based on use case

   ```vue
   <n-log :log="logContent" :font-size="12" :line-height="1.5" />
   ```

7. **Use require-more vs reach-top/bottom**: Choose appropriate event
   - `require-more`: Triggered on scroll direction even at boundaries
   - `reach-top/bottom`: Only triggered when actually reaching boundaries
