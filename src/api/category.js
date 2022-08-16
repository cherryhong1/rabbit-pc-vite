/*
 * @Descripttion:
 * @version:
 * @@Company: DCIT-SH
 * @Author: cherry hong
 * @Date: 2022-08-05 14:33:03
 * @LastEditors: cherry hong
 * @LastEditTime: 2022-08-05 15:04:41
 */
import request from '@/utils/request'

//
export const findAllCategory = () => {
  return request('/home/category/head')
}

export const findTopCategory = (id) => {
  return request('/category','get',{id})
}

export const findSubCategory = (id) =>{
  return request('/category/sub/filter','get', {id})
}