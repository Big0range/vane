<template>
  <Page>
    <!-- 查询条件 -->
    <template #top>
      <el-form
        :inline="true"
        :rules="rules"
        :model="options"
        ref="ruleFormRef"
        class="demo-form-inline"
      >
        <el-form-item label="门店姓名" prop="name">
          <el-input v-model="options.name" placeholder="门店姓名" />
        </el-form-item>
        <el-form-item label="门店地址" prop="address">
          <el-input v-model="options.address" placeholder="门店地址" />
        </el-form-item>
        <el-form-item label="门店联系电话" prop="phone">
          <el-input v-model="options.phone" placeholder="门店联系电话" />
        </el-form-item>
        <el-form-item>
          <!-- <div class="inline-block w-80"></div> -->
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button @click="resetForm">清空</el-button>
        </el-form-item>
      </el-form>
    </template>

    <template #default>
      <!-- 操作按钮 -->
      <el-button type="primary" :icon="Plus" @click="operation('add')"
        >新增</el-button
      >
      <div class="pt-16"></div>

      <!-- 数据表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        @row-click="handleRowClick"
        row-key="id"
        border
        default-expand-all
        :header-cell-style="{
          'background-color': '#f5f7fa',
          color: '#303133',
          height: '45px',
          'font-size': '15px'
        }"
      >
        <el-table-column label="门店名称" prop="name"></el-table-column>
        <el-table-column label="门店照片">
          <template #default="scope">
            <el-image
              v-if="scope.row.cover"
              style="width: 100px; height: 50px"
              :src="CDNURL + scope.row.cover"
              :preview-src-list="[CDNURL + scope.row.cover]"
              :zoom-rate="1.2"
              preview-teleported
              fit="cover"
            />
            <span v-else> 暂无图片 </span>
          </template>
        </el-table-column>
        <el-table-column label="门店地址" prop="address"></el-table-column>
        <el-table-column label="门店描述" prop="desc"></el-table-column>
        <el-table-column label="门店联系电话" prop="phone"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              link
              type="primary"
              :icon="Edit"
              @click="operation('edit', scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              width="120"
              confirm-button-text="确认"
              cancel-button-text="取消"
              :icon="InfoFilled"
              title="是否确认删除?"
              @confirm="operation('delete', scope.row)"
            >
              <template #reference>
                <el-button link :icon="Delete" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex justify-center pt-40">
        <el-pagination
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

<script lang="ts" setup>
import { Plus, Delete, Edit, InfoFilled } from '@element-plus/icons-vue';
import { reactive, ref, toRefs } from 'vue';
import AddShop, { IAddShopApi } from './component/addShop.vue';
import { getShopListApi, getShopDeleteApi } from '@/api/shop/index';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { CDNURL } from '@/utils/config';
const state = reactive({
  loading: false, // 表格加载状态
  tableData: [] as any // 表格数据
});
const { loading, tableData } = toRefs(state);
const dialogType = ref<string>('add');
const options = reactive({
  name: undefined,
  address: undefined,
  phone: undefined,
  page: 1,
  pageSize: 20
});
const total = ref(0);
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({});
const onSubmit = () => {
  options.page = 1;
  getList();
};
const resetForm = () => {
  ruleFormRef.value?.resetFields();
  getList();
};
const getList = async () => {
  loading.value = true;
  try {
    const result = await getShopListApi(options);
    tableData.value = result.data.rows;
    total.value = result.data.total;
  } catch (error) {
  } finally {
    loading.value = false;
  }
};
getList();
const handleRowClick = (row: any) => {};

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
      addStoreRef.value?.show(row);
      break;
    // 删除
    case 'delete':
      try {
        await getShopDeleteApi({ id: row.id });
        ElMessage.success('用户删除成功');
        getList();
      } catch (err) {}
      break;
  }
};
</script>
