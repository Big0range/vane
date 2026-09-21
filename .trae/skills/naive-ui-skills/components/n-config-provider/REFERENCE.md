---
name: 'n-config-provider'
description: 'Global configuration provider for theme, locale, and component options. Invoke when user needs to set up global theme, internationalization, or configure default component behaviors in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Config Provider Component

Config Provider is the root configuration component used to set global theme, language, namespace, and component-level defaults.

## When to Use

Use this component when:

- **Theme setup**: Configure light/dark theme for the entire application
- **Internationalization**: Set locale and date locale for all components
- **Component defaults**: Configure default sizes and options for components
- **Namespace isolation**: Add class names to detached DOM elements
- **SSR optimization**: Disable inline theme for server-side rendering

## When to Invoke

Invoke this skill when:

- User needs to implement dark/light theme switching
- User wants to configure global language settings
- User needs to set default sizes for multiple components
- User wants to customize theme variables
- User asks about namespace for detached components
- User needs to configure breakpoints for responsive design

## Features

- **Theme Management**: Light/dark theme with inheritance support
- **Theme Overrides**: Customize theme CSS variables
- **Locale Support**: Internationalization for all components
- **Date Locale**: Date formatting localization
- **Component Options**: Global component size and behavior configuration
- **Namespace**: Class name for detached DOM elements
- **Breakpoints**: Custom responsive breakpoints
- **Class Prefix**: Custom CSS class prefix
- **Abstract Mode**: No wrapper DOM option
- **SSR Support**: Disable inline theme for server-side rendering

## API Reference

### ConfigProvider Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| abstract | `boolean` | `false` | If `n-config-provider` has no wrapper DOM. |
| breakpoints | `{ [k: string]: number }` | `{ xs: <640, s: ≥640, m: ≥1024, l: ≥1280, xl: ≥1536, xxl: ≥1920 }` | Responsive breakpoints for `n-grid`. Not responsive after mount. |
| cls-prefix | `string` | `undefined` | Class prefix for all inner components. Not reactive. |
| component-options | `GlobalComponentConfig` | `undefined` | Global component options for sizes and behaviors. |
| date-locale | `DateLocale \| null` | `undefined` | Date locale object. `null` uses default `dateEnUS`. `undefined` inherits from parent. |
| inline-theme-disabled | `boolean` | `false` | Disable inline theme CSS variables. Useful for SSR. Not responsive. |
| katex | `object` | `undefined` | Katex object for `n-equation` component. |
| locale | `Locale \| null` | `undefined` | Locale object. `null` uses default `enUS`. `undefined` inherits from parent. |
| namespace | `string` | `undefined` | Class name for detached parts of components. |
| preflight-style-disabled | `boolean` | `false` | Disable preflight style. Use `n-global-style` for reactive global styles. |
| style-mount-target | `ParentNode` | `undefined` | Mounting target for style elements. Not reactive. |
| tag | `string` | `'div'` | The HTML tag to render as. |
| theme | `Theme \| null` | `undefined` | Theme object. `null` uses light theme. `undefined` inherits from parent. |
| theme-overrides | `ThemeOverrides \| null` | `undefined` | Theme variable overrides. `null` clears overrides. `undefined` inherits from parent. |

### GlobalComponentConfig Type

