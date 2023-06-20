<template>
  <div v-loading="loading">
    <div class="body">
      <div class="shell">
        <div class="container a-container" id="b-container">
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginRules"
            label-width="0"
            auto-complete="on"
            class="form"
          >
            <h2 class="form_title title">登入账号</h2>
            <span class="form_span">请输入您的账号密码进行登录</span>
            <el-form-item prop="username">
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="请输入您的手机账号"
                class="form_input"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                ref="passwordRef"
                :key="passwordType"
                v-model="loginForm.password"
                :type="passwordType"
                name="password1"
                tabindex="2"
                placeholder="请输入您的密码"
                class="form_input"
                @keyup="checkCapslock"
                @blur="capslockTooltipDisabled = true"
                @keyup.enter="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </el-form-item>
            <el-form-item prop="code" style="width: 350px">
              <el-input
                ref="code"
                v-model="loginForm.code"
                placeholder="请输入验证码"
                class="form_input"
                style="width: 180px"
                name="code"
                type="text"
                tabindex="1"
                auto-complete="on"
                @keyup.enter="handleLogin"
              />
              <img
                class="absolute right-0 h-40 ml-12 cursor-pointer rounded-4 show-code"
                :src="verifySrc"
                @click="setCode"
              />
            </el-form-item>
            <el-button
              class="form_button button submit"
              type="primary"
              @click.prevent="handleLogin"
              :loading="loading"
            >
              登 录
            </el-button>
          </el-form>
        </div>

        <div class="switch" id="switch-cnt">
          <div class="switch_circle"></div>
          <div class="switch_circle switch_circle-t"></div>
          <div class="switch_container" id="switch-c1">
            <!-- <h2 class="switch_title title" style="letter-spacing: 0">
            Welcome Back！
          </h2> -->
            <img src="@/assets/logo.png" alt="" class="w-150" />
            <p class="mb-10 switch_description description mt-35 text-15">
              欢迎登录vane-admin
            </p>
            <!-- <button class="switch_button button switch-btn">SIGN IN</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, watch, nextTick } from 'vue';

import { localStorage } from '@/utils/storage';
// 组件依赖
import { ElForm, ElInput } from 'element-plus';
import router from '@/router';
import SvgIcon from '@/components/SvgIcon/index.vue';
// 状态管理依赖
import useStore from '@/store';

// API依赖
import { useRoute } from 'vue-router';
import { LoginFormData } from '@/api/system/user/types';
import { codeApi } from '@/api/system/user/index';
const verifySrc = ref('');
const { user } = useStore();
const route = useRoute();

const loginFormRef = ref(ElForm);
const passwordRef = ref(ElInput);

const state = reactive({
  redirect: '',
  loginForm: {
    username: '',
    password: '',
    code: '',
    changePassword: false
  } as LoginFormData,
  loginRules: {
    username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
    password: [
      { required: true, trigger: 'blur', validator: validatePassword }
    ],
    code: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
  },
  loading: false,
  passwordType: 'password',
  // 大写提示禁用
  capslockTooltipDisabled: true,
  otherQuery: {},
  clientHeight: document.documentElement.clientHeight,
  showCopyright: true,
  showDialog: false
});

function validatePassword(rule: any, value: any, callback: any) {
  if (value.length < 6) {
    callback(new Error('密码不得小于6位'));
  } else {
    callback();
  }
}

const {
  loginForm,
  loginRules,
  loading,
  passwordType,
  capslockTooltipDisabled
} = toRefs(state);

function checkCapslock(e: any) {
  const { key } = e;
  state.capslockTooltipDisabled =
    key && key.length === 1 && key >= 'A' && key <= 'Z';
}

function showPwd() {
  if (passwordType.value === 'password') {
    passwordType.value = '';
  } else {
    passwordType.value = 'password';
  }
  nextTick(() => {
    passwordRef.value.focus();
  });
}
/**
 *  登录处理
 */
function handleLogin() {
  state.loading = true;
  user
    .login(state.loginForm)
    .then(() => {
      router.push({ path: '/' });
      // 防止请求成功时 重复点击
      setTimeout(() => {
        state.loading = false;
      }, 3000);
    })
    .catch(() => {
      state.loading = false;
      setCode();
    });
}

watch(
  route,
  () => {
    const query = route.query;
    if (query) {
      state.redirect = query.redirect as string;
      state.otherQuery = getOtherQuery(query);
    }
  },
  {
    immediate: true
  }
);

function getOtherQuery(query: any) {
  return Object.keys(query).reduce((acc: any, cur: any) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur];
    }
    return acc;
  }, {});
}

