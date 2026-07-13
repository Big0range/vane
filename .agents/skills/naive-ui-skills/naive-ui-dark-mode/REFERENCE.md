---
name: 'naive-ui-dark-mode'
description: 'Dark mode implementation and theme switching for Naive UI applications. Invoke when user needs to implement dark/light theme switching, follow system preferences, or customize dark theme variables.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Dark Mode

Naive UI provides built-in support for dark mode through the `n-config-provider` component. This skill covers implementing dark mode, following system preferences, and customizing dark theme variables.

## When to Use

Use this skill when:

- **Theme switching**: Implementing dark/light mode toggle
- **System preference**: Following OS dark mode settings
- **Dark theme customization**: Customizing dark theme variables
- **Global dark styles**: Applying dark mode to the entire page
- **Persistent dark mode**: Saving user theme preference

## When to Invoke

Invoke this skill when:

- User asks how to implement dark mode in Naive UI
- User wants to toggle between light and dark themes
- User needs to follow system dark mode preference
- User wants to customize dark theme colors
- User asks about applying dark mode globally
- User encounters issues with dark mode styling

## Prerequisites

- Naive UI installed (`npm install naive-ui`)
- Vue 3 application setup
- Basic understanding of `n-config-provider`

## API Reference

### Theme Objects

| Theme | Import | Description |
| --- | --- | --- |
| Light Theme | `import { lightTheme } from 'naive-ui'` | Default light theme (used when theme is `null`) |
| Dark Theme | `import { darkTheme } from 'naive-ui'` | Built-in dark theme |

### Theme Prop Values

| Value       | Behavior                                 |
| ----------- | ---------------------------------------- |
| `undefined` | Inherits from parent `n-config-provider` |
| `null`      | Uses default light theme                 |
| `darkTheme` | Applies dark theme                       |

### useOsTheme Hook

```ts
import { useOsTheme } from 'naive-ui';

const osTheme = useOsTheme();
// Returns: Ref<'dark' | 'light' | 'no-preference' | 'unknown'>
```

### useThemeVars Hook

```ts
import { useThemeVars } from 'naive-ui';

const themeVars = useThemeVars();
// Returns: Reactive theme variables object
```

## Basic Usage

### Simple Dark Mode Toggle

```vue
<template>
  <n-config-provider :theme="theme">
    <n-space vertical>
      <n-space>
        <n-button @click="theme = darkTheme">Dark Mode</n-button>
        <n-button @click="theme = null">Light Mode</n-button>
      </n-space>
      <n-card title="Theme Demo">
        <n-button type="primary">Primary Button</n-button>
      </n-card>
    </n-space>
  </n-config-provider>
</template>

<script setup>
import { ref } from 'vue';
import { darkTheme } from 'naive-ui';

const theme = ref(null);
</script>
```

### Follow System Theme Preference

```vue
<template>
  <n-config-provider :theme="theme">
    <n-card>
      <p>Current system theme: {{ osTheme }}</p>
      <n-button type="primary"> Button adapts to system theme </n-button>
    </n-card>
  </n-config-provider>
</template>

<script setup>
import { computed } from 'vue';
import { useOsTheme, darkTheme } from 'naive-ui';

const osTheme = useOsTheme();

const theme = computed(() => {
  return osTheme.value === 'dark' ? darkTheme : null;
});
</script>
```

### Dark Mode with Global Styles

```vue
<template>
  <n-config-provider :theme="theme">
    <n-global-style />
    <n-space vertical>
      <n-switch v-model:value="isDark">
        <template #checked>Dark</template>
        <template #unchecked>Light</template>
      </n-switch>
      <n-card title="Global Dark Mode">
        <p>Body background also changes!</p>
      </n-card>
    </n-space>
  </n-config-provider>
</template>

<script setup>
import { computed, ref } from 'vue';
import { darkTheme } from 'naive-ui';

const isDark = ref(false);

const theme = computed(() => (isDark.value ? darkTheme : null));
</script>
```

## Common Patterns

### Persistent Dark Mode with localStorage

```vue
<template>
  <n-config-provider :theme="theme">
    <n-global-style />
    <n-space vertical>
      <n-switch v-model:value="isDark">
        <template #checked>Dark</template>
        <template #unchecked>Light</template>
      </n-switch>
      <router-view />
    </n-space>
  </n-config-provider>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { darkTheme } from 'naive-ui';

const STORAGE_KEY = 'naive-ui-theme';

const savedTheme = localStorage.getItem(STORAGE_KEY);
const isDark = ref(savedTheme === 'dark');

const theme = computed(() => (isDark.value ? darkTheme : null));

watch(isDark, value => {
  localStorage.setItem(STORAGE_KEY, value ? 'dark' : 'light');
});
</script>
```

### Dark Mode with Custom Theme Overrides

```vue
<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <n-global-style />
    <n-space vertical>
      <n-switch v-model:value="isDark" />
      <n-card title="Custom Dark Theme">
        <n-button type="primary">Custom Primary Color</n-button>
      </n-card>
    </n-space>
  </n-config-provider>
</template>

<script setup>
import { computed, ref } from 'vue';
import { darkTheme } from 'naive-ui';

const isDark = ref(false);

const theme = computed(() => (isDark.value ? darkTheme : null));

const lightThemeOverrides = {
  common: {
    primaryColor: '#18A058',
  },
};

const darkThemeOverrides = {
  common: {
    primaryColor: '#63E2B7',
    primaryColorHover: '#7FE7C5',
    primaryColorPressed: '#5acea7',
  },
};

const themeOverrides = computed(() => {
  return isDark.value ? darkThemeOverrides : lightThemeOverrides;
});
</script>
```

