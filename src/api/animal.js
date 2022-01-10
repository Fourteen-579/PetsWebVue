import request from "@/utils/request";

export function getAnimalList(params) {
  return request({
    url: '/animal/page',
    method: 'get',
    params
  })
}

export function updateAnimal(params) {
  return request({
    url: '/animal/update',
    method: 'put',
    data: params
  })
}

export function addAnimal(params) {
  return request({
    url: '/animal/add',
    method: 'post',
    data: params
  })
}

export function deletedAnimal(id) {
  return request({
    url: '/animal/delete/' + id,
    method: 'delete'
  })
}
