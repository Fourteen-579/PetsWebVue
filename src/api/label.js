import request from '@/utils/request'

export function getLabelList(params) {
  return request({
    url: '/label/page',
    method: 'get',
    params
  })
}

export function updateLabel(params) {
  return request({
    url: '/label/update',
    method: 'put',
    data: params
  })
}

export function addLabel(params) {
  return request({
    url: '/label/add',
    method: 'post',
    data: params
  })
}

export function deletedLabel(id) {
  return request({
    url: '/label/delete/' + id,
    method: 'delete'
  })
}
