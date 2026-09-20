---
name: 'n-icon'
description: 'Icon component for displaying SVG icons with customizable size, color, and depth. Invoke when user needs to implement icons, icon wrappers, or integrate icon libraries in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Icon Component

Icon component for displaying SVG icons with customizable size, color, and depth. Recommended to use with [xicons](https://www.xicons.org).

## When to Use

Use this component when:

- **UI icons**: Display action icons, status indicators, or navigation icons
- **Button icons**: Add icons to buttons for better visual communication
- **List icons**: Add icons to list items or menu items
- **Status indicators**: Show success, warning, or error states
- **Icon buttons**: Create icon-only buttons or controls

## When to Invoke

Invoke this skill when:

- User needs to implement icons in the UI
- User wants to customize icon size or color
- User needs icons with different depth levels
- User wants to use icon wrappers for background
- User asks about integrating icon libraries like xicons
- User needs custom SVG icons

## Features

- **Size Control**: Number or string for icon size
- **Color Customization**: Custom icon color
- **Depth Levels**: 1-5 depth levels for matching text colors
- **Component Prop**: Pass icon component directly
- **Icon Wrapper**: Background wrapper for icons
- **Custom SVG Support**: Use custom SVG elements
- **Icon Library Integration**: Works with xicons and other icon libraries

## API Reference

### Icon Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| color | `string` | `undefined` | Icon color. |
| depth | `1 \| 2 \| 3 \| 4 \| 5` | `undefined` | Icon depth. |
| size | `number \| string` | `undefined` | Icon size (when the unit is not specified the default unit is `px`). |
| component | `Component` | `undefined` | Icon component to display. |

### IconWrapper Props

| Name          | Type     | Default     | Description    |
| ------------- | -------- | ----------- | -------------- |
| border-radius | `number` | `6`         | Border radius. |
| color         | `string` | `undefined` | Color.         |
| icon-color    | `string` | `undefined` | Icon color.    |
| size          | `number` | `24`        | Size.          |

### Icon Slots

| Name    | Parameters | Description              |
| ------- | ---------- | ------------------------ |
| default | `()`       | The content of the icon. |

## Basic Usage

### Basic Icons

```vue
<template>
  <n-space>
    <n-icon size="40">
      <GameControllerOutline />
    </n-icon>
    <n-icon size="40" color="#0e7a0d">
      <GameController />
    </n-icon>
    <n-icon size="40" :component="GameController" />
  </n-space>
</template>
```

### Icon Sizes

```vue
<template>
  <n-space align="center">
    <n-icon size="16">
      <CashOutline />
    </n-icon>
    <n-icon size="24">
      <CashOutline />
    </n-icon>
    <n-icon size="32">
      <CashOutline />
    </n-icon>
    <n-icon size="48">
      <CashOutline />
    </n-icon>
  </n-space>
</template>
```

### Icon Colors

```vue
<template>
  <n-space>
    <n-icon size="24" color="#18a058">
      <CheckmarkCircle />
    </n-icon>
    <n-icon size="24" color="#2080f0">
      <InformationCircle />
    </n-icon>
    <n-icon size="24" color="#f0a020">
      <Warning />
    </n-icon>
    <n-icon size="24" color="#d03050">
      <CloseCircle />
    </n-icon>
  </n-space>
</template>
```

### Icon Depth

```vue
<template>
  <n-space>
    <n-icon :component="CashOutline" size="40" :depth="1" />
    <n-icon :component="CashOutline" size="40" :depth="2" />
    <n-icon :component="CashOutline" size="40" :depth="3" />
    <n-icon :component="CashOutline" size="40" :depth="4" />
    <n-icon :component="CashOutline" size="40" :depth="5" />
  </n-space>
</template>
```

### Custom SVG Icon

```vue
<template>
  <n-icon size="40">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path
        d="M368.5 240H272v-96.5c0-8.8-7.2-16-16-16s-16 7.2-16 16V240h-96.5c-8.8 0-16 7.2-16 16 0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7H240v96.5c0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7 8.8 0 16-7.2 16-16V272h96.5c8.8 0 16-7.2 16-16s-7.2-16-16-16z"
      />
    </svg>
  </n-icon>
</template>
```

### Icon with Background

```vue
<template>
  <n-icon-wrapper :size="24" :border-radius="10">
    <n-icon :size="18" :component="Checkmark16Filled" />
  </n-icon-wrapper>
</template>
```

## Common Patterns

### Icon in Button

```vue
<template>
  <n-space>
    <n-button>
      <template #icon>
        <n-icon><AddIcon /></n-icon>
      </template>
      Add Item
    </n-button>
    <n-button circle>
      <template #icon>
        <n-icon><SettingsIcon /></n-icon>
      </template>
    </n-button>
  </n-space>
</template>
```

### Status Icons

```vue
<template>
  <n-space>
    <n-tag type="success">
      <template #icon>
        <n-icon :component="CheckmarkCircle" />
      </template>
      Success
    </n-tag>
    <n-tag type="warning">
      <template #icon>
        <n-icon :component="Warning" />
      </template>
      Warning
    </n-tag>
    <n-tag type="error">
      <template #icon>
        <n-icon :component="CloseCircle" />
      </template>
      Error
    </n-tag>
  </n-space>
</template>
```

### Icon with Avatar

```vue
<template>
  <n-avatar>
    <n-icon>
      <PersonOutline />
    </n-icon>
  </n-avatar>
</template>
```

### Icon List

```vue
<template>
  <n-list>
    <n-list-item v-for="item in menuItems" :key="item.id">
      <template #prefix>
        <n-icon :component="item.icon" />
      </template>
      {{ item.label }}
    </n-list-item>
  </n-list>
</template>

<script setup>
import { ref } from 'vue';
import { HomeOutline, SettingsOutline, PersonOutline } from '@vicons/ionicons5';

const menuItems = ref([
  { id: 1, label: 'Home', icon: HomeOutline },
  { id: 2, label: 'Settings', icon: SettingsOutline },
  { id: 3, label: 'Profile', icon: PersonOutline },
]);
</script>
```

### Icon with Tooltip

```vue
<template>
  <n-tooltip>
    <template #trigger>
      <n-icon size="20" style="cursor: pointer">
        <InformationCircle />
      </n-icon>
    </template>
    This is a helpful tooltip
  </n-tooltip>
</template>
```

### Icon Wrapper Variants

```vue
<template>
  <n-space>
    <n-icon-wrapper :size="32" color="#18a058" icon-color="#fff">
      <n-icon :size="20" :component="CheckmarkCircle" />
    </n-icon-wrapper>
    <n-icon-wrapper :size="32" color="#2080f0" icon-color="#fff">
      <n-icon :size="20" :component="InformationCircle" />
    </n-icon-wrapper>
    <n-icon-wrapper :size="32" color="#d03050" icon-color="#fff">
      <n-icon :size="20" :component="CloseCircle" />
    </n-icon-wrapper>
  </n-space>
</template>
```

### Using Component Prop

```vue
<template>
  <n-space>
    <n-icon :component="HomeOutline" size="24" />
    <n-icon :component="SettingsOutline" size="24" />
    <n-icon :component="PersonOutline" size="24" />
  </n-space>
</template>

<script setup>
import { HomeOutline, SettingsOutline, PersonOutline } from '@vicons/ionicons5';
</script>
```

## Best Practices

1. **Use recommended icon libraries**: Use [xicons](https://www.xicons.org) for consistent icon sets

   ```vue
   <script setup>
   import { HomeOutline } from '@vicons/ionicons5';
   </script>
   ```

2. **Match icon size with text**: Use appropriate sizes for different contexts
   - 16px for inline with small text
   - 20px for inline with regular text
   - 24px for standard icons
   - 32px+ for feature icons

3. **Use depth for hierarchy**: Match icon depth with surrounding text

   ```vue
   <n-text depth="3">
     <n-icon :depth="3"><InfoIcon /></n-icon>
     Secondary information
   </n-text>
   ```

4. **Ensure SVG viewBox is set**: Custom SVG icons must have viewBox attribute

   ```vue
   <n-icon>
     <svg viewBox="0 0 24 24">
       <!-- SVG content -->
     </svg>
   </n-icon>
   ```

5. **Use icon-wrapper for emphasis**: Add background for important icons

   ```vue
   <n-icon-wrapper color="#18a058">
     <n-icon :component="CheckIcon" />
   </n-icon-wrapper>
   ```

6. **Consistent icon style**: Use the same icon family throughout the application
   - Use outline icons for UI elements
   - Use filled icons for emphasis or active states

7. **Accessibility**: Add aria-label for standalone icons
   ```vue
   <n-icon size="20" aria-label="Settings">
     <SettingsOutline />
   </n-icon>
   ```