```ts
interface GlobalComponentConfig {
  AutoComplete?: { size?: AutoCompleteSize };
  Button?: { size?: ButtonSize };
  Card?: { size?: CardSize };
  Cascader?: { size?: CascaderSize; renderEmpty?: () => VNodeChild };
  Checkbox?: { size?: CheckboxSize };
  ColorPicker?: { size?: ColorPickerSize };
  DataTable?: {
    size?: DataTableSize;
    renderFilter?: DataTableRenderFilter;
    renderSorter?: DataTableRenderSorter;
    renderEmpty?: () => VNodeChild;
  };
  DatePicker?: { size?: DatePickerSize; timePickerSize?: TimePickerSize };
  Descriptions?: { size?: DescriptionsSize };
  Dialog?: { iconPlacement?: IconPlacement };
  Dropdown?: { size?: DropdownSize };
  DynamicInput?: { buttonSize?: ButtonSize };
  DynamicTags?: { size?: DynamicTagsSize };
  Empty?: Pick<EmptyProps, 'description' | 'renderIcon'>;
  Form?: { size?: FormSize };
  Input?: { size?: InputSize };
  InputNumber?: { size?: InputNumberSize };
  InputOtp?: { size?: InputOtpSize };
  Mention?: { size?: MentionSize };
  Pagination?: {
    size?: PaginationSize;
    inputSize?: InputSize;
    selectSize?: SelectSize;
  };
  Popselect?: { size?: PopselectSize };
  Radio?: { size?: RadioSize };
  Rate?: { size?: RateSize };
  Result?: { size?: ResultSize };
  Select?: { size?: SelectSize; renderEmpty?: () => VNodeChild };
  Skeleton?: { size?: SkeletonSize };
  Space?: { size?: SpaceSize };
  Switch?: { size?: SwitchSize };
  Table?: { size?: TableSize };
  Tabs?: { size?: TabsSize };
  Tag?: { size?: TagSize };
  TimePicker?: { size?: TimePickerSize };
  Transfer?: { size?: TransferSize; renderEmpty?: () => VNodeChild };
  Tree?: { renderEmpty?: () => VNodeChild };
  TreeSelect?: { size?: TreeSelectSize; renderEmpty?: () => VNodeChild };
}
```

## Basic Usage

### Theme Switching

```vue
<template>
  <n-config-provider :theme="theme">
    <n-card>
      <n-space>
        <n-button @click="theme = darkTheme">Dark</n-button>
        <n-button @click="theme = null">Light</n-button>
      </n-space>
    </n-card>
  </n-config-provider>
</template>

<script setup>
import { ref } from 'vue';
import { darkTheme } from 'naive-ui';

const theme = ref(null);
</script>
```

### Locale Configuration

```vue
<template>
  <n-space vertical>
    <n-space>
      <n-button @click="setEnglish">en-US</n-button>
      <n-button @click="setChinese">zh-CN</n-button>
    </n-space>
    <n-config-provider :locale="locale" :date-locale="dateLocale">
      <n-date-picker />
    </n-config-provider>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';
import { zhCN, dateZhCN } from 'naive-ui';

const locale = ref(null);
const dateLocale = ref(null);

const setEnglish = () => {
  locale.value = null;
  dateLocale.value = null;
};

const setChinese = () => {
  locale.value = zhCN;
  dateLocale.value = dateZhCN;
};
</script>
```

### Use OS Theme

```vue
<template>
  <n-config-provider :theme="theme">
    <n-card> Your current system theme is {{ osTheme }}. </n-card>
  </n-config-provider>
</template>

<script setup>
import { computed } from 'vue';
import { useOsTheme, darkTheme } from 'naive-ui';

const osTheme = useOsTheme();
const theme = computed(() => (osTheme.value === 'dark' ? darkTheme : null));
</script>
```

### Abstract Mode (No Wrapper DOM)

```vue
<template>
  <n-config-provider abstract>
    <n-card>
      <n-tag>No Wrapper DOM</n-tag>
    </n-card>
  </n-config-provider>
</template>
```

### Namespace for Detached Components

```vue
<template>
  <n-config-provider :namespace="ns">
    <n-tooltip placement="bottom" trigger="click">
      <template #trigger>
        <n-button>Activate Component with Detached Content</n-button>
      </template>
      Tooltip content
    </n-tooltip>
  </n-config-provider>
</template>

<script setup>
const ns = 'my-namespace';
</script>
```

## Common Patterns

### Global Component Size Configuration

