---
name: 'n-typography'
description: 'Typography components for text styling including headings, paragraphs, lists, and text elements. Invoke when user needs styled text, headings, lists, or typography in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Typography Components

Typography components for styled text content including headings, paragraphs, lists, and text elements.

## When to Use

Use this component when:

- **Document content**: Display structured text content
- **Headings**: Create styled headings (h1-h6)
- **Text styling**: Apply semantic text styles (strong, italic, code, etc.)
- **Lists**: Create ordered and unordered lists
- **Blockquotes**: Display quoted content

## When to Invoke

Invoke this skill when:

- User needs styled headings with prefix bars
- User wants colored text with semantic types
- User needs lists with text alignment
- User wants blockquotes or code text
- User needs to create document-style content

## Features

- **Headings (H1-H6)**: Styled headings with optional prefix bar
- **Text Component**: Colored, styled text with multiple options
- **Paragraphs**: Styled paragraph content
- **Lists**: Ordered and unordered lists with alignment
- **Blockquote**: Quoted content styling
- **Link (A)**: Styled anchor links
- **Horizontal Rule**: Styled dividers

## API Reference

### Text Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| type | `'default' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'default'` | Text type/color. |
| strong | `boolean` | `false` | Bold text. |
| italic | `boolean` | `false` | Italic text. |
| underline | `boolean` | `false` | Underlined text. |
| delete | `boolean` | `false` | Strikethrough text. |
| code | `boolean` | `false` | Code style text. |
| depth | `1 \| 2 \| 3 \| '1' \| '2' \| '3'` | `undefined` | Text shade depth. |
| tag | `string` | `undefined` | Custom HTML tag. |

### P Props

| Name  | Type                               | Default     | Description |
| ----- | ---------------------------------- | ----------- | ----------- |
| depth | `1 \| 2 \| 3 \| '1' \| '2' \| '3'` | `undefined` | Text depth. |

### H1, H2, H3, H4, H5, H6 Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| align-text | `boolean` | `false` | Text alignment. |
| type | `'default' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'default'` | Heading color. |
| prefix | `'bar'` | `undefined` | Show prefix bar. |

### Ul, Ol Props

| Name       | Type      | Default | Description     |
| ---------- | --------- | ------- | --------------- |
| align-text | `boolean` | `false` | Text alignment. |

### Blockquote Props

| Name       | Type      | Default | Description     |
| ---------- | --------- | ------- | --------------- |
| align-text | `boolean` | `false` | Text alignment. |

### All Typography Slots

| Name    | Parameters | Description               |
| ------- | ---------- | ------------------------- |
| default | `()`       | Content of the component. |

## Basic Usage

### Headings with Prefix Bar

```vue
<template>
  <n-h1 prefix="bar" align-text>
    <n-text type="primary">Primary Heading</n-text>
  </n-h1>
  <n-h2 prefix="bar" align-text>Heading 2</n-h2>
  <n-h3 prefix="bar" align-text>Heading 3</n-h3>
</template>
```

### Colored Headings

```vue
<template>
  <n-h1 prefix="bar" align-text type="success">
    <n-text type="success">Success</n-text>
  </n-h1>
  <n-h1 prefix="bar" align-text type="info">
    <n-text type="info">Info</n-text>
  </n-h1>
  <n-h1 prefix="bar" align-text type="warning">
    <n-text type="warning">Warning</n-text>
  </n-h1>
  <n-h1 prefix="bar" align-text type="error">
    <n-text type="error">Error</n-text>
  </n-h1>
</template>
```

### Text Styles

```vue
<template>
  <n-text type="info">Info</n-text>
  <n-text type="success">Success</n-text>
  <n-text type="warning">Warning</n-text>
  <n-text type="error">Error</n-text>
  <n-text strong>Strong</n-text>
  <n-text italic>Italic</n-text>
  <n-text underline>Underline</n-text>
  <n-text delete>Delete</n-text>
  <n-text code>Code</n-text>
</template>
```

### Text Depth

