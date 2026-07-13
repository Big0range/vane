---
name: 'n-equation'
description: 'Equation component for rendering mathematical equations using KaTeX. Invoke when user needs to display mathematical formulas or LaTeX expressions in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Equation Component

Equation component for rendering mathematical equations using KaTeX, a fast math typesetting library.

## When to Use

Use this component when:

- **Mathematical formulas**: Display mathematical equations in web applications
- **Scientific content**: Present scientific formulas and equations
- **Educational platforms**: Show mathematical content in learning materials
- **Documentation**: Include mathematical expressions in technical documentation

## When to Invoke

Invoke this skill when:

- User needs to display mathematical equations or formulas
- User wants to render LaTeX expressions
- User asks about setting up KaTeX for Equation component
- User needs to customize KaTeX options for equation rendering

## Prerequisites

**Important**: Naive UI does not include KaTeX by default. You must configure it before using the Equation component.

```vue
<template>
  <n-config-provider :katex="katex">
    <my-app />
  </n-config-provider>
</template>

<script setup>
import katex from 'katex';
import 'katex/dist/katex.css';
</script>
```

## Features

- **LaTeX Rendering**: Render mathematical expressions using LaTeX syntax
- **KaTeX Integration**: Fast and accurate math typesetting
- **Custom Options**: Configure KaTeX options for advanced customization
- **Global Configuration**: Set up KaTeX once via n-config-provider

## API Reference

### Equation Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| katex | `object` | `undefined` | KaTeX instance for local configuration. |
| katex-options | `object` | `undefined` | KaTeX options for the equation rendering. |
| value | `string` | `undefined` | LaTeX expression of the equation. |

## Basic Usage

### Basic Equation

```vue
<template>
  <n-config-provider :katex="katex">
    <n-equation :value="equation" />
  </n-config-provider>
</template>

<script setup>
import katex from 'katex';
import 'katex/dist/katex.css';

const equation = 'E = mc^2';
</script>
```

### Complex Mathematical Formula

```vue
<template>
  <n-config-provider :katex="katex">
    <n-space vertical>
      <n-equation
        value="\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}"
      />
      <n-equation
        value="\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}"
      />
      <n-equation value="\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" />
    </n-space>
  </n-config-provider>
</template>

<script setup>
import katex from 'katex';
import 'katex/dist/katex.css';
</script>
```

### Using KaTeX Options

```vue
<template>
  <n-config-provider :katex="katex">
    <n-equation :value="equation" :katex-options="katexOptions" />
  </n-config-provider>
</template>

<script setup>
import katex from 'katex';
import 'katex/dist/katex.css';

const equation = '\\frac{1}{2}';

const katexOptions = {
  displayMode: true,
  throwOnError: false,
  errorColor: '#cc0000',
};
</script>
```

## Common Patterns

### Equation in Card

```vue
<template>
  <n-config-provider :katex="katex">
    <n-card title="Quadratic Formula">
      <n-equation value="x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" />
    </n-card>
  </n-config-provider>
</template>

<script setup>
import katex from 'katex';
import 'katex/dist/katex.css';
</script>
```

### Multiple Equations with Descriptions

```vue
<template>
  <n-config-provider :katex="katex">
    <n-descriptions label-placement="left" :column="1" bordered>
      <n-descriptions-item label="Einstein's Mass-Energy">
        <n-equation value="E = mc^2" />
      </n-descriptions-item>
      <n-descriptions-item label="Pythagorean Theorem">
        <n-equation value="a^2 + b^2 = c^2" />
      </n-descriptions-item>
      <n-descriptions-item label="Euler's Identity">
        <n-equation value="e^{i\\pi} + 1 = 0" />
      </n-descriptions-item>
    </n-descriptions>
  </n-config-provider>
</template>

<script setup>
import katex from 'katex';
import 'katex/dist/katex.css';
</script>
```

### Dynamic Equation Rendering

```vue
<template>
  <n-config-provider :katex="katex">
    <n-space vertical>
      <n-input
        v-model:value="latexInput"
        placeholder="Enter LaTeX expression"
      />
      <n-equation
        :value="latexInput"
        :katex-options="{ throwOnError: false }"
      />
    </n-space>
  </n-config-provider>
</template>

<script setup>
import { ref } from 'vue';
import katex from 'katex';
import 'katex/dist/katex.css';

const latexInput = ref('x^2 + y^2 = r^2');
</script>
```

## Best Practices

1. **Import KaTeX CSS**: Always import KaTeX CSS for proper rendering

   ```javascript
   import 'katex/dist/katex.css';
   ```

2. **Configure globally**: Use n-config-provider to set KaTeX once for all Equation components

   ```vue
   <n-config-provider :katex="katex">
     <app />
   </n-config-provider>
   ```

3. **Handle errors gracefully**: Use `throwOnError: false` for user input

   ```vue
   <n-equation :value="input" :katex-options="{ throwOnError: false }" />
   ```

4. **Escape backslashes**: Use double backslashes in JavaScript strings

   ```javascript
   const equation = '\\frac{1}{2}'; // Renders as \frac{1}{2}
   ```

5. **Use displayMode for block equations**: Set displayMode in katex-options for centered block equations
   ```vue
   <n-equation :value="equation" :katex-options="{ displayMode: true }" />
   ```
