---
name: 'n-popover'
description: 'Popover component for displaying floating content. Invoke when user needs to implement tooltips, dropdown menus, or floating panels in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Popover Component

Pop some hidden message around content. Popover displays additional content in a floating layer triggered by user interaction.

## When to Use

Use this component when:

- **Rich tooltips**: Display complex content in tooltips
- **Dropdown menus**: Create custom dropdown menus
- **Info panels**: Show additional information on hover/click
- **Form popups**: Display forms or inputs in floating layer
- **Context menus**: Create context-sensitive menus

## When to Invoke

Invoke this skill when:

- User needs to implement popover components
- User wants to show floating content on hover/click
- User needs custom tooltips with rich content
- User asks about popover positioning
- User wants to create dropdown menus

## Features

- **Multiple Triggers**: Support hover, click, focus, and manual triggers
- **Flexible Placement**: 12 placement options
- **Customizable Styling**: Full control over appearance
- **Arrow Support**: Optional arrow pointing to trigger
- **Manual Positioning**: Support for manual x/y positioning

## API Reference

### Popover Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| animated | `boolean` | `true` | Use animation when popping up. |  |
| arrow-point-to-center | `boolean` | `false` | Whether the arrow points to center of the trigger element. | 2.26.0 |
| arrow-class | `string` | `undefined` | Arrow class of the popover. | 2.36.0 |
| arrow-style | `string \| Object` | `undefined` | Arrow style of the popover. |  |
| content-class | `string` | `undefined` | Content class of the popover. | 2.36.0 |
| content-style | `string \| Object` | `undefined` | Content style of the popover. | 2.28.3 |
| delay | `number` | `100` | Popover showing delay when trigger is `hover`. |  |
| disabled | `boolean` | `false` | Whether the popover can't be activated. |  |
| display-directive | `'if' \| 'show'` | `'if'` | The conditionally render directive. |  |
| duration | `number` | `100` | Popover vanish delay when trigger is `hover`. |  |
| flip | `boolean` | `true` | Whether to flip the popover when there is no space. |  |
| keep-alive-on-hover | `boolean` | `true` | Whether to keep popover shown when hover on popover. | 2.25.0 |
| overlap | `boolean` | `false` | Overlap trigger element. |  |
| placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'` | `'top'` | Popover placement. |  |
| raw | `boolean` | `false` | Whether to use no default styles. |  |
| scrollable | `boolean` | `false` | Whether the popover's content is scrollable. | 2.28.3 |
| show | `boolean` | `undefined` | Whether to show popover. |  |
| show-arrow | `boolean` | `true` | Whether to show arrow. |  |
| to | `string \| HTMLElement \| false` | `'body'` | Container node of the popover content. |  |
| trigger | `'hover' \| 'click' \| 'focus' \| 'manual'` | `'hover'` | The popover trigger type. |  |
| width | `number \| 'trigger'` | `undefined` | Popover width. `'trigger'` follows trigger width. |  |
| x | `number` | `undefined` | The CSS `left` pixel value for manual positioning. |  |
| y | `number` | `undefined` | The CSS `top` pixel value for manual positioning. |  |
| z-index | `number` | `undefined` | The z-index of the popover. |  |

### Popover Slots

| Name | Parameters | Description | Version |
| --- | --- | --- | --- |
| trigger | `()` | The element or component that triggers popover. |  |
| footer | `()` | The footer content of the popover. | 2.31.0 |
| header | `()` | The header content of the popover. | 2.28.3 |
| default | `()` | The content inside popover. |  |

### Popover Methods

| Name         | Parameters        | Description                           |
| ------------ | ----------------- | ------------------------------------- |
| setShow      | `(show: boolean)` | Set show status in uncontrolled mode. |
| syncPosition | `()`              | Sync popover position.                |

## Basic Usage

### Basic Popover

```vue
<template>
  <n-popover trigger="hover">
    <template #trigger>
      <n-button>Hover</n-button>
    </template>
    This is the popover content.
  </n-popover>
</template>
```

### Click Trigger

```vue
<template>
  <n-popover trigger="click">
    <template #trigger>
      <n-button>Click</n-button>
    </template>
    This popover appears on click.
  </n-popover>
</template>
```

