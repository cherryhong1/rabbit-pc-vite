<template>
  <div class="header-sticky" :class="{show:y>=78}">
    <div class="container">
      <router-link to="/" class="logo"></router-link>
      <headerNav></headerNav>
      <div class="right">
        <router-link to="/">εη</router-link>
        <router-link to="/">δΈι’</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from '@vue/runtime-core'
import headerNav from './header-nav.vue'

const y = ref(0)
onMounted(() => {
  window.onscroll = () => {
    const scrollTop = document.documentElement.scrollTop
    y.value = scrollTop
  }
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
