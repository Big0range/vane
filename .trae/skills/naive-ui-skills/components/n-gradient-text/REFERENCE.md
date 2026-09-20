---
name: 'n-gradient-text'
description: 'Gradient text component for styled text with gradient colors. Invoke when user needs decorative text, gradient headings, or styled text elements in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Gradient Text Component

Text component with gradient color styling for decorative purposes.

## When to Use

Use this component when:

- **Decorative headings**: Create visually appealing gradient headings
- **Brand styling**: Apply brand gradient colors to text
- **Visual emphasis**: Highlight important text with gradient effects
- **Custom styling**: Create unique text appearances with custom gradients

## When to Invoke

Invoke this skill when:

- User needs gradient-colored text
- User wants predefined gradient text types
- User needs custom gradient colors
- User wants to style text with gradient effects

## Features

- **Preset Types**: Primary, info, success, warning, error gradients
- **Custom Gradients**: Define custom gradient colors and angles
- **Size Control**: Set text size via prop or CSS
- **Simple API**: Easy-to-use gradient configuration

## API Reference

### GradientText Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| gradient | `string \| { from: string, to: string, deg: number \| string }` | `undefined` | Gradient color configuration. |
| size | `number \| string` | `undefined` | Text size (default unit is `px` if number). |
| type | `'primary' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Preset gradient type. |

### GradientText Slots

| Name    | Parameters | Description                  |
| ------- | ---------- | ---------------------------- |
| default | `()`       | The text content to display. |

## Basic Usage

### Preset Types

```vue
<template>
  <n-gradient-text type="error">Boom!</n-gradient-text>
  <br />
  <n-gradient-text type="info">Emmm</n-gradient-text>
  <br />
  <n-gradient-text type="warning">Oops!</n-gradient-text>
  <br />
  <n-gradient-text type="success">Haha!</n-gradient-text>
</template>
```

### Custom Size

```vue
<template>
  <n-gradient-text :size="24" type="warning">
    Married with Children
  </n-gradient-text>
  <br />
  <n-gradient-text :size="24" type="success">
    Back in the USSR
  </n-gradient-text>
</template>
```

### Custom Gradient

```vue
<template>
  <n-gradient-text
    :gradient="{
      from: 'rgb(85, 85, 85)',
      to: 'rgb(170, 170, 170)',
    }"
  >
    Custom Color
  </n-gradient-text>
  <br />
  <n-gradient-text
    :gradient="{
      deg: 180,
      from: 'rgb(85, 85, 85)',
      to: 'rgb(170, 170, 170)',
    }"
  >
    Custom Color with Angle
  </n-gradient-text>
  <br />
  <n-gradient-text
    gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)"
  >
    Multi-color Gradient
  </n-gradient-text>
</template>
```

## Common Patterns

### Gradient Heading

```vue
<template>
  <n-h1>
    <n-gradient-text type="primary" :size="32">
      Welcome to Our App
    </n-gradient-text>
  </n-h1>
</template>
```

### Brand Colors

```vue
<template>
  <n-gradient-text
    :gradient="{
      from: '#667eea',
      to: '#764ba2',
      deg: 135,
    }"
    :size="28"
  >
    Brand Name
  </n-gradient-text>
</template>
```

### Status Indicators

```vue
<template>
  <n-space align="center">
    <n-gradient-text type="success" :size="16"> ✓ Completed </n-gradient-text>
    <n-gradient-text type="warning" :size="16"> ⚠ Pending </n-gradient-text>
    <n-gradient-text type="error" :size="16"> ✗ Failed </n-gradient-text>
  </n-space>
</template>
```

### Animated Gradient (CSS)

```vue
<template>
  <n-gradient-text
    :gradient="'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ff6b6b)'"
    :size="24"
    class="animated-gradient"
  >
    Animated Text
  </n-gradient-text>
</template>

<style scoped>
.animated-gradient {
  background-size: 200% auto;
  animation: gradient 3s linear infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}
</style>
```

### Rainbow Text

```vue
<template>
  <n-gradient-text
    gradient="linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)"
    :size="20"
  >
    Rainbow Text
  </n-gradient-text>
</template>
```

## Best Practices

1. **Use preset types for consistency**: Stick to predefined types for standard UI

   ```vue
   <n-gradient-text type="success">Success message</n-gradient-text>
   ```

2. **Match brand colors**: Use custom gradients for brand-specific styling

   ```vue
   <n-gradient-text :gradient="{ from: '#brand1', to: '#brand2' }">
     Brand Text
   </n-gradient-text>
   ```

3. **Consider readability**: Ensure gradient colors maintain text readability
   - Avoid overly similar colors
   - Maintain sufficient contrast

4. **Use sparingly**: Gradient text is decorative, use for emphasis only
   - Don't overuse in body text
   - Reserve for headings and highlights

5. **Size with context**: Match text size to surrounding content

   ```vue
   <n-gradient-text :size="24" type="primary">Heading</n-gradient-text>
   ```

6. **Combine with typography**: Use within n-h1, n-h2, etc. for semantic structure
   ```vue
   <n-h2>
     <n-gradient-text type="info">Section Title</n-gradient-text>
   </n-h2>
   ```