### System Preference with Manual Override

```vue
<template>
  <n-config-provider :theme="theme">
    <n-global-style />
    <n-space vertical>
      <n-radio-group v-model:value="themeMode">
        <n-radio-button value="light">Light</n-radio-button>
        <n-radio-button value="dark">Dark</n-radio-button>
        <n-radio-button value="system">System</n-radio-button>
      </n-radio-group>
      <n-card>
        <n-button type="primary">Theme Button</n-button>
      </n-card>
    </n-space>
  </n-config-provider>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useOsTheme, darkTheme } from 'naive-ui';

const STORAGE_KEY = 'theme-mode';

const osTheme = useOsTheme();
const savedMode = localStorage.getItem(STORAGE_KEY) || 'system';
const themeMode = ref(savedMode);

const theme = computed(() => {
  if (themeMode.value === 'dark') {
    return darkTheme;
  }
  if (themeMode.value === 'light') {
    return null;
  }
  return osTheme.value === 'dark' ? darkTheme : null;
});

watch(themeMode, value => {
  localStorage.setItem(STORAGE_KEY, value);
});
</script>
```

### Using Theme Variables

```vue
<template>
  <n-config-provider :theme="theme">
    <n-card :style="{ backgroundColor: themeVars.bodyColor }">
      <p :style="{ color: themeVars.textColorBase }">
        Current primary color: {{ themeVars.primaryColor }}
      </p>
      <n-button type="primary">Primary</n-button>
    </n-card>
  </n-config-provider>
</template>

<script setup>
import { ref } from 'vue';
import { darkTheme, useThemeVars } from 'naive-ui';

const theme = ref(null);
const themeVars = useThemeVars();
</script>
```

### Nested Theme Configuration

```vue
<template>
  <n-config-provider :theme="darkTheme">
    <n-card title="Dark Theme Area">
      <n-config-provider :theme="null">
        <n-card title="Light Theme Nested Area">
          <n-button type="primary">Light Button</n-button>
        </n-card>
      </n-config-provider>
    </n-card>
  </n-config-provider>
</template>

<script setup>
import { darkTheme } from 'naive-ui';
</script>
```

## Best Practices

1. **Use n-global-style**: Always include `<n-global-style />` to apply theme to body

   ```vue
   <n-config-provider :theme="theme">
     <n-global-style />
     <App />
   </n-config-provider>
   ```

2. **Persist user preference**: Save theme choice to localStorage

   ```js
   watch(isDark, value => {
     localStorage.setItem('theme', value ? 'dark' : 'light');
   });
   ```

3. **Provide system option**: Allow users to follow OS preference

   ```js
   import { useOsTheme } from 'naive-ui';
   const osTheme = useOsTheme();
   ```

4. **Customize dark theme separately**: Use different overrides for light and dark

   ```js
   const themeOverrides = computed(() =>
     isDark.value ? darkOverrides : lightOverrides,
   );
   ```

5. **Use computed for reactivity**: Make theme reactive with computed properties

   ```js
   const theme = computed(() => (isDark.value ? darkTheme : null));
   ```

6. **Avoid flash of wrong theme**: Set theme before app mounts

   ```js
   const savedTheme = localStorage.getItem('theme');
   const isDark = ref(savedTheme === 'dark');
   ```

7. **Test both themes**: Verify all components look correct in both modes

8. **Consider SSR**: Handle dark mode properly in server-side rendering
   ```vue
   <n-config-provider :theme="isDark ? darkTheme : null">
     <App />
   </n-config-provider>
   ```

## Common Dark Theme Variables

```ts
const darkThemeOverrides = {
  common: {
    bodyColor: '#1c1c1e',
    cardColor: '#2c2c2e',
    modalColor: '#2c2c2e',
    popoverColor: '#2c2c2e',
    tableColor: '#2c2c2e',
    textColorBase: '#ffffff',
    textColor1: '#ffffff',
    textColor2: 'rgba(255, 255, 255, 0.82)',
    textColor3: 'rgba(255, 255, 255, 0.56)',
    primaryColor: '#63E2B7',
    primaryColorHover: '#7FE7C5',
    primaryColorPressed: '#5acea7',
    infoColor: '#70C0E8',
    successColor: '#63E2B7',
    warningColor: '#F2C97D',
    errorColor: '#E88080',
    borderColor: 'rgba(255, 255, 255, 0.12)',
    dividerColor: 'rgba(255, 255, 255, 0.12)',
  },
};
```

## Troubleshooting

### Body Background Not Changing

**Problem**: Dark mode applies to components but body remains light

**Solution**: Add `<n-global-style />` inside `n-config-provider`

```vue
<n-config-provider :theme="theme">
  <n-global-style />
  <App />
</n-config-provider>
```

### Flash of Light Theme on Load

**Problem**: Page briefly shows light theme before switching to dark

**Solution**: Load theme preference before app renders

```js
const savedTheme = localStorage.getItem('theme');
const isDark = ref(savedTheme === 'dark');
```

### Theme Not Persisting

**Problem**: Theme resets on page reload

**Solution**: Watch and save theme changes

```js
watch(
  isDark,
  value => {
    localStorage.setItem('theme', value ? 'dark' : 'light');
  },
  { immediate: true },
);
```

## Related Skills

- [n-config-provider](../components/n-config-provider/SKILL.md): Global configuration component
- [n-global-style](../components/n-global-style/SKILL.md): Global style synchronization
- [naive-ui-theming](../naive-ui-theming/SKILL.md): Theme customization guide
- [naive-ui-ssr](../naive-ui-ssr/SKILL.md): SSR considerations for dark mode
