import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { localStorage } from '@/utils/storage';
import qs from 'qs';
import useStore from '@/store';
import router from '@/router';
// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
});

interface AxiosRequestConfig2 extends AxiosRequestConfig {
  requestKey?: string;
  a?: string;
}
//存储请求信息和取消方法的的map对象
const pendingRequest = new Map();
function getRequestKey(config: AxiosRequestConfig) {
  const { method, url, params, data } = config;
  return [method, url, qs.stringify(params), qs.stringify(data)].join('&');
}

const logout = () => {
  ElMessage.closeAll();
  // token 过期
  localStorage.remove('token'); // 清除浏览器全部缓存
  ElMessage({
    message: '当前页面已失效，请重新登录',
    type: 'error'
  });
  const { user } = useStore();
  user.RESET_STATE();
  router.push({ path: '/login', replace: true });
};
const EXPIRED = 1000 * 60 * 60 * 3;
// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    if (!config.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      );
    }
    //根据请求的信息(请求方式,url,请求get/post数据),产生map的key
    const requestKey = (config.requestKey = getRequestKey(config));
    //判断请求是否重复
    if (pendingRequest.has(requestKey)) {
      //取消上次请求
      const cancel = pendingRequest.get(requestKey);
      cancel();
      //删除请求信息
      pendingRequest.delete(requestKey);
    }
    //把请求信息,添加请求到map当中
    // 生成取消方法
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken(cancel => {
        // 把取消方法添加到map
        if (!pendingRequest.has(requestKey)) {
          pendingRequest.set(requestKey, cancel);
        }
      });
    config.headers.Authorization = `${localStorage.get('token')}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    pendingRequest.delete((response.config as any).requestKey);
    const { code, message } = response.data;
    // 有状态码判断是否为0,除此皆为异常响应
    if (code == '0' || code === undefined) {
      return response.data;
    } else {
      ElMessage.closeAll();
      ElMessage({
        message: response.data.message || '系统出错',
        type: 'error'
      });
      return Promise.reject(new Error(message || 'Error'));
    }
  },
  error => {
    if (error?.config?.requestKey) {
      pendingRequest.delete(error.config.requestKey);
    }
    const { message } = error?.response?.data || {};
    const errCode = error?.code;
    if (error?.response?.status === 401) {
      logout();
      return Promise.reject(new Error(message || 'Error'));
    } else {
      ElMessage.closeAll();
      if (errCode === 'ERR_CANCELED') {
        ElMessage({
          message: '取消重复请求',
          type: 'error'
        });
      } else {
        ElMessage({
          message: message || '系统出错',
          type: 'error'
        });
      }

      return Promise.reject(new Error(message || 'Error'));
    }
  }
);

// 导出 axios 实例
export default service;
