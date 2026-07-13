---
name: 'n-drawer'
description: 'Drawer component for slide-out panels and side navigation. Invoke when user needs to create slide-out panels, sidebars, or multi-level navigation drawers in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Drawer Component

Drawer component for slide-out panels, sidebars, and navigation from screen edges.

## When to Use

Use this component when:

- **Side navigation**: Display navigation menus or filters
- **Detail panels**: Show detailed information without leaving the page
- **Forms**: Collect user input in a slide-out panel
- **Multi-level content**: Nested drawer interactions

## When to Invoke

Invoke this skill when:

- User needs to create slide-out panels from any screen edge
- User wants to implement multi-level drawers
- User needs resizable drawer functionality
- User wants to customize drawer placement and size
- User asks about drawer content scrolling

## Features

- **Multiple Placements**: top, right, bottom, left
- **Resizable**: Drag to resize drawer width/height
- **Multiple Drawers**: Support for nested drawers
- **Customizable Size**: Control width and height
- **Scroll Support**: Native or custom scrollbar
- **Custom Display Area**: Render in specific container
- **Header and Footer**: Built-in header/footer slots

## API Reference

### Drawer Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| auto-focus | `boolean` | `true` | Whether to focus the first focusable element inside drawer. |
| block-scroll | `boolean` | `true` | Whether to disabled body scrolling when it's active. |
| close-on-esc | `boolean` | `true` | Whether to close drawer on Esc is pressed. |
| content-class | `string` | `undefined` | Class of drawer's scrollable content node. |
| content-style | `string \| Object` | `undefined` | Style of drawer's scrollable content node. |
| default-width | `number \| string` | `251` | Default width of the drawer, works when placement is `left` and `right`. |
| default-height | `number \| string` | `251` | Default height of the drawer, works when placement is `top` and `bottom`. |
| display-directive | `'if' \| 'show'` | `'if'` | The display directive to use. |
| height | `number \| string` | `undefined` | Works when placement is `top` and `bottom`. |
| native-scrollbar | `boolean` | `true` | Whether to use native scrollbar on drawer. |
| mask-closable | `boolean` | `true` | Whether to emit hide event when click mask. |
| max-width | `number` | `undefined` | Max width of resizable drawer. |
| max-height | `number` | `undefined` | Max height of resizable drawer. |
| min-width | `number` | `undefined` | Min width of resizable drawer. |
| min-height | `number` | `undefined` | Min height of resizable drawer. |
| placement | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` | Drawer placement. |
| resizable | `boolean` | `false` | Whether to resize the width / height of drawer. |
| scrollbar-props | `ScrollbarProps` | `undefined` | Scrollbar props for custom scrollbar. |
| show | `boolean` | `false` | Whether to show drawer. |
| show-mask | `boolean \| 'transparent'` | `true` | Whether to show mask. |
| to | `string \| HTMLElement` | `'body'` | Container node of the drawer. |
| trap-focus | `boolean` | `true` | Whether to trap focus inside drawer. |
| width | `number \| string` | `undefined` | Works when placement is `left` and `right`. |
| z-index | `number` | `undefined` | Z index of the drawer. |
| on-after-enter | `() => void` | `undefined` | Callback after drawer is opened. |
| on-after-leave | `() => void` | `undefined` | Callback after drawer is closed. |
| on-mask-click | `(e: MouseEvent) => void` | `undefined` | Callback triggered on mask clicked. |
| on-update:show | `(show: boolean) => void` | `undefined` | Callback triggered on drawer display status change. |

### DrawerContent Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| body-class | `string` | `undefined` | Drawer content's body class. |
| body-style | `string \| Object` | `undefined` | Drawer content's body style. |
| closable | `boolean` | `false` | Whether the drawer content is closable. |
| footer-class | `string` | `undefined` | Drawer content's footer class. |
| footer-style | `string \| Object` | `undefined` | Drawer content's footer style. |
| header-class | `string` | `undefined` | Drawer content's header class. |
| header-style | `string \| Object` | `undefined` | Drawer content's header style. |
| native-scrollbar | `boolean` | `true` | Whether to use native scrollbar on body part. |
| title | `string` | `undefined` | Drawer content title. |
| scrollbar-props | `ScrollbarProps` | `undefined` | Scrollbar props. |

### Drawer Slots

| Name    | Parameters | Description                |
| ------- | ---------- | -------------------------- |
| default | `()`       | The content of the drawer. |

### DrawerContent Slots

| Name    | Parameters | Description                        |
| ------- | ---------- | ---------------------------------- |
| default | `()`       | The content of the drawer content. |
| footer  | `()`       | The footer of the drawer content.  |
| header  | `()`       | The header of the drawer content.  |

## Basic Usage

### Basic Drawer

```vue
<template>
  <n-button-group>
    <n-button @click="activate('top')">Top</n-button>
    <n-button @click="activate('right')">Right</n-button>
    <n-button @click="activate('bottom')">Bottom</n-button>
    <n-button @click="activate('left')">Left</n-button>
  </n-button-group>
  <n-drawer v-model:show="active" :width="502" :placement="placement">
    <n-drawer-content title="Drawer Title">
      Drawer content goes here
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { ref } from 'vue';

