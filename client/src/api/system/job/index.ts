import request from '@/utils/request';
import { GetScheduledTaskLisResult, ITaskDetails } from './types';

/**获取定时任务列表 */
export function getScheduledTaskListApi(
  params: any
): Promise<GetScheduledTaskLisResult> {
  return request({
    url: '/job/sys-job/page',
    method: 'get',
    params
  });
}

/**校验任务 */
export function checkTaskApi(params: {
  jobName: string;
  jobGroup: string;
}): Promise<IResult> {
  return request({
    url: '/job/sys-job/is-valid-task-name',
    method: 'get',
    params
  });
}
/**新增定时任务 */
export function addScheduledTaskApi(data: ITaskDetails): Promise<IResult> {
  return request({
    url: '/job/sys-job',
    method: 'post',
    data
  });
}
/**暂停全部任务 */
export function pauseAllScheduledTaskApi(): Promise<IResult> {
  return request({
    url: '/job/sys-job/shutdown-jobs',
    method: 'post'
  });
}

/**启动全部任务 */
export function startAllScheduledTaskApi(): Promise<IResult> {
  return request({
    url: '/job/sys-job/start-jobs',
    method: 'post'
  });
}

/**重置全部任务 */
export function resetAllScheduledTaskApi(): Promise<IResult> {
  return request({
    url: '/job/sys-job/refresh-jobs',
    method: 'post'
  });
}

/**更新任务 */
export function updateScheduledTaskApi(data: ITaskDetails): Promise<IResult> {
  return request({
    url: '/job/sys-job',
    method: 'put',
    data
  });
}

/**查看日志 */
export function getScheduledTaskLogApi(params: PageQueryParam): Promise<any> {
  return request({
    url: '/job/sys-job/job-log',
    method: 'get',
    params: params
  });
}
/**启动任务 */
export function startScheduledTaskApi(
  jobId: number | string
): Promise<IResult> {
  return request({
    url: '/job/sys-job/start-job/' + jobId,
    method: 'post'
  });
}

/**暂停任务 */
export function pauseScheduledTaskApi(
  jobId: number | string
): Promise<IResult> {
  return request({
    url: '/job/sys-job/shutdown-job/' + jobId,
    method: 'post'
  });
}
/**执行任务 */
export function executeScheduledTaskApi(
  jobId: number | string
): Promise<IResult> {
  return request({
    url: '/job/sys-job/run-job/' + jobId,
    method: 'post'
  });
}

/**删除任务 */
export function deleteScheduledTaskApi(id: number | string): Promise<IResult> {
  return request({
    url: '/job/sys-job/' + id,
    method: 'delete'
  });
}
