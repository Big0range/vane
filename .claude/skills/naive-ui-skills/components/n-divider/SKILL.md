---
name: 'n-divider'
description: 'Divider component for separating content sections. Invoke when user needs to implement horizontal or vertical dividers with optional titles in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Divider Component

Divider component for visually separating content sections with horizontal or vertical lines.

## When to Use

Use this component when:

- **Content separation**: Divide different sections of content
- **Visual grouping**: Create visual breaks between related items
- **Title dividers**: Add labeled section dividers
- **Inline separation**: Separate inline elements vertically

## When to Invoke

Invoke this skill when:

- User needs to separate content sections
- User wants a divider with a title or label
- User needs vertical dividers for inline content
- User wants dashed or solid line styles
- User asks about title placement options

## Features

- **Horizontal/Vertical**: Support for both orientations
- **Title Support**: Add titles with customizable placement
- **Dashed Style**: Option for dashed line style
- **Simple API**: Minimal props for easy usage

## API Reference

### Divider Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| dashed | `boolean` | `false` | Whether to show dashed line. |
| title-placement | `'left' \| 'right' \| 'center'` | `'center'` | Title placement. |
| vertical | `boolean` | `false` | Whether to show vertical direction. |

### Divider Slots

| Name    | Parameters | Description           |
| ------- | ---------- | --------------------- |
| default | `()`       | The title of divider. |

## Basic Usage

### Basic Horizontal Divider

```vue
<template>
  <div>
    <p>First section content</p>
    <n-divider />
    <p>Second section content</p>
  </div>
</template>
```

### Divider with Title

```vue
<template>
  <div>
    <p>First section content</p>
    <n-divider>Title Center</n-divider>
    <p>Second section content</p>
  </div>
</template>
```

### Title Placement

```vue
<template>
  <div>
    <p>Content above</p>
    <n-divider title-placement="left">Left Title</n-divider>
    <p>Content in between</p>
    <n-divider title-placement="right">Right Title</n-divider>
    <p>Content below</p>
  </div>
</template>
```

### Dashed Divider

```vue
<template>
  <div>
    <p>Content above</p>
    <n-divider dashed>Dashed Line</n-divider>
    <p>Content below</p>
  </div>
</template>
```

## Common Patterns

### Vertical Divider

```vue
<template>
  <div>
    Text
    <n-divider vertical />
    Link
    <n-divider vertical />
    Button
  </div>
</template>
```

### Section Dividers in Card

```vue
<template>
  <n-card title="Card Title">
    <div>First section</div>
    <n-divider />
    <div>Second section</div>
    <n-divider />
    <div>Third section</div>
  </n-card>
</template>
```

### Form Section Dividers

```vue
<template>
  <n-form>
    <n-form-item label="Name">
      <n-input />
    </n-form-item>
    <n-form-item label="Email">
      <n-input />
    </n-form-item>

    <n-divider>Address Information</n-divider>

    <n-form-item label="Street">
      <n-input />
    </n-form-item>
    <n-form-item label="City">
      <n-input />
    </n-form-item>
  </n-form>
</template>
```

### Navigation with Vertical Dividers

```vue
<template>
  <n-space align="center">
    <n-button text>Home</n-button>
    <n-divider vertical />
    <n-button text>Products</n-button>
    <n-divider vertical />
    <n-button text>About</n-button>
    <n-divider vertical />
    <n-button text>Contact</n-button>
  </n-space>
</template>
```

### Styled Divider with Icon

```vue
<template>
  <n-divider>
    <n-icon :component="StarIcon" />
  </n-divider>
</template>
```

### Breadcrumb Alternative

```vue
<template>
  <n-space align="center">
    <n-text depth="3">Step 1</n-text>
    <n-divider vertical />
    <n-text depth="3">Step 2</n-text>
    <n-divider vertical />
    <n-text type="primary">Step 3</n-text>
  </n-space>
</template>
```

### Dashed with Left Title

```vue
<template>
  <n-divider dashed title-placement="left"> Optional Section </n-divider>
</template>
```

## Best Practices

1. **Use for logical separation**: Dividers should separate logically distinct content

   ```vue
   <div>Personal Info</div>
   <n-divider />
   <div>Professional Info</div>
   ```

2. **Vertical for inline elements**: Use vertical dividers for inline content

   ```vue
   <span>Item 1</span>
   <n-divider vertical />
   <span>Item 2</span>
   ```

3. **Title placement**: Use title placement to match visual hierarchy

   ```vue
   <n-divider title-placement="left">Section Title</n-divider>
   ```

4. **Dashed for optional sections**: Use dashed style to indicate optional content

   ```vue
   <n-divider dashed>Optional</n-divider>
   ```

5. **Avoid overuse**: Don't use dividers excessively; whitespace can be sufficient

6. **Combine with spacing**: Add appropriate spacing around dividers
   ```vue
   <n-space vertical size="large">
     <div>Content</div>
     <n-divider />
     <div>Content</div>
   </n-space>
   ```
