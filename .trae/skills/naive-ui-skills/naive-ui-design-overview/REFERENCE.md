---
name: 'naive-ui-design-overview'
description: 'Overview of all Naive UI components organized by category. Invoke when user needs a quick reference to all available components or wants to explore the component library.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Component Overview

Quick reference to all Naive UI components organized by category. Naive UI is a Vue 3 component library that is fairly complete, themeable, written in TypeScript, and fast.

## When to Use

- Exploring available components
- Quick component reference
- Understanding component categories
- Planning UI implementation

---

## Component Categories

### Basic Components (18)

| Component              | Description                                    |
| ---------------------- | ---------------------------------------------- |
| **Affix**              | Fixes elements to a specific visible area      |
| **Avatar**             | User avatars with images, icons, or characters |
| **AvatarGroup**        | Group of avatars with overlap display          |
| **Badge**              | Numbers or status marks on elements            |
| **Button**             | Basic button with various types and sizes      |
| **ButtonGroup**        | Group of buttons                               |
| **Card**               | Information in card containers                 |
| **Carousel**           | Image/text carousels                           |
| **Collapse**           | Expandable panels                              |
| **CollapseTransition** | Collapse transition wrapper                    |
| **Divider**            | Content separation lines                       |
| **Drawer**             | Slide-out panels from screen edge              |
| **Dropdown**           | Dropdown menus                                 |
| **Ellipsis**           | Text with ellipsis and tooltip                 |
| **Empty**              | Empty state placeholder                        |
| **Icon**               | Icon component                                 |
| **IconWrapper**        | Icon wrapper for consistent sizing             |
| **Tag**                | Labels and tags                                |

### Form Components (18)

| Component        | Description                         |
| ---------------- | ----------------------------------- |
| **AutoComplete** | Input with autocomplete suggestions |
| **Cascader**     | Hierarchical selection              |
| **Checkbox**     | Multiple selection                  |
| **ColorPicker**  | Color selection                     |
| **DatePicker**   | Date selection                      |
| **DynamicInput** | Dynamic input fields                |
| **DynamicTags**  | Dynamic tag input                   |
| **Form**         | Form management and validation      |
| **Input**        | Text input                          |
| **InputNumber**  | Numeric input                       |
| **InputOTP**     | One-time password input             |
| **Mention**      | @mentions in inputs                 |
| **Radio**        | Single selection                    |
| **Rate**         | Star rating                         |
| **Select**       | Dropdown selection                  |
| **Slider**       | Range slider                        |
| **Switch**       | Toggle switch                       |
| **TimePicker**   | Time selection                      |
| **Transfer**     | Dual-column selection               |
| **TreeSelect**   | Tree-based selection                |
| **Upload**       | File upload                         |

### Data Display Components (22)

| Component           | Description                           |
| ------------------- | ------------------------------------- |
| **Avatar**          | User avatars                          |
| **AvatarGroup**     | Avatar groups                         |
| **Badge**           | Status marks                          |
| **Calendar**        | Date display                          |
| **Card**            | Card containers                       |
| **Carousel**        | Carousels                             |
| **Code**            | Code display with syntax highlighting |
| **DataTable**       | Advanced data tables                  |
| **Descriptions**    | Key-value displays                    |
| **Empty**           | Empty state placeholder               |
| **Equation**        | Mathematical equations                |
| **GradientText**    | Gradient text effect                  |
| **Heatmap**         | Heatmap visualization                 |
| **Highlight**       | Text highlighting                     |
| **Image**           | Images with preview                   |
| **List**            | List container                        |
| **Log**             | Console log display                   |
| **NumberAnimation** | Animated number display               |
| **Progress**        | Progress indicators                   |
| **QRCode**          | QR code generation                    |
| **Statistic**       | Numerical statistics                  |
| **Table**           | Basic data tables                     |
| **Thing**           | Thing card component                  |
| **Timeline**        | Chronological events                  |
| **Tree**            | Hierarchical data                     |
| **VirtualList**     | Virtual scrolling list                |

### Navigation Components (7)

| Component      | Description      |
| -------------- | ---------------- |
| **Affix**      | Sticky elements  |
| **Anchor**     | Page navigation  |
| **Breadcrumb** | Location display |
| **Dropdown**   | Dropdown menus   |
| **Menu**       | Navigation menu  |
| **PageHeader** | Page headers     |
| **Pagination** | Page navigation  |
| **Steps**      | Step guide       |
| **Tabs**       | Tabbed content   |

### Feedback Components (11)

