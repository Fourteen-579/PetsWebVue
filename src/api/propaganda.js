import request from '@/utils/request'

export function getPropagandaList(params) {
  return request({
    url: '/propaganda/page',
    method: 'get',
    params
  })
}

export function getPropagandaById(params) {
  return request({
    url: '/propaganda/' + params,
    method: 'get'
  })
}

export function updatePropaganda(params) {
  return request({
    url: '/propaganda/update',
    method: 'put',
    data: params
  })
}

export function addPropaganda(params) {
  return request({
    url: '/propaganda/add',
    method: 'post',
    data: params
  })
}

export function addComment(params) {
  return request({
    url: '/propaganda/add/comment',
    method: 'post',
    data: params
  })
}

export function addUser(params) {
  return request({
    url: '/propaganda/add/user',
    method: 'post',
    data: params
  })
}

export function deletedPropaganda(id) {
  return request({
    url: '/propaganda/delete/' + id,
    method: 'delete'
  })
}
