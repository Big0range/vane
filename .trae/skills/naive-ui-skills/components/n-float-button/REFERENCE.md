---
name: 'n-float-button'
description: 'Floating action button component with menu, badge, and group support. Invoke when user needs floating buttons, FAB menus, or quick action buttons in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Float Button Component

Floating action button for quick access to primary actions with menu and group support.

## When to Use

Use this component when:

- **Quick actions**: Provide floating action buttons for primary operations
- **Navigation**: Create floating navigation controls
- **Back to top**: Alternative to BackTop with more customization
- **Action menus**: Group multiple actions in a collapsible menu
- **Notifications**: Display badges on floating buttons

## When to Invoke

Invoke this skill when:

- User needs floating action buttons (FAB)
- User wants to create floating button groups
- User needs expandable menu from float button
- User wants to add badges to floating buttons
- User needs positioned floating elements

## Features

- **Position Control**: Fixed, absolute, or relative positioning
- **Shape Options**: Circle or square shapes
- **Button Types**: Default and primary types
- **Menu Support**: Collapsible submenu with hover/click trigger
- **Button Groups**: Group multiple float buttons together
- **Badge Integration**: Works with n-badge component
- **Description Slot**: Add text description to buttons

## API Reference

### FloatButton Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bottom | `number \| string` | `40` | CSS `bottom` property. |
| height | `number \| string` | `40` | CSS `height` property. |
| left | `number \| string` | `undefined` | CSS `left` property. |
| menu-trigger | `'click' \| 'hover'` | `undefined` | Trigger action to show submenu. |
| position | `'relative' \| 'absolute' \| 'fixed'` | `'fixed'` | CSS `position` property. |
| right | `number \| string` | `undefined` | CSS `right` property. |
| shape | `'circle' \| 'square'` | `'circle'` | Shape of the button. |
| show-menu | `boolean` | `undefined` | Whether submenu is shown (controlled). |
| top | `number \| string` | `undefined` | CSS `top` property. |
| type | `'default' \| 'primary'` | `'default'` | Type of the button. |
| width | `number \| string` | `undefined` | CSS `width` property. |
| on-update:show-menu | `(value: boolean) => void` | `undefined` | Callback when menu opens/closes. |

### FloatButtonGroup Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bottom | `number \| string` | `undefined` | CSS `bottom` property. |
| left | `number \| string` | `undefined` | CSS `left` property. |
| position | `'relative' \| 'absolute' \| 'fixed'` | `'fixed'` | CSS `position` property. |
| right | `number \| string` | `undefined` | CSS `right` property. |
| shape | `'circle' \| 'square'` | `'circle'` | Shape of the button group. |
| top | `number \| string` | `undefined` | CSS `top` property. |

### FloatButton Slots

| Name        | Parameters | Description                             |
| ----------- | ---------- | --------------------------------------- |
| default     | `()`       | Icon content of the button.             |
| description | `()`       | Description text for the button.        |
| menu        | `()`       | Submenu content (nested float buttons). |

## Basic Usage

### Basic Float Button

```vue
<template>
  <div style="height: 200px; transform: translate(0)">
    <n-float-button :right="20" :bottom="20">
      <n-icon>
        <AddIcon />
      </n-icon>
    </n-float-button>
  </div>
</template>
```

### Positioned Float Buttons

```vue
<template>
  <div style="height: 200px; transform: translate(0)">
    <n-float-button :right="0" :bottom="0" shape="square">
      <n-icon><CashIcon /></n-icon>
    </n-float-button>
    <n-float-button :left="0" :bottom="0" shape="square">
      <n-icon><CashIcon /></n-icon>
    </n-float-button>
    <n-float-button :right="0" :top="0">
      <n-icon><CashIcon /></n-icon>
    </n-float-button>
    <n-float-button :left="0" :top="0">
      <n-icon><CashIcon /></n-icon>
    </n-float-button>
  </div>
</template>
```

### With Badge

```vue
<template>
  <n-flex>
    <n-float-button position="relative">
      <n-badge :value="9" :offset="[6, -8]">
        <n-icon><AlarmOutlineIcon /></n-icon>
      </n-badge>
    </n-float-button>
    <n-float-button position="relative">
      <n-badge :value="100" :max="99" :offset="[6, -8]">
        <n-icon><AlarmOutlineIcon /></n-icon>
      </n-badge>
    </n-float-button>
    <n-float-button position="relative">
      <n-badge dot :offset="[4, -4]">
        <n-icon><AlarmOutlineIcon /></n-icon>
      </n-badge>
    </n-float-button>
  </n-flex>
</template>
```

