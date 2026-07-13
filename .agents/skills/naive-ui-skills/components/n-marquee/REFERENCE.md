---
name: 'n-marquee'
description: 'Marquee component for creating scrolling content animations. Invoke when user needs to display horizontally scrolling text or content in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Marquee Component

Marquee component for creating smooth horizontal scrolling animations. Available since version 2.40.2.

## When to Use

Use this component when:

- **Text tickers**: Display scrolling news or announcements
- **Image carousels**: Create infinite scrolling image galleries
- **Notifications**: Show scrolling alerts or messages
- **Promotional content**: Display scrolling promotional banners
- **Status displays**: Show rotating status information

## When to Invoke

Invoke this skill when:

- User needs horizontally scrolling content
- User wants to create a ticker-style display
- User needs auto-filling scrollable content
- User wants to animate content across the screen
- User asks about marquee or scrolling text effects

## Features

- **Smooth Animation**: CSS-based smooth scrolling animation
- **Auto-fill**: Automatically fill container with repeated content
- **Speed Control**: Configure scrolling speed in pixels per second
- **Flexible Content**: Support for any content type (text, images, components)
- **No JavaScript Animation**: Pure CSS animation for better performance

## API Reference

### Marquee Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| auto-fill | `boolean` | `false` | Whether to fill the blank of the container using its content repeatedly. | 2.40.2 |
| speed | `number` | `48` | The speed calculated as pixels/second. | 2.40.2 |

### Marquee Slots

| Name    | Parameters | Description             | Version |
| ------- | ---------- | ----------------------- | ------- |
| default | `()`       | Content to be scrolled. | 2.40.2  |

## Basic Usage

### Basic Text Marquee

```vue
<template>
  <n-marquee>
    <div style="margin-right: 64px">
      In 2020 Noel returned to the legendary Rockfield Studios in Wales for the
      first time since the band recorded the album, looking back at his memories
      and reflecting on the album's legacy.
    </div>
  </n-marquee>
</template>
```

### Image Marquee

```vue
<template>
  <n-marquee>
    <n-image
      width="80"
      height="80"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      style="margin-right: 24px"
    />
  </n-marquee>
</template>
```

### Auto-fill Marquee

```vue
<template>
  <n-marquee auto-fill>
    <n-image
      width="80"
      height="80"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      style="margin-right: 24px"
    />
  </n-marquee>
</template>
```

### Custom Speed

```vue
<template>
  <n-space vertical>
    <n-marquee :speed="24">
      <span style="margin-right: 64px">Slow scrolling text...</span>
    </n-marquee>
    <n-marquee :speed="96">
      <span style="margin-right: 64px">Fast scrolling text...</span>
    </n-marquee>
  </n-space>
</template>
```

## Common Patterns

### News Ticker

```vue
<template>
  <n-card title="Latest News">
    <n-marquee>
      <n-space :size="64">
        <span>🔴 Breaking: Major update released!</span>
        <span>📢 Notice: System maintenance scheduled</span>
        <span>🎉 Event: Annual conference next week</span>
      </n-space>
    </n-marquee>
  </n-card>
</template>
```

### Logo Carousel

```vue
<template>
  <div class="logo-carousel">
    <n-marquee auto-fill :speed="30">
      <n-space :size="24">
        <n-image
          v-for="logo in logos"
          :key="logo.id"
          width="100"
          height="50"
          :src="logo.url"
          object-fit="contain"
        />
      </n-space>
    </n-marquee>
  </div>
</template>

<script setup>
const logos = [
  { id: 1, url: '/logos/partner1.png' },
  { id: 2, url: '/logos/partner2.png' },
  { id: 3, url: '/logos/partner3.png' },
  { id: 4, url: '/logos/partner4.png' },
];
</script>

<style scoped>
.logo-carousel {
  background: #f5f5f5;
  padding: 20px 0;
}
</style>
```

### Promotional Banner

```vue
<template>
  <div class="promo-banner">
    <n-marquee :speed="60">
      <n-space :size="48">
        <n-tag type="success" size="large">
          🎁 Free shipping on orders over $50
        </n-tag>
        <n-tag type="warning" size="large">
          ⚡ Flash sale: 50% off today only
        </n-tag>
        <n-tag type="info" size="large"> 📦 Same-day delivery available </n-tag>
      </n-space>
    </n-marquee>
  </div>
</template>

<style scoped>
.promo-banner {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  padding: 12px 0;
}
</style>
```

### Status Display

```vue
<template>
  <n-card size="small">
    <n-marquee :speed="40">
      <n-space :size="32">
        <n-badge dot :type="serverStatus.type">
          Server: {{ serverStatus.text }}
        </n-badge>
        <n-badge dot type="success"> Database: Online </n-badge>
        <n-badge dot type="success"> API: Healthy </n-badge>
        <n-badge dot type="warning"> Queue: 23 pending </n-badge>
      </n-space>
    </n-marquee>
  </n-card>
</template>

<script setup>
import { computed } from 'vue';

const serverStatus = computed(() => ({
  type: 'success',
  text: 'Online',
}));
</script>
```

### Product Showcase

