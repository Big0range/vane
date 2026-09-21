---
name: n-checkbox
description: A checkbox component for binary and multiple selections with support for groups, indeterminate state, custom values, and grid layouts
author: jiaiyan
version: 1.0.0
---

# n-checkbox Component

The `n-checkbox` component is used for binary selections and multiple selections within groups. It supports indeterminate states, custom checked/unchecked values, and integrates well with grid layouts for complex form scenarios.

## When to Use

Use `n-checkbox` when you need to:

- Allow users to select one or more options from a list
- Create binary toggle controls (yes/no, on/off)
- Implement "select all" functionality with indeterminate state
- Build grid-based selection interfaces
- Collect multiple values in forms
- Create controlled checkbox states

## Basic Usage

### Basic Checkbox

```vue
<template>
  <n-checkbox v-model:checked="checked"> Checkbox Label </n-checkbox>
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(false);
</script>
```

### Checkbox Group

```vue
<template>
  <n-checkbox-group v-model:value="cities">
    <n-space item-style="display: flex;">
      <n-checkbox value="Beijing" label="Beijing" />
      <n-checkbox value="Shanghai" label="Shanghai" />
      <n-checkbox value="Guangzhou" label="Guangzhou" />
      <n-checkbox value="Shenzhen" label="Shenzhen" />
    </n-space>
  </n-checkbox-group>
</template>

<script setup>
import { ref } from 'vue';

const cities = ref(['Beijing']);
</script>
```

### Different Sizes

```vue
<template>
  <n-space item-style="display: flex;" align="center">
    <n-checkbox size="small" label="Small" />
    <n-checkbox size="medium" label="Medium" />
    <n-checkbox size="large" label="Large" />
  </n-space>
</template>
```

## API Reference

### Checkbox Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` / `v-model:checked` | `boolean` | `false` | Whether the checkbox is checked. |
| `checked-value` | `string \| boolean \| number` | `true` | Value of checked state. |
| `default-checked` | `boolean` | `false` | Whether the checkbox is checked by default. |
| `disabled` | `boolean` | `false` | Whether the checkbox is disabled. |
| `focusable` | `boolean` | `true` | Whether the checkbox gains focus after being checked. |
| `indeterminate` | `boolean` | `false` | Whether the checkbox has indeterminate state. |
| `label` | `string` | `undefined` | Checkbox label. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | The size of the checkbox. |
| `unchecked-value` | `string \| boolean \| number` | `false` | Value of unchecked state. |
| `value` | `string \| number` | `undefined` | The value used in a checkbox group. |

### CheckboxGroup Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` / `v-model:value` | `Array<string \| number> \| null` | `undefined` | Selected values of the group. |
| `default-value` | `Array<string \| number>` | `null` | Default selected values. |
| `disabled` | `boolean` | `false` | Whether the group is disabled. |
| `max` | `number` | `undefined` | Maximum number of checkboxes that can be checked. |
| `min` | `number` | `undefined` | Minimum number of checkboxes that can be checked. |

### Events

#### Checkbox Events

| Name | Parameters | Description |
| --- | --- | --- |
| `update:checked` | `(checked: boolean)` | Triggered when checked state changes. |

#### CheckboxGroup Events

| Name | Parameters | Description |
| --- | --- | --- |
| `update:value` | `(value: (string \| number)[], meta: { actionType, value })` | Triggered when value changes. |

### Slots

#### Checkbox Slots

| Name      | Parameters | Description                      |
| --------- | ---------- | -------------------------------- |
| `default` | `()`       | Content of the checkbox (label). |

#### CheckboxGroup Slots

| Name      | Parameters | Description                    |
| --------- | ---------- | ------------------------------ |
| `default` | `()`       | Content of the checkbox group. |

### Methods

| Name    | Type         | Description         |
| ------- | ------------ | ------------------- |
| `focus` | `() => void` | Focus the checkbox. |
| `blur`  | `() => void` | Blur the checkbox.  |

## Common Patterns

### Indeterminate State (Select All)

