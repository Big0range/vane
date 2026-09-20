---
name: 'n-highlight'
description: 'Highlight component for highlighting matched text patterns. Invoke when user needs to highlight search results or specific text patterns in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Highlight Component

Highlight component for emphasizing matched text patterns, commonly used for search result highlighting.

## When to Use

Use this component when:

- **Search results**: Highlight search terms in results
- **Text emphasis**: Emphasize specific words or patterns in text
- **Filtering displays**: Show matched content in filtered lists
- **Keyword highlighting**: Mark important keywords in content

## When to Invoke

Invoke this skill when:

- User needs to highlight search terms in text
- User wants to emphasize specific words or patterns
- User needs case-sensitive or case-insensitive highlighting
- User wants to customize highlight styles

## Features

- **Pattern Matching**: Highlight multiple text patterns
- **Case Sensitivity**: Optional case-sensitive matching
- **Custom Styles**: Fully customizable highlight styles
- **Custom Tag**: Configurable HTML element for highlights
- **Auto Escape**: Automatic regex escaping for patterns

## API Reference

### Highlight Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| auto-escape | `boolean` | `true` | Auto-escape patterns for literal matching. |
| case-sensitive | `boolean` | `false` | Case sensitive matching. |
| highlight-class | `string` | `undefined` | CSS class for highlighted content. |
| highlight-style | `Object \| string` | `undefined` | Style for highlighted content. |
| highlight-tag | `string` | `'mark'` | HTML element tag for highlights. |
| patterns | `string[]` | `undefined` | Text patterns to highlight. |
| text | `string` | `undefined` | The text content to process. |

## Basic Usage

### Basic Highlight

```vue
<template>
  <n-highlight :text="text" :patterns="patterns" />
</template>

<script setup>
const text = 'Naive UI is a Vue 3 component library that is easy to use.';
const patterns = ['Naive UI', 'Vue 3'];
</script>
```

### Custom Highlight Style

```vue
<template>
  <n-highlight
    :text="text"
    :patterns="patterns"
    :highlight-style="{
      padding: '0 6px',
      borderRadius: '4px',
      display: 'inline-block',
      color: '#fff',
      background: '#18a058',
      transition: 'all .3s ease',
    }"
  />
</template>

<script setup>
const text = 'Search for Vue components in Naive UI library';
const patterns = ['Vue', 'Naive UI'];
</script>
```

### Case Sensitive Matching

```vue
<template>
  <n-highlight :text="text" :patterns="patterns" :case-sensitive="true" />
</template>

<script setup>
const text = 'Vue is great. vue is also great.';
const patterns = ['Vue']; // Only matches 'Vue', not 'vue'
</script>
```

### Custom Highlight Tag

```vue
<template>
  <n-highlight
    :text="text"
    :patterns="patterns"
    highlight-tag="span"
    highlight-style="text-decoration: underline; font-weight: bold;"
  />
</template>

<script setup>
const text = 'Use Naive UI for your next Vue project';
const patterns = ['Naive UI', 'Vue'];
</script>
```

## Common Patterns

### Search Results Highlighting

```vue
<template>
  <n-space vertical>
    <n-input v-model:value="searchQuery" placeholder="Search..." />
    <n-list bordered>
      <n-list-item v-for="result in searchResults" :key="result.id">
        <n-highlight
          :text="result.content"
          :patterns="searchPatterns"
          :highlight-style="{
            backgroundColor: '#fff700',
            fontWeight: 'bold',
          }"
        />
      </n-list-item>
    </n-list>
  </n-space>
</template>

<script setup>
import { computed, ref } from 'vue';

const searchQuery = ref('');
const searchResults = ref([
  { id: 1, content: 'Naive UI is a Vue 3 component library' },
  { id: 2, content: 'Vue 3 composition API is powerful' },
  { id: 3, content: 'Build modern web apps with Vue' },
]);

const searchPatterns = computed(() =>
  searchQuery.value ? [searchQuery.value] : [],
);
</script>
```

### Multiple Pattern Highlighting

```vue
<template>
  <n-highlight
    :text="text"
    :patterns="['important', 'urgent', 'critical']"
    :highlight-style="{
      color: '#fff',
      backgroundColor: '#d03050',
      padding: '2px 6px',
      borderRadius: '3px',
    }"
  />
</template>

<script setup>
const text =
  'This is an important message that requires urgent attention. It is critical to respond quickly.';
</script>
```

### Highlight with Theme Variables

```vue
<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-highlight
      :text="text"
      :patterns="patterns"
      :highlight-style="{
        padding: '0 4px',
        borderRadius: themeVars.borderRadius,
        color: themeVars.baseColor,
        background: themeVars.primaryColor,
      }"
    />
  </n-config-provider>
</template>

<script setup>
import { useThemeVars } from 'naive-ui';

const themeVars = useThemeVars();
const text = 'Highlight with theme colors in Naive UI';
const patterns = ['Naive UI'];
</script>
```

### Dynamic Pattern Highlighting

```vue
<template>
  <n-space vertical>
    <n-dynamic-tags v-model:value="patterns" />
    <n-highlight
      :text="text"
      :patterns="patterns"
      :highlight-style="{
        backgroundColor: '#18a058',
        color: '#fff',
        padding: '0 4px',
        borderRadius: '2px',
      }"
    />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const text = 'Vue 3 is great. TypeScript is awesome. Naive UI is beautiful.';
const patterns = ref(['Vue 3', 'TypeScript']);
</script>
```

### Highlight in Table

```vue
<template>
  <n-data-table :columns="columns" :data="data" />
</template>

<script setup>
import { h, ref } from 'vue';
import { NHighlight } from 'naive-ui';

const searchQuery = ref('Vue');

const columns = [
  {
    title: 'Description',
    key: 'description',
    render(row) {
      return h(NHighlight, {
        text: row.description,
        patterns: [searchQuery.value],
        highlightStyle: { backgroundColor: '#fff700' },
      });
    },
  },
];

const data = [
  { description: 'Vue 3 composition API guide' },
  { description: 'Vue Router documentation' },
  { description: 'Pinia state management for Vue' },
];
</script>
```

## Best Practices

1. **Use auto-escape for user input**: Keep auto-escape true for literal matching

   ```vue
   <n-highlight :text="text" :patterns="userInput" :auto-escape="true" />
   ```

2. **Debounce search patterns**: Optimize performance with frequent pattern changes

   ```javascript
   const debouncedPatterns = useDebounceFn(() => patterns.value, 300);
   ```

3. **Use semantic highlight tags**: Choose appropriate HTML elements

   ```vue
   <n-highlight highlight-tag="mark" />
   <!-- Default, semantic -->
   <n-highlight highlight-tag="span" />
   <!-- Generic -->
   ```

4. **Consider accessibility**: Ensure sufficient color contrast

   ```vue
   <n-highlight
     :highlight-style="{
       backgroundColor: '#fff700',
       color: '#000',
     }"
   />
   ```

5. **Handle empty patterns gracefully**: Check for empty patterns array
   ```vue
   <n-highlight :text="text" :patterns="searchQuery ? [searchQuery] : []" />
   ```
