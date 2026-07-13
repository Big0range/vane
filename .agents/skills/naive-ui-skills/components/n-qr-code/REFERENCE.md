---
name: 'n-qr-code'
description: 'QR Code component for generating QR codes. Invoke when user needs to generate or display QR codes for URLs, text, or data encoding in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI QR Code Component

QR Code component for generating customizable QR codes with support for icons, colors, and different render types.

## When to Use

Use this component when:

- **URL sharing**: Generate QR codes for website links
- **Data encoding**: Encode text or data in QR format
- **Mobile scanning**: Create scannable codes for mobile devices
- **Payment QR**: Generate payment or identification QR codes

## When to Invoke

Invoke this skill when:

- User needs to generate a QR code
- User wants to customize QR code colors or size
- User needs to add an icon to a QR code
- User asks about QR code error correction levels

## Features

- **Customizable Size**: Adjustable QR code dimensions
- **Color Options**: Custom foreground and background colors
- **Icon Support**: Add logos or icons to QR codes
- **Error Correction**: Multiple error correction levels (L, M, Q, H)
- **Render Types**: Canvas or SVG rendering
- **Download Support**: Easy QR code download functionality

## API Reference

### QR Code Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| background-color | `string` | `'#FFF'` | QR code background color (hex format). |
| color | `string` | `'#000'` | QR code color (hex format). |
| error-correction-level | `'L' \| 'M' \| 'Q' \| 'H'` | `'M'` | Error correction level. |
| icon-background-color | `string` | `'#FFF'` | Icon background color. |
| icon-border-radius | `number` | `4` | Icon background border radius. |
| icon-size | `number` | `40` | Icon size in pixels. |
| icon-src | `string` | `undefined` | Icon image URL. |
| padding | `number \| string` | `12` | QR code padding. |
| size | `number` | `100` | QR code size in pixels. |
| type | `'canvas' \| 'svg'` | `'canvas'` | Render type. |
| value | `string` | `''` | Text/URL to encode. |

### Error Correction Levels

| Level       | Recovery Rate | Use Case                     |
| ----------- | ------------- | ---------------------------- |
| L (Low)     | ~7%           | Clean environments           |
| M (Medium)  | ~15%          | Default, general use         |
| Q (Quarter) | ~25%          | Moderate damage risk         |
| H (High)    | ~30%          | With icons, high damage risk |

## Basic Usage

### Basic QR Code

```vue
<template>
  <n-space vertical>
    <n-qr-code :value="text" />
    <n-input
      v-model:value="text"
      :maxlength="60"
      placeholder="Enter text or URL"
    />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const text = ref('https://www.naiveui.com/');
</script>
```

### QR Code with Icon

```vue
<template>
  <n-qr-code
    value="https://www.naiveui.com/"
    icon-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    error-correction-level="H"
  />
</template>
```

### Custom Colors

```vue
<template>
  <n-flex>
    <n-qr-code value="https://www.naiveui.com/" color="#18a058" />
    <n-qr-code
      value="https://www.naiveui.com/"
      color="#409eff"
      background-color="#F5F5F5"
    />
  </n-flex>
</template>
```

### Custom Size

```vue
<template>
  <n-space vertical>
    <n-slider v-model:value="size" :min="60" :max="300" />
    <n-qr-code value="https://www.naiveui.com/" :size="size" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const size = ref(100);
</script>
```

## Common Patterns

### Downloadable QR Code

```vue
<template>
  <n-space vertical>
    <n-qr-code id="qr-code" value="https://www.naiveui.com/" />
    <n-button @click="handleDownload"> Download QR Code </n-button>
  </n-space>
</template>

<script setup>
const handleDownload = () => {
  const canvas = document.querySelector('#qr-code canvas');
  if (canvas) {
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = url;
    link.click();
  }
};
</script>
```

### Dynamic QR Code Generator

```vue
<template>
  <n-card title="QR Code Generator">
    <n-space vertical>
      <n-input v-model:value="content" placeholder="Enter content" />
      <n-color-picker v-model:value="qrColor" />
      <n-slider v-model:value="qrSize" :min="100" :max="300" />
      <n-qr-code :value="content" :color="qrColor" :size="qrSize" />
    </n-space>
  </n-card>
</template>

<script setup>
import { ref } from 'vue';

const content = ref('https://example.com');
const qrColor = ref('#000000');
const qrSize = ref(150);
</script>
```

### QR Code with Error Correction Selection

```vue
<template>
  <n-space vertical>
    <n-qr-code
      :value="longText"
      :error-correction-level="errorCorrectionLevel"
    />
    <n-radio-group v-model:value="errorCorrectionLevel">
      <n-radio-button value="L" label="Low (7%)" />
      <n-radio-button value="M" label="Medium (15%)" />
      <n-radio-button value="Q" label="Quarter (25%)" />
      <n-radio-button value="H" label="High (30%)" />
    </n-radio-group>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const longText = ref('A longer text that requires more error correction');
const errorCorrectionLevel = ref('M');
</script>
```

### SVG Render Type

```vue
<template>
  <n-space>
    <div>
      <n-text>Canvas:</n-text>
      <n-qr-code :value="text" type="canvas" />
    </div>
    <div>
      <n-text>SVG:</n-text>
      <n-qr-code :value="text" type="svg" />
    </div>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const text = ref('https://www.naiveui.com/');
</script>
```

### QR Code Card for Sharing

```vue
<template>
  <n-card title="Scan to Visit" style="width: 250px">
    <n-space vertical align="center">
      <n-qr-code
        :value="url"
        :size="180"
        icon-src="/logo.png"
        error-correction-level="H"
      />
      <n-text depth="3">{{ url }}</n-text>
      <n-button size="small" @click="copyUrl"> Copy Link </n-button>
    </n-space>
  </n-card>
</template>

<script setup>
import { useMessage } from 'naive-ui';

const url = 'https://www.naiveui.com/';
const message = useMessage();

const copyUrl = async () => {
  await navigator.clipboard.writeText(url);
  message.success('Link copied!');
};
</script>
```

### Styled Icon QR Code

```vue
<template>
  <n-flex>
    <n-qr-code
      value="https://www.naiveui.com/"
      icon-src="/logo.png"
      :icon-size="32"
      icon-background-color="#333"
      error-correction-level="H"
    />
    <n-qr-code
      value="https://www.naiveui.com/"
      icon-src="/logo.png"
      :icon-border-radius="8"
      error-correction-level="H"
    />
  </n-flex>
</template>
```

## Best Practices

1. **Use high error correction with icons**: Set error-correction-level to 'H' when using icons

   ```vue
   <n-qr-code icon-src="logo.png" error-correction-level="H" />
   ```

2. **Use hex color format**: Colors must be in hex format

   ```vue
   <n-qr-code color="#18a058" background-color="#ffffff" />
   ```

3. **Choose appropriate size**: Ensure QR code is large enough to scan

   ```vue
   <n-qr-code :size="150" />
   <!-- Minimum recommended for easy scanning -->
   ```

4. **Test scannability**: Always test generated QR codes with actual scanners

   ```javascript
   // Test with various devices and lighting conditions
   ```

5. **Use SVG for scalability**: Choose SVG type when scaling is needed

   ```vue
   <n-qr-code type="svg" />
   <!-- Better for print or responsive designs -->
   ```

6. **Keep content concise**: Shorter content creates simpler QR codes
   ```javascript
   // Use URL shorteners for long URLs
   const shortUrl = 'https://short.url/abc123';
   ```
