import request from '@/utils/request'

export function getUserLine(params) {
  return request({
    url: '/board/user/' + params,
    method: 'get'
  })
}

export function getPieChart(params) {
  return request({
    url: '/board/two/' + params,
    method: 'get'
  })
}

export function getAnimalLine(params) {
  return request({
    url: '/board/animal/' + params,
    method: 'get'
  })
}

export function getProLine(params) {
  return request({
    url: '/board/pro/' + params,
    method: 'get'
  })
}

export function getCard() {
  return request({
    url: '/board/one',
    method: 'get'
  })
}
