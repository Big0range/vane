# Naive UI Skills Library

A comprehensive skill library for Naive UI framework, designed for AI agents to understand and utilize Naive UI components effectively.

**[中文版](./README_CN.md)**

---

## 📖 Introduction

This skill library provides structured documentation and usage guidelines for all Naive UI skills, including:

- **95 Component Skills** - Individual component documentation with API reference
- **5 Design Specification Skills** - Color, Border, Typography, Layout, and Overview
- **5 Foundation Skills** - Quickstart, Theming, i18n, SSR, and Dark Mode

## ✨ Features

- **Complete API Documentation** - Props, events, slots, and methods for each component
- **Usage Examples** - Basic and advanced usage patterns
- **Best Practices** - Recommended implementation guidelines
- **Component Interactions** - How components work together
- **Cross-Platform Compatibility** - Works in any agent environment
- **TypeScript Support** - Full type definitions and examples

## 📁 Directory Structure

```
naive-ui-skills/
├── SKILL.md                          # Main entry file
├── README.md                         # English documentation
├── README_CN.md                      # Chinese documentation
├── AGENTS.md                         # AI agents reference
├── LICENSE                           # MIT License
├── components/                       # 95 Component Skills
│   ├── n-button/
│   ├── n-input/
│   ├── n-form/
│   ├── n-data-table/
│   ├── n-modal/
│   └── ...
├── naive-ui-quickstart/              # Quick Start Guide
├── naive-ui-theming/                 # Theme Customization
├── naive-ui-i18n/                    # Internationalization
├── naive-ui-ssr/                     # Server-Side Rendering
├── naive-ui-dark-mode/               # Dark Mode
├── naive-ui-components/              # Component Overview Index
├── naive-ui-design-color/            # Color Specification
├── naive-ui-design-border/           # Border Specification
├── naive-ui-design-typography/       # Typography Specification
├── naive-ui-design-layout/           # Layout Specification
└── naive-ui-design-overview/         # Design Overview
```

## 🚀 Installation

### Prerequisites

- Node.js 18+
- Vue 3.0+
- Naive UI 2.44+

### Setup

```bash
# Install Naive UI
npm install naive-ui

# Install icons (optional)
npm install @vicons/ionicons5

# Install fonts (recommended)
npm install vfonts
```

### Install Naive UI Skills Library

Add the Naive UI Skills library to your project, enabling AI agents to understand and utilize Naive UI components:

```bash
npx skills add https://github.com/jiaiyan/naive-ui-skills --skill naive-ui-skills
```

## 📚 Usage

### For AI Agents

Each skill file follows a consistent format:

```yaml
---
name: 'n-button'
description: 'Button component description...'
metadata:
  author: jiaiyan
  version: '1.0.0'
---
```

### Skill Categories

| Category | Count | Description |
| --- | --- | --- |
| **Common Components** | 15 | Avatar, Button, Card, Carousel, Collapse, Divider, Dropdown, Ellipsis, Float Button, Gradient Text, Icon, PageHeader, Tag, Typography, Watermark |
| **Data Input** | 21 | Auto Complete, Cascader, Checkbox, Color Picker, Date Picker, Dynamic Input, Dynamic Tags, Form, Input, Input Number, Input OTP, Mention, Radio, Rate, Select, Slider, Switch, Time Picker, Transfer, Tree Select, Upload |
| **Data Display** | 21 | Calendar, Code, Countdown, Data Table, Descriptions, Empty, Equation, Heatmap, Highlight, Image, Infinite Scroll, List, Log, Number Animation, QR Code, Statistic, Table, Thing, Time, Timeline, Tree |
| **Navigation** | 9 | Affix, Anchor, Back Top, Breadcrumb, Loading Bar, Menu, Pagination, Steps, Tabs |
| **Feedback** | 16 | Alert, Badge, Dialog, Drawer, Marquee, Message, Modal, Notification, Popconfirm, Popover, Popselect, Progress, Result, Skeleton, Spin, Tooltip |
| **Layout** | 6 | Flex, Grid, Layout, Legacy Grid, Space, Split |
| **Config** | 3 | Config Provider, Element, Global Style |
| **Utility** | 4 | Collapse Transition, Discrete API, Scrollbar, Virtual List |

