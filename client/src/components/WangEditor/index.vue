<template>
  <div style="border: 1px solid #ccc">
    <!-- 工具栏 -->
    <Toolbar
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      style="border-bottom: 1px solid #ccc"
      :mode="mode"
    />
    <!-- 编辑器 -->
    <Editor
      :defaultConfig="editorConfig"
      v-model="defaultHtml"
      @onChange="handleChange"
      style="height: 500px; overflow-y: hidden"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, shallowRef, reactive, toRefs, watch } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
// API 引用
import { uploadImg } from '@/api/comm';
const props = defineProps({
  modelValue: {
    type: [String],
    default: ''
  },
  readOnly: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
console.log('props.modelValue', props.modelValue);
const CDNURL = import.meta.env.VITE_APP_CDNURL;
const state = reactive({
  toolbarConfig: {},
  editorConfig: {
    placeholder: '请输入内容...',
    readOnly: props.readOnly,
    MENU_CONF: {
      uploadImage: {
        // 自定义图片上传
        async customUpload(file: any, insertFn: any) {
          uploadImg(file).then(res => {
            // const url = res.data;
            // console.log(res);
            insertFn(CDNURL + res.data);
          });
        }
      }
    }
  },
  defaultHtml: props.modelValue,
  mode: 'default'
});

watch(
  () => props.modelValue,
  newV => {
    state.defaultHtml = newV;
  }
);
const { toolbarConfig, editorConfig, defaultHtml, mode } = toRefs(state);

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

function handleChange(editor: any) {
  emit('update:modelValue', editor.getHtml());
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
