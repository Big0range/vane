---
name: 'n-code'
description: 'Code component for displaying syntax-highlighted code. Invoke when user needs to display code snippets with syntax highlighting in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Code Component

Code component for displaying syntax-highlighted code blocks with support for multiple languages.

## When to Use

Use this component when:

- **Code display**: Show code snippets with syntax highlighting
- **Documentation**: Display code examples in documentation
- **Technical content**: Present code in technical articles or tutorials
- **Inline code**: Display code within text content

## When to Invoke

Invoke this skill when:

- User needs to display code with syntax highlighting
- User wants to show line numbers in code blocks
- User needs inline code display
- User wants word-wrapped code blocks
- User asks about setting up highlight.js for Code component

## Prerequisites

**Important**: Naive UI does not include highlight.js by default. You must configure it before using the Code component.

```vue
<template>
  <n-config-provider :hljs="hljs">
    <my-app />
  </n-config-provider>
</template>

<script setup>
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);

// Register only the languages you need to reduce bundle size
</script>
```

## Features

- **Syntax Highlighting**: Support for multiple programming languages
- **Inline Mode**: Display code inline with text
- **Line Numbers**: Show line numbers in code blocks
- **Word Wrap**: Enable word wrapping for long lines
- **Trim Support**: Automatically trim leading/trailing whitespace
- **Custom hljs**: Configure highlight.js locally via prop

## API Reference

### Code Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| code | `string` | `''` | Incoming code string. |
| hljs | `Object` | `undefined` | If you want to set hljs locally, pass it using this prop. |
| inline | `boolean` | `false` | Whether the code is displayed as inline. |
| language | `string` | `undefined` | Code language in highlightjs. |
| show-line-numbers | `boolean` | `false` | Whether to show line numbers. Won't work if `inline` or `word-wrap` is `true`. |
| trim | `boolean` | `true` | Whether to display trimmed code. |
| word-wrap | `boolean` | `false` | Whether to display word-wrapped code. |

## Basic Usage

### Basic Code Blocks

```vue
<template>
  <div style="overflow: auto">
    <n-space vertical :size="16">
      <n-code
        code="
  function sleep (ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  "
        language="javascript"
      />
      <n-code
        code="
  def say_hello():
      print('Hello Naive UI')
  "
        language="python"
      />
    </n-space>
  </div>
</template>
```

### Inline Code

```vue
<template>
  <div>
    JavaScript
    <n-code :code="code" language="javascript" inline />
    is awesome!
  </div>
</template>

<script setup>
const code = 'const x = 1';
</script>
```

### Word Wrap

```vue
<template>
  <n-code :code="longCode" language="js" word-wrap />
</template>

<script setup>
const longCode = `const veryLongVariableName = 'This is a very long string that would normally overflow the container'`;
</script>
```

### Line Numbers

```vue
<template>
  <div style="overflow: auto">
    <n-code :code="code" language="cpp" show-line-numbers />
  </div>
</template>

<script setup>
const code = `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`;
</script>
```

## Common Patterns

### Code Block with Copy Button

```vue
<template>
  <div class="code-container">
    <n-button size="tiny" class="copy-btn" @click="handleCopy">
      {{ copied ? 'Copied!' : 'Copy' }}
    </n-button>
    <n-code :code="code" language="javascript" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const code = `function hello() {
  console.log('Hello, World!')
}`;

const copied = ref(false);

const handleCopy = async () => {
  await navigator.clipboard.writeText(code);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};
</script>

<style scoped>
.code-container {
  position: relative;
}
.copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>
```

### Multiple Language Tabs

```vue
<template>
  <div>
    <n-tabs v-model:value="activeTab">
      <n-tab-pane name="js" tab="JavaScript">
        <n-code :code="jsCode" language="javascript" />
      </n-tab-pane>
      <n-tab-pane name="ts" tab="TypeScript">
        <n-code :code="tsCode" language="typescript" />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('js');

const jsCode = `function greet(name) {
  return \`Hello, \${name}!\`
}`;

const tsCode = `function greet(name: string): string {
  return \`Hello, \${name}!\`
}`;
</script>
```

### Local hljs Configuration

```vue
<template>
  <n-code :hljs="hljs" :code="code" language="rust" />
</template>

<script setup>
import hljs from 'highlight.js/lib/core';
import rust from 'highlight.js/lib/languages/rust';

hljs.registerLanguage('rust', rust);

const code = `fn main() {
    println!("Hello, World!");
}`;
</script>
```

### Code in Card

```vue
<template>
  <n-card title="Example Code">
    <n-code :code="code" language="javascript" show-line-numbers />
  </n-card>
</template>

<script setup>
const code = `// Example function
function example() {
  return true
}`;
</script>
```

## Best Practices

1. **Register languages on demand**: Only import the languages you need to reduce bundle size

   ```javascript
   import hljs from 'highlight.js/lib/core';
   import javascript from 'highlight.js/lib/languages/javascript';
   hljs.registerLanguage('javascript', javascript);
   ```

2. **Use overflow container**: Wrap code blocks in overflow containers for horizontal scrolling

   ```vue
   <div style="overflow: auto">
     <n-code :code="code" language="javascript" />
   </div>
   ```

3. **Use word-wrap for long lines**: Enable word-wrap when horizontal scrolling is not desired

   ```vue
   <n-code :code="code" language="javascript" word-wrap />
   ```

4. **Configure hljs globally**: Use n-config-provider to set hljs once for all Code components

   ```vue
   <n-config-provider :hljs="hljs">
     <app />
   </n-config-provider>
   ```

5. **Use inline mode sparingly**: Inline code is best for short snippets within text

   ```vue
   Use
   <n-code code="const x = 1" language="javascript" inline />
   for inline code.
   ```

6. **Line numbers with block code**: Use show-line-numbers for longer code blocks
   ```vue
   <n-code :code="code" language="python" show-line-numbers />
   ```
