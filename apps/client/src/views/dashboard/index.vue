<template>
  <div class="dashboard-container">
    <h1
      @click="download"
      class="demo py-2 px-4 bg-primary mb-20 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75"
    >
      下载示例
    </h1>
    <!-- github角标 -->
    <github-corner class="github-corner" />
    <n-button type="primary">测试按钮</n-button>
    <div
      :style="{
        background: 'var(--app-bg-color)',
        color: 'var(--app-text-color)',
      }"
    >
      123
    </div>
    <nel-table
      :data="list"
      :bordered="true"
      :single-line="false"
      striped
      :naive-columns="[
        {
          key: 'name',
          title: '名字',
          align: 'center',
          resizable: true,
        },
      ]"
    >
      <nel-table-column
        v-if="demo"
        prop="name"
        label="名字1"
        align="center"
        resizable
      />
      <nel-table-column prop="status" label="状态" align="center">
        <template #default="{ row }">
          <div @click="demoFn">{{ row.status }}</div>
        </template>
      </nel-table-column>
    </nel-table>
  </div>
</template>
<script lang="ts">
export default { name: 'Dashboard' };
</script>
<!-- eslint-disable unused-imports/no-unused-imports unused-imports/no-unused-vars -->

<script setup lang="ts">
import { ref } from 'vue';
import GithubCorner from '@/components/GithubCorner/index.vue';
import { donwloadFileApi } from '@/api/comm';
import { downloadFile } from '@/utils/downloadFile';

function demoFn() {
  alert('hhhhhhhhhhhhhhhhh');
}

const demo = ref(true);
setTimeout(() => {
  demo.value = false;
}, 5000);

const list = ref([
  {
    name: '张三',
    status: '正常',
  },
]);

setTimeout(() => {
  list.value[0].name = '李四';
}, 3000);

const download = async () => {
  const result = await donwloadFileApi();
  downloadFile(result, 'test.xlsx');
};
</script>

<style lang="scss" scoped>
@reference "tailwindcss";

.demo {
  font-size: 30px;
}

.dashboard-container {
  position: relative;
  padding: 24px;

  .github-corner {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99;
    border: 0;
  }
}
</style>
