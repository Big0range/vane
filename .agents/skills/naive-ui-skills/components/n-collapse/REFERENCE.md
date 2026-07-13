---
name: 'n-collapse'
description: 'Collapse component for creating expandable/collapsible content panels. Invoke when user needs to implement accordions, FAQ sections, or expandable navigation menus in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Collapse Component

Collapse component for creating expandable/collapsible content panels, commonly used in sidebars, FAQs, and settings panels.

## When to Use

Use this component when:

- **FAQ sections**: Expandable question and answer sections
- **Sidebar navigation**: Collapsible menu items
- **Settings panels**: Grouped configuration options
- **Content organization**: Hide/show detailed information

## When to Invoke

Invoke this skill when:

- User needs to implement an accordion or expandable panels
- User wants nested collapsible content
- User needs controlled or uncontrolled expansion state
- User wants to customize header, arrow, or trigger areas
- User asks about disabled items or display directives
- User needs accordion mode (single panel open)

## Features

- **Accordion Mode**: Only one panel open at a time
- **Nested Support**: Collapses can be nested within each other
- **Arrow Placement**: Left or right arrow positioning
- **Custom Headers**: Full header customization via slots
- **Disabled Items**: Individual items can be disabled
- **Trigger Areas**: Configurable expansion trigger areas
- **Display Directive**: Control DOM rendering with v-if or v-show

## API Reference

### Collapse Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| accordion | `boolean` | `false` | Only allow one panel open at a time. |
| arrow-placement | `'left' \| 'right'` | `'left'` | Arrow placement side of text. |
| default-expanded-names | `string \| number \| Array<string \| number> \| null` | `null` | Pre-expanded panels (uncontrolled). |
| display-directive | `'if' \| 'show'` | `'if'` | Display directive (`v-if` or `v-show`). |
| expanded-names | `string \| number \| Array<string \| number> \| null` | `undefined` | Expanded panels (controlled). |
| trigger-areas | `Array<'main' \| 'arrow' \| 'extra'>` | `['main', 'arrow', 'extra']` | Expansion trigger areas. |
| on-item-header-click | `(data: { name, expanded, event }) => void` | `undefined` | Callback when title is clicked. |
| on-update:expanded-names | `(expandedNames) => void` | `undefined` | Callback when expanded names change. |

### CollapseItem Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | `boolean` | `false` | Whether the item is disabled. |
| display-directive | `'if' \| 'show'` | `undefined` | Display directive (overrides parent). |
| name | `string \| number` | random string | Item identifier (should be unique). |
| title | `string` | `undefined` | Title. |

### Collapse Slots

| Name    | Parameters      | Description                            |
| ------- | --------------- | -------------------------------------- |
| arrow   | `{ collapsed }` | Custom icons for folding panels.       |
| default | `()`            | The contents of the collapsible panel. |
| header  | `{ collapsed }` | The content of the header.             |

### CollapseItem Slots

| Name         | Parameters      | Description                      |
| ------------ | --------------- | -------------------------------- |
| arrow        | `{ collapsed }` | Custom icon for the item.        |
| default      | `()`            | The contents of the panel node.  |
| header       | `{ collapsed }` | The content of the header.       |
| header-extra | `{ collapsed }` | Extra content on the right side. |

## Basic Usage

### Basic Collapse

```vue
<template>
  <n-collapse>
    <n-collapse-item title="Introduction" name="1">
      <div>Naive UI is a Vue 3 component library.</div>
    </n-collapse-item>
    <n-collapse-item title="Features" name="2">
      <div>Rich components, TypeScript support, and more.</div>
    </n-collapse-item>
    <n-collapse-item title="Installation" name="3">
      <div>npm install naive-ui</div>
    </n-collapse-item>
  </n-collapse>
</template>
```

### Accordion Mode

```vue
<template>
  <n-collapse accordion>
    <n-collapse-item title="Question 1" name="1">
      <div>Answer to question 1.</div>
    </n-collapse-item>
    <n-collapse-item title="Question 2" name="2">
      <div>Answer to question 2.</div>
    </n-collapse-item>
    <n-collapse-item title="Question 3" name="3">
      <div>Answer to question 3.</div>
    </n-collapse-item>
  </n-collapse>
</template>
```

### Arrow Placement Right

```vue
<template>
  <n-collapse arrow-placement="right">
    <n-collapse-item title="Settings" name="1">
      <div>Configuration options here.</div>
    </n-collapse-item>
    <n-collapse-item title="Advanced" name="2">
      <div>Advanced settings here.</div>
    </n-collapse-item>
  </n-collapse>
</template>
```

## Common Patterns

### Nested Collapse

```vue
<template>
  <n-collapse>
    <n-collapse-item title="Category 1" name="1">
      <n-collapse>
        <n-collapse-item title="Sub-item 1" name="1-1">
          <div>Content for sub-item 1</div>
        </n-collapse-item>
        <n-collapse-item title="Sub-item 2" name="1-2">
          <div>Content for sub-item 2</div>
        </n-collapse-item>
      </n-collapse>
    </n-collapse-item>
    <n-collapse-item title="Category 2" name="2">
      <div>Content for category 2</div>
    </n-collapse-item>
  </n-collapse>
</template>
```