| Component        | Description          |
| ---------------- | -------------------- |
| **Alert**        | Alert messages       |
| **Dialog**       | Modal dialogs        |
| **Drawer**       | Slide-out panels     |
| **LoadingBar**   | Top loading bar      |
| **Message**      | Toast messages       |
| **Modal**        | Modal dialogs        |
| **Notification** | Corner notifications |
| **Popconfirm**   | Confirmation dialogs |
| **Popover**      | Rich popups          |
| **Result**       | Result pages         |
| **Spin**         | Loading spinner      |
| **Tooltip**      | Hover tooltips       |

### Layout Components (7)

| Component      | Description            |
| -------------- | ---------------------- |
| **Divider**    | Content separation     |
| **Flex**       | Flexbox layout         |
| **Grid**       | CSS Grid layout        |
| **Layout**     | Page layout containers |
| **LegacyGrid** | Legacy 24-column grid  |
| **Space**      | Element spacing        |
| **Split**      | Resizable panels       |

### Typography Components (6)

| Component      | Description       |
| -------------- | ----------------- |
| **H1-H6**      | Header components |
| **P**          | Paragraph         |
| **Text**       | Styled text       |
| **A**          | Anchor/link       |
| **Hr**         | Horizontal rule   |
| **Ul/Ol/Li**   | List elements     |
| **Blockquote** | Blockquote        |

### Utility Components (9)

| Component            | Description                 |
| -------------------- | --------------------------- |
| **ConfigProvider**   | Global configuration        |
| **Discrete**         | Discrete component mounting |
| **Element**          | Theme variable container    |
| **FloatButton**      | Floating action button      |
| **FloatButtonGroup** | Floating button group       |
| **GlobalStyle**      | Global style injection      |
| **InfiniteScroll**   | Infinite scrolling          |
| **Marquee**          | Marquee scrolling text      |
| **Scrollbar**        | Custom scrollbars           |
| **Watermark**        | Watermarks                  |

---

## Design Resources

| Resource       | Description                    |
| -------------- | ------------------------------ |
| **Color**      | Color palette and semantics    |
| **Border**     | Border styles, radius, shadows |
| **Layout**     | Grid and flexbox systems       |
| **Typography** | Font conventions               |

---

## Key Features

### TypeScript Support

All components are written in TypeScript with full type definitions.

```typescript
import type { ButtonProps, InputProps } from 'naive-ui';
```

### Tree-shaking

All components support tree-shaking for optimal bundle size.

```typescript
import { NButton, NInput } from 'naive-ui';
```

### Theme Customization

Advanced type-safe theme system built with TypeScript.

```vue
<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <app />
  </n-config-provider>
</template>

<script setup>
const themeOverrides = {
  common: {
    primaryColor: '#18a058',
  },
};
</script>
```

### Dark Mode

Built-in dark theme support.

```vue
<template>
  <n-config-provider :theme="darkTheme">
    <app />
  </n-config-provider>
</template>

<script setup>
import { darkTheme } from 'naive-ui';
</script>
```

### useThemeVars Hook

Access theme variables in JavaScript.

```vue
<script setup>
import { useThemeVars } from 'naive-ui';
const themeVars = useThemeVars();
</script>

<template>
  <div :style="{ color: themeVars.primaryColor }">Primary color text</div>
</template>
```

---

## Related Skills

| Skill | Description |
| --- | --- |
| [naive-ui-design-color](./naive-ui-design-color/SKILL.md) | Color design specifications |
| [naive-ui-design-border](./naive-ui-design-border/SKILL.md) | Border design specifications |
| [naive-ui-design-typography](./naive-ui-design-typography/SKILL.md) | Typography specifications |
| [naive-ui-design-layout](./naive-ui-design-layout/SKILL.md) | Layout system documentation |

---

## External Resources

| Resource | URL |
| --- | --- |
| Official Documentation | https://www.naiveui.com |
| GitHub Repository | https://github.com/tusen-ai/naive-ui |
| Design Resources (Sketch) | [Download](https://naive-ui.oss-accelerate.aliyuncs.com/NaiveUI-Design-Library-en-US.sketch) |
| xicons (Recommended Icons) | https://www.xicons.org |

---

## Best Practices

1. **Use ConfigProvider**: Wrap your app with `n-config-provider` for global configuration
2. **Tree-shaking**: Import only the components you need
3. **Theme Variables**: Use `useThemeVars()` for consistent theming
4. **Dark Mode**: Test your app in both light and dark themes
5. **Accessibility**: Use appropriate ARIA attributes and semantic HTML
6. **Responsive Design**: Use responsive props for mobile-first design
