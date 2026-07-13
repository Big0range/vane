---
name: 'naive-ui-skills'
description: 'Naive UI Skills Library - A comprehensive skill library for AI agents to understand and utilize Naive UI components. Invoke when user needs to work with Naive UI components, theming, i18n, dark mode, or design specifications.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Skills Library

A comprehensive skill library for Naive UI framework, designed for AI agents to understand and utilize Naive UI components effectively.

## When to Invoke

Invoke this skill when:

- User needs to implement any Naive UI component
- User asks about Naive UI configuration or setup
- User wants to customize themes or use dark mode
- User needs internationalization (i18n) support
- User asks about design specifications (colors, borders, typography)
- User encounters issues with Naive UI components

## Skill Library Overview

This library contains **one skill** with 107 reference documents organized into the following categories:

| Category | Count | Description | Path Pattern |
| --- | --- | --- | --- |
| Component References | 95 | Individual component documentation | `./components/n-{name}/REFERENCE.md` |
| Design Specifications | 5 | Border, Color, Layout, Typography, Overview | `./naive-ui-design-{name}/REFERENCE.md` |
| Foundation References | 6 | Quickstart, Theming, i18n, Dark Mode, SSR, Components | `./naive-ui-{name}/REFERENCE.md` |

## How to Locate Skills

### 1. Component References (95 skills)

All component skills follow the naming convention `n-{component-name}` and are located in the `components/` directory.

**Path Pattern:**

```
./components/n-{component-name}/REFERENCE.md
```

**Examples:**

- Button: `./components/n-button/REFERENCE.md`
- Form: `./components/n-form/REFERENCE.md`
- DataTable: `./components/n-data-table/REFERENCE.md`
- Dialog: `./components/n-dialog/REFERENCE.md`

### 2. Design Specification References (5 skills)

Design references provide guidance on Naive UI design system.

| Skill Name | Path | Description |
| --- | --- | --- |
| Border | `./naive-ui-design-border/REFERENCE.md` | Border styles, radius, shadows |
| Color | `./naive-ui-design-color/REFERENCE.md` | Color palette and semantics |
| Layout | `./naive-ui-design-layout/REFERENCE.md` | Grid system and layout |
| Typography | `./naive-ui-design-typography/REFERENCE.md` | Font conventions |
| Overview | `./naive-ui-design-overview/REFERENCE.md` | Design system overview |

### 3. Foundation References (6 skills)

Foundation references cover core setup and configuration.

| Skill Name | Path                                 | Description              |
| ---------- | ------------------------------------ | ------------------------ |
| Quickstart | `./naive-ui-quickstart/REFERENCE.md` | Installation and setup   |
| Theming    | `./naive-ui-theming/REFERENCE.md`    | Theme customization      |
| i18n       | `./naive-ui-i18n/REFERENCE.md`       | Internationalization     |
| Dark Mode  | `./naive-ui-dark-mode/REFERENCE.md`  | Dark mode implementation |
| SSR        | `./naive-ui-ssr/REFERENCE.md`        | Server-side rendering    |
| Components | `./naive-ui-components/REFERENCE.md` | Component overview index |

## Skill Invocation Guide

### Step 1: Identify User Intent

Analyze the user's request to determine which skill category is needed:

| User Request Pattern | Skill Category | Example Skill |
| --- | --- | --- |
| "Create a button/form/table..." | Component | `n-button`, `n-form`, `n-data-table` |
| "How to set up Naive UI" | Foundation | `naive-ui-quickstart` |
| "Customize theme colors" | Foundation | `naive-ui-theming` |
| "Add multi-language support" | Foundation | `naive-ui-i18n` |
| "Implement dark mode" | Foundation | `naive-ui-dark-mode` |
| "What colors are available?" | Design | `naive-ui-design-color` |
| "How does the grid work?" | Design | `naive-ui-design-layout` |

### Step 2: Locate the Skill File

Use the path patterns above to locate the appropriate skill file:

```markdown
# For component skills

./components/n-{component-name}/REFERENCE.md

# For design skills

./naive-ui-design-{name}/REFERENCE.md

# For foundation skills

./naive-ui-{name}/REFERENCE.md
```

### Step 3: Read and Apply Skill Content

Each skill file contains:

- **When to Invoke**: Specific conditions for using the skill
- **Features**: Component capabilities and options
- **API Reference**: Attributes, events, slots, exposes
- **Usage Examples**: Code snippets for common patterns
- **Best Practices**: Recommended implementation guidelines

## Component Skill Index

### Common Components (15)

