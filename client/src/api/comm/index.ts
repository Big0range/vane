import request from '@/utils/request';
import { IResult } from '../baseTypes';
export function uploadImg(data: FormData): Promise<IResult & { data: string }> {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/upload/img',
    method: 'post',
    data
  });
}

export function donwloadFileApi(data?: any): Promise<Blob> {
  return request({
    url: '/xlsx',
    method: 'post',
    responseType: 'blob',
    data
  });
}
