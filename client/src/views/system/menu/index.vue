<template>
  <div class="app-container">
    <!-- <Edita /> -->
    <!-- 数据表格 -->
    <el-card>
      <template #header>
        <el-button type="primary" :icon="Plus" @click="handleAdd">{{
          $t('system.menu.add')
        }}</el-button>
      </template>

      <el-table
        v-loading="loading"
        :data="menuList"
        highlight-current-row
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        @row-click="handleRowClick"
        row-key="id"
        border
        default-expand-all
      >
        <el-table-column :label="$t('system.menu.name')">
          <template #default="scope">
            <svg-icon
              :icon-class="
                scope.row.type === 'BUTTON' ? 'button' : scope.row.icon
              "
            />
            {{ scope.row.title }}
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('system.menu.type')"
          align="center"
          width="150"
        >
          <template #default="scope">
            <el-tag v-if="scope.row.type === 'CATALOG'" type="warning">{{
              $t('system.menu.types', 0)
            }}</el-tag>
            <el-tag v-if="scope.row.type === 'MENU'" type="success">{{
              $t('system.menu.types', 1)
            }}</el-tag>
            <el-tag v-if="scope.row.type === 'BUTTON'" type="danger">{{
              $t('system.menu.types', 2)
            }}</el-tag>
            <el-tag v-if="scope.row.type === 'EXTLINK'" type="info">{{
              $t('system.menu.types', 3)
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="权限标识"
          align="center"
          width="150"
          prop="permission"
        />

        <el-table-column
          :label="$t('system.menu.status')"
          align="center"
          width="150"
        >
          <template #default="scope">
            <el-tag v-if="scope.row.hidden === 0" type="success">{{
              $t('common.show')
            }}</el-tag>
            <el-tag v-else type="info">{{ t('common.hidden') }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('common.sort')"
          align="center"
          width="150"
          prop="sort"
        />

        <el-table-column :label="$t('common.operate')" align="center">
          <template #default="scope">
            <el-button
              type="success"
              :icon="Plus"
              circle
              plain
              @click.stop="handleAdd(scope.row)"
            />
            <el-button
              type="primary"
              :icon="Edit"
              circle
              plain
              @click.stop="handleUpdate(scope.row)"
            />
            <el-button
              type="danger"
              :icon="Delete"
              circle
              plain
              @click.stop="handleDelete(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- dialog -->
    <el-dialog
      :title="dialog.title"
      v-model="dialog.visible"
      @close="cancel"
      width="750px"
    >
      <el-form
        ref="dataFormRef"
        :model="formData"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item :label="$t('system.menu.parentMenu')" prop="parent_id">
          <el-tree-select
            v-model="formData.parent_id"
            :placeholder="$t('system.menu.parentMenu')"
            :data="menuOptions"
            filterable
            check-strictly
            :render-after-expand="false"
          />
        </el-form-item>

        <el-form-item :label="$t('system.menu.name')" prop="title">
          <el-input
            v-model="formData.title"
            :placeholder="$t('system.menu.namePlaceholder')"
          />
        </el-form-item>
        <el-form-item
          :label="$t('system.menu.vueName')"
          prop="name"
          v-if="formData.type == 'CATALOG' || formData.type == 'MENU'"
        >
          <el-input
            v-model="formData.name"
            :placeholder="$t('system.menu.vueNamePlaceholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('system.menu.type')" prop="type">
          <el-radio-group
            v-model="formData.type"
            @change="handleMenuTypeChange"
          >
            <el-radio label="CATALOG">{{
              $t('system.menu.types', 0)
            }}</el-radio>
            <el-radio label="MENU">{{ $t('system.menu.types', 1) }}</el-radio>
            <el-radio label="BUTTON">{{ $t('system.menu.types', 2) }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          v-if="formData.type == 'EXTLINK'"
          :label="$t('system.menu.types', 3)"
          prop="path"
        >
          <el-input
            v-model="formData.path"
            :placeholder="$t('system.menu.extlinkPlaceholder')"
          />
        </el-form-item>

        <el-form-item
          :label="$t('system.menu.path')"
          prop="path"
          v-if="formData.type == 'CATALOG' || formData.type == 'MENU'"
        >
          <el-input
            v-if="formData.type == 'CATALOG'"
            v-model="formData.path"
            :placeholder="$t('system.menu.pathPlaceholder')"
          />
          <el-input v-else v-model="formData.path" placeholder="user" />
        </el-form-item>

        <!-- 组件页面完整路径 -->
        <el-form-item
          v-if="formData.type == 'MENU'"
          :label="$t('system.menu.component')"
          prop="component"
        >
          <el-input
            v-model="formData.component"
            placeholder="system/user/index"
            style="width: 95%"
          >
            <template v-if="formData.parent_id != -1" #prepend
              >src/views/</template
            >
            <template v-if="formData.parent_id != -1" #append>.vue</template>
          </el-input>
        </el-form-item>

        <!-- 权限标识 -->
        <el-form-item
          v-if="formData.type == 'BUTTON'"
          label="权限标识"
          prop="permission"
        >
          <el-input v-model="formData.permission" placeholder="sys:user:add" />
        </el-form-item>

        <el-form-item
          :label="$t('system.menu.icon')"
          prop="icon"
          v-if="formData.type !== 'BUTTON'"
        >
          <el-popover
            ref="popoverRef"
            placement="bottom-start"
            :width="570"
            trigger="click"
          >
            <template #reference>
              <el-input
                v-model="formData.icon"
                :placeholder="$t('system.menu.iconPlaceholder')"
                clearable
                readonly
                @click="iconSelectVisible = true"
              >
                <template #prefix>
                  <svg-icon v-if="formData.icon" :icon-class="formData.icon" />
                </template>
              </el-input>
            </template>

            <icon-select @selected="selected" />
          </el-popover>
        </el-form-item>
        <!-- 权限标识 -->
        <el-form-item label="重定向" prop="redirect">
          <el-input v-model="formData.redirect" placeholder="index" />
        </el-form-item>

        <el-form-item
          :label="$t('common.status')"
          v-if="formData.type !== 'BUTTON'"
        >
          <el-radio-group v-model="formData.hidden">
            <el-radio :label="0">{{ $t('common.show') }}</el-radio>
            <el-radio :label="1">{{ $t('common.hidden') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          :label="$t('system.menu.keepalive')"
          v-if="formData.type == 'CATALOG' || formData.type == 'MENU'"
        >
          <el-radio-group v-model="formData.keep_alive">
            <el-radio :label="0">{{ $t('common.no') }}</el-radio>
            <el-radio :label="1">{{ $t('common.yes') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('common.sort')" prop="sort">
          <el-input-number
            v-model="formData.sort"
            style="width: 100px"
            controls-position="right"
            :min="0"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">{{
            $t('common.confirm')
          }}</el-button>
          <el-button @click="cancel">{{ $t('common.cancel') }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, toRefs } from 'vue';

import { Search, Plus, Edit, Refresh, Delete } from '@element-plus/icons-vue';
import { ElForm, ElMessage, ElMessageBox, ElPopover } from 'element-plus';

import {
  fetchMenuTreeApi,
  addMenuApi,
  updateMenuApi,
  deleteMenuApi
} from '@/api/system/menu';
import {
  TMenuFormData as MenuFormData,
  IMenuItem as MenuItem
} from '@/api/system/menu/types';

import { t } from '@/lang';
import SvgIcon from '@/components/SvgIcon/index.vue';
import IconSelect from '@/components/IconSelect/index.vue';
// import Edita from '@/components/WangEditor/index.vue';
const emit = defineEmits(['menuClick']);
const queryFormRef = ref(ElForm);
const dataFormRef = ref(ElForm);
const popoverRef = ref(ElPopover);

const state = reactive({
  loading: true,
  // 选中ID数组
  ids: [],
  // 非单个禁用
  single: true,
  // 非多个禁用
  multiple: true,
  menuList: [] as MenuItem[],
  dialog: { visible: false, title: '' },
  formData: {
    parent_id: -1,
    name: '',
    sort: 1,
    component: undefined,
    type: 'MENU',
    keepAlive: '0'
  } as MenuFormData,
  rules: {
    parent_id: [
      {
        required: true,
        message: t('system.menu.rules.parent_id'),
        trigger: 'blur'
      }
    ],
    // name: [
    //   { required: true, message: t('system.menu.rules.name'), trigger: 'blur' }
    // ],
    // title: [
    //   { required: true, message: t('system.menu.rules.title'), trigger: 'blur' }
    // ],
    type: [
      { required: true, message: t('system.menu.rules.type'), trigger: 'blur' }
    ],
    // path: [{ required: true, message: '请输入路由路径', trigger: 'blur' }],
    component: [
      {
        required: true,
        message: t('system.menu.rules.component'),
        trigger: 'blur'
      }
    ]
  },
  menuOptions: [] as Option[],
  currentRow: undefined,
  // Icon选择器显示状态
  iconSelectVisible: false,
  cacheData: {
    menuType: '',
    menuPath: ''
  }
});

const {
  loading,
  menuList,
  dialog,
  formData,
  rules,
  menuOptions,
  iconSelectVisible,
  cacheData
} = toRefs(state);

/**
 * 查询
 */
function handleQuery() {
  state.loading = true;
  fetchMenuTreeApi().then(({ data }) => {
    console.log(data);
    const formart = (data2: any) => {
      // eslint-disable-next-line no-self-assign
      data2.parent_id = data2.parent_id;
      return data2.map((item: any) => {
        delete item.hasChildren;
        // eslint-disable-next-line no-self-assign
        item.parent_id = item.parent_id;
        if (item.children) {
          formart(item.children);
        }
      });
    };
    formart(data);
    state.menuList = data;
    state.loading = false;
  });
}

/**
 * 加载菜单下拉树
 */
async function loadMenuData() {
  // const menuOptions: any[] = [];
  // await listMenuOptions().then(({ data }) => {
  //   const menuOption = { value: '0', label: '顶级菜单', children: data };
  //   menuOptions.push(menuOption);
  //   state.menuOptions = menuOptions;
  // });
  const format = (data: any[]): any[] => {
    return data.map((item: any) => {
      return {
        label: item.title,
        value: item.id,
        children: item.children.length > 0 ? format(item.children) : undefined
      };
    });
  };
  const menuOption = {
    value: -1,
    label: t('system.menu.topMenu'),
    children: format(state.menuList)
  };
  state.menuOptions = [menuOption] as any;
}

/**
 * 重置查询
 */
function resetQuery() {
  queryFormRef.value.resetFields();
  handleQuery();
}

function handleRowClick(row: any) {
  state.currentRow = JSON.parse(JSON.stringify(row));
  emit('menuClick', row);
}

/**
 * 新增菜单打开
 */
async function handleAdd(row: any) {
  formData.value.id = undefined;
  loadMenuData();
  dialog.value = {
    title: t('system.menu.add'),
    visible: true
  };

  if (row.id) {
    // 行点击新增

    formData.value.parent_id = row.id;
  } else {
    // 工具栏新增

    if (state.currentRow) {
      // 选择行
      formData.value.parent_id = (state.currentRow as any).id;
    } else {
      // 未选择行
      formData.value.parent_id = -1;
    }
  }
}

/**
 * 编辑菜单
 */
async function handleUpdate(row: MenuFormData) {
  await loadMenuData();
  state.dialog = {
    title: t('system.menu.edit'),
    visible: true
  };
  state.formData = JSON.parse(JSON.stringify(row));
  state.formData.parent_id = row.parent_id;
  // state.formData.menuId = row.id;
  // const id = row.id as string;
  // getMenuDetail(id).then(({ data }) => {
  //   state.formData = data;
  //   cacheData.value.menuType = data.type;
  //   cacheData.value.menuPath = data.path;
  // });
}

/**
 * 菜单类型 change
 */
function handleMenuTypeChange(menuType: any) {
  if (menuType !== cacheData.value.menuType) {
    formData.value.path = '';
  } else {
    formData.value.path = cacheData.value.menuPath;
  }
}

/**
 * 菜单提交
 */
function submitForm() {
  dataFormRef.value.validate((isValid: boolean) => {
    if (isValid) {
      state.formData.icon =
        state.formData.icon === t('common.none') ? '' : state.formData.icon;
      state.formData.component = state.formData.component || 'Layout';
      if (state.formData.id) {
        updateMenuApi(state.formData).then(() => {
          ElMessage.success(t('common.updateSuccess'));
          cancel();
          handleQuery();
        });
      } else {
        addMenuApi(state.formData).then(() => {
          ElMessage.success(t('common.addSuccess'));
          cancel();
          handleQuery();
        });
      }
    }
  });
}

/**
 * 删除菜单
 *
 * @param row
 */
function handleDelete(row: any) {
  ElMessageBox.confirm(t('common.deleteConfirm'), t('common.warning'), {
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    type: 'warning'
  })
    .then(() => {
      deleteMenuApi(row.id).then(() => {
        ElMessage.success(t('common.deleteSuccess'));
        handleQuery();
      });
    })
    .catch(() => ElMessage.info(t('common.deleteCancel')));
}

/**
 * 取消关闭弹窗
 */
function cancel() {
  dataFormRef.value.resetFields();
  state.dialog.visible = false;
}

/**
 * 选择图标后事件
 */
function selected(name: string) {
  state.formData.icon = name;
  state.iconSelectVisible = false;
}

onMounted(() => {
  handleQuery();
});
</script>
