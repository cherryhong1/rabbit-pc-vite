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
        path: '/category/:id',
        component: () => import('@/views/category/index')
      },
      {
        path: '/category/sub/:id',
        component: () => import('@/views/category/sub')
      },
      {
        path: '/product/:id',
        component: () => import ('@/views/goods/index')
      },
      {
        path: '/cart',
        component: () => import ('@/views/cart/index')
      },
     
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path:'/i18n',
    component: () => import('@/views/i18n/index')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      left:0,
      top:0

    }
  }
})

export default router
