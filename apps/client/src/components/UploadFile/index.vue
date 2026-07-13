<template>
  <div
    :class="{
      max: fileList.length >= props.limit && props.listType === 'picture-card',
    }"
  >
    <n-upload
      ref="uploadRef"
      :disabled="disabled"
      :action="baseURL + '/admin/sys-file/upload'"
      :before-upload="beforeAvatarUpload"
      :limit="props.limit"
      :list-type="props.listType"
      :accept="props.accept"
      @finish="onFinish"
      v-model:file-list="fileList"
      :headers="headers"
      @remove="onRemove"
      @preview="handlePictureCardPreview"
      :data="props.otherData"
    >
      <slot />
    </n-upload>
    <n-modal preset="card" v-model:show="dialogVisible">
      <img class="w-full" :src="dialogImageUrl" alt="Preview Image" />
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { UploadFileInfo, UploadInst } from 'naive-ui';
import useStore from '@/store/index';
const baseURL = import.meta.env.VITE_APP_BASE_API;
const CDNURL = import.meta.env.VITE_APP_CDNURL;
const store = useStore();
const fileList = ref<any[]>([]);
const headers = ref();
headers.value = {
  Authorization: store.user.token,
};

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(
  defineProps<{
    limit?: number;
    accept?: string;
    modelValue?: string | string[];
    max?: number;
    disabled?: boolean;
    listType?: 'text' | 'picture' | 'picture-card';
    showFileList?: boolean;
    otherData?: { [key: string]: any };
    list?: { url: string }[];
  }>(),
  {
    limit: 1,
    max: 1,
    disabled: false,
    listType: 'text',
    showFileList: true,
    accept: '.png,.jpg',
  },
);
watch(
  () => props.list,
  newV => {
    if (newV) {
      console.log('props.list', props.list);
      fileList.value.length === 0 &&
        (fileList.value = newV.map(item => ({
          url: CDNURL + item.url,
          name: item.url,
        })));
    }
  },
  {
    deep: true,
    immediate: true,
  },
);
const uploadRef = ref<UploadInst>();

const format = () => {
  if (props.limit === 1) {
    let value = '';
    if (fileList.value.length === 0) {
      value = '';
    } else {
      value =
        fileList.value[0].response === undefined
          ? fileList.value[0].url.split('/')[
              fileList.value[0].url.split('/').length - 1
            ]
          : fileList.value[0].response.data.fileName;
    }
    emit('update:modelValue', value);
  } else {
    emit(
      'update:modelValue',
      fileList.value.map((item: any) => {
        let value =
          item.response === undefined
            ? item.url.split('/')[item.url.split('/').length - 1]
            : item.response.data.fileName;
        return value;
      }),
    );
  }
};
const onRemove = () => {
  format();
};
const onFinish = () => {
  format();
};

watch(
  () => props.modelValue,
  newV => {
    if (newV === '' || newV?.length === 0) {
      fileList.value = [];
    }
  },
);
const beforeAvatarUpload = ({ file }: { file: UploadFileInfo }) => {
  const rawFile = file.file;
  if (!rawFile) {
    return false;
  }
  if (rawFile.size / 1024 / 1024 > props.max) {
    window.$message.error(`文件大小不能超过${props.max}MB`);
    return false;
  }
  return true;
};

const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const handlePictureCardPreview = (uploadFile: UploadFileInfo) => {
  dialogImageUrl.value = uploadFile.url || '';
  dialogVisible.value = true;
};
</script>

<style lang="scss" scoped>
.max {
  :deep() {
    .n-upload-trigger {
      display: none;
    }
  }
}

.hide-file-list {
  :deep() {
    .n-upload-file-list {
      display: none;
    }
  }
}
</style>