```vue
<template>
  <n-space item-style="display: flex;" vertical>
    <n-checkbox
      v-model:checked="allChecked"
      :indeterminate="indeterminate"
      @update:checked="handleAllChecked"
    >
      Select All
    </n-checkbox>
    <n-checkbox-group v-model:value="cities">
      <n-space item-style="display: flex;">
        <n-checkbox value="Beijing" label="Beijing" />
        <n-checkbox value="Shanghai" label="Shanghai" />
        <n-checkbox value="Guangzhou" label="Guangzhou" />
        <n-checkbox value="Shenzhen" label="Shenzhen" />
      </n-space>
    </n-checkbox-group>
  </n-space>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const allCities = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen'];
const cities = ref([]);

const allChecked = computed({
  get: () => cities.value.length === allCities.length,
  set: val => {
    cities.value = val ? [...allCities] : [];
  },
});

const indeterminate = computed(() => {
  return cities.value.length > 0 && cities.value.length < allCities.length;
});

const handleAllChecked = checked => {
  cities.value = checked ? [...allCities] : [];
};
</script>
```

### Grid Layout

```vue
<template>
  <n-checkbox-group v-model:value="selected">
    <n-grid :y-gap="8" :cols="2">
      <n-gi>
        <n-checkbox value="option1" label="Option 1" />
      </n-gi>
      <n-gi>
        <n-checkbox value="option2" label="Option 2" />
      </n-gi>
      <n-gi>
        <n-checkbox value="option3" label="Option 3" />
      </n-gi>
      <n-gi>
        <n-checkbox value="option4" label="Option 4" />
      </n-gi>
    </n-grid>
  </n-checkbox-group>
</template>

<script setup>
import { ref } from 'vue';

const selected = ref([]);
</script>
```

### Custom Checked Values

```vue
<template>
  <n-checkbox
    v-model:checked="status"
    checked-value="active"
    unchecked-value="inactive"
  >
    Status: {{ status }}
  </n-checkbox>
</template>

<script setup>
import { ref } from 'vue';

const status = ref('inactive');
</script>
```

### Controlled Checkbox

```vue
<template>
  <n-space align="center" item-style="display: flex;">
    <n-checkbox :checked="checked"> Controlled Checkbox </n-checkbox>
    <n-switch v-model:value="checked" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(false);
</script>
```

### Min/Max Selection Limits

```vue
<template>
  <n-checkbox-group v-model:value="selected" :min="1" :max="3">
    <n-space item-style="display: flex;">
      <n-checkbox value="1" label="Option 1" />
      <n-checkbox value="2" label="Option 2" />
      <n-checkbox value="3" label="Option 3" />
      <n-checkbox value="4" label="Option 4" />
    </n-space>
  </n-checkbox-group>
  <p>Select between 1 and 3 options (currently: {{ selected.length }})</p>
</template>

<script setup>
import { ref } from 'vue';

const selected = ref(['1']);
</script>
```

### Using Methods via Ref

```vue
<template>
  <n-space item-style="display: flex; align-items: center;">
    <n-button @click="handleClick"> Focus then blur in 1 second </n-button>
    <n-checkbox ref="checkboxRef" label="Controlled via ref" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const checkboxRef = ref(null);

const handleClick = () => {
  checkboxRef.value?.focus();
  setTimeout(() => {
    checkboxRef.value?.blur();
  }, 1000);
};
</script>
```

### Event Handling

```vue
<template>
  <n-space item-style="display: flex;" vertical>
    <n-checkbox
      v-model:checked="checked"
      label="Event Demo"
      @update:checked="handleCheckedChange"
    />
    <n-checkbox-group
      v-model:value="selected"
      @update:value="handleGroupChange"
    >
      <n-space item-style="display: flex;">
        <n-checkbox value="A" label="A" />
        <n-checkbox value="B" label="B" />
      </n-space>
    </n-checkbox-group>
  </n-space>
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(false);
const selected = ref([]);

const handleCheckedChange = val => {
  console.log('Checkbox changed:', val);
};

const handleGroupChange = (value, meta) => {
  console.log('Group changed:', value, meta.actionType, meta.value);
};
</script>
```

## Best Practices

1. **Use `v-model:checked` for single checkbox**: For cleaner code when working with a single checkbox.

2. **Use `n-checkbox-group` for multiple related options**: This provides better value management and enables min/max constraints.

3. **Implement indeterminate state for "select all"**: Use the `indeterminate` prop to show partial selection state.

4. **Use custom values for non-boolean data**: When your data model uses specific values instead of boolean, use `checked-value` and `unchecked-value`.

5. **Set `focusable: false` for click-only interactions**: When keyboard focus is not needed, disable focusability.

6. **Use `min` and `max` for validation**: Enforce selection constraints at the group level for better UX.

7. **Leverage grid layouts for complex forms**: Combine with `n-grid` for multi-column checkbox layouts.

8. **Handle events for side effects**: Use `@update:checked` and `@update:value` for triggering actions on selection changes.