```vue
<template>
  <div class="product-showcase">
    <n-marquee auto-fill :speed="35">
      <n-space :size="16">
        <n-card
          v-for="product in products"
          :key="product.id"
          size="small"
          style="width: 200px"
        >
          <n-image :src="product.image" height="120" object-fit="cover" />
          <div class="product-name">{{ product.name }}</div>
          <div class="product-price">${{ product.price }}</div>
        </n-card>
      </n-space>
    </n-marquee>
  </div>
</template>

<script setup>
const products = [
  { id: 1, name: 'Product A', price: 29.99, image: '/product1.jpg' },
  { id: 2, name: 'Product B', price: 49.99, image: '/product2.jpg' },
  { id: 3, name: 'Product C', price: 19.99, image: '/product3.jpg' },
];
</script>

<style scoped>
.product-showcase {
  padding: 20px 0;
  overflow: hidden;
}

.product-name {
  font-weight: 500;
  margin-top: 8px;
}

.product-price {
  color: #18a058;
  font-weight: 600;
}
</style>
```

### Announcement Bar

```vue
<template>
  <div class="announcement-bar">
    <n-marquee>
      <n-text strong>
        📢 Important: We've updated our privacy policy.
        <n-a href="/privacy">Learn more</n-a>
        &nbsp;&nbsp;&nbsp;&nbsp; 🔥 New feature: Dark mode is now available!
        &nbsp;&nbsp;&nbsp;&nbsp; 🎉 Join our community: 10,000+ members and
        growing!
      </n-text>
    </n-marquee>
  </div>
</template>

<style scoped>
.announcement-bar {
  background: #f0f0f0;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
}
</style>
```

### Testimonial Carousel

```vue
<template>
  <div class="testimonials">
    <n-marquee :speed="25">
      <n-space :size="32">
        <n-card
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          size="small"
          style="width: 300px"
        >
          <n-ellipsis :line-clamp="3"> "{{ testimonial.text }}" </n-ellipsis>
          <n-divider />
          <n-space align="center">
            <n-avatar :src="testimonial.avatar" round />
            <div>
              <div>{{ testimonial.name }}</div>
              <n-text depth="3">{{ testimonial.role }}</n-text>
            </div>
          </n-space>
        </n-card>
      </n-space>
    </n-marquee>
  </div>
</template>

<script setup>
const testimonials = [
  {
    id: 1,
    text: 'Great product! Highly recommended.',
    name: 'John Doe',
    role: 'Developer',
    avatar: '/avatar1.jpg',
  },
  {
    id: 2,
    text: 'Amazing customer support.',
    name: 'Jane Smith',
    role: 'Designer',
    avatar: '/avatar2.jpg',
  },
];
</script>

<style scoped>
.testimonials {
  padding: 24px 0;
  background: #fafafa;
}
</style>
```

### Multiple Items with Icons

```vue
<template>
  <n-marquee auto-fill>
    <n-space :size="48">
      <n-space align="center">
        <n-icon size="20" color="#18a058">
          <CheckmarkCircle />
        </n-icon>
        <span>Free Shipping</span>
      </n-space>
      <n-space align="center">
        <n-icon size="20" color="#2080f0">
          <ShieldCheckmark />
        </n-icon>
        <span>Secure Payment</span>
      </n-space>
      <n-space align="center">
        <n-icon size="20" color="#f0a020">
          <Refresh />
        </n-icon>
        <span>Easy Returns</span>
      </n-space>
      <n-space align="center">
        <n-icon size="20" color="#d03050">
          <Heart />
        </n-icon>
        <span>Quality Guarantee</span>
      </n-space>
    </n-space>
  </n-marquee>
</template>

<script setup>
import {
  CheckmarkCircle,
  ShieldCheckmark,
  Refresh,
  Heart,
} from '@vicons/ionicons5';
</script>
```

## Best Practices

1. **Use auto-fill for seamless loops**: Ensure continuous scrolling

   ```vue
   <n-marquee auto-fill>
     <span>Content that repeats...</span>
   </n-marquee>
   ```

2. **Add spacing between items**: Prevent content from touching

   ```vue
   <n-marquee>
     <span style="margin-right: 64px">Item 1</span>
   </n-marquee>
   ```

3. **Adjust speed based on content**: Slower for text, faster for images

   ```vue
   <n-marquee :speed="30"> <!-- Slower for reading -->
   <n-marquee :speed="80"> <!-- Faster for visual content -->
   ```

4. **Use with n-space for multiple items**: Consistent spacing

   ```vue
   <n-marquee>
     <n-space :size="32">
       <span>Item 1</span>
       <span>Item 2</span>
     </n-space>
   </n-marquee>
   ```

5. **Consider accessibility**: Provide alternative static content

   ```vue
   <div>
     <n-marquee aria-hidden="true">
       <span>Scrolling content</span>
     </n-marquee>
     <div class="sr-only">Static alternative content</div>
   </div>
   ```

6. **Limit content width for readability**: Don't make items too wide

   ```vue
   <n-marquee>
     <n-card style="max-width: 300px">...</n-card>
   </n-marquee>
   ```

7. **Use appropriate speed for context**: Match user expectations

   ```vue
   <!-- Important alerts: slower -->
   <n-marquee :speed="20">
     <n-text type="warning">Important notice...</n-text>
   </n-marquee>

   <!-- Background decoration: faster -->
   <n-marquee :speed="100">
     <n-image src="decoration.png" />
   </n-marquee>
   ```
