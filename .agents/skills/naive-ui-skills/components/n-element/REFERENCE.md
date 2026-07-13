---
name: 'n-element'
description: 'Element component that provides access to theme CSS variables. Invoke when user needs to use theme variables in custom elements or access CSS variables within the theme context.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Element Component

Element is a utility component that provides access to Naive UI's theme CSS variables. It renders as any HTML element and inherits theme variables from the nearest `n-config-provider`.

## When to Use

Use this component when:

- **Custom styled elements**: Apply theme colors to custom elements
- **CSS variable access**: Use theme variables in inline styles
- **Theme-aware styling**: Create elements that respond to theme changes
- **Consistent theming**: Maintain visual consistency with Naive UI components

## When to Invoke

Invoke this skill when:

- User needs to use theme CSS variables in custom elements
- User wants to create theme-aware styled components
- User needs to apply primary color or other theme colors
- User asks about accessing theme variables in templates
- User wants to create custom elements that follow the theme

## Features

- **CSS Variable Access**: Access all theme CSS variables
- **Custom Tag**: Render as any HTML element
- **Theme Reactive**: Automatically updates when theme changes
- **No Extra Styling**: Pure pass-through component

## API Reference

### Element Props

| Name | Type     | Default | Description                |
| ---- | -------- | ------- | -------------------------- |
| tag  | `string` | `'div'` | The HTML tag to render as. |

### Element Slots

| Name    | Parameters | Description                 |
| ------- | ---------- | --------------------------- |
| default | `()`       | The content of the element. |

## Basic Usage

### Basic Element with Theme Variables

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
          I am a Span with primary color.
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

### Different Tag Types

```vue
<template>
  <n-config-provider :theme="theme">
    <n-el tag="section" style="background: var(--card-color); padding: 16px;">
      <n-el tag="h2" style="color: var(--title-text-color);"> Title </n-el>
      <n-el tag="p" style="color: var(--text-color-2);">
        Paragraph content with theme colors.
      </n-el>
    </n-el>
  </n-config-provider>
</template>
```

## Common Patterns

### Theme-Aware Custom Card

```vue
<template>
  <n-config-provider :theme="theme">
    <n-el tag="div" :style="cardStyle">
      <n-el tag="h3" :style="titleStyle"> Custom Card Title </n-el>
      <n-el tag="p" :style="contentStyle">
        This card uses theme variables for consistent styling.
      </n-el>
    </n-el>
  </n-config-provider>
</template>

<script setup>
import { computed, ref } from 'vue';
import { darkTheme } from 'naive-ui';

const theme = ref(null);

const cardStyle = computed(() => ({
  background: 'var(--card-color)',
  border: '1px solid var(--border-color)',
  borderRadius: 'var(--border-radius)',
  padding: '16px',
  transition: 'all 0.3s var(--cubic-bezier-ease-in-out)',
}));

const titleStyle = {
  color: 'var(--title-text-color)',
  margin: '0 0 8px 0',
};

const contentStyle = {
  color: 'var(--text-color-2)',
  margin: 0,
};
</script>
```

### Custom Button with Theme Variables

```vue
<template>
  <n-config-provider :theme="theme">
    <n-el tag="button" :style="buttonStyle" @click="handleClick">
      Custom Themed Button
    </n-el>
  </n-config-provider>
</template>

<script setup>
import { computed, ref } from 'vue';
import { darkTheme } from 'naive-ui';

const theme = ref(null);

const buttonStyle = computed(() => ({
  background: 'var(--primary-color)',
  color: 'var(--base-color)',
  border: 'none',
  borderRadius: 'var(--border-radius-small)',
  padding: '8px 16px',
  cursor: 'pointer',
  transition: 'all 0.3s var(--cubic-bezier-ease-in-out)',
}));

const handleClick = () => {
  console.log('Button clicked');
};
</script>
```

### Status Indicator with Theme Colors

