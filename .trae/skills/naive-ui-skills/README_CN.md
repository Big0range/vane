# Naive UI Skills Library

一个全面的 Naive UI 框架技能库，专为 AI 智能体理解和运用 Naive UI 组件而设计。

**[English Version](./README.md)**

---

## 📖 简介

本技能库为全部 Naive UI 技能提供结构化文档和使用指南，包括：

- **95 个组件技能** - 单个组件文档及 API 参考
- **5 个设计规范技能** - 颜色、边框、排版、布局和设计概览
- **5 个基础技能** - 快速开始、主题定制、国际化、服务端渲染和暗黑模式

## ✨ 功能特性

- **完整的 API 文档** - 包含属性、事件、插槽和方法
- **使用示例** - 基础和进阶用法模式
- **最佳实践** - 推荐的实现指南
- **组件交互** - 组件间的协作方式
- **跨平台兼容** - 适用于任何智能体环境
- **TypeScript 支持** - 完整的类型定义和示例

## 📁 目录结构

```
naive-ui-skills/
├── SKILL.md                          # 主入口文件
├── README.md                         # 英文文档
├── README_CN.md                      # 中文文档
├── AGENTS.md                         # AI 智能体参考文档
├── LICENSE                           # MIT 许可证
├── components/                       # 95 个组件技能
│   ├── n-button/
│   ├── n-input/
│   ├── n-form/
│   ├── n-data-table/
│   ├── n-modal/
│   └── ...
├── naive-ui-quickstart/              # 快速开始指南
├── naive-ui-theming/                 # 主题定制
├── naive-ui-i18n/                    # 国际化
├── naive-ui-ssr/                     # 服务端渲染
├── naive-ui-dark-mode/               # 暗黑模式
├── naive-ui-components/              # 组件概览索引
├── naive-ui-design-color/            # 颜色规范
├── naive-ui-design-border/           # 边框规范
├── naive-ui-design-typography/       # 排版规范
├── naive-ui-design-layout/           # 布局规范
└── naive-ui-design-overview/         # 设计概览
```

## 🚀 安装

### 前置条件

- Node.js 18+
- Vue 3.0+
- Naive UI 2.44+

### 安装步骤

```bash
# 安装 Naive UI
npm install naive-ui

# 安装图标库（可选）
npm install @vicons/ionicons5

# 安装字体（推荐）
npm install vfonts
```

### 安装 Naive UI Skills 技能库

将 Naive UI Skills 技能库添加到您的项目中，以便 AI 智能体能够理解和使用 Naive UI 组件：

```bash
npx skills add https://github.com/jiaiyan/naive-ui-skills --skill naive-ui-skills
```

## 📚 使用方法

### 适用于 AI 智能体

每个技能文件遵循统一的格式：

```yaml
---
name: 'n-button'
description: '按钮组件描述...'
metadata:
  author: jiaiyan
  version: '1.0.0'
---
```

### 技能分类

| 分类 | 数量 | 描述 |
| --- | --- | --- |
| **通用组件** | 15 | Avatar, Button, Card, Carousel, Collapse, Divider, Dropdown, Ellipsis, Float Button, Gradient Text, Icon, PageHeader, Tag, Typography, Watermark |
| **数据输入** | 21 | Auto Complete, Cascader, Checkbox, Color Picker, Date Picker, Dynamic Input, Dynamic Tags, Form, Input, Input Number, Input OTP, Mention, Radio, Rate, Select, Slider, Switch, Time Picker, Transfer, Tree Select, Upload |
| **数据展示** | 21 | Calendar, Code, Countdown, Data Table, Descriptions, Empty, Equation, Heatmap, Highlight, Image, Infinite Scroll, List, Log, Number Animation, QR Code, Statistic, Table, Thing, Time, Timeline, Tree |
| **导航组件** | 9 | Affix, Anchor, Back Top, Breadcrumb, Loading Bar, Menu, Pagination, Steps, Tabs |
| **反馈组件** | 16 | Alert, Badge, Dialog, Drawer, Marquee, Message, Modal, Notification, Popconfirm, Popover, Popselect, Progress, Result, Skeleton, Spin, Tooltip |
| **布局组件** | 6 | Flex, Grid, Layout, Legacy Grid, Space, Split |
| **配置组件** | 3 | Config Provider, Element, Global Style |
| **工具组件** | 4 | Collapse Transition, Discrete API, Scrollbar, Virtual List |

### 快速引用

