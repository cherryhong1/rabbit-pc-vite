import request from "@/utils/request";

export const findGoods = (id) =>{
  return request('/goods','get', {id})
}

export const findRelGoods = (id,limit=16) =>{
  return request('/goods/relevant','get', {id,limit})
}