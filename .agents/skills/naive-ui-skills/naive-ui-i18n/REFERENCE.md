---
name: naive-ui-i18n
description: Configure internationalization (i18n) in Naive UI with support for multiple languages and custom locales
metadata:
  author: jiaiyan
  version: 1.0.0
---

# Naive UI Internationalization (i18n)

Configure internationalization in Naive UI to support multiple languages and customize component locales.

## When to Use

Use this skill when you need to:

- Set up multi-language support in your application
- Change the language of Naive UI components
- Customize existing locale strings
- Add support for new languages

## Prerequisites

- Basic understanding of Naive UI setup
- Vue 3 Composition API knowledge
- Understanding of internationalization concepts

## Basic Usage

### Setting Up Locale

Use `n-config-provider` to set the locale for all descendant components:

```vue
<template>
  <n-config-provider :locale="enUS" :date-locale="dateEnUS">
    <App />
  </n-config-provider>
</template>

<script setup>
import { NConfigProvider } from 'naive-ui';
import { enUS, dateEnUS } from 'naive-ui';
</script>
```

### Switching Languages Dynamically

```vue
<template>
  <n-config-provider :locale="locale" :date-locale="dateLocale">
    <n-space vertical>
      <n-select
        v-model:value="currentLang"
        :options="langOptions"
        @update:value="handleLangChange"
      />
      <n-date-picker type="date" />
      <n-pagination :page-count="10" />
    </n-space>
  </n-config-provider>
</template>

<script setup>
import { ref } from 'vue';
import { enUS, dateEnUS, zhCN, dateZhCN } from 'naive-ui';

const currentLang = ref('en');
const locale = ref(enUS);
const dateLocale = ref(dateEnUS);

const langOptions = [
  { label: 'English', value: 'en' },
  { label: '中文', value: 'zh' },
];

const handleLangChange = lang => {
  if (lang === 'en') {
    locale.value = enUS;
    dateLocale.value = dateEnUS;
  } else if (lang === 'zh') {
    locale.value = zhCN;
    dateLocale.value = dateZhCN;
  }
};
</script>
```

## Supported Languages

Naive UI supports the following languages (PRs are welcome for new languages):

| Language                   | Config | Date Config | Version |
| -------------------------- | ------ | ----------- | ------- |
| Arabic (العربية)           | `arDZ` | `dateArDZ`  | 2.34.0  |
| Azerbaijani (Azərbaycanca) | `azAZ` | `dateAzAZ`  | 2.39.0  |
| Czech (Czechia)            | `csCZ` | `dateCsCz`  | 2.38.2  |
| Danish (Denmark)           | `daDK` | `dateDaDK`  | 2.43.0  |
| German (Germany)           | `deDE` | `dateDeDE`  | -       |
| English (British)          | `enGB` | `dateEnGB`  | 2.25.1  |
| English                    | `enUS` | `dateEnUS`  | -       |
| Esperanto                  | `eo`   | `dateEo`    | 2.25.2  |
| Spanish (Argentina)        | `esAR` | `dateEsAR`  | 2.24.2  |
| Estonian                   | `etEE` | `dateEtEE`  | 2.38.0  |
| Persian                    | `faIR` | `dateFaIR`  | 2.34.4  |
| French                     | `frFR` | `dateFrFR`  | -       |
| Bahasa Indonesia           | `idID` | `dateIdID`  | -       |
| Italiano                   | `itIT` | `dateItIT`  | 2.24.2  |
| Japanese                   | `jaJP` | `dateJaJP`  | -       |
| Khmer (Cambodia)           | `kmKH` | `dateKmKH`  | 2.41.0  |
| Korean (South Korea)       | `koKR` | `dateKoKR`  | 2.28.1  |
| Norwegian Bokmål (Norway)  | `nbNO` | `dateNbNO`  | -       |
| Dutch (Netherlands)        | `nlNL` | `dateNlNL`  | 2.29.0  |
| Polish (Poland)            | `plPL` | `datePlPL`  | 2.25.2  |
| Portuguese (Brazil)        | `ptBR` | `datePtBR`  | 2.28.1  |
| Russian                    | `ruRU` | `dateRuRU`  | -       |
| Slovak                     | `skSK` | `dateSkSK`  | 2.25.3  |
| Swedish                    | `svSE` | `dateSvSE`  | 2.35.0  |
| Thai (Thailand)            | `thTH` | `dateThTH`  | 2.27.0  |
| Turkish                    | `trTR` | `dateTrTR`  | 2.34.0  |
| Uyghur (China)             | `ugCN` | `dateUgCN`  | -       |
| Ukrainian                  | `ukUA` | `dateUkUA`  | -       |
| Uzbek (Uzbekistan)         | `uzUZ` | `dateUzUZ`  | 2.39.0  |
| Vietnamese (Vietnam)       | `viVN` | `dateViVN`  | 2.30.7  |
| Chinese (Simplified)       | `zhCN` | `dateZhCN`  | -       |
| Chinese (Traditional)      | `zhTW` | `dateZhTW`  | -       |

## Customizing Locales

### Using createLocale

Customize existing locale strings using `createLocale`:

