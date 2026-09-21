import request from '@/utils/request';

export type ScheduledJob = {
  jobId: number;
  jobName: string;
  jobGroup: string;
  handlerKey: string;
  scriptArgs: string[];
  cronExpression: string;
  jobStatus: string;
  jobExecuteStatus: string;
  previousTime: string;
  createBy: string;
  updateBy: string;
  createTime: string;
  updateTime: string;
  remark: string;
  version: number;
};

export type ScheduledJobActionOptions = {
  builtInActions: { label: string; value: string }[];
  scripts: { label: string; value: string }[];
};

export type ScheduledJobLog = {
  id: number;
  jobId: number;
  jobName: string;
  queueJobId: string;
  status: string;
  message: string;
  errorMessage: string;
  attempt: number;
  startTime: string;
  endTime: string;
  duration: number;
  createTime: string;
};

export function getScheduledJobs(params: Record<string, any>) {
  return request({ url: '/job/sys-job/page', method: 'get', params });
}

// 获取内置动作和 src/scripts 目录中可执行的 TS 脚本。
export function getScheduledJobActionOptions() {
  return request({ url: '/job/sys-job/actions', method: 'get' });
}

export function createScheduledJob(data: Partial<ScheduledJob>) {
  return request({ url: '/job/sys-job', method: 'post', data });
}

export function updateScheduledJob(data: Partial<ScheduledJob>) {
  return request({ url: '/job/sys-job', method: 'put', data });
}

export function deleteScheduledJob(id: number) {
  return request({ url: `/job/sys-job/${id}`, method: 'delete' });
}

export function startScheduledJob(id: number) {
  return request({ url: `/job/sys-job/start-job/${id}`, method: 'post' });
}

export function stopScheduledJob(id: number) {
  return request({ url: `/job/sys-job/shutdown-job/${id}`, method: 'post' });
}

export function runScheduledJob(id: number) {
  return request({ url: `/job/sys-job/run-job/${id}`, method: 'post' });
}

export function getScheduledJobLogs(params: Record<string, any>) {
  return request({ url: '/job/sys-job/job-log', method: 'get', params });
}
