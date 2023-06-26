<template>
  <div>
    <span @click="open"> <Lock /> </span>
    <Teleport v-if="show" to="body">
      <div
        class="screen-lock"
        data-msg="日防夜防,同行难防"
        :style="{
          '--background-image': `url(${bgImages[bgIndex]})`
        }"
      >
        <div class="background"></div>
        <div class="content w-564">
          <div class="top">
            <el-image
              style="width: 180px; height: 180px; border-radius: 50%"
              :src="user.avatar"
              fit="cover"
            />
            <div class="flex items-center justify-center">
              <el-icon :size="30" style="font-weight: bold">
                <Lock />
              </el-icon>
            </div>
            <div class="tip">{{ appTitle }} 屏幕已锁定</div>
            <el-form ref="ruleFormRef" :model="formData" :rules="rules">
              <el-form-item prop="pwd">
                <el-input
                  v-model="formData.pwd"
                  class="m-2 w-374"
                  placeholder="请输入您的密码"
                  type="password"
                  :validate-event="false"
                  autocomplete="off"
                  name="pwd"
                  size="large"
                  :readonly="readonly"
                  @click="readonly = false"
                  @blur="readonly = true"
                >
                  <template #suffix>
                    <el-button
                      :icon="Lock"
                      type="primary"
                      size="large"
                      class="input-btn"
                      :loading="loading"
                      @click="unlock"
                      >解锁</el-button
                    >
                  </template>
                </el-input>
              </el-form-item>
            </el-form>

            <div>
              <span class="cursor-pointer" @click="changeBgIndex"
                >切换壁纸</span
              >
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from 'vue';
import { Lock } from '@element-plus/icons-vue';
import useStore from '@/store';
import { encryption } from '@vane/server/src/utils/encryption';
import type { FormInstance, FormRules } from 'element-plus';
import { useForm } from '@/hooks/useForm';
import { changeLockScreenApi } from '@/api/system/user';
const { user } = useStore();
const CDNURL = import.meta.env.VITE_APP_CDNURL;
const bgImages = ref(
  new Array(30)
    .fill(CDNURL)
    .map((item, i) => item + 'bg-' + i + '.jpg?imageMogr2/format/webp')
);
const readonly = ref(true);
const bgIndex = ref(0);
const appTitle = import.meta.env.VITE_APP_TITLE;
const changeBgIndex = () => {
  bgIndex.value = Math.round(Math.random() * (bgImages.value.length - 1));
};

const show = computed(() => user.screenLock === 1);

const open = async () => {
  try {
    user.screenLock = 1;
    await changeLockScreenApi(1);
  } catch (error) {
    console.log(error);
  }
};
watch(
  () => show.value,
  value => {
    if (value === true) {
      document.body.classList.add('overflow-hidden');
      changeBgIndex();
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  },
  {
    immediate: true
  }
);
const formData = reactive({
  username: '',
  password: '',
  pwd: ''
});
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('请输入密码'));
  }
  // if (encryption(value) !== user.allUserInfo.password) {
  //   return callback(new Error('请输入正确的密码'));
  // }
  callback();
};
const rules = reactive<FormRules>({
  pwd: [
    {
      validator: validatePassword,
      trigger: 'blur'
    }
  ]
});
const ruleFormRef = ref<FormInstance>();
const loading = ref(false);
const { verifyForm, resetForm } = useForm(ruleFormRef);
const unlock = async () => {
  try {
    loading.value = true;
    await verifyForm();
    await changeLockScreenApi(0, encryption(formData.pwd));
    user.screenLock = 0;
    resetForm();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.screen-lock {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1999;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: hsla(0, 0%, 100%, 0.6);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border 0s,
    color 0.1s, font-size 0s;
  backdrop-filter: blur(10px);
  font-size: 14px;
  :deep() {
    .el-input__wrapper {
      padding-top: 0;
      padding-bottom: 0;
      padding-right: 0;
      height: 40px;
      .el-button {
        padding: 8px 15px;
        span {
          margin-left: 2px;
        }
      }
    }
  }

  .tip {
    font-weight: 700px;
  }
  .content {
    z-index: 1999;
    padding: 40px 95px 20px 95px;
    color: #252a30;
    text-align: center;
    background: hsla(0, 0%, 100%, 0.6);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    .top {
      line-height: 50px;
      color: #252a30;
      text-align: center;
    }
  }
  .background {
    background: var(--background-image) center center / 100% 100% fixed;
    filter: blur(10px);
    position: absolute;
    background-size: cover;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1998;
  }
}
</style>
