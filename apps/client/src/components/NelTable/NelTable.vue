<script setup lang="ts">
import {
  ref,
  provide,
  computed,
  nextTick,
  PropType,
  Ref,
  onMounted,
} from 'vue';
import { NDataTable, dataTableProps, type PaginationProps } from 'naive-ui';
import _ from 'lodash';
import { useAttrs } from 'vue';

const attrs = useAttrs();
/**
 * 1.传入 max-height 时 , 由于需要naive ui 需要 , 需要计算 scroll-x 宽度 ,
 *   否则X轴滚动会有问题, 显示不出来x轴滚动条
 *   目前的处理方法是  不需要你手动去传 , js 计算表格宽度来解决, 但是计算完成之后会造成没有设置宽度的那一行 宽度过低, 大概只有一个字的宽度
 *   当然你也可以自己计算传入scrollX来解决
 * 2.弃用naive ui 的columns属性(避免冲突混淆), 请使用naiveColumns或naive-columns属性
 * 3.当需要分页时, 请把remote设置为true, 并且传入 :page="1"(必填) :pageSize="10"(必填) :pageSizes="[10, 20, 30, 40]"(可选)
 */
const props = defineProps({
  ...dataTableProps,
  total: {
    type: Number,
    default: 0,
  },
  /**
   *  @deprecated NelTable 不允许传入 columns, 请使用 naiveColumns 或 naive-columns
   */
  columns: {
    ...dataTableProps.columns,
    validator: (val: any) => {
      if (val && val.length !== 0) {
        console.error(
          'NelTable 不允许传入 columns, 请使用 naiveColumns 或 naive-columns',
        );
      }
      return [] as any;
    },
  },
  /**
   * naive-ui 自定义列配置
   */
  naiveColumns: dataTableProps.columns,
  align: {
    type: String as PropType<'left' | 'right' | 'center'>,
    default: 'center',
  },
  singleLine: {
    type: Boolean,
    default: false,
  },
});
const innerColumns = ref<any[]>([]);
provide('tableColumns', innerColumns);

const page = defineModel<number>('page', {
  default: 1,
});
const pageSize = defineModel<number>('pageSize', {
  default: 10,
});
const pageSizes = defineModel<number[] | undefined>('pageSizes');
const total = computed(() => props.total);

const emits = defineEmits<{
  (e: 'sizeChange', pageSize: number): void;
  (e: 'pageChange', page: number): void;
  (e: 'change', options: { page: number; pageSize: number }): void;
}>();

const pageOptions = computed<PaginationProps | undefined>(() => {
  if (!props.remote) {
    return undefined;
  }
  return {
    page: page.value,
    pageSize: pageSize.value,
    pageSizes: pageSizes.value,
    showSizePicker: pageSizes.value !== undefined,
    itemCount: total.value,
    onChange: (pageAfter: number) => {
      page.value = pageAfter;
      nextTick(() => {
        emits('pageChange', page.value!);
        emits('change', {
          page: page.value!,
          pageSize: pageSize.value!,
        });
      });
    },
    onPageSizeChange: (pageSizeAfter: number) => {
      pageSize.value = pageSizeAfter;
      page.value = 1;
      nextTick(() => {
        emits('sizeChange', pageSize.value!);
        emits('change', {
          page: page.value!,
          pageSize: pageSize.value!,
        });
      });
    },
  };
});
// watch(() => pageOptions.value, (newVal) => {
//     console.log(newVal)
// }, {
//     deep: true,
//     immediate: true,
// })
type TTableColumn =
  import('naive-ui/es/data-table/src/interface').TableColumn & {
    key: string | number;
    render?: any;
  };
const columns = computed(() => {
  let mergeColumns = [] as TTableColumn[];
  const naiveColumns = (props.naiveColumns || []) as TTableColumn[];
  const selfColumns = innerColumns.value as Ref<TTableColumn>[];
  if (naiveColumns.length === 0) {
    mergeColumns = selfColumns.map(item => item.value);
  } else {
    mergeColumns = [...naiveColumns];
    for (let col of selfColumns) {
      if (mergeColumns.findIndex(item => item.key === col.value.key) === -1) {
        mergeColumns.push(col.value);
      } else {
        const findIndex = mergeColumns.findIndex(
          item => item.key === col.value.key,
        );
        mergeColumns[findIndex] = _.merge(
          {},
          mergeColumns[findIndex],
          col.value,
        ) as any;
      }
    }
  }
  const list = mergeColumns.map(col => {
    const data = {
      ...col,
      align: col.align || props.align,
      render(row: any, index: number) {
        if (col.render) {
          return col.render(row, index);
        }
        return row[col.key];
      },
    } as TTableColumn;
    if (col.type === 'selection') {
      delete data.render;
    }
    return data;
  });
  nextTick(calcWidth);
  return list;
});

const tableWrapRef = ref<HTMLDivElement>();
const width = ref<number | undefined>(undefined);
// 计算宽度
const calcWidth = () => {
  const a = tableWrapRef.value!.querySelector('.n-data-table-table');
  width.value = a?.clientWidth;
};
onMounted(() => {
  calcWidth();
});
</script>

<template>
  <div ref="tableWrapRef">
    <span style="display: none">
      <slot />
    </span>
    <n-data-table
      :attrs="attrs"
      v-bind="props"
      :style="attrs.style"
      :virtual-scroll="props.virtualScroll"
      :min-height="props.minHeight"
      :max-height="props.maxHeight"
      :columns="columns"
      :data="data"
      :pagination="remote ? pageOptions : undefined"
      :remote="remote"
      :scroll-x="props.maxHeight ? props.scrollX || width : undefined"
      :single-line="props.singleLine ?? false"
      :bordered="props.bordered ?? true"
    />
  </div>
</template>
