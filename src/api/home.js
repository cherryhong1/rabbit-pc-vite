import request from '@/utils/request'

export const findBrand = (limit) => {
  return request('/home/brand', 'get', { limit })
}

export const findBanner = () => {
  return request('/home/banner')
}

export const findNew = () => {
  return request('/home/new')
}

export const findHot = () => {
  return request('/home/hot')
}

export const findGoods = () => {
  return request('/home/goods')
}
export const findSpecial = () =>{
  return request('/home/special')
}