| Component | Skill Path | Description |
| --- | --- | --- |
| Avatar | `./components/n-avatar/REFERENCE.md` | User avatars |
| Button | `./components/n-button/REFERENCE.md` | Buttons with various types and states |
| Card | `./components/n-card/REFERENCE.md` | Card containers |
| Carousel | `./components/n-carousel/REFERENCE.md` | Image carousel |
| Collapse | `./components/n-collapse/REFERENCE.md` | Collapsible panels |
| Divider | `./components/n-divider/REFERENCE.md` | Dividing lines |
| Dropdown | `./components/n-dropdown/REFERENCE.md` | Dropdown menu |
| Ellipsis | `./components/n-ellipsis/REFERENCE.md` | Text ellipsis |
| Float Button | `./components/n-float-button/REFERENCE.md` | Floating button |
| Gradient Text | `./components/n-gradient-text/REFERENCE.md` | Gradient text effect |
| Icon | `./components/n-icon/REFERENCE.md` | Icon wrapper component |
| Page Header | `./components/n-page-header/REFERENCE.md` | Page header |
| Tag | `./components/n-tag/REFERENCE.md` | Tags and labels |
| Typography | `./components/n-typography/REFERENCE.md` | Typography components |
| Watermark | `./components/n-watermark/REFERENCE.md` | Watermark |

### Data Input Components (21)

| Component | Skill Path | Description |
| --- | --- | --- |
| Auto Complete | `./components/n-auto-complete/REFERENCE.md` | Input with suggestions |
| Cascader | `./components/n-cascader/REFERENCE.md` | Cascading selection |
| Checkbox | `./components/n-checkbox/REFERENCE.md` | Checkboxes |
| Color Picker | `./components/n-color-picker/REFERENCE.md` | Color picker |
| Date Picker | `./components/n-date-picker/REFERENCE.md` | Date picker |
| Dynamic Input | `./components/n-dynamic-input/REFERENCE.md` | Dynamic input fields |
| Dynamic Tags | `./components/n-dynamic-tags/REFERENCE.md` | Dynamic tags input |
| Form | `./components/n-form/REFERENCE.md` | Form management |
| Input | `./components/n-input/REFERENCE.md` | Text input |
| Input Number | `./components/n-input-number/REFERENCE.md` | Number input |
| Input OTP | `./components/n-input-otp/REFERENCE.md` | OTP input |
| Mention | `./components/n-mention/REFERENCE.md` | Mention input |
| Radio | `./components/n-radio/REFERENCE.md` | Radio buttons |
| Rate | `./components/n-rate/REFERENCE.md` | Star rating |
| Select | `./components/n-select/REFERENCE.md` | Dropdown select |
| Slider | `./components/n-slider/REFERENCE.md` | Slider input |
| Switch | `./components/n-switch/REFERENCE.md` | Toggle switch |
| Time Picker | `./components/n-time-picker/REFERENCE.md` | Time picker |
| Transfer | `./components/n-transfer/REFERENCE.md` | Transfer panels |
| Tree Select | `./components/n-tree-select/REFERENCE.md` | Tree select |
| Upload | `./components/n-upload/REFERENCE.md` | File upload |

### Data Display Components (21)

| Component | Skill Path | Description |
| --- | --- | --- |
| Calendar | `./components/n-calendar/REFERENCE.md` | Calendar view |
| Code | `./components/n-code/REFERENCE.md` | Code display |
| Countdown | `./components/n-countdown/REFERENCE.md` | Countdown timer |
| Data Table | `./components/n-data-table/REFERENCE.md` | Advanced data table |
| Descriptions | `./components/n-descriptions/REFERENCE.md` | Description list |
| Empty | `./components/n-empty/REFERENCE.md` | Empty state |
| Equation | `./components/n-equation/REFERENCE.md` | Math equation |
| Heatmap | `./components/n-heatmap/REFERENCE.md` | Heatmap visualization |
| Highlight | `./components/n-highlight/REFERENCE.md` | Code highlight |
| Image | `./components/n-image/REFERENCE.md` | Image with preview |
| Infinite Scroll | `./components/n-infinite-scroll/REFERENCE.md` | Infinite scroll |
| List | `./components/n-list/REFERENCE.md` | List container |
| Log | `./components/n-log/REFERENCE.md` | Log display |
| Number Animation | `./components/n-number-animation/REFERENCE.md` | Animated numbers |
| QR Code | `./components/n-qr-code/REFERENCE.md` | QR code generator |
| Statistic | `./components/n-statistic/REFERENCE.md` | Statistics display |
| Table | `./components/n-table/REFERENCE.md` | Basic table |
| Thing | `./components/n-thing/REFERENCE.md` | Thing container |
| Time | `./components/n-time/REFERENCE.md` | Time display |
| Timeline | `./components/n-timeline/REFERENCE.md` | Timeline display |
| Tree | `./components/n-tree/REFERENCE.md` | Tree view |

