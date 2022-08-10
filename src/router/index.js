/*
 * @Descripttion:
 * @version:
 * @@Company: DCIT-SH
 * @Author: cherry hong
 * @Date: 2022-08-04 17:20:21
 * @LastEditors: cherry hong
 * @LastEditTime: 2022-08-05 15:19:18
 */
import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = () => import('@/views/Layout')
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: () => import('@/views/home/index')
      },
      {
        path: 'category/:id',
        component: () => import('@/views/category/index')
      },
      {
        path: 'category/sub/:id',
        component: () => import('@/views/category/sub')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
