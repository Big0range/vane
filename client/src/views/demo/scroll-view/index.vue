<template>
  <Page>
    <template #default>
      <div>仅支持Y轴滚动</div>
      <div class="flex h-full p-5 border">
        <ScrollView :height="height" class="w-120">
          <div
            v-for="(item, index) in list1"
            :key="item"
            @click="changeSvId(index)"
            class="pl-6 my-10 border-l-2 cursor-pointer border-emerald-600 leading-30"
          >
            {{ item }}
          </div>
        </ScrollView>
        <ScrollView
          :height="height"
          :ScrollIntoView="svId"
          class="flex-1 px-20 ml-20"
        >
          <div
            v-for="item in list1"
            :key="item"
            :id="'sv-item-' + item"
            class="my-20 bg-red-200 leading-100"
          >
            {{ item }}
          </div>
        </ScrollView>
      </div>
    </template>
  </Page>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import ScrollView from '@/components/ScrollView/index.vue';
const list1 = ref(new Array(100).fill(0).map((_, i) => i));
const svId = ref('sv-item-20');
const changeSvId = (index: number) => {
  svId.value = 'sv-item-' + index;
};
const height = ref('500px');
onMounted(() => {
  let h = 0;
  h = document.querySelector('.main-top')!.clientHeight; // 顶部高度
  h = h + 40 + 32; // page padding
  h = h + 24 + 18; // 不知道哪里算错了  手动补一下
  height.value = `calc(100vh - ${h}px)`;
});
</script>
