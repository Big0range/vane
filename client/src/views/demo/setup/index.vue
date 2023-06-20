<template>
  <Page>
    <template #default>
      <el-button type="primary" @click="handleStart">开始</el-button>
    </template>
  </Page>
</template>

<script lang="ts" setup>
import intro from 'intro.js';
import 'intro.js/minified/introjs.min.css';
const handleStart = () => {
  console.log('开始');
  intro()
    .setOptions({
      nextLabel: '下一步',
      prevLabel: '上一步',
      doneLabel: '完成',
      showProgress: true,
      disableInteraction: true,
      steps: [
        {
          title: 'Welcome',
          intro: '欢迎使用 vane-admin'
        },
        {
          title: '折叠菜单',
          element: document.querySelector('#hamburger-container')!,
          intro: '这是菜单折叠按钮.'
        },
        {
          title: '用户操作',
          element: document.querySelector('.navbar .right-menu')!,
          intro: '这是用户功能区'
        },
        {
          title: '锁屏',
          element: document.querySelector('#screen-lock')!,
          intro: '点击可以锁屏'
        },
        {
          title: '消息通知',
          element: document.querySelector('#header-notice')!,
          intro: '这是消息通知'
        },
        {
          title: '全屏',
          element: document.querySelector('#screenfull')!,
          intro: '点击这里可以全屏'
        },
        {
          title: '布局大小',
          element: document.querySelector('#size-select')!,
          intro: '点击这里可以设置布局大小'
        },
        {
          title: '语言切换',
          element: document.querySelector('#lang-select')!,
          intro: '点击这里可以切换语言'
        },
        {
          title: '主题设置',
          element: document.querySelector('#right-panel__button')!,
          intro: '这是主题设置'
        }
      ]
    })
    .start();
};
</script>