### With Description

```vue
<template>
  <div style="height: 120px; transform: translate(0)">
    <n-float-button shape="square">
      <n-icon><DocumentIcon /></n-icon>
      <template #description> Docs </template>
    </n-float-button>
  </div>
</template>
```

### Float Button Group

```vue
<template>
  <n-flex align="flex-start">
    <n-float-button-group shape="square" position="relative">
      <n-float-button>
        <n-icon><CashIcon /></n-icon>
      </n-float-button>
      <n-float-button>
        <n-icon><CashIcon /></n-icon>
      </n-float-button>
      <n-float-button>
        <n-icon><CashIcon /></n-icon>
      </n-float-button>
    </n-float-button-group>
    <n-float-button-group position="relative">
      <n-float-button>
        <n-icon><CashIcon /></n-icon>
      </n-float-button>
      <n-float-button>
        <n-icon><CashIcon /></n-icon>
      </n-float-button>
    </n-float-button-group>
  </n-flex>
</template>
```

### Expandable Menu

```vue
<template>
  <n-flex>
    <n-float-button position="relative" type="primary" menu-trigger="hover">
      <n-icon><CashIcon /></n-icon>
      <template #menu>
        <n-float-button shape="square" type="primary">
          <n-icon><CashIcon /></n-icon>
        </n-float-button>
        <n-float-button type="primary">
          <n-icon><CashIcon /></n-icon>
        </n-float-button>
        <n-float-button type="primary">
          <n-icon><CashIcon /></n-icon>
        </n-float-button>
      </template>
    </n-float-button>
  </n-flex>
</template>
```

## Common Patterns

### With Tooltip

```vue
<template>
  <n-tooltip trigger="hover" placement="right">
    <template #trigger>
      <n-float-button position="relative">
        <n-icon><CashIcon /></n-icon>
      </n-float-button>
    </template>
    Add new item
  </n-tooltip>
</template>
```

### Controlled Menu

```vue
<template>
  <n-float-button
    position="relative"
    type="primary"
    menu-trigger="click"
    :show-menu="showMenu"
    @update:show-menu="showMenu = $event"
  >
    <n-icon><AddIcon /></n-icon>
    <template #menu>
      <n-float-button type="primary" @click="handleAction('edit')">
        <n-icon><EditIcon /></n-icon>
      </n-float-button>
      <n-float-button type="primary" @click="handleAction('delete')">
        <n-icon><DeleteIcon /></n-icon>
      </n-float-button>
    </template>
  </n-float-button>
</template>

<script setup>
import { ref } from 'vue';

const showMenu = ref(false);

const handleAction = action => {
  showMenu.value = false;
  console.log('Action:', action);
};
</script>
```

### Back to Top Alternative

```vue
<template>
  <n-float-button
    v-show="showBackTop"
    :right="40"
    :bottom="80"
    @click="scrollToTop"
  >
    <n-icon><ArrowUpIcon /></n-icon>
  </n-float-button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showBackTop = ref(false);

const handleScroll = () => {
  showBackTop.value = window.scrollY > 200;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>
```

## Best Practices

1. **Use primary type for main actions**: Primary float button for the most important action

   ```vue
   <n-float-button type="primary">
     <n-icon><AddIcon /></n-icon>
   </n-float-button>
   ```

2. **Position appropriately**: Use right/bottom for typical FAB placement

   ```vue
   <n-float-button :right="24" :bottom="24">
     <n-icon><AddIcon /></n-icon>
   </n-float-button>
   ```

3. **Group related actions**: Use FloatButtonGroup for multiple related actions

   ```vue
   <n-float-button-group shape="circle">
     <!-- Multiple buttons -->
   </n-float-button-group>
   ```

4. **Use menu for expandable actions**: Collapsible menu for secondary actions

   ```vue
   <n-float-button menu-trigger="click">
     <template #menu>
       <!-- Secondary actions -->
     </template>
   </n-float-button>
   ```

5. **Add tooltips for clarity**: Provide context for icon-only buttons

   ```vue
   <n-tooltip>
     <template #trigger>
       <n-float-button>...</n-float-button>
     </template>
     Action description
   </n-tooltip>
   ```

6. **Use relative position for inline**: Set `position="relative"` when embedding in layout
