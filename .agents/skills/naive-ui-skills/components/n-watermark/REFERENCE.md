---
name: 'n-watermark'
description: 'Watermark component for adding watermarks to content areas. Invoke when user needs text or image watermarks, fullscreen watermarks, or content protection in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Watermark Component

Watermark component for adding text or image watermarks to content areas.

## When to Use

Use this component when:

- **Content protection**: Add watermarks to sensitive content
- **Branding**: Display brand watermarks on documents
- **Copyright**: Show copyright information
- **Preview marking**: Mark preview/draft content

## When to Invoke

Invoke this skill when:

- User needs to add watermarks to content
- User wants fullscreen watermarks
- User needs image watermarks
- User wants multiline text watermarks
- User needs customizable watermark styling

## Features

- **Text Watermarks**: Customizable text content
- **Image Watermarks**: Support for image watermarks
- **Fullscreen Mode**: Apply watermark to entire page
- **Multiline Support**: Multiple lines of text
- **Custom Styling**: Font, color, rotation, and spacing options
- **Content Selection**: Control whether content is selectable

## API Reference

### Watermark Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| content | `string` | `undefined` | Watermark text content (supports `\n` for multiline). |
| cross | `boolean` | `false` | Show watermark at cross position. |
| debug | `boolean` | `false` | Show debug grid. |
| font-size | `number` | `14` | Font size. |
| font-family | `string` | `undefined` | Font family. |
| font-style | `'normal' \| 'italic' \| 'oblique ${number}deg'` | `'normal'` | Font style. |
| font-variant | `string` | `''` | Font variant. |
| font-weight | `number` | `400` | Font weight. |
| font-color | `string` | `'rgba(128, 128, 128, .3)'` | Font color. |
| fullscreen | `boolean` | `false` | Show fullscreen watermark. |
| global-rotate | `number` | `0` | Global rotation degree. |
| line-height | `number` | `14` | Line height. |
| height | `number` | `32` | Watermark area height. |
| image | `string` | `undefined` | Image URL for image watermark. |
| image-height | `number` | `undefined` | Image height. |
| image-opacity | `number` | `1` | Image opacity. |
| image-width | `number` | `undefined` | Image width. |
| rotate | `number` | `0` | Rotation degree of watermark. |
| selectable | `boolean` | `true` | Whether content is selectable. |
| text-align | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment for multiline. |
| width | `number` | `32` | Watermark area width. |
| x-gap | `number` | `0` | Horizontal gap between watermarks. |
| x-offset | `number` | `0` | Horizontal offset. |
| y-gap | `number` | `0` | Vertical gap between watermarks. |
| y-offset | `number` | `0` | Vertical offset. |
| z-index | `number` | `10` | Z-index of watermark layer. |

### Watermark Slots

| Name    | Parameters | Description                |
| ------- | ---------- | -------------------------- |
| default | `()`       | Content to be watermarked. |

## Basic Usage

### Basic Text Watermark

```vue
<template>
  <n-watermark
    content="Watermark"
    cross
    selectable
    :font-size="16"
    :line-height="16"
    :width="192"
    :height="128"
    :x-offset="12"
    :y-offset="28"
    :rotate="-15"
  >
    <n-table :bordered="false" :single-line="false">
      <thead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Data 1</td>
          <td>Data 2</td>
          <td>Data 3</td>
        </tr>
      </tbody>
    </n-table>
  </n-watermark>
</template>
```

### Fullscreen Watermark

```vue
<template>
  <n-watermark
    v-if="show"
    content="All the roads we have to walk are winding"
    cross
    fullscreen
    :font-size="16"
    :line-height="16"
    :width="384"
    :height="384"
    :x-offset="12"
    :y-offset="80"
    :rotate="-15"
  />
  <n-switch v-model:value="show" />
</template>

<script setup>
import { ref } from 'vue';

const show = ref(true);
</script>
```

### Image Watermark

```vue
<template>
  <n-watermark
    v-if="show"
    image="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    cross
    fullscreen
    :width="384"
    :height="384"
    :x-offset="12"
    :y-offset="0"
    :image-width="64"
    :image-opacity="0.24"
  />
  <n-switch v-model:value="show" />
</template>
```