```vue
<template>
  <n-config-provider :theme="theme">
    <n-space>
      <n-el :style="getStatusStyle('success')"> Success Status </n-el>
      <n-el :style="getStatusStyle('warning')"> Warning Status </n-el>
      <n-el :style="getStatusStyle('error')"> Error Status </n-el>
      <n-el :style="getStatusStyle('info')"> Info Status </n-el>
    </n-space>
  </n-config-provider>
</template>

<script setup>
const getStatusStyle = status => {
  const colorMap = {
    success: 'var(--success-color)',
    warning: 'var(--warning-color)',
    error: 'var(--error-color)',
    info: 'var(--info-color)',
  };

  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    borderRadius: 'var(--border-radius-small)',
    background: `${colorMap[status]}1a`,
    color: colorMap[status],
    fontSize: '12px',
  };
};
</script>
```

### Custom Divider with Theme Variables

```vue
<template>
  <n-config-provider :theme="theme">
    <div>
      <p>Content above</p>
      <n-el tag="hr" :style="dividerStyle" />
      <p>Content below</p>
    </div>
  </n-config-provider>
</template>

<script setup>
const dividerStyle = {
  border: 'none',
  borderTop: '1px solid var(--divider-color)',
  margin: '16px 0',
};
</script>
```

### Responsive Container with Theme

```vue
<template>
  <n-config-provider :theme="theme">
    <n-el tag="main" :style="containerStyle">
      <n-el tag="article" :style="articleStyle">
        <n-el tag="h1" :style="headingStyle"> Article Title </n-el>
        <n-el tag="p" :style="paragraphStyle">
          Article content with theme-aware styling.
        </n-el>
      </n-el>
    </n-el>
  </n-config-provider>
</template>

<script setup>
const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '24px',
  background: 'var(--body-color)',
  minHeight: '100vh',
};

const articleStyle = {
  background: 'var(--card-color)',
  borderRadius: 'var(--border-radius)',
  padding: '24px',
  boxShadow: 'var(--box-shadow-1)',
};

const headingStyle = {
  color: 'var(--title-text-color)',
  margin: '0 0 16px 0',
};

const paragraphStyle = {
  color: 'var(--text-color-1)',
  lineHeight: '1.6',
};
</script>
```

## Best Practices

1. **Use with n-config-provider**: Always wrap `n-element` with `n-config-provider` for theme context

   ```vue
   <n-config-provider :theme="theme">
     <n-el style="color: var(--primary-color);">
       Themed content
     </n-el>
   </n-config-provider>
   ```

2. **Access theme variables in JS**: Use `useThemeVars` for JavaScript access

   ```vue
   <script setup>
   import { useThemeVars } from 'naive-ui';
   const themeVars = useThemeVars();
   // Access: themeVars.value.primaryColor
   </script>
   ```

3. **Common CSS variables**: Frequently used theme variables
   - `--primary-color`: Primary brand color
   - `--success-color`, `--warning-color`, `--error-color`, `--info-color`: Status colors
   - `--text-color-1`, `--text-color-2`, `--text-color-3`: Text colors
   - `--border-color`: Border color
   - `--card-color`: Card background color
   - `--body-color`: Body background color

4. **Add transitions**: Include transitions for smooth theme switching

   ```vue
   <n-el
     style="
     color: var(--primary-color);
     transition: color 0.3s var(--cubic-bezier-ease-in-out);
   "
   >
     Smooth transition
   </n-el>
   ```

5. **Semantic tags**: Use appropriate HTML tags for accessibility

   ```vue
   <n-el tag="article">...</n-el>
   <n-el tag="section">...</n-el>
   <n-el tag="nav">...</n-el>
   ```

6. **Combine with computed styles**: Use computed properties for dynamic styling

   ```vue
   <script setup>
   import { computed } from 'vue';

   const customStyle = computed(() => ({
     background: isActive.value ? 'var(--primary-color)' : 'var(--card-color)',
     transition: 'background 0.3s var(--cubic-bezier-ease-in-out)',
   }));
   </script>
   ```

7. **Keep styles in sync**: Use the same CSS variables as Naive UI components for visual consistency
