---
name: 'n-carousel'
description: 'Carousel component for displaying rotating content like images, banners, or cards. Invoke when user needs to implement image sliders, content carousels, or card-based navigation in Naive UI.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Carousel Component

Carousel component for displaying rotating content with various transition effects and navigation options.

## When to Use

Use this component when:

- **Image galleries**: Display rotating images or banners
- **Content sliders**: Show featured content or promotions
- **Card carousels**: Navigate through card-based content
- **Product showcases**: Display products in an interactive slider

## When to Invoke

Invoke this skill when:

- User needs to implement an image slider or carousel
- User wants autoplay or manual navigation features
- User needs vertical or horizontal carousel layouts
- User wants to customize transition effects (slide, fade, card)
- User asks about carousel dots, arrows, or keyboard navigation
- User needs multiple slides per view or centered slides

## Features

- **Direction**: Horizontal or vertical layout
- **Autoplay**: Automatic rotation with configurable interval
- **Navigation**: Dots, arrows, keyboard, mousewheel, touch/drag
- **Effects**: Slide, fade, card, or custom transitions
- **Multiple Slides**: Configurable slides per view with spacing
- **Loop**: Continuous looping through slides
- **Centered Slides**: Center the active slide
- **Customizable**: Custom dots, arrows, and transition styles

## API Reference

### Carousel Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| autoplay | `boolean` | `false` | Whether to scroll automatically. |
| centered-slides | `boolean` | `false` | Whether to center the current view carousel. |
| current-index | `number` | `undefined` | Current index (controlled). |
| default-index | `number` | `0` | Default index. |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | Carousel shows the direction. |
| dot-placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Dot placement in the panel. |
| dot-type | `'dot' \| 'line'` | `'dot'` | Dot style. |
| draggable | `boolean` | `false` | Whether to switch by dragging the mouse. |
| effect | `'slide' \| 'fade' \| 'card' \| 'custom'` | `'slide'` | Transition effect. |
| interval | `number` | `5000` | Auto play interval (ms). |
| keyboard | `boolean` | `false` | Whether to switch by keyboard (focus on Dots). |
| loop | `boolean` | `true` | Whether to loop. |
| mousewheel | `boolean` | `false` | Whether to switch through mouse wheel. |
| next-slide-style | `object \| string` | `undefined` | Next slide's style (for card effect). |
| prev-slide-style | `object \| string` | `undefined` | Previous slide's style (for card effect). |
| show-arrow | `boolean` | `false` | Whether to show arrow buttons. |
| show-dots | `boolean` | `true` | Whether to show dots. |
| slides-per-view | `'auto' \| number` | `1` | Number of carousels displayed per view. |
| space-between | `number` | `0` | The spacing between carousels. |
| touchable | `boolean` | `true` | Whether to switch by touch. |
| transition-style | `object` | `{ transitionDuration: '300ms' }` | Transition style. |
| transition-props | `TransitionProps` | `undefined` | Custom transition effect properties. |
| trigger | `'click' \| 'hover'` | `'click'` | The method of manual switching. |
| on-update:current-index | `(currentIndex: number, lastIndex: number) => void` | `undefined` | Callback when index changes. |

### Carousel Slots

| Name    | Parameters                                | Description       |
| ------- | ----------------------------------------- | ----------------- |
| default | `()`                                      | Carousel content. |
| arrow   | `{ total, currentIndex, to, prev, next }` | Custom arrow.     |
| dots    | `{ total, currentIndex, to }`             | Custom dots.      |

### Carousel Methods

| Name            | Type                      | Description             |
| --------------- | ------------------------- | ----------------------- |
| to              | `(index: number) => void` | Slide to index.         |
| prev            | `() => void`              | Slide to previous page. |
| next            | `() => void`              | Slide to next page.     |
| getCurrentIndex | `() => number`            | Get current index.      |

## Basic Usage

### Basic Carousel

```vue
<template>
  <n-carousel>
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
    />
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
    />
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
    />
  </n-carousel>
</template>

<style scoped>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
</style>
```

### Autoplay with Arrows

```vue
<template>
  <n-carousel show-arrow autoplay>
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
    />
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
    />
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
    />
  </n-carousel>
</template>
```

### Vertical Carousel

```vue
<template>
  <n-carousel
    direction="vertical"
    dot-placement="right"
    style="width: 100%; height: 240px"
  >
    <img class="carousel-img" src="image1.jpeg" />
    <img class="carousel-img" src="image2.jpeg" />
    <img class="carousel-img" src="image3.jpeg" />
  </n-carousel>
</template>
```

