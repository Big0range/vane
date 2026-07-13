---
name: 'n-global-style'
description: 'Global style component that syncs theme styles to document.body. Invoke when user needs to apply global theme styles like background color and font family to the entire page.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Global Style Component

Global Style is a utility component that synchronizes common global styles from `n-config-provider` to `document.body`. It ensures the body element matches the theme settings.

## When to Use

Use this component when:

- **Body background sync**: Apply theme background color to the entire page
- **Global font family**: Sync font settings to document body
- **Theme consistency**: Ensure the whole page reflects the current theme
- **Dark mode support**: Automatically update body styles for dark/light themes

## When to Invoke

Invoke this skill when:

- User needs to apply theme background to the whole page
- User wants the body to change with theme switching
- User asks about global styling for the application
- User needs to sync theme styles outside of n-config-provider
- User wants to ensure consistent theming across the entire page

## Features

- **Body Style Sync**: Automatically syncs theme styles to `document.body`
- **Background Color**: Updates body background with theme
- **Font Family**: Applies theme font settings globally
- **Theme Reactive**: Updates automatically when theme changes
- **Zero Configuration**: Works out of the box with `n-config-provider`

## Basic Usage

### Basic Global Style

```vue
<template>
  <n-config-provider :theme="theme">
    <n-global-style />
    <n-card>
      <n-space>
        <n-button @click="theme = darkTheme">Dark</n-button>
        <n-button @click="theme = null">Light</n-button>
      </n-space>
      <p>The body background will change with the theme.</p>
    </n-card>
  </n-config-provider>
</template>

<script setup>
import { ref } from 'vue';
import { darkTheme } from 'naive-ui';

const theme = ref(null);
</script>
```

### With Theme Overrides

```vue
<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <n-global-style />
    <n-card>
      <n-button type="primary">Primary Button</n-button>
    </n-card>
  </n-config-provider>
</template>

<script setup>
import { ref } from 'vue';
import { darkTheme } from 'naive-ui';

const theme = ref(null);

const themeOverrides = {
  common: {
    bodyColor: '#f5f5f5',
  },
};
</script>
```

## Common Patterns

### Complete Application Setup

```vue
<template>
  <n-config-provider
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="locale"
    :date-locale="dateLocale"
  >
    <n-global-style />
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-loading-bar-provider>
            <router-view />
          </n-loading-bar-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { ref } from 'vue';
import { darkTheme, zhCN, dateZhCN } from 'naive-ui';

const theme = ref(null);
const locale = ref(zhCN);
const dateLocale = ref(dateZhCN);

const themeOverrides = {
  common: {
    primaryColor: '#18A058',
  },
};
</script>
```

### Theme Toggle with Persistence

```vue
<template>
  <n-config-provider :theme="theme">
    <n-global-style />
    <n-layout>
      <n-layout-header>
        <n-switch :value="isDark" @update:value="toggleTheme">
          <template #checked>
            <n-icon><MoonIcon /></n-icon>
          </template>
          <template #unchecked>
            <n-icon><SunIcon /></n-icon>
          </template>
        </n-switch>
      </n-layout-header>
      <n-layout-content>
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-config-provider>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { darkTheme } from 'naive-ui';

const theme = ref(null);

const isDark = computed(() => theme.value === darkTheme);

const toggleTheme = value => {
  theme.value = value ? darkTheme : null;
  localStorage.setItem('theme', value ? 'dark' : 'light');
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    theme.value = darkTheme;
  }
});
</script>
```

### Follow System Theme

```vue
<template>
  <n-config-provider :theme="theme">
    <n-global-style />
    <n-card>
      <p>Following system theme: {{ osTheme }}</p>
      <n-button @click="toggleFollowSystem">
        {{ followSystem ? 'Stop Following System' : 'Follow System' }}
      </n-button>
    </n-card>
  </n-config-provider>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useOsTheme, darkTheme } from 'naive-ui';

const osTheme = useOsTheme();
const followSystem = ref(true);
const manualTheme = ref(null);

const theme = computed(() => {
  if (!followSystem.value) {
    return manualTheme.value;
  }
  return osTheme.value === 'dark' ? darkTheme : null;
});

const toggleFollowSystem = () => {
  followSystem.value = !followSystem.value;
};
</script>
```

### With Preflight Style Disabled

```vue
<template>
  <n-config-provider :theme="theme" preflight-style-disabled>
    <n-global-style />
    <n-card>
      <p>
        Preflight styles are disabled, but n-global-style will still sync theme
        styles to body.
      </p>
    </n-card>
  </n-config-provider>
</template>

<script setup>
import { ref } from 'vue';
import { darkTheme } from 'naive-ui';

const theme = ref(null);
</script>
```

### Multiple Config Providers

```vue
<template>
  <n-config-provider :theme="theme">
    <n-global-style />
    <n-layout>
      <n-layout-sider>
        <n-config-provider :theme="darkTheme" abstract>
          <n-menu :options="menuOptions" />
        </n-config-provider>
      </n-layout-sider>
      <n-layout-content>
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-config-provider>
</template>

<script setup>
import { ref } from 'vue';
import { darkTheme } from 'naive-ui';

const theme = ref(null);
</script>
```

## Best Practices

1. **Place inside n-config-provider**: Always place `n-global-style` inside `n-config-provider`

   ```vue
   <n-config-provider :theme="theme">
     <n-global-style />
     <App />
   </n-config-provider>
   ```

2. **Single instance**: Only one `n-global-style` is needed per application

   ```vue
   <n-config-provider>
     <n-global-style />
     <n-message-provider>
       <App />
     </n-message-provider>
   </n-config-provider>
   ```

3. **Combine with theme persistence**: Store theme preference in localStorage

   ```js
   onMounted(() => {
     const savedTheme = localStorage.getItem('theme');
     if (savedTheme === 'dark') {
       theme.value = darkTheme;
     }
   });
   ```

4. **Use with preflight-style-disabled**: When you disable preflight styles, `n-global-style` provides reactive global styles

   ```vue
   <n-config-provider preflight-style-disabled>
     <n-global-style />
   </n-config-provider>
   ```

5. **Position in component tree**: Place at the root level after `n-config-provider`

   ```vue
   <n-config-provider>
     <n-global-style />
     <n-message-provider>
       <n-dialog-provider>
         <App />
       </n-dialog-provider>
     </n-message-provider>
   </n-config-provider>
   ```

6. **No props needed**: The component works without any configuration

   ```vue
   <n-global-style />
   ```

7. **Styles applied**: The component syncs these styles to body:
   - Background color (`bodyColor` from theme)
   - Font family (`fontFamily` from theme)
   - Text color
   - Other global theme variables

8. **Why use it**: Without `n-global-style`, the body won't automatically update when theme changes, leading to visual inconsistency