### Quick Reference

```markdown
# Access component skill

./components/n-{name}/SKILL.md

# Access foundation skill

./naive-ui-{name}/SKILL.md

# Access design specification skill

./naive-ui-design-{name}/SKILL.md
```

## 🔧 Component Examples

### Basic Usage

```vue
<template>
  <n-space>
    <n-button type="primary">Primary Button</n-button>
    <n-input v-model:value="input" placeholder="Please input" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const input = ref('');
</script>
```

### Form with Validation

```vue
<template>
  <n-form ref="formRef" :model="form" :rules="rules">
    <n-form-item label="Name" path="name">
      <n-input v-model:value="form.name" placeholder="Please enter name" />
    </n-form-item>
    <n-form-item>
      <n-button type="primary" @click="handleSubmit">Submit</n-button>
    </n-form-item>
  </n-form>
</template>

<script setup>
import { ref, reactive } from 'vue';

const formRef = ref(null);
const form = reactive({
  name: '',
});

const rules = {
  name: [{ required: true, message: 'Name is required', trigger: 'blur' }],
};

const handleSubmit = async () => {
  try {
    await formRef.value?.validate();
    console.log('Form validated successfully', form);
  } catch (errors) {
    console.log('Form validation failed', errors);
  }
};
</script>
```

### Data Table

```vue
<template>
  <n-data-table :columns="columns" :data="data" :pagination="pagination" />
</template>

<script setup>
import { h } from 'vue';
import { NButton } from 'naive-ui';

const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Age', key: 'age' },
  {
    title: 'Actions',
    key: 'actions',
    render(row) {
      return h(
        NButton,
        {
          size: 'small',
          onClick: () => console.log('Edit', row),
        },
        { default: () => 'Edit' },
      );
    },
  },
];

const data = [
  { name: 'John Doe', age: 28 },
  { name: 'Jane Smith', age: 32 },
];

const pagination = {
  pageSize: 10,
};
</script>
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-skill`)
3. Commit your changes (`git commit -m 'Add new skill'`)
4. Push to the branch (`git push origin feature/new-skill`)
5. Open a Pull Request

### Skill File Guidelines

Each skill file should include:

- **name**: Unique identifier (e.g., `n-button`)
- **description**: Clear description with invocation criteria
- **metadata**: Author and version information
- **Content Sections**:
  - When to Use
  - Basic Usage
  - API Reference
  - Common Patterns
  - Best Practices

## 📋 Skill File Template

```markdown
---
name: 'n-{component-name}'
description: 'Component description. Invoke when user needs to...'
metadata:
  author: your-name
  version: '1.0.0'
---

# Component Name

Component description and overview.

## When to Use

- Use case 1
- Use case 2

## Basic Usage

\`\`\`vue <template> <n-component /> </template> \`\`\`

## API Reference

### Props

| Name | Description | Type | Default | Version |
| ---- | ----------- | ---- | ------- | ------- |
| prop | Description | type | default | -       |

### Events

| Name  | Description | Parameters |
| ----- | ----------- | ---------- |
| event | Description | params     |

### Slots

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| slot | Description | params     |

### Methods

| Name   | Description | Parameters |
| ------ | ----------- | ---------- |
| method | Description | params     |

## Common Patterns

Common usage pattern examples.

## Best Practices

1. Practice 1
2. Practice 2
```

## 📄 License

MIT License

Copyright (c) 2024 Naive UI Skills Library

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## 🔗 Related Resources

- [Naive UI Documentation](https://www.naiveui.com/)
- [Vue 3 Documentation](https://vuejs.org/)
- [Naive UI GitHub](https://github.com/tusen-ai/naive-ui)
- [Naive UI Community](https://discord.gg/Pqv7Mev5Dd)

## 📞 Support

For questions and support:

- Open an issue on GitHub
- Check the documentation
- Join the Naive UI Discord community
