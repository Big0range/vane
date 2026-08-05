<template>
  <div class="profile-page">
    <n-card class="profile-hero" :bordered="false">
      <div class="hero-content">
        <n-avatar :src="user.avatar" :size="88" round />
        <div class="hero-info">
          <h1>{{ user.username || '用户' }}</h1>
          <p>{{ user.allUserInfo.role_name || '系统用户' }}</p>
        </div>
      </div>
      <div class="hero-stats">
        <div>
          <strong>{{ user.roles.length }}</strong
          ><span>角色</span>
        </div>
        <div>
          <strong>{{ (user.perms || []).filter(Boolean).length }}</strong
          ><span>权限</span>
        </div>
        <div>
          <strong>{{ user.phone || '未设置' }}</strong
          ><span>联系方式</span>
        </div>
      </div>
    </n-card>

    <n-grid
      :cols="'1 800:2'"
      :x-gap="20"
      :y-gap="20"
      responsive="screen"
      class="profile-grid"
    >
      <n-gi>
        <n-card title="基本资料" :bordered="false">
          <n-descriptions :column="1" label-placement="left" bordered>
            <n-descriptions-item label="用户名">{{
              user.username || '未设置'
            }}</n-descriptions-item>
            <n-descriptions-item label="手机号">{{
              user.phone || '未设置'
            }}</n-descriptions-item>
            <n-descriptions-item label="角色">{{
              user.allUserInfo.role_name || '系统用户'
            }}</n-descriptions-item>
            <n-descriptions-item label="状态"
              ><n-tag type="success">正常</n-tag></n-descriptions-item
            >
          </n-descriptions>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card title="账户安全" :bordered="false">
          <div class="security-item">
            <div>
              <strong>登录密码</strong>
              <p>定期修改密码可以提高账户安全性</p>
            </div>
            <n-button secondary type="primary" @click="showPasswordModal = true"
              >修改</n-button
            >
          </div>
          <n-divider />
        </n-card>
      </n-gi>
    </n-grid>

    <n-modal
      v-model:show="showPasswordModal"
      preset="card"
      title="修改密码"
      style="width: 600px"
      class="password-modal"
    >
      <n-form
        ref="formRef"
        :model="passwordForm"
        :rules="rules"
        label-placement="left"
        label-width="96"
      >
        <n-form-item label="原密码" path="old_password">
          <n-input
            v-model:value="passwordForm.old_password"
            type="password"
            show-password-on="click"
            placeholder="请输入原密码"
          />
        </n-form-item>
        <n-form-item label="新密码" path="new_password">
          <n-input
            v-model:value="passwordForm.new_password"
            type="password"
            show-password-on="click"
            placeholder="请输入新密码"
          />
        </n-form-item>
        <n-form-item label="确认新密码" path="confirm_password">
          <n-input
            v-model:value="passwordForm.confirm_password"
            type="password"
            show-password-on="click"
            placeholder="请再次输入新密码"
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="showPasswordModal = false">取消</n-button>
          <n-button type="primary" :loading="submitting" @click="submitPassword"
            >确认修改</n-button
          >
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInst, FormRules } from 'naive-ui';
import { useMessage } from 'naive-ui';
import { changePasswordApi } from '@/api/system/user';
import useStore from '@/store';
import { useRouter } from 'vue-router';

const router = useRouter();
const { user } = useStore();
const message = useMessage();
const showPasswordModal = ref(false);
const submitting = ref(false);
const formRef = ref<FormInst | null>(null);
const passwordForm = reactive({
  old_password: '',
  new_password: '',
  confirm_password: '',
});
const rules: FormRules = {
  old_password: { required: true, message: '请输入原密码', trigger: 'blur' },
  new_password: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 5, message: '密码至少六位', trigger: 'blur' },
  ],
  confirm_password: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (_rule, value) => value === passwordForm.new_password,
      message: '两次输入的新密码不一致',
      trigger: 'blur',
    },
  ],
};

async function submitPassword() {
  try {
    await formRef.value?.validate();
    submitting.value = true;
    await changePasswordApi(passwordForm);
    message.success('密码修改成功，请重新登录');
    showPasswordModal.value = false;
    passwordForm.old_password = '';
    passwordForm.new_password = '';
    passwordForm.confirm_password = '';
    await user.logout(true);
    router.push({
      path: '/login',
    });
  } finally {
    submitting.value = false;
  }
}
</script>

<style lang="scss" scoped>
.profile-page {
  padding: 24px;
  min-height: 100%;
  background: var(--app-bg-color);
}

.profile-hero {
  color: #fff;
  background: linear-gradient(135deg, var(--app-primary-color), #6b8cff);
}

.hero-content,
.hero-stats,
.security-item {
  display: flex;
  align-items: center;
}

.hero-content {
  gap: 20px;
}

.hero-info h1 {
  margin: 0 0 8px;
  font-size: 24px;
}

.hero-info p {
  margin: 0;
  opacity: 0.85;
}

.hero-stats {
  gap: 42px;
  margin-top: 28px;
}

.hero-stats div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hero-stats strong {
  font-size: 20px;
}

.hero-stats span {
  font-size: 12px;
  opacity: 0.8;
}

.profile-grid {
  margin-top: 20px;
}

.security-item {
  justify-content: space-between;
  gap: 16px;
}

.security-item strong {
  color: var(--app-text-color);
}

.security-item p {
  margin: 6px 0 0;
  color: var(--app-text-color-3);
  font-size: 13px;
}
</style>
