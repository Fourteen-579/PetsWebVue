import request from '@/utils/request'

export function upload(params) {
  return request({
    url: '/picture/upload',
    method: 'post',
    data: params
  })
}