```vue
<template>
  <n-text depth="1">Primary Depth</n-text>
  <n-text depth="2">Secondary Depth</n-text>
  <n-text depth="3">Tertiary Depth</n-text>
</template>
```

### Lists

```vue
<template>
  <n-ul>
    <n-li>Unordered item 1</n-li>
    <n-li>Unordered item 2</n-li>
    <n-li>Unordered item 3</n-li>
  </n-ul>
  <n-ol>
    <n-li>Ordered item 1</n-li>
    <n-li>Ordered item 2</n-li>
    <n-li>Ordered item 3</n-li>
  </n-ol>
</template>
```

### Blockquote

```vue
<template>
  <n-blockquote>
    Hear the Wind Sing is the first novel by Japanese writer Haruki Murakami.
  </n-blockquote>
  <n-blockquote align-text> Aligned blockquote content. </n-blockquote>
</template>
```

### Links

```vue
<template>
  <n-a href="https://example.com" target="_blank"> External Link </n-a>
</template>
```

## Common Patterns

### Document Structure

```vue
<template>
  <n-h1 prefix="bar" align-text>Document Title</n-h1>
  <n-p>
    Introduction paragraph with some
    <n-text strong>important</n-text> text.
  </n-p>
  <n-h2 prefix="bar" align-text>Section 1</n-h2>
  <n-p>Section content...</n-p>
  <n-h3>Subsection</n-h3>
  <n-ul>
    <n-li>Point 1</n-li>
    <n-li>Point 2</n-li>
  </n-ul>
  <n-hr />
  <n-h2 prefix="bar" align-text>Section 2</n-h2>
  <n-blockquote> A notable quote from the document. </n-blockquote>
</template>
```

### Router Link Integration

```vue
<template>
  <router-link to="/" #="{ navigate, href }" custom>
    <n-a :href="href" @click="navigate"> Back Home </n-a>
  </router-link>
</template>
```

### Status Messages

```vue
<template>
  <n-space vertical>
    <n-text type="success">✓ Operation completed successfully</n-text>
    <n-text type="warning">⚠ Please review your input</n-text>
    <n-text type="error">✗ An error occurred</n-text>
    <n-text type="info">ℹ Additional information</n-text>
  </n-space>
</template>
```

### Code Display

```vue
<template>
  <n-p>
    Use the <n-text code>npm install</n-text> command to install dependencies.
  </n-p>
  <n-p>
    The <n-text code delete>deprecated</n-text> method should not be used.
  </n-p>
</template>
```

### Custom Tag

```vue
<template>
  <n-text tag="div" type="primary"> Text rendered as a div element </n-text>
</template>
```

### Combined Styles

```vue
<template>
  <n-text strong italic type="primary"> Bold italic primary text </n-text>
  <n-text code type="error"> Error code snippet </n-text>
</template>
```

## Best Practices

1. **Use semantic headings**: Use appropriate heading levels (h1-h6) for hierarchy

   ```vue
   <n-h1>Main Title</n-h1>
   <n-h2>Section Title</n-h2>
   <n-h3>Subsection Title</n-h3>
   ```

2. **Apply prefix bar for emphasis**: Use prefix="bar" for visual hierarchy

   ```vue
   <n-h1 prefix="bar" align-text>Important Section</n-h1>
   ```

3. **Use text types semantically**: Match type to content meaning

   ```vue
   <n-text type="success">Success message</n-text>
   <n-text type="error">Error message</n-text>
   ```

4. **Align text consistently**: Use align-text for consistent spacing

   ```vue
   <n-ul align-text>
     <n-li>Aligned list item</n-li>
   </n-ul>
   ```

5. **Combine text styles appropriately**: Use multiple props for combined effects

   ```vue
   <n-text strong code>Important code</n-text>
   ```

6. **Use depth for visual hierarchy**: Apply depth for secondary content

   ```vue
   <n-text depth="3">Secondary information</n-text>
   ```

7. **Use n-a for navigation**: Integrate with router-link for SPA navigation
