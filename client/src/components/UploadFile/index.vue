<template>
  <div
    :class="{
      max: fileList.length >= props.limit && props.listType === 'picture-card'
    }"
  >
    <el-upload
      ref="uploadRef"
      :disabled="disabled"
      :action="baseURL + '/admin/sys-file/upload'"
      :on-exceed="handleExceed"
      :before-upload="beforeAvatarUpload"
      :limit="props.limit"
      :list-type="props.listType"
      :accept="props.accept"
      :on-success="onSuccess"
      v-model:file-list="fileList"
      :headers="headers"
      :on-remove="onRemove"
      :on-preview="handlePictureCardPreview"
      :data="props.otherData"
    >
      <slot />
    </el-upload>
    <el-dialog v-model="dialogVisible">
      <img class="w-full" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { ElMessage, genFileId } from 'element-plus';
import type { UploadProps, UploadInstance, UploadRawFile } from 'element-plus';
import useStore from '@/store/index';
import { CDNURL } from '@/utils/config';
const baseURL = import.meta.env.VITE_APP_BASE_API;
const store = useStore();
const fileList = ref<any[]>([]);
const headers = ref();
headers.value = {
  Authorization: store.user.token
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
    accept: '.png,.jpg'
  }
);
watch(
  () => props.list,
  newV => {
    if (newV) {
      console.log('props.list', props.list);
      fileList.value.length === 0 &&
        (fileList.value = newV.map(item => ({
          url: CDNURL + item.url,
          name: item.url
        })));
    }
  },
  {
    deep: true,
    immediate: true
  }
);
const uploadRef = ref<UploadInstance>();
const handleExceed: UploadProps['onExceed'] = files => {
  if (props.limit === 1) {
    uploadRef.value?.clearFiles();
    const file = files[0] as UploadRawFile;
    file.uid = genFileId();
    uploadRef.value?.handleStart(file);
    uploadRef.value?.submit();
  }
};

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
      })
    );
  }
};
const onRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  format();
};
const onSuccess = () => {
  format();
};

watch(
  () => props.modelValue,
  newV => {
    if (newV === '' || newV?.length === 0) {
      fileList.value = [];
    }
  }
);
const beforeAvatarUpload: UploadProps['beforeUpload'] = rawFile => {
  if (rawFile.size / 1024 / 1024 > props.max) {
    ElMessage.error(`文件大小不能超过${props.max}MB`);
    return false;
  }
  return true;
};

const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const handlePictureCardPreview: UploadProps['onPreview'] = uploadFile => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};
</script>

<style lang="scss" scoped>
.max {
  :deep() {
    div.el-upload {
      display: none;
    }
  }
}
.hide-file-list {
  :deep() {
    .el-upload-list {
      display: none;
    }
  }
}
</style>