```vue
<template>
  <n-config-provider :component-options="componentOptions">
    <n-space vertical>
      <n-button>Button</n-button>
      <n-tag closable>Tag</n-tag>
      <n-card title="Card">Card Content</n-card>
      <n-pagination :page-count="20" />
    </n-space>
  </n-config-provider>
</template>

<script setup>
import { ref } from 'vue';

const size = ref('medium');

const componentOptions = computed(() => ({
  Button: { size: size.value },
  Tag: { size: size.value },
  Card: { size: size.value },
  Pagination: { size: size.value },
}));
</script>
```

### Nested Config Providers with Inheritance

```vue
<template>
  <n-config-provider :theme="darkTheme">
    <n-card title="Dark Theme">
      <n-config-provider :theme-overrides="customOverrides">
        <n-card title="Custom Overrides">
          <n-button type="primary">Custom Primary</n-button>
        </n-card>
      </n-config-provider>
    </n-card>
  </n-config-provider>
</template>

<script setup>
import { darkTheme } from 'naive-ui';

const customOverrides = {
  common: {
    primaryColor: '#FF6B6B',
  },
};
</script>
```

### SSR-Friendly Configuration

```vue
<template>
  <n-config-provider inline-theme-disabled :theme="theme">
    <n-button>No inline CSS variable on the button</n-button>
  </n-config-provider>
</template>
```

### Custom Breakpoints

```vue
<template>
  <n-config-provider :breakpoints="customBreakpoints">
    <n-grid :cols="24">
      <n-gi :span="12">Half</n-gi>
      <n-gi :span="12">Half</n-gi>
    </n-grid>
  </n-config-provider>
</template>

<script setup>
const customBreakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};
</script>
```

### Complete Application Setup

```vue
<template>
  <n-config-provider
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="locale"
    :date-locale="dateLocale"
    :component-options="componentOptions"
  >
    <n-global-style />
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <router-view />
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { ref } from 'vue';
import { darkTheme, zhCN, dateZhCN } from 'naive-ui';

const theme = ref(null);
const locale = ref(zhCN);
const dateLocale = ref(dateZhCN);

const themeOverrides = {
  common: {
    primaryColor: '#18A058',
  },
};

const componentOptions = {
  Button: { size: 'medium' },
  Input: { size: 'medium' },
  Select: { size: 'medium' },
};
</script>
```

## Best Practices

1. **Place at root level**: Wrap your entire application with `n-config-provider`

   ```vue
   <n-config-provider :theme="theme">
     <App />
   </n-config-provider>
   ```

2. **Use `n-global-style` together**: Sync global styles to `document.body`

   ```vue
   <n-config-provider :theme="theme">
     <n-global-style />
     <App />
   </n-config-provider>
   ```

3. **Inheritance behavior**: Use `undefined` to inherit, `null` to reset to default
   - `undefined`: inherits from parent config provider
   - `null`: uses the default value
   - specific value: overrides the configuration

4. **SSR optimization**: Enable `inline-theme-disabled` for server-side rendering

   ```vue
   <n-config-provider inline-theme-disabled>
     <App />
   </n-config-provider>
   ```

5. **Abstract mode**: Use `abstract` when you don't need wrapper DOM

   ```vue
   <n-config-provider abstract>
     <App />
   </n-config-provider>
   ```

6. **Theme switching**: Use `useOsTheme()` to follow system preferences

   ```js
   import { useOsTheme, darkTheme } from 'naive-ui';
   const osTheme = useOsTheme();
   const theme = computed(() => (osTheme.value === 'dark' ? darkTheme : null));
   ```

7. **Component options**: Configure default sizes for consistency

   ```js
   const componentOptions = {
     Button: { size: 'small' },
     Input: { size: 'small' },
   };
   ```

8. **Namespace for isolation**: Use namespace when multiple Naive UI instances exist
   ```vue
   <n-config-provider namespace="app-a">
     <App />
   </n-config-provider>
   ```
