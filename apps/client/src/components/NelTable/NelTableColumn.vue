<script setup lang="ts">
import { inject, useSlots, type Ref, computed } from 'vue';
import { type DataTableColumn } from 'naive-ui';
import _ from 'lodash';
interface Props {
  label?: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  maxWidth?: number | string;
  minWidth?: number | string;
  resizable?: boolean;
  fixed?: 'left' | 'right';
  prop?: string;
  type?: 'selection' | 'expand';
}
const props = defineProps<Props>();
const slots = useSlots();
const columns = inject<Ref<any[]>>('tableColumns')!;
const id = Math.random().toString().substring(2);
const column = computed(() => {
  const props2 = props as DataTableColumn & Props;
  const column: any = {
    ...props2,
    title: props2.label,
    key: (props2 as any).prop || '',
    id,
    render(row: any, index: number) {
      return slots.default?.({ row: _.cloneDeep(row), index });
    },
  };
  if (!slots.default) {
    delete column.render;
  }
  return column;
});
columns.value.push(column);
</script>

<template />