### Navigation Components (9)

| Component | Skill Path | Description |
| --- | --- | --- |
| Affix | `./components/n-affix/REFERENCE.md` | Sticky positioning |
| Anchor | `./components/n-anchor/REFERENCE.md` | Anchor navigation |
| Back Top | `./components/n-back-top/REFERENCE.md` | Back to top button |
| Breadcrumb | `./components/n-breadcrumb/REFERENCE.md` | Breadcrumb navigation |
| Loading Bar | `./components/n-loading-bar/REFERENCE.md` | Loading bar |
| Menu | `./components/n-menu/REFERENCE.md` | Navigation menu |
| Pagination | `./components/n-pagination/REFERENCE.md` | Pagination |
| Steps | `./components/n-steps/REFERENCE.md` | Steps guide |
| Tabs | `./components/n-tabs/REFERENCE.md` | Tabs |

### Feedback Components (16)

| Component | Skill Path | Description |
| --- | --- | --- |
| Alert | `./components/n-alert/REFERENCE.md` | Alert messages |
| Badge | `./components/n-badge/REFERENCE.md` | Badges and marks |
| Dialog | `./components/n-dialog/REFERENCE.md` | Modal dialog |
| Drawer | `./components/n-drawer/REFERENCE.md` | Drawer panel |
| Marquee | `./components/n-marquee/REFERENCE.md` | Marquee animation |
| Message | `./components/n-message/REFERENCE.md` | Toast message |
| Modal | `./components/n-modal/REFERENCE.md` | Modal container |
| Notification | `./components/n-notification/REFERENCE.md` | Notification |
| Popconfirm | `./components/n-popconfirm/REFERENCE.md` | Popconfirm |
| Popover | `./components/n-popover/REFERENCE.md` | Popover |
| Popselect | `./components/n-popselect/REFERENCE.md` | Popover select |
| Progress | `./components/n-progress/REFERENCE.md` | Progress bar |
| Result | `./components/n-result/REFERENCE.md` | Result page |
| Skeleton | `./components/n-skeleton/REFERENCE.md` | Loading skeleton |
| Spin | `./components/n-spin/REFERENCE.md` | Loading spinner |
| Tooltip | `./components/n-tooltip/REFERENCE.md` | Tooltip |

### Layout Components (6)

| Component   | Skill Path                                | Description      |
| ----------- | ----------------------------------------- | ---------------- |
| Flex        | `./components/n-flex/REFERENCE.md`        | Flex container   |
| Grid        | `./components/n-grid/REFERENCE.md`        | Grid system      |
| Layout      | `./components/n-layout/REFERENCE.md`      | Layout container |
| Legacy Grid | `./components/n-legacy-grid/REFERENCE.md` | Legacy grid      |
| Space       | `./components/n-space/REFERENCE.md`       | Spacing          |
| Split       | `./components/n-split/REFERENCE.md`       | Split panels     |

### Config Components (3)

| Component | Skill Path | Description |
| --- | --- | --- |
| Config Provider | `./components/n-config-provider/REFERENCE.md` | Global config |
| Element | `./components/n-element/REFERENCE.md` | Element wrapper |
| Global Style | `./components/n-global-style/REFERENCE.md` | Global styles |

### Utility Components (4)

| Component | Skill Path | Description |
| --- | --- | --- |
| Collapse Transition | `./components/n-collapse-transition/REFERENCE.md` | Collapse animation |
| Discrete | `./components/n-discrete/REFERENCE.md` | Discrete API |
| Scrollbar | `./components/n-scrollbar/REFERENCE.md` | Custom scrollbar |
| Virtual List | `./components/n-virtual-list/REFERENCE.md` | Virtual scroll list |

## Usage Examples

### Example 1: User asks about button implementation

**User Request:** "How do I create a primary button with loading state?"

**Agent Action:**

1. Identify intent: Component skill - Button
2. Locate skill: `./components/n-button/REFERENCE.md`
3. Read skill content
4. Provide response with API reference and code example

**Response:**

```vue
<template>
  <n-button type="primary" :loading="loading" @click="handleClick">
    {{ loading ? 'Loading...' : 'Submit' }}
  </n-button>
</template>

<script setup>
import { ref } from 'vue';

const loading = ref(false);

const handleClick = async () => {
  loading.value = true;
  try {
    await submitData();
  } finally {
    loading.value = false;
  }
};
</script>
```

### Example 2: User asks about form validation

**User Request:** "How do I create a form with validation?"

**Agent Action:**

1. Identify intent: Component skill - Form
2. Locate skill: `./components/n-form/REFERENCE.md`
3. Read skill content
4. Provide response with validation example

**Response:**

