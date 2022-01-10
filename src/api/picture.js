import request from '@/utils/request'

export function getPicByUse(params) {
  return request({
    url: '/picture/get/'+params,
    method: 'get'
  })
}