const setCode = async () => {
  try {
    const res: any = await codeApi();
    verifySrc.value = 'data:image/svg+xml;utf8,' + encodeURIComponent(res);
  } catch (err) {
    console.log(err);
  }
};
setCode();
</script>

<style lang="scss" scoped>
.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
}
.show-code {
  background-color: rgba(185, 217, 215, 0.5);
}
.body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: #ecf0f3;
  color: #a0a5a8;
}

.shell {
  position: relative;
  width: 1000px;
  min-width: 1000px;
  min-height: 600px;
  height: 600px;
  padding: 25px;
  background-color: #ecf0f3;
  box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
  border-radius: 12px;
  overflow: hidden;
}

/* 设置响应式 */
/* @media (max-width: 1200px) {
  .shell {
    transform: scale(0.7);
  }
}

@media (max-width: 1000px) {
  .shell {
    transform: scale(0.6);
  }
}

@media (max-width: 800px) {
  .shell {
    transform: scale(0.5);
  }
}

@media (max-width: 600px) {
  .shell {
    transform: scale(0.4);
  }
} */

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 600px;
  height: 100%;
  padding: 25px;
  background-color: #ecf0f3;
  transition: 1.25s;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.iconfont {
  margin: 0 5px;
  border: rgba(0, 0, 0, 0.5) 2px solid;
  border-radius: 50%;
  font-size: 25px;
  padding: 3px;
  opacity: 0.5;
  transition: 0.1s;
}

.iconfont:hover {
  opacity: 1;
  transition: 0.15s;
  cursor: pointer;
}

.form_input {
  width: 350px;
  height: 40px;
  margin: 4px 0;
  padding-left: 0px;
  font-size: 13px;
  letter-spacing: 0.15px;
  border: none;
  outline: none;
  background-color: #ecf0f3;
  transition: 0.25s ease;
  border-radius: 8px;
  box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
  :deep() {
    input:-webkit-autofill {
      transition: background-color 5000s ease-in-out 0s;
    }
    .is-focus {
      box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9 !important;
    }
    input {
      outline: 0;
    }
    .el-input__wrapper {
      border-radius: 8px;
      border: none;
      background: none;
      box-shadow: none;
      &:hover {
        box-shadow: none;
      }
    }
  }
}

.form_input:focus {
  box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
}

.form_span {
  margin-top: 10px;
  margin-bottom: 32px;
}

.form_link {
  color: #181818;
  font-size: 15px;
  margin-top: 25px;
  border-bottom: 1px solid #a0a5a8;
  line-height: 2;
}

.title {
  font-size: 34px;
  font-weight: 700;
  line-height: 3;
  color: #181818;
  letter-spacing: 10px;
}

.description {
  letter-spacing: 0.25px;
  text-align: center;
  line-height: 1.6;
}

.button {
  width: 180px;
  height: 50px;
  border-radius: 25px;
  margin-top: 50px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1.15px;
  /* background-color: #4b70e2; */
  color: #f9f9f9;
  box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
  border: none;
  outline: none;
}

.a-container {
  z-index: 100;
  left: calc(100% - 600px);
}

.b-container {
  left: calc(100% - 600px);
  z-index: 0;
}

.switch {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 400px;
  padding: 50px;
  z-index: 200;
  transition: 1.25s;
  background-color: #ecf0f3;
  overflow: hidden;
  box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #d1d9e6;
}

.switch_circle {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-color: #ecf0f3;
  box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #fff;
  bottom: -60%;
  left: -60%;
  transition: 1.25s;
}

.switch_circle-t {
  top: -30%;
  left: 60%;
  width: 300px;
  height: 300px;
}

.switch_container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  width: 400px;
  padding: 50px 55px;
  transition: 1.25s;
}

.switch_button {
  cursor: pointer;
}

.switch_button:hover,
.submit:hover {
  box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
  transform: scale(0.985);
  transition: 0.25s;
}

.switch_button:active,
.switch_button:focus {
  box-shadow: 2px 2px 6px #d1d9e6, -2px -2px 6px #f9f9f9;
  transform: scale(0.97);
  transition: 0.25s;
}

.is-txr {
  left: calc(100% - 400px);
  transition: 1.25s;
  transform-origin: left;
}

.is-txl {
  left: 0;
  transition: 1.25s;
  transform-origin: right;
}

.is-z {
  z-index: 200;
  transition: 1.25s;
}

.is-hidden {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  transition: 1.25s;
}

.is-gx {
  animation: is-gx 1.25s;
}

@keyframes is-gx {
  0%,
  10%,
  100% {
    width: 400px;
  }

  30%,
  50% {
    width: 500px;
  }
}
</style>