```vue
<template>
  <n-form ref="formRef" :model="form" :rules="rules">
    <n-form-item label="Name" path="name">
      <n-input v-model:value="form.name" />
    </n-form-item>
    <n-form-item>
      <n-button type="primary" @click="submitForm">Submit</n-button>
    </n-form-item>
  </n-form>
</template>

<script setup>
import { ref, reactive } from 'vue';

const formRef = ref();
const form = reactive({
  name: '',
});

const rules = {
  name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
};

const submitForm = async () => {
  await formRef.value?.validate();
  // Submit logic
};
</script>
```

### Example 3: User asks about theme customization

**User Request:** "How do I customize Naive UI theme colors?"

**Agent Action:**

1. Identify intent: Foundation skill - Theming
2. Locate skill: `./naive-ui-theming/REFERENCE.md`
3. Read skill content
4. Provide response with theme override example

**Response:**

```vue
<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <App />
  </n-config-provider>
</template>

<script setup>
const themeOverrides = {
  common: {
    primaryColor: '#18a058',
    primaryColorHover: '#36ad6a',
    primaryColorPressed: '#0c7a43',
  },
  Button: {
    textColor: '#18a058',
  },
};
</script>
```

### Example 4: User asks about dark mode

**User Request:** "How do I implement dark mode in Naive UI?"

**Agent Action:**

1. Identify intent: Foundation skill - Dark Mode
2. Locate skill: `./naive-ui-dark-mode/REFERENCE.md`
3. Read skill content
4. Provide response with implementation example

**Response:**

```vue
<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <App />
  </n-config-provider>
</template>

<script setup>
import { ref } from 'vue';
import { darkTheme } from 'naive-ui';

const isDark = ref(false);
</script>
```

## Configuration Requirements

### Prerequisites

Before using this skill library, ensure:

1. **Vue 3.0+** is installed
2. **Naive UI 2.44+** is installed
3. **Node.js 18+** for development

### Installation

```bash
npm install naive-ui
# or
pnpm add naive-ui
```

### TypeScript Support

Naive UI is written in TypeScript and provides full type definitions out of the box.

## Input Parameters

When invoking skills, consider these parameters:

| Parameter | Type | Description | Required |
| --- | --- | --- | --- |
| component | string | Component name (e.g., "button", "form") | Yes |
| feature | string | Specific feature needed (e.g., "validation", "loading") | No |
| context | object | Additional context (framework, TypeScript usage) | No |

## Output Format

Each skill provides:

1. **API Reference**: Complete attributes, events, slots, exposes
2. **Code Examples**: Working code snippets
3. **Best Practices**: Recommended implementation patterns
4. **Common Issues**: Troubleshooting tips
5. **Component Interactions**: How to use with other components

## Important Notes

### 1. Skill Priority

When multiple skills could apply, prioritize in this order:

1. Component-specific skills (most specific)
2. Foundation references (configuration)
3. Design specification skills (guidelines)

### 2. Cross-References

Many skills reference related skills. Always check:

- Related components in the same category
- Foundation references for configuration
- Design references for styling guidelines

### 3. Version Compatibility

This skill library is based on Naive UI 2.44+. Some features may not be available in earlier versions.

### 4. Naming Conventions

- Component references use `n-{name}` format (matches Vue component tags)
- Foundation references use `naive-ui-{name}` format
- Design references use `naive-ui-design-{name}` format

### 5. File Structure

```
naive-ui-skills/
├── SKILL.md                          # The only discoverable skill entry
├── README.md                         # English documentation
├── README_CN.md                      # Chinese documentation
├── AGENTS.md                         # Agents documentation
├── LICENSE                           # MIT License
├── components/                       # 95 component references
�?  ├── n-button/
�?  �?  └── REFERENCE.md
�?  ├── n-form/
�?  �?  └── REFERENCE.md
�?  └── ...
├── naive-ui-quickstart/              # Foundation references
├── naive-ui-theming/
├── naive-ui-i18n/
├── naive-ui-dark-mode/
├── naive-ui-ssr/
├── naive-ui-components/
├── naive-ui-design-border/           # Design references
├── naive-ui-design-color/
├── naive-ui-design-layout/
├── naive-ui-design-typography/
└── naive-ui-design-overview/
```

## Best Practices for Agents

1. **Always start with this file** when user mentions Naive UI
2. **Locate the specific skill** based on user intent
3. **Read the complete skill file** before responding
4. **Provide code examples** from the skill documentation
5. **Reference related skills** when applicable
6. **Include best practices** from the skill content
7. **Mention common issues** if relevant to user's context

## Related Resources

- [Naive UI Documentation](https://www.naiveui.com/)
- [Vue 3 Documentation](https://vuejs.org/)
- [Naive UI GitHub](https://github.com/tusen-ai/naive-ui)
