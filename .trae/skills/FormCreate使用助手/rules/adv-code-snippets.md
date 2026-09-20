# 常用片段（adv）

本文件汇总 `AGENTS.md` 早期章节中的高频最小片段，便于回答“给我一个最小可运行写法”的问题。

---

## 提交前校验

```javascript
formApi.value.validate().then(() => {
  const formData = formApi.value.formData();
  console.log(formData);
});
```

---

## 修改字段值

```javascript
formApi.value.setValue('fieldName', 'newValue');
formApi.value.setValue({ a: 1, b: 2 });
```

---

## 读取规则

```javascript
const r = formApi.value.getRule('field');
```

---

## 事件注入（blur）

```javascript
const rule = {
  type: 'input',
  field: 'inputField',
  title: '输入框',
  inject: true,
  on: {
    blur(inject) {
      inject.api.setValue('inputField', 'blurred');
    },
  },
};
```

---

## extendApi（最小）

```javascript
formCreate.extendApi((api) => {
  api.log = (msg) => console.log(msg);
});
```

---

## 后端加载规则（parseJson）

```javascript
import formCreate from '@form-create/element-ui';

async function load() {
  const { ruleJson, optionJson } = await fetch('/api/form').then((r) => r.json());
  rules.value = formCreate.parseJson(ruleJson);
  option.value = formCreate.parseJson(optionJson);
}
```

`import` 的包名须与项目 UI 栈一致（如 Ant Design Vue 用 `@form-create/ant-design-vue`）。

