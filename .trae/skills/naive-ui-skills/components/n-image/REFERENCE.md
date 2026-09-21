---
name: 'n-image'
description: 'Image component for displaying images with preview, lazy loading, and error handling. Invoke when user needs to implement image display, image preview, image gallery, or customize image appearance in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Image Component

Image component for displaying images with preview functionality, lazy loading, error handling, and customizable toolbar.

## When to Use

Use this component when:

- **Image display**: Display images with configurable width and height
- **Image preview**: Click to preview images in a larger modal
- **Image galleries**: Group multiple images for gallery-style preview
- **Lazy loading**: Load images only when they enter viewport
- **Error handling**: Show fallback images when loading fails

## When to Invoke

Invoke this skill when:

- User needs to display images with preview functionality
- User wants to create image galleries with group preview
- User needs lazy loading for images
- User wants to customize preview toolbar
- User needs fallback images when loading fails
- User asks about image preview without image element

## Features

- **Image Preview**: Click to enlarge and preview images
- **Image Group**: Group multiple images for gallery-style navigation
- **Lazy Loading**: Load images only when entering viewport
- **Error Handling**: Fallback images and custom error slots
- **Custom Toolbar**: Customize preview toolbar with render function
- **Keyboard Navigation**: Navigate between images in group preview
- **Download Support**: Download images from preview mode
- **Zoom & Rotate**: Zoom in/out and rotate images in preview

## API Reference

### Image Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| alt | `string` | `undefined` | Image alt information. |
| fallback-src | `string` | `undefined` | URL to show when the image fails to load. |
| height | `string \| number` | `undefined` | Image height. |
| img-props | `ImgHTMLAttributes` | `undefined` | The props of the img element inside the component. |
| lazy | `boolean` | `false` | Load image after it enters viewport. |
| intersection-observer-options | `object` | `undefined` | Intersection observer's config when `lazy=true`. |
| object-fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'fill'` | Object-fit type of the image. |
| preview-src | `string` | `undefined` | Source of preview image. |
| preview-disabled | `boolean` | `false` | Whether clicking image preview is disabled. |
| previewed-img-props | `HTMLAttributes` | `undefined` | DOM attributes of img element in preview mode. |
| render-toolbar | `function` | `undefined` | Toolbar rendering function. |
| show-toolbar | `boolean` | `true` | Whether to show the bottom toolbar in preview. |
| show-toolbar-tooltip | `boolean` | `false` | Whether to show toolbar buttons' tooltip. |
| src | `string` | `undefined` | Image source. |
| width | `string \| number` | `undefined` | Image width. |
| on-error | `(e: Event) => void` | `undefined` | Callback when image fails to load. |
| on-load | `(e: Event) => void` | `undefined` | Callback after image is loaded. |

### ImageGroup Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| current | `number` | `undefined` | The index of the currently displayed image. |
| default-current | `number` | `0` | The index of the default displayed image. |
| default-show | `boolean` | `false` | Whether to show preview by default. |
| render-toolbar | `function` | `undefined` | Toolbar rendering function. |
| show | `boolean` | `undefined` | Whether to show the preview. |
| show-toolbar | `boolean` | `true` | Whether to show the bottom toolbar. |
| show-toolbar-tooltip | `boolean` | `false` | Whether to show toolbar buttons' tooltip. |
| src-list | `string[]` | `undefined` | Picture src list for preview without n-image. |
| on-preview-next | `() => void` | `undefined` | Callback on next slide. |
| on-preview-prev | `() => void` | `undefined` | Callback on previous slide. |
| on-update:current | `(value: number) => void` | `undefined` | Callback on current image changes. |
| on-update:show | `(value: boolean) => void` | `undefined` | Callback on show status changes. |

### ImagePreview Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| default-show | `boolean` | `false` | Whether to show preview by default. |
| render-toolbar | `function` | `undefined` | Toolbar rendering function. |
| show | `boolean` | `undefined` | Whether to show the preview. |
| show-toolbar | `boolean` | `true` | Whether to show the bottom toolbar. |
| show-toolbar-tooltip | `boolean` | `false` | Whether to show toolbar buttons' tooltip. |
| src | `string` | `undefined` | Image source. |
| on-close | `() => void` | `undefined` | Callback when close the preview. |
| on-update:show | `(value: boolean) => void` | `undefined` | Callback on show status changes. |

### Image Slots

| Name        | Parameters | Description                                 |
| ----------- | ---------- | ------------------------------------------- |
| error       | `()`       | Content when image fails to load.           |
| placeholder | `()`       | Placeholder shown when image is not loaded. |

### ImageGroup Slots

| Name    | Parameters | Description                             |
| ------- | ---------- | --------------------------------------- |
| default | `()`       | The default content of the image group. |

### Image Methods

| Name        | Type         | Description                          |
| ----------- | ------------ | ------------------------------------ |
| showPreview | `() => void` | Show preview interface of the image. |

## Basic Usage

### Basic Image

```vue
<template>
  <n-image
    width="100"
    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
  />
