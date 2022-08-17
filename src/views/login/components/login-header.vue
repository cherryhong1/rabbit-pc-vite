<template>
  <header class="login-header">
    <div class="container">
      <h1 class="logo">
        <router-link to="/">小兔鲜</router-link>
      </h1>
      <h3 class="sub"><slot></slot></h3>
      <router-link to="/" class="entry">
        进入网页首页
        <i class="iconfont icon-angle-right"></i>
        <i class="iconfont icon-angle-right"></i>
      </router-link>
    </div>
  </header>
</template>

<script setup></script>

<style lang="less" scoped>
.login-header {
  background: #fff;
  border: 1px solid #e4e4e4;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .logo{
      width: 200px;
      a{
        display: block;
        height: 132px;
        width: 100%;
        text-indent: -9999px;
        background: url('http://erabbit.itheima.net/img/logo.0940ebb5.png') no-repeat center 18px / contain ;
      }
    }
    .sub{
      flex: 1;
      font-size: 24px;
      font-weight: normal;
      margin-left: 20px;
      margin-bottom: 38px;
      color:#666;
    }
    .entry{
      width: 150px;
      margin-bottom: 38px;
      font-size: 16px;
      i{
        font-size: 16px;
        color: @xtxColor;
        letter-spacing: -5px;
      }
    }
  }
}
</style>
