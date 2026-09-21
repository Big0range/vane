---
name: 'n-layout'
description: 'Layout component for building page structures with header, content, footer, and sider. Invoke when user needs to implement page layouts, sidebars, or application structure in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Layout Component

Layout is for layout. The component is a bit complicated to use. But like a manual gear car, it's worth a shot.

## When to Use

Use this component when:

- **Page layouts**: Build complete page structures
- **Application shells**: Create app layouts with header, sider, content, footer
- **Dashboard layouts**: Implement dashboard structures
- **Fixed layouts**: Create fixed position layouts with scrolling content

## When to Invoke

Invoke this skill when:

- User needs to implement a page layout structure
- User wants to create a sidebar navigation
- User needs collapsible sider
- User wants fixed position layouts
- User asks about header, footer, or sider components

## Features

- **Multiple Parts**: Layout, Header, Content, Footer, Sider
- **Collapsible Sider**: Built-in collapse functionality with triggers
- **Position Modes**: Static or absolute positioning
- **Native or Custom Scrollbar**: Choose between native and Naive UI scrollbar
- **Inverted Mode**: Dark background for contrast
- **Sider Placement**: Left or right sider placement
- **Embedded Effect**: Darker background for card-like content

## API Reference

### Layout, Layout Content Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| content-class | `string` | `undefined` | Class of scrollable content node. |
| content-style | `string \| Object` | `undefined` | Style of scrollable content node. |
| embedded | `boolean` | `false` | Use darker background to show a embedded effect. Only work for light theme. |
| has-sider | `boolean` | `false` | Whether the component has sider inside. If so it must be `true`. |
| native-scrollbar | `boolean` | `true` | Whether to use native scrollbar on itself. |
| position | `'static' \| 'absolute'` | `'static'` | Position mode. |
| scrollbar-props | `ScrollbarProps` | `undefined` | See Scrollbar props. |
| sider-placement | `'left' \| 'right'` | `left` | The sidebar is displayed on the left or the right side. |
| on-scroll | `(e: Event) => void` | `undefined` | Callback function when the content scroll. |

### Layout Header Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` | Whether to show the border. |
| inverted | `boolean` | `false` | Whether to use inverted background. |
| position | `'static' \| 'absolute'` | `'static'` | Position mode. |

### Layout Footer Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` | Whether to show the border. |
| inverted | `boolean` | `false` | Whether to use inverted background. |
| position | `'static' \| 'absolute'` | `'static'` | Position mode. |

### Layout Sider Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` | Whether to show the border. |
| collapse-mode | `'transform' \| 'width'` | `'transform'` | Collapse mode. |
| collapsed | `boolean` | `undefined` | Whether the sider is collapsed. |
| collapsed-width | `number` | `48` | Folded width. |
| content-class | `string` | `undefined` | Class of scrollable content node. |
| content-style | `string \| Object` | `undefined` | Style of scrollable content node. |
| default-collapsed | `boolean` | `false` | Default collapsed state in uncontrolled mode. |
| inverted | `boolean` | `false` | Whether to use inverted background. |
| native-scrollbar | `boolean` | `true` | Whether to use native scrollbar. |
| position | `'static' \| 'absolute'` | `'static'` | Position mode. |
| scrollbar-props | `ScrollbarProps` | `undefined` | Scrollbar props. |
| show-collapsed-content | `boolean` | `true` | Whether to show content in sider after it is collapsed. |
| show-trigger | `boolean \| 'bar' \| 'arrow-circle'` | `false` | Whether to show the built-in trigger button. |
| width | `number \| string` | `272` | Width CSS value. |
| on-update:collapsed | `(collapsed: boolean) => void` | `undefined` | Callback when the folding state changes. |

### Layout Methods

| Name | Type | Description |
| --- | --- | --- |
| scrollTo | `(x: number, y: number) => void \| (options: { left?: number, top?: number, behavior: 'smooth' \| 'auto' }) => void` | Scroll to somewhere. |

## Basic Usage

### Basic Layout

```vue
<template>
  <n-space vertical size="large">
    <n-layout>
      <n-layout-header>Yiheyuan Road</n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        Pingshan Road
      </n-layout-content>
      <n-layout-footer>Chengfu Road</n-layout-footer>
    </n-layout>

    <n-layout>
      <n-layout-header>Yiheyuan Road</n-layout-header>
      <n-layout has-sider>
        <n-layout-sider content-style="padding: 24px;">
          Handian Bridge
        </n-layout-sider>
        <n-layout-content content-style="padding: 24px;">
          Pingshan Road
        </n-layout-content>
      </n-layout>
      <n-layout-footer>Chengfu Road</n-layout-footer>
    </n-layout>
  </n-space>
</template>
```

