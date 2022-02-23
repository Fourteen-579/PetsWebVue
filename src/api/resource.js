import request from '@/utils/request'

export function getResourceList(params) {
  return request({
    url: '/resource/page',
    method: 'get',
    params
  })
}

export function updateResource(params) {
  return request({
    url: '/resource/update',
    method: 'put',
    data: params
  })
}

export function addResource(params) {
  return request({
    url: '/resource/add',
    method: 'post',
    data: params
  })
}

export function deletedResource(id) {
  return request({
    url: '/resource/delete/' + id,
    method: 'delete'
  })
}

export function queryById(id) {
  return request({
    url: '/resource/' + id,
    method: 'get'
  })
}