### Multiline Text Watermark

```vue
<template>
  <n-watermark
    :content="'Company Name\nConfidential'"
    cross
    selectable
    :font-size="16"
    :line-height="16"
    :width="192"
    :height="128"
    :x-offset="12"
    :y-offset="28"
    :rotate="-15"
    text-align="center"
  >
    <n-table :bordered="false" :single-line="false">
      <!-- Table content -->
    </n-table>
  </n-watermark>
</template>
```

## Common Patterns

### Draft Watermark

```vue
<template>
  <n-watermark
    content="DRAFT"
    :font-size="24"
    :font-color="'rgba(255, 0, 0, 0.2)'"
    :rotate="-30"
    :width="200"
    :height="150"
  >
    <n-card title="Document Preview">
      <n-p>Document content goes here...</n-p>
    </n-card>
  </n-watermark>
</template>
```

### Confidential Document

```vue
<template>
  <n-watermark
    :content="'CONFIDENTIAL\nInternal Use Only'"
    cross
    :font-size="14"
    :font-color="'rgba(200, 50, 50, 0.15)'"
    :rotate="-20"
    :line-height="20"
    text-align="center"
  >
    <n-card>
      <n-p>Sensitive document content...</n-p>
    </n-card>
  </n-watermark>
</template>
```

### Company Branding

```vue
<template>
  <n-watermark
    content="© Company Name 2024"
    :font-size="12"
    :font-color="'rgba(0, 0, 0, 0.1)'"
    :rotate="-15"
    :x-gap="100"
    :y-gap="100"
  >
    <div class="content-area">
      <!-- Your content -->
    </div>
  </n-watermark>
</template>
```

### Toggle Watermark

```vue
<template>
  <div>
    <n-space class="mb-4">
      <n-switch v-model:value="showWatermark" />
      <n-text>Show Watermark</n-text>
    </n-space>
    <n-watermark
      v-if="showWatermark"
      content="Preview"
      :font-size="20"
      :rotate="-25"
    >
      <n-card>
        <n-p>Content with conditional watermark...</n-p>
      </n-card>
    </n-watermark>
    <n-card v-else>
      <n-p>Content without watermark...</n-p>
    </n-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showWatermark = ref(true);
</script>
```

### Custom Styled Watermark

```vue
<template>
  <n-watermark
    content="Custom Style"
    :font-size="18"
    :font-color="'rgba(100, 100, 255, 0.2)'"
    :font-style="'italic'"
    :font-weight="600"
    :rotate="-15"
    :global-rotate="5"
    :x-gap="50"
    :y-gap="50"
  >
    <n-card>
      <n-p>Content with custom styled watermark...</n-p>
    </n-card>
  </n-watermark>
</template>
```

## Best Practices

1. **Use appropriate opacity**: Keep watermarks subtle to not distract from content

   ```vue
   <n-watermark :font-color="'rgba(128, 128, 128, 0.15)'" />
   ```

2. **Set rotation for visual appeal**: Use slight rotation for better coverage

   ```vue
   <n-watermark :rotate="-15" />
   ```

3. **Use cross for better coverage**: Enable cross for denser watermark pattern

   ```vue
   <n-watermark cross />
   ```

4. **Control content selection**: Set selectable based on use case

   ```vue
   <n-watermark :selectable="false" />
   ```

5. **Use fullscreen for page-level protection**: Apply fullscreen for entire page

   ```vue
   <n-watermark fullscreen content="Confidential" />
   ```

6. **Check image cross-origin**: Ensure image URLs allow cross-origin access
   - Image watermarks may fail due to CORS restrictions

7. **Adjust gap and offset**: Fine-tune spacing for optimal coverage

   ```vue
   <n-watermark :x-gap="50" :y-gap="50" :x-offset="25" :y-offset="25" />
   ```

8. **Use multiline for more information**: Combine multiple lines with `\n`
   ```vue
   <n-watermark :content="'Company\nConfidential'" text-align="center" />
   ```