const active = ref(false);
const placement = ref('right');

const activate = place => {
  placement.value = place;
  active.value = true;
};
</script>
```

### Multiple Drawers

```vue
<template>
  <n-button @click="showOuter = true">Open Outer Drawer</n-button>
  <n-drawer v-model:show="showOuter" :width="502">
    <n-drawer-content title="Outer Drawer">
      <p>Outer drawer content</p>
      <template #footer>
        <n-button @click="showInner = true">Open Inner Drawer</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
  <n-drawer v-model:show="showInner" :width="300">
    <n-drawer-content title="Inner Drawer">
      <p>Inner drawer content</p>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { ref } from 'vue';

const showOuter = ref(false);
const showInner = ref(false);
</script>
```

### Closable Drawer

```vue
<template>
  <n-button @click="show = true">Open</n-button>
  <n-drawer v-model:show="show" :width="502">
    <n-drawer-content title="Closable Drawer" closable>
      This drawer has a close button in the header
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);
</script>
```

### Custom Header and Footer

```vue
<template>
  <n-button @click="show = true">Open</n-button>
  <n-drawer v-model:show="show" :width="502">
    <n-drawer-content>
      <template #header>
        <n-space align="center">
          <n-icon><SettingsIcon /></n-icon>
          <span>Custom Header</span>
        </n-space>
      </template>
      Drawer content
      <template #footer>
        <n-space justify="end">
          <n-button @click="show = false">Cancel</n-button>
          <n-button type="primary" @click="handleSave">Save</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);

const handleSave = () => {
  console.log('Saved');
  show.value = false;
};
</script>
```

### Resizable Drawer

```vue
<template>
  <n-button @click="show = true">Open Resizable</n-button>
  <n-drawer
    v-model:show="show"
    :default-width="502"
    placement="right"
    resizable
    :min-width="200"
    :max-width="800"
  >
    <n-drawer-content title="Resizable Drawer">
      Drag the edge to resize this drawer
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);
</script>
```

### Custom Display Area

```vue
<template>
  <n-button @click="show = true">Open in Target</n-button>
  <div
    id="drawer-target"
    style="position: relative; width: 100%; height: 300px; border: 1px solid #ccc;"
  >
    Target Area
  </div>
  <n-drawer
    v-model:show="show"
    :width="200"
    placement="right"
    :trap-focus="false"
    :block-scroll="false"
    to="#drawer-target"
  >
    <n-drawer-content title="Local Drawer">
      Drawer inside target area
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);
</script>
```

### Scrollable Content

```vue
<template>
  <n-button @click="show = true">Open Scrollable</n-button>
  <n-drawer v-model:show="show" :width="480">
    <n-drawer-content title="Scrollable Content" :native-scrollbar="false">
      <p v-for="i in 50" :key="i">
        Paragraph {{ i }}: Lorem ipsum dolor sit amet...
      </p>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);
</script>
```

## Common Patterns

### Navigation Drawer

```vue
<template>
  <n-button @click="show = true">
    <template #icon>
      <n-icon><MenuIcon /></n-icon>
    </template>
    Menu
  </n-button>
  <n-drawer v-model:show="show" :width="240" placement="left">
    <n-drawer-content title="Navigation">
      <n-menu :options="menuOptions" @update:value="handleMenuSelect" />
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { ref, h } from 'vue';
import { NIcon } from 'naive-ui';

const show = ref(false);

const menuOptions = [
  { label: 'Home', key: 'home' },
  { label: 'About', key: 'about' },
  { label: 'Settings', key: 'settings' },
];

const handleMenuSelect = key => {
  console.log('Selected:', key);
  show.value = false;
};
</script>
```

### Form in Drawer

```vue
<template>
  <n-button @click="show = true">Edit Profile</n-button>
  <n-drawer v-model:show="show" :width="400">
    <n-drawer-content title="Edit Profile">
      <n-form :model="form">
        <n-form-item label="Name">
          <n-input v-model:value="form.name" />
        </n-form-item>
        <n-form-item label="Email">
          <n-input v-model:value="form.email" />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="show = false">Cancel</n-button>
          <n-button type="primary" @click="handleSave">Save</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { ref, reactive } from 'vue';

const show = ref(false);
const form = reactive({
  name: '',
  email: '',
});

const handleSave = () => {
  console.log('Saved:', form);
  show.value = false;
};
</script>
```

## Best Practices

1. **Use appropriate width/height**: Set reasonable sizes for different placements

   ```vue
   <n-drawer :width="400" placement="right">
   ```

2. **Use default-width with resizable**: Provide initial size for resizable drawers

   ```vue
   <n-drawer :default-width="502" resizable>
   ```

3. **Handle nested drawers**: Multiple drawers can stack naturally

4. **Use native-scrollbar with n-drawer-content**: Keep `native-scrollbar` true when using `n-drawer-content`

   ```vue
   <n-drawer :native-scrollbar="true">
     <n-drawer-content>...</n-drawer-content>
   </n-drawer>
   ```

5. **Trap focus appropriately**: Disable `trap-focus` when drawer is in a custom container

   ```vue
   <n-drawer to="#target" :trap-focus="false">
   ```

6. **Provide close options**: Either use `closable` prop or add close button in footer
