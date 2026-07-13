type NodeType = 'rule' | 'option';

interface BaseNode {
  id?: number;
  control?: {
    rule?: BaseNode[];
    [key: string]: any;
  }[];
  options?: BaseNode[];
  children?: BaseNode[];
  [key: string]: any;
}

interface NodeInfo {
  item: BaseNode;
  type: NodeType;
  parent?: BaseNode;
}

/**
 * 新增
 */
async function addItem(item: BaseNode, type: NodeType, parent?: BaseNode) {
  // TODO

  if (type === 'rule') {
    console.log('新增 rule', {
      item,
      parent,
      parentId: parent?.id,
    });
  } else {
    console.log('新增 option', {
      item,
      parent,
      parentId: parent?.id,
    });
  }
}

/**
 * 删除
 */
async function removeItem(item: BaseNode, type: NodeType, parent?: BaseNode) {
  // TODO

  if (type === 'rule') {
    console.log('删除 rule', {
      item,
      parent,
      parentId: parent?.id,
    });
  } else {
    console.log('删除 option', {
      item,
      parent,
      parentId: parent?.id,
    });
  }
}

/**
 * 异步递归遍历
 */
async function walk(
  list: BaseNode[] = [],
  type: NodeType,
  callback: (item: BaseNode, info: NodeInfo) => Promise<void>,
  parent?: BaseNode,
) {
  for (const item of list) {
    await callback(item, {
      item,
      type,
      parent,
    });

    // 子 rule
    for (const c of item.control ?? []) {
      await walk(c.rule ?? [], 'rule', callback, item);
    }

    // options
    await walk(item.options ?? [], 'option', callback, item);

    // 树形 options
    await walk(item.children ?? [], 'option', callback, item);
  }
}

/**
 * 对比两份数据
 *
 * oldRules：数据库数据(A)
 * newRules：前端提交数据(B)
 */
export async function diffRules(oldRules: BaseNode[], newRules: BaseNode[]) {
  const oldMap = new Map<number, NodeInfo>();
  const newIds = new Set<number>();

  /**
   * 收集旧数据
   */
  await walk(oldRules, 'rule', async (item, info) => {
    if (item.id != null) {
      oldMap.set(item.id, info);
    }
  });

  /**
   * 收集新数据所有 id
   */
  await walk(newRules, 'rule', async (item) => {
    if (item.id != null) {
      newIds.add(item.id);
    }
  });

  /**
   * 删除
   */
  for (const [id, info] of oldMap) {
    if (!newIds.has(id)) {
      await removeItem(info.item, info.type, info.parent);
    }
  }

  /**
   * 新增
   */
  await walk(newRules, 'rule', async (item, info) => {
    if (item.id === undefined || item.id === null || item.id === 0) {
      await addItem(item, info.type, info.parent);
    }
  });
}
const a = [
  {
    id: 16,
    field: 'type',
    options: [
      {
        id: 17,
        label: '目录',
      },
      {
        id: 18,
        label: '菜单',
      },
    ],
    control: [
      {
        value: 'MENU',
        rule: [
          {
            id: 19,
            field: 'name',
          },
          {
            id: 20,
            field: 'component',
          },
        ],
      },
    ],
  },
];

const b = [
  {
    id: 16,
    field: 'type',
    options: [
      {
        id: 17,
        label: '目录',
      },
      {
        label: '按钮',
      },
    ],
    control: [
      {
        value: 'MENU',
        rule: [
          {
            id: 19,
            field: 'name',
          },
          {
            field: 'icon',
          },
        ],
      },
    ],
  },
];
console.log(1);
await diffRules(a, b);
console.log(2);
