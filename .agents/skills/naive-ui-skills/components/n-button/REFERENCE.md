---
name: 'n-button'
description: 'Button component with various types, sizes, and styles. Invoke when user needs to implement buttons, button groups, or customize button appearance in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Button Component

Button component for user interactions with multiple types, sizes, and styles.

## When to Use

Use this component when:

- **Form submissions**: Submit, reset, or cancel form data
- **Action triggers**: Execute operations like save, delete, edit
- **Navigation controls**: Navigate between pages or sections
- **Interactive elements**: Toggle states, open dialogs, trigger menus

## When to Invoke

Invoke this skill when:

- User needs to implement a button with specific type or style
- User wants to create button groups
- User needs loading or disabled state buttons
- User wants to customize button colors
- User asks about button icons or accessibility
- User needs different button variants (secondary, tertiary, quaternary, ghost, text)

## Features

- **Multiple Types**: default, primary, tertiary, info, success, warning, error
- **Multiple Sizes**: tiny, small, medium, large
- **Style Variants**: secondary, tertiary, quaternary, ghost, text, dashed
- **Shape Options**: round, circle
- **States**: loading, disabled
- **Custom Colors**: custom background and text colors
- **Button Groups**: horizontal or vertical grouping
- **Icon Support**: icon slots and render functions
- **Tag Customization**: custom element tag (button, a, div, etc.)

## API Reference

### Button Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| type | `'default' \| 'tertiary' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'default'` | Button type. |
| size | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Button size. |
| disabled | `boolean` | `false` | Whether the button is disabled. |
| loading | `boolean` | `false` | Whether the button shows the loading status. |
| round | `boolean` | `false` | Whether the button shows rounded corners. |
| circle | `boolean` | `false` | Whether the button is round (circular). |
| ghost | `boolean` | `false` | Whether the button is ghost (transparent background). |
| secondary | `boolean` | `false` | Whether the button is secondary button. |
| tertiary | `boolean` | `false` | Whether the button is tertiary button. |
| quaternary | `boolean` | `false` | Whether the button is quaternary button. |
| dashed | `boolean` | `false` | Whether the button's border is a dashed line. |
| text | `boolean` | `false` | Whether to display as a text button. |
| color | `string` | `undefined` | Button color (supports `#FFF`, `#FFFFFF`, `yellow`, `rgb(0, 0, 0)` formats). |
| text-color | `string` | `undefined` | Button text color (supports same formats as `color`). |
| bordered | `boolean` | `true` | Whether the button shows the border. |
| block | `boolean` | `false` | Whether the button is displayed as block (full width). |
| tag | `string` | `'button'` | What tag the button should be rendered as. |
| icon-placement | `'left' \| 'right'` | `'left'` | The position of the icon in the button. |
| attr-type | `'button' \| 'submit' \| 'reset'` | `'button'` | The `type` attribute of the button's DOM. |
| focusable | `boolean` | `true` | Whether the button is focusable. |
| keyboard | `boolean` | `true` | Whether it supports keyboard operation. |
| native-focus-behavior | `boolean` | Browser is not Safari | Whether to follow button's native focus behavior. |
| spin-props | `{ strokeWidth?: number, stroke?: string, scale?: number, radius?: number }` | `undefined` | Loading icon properties. |
| render-icon | `() => VNodeChild` | `undefined` | Render function that renders button icon. |
| strong | `boolean` | `false` | Whether to use strong text in the button. |

### Button Events

| Name  | Parameters        | Description                            |
| ----- | ----------------- | -------------------------------------- |
| click | `(e: MouseEvent)` | Triggered when the button is clicked.  |
| blur  | `(e: FocusEvent)` | Triggered when the button loses focus. |
| focus | `(e: FocusEvent)` | Triggered when the button gains focus. |

### Button Slots

| Name    | Parameters | Description                        |
| ------- | ---------- | ---------------------------------- |
| default | `()`       | The default content of the button. |
| icon    | `()`       | The icon of the button.            |

### ButtonGroup Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| size | `'tiny' \| 'small' \| 'medium' \| 'large'` | `undefined` | The buttons' size in button group. If set, the button's size prop inside group won't work. |
| vertical | `boolean` | `false` | Direction of buttons in the group. |

### ButtonGroup Slots

| Name    | Parameters | Description                            |
| ------- | ---------- | -------------------------------------- |
| default | `()`       | The button group is filled by default. |

## Basic Usage

### Basic Button Types

```vue
<template>
  <n-space>
    <n-button>Default</n-button>
    <n-button type="tertiary">Tertiary</n-button>
    <n-button type="primary">Primary</n-button>
    <n-button type="info">Info</n-button>
    <n-button type="success">Success</n-button>
    <n-button type="warning">Warning</n-button>
    <n-button type="error">Error</n-button>
  </n-space>
</template>
```

### Button Sizes

```vue
<template>
  <n-space align="baseline">
    <n-button size="tiny">Tiny</n-button>
    <n-button size="small">Small</n-button>
    <n-button size="medium">Medium</n-button>
    <n-button size="large">Large</n-button>
  </n-space>
</template>
```

### Secondary Buttons

```vue
<template>
  <n-space>
    <n-button strong secondary>Default</n-button>
    <n-button strong secondary type="primary">Primary</n-button>
    <n-button strong secondary type="info">Info</n-button>
    <n-button strong secondary type="success">Success</n-button>
    <n-button strong secondary type="warning">Warning</n-button>
    <n-button strong secondary type="error">Error</n-button>
  </n-space>
</template>
```

### Tertiary Buttons