## Common Patterns

### Multiple Slides Per View

```vue
<template>
  <n-carousel :slides-per-view="3" :space-between="20" :loop="false" draggable>
    <img class="carousel-img" src="image1.jpeg" />
    <img class="carousel-img" src="image2.jpeg" />
    <img class="carousel-img" src="image3.jpeg" />
    <img class="carousel-img" src="image4.jpeg" />
  </n-carousel>
</template>
```

### Card Effect

```vue
<template>
  <n-carousel
    effect="card"
    prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
    next-slide-style="transform: translateX(50%) translateZ(-800px);"
    style="height: 240px"
    :show-dots="false"
  >
    <n-carousel-item :style="{ width: '60%' }">
      <img class="carousel-img" src="image1.jpeg" />
    </n-carousel-item>
    <n-carousel-item :style="{ width: '60%' }">
      <img class="carousel-img" src="image2.jpeg" />
    </n-carousel-item>
    <n-carousel-item :style="{ width: '60%' }">
      <img class="carousel-img" src="image3.jpeg" />
    </n-carousel-item>
  </n-carousel>
</template>
```

### Custom Dots and Arrows

```vue
<template>
  <n-carousel show-arrow autoplay>
    <img class="carousel-img" src="image1.jpeg" />
    <img class="carousel-img" src="image2.jpeg" />
    <img class="carousel-img" src="image3.jpeg" />

    <template #arrow="{ prev, next }">
      <div class="custom-arrow">
        <button type="button" class="custom-arrow--left" @click="prev">
          <n-icon><ArrowBack /></n-icon>
        </button>
        <button type="button" class="custom-arrow--right" @click="next">
          <n-icon><ArrowForward /></n-icon>
        </button>
      </div>
    </template>

    <template #dots="{ total, currentIndex }">
      <span class="custom-dots"> {{ currentIndex + 1 }} / {{ total }} </span>
    </template>
  </n-carousel>
</template>
```

### Custom Transition Effect

```vue
<template>
  <n-carousel
    effect="custom"
    :transition-props="{ name: 'creative' }"
    show-arrow
    style="width: 100%; height: 240px"
  >
    <img class="carousel-img" src="image1.jpeg" />
    <img class="carousel-img" src="image2.jpeg" />
    <img class="carousel-img" src="image3.jpeg" />
  </n-carousel>
</template>

<style scoped>
:deep(.creative-enter-from),
:deep(.creative-leave-to) {
  opacity: 0;
  transform: scale(0.8);
}

:deep(.creative-enter-active),
:deep(.creative-leave-active) {
  transition: all 0.3s ease;
}
</style>
```

### Controlled Carousel

```vue
<template>
  <n-space vertical>
    <n-carousel v-model:current-index="currentIndex" ref="carouselRef">
      <img class="carousel-img" src="image1.jpeg" />
      <img class="carousel-img" src="image2.jpeg" />
      <img class="carousel-img" src="image3.jpeg" />
    </n-carousel>

    <n-space>
      <n-button @click="carouselRef.prev()">Previous</n-button>
      <n-button @click="carouselRef.next()">Next</n-button>
      <n-button @click="carouselRef.to(0)">Go to First</n-button>
    </n-space>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const currentIndex = ref(0);
const carouselRef = ref(null);
</script>
```

## Best Practices

1. **Set explicit height**: Always set a fixed height for the carousel container

   ```vue
   <n-carousel style="height: 240px">
   ```

2. **Use autoplay wisely**: Set appropriate interval for user experience

   ```vue
   <n-carousel autoplay :interval="5000">
   ```

3. **Responsive images**: Use `object-fit: cover` for consistent image display

   ```css
   .carousel-img {
     width: 100%;
     height: 100%;
     object-fit: cover;
   }
   ```

4. **Disable loop with multiple slides**: When using `slides-per-view`, disable loop

   ```vue
   <n-carousel :slides-per-view="3" :loop="false">
   ```

5. **Keyboard accessibility**: Enable keyboard navigation for accessibility

   ```vue
   <n-carousel keyboard>
   ```

6. **Touch and drag**: Enable for mobile-friendly interaction

   ```vue
   <n-carousel touchable draggable>
   ```

7. **Custom navigation**: Use slots for branded navigation controls
