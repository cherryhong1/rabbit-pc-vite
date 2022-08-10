<!--
 * @Author: cherry 1044369926@qq.com
 * @Date: 2022-08-09 13:13:29
 * @LastEditors: cherry 1044369926@qq.com
 * @LastEditTime: 2022-08-09 14:08:30
 * @FilePath: \rabbit-pc-vued:\vueProjeect\rabbit-pc-vite\src\components\header-sticky.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="header-sticky" :class="{show:y>=78}">
    <div class="container">
      <router-link to="/" class="logo"></router-link>
      <headerNav></headerNav>
      <div class="right">
        <router-link to="/">品牌</router-link>
        <router-link to="/">专题</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import headerNav from './header-nav.vue'

onMounted(() => {
  const { y } = useWindowScroll() // eslint-disable-line no-unused-vars
})
</script>

<style lang="less" scoped>
.header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);
  opacity: 0;
  &.show {
    transition: all .3s linear;
    transform: none;
    opacity: 1;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url("http://erabbit.itheima.net/img/logo.0940ebb5.png")
      no-repeat right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
