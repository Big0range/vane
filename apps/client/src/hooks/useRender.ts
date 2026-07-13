import { h } from 'vue';

import { NButton, NTag, NSpace, NPopconfirm, NIcon } from 'naive-ui';

/**
 * ===========================
 * 组件白名单
 * ===========================
 */

const componentMap = {
  div: 'div',
  span: 'span',

  NButton,
  NTag,
  NSpace,
  NPopconfirm,
  NIcon,
};

/**
 * ===========================
 * 事件白名单
 * ===========================
 */

/**
 * ===========================
 * 安全表达式执行
 * ===========================
 */

function safeEval(expr: string, row: any) {
  try {
    /**
     * 黑名单
     */

    const blacklist = [
      'window',
      'document',
      'eval',
      'Function',
      'import',
      'this',
      'globalThis',
      'localStorage',
      'sessionStorage',
    ];

    for (const key of blacklist) {
      if (expr.includes(key)) {
        return '';
      }
    }

    return new Function('row', `"use strict"; return (${expr})`)(row);
  } catch {
    return '';
  }
}

/**
 * ===========================
 * 解析 {{ xxx }}
 * ===========================
 */

function parseValue(value: any, row: any) {
  if (typeof value !== 'string') {
    return value;
  }

  /**
   * 完整表达式
   */

  const fullMatch = value.match(/^\{\{(.*?)\}\}$/);

  if (fullMatch) {
    return safeEval(fullMatch[1].trim(), row);
  }

  /**
   * 字符串模板
   */

  return value.replace(/\{\{(.*?)\}\}/g, (_, expr) => {
    return safeEval(expr.trim(), row);
  });
}

/**
 * ===========================
 * props 递归解析
 * ===========================
 */

function parseProps(props: Record<string, any> = {}, row: any) {
  const result: Record<string, any> = {};

  for (const key in props) {
    result[key] = parseValue(props[key], row);
  }

  return result;
}

/**
 * ===========================
 * 核心递归渲染
 * ===========================
 */

function renderNode(node: any, row: any, actionMap?: any): any {
  if (!node) {
    return null;
  }

  /**
   * ===========================
   * 条件渲染
   * ===========================
   */

  if (node.if !== undefined) {
    const visible = parseValue(node.if, row);

    if (!visible) {
      return null;
    }
  }

  /**
   * ===========================
   * 组件检查
   * ===========================
   */

  const Comp = componentMap[node.type as keyof typeof componentMap];

  if (!Comp) {
    console.warn(`未知组件: ${node.type}`);

    return null;
  }

  /**
   * ===========================
   * props
   * ===========================
   */

  const props = parseProps(node.props || {}, row);

  /**
   * ===========================
   * 点击事件
   * ===========================
   *
   * {
   *   onClick: {
   *     name: 'edit',
   *     args: [
   *       '{{ row }}',
   *       'abc'
   *     ]
   *   }
   * }
   */

  if (node.onClick) {
    const action = node.onClick;

    const fn: any = actionMap[action.name];

    if (fn) {
      props.onClick = () => {
        const args: any = (action.args || []).map((arg: any) =>
          parseValue(arg, row),
        );

        fn(...args);
      };
    }
  }

  /**
   * ===========================
   * children
   * ===========================
   */

  let children: any = undefined;

  /**
   * text
   */

  if (node.text !== undefined) {
    children = {
      default: () => parseValue(node.text, row),
    };
  }

  /**
   * children
   */

  if (Array.isArray(node.children) && node.children.length) {
    children = () =>
      node.children.map((child: any) => renderNode(child, row, actionMap));
  }

  /**
   * ===========================
   * 返回 vnode
   * ===========================
   */

  return h(Comp as any, props, children);
}

/**
 * ===========================
 * DataTable columns 转换
 * ===========================
 */

export function createColumns(serverColumns: any[], actionMap?: any) {
  return serverColumns.map(col => {
    /**
     * 普通列
     */

    if (!col.render) {
      return col;
    }

    /**
     * render 列
     */

    return {
      ...col,

      render(row: any) {
        return renderNode(col.render, row, actionMap);
      },
    };
  });
}
