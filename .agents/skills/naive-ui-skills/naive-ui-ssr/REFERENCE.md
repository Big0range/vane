---
name: 'naive-ui-ssr'
description: 'Server-Side Rendering configuration and best practices for Naive UI. Invoke when user needs to implement SSR with Naive UI in Nuxt.js, Vitepress, Vite SSG/SSE, or Webpack environments.'
metadata:
  author: jiaiyan
  version: '1.0.0'
---

# Naive UI Server-Side Rendering (SSR)

Naive UI uses CSS-in-JS, which requires additional configuration when using Server-Side Rendering (SSR). This skill provides guidance for setting up SSR across different frameworks and build tools.

## When to Use

Use this skill when:

- **Nuxt.js integration**: Setting up Naive UI in a Nuxt.js application
- **Vitepress integration**: Using Naive UI components in Vitepress documentation
- **Vite SSG/SSE**: Implementing static site generation or server-side rendering with Vite
- **Webpack SSR**: Configuring SSR with Webpack-based setups
- **SSR optimization**: Reducing SSR-rendered HTML size
- **Troubleshooting SSR issues**: Resolving common SSR-related problems

## When to Invoke

Invoke this skill when:

- User asks about SSR setup with Naive UI
- User encounters SSR build failures or hydration issues
- User wants to optimize SSR performance
- User needs to configure Naive UI for Nuxt.js, Vitepress, or Vite SSR
- User sees CSS-related errors during SSR builds

## Prerequisites

### Critical Requirements

Before implementing SSR with Naive UI, ensure the following conditions are met:

1. **css-render version**: All direct and indirect references to `@css-render/*` and `css-render` packages must be version `>=0.15.14`

2. **Single package resolution**: Each `@css-render/*` and `css-render` package should resolve to a single target (no duplicate versions or copies)

### Verifying Requirements

Check your lock file for duplicate `css-render` packages:

```bash
# For npm
npm ls css-render

# For pnpm
pnpm ls css-render

# For yarn
yarn why css-render
```

### Resolving Duplicate Packages

If you find duplicate packages, use the `resolution` field in `package.json`:

```json
{
  "resolutions": {
    "css-render": "^0.15.14",
    "@css-render/vue3-ssr": "^0.15.14"
  }
}
```

For pnpm, use `pnpm.overrides`:

```json
{
  "pnpm": {
    "overrides": {
      "css-render": "^0.15.14",
      "@css-render/vue3-ssr": "^0.15.14"
    }
  }
}
```

## Basic Usage

### Nuxt.js Integration

For Nuxt.js applications, refer to the dedicated Nuxt.js documentation:

```bash
# See Nuxt.js specific guide
# Path: docs/nuxtjs.md
```

### Vitepress Integration

For Vitepress documentation sites:

```bash
# See Vitepress specific guide
# Path: docs/vitepress.md
```

### Vite SSG/SSE

For Vite-based static site generation:

```bash
# See Vite SSG/SSE specific guide
# Path: docs/vite-ssge.md
```

### Webpack SSR Example

Reference implementation available at:

