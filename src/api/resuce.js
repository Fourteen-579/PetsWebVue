import request from '@/utils/request'

export function getRescueList(params) {
  return request({
    url: '/rescue/page',
    method: 'get',
    params
  })
}

export function updateRescue(params) {
  return request({
    url: '/rescue/update',
    method: 'put',
    data: params
  })
}

export function addRescue(params) {
  return request({
    url: '/rescue/add',
    method: 'post',
    data: params
  })
}

export function deletedRescue(id) {
  return request({
    url: '/rescue/delete/' + id,
    method: 'delete'
  })
}
