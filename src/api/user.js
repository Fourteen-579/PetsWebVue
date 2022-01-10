import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {token}
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUserList(params) {
  return request({
    url: '/user/page',
    method: 'get',
    params
  })
}

export function updateUser(params) {
  return request({
    url: '/user/update',
    method: 'put',
    data: params
  })
}

export function addUser(params) {
  return request({
    url: '/user/add',
    method: 'post',
    data: params
  })
}

export function deletedUser(id) {
  return request({
    url: '/user/delete/' + id,
    method: 'delete'
  })
}
