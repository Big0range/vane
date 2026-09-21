---
name: naive-ui-theming
description: Customize and apply themes in Naive UI including dark mode, theme variables, and creating themed components
metadata:
  author: jiaiyan
  version: 1.0.0
---

# Naive UI Theming

Learn how to customize themes, apply dark mode, and create themed components in Naive UI.

## When to Use

Use this skill when you need to:

- Implement dark/light mode switching
- Customize theme colors and variables
- Create themed components that respond to theme changes
- Access theme variables in your components

## Prerequisites

- Basic understanding of Naive UI setup
- Vue 3 Composition API knowledge
- CSS custom properties (CSS variables) understanding

## Basic Usage

### Theme Switching

Use `n-config-provider` to control the theme of all descendant components:

```vue
<template>
  <n-config-provider :theme="theme">
    <n-card>
      <n-space>
        <n-button @click="theme = darkTheme"> Dark </n-button>
        <n-button @click="theme = null"> Light </n-button>
      </n-space>
    </n-card>
  </n-config-provider>
</template>

<script setup>
import { ref } from 'vue';
import { darkTheme } from 'naive-ui';

const theme = ref(null);
</script>
```

### Using n-element for Theme-Aware Styling

The `n-element` component allows you to apply theme-aware styles using CSS variables:

```vue
<template>
  <n-space vertical>
    <n-space>
      <n-button @click="theme = darkTheme">Dark</n-button>
      <n-button @click="theme = null">Light</n-button>
    </n-space>
    <n-config-provider :theme="theme">
      <n-card>
        <n-el
          tag="span"
          style="
            color: var(--primary-color);
            transition: 0.3s var(--cubic-bezier-ease-in-out);
          "
        >
          I am a Span with theme-aware styling.
        </n-el>
      </n-card>
    </n-config-provider>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';
import { darkTheme } from 'naive-ui';

const theme = ref(null);
</script>
```

### Using Theme Variables with useThemeVars

Access theme variables programmatically using the `useThemeVars` composable:

```vue
<template>
  <div :style="{ color: themeVars.primaryColor }">Primary colored text</div>
  <pre style="overflow: auto">{{ themeVars }}</pre>
</template>

<script setup>
import { useThemeVars } from 'naive-ui';

const themeVars = useThemeVars();
</script>
```

## API Reference

### n-config-provider Theme Props

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `theme` | `object \| null` | `null` | Theme object (use `darkTheme` for dark mode, `null` for light) |
| `theme-overrides` | `object` | - | Custom theme overrides |

### Available Theme Variables

Common theme variables accessible via `useThemeVars()`:

| Variable              | Description                |
| --------------------- | -------------------------- |
| `primaryColor`        | Primary color              |
| `primaryColorHover`   | Primary color on hover     |
| `primaryColorPressed` | Primary color when pressed |
| `successColor`        | Success state color        |
| `warningColor`        | Warning state color        |
| `errorColor`          | Error state color          |
| `infoColor`           | Info state color           |
| `textColorBase`       | Base text color            |
| `textColor1`          | Primary text color         |
| `textColor2`          | Secondary text color       |
| `textColor3`          | Tertiary text color        |
| `borderColor`         | Border color               |
| `borderRadius`        | Border radius              |

### n-element Props

| Property | Type     | Default | Description        |
| -------- | -------- | ------- | ------------------ |
| `tag`    | `string` | `'div'` | HTML tag to render |

## Common Patterns

### Persistent Theme with Local Storage

```vue
<template>
  <n-config-provider :theme="theme">
    <n-button @click="toggleTheme"> Toggle Theme </n-button>
    <slot />
  </n-config-provider>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { darkTheme } from 'naive-ui';

const theme = ref(null);

const toggleTheme = () => {
  theme.value = theme.value ? null : darkTheme;
  localStorage.setItem('theme', theme.value ? 'dark' : 'light');
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  theme.value = savedTheme === 'dark' ? darkTheme : null;
});
</script>
```

### Custom Theme Overrides

```vue
<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <App />
  </n-config-provider>
</template>

<script setup>
import { ref } from 'vue';

const themeOverrides = ref({
  common: {
    primaryColor: '#18a058',
    primaryColorHover: '#36ad6a',
    primaryColorPressed: '#0c7a43',
  },
  Button: {
    textColor: '#18a058',
  },
});
</script>
```

### Theme-Aware Component

```vue
<template>
  <n-config-provider :theme="theme">
    <div :style="containerStyle">
      <n-card :style="cardStyle">
        <n-text :depth="1"> Theme-aware content </n-text>
      </n-card>
    </div>
  </n-config-provider>
</template>

<script setup>
import { computed, ref } from 'vue';
import { darkTheme, useThemeVars } from 'naive-ui';

const theme = ref(null);
const themeVars = useThemeVars();

const containerStyle = computed(() => ({
  backgroundColor: themeVars.value.bodyColor,
  padding: '20px',
  transition: 'background-color 0.3s',
}));

const cardStyle = computed(() => ({
  borderColor: themeVars.value.borderColor,
}));
</script>
```

## Best Practices

1. **Use CSS Variables**: Leverage CSS custom properties for smooth theme transitions
2. **Wrap at Root Level**: Place `n-config-provider` at the top of your component tree
3. **Persist User Preference**: Store theme preference in localStorage for better UX
4. **Test Both Themes**: Always test your components in both light and dark modes
5. **Use Transitions**: Add CSS transitions for smooth theme switching animations
6. **Override Selectively**: Only override the theme variables you need to customize

## CSS Variable Reference

Naive UI provides numerous CSS variables that automatically update with theme changes:

```css
/* Common theme variables */
--primary-color
--primary-color-hover
--primary-color-pressed
--success-color
--warning-color
--error-color
--info-color

/* Text colors */
--text-color-base
--text-color-1
--text-color-2
--text-color-3

/* Background colors */
--body-color
--card-color
--modal-color

/* Border */
--border-color
--border-radius

/* Animation */
--cubic-bezier-ease-in-out
--cubic-bezier-ease-out
--cubic-bezier-ease-in
```

Use these variables in your styles for consistent theming:

```vue
<template>
  <div class="custom-component">Themed content</div>
</template>

<style scoped>
.custom-component {
  background-color: var(--card-color);
  border: 1px solid var(--border-color);
  color: var(--text-color-1);
  transition: all 0.3s var(--cubic-bezier-ease-in-out);
}
</style>
```