```vue
<template>
  <n-config-provider :locale="customLocale" :date-locale="dateEnUS">
    <n-input placeholder="This should show 'Okay'" />
  </n-config-provider>
</template>

<script setup>
import { NConfigProvider, createLocale, enUS, dateEnUS } from 'naive-ui';

const customLocale = createLocale(
  {
    Input: {
      placeholder: 'Okay',
    },
  },
  enUS,
);
</script>
```

### Full Locale Customization Example

```vue
<template>
  <n-config-provider :locale="customLocale">
    <n-space vertical>
      <n-input :placeholder="customLocale.Input.placeholder" />
      <n-empty :description="customLocale.Empty.description" />
      <n-pagination :page-count="5" />
    </n-space>
  </n-config-provider>
</template>

<script setup>
import { createLocale, enUS } from 'naive-ui';

const customLocale = createLocale(
  {
    Input: {
      placeholder: 'Enter text here...',
    },
    Empty: {
      description: 'No data available',
    },
    Pagination: {
      goto: 'Go to',
      pagesize: '/page',
      total: 'Total {count} items',
      pageSeparator: 'of',
      page: 'Page',
      prev: 'Previous',
      next: 'Next',
      prevPage: 'Previous page',
      nextPage: 'Next page',
      prev: 'Prev',
      next: 'Next',
    },
  },
  enUS,
);
</script>
```

## API Reference

### n-config-provider Locale Props

| Property      | Type     | Default    | Description                         |
| ------------- | -------- | ---------- | ----------------------------------- |
| `locale`      | `object` | `enUS`     | Locale configuration for components |
| `date-locale` | `object` | `dateEnUS` | Date format locale configuration    |

### createLocale Function

```typescript
function createLocale(overrides: PartialLocale, baseLocale: Locale): Locale;
```

Creates a new locale by merging custom overrides with a base locale.

## Common Patterns

### Persistent Language Selection

```vue
<template>
  <n-config-provider :locale="locale" :date-locale="dateLocale">
    <n-select
      v-model:value="currentLang"
      :options="langOptions"
      style="width: 200px; margin-bottom: 20px;"
    />
    <router-view />
  </n-config-provider>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { enUS, dateEnUS, zhCN, dateZhCN, jaJP, dateJaJP } from 'naive-ui';

const langMap = {
  en: { locale: enUS, dateLocale: dateEnUS },
  zh: { locale: zhCN, dateLocale: dateZhCN },
  ja: { locale: jaJP, dateLocale: dateJaJP },
};

const currentLang = ref('en');
const locale = ref(enUS);
const dateLocale = ref(dateEnUS);

const langOptions = [
  { label: 'English', value: 'en' },
  { label: '中文', value: 'zh' },
  { label: '日本語', value: 'ja' },
];

watch(currentLang, newLang => {
  const config = langMap[newLang];
  if (config) {
    locale.value = config.locale;
    dateLocale.value = config.dateLocale;
    localStorage.setItem('app-language', newLang);
  }
});

onMounted(() => {
  const savedLang = localStorage.getItem('app-language') || 'en';
  currentLang.value = savedLang;
});
</script>
```

### Integration with vue-i18n

```vue
<template>
  <n-config-provider :locale="naiveLocale" :date-locale="naiveDateLocale">
    <App />
  </n-config-provider>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { enUS, dateEnUS, zhCN, dateZhCN } from 'naive-ui';

const { locale } = useI18n();

const naiveLocale = computed(() => {
  return locale.value === 'zh' ? zhCN : enUS;
});

const naiveDateLocale = computed(() => {
  return locale.value === 'zh' ? dateZhCN : dateEnUS;
});
</script>
```

## Best Practices

1. **Persist Language Preference**: Store the user's language choice in localStorage
2. **Separate Date Locale**: Always set both `locale` and `date-locale` for consistent formatting
3. **Use Base Locale**: When customizing, always extend from an existing locale using `createLocale`
4. **Test All Languages**: Verify your application works correctly with all supported languages
5. **Consider RTL**: Some languages (Arabic, Persian) require right-to-left layout support
6. **Sync with App i18n**: Keep Naive UI locale in sync with your application's i18n system

## Component-Specific Locale Keys

Different components have their own locale keys that can be customized:

```javascript
const customLocale = createLocale(
  {
    // Button
    Button: {
      loadingText: 'Loading...',
    },
    // Input
    Input: {
      placeholder: 'Please input',
      clear: 'Clear',
    },
    // DatePicker
    DatePicker: {
      placeholder: 'Select date',
      clear: 'Clear',
      confirm: 'OK',
      now: 'Now',
    },
    // Table
    DataTable: {
      check: 'Check',
      clear: 'Clear',
      clearFilters: 'Clear filters',
      clearSorter: 'Clear sorter',
    },
    // Transfer
    Transfer: {
      source: 'Source',
      target: 'Target',
      searchPlaceholder: 'Search',
      clear: 'Clear',
    },
    // Upload
    Upload: {
      draggerClick: 'Click to upload',
      draggerDrag: 'Drag files here',
      fileDrag: 'Drag files here',
      accept: 'Accept: {accept}',
      upload: 'Upload',
      retry: 'Retry',
      remove: 'Remove',
      cancel: 'Cancel',
    },
  },
  enUS,
);
```