### Setting Padding

```vue
<template>
  <n-layout has-sider style="height: 240px">
    <n-layout-sider content-style="padding: 24px;">
      <n-h2>Recommended</n-h2>
      <n-h2>Recommended</n-h2>
    </n-layout-sider>
  </n-layout>
</template>
```

## Common Patterns

### Absolute Position Layout

```vue
<template>
  <div style="height: 360px; position: relative">
    <n-layout position="absolute">
      <n-layout-header style="height: 64px; padding: 24px" bordered>
        Yiheyuan Road
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 64px; bottom: 64px">
        <n-layout-sider bordered content-style="padding: 24px;">
          Handian Bridge
        </n-layout-sider>
        <n-layout content-style="padding: 24px;">
          <n-h2>Pingshan Road</n-h2>
        </n-layout>
      </n-layout>
      <n-layout-footer
        bordered
        position="absolute"
        style="height: 64px; padding: 24px"
      >
        Chengfu Road
      </n-layout-footer>
    </n-layout>
  </div>
</template>
```

### Built-in Scrollbar

```vue
<template>
  <n-layout style="height: 360px">
    <n-layout-header style="height: 64px; padding: 24px" bordered>
      Yiheyuan Road
    </n-layout-header>
    <n-layout position="absolute" style="top: 64px; bottom: 64px" has-sider>
      <n-layout-sider
        content-style="padding: 24px;"
        :native-scrollbar="false"
        bordered
      >
        <n-h2>Handian Bridge</n-h2>
      </n-layout-sider>
      <n-layout content-style="padding: 24px;" :native-scrollbar="false">
        <n-h2>Pingshan Road</n-h2>
      </n-layout>
    </n-layout>
  </n-layout>
</template>
```

### Collapse Sider

```vue
<template>
  <n-layout has-sider>
    <n-layout-sider
      collapse-mode="width"
      :collapsed-width="120"
      :width="240"
      show-trigger="bar"
      content-style="padding: 24px;"
      bordered
    >
      <p>Handian Bridge</p>
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px;">
      Pingshan Road
    </n-layout-content>
  </n-layout>
</template>
```

### Right Sider Placement

```vue
<template>
  <n-layout has-sider sider-placement="right">
    <n-layout-content content-style="padding: 24px;">
      Pingshan Road
    </n-layout-content>
    <n-layout-sider
      collapse-mode="width"
      :collapsed-width="120"
      :width="240"
      show-trigger="arrow-circle"
      content-style="padding: 24px;"
      bordered
    >
      <p>Handian Bridge</p>
    </n-layout-sider>
  </n-layout>
</template>
```

### Inverted Mode

```vue
<template>
  <n-layout>
    <n-layout-header :inverted="inverted" bordered>
      Header Header Header
      <n-menu mode="horizontal" :inverted="inverted" :options="menuOptions" />
    </n-layout-header>
    <n-layout has-sider>
      <n-layout-sider
        bordered
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :native-scrollbar="false"
        :inverted="inverted"
      >
        <n-menu
          :inverted="inverted"
          :collapsed-width="64"
          :options="menuOptions"
        />
      </n-layout-sider>
      <n-layout />
    </n-layout>
    <n-layout-footer :inverted="inverted" bordered>
      Footer Footer Footer
    </n-layout-footer>
  </n-layout>
</template>
```

### Scroll To

```vue
<template>
  <n-space vertical>
    <n-button @click="siderRef?.scrollTo({ top: 120, behavior: 'smooth' })">
      Sider scroll to 120px
    </n-button>
    <n-button @click="contentRef?.scrollTo({ top: 120, behavior: 'smooth' })">
      Content scroll to 120px
    </n-button>
    <n-layout style="height: 360px">
      <n-layout-sider ref="siderRef" bordered content-style="padding: 24px;">
        Content...
      </n-layout-sider>
      <n-layout-content ref="contentRef" content-style="padding: 24px;">
        Content...
      </n-layout-content>
    </n-layout>
  </n-space>
</template>
```

## Best Practices

1. **Specify has-sider**: After v2.3.0, you must specify `has-sider` on the layout containing sider

2. **Use content-style for padding**: Apply padding via `content-style` instead of direct style

3. **Absolute positioning**: Use absolute position for fixed layouts with scrolling content

4. **Inverted mode**: Use inverted mode for dark navigation with menus

5. **Scrollbar choice**: Use native scrollbar for better performance, custom for consistent styling

6. **Collapse mode**: Use `width` mode for actual width collapse, `transform` for visual-only collapse