### Default Expanded

```vue
<template>
  <n-collapse :default-expanded-names="['2', '3']">
    <n-collapse-item title="Panel 1" name="1">
      <div>Content 1</div>
    </n-collapse-item>
    <n-collapse-item title="Panel 2" name="2">
      <div>Content 2 (expanded by default)</div>
    </n-collapse-item>
    <n-collapse-item title="Panel 3" name="3">
      <div>Content 3 (expanded by default)</div>
    </n-collapse-item>
  </n-collapse>
</template>
```

### Controlled Collapse

```vue
<template>
  <n-space vertical>
    <n-button @click="expandedNames = ['1']">Open First</n-button>
    <n-button @click="expandedNames = ['2']">Open Second</n-button>
    <n-button @click="expandedNames = []">Close All</n-button>

    <n-collapse v-model:expanded-names="expandedNames">
      <n-collapse-item title="Panel 1" name="1">
        <div>Content 1</div>
      </n-collapse-item>
      <n-collapse-item title="Panel 2" name="2">
        <div>Content 2</div>
      </n-collapse-item>
    </n-collapse>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const expandedNames = ref([]);
</script>
```

### Custom Header and Extra

```vue
<template>
  <n-collapse>
    <n-collapse-item name="1">
      <template #header>
        <n-text strong>Custom Header</n-text>
      </template>
      <template #header-extra>
        <n-tag size="small" type="success">New</n-tag>
      </template>
      <div>Content goes here</div>
    </n-collapse-item>

    <n-collapse-item name="2">
      <template #header>
        <n-space align="center">
          <n-icon><SettingsIcon /></n-icon>
          <span>Settings</span>
        </n-space>
      </template>
      <template #header-extra>
        <n-badge :value="5" />
      </template>
      <div>Settings content</div>
    </n-collapse-item>
  </n-collapse>
</template>
```

### Custom Arrow Icon

```vue
<template>
  <n-collapse>
    <template #arrow="{ collapsed }">
      <n-icon :component="collapsed ? ChevronRight : ChevronDown" />
    </template>

    <n-collapse-item title="Panel 1" name="1">
      <div>Content 1</div>
    </n-collapse-item>
    <n-collapse-item title="Panel 2" name="2">
      <div>Content 2</div>
    </n-collapse-item>
  </n-collapse>
</template>
```

### Disabled Item

```vue
<template>
  <n-collapse>
    <n-collapse-item title="Available" name="1">
      <div>This panel can be expanded.</div>
    </n-collapse-item>
    <n-collapse-item title="Disabled" name="2" disabled>
      <div>This panel cannot be expanded.</div>
    </n-collapse-item>
    <n-collapse-item title="Available" name="3">
      <div>This panel can be expanded.</div>
    </n-collapse-item>
  </n-collapse>
</template>
```

### Trigger Areas

```vue
<template>
  <n-collapse :trigger-areas="['main', 'arrow']">
    <n-collapse-item title="Click header or arrow" name="1">
      <template #header-extra>
        <n-tag>Extra area won't trigger</n-tag>
      </template>
      <div>Content here</div>
    </n-collapse-item>
  </n-collapse>
</template>
```

### Display Directive (Keep DOM)

```vue
<template>
  <n-collapse display-directive="show">
    <n-collapse-item title="Preserved Content" name="1">
      <div>This content stays in DOM when collapsed.</div>
    </n-collapse-item>
  </n-collapse>
</template>
```

### Item Header Click Event

```vue
<template>
  <n-collapse @item-header-click="handleHeaderClick">
    <n-collapse-item title="Panel 1" name="1">
      <div>Content 1</div>
    </n-collapse-item>
    <n-collapse-item title="Panel 2" name="2">
      <div>Content 2</div>
    </n-collapse-item>
  </n-collapse>
</template>

<script setup>
const handleHeaderClick = ({ name, expanded, event }) => {
  console.log(`Panel ${name} is now ${expanded ? 'expanded' : 'collapsed'}`);
};
</script>
```

## Best Practices

1. **Use unique names**: Each `n-collapse-item` should have a unique `name` prop

   ```vue
   <n-collapse-item name="unique-id" title="Title">
   ```

2. **Accordion for single selection**: Use accordion mode when only one panel should be open

   ```vue
   <n-collapse accordion>
   ```

3. **Use display-directive wisely**: Use `show` to preserve DOM state (like form inputs)

   ```vue
   <n-collapse display-directive="show">
   ```

4. **Default expanded in accordion**: In accordion mode, use a single value (not array)

   ```vue
   <n-collapse accordion default-expanded-names="1">
   ```

5. **Controlled vs uncontrolled**: Use `expanded-names` for controlled, `default-expanded-names` for uncontrolled

6. **Accessibility**: Provide meaningful titles for screen readers

7. **Nested structure**: Be careful with deeply nested collapses for UX