```vue
<template>
  <n-space>
    <n-button tertiary>Default</n-button>
    <n-button tertiary type="primary">Primary</n-button>
    <n-button tertiary type="info">Info</n-button>
    <n-button tertiary type="success">Success</n-button>
    <n-button tertiary type="warning">Warning</n-button>
    <n-button tertiary type="error">Error</n-button>
  </n-space>
</template>
```

### Quaternary Buttons

```vue
<template>
  <n-space>
    <n-button quaternary>Default</n-button>
    <n-button quaternary type="primary">Primary</n-button>
    <n-button quaternary type="info">Info</n-button>
    <n-button quaternary type="success">Success</n-button>
    <n-button quaternary type="warning">Warning</n-button>
    <n-button quaternary type="error">Error</n-button>
  </n-space>
</template>
```

### Ghost Buttons

```vue
<template>
  <n-space>
    <n-button ghost>Default</n-button>
    <n-button type="primary" ghost>Primary</n-button>
    <n-button type="info" ghost>Info</n-button>
    <n-button type="success" ghost>Success</n-button>
    <n-button type="warning" ghost>Warning</n-button>
    <n-button type="error" ghost>Error</n-button>
  </n-space>
</template>
```

### Dashed Buttons

```vue
<template>
  <n-space>
    <n-button dashed>Default</n-button>
    <n-button type="primary" dashed>Primary</n-button>
    <n-button type="info" dashed>Info</n-button>
    <n-button type="success" dashed>Success</n-button>
    <n-button type="warning" dashed>Warning</n-button>
    <n-button type="error" dashed>Error</n-button>
  </n-space>
</template>
```

### Text Buttons

```vue
<template>
  <n-space>
    <n-button text>Text Button</n-button>
    <n-button text type="primary">
      <template #icon>
        <n-icon><TrainIcon /></n-icon>
      </template>
      With Icon
    </n-button>
  </n-space>
</template>
```

## Common Patterns

### Loading State

```vue
<template>
  <n-space>
    <n-button :loading="loading" @click="handleClick"> Submit </n-button>
    <n-button :loading="loading" @click="handleClick">
      <template #icon>
        <n-icon><CashIcon /></n-icon>
      </template>
      With Icon
    </n-button>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const loading = ref(false);

const handleClick = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>
```

### Icon Buttons

```vue
<template>
  <n-space>
    <!-- Using render-icon prop -->
    <n-button :render-icon="renderIcon"> +100$ </n-button>

    <!-- Using icon slot -->
    <n-button icon-placement="right">
      <template #icon>
        <n-icon><CashIcon /></n-icon>
      </template>
      Right Icon
    </n-button>

    <!-- Circle icon button -->
    <n-button circle>
      <template #icon>
        <n-icon><CashIcon /></n-icon>
      </template>
    </n-button>
  </n-space>
</template>

<script setup>
import { h } from 'vue';
import { CashOutline as CashIcon } from '@vicons/ionicons5';

const renderIcon = () => h(CashIcon);
</script>
```

### Button Group

```vue
<template>
  <!-- Horizontal button group -->
  <n-button-group>
    <n-button>Left</n-button>
    <n-button>Center</n-button>
    <n-button>Right</n-button>
  </n-button-group>

  <!-- Vertical button group -->
  <n-button-group vertical>
    <n-button>
      <template #icon>
        <n-icon><LogInIcon /></n-icon>
      </template>
    </n-button>
    <n-button>
      <template #icon>
        <n-icon><LogOutIcon /></n-icon>
      </template>
    </n-button>
  </n-button-group>
</template>
```

### Custom Color

```vue
<template>
  <n-space align="center">
    <n-button color="#8a2be2">Purple</n-button>
    <n-button color="#8a2be2" ghost>Ghost Purple</n-button>
    <n-button color="#ff69b4" text-color="#ffffff">Pink</n-button>
  </n-space>
</template>
```

### Custom Tag (Link Button)

```vue
<template>
  <n-button
    text
    tag="a"
    href="https://example.com"
    target="_blank"
    type="primary"
  >
    External Link
  </n-button>
</template>
```

### Disabled with Tooltip

```vue
<template>
  <n-tooltip>
    <template #trigger>
      <n-button disabled tag="div"> Disabled button as div </n-button>
    </template>
    This button is disabled
  </n-tooltip>
</template>
```

### Block Button

```vue
<template>
  <n-button block type="primary"> Full Width Button </n-button>
</template>
```

### Form Integration

```vue
<template>
  <n-form>
    <n-form-item>
      <n-space>
        <n-button type="primary" attr-type="submit"> Submit </n-button>
        <n-button attr-type="reset"> Reset </n-button>
      </n-space>
    </n-form-item>
  </n-form>
</template>
```

## Best Practices

1. **Use semantic types**: Use appropriate type for different actions
   - `primary` for main actions
   - `error` or `warning` for destructive actions
   - `default` for secondary actions

2. **Provide feedback**: Use loading state for async operations

   ```vue
   <n-button :loading="submitting" @click="handleSubmit">
     Submit
   </n-button>
   ```

3. **Accessibility**: Add aria-label for icon-only buttons

   ```vue
   <n-button circle aria-label="Add item">
     <template #icon>
       <n-icon><AddIcon /></n-icon>
     </template>
   </n-button>
   ```

4. **Consistent sizing**: Use consistent sizes within the same context

5. **Button groups**: Use ButtonGroup for related actions

6. **Disabled state with tooltip**: Use `tag="div"` when you need tooltip on disabled button

7. **Icon placement**: Use `icon-placement` prop to position icons

8. **Custom colors**: Use `color` and `text-color` props for brand-specific styling