</template>
```

### Image Group Gallery

```vue
<template>
  <n-image-group>
    <n-space>
      <n-image
        width="100"
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
      <n-image
        width="100"
        src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
      />
    </n-space>
  </n-image-group>
</template>
```

### Fallback Image

```vue
<template>
  <n-image
    width="100"
    src="invalid-url.png"
    fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
  />
</template>
```

### Error Slot

```vue
<template>
  <n-image width="100" :src="url">
    <template #error>
      <n-icon :size="100" color="lightGrey">
        <ImageOutlineIcon />
      </n-icon>
    </template>
  </n-image>
</template>
```

### Disable Preview

```vue
<template>
  <n-image
    width="100"
    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    preview-disabled
  />
</template>
```

### Lazy Loading

```vue
<template>
  <n-image
    lazy
    width="100"
    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
  />
</template>
```

### Lazy Loading with Intersection Observer

```vue
<template>
  <div id="scroll-container" style="overflow: auto; height: 200px;">
    <n-image
      v-for="(src, index) in srcList"
      :key="index"
      width="100"
      height="100"
      lazy
      :src="src"
      :intersection-observer-options="{
        root: '#scroll-container',
      }"
    >
      <template #placeholder>
        <div
          style="width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; background-color: #8882;"
        >
          Loading
        </div>
      </template>
    </n-image>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const srcList = ref([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
]);
</script>
```

## Common Patterns

### Manually Open Preview

```vue
<template>
  <n-space vertical>
    <n-button type="primary" @click="handleClick">
      Show image preview
    </n-button>
    <n-image
      ref="imageRef"
      width="100"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const imageRef = ref(null);

const handleClick = () => {
  imageRef.value?.showPreview();
};
</script>
```

### Use Preview Alone

```vue
<template>
  <n-button type="primary" @click="onClick">
    Click me to preview image
  </n-button>
  <n-image-preview
    v-model:show="showRef"
    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    @close="handleClose"
  />
</template>

<script setup>
import { ref } from 'vue';

const showRef = ref(false);

const onClick = () => {
  showRef.value = true;
};

const handleClose = () => {
  console.log('Preview closed');
};
</script>
```

### Multi-image Preview

```vue
<template>
  <n-button type="primary" @click="onClick">
    Click me to preview multiple images
  </n-button>
  <n-image-group
    v-model:show="showRef"
    v-model:current="currentIndex"
    :src-list="imageList"
    @update:current="handleUpdateCurrent"
  />
  <pre>currentIndex: {{ currentIndex }}</pre>
</template>

<script setup>
import { ref } from 'vue';

const showRef = ref(false);
const currentIndex = ref(0);

const imageList = ref([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg',
]);

const onClick = () => {
  showRef.value = true;
};

const handleUpdateCurrent = index => {
  console.log('Current image:', index);
};
</script>
```

### Custom Toolbar

```vue
<template>
  <n-image
    width="100"
    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    :render-toolbar="renderToolbar"
  />
</template>

<script setup>
import { h } from 'vue';

const renderToolbar = ({ nodes }) => {
  return h('div', { class: 'custom-toolbar' }, [
    nodes.zoomIn,
    nodes.zoomOut,
    nodes.rotateClockwise,
    nodes.download,
    nodes.close,
  ]);
};
</script>
```

### Image with Object Fit

```vue
<template>
  <n-space>
    <n-image
      width="100"
      height="100"
      object-fit="cover"
      src="https://example.com/image.jpg"
    />
    <n-image
      width="100"
      height="100"
      object-fit="contain"
      src="https://example.com/image.jpg"
    />
  </n-space>
</template>
```

## Best Practices

1. **Use fallback images**: Always provide a fallback-src for better user experience

   ```vue
   <n-image :src="imageUrl" fallback-src="/default-image.png" />
   ```

2. **Use lazy loading for performance**: Load images only when needed

   ```vue
   <n-image lazy :src="imageUrl" />
   ```

3. **Group related images**: Use n-image-group for gallery-style preview

   ```vue
   <n-image-group>
     <n-image v-for="img in images" :key="img.id" :src="img.url" />
   </n-image-group>
   ```

4. **Provide alt text**: Always include alt attribute for accessibility

   ```vue
   <n-image :src="imageUrl" alt="Product image" />
   ```

5. **Use preview-src for different preview image**: Show a different image in preview

   ```vue
   <n-image :src="thumbnailUrl" :preview-src="fullSizeUrl" />
   ```

6. **Show toolbar tooltips for better UX**: Help users understand keyboard shortcuts

   ```vue
   <n-image-group show-toolbar-tooltip>
     <n-image :src="imageUrl" />
   </n-image-group>
   ```

7. **Handle load errors gracefully**: Use error slot for custom error display
   ```vue
   <n-image :src="imageUrl">
     <template #error>
       <div class="error-placeholder">Failed to load</div>
     </template>
   </n-image>
   ```
