<template>
  <login-header>欢迎登录</login-header>
  <section class="login-section">
    <div class="wrapper">
      <nav>
        <span
          href=""
          @click="activeName = 'account'"
          :class="{ active: activeName === 'account' }"
        >
          账号登录</span
        >
        <span
          href=""
          @click="activeName = 'qrcode'"
          :class="{ active: activeName === 'qrcode' }"
          >扫码登录</span
        >
      </nav>
      <loginForm
        v-if="activeName === 'account'"
        class="account-box"
      ></loginForm>
      <div v-if="activeName === 'qrcode'" class="qrcode-box">
        <img src="http://erabbit.itheima.net/img/qrcode.5372a064.jpg" alt="" />
        <p>打开<span>小兔鲜App</span>扫码登录</p>
      </div>
    </div>
  </section>
  <login-footer></login-footer>
</template>

<script setup>
import loginHeader from "./components/login-header.vue";
import loginFooter from "./components/login-footer.vue";
import loginForm from "./components/login-form.vue";

import { ref } from "vue";


const activeName = ref("account");

</script>

<style lang="less" scoped>
.login-section {
  height: 488px;
  background: url("http://erabbit.itheima.net/img/login-bg.696efec3.png")
    no-repeat center / cover;
  position: relative;
  .wrapper {
    width: 380px;
    position: absolute;
    top: 38px;
    left: 50%;
    background: #fff;
    min-height: 400px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      text-align: right;
      align-items: center;
      padding: 0 50px;
      span {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        &:first-child {
          border-left: 1px solid #f5f5f5;
          text-align-last: left;
        }
        &.active {
          font-weight: bold;
          color: @xtxColor;
        }
      }
    }
    .qrcode-box {
      text-align: center;
      padding-top: 40px;
      p {
        margin-top: 20px;
        span {
          color: @xtxColor;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
