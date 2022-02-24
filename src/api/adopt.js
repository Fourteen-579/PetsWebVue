import request from '@/utils/request'

export function getAdoptList(params) {
  return request({
    url: '/adopt/page',
    method: 'get',
    params
  })
}

export function updateAdopt(params) {
  return request({
    url: '/adopt/update',
    method: 'put',
    data: params
  })
}

export function addAdopt(params) {
  return request({
    url: '/adopt/add',
    method: 'post',
    data: params
  })
}

export function deletedAdopt(id) {
  return request({
    url: '/adopt/delete/' + id,
    method: 'delete'
  })
}

export function queryAdoptById(id) {
  return request({
    url: '/adopt/' + id,
    method: 'get'
  })
}