## Common Patterns

### Different Triggers

```vue
<template>
  <n-space>
    <n-popover trigger="hover">
      <template #trigger>
        <n-button>Hover</n-button>
      </template>
      Hover content
    </n-popover>

    <n-popover trigger="click">
      <template #trigger>
        <n-button>Click</n-button>
      </template>
      Click content
    </n-popover>

    <n-popover trigger="focus">
      <template #trigger>
        <n-button>Focus</n-button>
      </template>
      Focus content
    </n-popover>
  </n-space>
</template>
```

### With Delay

```vue
<template>
  <n-popover trigger="hover" :delay="500" :duration="500">
    <template #trigger>
      <n-button>Delay 500ms</n-button>
    </template>
    This appears after 500ms delay.
  </n-popover>
</template>
```

### No Arrow

```vue
<template>
  <n-popover trigger="hover" :show-arrow="false">
    <template #trigger>
      <n-button>Hover</n-button>
    </template>
    No arrow on this popover.
  </n-popover>
</template>
```

### Different Placements

```vue
<template>
  <n-space>
    <n-popover placement="top" trigger="click">
      <template #trigger>
        <n-button>Top</n-button>
      </template>
      Top placement
    </n-popover>

    <n-popover placement="bottom" trigger="click">
      <template #trigger>
        <n-button>Bottom</n-button>
      </template>
      Bottom placement
    </n-popover>

    <n-popover placement="left" trigger="click">
      <template #trigger>
        <n-button>Left</n-button>
      </template>
      Left placement
    </n-popover>

    <n-popover placement="right" trigger="click">
      <template #trigger>
        <n-button>Right</n-button>
      </template>
      Right placement
    </n-popover>
  </n-space>
</template>
```

### Custom Width

```vue
<template>
  <n-popover style="width: 500px" trigger="click">
    <template #trigger>
      <n-button>Width 500px</n-button>
    </template>
    <div>
      This popover has a custom width of 500px. It can contain more content.
    </div>
  </n-popover>
</template>
```

### Trigger Width

```vue
<template>
  <n-popover width="trigger" trigger="click">
    <template #trigger>
      <n-button>I would like to leave this city</n-button>
    </template>
    This popover has the same width as the trigger button.
  </n-popover>
</template>
```

### Manual Positioning

```vue
<template>
  <div
    style="width: 200px; height: 200px; background-color: rgba(0, 128, 0, 0.5)"
    @click="handleClick"
  />
  <n-popover :show="showPopover" :x="x" :y="y" trigger="manual">
    Cool!
  </n-popover>
</template>

<script setup>
import { ref } from 'vue';

const showPopover = ref(false);
const x = ref(0);
const y = ref(0);

const handleClick = e => {
  showPopover.value = true;
  x.value = e.clientX;
  y.value = e.clientY;
};
</script>
```

### With Header and Footer

```vue
<template>
  <n-popover trigger="click">
    <template #trigger>
      <n-button>With Header/Footer</n-button>
    </template>
    <template #header>
      <div>Header Content</div>
    </template>
    Main content goes here.
    <template #footer>
      <div>Footer Content</div>
    </template>
  </n-popover>
</template>
```

### Raw Style

```vue
<template>
  <n-popover trigger="hover" raw :show-arrow="false">
    <template #trigger>
      <n-button>Raw Style</n-button>
    </template>
    <div style="padding: 8px; background: white; border-radius: 4px;">
      Custom styled content without default styles.
    </div>
  </n-popover>
</template>
```

### Scrollable Content

```vue
<template>
  <n-popover trigger="click" scrollable style="max-height: 200px">
    <template #trigger>
      <n-button>Scrollable</n-button>
    </template>
    <div v-for="i in 20" :key="i">Item {{ i }}</div>
  </n-popover>
</template>
```

## Best Practices

1. **Choose appropriate trigger**: Use `hover` for info, `click` for interactive content

2. **Set reasonable delay**: Configure delay for better hover experience

3. **Consider placement**: Choose placement that doesn't obstruct important content

4. **Use raw for custom styling**: Use `raw` prop when you need complete control

5. **Handle events**: Use `on-update:show` to track popover visibility

6. **Manage focus**: Consider focus behavior for accessibility