```markdown
# 访问组件技能

./components/n-{name}/SKILL.md

# 访问基础技能

./naive-ui-{name}/SKILL.md

# 访问设计规范技能

./naive-ui-design-{name}/SKILL.md
```

## 🔧 组件示例

### 基础用法

```vue
<template>
  <n-space>
    <n-button type="primary">主要按钮</n-button>
    <n-input v-model:value="input" placeholder="请输入内容" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const input = ref('');
</script>
```

### 带验证的表单

```vue
<template>
  <n-form ref="formRef" :model="form" :rules="rules">
    <n-form-item label="姓名" path="name">
      <n-input v-model:value="form.name" placeholder="请输入姓名" />
    </n-form-item>
    <n-form-item>
      <n-button type="primary" @click="handleSubmit">提交</n-button>
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
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
};

const handleSubmit = async () => {
  try {
    await formRef.value?.validate();
    console.log('表单验证通过', form);
  } catch (errors) {
    console.log('表单验证失败', errors);
  }
};
</script>
```

### 数据表格

```vue
<template>
  <n-data-table :columns="columns" :data="data" :pagination="pagination" />
</template>

<script setup>
import { h } from 'vue';
import { NButton } from 'naive-ui';

const columns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  {
    title: '操作',
    key: 'actions',
    render(row) {
      return h(
        NButton,
        {
          size: 'small',
          onClick: () => console.log('编辑', row),
        },
        { default: () => '编辑' },
      );
    },
  },
];

const data = [
  { name: '张三', age: 28 },
  { name: '李四', age: 32 },
];

const pagination = {
  pageSize: 10,
};
</script>
```

## 🤝 贡献指南

欢迎参与贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/new-skill`)
3. 提交更改 (`git commit -m 'Add new skill'`)
4. 推送到分支 (`git push origin feature/new-skill`)
5. 创建 Pull Request

### 技能文件规范

每个技能文件应包含：

- **name**: 唯一标识符（如 `n-button`）
- **description**: 清晰的描述及调用条件
- **metadata**: 作者和版本信息
- **内容章节**:
  - When to Use（使用场景）
  - Basic Usage（基础用法）
  - API Reference（API 参考）
  - Common Patterns（常见模式）
  - Best Practices（最佳实践）

## 📋 技能文件模板

```markdown
---
name: 'n-{component-name}'
description: '组件描述。当用户需要...时调用'
metadata:
  author: your-name
  version: '1.0.0'
---

# Component Name

组件描述和概述。

## When to Use

- 使用场景 1
- 使用场景 2

## Basic Usage

\`\`\`vue <template> <n-component /> </template> \`\`\`

## API Reference

### Props

| Name | Description | Type | Default | Version |
| ---- | ----------- | ---- | ------- | ------- |
| prop | 描述        | type | default | -       |

### Events

| Name  | Description | Parameters |
| ----- | ----------- | ---------- |
| event | 描述        | params     |

### Slots

| Name | Description | Parameters |
| ---- | ----------- | ---------- |
| slot | 描述        | params     |

### Methods

| Name   | Description | Parameters |
| ------ | ----------- | ---------- |
| method | 描述        | params     |

## Common Patterns

常见使用模式示例。

## Best Practices

1. 最佳实践 1
2. 最佳实践 2
```

## 📄 许可证

MIT License

Copyright (c) 2024 Naive UI Skills Library

特此免费授予任何获得本软件副本和相关文档文件（"软件"）的人不受限制地处置该软件的权利，包括不受限制地使用、复制、修改、合并、发布、分发、再授权和/或出售该软件副本，以及再授权以配备了上述权利的人员使用该软件。

上述版权声明和本许可声明应包含在该软件的所有副本或实质性成分中。

本软件按"原样"提供，不提供任何形式的担保，包括但不限于适销性、特定用途适用性和非侵权性担保。在任何情况下，作者或版权持有人均不对任何索赔、损害或其他责任负责，无论这些追责基于合同、侵权或其他行为，还是产生于、源于或有关于本软件以及本软件的使用或其他处置。

## 🔗 相关资源

- [Naive UI 官方文档](https://www.naiveui.com/zh-CN/)
- [Vue 3 官方文档](https://cn.vuejs.org/)
- [Naive UI GitHub](https://github.com/tusen-ai/naive-ui)
- [Naive UI 社区](https://discord.gg/Pqv7Mev5Dd)

## 📞 支持

如有问题和需要支持：

- 在 GitHub 上提交 Issue
- 查阅官方文档
- 加入 Naive UI 社区 Discord
