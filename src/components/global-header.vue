<template>
  <header class="header-page">
    <div class="container">
      <h1 class="logo">
        <router-link to="/">小兔闲</router-link>
      </h1>
      <header-nav></header-nav>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜" />
      </div>
    <headerCart></headerCart>
    </div>
  </header>
</template>

<script setup>
import headerNav from './header-nav.vue'
import headerCart from './header-cart.vue'
</script>

<style lang="less" scoped>
.header-page {
  background: #fff;
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -99999px;
      background: url("http://erabbit.itheima.net/img/logo.0940ebb5.png")
        no-repeat center 18px / contain;
    }
  }

  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;
    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }
    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }

}
</style>
