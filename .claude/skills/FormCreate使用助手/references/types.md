# FormCreate 类型口径（TypeScript）

本文档汇总 FormCreate 运行态 `Rule`、`Api` 等核心数据结构与方法签名，作为回答“字段/属性/方法怎么写”的口径。正文为 TypeScript 声明（保留中文注释）。

```typescript
// 说明：
// - 本文件用于“口径对齐”，不要求在业务代码中直接 import 使用。
// - 下列类型为运行态常见结构的概览：不同 UI 栈/版本可能存在增减，回答时以用户实际版本为准。

// 表单的全局配置对象（option/options）。此处仅作占位；完整字段请见本技能 `AGENTS.md` 第 7 节。
export type Options = Record<string, any>;

// 按钮 props（不同 UI 栈差异较大），此处仅作占位。
export type ButtonProps = Record<string, any>;

// fetch 的配置项（不同版本字段可能不同），此处仅作占位。
export type FetchOption = Record<string, any>;

// Vue 节点占位类型（不绑定到具体 Vue 版本/运行时）。
export type Vnode = any;

// Vue 内部实例占位类型。
export type ComponentInternalInstance = any;

export type Rule = {
    // 生成组件的名称，例如 'input', 'select' 等
    type: string;
    // 表单字段名称，用于数据绑定
    field?: string;
    // 组件的唯一标识符
    name?: string;
    // 字段标签
    title?: string;
    // 组件的提示信息
    info?: string;
    // 组件的默认值
    value?: any;
    // 是否原样生成组件,不嵌套的`FormItem`中
    native?: boolean;
    // 组件的属性配置
    props?: Object;
    // 组件的内联样式
    style?: string | Object;
    // 组件的 class 样式类
    class?: string | Array<string>;
    // 设置组件的 id
    id?: string | Array<string>;
    // 组件事件处理函数
    on?: { [key: string]: Function | Function[] };
    // 组件的生成周期回调
    hook?: { [key: string]: Function | Function[] };
    // 插槽名，用于组件嵌套
    slot?: string;
    // 组件的 key，通常用于列表渲染时的唯一标识
    key?: string;
    // 是否必填
    $required?: boolean | string | Object;
    // 组件的选项列表，适用于 `radio`, `select`, `checkbox` 等组件
    options?: Array<any>;
    // 选项插入的目标属性，默认插入到 `props.data` 中
    optionsTo?: string;
    // 是否隐藏组件（不会渲染 DOM 元素）
    hidden?: boolean;
    // 是否显示组件（有 DOM 渲染，但可能不可见）
    display?: boolean;
    // 是否开启事件注入
    inject?: boolean | Object;
    // 表单提交时是否忽略该字段, 当等于'hidden'时组件隐藏时忽略
    ignore?: boolean | 'hidden';
    // 组件的验证规则
    validate?: Object[];
    // 子组件列表，用于嵌套子组件
    children?: Rule[];
    // 组件的联动控制，控制其他组件的显示与否
    control?: Array<any>;
    // 动态计算组件的指定字段，当依赖值发生变化时将自动重新计算并更新结果
    computed?: Object;
    // FormItem 的配置
    wrap?: Object;
    // 设置组件的布局规则
    col?: Object;
    // 自定义属性，如远程数据获取等
    effect?: {
        // 加载远程数据
        fetch?: Object;
    };
    // 设置组件的前缀内容，通常用于在输入框前显示图标或文本
    prefix?: string | Rule;
    // 设置组件的后缀内容，通常用于在输入框后显示图标或文本
    suffix?: string | Rule;
    // 设置组件的自定义指令
    directives?: object;
    // 是否缓存组件，只触发一次渲染
    cache?: boolean;
    // 设置回调函数，用于动态更新组件的内容
    update?: (
        value: any,
        api: Api,
        origin: {
            // init初始化触发,link关联触发,value变化触发
            origin: 'change' | 'init' | 'link';
            // 关联触发的字段名
            linkField?: string;
        }
    ) => boolean | undefined;
    // 通过函数渲染插槽
    renderSlots?: {
        default?: (scope: any) => Vnode | Vnode[];
        [slot: string]: ((scope: any) => Vnode | Vnode[]) | undefined;
    };
    // 配置哪些字段变化时会触发当前组件的 `update` 回调
    link?: string[];
    // 设置`props`中需要双向绑定属性的名称
    sync?: string[];
    // 使用`emit`方式监听的事件名
    emit?: string[];
    // 自定义组件 `emit` 事件的前缀，默认是组件的 `field` 字段
    emitPrefix?: string;
    // 定义用于当前规则渲染的自定义组件
    component?: boolean;
    // 其他扩展属性
    [key: string]: any;
};

export interface Api {
    // 表单的全局配置对象，包含了所有表单的配置信息
    readonly config: Options;
    readonly options: Options;
    // 获取当前表单在子表单(group)中的索引（如果表单是嵌套的子表单）
    readonly index: number | undefined;
    // 获取当前表单所在的子表单(group)中所有表单的API（如果表单是嵌套的子表单）
    readonly siblings: Api[] | undefined;
    // 当前表单的生成规则列表，定义了表单的结构和组件
    readonly rule: Rule[];
    // 当前表单的数据对象，其中包含了所有字段的值
    readonly form: Object;
    // 父级表单的 Api 对象（如果表单是嵌套的子表单）
    readonly parent: Api | undefined;
    // 最顶层表单的 Api 对象（适用于嵌套表单的场景）
    readonly top: Api | undefined;
    // 子表单的 Api 对象数组，允许对嵌套的子表单进行操作
    readonly children: Api[];
    // 提交按钮的控制接口，允许动态设置提交按钮的状态
    btn: {
        // 设置提交按钮的加载状态，如加载中状态
        loading(loading: boolean): void;
        // 设置提交按钮的禁用状态
        disabled(disabled: boolean): void;
        // 设置提交按钮的显示状态，控制按钮是否可见
        show(show: boolean): void;
    };
    // 重置按钮的控制接口，允许动态设置重置按钮的状态
    resetBtn: {
        // 设置重置按钮的加载状态
        loading(loading: boolean): void;
        // 设置重置按钮的禁用状态
        disabled(disabled: boolean): void;
        // 设置重置按钮的显示状态
        show(show: boolean): void;
    };
    // 获取指定组件的 DOM 元素或 Vue 实例
    el(id: string): any;
    // 获取整个表单的 Vue 组件实例，便于直接操作组件的内部方法或属性
    formEl(): undefined | ComponentInternalInstance;
    // 获取指定表单项的 Vue 组件实例，用于对具体表单项的操作
    wrapEl(id: string): undefined | ComponentInternalInstance;
    // 更新表单提交按钮的配置，如文本、样式等
    submitBtnProps(props: ButtonProps): void;
    // 更新表单重置按钮的配置
    resetBtnProps(props: ButtonProps): void;
    // 获取当前表单的数据对象，返回所有字段的值
    formData(): Object;
    // 获取特定字段的数据，返回指定字段的值
    formData(field: string[]): Object;
    // 获取指定字段的值
    getValue(field: string): any;
    // 用新的数据覆盖表单的当前值
    coverValue(formData: Object): void;
    // 设置表单的值，可以为整个表单设置，也可以为特定字段设置
    setValue(formData: Object): void;
    setValue(field: string, value: any): void;
    // 根据字段名删除对应的组件
    removeField(field: string): Rule;
    // 根据组件生成规则删除对应的组件
    removeRule(rule: Rule): Rule;
    // 获取表单中所有字段的名称
    fields(): string[];
    // 在指定字段后追加新的组件
    append(rule: Rule): void;
    append(rule: Rule, field: string): void;
    append(rule: Rule, field: string, child: boolean): void;
    // 在指定字段前插入新的组件
    prepend(rule: Rule): void;
    prepend(rule: Rule, field: string): void;
    prepend(rule: Rule, field: string, child: boolean): void;
    // 隐藏或显示表单的指定组件(无 DOM 节点)
    hidden(hidden: Boolean): void;
    hidden(hidden: Boolean, field: string | Array<string>): void;
    // 控制表单组件的显示与否(有 DOM 节点)
    display(hidden: Boolean): void;
    display(hidden: Boolean, field: string | Array<string>): void;
    // 获取组件的隐藏状态，返回布尔值
    hiddenStatus(field: String): Boolean;
    // 获取组件的显示状态，返回布尔值
    displayStatus(field: String): Boolean;
    // 禁用或启用表单的指定组件
    disabled(disabled: Boolean): void;
    disabled(disabled: Boolean, field: string | Array<string>): void;
    // 获取所有表单组件的生成规则，返回一个对象，键为字段名，值为规则对象
    model(): { [field: string]: Rule };
    // 获取所有定义了 `name` 属性的组件规则，返回一个对象，键为组件名，值为规则对象
    component(): { [name: string]: Rule };
    // 重新加载表单，使用新的规则列表替换当前表单的规则
    reload(rules: Rule[]): void;
    // 更新表单的全局配置
    updateOptions(options: Options): void;
    // 监听表单提交事件，当表单被提交时执行回调
    onSubmit(fn: (formData: Object, api: Api) => void): void;
    // 手动提交表单，触发提交流程并执行成功或失败的回调
    submit(success?: (formData: Object, api: Api) => void, fail?: (api: Api) => void): Promise<any>;
    // 同步指定字段或规则，确保表单的状态与最新数据同步
    sync(field: string | string[]): void;
    sync(rule: Rule | Rule[]): void;
    // 重新渲染整个表单，适用于更新表单布局或内容
    refresh(): void;
    refreshOptions(): void;
    // 隐藏整个表单，通常用于表单不需要展示的场景
    hideForm(hide?: Boolean): void;
    // 获取表单的修改状态，返回布尔值
    changeStatus(): Boolean;
    // 重置表单的修改状态
    clearChangeStatus(): void;
    // 设置自定义属性，用于扩展表单功能
    setEffect(id: string, attr: string, value: any): void;
    // 清理自定义属性的数据
    clearEffectData(id: string, attr?: string): void;
    // 更新指定字段的表单生成规则
    updateRule(field: string, rule: Rule): void;
    updateRule(rules: { [field: string]: Rule }): void;
    // 合并指定字段的表单生成规则
    mergeRule(field: string, rule: Rule): void;
    mergeRules(rules: { [field: string]: Rule }): void;
    // 获取指定字段的生成规则
    getRule(id: string): Rule;
    getRule(id: string, origin: true): Rule;
    getRule(id: string, origin: false): Rule;
    //通过组件类型获取生成规则
    findType(type: string): Rule;
    findTypes(type: string): Array<Rule>;
    //如果当前表单是子表单, 可以通过这个方法获取子表单组件的规则
    getCurrentFormRule(): Rule;
    // 获取组件最终渲染的规则，包含动态变化后的内容
    getRenderRule(id: string): Rule;
    // 通过 `name` 属性获取组件规则，支持单个或多个组件
    getRefRule(id: string): Rule | Rule[];
    // 通过 `name`,`field`或者规则获取父级规则
    getParentRule(id: string | Rule): undefined | Rule;
    // 更新组件的验证规则，支持合并或替换
    updateValidate(id: string, validate: Object[], merge?: Boolean): Promise<any>;
    updateValidates(validates: { [id: string]: Object[] }, merge?: Boolean): Promise<any>;
    // 刷新表单的验证状态，重新触发验证逻辑
    refreshValidate(): void;
    // 清理指定字段或整个表单的验证状态
    clearValidateState(fields?: string | string[], clearSub?: Boolean): void;
    // 清理指定字段子表单的表单的验证状态
    clearSubValidateState(fields?: string | string[]): void;
    // 验证表单，返回验证结果的 Promise
    validate(callback?: (state: any) => void): Promise<any>;
    // 验证指定字段，返回验证结果的 Promise
    validateField(field: string, callback?: (state: any) => void): Promise<any>;
    // 获取指定组件的方法，用于调用组件的自定义方法
    method(id: string, name: string): (...args: any[]) => any;
    // 手动执行指定组件的方法
    exec(id: string, name: string, ...args: any[]): any;
    // 手动触发组件的事件，适用于模拟用户操作或触发自定义逻辑
    trigger(id: string, event: string, ...args: any[]): void;
    // 获取表单的 JSON 生成规则，用于导出或保存表单结构
    toJson(space?: string | number): string;
    // 关闭指定 frame 组件的弹出框
    closeModal(id: string): void;
    // 重置表单，将所有字段的值重置为初始状态
    resetFields(): void;
    resetFields(field: string | string[]): void;
    // 获取指定字段的子表单 Api 对象，支持嵌套表单的操作
    getSubForm(field: string): Api | Api[];
    // 在表单渲染后执行回调，确保所有组件都已加载完毕
    nextTick(fn: (api: Api) => void): void;
    // 在执行回调后重新渲染表单，适用于动态更新后的表单刷新
    nextRefresh(fn: Function): void;
    // 在执行回调后同步表单数据，确保数据与 UI 同步
    deferSyncValue(fn: Function, autoSync?: boolean): void;
    // 发送远程请求，支持自定义的请求逻辑和处理方式
    fetch(opt: FetchOption): Promise<any>;
    // 设置外部数据，支持在表单中使用外部数据源
    setData(id: string, value?: any): void;
    // 获取外部数据，返回之前设置的数据对象
    getData(id: string, defaultValue?: any): any;
    // 在回调中通过get方法读取外部数据,获取对数据的变化监听,当数据变化后重新触发回调.返回解除监听函数
    watchData(fn: (get: (id: string, defaultValue?: any) => any, change: boolean) => void): () => Function;
    // 刷新与外部数据相关的组件，确保数据变更后 UI 同步更新
    refreshData(id: string): void;
    // 内置事件管理系统，支持手动触发和监听自定义事件
    bus: {
        $emit(event: string, ...args: any[]): void; // 手动触发事件
        $on(event: string | string[], callback: Function): void; // 监听事件
        $once(event: string | string[], callback: Function): void; // 监听一次性事件
        $off(event: string | string[], callback: Function): void; // 取消事件监听
    };
    // 手动触发表单的自定义事件
    emit(event: string, ...args: any[]): void;
    // 监听表单自定义事件
    on(event: string | string[], callback: Function): this;
    // 监听一次性表单自定义事件
    once(event: string | string[], callback: Function): this;
    // 取消表单自定义事件的监听
    off(event?: string | string[], callback?: Function): this;
}
```

