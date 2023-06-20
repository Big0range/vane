import removeConsole from 'vite-plugin-remove-console';
import { UserConfig, ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import { webUpdateNotice } from '@plugin-web-update-notification/vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default ({ mode, command }: ConfigEnv): UserConfig => {
  // 获取 .env 环境配置文件
  const env = loadEnv(mode, process.cwd());
  return {
    base: '/vane/',
    plugins: [
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: env.VITE_APP_TITLE
          }
        }
      }),
      vue(),
      vueJsx(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
      // !打包时去除console.log
      removeConsole(),
      webUpdateNotice({
        versionType: 'build_timestamp',
        logVersion: true,
        checkInterval: 0.5 * 60 * 1000,
        notificationProps: {
          title: '系统升级通知',
          description: '检测到当前系统版本已更新，请刷新页面后使用。',
          buttonText: '刷新',
          dismissButtonText: '忽略'
        }
      })
    ],
    // esbuild: {
    //   drop: ['console', 'debugger']
    // },
    // 本地反向代理解决浏览器跨域限制
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_APP_PORT),
      open: true, // 运行自动打开浏览器
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 线上API地址
          // target: 'http://49.232.191.162:9999/',
          // target: 'http://192.144.203.109/',
          // target: 'https://zssf.zs-hospital.sh.cn/', //线上
          target: 'http://127.0.0.1:9999/', //后端本地
          // target: 'http://192.144.203.109:9999/',
          // 本地API地址
          // target: 'http://localhost:8989',
          changeOrigin: true,
          rewrite: path =>
            path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
        }
      }
    },
    resolve: {
      // Vite路径别名配置
      alias: {
        '@': path.resolve('./src'),
        '@root': path.resolve('../')
      }
    }
  };
};
/**
 *      ┌─┐       ┌─┐
 *   ┌──┘ ┴───────┘ ┴──┐
 *   │                 │
 *   │       ───       │
 *   │  ─┬┘       └┬─  │
 *   │                 │
 *   │       ─┴─       │
 *   │                 │
 *   └───┐         ┌───┘
 *       │         │
 *       │         │
 *       │         │
 *       │         └──────────────┐
 *       │                        │
 *       │                        ├─┐
 *       │                        ┌─┘
 *       │                        │
 *       └─┐  ┐  ┌───────┬──┐  ┌──┘
 *         │ ─┤ ─┤       │ ─┤ ─┤
 *         └──┴──┘       └──┴──┘
 *                神兽保佑
 *               代码无BUG!
 */
