<template>
  <Page>
    <!-- 查询条件 -->
    <template #top>
      <n-form
        label-placement="left"
        :inline="true"
        :rules="rules"
        :model="options"
        ref="ruleFormRef"
        class="demo-form-inline"
      >
        <n-form-item label="门店名称" path="name">
          <n-input v-model:value="options.name" placeholder="门店名称" />
        </n-form-item>
        <n-form-item label="门店地址" path="address">
          <n-input v-model:value="options.address" placeholder="门店地址" />
        </n-form-item>
        <n-form-item label="门店联系电话" path="phone">
          <n-input v-model:value="options.phone" placeholder="门店联系电话" />
        </n-form-item>
        <n-form-item>
          <!-- <div class="inline-block w-80"></div> -->
          <n-button type="primary" @click="onSubmit">搜索</n-button>
          <n-button @click="resetForm">清空</n-button>
        </n-form-item>
      </n-form>
    </template>

    <template #default>
      <!-- 操作按钮 -->
      <n-button type="primary" @click="operation('add')">
        <template #icon>
          <AddOutline />
        </template>
        新增
      </n-button>
      <div class="pt-16"></div>
      <!-- 数据表格 -->
      <nel-table :naive-columns="columns" :loading="loading" :data="tableData">
        <nel-table-column prop="cover">
          <template #default="{ row }">
            <n-image
              :src="CDNURL + row.cover + '?imageMogr2/thumbnail/!10p'"
              :preview-src="CDNURL + row.cover"
            />
          </template>
        </nel-table-column>
        <nel-table-column prop="action">
          <template #default="{ row }">
            <n-button
              type="primary"
              size="small"
              ghost
              :bordered="false"
              @click="operation('edit', row)"
            >
              <template #icon>
                <CreateOutline />
              </template>
              编辑
            </n-button>
            <n-popconfirm @positive-click="operation('delete', row)">
              <template #trigger>
                <n-button type="error" size="small" ghost :bordered="false">
                  <template #icon>
                    <TrashOutline />
                  </template>
                  删除
                </n-button>
              </template>
              是否确认删除
            </n-popconfirm>
          </template>
        </nel-table-column>
      </nel-table>

      <div class="flex justify-center pt-40">
        <n-pagination
          v-model:currentPage="options.page"
          v-model:page-pageSize="options.pageSize"
          background
          layout=" prev, pager, next, jumper"
          @current-change="getList"
          :total="total"
        />
      </div>

      <add-shop
        ref="addStoreRef"
        :title="dialogType === 'add' ? '新增' : '编辑'"
        :dialogType="dialogType"
        @change="getList"
      />
    </template>
  </Page>
</template>

<script lang="tsx" setup>
import { AddOutline, TrashOutline } from '@vicons/ionicons5';
import { reactive, ref, toRefs } from 'vue';
import AddShop, { type IAddShopApi } from './component/addShop.vue';
import { getShopListApi, getShopDeleteApi } from '@/api/shop/index';
import { useForm } from '@/hooks';
import { type FormInst, type FormRules } from 'naive-ui';
import { CreateOutline } from '@vicons/ionicons5';
import { getTableTemplate } from '@/utils/getTemplate.ts';
defineOptions({
  name: 'ShopIndex',
});
const CDNURL = import.meta.env.VITE_APP_CDNURL;
const state = reactive({
  loading: false, // 表格加载状态
  tableData: [] as PromiseReturnType<typeof getShopListApi>['data']['rows'], // 表格数据
});

const { loading, tableData } = toRefs(state);
const columns = ref<TableTemplateRow[]>([]);
(async () => {
  try {
    loading.value = true;
    columns.value = [...(await getTableTemplate('ShopList'))];
    console.log('columns.value', columns.value);
  } finally {
    loading.value = false;
  }
})();
const dialogType = ref<string>('add');
const defaultOptions = {
  name: undefined,
  address: undefined,
  phone: undefined,
  page: 1,
  pageSize: 20,
};
const options = ref({
  ...defaultOptions,
});
const total = ref(0);
const ruleFormRef = ref<FormInst>();
const rules = reactive<FormRules>({});
const onSubmit = () => {
  options.value.page = 1;
  getList();
};

const { resetForm: resetFormInst } = useForm(ruleFormRef, options);
const resetForm = () => {
  resetFormInst();
  getList();
};
const getList = async () => {
  loading.value = true;
  try {
    const result = await getShopListApi(options.value);
    tableData.value = result.data.rows;
    total.value = result.data.total;
  } finally {
    loading.value = false;
  }
};
getList();

const addStoreRef = ref<IAddShopApi>();
// 综合操作
const operation = async (type: 'add' | 'edit' | 'delete', row?: any) => {
  dialogType.value = type;
  switch (type) {
    // 添加
    case 'add':
      addStoreRef.value?.show(row);
      break;
    // 编辑
    case 'edit':
      console.log('row', row);
      addStoreRef.value?.show(row);
      break;
    // 删除
    case 'delete':
      await getShopDeleteApi({ id: row.id });
      window.$message.success('门店删除成功');
      getList();
      break;
  }
};
</script>