- GitHub: [naive-ui-vite-ssr](https://github.com/07akioni/naive-ui-vite-ssr)
- Playground: [naive-ui/playground/ssr](https://github.com/tusen-ai/naive-ui/tree/main/playground/ssr)

## API Reference

### Inline Theme Optimization

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| inline-theme-disabled | `boolean` | `false` | Disable inline theme styles on components to reduce SSR HTML size |

### Usage with n-config-provider

```vue
<template>
  <n-config-provider inline-theme-disabled>
    <n-button>Optimized for SSR</n-button>
  </n-config-provider>
</template>
```

## Common Patterns

### SSR-Optimized Configuration

```vue
<template>
  <n-config-provider inline-theme-disabled :theme="theme">
    <n-global-style />
    <router-view />
  </n-config-provider>
</template>

<script setup>
import { ref } from 'vue';
import { darkTheme } from 'naive-ui';

const theme = ref(null);
</script>
```

### Nuxt.js Plugin Setup

```ts
// plugins/naive-ui.ts
import { setup } from '@css-render/vue3-ssr';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(nuxtApp => {
  if (process.server) {
    const { collect } = setup(nuxtApp.vueApp);
    const originalRenderMeta = nuxtApp.ssrContext?.renderMeta;

    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    nuxtApp.ssrContext.renderMeta = () => {
      if (!originalRenderMeta) {
        return {
          headTags: collect(),
        };
      }
      const originalMeta = originalRenderMeta();
      if (originalMeta && typeof originalMeta === 'object') {
        return {
          ...originalMeta,
          headTags: `${originalMeta.headTags || ''}${collect()}`,
        };
      }
      return originalMeta;
    };
  }
});
```

### Vite SSR Entry Setup

```ts
// server-entry.ts
import { createSSRApp } from 'vue';
import { setup } from '@css-render/vue3-ssr';
import App from './App.vue';

export function createApp() {
  const app = createSSRApp(App);

  if (import.meta.env.SSR) {
    setup(app);
  }

  return { app };
}
```

### Collecting CSS in Vite SSR

```ts
// server.ts
import { renderToString } from 'vue/server-renderer';
import { createApp } from './server-entry';

async function render(url: string) {
  const { app } = createApp();

  const ctx: { modules?: string[] } = {};
  const html = await renderToString(app, ctx);

  // CSS will be collected automatically by css-render
  return html;
}
```

## Known Issues

The following components have known issues in SSR environments. Avoid using them if possible:

| Component        | Issue                | Status                 |
| ---------------- | -------------------- | ---------------------- |
| `n-scrollbar`    | SSR rendering issues | Fixed in Vue >= 3.2.36 |
| `n-data-table`   | SSR rendering issues | Fixed in Vue >= 3.2.36 |
| `n-anchor`       | SSR rendering issues | Pending fix            |
| `n-avatar-group` | SSR rendering issues | Pending fix            |
| `n-watermark`    | SSR rendering issues | Pending fix            |
| `n-affix`        | SSR rendering issues | Pending fix            |
| `n-transfer`     | SSR rendering issues | Pending fix            |

### Workaround for Known Issues

```vue
<template>
  <ClientOnly>
    <n-scrollbar>
      <n-data-table :data="data" />
    </n-scrollbar>
  </ClientOnly>
</template>

<script setup>
import { ClientOnly } from '#components';

const data = ref([]);
</script>
```

## Best Practices

1. **Verify css-render versions**: Always check that all css-render packages are >= 0.15.14 and deduplicated

   ```bash
   npm ls css-render
   ```

2. **Use inline-theme-disabled**: Enable this option to reduce SSR HTML size

   ```vue
   <n-config-provider inline-theme-disabled>
     <App />
   </n-config-provider>
   ```

3. **Wrap problematic components**: Use `ClientOnly` wrapper for components with known SSR issues

   ```vue
   <ClientOnly>
     <n-watermark content="Draft" />
   </ClientOnly>
   ```

4. **Check Vue version**: Ensure Vue >= 3.2.36 for `n-scrollbar` and `n-data-table` SSR support

5. **Test hydration**: Verify that client-side hydration works correctly

   ```js
   // Check for hydration mismatches in console
   ```

6. **Use resolutions field**: Prevent duplicate css-render packages

   ```json
   {
     "resolutions": {
       "css-render": "^0.15.14"
     }
   }
   ```

7. **Follow framework-specific guides**: Use the appropriate guide for your framework
   - Nuxt.js: See nuxtjs documentation
   - Vitepress: See vitepress documentation
   - Vite SSG/SSE: See vite-ssge documentation

8. **Reference examples**: Check official examples for implementation patterns
   - Vite SSR: [naive-ui-vite-ssr](https://github.com/07akioni/naive-ui-vite-ssr)
   - Webpack SSR: [playground/ssr](https://github.com/tusen-ai/naive-ui/tree/main/playground/ssr)

## Troubleshooting

### Common Error: CSS Not Applied

**Problem**: Styles are missing after SSR hydration

**Solution**: Ensure css-render is properly configured for SSR

```ts
import { setup } from '@css-render/vue3-ssr';

if (import.meta.env.SSR) {
  setup(app);
}
```

### Common Error: Hydration Mismatch

**Problem**: Vue hydration mismatch warnings in console

**Solution**:

1. Check for browser-only APIs in setup code
2. Wrap problematic components in `ClientOnly`
3. Ensure data is consistent between server and client

### Common Error: Duplicate css-render Packages

**Problem**: Build fails or styles break due to multiple css-render versions

**Solution**: Add resolutions to package.json

```json
{
  "resolutions": {
    "css-render": "^0.15.14",
    "@css-render/vue3-ssr": "^0.15.14"
  }
}
```

## Related Skills

- [n-config-provider](../components/n-config-provider/SKILL.md): Global configuration for SSR optimization
- [naive-ui-theming](../naive-ui-theming/SKILL.md): Theme customization in SSR
- [naive-ui-dark-mode](../naive-ui-dark-mode/SKILL.md): Dark mode with SSR considerations
